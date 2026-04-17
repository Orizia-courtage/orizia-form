'use client';

import { useEffect, useState } from 'react';

function getStatus() {
  const now = new Date();
  // Heure locale France (Europe/Paris) — on utilise toLocaleString pour extraire
  const parisTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
  const day = parisTime.getDay(); // 0=dim, 1=lun, ..., 5=ven, 6=sam
  const hour = parisTime.getHours();
  const minutes = parisTime.getMinutes();
  const timeDecimal = hour + minutes / 60;

  const isWeekday = day >= 1 && day <= 5;
  const isInHours = timeDecimal >= 9 && timeDecimal < 18;

  if (isWeekday && isInHours) {
    return { label: 'Disponible', color: '#16a34a', dot: '#16a34a' };
  }

  // Calcul du prochain créneau
  let nextLabel = '';
  if (day === 0) nextLabel = 'Disponible lundi à 9h';
  else if (day === 6) nextLabel = 'Disponible lundi à 9h';
  else if (timeDecimal < 9) nextLabel = 'Disponible à 9h';
  else nextLabel = 'Disponible demain à 9h';

  return { label: nextLabel, color: '#d97706', dot: '#d97706' };
}

export default function DispoStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setStatus(getStatus());
    // Recalcule toutes les minutes
    const interval = setInterval(() => setStatus(getStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  return (
    <div className="contact-cindy-dispo">
      <span
        className="contact-dispo-dot"
        style={{
          background: status.dot,
          animation: status.dot === '#16a34a' ? 'pulse 2s infinite' : 'none',
        }}
      />
      {status.label}
    </div>
  );
}
