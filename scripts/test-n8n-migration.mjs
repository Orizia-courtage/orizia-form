import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { webhookConfig, forwardWebhook } from '../lib/automation-webhook.mjs';

const workflows = JSON.parse(readFileSync(new URL('../automation/n8n/workflows.json', import.meta.url)));
const sample = {
  numero_dossier: 'TEST-N8N-001', date_creation: '2026-09-07',
  profil_nom: 'Test', profil_prenom: 'Camille', profil_mail: 'test@example.invalid',
  profil_tel: '0600000000', profil_codetel: '+33', profil_genre: 'Madame',
  situation_familial: 'Marié(e)', type_profession: "Chef d'entreprise",
  Raison: 'Réduire les mensualités', Type: 'Propriétaire', Total_credit: 2,
  BDF: false, loa: false, paiment_multiple: false, charge_loyer: 0, charge_autres: 0,
  tresorerie_souhaite: 0,
};
function render(kind, payload) {
  const workflow = workflows.find(w => w.id === `orizia${kind}Migration`);
  const code = workflow.nodes.find(n => n.type === 'n8n-nodes-base.code').parameters.jsCode;
  return new Function('$input', code)({ first: () => ({ json: { body: payload } }) })[0].json;
}

test('RAC retains document fields and conditional email content', () => {
  const result = render('Rac', sample);
  assert.equal(result.BDF, false);
  assert.equal(result.profil_nom, sample.profil_nom);
  assert.match(result.html0, /Aucune charge déclarée/);
  assert.match(result.html1, /Cheffe d'entreprise/);
  assert.match(result.html1, /Mariée/);
  assert.match(result.html1, /Aucune trésorerie/);
  assert.doesNotMatch(result.html1, /{{1\./);
});
test('RAC conditional positive branches preserve amounts and flags', () => {
  const result = render('Rac', { ...sample, BDF: true, raison_BDF: 'Incident test', loa: true,
    mensu_loa: 100, duree_loa: 12, tresorerie_souhaite: 2000, projet_treso: 'Travaux',
    credit_immo: 1, mensu_immo: 400, crd_immo: 30000, revenu_autre: 50 });
  assert.match(result.html0, /OUI - Incident test/);
  assert.match(result.html0, /100.*12 mois/);
  assert.match(result.html0, /2000/);
  assert.match(result.html1, /2000/);
});
test('Submitted HTML is escaped without escaping the trusted layout', () => {
  const result = render('Rappel', { ...sample, profil_nom: '<img src=x onerror=alert(1)>' });
  assert.match(result.html0, /&lt;img/);
  assert.doesNotMatch(result.html0, /<img src=x/);
  assert.match(result.html0, /<table/);
  assert.equal(result.profil_nom, '<img src=x onerror=alert(1)>');
});
test('Invalid input fails before database and email nodes', () => {
  assert.throws(() => render('Rac', { ...sample, profil_mail: 'bad\n@example.org' }));
  assert.throws(() => render('Rappel', {}));
});
test('Workflow topology and MongoDB field list match Make', () => {
  for (const w of workflows) {
    assert.equal(w.active, false);
    assert.equal(w.nodes[0].parameters.authentication, 'headerAuth');
    assert.equal(w.nodes[0].parameters.responseMode, 'responseNode');
    const mongo = w.nodes.find(n => n.type === 'n8n-nodes-base.mongoDb');
    if (mongo) {
      assert.equal(mongo.parameters.collection, 'Dossiers');
      assert.equal(mongo.parameters.fields.split(',').length, 39);
      assert.ok(!mongo.parameters.fields.includes('html'));
    }
    assert.equal(w.settings.saveDataSuccessExecution, 'none');
  }
});
test('Make remains the default and never receives the n8n key', () => {
  const c = webhookConfig('submit', { MAKE_WEBHOOK_SUBMIT_URL: 'https://make.example/hook', N8N_WEBHOOK_SECRET: 'secret' });
  assert.equal(c.headers['X-Orizia-Webhook-Key'], undefined);
});
test('n8n requires its secret; no silent downgrade to Make', () => {
  assert.throws(() => webhookConfig('submit', { N8N_WEBHOOK_SUBMIT_URL: 'https://n8n.example/hook', MAKE_WEBHOOK_SUBMIT_URL: 'https://make.example/hook' }));
  assert.throws(() => webhookConfig('submit', { N8N_WEBHOOK_SUBMIT_URL: 'http://n8n.example/hook', N8N_WEBHOOK_SECRET: 'secret' }));
});
test('Failed upstream request is not retried and is reported to the form', async () => {
  let calls = 0;
  const config = webhookConfig('rappel', { N8N_WEBHOOK_RAPPEL_URL: 'https://n8n.example/rappel', N8N_WEBHOOK_SECRET: 'secret' });
  assert.equal(await forwardWebhook(config, sample, async (url, options) => {
    calls++;
    assert.equal(options.headers['X-Orizia-Webhook-Key'], 'secret');
    assert.deepEqual(JSON.parse(options.body), sample);
    return { ok: false };
  }), false);
  assert.equal(calls, 1);
});
