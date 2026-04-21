'use client';

import { useState } from 'react';
import Link from 'next/link';
import ContactPopup from '@/components/ContactPopup';

const QUESTIONS = [
  {
    id: 'objectif',
    question: 'Quel est votre objectif principal ?',
    options: [
      { id: 'revenus', label: 'Revenus réguliers', icon: '💰', desc: 'Percevoir des loyers ou intérêts' },
      { id: 'fiscal', label: 'Réduire mes impôts', icon: '🧾', desc: 'Optimiser ma fiscalité dès cette année' },
      { id: 'capital', label: 'Faire fructifier mon capital', icon: '📈', desc: 'Valoriser mon épargne sur le long terme' },
      { id: 'transmission', label: 'Préparer ma succession', icon: '🎁', desc: 'Transmettre dans les meilleures conditions' },
    ],
  },
  {
    id: 'horizon',
    question: 'Sur quel horizon souhaitez-vous investir ?',
    options: [
      { id: 'court', label: '1–3 ans', icon: '⚡', desc: 'Court terme, capital disponible rapidement' },
      { id: 'moyen', label: '3–8 ans', icon: '📅', desc: 'Moyen terme, quelques années de patience' },
      { id: 'long', label: '8–15 ans', icon: '🌱', desc: 'Long terme, je peux attendre' },
      { id: 'tres_long', label: '15 ans+', icon: '🏔️', desc: 'Très long terme, retraite ou succession' },
    ],
  },
  {
    id: 'tmi',
    question: 'Quel est votre taux marginal d\'imposition ?',
    options: [
      { id: 'faible', label: 'Moins de 30%', icon: '🟢', desc: 'TMI 0%, 11% ou 30%' },
      { id: 'eleve', label: '30% ou plus', icon: '🟠', desc: 'TMI 30%, 41% ou 45%' },
      { id: 'tns', label: 'Indépendant / TNS', icon: '⚙️', desc: 'Travailleur non salarié' },
      { id: 'inconnu', label: 'Je ne sais pas', icon: '❓', desc: 'Je veux qu\'on le calcule ensemble' },
    ],
  },
];

const RECOMMANDATIONS = {
  revenus_court_faible:    { produit: 'Crowdfunding', href: '/investir/crowdfunding', icon: '📈', raison: '8–12%/an sur 12–36 mois. Rendement élevé à court terme, idéal pour votre profil.', color: '#0369a1' },
  revenus_court_eleve:     { produit: 'Crowdfunding', href: '/investir/crowdfunding', icon: '📈', raison: 'Flat tax 30% sur les intérêts. Rendement élevé sur courte durée.', color: '#0369a1' },
  revenus_moyen_faible:    { produit: 'SCPI', href: '/investir/scpi', icon: '🏢', raison: '4–6%/an, loyers trimestriels, zéro gestion. Parfait pour votre horizon.', color: 'var(--orizia-primary)' },
  revenus_moyen_eleve:     { produit: 'SCPI européennes', href: '/investir/scpi', icon: '🏢', raison: 'SCPI européennes pour éviter les prélèvements sociaux français. Rendement net optimisé.', color: 'var(--orizia-primary)' },
  revenus_long_faible:     { produit: 'Assurance Vie', href: '/investir/assurance-vie', icon: '🛡️', raison: 'Profil équilibré ou dynamique. Fiscalité optimale après 8 ans.', color: 'var(--orizia-accent)' },
  revenus_long_eleve:      { produit: 'Assurance Vie + SCPI', href: '/investir/assurance-vie', icon: '🛡️', raison: 'SCPI logées en AV pour combiner rendement immobilier et flat tax 30%.', color: 'var(--orizia-accent)' },
  fiscal_court_eleve:      { produit: 'PER', href: '/investir/per', icon: '🏦', raison: 'Déduction fiscale immédiate dès cette année. Rendement fiscal garanti.', color: '#b45309' },
  fiscal_court_tns:        { produit: 'PER (Madelin)', href: '/investir/per', icon: '🏦', raison: 'Plafond Madelin jusqu\'à 85 000€/an. Le levier fiscal le plus puissant pour un TNS.', color: '#b45309' },
  fiscal_moyen_eleve:      { produit: 'PER', href: '/investir/per', icon: '🏦', raison: 'Versements déductibles + rattrapage des plafonds N-3. Économie d\'impôt immédiate.', color: '#b45309' },
  fiscal_long_eleve:       { produit: 'PER + Assurance Vie', href: '/investir/per', icon: '🏦', raison: 'PER pour la déduction fiscale, AV pour la liquidité. La combinaison optimale.', color: '#b45309' },
  capital_long_faible:     { produit: 'Assurance Vie', href: '/investir/assurance-vie', icon: '🛡️', raison: 'Profil dynamique (80% UC). Potentiel 4–5%/an sur 15 ans avec fiscalité avantageuse.', color: 'var(--orizia-accent)' },
  capital_tres_long_eleve: { produit: 'PER + Assurance Vie', href: '/investir/per', icon: '🏦', raison: 'PER pour défiscaliser + AV pour la performance long terme. Duo imbattable.', color: '#b45309' },
  transmission_long_faible:  { produit: 'Assurance Vie', href: '/investir/assurance-vie', icon: '🛡️', raison: '152 500€ par bénéficiaire exonérés. L\'outil de transmission le plus puissant.', color: 'var(--orizia-accent)' },
  transmission_long_eleve:   { produit: 'Assurance Vie', href: '/investir/assurance-vie', icon: '🛡️', raison: 'Transmission hors succession + fiscalité optimisée après 8 ans. Incontournable.', color: 'var(--orizia-accent)' },
  default: { produit: 'Bilan patrimonial', href: '/rendez-vous', icon: '📋', raison: 'Votre situation mérite une analyse personnalisée. Je vous propose un bilan complet en 45 minutes.', color: 'var(--orizia-primary)' },
};

