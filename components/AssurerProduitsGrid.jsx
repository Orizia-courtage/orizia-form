'use client';

import { useState } from 'react';
import Link from 'next/link';

const PRODUITS = [
  {
    href: '/assurer/assurance-emprunteur',
    icon: '📋',
    title: 'Assurance Emprunteur',
    sub: 'Le plus gros levier d\'économie',
    desc: 'Votre banque vous facture 2 à 3 fois trop cher. La loi Lemoine vous libère à tout moment — je gère le bras de fer à votre place.',
    economie: 'Jusqu\'à 15 000€',
    economie_label: 'économisés sur la durée',
    loi: 'Loi Lemoine',
    loiColor: '#16a34a',
    loiBg: 'rgba(22,163,74,0.08)',
    accentColor: '#16a34a',
    points: ['Changement à tout moment', 'Mêmes garanties, prix divisé par 2', 'Je gère la résiliation'],
    featured: true,
    badge: '💰 Économie maximale',
  },
  {
    href: '/assurer/assurance-habitation',
    icon: '🏠',
    title: 'Assurance Habitation',
    sub: 'Votre cocon au juste prix',
    desc: '+7% en 2026. Je compare les offres MRH pour locataires, propriétaires et PNO, et je résilie votre ancien contrat sans coupure.',
    economie: '~250€/an',
    economie_label: 'd\'économies possibles',
    loi: 'Loi Hamon',
    loiColor: '#d97706',
    loiBg: 'rgba(217,119,6,0.08)',
    accentColor: '#d97706',
    points: ['Locataire, propriétaire ou PNO', 'Garanties sur-mesure', 'Résiliation sans coupure'],
    featured: false,
    badge: null,
  },
  {
    href: '/assurer/auto-moto',
    icon: '🚗',
    title: 'Assurance Auto & Moto',
    sub: 'Roulez au juste prix',
    desc: 'Tiers, intermédiaire ou tous risques — j\'adapte la formule à la valeur réelle de votre véhicule et je contrecarre la taxe de fidélité.',
    economie: '~200€/an',
    economie_label: 'd\'économies constatées',
    loi: 'Loi Hamon',
    loiColor: 'var(--orizia-primary)',
    loiBg: 'rgba(45,106,95,0.08)',
    accentColor: 'var(--orizia-primary)',
    points: ['Formule adaptée à votre véhicule', 'Profil jeune conducteur ou motard', 'Résiliation sans coupure'],
    featured: false,
    badge: null,
  },
];

export default function AssurerProduitsGrid() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="apg-grid">
      {PRODUITS.map(p => (
        <Link
          key={p.href}
          href={p.href}
          className={`apg-card${p.featured ? ' apg-card--featured' : ''}`}
          style={{ borderTopColor: p.accentColor }}
          onMouseEnter={() => setHovered(p.href)}
          onMouseLeave={() => setHovered(null)}
        >
          {p.featured && (
            <div className="apg-card-featured-badge">⭐ Économie maximale</div>
          )}

          {/* Header */}
          <div className="apg-card-header">
            <span className="apg-card-icon">{p.icon}</span>
            <div>
              <div className="apg-card-title">{p.title}</div>
              <div className="apg-card-sub">{p.sub}</div>
            </div>
          </div>

          {/* Description */}
          <p className="apg-card-desc">{p.desc}</p>

          {/* Économie */}
          <div className="apg-card-economie" style={{ background: p.loiBg }}>
            <div className="apg-card-economie-val" style={{ color: p.accentColor }}>{p.economie}</div>
            <div className="apg-card-economie-label">{p.economie_label}</div>
          </div>

          {/* Loi */}
          <div className="apg-card-loi" style={{ color: p.loiColor, background: p.loiBg }}>
            ✅ {p.loi} — résiliation libre
          </div>

          {/* Points */}
          <ul className="apg-card-points">
            {p.points.map(pt => (
              <li key={pt}>
                <span style={{ color: p.accentColor }}>✓</span> {pt}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="apg-card-cta" style={{ color: p.accentColor }}>
            Optimiser ce contrat
          </div>
        </Link>
      ))}
    </div>
  );
}
