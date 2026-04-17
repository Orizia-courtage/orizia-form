'use client';

import { useState } from 'react';
import Link from 'next/link';

const CRITERES = [
  {
    id: 'anciennete',
    label: 'Je n\'ai pas changé d\'assureur depuis plus de 2 ans',
    desc: 'Les tarifs augmentent de 6 à 8% par an. Après 2 ans sans comparaison, vous payez presque certainement trop cher.',
    required: true,
    signal: '⚠️ Risque de surpaiement',
  },
  {
    id: 'mobilier',
    label: 'Je n\'ai jamais réévalué la valeur de mes meubles',
    desc: 'Si vous avez déclaré 15 000€ de mobilier mais que vous en avez 30 000€, l\'assureur ne vous remboursera que la moitié en cas de sinistre.',
    required: true,
    signal: '⚠️ Risque de sous-assurance',
  },
  {
    id: 'zone',
    label: 'Mon logement est en zone inondable ou à risque climatique',
    desc: 'La taxe catastrophes naturelles passe à 20% en 2026. Certains assureurs sont bien plus compétitifs que d\'autres sur ces zones.',
    required: false,
    signal: '📍 Zone à surveiller',
  },
  {
    id: 'valeur',
    label: 'J\'ai des objets de valeur non déclarés (bijoux, art, high-tech)',
    desc: 'Un vélo électrique à 3 000€, une montre de luxe, un home studio — sans déclaration spécifique, vous n\'êtes pas couvert.',
    required: false,
    signal: '💎 Objets à déclarer',
  },
  {
    id: 'pno',
    label: 'Je suis propriétaire d\'un bien loué sans assurance PNO',
    desc: 'Entre deux locataires ou si votre locataire est mal assuré, vous êtes exposé sans assurance Propriétaire Non-Occupant.',
    required: false,
    signal: '🏢 Risque investisseur',
  },
];

export default function HabitationChecklist() {
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
        <span className="fin-badge">🏠 Auto-évaluation</span>
        <h3 className="icl-title">Suis-je bien assuré(e) ?</h3>
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
        <span>{done}/{total} points identifiés</span>
        {done >= 2 && (
          <span style={{ color: '#dc2626', fontWeight: 800 }}>
            Analyse recommandée
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
        <div className={`icl-result${allRequired ? ' icl-result--ready' : ' icl-result--partial'}`}
          style={allRequired ? { borderColor: '#dc2626', background: 'rgba(220,38,38,0.04)' } : {}}
        >
          {allRequired ? (
            <>
              <div className="icl-result-icon">🚨</div>
              <div>
                <strong style={{ color: '#dc2626' }}>
                  Votre contrat mérite une analyse urgente
                </strong>
                <p>
                  Vous payez probablement trop cher et vous êtes peut-être mal couvert.
                  En 20 minutes, je passe votre contrat en revue et vous dis exactement
                  ce qui doit changer.
                </p>
                <Link href="/rendez-vous" className="fin-btn-primary" style={{ marginTop: 14, display: 'inline-flex' }}>
                  📅 Analyser mon contrat gratuitement →
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="icl-result-icon">💬</div>
              <div>
                <strong>Des points à vérifier ensemble</strong>
                <p>
                  Quelques zones de risque identifiées. Un audit rapide permet de
                  s'assurer que vous êtes bien couvert — et au bon prix.
                </p>
                <Link href="/rendez-vous" className="fin-btn-secondary" style={{ marginTop: 14, display: 'inline-flex' }}>
                  📅 Vérifier mon contrat →
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
