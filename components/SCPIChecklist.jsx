'use client';

import { useState } from 'react';
import Link from 'next/link';

const CRITERES = [
  {
    id: 'horizon',
    label: 'Mon horizon est supérieur à 8 ans',
    desc: 'Les SCPI ne sont pas des placements liquides. 8 à 10 ans minimum pour amortir les frais de souscription et traverser les cycles immobiliers.',
    required: true,
  },
  {
    id: 'epargne',
    label: 'J\'ai une épargne de précaution disponible',
    desc: '3 à 6 mois de charges sur un livret, hors capital à investir en SCPI.',
    required: true,
  },
  {
    id: 'capital',
    label: 'J\'ai au moins 5 000€ à investir',
    desc: 'Pour une diversification minimale sur 2–3 SCPI différentes et amortir les frais de souscription.',
    required: true,
  },
  {
    id: 'risque',
    label: 'J\'accepte que la valeur des parts puisse baisser',
    desc: 'La crise de 2022–2024 sur les SCPI de bureaux l\'a démontré. La diversification réduit ce risque mais ne l\'élimine pas.',
    required: true,
  },
  {
    id: 'fiscal',
    label: 'J\'ai analysé l\'impact fiscal sur mes revenus',
    desc: 'Les revenus SCPI s\'ajoutent à vos revenus imposables. Sans optimisation, la fiscalité peut amputer significativement le rendement net.',
    required: false,
  },
  {
    id: 'diversif',
    label: 'Je ne mets pas tout mon capital dans une seule SCPI',
    desc: 'La diversification sur 2–3 SCPI de secteurs différents est la règle de base pour limiter le risque locatif.',
    required: false,
  },
];

export default function SCPIChecklist() {
  const [checked, setChecked] = useState({});

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const total = CRITERES.length;
  const done = CRITERES.filter(c => checked[c.id]).length;
  const requiredDone = CRITERES.filter(c => c.required && checked[c.id]).length;
  const requiredTotal = CRITERES.filter(c => c.required).length;
  const allRequired = requiredDone === requiredTotal;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="icl-wrap">
      <div className="icl-header">
        <span className="fin-badge">✅ Auto-évaluation</span>
        <h3 className="icl-title">Suis-je prêt à investir en SCPI ?</h3>
        <p className="icl-subtitle">Cochez les critères qui correspondent à votre situation.</p>
      </div>

      <div className="icl-progress">
        <div
          className="icl-progress-bar"
          style={{
            width: `${pct}%`,
            background: allRequired ? '#16a34a' : 'var(--orizia-primary)',
          }}
        />
      </div>
      <div className="icl-progress-label">
        <span>{done}/{total} critères validés</span>
        <span style={{ color: allRequired ? '#16a34a' : 'var(--orizia-dark)', fontWeight: 800 }}>
          {pct}%
        </span>
      </div>

      <div className="icl-criteres">
        {CRITERES.map(c => (
          <div
            key={c.id}
            onClick={() => toggle(c.id)}
            className={`icl-critere${checked[c.id] ? ' icl-critere--checked' : ''}`}
          >
            <div className="icl-checkbox">
              {checked[c.id] ? '✅' : <span className="icl-checkbox-empty" />}
            </div>
            <div className="icl-critere-content">
              <div className="icl-critere-label">
                {c.label}
                {!c.required && (
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 600,
                    color: 'var(--orizia-primary)',
                    background: 'rgba(45,106,95,0.08)',
                    borderRadius: 4, padding: '1px 6px', marginLeft: 8,
                  }}>
                    Bonus
                  </span>
                )}
              </div>
              <div className="icl-critere-desc">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {done >= 2 && (
        <div className={`icl-result${allRequired ? ' icl-result--ready' : ' icl-result--partial'}`}>
          {allRequired ? (
            <>
              <div className="icl-result-icon">🎯</div>
              <div>
                <strong>Vous êtes prêt — construisons votre portefeuille SCPI</strong>
                <p>
                  Les critères essentiels sont validés. Il reste à choisir les bonnes SCPI
                  selon votre TMI et à optimiser la structure de détention.
                </p>
                <Link href="/rendez-vous" className="fin-btn-primary" style={{ marginTop: 14, display: 'inline-flex' }}>
                  📅 Trouver mes SCPI idéales →
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="icl-result-icon">💬</div>
              <div>
                <strong>Quelques points à préparer d'abord</strong>
                <p>
                  Les SCPI peuvent quand même être pertinentes pour vous — mais certains
                  éléments méritent d'être consolidés avant d'investir.
                </p>
                <Link href="/rendez-vous" className="fin-btn-secondary" style={{ marginTop: 14, display: 'inline-flex' }}>
                  📅 Préparer mon investissement →
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
