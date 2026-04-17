'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

const TRANCHES = [
  { label: '11%', tmi: 0.11, plafond: 4000 },
  { label: '30%', tmi: 0.30, plafond: 35000 },
  { label: '41%', tmi: 0.41, plafond: 35000 },
  { label: '45%', tmi: 0.45, plafond: 85000 },
];

function fmt(n) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

export default function PERCalculateur() {
  const [trancheIdx, setTrancheIdx] = useState(1);
  const [versement, setVersement] = useState(5000);

  const tranche = TRANCHES[trancheIdx];
  const versementCapped = Math.min(versement, tranche.plafond);

  const result = useMemo(() => {
    const economie = versementCapped * tranche.tmi;
    const coutReel = versementCapped - economie;
    return { economie: Math.round(economie), coutReel: Math.round(coutReel) };
  }, [versementCapped, tranche]);

  return (
    <div className="per-calc-wrap">
      <div className="per-calc-inputs">
        <div className="cap-title">Calculez votre économie fiscale</div>

        {/* TMI */}
        <div className="cap-field">
          <div className="cap-field-header">
            <label>Votre tranche marginale d'imposition</label>
            <span className="cap-field-value">TMI {tranche.label}</span>
          </div>
          <div className="per-calc-tmi-grid">
            {TRANCHES.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setTrancheIdx(i)}
                className={`aec-age-btn${trancheIdx === i ? ' aec-age-btn--active' : ''}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--orizia-dark)', opacity: 0.5, marginTop: 6 }}>
            Votre TMI figure sur votre avis d'imposition, rubrique "Taux marginal d'imposition"
          </div>
        </div>

        {/* Versement */}
        <div className="cap-field">
          <div className="cap-field-header">
            <label>Versement annuel sur le PER</label>
            <span className="cap-field-value">{fmt(versement)}</span>
          </div>
          <input type="range" min={500} max={50000} step={500} value={versement}
            onChange={e => setVersement(+e.target.value)} className="aec-slider"
            style={{ '--pct': `${((versement - 500) / 49500) * 100}%` }} />
          <div className="aec-slider-labels"><span>500€</span><span>50 000€</span></div>
          {versement > tranche.plafond && (
            <div style={{ fontSize: '0.75rem', color: '#d97706', marginTop: 4, fontWeight: 600 }}>
              ⚠️ Plafond de déduction pour votre TMI : {fmt(tranche.plafond)}
            </div>
          )}
        </div>

        <div className="aec-note">
          💡 Les plafonds non utilisés des 3 dernières années sont reportables. Je les calcule avec vous en rendez-vous.
        </div>
      </div>

      <div className="per-calc-results">
        <div className="cap-results-title">Votre gain fiscal</div>

        <div className="cap-result-hero">
          <span className="aec-result-label">Impôt récupéré dès l'an prochain</span>
          <span className="aec-result-big">{fmt(result.economie)}</span>
          <span className="aec-result-sub">pour {fmt(versementCapped)} versés · TMI {tranche.label}</span>
        </div>

        <div className="cap-detail">
          <div className="aec-detail-row">
            <span>Versement PER</span><strong>{fmt(versementCapped)}</strong>
          </div>
          <div className="aec-detail-row">
            <span>Économie d'impôt ({tranche.label})</span>
            <strong style={{ color: '#86efac' }}>−{fmt(result.economie)}</strong>
          </div>
          <div className="aec-detail-sep" />
          <div className="aec-detail-row aec-detail-row--bold">
            <span>💰 Coût réel de l'épargne</span>
            <strong style={{ color: 'var(--orizia-gold)' }}>{fmt(result.coutReel)}</strong>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 14px', fontSize: '0.78rem', color: 'rgba(245,243,239,0.7)', lineHeight: 1.5 }}>
          En clair : vous épargnez {fmt(versementCapped)} mais l'État vous rembourse {fmt(result.economie)} d'impôt. Votre effort réel n'est que de {fmt(result.coutReel)}.
        </div>

        <Link href="/rendez-vous" className="fin-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          📅 Calculer mes plafonds exacts →
        </Link>
        <p className="aec-disclaimer">
          Simulation indicative. Vos plafonds réels figurent sur votre avis d'imposition.
        </p>
      </div>
    </div>
  );
}