function getRecommandation(answers) {
  const key = `${answers.objectif}_${answers.horizon}_${answers.tmi}`;
  return RECOMMANDATIONS[key] || RECOMMANDATIONS[`${answers.objectif}_${answers.horizon}_eleve`] || RECOMMANDATIONS[`${answers.objectif}_long_eleve`] || RECOMMANDATIONS.default;
}

export default function InvestirQuiz() {
  const [step, setStep] = useState(0); // 0 = intro, 1-3 = questions, 4 = résultat
  const [answers, setAnswers] = useState({});

  const currentQ = QUESTIONS[step - 1];
  const isIntro = step === 0;
  const isDone = step === QUESTIONS.length + 1;
  const reco = isDone ? getRecommandation(answers) : null;

  const handleAnswer = (qId, optId) => {
    const newAnswers = { ...answers, [qId]: optId };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStep(QUESTIONS.length + 1);
    }
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
    else setStep(0);
  };

  const reset = () => { setStep(0); setAnswers({}); };

  return (
    <div className="iq-wrap">
      {isIntro && (
        <div className="iq-intro">
          <div className="iq-intro-icon">🎯</div>
          <h3 className="iq-intro-title" style={{ color: 'var(--orizia-accent)' }}>Quel placement est fait pour vous ?</h3>
          <p className="iq-intro-desc" style={{ color: 'var(--orizia-dark)', opacity: 0.6 }}>
            3 questions · 30 secondes · Recommandation personnalisée
          </p>
          <button className="fin-btn-primary" onClick={() => setStep(1)}>
            Démarrer
          </button>
        </div>
      )}

      {!isIntro && !isDone && currentQ && (
        <div className="iq-question">
          <div className="iq-progress-row">
            <button onClick={goBack} className="iq-back">← Retour</button>
            <div className="iq-progress">
              {QUESTIONS.map((_, i) => (
                <div key={i} className={`iq-progress-dot${i < step ? ' iq-progress-dot--done' : i === step - 1 ? ' iq-progress-dot--active' : ''}`} />
              ))}
            </div>
            <div className="iq-step-label" style={{ color: 'var(--orizia-dark)', opacity: 0.4 }}>{step}/{QUESTIONS.length}</div>
          </div>
          <h3 className="iq-q-title" style={{ color: 'var(--orizia-accent)' }}>{currentQ.question}</h3>
          <div className="iq-options">
            {currentQ.options.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleAnswer(currentQ.id, opt.id)}
                className="iq-option"
              >
                <span className="iq-option-icon">{opt.icon}</span>
                <div>
                  <div className="iq-option-label" style={{ color: 'var(--orizia-accent)' }}>{opt.label}</div>
                  <div className="iq-option-desc" style={{ color: 'var(--orizia-dark)', opacity: 0.5 }}>{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isDone && reco && (
        <div className="iq-result">
          <div className="iq-result-header">
            <span className="iq-result-icon">{reco.icon}</span>
            <div>
              <div className="iq-result-label">Notre recommandation</div>
              <div className="iq-result-produit" style={{ color: reco.color }}>{reco.produit}</div>
            </div>
          </div>
          <p className="iq-result-raison">{reco.raison}</p>
          <div className="iq-result-actions">
            <Link href={reco.href} className="fin-btn-primary">
              Découvrir {reco.produit}
            </Link>
            <ContactPopup label="📅 Bilan personnalisé" className="fin-btn-secondary" />
          </div>
          <button onClick={reset} className="iq-reset">↩ Recommencer</button>
        </div>
      )}
    </div>
  );
}
