'use client';

import { useState } from 'react';
import Link from 'next/link';

const TMI_OPTIONS = [
  { id: 'tmi11', label: '11%', desc: 'Revenus modérés' },
  { id: 'tmi30', label: '30%', desc: 'Cadre, salarié' },
  { id: 'tmi41', label: '41%', desc: 'Cadre supérieur, TNS' },
  { id: 'tmi45', label: '45%', desc: 'Dirigeant, hauts revenus' },
];

const OBJECTIFS = [
  { id: 'revenus', icon: '💰', label: 'Revenus réguliers', desc: 'Je veux des loyers maintenant' },
  { id: 'patrimoine', icon: '📈', label: 'Valorisation', desc: 'Je vise la plus-value à terme' },
  { id: 'transmission', icon: '🎁', label: 'Transmission', desc: 'Je prépare ma succession' },
  { id: 'fiscal', icon: '🧾', label: 'Optimisation fiscale', desc: 'Je veux réduire mes impôts' },
];

const STRATEGIES = {
  tmi11: {
    revenus:      { type: 'SCPI françaises en direct', tag: '✅ Optimal', tagColor: '#16a34a', tagBg: 'rgba(22,163,74,0.08)', rendement: '4–6%', net: '~3,5–5%', conseil: 'À 11% de TMI, la fiscalité des revenus fonciers est très supportable. Les SCPI françaises en direct sont parfaitement adaptées — vous touchez l\'essentiel du rendement brut.', color: 'var(--orizia-primary)' },
    patrimoine:   { type: 'SCPI de plus-value', tag: '✅ Recommandé', tagColor: '#16a34a', tagBg: 'rgba(22,163,74,0.08)', rendement: '2–3%', net: 'Plus-value à terme', conseil: 'Axées sur la valorisation des parts plutôt que les revenus immédiats. Fiscalité des plus-values mobilières plus avantageuse que les revenus fonciers.', color: '#7c3aed' },
    transmission: { type: 'SCPI en assurance vie', tag: '✅ Recommandé', tagColor: '#16a34a', tagBg: 'rgba(22,163,74,0.08)', rendement: '3–5%', net: 'Transmission hors succession', conseil: 'Loger vos SCPI dans une AV permet de transmettre jusqu\'à 152 500€ par bénéficiaire hors succession. Idéal pour préparer votre succession.', color: '#d97706' },
    fiscal:       { type: 'SCPI fiscales (Déficit Foncier)', tag: '⚠️ Limité à ce TMI', tagColor: '#d97706', tagBg: 'rgba(217,119,6,0.08)', rendement: '1–3%', net: 'Réduction IR', conseil: 'À 11% de TMI, l\'avantage fiscal des SCPI Pinel ou Déficit Foncier est limité. Je vous orienterai probablement vers une autre stratégie plus rentable.', color: '#d97706' },
  },
  tmi30: {
    revenus:      { type: 'SCPI européennes', tag: '✅ Recommandé', tagColor: '#16a34a', tagBg: 'rgba(22,163,74,0.08)', rendement: '4–6%', net: '~3–4,5%', conseil: 'À 30% de TMI, les SCPI européennes (Allemagne, Pays-Bas…) permettent d\'éviter les prélèvements sociaux français grâce aux conventions fiscales. Avantage net significatif.', color: 'var(--orizia-primary)' },
    patrimoine:   { type: 'SCPI de plus-value', tag: '✅ Recommandé', tagColor: '#16a34a', tagBg: 'rgba(22,163,74,0.08)', rendement: '2–3%', net: 'Plus-value à terme', conseil: 'Fiscalité des plus-values mobilières (30% flat tax) plus avantageuse que les revenus fonciers à 30% + 17,2% PS.', color: '#7c3aed' },
    transmission: { type: 'SCPI en assurance vie', tag: '✅ Optimal', tagColor: '#16a34a', tagBg: 'rgba(22,163,74,0.08)', rendement: '3–5%', net: 'Flat tax 30% → 7,5% après 8 ans', conseil: 'L\'AV est particulièrement efficace à ce TMI : flat tax 30% immédiatement, puis 7,5% après 8 ans. Transmission hors succession en bonus.', color: '#d97706' },
    fiscal:       { type: 'SCPI Déficit Foncier', tag: '✅ Intéressant', tagColor: '#16a34a', tagBg: 'rgba(22,163,74,0.08)', rendement: '2–4%', net: 'Réduction IR + revenus', conseil: 'À 30% de TMI, le Déficit Foncier commence à être intéressant si vous avez des revenus fonciers existants à compenser. À analyser selon votre situation.', color: '#7c3aed' },
  },
  tmi41: {
    revenus:      { type: 'SCPI européennes en priorité', tag: '⭐ Prioritaire', tagColor: 'var(--orizia-primary)', tagBg: 'rgba(45,106,95,0.08)', rendement: '4–6%', net: '~3,5–5% (sans PS)', conseil: 'À 41% de TMI, les SCPI françaises en direct vous coûtent 58,2% de fiscalité. Les SCPI européennes permettent d\'éviter les 17,2% de PS — un gain net considérable.', color: 'var(--orizia-primary)' },
    patrimoine:   { type: 'SCPI en nue-propriété', tag: '⭐ Stratégie avancée', tagColor: 'var(--orizia-primary)', tagBg: 'rgba(45,106,95,0.08)', rendement: '0% pendant 5–15 ans', net: 'Décote 15–30% + plus-value', conseil: 'Vous achetez à prix décoté, aucun revenu pendant la période de démembrement (zéro fiscalité), puis récupérez la pleine propriété. Idéal si vous n\'avez pas besoin de revenus immédiats.', color: '#7c3aed' },
    transmission: { type: 'SCPI en assurance vie', tag: '✅ Optimal', tagColor: '#16a34a', tagBg: 'rgba(22,163,74,0.08)', rendement: '3–5%', net: 'Flat tax 30% → 7,5% après 8 ans', conseil: 'L\'AV est incontournable à ce TMI pour les SCPI. Flat tax 30% au lieu de 58,2% en direct. Transmission hors succession jusqu\'à 152 500€/bénéficiaire.', color: '#d97706' },
    fiscal:       { type: 'SCPI Déficit Foncier', tag: '✅ Très intéressant', tagColor: '#16a34a', tagBg: 'rgba(22,163,74,0.08)', rendement: '2–4%', net: 'Réduction IR 41%', conseil: 'À 41% de TMI, chaque euro de déficit foncier vous économise 0,41€ d\'impôt. Combiné à des revenus fonciers existants, c\'est une stratégie très efficace.', color: '#7c3aed' },
  },
  tmi45: {
    revenus:      { type: 'SCPI européennes exclusivement', tag: '🔴 Impératif', tagColor: '#dc2626', tagBg: 'rgba(220,38,38,0.08)', rendement: '4–6%', net: '~3,5–5% (sans PS)', conseil: 'À 45% de TMI, les SCPI françaises en direct sont taxées à 62,2%. Les SCPI européennes sont impératives — c\'est la différence entre un placement rentable et un placement contre-productif.', color: '#dc2626' },
    patrimoine:   { type: 'SCPI en nue-propriété', tag: '⭐ Stratégie optimale', tagColor: 'var(--orizia-primary)', tagBg: 'rgba(45,106,95,0.08)', rendement: '0% pendant 5–15 ans', net: 'Décote 15–30% + plus-value', conseil: 'Zéro revenu = zéro fiscalité pendant la période. Vous récupérez la pleine propriété à terme avec une plus-value taxée à 30% flat tax. La stratégie la plus efficace à ce TMI.', color: '#7c3aed' },
    transmission: { type: 'SCPI en assurance vie', tag: '✅ Incontournable', tagColor: '#16a34a', tagBg: 'rgba(22,163,74,0.08)', rendement: '3–5%', net: 'Flat tax 30% → 7,5% après 8 ans', conseil: 'L\'AV est la seule enveloppe qui rend les SCPI fiscalement supportables à ce TMI. 30% au lieu de 62,2% — la différence sur 20 ans est considérable.', color: '#d97706' },
    fiscal:       { type: 'SCPI Déficit Foncier', tag: '✅ Très puissant', tagColor: '#16a34a', tagBg: 'rgba(22,163,74,0.08)', rendement: '2–4%', net: 'Réduction IR 45%', conseil: 'À 45% de TMI, le Déficit Foncier est l\'un des rares outils légaux pour réduire significativement votre imposition sur les revenus fonciers existants. À combiner avec d\'autres stratégies.', color: '#7c3aed' },
  },
};

