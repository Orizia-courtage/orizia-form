'use client';

import ReadingProgressBase from './ReadingProgressBase';

// Ordre réel des sections dans la page :
// Comprendre (1/7) → Simulateur (2/7) → Processus (3/7) → Profils (4/7)
// → Auto-évaluation (5/7) → Formulaire (6/7) → FAQ (7/7)

const JALONS_DESKTOP = [
  { label: 'Comprendre',     id: 'section-comprendre',     displayPct: 8  },
  { label: 'Simulateur',     id: 'section-simulateur',     displayPct: 22 },
  { label: 'Processus',      id: 'section-processus',      displayPct: 36 },
  { label: 'Auto-évaluation',id: 'section-autoevaluation', displayPct: 56 },
  { label: 'Formulaire',     id: 'formulaire',             displayPct: 72 },
  { label: 'FAQ',            id: 'section-faq',            displayPct: 88 },
];

const JALONS_MOBILE = [
  { label: 'Simulateur', id: 'section-simulateur', displayPct: 20 },
  { label: 'Formulaire', id: 'formulaire',          displayPct: 58 },
  { label: 'FAQ',        id: 'section-faq',         displayPct: 84 },
];

export default function ReadingProgressRegroupement() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
