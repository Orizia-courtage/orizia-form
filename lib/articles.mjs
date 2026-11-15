import { creditWarning } from './credit-notice.mjs';
// Articles du blog et des actualités.
// Stockés dans Supabase (table site_settings, clé « article:<type>:<slug> », valeur JSON) :
// la publication depuis le CRM ne demande donc aucun redéploiement.
import { cache } from 'react';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { getSupabaseAdmin } from '@/lib/supabase-server.js';

export const BASE_URL = 'https://www.orizia-courtage.fr';
const KEY_PREFIX = 'article:';

export const ARTICLE_TYPES = {
  blog: { path: '/blog', label: 'Blog', schemaType: 'BlogPosting' },
  actualite: { path: '/actualites', label: 'Actualités', schemaType: 'NewsArticle' },
};

export const SILOS = {
  financer: {
    label: 'Financer',
    path: '/financer',
    intro: 'Crédit immobilier, regroupement de crédits, prêt personnel, rachat de soulte.',
    // Mention légale du crédit : calculée par creditNotice() (elle change le 20 novembre 2026).
    notice: 'credit',
  },
  assurer: {
    label: 'Assurer',
    path: '/assurer',
    intro: 'Assurance emprunteur, habitation, auto et moto.',
    notice: null,
  },
  investir: {
    label: 'Investir',
    path: '/investir',
    intro: 'Assurance vie, PER, SCPI, crowdfunding.',
    notice: 'Tout investissement comporte un risque de perte en capital. Les performances passées ne préjugent pas des performances futures.',
  },
};

// Pages de liste : /blog/financer, /blog/tous, /actualites/assurer, /actualites/toutes…
export const LISTINGS = {
  blog: { all: 'tous', one: 'guide', many: 'guides', allLabel: 'Tous les guides', latest: 'Les derniers guides', heading: 'Guides' },
  actualite: { all: 'toutes', one: 'actualité', many: 'actualités', allLabel: 'Toutes les actualités', latest: 'Les dernières actualités', heading: 'Actualités' },
};
// Ces adresses sont réservées aux listes : aucun article ne peut les prendre.
const RESERVED_SLUGS = ['financer', 'assurer', 'investir', 'tous', 'toutes'];
/** « financer » | « assurer » | « investir » | « all » si l'adresse est une liste, sinon null. */
export const listingKey = (type, slug) => (SILOS[slug] ? slug : slug === LISTINGS[type]?.all ? 'all' : null);
export const listingPath = (type, key) => `${ARTICLE_TYPES[type].path}/${key === 'all' ? LISTINGS[type].all : key}`;
export const countLabel = (type, count) => `${count} ${count > 1 ? LISTINGS[type].many : LISTINGS[type].one}`;

// Pages de services vers lesquelles les articles renvoient (page mère du cocon).
export const SITE_PAGES = {
  '/financer': 'Financer un projet',
  '/financer/credit-immobilier': 'Crédit immobilier',
  '/financer/regroupement-credits': 'Regroupement de crédits',
  '/financer/pret-personnel': 'Prêt personnel',
  '/financer/rachat-soulte': 'Rachat de soulte',
  '/assurer': 'Assurer ses biens et ses proches',
  '/assurer/assurance-emprunteur': 'Assurance emprunteur',
  '/assurer/assurance-habitation': 'Assurance habitation',
  '/assurer/auto-moto': 'Assurance auto et moto',
  '/investir': 'Investir et épargner',
  '/investir/assurance-vie': 'Assurance vie',
  '/investir/per': 'Plan d’épargne retraite (PER)',
  '/investir/scpi': 'SCPI',
  '/investir/crowdfunding': 'Crowdfunding immobilier',
  '/lexique': 'Lexique',
};

// Mention obligatoire sur toute communication portant sur un crédit (formule à jour : lib/credit-notice.mjs).
export function creditNotice(now = Date.now()) {
  const warning = creditWarning(now);
  return `${warning} Aucun versement, de quelque nature que ce soit, ne peut être exigé d’un particulier avant l’obtention d’un ou plusieurs prêts d’argent.`;
}
export const siloNotice = (silo) => (silo?.notice === 'credit' ? creditNotice() : silo?.notice || null);

