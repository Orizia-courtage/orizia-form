'use client';

import { useState } from 'react';
import Link from 'next/link';

const CRITERES = [
  {
    id: 'anciennete',
    label: 'Je n\'ai pas changé d\'assureur depuis plus de 2 ans',
    desc: 'La fidélité est sanctionnée : +4 à 6% par an en moyenne. Après 2 ans, vous payez presque certainement trop cher.',
    required: true,
    economie: 150,
  },
  {
    id: 'bonus',
    label: 'J\'ai un bonus de 50% (coefficient 0,50)',
    desc: 'Avec un bonus maximal, vous avez un pouvoir de négociation fort que vous n\'exploitez probablement pas.',
    required: true,
    economie: 100,
  },
  {
    id: 'vehicule',
    label: 'Mon véhicule a plus de 5 ans',
    desc: 'Un véhicule ancien ne justifie souvent plus un Tous Risques. Vous payez peut-être des garanties inutiles.',
    required: false,
    economie: 200,
  },
  {
    id: 'sinistre',
    label: 'Je n\'ai eu aucun sinistre ces 3 dernières années',
    desc: 'Un historique propre est votre meilleur argument pour négocier un tarif agressif.',
    required: false,
    economie: 80,
  },
  {
    id: 'teletravail',
    label: 'Je roule moins de 10 000 km/an ou je télétravaille',
    desc: 'Les formules kilométriques ou "Pay as you drive" peuvent réduire votre prime de 20 à 30%.',
    required: false,
    economie: 120,
  },
];

export default function AutoChecklist() {
  const [checked, setChecked] = useState({});

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const total = CRITERES.length;
  const done = CRITERES.filter(c => checked[c.id]).length;
  const pct = Math.round((done / total) * 100);
  const economieEstimee = CRITERES.filter(c => checked[c.id]).reduce((sum, c) => sum + c.economie, 0);
  const requiredDone = CRITERES.filter(c => c.required && checked[c.id]).length;
  const allRequired = requiredDone === CRITERES.filter(c => c.required).length;

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
        {economieEstimee > 0 && (
          <span style={{ color: '#16a34a', fontWeight: 800 }}>
            ~{economieEstimee}€/an d'économies potentielles
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
                {c.economie && (
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 700,
                    color: '#16a34a',
                    background: 'rgba(22,163,74,0.08)',
                    borderRadius: 4, padding: '1px 6px', marginLeft: 8,
                  }}>
                    ~{c.economie}€/an
                  </span>
                )}
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
                  Vous payez très probablement trop cher — ~{economieEstimee}€/an en jeu
                </strong>
                <p>
                  Les signaux sont clairs. En 30 minutes, je compare le marché et vous montre
                  concrètement ce que vous pouvez économiser. Sans engagement.
                </p>
                <Link href="/rendez-vous" className="fin-btn-primary" style={{ marginTop: 14, display: 'inline-flex' }}>
                  📅 Calculer mes économies →
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="icl-result-icon">💬</div>
              <div>
                <strong>Des économies sont probablement possibles</strong>
                <p>
                  Même sans tous les critères, une comparaison rapide révèle souvent
                  des opportunités. Je vous dis honnêtement si vous pouvez faire mieux.
                </p>
                <Link href="/rendez-vous" className="fin-btn-secondary" style={{ marginTop: 14, display: 'inline-flex' }}>
                  📅 Vérifier mon tarif →
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
