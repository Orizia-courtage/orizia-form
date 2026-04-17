'use client';

import { useState } from 'react';
import Link from 'next/link';

const CRITERES = [
  {
    id: 'bancaire',
    label: 'Mon assurance est celle proposée par ma banque',
    desc: 'Les contrats groupe bancaires sont en moyenne 2 à 3 fois plus chers que les contrats individuels à garanties équivalentes.',
    required: true,
    signal: '🏦 Contrat bancaire',
  },
  {
    id: 'anciennete',
    label: 'Je n\'ai pas changé d\'assurance depuis plus d\'un an',
    desc: 'Depuis la loi Lemoine (2022), vous pouvez changer à tout moment. Chaque mois d\'attente, c\'est de l\'argent perdu.',
    required: true,
    signal: '⏳ Changement possible',
  },
  {
    id: 'capital',
    label: 'Mon capital restant dû est supérieur à 100 000€',
    desc: 'Plus le capital est élevé, plus l\'économie est spectaculaire. Sur 200 000€ à 30 ans, l\'écart peut dépasser 15 000€.',
    required: false,
    signal: '💰 Fort potentiel d\'économie',
  },
  {
    id: 'duree',
    label: 'Il me reste plus de 10 ans à rembourser',
    desc: 'L\'économie se calcule sur la durée restante. Plus il reste d\'années, plus le gain est important.',
    required: false,
    signal: '📅 Horizon long',
  },
  {
    id: 'sante',
    label: 'Mon état de santé est bon (pas de pathologie lourde)',
    desc: 'Un bon profil de santé permet d\'accéder aux meilleurs taux du marché. La loi Lemoine supprime même le questionnaire médical sous conditions.',
    required: false,
    signal: '🩺 Profil favorable',
  },
];

export default function EmprunteurChecklist() {
  const [checked, setChecked] = useState({});

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const total = CRITERES.length;
  const done = CRITERES.filter(c => checked[c.id]).length;
  const requiredDone = CRITERES.filter(c => c.required && checked[c.id]).length;
  const allRequired = requiredDone === CRITERES.filter(c => c.required).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="icl-wrap">
      <div className="icl-header">
        <span className="fin-badge">💰 Auto-évaluation</span>
        <h3 className="icl-title">Suis-je en train de payer trop cher ?</h3>
        <p className="icl-subtitle">Cochez les situations qui vous correspondent.</p>
      </div>

      <div className="icl-progress">
        <div
          className="icl-progress-bar"
          style={{
            width: `${pct}%`,
            background: done >= 2 ? '#dc2626' : 'var(--orizia-primary)',
          }}
        />
      </div>
      <div className="icl-progress-label">
        <span>{done}/{total} critères cochés</span>
        {done >= 2 && (
          <span style={{ color: '#dc2626', fontWeight: 800 }}>
            Analyse urgente recommandée
          </span>
        )}
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
                  color: checked[c.id] ? '#dc2626' : 'var(--orizia-dark)',
                  background: checked[c.id] ? 'rgba(220,38,38,0.08)' : 'rgba(26,61,53,0.06)',
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
        <div
          className={`icl-result${allRequired ? ' icl-result--ready' : ' icl-result--partial'}`}
          style={allRequired ? { borderColor: '#dc2626', background: 'rgba(220,38,38,0.04)' } : {}}
        >
          {allRequired ? (
            <>
              <div className="icl-result-icon">🚨</div>
              <div>
                <strong style={{ color: '#dc2626' }}>
                  Vous payez très probablement trop cher
                </strong>
                <p>
                  Les deux signaux les plus forts sont réunis. En 30 minutes, je calcule
                  votre économie exacte et je vous montre le contrat qui remplace le vôtre
                  à garanties identiques — ou meilleures.
                </p>
                <Link href="/rendez-vous" className="fin-btn-primary" style={{ marginTop: 14, display: 'inline-flex' }}>
                  📅 Calculer mon économie
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="icl-result-icon">💬</div>
              <div>
                <strong>Des économies sont probablement possibles</strong>
                <p>
                  Votre profil présente des opportunités. Un audit rapide permet de
                  chiffrer précisément ce que vous pouvez récupérer.
                </p>
                <Link href="/rendez-vous" className="fin-btn-secondary" style={{ marginTop: 14, display: 'inline-flex' }}>
                  📅 Faire chiffrer mes économies
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
