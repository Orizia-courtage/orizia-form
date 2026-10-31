import { createHash } from 'node:crypto';

const WINDOW_MS = 15 * 60 * 1000;
const memory = globalThis.__oriziaAdminRateLimit ?? new Map();
globalThis.__oriziaAdminRateLimit = memory;

function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

function keyFor(request, scope) {
  // Do not store a visitor IP address in clear text in the settings table.
  const fingerprint = createHash('sha256').update(`${scope}:${clientIp(request)}`).digest('hex');
  return `admin-rate:${scope}:${fingerprint}`;
}

function nextAttempt(previous, limit, now, windowMs = WINDOW_MS) {
  const firstAt = Number(previous?.firstAt);
  const isCurrentWindow = Number.isFinite(firstAt) && now - firstAt < windowMs;
  const count = isCurrentWindow ? Number(previous?.count || 0) : 0;
  if (count >= limit) return { allowed: false, retryAfter: Math.ceil((windowMs - (now - firstAt)) / 1000) };
  return { allowed: true, value: { firstAt: isCurrentWindow ? firstAt : now, count: count + 1 } };
}

export { clientIp };

/** Toutes demandes confondues (rappel, recommandation, fin de simulation) : 3 par 24 h et par adresse IP. */
export const DAILY_SCOPE = 'demandes-jour';
export const DAILY_LIMIT = 3;
export const DAY_MS = 24 * 60 * 60 * 1000;
export const DAILY_MESSAGE = 'Vous avez déjà envoyé plusieurs demandes aujourd’hui. Cindy vous rappelle très vite, ou appelez directement le 07 77 25 97 06.';

/** Adresse IP et navigateur, transmis au CRM (conservés 7 jours, cf. politique de confidentialité). */
export function visitorOf(request) {
  return { ip: clientIp(request), userAgent: String(request.headers.get('user-agent') || '').slice(0, 400) };
}

// This is intentionally server-only. Each record is keyed by a one-way hash
// and expires logically after fifteen minutes. The small in-memory fallback
// still protects a running instance if Supabase is temporarily unavailable.
export async function takeAdminAttempt({ supabase, request, scope, limit, windowMs = WINDOW_MS }) {
  const key = keyFor(request, scope);
  const now = Date.now();
  try {
    const { data, error } = await supabase.from('site_settings').select('value').eq('key', key).maybeSingle();
    if (error) throw error;
    const result = nextAttempt(data?.value, limit, now, windowMs);
    if (!result.allowed) return result;
    const { error: writeError } = await supabase.from('site_settings').upsert({ key, value: result.value, updated_at: new Date(now).toISOString() });
    if (writeError) throw writeError;
    return result;
  } catch {
    const result = nextAttempt(memory.get(key), limit, now, windowMs);
    if (result.allowed) memory.set(key, result.value);
    return result;
  }
}
