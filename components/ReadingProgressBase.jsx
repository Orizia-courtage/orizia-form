'use client';

import { useEffect, useState } from 'react';

/**
 * Composant ReadingProgress générique.
 * Les jalons s'allument quand la section entre dans le viewport (IntersectionObserver)
 * plutôt que sur des pourcentages fixes — synchronisation parfaite avec le scroll réel.
 *
 * @param {Array} jalonsDesktop - [{label, id, displayPct}] — displayPct = position visuelle sur la barre
 * @param {Array} jalonsMobile  - max 3 jalons pour mobile
 */
export default function ReadingProgressBase({ jalonsDesktop, jalonsMobile }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [passed, setPassed] = useState(new Set());

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
      // Visible entre 200px du haut et 92% du scroll (avant le footer)
      setVisible(scrollTop > 200 && pct < 92);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // IntersectionObserver pour allumer les jalons
    const allJalons = [...jalonsDesktop, ...jalonsMobile];
    const uniqueIds = [...new Set(allJalons.map(j => j.id))];

    const observers = [];
    uniqueIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setPassed(prev => new Set([...prev, id]));
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -20% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      observers.forEach(obs => obs.disconnect());
    };
  }, [jalonsDesktop, jalonsMobile]);

  if (!visible) return null;

  const jalons = isMobile ? jalonsMobile : jalonsDesktop;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="rp-bar">
      <div className="rp-track">
        <div className="rp-fill" style={{ width: `${progress}%` }} />
        {jalons.map(j => (
          <button
            key={j.label}
            onClick={() => scrollTo(j.id)}
            className={`rp-jalon${passed.has(j.id) ? ' rp-jalon--passed' : ''}`}
            style={{ left: `${j.displayPct}%`, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
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
