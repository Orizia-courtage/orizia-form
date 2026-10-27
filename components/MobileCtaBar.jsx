'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';

/**
 * Barre d'action collante (mobile uniquement) : appeler ou réserver un créneau
 * sans avoir à remonter en haut de page. Apparaît après le premier écran.
 */
export default function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openRdv = () => window.dispatchEvent(new CustomEvent('orizia:contact', { detail: 'rdv' }));

  return (
    <div className={`oz-mobilebar${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <a href="tel:+33777259706" className="oz-mobilebar-call" tabIndex={visible ? 0 : -1}>
        <Icon name="phone" />
        Appeler
      </a>
      <button type="button" className="oz-mobilebar-rdv" onClick={openRdv} tabIndex={visible ? 0 : -1}>
        <Icon name="calendar-days" />
        Prendre rendez-vous
      </button>
    </div>
  );
}
