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

function nextAttempt(previous, limit, now) {
  const firstAt = Number(previous?.firstAt);
  const isCurrentWindow = Number.isFinite(firstAt) && now - firstAt < WINDOW_MS;
  const count = isCurrentWindow ? Number(previous?.count || 0) : 0;
  if (count >= limit) return { allowed: false, retryAfter: Math.ceil((WINDOW_MS - (now - firstAt)) / 1000) };
  return { allowed: true, value: { firstAt: isCurrentWindow ? firstAt : now, count: count + 1 } };
}

// This is intentionally server-only. Each record is keyed by a one-way hash
// and expires logically after fifteen minutes. The small in-memory fallback
// still protects a running instance if Supabase is temporarily unavailable.
export async function takeAdminAttempt({ supabase, request, scope, limit }) {
  const key = keyFor(request, scope);
  const now = Date.now();
  try {
    const { data, error } = await supabase.from('site_settings').select('value').eq('key', key).maybeSingle();
    if (error) throw error;
    const result = nextAttempt(data?.value, limit, now);
    if (!result.allowed) return result;
    const { error: writeError } = await supabase.from('site_settings').upsert({ key, value: result.value, updated_at: new Date(now).toISOString() });
    if (writeError) throw writeError;
    return result;
  } catch {
    const result = nextAttempt(memory.get(key), limit, now);
    if (result.allowed) memory.set(key, result.value);
    return result;
  }
}
