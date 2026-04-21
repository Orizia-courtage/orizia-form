'use client';

import { useState } from 'react';
import ContactPopup from '@/components/ContactPopup';

const PROFILS = [
  {
    id: 'jeune',
    icon: '🎓',
    label: 'Jeune conducteur',
    desc: '< 3 ans de permis',
  },
  {
    id: 'experimente',
    icon: '🚗',
    label: 'Conducteur expérimenté',
    desc: 'Bonus 50%, pas de sinistre',
    featured: true,
  },
  {
    id: 'malus',
    icon: '⚠️',
    label: 'Avec malus / sinistre',
    desc: 'Historique chargé',
  },
  {
    id: 'motard',
    icon: '🏍️',
    label: 'Motard',
    desc: 'Moto ou scooter',
  },
];

const DETAILS = {
  jeune: {
    color: '#dc2626',
    bg: 'rgba(220,38,38,0.05)',
    border: 'rgba(220,38,38,0.2)',
    titre: 'Jeune conducteur : la surprime, on peut la réduire',
    points: [
      'La surprime légale s\'applique les 2–3 premières années',
      'La conduite accompagnée (AAC) réduit significativement la prime',
      'Un boîtier télématique peut faire baisser le tarif de 15 à 25%',
      'Certains assureurs sont spécialisés jeunes conducteurs',
    ],
    conseil: 'Je démarche les assureurs qui sont plus cléments avec les novices. La différence peut aller jusqu\'à 40% sur la prime annuelle.',
    astuce: 'Si vous avez fait la conduite accompagnée, mentionnez-le systématiquement — c\'est un argument fort.',
  },
  experimente: {
    color: 'var(--orizia-primary)',
    bg: 'rgba(45,106,95,0.05)',
    border: 'rgba(45,106,95,0.2)',
    titre: 'Conducteur expérimenté : vous devriez payer le prix plancher',
    points: [
      'Bonus 50% depuis plusieurs années = tarif plancher possible',
      'Regroupement familial (auto + habitation) très avantageux',
      'Rachat de franchise intéressant à ce niveau de bonus',
      'Attention à l\'érosion de fidélité si vous n\'avez pas changé depuis 5 ans',
    ],
    conseil: 'Si vous n\'avez pas changé d\'assureur depuis plus de 3 ans, vous payez très probablement trop cher. C\'est le profil où je fais le plus d\'économies.',
    astuce: 'Votre bonus 50% est transférable d\'un assureur à l\'autre — c\'est votre meilleur argument de négociation.',
  },
  malus: {
    color: '#d97706',
    bg: 'rgba(217,119,6,0.05)',
    border: 'rgba(217,119,6,0.2)',
    titre: 'Avec malus : des solutions existent',
    points: [
      'Certaines compagnies spécialisées acceptent les profils à risque',
      'Le malus diminue chaque année sans sinistre (coefficient 0,95/an)',
      'Une franchise plus élevée peut compenser le surcoût',
      'Le regroupement de contrats peut aider à négocier',
    ],
    conseil: 'Même avec un malus, je sais à quelle porte frapper. Il existe des assureurs spécialisés qui proposent des tarifs bien plus compétitifs que votre assureur actuel.',
    astuce: 'Ne mentez jamais sur votre historique — c\'est un motif de nullité du contrat. Mais il existe des solutions légales pour optimiser.',
  },
  motard: {
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.05)',
    border: 'rgba(124,58,237,0.2)',
    titre: 'Motard : un contrat modulable selon votre usage',
    points: [
      'Garantie équipement (casque, gants, cuir) souvent négligée',
      'Option suspension hivernale si vous rangez la moto 4 mois',
      'Assistance 0 km indispensable sur route',
      'La cylindrée détermine la formule optimale',
    ],
    conseil: 'Si votre moto hiberne 4 mois dans l\'année, votre facture aussi. Je construis des contrats modulables avec suspension de garanties en hiver.',
    astuce: 'La garantie équipement est souvent sous-estimée — un casque haut de gamme coûte 500 à 1 500€. Vérifiez qu\'il est couvert.',
  },
};

export default function AutoProfilSelector() {
  const [selected, setSelected] = useState(null);
  const detail = selected ? DETAILS[selected] : null;

  return (
    <div className="aps-wrap">
      <div className="aps-label">Je suis…</div>
      <div className="aps-grid">
        {PROFILS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(selected === p.id ? null : p.id)}
            className={`aps-btn${selected === p.id ? ' aps-btn--active' : ''}${p.featured ? ' aps-btn--featured' : ''}`}
            style={selected === p.id && detail ? { borderColor: detail.color, background: detail.bg } : {}}
          >
            {p.featured && <span className="aps-btn-badge">✅ Profil le plus courant</span>}
            <span className="aps-btn-icon">{p.icon}</span>
            <span className="aps-btn-label">{p.label}</span>
            <span className="aps-btn-desc">{p.desc}</span>
          </button>
        ))}
      </div>

      {detail && (
        <div className="aps-detail" style={{ borderColor: detail.border }}>
          <h3 className="aps-detail-titre" style={{ color: detail.color }}>{detail.titre}</h3>

          <ul className="aps-detail-points">
            {detail.points.map(pt => (
              <li key={pt}>
                <span style={{ color: detail.color }}>✓</span> {pt}
              </li>
            ))}
          </ul>

          <div className="aps-detail-conseil">
            <span>💬</span>
            <p>{detail.conseil}</p>
          </div>

          <div className="aps-detail-astuce">
            <span>💡</span>
            <p><strong>Astuce :</strong> {detail.astuce}</p>
          </div>

          <ContactPopup label="📅 Étudier mon profil avec Cindy" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 16 }} />
        </div>
      )}
    </div>
  );
}
