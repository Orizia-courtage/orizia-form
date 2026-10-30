'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { mountTurnstile } from '@/lib/turnstile-lifecycle.mjs';

// Formulaire du proche recommandé (page /r/CODE) : le parrain est désigné par son code.
const TURNSTILE_KEY = '0x4AAAAAACu8a5g2pFEtNqxD';
const TURNSTILE_ACTION = 'orizia_parrainage';
const PROJETS = [['Financer', 'Financer un projet'], ['Assurer', "M'assurer"], ['Investir', 'Placer mon épargne'], ['', 'Je ne sais pas encore']];
const phoneRe = /^(?:(?:\+|00)33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    const cleanup = mountTurnstile(element.current, TURNSTILE_ACTION, TURNSTILE_KEY, onToken, setError);
    return () => { cleanup(); onToken(''); };
  }, [onToken]);
  return <div><div ref={element} />{error && <span className="reco-error" role="alert">{error}</span>}</div>;
}

export default function RecommendationForm({ code, parrainPrenom }) {
  const [data, setData] = useState({ filleulPrenom: '', filleulNom: '', filleulTel: '', filleulEmail: '', projetFilleul: '' });
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState('');
  const [website, setWebsite] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | done
  const [serverError, setServerError] = useState('');
  const openedAt = useRef(0);
  useEffect(() => { openedAt.current = Date.now(); }, []);
  const onToken = useCallback((t) => setToken(t), []);
  const set = (name) => (e) => { setData((d) => ({ ...d, [name]: e.target.value })); setErrors((er) => ({ ...er, [name]: undefined })); };

  async function submit(event) {
    event.preventDefault();
    const e = {};
    if (!data.filleulPrenom.trim()) e.filleulPrenom = 'Indiquez votre prénom';
    if (!data.filleulNom.trim()) e.filleulNom = 'Indiquez votre nom';
    if (!phoneRe.test(data.filleulTel.trim())) e.filleulTel = 'Numéro de téléphone invalide';
    if (!emailRe.test(data.filleulEmail.trim())) e.filleulEmail = 'Adresse e-mail invalide';
    setErrors(e);
    if (Object.keys(e).length) return;
    if (!token) { setServerError('Vérification anti-robot en cours… réessayez dans un instant.'); return; }
    setState('sending'); setServerError('');
    try {
      const res = await fetch('/api/parrainage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, parrainCode: code, website, elapsed: Date.now() - openedAt.current, turnstileToken: token }),
      });
      const payload = await res.json().catch(() => ({}));
      if (res.ok) { setState('done'); return; }
      window.dispatchEvent(new CustomEvent('orizia-turnstile-reset', { detail: TURNSTILE_ACTION }));
      setServerError(res.status === 429 ? 'Trop de tentatives. Patientez quelques minutes.' : (payload.error || 'Une erreur est survenue. Réessayez.'));
    } catch {
      setServerError('Connexion impossible. Vérifiez votre réseau.');
    }
    setState('idle');
  }

  if (state === 'done') {
    return (
      <div className="reco-success" role="status">
        <Icon name="party-popper" />
        <h3>Merci {data.filleulPrenom} !</h3>
        <p>Je vous rappelle sous 24 h au {data.filleulTel}. Un e-mail de confirmation vient de vous être envoyé. {parrainPrenom} sera prévenu(e) de votre démarche.</p>
      </div>
    );
  }

  const field = (name, label, props = {}) => (
    <div className="reco-field">
      <label htmlFor={`reco-${name}`}>{label}</label>
      <input id={`reco-${name}`} value={data[name]} onChange={set(name)} aria-invalid={errors[name] ? 'true' : undefined} {...props} />
      {errors[name] && <span className="reco-error">{errors[name]}</span>}
    </div>
  );

  return (
    <form className="reco-form" onSubmit={submit} noValidate>
      <div className="reco-row">
        {field('filleulPrenom', 'Prénom', { autoComplete: 'given-name' })}
        {field('filleulNom', 'Nom', { autoComplete: 'family-name' })}
      </div>
      {field('filleulTel', 'Téléphone', { type: 'tel', inputMode: 'tel', autoComplete: 'tel' })}
      {field('filleulEmail', 'E-mail', { type: 'email', inputMode: 'email', autoComplete: 'email' })}
      <div>
        <span className="reco-legend">Votre projet</span>
        <div className="reco-chips">
          {PROJETS.map(([value, label]) => (
            <button key={label} type="button" aria-pressed={data.projetFilleul === value} onClick={() => setData((d) => ({ ...d, projetFilleul: value }))}>{label}</button>
          ))}
        </div>
      </div>
      <div className="reco-hp" aria-hidden="true"><label>Site web<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label></div>
      <Turnstile onToken={onToken} />
      {serverError && <p className="reco-alert" role="alert">{serverError}</p>}
      <button className="reco-btn reco-btn--primary" disabled={state === 'sending'}>{state === 'sending' ? 'Envoi…' : 'Être rappelé(e) sous 24 h'}</button>
      <p className="reco-consent">Vos coordonnées servent uniquement à vous recontacter au sujet de votre projet. Elles sont transmises à Orizia Courtage et ne sont jamais revendues. Voir la <a href="/confidentialite">politique de confidentialité</a>.</p>
    </form>
  );
}
