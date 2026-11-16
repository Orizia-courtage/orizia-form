import { SILOS, THEMES, articleUrl, getPublishedArticles, listingHref, listingPath } from '@/lib/articles.mjs';

const BASE_URL = 'https://www.orizia-courtage.fr';

// Régénéré à chaque publication d'article (et au plus tard toutes les heures).
export const revalidate = 3600;

export default async function sitemap() {
  const articles = (await getPublishedArticles()).map((article) => ({
    url: articleUrl(article),
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: article.type === 'blog' ? 'monthly' : 'yearly',
    priority: article.pillar ? 0.8 : article.type === 'blog' ? 0.7 : 0.5,
  }));

  const published = await getPublishedArticles();
  const listings = ['blog', 'actualite'].flatMap((type) => {
    const ofType = published.filter((article) => article.type === type);
    const keys = Object.keys(SILOS).filter((key) => ofType.some((article) => article.silo === key));
    const lastModified = ofType.length ? new Date(ofType[0].updatedAt || ofType[0].publishedAt) : new Date();
    const silos = (ofType.length ? [...keys, 'all'] : []).map((key) => ({ url: `${BASE_URL}${listingPath(type, key)}`, lastModified, changeFrequency: 'weekly', priority: 0.6 }));
    // Pages de thème (première page) qui ont des articles.
    const themes = Object.entries(THEMES).filter(([key]) => ofType.some((article) => article.theme === key))
      .map(([key, theme]) => ({ url: `${BASE_URL}${listingHref(type, theme.silo, key)}`, lastModified, changeFrequency: 'weekly', priority: 0.6 }));
    return [...silos, ...themes];
  });

  return [
    // Pages principales
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/qui-suis-je`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/parrainage`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/actualites`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/lexique`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },

    // Financer
    {
      url: `${BASE_URL}/financer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/financer/credit-immobilier`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/financer/regroupement-credits`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/financer/pret-personnel`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/financer/rachat-soulte`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Assurer
    {
      url: `${BASE_URL}/assurer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/assurer/assurance-emprunteur`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/assurer/assurance-habitation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/assurer/auto-moto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Investir
    {
      url: `${BASE_URL}/investir`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/investir/scpi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/investir/per`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/investir/assurance-vie`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/investir/crowdfunding`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Pages légales
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },

    // Listes par univers (seulement celles qui ont des articles), puis articles du blog et actualités
    ...listings,
    ...articles,
  ];
}
