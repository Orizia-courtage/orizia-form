'use client';
import { useEffect } from 'react';

/**
 * Met à jour la barre de progression scroll du HeaderV2
 * en manipulant directement le DOM (pas de re-render React).
 */
export default function HeaderScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector('.hv2-progress');
    if (!bar) return;

    const onScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width  = `${pct.toFixed(1)}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
