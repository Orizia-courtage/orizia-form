'use client';

import { useState } from 'react';
import ContactPopup from '@/components/ContactPopup';

const CRITERES = [
  {
    id: 'coproprio',
    label: 'Je suis co-propriétaire d\'un bien immobilier',
    desc: 'Le rachat de soulte s\'applique uniquement aux biens détenus en indivision (couple, héritiers, associés). Si vous êtes seul propriétaire, ce dispositif ne vous concerne pas.',
    signal: '🏠 Condition de base',
  },
  {
    id: 'conserver',
    label: 'Je souhaite conserver le bien seul(e)',
    desc: 'Vous devez avoir la volonté claire de racheter la part de votre co-propriétaire. Si la vente du bien est envisagée, le rachat de soulte n\'est pas la bonne solution.',
    signal: '🎯 Objectif clair',
  },
  {
    id: 'valeur',
    label: 'Je connais (approximativement) la valeur du bien',
    desc: 'Une estimation récente (agence, notaire ou simulateur) est nécessaire pour calculer la soulte. Sans valeur de référence, impossible de monter un dossier bancaire.',
    signal: '📊 Estimation disponible',
  },
  {
    id: 'revenus',
    label: 'Mes revenus me permettent de porter seul(e) le crédit',
    desc: 'Passer de deux revenus à un seul change radicalement votre capacité d\'emprunt. Je vérifie avec vous si votre taux d\'endettement reste dans les clous.',
    signal: '💼 Capacité financière',
  },
  {
    id: 'notaire',
    label: 'J\'ai (ou je vais avoir) un notaire en charge du dossier',
    desc: 'Le notaire est obligatoire pour officialiser le rachat de soulte (acte de partage). Je coordonne avec lui pour que le financement soit prêt le jour de la signature.',
    signal: '⚖️ Cadre légal',
  },
];

export default function RachatSoulteChecklist() {
  const [checked, setChecked] = useState({});

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const total = CRITERES.length;
  const done = CRITERES.filter(c => checked[c.id]).length;
  const pct = Math.round((done / total) * 100);
  const isReady = done >= 4;

  return (
    <div className="icl-wrap">
      <div className="icl-header">
        <span className="fin-badge">💡 Auto-évaluation</span>
        <h3 className="icl-title">Mon dossier est-il prêt pour un rachat de soulte ?</h3>
        <p className="icl-subtitle">Cochez les critères qui correspondent à votre situation.</p>
      </div>

      <div className="icl-progress">
        <div
          className="icl-progress-bar"
          style={{
            width: `${pct}%`,
            background: isReady ? '#16a34a' : 'var(--orizia-primary)',
          }}
        />
      </div>
      <div className="icl-progress-label">
        <span>{done}/{total} critères validés</span>
        <span style={{ color: isReady ? '#16a34a' : 'var(--orizia-dark)', fontWeight: 800 }}>
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
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700,
                  color: checked[c.id] ? '#16a34a' : 'var(--orizia-dark)',
                  background: checked[c.id] ? 'rgba(22,163,74,0.08)' : 'rgba(26,61,53,0.06)',
                  borderRadius: 4, padding: '1px 6px', marginLeft: 8,
                }}>
                  {c.signal}
                </span>
              </div>
              <div className="icl-critere-desc">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {done >= 2 && (
        <div className={`icl-result${isReady ? ' icl-result--ready' : ' icl-result--partial'}`}>
          {isReady ? (
            <>
              <div className="icl-result-icon">🎯</div>
              <div>
                <strong>Votre dossier semble viable — passons à l'étude</strong>
                <p>
                  Les conditions sont réunies pour monter un financement. Je vérifie la faisabilité
                  complète et je consulte mes partenaires bancaires gratuitement.
                </p>
                <ContactPopup label="📅 Lancer mon étude →" className="fin-btn-primary" style={{ marginTop: 14, display: 'inline-flex' }} />
              </div>
            </>
          ) : (
            <>
              <div className="icl-result-icon">💬</div>
              <div>
                <strong>Votre situation mérite une analyse personnalisée</strong>
                <p>
                  Certains points restent à clarifier. Je vous aide à identifier les blocages
                  et les solutions alternatives possibles.
                </p>
                <ContactPopup label="📅 Analyser ma situation →" className="fin-btn-secondary" style={{ marginTop: 14, display: 'inline-flex' }} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
