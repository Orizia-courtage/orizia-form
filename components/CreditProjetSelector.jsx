'use client';

import { useState } from 'react';
import ContactPopup from '@/components/ContactPopup';

const PROJETS = [
  {
    id: 'primo',
    icon: '🔑',
    label: 'Primo-accédant',
    desc: 'Mon premier achat',
    featured: true,
    badge: '⭐ Le plus courant',
  },
  {
    id: 'locatif',
    icon: '🏢',
    label: 'Investissement locatif',
    desc: 'Construire mon patrimoine',
    featured: false,
    badge: null,
  },
  {
    id: 'secundo',
    icon: '🏡',
    label: 'Achat-Revente',
    desc: 'Acheter avant d\'avoir vendu',
    featured: false,
    badge: null,
  },
];

const DETAILS = {
  primo: {
    color: 'var(--orizia-primary)',
    bg: 'rgba(45,106,95,0.05)',
    border: 'rgba(45,106,95,0.2)',
    titre: 'Primo-accédant : votre premier achat, bien préparé',
    points: [
      'Calcul du Prêt à Taux Zéro (PTZ) selon votre zone géographique',
      'Accompagnement de A à Z — de la promesse à la remise des clés',
      'Pédagogie bancaire : je vous explique chaque ligne du contrat',
      'Optimisation de l\'apport personnel pour maximiser votre enveloppe',
    ],
    conseil: 'Le PTZ peut financer jusqu\'à 40% de votre achat sans intérêts. Beaucoup de primo-accédants passent à côté faute de l\'avoir demandé. Je vérifie systématiquement votre éligibilité.',
    astuce: 'Contactez-moi avant même de commencer vos visites. Je vous donne une enveloppe précise — vous visitez sereinement et faites des offres avec une attestation de faisabilité.',
  },
  locatif: {
    color: '#d97706',
    bg: 'rgba(217,119,6,0.05)',
    border: 'rgba(217,119,6,0.2)',
    titre: 'Investissement locatif : l\'effet de levier au maximum',
    points: [
      'Optimisation de l\'effet de levier bancaire',
      'Stratégie de déficit foncier ou LMNP selon votre TMI',
      'Minimisation de l\'apport demandé pour préserver votre trésorerie',
      'Maintien de votre capacité d\'endettement pour les projets futurs',
    ],
    conseil: 'Un investissement locatif bien financé peut s\'autofinancer partiellement grâce aux loyers. Je structure le montage pour que votre effort mensuel soit minimal.',
    astuce: 'Votre TMI détermine la stratégie fiscale optimale (déficit foncier, LMNP, SCI). Je coordonne avec votre comptable si nécessaire.',
  },
  secundo: {
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.05)',
    border: 'rgba(124,58,237,0.2)',
    titre: 'Achat-Revente : sécuriser la transition',
    points: [
      'Mise en place d\'un prêt relais pour acheter avant de vendre',
      'Gestion de la transition de trésorerie sans stress',
      'Négociation des indemnités de remboursement anticipé (IRA)',
      'Financement de la nouvelle résidence principale',
    ],
    conseil: 'Le prêt relais est souvent mal compris et mal négocié. Je structure la transition pour que vous ne soyez jamais en difficulté de trésorerie entre les deux opérations.',
    astuce: 'Si votre bien actuel n\'est pas encore vendu, je peux intégrer une clause de remboursement anticipé sans pénalité dans le nouveau prêt.',
  },
};

export default function CreditProjetSelector() {
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
            {p.badge && <span className="cps-btn-badge" style={{ background: selected === p.id && detail ? detail.color : 'var(--orizia-primary)' }}>{p.badge}</span>}
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
              <li key={pt}>
                <span style={{ color: detail.color }}>✓</span> {pt}
              </li>
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

          <ContactPopup label="📅 Étudier mon projet →" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 16 }} />
        </div>
      )}
    </div>
  );
}
