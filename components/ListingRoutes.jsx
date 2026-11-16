import { notFound } from 'next/navigation';
import { ArticleListing, listingItems, listingMetadata, pageCount } from '@/components/ArticleHub';
import { LISTINGS, SILOS, THEMES, getPublishedArticles, listingKey } from '@/lib/articles.mjs';

// Pages de liste à deux ou trois niveaux, communes au blog et aux actualités :
//   /blog/financer/2                    → univers, page 2
//   /blog/financer/credit-immobilier    → thème, page 1
//   /blog/financer/credit-immobilier/2  → thème, page 2
//   /blog/tous/3                        → tous les guides, page 3

const isPage = (value) => /^[2-9]$|^[1-9]\d+$/.test(String(value || ''));

/** Liste demandée par l'adresse, ou null si l'adresse ne correspond à aucune liste. */
export function resolveListing(type, slug, sub, pageSegment) {
  const silo = listingKey(type, slug);
  if (!silo) return null;
  if (pageSegment === undefined && isPage(sub)) return { silo, theme: null, page: Number(sub) };
  const theme = THEMES[sub];
  if (!theme || silo === 'all' || theme.silo !== silo) return null;
  if (pageSegment === undefined) return { silo, theme: sub, page: 1 };
  return isPage(pageSegment) ? { silo, theme: sub, page: Number(pageSegment) } : null;
}

/** Listes à générer d'avance (les autres sont générées à la première visite). */
export async function listingParams(type, depth) {
  const articles = await getPublishedArticles(type);
  const params = [];
  for (const silo of [...Object.keys(SILOS), 'all']) {
    const slug = silo === 'all' ? LISTINGS[type].all : silo;
    if (depth === 2) {
      const pages = pageCount(listingItems(type, { silo }, articles).length);
      for (let page = 2; page <= pages; page += 1) params.push({ slug, sub: String(page) });
    }
    if (silo === 'all') continue;
    for (const [key, theme] of Object.entries(THEMES)) {
      if (theme.silo !== silo) continue;
      const count = listingItems(type, { silo, theme: key }, articles).length;
      if (!count) continue;
      if (depth === 2) params.push({ slug, sub: key });
      else for (let page = 2; page <= pageCount(count); page += 1) params.push({ slug, sub: key, page: String(page) });
    }
  }
  return params;
}

export async function listingRouteMetadata(type, { slug, sub, page }) {
  const listing = resolveListing(type, slug, sub, page);
  if (!listing) return {};
  const articles = await getPublishedArticles(type);
  return listingMetadata(type, listing, listingItems(type, listing, articles).length);
}

export async function ListingRoute({ type, slug, sub, page }) {
  const listing = resolveListing(type, slug, sub, page);
  if (!listing) notFound();
  const articles = await getPublishedArticles(type);
  // Page au-delà de la dernière (ou thème vide au-delà de la page 1) : introuvable.
  if (listing.page > pageCount(listingItems(type, listing, articles).length)) notFound();
  return <ArticleListing type={type} listing={listing} articles={articles} />;
}
