'use client';

import { useState } from 'react';
import ContactPopup from '@/components/ContactPopup';

const PROJETS = [
  {
    id: 'auto',
    icon: '🚗',
    label: 'Auto & Moto',
    desc: 'Neuf ou occasion',
    featured: false,
    badge: null,
  },
  {
    id: 'travaux',
    icon: '🔨',
    label: 'Travaux',
    desc: 'Rénovation, extension, énergie',
    featured: true,
    badge: '⭐ Le plus demandé',
  },
  {
    id: 'tresorerie',
    icon: '💸',
    label: 'Trésorerie & Projets',
    desc: 'Mariage, voyage, imprévus',
    featured: false,
    badge: null,
  },
];

const DETAILS = {
  auto: {
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.05)',
    border: 'rgba(22,163,74,0.2)',
    titre: 'Prêt Auto & Moto : le véhicule vous appartient à 100%',
    points: [
      'Taux souvent très avantageux sur les véhicules neufs',
      'Fonds débloqués rapidement — parfois en 48h',
      'Plus flexible qu\'une LOA/LLD : pas de kilométrage limité',
      'Revente libre à tout moment sans pénalité',
    ],
    conseil: 'Contrairement à la LOA, vous êtes propriétaire du véhicule dès le premier jour. Si vous revendez avant la fin du prêt, vous remboursez le capital restant et empêchez la banque de récupérer le bien.',
    astuce: 'Méfiez-vous des offres "0% en concession" — elles incluent souvent une majoration du prix du véhicule. Je compare le coût total réel.',
  },
  travaux: {
    color: '#d97706',
    bg: 'rgba(217,119,6,0.05)',
    border: 'rgba(217,119,6,0.2)',
    titre: 'Prêt Travaux : valorisez votre bien immobilier',
    points: [
      'Taux préférentiels pour l\'éco-rénovation (isolation, pompe à chaleur)',
      'Jusqu\'à 75 000€ de budget travaux',
      'Nécessite généralement des devis d\'artisans',
      'Augmente la valeur de votre bien et réduit vos factures d\'énergie',
    ],
    conseil: 'Pour les travaux de rénovation énergétique, des aides comme MaPrimeRénov\' peuvent se cumuler avec votre prêt. Je vous aide à optimiser le montage pour minimiser votre reste à charge.',
    astuce: 'Un prêt travaux "affecté" (lié à des devis précis) a souvent un taux plus bas qu\'un prêt personnel classique. Je vérifie quelle formule est la plus avantageuse pour vous.',
  },
  tresorerie: {
    color: 'var(--orizia-primary)',
    bg: 'rgba(45,106,95,0.05)',
    border: 'rgba(45,106,95,0.2)',
    titre: 'Prêt Trésorerie : liberté totale d\'utilisation',
    points: [
      'Aucun justificatif d\'achat demandé',
      'Mensualité fixe et connue à l\'avance',
      'Alternative saine au crédit renouvelable toxique',
      'Idéal pour les projets de vie (mariage, voyage, études)',
    ],
    conseil: 'Le prêt personnel non affecté est la meilleure alternative au crédit revolving. Vous savez exactement quand vous aurez fini de rembourser — pas de mauvaise surprise.',
    astuce: 'Si votre besoin est inférieur à 3 000€, comparez avec un découvert autorisé ou une épargne disponible. Pour les montants plus élevés, le prêt personnel est presque toujours moins cher.',
  },
};

export default function PretProjetSelector() {
  const [selected, setSelected] = useState(null);
  const detail = selected ? DETAILS[selected] : null;

  return (
    <div className="cps-wrap">
      <div className="cps-label">Mon projet est…</div>
      <div className="cps-grid">
        {PROJETS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(selected === p.id ? null : p.id)}
            className={`cps-btn${selected === p.id ? ' cps-btn--active' : ''}${p.featured ? ' cps-btn--featured' : ''}`}
            style={selected === p.id && detail ? { borderColor: detail.color, background: detail.bg } : {}}
          >
            {p.badge && (
              <span className="cps-btn-badge" style={{ background: selected === p.id && detail ? detail.color : '#d97706' }}>
                {p.badge}
              </span>
            )}
            <span className="cps-btn-icon">{p.icon}</span>
            <span className="cps-btn-label">{p.label}</span>
            <span className="cps-btn-desc">{p.desc}</span>
          </button>
        ))}
      </div>

      {detail && (
        <div className="cps-detail" style={{ borderColor: detail.border, background: detail.bg }}>
          <h3 className="cps-detail-titre" style={{ color: detail.color }}>{detail.titre}</h3>
          <ul className="cps-detail-points">
            {detail.points.map(pt => (
              <li key={pt}><span style={{ color: detail.color }}>✓</span> {pt}</li>
            ))}
          </ul>
          <div className="cps-detail-conseil">
            <span>💬</span>
            <p>{detail.conseil}</p>
          </div>
          <div className="cps-detail-astuce">
            <span>💡</span>
            <p><strong>Astuce :</strong> {detail.astuce}</p>
          </div>
          <ContactPopup label="📅 Étudier mon financement" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 16 }} />
        </div>
      )}
    </div>
  );
}
