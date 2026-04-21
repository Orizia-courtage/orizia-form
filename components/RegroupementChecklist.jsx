'use client';

import { useState } from 'react';
import ContactPopup from '@/components/ContactPopup';

const CRITERES = [
  {
    id: 'nb_credits',
    label: 'J\'ai au moins 2 crédits en cours',
    desc: 'Le regroupement n\'a de sens qu\'avec plusieurs emprunts. Un seul crédit en cours relève plutôt d\'une renégociation ou d\'un rachat simple.',
    signal: '📋 Condition de base',
    isPositive: true,
  },
  {
    id: 'endettement',
    label: 'Mon taux d\'endettement dépasse 33%',
    desc: 'Si vos mensualités représentent plus d\'un tiers de vos revenus, votre budget est sous pression. C\'est exactement la situation que le regroupement est conçu pour résoudre.',
    signal: '⚖️ Critère principal',
    isPositive: true,
  },
  {
    id: 'revenus',
    label: 'Mes revenus sont stables (CDI, fonctionnaire, retraité)',
    desc: 'Les établissements spécialisés exigent une stabilité de revenus. Les TNS et indépendants peuvent être étudiés au cas par cas avec 2 ans de bilans.',
    signal: '💼 Stabilité requise',
    isPositive: true,
  },
  {
    id: 'ficp',
    label: 'Je ne suis pas fiché(e) FICP ou FCC',
    desc: 'Un fichage FICP (incidents de remboursement) ou FCC (chèques) bloque la quasi-totalité des dossiers. Des solutions alternatives existent mais sont rares.',
    signal: '🚨 Blocage potentiel',
    isPositive: true,
  },
  {
    id: 'duree',
    label: 'Mes crédits ont plus d\'un an d\'ancienneté',
    desc: 'Les crédits très récents (moins de 12 mois) sont difficiles à intégrer dans un regroupement. Les établissements préfèrent des historiques de remboursement établis.',
    signal: '📅 Ancienneté',
    isPositive: true,
  },
];

export default function RegroupementChecklist() {
  const [checked, setChecked] = useState({});

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const total = CRITERES.length;
  const done = CRITERES.filter(c => checked[c.id]).length;
  const pct = Math.round((done / total) * 100);
  const isReady = done >= 4;
  const isBlocked = checked['ficp'] === false && Object.keys(checked).includes('ficp');

  return (
    <div className="icl-wrap">
      <div className="icl-header">
        <span className="fin-badge">💡 Auto-évaluation</span>
        <h3 className="icl-title">Suis-je éligible au regroupement de crédits ?</h3>
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
                <strong>Votre profil est favorable — passons à l'analyse complète</strong>
                <p>
                  Les critères essentiels sont réunis. Le formulaire ci-dessous me permet
                  d'analyser votre dossier en détail et de vous proposer une simulation
                  avant/après sous 24h.
                </p>
                <a href="#formulaire" className="fin-btn-primary" style={{ marginTop: 14, display: 'inline-flex' }}>
                  🔍 Démarrer mon étude
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="icl-result-icon">💬</div>
              <div>
                <strong>Votre situation mérite une analyse personnalisée</strong>
                <p>
                  Certains points peuvent compliquer le dossier. Je vous dis honnêtement
                  ce qui est possible et quelles alternatives existent dans votre cas.
                </p>
                <ContactPopup label="📅 Analyser ma situation" className="fin-btn-secondary" style={{ marginTop: 14, display: 'inline-flex' }} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
