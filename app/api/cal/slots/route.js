import { NextResponse } from 'next/server';

const CAL_API_URL = 'https://api.cal.com/v2/slots';
const TIME_ZONE = 'Europe/Paris';

function isDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value || '');
}

export async function GET(request) {
  const apiKey = process.env.CAL_API_KEY;
  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  if (!apiKey) {
    return NextResponse.json({ error: 'Configuration Cal.com indisponible.' }, { status: 503 });
  }
  if (!isDate(start) || !isDate(end)) {
    return NextResponse.json({ error: 'Période invalide.' }, { status: 400 });
  }

  const params = new URLSearchParams({
    start,
    end,
    username: 'cindy-urbansky',
    eventTypeSlug: 'rendez-vous',
    timeZone: TIME_ZONE,
    format: 'time',
  });
  const response = await fetch(`${CAL_API_URL}?${params}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'cal-api-version': '2024-09-04',
    },
    cache: 'no-store',
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error('Cal.com slots error', response.status, payload);
    return NextResponse.json({ error: 'Impossible de charger les disponibilités.' }, { status: 502 });
  }

  return NextResponse.json({ slots: payload.data || {} });
}
