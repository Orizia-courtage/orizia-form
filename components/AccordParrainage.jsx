'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

const CRENEAUX = ['Dès que possible', 'Le matin', 'Le midi', "L'après-midi", 'En soirée'];
const RDV = 'https://cal.com/cindy-urbansky/rendez-vous';

// Page ouverte depuis l'e-mail reçu par le proche recommandé : il confirme lui-même
// vouloir être rappelé (un clic volontaire : les antivirus qui ouvrent les liens ne valident rien).
export default function AccordParrainage({ id, token }) {
  const [creneau, setCreneau] = useState(CRENEAUX[0]);
  const [state, setState] = useState('idle'); // idle | sending | done
  const [error, setError] = useState('');
  const valid = /^[a-f0-9]{24}$/.test(id || '') && (token || '').length === 32;

  async function confirm() {
    setState('sending'); setError('');
    try {
      const res = await fetch('/api/parrainage/accord', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, t: token, creneau }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error || 'Envoi indisponible. Veuillez réessayer.'); setState('idle'); return; }
      setState('done');
    } catch { setError('Erreur de connexion. Veuillez réessayer.'); setState('idle'); }
  }

  if (!valid) return (
    <div className="parr-success">
      <h3>Ce lien est incomplet</h3>
      <p>Ouvrez à nouveau le lien depuis l&apos;e-mail reçu, ou contactez-moi directement au <a href="tel:+33777259706">07 77 25 97 06</a>.</p>
      <a className="parr-btn-primary" href={RDV} target="_blank" rel="noopener noreferrer">Prendre rendez-vous</a>
    </div>
  );

  if (state === 'done') return (
    <div className="parr-success">
      <div className="parr-success-icon"><Icon name="check" /></div>
      <h3>C&apos;est noté, merci !</h3>
      <p>Je vous appelle {creneau === 'Dès que possible' ? 'très vite' : creneau.toLowerCase()} depuis le <strong>07 77 25 97 06</strong>. Pensez à enregistrer mon numéro.</p>
      <p>Vous préférez fixer l&apos;heure vous-même ?</p>
      <a className="parr-btn-secondary" href={RDV} target="_blank" rel="noopener noreferrer">Choisir un créneau dans mon agenda</a>
    </div>
  );

  return (
    <div className="parr-accord">
      <p className="parr-step-sub">Quand préférez-vous être appelé(e) ?</p>
      <div className="parr-chips" role="radiogroup" aria-label="Moment préféré pour l'appel">
        {CRENEAUX.map((c) => (
          <button key={c} type="button" role="radio" aria-checked={creneau === c} className={`parr-chip${creneau === c ? ' is-on' : ''}`} onClick={() => setCreneau(c)}>{c}</button>
        ))}
      </div>
      {error && <div className="parr-server-error" role="alert"><Icon name="ban" /> {error}</div>}
      <div className="parr-actions">
        <button type="button" className="parr-btn-primary" onClick={confirm} disabled={state === 'sending'}>
          {state === 'sending' ? 'Envoi…' : 'Oui, je souhaite être rappelé(e)'}
        </button>
      </div>
      <p className="parr-legal">Ou <a href={RDV} target="_blank" rel="noopener noreferrer">réservez directement un rendez-vous</a>. Vous ne souhaitez pas être contacté(e) ? Ne faites rien : vos coordonnées seront effacées sous 30 jours.</p>
    </div>
  );
}
