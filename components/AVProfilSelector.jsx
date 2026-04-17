'use client';

import { useState } from 'react';
import Link from 'next/link';

const PROFILS = [
  {
    id: 'prudent',
    icon: '🛡️',
    label: 'Prudent',
    desc: 'Je prioritise la sécurité',
    badge: null,
    color: 'var(--orizia-primary)',
    ucColor: '#64748b',
    bg: 'rgba(45,106,95,0.06)',
    border: 'rgba(45,106,95,0.2)',
    repart: { euros: 80, uc: 20 },
    taux: 0.014,
    taux_label: '~1,4%/an',
    horizon_conseil: 'Horizon < 8 ans · Faible tolérance au risque',
    strategie: 'Fonds euros majoritaire pour sécuriser le capital. La part UC (20%) apporte un léger surcroît de performance sans exposer votre épargne aux fluctuations des marchés.',
    conseil: 'Idéal si vous avez besoin de récupérer votre capital dans moins de 8 ans, ou si les fluctuations de marché vous inquiètent. On peut toujours faire évoluer le profil dans le temps.',
  },
  {
    id: 'equilibre',
    icon: '⚖️',
    label: 'Équilibré',
    desc: 'Sécurité et performance',
    badge: '⭐ Le plus choisi',
    color: '#d97706',
    ucColor: '#d97706',
    bg: 'rgba(217,119,6,0.06)',
    border: 'rgba(217,119,6,0.2)',
    repart: { euros: 50, uc: 50 },
    taux: 0.0275,
    taux_label: '~2,75%/an',
    horizon_conseil: 'Horizon 8–15 ans · Profil de risque modéré',
    strategie: 'Répartition équilibrée entre fonds euros (sécurité) et UC (performance). Le meilleur compromis pour la majorité des épargnants avec un horizon de 10 ans et plus.',
    conseil: 'C\'est le profil que je recommande le plus souvent. Il permet de battre l\'inflation sur le long terme tout en limitant l\'exposition aux baisses de marché.',
  },
  {
    id: 'dynamique',
    icon: '🚀',
    label: 'Dynamique',
    desc: 'Je vise la performance max',
    badge: null,
    color: '#dc2626',
    ucColor: '#dc2626',
    bg: 'rgba(220,38,38,0.06)',
    border: 'rgba(220,38,38,0.2)',
    repart: { euros: 20, uc: 80 },
    taux: 0.041,
    taux_label: '~4,1%/an',
    horizon_conseil: 'Horizon 15+ ans · Forte tolérance au risque',
    strategie: 'Exposition maximale aux marchés financiers (ETF, actions, SCPI…). Sur 15–20 ans, l\'historique montre des performances significativement supérieures — mais avec des fluctuations à court terme.',
    conseil: 'Ce profil est pertinent si vous n\'avez pas besoin de ce capital avant 15 ans et que vous acceptez de voir votre contrat baisser temporairement sans paniquer.',
  },
];

function SimulateurRendement({ profil }) {
  const [capital, setCapital] = useState(10000);
  const [duree, setDuree] = useState(10);

  const resultat = Math.round(capital * Math.pow(1 + profil.taux, duree));
  const gain = resultat - capital;
  const gainPct = Math.round((gain / capital) * 100);

  return (
    <div className="avps-simulateur">
      <div className="avps-sim-title">📊 Simulateur de rendement estimé</div>
      <div className="avps-sim-inputs">
        <div className="avps-sim-field">
          <label className="avps-sim-label">Capital initial</label>
          <div className="avps-sim-input-wrap">
            <input
              type="range"
              min={1000}
              max={100000}
              step={1000}
              value={capital}
              onChange={e => setCapital(Number(e.target.value))}
              className="avps-sim-range"
              style={{ accentColor: profil.color }}
            />
            <span className="avps-sim-val" style={{ color: profil.color }}>
              {capital.toLocaleString('fr-FR')}€
            </span>
          </div>
        </div>
        <div className="avps-sim-field">
          <label className="avps-sim-label">Durée</label>
          <div className="avps-sim-input-wrap">
            <input
              type="range"
              min={3}
              max={30}
              step={1}
              value={duree}
              onChange={e => setDuree(Number(e.target.value))}
              className="avps-sim-range"
              style={{ accentColor: profil.color }}
            />
            <span className="avps-sim-val" style={{ color: profil.color }}>{duree} ans</span>
          </div>
        </div>
      </div>
      <div className="avps-sim-result">
        <div className="avps-sim-result-item">
          <div className="avps-sim-result-label">Capital estimé</div>
          <div className="avps-sim-result-value" style={{ color: profil.color }}>
            {resultat.toLocaleString('fr-FR')}€
          </div>
        </div>
        <div className="avps-sim-result-sep" />
        <div className="avps-sim-result-item">
          <div className="avps-sim-result-label">Gain estimé</div>
          <div className="avps-sim-result-value" style={{ color: '#16a34a' }}>
            +{gain.toLocaleString('fr-FR')}€
          </div>
        </div>
        <div className="avps-sim-result-sep" />
        <div className="avps-sim-result-item">
          <div className="avps-sim-result-label">Performance</div>
          <div className="avps-sim-result-value" style={{ color: '#16a34a' }}>
            +{gainPct}%
          </div>
        </div>
      </div>
      <p className="avps-sim-disclaimer">
        * Simulation indicative basée sur {profil.taux_label} net de frais de gestion.
        Les performances passées ne préjugent pas des performances futures.
        Les UC comportent un risque de perte en capital.
      </p>
    </div>
  );
}

