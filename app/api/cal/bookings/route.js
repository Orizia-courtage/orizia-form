import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { takeAdminAttempt } from '@/lib/admin-rate-limit';

export const runtime = 'nodejs';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  // Refuse les requêtes envoyées depuis un autre site (CSRF / abus).
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Origine invalide.' }, { status: 403 });
  }

  const apiKey = process.env.CAL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Configuration Cal.com indisponible.' }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const { start, name, email, phone } = body || {};
  if (typeof start !== 'string' || Number.isNaN(Date.parse(start)) || typeof name !== 'string' || !name.trim() || !EMAIL.test(email || '')) {
    return NextResponse.json({ error: 'Veuillez renseigner un créneau, votre nom et une adresse e-mail valide.' }, { status: 400 });
  }

  // Limite les réservations : 5 par 15 minutes et par adresse IP (anti-spam d'agenda).
  const attempt = await takeAdminAttempt({ supabase: getSupabaseAdmin(), request, scope: 'cal', limit: 5 });
  if (!attempt.allowed) {
    return NextResponse.json({ error: 'Trop de demandes de rendez-vous. Réessayez dans quelques minutes.' }, { status: 429 });
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
