'use client';

import { useState } from 'react';

const RISQUES = [
  {
    id: 'capital',
    label: 'Perte en capital',
    icon: '💸',
    sans: 85,
    avec: 15,
    desc: 'Sans analyse du promoteur, le risque de défaut est élevé. J\'audite les bilans, les fonds propres et l\'historique de livraisons avant chaque recommandation.',
  },
  {
    id: 'retard',
    label: 'Retard de remboursement',
    icon: '⏳',
    sans: 70,
    avec: 25,
    desc: 'Les retards sont fréquents sur les projets mal sélectionnés. Je ne recommande que des promoteurs avec un track record vérifié sur les 3 dernières années.',
  },
  {
    id: 'liquidite',
    label: 'Mauvaise allocation',
    icon: '🔒',
    sans: 60,
    avec: 10,
    desc: 'Investir trop sur une seule plateforme ou un seul projet amplifie le risque. Je construis une stratégie de diversification adaptée à votre profil.',
  },
  {
    id: 'plateforme',
    label: 'Risque plateforme',
    icon: '🏦',
    sans: 50,
    avec: 5,
    desc: 'Certaines plateformes ont des taux de défaut > 10%. Je ne travaille qu\'avec des plateformes agréées AMF dont j\'ai vérifié la solidité financière.',
  },
];

function Jauge({ value, color, animated }) {
  return (
    <div style={{ background: 'rgba(26,61,53,0.08)', borderRadius: 100, height: 10, overflow: 'hidden', flex: 1 }}>
      <div style={{
        height: '100%',
        width: animated ? `${value}%` : '0%',
        background: color,
        borderRadius: 100,
        transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
      }} />
    </div>
  );
}

export default function RisqueJauge() {
  const [mode, setMode] = useState('sans'); // 'sans' | 'avec'
  const [selected, setSelected] = useState(null);

  const isAvec = mode === 'avec';

  return (
    <div className="rj-wrap">

      {/* Toggle */}
      <div className="rj-toggle">
        <button
          onClick={() => setMode('sans')}
          className={`rj-toggle-btn${!isAvec ? ' rj-toggle-btn--active rj-toggle-btn--bad' : ''}`}
        >
          ❌ Sans accompagnement
        </button>
        <button
          onClick={() => setMode('avec')}
          className={`rj-toggle-btn${isAvec ? ' rj-toggle-btn--active rj-toggle-btn--good' : ''}`}
        >
          ✅ Avec Orizia
        </button>
      </div>

      {/* Jauges */}
      <div className="rj-jauges">
        {RISQUES.map(r => {
          const val = isAvec ? r.avec : r.sans;
          const color = isAvec
            ? val < 20 ? '#16a34a' : '#d97706'
            : val > 60 ? '#dc2626' : '#d97706';

          return (
            <div
              key={r.id}
              className={`rj-jauge-row${selected === r.id ? ' rj-jauge-row--open' : ''}`}
              onClick={() => setSelected(selected === r.id ? null : r.id)}
            >
              <div className="rj-jauge-header">
                <span className="rj-jauge-icon">{r.icon}</span>
                <span className="rj-jauge-label">{r.label}</span>
                <div className="rj-jauge-bar-wrap">
                  <Jauge value={val} color={color} animated />
                </div>
                <span className="rj-jauge-pct" style={{ color }}>
                  {val}%
                </span>
                <span className="rj-jauge-chevron">{selected === r.id ? '▲' : '▼'}</span>
              </div>
              {selected === r.id && (
                <div className="rj-jauge-desc">
                  <span style={{ color: isAvec ? '#16a34a' : '#dc2626', fontWeight: 800, marginRight: 6 }}>
                    {isAvec ? '🛡️ Comment je réduis ce risque :' : '⚠️ Le problème :'}
                  </span>
                  {r.desc}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Résumé */}
      <div className={`rj-summary${isAvec ? ' rj-summary--good' : ' rj-summary--bad'}`}>
        {isAvec ? (
          <>
            <strong>Exposition globale réduite de ~75%</strong>
            <p>Mon accompagnement ne supprime pas le risque — il le rend maîtrisable. Chaque décision est prise avec une analyse complète.</p>
          </>
        ) : (
          <>
            <strong>Exposition globale sans accompagnement : élevée</strong>
            <p>Investir seul dans le crowdfunding sans analyse préalable expose à des risques évitables. Cliquez sur "Avec Orizia" pour voir la différence.</p>
          </>
        )}
      </div>
    </div>
  );
}
