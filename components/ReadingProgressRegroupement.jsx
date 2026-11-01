'use client';

import ReadingProgressBase from './ReadingProgressBase';

// Jalons dans l'ordre de la page (les positions sont calculées automatiquement).
const JALONS_DESKTOP = [
  { label: 'Formulaire', id: 'formulaire' },
  { label: 'Comprendre', id: 'section-comprendre' },
  { label: 'Simulateur', id: 'section-simulateur' },
  { label: 'Processus', id: 'section-processus' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
  { label: 'FAQ', id: 'section-faq' },
];

const JALONS_MOBILE = [
  { label: 'Formulaire', id: 'formulaire' },
  { label: 'Simulateur', id: 'section-simulateur' },
  { label: 'FAQ', id: 'section-faq' },
];

export default function ReadingProgressRegroupement() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
