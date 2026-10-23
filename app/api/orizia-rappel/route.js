import { NextResponse } from 'next/server';
import { webhookConfig, forwardWebhook } from '@/lib/automation-webhook.mjs';
import { readForm, verifyTurnstile, verifyCallbackProof, callbackData, FormError } from '@/lib/form-protection.mjs';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const payload = await readForm(request);
    verifyCallbackProof(payload, payload.rappelProof);
    await verifyTurnstile(payload.turnstileToken, request, 'orizia_rappel');
    const data = { ...callbackData(payload), action: 'rappel_souhaite' };
    const crmUrl = process.env.CRM_RAPPEL_URL || 'https://crm.orizia-courtage.fr/api/integrations/rappel';
    const crmSecret = process.env.CRM_INTEGRATION_SECRET;
    if (!crmSecret) throw new Error('CRM non configuré.');
    const crmResponse = await fetch(crmUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-crm-integration-secret': crmSecret },
      body: JSON.stringify({ numero_dossier: data.numero_dossier }),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    });
    const crmResult = await crmResponse.json().catch(() => null);
    if (!crmResponse.ok || !crmResult?.ok) throw new Error('CRM indisponible.');
    const config = webhookConfig('rappel');
    if (!(await forwardWebhook(config, data)).ok) {
      return NextResponse.json({ error: 'Envoi indisponible. Veuillez réessayer.' }, { status: 502 });
    }
    return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof FormError ? error.message : 'Envoi indisponible. Veuillez réessayer.' },
      { status: error instanceof FormError ? error.status : 503 });
  }
}
