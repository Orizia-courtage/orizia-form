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
    return { label: 'Disponible', color: '#3e7f68', dot: '#3e7f68' };
  }

  // Calcul du prochain créneau
  let nextLabel = '';
  if (day === 0) nextLabel = 'Disponible lundi à 9h';
  else if (day === 6) nextLabel = 'Disponible lundi à 9h';
  else if (timeDecimal < 9) nextLabel = 'Disponible à 9h';
  else nextLabel = 'Disponible demain à 9h';

  return { label: nextLabel, color: '#a87a2c', dot: '#a87a2c' };
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
          animation: status.dot === '#3e7f68' ? 'pulse 2s infinite' : 'none',
        }}
      />
      {status.label}
    </div>
  );
}
