'use client';

import ReadingProgressBase from './ReadingProgressBase';

const JALONS_DESKTOP = [
  { label: 'Mon projet', id: 'section-projets', displayPct: 16 },
  { label: 'Accompagnement', id: 'section-etapes', displayPct: 34 },
  { label: 'Simulateur', id: 'section-simulateur', displayPct: 52 },
  { label: 'Auto-évaluation', id: 'section-autoevaluation', displayPct: 70 },
  { label: 'FAQ', id: 'section-faq', displayPct: 86 },
];

const JALONS_MOBILE = [
  { label: 'Mon projet', id: 'section-projets', displayPct: 25 },
  { label: 'Simulateur', id: 'section-simulateur', displayPct: 50 },
  { label: 'Auto-évaluation', id: 'section-autoevaluation', displayPct: 75 },
];

export default function ReadingProgressCredit() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
