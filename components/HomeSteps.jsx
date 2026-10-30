'use client';

/**
 * « Quatre étapes, une seule personne » — motion design (GSAP ScrollTrigger).
 *
 * Un fil unique relie les 4 étapes ; la photo de Cindy le parcourt au rythme du
 * défilement (scrub). Chaque étape atteinte s'allume et joue sa micro-animation.
 *
 * - Amélioration progressive : sans JavaScript, la liste reste lisible telle quelle.
 * - prefers-reduced-motion : tout est affiché d'emblée, sans mouvement.
 * - Le tracé est recalculé à partir des positions réelles (4 colonnes ou liste verticale).
 */
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Icon from '@/components/Icon';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Micro-illustrations (SVG, animées en CSS quand l'étape est active) ── */

function IlluTalk() {
  return (
    <svg viewBox="0 0 160 96" aria-hidden="true">
      <g className="i-pop" style={{ '--d': '0s' }}>
        <rect x="8" y="6" width="84" height="26" rx="13" className="f-soft" />
        <rect x="20" y="14" width="48" height="4" rx="2" className="f-sage" />
        <rect x="20" y="21" width="30" height="4" rx="2" className="f-sage o-50" />
      </g>
      <g className="i-pop" style={{ '--d': '.35s' }}>
        <rect x="64" y="38" width="88" height="26" rx="13" className="f-ink" />
        <rect x="76" y="46" width="58" height="4" rx="2" className="f-mint" />
        <rect x="76" y="53" width="38" height="4" rx="2" className="f-mint o-50" />
      </g>
      <g className="i-pop" style={{ '--d': '.7s' }}>
        <rect x="8" y="70" width="46" height="20" rx="10" className="f-soft" />
        <circle cx="21" cy="80" r="3" className="f-sage i-dot" style={{ '--d': '0s' }} />
        <circle cx="31" cy="80" r="3" className="f-sage i-dot" style={{ '--d': '.15s' }} />
        <circle cx="41" cy="80" r="3" className="f-sage i-dot" style={{ '--d': '.3s' }} />
      </g>
    </svg>
  );
}

const BARS = [34, 50, 40, 64, 46, 28];
const BEST = 3;
function IlluCompare() {
  return (
    <svg viewBox="0 0 160 96" aria-hidden="true">
      <line x1="10" y1="86" x2="150" y2="86" className="s-line" />
      {BARS.map((h, i) => (
        <rect key={i} x={16 + i * 22} y={86 - h} width="14" height={h} rx="4"
          className={`i-bar ${i === BEST ? 'i-bar--best' : ''}`} style={{ '--d': `${i * 0.08}s` }} />
      ))}
      <g transform={`translate(${16 + BEST * 22 + 7} ${86 - BARS[BEST] - 12})`}>
        <g className="i-badge" style={{ '--d': '.8s' }}>
          <circle r="9" className="f-sage-deep" />
          <path d="M-4 0 -1 3 4 -3" className="s-white" />
        </g>
      </g>
      <g className="i-scan">
        <circle cx="0" cy="0" r="11" className="s-ink f-glass" />
        <line x1="8" y1="8" x2="15" y2="15" className="s-ink s-thick" />
      </g>
    </svg>
  );
}

const ROWS = [['Taux', 0.52], ['Frais', 0.38], ['Assurance', 0.6]];
function IlluNegotiate() {
  return (
    <svg viewBox="0 0 160 96" aria-hidden="true">
      {ROWS.map(([label, to], i) => (
        <g key={label} transform={`translate(0 ${14 + i * 28})`}>
          <text x="6" y="4" className="i-label">{label}</text>
          <rect x="66" y="-4" width="74" height="9" rx="4.5" className="f-soft" />
          <rect x="66" y="-4" width="74" height="9" rx="4.5" className="f-sage-deep i-shrink" style={{ '--to': to, '--d': `${i * 0.18}s` }} />
          <path d="M150 -4v9M146.5 2 150 5.5 153.5 2" className="s-sage-deep i-down" style={{ '--d': `${0.6 + i * 0.18}s` }} />
        </g>
      ))}
    </svg>
  );
}

function IlluSign() {
  return (
    <svg viewBox="0 0 160 96" aria-hidden="true">
      <rect x="28" y="4" width="104" height="88" rx="9" className="f-white s-line" />
      <rect x="42" y="18" width="62" height="5" rx="2.5" className="f-soft" />
      <rect x="42" y="29" width="76" height="5" rx="2.5" className="f-soft" />
      <rect x="42" y="40" width="50" height="5" rx="2.5" className="f-soft" />
      <line x1="42" y1="78" x2="118" y2="78" className="s-line" />
      <path pathLength="1" className="i-sign" d="M44 72c6-14 10-14 9-3s3 6 8-4 6 9 11 3 4-9 8-1 5 3 9-2 7 2 12-3" />
      <g className="i-pen"><path d="M0 0 9 -9l3 3 -9 9H0z" className="f-ink" /><path d="M0 0 -2 4 2 2" className="f-sage" /></g>
      <g transform="translate(128 10)">
        <g className="i-badge" style={{ '--d': '1.25s' }}>
          <circle r="10" className="f-sage-deep" />
          <path d="M-4.5 0 -1 3.5 4.5 -3" className="s-white" />
        </g>
      </g>
    </svg>
  );
}

const ILLUS = [IlluTalk, IlluCompare, IlluNegotiate, IlluSign];

/* ── Tracé : courbe douce passant par tous les points ── */
function trackPath(points) {
  if (!points.length) return '';
  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1]; const b = points[i];
    const swing = (i % 2 ? 1 : -1) * 16;
    if (Math.abs(b.x - a.x) >= Math.abs(b.y - a.y)) {
      const dx = b.x - a.x;
      d += ` C${a.x + dx * 0.38} ${a.y + swing} ${b.x - dx * 0.38} ${b.y + swing} ${b.x} ${b.y}`;
    } else {
      const dy = b.y - a.y;
      d += ` C${a.x + swing} ${a.y + dy * 0.38} ${b.x + swing} ${b.y - dy * 0.38} ${b.x} ${b.y}`;
    }
  }
  return d;
}

