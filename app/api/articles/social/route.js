import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getArticle } from '@/lib/articles.mjs';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { SOCIAL_FORMATS, renderSocialVisual } from '@/lib/social/visuals';

// Visuels pour les réseaux sociaux (carré, paysage, story), composés à partir de la photo principale
// d'un article puis rangés dans le stockage public. Appelé par le CRM, protégé par CRM_INTEGRATION_SECRET.
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
const NO_STORE = { 'Cache-Control': 'no-store' };
const BUCKET = 'articles';
const json = (body, status = 200) => NextResponse.json(body, { status, headers: NO_STORE });

function authorized(request) {
  const expected = process.env.CRM_INTEGRATION_SECRET;
  const supplied = request.headers.get('x-crm-integration-secret') || '';
  if (!expected) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(supplied);
  return a.length === b.length && timingSafeEqual(a, b);
}

// La photo ne peut venir que du stockage du site : aucune autre adresse n'est téléchargée.
async function loadPhoto(supabase, url) {
  const prefix = supabase.storage.from(BUCKET).getPublicUrl('').data.publicUrl;
  if (typeof url !== 'string' || !url.startsWith(prefix)) return null;
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) }).catch(() => null);
  return response?.ok ? Buffer.from(await response.arrayBuffer()) : null;
}

export async function POST(request) {
  if (!authorized(request)) return json({ code: 'UNAUTHORIZED', error: 'Accès non autorisé.' }, 401);
  const supabase = getSupabaseAdmin();
  if (!supabase) return json({ code: 'SUPABASE_MISSING', error: 'Le stockage (Supabase) n’est pas configuré sur le site.' }, 503);
  const body = await request.json().catch(() => null);
  const article = await getArticle(String(body?.type || ''), String(body?.slug || ''), { includeDrafts: true });
  if (!article) return json({ code: 'NOT_FOUND', error: 'Article introuvable.' }, 404);

  try {
    const photo = await loadPhoto(supabase, article.image?.url);
    const stamp = Date.now().toString(36);
    const entries = await Promise.all(Object.entries(SOCIAL_FORMATS).map(async ([format, { suffix }]) => {
      const jpeg = await renderSocialVisual(format, article, photo);
      const name = `${article.slug}-${suffix}-${stamp}.jpg`;
      const { error } = await supabase.storage.from(BUCKET).upload(name, jpeg, { contentType: 'image/jpeg', cacheControl: '31536000', upsert: false });
      if (error) throw new Error(error.message);
      return [format, supabase.storage.from(BUCKET).getPublicUrl(name).data.publicUrl];
    }));
    return json({ visuals: Object.fromEntries(entries), hasPhoto: Boolean(photo) });
  } catch (error) {
    console.error('[articles/social] visuels impossibles :', error);
    return json({ code: 'VISUAL_FAILED', error: `Création des visuels impossible : ${error.message}` }, 500);
  }
}
