'use client';
import { useState, useEffect } from 'react';

const TABS = [
  { id: 'rdv', icon: '📅', label: 'RDV' },
  { id: 'message', icon: '💬', label: 'Message' },
  { id: 'formulaire', icon: '✉️', label: 'Écrire' },
  { id: 'appel', icon: '📞', label: 'Appeler' },
];

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('rdv');
  const [isMobile, setIsMobile] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', telephone: '',
    typedemande: '', urgence: '', commentaire: ''
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
    } catch (err) { console.error(err); }
    setLoading(false);
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
                  <a href="sms:+33777259706" className="cw-btn-action">
                    Envoyer un SMS
                  </a>
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
                  <form onSubmit={handleSubmit} className="cw-form">
                    <div className="cw-form-row">
                      <input placeholder="Prénom *" required value={form.prenom} onChange={e => setForm({...form, prenom: e.target.value})} />
                      <input placeholder="Nom *" required value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} />
                    </div>
                    <input type="email" placeholder="Email *" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    <input placeholder="Téléphone" value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} />
                    <select required value={form.typedemande} onChange={e => setForm({...form, typedemande: e.target.value})}>
                      <option value="">Type de demande *</option>
                      <option>Crédit immobilier</option>
                      <option>Investissement</option>
                      <option>Assurance</option>
                      <option>Regroupement de crédits</option>
                      <option>Autre</option>
                    </select>
                    <select required value={form.urgence} onChange={e => setForm({...form, urgence: e.target.value})}>
                      <option value="">Urgence *</option>
                      <option>Faible — dans le mois</option>
                      <option>Modérée — dans la semaine</option>
                      <option>Urgente — aujourd'hui</option>
                    </select>
                    <textarea placeholder="Commentaire..." rows={3} value={form.commentaire} onChange={e => setForm({...form, commentaire: e.target.value})} />
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
                <a href="tel:+33777259706" className="cw-btn-action cw-btn-call">
                  Appeler Cindy
                </a>
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