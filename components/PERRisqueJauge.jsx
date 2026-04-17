'use client';

import { useState } from 'react';

const RISQUES = [
  {
    id: 'blocage',
    label: 'Blocage de l\'épargne',
    icon: '🔒',
    sans: 80,
    avec: 20,
    desc_sans: 'Sans stratégie globale, le blocage du PER peut créer une tension de liquidité si vous n\'avez pas d\'épargne de précaution par ailleurs.',
    desc_avec: 'Je dimensionne le PER en complément d\'une assurance vie liquide. Votre épargne disponible reste accessible à tout moment — le PER ne représente que la part "retraite + fiscal".',
  },
  {
    id: 'uc',
    label: 'Perte en capital (UC)',
    icon: '📉',
    sans: 65,
    avec: 18,
    desc_sans: 'Investir en unités de compte sans gestion pilotée expose à des baisses de marché non anticipées, surtout à l\'approche de la retraite.',
    desc_avec: 'J\'utilise la gestion pilotée : forte exposition UC jeune, sécurisation progressive automatique à l\'approche de l\'échéance. Le risque diminue quand vous en avez le plus besoin.',
  },
  {
    id: 'fiscal',
    label: 'Imposition à la sortie',
    icon: '🧾',
    sans: 55,
    avec: 15,
    desc_sans: 'Si votre TMI de retraite est identique à celui d\'aujourd\'hui, l\'avantage fiscal est limité. Beaucoup d\'épargnants ne font pas ce calcul avant de verser.',
    desc_avec: 'J\'estime votre TMI de retraite avant de valider la stratégie. Si le PER n\'est pas rentable dans votre cas, je vous oriente vers l\'assurance vie — sans vous vendre un produit inadapté.',
  },
  {
    id: 'frais',
    label: 'Frais excessifs (contrat bancaire)',
    icon: '🏦',
    sans: 75,
    avec: 5,
    desc_sans: 'Un PER bancaire avec 3% de frais sur versements sur 25 ans peut vous coûter 30 000€ de performance nette. La déduction fiscale attire l\'œil — les frais la rongent discrètement.',
    desc_avec: 'Mes contrats partenaires appliquent 0% de frais sur versements. Sur 25 ans, la différence est considérable — et c\'est gratuit pour vous.',
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

export default function PERRisqueJauge() {
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
            <strong>Exposition globale réduite de ~75%</strong>
            <p>Mon accompagnement ne supprime pas les risques du PER — il les rend maîtrisables. Chaque décision est prise après un audit fiscal complet de votre situation.</p>
          </>
        ) : (
          <>
            <strong>Exposition globale sans accompagnement : élevée</strong>
            <p>Ouvrir un PER seul, sans audit fiscal ni stratégie globale, expose à des erreurs coûteuses et difficiles à corriger. Cliquez sur "Avec Orizia" pour voir la différence.</p>
          </>
        )}
      </div>
    </div>
  );
}
