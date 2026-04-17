'use client';

import { useState } from 'react';
import Link from 'next/link';

const PLACEMENTS = [
  {
    id: 'livret',
    icon: '🏦',
    label: 'Livret A',
    rendement: '3%',
    rendementNum: 3,
    duree: 'Libre',
    risque: 1,
    risqueLabel: 'Très faible',
    liquidite: 'Immédiate',
    liquiditeOk: true,
    desc: 'Sécurité maximale, disponibilité totale. Mais le rendement réel est souvent négatif après inflation.',
    pour: 'Épargne de précaution',
    highlight: false,
  },
  {
    id: 'av',
    icon: '🛡️',
    label: 'Assurance Vie',
    rendement: '2–4%',
    rendementNum: 3,
    duree: '8 ans+',
    risque: 1,
    risqueLabel: 'Très faible',
    liquidite: 'Bonne',
    liquiditeOk: true,
    desc: 'Enveloppe fiscale polyvalente. Rendement limité sur fonds euros, meilleur avec des UC bien choisies.',
    pour: 'Épargne long terme & transmission',
    highlight: false,
  },
  {
    id: 'scpi',
    icon: '🏢',
    label: 'SCPI',
    rendement: '4–6%',
    rendementNum: 5,
    duree: '8–10 ans',
    risque: 2,
    risqueLabel: 'Faible',
    liquidite: 'Limitée',
    liquiditeOk: false,
    desc: 'Immobilier locatif sans gestion. Revenus réguliers, mais capital immobilisé sur le long terme.',
    pour: 'Revenus complémentaires réguliers',
    highlight: false,
  },
  {
    id: 'crowd',
    icon: '📈',
    label: 'Crowdfunding',
    rendement: '8–12%',
    rendementNum: 10,
    duree: '1–3 ans',
    risque: 3,
    risqueLabel: 'Moyen',
    liquidite: 'Bloqué',
    liquiditeOk: false,
    desc: 'Le meilleur rendement à court terme — à condition d\'être bien accompagné pour sélectionner les bons projets.',
    pour: 'Dynamiser un patrimoine existant',
    highlight: true,
  },
  {
    id: 'bourse',
    icon: '📊',
    label: 'Actions bourse',
    rendement: 'Variable',
    rendementNum: 7,
    duree: 'Variable',
    risque: 4,
    risqueLabel: 'Élevé',
    liquidite: 'Immédiate',
    liquiditeOk: true,
    desc: 'Potentiel élevé mais volatilité importante. Nécessite du temps, des connaissances et une tolérance au risque forte.',
    pour: 'Investisseurs expérimentés',
    highlight: false,
  },
];

function RisqueBar({ niveau }) {
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{
          width: 20, height: 6, borderRadius: 3,
          background: i <= niveau
            ? niveau === 1 ? '#16a34a' : niveau === 2 ? '#d97706' : niveau === 3 ? '#ea580c' : '#dc2626'
            : 'rgba(26,61,53,0.12)',
          transition: 'background 0.2s',
        }} />
      ))}
    </div>
  );
}

export default function PlacementsComparatif() {
  const [selected, setSelected] = useState('crowd');
  const current = PLACEMENTS.find(p => p.id === selected);

  return (
    <div className="plac-wrap">

      {/* Sélecteur cartes */}
      <div className="plac-cards">
        {PLACEMENTS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className={`plac-card${selected === p.id ? ' plac-card--active' : ''}${p.highlight ? ' plac-card--highlight' : ''}`}
          >
            {p.highlight && <div className="plac-card-star">⭐ Meilleur rendement</div>}
            <span className="plac-card-icon">{p.icon}</span>
            <span className="plac-card-label">{p.label}</span>
            <span className="plac-card-rendement">{p.rendement}/an</span>
          </button>
        ))}
      </div>

      {/* Détail du placement sélectionné */}
      {current && (
        <div className={`plac-detail${current.highlight ? ' plac-detail--highlight' : ''}`} key={current.id}>
          <div className="plac-detail-header">
            <div>
              <span className="plac-detail-icon">{current.icon}</span>
              <h3 className="plac-detail-title">{current.label}</h3>
              {current.highlight && (
                <span className="plac-detail-badge">⭐ Recommandé par Orizia</span>
              )}
            </div>
            <div className="plac-detail-rendement-big">{current.rendement}<span>/an</span></div>
          </div>

          <p className="plac-detail-desc">{current.desc}</p>

          <div className="plac-detail-grid">
            <div className="plac-detail-item">
              <span className="plac-detail-item-label">Durée recommandée</span>
              <span className="plac-detail-item-value">⏳ {current.duree}</span>
            </div>
            <div className="plac-detail-item">
              <span className="plac-detail-item-label">Niveau de risque</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <RisqueBar niveau={current.risque} />
                <span className="plac-detail-item-value" style={{ marginTop: 0 }}>{current.risqueLabel}</span>
              </div>
            </div>
            <div className="plac-detail-item">
              <span className="plac-detail-item-label">Liquidité</span>
              <span className="plac-detail-item-value">
                {current.liquiditeOk ? '✅' : '⚠️'} {current.liquidite}
              </span>
            </div>
            <div className="plac-detail-item">
              <span className="plac-detail-item-label">Idéal pour</span>
              <span className="plac-detail-item-value">🎯 {current.pour}</span>
            </div>
          </div>

          {/* Barre de rendement visuelle */}
          <div className="plac-rendement-bar-wrap">
            <div className="plac-rendement-bar-label">
              <span>Rendement potentiel</span>
              <span>{current.rendement}/an</span>
            </div>
            <div className="plac-rendement-bar-bg">
              <div
                className="plac-rendement-bar-fill"
                style={{
                  width: `${(current.rendementNum / 12) * 100}%`,
                  background: current.highlight
                    ? 'linear-gradient(90deg, var(--orizia-accent), var(--orizia-gold))'
                    : 'var(--orizia-primary)',
                }}
              />
            </div>
          </div>

        </div>
      )}

      <p className="crowd-table-note" style={{ marginTop: 16 }}>
        ⚠️ Rendements indicatifs. Tout investissement comporte un risque de perte en capital.
      </p>
    </div>
  );
}
