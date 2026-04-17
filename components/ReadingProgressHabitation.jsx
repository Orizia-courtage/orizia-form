'use client';

import ReadingProgressBase from './ReadingProgressBase';

const JALONS_DESKTOP = [
  { label: 'Profils', id: 'section-profils', displayPct: 16 },
  { label: 'Garanties', id: 'section-garanties', displayPct: 32 },
  { label: 'Accompagnement', id: 'section-accompagnement', displayPct: 50 },
  { label: 'Loi Hamon', id: 'section-hamon', displayPct: 66 },
  { label: 'Auto-évaluation', id: 'section-autoevaluation', displayPct: 82 },
];

const JALONS_MOBILE = [
  { label: 'Profils', id: 'section-profils', displayPct: 25 },
  { label: 'Accompagnement', id: 'section-accompagnement', displayPct: 50 },
  { label: 'Auto-évaluation', id: 'section-autoevaluation', displayPct: 75 },
];

export default function ReadingProgressHabitation() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
