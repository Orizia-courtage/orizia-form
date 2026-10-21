import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../automation/n8n/rac-internal-email.js', import.meta.url), 'utf8');
const render = new Function('p', source);
test('Internal email contains the dossier summary and escapes submitted data', () => {
  const html = render({ profil_prenom: '<img src=x>', profil_nom: 'Test', numero_dossier: 'RAC-1', potential: 'PETIT POTENTIEL', routingSegment: 'BDF', profil_mail: 'test@example.invalid' });
  assert.ok(html.includes('&lt;img src=x&gt;'));
  assert.ok(!html.includes('<img src=x>'));
  for (const value of ['NOUVEAU DOSSIER RAC', 'Projet et situation', 'Crédits et besoins', 'Consentements', 'Segment :']) assert.ok(html.includes(value), value);
});
