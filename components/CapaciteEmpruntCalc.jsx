'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

function fmt(n) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

export default function CapaciteEmpruntCalc() {
  const [revenus, setRevenus] = useState(3500);
  const [charges, setCharges] = useState(0);
  const [duree, setDuree] = useState(20);
  const [taux, setTaux] = useState(3.5);

  const result = useMemo(() => {
    const mensuelMax = (revenus - charges) * 0.35;
    const tauxMensuel = taux / 100 / 12;
    const n = duree * 12;
    const capital = tauxMensuel > 0
      ? mensuelMax * (1 - Math.pow(1 + tauxMensuel, -n)) / tauxMensuel
      : mensuelMax * n;
    return { mensuelMax: Math.round(mensuelMax), capital: Math.round(capital) };
  }, [revenus, charges, duree, taux]);

  return (
    <div className="cap-wrap">
      <div className="cap-inputs">
        <div className="cap-title">Estimez votre capacité d'emprunt</div>

        <div className="cap-field">
          <div className="cap-field-header">
            <label>Revenus nets mensuels</label>
            <span className="cap-field-value">{fmt(revenus)}</span>
          </div>
          <input type="range" min={1000} max={15000} step={100} value={revenus}
            onChange={e => setRevenus(+e.target.value)} className="aec-slider"
            style={{ '--pct': `${((revenus - 1000) / 14000) * 100}%` }} />
          <div className="aec-slider-labels"><span>1 000€</span><span>15 000€</span></div>
        </div>

        <div className="cap-field">
          <div className="cap-field-header">
            <label>Charges mensuelles existantes</label>
            <span className="cap-field-value">{fmt(charges)}</span>
          </div>
          <input type="range" min={0} max={3000} step={50} value={charges}
            onChange={e => setCharges(+e.target.value)} className="aec-slider"
            style={{ '--pct': `${(charges / 3000) * 100}%` }} />
          <div className="aec-slider-labels"><span>0€</span><span>3 000€</span></div>
        </div>

        <div className="cap-field">
          <div className="cap-field-header">
            <label>Durée du prêt</label>
            <span className="cap-field-value">{duree} ans</span>
          </div>
          <input type="range" min={10} max={30} step={1} value={duree}
            onChange={e => setDuree(+e.target.value)} className="aec-slider"
            style={{ '--pct': `${((duree - 10) / 20) * 100}%` }} />
          <div className="aec-slider-labels"><span>10 ans</span><span>30 ans</span></div>
        </div>

        <div className="cap-field">
          <div className="cap-field-header">
            <label>Taux estimé</label>
            <span className="cap-field-value">{taux}%</span>
          </div>
          <input type="range" min={2} max={6} step={0.1} value={taux}
            onChange={e => setTaux(+e.target.value)} className="aec-slider"
            style={{ '--pct': `${((taux - 2) / 4) * 100}%` }} />
          <div className="aec-slider-labels"><span>2%</span><span>6%</span></div>
        </div>

        <div className="aec-note">
          💡 Estimation basée sur un taux d'endettement de 35%. Je calcule votre capacité exacte en tenant compte de votre profil complet.
        </div>
      </div>

      <div className="cap-results">
        <div className="cap-results-title">Votre estimation</div>

        <div className="cap-result-hero">
          <span className="aec-result-label">Vous pouvez emprunter jusqu'à</span>
          <span className="aec-result-big">{fmt(result.capital)}</span>
          <span className="aec-result-sub">sur {duree} ans · mensualité max {fmt(result.mensuelMax)}/mois</span>
        </div>

        <div className="cap-detail">
          <div className="aec-detail-row">
            <span>Revenus nets</span><strong>{fmt(revenus)}/mois</strong>
          </div>
          <div className="aec-detail-row">
            <span>Charges existantes</span><strong>{fmt(charges)}/mois</strong>
          </div>
          <div className="aec-detail-row">
            <span>Mensualité maximale (35%)</span><strong style={{ color: 'var(--orizia-gold)' }}>{fmt(result.mensuelMax)}/mois</strong>
          </div>
          <div className="aec-detail-sep" />
          <div className="aec-detail-row aec-detail-row--bold">
            <span>🏠 Capacité d'emprunt</span>
            <strong>{fmt(result.capital)}</strong>
          </div>
        </div>

        <Link href="/rendez-vous" className="fin-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          📅 Affiner avec Cindy →
        </Link>
        <p className="aec-disclaimer">
          Simulation indicative. Votre capacité réelle dépend de votre apport, votre profil bancaire et le taux négocié.
        </p>
      </div>
    </div>
  );
}
