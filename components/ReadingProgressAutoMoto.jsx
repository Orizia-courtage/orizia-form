'use client';

import ReadingProgressBase from './ReadingProgressBase';

const JALONS_DESKTOP = [
  { label: 'Formules', id: 'section-formules', displayPct: 16 },
  { label: 'Moto', id: 'section-moto', displayPct: 32 },
  { label: 'Profils', id: 'section-profils', displayPct: 50 },
  { label: 'Loi Hamon', id: 'section-hamon', displayPct: 66 },
  { label: 'Auto-évaluation', id: 'section-autoevaluation', displayPct: 82 },
];

const JALONS_MOBILE = [
  { label: 'Formules', id: 'section-formules', displayPct: 25 },
  { label: 'Profils', id: 'section-profils', displayPct: 50 },
  { label: 'Auto-évaluation', id: 'section-autoevaluation', displayPct: 75 },
];

export default function ReadingProgressAutoMoto() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
