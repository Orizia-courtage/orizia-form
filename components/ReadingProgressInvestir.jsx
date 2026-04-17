'use client';

import { useEffect, useState } from 'react';

const JALONS_DESKTOP = [
  { label: 'Placements', pct: 28, id: 'produits' },
  { label: 'Pourquoi Orizia', pct: 52, id: 'section-pourquoi' },
  { label: 'Accompagnement', pct: 70, id: 'section-etapes' },
  { label: 'FAQ', pct: 85, id: 'section-faq' },
];

const JALONS_MOBILE = [
  { label: 'Placements', pct: 28, displayPct: 25, id: 'produits' },
  { label: 'Accompagnement', pct: 70, displayPct: 50, id: 'section-etapes' },
  { label: 'FAQ', pct: 85, displayPct: 75, id: 'section-faq' },
];

export default function ReadingProgressInvestir() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
      setVisible(scrollTop > 200 && pct < 92);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!visible) return null;

  const jalons = isMobile ? JALONS_MOBILE : JALONS_DESKTOP;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="rp-bar">
      <div className="rp-track">
        <div className="rp-fill" style={{ width: `${progress}%` }} />
        {jalons.map(j => {
          const pos = isMobile ? j.displayPct : j.pct;
          return (
            <button
              key={j.label}
              onClick={() => scrollTo(j.id)}
              className={`rp-jalon${progress >= j.pct ? ' rp-jalon--passed' : ''}`}
              style={{ left: `${pos}%`, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              aria-label={`Aller à : ${j.label}`}
            >
              <div className="rp-jalon-dot" />
              <span className="rp-jalon-label">{j.label}</span>
            </button>
          );
        })}
      </div>
      <span className="rp-pct">{progress}%</span>
    </div>
  );
}
