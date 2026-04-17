'use client';

import { useEffect, useState } from 'react';

const JALONS_DESKTOP = [
  { label: 'Définition', pct: 18, id: 'section-definition' },
  { label: 'Profil fiscal', pct: 32, id: 'section-profil' },
  { label: 'Risques', pct: 46, id: 'section-risques' },
  { label: 'Fiscalité', pct: 58, id: 'section-fiscalite' },
  { label: 'Simulateur', pct: 70, id: 'section-simulateur' },
  { label: 'Auto-évaluation', pct: 84, id: 'section-autoevaluation' },
];

const JALONS_MOBILE = [
  { label: 'Profil fiscal', pct: 32, displayPct: 25, id: 'section-profil' },
  { label: 'Simulateur', pct: 70, displayPct: 50, id: 'section-simulateur' },
  { label: 'Auto-évaluation', pct: 84, displayPct: 75, id: 'section-autoevaluation' },
];

export default function ReadingProgressSCPI() {
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
