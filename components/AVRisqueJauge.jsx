'use client';

import { useState } from 'react';

const RISQUES = [
  {
    id: 'uc',
    label: 'Fluctuation des UC',
    icon: '📉',
    sans: 70,
    avec: 18,
    desc_sans: 'Sans calibrage précis, une allocation trop agressive peut perdre 20–30% en un an. Beaucoup d\'épargnants découvrent leur vraie tolérance au risque lors d\'une baisse — trop tard.',
    desc_avec: 'Je calibre la part UC à votre horizon réel et votre tolérance effective. Un profil prudent reste à 80–100% fonds euros. Vous ne prenez jamais plus de risque que ce que vous avez explicitement validé.',
  },
  {
    id: 'frais',
    label: 'Frais excessifs (contrat bancaire)',
    icon: '🏦',
    sans: 80,
    avec: 5,
    desc_sans: 'Un contrat bancaire avec 3% de frais sur versements sur 20 ans peut vous coûter 30 000€ de performance nette. La plupart des épargnants ne le réalisent jamais.',
    desc_avec: 'Mes contrats partenaires appliquent 0% de frais sur versements. Sur 20 ans, la différence est considérable — et c\'est sans frais de dossier pour vous.',
  },
  {
    id: 'clause',
    label: 'Clause bénéficiaire mal rédigée',
    icon: '📜',
    sans: 65,
    avec: 5,
    desc_sans: 'Une clause standard "mes héritiers légaux" peut transformer votre meilleur outil de transmission en cauchemar successoral — surtout en cas de famille recomposée, PACS ou donation-partage.',
    desc_avec: 'Je rédige avec vous une clause sur-mesure adaptée à votre situation familiale réelle. C\'est l\'étape la plus négligée — et la plus importante.',
  },
  {
    id: 'liquidite',
    label: 'Rachat en mauvais moment',
    icon: '⏱️',
    sans: 55,
    avec: 10,
    desc_sans: 'Racheter la part UC lors d\'une baisse de marché cristallise les pertes. Sans stratégie de liquidité, c\'est le scénario le plus fréquent en cas de besoin urgent.',
    desc_avec: 'Je dimensionne la part fonds euros pour couvrir vos besoins de liquidité à court terme. Vous ne touchez jamais aux UC en période de baisse — sauf choix délibéré.',
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

export default function AVRisqueJauge() {
  const [mode, setMode] = useState('sans');
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

      {/* Résumé */}
      <div className={`rj-summary${isAvec ? ' rj-summary--good' : ' rj-summary--bad'}`}>
        {isAvec ? (
          <>
            <strong>Exposition globale réduite de ~80%</strong>
            <p>Mon accompagnement ne supprime pas les risques — il les rend maîtrisables. Chaque décision est prise après une analyse complète de votre situation.</p>
          </>
        ) : (
          <>
            <strong>Exposition globale sans accompagnement : élevée</strong>
            <p>Souscrire une assurance vie sans conseil expose à des erreurs silencieuses qui coûtent des milliers d'euros sur 20 ans. Cliquez sur "Avec Orizia" pour voir la différence.</p>
          </>
        )}
      </div>
    </div>
  );
}
