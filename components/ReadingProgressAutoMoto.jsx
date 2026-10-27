'use client';

import ReadingProgressBase from './ReadingProgressBase';

// Jalons dans l'ordre de la page (les positions sont calculées automatiquement).
const JALONS_DESKTOP = [
  { label: 'Formules', id: 'section-formules' },
  { label: 'Moto', id: 'section-moto' },
  { label: 'Profils', id: 'section-profils' },
  { label: 'Loi Hamon', id: 'section-hamon' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
];

const JALONS_MOBILE = [
  { label: 'Formules', id: 'section-formules' },
  { label: 'Profils', id: 'section-profils' },
  { label: 'Auto-évaluation', id: 'section-autoevaluation' },
];

export default function ReadingProgressAutoMoto() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
