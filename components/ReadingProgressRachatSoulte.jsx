'use client';

import ReadingProgressBase from './ReadingProgressBase';

const JALONS_DESKTOP = [
  { label: 'Définition', id: 'section-definition', displayPct: 14 },
  { label: 'Simulateur', id: 'section-simulateur', displayPct: 34 },
  { label: 'Accompagnement', id: 'section-accompagnement', displayPct: 56 },
  { label: 'Auto-évaluation', id: 'section-autoevaluation', displayPct: 74 },
  { label: 'FAQ', id: 'section-faq', displayPct: 88 },
];

const JALONS_MOBILE = [
  { label: 'Simulateur', id: 'section-simulateur', displayPct: 25 },
  { label: 'Accompagnement', id: 'section-accompagnement', displayPct: 55 },
  { label: 'FAQ', id: 'section-faq', displayPct: 82 },
];

export default function ReadingProgressRachatSoulte() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
