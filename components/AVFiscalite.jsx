'use client';

import { useState } from 'react';
import ContactPopup from '@/components/ContactPopup';

import Icon from '@/components/Icon';
const TRANCHES = [
  {
    id: 'avant4',
    label: '0–4 ans',
    icon: 'hourglass',
    badge: null,
    color: '#b0473b',
    bg: 'rgba(176,71,59,0.05)',
    border: 'rgba(176,71,59,0.2)',
    tag: 'Peu favorable',
    tagColor: '#b0473b',
    tagBg: 'rgba(176,71,59,0.08)',
    titre: 'Avant 4 ans',
    taux: '31,4%',
    taux_label: 'sur les gains',
    detail: [
      { label: 'Flat tax (PFNL)', value: '12,8%' },
      { label: 'Prélèvements sociaux', value: '18,6%' },
      { label: 'Total', value: '31,4%', highlight: true },
    ],
    note: 'Option barème IR possible l\'année suivante si plus avantageux. Évitez les rachats dans cette période sauf nécessité.',
  },
  {
    id: 'entre4et8',
    label: '4–8 ans',
    icon: 'calendar-days',
    badge: null,
    color: '#a87a2c',
    bg: 'rgba(168,122,44,0.05)',
    border: 'rgba(168,122,44,0.2)',
    tag: 'En attente',
    tagColor: '#a87a2c',
    tagBg: 'rgba(168,122,44,0.08)',
    titre: 'De 4 à 8 ans',
    taux: '31,4%',
    taux_label: 'sur les gains',
    detail: [
      { label: 'Flat tax (PFNL)', value: '12,8%' },
      { label: 'Prélèvements sociaux', value: '18,6%' },
      { label: 'Total', value: '31,4%', highlight: true },
    ],
    note: 'Même taux qu\'avant 4 ans, mais vous approchez de la maturité fiscale. Patientez jusqu\'à 8 ans si possible.',
  },
  {
    id: 'apres8',
    label: '8 ans +',
    icon: 'star',
    badge: 'Optimal',
    color: '#3e7f68',
    bg: 'rgba(62,127,104,0.05)',
    border: 'rgba(62,127,104,0.2)',
    tag: 'Fiscalité optimale',
    tagColor: '#3e7f68',
    tagBg: 'rgba(62,127,104,0.08)',
    titre: 'Après 8 ans',
    taux: '7,5%',
    taux_label: 'après abattement',
    detail: [
      { label: 'Abattement annuel (seul)', value: '4 600€' },
      { label: 'Abattement annuel (couple)', value: '9 200€' },
      { label: 'Taux réduit sur surplus', value: '7,5%', highlight: true },
      { label: 'Prélèvements sociaux', value: '18,6%' },
    ],
    note: 'C\'est la fiscalité la plus avantageuse sur l\'épargne longue en France. Aucun autre placement ne combine disponibilité et fiscalité aussi allégée.',
  },
];

const TRANSMISSION = [
  {
    icon: 'baby',
    label: 'Versements avant 70 ans',
    value: '152 500€',
    desc: 'par bénéficiaire, exonérés de droits de succession',
    color: 'var(--orizia-primary)',
  },
  {
    icon: 'user-round',
    label: 'Versements après 70 ans',
    value: '30 500€',
    desc: 'abattement global sur les primes (gains toujours exonérés)',
    color: '#a87a2c',
  },
  {
    icon: 'heart-handshake',
    label: 'Conjoint / PACS',
    value: '100%',
    desc: 'exonération totale, sans plafond',
    color: '#3e7f68',
  },
];

export default function AVFiscalite() {
  const [active, setActive] = useState('apres8');
  const tranche = TRANCHES.find(t => t.id === active);

  return (
    <div className="avfis-wrap">

      {/* Sélecteur de tranche */}
      <div className="avfis-selector">
        {TRANCHES.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`avfis-btn${active === t.id ? ' avfis-btn--active' : ''}${t.id === 'apres8' ? ' avfis-btn--best' : ''}`}
            style={active === t.id ? { borderColor: t.color, background: t.bg } : {}}
          >
            {t.id === 'apres8' && (
              <span className="avfis-btn-ribbon" style={{ background: t.color }}>Optimal</span>
            )}
            <span className="avfis-btn-icon"><Icon name={t.icon} /></span>
            <span className="avfis-btn-label">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Panneau détail */}
      {tranche && (
        <div className="avfis-panel" style={{ borderColor: tranche.border }}>
          <div className="avfis-panel-header">
            <div>
              <h3 className="avfis-panel-titre" style={{ color: tranche.color }}>{tranche.titre}</h3>
              <span
                className="avfis-panel-tag"
                style={{ color: tranche.tagColor, background: tranche.tagBg }}
              >
                {tranche.tag}
              </span>
            </div>
            <div className="avfis-panel-taux" style={{ color: tranche.color }}>
              <div className="avfis-panel-taux-value">{tranche.taux}</div>
              <div className="avfis-panel-taux-label">{tranche.taux_label}</div>
            </div>
          </div>

          <div className="avfis-detail-grid">
            {tranche.detail.map(d => (
              <div
                key={d.label}
                className={`avfis-detail-row${d.highlight ? ' avfis-detail-row--highlight' : ''}`}
                style={d.highlight ? { borderColor: tranche.color, color: tranche.color } : {}}
              >
                <span className="avfis-detail-label">{d.label}</span>
                <span className="avfis-detail-value">{d.value}</span>
              </div>
            ))}
          </div>

          <div className="avfis-note">
            <span><Icon name="message-circle" /></span>
            <p>{tranche.note}</p>
          </div>
        </div>
      )}

      {/* Bloc transmission */}
      <div className="avfis-transmission">
        <div className="avfis-transmission-title">
          <Icon name="gift" /> Transmission : l'atout que votre banque ne met jamais en avant
        </div>
        <div className="avfis-transmission-grid">
          {TRANSMISSION.map(t => (
            <div key={t.label} className="avfis-transm-card" style={{ borderTop: `3px solid ${t.color}` }}>
              <div className="avfis-transm-icon"><Icon name={t.icon} /></div>
              <div className="avfis-transm-label">{t.label}</div>
              <div className="avfis-transm-value" style={{ color: t.color }}>{t.value}</div>
              <div className="avfis-transm-desc">{t.desc}</div>
            </div>
          ))}
        </div>
        <div className="crowd-risques-note" style={{ marginTop: 16 }}>
          <Icon name="lightbulb" /> <strong>Exemple concret :</strong> avec 2 enfants bénéficiaires, vous pouvez transmettre jusqu'à{' '}
          <strong>305 000€ totalement exonérés</strong> de droits de succession via votre assurance vie.
          Aucun autre placement ne permet ça.
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 28 }}>
      <ContactPopup label="Optimiser ma fiscalité avec Cindy" icon="calendar-days" className="fin-btn-primary" />
      </div>

    </div>
  );
}