export default function SCPIProfilFiscal() {
  const [tmi, setTmi] = useState(null);
  const [objectif, setObjectif] = useState(null);

  const strategie = tmi && objectif ? STRATEGIES[tmi]?.[objectif] : null;

  return (
    <div className="scpipf-wrap">

      {/* Étape 1 : TMI */}
      <div className="scpipf-step">
        <div className="scpipf-step-label">
          <span className="scpipf-step-num">1</span>
          Mon taux marginal d'imposition (TMI)
        </div>
        <div className="scpipf-tmi-grid">
          {TMI_OPTIONS.map(t => (
            <button
              key={t.id}
              onClick={() => setTmi(tmi === t.id ? null : t.id)}
              className={`scpipf-tmi-btn${tmi === t.id ? ' scpipf-tmi-btn--active' : ''}`}
            >
              <span className="scpipf-tmi-val">{t.label}</span>
              <span className="scpipf-tmi-desc">{t.desc}</span>
            </button>
          ))}
        </div>
        {!tmi && (
          <p className="scpipf-hint">
            💡 Votre TMI figure sur votre avis d'imposition, rubrique "Taux marginal d'imposition"
          </p>
        )}
      </div>

      {/* Étape 2 : Objectif */}
      {tmi && (
        <div className="scpipf-step">
          <div className="scpipf-step-label">
            <span className="scpipf-step-num">2</span>
            Mon objectif principal
          </div>
          <div className="scpipf-obj-grid">
            {OBJECTIFS.map(o => (
              <button
                key={o.id}
                onClick={() => setObjectif(objectif === o.id ? null : o.id)}
                className={`scpipf-obj-btn${objectif === o.id ? ' scpipf-obj-btn--active' : ''}`}
              >
                <span className="scpipf-obj-icon">{o.icon}</span>
                <span className="scpipf-obj-label">{o.label}</span>
                <span className="scpipf-obj-desc">{o.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Résultat */}
      {strategie && (
        <div className="scpipf-result" style={{ borderColor: strategie.color }}>
          <div className="scpipf-result-header">
            <div>
              <div className="scpipf-result-type" style={{ color: strategie.color }}>
                {strategie.type}
              </div>
              <span
                className="scpipf-result-tag"
                style={{ color: strategie.tagColor, background: strategie.tagBg }}
              >
                {strategie.tag}
              </span>
            </div>
            <div className="scpipf-result-stats">
              <div className="scpipf-result-stat">
                <div className="scpipf-result-stat-label">Rendement brut</div>
                <div className="scpipf-result-stat-val" style={{ color: strategie.color }}>{strategie.rendement}</div>
              </div>
              <div className="scpipf-result-stat">
                <div className="scpipf-result-stat-label">Net estimé</div>
                <div className="scpipf-result-stat-val" style={{ color: '#16a34a' }}>{strategie.net}</div>
              </div>
            </div>
          </div>
          <div className="scpipf-result-conseil">
            <span>💬</span>
            <p>{strategie.conseil}</p>
          </div>
          <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 16 }}>
            📅 Affiner ma stratégie SCPI
          </Link>
        </div>
      )}
    </div>
  );
}
