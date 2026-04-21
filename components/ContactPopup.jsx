'use client';

import { useState, useEffect } from 'react';

const ACTIONS = [
  {
    icon: '📅',
    label: 'Prendre rendez-vous',
    sub: 'Créneau en visio ou téléphone',
    type: 'calendar',
    color: 'var(--orizia-accent)',
  },
  {
    icon: '✍️',
    label: 'M\'écrire un message',
    sub: 'Je vous réponds sous 24h',
    type: 'form',
    color: 'var(--orizia-gold)',
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    sub: 'Réponse le jour même',
    href: 'https://wa.me/33777259706',
    type: 'external',
    color: '#25D366',
  },
  {
    icon: '📞',
    label: 'Appeler',
    sub: 'Lun–Ven 9h–18h',
    href: 'tel:+33777259706',
    type: 'external',
    color: 'var(--orizia-primary)',
  },
  {
    icon: '✉️',
    label: 'Envoyer un e-mail',
    sub: 'Réponse sous 24h',
    href: 'mailto:cindy.urbansky@orizia-courtage.fr',
    type: 'external',
    color: '#6366f1',
  },
  {
    icon: '💬',
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
  prenom:      'Votre prénom nous permettra de personnaliser notre réponse 🙂',
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
      <span className="cp-field-error">⚠️ {errors[name]}</span>
    )}
  </div>
);

export default function ContactPopup({ label = "✉️ M'envoyer un message", className = 'fin-btn-secondary' }) {
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

  // Fermer à Escape
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
      console.error(err);
      setServerError("Impossible de joindre le serveur. Vérifiez votre connexion internet.");
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
          <i className={`fa-solid fa-chevron-${open ? 'up' : 'down'} cp-chevron`}></i>
        </button>
      </div>

      {/* ── MODAL LISTE DES ACTIONS ── */}
      {open && (
        <div className="cp-overlay" onClick={closeAll} role="dialog" aria-modal="true">
          <div className="cp-panel" role="menu" onClick={e => e.stopPropagation()}>

            <div className="cp-panel-header">
              <div className="cp-panel-header-left">
                <div className="cp-avatar">C</div>
                <div>
                  <strong>Cindy Urbansky</strong>
                  <span>Orizia Courtage · Courtière indépendante</span>
                </div>
              </div>
              <button className="cp-close" onClick={closeAll} aria-label="Fermer">
                <i className="fa-solid fa-xmark"></i>
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
                      <i className="fa-solid fa-arrow-right cp-action-arrow"></i>
                    </button>
                  );
                }
                if (a.type === 'form') {
                  return (
                    <button key={a.label} type="button" className="cp-action" role="menuitem"
                      onClick={() => { setOpen(false); setShowForm(true); }}>
                      <span className="cp-action-icon" style={{ background: a.color + '18', color: a.color }}>{a.icon}</span>
                      <span className="cp-action-text"><strong>{a.label}</strong><span>{a.sub}</span></span>
                      <i className="fa-solid fa-arrow-right cp-action-arrow"></i>
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
                    <i className="fa-solid fa-arrow-right cp-action-arrow"></i>
                  </a>
                );
              })}
            </div>

            <div className="cp-panel-footer">
              <i className="fa-solid fa-lock"></i>
              Vos données restent confidentielles
            </div>

          </div>
        </div>
      )}

      {/* ── MODAL FORMULAIRE ── */}
      {showForm && (
        <div className="cp-overlay" onClick={closeAll} role="dialog" aria-modal="true">
          <div className="cp-panel cp-panel--form" onClick={e => e.stopPropagation()}>

            <div className="cp-panel-header">
              <div className="cp-panel-header-left">
                <button className="cp-back" onClick={() => { setShowForm(false); setOpen(true); }} aria-label="Retour">
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div>
                  <strong>M'écrire un message</strong>
                  <span>Je vous réponds sous 24h</span>
                </div>
              </div>
              <button className="cp-close" onClick={closeAll} aria-label="Fermer">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="cp-form-body">
              {sent ? (
                <div className="cp-success">
                  <div className="cp-success-icon">✅</div>
                  <strong>Message envoyé !</strong>
                  <p>Je vous réponds dans les plus brefs délais.</p>
                  <button className="cp-success-close" onClick={closeAll}>Fermer</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="cp-form" noValidate>

                  {serverError && (
                    <div className="cp-form-banner cp-form-banner--error">
                      🚫 {serverError}
                    </div>
                  )}
                  {submitted && Object.keys(errors).length > 0 && (
                    <div className="cp-form-banner cp-form-banner--warn">
                      💡 Quelques informations manquent pour traiter votre demande.
                    </div>
                  )}

                  <div className="cp-form-row">
                    <Field name="prenom" errors={errors}>
                      <input placeholder="Prénom *" value={form.prenom}
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

                  <input placeholder="Téléphone" value={form.telephone}
                    onChange={e => handleChange('telephone', e.target.value)} />

                  <Field name="typedemande" errors={errors}>
                    <select value={form.typedemande}
                      onChange={e => handleChange('typedemande', e.target.value)}
                      style={{ borderColor: errors.typedemande ? '#dc2626' : undefined }}>
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
                      style={{ borderColor: errors.urgence ? '#dc2626' : undefined }}>
                      <option value="">Urgence *</option>
                      <option>Faible — dans le mois</option>
                      <option>Modérée — dans la semaine</option>
                      <option>Urgente — aujourd'hui</option>
                    </select>
                  </Field>

                  <textarea placeholder="Commentaire..." rows={3}
                    value={form.commentaire}
                    onChange={e => handleChange('commentaire', e.target.value)} />

                  <button type="submit" className="cp-form-submit" disabled={loading}>
                    {loading ? 'Envoi en cours…' : 'Envoyer le message'}
                  </button>

                </form>
              )}
            </div>

            <div className="cp-panel-footer">
              <i className="fa-solid fa-lock"></i>
              Vos données restent confidentielles
            </div>

          </div>
        </div>
      )}

      {/* ── MODAL CALENDRIER ── */}
      {showCal && (
        <div className="cp-modal-overlay" onClick={() => setShowCal(false)}>
          <div className="cp-modal" onClick={e => e.stopPropagation()}>
            <div className="cp-modal-header">
              <button
                className="cp-back"
                onClick={() => { setShowCal(false); setOpen(true); }}
                aria-label="Retour"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <div className="cp-modal-title">
                <span>📅</span>
                <div>
                  <strong>Prendre rendez-vous</strong>
                  <span>Choisissez un créneau dans mon agenda</span>
                </div>
              </div>
              <button className="cp-modal-close" onClick={() => setShowCal(false)} aria-label="Fermer">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="cp-modal-body">
              <iframe
                src="https://cal.eu/cindy-urbansky/rendez-vous?embed=true"
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                title="Réserver un rendez-vous avec Cindy Urbansky — Orizia Courtage"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
