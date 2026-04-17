'use client';

import { useEffect, useState, useRef } from 'react';

const JALONS = [
  { label: 'Risques', pct: 30, id: 'section-risques' },
  { label: 'Fiscalité', pct: 55, id: 'section-fiscalite' },
  { label: 'Sélection', pct: 75, id: 'section-selection' },
];

export default function ReadingProgress() {
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
