'use client';

import { useState } from 'react';
import Link from 'next/link';
import ContactPopup from '@/components/ContactPopup';

const SITUATIONS = [
  {
    id: 'financer',
    icon: '🏠',
    label: 'Je veux financer un projet',
    color: 'var(--orizia-primary)',
    bg: 'rgba(45,106,95,0.06)',
    border: 'rgba(45,106,95,0.2)',
    probleme: 'Vous faites le tour des banques, chacune vous propose un taux différent, et vous ne savez pas si c\'est vraiment le meilleur.',
    solution: 'Je compare 40+ banques en une seule démarche, je négocie le taux ET l\'assurance emprunteur, et je vous accompagne jusqu\'à la signature chez le notaire.',
    gain: 'Jusqu\'à plusieurs milliers d\'euros économisés sur le coût total',
    liens: [
      { label: 'Crédit immobilier', href: '/financer/credit-immobilier' },
      { label: 'Regroupement de crédits', href: '/financer/regroupement-credits' },
      { label: 'Prêt personnel', href: '/financer/pret-personnel' },
      { label: 'Rachat de soulte', href: '/financer/rachat-soulte' },
    ],
    cta: '📅 Étudier mon financement',
  },
  {
    id: 'assurer',
    icon: '🛡️',
    label: 'Je paye trop cher mes assurances',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.06)',
    border: 'rgba(217,119,6,0.2)',
    probleme: 'Votre assurance augmente chaque année sans que vous ne changiez rien. Vous payez la taxe de la fidélité sans le savoir.',
    solution: 'Je compare le marché, je résilie votre ancien contrat à votre place (loi Hamon / Lemoine), et je vous trouve une couverture identique ou meilleure — moins chère.',
    gain: 'Jusqu\'à 15 000€ économisés sur l\'assurance emprunteur seule',
    liens: [
      { label: 'Assurance emprunteur', href: '/assurer/assurance-emprunteur' },
      { label: 'Assurance habitation', href: '/assurer/assurance-habitation' },
      { label: 'Assurance auto/moto', href: '/assurer/auto-moto' },
    ],
    cta: '📅 Auditer mes contrats',
  },
  {
    id: 'investir',
    icon: '💼',
    label: 'Je veux faire fructifier mon argent',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.06)',
    border: 'rgba(124,58,237,0.2)',
    probleme: 'Votre banquier vous propose ses propres produits. Vous ne savez pas si c\'est adapté à votre situation fiscale et patrimoniale réelle.',
    solution: 'J\'analyse votre TMI, vos objectifs et votre horizon, puis je sélectionne les meilleurs placements du marché — SCPI, PER, assurance vie, crowdfunding — sans conflit d\'intérêts.',
    gain: 'Rendements optimisés + fiscalité réduite dès la première année',
    liens: [
      { label: 'SCPI', href: '/investir/scpi' },
      { label: 'PER', href: '/investir/per' },
      { label: 'Assurance Vie', href: '/investir/assurance-vie' },
      { label: 'Crowdfunding', href: '/investir/crowdfunding' },
    ],
    cta: '📅 Bilan patrimonial sans frais',
  },
];

export default function HomeSituations() {
  const [active, setActive] = useState(null);
  const s = active !== null ? SITUATIONS[active] : null;

  return (
    <div className="hs-wrap">
      {/* Sélecteur — panneau inséré directement sous le tab actif */}
      <div className="hs-tabs">
        {SITUATIONS.map((sit, i) => (
          <div key={sit.id}>
            <button
              className={`hs-tab${active === i ? ' hs-tab--active' : ''}`}
              style={active === i ? { borderColor: sit.color, background: sit.bg } : {}}
              onClick={() => setActive(active === i ? null : i)}
            >
              <span className="hs-tab-icon">{sit.icon}</span>
              <span className="hs-tab-label">{sit.label}</span>
              <span className="hs-tab-arrow" style={{ color: active === i ? sit.color : undefined }}>
                {active === i ? '▲' : '▼'}
              </span>
            </button>

            {/* Panneau détail — s'ouvre juste sous ce tab */}
            {active === i && (
              <div className="hs-panel" style={{ borderColor: sit.border, background: sit.bg }}>
                <div className="hs-panel-layout">
                  {/* Problème */}
                  <div className="hs-panel-col">
                    <div className="hs-panel-label" style={{ color: '#dc2626' }}>⚠️ Le problème</div>
                    <p className="hs-panel-text">{sit.probleme}</p>
                  </div>

                  {/* Flèche */}
                  <div className="hs-panel-arrow" style={{ color: sit.color }}>→</div>

                  {/* Solution */}
                  <div className="hs-panel-col">
                    <div className="hs-panel-label" style={{ color: sit.color }}>✅ Ma solution</div>
                    <p className="hs-panel-text">{sit.solution}</p>
                    <div className="hs-panel-gain" style={{ color: sit.color, background: `${sit.color}12`, border: `1px solid ${sit.color}25` }}>
                      💰 {sit.gain}
                    </div>
                  </div>
                </div>

                {/* Liens produits + CTA */}
                <div className="hs-panel-footer">
                  <div className="hs-panel-liens">
                    {sit.liens.map(l => (
                      <Link key={l.href} href={l.href} className="hs-lien" style={{ color: sit.color, borderColor: `${sit.color}30` }}>
                        {l.label} →
                      </Link>
                    ))}
                  </div>
                  <ContactPopup label={sit.cta} className="fin-btn-primary" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
