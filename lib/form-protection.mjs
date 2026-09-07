import { createHmac, timingSafeEqual } from 'node:crypto';

export class FormError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}
const CALLBACK_FIELDS = ['numero_dossier', 'date_creation', 'profil_prenom', 'profil_nom',
  'profil_tel', 'profil_codetel', 'profil_mail', 'profil_ville'];
const MAX_BYTES = 32 * 1024;
export function callbackData(payload) {
  return Object.fromEntries(CALLBACK_FIELDS.map(key => [key, payload[key] ?? '']));
}
export async function readForm(request) {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') throw new FormError('Format de demande invalide.', 415);
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) throw new FormError('Origine invalide.', 403);
  if (Number(request.headers.get('content-length')) > MAX_BYTES) throw new FormError('Demande trop volumineuse.', 413);
  const reader = request.body?.getReader();
  if (!reader) throw new FormError('Demande vide.');
  const chunks = [];
  let bytes = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BYTES) { await reader.cancel(); throw new FormError('Demande trop volumineuse.', 413); }
      chunks.push(Buffer.from(value));
    }
  } finally { reader.releaseLock(); }
  let payload;
  try { payload = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw new FormError('Demande JSON invalide.'); }
  if (!payload || Array.isArray(payload) || typeof payload !== 'object' || Object.keys(payload).length > 64) throw new FormError('Demande invalide.');
  for (const [key, value] of Object.entries(payload)) {
    const max = key === 'turnstileToken' || key === 'rappelProof' ? 2048 : 1000;
    if ((typeof value === 'string' && value.length > max) ||
        (typeof value === 'number' && !Number.isFinite(value)) ||
        (value !== null && !['string', 'boolean', 'number'].includes(typeof value))) throw new FormError('Champ invalide.');
  }
  for (const key of ['numero_dossier', 'profil_prenom', 'profil_nom', 'profil_mail', 'profil_tel']) {
    if (typeof payload[key] !== 'string' || !payload[key].trim() || payload[key].length > 300) throw new FormError('Coordonnées incomplètes.');
  }
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(payload.profil_mail)) throw new FormError('Email invalide.');
  return payload;
}
function secret(env) {
  if (!env.TURNSTILE_SECRET_KEY) throw new FormError('La validation anti-robot est temporairement indisponible.', 503);
  return env.TURNSTILE_SECRET_KEY;
}
export async function verifyTurnstile(token, request, action, env = process.env, fetcher = fetch) {
  const key = secret(env);
  if (typeof token !== 'string' || !token || token.length > 2048) throw new FormError('Veuillez valider la vérification anti-robot.', 403);
  let response, result;
  try {
    response = await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', body: new URLSearchParams({ secret: key, response: token }),
      signal: AbortSignal.timeout(8000), cache: 'no-store',
    });
    result = await response.json();
  } catch { throw new FormError('La vérification anti-robot est indisponible. Veuillez réessayer.', 503); }
  if (!response.ok) throw new FormError('La vérification anti-robot est indisponible.', 503);
  if (!result?.success || result.action !== action || result.hostname !== new URL(request.url).hostname) throw new FormError('Vérification anti-robot expirée ou invalide. Veuillez la renouveler.', 403);
}
// This proof binds the callback to a successful submission and unchanged contact
// data. It is not a one-time token: Turnstile checks single use, Vercel rate limits.
function signature(payload, expires, env) {
  return createHmac('sha256', secret(env)).update('orizia-callback-v1\n' + expires + '\n' + JSON.stringify(callbackData(payload))).digest('base64url');
}
export function createCallbackProof(payload, env = process.env, now = Date.now()) {
  const expires = Math.floor(now / 1000) + 7200;
  return `${expires}.${signature(payload, expires, env)}`;
}
export function verifyCallbackProof(payload, proof, env = process.env, now = Date.now()) {
  secret(env);
  if (typeof proof !== 'string' || !/^\d{10}\.[A-Za-z0-9_-]{43}$/.test(proof)) throw new FormError('Veuillez envoyer votre formulaire avant de demander un rappel.', 403);
  const [expires, supplied] = proof.split('.');
  if (Number(expires) < Math.floor(now / 1000) || Number(expires) > Math.floor(now / 1000) + 7200) throw new FormError('La demande de rappel a expiré. Veuillez nous contacter directement.', 403);
  if (!timingSafeEqual(Buffer.from(supplied), Buffer.from(signature(payload, expires, env)))) throw new FormError('Demande de rappel invalide.', 403);
}
