import { NextResponse } from 'next/server';
import { webhookConfig, forwardWebhook } from '@/lib/automation-webhook.mjs';
import { readForm, verifyTurnstile, createCallbackProof, FormError } from '@/lib/form-protection.mjs';
import { defaultSimulationSettings, racOutcomeForSegment, resolveSimulationSettings } from '@/lib/simulationConfig';
import { getSupabaseAdmin } from '@/lib/supabase-server';

export const runtime = 'nodejs';

async function racSettings() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return defaultSimulationSettings;
  const { data } = await supabase.from('site_settings').select('value').eq('key', 'simulation-settings').maybeSingle();
  return resolveSimulationSettings(data?.value);
}

export async function POST(request) {
  try {
    // The dossier number is allocated atomically by n8n after validation.
    // It must not be required from the visitor's browser.
    const payload = await readForm(request, ['profil_prenom', 'profil_nom', 'profil_mail', 'profil_tel']);
    const { turnstileToken, ...data } = payload;
    delete data.rappelProof;
    await verifyTurnstile(turnstileToken, request, 'orizia_submit');
    // Do not take this decision from the browser: it drives the email branch
    // in n8n and is resolved from the protected administration settings.
    data.rac_outcome = racOutcomeForSegment(await racSettings(), data.Segment);
    const config = webhookConfig('submit');
    const upstream = await forwardWebhook(config, data);
    const numeroDossier = upstream.data?.numero_dossier;
    if (!upstream.ok || typeof numeroDossier !== 'string' || !/^DS\d{6,}$/.test(numeroDossier)) {
      return NextResponse.json({ error: 'Envoi indisponible. Veuillez réessayer.' }, { status: 502 });
    }
    data.numero_dossier = numeroDossier;
    return NextResponse.json({ success: true, numero_dossier: numeroDossier, rappelProof: createCallbackProof(data) }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof FormError ? error.message : 'Envoi indisponible. Veuillez réessayer.' },
      { status: error instanceof FormError ? error.status : 503 });
  }
}
