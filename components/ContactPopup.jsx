'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import QRCode from 'qrcode';
import ContactCaptcha from './ContactCaptcha';
import RappelForm from './RappelForm';

import Icon from '@/components/Icon';
// Icônes SVG inline — remplace Font Awesome pour ne pas bloquer le rendu
const IconXmark = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconArrowRight = ({ className }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconLock = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 5V3.5a2 2 0 0 1 4 0V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ACTIONS = [
  {
    icon: 'calendar-days',
    label: 'Prendre rendez-vous',
    sub: 'Créneau en visio ou téléphone',
    type: 'calendar',
    color: '#1b1d1a',
  },
  {
    icon: 'headset',
    label: 'Être rappelé',
    sub: 'Laissez votre numéro, Cindy vous rappelle',
    type: 'rappel',
    color: '#3e7f68',
  },
  {
    icon: 'mail',
    label: "M'écrire un message",
    sub: 'Je vous réponds sous 24h',
    type: 'form',
    color: '#3e7f68',
  },
  {
    icon: 'message-circle',
    label: 'WhatsApp',
    sub: 'Réponse le jour même',
    href: 'https://wa.me/33777259706',
    type: 'external',
    color: '#25D366',
  },
  {
    icon: 'phone',
    label: 'Appeler',
    sub: 'Lun–Ven 9h–18h',
    href: 'tel:+33777259706',
    type: 'external',
    color: '#3e7f68',
    desktop: { value: '07 77 25 97 06', copyLabel: 'Copier le numéro', openLabel: "Ouvrir l’application d’appel", finalStep: 'Appelez en un geste', scanTitle: 'Appelez Cindy depuis votre téléphone' },
  },
  {
    icon: 'mail',
    label: 'Envoyer un e-mail',
    sub: 'Réponse sous 24h',
    href: 'mailto:cindy.urbansky@orizia-courtage.fr',
    type: 'external',
    color: '#3e7f68',
    desktop: { value: 'cindy.urbansky@orizia-courtage.fr', copyLabel: "Copier l’adresse e-mail", openLabel: "Ouvrir l’application e-mail", finalStep: 'Votre e-mail est prêt', scanTitle: 'Écrivez à Cindy depuis votre téléphone' },
  },
  {
    icon: 'message-circle',
    label: 'SMS',
    sub: 'Message rapide',
    href: 'sms:+33777259706',
    type: 'external',
    color: '#6bb69b',
    desktop: { value: '07 77 25 97 06', copyLabel: 'Copier le numéro', openLabel: "Ouvrir l’application de messages", finalStep: 'Votre SMS est prêt', scanTitle: 'Envoyez un SMS depuis votre téléphone' },
  },
];


// Confettis aux couleurs de la charte autour du QR code (formes simples, animées en CSS)
const C_SAGE = '#6bb69b', C_MINT = '#b3ddcb', C_INK = '#1b1d1a', C_DEEP = '#3e7f68';
const CONFETTI = [
  { x: 40, y: 40, dx: -14, dy: -10, rot: 40, shape: <rect x="-5" y="-2" width="10" height="4" rx="2" fill={C_SAGE} /> },
  { x: 92, y: 18, dx: -4, dy: -14, rot: -30, shape: <circle r="4" fill={C_MINT} /> },
  { x: 230, y: 20, dx: 6, dy: -14, rot: 60, shape: <path d="M-5 0h10M0 -5v10" stroke={C_DEEP} strokeWidth="2.2" strokeLinecap="round" /> },
  { x: 282, y: 46, dx: 14, dy: -8, rot: -50, shape: <rect x="-5" y="-2" width="10" height="4" rx="2" fill={C_INK} /> },
  { x: 300, y: 112, dx: 16, dy: 0, rot: 90, shape: <circle r="5" fill="none" stroke={C_SAGE} strokeWidth="2" /> },
  { x: 290, y: 190, dx: 14, dy: 10, rot: 30, shape: <path d="M-6 2q3-6 6 0t6 0" fill="none" stroke={C_DEEP} strokeWidth="2" strokeLinecap="round" /> },
  { x: 244, y: 238, dx: 8, dy: 14, rot: -40, shape: <circle r="3.5" fill={C_SAGE} /> },
  { x: 160, y: 250, dx: 0, dy: 14, rot: 20, shape: <rect x="-4" y="-4" width="8" height="8" rx="2" fill={C_MINT} /> },
  { x: 76, y: 238, dx: -8, dy: 14, rot: 70, shape: <path d="M-5 0h10M0 -5v10" stroke={C_SAGE} strokeWidth="2.2" strokeLinecap="round" /> },
  { x: 24, y: 184, dx: -16, dy: 8, rot: -20, shape: <rect x="-5" y="-2" width="10" height="4" rx="2" fill={C_DEEP} /> },
  { x: 16, y: 112, dx: -16, dy: 0, rot: 45, shape: <circle r="4.5" fill={C_MINT} /> },
  { x: 160, y: 8, dx: 0, dy: -14, rot: 0, shape: <path d="M0 -6l1.6 4.4L6 0l-4.4 1.6L0 6l-1.6-4.4L-6 0l4.4-1.6Z" fill={C_SAGE} /> },
  { x: 60, y: 140, dx: -10, dy: 4, rot: 0, shape: <path d="M0 -5l1.3 3.7L5 0l-3.7 1.3L0 5l-1.3-3.7L-5 0l3.7-1.3Z" fill={C_DEEP} /> },
  { x: 262, y: 150, dx: 10, dy: 4, rot: 0, shape: <circle r="2.5" fill={C_INK} /> },
];

const EMPTY_FORM = {
  prenom: '', nom: '', email: '', telephone: '',
  typedemande: '', urgence: '', commentaire: '',
};

const ERRORS_MSG = {
  prenom:      'Votre prénom nous permettra de personnaliser notre réponse',
  nom:         'Votre nom est nécessaire pour traiter votre demande.',
  email:       'Un email valide est indispensable pour vous répondre.',
  typedemande: 'Indiquez-nous votre besoin pour mieux vous orienter.',
  urgence:     'Votre délai nous aide à prioriser votre demande.',
};

const validate = (data) => {
  const e = {};
  if (!data.prenom.trim())     e.prenom      = ERRORS_MSG.prenom;
  if (!data.nom.trim())        e.nom         = ERRORS_MSG.nom;
  if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) e.email = ERRORS_MSG.email;
  if (!data.typedemande)       e.typedemande = ERRORS_MSG.typedemande;
  if (!data.urgence)           e.urgence     = ERRORS_MSG.urgence;
  return e;
};

