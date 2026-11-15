// Mention obligatoire sur toute communication portant sur un crédit.
// La réforme du crédit à la consommation (ordonnance n° 2025-880) remplace l'ancienne formule le 20 novembre 2026.
export const CREDIT_REFORM = Date.parse('2026-11-19T23:00:00Z'); // 20 novembre 2026, 0 h, heure de Paris

export const creditWarning = (now = Date.now()) => (now >= CREDIT_REFORM
  ? 'Attention ! Un crédit coûte de l’argent et doit être remboursé !'
  : 'Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.');
