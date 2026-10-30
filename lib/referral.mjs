// Page de recommandation /r/CODE : le code désigne la fiche du parrain dans le CRM.
// Résolution serveur à serveur, protégée par CRM_INTEGRATION_SECRET (jamais exposée au navigateur).

export const normalizeReferralCode = (value) => String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12);

export async function resolveReferral(code) {
  const value = normalizeReferralCode(code);
  const secret = process.env.CRM_INTEGRATION_SECRET;
  if (value.length < 5 || !secret) return null;
  const base = (process.env.CRM_URL || 'https://crm.orizia-courtage.fr').replace(/\/$/, '');
  try {
    const response = await fetch(`${base}/api/integrations/referral?code=${encodeURIComponent(value)}`, {
      headers: { 'x-crm-integration-secret': secret },
      signal: AbortSignal.timeout(6000),
      cache: 'no-store',
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data?.parrain?.prenom ? { code: value, parrain: data.parrain } : null;
  } catch {
    return null;
  }
}

/** « Julie M. » : prénom + initiale du nom, pour la page publique. */
export const shortName = (person) => `${person?.prenom || ''}${person?.nom ? ` ${person.nom.trim()[0]}.` : ''}`.trim();
