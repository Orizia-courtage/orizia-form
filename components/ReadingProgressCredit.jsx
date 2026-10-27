'use client';

import ReadingProgressBase from './ReadingProgressBase';

// Jalons dans l'ordre de la page (les positions sont calculées automatiquement).
const JALONS_DESKTOP = [
  { label: 'Mon projet', id: 'section-projets' },
  { label: 'Accompagnement', id: 'section-etapes' },
  { label: 'Simulateur', id: 'section-simulateur' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
  { label: 'FAQ', id: 'section-faq' },
];

const JALONS_MOBILE = [
  { label: 'Mon projet', id: 'section-projets' },
  { label: 'Simulateur', id: 'section-simulateur' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
];

export default function ReadingProgressCredit() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
