'use client';

import { useState } from 'react';
import ContactPopup from '@/components/ContactPopup';

import Icon from '@/components/Icon';
const STRATEGIES = [
  {
    id: 'direct',
    icon: 'receipt',
    label: 'SCPI françaises en direct',
    badge: null,
    color: '#5f655f',
    border: 'rgba(100,116,139,0.2)',
    bg: 'rgba(100,116,139,0.04)',
    desc: 'Revenus fonciers soumis à votre TMI + 18,6% de prélèvements sociaux.',
    taux: {
      tmi11: { brut: '5%', net: '~3,5%', taux_fiscal: '29,6%', note: 'Fiscalité supportable à ce TMI' },
      tmi30: { brut: '5%', net: '~2,6%', taux_fiscal: '48,6%', note: 'Fiscalité lourde — envisager les européennes' },
      tmi41: { brut: '5%', net: '~1,7%', taux_fiscal: '59,6%', note: 'Rendement net très dégradé', tone: 'bad' },
      tmi45: { brut: '5%', net: '~1,4%', taux_fiscal: '63,6%', note: 'Contre-productif à ce TMI', tone: 'bad' },
    },
    conseil: 'Adapté uniquement aux TMI faibles (11%). Au-delà, la fiscalité ampute trop le rendement net.',
  },
  {
    id: 'europeennes',
    icon: 'globe',
    label: 'SCPI européennes',
    badge: 'TMI 30%+',
    color: 'var(--orizia-primary)',
    border: 'rgba(45,106,95,0.25)',
    bg: 'rgba(45,106,95,0.05)',
    desc: 'Conventions fiscales bilatérales : souvent exonérées de prélèvements sociaux français.',
    taux: {
      tmi11: { brut: '4,5%', net: '~3,7%', taux_fiscal: '~18%', note: 'Avantage limité à ce TMI' },
      tmi30: { brut: '4,5%', net: '~3,2%', taux_fiscal: '~29%', note: 'Gain net vs SCPI françaises', tone: 'good' },
      tmi41: { brut: '4,5%', net: '~3%', taux_fiscal: '~33%', note: 'Nettement meilleur qu\'en direct', tone: 'good' },
      tmi45: { brut: '4,5%', net: '~2,9%', taux_fiscal: '~36%', note: 'Stratégie recommandée à ce TMI', tone: 'good' },
    },
    conseil: 'Idéal pour les TMI 30%+. Les conventions fiscales avec l\'Allemagne, les Pays-Bas et l\'Irlande permettent d\'éviter les 18,6% de PS français.',
  },
  {
    id: 'av',
    icon: 'shield-check',
    label: 'SCPI en assurance vie',
    badge: 'Meilleur ratio',
    color: '#a87a2c',
    border: 'rgba(168,122,44,0.25)',
    bg: 'rgba(168,122,44,0.05)',
    desc: 'Flat tax 31,4% — voire 7,5% + abattements après 8 ans. Liquidité améliorée.',
    taux: {
      tmi11: { brut: '4%', net: '~2,8%', taux_fiscal: '31,4%', note: 'Moins avantageux qu\'en direct à ce TMI' },
      tmi30: { brut: '4%', net: '~2,7%', taux_fiscal: '31,4%', note: 'Flat tax 31,4% vs 48,6% en direct', tone: 'good' },
      tmi41: { brut: '4%', net: '~2,7%', taux_fiscal: '31,4%', note: 'Économie de 28,2% vs direct', tone: 'good' },
      tmi45: { brut: '4%', net: '~2,7%', taux_fiscal: '31,4%', note: 'Économie de 32,2% vs direct', tone: 'good' },
    },
    conseil: 'La meilleure enveloppe pour les TMI 30%+. Après 8 ans, la fiscalité tombe à 7,5% + abattement 4 600€/an. Liquidité améliorée en bonus.',
  },
  {
    id: 'nuepropriete',
    icon: 'chart-column',
    label: 'SCPI en nue-propriété',
    badge: null,
    color: '#3e7f68',
    border: 'rgba(62,127,104,0.2)',
    bg: 'rgba(62,127,104,0.04)',
    desc: 'Achat à prix décoté (15–30%). Aucun revenu pendant 5–15 ans = zéro fiscalité.',
    taux: {
      tmi11: { brut: '0% pendant 5–15 ans', net: 'Décote + plus-value', taux_fiscal: '0%', note: 'Peu adapté à ce TMI' },
      tmi30: { brut: '0% pendant 5–15 ans', net: 'Décote + plus-value', taux_fiscal: '0%', note: 'Intéressant si pas besoin de revenus', tone: 'good' },
      tmi41: { brut: '0% pendant 5–15 ans', net: 'Décote + plus-value', taux_fiscal: '0%', note: 'Stratégie patrimoniale avancée', tone: 'good' },
      tmi45: { brut: '0% pendant 5–15 ans', net: 'Décote + plus-value', taux_fiscal: '0%', note: 'Zéro fiscalité pendant la période', tone: 'good' },
    },
    conseil: 'Stratégie avancée pour les TMI élevés qui n\'ont pas besoin de revenus immédiats. Vous achetez à prix décoté et récupérez la pleine propriété à terme.',
  },
];

