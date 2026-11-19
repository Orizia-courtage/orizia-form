// Nettoyage typographique des textes rédigés par les agents : aucun caractère invisible,
// aucun espace « spécial », apostrophes et tirets uniformisés, comme un texte tapé au clavier.
// Même fonction dans le CRM (lib/clean-text.js).

const INVISIBLE = /[­᠎​-‏‪-‮⁠-⁤⁦-⁩﻿]/g;
const SPACES = /[   -   　]/g;
const APOSTROPHES = /[‘’‛ʼ′]/g;
// Clés qui contiennent des adresses ou des identifiants : on n'y touche pas.
const KEEP = /^(url|og|path|slug|parentPath|type|status|silo|theme)$/;

export function cleanText(value) {
  if (typeof value !== 'string') return value;
  return value
    .normalize('NFC')
    .replace(INVISIBLE, '')
    .replace(SPACES, ' ')
    .replace(APOSTROPHES, "'")
    // Tiret long ou moyen entre deux espaces (incise) : simple tiret ; ailleurs (plages de nombres) : trait d'union.
    .replace(/ [–—―] /g, ' - ')
    .replace(/[–—―]/g, '-')
    // Espaces doublés par le remplacement, sauf en début de ligne (indentation Markdown).
    .replace(/(\S) {2,}(?=\S)/g, '$1 ');
}

/** Nettoie toutes les chaînes d'un article (texte, titres, FAQ, sources, légendes…). */
export function cleanArticle(value, key = '') {
  if (typeof value === 'string') return KEEP.test(key) ? value : cleanText(value);
  if (Array.isArray(value)) return value.map((item) => cleanArticle(item, key));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, cleanArticle(v, k)]));
  return value;
}
