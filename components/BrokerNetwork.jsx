/**
 * Illustration SVG : votre dossier au centre, mis en concurrence auprès
 * de plus de 40 partenaires. Les flux sont animés en CSS (cf. design-home.css).
 */
const NODES = Array.from({ length: 10 }, (_, i) => {
  const a = (-90 + i * 36) * (Math.PI / 180);
  return { x: 260 + Math.cos(a) * 190, y: 260 + Math.sin(a) * 190, i };
});
const BEST = 3;

export default function BrokerNetwork() {
  return (
    <figure className="bn" aria-label="Votre dossier est comparé à plus de 40 offres bancaires et d'assurance ; je retiens la meilleure offre.">
      <svg viewBox="0 0 520 520" role="img" aria-hidden="true">
        <defs>
          <radialGradient id="bn-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#6bb69b" stopOpacity=".35" />
            <stop offset="1" stopColor="#6bb69b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="260" cy="260" r="236" className="bn-orbit" />
        <circle cx="260" cy="260" r="190" className="bn-orbit bn-orbit--main" />
        <circle cx="260" cy="260" r="120" className="bn-orbit" />
        <circle cx="260" cy="260" r="150" fill="url(#bn-glow)" />

        {NODES.map(n => (
          <line key={`l${n.i}`} x1="260" y1="260" x2={n.x} y2={n.y}
            className={`bn-link${n.i === BEST ? ' bn-link--best' : ''}`} style={{ '--d': `${n.i * 0.35}s` }} />
        ))}

        {NODES.map(n => (
          <g key={`n${n.i}`} transform={`translate(${n.x} ${n.y})`} className={`bn-node${n.i === BEST ? ' bn-node--best' : ''}`}>
            <circle r={n.i === BEST ? 30 : 22} />
            {n.i % 3 === 1
              ? <path d="M-7 -6 0 -9 7 -6v5c0 5-3.5 8-7 9.5-3.5-1.5-7-4.5-7-9.5Z" />
              : <path d="M-9 8h18M-7 8V-1M-2.3 8V-1M2.3 8V-1M7 8V-1M-9 -2 0 -9 9 -2Z" />}
          </g>
        ))}

        <g className="bn-center" transform="translate(260 260)">
          <circle r="64" />
          <text y="-6" textAnchor="middle" className="bn-center-t1">Votre</text>
          <text y="16" textAnchor="middle" className="bn-center-t1">dossier</text>
        </g>
      </svg>
      <figcaption className="bn-caption">
        <span className="bn-tag bn-tag--a"><strong>+40</strong> offres bancaires et d'assurance</span>
        <span className="bn-tag bn-tag--b"><span className="bn-tag-dot" /> La meilleure offre, retenue pour vous</span>
      </figcaption>
    </figure>
  );
}
