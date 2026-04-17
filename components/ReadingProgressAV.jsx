'use client';

import { useEffect, useState } from 'react';

const JALONS = [
  { label: 'Définition', pct: 18, id: 'section-definition' },
  { label: 'Risques', pct: 38, id: 'section-risques' },
  { label: 'Fiscalité', pct: 55, id: 'section-fiscalite' },
  { label: 'Accompagnement', pct: 72, id: 'section-accompagnement' },
  { label: 'Auto-évaluation', pct: 86, id: 'section-autoevaluation' },
];

export default function ReadingProgressAV() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
      setVisible(scrollTop > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="rp-bar">
      <div className="rp-track">
        <div className="rp-fill" style={{ width: `${progress}%` }} />
        {JALONS.map(j => (
          <button
            key={j.label}
            onClick={() => scrollTo(j.id)}
            className={`rp-jalon${progress >= j.pct ? ' rp-jalon--passed' : ''}`}
            style={{ left: `${j.pct}%`, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            aria-label={`Aller à : ${j.label}`}
          >
            <div className="rp-jalon-dot" />
            <span className="rp-jalon-label">{j.label}</span>
          </button>
        ))}
      </div>
      <span className="rp-pct">{progress}%</span>
    </div>
  );
}
