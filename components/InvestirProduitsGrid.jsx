'use client';

import { useState } from 'react';
import Link from 'next/link';

const PRODUITS = [
  {
    href: '/investir/scpi',
    icon: '🏢',
    title: 'SCPI',
    sub: 'Immobilier de rendement',
    desc: 'Percevez des loyers trimestriels sans gérer un seul bien. Accès à l\'immobilier professionnel dès 1 000€.',
    rendement: '4–6%',
    horizon: '8–10 ans',
    risque: 'Modéré',
    risqueColor: '#d97706',
    tag: 'Revenus réguliers',
    tagBg: 'rgba(45,106,95,0.1)',
    tagColor: 'var(--orizia-primary)',
    accentColor: 'var(--orizia-primary)',
    points: ['Zéro gestion locative', 'Loyers trimestriels', 'Dès 1 000€'],
  },
  {
    href: '/investir/assurance-vie',
    icon: '🛡️',
    title: 'Assurance Vie',
    sub: 'Épargne & transmission',
    desc: 'L\'enveloppe fiscale la plus puissante. Épargne disponible, fiscalité allégée après 8 ans, transmission hors succession.',
    rendement: '2,5–5%',
    horizon: '8 ans+',
    risque: 'Faible à modéré',
    risqueColor: '#16a34a',
    tag: 'Liquidité & Fiscalité',
    tagBg: 'rgba(26,61,53,0.08)',
    tagColor: 'var(--orizia-accent)',
    accentColor: 'var(--orizia-accent)',
    points: ['Capital disponible', 'Fiscalité 7,5% après 8 ans', '152 500€ exonérés/bénéf.'],
    featured: true,
  },
  {
    href: '/investir/per',
    icon: '🏦',
    title: 'PER',
    sub: 'Retraite & défiscalisation',
    desc: 'Le seul placement avec un rendement fiscal garanti dès jour 1. Jusqu\'à 4 100€ récupérés sur l\'impôt pour 10 000€ versés.',
    rendement: '4–7% + fiscal',
    horizon: 'Retraite',
    risque: 'Modéré',
    risqueColor: '#d97706',
    tag: 'Réduction d\'impôt',
    tagBg: 'rgba(180,83,9,0.08)',
    tagColor: '#b45309',
    accentColor: '#b45309',
    points: ['Déduction fiscale immédiate', 'Plafond TNS ~85 000€/an', '0% frais sur versements'],
  },
  {
    href: '/investir/crowdfunding',
    icon: '📈',
    title: 'Crowdfunding',
    sub: 'Financement participatif',
    desc: 'Financez des projets immobiliers sélectionnés et auditionnés. Rendement élevé sur une durée maîtrisée.',
    rendement: '8–12%',
    horizon: '12–36 mois',
    risque: 'Élevé',
    risqueColor: '#dc2626',
    tag: 'Rendement dynamique',
    tagBg: 'rgba(3,105,161,0.08)',
    tagColor: '#0369a1',
    accentColor: '#0369a1',
    points: ['Durée connue à l\'avance', 'Flat tax 30%', 'Dès 1 000€'],
  },
];

function RisqueBar({ niveau, color }) {
  const width = niveau === 'Faible à modéré' ? 30 : niveau === 'Modéré' ? 55 : 80;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: 'rgba(26,61,53,0.1)', borderRadius: 100, overflow: 'hidden' }}>
        <div style={{ width: `${width}%`, height: '100%', background: color, borderRadius: 100 }} />
      </div>
      <span style={{ fontSize: '0.7rem', fontWeight: 700, color, minWidth: 90 }}>{niveau}</span>
    </div>
  );
}

export default function InvestirProduitsGrid() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="ipg-grid">
      {PRODUITS.map(p => (
        <Link
          key={p.href}
          href={p.href}
          className={`ipg-card${p.featured ? ' ipg-card--featured' : ''}`}
          style={{ borderTopColor: p.accentColor }}
          onMouseEnter={() => setHovered(p.href)}
          onMouseLeave={() => setHovered(null)}
        >
          {p.featured && (
            <div className="ipg-card-featured-badge">⭐ Le plus polyvalent</div>
          )}

          {/* Header */}
          <div className="ipg-card-header">
            <span className="ipg-card-icon">{p.icon}</span>
            <div>
              <div className="ipg-card-title">{p.title}</div>
              <div className="ipg-card-sub">{p.sub}</div>
            </div>
            <span className="ipg-card-tag" style={{ background: p.tagBg, color: p.tagColor }}>
              {p.tag}
            </span>
          </div>

          {/* Description */}
          <p className="ipg-card-desc">{p.desc}</p>

          {/* Stats */}
          <div className="ipg-card-stats">
            <div className="ipg-card-stat">
              <div className="ipg-card-stat-label">Rendement</div>
              <div className="ipg-card-stat-val" style={{ color: p.accentColor }}>{p.rendement}</div>
            </div>
            <div className="ipg-card-stat">
              <div className="ipg-card-stat-label">Horizon</div>
              <div className="ipg-card-stat-val">{p.horizon}</div>
            </div>
          </div>

          {/* Risque */}
          <div className="ipg-card-risque">
            <div className="ipg-card-stat-label" style={{ marginBottom: 5 }}>Niveau de risque</div>
            <RisqueBar niveau={p.risque} color={p.risqueColor} />
          </div>

          {/* Points clés */}
          <ul className="ipg-card-points">
            {p.points.map(pt => (
              <li key={pt}>
                <span style={{ color: p.accentColor }}>✓</span> {pt}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="ipg-card-cta" style={{ color: p.accentColor }}>
            En savoir plus
          </div>
        </Link>
      ))}
    </div>
  );
}
