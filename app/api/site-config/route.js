import { NextResponse } from 'next/server';
import { defaultSimulationSettings, mergeSimulationSettings } from '@/lib/simulationConfig';
import { getSupabaseAdmin, requireAdmin } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';
const SETTING_KEY = 'simulation-settings';

export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ settings: defaultSimulationSettings, source: 'fallback' }, { headers: { 'Cache-Control': 'no-store' } });
  const { data, error } = await supabase.from('site_settings').select('value, updated_at').eq('key', SETTING_KEY).maybeSingle();
  if (error) return NextResponse.json({ settings: defaultSimulationSettings, source: 'fallback' }, { headers: { 'Cache-Control': 'no-store' } });
  return NextResponse.json({ settings: mergeSimulationSettings(defaultSimulationSettings, data?.value), updatedAt: data?.updated_at ?? null, source: data ? 'database' : 'fallback' }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function PUT(request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Accès non autorisé.' }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body?.settings || typeof body.settings !== 'object') return NextResponse.json({ error: 'Réglages invalides.' }, { status: 400 });
  const settings = mergeSimulationSettings(defaultSimulationSettings, body.settings);
  const { error } = await admin.supabase.from('site_settings').upsert({ key: SETTING_KEY, value: settings, updated_at: new Date().toISOString() });
  if (error) {
    console.error('Supabase site_settings save failed:', error);
    const tableMissing = error.code === '42P01';
    return NextResponse.json({
      code: tableMissing ? 'CONFIG_TABLE_MISSING' : 'CONFIG_WRITE_FAILED',
      error: tableMissing
        ? "La table « site_settings » est introuvable dans Supabase. Exécutez le script SQL de configuration."
        : "L'enregistrement Supabase a échoué. Vérifiez la clé secrète Vercel et la configuration de la table.",
    }, { status: 500 });
  }
  return NextResponse.json({ settings, updatedAt: new Date().toISOString() }, { headers: { 'Cache-Control': 'no-store' } });
}
