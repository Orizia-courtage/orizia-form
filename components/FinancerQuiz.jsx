'use client';

import { useState } from 'react';
import Link from 'next/link';
import ContactPopup from '@/components/ContactPopup';

const QUESTIONS = [
  {
    id: 'projet',
    question: 'Quel est votre projet ?',
    options: [
      { id: 'achat', label: 'Acheter un bien', icon: '🏠', desc: 'Résidence principale ou investissement' },
      { id: 'mensualites', label: 'Alléger mes mensualités', icon: '💳', desc: 'Trop de crédits en cours' },
      { id: 'travaux', label: 'Financer des travaux / un achat', icon: '🔧', desc: 'Auto, travaux, trésorerie' },
      { id: 'separation', label: 'Divorce / Succession', icon: '⚖️', desc: 'Racheter la part d\'un co-propriétaire' },
    ],
  },
  {
    id: 'situation',
    question: 'Quelle est votre situation professionnelle ?',
    options: [
      { id: 'cdi', label: 'CDI / Fonctionnaire', icon: '👔', desc: 'Revenus stables et réguliers' },
      { id: 'tns', label: 'Indépendant / TNS', icon: '⚙️', desc: '2+ ans d\'ancienneté' },
      { id: 'retraite', label: 'Retraité', icon: '🏖️', desc: 'Revenus fixes' },
      { id: 'autre', label: 'Autre', icon: '❓', desc: 'CDD, intérim, sans emploi' },
    ],
  },
];

const RECOMMANDATIONS = {
  achat_cdi:      { produit: 'Crédit immobilier', href: '/financer/credit-immobilier', icon: '🏠', color: 'var(--orizia-primary)', raison: 'Profil idéal pour un crédit immobilier. Je mets 40+ banques en concurrence pour vous obtenir le meilleur taux et négocier l\'assurance emprunteur.' },
  achat_tns:      { produit: 'Crédit immobilier', href: '/financer/credit-immobilier', icon: '🏠', color: 'var(--orizia-primary)', raison: 'Finançable avec 2 bilans solides. Je sais quelles banques sont les plus ouvertes aux TNS et comment présenter votre dossier pour maximiser vos chances.' },
  achat_retraite: { produit: 'Crédit immobilier', href: '/financer/credit-immobilier', icon: '🏠', color: 'var(--orizia-primary)', raison: 'Votre stabilité de revenus est un atout. Je trouve les banques qui acceptent les dossiers retraités aux meilleures conditions.' },
  achat_autre:    { produit: 'Crédit immobilier', href: '/financer/credit-immobilier', icon: '🏠', color: 'var(--orizia-primary)', raison: 'Votre situation mérite une analyse personnalisée. Certaines banques ont des critères plus souples — je sais lesquelles.' },
  mensualites_cdi:      { produit: 'Regroupement de crédits', href: '/financer/regroupement-credits', icon: '🔄', color: '#7c3aed', raison: 'Profil très favorable. En CDI avec plusieurs crédits, je peux réduire vos mensualités de 30 à 60% en un seul dossier.' },
  mensualites_tns:      { produit: 'Regroupement de crédits', href: '/financer/regroupement-credits', icon: '🔄', color: '#7c3aed', raison: 'Étude au cas par cas selon vos bilans. Des solutions existent pour les TNS — je connais les établissements spécialisés.' },
  mensualites_retraite: { produit: 'Regroupement de crédits', href: '/financer/regroupement-credits', icon: '🔄', color: '#7c3aed', raison: 'Les retraités sont un profil apprécié pour le regroupement. Revenus fixes = dossier solide.' },
  mensualites_autre:    { produit: 'Regroupement de crédits', href: '/financer/regroupement-credits', icon: '🔄', color: '#7c3aed', raison: 'Votre situation mérite une analyse honnête. Je vous dis clairement ce qui est possible et quelles alternatives existent.' },
  travaux_cdi:      { produit: 'Prêt personnel', href: '/financer/pret-personnel', icon: '💶', color: '#d97706', raison: 'En CDI, vous accédez aux meilleurs TAEG du marché. Je compare les organismes et élimine les assurances inutiles.' },
  travaux_tns:      { produit: 'Prêt personnel', href: '/financer/pret-personnel', icon: '💶', color: '#d97706', raison: 'Finançable avec un historique stable. Je sélectionne les organismes les plus ouverts aux indépendants.' },
  travaux_retraite: { produit: 'Prêt personnel', href: '/financer/pret-personnel', icon: '💶', color: '#d97706', raison: 'Revenus fixes = dossier rassurant. Je trouve le meilleur TAEG adapté à votre situation.' },
  travaux_autre:    { produit: 'Prêt personnel', href: '/financer/pret-personnel', icon: '💶', color: '#d97706', raison: 'Certains organismes sont plus souples que les banques classiques. Je sais lesquels contacter selon votre profil.' },
  separation_cdi:      { produit: 'Rachat de soulte', href: '/financer/rachat-soulte', icon: '⚖️', color: '#16a34a', raison: 'Profil solide pour un rachat de soulte. Je monte le financement et coordonne avec votre notaire pour que tout soit prêt à temps.' },
  separation_tns:      { produit: 'Rachat de soulte', href: '/financer/rachat-soulte', icon: '⚖️', color: '#16a34a', raison: 'Faisable avec les bons partenaires. Je connais les banques qui acceptent les TNS pour ce type d\'opération.' },
  separation_retraite: { produit: 'Rachat de soulte', href: '/financer/rachat-soulte', icon: '⚖️', color: '#16a34a', raison: 'Votre stabilité de revenus est un atout. Je calcule la soulte avec vous et monte le financement adapté.' },
  separation_autre:    { produit: 'Rachat de soulte', href: '/financer/rachat-soulte', icon: '⚖️', color: '#16a34a', raison: 'Situation complexe qui mérite une analyse personnalisée. Je vous dis honnêtement ce qui est possible.' },
};

export default function FinancerQuiz() {
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQ = QUESTIONS[step - 1];
  const isIntro  = step === 0;
  const isDone   = step === QUESTIONS.length + 1;
  const reco     = isDone ? RECOMMANDATIONS[`${answers.projet}_${answers.situation}`] || null : null;

  const handleAnswer = (qId, optId) => {
    const next = { ...answers, [qId]: optId };
    setAnswers(next);
    if (step < QUESTIONS.length) setStep(step + 1);
    else setStep(QUESTIONS.length + 1);
  };

  const goBack = () => { if (step > 1) setStep(step - 1); else setStep(0); };
  const reset  = () => { setStep(0); setAnswers({}); };

  return (
    <div className="iq-wrap">
      {isIntro && (
        <div className="iq-intro">
          <div className="iq-intro-icon">🏦</div>
          <h3 className="iq-intro-title" style={{ color: 'var(--orizia-accent)' }}>Quel financement vous correspond ?</h3>
          <p className="iq-intro-desc" style={{ color: 'var(--orizia-dark)', opacity: 0.6 }}>
            2 questions · 20 secondes · Recommandation personnalisée
          </p>
          <button className="fin-btn-primary" onClick={() => setStep(1)}>Démarrer</button>
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
              <button key={opt.id} onClick={() => handleAnswer(currentQ.id, opt.id)} className="iq-option">
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
            <Link href={reco.href} className="fin-btn-primary">Découvrir {reco.produit}</Link>
            <ContactPopup label="📅 Étude de faisabilité avec Cindy" className="fin-btn-secondary" />
          </div>
          <button onClick={reset} className="iq-reset">↩ Recommencer</button>
        </div>
      )}
    </div>
  );
}
