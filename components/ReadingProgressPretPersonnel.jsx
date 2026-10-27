'use client';

import ReadingProgressBase from './ReadingProgressBase';

// Jalons dans l'ordre de la page (les positions sont calculées automatiquement).
const JALONS_DESKTOP = [
  { label: 'Mon projet', id: 'section-projets' },
  { label: 'Accompagnement', id: 'section-accompagnement' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
  { label: 'FAQ', id: 'section-faq' },
];

const JALONS_MOBILE = [
  { label: 'Mon projet', id: 'section-projets' },
  { label: 'Accompagnement', id: 'section-accompagnement' },
  { label: 'FAQ', id: 'section-faq' },
];

export default function ReadingProgressPretPersonnel() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