const TMI_OPTIONS = [
  { id: 'tmi11', label: '11%' },
  { id: 'tmi30', label: '30%' },
  { id: 'tmi41', label: '41%' },
  { id: 'tmi45', label: '45%' },
];

export default function SCPIFiscaliteSelector() {
  const [strategie, setStrategie] = useState('europeennes');
  const [tmi, setTmi] = useState('tmi41');

  const s = STRATEGIES.find(x => x.id === strategie);
  const t = s?.taux[tmi];

  return (
    <div className="scpifis-wrap">

      {/* Sélecteur stratégie */}
      <div className="scpifis-strategies">
        {STRATEGIES.map(st => (
          <button
            key={st.id}
            onClick={() => setStrategie(st.id)}
            className={`scpifis-strat-btn${strategie === st.id ? ' scpifis-strat-btn--active' : ''}`}
            style={strategie === st.id ? { borderColor: st.color, background: st.bg } : {}}
          >
            {st.badge && (
              <span className="scpifis-strat-badge" style={{ background: st.color === 'var(--orizia-primary)' ? 'var(--orizia-primary)' : st.color }}>
                {st.badge}
              </span>
            )}
            <span className="scpifis-strat-icon"><Icon name={st.icon} /></span>
            <span className="scpifis-strat-label">{st.label}</span>
          </button>
        ))}
      </div>

      {/* Sélecteur TMI */}
      <div className="scpifis-tmi-row">
        <span className="scpifis-tmi-label">Mon TMI :</span>
        <div className="scpifis-tmi-btns">
          {TMI_OPTIONS.map(opt => (
            <button
              key={opt.id}
              onClick={() => setTmi(opt.id)}
              className={`scpifis-tmi-btn${tmi === opt.id ? ' scpifis-tmi-btn--active' : ''}`}
              style={tmi === opt.id ? { borderColor: s?.color, color: s?.color } : {}}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Résultat */}
      {s && t && (
        <div className="scpifis-result" style={{ borderColor: s.border }}>
          <div className="scpifis-result-header">
            <div className="scpifis-result-icon"><Icon name={s.icon} /></div>
            <div>
              <div className="scpifis-result-name" style={{ color: s.color }}>{s.label}</div>
              <div className="scpifis-result-desc">{s.desc}</div>
            </div>
          </div>

          <div className="scpifis-result-stats">
            <div className="scpifis-result-stat">
              <div className="scpifis-result-stat-label">Rendement brut</div>
              <div className="scpifis-result-stat-val" style={{ color: s.color }}>{t.brut}</div>
            </div>
            <div className="scpifis-result-stat">
              <div className="scpifis-result-stat-label">Fiscalité appliquée</div>
              <div className="scpifis-result-stat-val" style={{ color: '#b0473b' }}>{t.taux_fiscal}</div>
            </div>
            <div className="scpifis-result-stat scpifis-result-stat--highlight">
              <div className="scpifis-result-stat-label">Rendement net estimé</div>
              <div className="scpifis-result-stat-val" style={{ color: '#3e7f68' }}>{t.net}</div>
            </div>
          </div>

          <div className="scpifis-result-note" style={{ color: t.tone === 'good' ? '#3e7f68' : t.tone === 'bad' ? '#b0473b' : 'var(--orizia-accent)' }}>
            {t.note}
          </div>

          <div className="scpifis-result-conseil">
            <span><Icon name="message-circle" /></span>
            <p>{s.conseil}</p>
          </div>
        </div>
      )}

      <div className="crowd-risques-note" style={{ marginTop: 20 }}>
        <Icon name="lightbulb" /> <strong>Mon approche :</strong> je commence toujours par analyser votre TMI avant de recommander une SCPI.
        La même SCPI peut être excellente pour un profil et contre-productive pour un autre.
        <ContactPopup label="Calculer mon rendement net" className="" style={{ color: 'var(--orizia-primary)', fontWeight: 700, marginLeft: 6 }} />
      </div>
    </div>
  );
}
