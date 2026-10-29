import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canonicalPhone, compactName, isSamePerson, normalizeText, phoneVariants } from '../automation/n8n/rac-counter-service/identity.mjs';

test('searchName au format du CRM', () => {
  assert.equal(`${normalizeText(' Dupont ')} ${normalizeText('Jean-Pierre')}`, 'DUPONT JEAN-PIERRE');
  assert.equal(normalizeText('Hélène  Lefèvre'), 'HELENE LEFEVRE');
});

test('téléphone : 06 et +336 sont le même numéro', () => {
  assert.equal(canonicalPhone('06 12 34 56 78', '+33'), '+33612345678');
  assert.equal(canonicalPhone('0612345678', ''), '0612345678');
  assert.equal(canonicalPhone('+33 6 12 34 56 78', '+33'), '+33612345678');
  assert.equal(canonicalPhone('470 12 34 56', '+32'), '+32470123456');
  assert.deepEqual(phoneVariants('+33612345678').sort(), ['+33612345678', '0612345678'].sort());
});

test('même personne : accents, casse, tirets et inversion nom/prénom', () => {
  const client = { nom: 'Lefèvre', prenom: 'Jean-Pierre', date_naissance: '1980-05-02' };
  assert.equal(isSamePerson(client, { profil_nom: 'LEFEVRE', profil_prenom: 'jean pierre', profil_date_naissance: '1980-05-02' }), true);
  assert.equal(isSamePerson(client, { profil_nom: 'Jean Pierre', profil_prenom: 'Lefevre' }), true);
  assert.equal(compactName('Jean-Pierre'), 'jeanpierre');
});

test('e-mail partagé mais autre personne : pas de rattachement', () => {
  const client = { nom: 'Martin', prenom: 'Paul' };
  assert.equal(isSamePerson(client, { profil_nom: 'Martin', profil_prenom: 'Julie' }), false);
});

test('homonyme avec une autre date de naissance : pas de rattachement', () => {
  const client = { nom: 'Martin', prenom: 'Paul', date_naissance: '1975-01-01' };
  assert.equal(isSamePerson(client, { profil_nom: 'Martin', profil_prenom: 'Paul', profil_date_naissance: '1990-03-03' }), false);
  assert.equal(isSamePerson(client, { profil_nom: 'Martin', profil_prenom: 'Paul' }), true);
});
