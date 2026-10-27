'use client';

import ReadingProgressBase from './ReadingProgressBase';

// Jalons dans l'ordre de la page (les positions sont calculées automatiquement).
const JALONS_DESKTOP = [
  { label: 'Définition', id: 'section-definition' },
  { label: 'Simulateur', id: 'section-simulateur' },
  { label: 'Accompagnement', id: 'section-accompagnement' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
  { label: 'FAQ', id: 'section-faq' },
];

const JALONS_MOBILE = [
  { label: 'Simulateur', id: 'section-simulateur' },
  { label: 'Accompagnement', id: 'section-accompagnement' },
  { label: 'FAQ', id: 'section-faq' },
];

export default function ReadingProgressRachatSoulte() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
