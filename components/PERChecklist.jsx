'use client';

import { useState } from 'react';
import Link from 'next/link';

const CRITERES = [
  {
    id: 'tmi',
    label: 'Mon TMI est de 30% ou plus',
    desc: 'En dessous de 30%, l\'avantage fiscal du PER est limité — l\'assurance vie est souvent plus adaptée.',
    required: true,
  },
  {
    id: 'horizon',
    label: 'Mon horizon est supérieur à 5 ans',
    desc: 'Le PER est un placement long terme. Plus l\'horizon est long, plus l\'effet des intérêts composés est puissant.',
    required: true,
  },
  {
    id: 'epargne',
    label: 'J\'ai une épargne de précaution disponible',
    desc: '3 à 6 mois de charges sur un livret, hors capital à verser sur le PER.',
    required: true,
  },
  {
    id: 'plafonds',
    label: 'Je n\'ai pas utilisé tous mes plafonds ces 3 dernières années',
    desc: 'Les plafonds non utilisés sont reportables sur 3 ans — c\'est souvent plusieurs milliers d\'euros de déduction supplémentaire.',
    required: false,
  },
  {
    id: 'retraite',
    label: 'Mon TMI devrait baisser à la retraite',
    desc: 'Si votre TMI de retraite est inférieur à celui d\'aujourd\'hui, la sortie en capital sera fiscalement avantageuse.',
    required: false,
  },
];

export default function PERChecklist() {
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
        <h3 className="icl-title">Le PER est-il fait pour moi ?</h3>
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
                <strong>Le PER est adapté à votre situation — parlons stratégie</strong>
                <p>
                  Les critères essentiels sont validés. Il reste à calculer vos plafonds exacts,
                  choisir le bon contrat et construire l'allocation adaptée à votre horizon.
                </p>
                <Link href="/rendez-vous" className="fin-btn-primary" style={{ marginTop: 14, display: 'inline-flex' }}>
                  📅 Calculer mon gain fiscal →
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="icl-result-icon">💬</div>
              <div>
                <strong>Quelques points à analyser ensemble</strong>
                <p>
                  Votre situation mérite une analyse personnalisée. Le PER n'est pas toujours
                  la meilleure option — je vous dis honnêtement si c'est votre cas.
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
