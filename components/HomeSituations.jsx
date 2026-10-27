'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import RdvButton from '@/components/RdvButton';

const SITUATIONS = [
  {
    id: 'financer',
    icon: 'house',
    label: 'Financer un projet',
    hint: 'Achat immobilier, travaux, regroupement…',
    probleme: 'Vous faites le tour des banques, chacune propose un taux différent, et vous ne savez pas si c\'est vraiment le meilleur.',
    solution: 'Je compare plus de 40 banques en une seule démarche, je négocie le taux et l\'assurance emprunteur, et je vous accompagne jusqu\'à la signature chez le notaire.',
    gain: 'Jusqu\'à plusieurs milliers d\'euros économisés sur le coût total',
    liens: [
      { label: 'Crédit immobilier', href: '/financer/credit-immobilier' },
      { label: 'Regroupement de crédits', href: '/financer/regroupement-credits' },
      { label: 'Prêt personnel', href: '/financer/pret-personnel' },
      { label: 'Rachat de soulte', href: '/financer/rachat-soulte' },
    ],
    cta: 'Étudier mon financement',
  },
  {
    id: 'assurer',
    icon: 'shield-check',
    label: 'Payer moins cher mes assurances',
    hint: 'Emprunteur, habitation, auto, moto…',
    probleme: 'Votre assurance augmente chaque année sans que rien ne change. Vous payez une « taxe à la fidélité » sans le savoir.',
    solution: 'Je compare le marché, je résilie votre ancien contrat à votre place (lois Hamon et Lemoine) et je vous trouve une couverture équivalente ou meilleure, moins chère.',
    gain: 'Jusqu\'à 15 000 € économisés sur l\'assurance emprunteur seule',
    liens: [
      { label: 'Assurance emprunteur', href: '/assurer/assurance-emprunteur' },
      { label: 'Assurance habitation', href: '/assurer/assurance-habitation' },
      { label: 'Assurance auto et moto', href: '/assurer/auto-moto' },
    ],
    cta: 'Auditer mes contrats',
  },
  {
    id: 'investir',
    icon: 'trending-up',
    label: 'Faire fructifier mon épargne',
    hint: 'SCPI, assurance vie, PER, crowdfunding…',
    probleme: 'Votre banquier vous propose ses propres produits. Vous ne savez pas s\'ils sont adaptés à votre fiscalité et à votre patrimoine réels.',
    solution: 'J\'analyse votre tranche d\'imposition, vos objectifs et votre horizon, puis je sélectionne les placements du marché qui vous correspondent, sans conflit d\'intérêts.',
    gain: 'Des rendements optimisés et une fiscalité allégée dès la première année',
    liens: [
      { label: 'SCPI', href: '/investir/scpi' },
      { label: 'PER', href: '/investir/per' },
      { label: 'Assurance vie', href: '/investir/assurance-vie' },
      { label: 'Crowdfunding', href: '/investir/crowdfunding' },
    ],
    cta: 'Faire un bilan patrimonial',
  },
];

export default function HomeSituations() {
  const [active, setActive] = useState(0);
  const s = SITUATIONS[active];

  return (
    <div className="hsit">
      <div className="hsit-tabs" role="tablist" aria-label="Votre situation">
        {SITUATIONS.map((sit, i) => (
          <button
            key={sit.id}
            type="button"
            role="tab"
            id={`hsit-tab-${sit.id}`}
            aria-selected={active === i}
            aria-controls="hsit-panel"
            className={`hsit-tab${active === i ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="hsit-tab-icon"><Icon name={sit.icon} /></span>
            <span className="hsit-tab-text">
              <strong>{sit.label}</strong>
              <span>{sit.hint}</span>
            </span>
            <Icon name="arrow-right" className="hsit-tab-arrow" />
          </button>
        ))}
      </div>

      <div className="hsit-panel" id="hsit-panel" role="tabpanel" aria-labelledby={`hsit-tab-${s.id}`} key={s.id}>
        <div className="hsit-cols">
          <div className="hsit-col">
            <span className="hsit-label hsit-label--pb">Le constat</span>
            <p>{s.probleme}</p>
          </div>
          <div className="hsit-col">
            <span className="hsit-label">Ce que je fais pour vous</span>
            <p>{s.solution}</p>
          </div>
        </div>
        <p className="hsit-gain"><Icon name="coins" /> {s.gain}</p>
        <div className="hsit-footer">
          <div className="hsit-links">
            {s.liens.map(l => (
              <Link key={l.href} href={l.href} className="hsit-link">
                {l.label} <Icon name="arrow-right" className="oz-arrow" />
              </Link>
            ))}
          </div>
          <RdvButton className="fin-btn-primary">{s.cta}</RdvButton>
        </div>
      </div>
    </div>
  );
}
