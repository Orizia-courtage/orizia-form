'use client';

import ReadingProgressBase from './ReadingProgressBase';

// Jalons dans l'ordre de la page (les positions sont calculées automatiquement).
const JALONS_DESKTOP = [
  { label: 'Placements', id: 'produits' },
  { label: 'Pourquoi Orizia', id: 'section-pourquoi' },
  { label: 'Accompagnement', id: 'section-etapes' },
  { label: 'FAQ', id: 'section-faq' },
];

const JALONS_MOBILE = [
  { label: 'Placements', id: 'produits' },
  { label: 'Accompagnement', id: 'section-etapes' },
  { label: 'FAQ', id: 'section-faq' },
];

export default function ReadingProgressInvestir() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
