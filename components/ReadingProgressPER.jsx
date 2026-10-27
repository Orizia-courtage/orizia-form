'use client';

import ReadingProgressBase from './ReadingProgressBase';

// Jalons dans l'ordre de la page (les positions sont calculées automatiquement).
const JALONS_DESKTOP = [
  { label: 'Définition', id: 'section-definition' },
  { label: 'Calculateur', id: 'section-fiscalite' },
  { label: 'Comparaison', id: 'section-comparaison' },
  { label: 'Risques', id: 'section-risques' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
];

const JALONS_MOBILE = [
  { label: 'Calculateur', id: 'section-fiscalite' },
  { label: 'Risques', id: 'section-risques' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
];

export default function ReadingProgressPER() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
