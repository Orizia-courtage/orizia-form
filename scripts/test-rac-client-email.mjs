import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../automation/n8n/rac-client-email.js', import.meta.url), 'utf8');
const render = new Function('p', source);
test('Client email personalizes safely and remains readable without images', () => {
  const html = render({profil_prenom:'<img src=x onerror=alert(1)>',numero_dossier:'TEST<&',Raison:'Budget & projets'});
  assert.ok(html.includes('&lt;img src=x'));
  assert.ok(!html.includes('<img src=x'));
  assert.ok(html.includes('TEST&lt;&amp;'));
  assert.ok(html.includes('Budget &amp; projets'));
  for (const value of ['photo-cindy.webp','Orizia_logo.webp','tel:+33777259706','cindy-urbansky.vcf','Cindy Urbansky','max-width:620px','<!--[if mso]>']) assert.ok(html.includes(value),value);
  assert.ok(Buffer.byteLength(html)<50000);
  assert.ok(render({}).includes('Regroupement de crédits'));
});
test('Both exported workflows embed the exact tested email expression', () => {
  for (const name of ['orizia-rac.json','workflows.json']) {
    const data=JSON.parse(readFileSync(new URL('../automation/n8n/'+name,import.meta.url)));
    const workflow=(Array.isArray(data)?data:[data]).find(w=>w.id==='oriziaRacMigration');
    const email=workflow.nodes.find(n=>n.name==='Email rac client');
    assert.equal(email.parameters.html,"={{ (() => { const p = $('Preparer rac').first().json;\n"+source+'\n})() }}');
    assert.equal(email.parameters.toEmail,"={{ $('Preparer rac').first().json.profil_mail }}");
  }
});
