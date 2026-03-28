'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SimulateurCrowdfunding() {
  const [montant,   setMontant]   = useState(10000);
  const [taux,      setTaux]      = useState(10);
  const [duree,     setDuree]     = useState(24);

  // Calculs
  const dureeAns      = duree / 12;
  const interetsBruts = montant * (taux / 100) * dureeAns;
  const flatTax       = interetsBruts * 0.30;
  const interetsNets  = interetsBruts - flatTax;
  const capitalFinal  = montant + interetsNets;
  const rendementNet  = (taux * 0.70).toFixed(2);

  const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

  // Calcul du pourcentage pour le remplissage custom du slider
  const pctMontant = ((montant - 1000) / (50000 - 1000)) * 100;
  const pctTaux    = ((taux - 6) / (14 - 6)) * 100;
  const pctDuree   = ((duree - 12) / (48 - 12)) * 100;

  return (
    <div className="simu-wrap">
      <div className="simu-inputs">
        <h3>Configurez votre simulation</h3>

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
            />
            <div className="simu-slider-labels">
              <span>1 000€</span>
              <span>50 000€</span>
            </div>
          </div>
        </div>

        {/* Taux */}
        <div className="simu-field">
          <div className="simu-field-header">
            <label>Rendement annuel brut</label>
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
            />
            <div className="simu-slider-labels">
              <span>12 mois</span>
              <span>48 mois</span>
            </div>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="simu-results">
        <div className="simu-results-header">
          <span>📊</span>
          <h3>Votre simulation</h3>
        </div>

        <div className="simu-result-main">
          <span>Gain net estimé</span>
          <strong className="simu-result-big">{fmt(interetsNets)}</strong>
          <span className="simu-result-sub">après flat tax de 30%</span>
        </div>

        <div className="simu-result-lines">
          <div className="simu-result-line">
            <span>Capital investi</span>
            <strong>{fmt(montant)}</strong>
          </div>
          <div className="simu-result-line">
            <span>Intérêts bruts ({taux}%/an × {duree} mois)</span>
            <strong>{fmt(interetsBruts)}</strong>
          </div>
          <div className="simu-result-line simu-result-line--neg">
            <span>Flat tax (30%)</span>
            <strong>– {fmt(flatTax)}</strong>
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

        <div className="simu-result-tag">
          💡 Soit <strong>{rendementNet}%</strong> net/an — contre ~2,1% pour un livret A
        </div>

        <Link href="/rendez-vous" className="fin-btn-primary simu-cta">
          📅 Être accompagné pour investir →
        </Link>

        <p className="simu-disclaimer">
          Simulation indicative. Les rendements passés ne préjugent pas des performances futures.
          Tout investissement comporte un risque de perte en capital.
        </p>
      </div>
    </div>
  );
}