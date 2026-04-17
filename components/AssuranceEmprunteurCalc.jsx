'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Taux moyens banque et Orizia par tranche d'âge
const TAUX_PAR_AGE = [
  { label: '20–29 ans', tauxBanque: 0.0023, tauxOrizia: 0.0008, gain: 65 },
  { label: '30–35 ans', tauxBanque: 0.0030, tauxOrizia: 0.0012, gain: 60 },
  { label: '36–40 ans', tauxBanque: 0.0032, tauxOrizia: 0.0014, gain: 56 },
  { label: '41–45 ans', tauxBanque: 0.0038, tauxOrizia: 0.0020, gain: 47 },
  { label: '46–50 ans', tauxBanque: 0.0040, tauxOrizia: 0.0022, gain: 45 },
  { label: '51–55 ans', tauxBanque: 0.0044, tauxOrizia: 0.0026, gain: 41 },
  { label: '56–60 ans', tauxBanque: 0.0048, tauxOrizia: 0.0030, gain: 37 },
];

function fmt(n) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

export default function AssuranceEmprunteurCalc() {
  const [ageIdx, setAgeIdx] = useState(2); // 36–40 ans par défaut
  const [capital, setCapital] = useState(200000);
  const [duree, setDuree] = useState(20);

  const tranche = TAUX_PAR_AGE[ageIdx];

  const result = useMemo(() => {
    const coutBanque = capital * tranche.tauxBanque * duree;
    const coutOrizia = capital * tranche.tauxOrizia * duree;
    const economie = coutBanque - coutOrizia;
    const mensuelBanque = (capital * tranche.tauxBanque) / 12;
    const mensuelOrizia = (capital * tranche.tauxOrizia) / 12;
    return { coutBanque, coutOrizia, economie, mensuelBanque, mensuelOrizia };
  }, [ageIdx, capital, duree, tranche]);

  return (
    <div className="aec-wrap">

      {/* ── INPUTS ── */}
      <div className="aec-inputs">
        <div className="aec-inputs-title">Votre situation</div>

        {/* Âge */}
        <div className="aec-field">
          <div className="aec-field-header">
            <label>Votre tranche d'âge</label>
            <span className="aec-field-value">{tranche.label}</span>
          </div>
          <div className="aec-age-grid">
            {TAUX_PAR_AGE.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setAgeIdx(i)}
                className={`aec-age-btn${ageIdx === i ? ' aec-age-btn--active' : ''}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Capital */}
        <div className="aec-field">
          <div className="aec-field-header">
            <label>Capital restant dû</label>
            <span className="aec-field-value">{fmt(capital)}</span>
          </div>
          <input
            type="range"
            min={50000} max={600000} step={10000}
            value={capital}
            onChange={e => setCapital(+e.target.value)}
            className="aec-slider"
            style={{ '--pct': `${((capital - 50000) / 550000) * 100}%` }}
          />
          <div className="aec-slider-labels"><span>50 000€</span><span>600 000€</span></div>
        </div>

        {/* Durée */}
        <div className="aec-field">
          <div className="aec-field-header">
            <label>Durée restante</label>
            <span className="aec-field-value">{duree} ans</span>
          </div>
          <input
            type="range"
            min={5} max={30} step={1}
            value={duree}
            onChange={e => setDuree(+e.target.value)}
            className="aec-slider"
            style={{ '--pct': `${((duree - 5) / 25) * 100}%` }}
          />
          <div className="aec-slider-labels"><span>5 ans</span><span>30 ans</span></div>
        </div>

        <div className="aec-note">
          💡 Taux indicatifs basés sur des profils standards. Je calcule votre taux exact en rendez-vous selon votre état de santé et votre dossier.
        </div>
      </div>

      {/* ── RÉSULTATS ── */}
      <div className="aec-results">
        <div className="aec-results-title">Votre économie estimée</div>

        {/* Économie principale */}
        <div className="aec-result-hero">
          <span className="aec-result-label">Vous économisez</span>
          <span className="aec-result-big">{fmt(result.economie)}</span>
          <span className="aec-result-sub">sur {duree} ans restants · {tranche.gain}% de réduction</span>
        </div>

        {/* Comparatif mensuel */}
        <div className="aec-compare">
          <div className="aec-compare-item aec-compare-item--bad">
            <span className="aec-compare-label">Banque</span>
            <span className="aec-compare-taux">{(tranche.tauxBanque * 100).toFixed(2)}%/an</span>
            <span className="aec-compare-mensuel">{fmt(result.mensuelBanque)}/mois</span>
          </div>
          <div className="aec-compare-arrow">→</div>
          <div className="aec-compare-item aec-compare-item--good">
            <span className="aec-compare-label">Orizia</span>
            <span className="aec-compare-taux">{(tranche.tauxOrizia * 100).toFixed(2)}%/an</span>
            <span className="aec-compare-mensuel">{fmt(result.mensuelOrizia)}/mois</span>
          </div>
        </div>

        {/* Détail */}
        <div className="aec-detail">
          <div className="aec-detail-row">
            <span>Coût total banque</span>
            <strong className="aec-detail-bad">{fmt(result.coutBanque)}</strong>
          </div>
          <div className="aec-detail-row">
            <span>Coût total Orizia</span>
            <strong className="aec-detail-good">{fmt(result.coutOrizia)}</strong>
          </div>
          <div className="aec-detail-sep" />
          <div className="aec-detail-row aec-detail-row--bold">
            <span>🎯 Économie totale</span>
            <strong>{fmt(result.economie)}</strong>
          </div>
        </div>

        {/* CTA */}
        <Link href="/rendez-vous" className="fin-btn-on-dark" style={{ width: '100%', justifyContent: 'center' }}>
          📅 Calculer mon économie exacte
        </Link>
        <p className="aec-disclaimer">
          Simulation indicative. Votre économie réelle dépend de votre profil de santé et du contrat actuel.
        </p>
      </div>

    </div>
  );
}