export default function AVProfilSelector() {
  const [selected, setSelected] = useState('equilibre');
  const profil = PROFILS.find(p => p.id === selected);

  return (
    <div className="avps-wrap">

      {/* Sélecteur */}
      <div className="avps-label">Mon profil est…</div>
      <div className="avps-grid">
        {PROFILS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className={`avps-btn${selected === p.id ? ' avps-btn--active' : ''}${p.badge ? ' avps-btn--featured' : ''}`}
            style={selected === p.id ? { borderColor: p.color, background: p.bg } : p.badge ? { borderColor: p.color } : {}}
          >
            {p.badge && <span className="avps-btn-badge" style={{ background: p.color }}>{p.badge}</span>}
            <span className="avps-btn-icon">{p.icon}</span>
            <span className="avps-btn-name">{p.label}</span>
            <span className="avps-btn-desc">{p.desc}</span>
          </button>
        ))}
      </div>

      {/* Détail */}
      {profil && (
        <div className="avps-detail" style={{ borderColor: profil.border }}>

          {/* Répartition visuelle */}
          <div className="avps-repart">
            <div className="avps-repart-title">Répartition recommandée</div>
            <div className="avps-repart-bar">
              <div
                className="avps-repart-euros"
                style={{ width: `${profil.repart.euros}%`, background: 'var(--orizia-primary)' }}
              >
                {profil.repart.euros > 15 ? `${profil.repart.euros}% Fonds €` : ''}
              </div>
              <div
                className="avps-repart-uc"
                style={{ width: `${profil.repart.uc}%`, background: profil.ucColor }}
              >
                {profil.repart.uc > 15 ? `${profil.repart.uc}% UC` : ''}
              </div>
            </div>
            <div className="avps-repart-legend">
              <span><span className="avps-dot" style={{ background: 'var(--orizia-primary)' }} />Fonds en euros — capital garanti</span>
              <span><span className="avps-dot" style={{ background: profil.ucColor }} />Unités de compte — performance</span>
            </div>
          </div>

          {/* Stats */}
          <div className="avps-stats">
            <div className="avps-stat">
              <div className="avps-stat-label">Rendement estimé</div>
              <div className="avps-stat-value" style={{ color: profil.color }}>{profil.taux_label}</div>
            </div>
            <div className="avps-stat">
              <div className="avps-stat-label">Profil idéal</div>
              <div className="avps-stat-value" style={{ fontSize: '0.82rem', color: 'var(--orizia-accent)' }}>{profil.horizon_conseil}</div>
            </div>
          </div>

          {/* Stratégie */}
          <div className="avps-strategie">
            <div className="avps-strategie-title" style={{ color: profil.color }}>📋 Stratégie</div>
            <p>{profil.strategie}</p>
          </div>

          {/* Conseil Cindy */}
          <div className="avps-conseil">
            <span>💬</span>
            <p>{profil.conseil}</p>
          </div>

          {/* Simulateur */}
          <SimulateurRendement profil={profil} />

          <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 20 }}>
            📅 Construire mon allocation sur-mesure →
          </Link>
        </div>
      )}
    </div>
  );
}
