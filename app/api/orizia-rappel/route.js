import { NextResponse } from 'next/server';

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_RAPPEL_URL;

export async function POST(request) {
  if (!MAKE_WEBHOOK_URL) {
    return NextResponse.json({ error: 'Webhook non configuré.' }, { status: 500 });
  }

  try {
    const payload = await request.json();

    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Erreur webhook.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur orizia-rappel:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
