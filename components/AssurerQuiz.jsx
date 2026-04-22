'use client';

import { useState } from 'react';
import Link from 'next/link';
import ContactPopup from '@/components/ContactPopup';

const QUESTIONS = [
  {
    id: 'situation',
    question: 'Quelle est votre situation principale ?',
    options: [
      { id: 'pret', label: 'J\'ai un crédit immobilier', icon: '🏡', desc: 'En cours de remboursement' },
      { id: 'locataire', label: 'Je suis locataire', icon: '🔑', desc: 'Appartement ou maison' },
      { id: 'proprio', label: 'Je suis propriétaire', icon: '🏠', desc: 'Résidence principale ou investissement' },
      { id: 'vehicule', label: 'J\'ai un véhicule', icon: '🚗', desc: 'Auto ou moto' },
    ],
  },
  {
    id: 'anciennete',
    question: 'Depuis combien de temps avez-vous votre contrat actuel ?',
    options: [
      { id: 'moins1', label: 'Moins d\'un an', icon: '🆕', desc: 'Contrat récent' },
      { id: 'un3', label: '1 à 3 ans', icon: '📅', desc: 'Changement possible' },
      { id: 'plus3', label: 'Plus de 3 ans', icon: '⏳', desc: 'Vous payez probablement trop cher' },
      { id: 'sais_pas', label: 'Je ne sais pas', icon: '❓', desc: 'À vérifier ensemble' },
    ],
  },
];

const RECOMMANDATIONS = {
  pret_moins1:   { produit: 'Assurance Emprunteur', href: '/assurer/assurance-emprunteur', icon: '📋', color: '#16a34a', raison: 'Même récent, vous pouvez déjà changer ! La loi Lemoine autorise la résiliation à tout moment. Chaque mois d\'attente, c\'est de l\'argent perdu.' },
  pret_un3:      { produit: 'Assurance Emprunteur', href: '/assurer/assurance-emprunteur', icon: '📋', color: '#16a34a', raison: 'Vous avez déjà payé trop cher pendant 1 à 3 ans. Il est temps d\'agir — je calcule votre économie exacte en 30 minutes.' },
  pret_plus3:    { produit: 'Assurance Emprunteur', href: '/assurer/assurance-emprunteur', icon: '📋', color: '#16a34a', raison: 'Urgence absolue. Avec 3 ans de contrat bancaire, vous avez probablement laissé plusieurs milliers d\'euros sur la table. On corrige ça maintenant.' },
  pret_sais_pas: { produit: 'Assurance Emprunteur', href: '/assurer/assurance-emprunteur', icon: '📋', color: '#16a34a', raison: 'Envoyez-moi votre offre de prêt. Je vous dis en 24h combien vous pouvez économiser.' },
  locataire_moins1:   { produit: 'Assurance Habitation', href: '/assurer/assurance-habitation', icon: '🏠', color: '#d97706', raison: 'Votre contrat est récent mais les tarifs augmentent chaque année. Je vérifie que vous êtes bien couvert au bon prix.' },
  locataire_un3:      { produit: 'Assurance Habitation', href: '/assurer/assurance-habitation', icon: '🏠', color: '#d97706', raison: 'Après 1 an, la loi Hamon vous libère. Je compare le marché et résilie votre ancien contrat sans coupure.' },
  locataire_plus3:    { produit: 'Assurance Habitation', href: '/assurer/assurance-habitation', icon: '🏠', color: '#d97706', raison: '+7% par an depuis 3 ans = vous payez probablement 20% de trop. Je remets les compteurs à zéro.' },
  locataire_sais_pas: { produit: 'Assurance Habitation', href: '/assurer/assurance-habitation', icon: '🏠', color: '#d97706', raison: 'Envoyez-moi votre avis d\'échéance. Je vous dis en 24h si vous payez trop cher.' },
  proprio_moins1:   { produit: 'Assurance Habitation', href: '/assurer/assurance-habitation', icon: '🏠', color: '#d97706', raison: 'Propriétaire récent ? Je vérifie que vos murs, dépendances et biens sont correctement couverts.' },
  proprio_un3:      { produit: 'Assurance Habitation', href: '/assurer/assurance-habitation', icon: '🏠', color: '#d97706', raison: 'Après 1 an, vous pouvez changer librement. Je compare les offres MRH et PNO pour votre profil.' },
  proprio_plus3:    { produit: 'Assurance Habitation', href: '/assurer/assurance-habitation', icon: '🏠', color: '#d97706', raison: 'Vous payez probablement 30% de trop. Je remets le marché en concurrence pour vous.' },
  proprio_sais_pas: { produit: 'Assurance Habitation', href: '/assurer/assurance-habitation', icon: '🏠', color: '#d97706', raison: 'Envoyez-moi votre contrat actuel. Je l\'analyse sans frais de dossier.' },
  vehicule_moins1:   { produit: 'Assurance Auto & Moto', href: '/assurer/auto-moto', icon: '🚗', color: 'var(--orizia-primary)', raison: 'Contrat récent mais déjà trop cher ? Je vérifie que la formule correspond à la valeur réelle de votre véhicule.' },
  vehicule_un3:      { produit: 'Assurance Auto & Moto', href: '/assurer/auto-moto', icon: '🚗', color: 'var(--orizia-primary)', raison: 'Après 1 an, la loi Hamon vous libère. Je compare le marché et résilie votre ancien contrat.' },
  vehicule_plus3:    { produit: 'Assurance Auto & Moto', href: '/assurer/auto-moto', icon: '🚗', color: 'var(--orizia-primary)', raison: 'La taxe de fidélité vous coûte cher. Je remets les assureurs en concurrence pour votre profil.' },
  vehicule_sais_pas: { produit: 'Assurance Auto & Moto', href: '/assurer/auto-moto', icon: '🚗', color: 'var(--orizia-primary)', raison: 'Envoyez-moi votre contrat. Je vous dis en 24h si vous pouvez faire mieux.' },
};

export default function AssurerQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQ = QUESTIONS[step - 1];
  const isIntro = step === 0;
  const isDone = step === QUESTIONS.length + 1;

  const reco = isDone
    ? RECOMMANDATIONS[`${answers.situation}_${answers.anciennete}`] || null
    : null;

  const handleAnswer = (qId, optId) => {
    const newAnswers = { ...answers, [qId]: optId };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length) setStep(step + 1);
    else setStep(QUESTIONS.length + 1);
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
          <div className="iq-intro-icon">🛡️</div>
          <h3 className="iq-intro-title" style={{ color: 'var(--orizia-accent)' }}>Quel contrat optimiser en premier ?</h3>
          <p className="iq-intro-desc" style={{ color: 'var(--orizia-dark)', opacity: 0.6 }}>
            2 questions · 20 secondes · Recommandation personnalisée
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
              <div className="iq-result-label">Priorité recommandée</div>
              <div className="iq-result-produit" style={{ color: reco.color }}>{reco.produit}</div>
            </div>
          </div>
          <p className="iq-result-raison">{reco.raison}</p>
          <div className="iq-result-actions">
            <Link href={reco.href} className="fin-btn-primary">
              Optimiser ce contrat
            </Link>
            <ContactPopup label="📅 Bilan complet" className="fin-btn-secondary" />
          </div>
          <button onClick={reset} className="iq-reset">↩ Recommencer</button>
        </div>
      )}
    </div>
  );
}
