'use client';

import { useState, useEffect, useRef } from 'react';

const BASE = [
  { icon: '🔥', label: 'Incendie & Explosions', desc: 'La base absolue. Couvre la destruction de votre logement et de vos biens suite à un incendie ou un court-circuit majeur.' },
  { icon: '💧', label: 'Dégâts des eaux', desc: 'Le sinistre n°1 en France. Fuite, canalisation rompue ou infiltration : je vérifie toujours les plafonds d\'indemnisation.' },
  { icon: '🛡️', label: 'Responsabilité civile', desc: 'Vous blessez quelqu\'un ou vous cassez un objet chez des amis ? Cette garantie prend le relais pour toute votre famille.' },
  { icon: '🌪️', label: 'Catastrophes naturelles', desc: 'Inondations, sécheresse, tempêtes. Avec la taxe qui passe à 20%, c\'est le moment de comparer pour absorber cette hausse.' },
];

const OPTIONS = [
  { icon: '🔒', label: 'Vol & Vandalisme', desc: 'Souvent en option. Attention aux contrats qui imposent des serrures complexes ou excluent les objets de valeur.' },
  { icon: '🪟', label: 'Bris de glace', desc: 'Fenêtres, plaques vitrocéramiques, miroirs. Utile, mais il faut s\'assurer que la franchise ne soit pas supérieure au prix de la vitre.' },
  { icon: '⚖️', label: 'Protection juridique', desc: 'Litige avec un voisin, un artisan ou le syndic ? Vos frais d\'avocat sont pris en charge. Un vrai bouclier au quotidien.' },
  { icon: '💻', label: 'Dommages Électriques', desc: 'La foudre grille votre frigo et votre TV ? Cette option (souvent ignorée) vous sauve la mise. Idéal pour le télétravail.' },
];

function CarouselGroup({ items, type }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const intervalRef = useRef(null);

  const isBase = type === 'base';
  const accentColor = isBase ? '#16a34a' : '#d97706';
  const bgColor = isBase ? 'rgba(22,163,74,0.06)' : 'rgba(217,119,6,0.06)';
  const borderColor = isBase ? 'rgba(22,163,74,0.25)' : 'rgba(217,119,6,0.25)';
  const label = isBase ? 'BASE' : 'OPTION';

  const go = (dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(prev =>
        dir === 'next'
          ? (prev + 1) % items.length
          : (prev - 1 + items.length) % items.length
      );
      setAnimating(false);
    }, 220);
  };

  // Auto-play
  useEffect(() => {
    intervalRef.current = setInterval(() => go('next'), 3500);
    return () => clearInterval(intervalRef.current);
  }, [current, animating]);

  const resetTimer = (dir) => {
    clearInterval(intervalRef.current);
    go(dir);
  };

  const item = items[current];

  return (
    <div style={{
      background: bgColor,
      border: `1px solid ${borderColor}`,
      borderRadius: 20,
      padding: '32px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      flex: 1,
      minWidth: 0,
    }}>
      {/* Header groupe */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            display: 'inline-block',
            background: isBase ? 'rgba(22,163,74,0.12)' : 'rgba(217,119,6,0.12)',
            color: accentColor,
            fontSize: '0.72rem',
            fontWeight: 900,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '5px 14px',
            borderRadius: 100,
            border: `1px solid ${borderColor}`,
          }}>
            {label}
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--orizia-dark)', opacity: 0.5, fontWeight: 600 }}>
            {current + 1} / {items.length}
          </span>
        </div>
        {/* Flèches */}
        <div style={{ display: 'flex', gap: 8 }}>
          {['prev', 'next'].map(dir => (
            <button
              key={dir}
              onClick={() => resetTimer(dir)}
              aria-label={dir === 'prev' ? 'Précédent' : 'Suivant'}
              style={{
                width: 36, height: 36,
                borderRadius: '50%',
                border: `1.5px solid ${borderColor}`,
                background: 'var(--orizia-white)',
                color: accentColor,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = accentColor; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = accentColor; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--orizia-white)'; e.currentTarget.style.color = accentColor; e.currentTarget.style.borderColor = borderColor; }}
            >
              {dir === 'prev' ? '←' : '→'}
            </button>
          ))}
        </div>
      </div>

      {/* Carte animée */}
      <div style={{
        background: 'var(--orizia-white)',
        borderRadius: 14,
        padding: '28px 24px',
        border: `1px solid ${borderColor}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        minHeight: 160,
        opacity: animating ? 0 : 1,
        transform: animating
          ? `translateX(${direction === 'next' ? '-12px' : '12px'})`
          : 'translateX(0)',
        transition: 'opacity 0.22s ease, transform 0.22s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <span style={{
            fontSize: '2rem',
            width: 52, height: 52,
            background: bgColor,
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>{item.icon}</span>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--orizia-accent)', margin: 0 }}>
            {item.label}
          </h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--orizia-dark)', opacity: 0.75, lineHeight: 1.65, margin: 0 }}>
          {item.desc}
        </p>
      </div>

      {/* Indicateurs dots */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { clearInterval(intervalRef.current); setDirection(i > current ? 'next' : 'prev'); setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false); }, 220); }}
            aria-label={`Garantie ${i + 1}`}
            style={{
              width: i === current ? 20 : 8,
              height: 8,
              borderRadius: 100,
              background: i === current ? accentColor : `${accentColor}40`,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function GarantiesCarousel() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
    }}
      className="garanties-carousel-grid"
    >
      <CarouselGroup items={BASE} type="base" />
      <CarouselGroup items={OPTIONS} type="option" />
      <style>{`
        @media (max-width: 768px) {
          .garanties-carousel-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
