'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { mountTurnstile } from '@/lib/turnstile-lifecycle.mjs';
import { CRENEAUX, SUJETS } from '@/lib/rappel-options';

const TURNSTILE_KEY = '0x4AAAAAACu8a5g2pFEtNqxD';
const TURNSTILE_ACTION = 'orizia_rappel_express';


function Turnstile({ onToken }) {
  const element = useRef(null);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!document.getElementById('cf-ts')) {
      const script = document.createElement('script');
      script.id = 'cf-ts';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      document.head.appendChild(script);
    }
    // « interaction-only » : invisible tant que Cloudflare n'a pas de doute → pas de place perdue
    const cleanup = mountTurnstile(element.current, TURNSTILE_ACTION, TURNSTILE_KEY, onToken, setError, window, { appearance: 'interaction-only' });
    return () => { cleanup(); onToken(''); };
  }, [onToken]);
  return (
    <div className="rf-captcha">
      <div ref={element} />
      {error && <p className="rf-error" role="alert">{error}</p>}
    </div>
  );
}

/**
 * « Être rappelé » : prénom + téléphone + créneau → email à Cindy.
 * Anti-spam : Cloudflare Turnstile, champ piège invisible, délai minimal de saisie,
 * validation stricte et limitation du nombre de demandes côté serveur.
 */
export default function RappelForm({ onBack, onDone }) {
  const [form, setForm] = useState({ prenom: '', telephone: '', creneau: CRENEAUX[0], sujet: '', consent: false, website: '' });
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [error, setError] = useState('');
  const openedAt = useRef(0);
  const lock = useRef(false);

  useEffect(() => { openedAt.current = Date.now(); }, []);
  const onToken = useCallback(t => setToken(t), []);
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError(''); };

  const submit = async (e) => {
    e.preventDefault();
    if (lock.current) return;
    if (!form.prenom.trim()) return setError('Indiquez votre prénom.');
    if (form.telephone.replace(/\D/g, '').length < 9) return setError('Indiquez un numéro de téléphone valide.');
    if (!form.consent) return setError('Merci d’accepter d’être recontacté(e).');
    if (!token) return setError('Vérification anti-robot en cours… réessayez dans un instant.');
    lock.current = true;
    setStatus('sending');
    try {
      const res = await fetch('/api/rappel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          page: window.location.pathname,
          elapsed: Date.now() - openedAt.current,
          turnstileToken: token,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        window.dispatchEvent(new CustomEvent('orizia-turnstile-reset', { detail: TURNSTILE_ACTION }));
        throw new Error(data.error || 'Envoi impossible. Réessayez ou appelez directement le 07 77 25 97 06.');
      }
      setStatus('sent');
      onDone?.();
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    } finally {
      lock.current = false;
    }
  };

  if (status === 'sent') {
    return (
      <div className="rf rf--done">
        <div className="rf-done-badge"><Icon name="circle-check" /></div>
        <h2 className="rf-title">C’est noté, {form.prenom.trim().split(' ')[0]}&nbsp;!</h2>
        <p className="rf-lead">
          Cindy vous rappelle au <strong>{form.telephone}</strong>
          {form.creneau === CRENEAUX[0] ? ' dès que possible' : <>, créneau <strong>{form.creneau.toLowerCase()}</strong></>}
          , sous 24 h ouvrées.
        </p>
        {onBack && (
          <button type="button" className="rf-back-link" onClick={onBack}>
            <Icon name="arrow-left" /> Retour aux moyens de contact
          </button>
        )}
      </div>
    );
  }

  return (
    <form className="rf" onSubmit={submit} noValidate>
      {onBack && (
        <button type="button" className="cp-detail-back" onClick={onBack}>
          <Icon name="arrow-left" /> Retour aux moyens de contact
        </button>
      )}
      <h2 className="rf-title">Cindy vous rappelle</h2>
      <p className="rf-lead">Laissez votre numéro : vous êtes rappelé(e) sous 24 h ouvrées, sans engagement.</p>

      <div className="rf-row">
        <label className="rf-field">
          <span>Prénom</span>
          <input type="text" autoComplete="given-name" maxLength={60} value={form.prenom} onChange={e => set('prenom', e.target.value)} required />
        </label>
        <label className="rf-field">
          <span>Téléphone</span>
          <input type="tel" inputMode="tel" autoComplete="tel" maxLength={20} placeholder="06 12 34 56 78" value={form.telephone} onChange={e => set('telephone', e.target.value)} required />
        </label>
      </div>

      <fieldset className="rf-field rf-slots">
        <legend>Quand préférez-vous être appelé(e)&nbsp;?</legend>
        <div className="rf-chips">
          {CRENEAUX.map(c => (
            <button key={c} type="button" className={`rf-chip${form.creneau === c ? ' is-on' : ''}`} aria-pressed={form.creneau === c} onClick={() => set('creneau', c)}>{c}</button>
          ))}
        </div>
      </fieldset>

      <label className="rf-field">
        <span>Sujet <em>(facultatif)</em></span>
        <select value={form.sujet} onChange={e => set('sujet', e.target.value)}>
          <option value="">Choisir…</option>
          {SUJETS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>

      {/* Champ piège : invisible pour les humains, rempli par les robots */}
      <div className="rf-hp" aria-hidden="true">
        <label>Site web<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={e => set('website', e.target.value)} /></label>
      </div>

      <label className="rf-consent">
        <input type="checkbox" checked={form.consent} onChange={e => set('consent', e.target.checked)} />
        <span>J’accepte d’être recontacté(e) par téléphone par Orizia Courtage au sujet de ma demande.</span>
      </label>

      <Turnstile onToken={onToken} />

      {error && <p className="rf-error" role="alert"><Icon name="triangle-alert" /> {error}</p>}

      <button type="submit" className="fin-btn-primary rf-submit" disabled={status === 'sending'}>
        <Icon name="phone" />
        {status === 'sending' ? 'Envoi en cours…' : 'Être rappelé(e)'}
      </button>
    </form>
  );
}
