'use client';

import { useEffect, useState } from 'react';

/**
 * ReadingProgressBase — synchronisation par IntersectionObserver.
 * Un seul jalon actif à la fois : le dernier entré dans la zone de lecture.
 */
export default function ReadingProgressBase({ jalonsDesktop, jalonsMobile }) {
  const [progress, setProgress]   = useState(0);
  const [visible, setVisible]     = useState(false);
  const [fading, setFading]       = useState(false);
  const [isMobile, setIsMobile]   = useState(false);
  const [activeId, setActiveId]   = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Scroll progress + visibilité
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
      const shouldShow = scrollTop > 200 && pct < 95;
      const shouldFade = scrollTop > 200 && pct >= 85 && pct < 95;
      setVisible(shouldShow);
      setFading(shouldFade);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Collecte tous les ids uniques dans l'ordre des jalons desktop
    const allJalons = [...jalonsDesktop];
    const uniqueIds = [...new Set(allJalons.map(j => j.id))];

    const visibleSections = new Set();

    const updateActive = () => {
      let last = null;
      for (const id of uniqueIds) {
        if (visibleSections.has(id)) last = id;
      }
      setActiveId(last);
    };

    const observers = [];
    uniqueIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.add(id);
          } else {
            visibleSections.delete(id);
          }
          updateActive();
        },
        { threshold: 0, rootMargin: '-5% 0px -55% 0px' }
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
    <div className={`rp-bar${fading ? ' rp-bar--fading' : ''}`}>
      <div className="rp-track">
        <div className="rp-fill" style={{ width: `${progress}%` }} />
        {jalons.map(j => (
          <button
            key={j.label}
            onClick={() => scrollTo(j.id)}
            className={`rp-jalon${activeId === j.id ? ' rp-jalon--passed' : ''}`}
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
