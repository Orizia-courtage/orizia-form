'use client';

import { useState } from 'react';
import ContactPopup from '@/components/ContactPopup';

const CRITERES = [
  {
    id: 'apport',
    label: 'J\'ai un apport disponible (idéalement 10% du prix)',
    desc: 'L\'apport couvre les frais de notaire (~7-8%) et rassure les banques. Sans apport, le dossier est plus difficile mais pas impossible.',
    required: true,
    signal: '🏦 Critère bancaire clé',
  },
  {
    id: 'emploi',
    label: 'Je suis en CDI ou j\'ai 3 ans d\'ancienneté professionnelle',
    desc: 'Les banques veulent de la stabilité. CDI, fonctionnaire, ou 3 bilans comptables pour les indépendants.',
    required: true,
    signal: '💼 Stabilité des revenus',
  },
  {
    id: 'endettement',
    label: 'Mon taux d\'endettement actuel est inférieur à 25%',
    desc: 'Si vous avez déjà des crédits à la conso, voiture ou autre, votre capacité d\'emprunt est réduite. Je peux restructurer si nécessaire.',
    required: false,
    signal: '⚖️ Capacité d\'emprunt',
  },
  {
    id: 'projet',
    label: 'Mon projet est défini (zone géographique, type de bien)',
    desc: 'Avoir une idée précise du bien recherché permet de calculer une enveloppe réaliste et de démarrer les visites sereinement.',
    required: false,
    signal: '🏠 Projet concret',
  },
  {
    id: 'historique',
    label: 'Je n\'ai pas d\'incident bancaire récent (découvert, impayé)',
    desc: 'Un historique bancaire propre est essentiel. Les banques consultent le FICP. Un incident récent peut bloquer le dossier.',
    required: false,
    signal: '✅ Historique bancaire',
  },
];

export default function CreditChecklist() {
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
        <h3 className="icl-title">Suis-je prêt(e) à emprunter ?</h3>
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
        <div className={`icl-result${allRequired ? ' icl-result--ready' : ' icl-result--partial'}`}>
          {allRequired ? (
            <>
              <div className="icl-result-icon">🎯</div>
              <div>
                <strong>Votre profil est solide — passons à l'étape suivante</strong>
                <p>
                  Les deux critères essentiels sont réunis. Je peux calculer votre capacité
                  d'emprunt exacte et identifier les banques les plus adaptées à votre profil.
                </p>
                <ContactPopup label="📅 Calculer mon enveloppe →" className="fin-btn-primary" style={{ marginTop: 14, display: 'inline-flex' }} />
              </div>
            </>
          ) : (
            <>
              <div className="icl-result-icon">💬</div>
              <div>
                <strong>Votre dossier mérite une analyse personnalisée</strong>
                <p>
                  Certains points peuvent être travaillés ensemble. Je vous dis honnêtement
                  ce qui est possible et dans quel délai.
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
