'use client';

import { useState } from 'react';
import ContactPopup from '@/components/ContactPopup';

const CRITERES = [
  {
    id: 'endettement',
    label: 'Mon taux d\'endettement actuel est inférieur à 33%',
    desc: 'Si vos charges mensuelles (loyer + crédits) dépassent 33% de vos revenus nets, les banques refuseront généralement un nouveau crédit.',
    required: true,
    signal: '⚖️ Critère bancaire clé',
  },
  {
    id: 'revolving',
    label: 'Je n\'ai pas de crédit renouvelable (revolving) en cours',
    desc: 'Les crédits revolving (réserves d\'argent) sont vus très négativement par les banques. Ils signalent une fragilité financière et bloquent souvent les demandes.',
    required: true,
    signal: '🚨 Signal négatif',
  },
  {
    id: 'revenus',
    label: 'Mes revenus sont stables (CDI, fonctionnaire, ou 2 ans d\'ancienneté)',
    desc: 'Les organismes de crédit veulent de la régularité. Un CDD récent ou une activité irrégulière complique l\'obtention d\'un bon taux.',
    required: false,
    signal: '💼 Stabilité des revenus',
  },
  {
    id: 'montant',
    label: 'Le montant dont j\'ai besoin est inférieur à 75 000€',
    desc: 'Au-delà de 75 000€, on sort du cadre légal du crédit à la consommation. Un prêt immobilier ou un regroupement de crédits serait plus adapté.',
    required: false,
    signal: '💰 Plafond légal',
  },
  {
    id: 'historique',
    label: 'Je n\'ai pas d\'incident bancaire récent (FICP, découvert prolongé)',
    desc: 'Un fichage FICP ou des incidents bancaires récents bloquent les demandes. Je peux vous orienter vers des solutions alternatives si c\'est votre cas.',
    required: false,
    signal: '✅ Historique bancaire',
  },
];

export default function PretPersonnelChecklist() {
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
        <span className="fin-badge">💡 Auto-évaluation</span>
        <h3 className="icl-title">Puis-je obtenir un prêt personnel ?</h3>
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
                <strong>Votre profil est favorable — passons à l'étude</strong>
                <p>
                  Les deux critères essentiels sont réunis. Je peux consulter mes partenaires
                  et vous obtenir un accord de principe sous 24 à 48h.
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
                  Certains points peuvent être travaillés. Je vous dis honnêtement
                  ce qui est possible et quelles alternatives existent.
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
