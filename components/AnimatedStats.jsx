'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 500, suffix: '+', label: 'Dossiers accompagnés' },
  { value: 15, suffix: ' ans', label: "D'expérience terrain" },
  { value: 98, suffix: '%', label: 'Clients satisfaits' },
  { value: null, suffix: 'ORIAS', label: 'Immatriculée & certifiée' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || target === null) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ stat, started }) {
  const count = useCountUp(stat.value, 1800, started);
  return (
    <div>
      <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#E6F5F2', marginBottom: 4 }}>
        {stat.value === null
          ? stat.suffix
          : `${count}${stat.suffix}`}
      </div>
      <div style={{ fontSize: '0.9rem', color: 'rgba(230,245,242,0.75)', fontWeight: 600 }}>
        {stat.label}
      </div>
    </div>
  );
}

export default function AnimatedStats() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--orizia-accent)', padding: '40px 20px' }}>
      <div className="home-stats-grid">
        {STATS.map(s => <StatItem key={s.label} stat={s} started={started} />)}
      </div>
    </section>
  );
}
