import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';

// Image principale d'un article, envoyée par le CRM (déjà recadrée et compressée dans le navigateur).
// Stockée dans le bucket public « articles » de Supabase Storage. Protégé par CRM_INTEGRATION_SECRET.
export const dynamic = 'force-dynamic';
const NO_STORE = { 'Cache-Control': 'no-store' };
const BUCKET = 'articles';
const MAX_BYTES = 1_500_000;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const json = (body, status = 200) => NextResponse.json(body, { status, headers: NO_STORE });

function authorized(request) {
  const expected = process.env.CRM_INTEGRATION_SECRET;
  const supplied = request.headers.get('x-crm-integration-secret') || '';
  if (!expected) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(supplied);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function readJpeg(file) {
  if (!file || typeof file.arrayBuffer !== 'function') return null;
  if (file.size === 0 || file.size > MAX_BYTES) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  // Signature JPEG : on n'accepte rien d'autre, quel que soit le type annoncé.
  return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff ? buffer : null;
}

async function ensureBucket(supabase) {
  const { data } = await supabase.storage.getBucket(BUCKET);
  if (data) return null;
  const { error } = await supabase.storage.createBucket(BUCKET, { public: true, fileSizeLimit: MAX_BYTES, allowedMimeTypes: ['image/jpeg'] });
  return error && !/exist/i.test(error.message || '') ? error : null;
}

// Donne à une image déjà envoyée un nom de fichier qui la décrit (copie sous le nouveau nom).
// Corps JSON : { from: adresse publique actuelle, name: "pret-sans-apport-couple-chez-le-notaire" }.
async function renameImage(supabase, body) {
  const prefix = supabase.storage.from(BUCKET).getPublicUrl('').data.publicUrl;
  const from = typeof body?.from === 'string' && body.from.startsWith(prefix) ? decodeURIComponent(body.from.slice(prefix.length)) : '';
  const name = typeof body?.name === 'string' ? body.name : '';
  if (!/^[a-z0-9-]+\.jpg$/.test(from) || !/^[a-z0-9]+(?:-[a-z0-9]+){1,14}$/.test(name) || name.length > 140) return json({ code: 'INVALID', error: 'Nom de fichier invalide.' }, 400);
  // Si le nom est déjà pris, on ajoute un suffixe court.
  for (const target of [`${name}.jpg`, `${name}-${Date.now().toString(36).slice(-4)}.jpg`]) {
    if (target === from) return json({ url: body.from });
    const { error } = await supabase.storage.from(BUCKET).copy(from, target);
    if (!error) return json({ url: supabase.storage.from(BUCKET).getPublicUrl(target).data.publicUrl });
    if (!/exist|duplicate/i.test(error.message || '')) return json({ code: 'STORAGE_FAILED', error: `Renommage impossible : ${error.message}` }, 500);
  }
  return json({ code: 'STORAGE_FAILED', error: 'Renommage impossible : nom déjà utilisé.' }, 500);
}

export async function POST(request) {
  if (!authorized(request)) return json({ code: 'UNAUTHORIZED', error: 'Accès non autorisé.' }, 401);
  const supabase = getSupabaseAdmin();
  if (!supabase) return json({ code: 'SUPABASE_MISSING', error: 'Le stockage (Supabase) n’est pas configuré sur le site.' }, 503);
  if ((request.headers.get('content-type') || '').includes('application/json')) return renameImage(supabase, await request.json().catch(() => null));

  const form = await request.formData().catch(() => null);
  const slug = String(form?.get('slug') || '');
  if (!SLUG_RE.test(slug) || slug.length > 90) return json({ code: 'INVALID', error: 'Slug invalide.' }, 400);
  const [image, og] = await Promise.all([readJpeg(form.get('image')), readJpeg(form.get('og'))]);
  if (!image) return json({ code: 'INVALID', error: 'Image invalide : JPEG de 1,5 Mo maximum attendu.' }, 400);

  const bucketError = await ensureBucket(supabase);
  if (bucketError) return json({ code: 'STORAGE_FAILED', error: `Création du stockage impossible : ${bucketError.message}` }, 500);

  // Nom de fichier parlant (mot-clé du slug) + suffixe unique : jamais de cache périmé.
  const stamp = Date.now().toString(36);
  const upload = async (name, buffer) => {
    const { error } = await supabase.storage.from(BUCKET).upload(name, buffer, { contentType: 'image/jpeg', cacheControl: '31536000', upsert: false });
    if (error) throw new Error(error.message);
    return supabase.storage.from(BUCKET).getPublicUrl(name).data.publicUrl;
  };

  try {
    const url = await upload(`${slug}-${stamp}.jpg`, image);
    const ogUrl = og ? await upload(`${slug}-${stamp}-og.jpg`, og) : null;
    return json({ url, og: ogUrl });
  } catch (error) {
    return json({ code: 'STORAGE_FAILED', error: `Envoi de l’image impossible : ${error.message}` }, 500);
  }
}
