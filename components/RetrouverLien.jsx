'use client';

import { useCallback, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { Turnstile } from '@/components/ParrainageForm';

const ACTION = 'orizia_lien';

// « J'ai perdu mon lien » : e-mail + téléphone de la fiche client → la carte est renvoyée par e-mail.
export default function RetrouverLien() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [website, setWebsite] = useState('');
  const [token, setToken] = useState('');
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');
  const onToken = useCallback((t) => setToken(t), []);
  const sentTo = useRef('');

  async function submit(event) {
    event.preventDefault();
    setError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Adresse e-mail invalide.'); return; }
    if (telephone.replace(/\D/g, '').length < 9) { setError('Numéro de téléphone invalide.'); return; }
    if (!token) { setError('Veuillez valider la vérification anti-robot.'); return; }
    setState('sending');
    try {
      const res = await fetch('/api/parrainage/retrouver', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim(), telephone, website, turnstileToken: token }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error || 'Envoi indisponible.'); setState('idle'); window.dispatchEvent(new CustomEvent('orizia-turnstile-reset', { detail: ACTION })); return; }
      sentTo.current = email.trim();
      setState('done');
    } catch { setError('Erreur de connexion.'); setState('idle'); }
  }

  if (!open) return <button type="button" className="parr-link-btn" onClick={() => setOpen(true)}>Lien perdu ? Recevoir à nouveau ma carte</button>;

  if (state === 'done') return (
    <p className="parr-found" role="status"><Icon name="check" /> Si ces coordonnées correspondent à votre dossier, votre carte et votre lien viennent d&apos;être envoyés à <strong>{sentTo.current}</strong>. Pensez à regarder dans les indésirables.</p>
  );

  return (
    <form className="parr-find" onSubmit={submit} noValidate>
      <p className="parr-step-sub">Indiquez l&apos;e-mail et le téléphone donnés lors de votre dossier : je vous renvoie votre carte par e-mail.</p>
      <div className="parr-fields-row">
        <div className="parr-field"><label className="parr-label" htmlFor="lien-email">Votre e-mail</label><input id="lien-email" className="parr-input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div className="parr-field"><label className="parr-label" htmlFor="lien-tel">Votre téléphone</label><input id="lien-tel" className="parr-input" type="tel" inputMode="tel" autoComplete="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} /></div>
      </div>
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true"><label>Site web<input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label></div>
      <Turnstile onToken={onToken} action={ACTION} />
      {error && <div className="parr-server-error" role="alert"><Icon name="ban" /> {error}</div>}
      <div className="parr-actions"><button type="submit" className="parr-btn-primary" disabled={state === 'sending'}>{state === 'sending' ? 'Envoi…' : 'Recevoir ma carte'}</button></div>
      <p className="parr-legal">Vous avez un espace client ? Votre lien est aussi dans l&apos;onglet « Parrainer » de l&apos;<a href="https://espace.orizia-courtage.fr">espace client</a>.</p>
    </form>
  );
}
