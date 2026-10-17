import { NextResponse } from 'next/server';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const apiKey = process.env.CAL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Configuration Cal.com indisponible.' }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const { start, name, email, phone } = body || {};
  if (typeof start !== 'string' || Number.isNaN(Date.parse(start)) || typeof name !== 'string' || !name.trim() || !EMAIL.test(email || '')) {
    return NextResponse.json({ error: 'Veuillez renseigner un créneau, votre nom et une adresse e-mail valide.' }, { status: 400 });
  }

  const response = await fetch('https://api.cal.com/v2/bookings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'cal-api-version': '2026-02-25',
    },
    body: JSON.stringify({
      start: new Date(start).toISOString(),
      eventTypeSlug: 'rendez-vous',
      username: 'cindy-urbansky',
      attendee: {
        name: name.trim(),
        email: email.trim(),
        phoneNumber: typeof phone === 'string' && phone.trim() ? phone.trim() : undefined,
        timeZone: 'Europe/Paris',
        language: 'fr',
      },
      metadata: { source: 'orizia-courtage.fr' },
    }),
    cache: 'no-store',
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error('Cal.com booking error', response.status, payload);
    return NextResponse.json({ error: 'Ce créneau n’est plus disponible. Merci d’en choisir un autre.' }, { status: 409 });
  }

  return NextResponse.json({ booking: payload.data || {} }, { status: 201 });
}
