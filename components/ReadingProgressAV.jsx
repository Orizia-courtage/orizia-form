'use client';

import ReadingProgressBase from './ReadingProgressBase';

// Jalons dans l'ordre de la page (les positions sont calculées automatiquement).
const JALONS_DESKTOP = [
  { label: 'Définition', id: 'section-definition' },
  { label: 'Risques', id: 'section-risques' },
  { label: 'Fiscalité', id: 'section-fiscalite' },
  { label: 'Accompagnement', id: 'section-accompagnement' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
];

const JALONS_MOBILE = [
  { label: 'Fiscalité', id: 'section-fiscalite' },
  { label: 'Accompagnement', id: 'section-accompagnement' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
];

export default function ReadingProgressAV() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
