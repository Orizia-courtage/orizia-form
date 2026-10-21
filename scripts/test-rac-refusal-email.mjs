import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../automation/n8n/rac-refusal-email.js', import.meta.url), 'utf8');
const render = new Function('p', source);
test('Refusal email is neutral, safe and gives a path to retry', () => {
  const html = render({ profil_prenom: '<img src=x>', numero_dossier: 'TEST<&' });
  assert.ok(html.includes('&lt;img src=x&gt;'));
  assert.ok(!html.includes('<img src=x>'));
  for (const value of ['changement de situation', 'refaire le point', 'cindy-signature-banner.jpg', 'cal.com/cindy-urbansky/rendez-vous', 'cindy-urbansky.vcf']) assert.ok(html.includes(value), value);
  assert.ok(!html.toLowerCase().includes('raison du refus'));
});
