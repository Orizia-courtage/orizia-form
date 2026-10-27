'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Icon from '@/components/Icon';

// Confettis aux couleurs de la charte autour du QR code (formes simples, animées en CSS)
const C_SAGE = '#6bb69b', C_MINT = '#b3ddcb', C_INK = '#1b1d1a', C_DEEP = '#3e7f68';
const CONFETTI = [
  { x: 40, y: 40, dx: -14, dy: -10, rot: 40, shape: <rect x="-5" y="-2" width="10" height="4" rx="2" fill={C_SAGE} /> },
  { x: 92, y: 18, dx: -4, dy: -14, rot: -30, shape: <circle r="4" fill={C_MINT} /> },
  { x: 230, y: 20, dx: 6, dy: -14, rot: 60, shape: <path d="M-5 0h10M0 -5v10" stroke={C_DEEP} strokeWidth="2.2" strokeLinecap="round" /> },
  { x: 282, y: 46, dx: 14, dy: -8, rot: -50, shape: <rect x="-5" y="-2" width="10" height="4" rx="2" fill={C_INK} /> },
  { x: 300, y: 112, dx: 16, dy: 0, rot: 90, shape: <circle r="5" fill="none" stroke={C_SAGE} strokeWidth="2" /> },
  { x: 290, y: 190, dx: 14, dy: 10, rot: 30, shape: <path d="M-6 2q3-6 6 0t6 0" fill="none" stroke={C_DEEP} strokeWidth="2" strokeLinecap="round" /> },
  { x: 244, y: 238, dx: 8, dy: 14, rot: -40, shape: <circle r="3.5" fill={C_SAGE} /> },
  { x: 160, y: 250, dx: 0, dy: 14, rot: 20, shape: <rect x="-4" y="-4" width="8" height="8" rx="2" fill={C_MINT} /> },
  { x: 76, y: 238, dx: -8, dy: 14, rot: 70, shape: <path d="M-5 0h10M0 -5v10" stroke={C_SAGE} strokeWidth="2.2" strokeLinecap="round" /> },
  { x: 24, y: 184, dx: -16, dy: 8, rot: -20, shape: <rect x="-5" y="-2" width="10" height="4" rx="2" fill={C_DEEP} /> },
  { x: 16, y: 112, dx: -16, dy: 0, rot: 45, shape: <circle r="4.5" fill={C_MINT} /> },
  { x: 160, y: 8, dx: 0, dy: -14, rot: 0, shape: <path d="M0 -6l1.6 4.4L6 0l-4.4 1.6L0 6l-1.6-4.4L-6 0l4.4-1.6Z" fill={C_SAGE} /> },
  { x: 60, y: 140, dx: -10, dy: 4, rot: 0, shape: <path d="M0 -5l1.3 3.7L5 0l-3.7 1.3L0 5l-1.3-3.7L-5 0l3.7-1.3Z" fill={C_DEEP} /> },
  { x: 262, y: 150, dx: 10, dy: 4, rot: 0, shape: <circle r="2.5" fill={C_INK} /> },
];

/**
 * Passer de l'ordinateur au téléphone : QR code à scanner (viseur animé,
 * confettis), étapes, et alternatives « copier » / « ouvrir l'application ».
 */
export default function ScanToPhone({ href, icon, color = '#3e7f68', title, value, copyLabel = 'Copier', openLabel, finalStep = 'C’est parti', compact = false, children }) {
  const [qr, setQr] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    QRCode.toDataURL(href, { width: 440, margin: 1, errorCorrectionLevel: 'H', color: { dark: '#1b1d1a', light: '#ffffff' } })
      .then(url => { if (alive) setQr(url); })
      .catch(() => {});
    return () => { alive = false; };
  }, [href]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(value); }
    catch {
      const input = document.createElement('textarea');
      input.value = value; document.body.appendChild(input); input.select();
      document.execCommand('copy'); input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={`scan${compact ? ' scan--compact' : ''}`}>
      {title && <h2 className="cp-scan-title">{title}</h2>}
      <div className="cp-scan-stage">
        <svg className="cp-scan-confetti" viewBox="0 0 320 260" aria-hidden="true">
          {CONFETTI.map((c, i) => (
            <g key={i} className="cp-confetto" style={{ '--x': `${c.dx}px`, '--y': `${c.dy}px`, '--r': `${c.rot}deg`, '--d': `${i * 45}ms`, '--f': `${2.6 + (i % 5) * 0.5}s` }}>
              <g transform={`translate(${c.x} ${c.y})`}>{c.shape}</g>
            </g>
          ))}
        </svg>
        <div className="cp-qr-frame">
          <span className="cp-qr-corner cp-qr-corner--tl" /><span className="cp-qr-corner cp-qr-corner--tr" />
          <span className="cp-qr-corner cp-qr-corner--bl" /><span className="cp-qr-corner cp-qr-corner--br" />
          {qr ? <img className="cp-qr-code" src={qr} alt={`QR code : ${title || value}`} /> : <span className="cp-qr-code cp-qr-code--loading" />}
          <span className="cp-qr-badge" style={{ color }}><Icon name={icon} /></span>
          <span className="cp-qr-scanline" aria-hidden="true" />
        </div>
      </div>

      <ol className="cp-scan-steps">
        <li><span><Icon name="smartphone" /></span>Ouvrez l’appareil photo</li>
        <li><span><Icon name="crosshair" /></span>Visez le code</li>
        <li><span><Icon name={icon} /></span>{finalStep}</li>
      </ol>

      <div className="cp-scan-alt">
        <span>Ou depuis cet ordinateur :</span>
        <button type="button" className={`cp-copy-chip${copied ? ' is-copied' : ''}`} onClick={copy} aria-label={copyLabel}>
          <strong>{value}</strong>
          <span className="cp-copy-chip-state">{copied ? <><Icon name="check" /> Copié</> : <><Icon name="clipboard-list" /> Copier</>}</span>
        </button>
        {openLabel && <a className="cp-scan-open" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>{openLabel} <Icon name="arrow-right" className="oz-arrow" /></a>}
      </div>
      {children}
    </div>
  );
}
