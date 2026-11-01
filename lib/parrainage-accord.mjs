import { createHmac, timingSafeEqual } from 'node:crypto';

// Parrainage : lien signé « Oui, je souhaite être rappelé(e) » envoyé au proche recommandé,
// et appels serveur à serveur vers le CRM (secret partagé, jamais exposé au navigateur).

const SITE_URL = 'https://www.orizia-courtage.fr';
const crmBase = () => (process.env.CRM_URL || 'https://crm.orizia-courtage.fr').replace(/\/$/, '');

function sign(id, env = process.env) {
  const secret = env.CRM_INTEGRATION_SECRET;
  if (!secret) throw new Error('crm_secret_missing');
  return createHmac('sha256', secret).update(`orizia-accord-v1\n${id}`).digest('base64url').slice(0, 32);
}

export function accordLink(id, env = process.env) {
  return `${SITE_URL}/parrainage/accord?id=${encodeURIComponent(id)}&t=${sign(id, env)}`;
}

export function verifyAccord(id, token, env = process.env) {
  if (typeof id !== 'string' || !/^[a-f0-9]{24}$/.test(id) || typeof token !== 'string' || token.length !== 32) return false;
  const expected = Buffer.from(sign(id, env));
  const supplied = Buffer.from(token);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

async function crm(path, body) {
  const secret = process.env.CRM_INTEGRATION_SECRET;
  if (!secret) return { status: 503, data: null };
  try {
    const response = await fetch(`${crmBase()}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-crm-integration-secret': secret },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(12000),
      cache: 'no-store',
    });
    return { status: response.status, data: await response.json().catch(() => null) };
  } catch (error) {
    console.error('CRM', path, error?.message);
    return { status: 503, data: null };
  }
}

export const confirmAccord = (id, creneau) => crm('/api/integrations/parrainage/accord', { id, creneau });
export const resendCard = (email, telephone) => crm('/api/integrations/referral/carte', { email, telephone });
