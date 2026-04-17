'use client';

import ReadingProgressBase from './ReadingProgressBase';

const JALONS_DESKTOP = [
  { label: 'Solutions', id: 'produits', displayPct: 20 },
  { label: 'Pourquoi Orizia', id: 'section-pourquoi', displayPct: 40 },
  { label: 'Accompagnement', id: 'section-etapes', displayPct: 62 },
  { label: 'FAQ', id: 'section-faq', displayPct: 80 },
];

const JALONS_MOBILE = [
  { label: 'Solutions', id: 'produits', displayPct: 25 },
  { label: 'Accompagnement', id: 'section-etapes', displayPct: 50 },
  { label: 'FAQ', id: 'section-faq', displayPct: 75 },
];

export default function ReadingProgressAssurer() {
  return <ReadingProgressBase jalonsDesktop={JALONS_DESKTOP} jalonsMobile={JALONS_MOBILE} />;
}