export const AUTHOR = {
  name: 'Cindy Urbansky',
  jobTitle: 'Courtière en crédit et en assurance',
  url: `${BASE_URL}/qui-suis-je`,
  path: '/qui-suis-je',
  avatar: '/images/avatar-cindy.webp',
};

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const articleKey = (type, slug) => `${KEY_PREFIX}${type}:${slug}`;
export const articlePath = (article) => `${ARTICLE_TYPES[article.type].path}/${article.slug}`;
export const articleUrl = (article) => `${BASE_URL}${articlePath(article)}`;
export const absoluteUrl = (value) => (/^https?:\/\//.test(value) ? value : `${BASE_URL}${value.startsWith('/') ? '' : '/'}${value}`);

const text = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');
const isHttpUrl = (value) => typeof value === 'string' && /^https?:\/\/[^\s]+$/.test(value);
const isImageUrl = (value) => typeof value === 'string' && (/^https:\/\/[^\s]+$/.test(value) || /^\/[^\s/][^\s]*$/.test(value));
const isoDate = (value) => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toISOString() : null;
};

export function readingMinutes(body) {
  const words = body.replace(/[#>*_`|\-\[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / 220)) };
}

/**
 * Valide et normalise un article reçu du CRM.
 * Renvoie { article } ou { error } (message lisible).
 */
export function normalizeArticle(input, previous = null) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { error: 'Article invalide.' };

  const type = input.type;
  if (!ARTICLE_TYPES[type]) return { error: 'Type invalide : « blog » ou « actualite » attendu.' };

  const slug = text(input.slug, 90);
  if (!SLUG_RE.test(slug)) return { error: 'Slug invalide : minuscules, chiffres et tirets uniquement.' };
  if (RESERVED_SLUGS.includes(slug)) return { error: 'Cette adresse est réservée aux pages de liste : choisissez un autre slug.' };

  const title = text(input.title, 160);
  if (!title) return { error: 'Le titre (H1) est obligatoire.' };

  const body = typeof input.body === 'string' ? input.body.trim() : '';
  if (!body) return { error: 'Le contenu est obligatoire.' };
  if (body.length > 120_000) return { error: 'Contenu trop volumineux.' };

  const excerpt = text(input.excerpt, 320);
  const metaDescription = text(input.metaDescription, 200) || excerpt.slice(0, 160);
  if (!metaDescription) return { error: 'La meta description (ou le chapô) est obligatoire.' };

  const silo = SILOS[input.silo] ? input.silo : null;
  const parentPath = SITE_PAGES[input.parentPath] ? input.parentPath : (silo ? SILOS[silo].path : null);
  const status = input.status === 'published' ? 'published' : 'draft';
  const now = new Date().toISOString();
  const publishedAt = (previous?.status === 'published' && previous.publishedAt)
    || isoDate(input.publishedAt)
    || (status === 'published' ? now : null);

  let image = null;
  if (input.image && isImageUrl(input.image.url)) {
    image = {
      url: input.image.url,
      alt: text(input.image.alt, 200) || title,
      width: Number.isFinite(+input.image.width) && +input.image.width > 0 ? Math.round(+input.image.width) : 1200,
      height: Number.isFinite(+input.image.height) && +input.image.height > 0 ? Math.round(+input.image.height) : 675,
      credit: text(input.image.credit, 160) || null,
      caption: text(input.image.caption, 200) || null,
      // Version 1200 × 630 pour les partages (Open Graph), si elle existe.
      og: isImageUrl(input.image.og) ? input.image.og : null,
    };
  }

  const { words, minutes } = readingMinutes(body);

  return {
    article: {
      type,
      slug,
      status,
      title,
      metaTitle: text(input.metaTitle, 70) || title.slice(0, 70),
      metaDescription,
      excerpt: excerpt || metaDescription,
      silo,
      parentPath,
      pillar: input.pillar === true,
      keyword: text(input.keyword, 120) || null,
      keywords: Array.isArray(input.keywords) ? input.keywords.map((k) => text(k, 80)).filter(Boolean).slice(0, 12) : [],
      body,
      faq: Array.isArray(input.faq)
        ? input.faq.map((item) => ({ q: text(item?.q, 240), a: text(item?.a, 1500) })).filter((item) => item.q && item.a).slice(0, 12)
        : [],
      sources: Array.isArray(input.sources)
        ? input.sources.map((item) => ({ label: text(item?.label, 200), url: item?.url })).filter((item) => item.label && isHttpUrl(item.url)).slice(0, 15)
        : [],
      related: Array.isArray(input.related)
        ? input.related.filter((item) => ARTICLE_TYPES[item?.type] && SLUG_RE.test(item?.slug || '')).map((item) => ({ type: item.type, slug: item.slug })).slice(0, 6)
        : [],
      image,
      words,
      readMinutes: minutes,
      publishedAt,
      updatedAt: now,
    },
  };
}

function fromRow(row) {
  const value = row?.value;
  if (!value || typeof value !== 'object' || !ARTICLE_TYPES[value.type] || !value.slug) return null;
  return value;
}

// Tous les articles (brouillons compris), du plus récent au plus ancien.
// En cas d'indisponibilité de la base, le site affiche simplement « aucun article ».
export const getAllArticles = cache(async () => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase.from('site_settings').select('key, value').like('key', `${KEY_PREFIX}%`);
    if (error) {
      console.error('Lecture des articles impossible :', error.message);
      return [];
    }
    return (data || [])
      .map(fromRow)
      .filter(Boolean)
      .sort((a, b) => String(b.publishedAt || b.updatedAt).localeCompare(String(a.publishedAt || a.updatedAt)));
  } catch (error) {
    console.error('Lecture des articles impossible :', error);
    return [];
  }
});

