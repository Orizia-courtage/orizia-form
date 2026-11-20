// Exemple représentatif affiché à côté de tout taux de crédit (widget de taux, simulateurs).
// Calcul à taux nominal fixe, mensualités constantes, hors assurance et frais.

const eur = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(n);
const pct = (n) => `${n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`;

export function creditExample({ capital, rate, years }) {
  const n = Math.round(years * 12);
  const t = rate / 100 / 12;
  const monthly = t > 0 ? (capital * t) / (1 - Math.pow(1 + t, -n)) : capital / n;
  const rounded = Math.round(monthly * 100) / 100;
  const total = Math.round(rounded * n * 100) / 100;
  return { capital, rate, years, n, monthly: rounded, total, interest: Math.round((total - capital) * 100) / 100 };
}

export function creditExampleText(params) {
  const e = creditExample(params);
  return `Exemple représentatif : pour un prêt de ${eur(e.capital)} sur ${e.years} ans au taux débiteur fixe de ${pct(e.rate)}, `
    + `vous remboursez ${e.n} mensualités de ${eur(e.monthly)}, hors assurance et frais. `
    + `Coût des intérêts : ${eur(e.interest)}. Montant total dû : ${eur(e.total)}. `
    + 'Le TAEG, qui intègre l’assurance emprunteur, les frais de dossier et de garantie, figure dans l’offre de prêt.';
}
