'use client';

import { useState, useEffect } from 'react';

// Ic�nes SVG inline � remplace Font Awesome pour ne pas bloquer le rendu
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
    icon: '??',
    label: 'Prendre rendez-vous',
    sub: 'Cr�neau en visio ou t�l�phone',
    type: 'calendar',
    color: 'var(--orizia-accent)',
  },
  {
    icon: '??',
    label: 'M\'�crire un message',
    sub: 'Je vous r�ponds sous 24h',
    type: 'form',
    color: 'var(--orizia-gold)',
  },
  {
    icon: '??',
    label: 'WhatsApp',
    sub: 'R�ponse le jour m�me',
    href: 'https://wa.me/33777259706',
    type: 'external',
    color: '#25D366',
  },
  {
    icon: '??',
    label: 'Appeler',
    sub: 'Lun�Ven 9h�18h',
    href: 'tel:+33777259706',
    type: 'external',
    color: 'var(--orizia-primary)',
  },
  {
    icon: '??',
    label: 'Envoyer un e-mail',
    sub: 'R�ponse sous 24h',
    href: 'mailto:cindy.urbansky@orizia-courtage.fr',
    type: 'external',
    color: '#6366f1',
  },
  {
    icon: '??',
    label: 'SMS',
    sub: 'Message rapide',
    href: 'sms:+33777259706',
    type: 'external',
    color: '#0ea5e9',
  },
];

const EMPTY_FORM = {
  prenom: '', nom: '', email: '', telephone: '',
  typedemande: '', urgence: '', commentaire: '',
};

const ERRORS_MSG = {
  prenom:      'Votre pr�nom nous permettra de personnaliser notre r�ponse ??',
  nom:         'Votre nom est n�cessaire pour traiter votre demande.',
  email:       'Un email valide est indispensable pour vous r�pondre.',
  typedemande: 'Indiquez-nous votre besoin pour mieux vous orienter.',
  urgence:     'Votre d�lai nous aide � prioriser votre demande.',
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
      <span className="cp-field-error">?? {errors[name]}</span>
    )}
  </div>
);

