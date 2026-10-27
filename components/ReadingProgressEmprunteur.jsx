'use client';

import ReadingProgressBase from './ReadingProgressBase';

// Jalons dans l'ordre de la page (les positions sont calculées automatiquement).
const JALONS_DESKTOP = [
  { label: 'Calculateur', id: 'section-calculateur' },
  { label: 'Loi Lemoine', id: 'section-lemoine' },
  { label: 'Garanties', id: 'section-garanties' },
  { label: 'Accompagnement', id: 'section-accompagnement' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
];

const JALONS_MOBILE = [
  { label: 'Calculateur', id: 'section-calculateur' },
  { label: 'Loi Lemoine', id: 'section-lemoine' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
];

export default function ReadingProgressEmprunteur() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
