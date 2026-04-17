'use client';

import { useState } from 'react';
import Link from 'next/link';

const PROFILS = [
  {
    id: 'salarie',
    icon: '👔',
    label: 'Salarié cadre',
    desc: 'CDI, revenus stables',
  },
  {
    id: 'tns',
    icon: '⚙️',
    label: 'Indépendant / TNS',
    desc: 'Libéral, artisan, auto-entrepreneur',
  },
  {
    id: 'dirigeant',
    icon: '🏢',
    label: 'Dirigeant de société',
    desc: 'Gérant, PDG, associé',
  },
];

const DETAILS = {
  salarie: {
    tmi: ['30%', '41%'],
    plafond: '~35 000€/an',
    exemple: { versement: 10000, tmi: '41%', gain: 4100 },
    strategie: 'Versements mensuels réguliers + rattrapage des plafonds N-3 non utilisés.',
    conseil: 'Vérifiez votre avis d\'imposition rubrique "Plafond épargne retraite" — vous avez probablement des plafonds reportés des 3 dernières années.',
    color: 'var(--orizia-primary)',
    badge: null,
  },
  tns: {
    tmi: ['41%', '45%'],
    plafond: '~85 000€/an (Madelin)',
    exemple: { versement: 20000, tmi: '41%', gain: 8200 },
    strategie: 'Versements modulables selon le bénéfice annuel — versez plus les bonnes années, moins les années creuses.',
    conseil: 'Le plafond Madelin est 2,5× plus élevé que celui d\'un salarié. C\'est le levier fiscal le plus puissant disponible pour un indépendant.',
    color: '#d97706',
    badge: '⭐ Avantage maximal',
  },
  dirigeant: {
    tmi: ['41%', '45%'],
    plafond: 'Déduction IS + IR possible',
    exemple: { versement: 15000, tmi: '45%', gain: 6750 },
    strategie: 'Combinaison PER individuel + contrat Madelin via la société selon votre structure de rémunération.',
    conseil: 'Selon votre statut (SAS, SARL, EURL…), la stratégie optimale diffère. Un audit de votre rémunération est indispensable avant d\'ouvrir un PER.',
    color: '#7c3aed',
    badge: null,
  },
};

export default function PERProfilSelector() {
  const [selected, setSelected] = useState(null);
  const detail = selected ? DETAILS[selected] : null;

  return (
    <div className="per-profil-wrap">

      {/* Sélecteur */}
      <div className="per-profil-label">Je suis…</div>
      <div className="per-profil-grid">
        {PROFILS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(selected === p.id ? null : p.id)}
            className={`per-profil-btn${selected === p.id ? ' per-profil-btn--active' : ''}${p.id === 'tns' ? ' per-profil-btn--featured' : ''}`}
            style={selected === p.id ? { borderColor: DETAILS[p.id].color } : {}}
          >
            {p.id === 'tns' && (
              <span className="per-profil-btn-badge">⭐ Avantage maximal</span>
            )}
            <span className="per-profil-icon">{p.icon}</span>
            <span className="per-profil-name">{p.label}</span>
            <span className="per-profil-desc">{p.desc}</span>
          </button>
        ))}
      </div>

      {/* Détail animé */}
      {detail && (
        <div className="per-profil-detail" style={{ borderColor: detail.color }}>
          {detail.badge && (
            <div className="per-profil-detail-badge" style={{ background: detail.color }}>
              {detail.badge}
            </div>
          )}

          {/* Stats */}
          <div className="per-profil-stats">
            <div className="per-profil-stat">
              <div className="per-profil-stat-label">TMI typique</div>
              <div className="per-profil-stat-value" style={{ color: detail.color }}>
                {detail.tmi.join(' ou ')}
              </div>
            </div>
            <div className="per-profil-stat">
              <div className="per-profil-stat-label">Plafond déduction</div>
              <div className="per-profil-stat-value" style={{ color: detail.color }}>
                {detail.plafond}
              </div>
            </div>
            <div className="per-profil-stat">
              <div className="per-profil-stat-label">Exemple : {detail.exemple.versement.toLocaleString('fr-FR')}€ versés à {detail.exemple.tmi}</div>
              <div className="per-profil-stat-value" style={{ color: '#16a34a' }}>
                -{detail.exemple.gain.toLocaleString('fr-FR')}€ d'impôt
              </div>
            </div>
          </div>

          {/* Stratégie */}
          <div className="per-profil-strategie">
            <div className="per-profil-strategie-title" style={{ color: detail.color }}>
              📋 Stratégie recommandée
            </div>
            <p>{detail.strategie}</p>
          </div>

          {/* Conseil Cindy */}
          <div className="per-profil-conseil">
            <span>💬</span>
            <p>{detail.conseil}</p>
          </div>

          <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 16 }}>
            📅 Calculer mon gain pour ce profil
          </Link>
        </div>
      )}
    </div>
  );
}
