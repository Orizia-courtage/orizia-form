// Disponibilités Cal.com (événement « rendez-vous » de Cindy), lues côté serveur.
// Utilisé par /api/cal/slots et directement par la page /liens.
const CAL_API_URL = 'https://api.cal.com/v2/slots';
export const CAL_TIME_ZONE = 'Europe/Paris';

export const isDateKey = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value || '');

/** Renvoie { slots } (objet jour → créneaux) ou { error, status }. */
export async function fetchCalSlots(start, end, { revalidate = 0 } = {}) {
  const apiKey = process.env.CAL_API_KEY;
  if (!apiKey) return { error: 'Configuration Cal.com indisponible.', status: 503 };
  if (!isDateKey(start) || !isDateKey(end)) return { error: 'Période invalide.', status: 400 };

  const params = new URLSearchParams({
    start,
    end,
    username: 'cindy-urbansky',
    eventTypeSlug: 'rendez-vous',
    timeZone: CAL_TIME_ZONE,
    format: 'time',
  });
  try {
    const response = await fetch(`${CAL_API_URL}?${params}`, {
      headers: { Authorization: `Bearer ${apiKey}`, 'cal-api-version': '2024-09-04' },
      signal: AbortSignal.timeout(10000),
      ...(revalidate ? { next: { revalidate } } : { cache: 'no-store' }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('Cal.com slots error', response.status, payload);
      return { error: 'Impossible de charger les disponibilités.', status: 502 };
    }
    return { slots: payload.data || {} };
  } catch (error) {
    console.error('Cal.com slots error', error?.message);
    return { error: 'Impossible de charger les disponibilités.', status: 502 };
  }
}
