import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { deleteArticle } from '@/lib/articles.mjs';

const KEY_PREFIX_ARTICLES = 'article:';

// TEMPORAIRE (remise à zéro du blog demandée le 16 novembre 2026) : retiré juste après usage.
// GET  → sauvegarde : tous les articles (texte complet) et la liste des fichiers du stockage.
// POST { confirm: "SUPPRIMER-TOUS-LES-ARTICLES" } → supprime tous les articles et toutes leurs images.
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
const BUCKET = 'articles';
const CONFIRM = 'SUPPRIMER-TOUS-LES-ARTICLES';
const json = (body, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

function authorized(request) {
  const expected = process.env.CRM_INTEGRATION_SECRET;
  const supplied = request.headers.get('x-crm-integration-secret') || '';
  if (!expected) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(supplied);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function rows(supabase) {
  const { data, error } = await supabase.from('site_settings').select('key, value').like('key', `${KEY_PREFIX_ARTICLES}%`);
  if (error) throw new Error(error.message);
  return (data || []).filter((row) => row.value?.type && row.value?.slug);
}

async function files(supabase) {
  const list = [];
  for (let offset = 0; offset < 10000; offset += 1000) {
    const { data, error } = await supabase.storage.from(BUCKET).list('', { limit: 1000, offset });
    if (error) throw new Error(error.message);
    list.push(...(data || []).filter((item) => item.id).map((item) => item.name));
    if (!data || data.length < 1000) break;
  }
  return list;
}

export async function GET(request) {
  if (!authorized(request)) return json({ error: 'Accès non autorisé.' }, 401);
  const supabase = getSupabaseAdmin();
  const [articles, images] = await Promise.all([rows(supabase), files(supabase)]);
  return json({ articles: articles.map((row) => row.value), images });
}

export async function POST(request) {
  if (!authorized(request)) return json({ error: 'Accès non autorisé.' }, 401);
  const body = await request.json().catch(() => null);
  if (body?.confirm !== CONFIRM) return json({ error: 'Confirmation manquante.' }, 400);
  const supabase = getSupabaseAdmin();
  const articles = await rows(supabase);
  const deleted = [];
  for (const row of articles) {
    const removed = await deleteArticle(row.value.type, row.value.slug);
    deleted.push({ type: row.value.type, slug: row.value.slug, ok: !removed.error, error: removed.error || '' });
  }
  const names = await files(supabase);
  let removedImages = 0;
  for (let i = 0; i < names.length; i += 100) {
    const { data, error } = await supabase.storage.from(BUCKET).remove(names.slice(i, i + 100));
    if (error) return json({ deleted, removedImages, error: `Images : ${error.message}` }, 500);
    removedImages += (data || []).length;
  }
  revalidatePath('/', 'layout');
  revalidatePath('/sitemap.xml');
  return json({ deleted, removedImages, remaining: (await rows(supabase)).length });
}
