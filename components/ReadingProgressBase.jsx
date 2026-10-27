'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Ligne de lecture : une section est « atteinte » quand son haut passe sous le header.
const READ_LINE = 120;
// Décalage appliqué quand on clique sur un jalon (hauteur du header + marge).
const SCROLL_OFFSET = 96;

/**
 * Barre de progression de lecture avec jalons cliquables.
 *
 * Les jalons sont répartis régulièrement sur la barre (lisibilité), et le
 * remplissage est calculé à partir de la position RÉELLE de chaque section :
 * quand la section N arrive en haut de l'écran, la barre atteint exactement
 * le point N. Le jalon actif, le remplissage et le pourcentage restent donc
 * toujours cohérents, y compris après un clic sur un jalon.
 *
 * jalonsDesktop / jalonsMobile : [{ label, id }] dans l'ordre de la page.
 */
export default function ReadingProgressBase({ jalonsDesktop, jalonsMobile }) {
  const [isMobile, setIsMobile] = useState(false);
  const [state, setState] = useState({ visible: false, fading: false, fill: 0, activeIndex: -1 });
  const frame = useRef(0);

  const [order, setOrder] = useState(null); // ids triés selon leur position réelle dans la page
  const source = (isMobile && jalonsMobile?.length ? jalonsMobile : jalonsDesktop) || [];
  const jalons = order ? order.map(id => source.find(j => j.id === id)).filter(Boolean) : source;
  const positions = jalons.map((_, i) => ((i + 1) / (jalons.length + 1)) * 100);

  const compute = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const pageRatio = scrollY / maxScroll;

    // Sections présentes, triées dans l'ordre réel de la page
    const found = source
      .map(j => ({ j, el: document.getElementById(j.id) }))
      .filter(x => x.el)
      .map(x => ({ id: x.j.id, top: x.el.getBoundingClientRect().top + scrollY - READ_LINE }))
      .sort((a, b) => a.top - b.top);
    const ids = found.map(x => x.id);
    setOrder(prev => (prev && prev.join('|') === ids.join('|') ? prev : ids));
    const pos = found.map((_, i) => ((i + 1) / (found.length + 1)) * 100);
    const points = found.map((x, i) => ({ index: i, at: Math.min(Math.max(x.top, 0), maxScroll), pos: pos[i] }));

    // Interpolation par morceaux : 0 → jalon 1 → … → dernier jalon → 100
    const stops = [{ at: 0, pos: 0 }, ...points, { at: maxScroll, pos: 100 }];
    let fill = 100;
    for (let k = 0; k < stops.length - 1; k++) {
      const a = stops[k], b = stops[k + 1];
      if (scrollY <= b.at) {
        const span = b.at - a.at;
        fill = span <= 0 ? b.pos : a.pos + ((scrollY - a.at) / span) * (b.pos - a.pos);
        break;
      }
    }

    let activeIndex = -1;
    for (const p of points) if (scrollY + 1 >= p.at) activeIndex = p.index;

    setState({
      visible: scrollY > 200 && pageRatio < 0.97,
      fading: pageRatio >= 0.9,
      fill: Math.max(0, Math.min(100, fill)),
      activeIndex,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, jalonsDesktop, jalonsMobile]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(compute);
    };
    const onResize = () => { checkMobile(); onScroll(); };
    checkMobile();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    // Les images et simulateurs changent la hauteur de la page après le chargement
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [compute]);

  if (!state.visible || jalons.length === 0) return null;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav className={`rp-bar${state.fading ? ' rp-bar--fading' : ''}`} aria-label="Progression de lecture">
      <div className="rp-track">
        <div className="rp-fill" style={{ width: `${state.fill}%` }} />
        {jalons.map((j, i) => (
          <button
            key={j.id + j.label}
            type="button"
            onClick={() => scrollTo(j.id)}
            className={[
              'rp-jalon',
              i <= state.activeIndex ? 'rp-jalon--passed' : '',
              i === state.activeIndex ? 'rp-jalon--active' : '',
            ].filter(Boolean).join(' ')}
            style={{ left: `${positions[i]}%` }}
            aria-label={`Aller à : ${j.label}`}
            aria-current={i === state.activeIndex ? 'step' : undefined}
          >
            <span className="rp-jalon-dot" />
            <span className="rp-jalon-label">{j.label}</span>
          </button>
        ))}
      </div>
      <span className="rp-pct">{Math.round(state.fill)}%</span>
    </nav>
  );
}
