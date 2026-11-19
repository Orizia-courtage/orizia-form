'use client';
import { useSyncExternalStore } from 'react';

// Pastille « en ligne / hors bureau » selon l'heure de Paris (lun.–ven. 9 h–18 h).
function statusNow() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', weekday: 'short', hour: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
  const day = parts.find((p) => p.type === 'weekday')?.value;
  const hour = Number(parts.find((p) => p.type === 'hour')?.value);
  const weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day);
  if (weekday && hour >= 9 && hour < 18) {
    return { open: true, text: 'Au bureau · réponse dans la journée' };
  }
  if (day === 'Sat' || day === 'Sun' || (day === 'Fri' && hour >= 18)) return { open: false, text: 'Hors bureau · réponse lundi matin' };
  if (hour < 9) return { open: false, text: 'Hors bureau · réponse dès 9 h' };
  return { open: false, text: 'Hors bureau · réponse demain matin' };
}

const subscribe = (notify) => { const id = setInterval(notify, 60_000); return () => clearInterval(id); };

export default function LiensStatus() {
  // Calculée côté navigateur seulement (l'heure du serveur ne compte pas) ; rafraîchie chaque minute.
  const key = useSyncExternalStore(subscribe, () => JSON.stringify(statusNow()), () => '');
  const status = key ? JSON.parse(key) : null;
  return (
    <p className={`lk-status${status?.open ? ' is-open' : ''}`} aria-live="polite">
      <i aria-hidden="true" />
      {status ? status.text : 'Réponse rapide, sans engagement'}
    </p>
  );
}
