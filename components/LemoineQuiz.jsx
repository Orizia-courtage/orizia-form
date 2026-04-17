'use client';

import { useState } from 'react';
import Link from 'next/link';

const QUESTIONS = [
  {
    id: 'montant',
    question: 'Quel est le montant de votre prêt par personne ?',
    options: [
      { label: 'Moins de 200 000€', value: 'ok', icon: '✅' },
      { label: 'Entre 200 000€ et 400 000€', value: 'couple', icon: '👥' },
      { label: 'Plus de 400 000€', value: 'high', icon: '🏦' },
    ],
  },
  {
    id: 'age',
    question: 'Quel âge aurez-vous à la fin du remboursement ?',
    options: [
      { label: 'Moins de 60 ans', value: 'ok', icon: '✅' },
      { label: '60 ans ou plus', value: 'limit', icon: '⚠️' },
    ],
  },
  {
    id: 'sante',
    question: 'Avez-vous des antécédents médicaux significatifs ?',
    options: [
      { label: 'Non, aucun', value: 'ok', icon: '💪' },
      { label: 'Oui, j\'ai eu des problèmes de santé', value: 'risk', icon: '🏥' },
    ],
  },
];

export default function LemoineQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: value };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const getResult = () => {
    const { montant, age, sante } = answers;
    if ((montant === 'ok' || montant === 'couple') && age === 'ok') {
      return {
        type: 'eligible',
        title: '🎉 Vous êtes éligible à la loi Lemoine',
        desc: 'Aucun questionnaire médical ne vous sera demandé. Vous pouvez changer d\'assurance immédiatement, sans condition de santé.',
        cta: 'Calculer mon économie →',
        href: '#economies',
        color: '#16a34a',
        bg: 'rgba(22,163,74,0.08)',
        border: 'rgba(22,163,74,0.3)',
      };
    }
    if (sante === 'risk') {
      return {
        type: 'risque',
        title: '🤝 Votre dossier mérite une analyse experte',
        desc: 'Même avec des antécédents, des solutions existent. Je travaille avec des assureurs spécialisés dans les risques aggravés. Parlons-en.',
        cta: 'Prendre rendez-vous →',
        href: '/rendez-vous',
        color: '#d97706',
        bg: 'rgba(217,119,6,0.08)',
        border: 'rgba(217,119,6,0.3)',
      };
    }
    return {
      type: 'analyse',
      title: '📋 Une analyse personnalisée s\'impose',
      desc: 'Votre situation dépasse les seuils automatiques de la loi Lemoine, mais des solutions existent. Je calcule votre économie potentielle en rendez-vous.',
      cta: 'Prendre rendez-vous →',
      href: '/rendez-vous',
      color: 'var(--orizia-primary)',
      bg: 'rgba(45,106,95,0.08)',
      border: 'rgba(45,106,95,0.3)',
    };
  };

  const reset = () => { setStep(0); setAnswers({}); setDone(false); };
  const q = QUESTIONS[step];
  const result = done ? getResult() : null;

  return (
    <div className="lemoine-quiz">
      {!done ? (
        <>
          <div className="lemoine-progress">
            <div className="lemoine-progress-bar" style={{ width: `${((step) / QUESTIONS.length) * 100}%` }} />
          </div>
          <div className="lemoine-step-label">Question {step + 1} / {QUESTIONS.length}</div>
          <h3 className="lemoine-question">{q.question}</h3>
          <div className="lemoine-options">
            {q.options.map(o => (
              <button key={o.value} onClick={() => handleAnswer(o.value)} className="lemoine-option">
                <span className="lemoine-option-icon">{o.icon}</span>
                <span>{o.label}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="lemoine-result" style={{ background: result.bg, border: `1px solid ${result.border}`, borderRadius: 16, padding: '28px 24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: result.color, marginBottom: 12 }}>{result.title}</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--orizia-dark)', opacity: 0.8, lineHeight: 1.6, marginBottom: 20 }}>{result.desc}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href={result.href} className="fin-btn-primary">{result.cta}</Link>
            <button onClick={reset} className="fin-btn-secondary" style={{ cursor: 'pointer', fontFamily: 'inherit' }}>
              Recommencer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
