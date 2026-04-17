'use client';

import { useState } from 'react';

const RISQUES = [
  {
    id: 'capital',
    label: 'Perte en capital',
    icon: '📉',
    sans: 75,
    avec: 20,
    desc_sans: 'La crise de 2022–2024 sur les SCPI de bureaux a vu certaines valeurs de parts chuter de 15 à 20%. Sans analyse experte du portefeuille et de la solidité de la société de gestion, vous investissez à l\'aveugle.',
    desc_avec: 'Je sélectionne exclusivement des SCPI avec des portefeuilles diversifiés, des bilans solides et un historique de résistance aux crises. Je vérifie le taux d\'occupation financier, la qualité des locataires et la stratégie de la société de gestion.',
  },
  {
    id: 'liquidite',
    label: 'Risque de liquidité',
    icon: '🔒',
    sans: 70,
    avec: 15,
    desc_sans: 'Les SCPI ne sont pas des placements liquides. Investir des capitaux dont vous pourriez avoir besoin à court terme peut vous forcer à vendre en marché dégradé — au pire moment.',
    desc_avec: 'Je n\'oriente vers les SCPI qu\'avec un horizon de 8 à 10 ans minimum, jamais sur des capitaux de précaution. Je dimensionne l\'investissement en cohérence avec votre situation globale.',
  },
  {
    id: 'locatif',
    label: 'Risque locatif',
    icon: '🏢',
    sans: 55,
    avec: 12,
    desc_sans: 'Des locataires défaillants, des vacances prolongées ou un secteur en difficulté (bureaux, commerce) peuvent réduire les revenus distribués. Sans analyse sectorielle, vous subissez ces cycles.',
    desc_avec: 'Je privilégie des SCPI multi-secteurs avec un taux d\'occupation financier supérieur à 90% et des locataires institutionnels solides. La diversification sectorielle est un critère non négociable.',
  },
  {
    id: 'fiscal',
    label: 'Fiscalité mal optimisée',
    icon: '🧾',
    sans: 80,
    avec: 10,
    desc_sans: 'Sans optimisation, les revenus SCPI peuvent être taxés jusqu\'à 62,2% pour un TMI à 45%. Le rendement brut affiché et le rendement net dans votre poche sont deux réalités très différentes.',
    desc_avec: 'J\'analyse votre TMI avant toute recommandation. SCPI européennes, assurance vie, nue-propriété — je structure la détention pour maximiser votre rendement net réel, pas le rendement brut affiché.',
  },
];

function Jauge({ value, color }) {
  return (
    <div style={{ background: 'rgba(26,61,53,0.08)', borderRadius: 100, height: 10, overflow: 'hidden', flex: 1 }}>
      <div style={{
        height: '100%',
        width: `${value}%`,
        background: color,
        borderRadius: 100,
        transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
      }} />
    </div>
  );
}

export default function SCPIRisqueJauge() {
  const [mode, setMode] = useState('sans');
  const [selected, setSelected] = useState(null);
  const isAvec = mode === 'avec';

  return (
    <div className="rj-wrap">
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
                  <Jauge value={val} color={color} />
                </div>
                <span className="rj-jauge-pct" style={{ color }}>{val}%</span>
                <span className="rj-jauge-chevron">{selected === r.id ? '▲' : '▼'}</span>
              </div>
              {selected === r.id && (
                <div className="rj-jauge-desc">
                  <span style={{ color: isAvec ? '#16a34a' : '#dc2626', fontWeight: 800, marginRight: 6 }}>
                    {isAvec ? '🛡️ Comment je réduis ce risque :' : '⚠️ Le problème :'}
                  </span>
                  {isAvec ? r.desc_avec : r.desc_sans}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={`rj-summary${isAvec ? ' rj-summary--good' : ' rj-summary--bad'}`}>
        {isAvec ? (
          <>
            <strong>Exposition globale réduite de ~80%</strong>
            <p>Mon accompagnement ne supprime pas les risques SCPI — il les rend maîtrisables. Chaque recommandation est précédée d'une analyse fiscale et patrimoniale complète.</p>
          </>
        ) : (
          <>
            <strong>Exposition globale sans accompagnement : élevée</strong>
            <p>Investir en SCPI sans analyse préalable expose à des erreurs fiscales et patrimoniales difficiles à corriger. Cliquez sur "Avec Orizia" pour voir la différence.</p>
          </>
        )}
      </div>
    </div>
  );
}
