'use client';

import ReadingProgressBase from './ReadingProgressBase';

// Jalons dans l'ordre de la page (les positions sont calculées automatiquement).
const JALONS_DESKTOP = [
  { label: 'Définition', id: 'section-definition' },
  { label: 'Risques', id: 'section-risques' },
  { label: 'Fiscalité', id: 'section-fiscalite' },
  { label: 'Sélection', id: 'section-selection' },
  { label: 'Accompagnement', id: 'section-accompagnement' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
];

const JALONS_MOBILE = [
  { label: 'Risques', id: 'section-risques' },
  { label: 'Sélection', id: 'section-selection' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
];

export default function ReadingProgress() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
