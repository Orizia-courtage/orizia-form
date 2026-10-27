'use client';

import Icon from '@/components/Icon';

/** Ouvre directement l'agenda de Cindy (Cal.com), sans étape intermédiaire. */
export default function RdvButton({ children = 'Prendre rendez-vous', className = 'fin-btn-primary', icon = 'calendar-days' }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent('orizia:rdv'))}
    >
      {icon ? <Icon name={icon} /> : null}
      {children}
    </button>
  );
}
