import { notifySearchEngines } from '@/lib/indexnow.mjs';
import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  ARTICLE_TYPES, BASE_URL, SILOS, SITE_PAGES, THEMES, getFullArticles,
  articleUrl, listingHref, listingPath, deleteArticle, getAllArticles, getArticle,
  normalizeArticle, previewUrl, saveArticle, summarize,
} from '@/lib/articles.mjs';

// Publication des articles du blog et des actualités.
// Réservé au CRM / au pipeline de rédaction (serveur à serveur),
// authentifié par le secret partagé CRM_INTEGRATION_SECRET.
export const dynamic = 'force-dynamic';
const NO_STORE = { 'Cache-Control': 'no-store' };
const json = (body, status = 200) => NextResponse.json(body, { status, headers: NO_STORE });

function guard(request) {
  const expected = process.env.CRM_INTEGRATION_SECRET;
  if (!expected) return json({ code: 'SECRET_MISSING', error: 'CRM_INTEGRATION_SECRET n’est pas configuré sur le site.' }, 503);
  const supplied = request.headers.get('x-crm-integration-secret') || '';
  const a = Buffer.from(expected);
  const b = Buffer.from(supplied);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return json({ code: 'UNAUTHORIZED', error: 'Accès non autorisé.' }, 401);
  return null;
}

// Une publication touche beaucoup de pages (listes par univers, « À lire aussi », sitemap) :
// on rafraîchit tout le site, qui est petit, plutôt que de risquer une page restée ancienne.
function refresh(article) {
  revalidatePath('/', 'layout');
  revalidatePath('/sitemap.xml');
  // Moteurs prévenus (seulement quand l'indexation est activée) : l'article, sa liste et la page du blog.
  if (article) {
    const section = ARTICLE_TYPES[article.type]?.path || '/blog';
    notifySearchEngines([articleUrl(article), `${BASE_URL}${section}`, ...(SILOS[article.silo] ? [`${BASE_URL}${listingPath(article.type, article.silo)}`] : []), ...(article.theme && SILOS[article.silo] ? [`${BASE_URL}${listingHref(article.type, article.silo, article.theme)}`] : [])]);
  }
}

// Liste de tous les articles (brouillons compris) + structure du site, pour le maillage du cocon.
// ?type=blog&slug=… renvoie un article complet.
export async function GET(request) {
  const denied = guard(request);
  if (denied) return denied;
  const params = new URL(request.url).searchParams;
  const type = params.get('type');
  const slug = params.get('slug');
  if (type && slug) {
    const article = await getArticle(type, slug, { includeDrafts: true });
    if (!article) return json({ error: 'Article introuvable.' }, 404);
    return json({ article, url: articleUrl(article), previewUrl: previewUrl(article) });
  }
  // ?bodies=blog:slug-a,actualite:slug-b : ces articles avec leur texte (maillage proposé par le pipeline).
  if (params.get('bodies')) {
    const refs = params.get('bodies').split(',').map((ref) => { const [refType, refSlug] = ref.split(':'); return { type: refType, slug: refSlug }; });
    const full = await getFullArticles(refs);
    return json({ articles: full.map((article) => ({ ...summarize(article), body: article.body })) });
  }
  // ?full=1 (ancien format) : tous les articles avec leur texte. À éviter : lourd quand le blog grandit.
  const full = params.get('full') === '1';
  const light = (await getAllArticles()).filter((article) => !type || article.type === type);
  const bodies = full ? new Map((await getFullArticles(light.slice(0, 20))).map((article) => [`${article.type}:${article.slug}`, article.body])) : null;
  const articles = light.map((article) => (bodies ? { ...summarize(article), body: bodies.get(`${article.type}:${article.slug}`) || '' } : summarize(article)));
  const silos = Object.fromEntries(Object.entries(SILOS).map(([key, silo]) => [key, { label: silo.label, path: silo.path }]));
  const themes = Object.fromEntries(Object.entries(THEMES).map(([key, theme]) => [key, { label: theme.label, silo: theme.silo, path: theme.path }]));
  return json({ articles, silos, themes, pages: SITE_PAGES });
}

// Crée ou met à jour un article. status « draft » = visible seulement par le lien d'aperçu ;
// status « published » = en ligne immédiatement.
export async function PUT(request) {
  const denied = guard(request);
  if (denied) return denied;
  const body = await request.json().catch(() => null);
  const input = body?.article;
  const previous = input?.type && input?.slug ? await getArticle(input.type, input.slug, { includeDrafts: true }) : null;
  const { article, error } = normalizeArticle(input, previous);
  if (error) return json({ code: 'INVALID', error }, 400);
  const saved = await saveArticle(article);
  if (saved.error) return json({ code: 'WRITE_FAILED', error: saved.error }, 500);
  refresh(article);
  return json({ article: summarize(article), url: articleUrl(article), previewUrl: previewUrl(article) });
}

export async function DELETE(request) {
  const denied = guard(request);
  if (denied) return denied;
  const params = new URL(request.url).searchParams;
  const article = await getArticle(params.get('type'), params.get('slug'), { includeDrafts: true });
  if (!article) return json({ error: 'Article introuvable.' }, 404);
  const removed = await deleteArticle(article.type, article.slug);
  if (removed.error) return json({ code: 'DELETE_FAILED', error: removed.error }, 500);
  refresh(article);
  return json({ ok: true });
}
