import { NextResponse } from 'next/server';
import { webhookConfig, forwardWebhook } from '@/lib/automation-webhook.mjs';


export async function POST(request) {
  let config;
  try {
    config = webhookConfig('rappel');
  } catch {
    return NextResponse.json({ error: 'Webhook non configuré.' }, { status: 500 });
  }

  try {
    const payload = await request.json();

    const success = await forwardWebhook(config, payload);

    if (!success) {
      return NextResponse.json({ error: 'Erreur webhook.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur orizia-rappel:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
