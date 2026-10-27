'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 500, suffix: '+', label: 'dossiers accompagnés' },
  { value: 20, suffix: ' ans', label: "d'expérience en intermédiation bancaire" },
  { value: 98, suffix: ' %', label: 'de clients satisfaits' },
  { value: 40, prefix: '+', label: 'banques et assureurs partenaires' },
];

function useCountUp(target, duration, start) {
  const [count, setCount] = useState(target);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf; let t0 = null;
    const step = (t) => {
      if (t0 === null) t0 = t;
      const p = Math.min((t - t0) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return count;
}

function StatItem({ stat, started }) {
  const count = useCountUp(stat.value, 1600, started);
  return (
    <div className="hst-item">
      <div className="hst-num">{stat.prefix}{count}{stat.suffix}</div>
      <div className="hst-label">{stat.label}</div>
    </div>
  );
}

export default function AnimatedStats() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="hst" aria-label="Orizia en chiffres">
      <div className="hst-grid">
        {STATS.map(s => <StatItem key={s.label} stat={s} started={started} />)}
      </div>
    </section>
  );
}
