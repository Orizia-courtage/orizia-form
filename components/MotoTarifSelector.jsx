'use client';

import { useState } from 'react';
import Link from 'next/link';

const TARIFS = [
  {
    cylindree: '≤ 50 cc',
    emoji: '🛵',
    label: 'Scooter / Cyclomoteur',
    desc: 'Usage urbain, petits trajets quotidiens.',
    tiers: 'Dès 200€',
    inter: 'Dès 300€',
    tousRisques: 'Sur mesure',
    recommande: 'Tiers',
    recommandeDesc: 'Valeur faible du véhicule — le tiers suffit largement.',
    recommandeColor: '#16a34a',
  },
  {
    cylindree: '125 cc',
    emoji: '🏍️',
    label: 'Moto 125 cc',
    desc: 'Permis B suffisant, usage mixte ville/route.',
    tiers: 'Dès 350€',
    inter: 'Dès 500€',
    tousRisques: 'Sur mesure',
    recommande: 'Intermédiaire',
    recommandeDesc: 'Bon compromis prix/protection pour un usage quotidien.',
    recommandeColor: '#d97706',
  },
  {
    cylindree: '126–600 cc',
    emoji: '🏍️',
    label: 'Moyenne cylindrée',
    desc: 'Roadster, trail, sportive légère.',
    tiers: 'Dès 400€',
    inter: 'Dès 500€',
    tousRisques: 'Dès 700€',
    recommande: 'Tous risques',
    recommandeDesc: 'Valeur significative — protégez votre investissement.',
    recommandeColor: 'var(--orizia-primary)',
  },
  {
    cylindree: '600–999 cc',
    emoji: '🏁',
    label: 'Haute cylindrée',
    desc: 'Sportive, roadster puissant, GT.',
    tiers: 'Dès 450€',
    inter: 'Dès 600€',
    tousRisques: 'Dès 900€',
    recommande: 'Tous risques',
    recommandeDesc: 'Indispensable pour un véhicule à forte valeur.',
    recommandeColor: 'var(--orizia-primary)',
  },
  {
    cylindree: '1000 cc+',
    emoji: '🦅',
    label: 'Grosse cylindrée',
    desc: 'Superbike, custom, touring premium.',
    tiers: 'Dès 500€',
    inter: 'Dès 800€',
    tousRisques: 'Dès 1 200€',
    recommande: 'Tous risques',
    recommandeDesc: 'Aucun compromis possible sur ce niveau de valeur.',
    recommandeColor: 'var(--orizia-primary)',
  },
];

const FORMULES = [
  { key: 'tiers', label: 'Au tiers', icon: '🔵', desc: 'Responsabilité civile uniquement' },
  { key: 'inter', label: 'Intermédiaire', icon: '🟡', desc: 'Vol, incendie + RC' },
  { key: 'tousRisques', label: 'Tous risques', icon: '🟢', desc: 'Protection maximale' },
];

export default function MotoTarifSelector() {
  const [selected, setSelected] = useState(null);

  const current = selected !== null ? TARIFS[selected] : null;

  return (
    <div className="moto-selector">
      {/* Sélecteur cylindrée */}
      <div className="moto-selector-tabs">
        {TARIFS.map((t, i) => (
          <button
            key={t.cylindree}
            onClick={() => setSelected(i)}
            className={`moto-selector-tab${selected === i ? ' moto-selector-tab--active' : ''}`}
          >
            <span className="moto-tab-emoji">{t.emoji}</span>
            <span className="moto-tab-cc">{t.cylindree}</span>
          </button>
        ))}
      </div>

      {/* Résultat */}
      {current ? (
        <div className="moto-selector-result">
          {/* Header */}
          <div className="moto-result-header">
            <div>
              <div className="moto-result-emoji">{current.emoji}</div>
              <h3 className="moto-result-title">{current.label}</h3>
              <p className="moto-result-desc">{current.desc}</p>
            </div>
            <div className="moto-result-recommande" style={{ borderColor: current.recommandeColor }}>
              <span style={{ color: current.recommandeColor, fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 4 }}>
                ⭐ Recommandé
              </span>
              <span style={{ color: current.recommandeColor, fontSize: '1.1rem', fontWeight: 900 }}>
                {current.recommande}
              </span>
              <p style={{ fontSize: '0.78rem', color: 'var(--orizia-dark)', opacity: 0.65, margin: '6px 0 0', lineHeight: 1.4 }}>
                {current.recommandeDesc}
              </p>
            </div>
          </div>

          {/* Grille formules */}
          <div className="moto-formules-grid">
            {FORMULES.map(f => {
              const prix = current[f.key];
              const isReco = f.label === current.recommande || (f.key === 'tousRisques' && current.recommande === 'Tous risques') || (f.key === 'inter' && current.recommande === 'Intermédiaire') || (f.key === 'tiers' && current.recommande === 'Tiers');
              return (
                <div
                  key={f.key}
                  className={`moto-formule-card${isReco ? ' moto-formule-card--reco' : ''}`}
                >
                  {isReco && (
                    <div className="moto-formule-reco-badge">⭐ Recommandé</div>
                  )}
                  <div className="moto-formule-label">
                    <span style={{ marginRight: 8 }}>{f.icon}</span>{f.label}
                  </div>
                  <div className="moto-formule-desc">{f.desc}</div>
                  <div className="moto-formule-prix">{prix}</div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="moto-result-cta">
            <p>Je compare les offres du marché pour votre {current.label.toLowerCase()} et vous trouve le meilleur tarif.</p>
            <Link href="/rendez-vous" className="fin-btn-on-dark">
              📅 Obtenir mon devis personnalisé →
            </Link>
          </div>
        </div>
      ) : (
        <div className="moto-selector-placeholder">
          <span className="moto-placeholder-icon">🏍️</span>
          <p>Sélectionnez votre cylindrée pour voir les tarifs et la formule recommandée</p>
        </div>
      )}
    </div>
  );
}
