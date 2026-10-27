'use client';

import ReadingProgressBase from './ReadingProgressBase';

// Jalons dans l'ordre de la page (les positions sont calculées automatiquement).
const JALONS_DESKTOP = [
  { label: 'Définition', id: 'section-definition' },
  { label: 'Profil fiscal', id: 'section-profil' },
  { label: 'Risques', id: 'section-risques' },
  { label: 'Fiscalité', id: 'section-fiscalite' },
  { label: 'Simulateur', id: 'section-simulateur' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
];

const JALONS_MOBILE = [
  { label: 'Profil fiscal', id: 'section-profil' },
  { label: 'Simulateur', id: 'section-simulateur' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
];

export default function ReadingProgressSCPI() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
