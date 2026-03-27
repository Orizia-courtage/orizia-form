'use client';
import { useState, useEffect } from 'react';

const TABS = [
  { id: 'rdv',        icon: '📅', label: 'RDV' },
  { id: 'message',    icon: '💬', label: 'Message' },
  { id: 'formulaire', icon: '✉️', label: 'Écrire' },
  { id: 'appel',      icon: '📞', label: 'Appeler' },
];

const EMPTY_FORM = {
  prenom: '', nom: '', email: '', telephone: '',
  typedemande: '', urgence: '', commentaire: ''
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

// ← EN DEHORS du composant pour éviter le re-mount à chaque render
const Field = ({ name, errors, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    {children}
    {errors[name] && (
      <span style={{ fontSize: '0.73rem', color: '#dc2626', fontWeight: 500, paddingLeft: 2 }}>
        ⚠️ {errors[name]}
      </span>
    )}
  </div>
);

export default function ContactWidget() {
  const [open, setOpen]           = useState(false);
  const [tab, setTab]             = useState('rdv');
  const [isMobile, setIsMobile]   = useState(false);
  const [sent, setSent]           = useState(false);
  const [loading, setLoading]     = useState(false);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  // NOUVEAU : État pour stocker le message d'erreur renvoyé par le serveur ou Vercel
  const [serverError, setServerError] = useState(''); 

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (submitted) setErrors(validate(updated));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setServerError(''); // Réinitialiser l'erreur serveur au début d'une nouvelle tentative

    const errs = validate(form);
    if (Object.keys(errs).length > 0) { 
      setErrors(errs); 
      return; 
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      // 1. Interception de la limitation de débit (Rate Limit de Vercel)
      if (res.status === 429) {
        setServerError("Vous avez envoyé trop de messages. Veuillez patienter quelques minutes avant de réessayer.");
      } 
      // 2. Interception des autres erreurs serveur (ex: erreur 500 de Resend)
      else if (!res.ok) {
        // Tenter de lire le message d'erreur de votre API s'il y en a un
        const data = await res.json().catch(() => ({})); 
        setServerError(data.error || "Une erreur inattendue est survenue lors de l'envoi.");
      } 
      // 3. Succès (statut 200)
      else {
        setSent(true);
        setForm(EMPTY_FORM);
        setErrors({});
        setSubmitted(false);
      }
    } catch (err) { 
      console.error(err); 
      setServerError("Impossible de joindre le serveur. Vérifiez votre connexion internet.");
    } finally {
      // Le bloc finally s'exécute toujours, succès ou échec
      setLoading(false);
    }
  };

  return (
    <>
      {open && isMobile && <div className="cw-overlay" onClick={() => setOpen(false)} />}

      {open && (
        <div className={`cw-panel ${isMobile ? 'cw-panel-mobile' : 'cw-panel-desktop'}`}>

          {/* Header */}
          <div className="cw-header">
            <div className="cw-header-info">
              <div className="cw-avatar">C</div>
              <div>
                <strong>Cindy Urbansky</strong>
                <span>Orizia Courtage</span>
              </div>
            </div>
            <button className="cw-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Tabs */}
          <div className="cw-tabs">
            {TABS.map(t => (
              <button key={t.id} className={`cw-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Contenu */}
          <div className="cw-content">

            {tab === 'rdv' && (
              <iframe
                src="https://cal.eu/cindy-urbansky?embed=true"
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            )}

            {tab === 'message' && (
              <div className="cw-action-center">
                <div className="cw-action-icon">💬</div>
                <h3>Envoyez-moi un message</h3>
                <p>Je vous réponds dans les plus brefs délais.</p>
                {isMobile ? (
                  <a href="sms:+33777259706" className="cw-btn-action">Envoyer un SMS</a>
                ) : (
                  <a href="https://web.whatsapp.com/send?phone=33777259706" target="_blank" rel="noreferrer" className="cw-btn-action cw-btn-whatsapp">
                    Envoyer sur WhatsApp
                  </a>
                )}
              </div>
            )}

            {tab === 'formulaire' && (
              <div className="cw-form-wrap">
                {sent ? (
                  <div className="cw-success">
                    <span>✅</span>
                    <p>Message envoyé ! Je vous réponds rapidement.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="cw-form" noValidate>

                    {/* NOUVEAU : Bandeau d'erreur Serveur (ex: 429 Vercel ou 500 Resend) */}
                    {serverError && (
                      <div style={{
                        background: '#fef2f2', border: '1px solid #fecaca',
                        borderRadius: 8, padding: '10px 12px', marginBottom: '12px',
                        fontSize: '0.85rem', color: '#dc2626', fontWeight: 600,
                        lineHeight: 1.4
                      }}>
                        🚫 {serverError}
                      </div>
                    )}

                    {/* Bandeau erreur global validation */}
                    {submitted && Object.keys(errors).length > 0 && (
                      <div style={{
                        background: '#fef2f2', border: '1px solid #fecaca',
                        borderRadius: 8, padding: '10px 12px', marginBottom: '12px',
                        fontSize: '0.78rem', color: '#dc2626', fontWeight: 600,
                        lineHeight: 1.4
                      }}>
                        💡 Quelques informations manquent pour traiter votre demande.
                      </div>
                    )}

                    <div className="cw-form-row">
                      <Field name="prenom" errors={errors}>
                        <input
                          placeholder="Prénom *"
                          value={form.prenom}
                          onChange={e => handleChange('prenom', e.target.value)}
                          style={{ borderColor: errors.prenom ? '#dc2626' : undefined }}
                        />
                      </Field>
                      <Field name="nom" errors={errors}>
                        <input
                          placeholder="Nom *"
                          value={form.nom}
                          onChange={e => handleChange('nom', e.target.value)}
                          style={{ borderColor: errors.nom ? '#dc2626' : undefined }}
                        />
                      </Field>
                    </div>

                    <Field name="email" errors={errors}>
                      <input
                        type="email"
                        placeholder="Email *"
                        value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                        style={{ borderColor: errors.email ? '#dc2626' : undefined }}
                      />
                    </Field>

                    <input
                      placeholder="Téléphone"
                      value={form.telephone}
                      onChange={e => handleChange('telephone', e.target.value)}
                    />

                    <Field name="typedemande" errors={errors}>
                      <select
                        value={form.typedemande}
                        onChange={e => handleChange('typedemande', e.target.value)}
                        style={{ borderColor: errors.typedemande ? '#dc2626' : undefined }}
                      >
                        <option value="">Type de demande *</option>
                        <option>Crédit immobilier</option>
                        <option>Investissement</option>
                        <option>Assurance</option>
                        <option>Regroupement de crédits</option>
                        <option>Autre</option>
                      </select>
                    </Field>

                    <Field name="urgence" errors={errors}>
                      <select
                        value={form.urgence}
                        onChange={e => handleChange('urgence', e.target.value)}
                        style={{ borderColor: errors.urgence ? '#dc2626' : undefined }}
                      >
                        <option value="">Urgence *</option>
                        <option>Faible — dans le mois</option>
                        <option>Modérée — dans la semaine</option>
                        <option>Urgente — aujourd'hui</option>
                      </select>
                    </Field>

                    <textarea
                      placeholder="Commentaire..."
                      rows={3}
                      value={form.commentaire}
                      onChange={e => handleChange('commentaire', e.target.value)}
                    />

                    <button type="submit" disabled={loading}>
                      {loading ? 'Envoi...' : 'Envoyer le message'}
                    </button>

                  </form>
                )}
              </div>
            )}

            {tab === 'appel' && (
              <div className="cw-action-center">
                <div className="cw-action-icon">📞</div>
                <h3>Appelez-moi directement</h3>
                <p>Disponible du lundi au samedi.</p>
                <a href="tel:+33777259706" className="cw-btn-action cw-btn-call">Appeler Cindy</a>
                <span className="cw-tel-num">+33 7 77 25 97 06</span>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Bouton flottant — caché sur mobile quand ouvert */}
      {(!open || !isMobile) && (
        <button className={`cw-trigger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
          {open ? '✕' : '💬'}
        </button>
      )}
    </>
  );
}