import { SILOS, THEMES, articleUrl, getPublishedArticles, listingHref, listingPath } from '@/lib/articles.mjs';

const BASE_URL = 'https://www.orizia-courtage.fr';

// Régénéré à chaque publication d'article (et au plus tard toutes les heures).
export const revalidate = 3600;

// Pages fixes du site : [adresse, fréquence, priorité].
// Pas de date de modification : une date « aujourd'hui » recalculée à chaque génération est fausse,
// et les moteurs cessent alors de se fier aux dates du plan du site (y compris celles des articles).
const STATIC_PAGES = [
  ['', 'monthly', 1.0],
  ['/qui-suis-je', 'monthly', 0.8],
  ['/contact', 'monthly', 0.7],
  ['/parrainage', 'monthly', 0.5],
  ['/actualites', 'weekly', 0.6],
  ['/blog', 'weekly', 0.6],
  ['/lexique', 'monthly', 0.5],

  ['/financer', 'monthly', 0.9],
  ['/financer/credit-immobilier', 'monthly', 0.9],
  ['/financer/regroupement-credits', 'monthly', 0.8],
  ['/financer/pret-personnel', 'monthly', 0.8],
  ['/financer/rachat-soulte', 'monthly', 0.8],

  ['/assurer', 'monthly', 0.9],
  ['/assurer/assurance-emprunteur', 'monthly', 0.9],
  ['/assurer/assurance-habitation', 'monthly', 0.8],
  ['/assurer/auto-moto', 'monthly', 0.8],

  ['/investir', 'monthly', 0.9],
  ['/investir/scpi', 'monthly', 0.9],
  ['/investir/per', 'monthly', 0.8],
  ['/investir/assurance-vie', 'monthly', 0.8],
  ['/investir/crowdfunding', 'monthly', 0.8],

  ['/mentions-legales', 'yearly', 0.3],
  ['/honoraires', 'yearly', 0.3],
  ['/confidentialite', 'yearly', 0.3],
];

export default async function sitemap() {
  const published = await getPublishedArticles();

  const articles = published.map((article) => ({
    url: articleUrl(article),
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: article.type === 'blog' ? 'monthly' : 'yearly',
    priority: article.pillar ? 0.8 : article.type === 'blog' ? 0.7 : 0.5,
  }));

  // Listes par univers et par thème : seulement celles qui ont des articles, datées de leur article le plus récent.
  const listings = ['blog', 'actualite'].flatMap((type) => {
    const ofType = published.filter((article) => article.type === type);
    if (!ofType.length) return [];
    const latest = (items) => new Date(items.map((article) => article.updatedAt || article.publishedAt).sort().at(-1));
    const entry = (url, items) => ({ url, lastModified: latest(items), changeFrequency: 'weekly', priority: 0.6 });
    const silos = Object.keys(SILOS)
      .map((key) => [key, ofType.filter((article) => article.silo === key)])
      .filter(([, items]) => items.length)
      .map(([key, items]) => entry(`${BASE_URL}${listingPath(type, key)}`, items));
    const themes = Object.entries(THEMES)
      .map(([key, theme]) => [key, theme, ofType.filter((article) => article.theme === key)])
      .filter(([, , items]) => items.length)
      .map(([key, theme, items]) => entry(`${BASE_URL}${listingHref(type, theme.silo, key)}`, items));
    return [...silos, entry(`${BASE_URL}${listingPath(type, 'all')}`, ofType), ...themes];
  });

  return [
    ...STATIC_PAGES.map(([path, changeFrequency, priority]) => ({ url: `${BASE_URL}${path}`, changeFrequency, priority })),
    ...listings,
    ...articles,
  ];
}
