'use client';

import ReadingProgressBase from './ReadingProgressBase';

const JALONS_DESKTOP = [
  { label: 'Mon projet', id: 'section-projets', displayPct: 16 },
  { label: 'Accompagnement', id: 'section-accompagnement', displayPct: 38 },
  { label: 'Auto-évaluation', id: 'section-autoevaluation', displayPct: 62 },
  { label: 'FAQ', id: 'section-faq', displayPct: 84 },
];

const JALONS_MOBILE = [
  { label: 'Mon projet', id: 'section-projets', displayPct: 25 },
  { label: 'Accompagnement', id: 'section-accompagnement', displayPct: 55 },
  { label: 'FAQ', id: 'section-faq', displayPct: 80 },
];

export default function ReadingProgressPretPersonnel() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
