'use client';

import { useEffect, useMemo, useState } from 'react';

const TIME_ZONE = 'Europe/Paris';
const TIMES = Array.from({ length: 18 }, (_, index) => {
  const minutes = 9 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
});
const dateFormatter = new Intl.DateTimeFormat('fr-FR', { timeZone: TIME_ZONE, weekday: 'short', day: 'numeric', month: 'short' });
const timeFormatter = new Intl.DateTimeFormat('fr-FR', { timeZone: TIME_ZONE, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
const parisDate = () => new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(new Date());

function addDays(date, amount) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + amount);
  return value.toISOString().slice(0, 10);
}

function weekDates(start) {
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}

export default function CalAvailabilityCalendar() {
  const [weekStart, setWeekStart] = useState(() => parisDate());
  const [slots, setSlots] = useState({});
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState(null);
  const dates = useMemo(() => weekDates(weekStart), [weekStart]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setSelected(null);
    setStatus(null);
    fetch(`/api/cal/slots?start=${dates[0]}&end=${dates[6]}`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(data => setSlots(data.slots || {}))
      .catch(error => {
        if (error.name !== 'AbortError') {
          setStatus({ type: 'error', message: 'Les disponibilités ne peuvent pas être chargées pour le moment.' });
        }
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [dates]);

  const slotFor = (date, time) => {
    const match = (slots[date] || []).find(slot => {
      const start = typeof slot === 'string' ? slot : slot?.start;
      return start && timeFormatter.format(new Date(start)).replace(' h ', ':') === time;
    });
    return typeof match === 'string' ? match : match?.start || null;
  };

  async function submit(event) {
    event.preventDefault();
    if (!selected) return;
    setStatus({ type: 'loading', message: 'Confirmation de votre rendez-vous…' });
    const response = await fetch('/api/cal/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, start: selected }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus({ type: 'error', message: data.error || 'Une erreur est survenue. Merci de réessayer.' });
      return;
    }
    setStatus({ type: 'success', message: 'Votre rendez-vous est confirmé. Vous recevrez un e-mail de confirmation.' });
  }

  if (status?.type === 'success') return <div className="cal-custom-success">✓ {status.message}</div>;

  return (
    <div className="cal-custom" aria-live="polite">
      <div className="cal-custom-head">
        <button type="button" onClick={() => setWeekStart(addDays(weekStart, -7))} aria-label="Semaine précédente">←</button>
        <strong>Choisissez votre créneau</strong>
        <button type="button" onClick={() => setWeekStart(addDays(weekStart, 7))} aria-label="Semaine suivante">→</button>
      </div>
      <p className="cal-custom-note">Les créneaux grisés ne sont pas disponibles.</p>
      <div className="cal-custom-grid" aria-busy={loading}>
        <div className="cal-custom-time-head" />
        {dates.map(date => <div className="cal-custom-day" key={date}>{dateFormatter.format(new Date(`${date}T12:00:00Z`))}</div>)}
        {TIMES.map(time => <div className="cal-custom-row" key={time}>
          <span>{time}</span>
          {dates.map(date => {
            const slot = slotFor(date, time);
            const isSelected = slot && selected === slot;
            return <button key={date} type="button" className={`cal-custom-slot${slot ? ' is-open' : ''}${isSelected ? ' is-selected' : ''}`} disabled={!slot || loading} onClick={() => setSelected(slot)} aria-label={`${date} à ${time}${slot ? ', disponible' : ', indisponible'}`} />;
          })}
        </div>)}
      </div>
      {selected && <form className="cal-custom-form" onSubmit={submit}>
        <strong>Créneau choisi : {dateFormatter.format(new Date(selected))} à {timeFormatter.format(new Date(selected))}</strong>
        <input required placeholder="Nom et prénom" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} />
        <input required type="email" placeholder="Adresse e-mail" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} />
        <input type="tel" placeholder="Téléphone (facultatif)" value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} />
        <button type="submit" disabled={status?.type === 'loading'}>{status?.type === 'loading' ? 'Confirmation…' : 'Confirmer le rendez-vous'}</button>
      </form>}
      {status?.type === 'error' && <p className="cal-custom-error">{status.message}</p>}
    </div>
  );
}
