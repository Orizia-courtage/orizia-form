import { COMPANY, CREDIT_STATUS } from '@/lib/company.mjs';
import { INDEXING } from '@/lib/indexing.mjs';
import { ARTICLE_TYPES, BASE_URL, SILOS, articleUrl, getPublishedArticles, themesOf } from '@/lib/articles.mjs';

// /llms.txt : présentation du site pour les assistants d'IA (ChatGPT, Claude, Perplexity…), au format
// Markdown proposé par llmstxt.org. Régénéré à chaque publication d'article (et au plus tard toutes les heures).
export const revalidate = 3600;

// Une ligne de lien : « - [Titre](adresse): description ». Les crochets du titre casseraient le lien.
const clean = (value) => String(value || '').replace(/\s+/g, ' ').trim();
const link = (title, url, note) => `- [${clean(title).replace(/[[\]]/g, '')}](${url})${note ? `: ${clean(note)}` : ''}`;

// Ce que couvre chaque page de services (les libellés viennent de THEMES).
const SERVICE_NOTES = {
  'credit-immobilier': 'achat de résidence principale, secondaire ou investissement locatif, simulateur de capacité d’emprunt.',
  'regroupement-credits': 'réunir plusieurs crédits en un seul ; la durée et le coût total peuvent augmenter.',
  'pret-personnel': 'financement d’une voiture, de travaux ou d’un projet personnel.',
  'rachat-soulte': 'racheter la part d’un bien après une séparation ou une succession.',
  'assurance-emprunteur': 'changement d’assurance de prêt (loi Lemoine), garanties et quotités.',
  'assurance-habitation': 'comparaison des garanties pour un propriétaire, un locataire ou un bailleur.',
  'auto-moto': 'comparaison des formules d’assurance auto et moto.',
  'assurance-vie': 'fonctionnement, fiscalité et simulateur ; risque de perte en capital sur les unités de compte.',
  per: 'plan d’épargne retraite : fonctionnement, fiscalité et modes de sortie.',
  scpi: 'fonctionnement, risques et fiscalité ; capital et revenus non garantis.',
  crowdfunding: 'fonctionnement et risques ; risque de perte en capital et d’illiquidité.',
};

export async function GET() {
  // Tant que l'indexation n'est pas activée, le site ne se présente pas non plus aux assistants d'IA.
  if (!INDEXING) return new Response('Not found', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

  const published = await getPublishedArticles();
  const byDate = (a, b) => String(b.updatedAt || b.publishedAt || '').localeCompare(String(a.updatedAt || a.publishedAt || ''));
  const articles = (type) => published
    .filter((article) => article.type === type)
    .sort((a, b) => (b.pillar === true) - (a.pillar === true) || byDate(a, b))
    .map((article) => link(article.title, articleUrl(article), article.excerpt || article.metaDescription));

  const services = Object.entries(SILOS).flatMap(([key, silo]) => [
    link(silo.label, `${BASE_URL}${silo.path}`, silo.intro),
    ...themesOf(key).map((theme) => link(theme.label, `${BASE_URL}${theme.path}`, SERVICE_NOTES[theme.key])),
  ]);

  const section = (title, lines) => (lines.length ? [`## ${title}`, '', ...lines, ''] : []);
  const { address } = COMPANY;

  const text = [
    `# ${COMPANY.legalName}`,
    '',
    `> ${COMPANY.legalName} est le cabinet de courtage de ${COMPANY.manager}, à ${address.city} (métropole lilloise, Nord). Elle accompagne les particuliers dans trois domaines : financer un projet (crédit immobilier, regroupement de crédits, prêt personnel, rachat de soulte), assurer (assurance emprunteur, habitation, auto et moto) et investir (assurance vie, PER, SCPI, crowdfunding immobilier).`,
    '',
    `- Interlocutrice unique : ${COMPANY.manager} exerce seule, il n’y a ni équipe ni plateforme téléphonique.`,
    `- Statut : ${CREDIT_STATUS}`,
    `- Société : ${COMPANY.legalForm}, ${COMPANY.rcs}.`,
    `- Adresse : ${COMPANY.addressInline}. Rendez-vous au cabinet, par téléphone ou en visioconférence.`,
    `- Contact : ${COMPANY.phone}, ${COMPANY.email}.`,
    '- Les articles et les simulateurs du site donnent une information générale. Ils ne constituent ni un conseil personnalisé ni une offre de crédit ou de placement.',
    '- Un crédit vous engage et doit être remboursé. Tout investissement comporte un risque de perte en capital ; les performances passées ne préjugent pas des performances futures.',
    '',
    ...section('Le cabinet', [
      link('Accueil', BASE_URL, 'présentation du cabinet et des trois univers.'),
      link(`Qui suis-je ? ${COMPANY.manager}`, `${BASE_URL}/qui-suis-je`, 'parcours, méthode et engagements de la courtière.'),
      link('Contact et prise de rendez-vous', `${BASE_URL}/contact`, 'agenda en ligne, téléphone et e-mail.'),
      link('Barème des honoraires', `${BASE_URL}/honoraires`, 'modes de rémunération pour le crédit, l’assurance et les placements.'),
      link('Programme de parrainage', `${BASE_URL}/parrainage`, 'recommander le cabinet à un proche.'),
    ]),
    ...section('Services', services),
    ...section('Guides du blog', articles('blog')),
    ...section('Actualités', articles('actualite')),
    ...section('Optional', [
      link('Lexique du crédit et de l’assurance', `${BASE_URL}/lexique`, 'définitions des termes courants.'),
      link('Tous les guides', `${BASE_URL}${ARTICLE_TYPES.blog.path}`),
      link('Toutes les actualités', `${BASE_URL}${ARTICLE_TYPES.actualite.path}`),
      link('Mentions légales', `${BASE_URL}/mentions-legales`, 'ORIAS, ACPR, médiation, assurance de responsabilité civile professionnelle.'),
      link('Politique de confidentialité', `${BASE_URL}/confidentialite`),
      link('Plan du site (XML)', `${BASE_URL}/sitemap.xml`),
    ]),
  ].join('\n');

  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
