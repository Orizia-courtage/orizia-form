import { ARTICLE_TYPES, getArticle } from '@/lib/articles.mjs';
import { loadArticlePhoto, renderSocialVisual } from '@/lib/social/visuals';

// Image de partage d'un article : /og/article/<type>/<slug>.jpg (1200 × 630),
// même composition que le post Facebook / LinkedIn (photo principale, titre, auteur, temps de lecture).
// L'adresse porte la date de mise à jour (?v=…) : une modification donne une nouvelle image.
export const revalidate = 86400;

export async function GET(_request, { params }) {
  const { type, slug } = await params;
  if (!ARTICLE_TYPES[type]) return new Response('Not found', { status: 404 });
  const article = await getArticle(type, String(slug).replace(/\.jpg$/, ''));
  if (!article) return new Response('Not found', { status: 404 });
  const photo = await loadArticlePhoto(article.image?.url);
  const jpeg = await renderSocialVisual('og', article, photo);
  return new Response(jpeg, { headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=3600, s-maxage=604800, stale-while-revalidate=604800' } });
}
