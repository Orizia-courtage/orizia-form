import { creditNotice } from '@/lib/articles.mjs';
import { SHARE_PAGES } from '@/lib/share.mjs';
import { renderPageShare } from '@/lib/social/visuals';

// Image de partage d'une page du site : /og/page/<clé>.jpg (1200 × 630).
// Générée au déploiement puis rafraîchie chaque jour (la mention légale du crédit change le 20 novembre 2026).
export const revalidate = 86400;
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(SHARE_PAGES).map((key) => ({ key: `${key}.jpg` }));

export async function GET(_request, { params }) {
  const { key } = await params;
  const page = SHARE_PAGES[String(key).replace(/\.jpg$/, '')];
  if (!page) return new Response('Not found', { status: 404 });
  const notice = page.credit ? creditNotice().split(' Aucun versement')[0] : page.notice;
  const jpeg = await renderPageShare(page, notice);
  return new Response(jpeg, { headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' } });
}
