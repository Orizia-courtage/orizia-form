'use client';

import { useState } from 'react';

const EMPTY = {
  parrainNom: '', parrainPrenom: '', parrainTel: '', parrainEmail: '',
  filleulNom: '', filleulPrenom: '', filleulTel: '', filleulEmail: '', projetFilleul: '',
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[0-9\s+.\-]{10,20}$/;

function validateStep1(d) {
  const e = {};
  if (!d.parrainNom.trim())    e.parrainNom    = 'Ce champ est obligatoire';
  if (!d.parrainPrenom.trim()) e.parrainPrenom = 'Ce champ est obligatoire';
  if (!d.parrainTel.trim())    e.parrainTel    = 'Ce champ est obligatoire';
  else if (!phoneRe.test(d.parrainTel)) e.parrainTel = 'Numéro invalide';
  if (!d.parrainEmail.trim())  e.parrainEmail  = 'Ce champ est obligatoire';
  else if (!emailRe.test(d.parrainEmail)) e.parrainEmail = 'Adresse e-mail invalide';
  return e;
}

function validateStep2(d) {
  const e = {};
  if (!d.filleulNom.trim())    e.filleulNom    = 'Ce champ est obligatoire';
  if (!d.filleulPrenom.trim()) e.filleulPrenom = 'Ce champ est obligatoire';
  if (!d.filleulTel.trim())    e.filleulTel    = 'Ce champ est obligatoire';
  else if (!phoneRe.test(d.filleulTel)) e.filleulTel = 'Numéro invalide';
  if (!d.filleulEmail.trim())  e.filleulEmail  = 'Ce champ est obligatoire';
  else if (!emailRe.test(d.filleulEmail)) e.filleulEmail = 'Adresse e-mail invalide';
  return e;
}

function Field({ label, name, type = 'text', data, errors, onChange, inputMode }) {
  return (
    <div className="parr-field">
      <label className="parr-label">{label}</label>
      <input
        type={type}
        name={name}
        value={data[name]}
        onChange={e => onChange(name, e.target.value)}
        inputMode={inputMode}
        className={`parr-input${errors[name] ? ' parr-input--error' : ''}`}
        autoComplete="off"
      />
      {errors[name] && <span className="parr-error">{errors[name]}</span>}
    </div>
  );
}

export default function ParrainageForm() {
  const [step, setStep]           = useState(1);
  const [data, setData]           = useState(EMPTY);
  const [errors, setErrors]       = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const change = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => { const e = { ...prev }; delete e[name]; return e; });
  };

  const goNext = () => {
    const errs = validateStep1(data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep(2);
  };

  const goBack = () => { setErrors({}); setStep(1); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateStep2(data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setIsSubmitting(true);
    setServerError('');
    try {
      const res = await fetch('/api/parrainage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setIsSuccess(true);
      } else if (res.status === 429) {
        setServerError("Trop de tentatives. Veuillez patienter quelques minutes.");
      } else {
        setServerError("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch {
      setServerError("Erreur de connexion au serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Succès ── */
  if (isSuccess) {
    return (
      <div className="parr-success">
        <div className="parr-success-icon">🎉</div>
        <h3>Merci pour votre recommandation !</h3>
        <p>Votre demande a bien été envoyée. Je prendrai contact avec votre filleul très prochainement.</p>
        <button onClick={() => { setIsSuccess(false); setData(EMPTY); setStep(1); }} className="parr-btn-primary">
          Faire un nouveau parrainage
        </button>
      </div>
    );
  }

  return (
    <div className="parr-wrap">

      {/* ── Stepper ── */}
      <div className="parr-stepper">
        <div className="parr-step-item">
          <div className={`parr-step-dot${step >= 1 ? ' parr-step-dot--active' : ''}`}>
            {step > 1 ? '✓' : '1'}
          </div>
          <span className={`parr-step-label${step === 1 ? ' parr-step-label--active' : ''}`}>
            Informations du parrain
          </span>
        </div>
        <div className="parr-step-line" />
        <div className="parr-step-item">
          <div className={`parr-step-dot${step >= 2 ? ' parr-step-dot--active' : ''}`}>2</div>
          <span className={`parr-step-label${step === 2 ? ' parr-step-label--active' : ''}`}>
            Informations du filleul
          </span>
        </div>
      </div>

      {/* ── Étape 1 : Parrain ── */}
      {step === 1 && (
        <div className="parr-step-content">
          <div className="parr-step-header">
            <div className="parr-step-icon">👤</div>
            <div>
              <h3 className="parr-step-title">Informations du parrain</h3>
              <p className="parr-step-sub">Vos coordonnées pour que je puisse vous contacter</p>
            </div>
          </div>

          <div className="parr-fields">
            <div className="parr-fields-row">
              <Field label="Votre nom *"    name="parrainNom"    data={data} errors={errors} onChange={change} />
              <Field label="Votre prénom *" name="parrainPrenom" data={data} errors={errors} onChange={change} />
            </div>
            <Field label="Votre téléphone *" name="parrainTel"   type="tel"   data={data} errors={errors} onChange={change} inputMode="numeric" />
            <Field label="Votre e-mail *"    name="parrainEmail" type="email" data={data} errors={errors} onChange={change} />
          </div>

          <div className="parr-actions">
            <button type="button" className="parr-btn-primary" onClick={goNext}>
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* ── Étape 2 : Filleul ── */}
      {step === 2 && (
        <form onSubmit={handleSubmit} noValidate>
          <div className="parr-step-content">
            <div className="parr-step-header">
              <div className="parr-step-icon">🤝</div>
              <div>
                <h3 className="parr-step-title">Informations du filleul</h3>
                <p className="parr-step-sub">Les coordonnées de la personne que vous recommandez</p>
              </div>
            </div>

            <div className="parr-fields">
              <div className="parr-fields-row">
                <Field label="Son nom *"    name="filleulNom"    data={data} errors={errors} onChange={change} />
                <Field label="Son prénom *" name="filleulPrenom" data={data} errors={errors} onChange={change} />
              </div>
              <Field label="Son téléphone *" name="filleulTel"   type="tel"   data={data} errors={errors} onChange={change} inputMode="numeric" />
              <Field label="Son e-mail *"    name="filleulEmail" type="email" data={data} errors={errors} onChange={change} />

              <div className="parr-field">
                <label className="parr-label">Son projet (facultatif)</label>
                <select
                  name="projetFilleul"
                  value={data.projetFilleul}
                  onChange={e => change('projetFilleul', e.target.value)}
                  className="parr-input"
                >
                  <option value="">Sélectionnez un projet...</option>
                  <option value="Investir (SCPI, PER, Assurance Vie...)">Investir (SCPI, PER, Assurance Vie...)</option>
                  <option value="Financer (Crédit, Regroupement...)">Financer (Crédit, Regroupement...)</option>
                  <option value="Assurer (Emprunteur, Auto, Habitation...)">Assurer (Emprunteur, Auto, Habitation...)</option>
                </select>
              </div>
            </div>

            {serverError && (
              <div className="parr-server-error">🚫 {serverError}</div>
            )}

            <div className="parr-actions parr-actions--two">
              <button type="button" className="parr-btn-secondary" onClick={goBack}>
                ← Retour
              </button>
              <button type="submit" className="parr-btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi en cours…' : 'Envoyer la recommandation'}
              </button>
            </div>

            <p className="parr-legal">
              * Veillez à recueillir l'accord préalable de votre filleul avant transmission de ses coordonnées.
              Notre politique de protection des données lui sera présentée lors de l'entrée en relation.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
