import { NextResponse } from 'next/server';
import { webhookConfig, forwardWebhook } from '@/lib/automation-webhook.mjs';
import { readForm, verifyTurnstile, createCallbackProof, FormError } from '@/lib/form-protection.mjs';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const payload = await readForm(request);
    const { turnstileToken, ...data } = payload;
    delete data.rappelProof;
    await verifyTurnstile(turnstileToken, request, 'orizia_submit');
    const config = webhookConfig('submit');
    if (!await forwardWebhook(config, data)) {
      return NextResponse.json({ error: 'Envoi indisponible. Veuillez réessayer.' }, { status: 502 });
    }
    return NextResponse.json({ success: true, rappelProof: createCallbackProof(data) }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof FormError ? error.message : 'Envoi indisponible. Veuillez réessayer.' },
      { status: error instanceof FormError ? error.status : 503 });
  }
}