export default function HomeSteps({ steps }) {
  const root = useRef(null);

  useGSAP(() => {
    const el = root.current;
    const list = el.querySelector('.hs4');
    const svg = el.querySelector('.hs4-track');
    const base = svg.querySelector('.hs4-track-base');
    const done = svg.querySelector('.hs4-track-done');
    const dots = [...svg.querySelectorAll('.hs4-dot')];
    const guide = el.querySelector('.hs4-guide');
    const items = [...el.querySelectorAll('.hs4-step')];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wide = () => window.matchMedia('(min-width: 1024px)').matches;

    let length = 0; let stops = []; let progress = reduce ? 1 : 0; let reached = -1;

    // Géométrie : points d'ancrage réels → tracé, longueur et position de chaque étape sur le tracé.
    function layout() {
      const box = el.getBoundingClientRect();
      const points = items.map((item) => {
        const r = item.querySelector('.hs4-anchor').getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      const d = trackPath(points);
      base.setAttribute('d', d); done.setAttribute('d', d);
      length = done.getTotalLength();
      done.style.strokeDasharray = `${length}`;
      const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      stops = points.map((p, i) => {
        if (i === 0) return 0;
        probe.setAttribute('d', trackPath(points.slice(0, i + 1)));
        return probe.getTotalLength() / length;
      });
      points.forEach((p, i) => { dots[i].setAttribute('transform', `translate(${p.x} ${p.y})`); });
    }

    function render(p) {
      progress = p;
      done.style.strokeDashoffset = `${length * (1 - p)}`;
      const pt = done.getPointAtLength(length * p);
      gsap.set(guide, { x: pt.x, y: pt.y });
      const index = stops.reduce((n, stop, i) => (p + 0.015 >= stop ? i : n), -1);
      if (index !== reached) {
        reached = index;
        items.forEach((item, i) => item.classList.toggle('is-active', i <= index));
        dots.forEach((dot, i) => dot.classList.toggle('is-reached', i <= index));
        items.forEach((item, i) => item.classList.toggle('is-current', i === index));
      }
    }

    layout();
    el.classList.add('is-enhanced');
    if (reduce) { render(1); } else {
      const state = { p: 0 };
      gsap.to(state, {
        p: 1, ease: 'none',
        // Ordinateur (fil horizontal) : tout le trajet se joue pendant que le fil est bien visible.
        // Liste verticale : le guide descend au rythme de la lecture.
        scrollTrigger: {
          trigger: list,
          start: () => (wide() ? 'top 82%' : 'top 72%'),
          end: () => (wide() ? 'top 24%' : 'bottom 62%'),
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
        onUpdate: () => render(state.p),
      });
      render(0);
      // Respiration du guide quand il est arrêté (vivant, sans distraire).
      gsap.to(guide.querySelector('.hs4-guide-halo'), { scale: 1.35, opacity: 0, duration: 1.8, repeat: -1, ease: 'sine.out' });
    }

    const resize = new ResizeObserver(() => { layout(); reached = -1; render(progress); });
    resize.observe(el);
    return () => resize.disconnect();
  }, { scope: root });

  return (
    <div className="hs4-wrap" ref={root}>
      <svg className="hs4-track" aria-hidden="true" focusable="false">
        <path className="hs4-track-base" />
        <path className="hs4-track-done" />
        {steps.map((s) => (
          <g key={s.title} className="hs4-dot"><circle r="13" className="hs4-dot-ring" /><circle r="7" className="hs4-dot-core" /></g>
        ))}
      </svg>
      <div className="hs4-guide" aria-hidden="true">
        <span className="hs4-guide-halo" />
        <img src="/images/photo-cindy.webp" alt="" width="56" height="56" />
      </div>
      <ol className="hs4">
        {steps.map((s, i) => {
          const Illu = ILLUS[i % ILLUS.length];
          return (
            <li key={s.title} className="hs4-step">
              <span className="hs4-anchor" aria-hidden="true" />
              <div className="hs4-card">
                <div className="hs4-head">
                  <span className="hs4-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="hs4-illu"><Illu /></div>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="hs4-meta"><Icon name="check" /> {s.meta}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
