'use client';

import { useState } from 'react';
import Link from 'next/link';

const CRITERES = [
  {
    id: 'epargne',
    label: 'J\'ai une épargne de précaution',
    desc: '3 à 6 mois de charges disponibles sur un livret, hors capital à investir.',
    required: true,
  },
  {
    id: 'horizon',
    label: 'Mon horizon est supérieur à 12 mois',
    desc: 'Je n\'aurai pas besoin de ce capital avant la fin du projet (12–36 mois).',
    required: true,
  },
  {
    id: 'capital',
    label: 'J\'ai au moins 1 000€ à investir',
    desc: 'Le ticket d\'entrée minimum sur la plupart des plateformes sérieuses.',
    required: true,
  },
  {
    id: 'risque',
    label: 'J\'accepte un risque de perte partielle',
    desc: 'Le crowdfunding comporte un risque réel. Je l\'ai compris et je l\'accepte.',
    required: true,
  },
  {
    id: 'liquidite',
    label: 'Je n\'ai pas besoin de liquidité immédiate',
    desc: 'Mon capital sera bloqué jusqu\'à l\'échéance — aucun marché secondaire.',
    required: true,
  },
];

export default function InvestisseurChecklist() {
  const [checked, setChecked] = useState({});
  const [revealed, setRevealed] = useState(false);

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const total = CRITERES.length;
  const done = CRITERES.filter(c => checked[c.id]).length;
  const allDone = done === total;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="icl-wrap">
      <div className="icl-header">
        <span className="fin-badge">✅ Auto-évaluation</span>
        <h3 className="icl-title">Suis-je prêt à investir dans le crowdfunding ?</h3>
        <p className="icl-subtitle">Cochez les critères qui correspondent à votre situation.</p>
      </div>

      {/* Barre de progression */}
      <div className="icl-progress">
        <div className="icl-progress-bar" style={{ width: `${pct}%`, background: allDone ? '#16a34a' : 'var(--orizia-primary)' }} />
      </div>
      <div className="icl-progress-label">
        <span>{done}/{total} critères validés</span>
        <span style={{ color: allDone ? '#16a34a' : 'var(--orizia-dark)', fontWeight: 800 }}>{pct}%</span>
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
              <div className="icl-critere-label">{c.label}</div>
              <div className="icl-critere-desc">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Résultat */}
      {done >= 3 && (
        <div className={`icl-result${allDone ? ' icl-result--ready' : ' icl-result--partial'}`}>
          {allDone ? (
            <>
              <div className="icl-result-icon">🎯</div>
              <div>
                <strong>Vous êtes prêt — parlons stratégie</strong>
                <p>Tous les critères sont validés. Il ne reste plus qu'à définir le montant, la durée et les plateformes adaptées à votre profil.</p>
                <Link href="/rendez-vous" className="fin-btn-primary" style={{ marginTop: 14, display: 'inline-flex' }}>
                  📅 Construire ma stratégie
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="icl-result-icon">⚠️</div>
              <div>
                <strong>Quelques points à préparer d'abord</strong>
                <p>Vous êtes sur la bonne voie. Avant d'investir, je vous aide à consolider les critères manquants — c'est l'objet du premier rendez-vous.</p>
                <Link href="/rendez-vous" className="fin-btn-secondary" style={{ marginTop: 14, display: 'inline-flex' }}>
                  📅 Préparer mon investissement
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