const Field = ({ name, errors, children }) => (
  <div className="cp-field">
    {children}
    {errors[name] && (
      <span className="cp-field-error"><Icon name="triangle-alert" /> {errors[name]}</span>
    )}
  </div>
);

export default function ContactPopup({ label = "M'envoyer un message", className = 'fin-btn-secondary', icon = null }) {
  const [open, setOpen]           = useState(false);
  const [showCal, setShowCal]     = useState(false);
  const [showForm, setShowForm]   = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedDesktopAction, setSelectedDesktopAction] = useState(null);
  const [showRappel, setShowRappel] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');
  const [qrCode, setQrCode] = useState('');

  // Form state
  const [form, setForm]           = useState(EMPTY_FORM);
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [sent, setSent]           = useState(false);
  const [serverError, setServerError] = useState('');

  // Fermer à Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        if (showRappel) { setShowRappel(false); }
        else if (selectedDesktopAction) { setSelectedDesktopAction(null); }
        else if (showForm) { setShowForm(false); setOpen(true); }
        else { setOpen(false); setShowCal(false); }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [showForm, selectedDesktopAction, showRappel]);

  // Bloquer le défilement de la page derrière toute fenêtre de contact.
  useEffect(() => {
    document.body.style.overflow = (open || showCal || showForm) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open, showCal, showForm]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px) and (pointer: fine)');
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!selectedDesktopAction) { setQrCode(''); return; }
    QRCode.toDataURL(selectedDesktopAction.href, { width: 440, margin: 1, errorCorrectionLevel: 'H', color: { dark: '#1b1d1a', light: '#ffffff' } })
      .then(setQrCode)
      .catch(() => setQrCode(''));
  }, [selectedDesktopAction]);

  // Masquer les éléments flottants quand une modal est ouverte
  useEffect(() => {
    if (open || showCal || showForm) {
      document.body.classList.add('contact-popup-open');
    } else {
      document.body.classList.remove('contact-popup-open');
    }
    return () => { document.body.classList.remove('contact-popup-open'); };
  }, [open, showCal, showForm]);

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (submitted) setErrors(validate(updated));
  };

  const [turnstileToken, setTurnstileToken] = useState('');
  const submitLock = useRef(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitLock.current) return;
    if (!turnstileToken) { setServerError('Veuillez valider la verification anti-robot.'); return; }
    setSubmitted(true);
    setServerError('');
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    submitLock.current = true;
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...form, turnstileToken}),
      });
      if (!res.ok) window.dispatchEvent(new CustomEvent('orizia-turnstile-reset', {detail: 'orizia_contact'}));
      if (res.status === 429) {
        setServerError("Vous avez envoyé trop de messages. Veuillez patienter quelques minutes.");
      } else if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setServerError(data.error || "Une erreur inattendue est survenue lors de l'envoi.");
      } else {
        setSent(true);
        setForm(EMPTY_FORM);
        setErrors({});
        setSubmitted(false);
      }
    } catch (err) {
      window.dispatchEvent(new CustomEvent('orizia-turnstile-reset', {detail: 'orizia_contact'}));
      setServerError("Impossible de joindre le serveur. Vérifiez votre connexion internet.");
    } finally {
      submitLock.current = false;
      setLoading(false);
    }
  };

  const closeAll = () => { setOpen(false); setShowCal(false); setShowForm(false); setSelectedDesktopAction(null); setShowRappel(false); };
  const copyContact = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const input = document.createElement('textarea');
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    setCopyFeedback(key);
    window.setTimeout(() => setCopyFeedback(''), 1800);
  };
  // Rend les fenêtres directement sous <body>, hors de tout contexte d'empilement
  // créé par le hero de la page d'accueil ou par l'en-tête fixe.
  const portal = (content) => createPortal(content, document.body);

  return (
    <>
      <div className="cp-wrap">
        <button
          type="button"
          className={className}
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-haspopup="true"
        >
          {icon ? <Icon name={icon} className="cp-btn-icon" /> : null}
          <span className="cp-btn-label">{label}</span>
          <svg className="cp-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* -- MODAL LISTE DES ACTIONS -- */}
      {open && portal(
        <div className="cp-overlay" onClick={closeAll} role="dialog" aria-modal="true">
          <div className="cp-panel" role="menu" onClick={e => e.stopPropagation()}>

            <div className="cp-panel-header">
              <div className="cp-panel-header-left">
                <div className="cp-avatar"><img src="/images/photo-cindy.webp" alt="Cindy Urbansky" /></div>
                <div>
                  <strong>Cindy Urbansky</strong>
                  <span>Orizia Courtage – courtier indépendant</span>
                </div>
              </div>
              <button className="cp-close" onClick={closeAll} aria-label="Fermer">
                <IconXmark />
              </button>
            </div>

            {showRappel ? (
              <RappelForm onBack={() => setShowRappel(false)} />
            ) : selectedDesktopAction ? (
              <div className="cp-contact-detail" key={selectedDesktopAction.label}>
                <button className="cp-detail-back" type="button" onClick={() => setSelectedDesktopAction(null)}>
                  <IconArrowLeft /> Retour aux moyens de contact
                </button>
                <h2 className="cp-scan-title">{selectedDesktopAction.desktop.scanTitle || selectedDesktopAction.label}</h2>

                <div className="cp-scan-stage">
                  <svg className="cp-scan-confetti" viewBox="0 0 320 260" aria-hidden="true">
                    {CONFETTI.map((c, i) => (
                      <g key={i} className="cp-confetto" style={{ '--x': `${c.dx}px`, '--y': `${c.dy}px`, '--r': `${c.rot}deg`, '--d': `${i * 45}ms`, '--f': `${2.6 + (i % 5) * 0.5}s` }}>
                        <g transform={`translate(${c.x} ${c.y})`}>{c.shape}</g>
                      </g>
                    ))}
                  </svg>
                  <div className="cp-qr-frame">
                    <span className="cp-qr-corner cp-qr-corner--tl" /><span className="cp-qr-corner cp-qr-corner--tr" />
                    <span className="cp-qr-corner cp-qr-corner--bl" /><span className="cp-qr-corner cp-qr-corner--br" />
                    {qrCode
                      ? <img className="cp-qr-code" src={qrCode} alt={`QR code pour ${selectedDesktopAction.label.toLowerCase()}`} />
                      : <span className="cp-qr-code cp-qr-code--loading" />}
                    <span className="cp-qr-badge" style={{ color: selectedDesktopAction.color }}><Icon name={selectedDesktopAction.icon} /></span>
                    <span className="cp-qr-scanline" aria-hidden="true" />
                  </div>
                </div>

                <ol className="cp-scan-steps">
                  <li><span><Icon name="smartphone" /></span>Ouvrez l’appareil photo</li>
                  <li><span><Icon name="crosshair" /></span>Visez le code</li>
                  <li><span><Icon name={selectedDesktopAction.icon} /></span>{selectedDesktopAction.desktop.finalStep || 'C’est parti'}</li>
                </ol>

                <div className="cp-scan-alt">
                  <span>Ou depuis cet ordinateur :</span>
                  <button
                    type="button"
                    className={`cp-copy-chip${copyFeedback === selectedDesktopAction.label ? ' is-copied' : ''}`}
                    onClick={() => copyContact(selectedDesktopAction.desktop.value, selectedDesktopAction.label)}
                    aria-label={selectedDesktopAction.desktop.copyLabel}
                  >
                    <strong>{selectedDesktopAction.desktop.value}</strong>
                    <span className="cp-copy-chip-state">
                      {copyFeedback === selectedDesktopAction.label ? <><Icon name="check" /> Copié</> : <><Icon name="clipboard-list" /> Copier</>}
                    </span>
                  </button>
                  <a className="cp-scan-open" href={selectedDesktopAction.href}>{selectedDesktopAction.desktop.openLabel} <Icon name="arrow-right" className="oz-arrow" /></a>
                </div>
                {selectedDesktopAction.label === 'Appeler' && (
                  <button type="button" className="cp-scan-callback" onClick={() => { setSelectedDesktopAction(null); setShowRappel(true); }}>
                    <Icon name="headset" />
                    <span><strong>Pas disponible maintenant&nbsp;?</strong> Cindy vous rappelle</span>
                    <Icon name="arrow-right" className="oz-arrow" />
                  </button>
                )}
              </div>
            ) : <>
            <div className="cp-intro">
              <p>Comment souhaitez-vous me contacter ?</p>
            </div>

            <div className="cp-actions">
              {ACTIONS.map((a) => {
                if (a.type === 'calendar') {
                  return (
                    <button key={a.label} type="button" className="cp-action" role="menuitem"
                      onClick={() => { setOpen(false); setShowCal(true); }}>
                      <span className="cp-action-icon" style={{ background: a.color + '18', color: a.color }}><Icon name={a.icon} /></span>
                      <span className="cp-action-text"><strong>{a.label}</strong><span>{a.sub}</span></span>
                      <IconArrowRight className="cp-action-arrow" />
                    </button>
                  );
                }
                if (a.type === 'rappel') {
                  return (
                    <button key={a.label} type="button" className="cp-action cp-action--rappel" role="menuitem"
                      onClick={() => setShowRappel(true)}>
                      <span className="cp-action-icon" style={{ background: a.color + '18', color: a.color }}><Icon name={a.icon} /></span>
                      <span className="cp-action-text"><strong>{a.label}</strong><span>{a.sub}</span></span>
                      <IconArrowRight className="cp-action-arrow" />
                    </button>
                  );
                }
                if (a.type === 'form') {
                  return (
                    <button key={a.label} type="button" className="cp-action" role="menuitem"
                      onClick={() => { setOpen(false); setShowForm(true); }}>
                      <span className="cp-action-icon" style={{ background: a.color + '18', color: a.color }}><Icon name={a.icon} /></span>
                      <span className="cp-action-text"><strong>{a.label}</strong><span>{a.sub}</span></span>
                      <IconArrowRight className="cp-action-arrow" />
                    </button>
                  );
                }
                if (isDesktop && a.desktop) return <button key={a.label} type="button" className="cp-action" role="menuitem" onClick={() => setSelectedDesktopAction(a)}><span className="cp-action-icon" style={{ background: a.color + '18', color: a.color }}><Icon name={a.icon} /></span><span className="cp-action-text"><strong>{a.label}</strong><span>{a.desktop.value}</span></span><IconArrowRight className="cp-action-arrow" /></button>;
                return (
                  <a key={a.label} href={a.href} className="cp-action" role="menuitem"
                    target={a.href.startsWith('http') ? '_blank' : undefined}
                    rel={a.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={() => setOpen(false)}>
                    <span className="cp-action-icon" style={{ background: a.color + '18', color: a.color }}><Icon name={a.icon} /></span>
                    <span className="cp-action-text"><strong>{a.label}</strong><span>{a.sub}</span></span>
                    <IconArrowRight className="cp-action-arrow" />
                  </a>
                );
              })}
            </div>
            </>}

            <div className="cp-panel-footer">
              <IconLock />
              Vos données restent confidentielles
            </div>

          </div>
        </div>
      )}

      {/* -- MODAL FORMULAIRE -- */}
      {showForm && portal(
        <div className="cp-overlay" onClick={closeAll} role="dialog" aria-modal="true">
          <div className="cp-panel cp-panel--form" onClick={e => e.stopPropagation()}>

            <div className="cp-panel-header">
              <div className="cp-panel-header-left">
                <button className="cp-back" onClick={() => { setShowForm(false); setOpen(true); }} aria-label="Retour">
                  <IconArrowLeft />
                </button>
                <div>
                  <strong>M&apos;écrire un message</strong>
                  <span>Je vous réponds sous 24h</span>
                </div>
              </div>
              <button className="cp-close" onClick={closeAll} aria-label="Fermer">
                <IconXmark />
              </button>
            </div>

            <div className="cp-form-body">
              {sent ? (
                <div className="cp-success">
                  <div className="cp-success-icon"><Icon name="circle-check" /></div>
                  <strong>Message envoyé !</strong>
                  <p>Je vous réponds dans les plus brefs délais.</p>
                  <button className="cp-success-close" onClick={closeAll}>Fermer</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="cp-form" noValidate>

                  {serverError && (
                    <div className="cp-form-banner cp-form-banner--error">
                      <Icon name="circle-x" /> {serverError}
                    </div>
                  )}
                  {submitted && Object.keys(errors).length > 0 && (
                    <div className="cp-form-banner cp-form-banner--warn">
                      <Icon name="triangle-alert" /> Quelques informations manquent pour traiter votre demande.
                    </div>
                  )}

                  <div className="cp-form-row">
                    <Field name="prenom" errors={errors}>
                      <input placeholder="Prénom *" value={form.prenom}
                        onChange={e => handleChange('prenom', e.target.value)}
                        style={{ borderColor: errors.prenom ? '#b0473b' : undefined }} />
                    </Field>
                    <Field name="nom" errors={errors}>
                      <input placeholder="Nom *" value={form.nom}
                        onChange={e => handleChange('nom', e.target.value)}
                        style={{ borderColor: errors.nom ? '#b0473b' : undefined }} />
                    </Field>
                  </div>

                  <Field name="email" errors={errors}>
                    <input type="email" placeholder="Email *" value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                      style={{ borderColor: errors.email ? '#b0473b' : undefined }} />
                  </Field>

                  <input placeholder="Téléphone" value={form.telephone}
                    onChange={e => handleChange('telephone', e.target.value)} />

                  <Field name="typedemande" errors={errors}>
                    <select value={form.typedemande}
                      onChange={e => handleChange('typedemande', e.target.value)}
                      style={{ borderColor: errors.typedemande ? '#b0473b' : undefined }}>
                      <option value="">Type de demande *</option>
                      <option>Crédit immobilier</option>
                      <option>Investissement</option>
                      <option>Assurance</option>
                      <option>Regroupement de crédits</option>
                      <option>Autre</option>
                    </select>
                  </Field>

                  <Field name="urgence" errors={errors}>
                    <select value={form.urgence}
                      onChange={e => handleChange('urgence', e.target.value)}
                      style={{ borderColor: errors.urgence ? '#b0473b' : undefined }}>
                      <option value="">Urgence *</option>
                      <option>Faible – dans le mois</option>
                      <option>Modérée – dans la semaine</option>
                      <option>Urgente – aujourd&apos;hui</option>
                    </select>
                  </Field>

                  <textarea placeholder="Commentaire..." rows={3}
                    value={form.commentaire}
                    onChange={e => handleChange('commentaire', e.target.value)} />

                  <ContactCaptcha onToken={setTurnstileToken}/>
                  <button type="submit" className="cp-form-submit" disabled={loading || !turnstileToken}>
                    {loading ? 'Envoi en cours…' : 'Envoyer le message'}
                  </button>

                </form>
              )}
            </div>

            <div className="cp-panel-footer">
              <IconLock />
              Vos données restent confidentielles
            </div>

          </div>
        </div>
      )}

      {/* -- MODAL CALENDRIER -- */}
      {showCal && portal(
        <div className="cp-modal-overlay" onClick={() => setShowCal(false)}>
          <div className="cp-modal" onClick={e => e.stopPropagation()}>
            <div className="cp-modal-header">
              <button
                className="cp-back"
                onClick={() => { setShowCal(false); setOpen(true); }}
                aria-label="Retour"
              >
                <IconArrowLeft />
              </button>
              <div className="cp-modal-title">
                <span><Icon name="calendar-days" /></span>
                <div>
                  <strong>Prendre rendez-vous</strong>
                  <span>Choisissez un créneau dans mon agenda</span>
                </div>
              </div>
              <button className="cp-modal-close" onClick={() => setShowCal(false)} aria-label="Fermer">
                <IconXmark />
              </button>
            </div>
            <div className="cp-modal-body">
              <iframe
                src="https://cal.com/cindy-urbansky/rendez-vous?embed=true"
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                title="Réserver un rendez-vous avec Cindy Urbansky – Orizia Courtage"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
