'use client';
import { useState } from 'react';
import ContactPopup from '@/components/ContactPopup';

const PRESETS = [
  { label: '🟢 Prudent',   montant: 5000,  taux: 8,  duree: 12 },
  { label: '🟡 Équilibré', montant: 10000, taux: 10, duree: 24 },
  { label: '🔴 Dynamique', montant: 25000, taux: 12, duree: 36 },
];

const LIVRET_A_NET = 2.1; // 3% brut × 0.70

export default function SimulateurCrowdfunding() {
  const [montant, setMontant] = useState(10000);
  const [taux,    setTaux]    = useState(10);
  const [duree,   setDuree]   = useState(24);

  // ── Calculs ──
  const dureeAns      = duree / 12;
  const interetsBruts = montant * (taux / 100) * dureeAns;
  const flatTax       = interetsBruts * 0.30;
  const interetsNets  = Math.round(interetsBruts - flatTax);
  const capitalFinal  = Math.round(montant + interetsNets);
  const rendementNet  = (taux * 0.70).toFixed(2);
  const gainLivretA   = Math.round(montant * (LIVRET_A_NET / 100) * dureeAns);
  const surplusVsLivret = interetsNets - gainLivretA;

  // ── Sliders fill ──
  const pctMontant = ((montant - 1000)  / (50000 - 1000)) * 100;
  const pctTaux    = ((taux - 6)        / (14 - 6))       * 100;
  const pctDuree   = ((duree - 12)      / (48 - 12))      * 100;

  const fmt = (n) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="simu-wrap">

      {/* ── INPUTS ── */}
      <div className="simu-inputs">
        <h3 className="simu-inputs-title">Configurez votre simulation</h3>

        {/* Presets */}
        <div className="simu-presets">
          {PRESETS.map(p => (
            <button
              key={p.label}
              className="simu-preset-btn"
              onClick={() => {
                setMontant(p.montant);
                setTaux(p.taux);
                setDuree(p.duree);
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Montant */}
        <div className="simu-field">
          <div className="simu-field-header">
            <label>Montant investi</label>
            <span className="simu-field-value">{fmt(montant)}</span>
          </div>
          <div className="simu-slider-wrap">
            <input
              type="range"
              min={1000} max={50000} step={1000}
              value={montant}
              onChange={e => setMontant(Number(e.target.value))}
              className="simu-slider"
              style={{ '--pct': `${pctMontant}%` }}
              aria-label="Montant investi en crowdfunding immobilier"
            />
            <div className="simu-slider-labels">
              <span>1 000 €</span>
              <span>50 000 €</span>
            </div>
          </div>
        </div>

        {/* Taux */}
        <div className="simu-field">
          <div className="simu-field-header">
            <label>Rendement annuel brut (crowdfunding immobilier)</label>
            <span className="simu-field-value">{taux}%</span>
          </div>
          <div className="simu-slider-wrap">
            <input
              type="range"
              min={6} max={14} step={0.5}
              value={taux}
              onChange={e => setTaux(Number(e.target.value))}
              className="simu-slider"
              style={{ '--pct': `${pctTaux}%` }}
              aria-label="Rendement annuel brut du projet"
            />
            <div className="simu-slider-labels">
              <span>6%</span>
              <span>14%</span>
            </div>
          </div>
        </div>

        {/* Durée */}
        <div className="simu-field">
          <div className="simu-field-header">
            <label>Durée du projet</label>
            <span className="simu-field-value">{duree} mois</span>
          </div>
          <div className="simu-slider-wrap">
            <input
              type="range"
              min={12} max={48} step={1}
              value={duree}
              onChange={e => setDuree(Number(e.target.value))}
              className="simu-slider"
              style={{ '--pct': `${pctDuree}%` }}
              aria-label="Durée du projet en mois"
            />
            <div className="simu-slider-labels">
              <span>12 mois</span>
              <span>48 mois</span>
            </div>
          </div>
        </div>

        {/* Note pédagogique */}
        <div className="simu-note">
          💡 Ces taux sont représentatifs du marché en 2026.
          Je sélectionne uniquement des projets dont j'ai vérifié le promoteur.
        </div>
      </div>

      {/* ── RÉSULTATS ── */}
      <div className="simu-results">
        <div className="simu-results-header">
          <span>📊</span>
          <h3>Simulation crowdfunding immobilier</h3>
        </div>

        {/* Gain net — hero */}
        <div className="simu-result-main">
          <span>Gain net estimé</span>
          <strong
            key={interetsNets}
            className="simu-result-big"
          >
            {fmt(interetsNets)}
          </strong>
          <span className="simu-result-sub">après flat tax de 30%</span>
        </div>

        {/* Détail lignes */}
        <div className="simu-result-lines">
          <div className="simu-result-line">
            <span>Capital investi</span>
            <strong>{fmt(montant)}</strong>
          </div>
          <div className="simu-result-line">
            <span>Intérêts bruts ({taux}%/an × {duree} mois)</span>
            <strong className="simu-positive">{fmt(Math.round(interetsBruts))}</strong>
          </div>
          <div className="simu-result-line simu-result-line--neg">
            <span>Flat tax (30%)</span>
            <strong>– {fmt(Math.round(flatTax))}</strong>
          </div>
          <div className="simu-result-line simu-result-line--sep" />
          <div className="simu-result-line simu-result-line--bold">
            <span>Intérêts nets perçus</span>
            <strong style={{ color: 'var(--orizia-primary)' }}>{fmt(interetsNets)}</strong>
          </div>
          <div className="simu-result-line simu-result-line--bold">
            <span>Capital récupéré à terme</span>
            <strong>{fmt(capitalFinal)}</strong>
          </div>
        </div>

        {/* Comparaison Livret A */}
        <div className="simu-result-tag">
          <div>
            💡 Soit <strong>{rendementNet}% net/an</strong> équivalent
            — contre ~{LIVRET_A_NET}% pour un livret A
          </div>
          {surplusVsLivret > 0 && (
            <span className="simu-vs-surplus">
              📈 +{fmt(surplusVsLivret)} de plus qu'un livret A sur la même durée
            </span>
          )}
        </div>

        {/* CTA */}
        <ContactPopup label="📅 Être accompagnée par Cindy pour investir" className="fin-btn-primary simu-cta" />

        <p className="simu-disclaimer">
          Simulation indicative. Les rendements passés ne préjugent pas des performances futures.
          Tout investissement comporte un risque de perte en capital.
          Orizia Courtage, courtier indépendant immatriculée ORIAS.
        </p>
      </div>
    </div>
  );
}