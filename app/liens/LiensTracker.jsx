'use client';
import { track } from '@vercel/analytics';

// Compte les clics de la page (Vercel Analytics > Events « liens_clic ») :
// on sait ce que les visiteurs Instagram utilisent vraiment.
export default function LiensTracker({ children }) {
  const onClick = (event) => {
    const el = event.target.closest?.('[data-track]');
    if (el) track('liens_clic', { cible: el.getAttribute('data-track') });
  };
  return <div onClickCapture={onClick}>{children}</div>;
}