export default function ContactPopup({ label = "?? M'envoyer un message", className = 'fin-btn-secondary' }) {
  const [open, setOpen]           = useState(false);
  const [showCal, setShowCal]     = useState(false);
  const [showForm, setShowForm]   = useState(false);

  // Form state
  const [form, setForm]           = useState(EMPTY_FORM);
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [sent, setSent]           = useState(false);
  const [serverError, setServerError] = useState('');

  // Fermer � Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        if (showForm) { setShowForm(false); setOpen(true); }
        else { setOpen(false); setShowCal(false); }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [showForm]);

  // Bloquer le scroll body quand la modal calendrier est ouverte
  useEffect(() => {
    document.body.style.overflow = showCal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showCal]);

  // Masquer les �l�ments flottants quand une modal est ouverte
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setServerError('');
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.status === 429) {
        setServerError("Vous avez envoy� trop de messages. Veuillez patienter quelques minutes.");
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
      console.error(err);
      setServerError("Impossible de joindre le serveur. V�rifiez votre connexion internet.");
    } finally {
      setLoading(false);
    }
  };

  const closeAll = () => { setOpen(false); setShowCal(false); setShowForm(false); };

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
          {label}
          <svg className="cp-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* -- MODAL LISTE DES ACTIONS -- */}
      {open && (
        <div className="cp-overlay" onClick={closeAll} role="dialog" aria-modal="true">
          <div className="cp-panel" role="menu" onClick={e => e.stopPropagation()}>

            <div className="cp-panel-header">
              <div className="cp-panel-header-left">
                <div className="cp-avatar">C</div>
                <div>
                  <strong>Cindy Urbansky</strong>
                  <span>Orizia Courtage � courtier ind�pendant</span>
                </div>
              </div>
              <button className="cp-close" onClick={closeAll} aria-label="Fermer">
                <IconXmark />
              </button>
            </div>

            <div className="cp-intro">
              <p>Comment souhaitez-vous me contacter ?</p>
            </div>

            <div className="cp-actions">
              {ACTIONS.map((a) => {
                if (a.type === 'calendar') {
                  return (
                    <button key={a.label} type="button" className="cp-action" role="menuitem"
                      onClick={() => { setOpen(false); setShowCal(true); }}>
                      <span className="cp-action-icon" style={{ background: a.color + '18', color: a.color }}>{a.icon}</span>
                      <span className="cp-action-text"><strong>{a.label}</strong><span>{a.sub}</span></span>
                      <IconArrowRight className="cp-action-arrow" />
                    </button>
                  );
                }
                if (a.type === 'form') {
                  return (
                    <button key={a.label} type="button" className="cp-action" role="menuitem"
                      onClick={() => { setOpen(false); setShowForm(true); }}>
                      <span className="cp-action-icon" style={{ background: a.color + '18', color: a.color }}>{a.icon}</span>
                      <span className="cp-action-text"><strong>{a.label}</strong><span>{a.sub}</span></span>
                      <IconArrowRight className="cp-action-arrow" />
                    </button>
                  );
                }
                return (
                  <a key={a.label} href={a.href} className="cp-action" role="menuitem"
                    target={a.href.startsWith('http') ? '_blank' : undefined}
                    rel={a.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={() => setOpen(false)}>
                    <span className="cp-action-icon" style={{ background: a.color + '18', color: a.color }}>{a.icon}</span>
                    <span className="cp-action-text"><strong>{a.label}</strong><span>{a.sub}</span></span>
                    <IconArrowRight className="cp-action-arrow" />
                  </a>
                );
              })}
            </div>

            <div className="cp-panel-footer">
              <IconLock />
              Vos donn�es restent confidentielles
            </div>

          </div>
        </div>
      )}

      {/* -- MODAL FORMULAIRE -- */}
      {showForm && (
        <div className="cp-overlay" onClick={closeAll} role="dialog" aria-modal="true">
          <div className="cp-panel cp-panel--form" onClick={e => e.stopPropagation()}>

            <div className="cp-panel-header">
              <div className="cp-panel-header-left">
                <button className="cp-back" onClick={() => { setShowForm(false); setOpen(true); }} aria-label="Retour">
                  <IconArrowLeft />
                </button>
                <div>
                  <strong>M'�crire un message</strong>
                  <span>Je vous r�ponds sous 24h</span>
                </div>
              </div>
              <button className="cp-close" onClick={closeAll} aria-label="Fermer">
                <IconXmark />
              </button>
            </div>

            <div className="cp-form-body">
              {sent ? (
                <div className="cp-success">
                  <div className="cp-success-icon">?</div>
                  <strong>Message envoy� !</strong>
                  <p>Je vous r�ponds dans les plus brefs d�lais.</p>
                  <button className="cp-success-close" onClick={closeAll}>Fermer</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="cp-form" noValidate>

                  {serverError && (
                    <div className="cp-form-banner cp-form-banner--error">
                      ?? {serverError}
                    </div>
                  )}
                  {submitted && Object.keys(errors).length > 0 && (
                    <div className="cp-form-banner cp-form-banner--warn">
                      ?? Quelques informations manquent pour traiter votre demande.
                    </div>
                  )}

                  <div className="cp-form-row">
                    <Field name="prenom" errors={errors}>
                      <input placeholder="Pr�nom *" value={form.prenom}
                        onChange={e => handleChange('prenom', e.target.value)}
                        style={{ borderColor: errors.prenom ? '#dc2626' : undefined }} />
                    </Field>
                    <Field name="nom" errors={errors}>
                      <input placeholder="Nom *" value={form.nom}
                        onChange={e => handleChange('nom', e.target.value)}
                        style={{ borderColor: errors.nom ? '#dc2626' : undefined }} />
                    </Field>
                  </div>

                  <Field name="email" errors={errors}>
                    <input type="email" placeholder="Email *" value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                      style={{ borderColor: errors.email ? '#dc2626' : undefined }} />
                  </Field>

                  <input placeholder="T�l�phone" value={form.telephone}
                    onChange={e => handleChange('telephone', e.target.value)} />

                  <Field name="typedemande" errors={errors}>
                    <select value={form.typedemande}
                      onChange={e => handleChange('typedemande', e.target.value)}
                      style={{ borderColor: errors.typedemande ? '#dc2626' : undefined }}>
                      <option value="">Type de demande *</option>
                      <option>Cr�dit immobilier</option>
                      <option>Investissement</option>
                      <option>Assurance</option>
                      <option>Regroupement de cr�dits</option>
                      <option>Autre</option>
                    </select>
                  </Field>

                  <Field name="urgence" errors={errors}>
                    <select value={form.urgence}
                      onChange={e => handleChange('urgence', e.target.value)}
                      style={{ borderColor: errors.urgence ? '#dc2626' : undefined }}>
                      <option value="">Urgence *</option>
                      <option>Faible � dans le mois</option>
                      <option>Mod�r�e � dans la semaine</option>
                      <option>Urgente � aujourd'hui</option>
                    </select>
                  </Field>

                  <textarea placeholder="Commentaire..." rows={3}
                    value={form.commentaire}
                    onChange={e => handleChange('commentaire', e.target.value)} />

                  <button type="submit" className="cp-form-submit" disabled={loading}>
                    {loading ? 'Envoi en cours�' : 'Envoyer le message'}
                  </button>

                </form>
              )}
            </div>

            <div className="cp-panel-footer">
              <IconLock />
              Vos donn�es restent confidentielles
            </div>

          </div>
        </div>
      )}

      {/* -- MODAL CALENDRIER -- */}
      {showCal && (
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
                <span>??</span>
                <div>
                  <strong>Prendre rendez-vous</strong>
                  <span>Choisissez un cr�neau dans mon agenda</span>
                </div>
              </div>
              <button className="cp-modal-close" onClick={() => setShowCal(false)} aria-label="Fermer">
                <IconXmark />
              </button>
            </div>
            <div className="cp-modal-body">
              <iframe
                src="https://cal.eu/cindy-urbansky/rendez-vous?embed=true"
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                title="R�server un rendez-vous avec Cindy Urbansky � Orizia Courtage"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