export async function getPublishedArticles(type) {
  const all = await getAllArticles();
  return all.filter((article) => article.status === 'published' && (!type || article.type === type));
}

export async function getArticle(type, slug, { includeDrafts = false } = {}) {
  if (!ARTICLE_TYPES[type] || !SLUG_RE.test(slug || '')) return null;
  const all = await getAllArticles();
  const article = all.find((item) => item.type === type && item.slug === slug);
  if (!article) return null;
  return includeDrafts || article.status === 'published' ? article : null;
}

// Maillage du cocon : liens choisis à la publication, complétés par les articles du même silo.
export async function getRelatedArticles(article, max = 3) {
  const published = (await getPublishedArticles()).filter((item) => !(item.type === article.type && item.slug === article.slug));
  const chosen = (article.related || [])
    .map((ref) => published.find((item) => item.type === ref.type && item.slug === ref.slug))
    .filter(Boolean);
  const sameSilo = published.filter((item) => article.silo && item.silo === article.silo && !chosen.includes(item));
  // Une actualité renvoie d'abord vers les articles de fond ; un article de fond vers ses piliers.
  sameSilo.sort((a, b) => (b.type === 'blog') - (a.type === 'blog') || (b.pillar === true) - (a.pillar === true));
  return [...chosen, ...sameSilo].slice(0, max);
}

// Vue allégée (sans le contenu) pour les listes et pour le pipeline de rédaction.
export function summarize(article) {
  const { body, faq, sources, ...rest } = article;
  return { ...rest, path: articlePath(article), url: articleUrl(article) };
}

/* ── Écriture (réservée au CRM, via /api/articles) ─────────────────────── */

export async function saveArticle(article) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: 'La base (Supabase) n’est pas configurée sur le site.' };
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key: articleKey(article.type, article.slug), value: article, updated_at: article.updatedAt });
  return error ? { error: `Enregistrement impossible (${error.code || 'code inconnu'}) : ${error.message || ''}` } : { ok: true };
}

export async function deleteArticle(type, slug) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: 'La base (Supabase) n’est pas configurée sur le site.' };
  const key = articleKey(type, slug);
  const { error } = await supabase.from('site_settings').delete().eq('key', key);
  if (!error) return { ok: true };
  // La base peut interdire la suppression de lignes : on vide alors la ligne.
  // Une ligne sans type ni slug n'est plus un article (voir fromRow) et le slug redevient libre.
  const now = new Date().toISOString();
  const emptied = await supabase.from('site_settings').upsert({ key, value: { deleted: true, deletedAt: now }, updated_at: now });
  return emptied.error ? { error: `Suppression impossible : ${emptied.error.message || error.message || ''}` } : { ok: true };
}

/* ── Aperçu avant publication ──────────────────────────────────────────── */

export function previewToken(type, slug) {
  const secret = process.env.CRM_INTEGRATION_SECRET;
  if (!secret) return null;
  return createHmac('sha256', secret).update(`apercu:${type}:${slug}`).digest('hex');
}

export function isValidPreviewToken(type, slug, supplied) {
  const expected = previewToken(type, slug);
  if (!expected || typeof supplied !== 'string') return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(supplied);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const previewUrl = (article) => {
  const token = previewToken(article.type, article.slug);
  return token ? `${BASE_URL}/apercu/${article.type}/${article.slug}?t=${token}` : null;
};

export function formatDate(iso) {
  if (!iso) return '';
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' }).format(new Date(iso));
}
