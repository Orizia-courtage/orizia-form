import { NextResponse } from 'next/server';
import { webhookConfig, forwardWebhook } from '@/lib/automation-webhook.mjs';

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

async function verifyTurnstile(token, request) {
  if (!TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;

  const formData = new FormData();
  formData.append('secret', TURNSTILE_SECRET_KEY);
  formData.append('response', token);

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (ip) formData.append('remoteip', ip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  });
  const result = await response.json().catch(() => null);
  return Boolean(result?.success);
}

export async function POST(request) {
  let config;
  try {
    config = webhookConfig('submit');
  } catch {
    return NextResponse.json({ error: 'Webhook non configuré.' }, { status: 500 });
  }

  try {
    const payload = await request.json();
    const { turnstileToken, ...makePayload } = payload;

    const isHuman = await verifyTurnstile(turnstileToken, request);
    if (!isHuman) {
      return NextResponse.json({ error: 'Validation anti-robot échouée.' }, { status: 403 });
    }

    const success = await forwardWebhook(config, makePayload);

    if (!success) {
      return NextResponse.json({ error: 'Erreur webhook.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur orizia-form:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
