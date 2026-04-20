'use client';

import ReadingProgressBase from './ReadingProgressBase';

const JALONS_DESKTOP = [
  { label: 'Comprendre', id: 'section-comprendre', displayPct: 14 },
  { label: 'Simulateur', id: 'section-simulateur', displayPct: 32 },
  { label: 'Processus', id: 'section-processus', displayPct: 50 },
  { label: 'Auto-évaluation', id: 'section-autoevaluation', displayPct: 68 },
  { label: 'Formulaire', id: 'formulaire', displayPct: 82 },
  { label: 'FAQ', id: 'section-faq', displayPct: 92 },
];

const JALONS_MOBILE = [
  { label: 'Simulateur', id: 'section-simulateur', displayPct: 20 },
  { label: 'Formulaire', id: 'formulaire', displayPct: 55 },
  { label: 'FAQ', id: 'section-faq', displayPct: 82 },
];

export default function ReadingProgressRegroupement() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
