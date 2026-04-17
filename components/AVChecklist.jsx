'use client';

import { useState } from 'react';
import Link from 'next/link';

const CRITERES = [
  {
    id: 'epargne',
    label: 'J\'ai une épargne de précaution disponible',
    desc: '3 à 6 mois de charges sur un livret, hors capital à investir en AV.',
    required: true,
  },
  {
    id: 'horizon',
    label: 'Mon horizon est supérieur à 3 ans',
    desc: 'Plus l\'horizon est long, plus la fiscalité et la performance jouent en votre faveur.',
    required: true,
  },
  {
    id: 'objectif',
    label: 'J\'ai un objectif clair : épargner, transmettre ou les deux',
    desc: 'L\'assurance vie s\'adapte à tous les objectifs — mais les définir permet de construire la bonne stratégie.',
    required: true,
  },
  {
    id: 'risque',
    label: 'Je comprends que les UC peuvent fluctuer',
    desc: 'La part en unités de compte suit les marchés. Sur le long terme, c\'est un atout — à court terme, ça peut baisser.',
    required: false,
  },
  {
    id: 'beneficiaire',
    label: 'J\'ai réfléchi à qui je veux transmettre',
    desc: 'La clause bénéficiaire est l\'élément le plus important du contrat — et le plus souvent bâclé.',
    required: false,
  },
];

export default function AVChecklist() {
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
        <h3 className="icl-title">L'assurance vie est-elle faite pour moi ?</h3>
        <p className="icl-subtitle">Cochez les critères qui correspondent à votre situation.</p>
      </div>

      {/* Barre de progression */}
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

      {/* Critères */}
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
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: 'var(--orizia-primary)',
                    background: 'rgba(45,106,95,0.08)',
                    borderRadius: 4,
                    padding: '1px 6px',
                    marginLeft: 8,
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

      {/* Résultat */}
      {done >= 2 && (
        <div className={`icl-result${allRequired ? ' icl-result--ready' : ' icl-result--partial'}`}>
          {allRequired ? (
            <>
              <div className="icl-result-icon">🎯</div>
              <div>
                <strong>L'assurance vie est adaptée à votre situation</strong>
                <p>
                  Les critères essentiels sont validés. Il reste à choisir le bon contrat,
                  construire l'allocation et rédiger votre clause bénéficiaire sur-mesure.
                </p>
                <Link href="/rendez-vous" className="fin-btn-primary" style={{ marginTop: 14, display: 'inline-flex' }}>
                  📅 Ouvrir mon contrat avec Cindy →
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="icl-result-icon">💬</div>
              <div>
                <strong>Quelques points à clarifier ensemble</strong>
                <p>
                  L'assurance vie peut quand même être pertinente pour vous — mais
                  quelques éléments méritent d'être analysés avant de souscrire.
                </p>
                <Link href="/rendez-vous" className="fin-btn-secondary" style={{ marginTop: 14, display: 'inline-flex' }}>
                  📅 Analyser ma situation →
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
