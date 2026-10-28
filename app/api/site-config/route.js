import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { defaultSimulationSettings, resolveSimulationSettings } from '@/lib/simulationConfig';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { takeAdminAttempt } from '@/lib/admin-rate-limit';

export const dynamic = 'force-dynamic';
const SETTING_KEY = 'simulation-settings';
const NO_STORE = { 'Cache-Control': 'no-store' };

// Lecture publique : les simulateurs du site chargent ces valeurs.
export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ settings: defaultSimulationSettings, source: 'fallback' }, { headers: NO_STORE });
  const { data, error } = await supabase.from('site_settings').select('value, updated_at').eq('key', SETTING_KEY).maybeSingle();
  if (error) return NextResponse.json({ settings: defaultSimulationSettings, source: 'fallback' }, { headers: NO_STORE });
  return NextResponse.json({ settings: resolveSimulationSettings(data?.value), updatedAt: data?.updated_at ?? null, source: data ? 'database' : 'fallback' }, { headers: NO_STORE });
}

// Écriture réservée au CRM (crm.orizia-courtage.fr), serveur à serveur,
// authentifiée par le secret partagé CRM_INTEGRATION_SECRET.
function isCrm(request) {
  const expected = process.env.CRM_INTEGRATION_SECRET;
  const supplied = request.headers.get('x-crm-integration-secret');
  if (!expected || !supplied) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(supplied);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function PUT(request) {
  if (!process.env.CRM_INTEGRATION_SECRET) return NextResponse.json({ code: 'SECRET_MISSING', error: 'CRM_INTEGRATION_SECRET n’est pas configuré sur le site.' }, { status: 503, headers: NO_STORE });
  if (!isCrm(request)) return NextResponse.json({ code: 'UNAUTHORIZED', error: 'Accès non autorisé.' }, { status: 401, headers: NO_STORE });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ code: 'SUPABASE_MISSING', error: 'La base de réglages (Supabase) n’est pas configurée sur le site.' }, { status: 503, headers: NO_STORE });

  // Vérification de connexion depuis le CRM, sans rien écrire.
  if (new URL(request.url).searchParams.get('check') === '1') return NextResponse.json({ ok: true }, { headers: NO_STORE });

  const attempt = await takeAdminAttempt({ supabase, request, scope: 'save', limit: 15 });
  if (!attempt.allowed) return NextResponse.json({ error: 'Trop d’enregistrements successifs. Réessayez dans quelques minutes.' }, { status: 429, headers: { ...NO_STORE, 'Retry-After': String(attempt.retryAfter) } });

  const body = await request.json().catch(() => null);
  if (!body?.settings || typeof body.settings !== 'object' || Array.isArray(body.settings)) return NextResponse.json({ error: 'Réglages invalides.' }, { status: 400, headers: NO_STORE });
  const settings = resolveSimulationSettings(body.settings);
  const updatedAt = new Date().toISOString();
  const { error } = await supabase.from('site_settings').upsert({ key: SETTING_KEY, value: settings, updated_at: updatedAt });
  if (error) {
    console.error('Supabase site_settings save failed:', error);
    const tableMissing = error.code === '42P01';
    return NextResponse.json({
      code: tableMissing ? 'CONFIG_TABLE_MISSING' : 'CONFIG_WRITE_FAILED',
      error: tableMissing
        ? 'La table « site_settings » est introuvable dans Supabase.'
        : `L'enregistrement Supabase a échoué (${error.code || 'code inconnu'}) : ${error.message || 'détail non fourni'}`,
    }, { status: 500, headers: NO_STORE });
  }
  return NextResponse.json({ settings, updatedAt }, { headers: NO_STORE });
}
