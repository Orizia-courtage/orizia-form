'use client';

import { useState } from 'react';

const ETAPES_FLUX = [
  {
    icon: '👤',
    label: 'Vous investissez',
    desc: 'Dès 1 000€, comptant ou à crédit',
    color: 'var(--orizia-accent)',
  },
  {
    icon: '🔍',
    label: 'Cindy sélectionne',
    desc: 'Analyse de 200+ SCPI selon votre profil fiscal',
    color: 'var(--orizia-primary)',
    orizia: true,
  },
  {
    icon: '🏦',
    label: 'Société de gestion AMF',
    desc: 'Gère l\'intégralité du portefeuille',
    color: '#7c3aed',
  },
  {
    icon: '🏢',
    label: 'Actifs immobiliers',
    desc: 'Bureaux, commerces, santé, logistique…',
    color: '#d97706',
  },
  {
    icon: '💰',
    label: 'Vous percevez',
    desc: 'Loyers trimestriels, sans rien gérer',
    color: '#16a34a',
  },
];

const COMPARATIF = [
  {
    critere: 'Ticket d\'entrée',
    direct: 'Souvent 200 000€+',
    scpi: 'Dès 1 000€',
    scpiGood: true,
  },
  {
    critere: 'Gestion',
    direct: 'Locataires, travaux, taxe foncière…',
    scpi: 'Zéro — tout délégué',
    scpiGood: true,
  },
  {
    critere: 'Diversification',
    direct: 'Un seul bien, un seul locataire',
    scpi: 'Centaines d\'actifs, secteurs variés',
    scpiGood: true,
  },
  {
    critere: 'Liquidité',
    direct: 'Vente longue (3–6 mois)',
    scpi: 'Revente possible (8–10 ans recommandés)',
    scpiGood: null,
  },
  {
    critere: 'Rendement brut',
    direct: '2–4%/an net charges',
    scpi: '4–6%/an distribué',
    scpiGood: true,
  },
  {
    critere: 'Fiscalité',
    direct: 'Revenus fonciers + charges',
    scpi: 'Optimisable (AV, européennes, nue-prop.)',
    scpiGood: true,
  },
];

export default function SCPIDefinition() {
  const [view, setView] = useState('flux'); // 'flux' | 'comparatif'

  return (
    <div className="scpidef-wrap">

      {/* Toggle vue */}
      <div className="scpidef-toggle">
        <button
          onClick={() => setView('flux')}
          className={`scpidef-toggle-btn${view === 'flux' ? ' scpidef-toggle-btn--active' : ''}`}
        >
          🔄 Comment ça fonctionne
        </button>
        <button
          onClick={() => setView('comparatif')}
          className={`scpidef-toggle-btn${view === 'comparatif' ? ' scpidef-toggle-btn--active' : ''}`}
        >
          ⚖️ SCPI vs Immobilier direct
        </button>
      </div>

      {/* Vue flux */}
      {view === 'flux' && (
        <div className="scpidef-flux">
          {ETAPES_FLUX.map((e, i) => (
            <div key={e.label} className="scpidef-flux-row">
              <div
                className={`scpidef-flux-step${e.orizia ? ' scpidef-flux-step--orizia' : ''}`}
                style={{ borderColor: e.color }}
              >
                <div className="scpidef-flux-icon" style={{ background: e.color }}>{e.icon}</div>
                <div className="scpidef-flux-content">
                  <div className="scpidef-flux-label" style={{ color: e.color }}>{e.label}</div>
                  <div className="scpidef-flux-desc">{e.desc}</div>
                </div>
                {e.orizia && (
                  <div className="scpidef-flux-orizia-badge">Orizia</div>
                )}
              </div>
              {i < ETAPES_FLUX.length - 1 && (
                <div className="scpidef-flux-arrow">↓</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Vue comparatif */}
      {view === 'comparatif' && (
        <div className="scpidef-comp">
          <div className="scpidef-comp-header">
            <div className="scpidef-comp-header-empty" />
            <div className="scpidef-comp-col-head scpidef-comp-col-head--direct">
              🏠 Immobilier direct
            </div>
            <div className="scpidef-comp-col-head scpidef-comp-col-head--scpi">
              🏢 SCPI
              <span className="scpidef-comp-best-badge">Recommandé</span>
            </div>
          </div>
          {COMPARATIF.map((row, i) => (
            <div key={row.critere} className={`scpidef-comp-row${i % 2 === 0 ? ' scpidef-comp-row--alt' : ''}`}>
              <div className="scpidef-comp-critere">{row.critere}</div>
              <div className="scpidef-comp-cell scpidef-comp-cell--direct">
                <span style={{ color: '#dc2626', marginRight: 6 }}>✗</span>
                {row.direct}
              </div>
              <div className="scpidef-comp-cell scpidef-comp-cell--scpi">
                <span style={{ color: row.scpiGood === true ? '#16a34a' : '#d97706', marginRight: 6 }}>
                  {row.scpiGood === true ? '✓' : '~'}
                </span>
                <strong style={{ color: row.scpiGood === true ? 'var(--orizia-primary)' : '#d97706' }}>
                  {row.scpi}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Points clés */}
      <div className="scpidef-points">
        <div className="scpidef-point">
          <span className="scpidef-point-icon">🏛️</span>
          <div>
            <div className="scpidef-point-title">Agréées AMF</div>
            <div className="scpidef-point-desc">Cadre réglementaire strict, audits annuels obligatoires</div>
          </div>
        </div>
        <div className="scpidef-point">
          <span className="scpidef-point-icon">📅</span>
          <div>
            <div className="scpidef-point-title">Loyers trimestriels</div>
            <div className="scpidef-point-desc">Revenus réguliers versés tous les 3 mois</div>
          </div>
        </div>
        <div className="scpidef-point">
          <span className="scpidef-point-icon">🌍</span>
          <div>
            <div className="scpidef-point-title">Diversification géographique</div>
            <div className="scpidef-point-desc">France, Allemagne, Pays-Bas, Irlande et plus</div>
          </div>
        </div>
      </div>

    </div>
  );
}
