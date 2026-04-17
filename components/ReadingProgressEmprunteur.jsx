'use client';

import ReadingProgressBase from './ReadingProgressBase';

const JALONS_DESKTOP = [
  { label: 'Calculateur', id: 'section-calculateur', displayPct: 16 },
  { label: 'Loi Lemoine', id: 'section-lemoine', displayPct: 32 },
  { label: 'Garanties', id: 'section-garanties', displayPct: 50 },
  { label: 'Accompagnement', id: 'section-accompagnement', displayPct: 66 },
  { label: 'Auto-évaluation', id: 'section-autoevaluation', displayPct: 82 },
];

const JALONS_MOBILE = [
  { label: 'Calculateur', id: 'section-calculateur', displayPct: 25 },
  { label: 'Loi Lemoine', id: 'section-lemoine', displayPct: 50 },
  { label: 'Auto-évaluation', id: 'section-autoevaluation', displayPct: 75 },
];

export default function ReadingProgressEmprunteur() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
