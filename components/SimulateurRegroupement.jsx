'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function SimulateurRegroupement() {
  const [mensualite, setMensualite] = useState('');
  const [revenus, setRevenus] = useState('');
  const [nbCredits, setNbCredits] = useState('2');

  const fmt = (n) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(n);

  const result = useMemo(() => {
    const m = parseFloat(mensualite.replace(/\s/g, '').replace(',', '.'));
    const r = parseFloat(revenus.replace(/\s/g, '').replace(',', '.'));
    if (!m || !r || m <= 0 || r <= 0) return null;

    const tauxEndettement = (m / r) * 100;
    const mensualiteCible = r * 0.33;
    const gainMensuel = Math.max(0, m - mensualiteCible);

    let niveau = 'ok';
    if (tauxEndettement > 50) niveau = 'critique';
    else if (tauxEndettement > 35) niveau = 'eleve';
    else if (tauxEndettement > 25) niveau = 'surveiller';

    let creditMsg = null;
    if (nbCredits === '1') {
      creditMsg = {
        type: 'info',
        icon: '💡',
        title: 'Avec un seul crédit, le regroupement n\'est pas la bonne piste.',
        text: 'La solution adaptée est plutôt une renégociation de taux ou un rachat de crédit simple. Je peux étudier cette option avec vous.',
        cta: 'Me contacter',
        href: '/contact',
      };
    } else {
      creditMsg = {
        type: 'ok',
        icon: '✅',
        title: nbCredits === '5+' ? `${nbCredits} crédits — profil éligible au regroupement.` : `${nbCredits} crédits — profil adapté au regroupement.`,
        text: 'Avec plusieurs crédits en cours, le regroupement peut réduire significativement votre mensualité globale. Complétez le formulaire pour obtenir une simulation personnalisée.',
        cta: 'Tester mon éligibilité',
        href: '#formulaire',
      };
    }

    return { tauxEndettement, mensualiteCible, gainMensuel, niveau, creditMsg };
  }, [mensualite, revenus, nbCredits]);

  const niveauConfig = {
    ok:        { color: '#16a34a', bg: 'rgba(22,163,74,0.06)',  border: 'rgba(22,163,74,0.2)',  label: 'Taux sain',         icon: '✅' },
    surveiller:{ color: '#d97706', bg: 'rgba(217,119,6,0.06)',  border: 'rgba(217,119,6,0.2)',  label: 'À surveiller',      icon: '⚠️' },
    eleve:     { color: '#ea580c', bg: 'rgba(234,88,12,0.06)',  border: 'rgba(234,88,12,0.2)',  label: 'Taux élevé',        icon: '🔴' },
    critique:  { color: '#dc2626', bg: 'rgba(220,38,38,0.06)',  border: 'rgba(220,38,38,0.2)',  label: 'Situation critique', icon: '🚨' },
  };

  const cfg = result ? niveauConfig[result.niveau] : null;

  return (
    <div className="sr-wrap">

      {/* ── FORMULAIRE ── */}
      <div className="sr-form">

        <div className="sr-field">
          <label className="sr-label" htmlFor="sr-mensualite">
            <span className="sr-label-icon">💳</span>
            Total de vos mensualités
          </label>
          <div className="sr-input-wrap">
            <input
              id="sr-mensualite"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="1 200"
              value={mensualite}
              onChange={e => setMensualite(e.target.value)}
              className="sr-input"
              autoComplete="off"
            />
            <span className="sr-unit">€/mois</span>
          </div>
          <p className="sr-hint">Somme de tous vos remboursements mensuels</p>
        </div>

        <div className="sr-field">
          <label className="sr-label" htmlFor="sr-revenus">
            <span className="sr-label-icon">💼</span>
            Revenus nets du foyer
          </label>
          <div className="sr-input-wrap">
            <input
              id="sr-revenus"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="3 000"
              value={revenus}
              onChange={e => setRevenus(e.target.value)}
              className="sr-input"
              autoComplete="off"
            />
            <span className="sr-unit">€/mois</span>
          </div>
          <p className="sr-hint">Salaires, pensions, revenus locatifs…</p>
        </div>

        <div className="sr-field">
          <label className="sr-label">
            <span className="sr-label-icon">📋</span>
            Nombre de crédits en cours
          </label>
          <div className="sr-nb-grid">
            {['1', '2', '3', '4', '5+'].map(v => (
              <button
                key={v}
                type="button"
                onClick={() => setNbCredits(v)}
                className={`sr-nb-btn${nbCredits === v ? ' sr-nb-btn--active' : ''}`}
              >
                {v}
              </button>
            ))}
          </div>
          <p className="sr-hint">Immobilier, conso, LOA, renouvelable…</p>
        </div>
      </div>

      {/* ── RÉSULTAT ── */}
      {result && (
        <div className="sr-result" style={{ borderColor: cfg.border, background: cfg.bg }}>

          {/* Jauge taux d'endettement */}
          <div className="sr-result-gauge-wrap">
            <div className="sr-result-gauge-header">
              <span className="sr-result-gauge-label">Votre taux d'endettement actuel</span>
              <span className="sr-result-gauge-badge" style={{ background: cfg.color }}>
                {cfg.icon} {cfg.label}
              </span>
            </div>
            <div className="sr-result-gauge-body">
              <div className="sr-result-gauge-value" style={{ color: cfg.color }}>
                {result.tauxEndettement.toFixed(1)}%
              </div>
              <div className="sr-result-gauge-track-wrap">
                <div className="sr-result-gauge-track">
                  <div
                    className="sr-result-gauge-fill"
                    style={{ width: `${Math.min(result.tauxEndettement, 100)}%`, background: cfg.color }}
                  />
                  <div className="sr-result-gauge-marker" style={{ left: '33%' }}>
                    <span>33%</span>
                  </div>
                </div>
                {result.niveau !== 'ok' && (
                  <p className="sr-result-gauge-msg">
                    La limite bancaire est de 35%. Au-delà, les banques refusent généralement tout nouveau crédit.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Cards mensualités */}
          {result.niveau !== 'ok' && (
            <div className="sr-result-cards">
              <div className="sr-result-card sr-result-card--main">
                <div className="sr-result-card-body">
                  <span className="sr-result-card-label">Mensualité cible</span>
                  <span className="sr-result-card-value sr-result-card-value--main">
                    {fmt(result.mensualiteCible)}
                  </span>
                  <span className="sr-result-card-sub">À 33% d'endettement</span>
                </div>
              </div>
              <div className="sr-result-card">
                <div className="sr-result-card-body">
                  <span className="sr-result-card-label">Mensualité actuelle</span>
                  <span className="sr-result-card-value" style={{ color: cfg.color }}>
                    {fmt(parseFloat(mensualite.replace(/\s/g, '').replace(',', '.')))}
                  </span>
                  <span className="sr-result-card-sub">Trop élevée</span>
                </div>
              </div>
              <div className="sr-result-card">
                <div className="sr-result-card-body">
                  <span className="sr-result-card-label">Gain mensuel estimé</span>
                  <span className="sr-result-card-value" style={{ color: '#16a34a' }}>
                    +{fmt(result.gainMensuel)}
                  </span>
                  <span className="sr-result-card-sub">De reste à vivre</span>
                </div>
              </div>
            </div>
          )}

          {result.niveau === 'ok' && (
            <div className="sr-result-ok">
              <span>✅</span>
              <div>
                <strong>Votre taux d'endettement est sain ({result.tauxEndettement.toFixed(1)}%)</strong>
                <p>Le regroupement de crédits n'est peut-être pas la priorité. Je peux néanmoins analyser votre situation pour identifier d'autres optimisations.</p>
              </div>
            </div>
          )}

          {/* Message contextuel nombre de crédits */}
          {result.creditMsg && (
            <div className={`sr-credit-msg sr-credit-msg--${result.creditMsg.type}`}>
              <span className="sr-credit-msg-icon">{result.creditMsg.icon}</span>
              <div className="sr-credit-msg-content">
                <strong>{result.creditMsg.title}</strong>
                <p>{result.creditMsg.text}</p>
              </div>
              {result.creditMsg.href.startsWith('#') ? (
                <a href={result.creditMsg.href} className="fin-btn-primary sr-credit-msg-cta">
                  {result.creditMsg.cta}
                </a>
              ) : (
                <Link href={result.creditMsg.href} className="fin-btn-primary sr-credit-msg-cta">
                  {result.creditMsg.cta}
                </Link>
              )}
            </div>
          )}

          {/* Disclaimer */}
          <p className="sr-disclaimer">
            ℹ️ Estimation indicative basée sur un taux cible de 33%. La simulation complète prend en compte votre profil complet.
          </p>
        </div>
      )}

      {!result && (
        <div className="sr-placeholder">
          <div className="sr-placeholder-inner">
            <span className="sr-placeholder-icon">📊</span>
            <p>Renseignez vos mensualités et revenus pour calculer votre taux d'endettement.</p>
          </div>
        </div>
      )}
    </div>
  );
}
