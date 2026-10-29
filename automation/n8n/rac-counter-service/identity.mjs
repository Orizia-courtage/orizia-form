// Normalisations identiques à celles du CRM (crm-orizia/lib/identity.js et lib/rappels.js),
// pour que les fiches créées ici soient retrouvées par la recherche et les doublons du CRM.
export function normalizedEmail(value) { return String(value || '').trim().toLowerCase(); }
export function normalizedPhone(value) { return String(value || '').replace(/[^+\d]/g, '').replace(/^00/, '+'); }
// Format CRM de searchName : sans accents, espaces réduits, en majuscules (« DUPONT JEAN-PIERRE »).
export function normalizeText(value) { return String(value || '').trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').toUpperCase(); }
// Forme compacte pour comparer deux noms (« Jean-Pierre » = « jean pierre » = « JEANPIERRE »).
export function compactName(value) { return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, ''); }

// Mêmes variantes que le CRM : 06… et +336… désignent le même numéro.
export function phoneVariants(value) {
  const digits = normalizedPhone(value);
  if (!digits) return [];
  const set = new Set([digits]);
  if (/^\+33\d{9}$/.test(digits)) set.add(`0${digits.slice(3)}`);
  if (/^0\d{9}$/.test(digits)) set.add(`+33${digits.slice(1)}`);
  return [...set];
}

// Numéro au format international quand l'indicatif est connu (profil_codetel), sinon tel quel.
export function canonicalPhone(tel, codetel) {
  const digits = normalizedPhone(tel);
  if (!digits) return '';
  if (digits.startsWith('+')) return digits;
  const code = normalizedPhone(codetel);
  if (/^\+\d{1,4}$/.test(code)) return `${code}${digits.replace(/^0/, '')}`;
  return digits;
}

export const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// Une fiche trouvée par e-mail ou téléphone n'est réutilisée que si c'est la même personne :
// même nom et prénom (accents, casse, tirets ignorés ; nom/prénom inversés acceptés)
// et pas deux dates de naissance différentes.
export function isSamePerson(client, payload) {
  const nom = compactName(payload.profil_nom); const prenom = compactName(payload.profil_prenom);
  const cNom = compactName(client.nom); const cPrenom = compactName(client.prenom);
  if (!nom || !prenom || !cNom || !cPrenom) return false;
  const sameName = (nom === cNom && prenom === cPrenom) || (nom === cPrenom && prenom === cNom);
  if (!sameName) return false;
  const birth = String(payload.profil_date_naissance || '');
  if (ISO_DATE.test(birth) && client.date_naissance && client.date_naissance !== birth) return false;
  return true;
}
