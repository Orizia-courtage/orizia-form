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
    const config = webhookConfig('rappel');
    if (!await forwardWebhook(config, data)) {
      return NextResponse.json({ error: 'Envoi indisponible. Veuillez réessayer.' }, { status: 502 });
    }
    return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof FormError ? error.message : 'Envoi indisponible. Veuillez réessayer.' },
      { status: error instanceof FormError ? error.status : 503 });
  }
}
