'use client';

import { useState } from 'react';

const USAGES = [
  {
    id: 'epargne',
    icon: '💰',
    label: 'Épargner',
    color: 'var(--orizia-primary)',
    bg: 'rgba(45,106,95,0.06)',
    border: 'rgba(45,106,95,0.2)',
    titre: 'Une épargne disponible à tout moment',
    desc: 'Contrairement à une idée reçue, votre argent n\'est pas bloqué. Vous pouvez effectuer des rachats partiels ou totaux en quelques jours ouvrés. La durée de 8 ans n\'est qu\'un seuil de maturité fiscale — pas une période d\'immobilisation.',
    chiffre: '2,5–5%/an',
    chiffre_label: 'selon votre profil',
  },
  {
    id: 'transmettre',
    icon: '🎁',
    label: 'Transmettre',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.06)',
    border: 'rgba(217,119,6,0.2)',
    titre: 'L\'outil de transmission le plus puissant',
    desc: 'Le capital est versé directement aux bénéficiaires désignés, hors succession. Jusqu\'à 152 500€ par bénéficiaire transmis sans droits de succession pour les versements avant 70 ans. Avec 2 enfants : 305 000€ exonérés.',
    chiffre: '152 500€',
    chiffre_label: 'exonérés par bénéficiaire',
  },
  {
    id: 'optimiser',
    icon: '🧾',
    label: 'Optimiser sa fiscalité',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.06)',
    border: 'rgba(124,58,237,0.2)',
    titre: 'La fiscalité la plus avantageuse sur l\'épargne longue',
    desc: 'Après 8 ans : abattement annuel de 4 600€ (9 200€ en couple) sur les gains, puis taux réduit à 7,5%. Aucun autre placement ne combine épargne disponible et fiscalité aussi allégée sur le long terme.',
    chiffre: '7,5%',
    chiffre_label: 'taux réduit après 8 ans',
  },
  {
    id: 'investir',
    icon: '📈',
    label: 'Investir sur les marchés',
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.06)',
    border: 'rgba(22,163,74,0.2)',
    titre: 'Accès aux meilleures classes d\'actifs',
    desc: 'SCPI, ETF monde, fonds actions, private equity, obligations — tout dans une seule enveloppe. Vous combinez la sécurité du fonds en euros avec le potentiel des unités de compte selon votre horizon.',
    chiffre: '4–8%/an',
    chiffre_label: 'potentiel UC long terme',
  },
];

const SUPPORTS = [
  {
    icon: '🏦',
    label: 'Fonds en euros',
    desc: 'Capital garanti par l\'assureur. Rendement stable, idéal pour la part sécurisée.',
    rendement: '2,5–3,5%/an',
    risque: 'Très faible',
    risqueColor: '#16a34a',
  },
  {
    icon: '📊',
    label: 'Unités de compte',
    desc: 'Actions, obligations, SCPI, ETF… Potentiel de performance élevé sur le long terme.',
    rendement: '4–8%/an',
    risque: 'Modéré à élevé',
    risqueColor: '#d97706',
  },
];

export default function AVDefinition() {
  const [active, setActive] = useState('epargne');
  const detail = USAGES.find(u => u.id === active);

  return (
    <div className="avdef-wrap">

      {/* Onglets usage */}
      <div className="avdef-tabs">
        {USAGES.map(u => (
          <button
            key={u.id}
            onClick={() => setActive(u.id)}
            className={`avdef-tab${active === u.id ? ' avdef-tab--active' : ''}`}
            style={active === u.id ? { borderColor: u.color, color: u.color, background: u.bg } : {}}
          >
            <span className="avdef-tab-icon">{u.icon}</span>
            <span className="avdef-tab-label">{u.label}</span>
          </button>
        ))}
      </div>

      {/* Panneau détail */}
      {detail && (
        <div className="avdef-panel" style={{ borderColor: detail.border, background: detail.bg }}>
          <div className="avdef-panel-left">
            <div className="avdef-panel-icon" style={{ color: detail.color }}>{detail.icon}</div>
            <h3 className="avdef-panel-title" style={{ color: detail.color }}>{detail.titre}</h3>
            <p className="avdef-panel-desc">{detail.desc}</p>
          </div>
          <div className="avdef-panel-right">
            <div className="avdef-panel-chiffre" style={{ color: detail.color }}>{detail.chiffre}</div>
            <div className="avdef-panel-chiffre-label">{detail.chiffre_label}</div>
          </div>
        </div>
      )}

      {/* Supports */}
      <div className="avdef-supports-title">Les deux supports disponibles dans votre contrat</div>
      <div className="avdef-supports">
        {SUPPORTS.map(s => (
          <div key={s.label} className="avdef-support">
            <div className="avdef-support-icon">{s.icon}</div>
            <div className="avdef-support-label">{s.label}</div>
            <div className="avdef-support-desc">{s.desc}</div>
            <div className="avdef-support-stats">
              <div className="avdef-support-stat">
                <span className="avdef-support-stat-label">Rendement potentiel</span>
                <span className="avdef-support-stat-value" style={{ color: 'var(--orizia-primary)' }}>{s.rendement}</span>
              </div>
              <div className="avdef-support-stat">
                <span className="avdef-support-stat-label">Niveau de risque</span>
                <span className="avdef-support-stat-value" style={{ color: s.risqueColor }}>{s.risque}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
