'use client';

import { useState } from 'react';
import Link from 'next/link';

const PROFILS = [
  { id: 'tmi_eleve', label: 'TMI 30%+', icon: '💼', desc: 'Cadre, TNS, dirigeant' },
  { id: 'tmi_faible', label: 'TMI < 30%', icon: '👤', desc: 'Revenus modérés' },
  { id: 'transmission', label: 'Transmission', icon: '🎁', desc: 'Préparer sa succession' },
  { id: 'liquidite', label: 'Liquidité', icon: '💧', desc: 'Besoin d\'épargne disponible' },
];

const RECOMMANDATIONS = {
  tmi_eleve: {
    titre: 'Priorité PER, complété par l\'Assurance Vie',
    per: { score: 90, label: 'Prioritaire', color: '#16a34a' },
    av: { score: 60, label: 'Complémentaire', color: '#d97706' },
    conseil: 'À 41% de TMI, chaque euro versé sur le PER vous rapporte 0,41€ d\'impôt en moins dès l\'année suivante. L\'AV prend le relais pour l\'épargne liquide.',
  },
  tmi_faible: {
    titre: 'Assurance Vie en priorité, PER en complément',
    per: { score: 45, label: 'Complémentaire', color: '#d97706' },
    av: { score: 85, label: 'Prioritaire', color: '#16a34a' },
    conseil: 'Avec un TMI faible, l\'avantage fiscal du PER est limité. L\'AV offre plus de flexibilité et une fiscalité avantageuse après 8 ans.',
  },
  transmission: {
    titre: 'Les deux sont complémentaires pour la transmission',
    per: { score: 75, label: 'Très utile', color: '#16a34a' },
    av: { score: 80, label: 'Incontournable', color: '#16a34a' },
    conseil: 'PER et AV transmettent tous les deux hors succession. L\'AV offre jusqu\'à 152 500€ par bénéficiaire exonérés. Le PER complète avec les mêmes règles.',
  },
  liquidite: {
    titre: 'Assurance Vie — le PER en parallèle si TMI élevé',
    per: { score: 30, label: 'Secondaire', color: '#dc2626' },
    av: { score: 95, label: 'Indispensable', color: '#16a34a' },
    conseil: 'Si vous avez besoin de liquidité, le PER n\'est pas adapté (épargne bloquée). L\'AV reste disponible à tout moment. Ouvrez un PER uniquement si votre TMI le justifie.',
  },
};

const CRITERES = [
  { label: 'Déduction fiscale à l\'entrée', per: '✅ Oui — jusqu\'à 45% de TMI', av: '❌ Non' },
  { label: 'Disponibilité de l\'épargne', per: '⚠️ Bloqué (exceptions légales)', av: '✅ Disponible à tout moment' },
  { label: 'Fiscalité à la sortie', per: '📋 IR sur primes + PFU 30% gains', av: '✅ Abattement + 7,5% après 8 ans' },
  { label: 'Transmission au décès', per: '✅ Hors succession', av: '✅ 152 500€/bénéf. exonérés' },
  { label: 'Plafond de versement', per: '📋 ~35k à ~85k€/an', av: '♾️ Illimité' },
];

function ScoreBar({ score, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 8, background: 'rgba(26,61,53,0.1)', borderRadius: 100, overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: 100, transition: 'width 0.6s ease' }} />
      </div>
      <span style={{ fontSize: '0.78rem', fontWeight: 800, color, minWidth: 28 }}>{score}%</span>
    </div>
  );
}

export default function PERvsAV() {
  const [profil, setProfil] = useState(null);
  const reco = profil ? RECOMMANDATIONS[profil] : null;

  return (
    <div className="pervsav-wrap">

      {/* Sélecteur profil */}
      <div className="pervsav-profils">
        <div className="pervsav-profils-label">Quel est votre objectif principal ?</div>
        <div className="pervsav-profils-grid">
          {PROFILS.map(p => (
            <button
              key={p.id}
              onClick={() => setProfil(profil === p.id ? null : p.id)}
              className={`pervsav-profil-btn${profil === p.id ? ' pervsav-profil-btn--active' : ''}`}
            >
              <span className="pervsav-profil-icon">{p.icon}</span>
              <span className="pervsav-profil-label">{p.label}</span>
              <span className="pervsav-profil-desc">{p.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommandation personnalisée */}
      {reco && (
        <div className="pervsav-reco">
          <div className="pervsav-reco-title">🎯 {reco.titre}</div>
          <div className="pervsav-reco-scores">
            <div className="pervsav-reco-score">
              <div className="pervsav-reco-score-label">
                <span className="pervsav-badge pervsav-badge--per">PER</span>
                <span style={{ color: reco.per.color, fontWeight: 700, fontSize: '0.82rem' }}>{reco.per.label}</span>
              </div>
              <ScoreBar score={reco.per.score} color={reco.per.color} />
            </div>
            <div className="pervsav-reco-score">
              <div className="pervsav-reco-score-label">
                <span className="pervsav-badge pervsav-badge--av">Assurance Vie</span>
                <span style={{ color: reco.av.color, fontWeight: 700, fontSize: '0.82rem' }}>{reco.av.label}</span>
              </div>
              <ScoreBar score={reco.av.score} color={reco.av.color} />
            </div>
          </div>
          <div className="pervsav-reco-conseil">
            <span>💬</span>
            <p>{reco.conseil}</p>
          </div>
          <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 16 }}>
            📅 Calculer ma stratégie optimale →
          </Link>
        </div>
      )}

      {/* Comparatif en cartes */}
      <div className="pervsav-cards">
        {/* Colonne PER */}
        <div className="pervsav-col pervsav-col--per">
          <div className="pervsav-col-header">
            <span className="pervsav-badge pervsav-badge--per">PER</span>
            <div className="pervsav-col-subtitle">Optimisation fiscale</div>
          </div>
          {CRITERES.map(c => (
            <div key={c.label} className="pervsav-col-row">
              <div className="pervsav-col-critere">{c.label}</div>
              <div className="pervsav-col-value">{c.per}</div>
            </div>
          ))}
        </div>

        {/* Colonne AV */}
        <div className="pervsav-col pervsav-col--av">
          <div className="pervsav-col-header">
            <span className="pervsav-badge pervsav-badge--av">Assurance Vie</span>
            <div className="pervsav-col-subtitle">Liquidité & transmission</div>
          </div>
          {CRITERES.map(c => (
            <div key={c.label} className="pervsav-col-row">
              <div className="pervsav-col-critere">{c.label}</div>
              <div className="pervsav-col-value">{c.av}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="crowd-risques-note" style={{ marginTop: 20 }}>
        💡 <strong>La stratégie optimale :</strong> PER pour réduire l'impôt sur vos revenus d'activité + Assurance Vie pour l'épargne liquide et la transmission. Je construis les deux en parallèle selon votre situation.
      </div>

    </div>
  );
}
