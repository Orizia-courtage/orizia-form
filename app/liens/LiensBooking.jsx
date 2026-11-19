'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { track } from '@vercel/analytics';
import Icon from '@/components/Icon';

// Réservation sans quitter la page (le navigateur d'Instagram gère mal les fenêtres Cal.com).
// S'appuie sur /api/cal/slots (disponibilités) et /api/cal/bookings (réservation).
const TZ = 'Europe/Paris';
const CAL_URL = 'https://cal.com/cindy-urbansky/rendez-vous';
const DAYS_AHEAD = 21;
const parisDay = (d = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(d);
const addDays = (key, n) => { const d = new Date(`${key}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const fmt = (opts) => new Intl.DateTimeFormat('fr-FR', { timeZone: TZ, ...opts });
const fWeekday = fmt({ weekday: 'short' });
const fDayNum = fmt({ day: 'numeric' });
const fMonth = fmt({ month: 'short' });
const fTime = fmt({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
const fLong = fmt({ weekday: 'long', day: 'numeric', month: 'long' });
const startOf = (v) => (typeof v === 'string' ? v : v?.start);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Garde les créneaux à venir, au format jour → [débuts].
function cleanSlots(data) {
  const now = new Date();
  const clean = {};
  for (const [k, list] of Object.entries(data || {})) {
    const starts = (list || []).map(startOf).filter((s) => s && new Date(s) > now);
    if (starts.length) clean[k] = starts;
  }
  return clean;
}
const firstDay = (slots) => Object.keys(slots).sort()[0] || null;

export default function LiensBooking({ initialSlots = null }) {
  // Créneaux livrés avec la page (si Cal.com a répondu au serveur), puis rafraîchis en arrière-plan.
  const [initial] = useState(() => (initialSlots ? cleanSlots(initialSlots) : null));
  const [state, setState] = useState(initial ? 'ready' : 'loading'); // loading | ready | error
  const [slots, setSlots] = useState(initial || {});
  const [day, setDay] = useState(() => (initial ? firstDay(initial) : null));
  const [chosen, setChosen] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const [booked, setBooked] = useState(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setState('loading');
    const start = parisDay();
    try {
      const res = await fetch(`/api/cal/slots?start=${start}&end=${addDays(start, DAYS_AHEAD)}`);
      if (!res.ok) throw new Error();
      const { slots: data = {} } = await res.json();
      const clean = cleanSlots(data);
      setSlots(clean);
      setDay((current) => (current && clean[current] ? current : firstDay(clean)));
      setState('ready');
    } catch {
      // Rafraîchissement impossible : on garde les créneaux livrés avec la page s'il y en a.
      if (!silent) setState('error');
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => load(Boolean(initial)), 0);
    return () => clearTimeout(id);
  }, [load, initial]);

  const days = useMemo(() => Object.keys(slots).sort(), [slots]);

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) return setFormError('Indiquez votre prénom et nom.');
    if (!EMAIL.test(form.email.trim())) return setFormError('Adresse e-mail invalide.');
    setFormError('');
    setSending(true);
    try {
      const res = await fetch('/api/cal/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start: chosen, ...form }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 409) {
          setFormError(payload.error || 'Ce créneau vient d’être pris. Choisissez-en un autre.');
          setChosen(null);
          load(true);
        } else {
          setFormError('blocked');
        }
        return;
      }
      track('liens_rdv_reserve');
      setBooked({ start: chosen, email: form.email.trim() });
    } catch {
      setFormError('blocked');
    } finally {
      setSending(false);
    }
  };

  if (booked) {
    return (
      <div className="lk-book lk-book--done" role="status">
        <span className="lk-book-check"><Icon name="circle-check" /></span>
        <strong>C’est réservé&nbsp;!</strong>
        <p>{fLong.format(new Date(booked.start))} à {fTime.format(new Date(booked.start))}.<br />La confirmation part à <b>{booked.email}</b>.</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="lk-book lk-book--fallback">
        <p>L’agenda ne s’affiche pas ici pour le moment.</p>
        <div className="lk-book-fallback-actions">
          <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="lk-btn" data-track="rdv-calcom"><Icon name="calendar-days" /> Ouvrir l’agenda</a>
          <a href="tel:+33777259706" className="lk-btn lk-btn--ghost" data-track="rdv-appel"><Icon name="phone" /> Appeler</a>
        </div>
      </div>
    );
  }

  if (state === 'loading') {
    return (
      <div className="lk-book" aria-busy="true" aria-label="Chargement des disponibilités">
        <div className="lk-days">{Array.from({ length: 5 }, (_, i) => <span key={i} className="lk-day lk-skel" />)}</div>
        <div className="lk-times">{Array.from({ length: 6 }, (_, i) => <span key={i} className="lk-time lk-skel" />)}</div>
      </div>
    );
  }

  if (!days.length) {
    return (
      <div className="lk-book lk-book--fallback">
        <p>Aucun créneau libre dans les 3 prochaines semaines en ligne — écrivez-moi, je vous trouve un moment.</p>
        <div className="lk-book-fallback-actions">
          <a href="https://wa.me/33777259706" target="_blank" rel="noopener noreferrer" className="lk-btn" data-track="rdv-whatsapp"><Icon name="message-circle" /> WhatsApp</a>
          <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="lk-btn lk-btn--ghost" data-track="rdv-calcom"><Icon name="calendar-days" /> Agenda complet</a>
        </div>
      </div>
    );
  }

  const today = parisDay();
  const tomorrow = addDays(today, 1);

  return (
    <div className="lk-book">
      <div className="lk-days" role="listbox" aria-label="Jour du rendez-vous">
        {days.map((k) => {
          const d = new Date(`${k}T12:00:00Z`);
          const label = k === today ? 'Auj.' : k === tomorrow ? 'Demain' : fWeekday.format(d);
          return (
            <button key={k} type="button" role="option" aria-selected={k === day}
              className={`lk-day${k === day ? ' is-on' : ''}`} onClick={() => { setDay(k); setChosen(null); }}>
              <span className="lk-day-wd">{label}</span>
              <span className="lk-day-num">{fDayNum.format(d)}</span>
              <span className="lk-day-mo">{fMonth.format(d)}</span>
            </button>
          );
        })}
      </div>

      <div className="lk-times" role="listbox" aria-label="Heure du rendez-vous">
        {(slots[day] || []).map((s) => (
          <button key={s} type="button" role="option" aria-selected={s === chosen}
            className={`lk-time${s === chosen ? ' is-on' : ''}`} onClick={() => { setChosen(s); setFormError(''); }}>
            {fTime.format(new Date(s))}
          </button>
        ))}
      </div>

      {chosen && (
        <form className="lk-form" onSubmit={submit} noValidate>
          <p className="lk-form-recap"><Icon name="clock" /> {fLong.format(new Date(chosen))} · {fTime.format(new Date(chosen))}</p>
          <input className="lk-input" type="text" name="name" autoComplete="name" placeholder="Prénom et nom" required
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="lk-input" type="email" name="email" autoComplete="email" inputMode="email" placeholder="E-mail (pour la confirmation)" required
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="lk-input" type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="Téléphone (facultatif)"
            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          {formError === 'blocked' ? (
            <p className="lk-form-error" role="alert">
              La réservation n’a pas pu partir d’ici.{' '}
              <a href={`${CAL_URL}?date=${parisDay(new Date(chosen))}`} target="_blank" rel="noopener noreferrer" data-track="rdv-calcom-secours">Finaliser ce créneau sur l’agenda</a>{' '}
              ou appelez le <a href="tel:+33777259706">07 77 25 97 06</a>.
            </p>
          ) : formError && <p className="lk-form-error" role="alert">{formError}</p>}
          <button className="lk-btn lk-btn--full" type="submit" disabled={sending} data-track="rdv-confirmer">
            {sending ? 'Réservation…' : <>Confirmer le rendez-vous <Icon name="arrow-right" /></>}
          </button>
          <p className="lk-form-note">Vos coordonnées servent uniquement à organiser ce rendez-vous. <a href="/confidentialite">Confidentialité</a></p>
        </form>
      )}
    </div>
  );
}
