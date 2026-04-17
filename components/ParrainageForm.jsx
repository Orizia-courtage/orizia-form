'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ParrainageForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1 = parrain, 2 = filleul

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\s+.-]{10,20}$/;

    if (!data.parrainNom) newErrors.parrainNom = 'Ce champ est obligatoire';
    if (!data.parrainPrenom) newErrors.parrainPrenom = 'Ce champ est obligatoire';
    if (!data.parrainTel) newErrors.parrainTel = 'Ce champ est obligatoire';
    else if (!phoneRegex.test(data.parrainTel)) newErrors.parrainTel = 'Numéro invalide (chiffres uniquement)';
    if (!data.parrainEmail) newErrors.parrainEmail = 'Ce champ est obligatoire';
    else if (!emailRegex.test(data.parrainEmail)) newErrors.parrainEmail = 'Adresse e-mail invalide';
    if (!data.filleulNom) newErrors.filleulNom = 'Ce champ est obligatoire';
    if (!data.filleulPrenom) newErrors.filleulPrenom = 'Ce champ est obligatoire';
    if (!data.filleulTel) newErrors.filleulTel = 'Ce champ est obligatoire';
    else if (!phoneRegex.test(data.filleulTel)) newErrors.filleulTel = 'Numéro invalide (chiffres uniquement)';
    if (!data.filleulEmail) newErrors.filleulEmail = 'Ce champ est obligatoire';
    else if (!emailRegex.test(data.filleulEmail)) newErrors.filleulEmail = 'Adresse e-mail invalide';

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setErrors({});
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/parrainage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSuccess(true);
      } else if (response.status === 429) {
        alert("Vous avez envoyé trop de recommandations à la suite. Veuillez patienter quelques minutes.");
      } else {
        alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer plus tard.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion au serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="parrainage-success">
        <span className="success-icon">🎉</span>
        <h3>Merci pour votre recommandation !</h3>
        <p>Votre demande a bien été envoyée. Je prendrai contact avec votre filleul très prochainement.</p>
        <button onClick={() => setIsSuccess(false)} className="btn-success">
          Faire un nouveau parrainage
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="parrainage-form" noValidate>

      {/* ── Stepper ── */}
      <div className="parr-stepper">
        <div className="parr-stepper-header">
          <span className="parr-stepper-step">Étape {step} / 2</span>
          <span className="parr-stepper-label">{step === 1 ? 'Vos informations' : 'Informations de votre filleul'}</span>
        </div>
        <div className="parr-stepper-bar">
          <div className="parr-stepper-fill" style={{ width: step === 1 ? '50%' : '100%' }} />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-block">
          <h3 className="form-block-title parrain-title">INFORMATIONS DU PARRAIN</h3>
          <div className="form-fields">
            <div className="input-group">
              <label>Votre nom*</label>
              <input type="text" name="parrainNom" className={errors.parrainNom ? 'input-error' : ''} />
              {errors.parrainNom && <span className="error-text">{errors.parrainNom}</span>}
            </div>
            <div className="input-group">
              <label>Votre prénom*</label>
              <input type="text" name="parrainPrenom" className={errors.parrainPrenom ? 'input-error' : ''} />
              {errors.parrainPrenom && <span className="error-text">{errors.parrainPrenom}</span>}
            </div>
            <div className="input-group">
              <label>Votre téléphone*</label>
              <input type="tel" name="parrainTel" inputMode="numeric" className={errors.parrainTel ? 'input-error' : ''} />
              {errors.parrainTel && <span className="error-text">{errors.parrainTel}</span>}
            </div>
            <div className="input-group">
              <label>Votre e-mail*</label>
              <input type="email" name="parrainEmail" className={errors.parrainEmail ? 'input-error' : ''} />
              {errors.parrainEmail && <span className="error-text">{errors.parrainEmail}</span>}
            </div>
          </div>
        </div>

        <div className="form-block">
          <h3 className="form-block-title filleul-title">INFORMATIONS DU FILLEUL</h3>
          <div className="form-fields">
            <div className="input-group">
              <label>Son nom*</label>
              <input type="text" name="filleulNom" className={errors.filleulNom ? 'input-error' : ''} />
              {errors.filleulNom && <span className="error-text">{errors.filleulNom}</span>}
            </div>
            <div className="input-group">
              <label>Son prénom*</label>
              <input type="text" name="filleulPrenom" className={errors.filleulPrenom ? 'input-error' : ''} />
              {errors.filleulPrenom && <span className="error-text">{errors.filleulPrenom}</span>}
            </div>
            <div className="input-group">
              <label>Son téléphone*</label>
              <input type="tel" name="filleulTel" inputMode="numeric" className={errors.filleulTel ? 'input-error' : ''} />
              {errors.filleulTel && <span className="error-text">{errors.filleulTel}</span>}
            </div>
            <div className="input-group">
              <label>Son e-mail*</label>
              <input type="email" name="filleulEmail" className={errors.filleulEmail ? 'input-error' : ''} />
              {errors.filleulEmail && <span className="error-text">{errors.filleulEmail}</span>}
            </div>
            <div className="input-group">
              <label>Son projet (Facultatif)</label>
              <select name="projetFilleul">
                <option value="">Sélectionnez un projet...</option>
                <option value="Investir (SCPI, PER, Assurance Vie...)">Investir (SCPI, PER, Assurance Vie...)</option>
                <option value="Financer (Crédit, Regroupement...)">Financer (Crédit, Regroupement...)</option>
                <option value="Assurer (Emprunteur, Auto, Habitation...)">Assurer (Emprunteur, Auto, Habitation...)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="form-submit-wrapper">
        <button type="submit" disabled={isSubmitting} className="btn-submit">
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer la recommandation'}
        </button>
      </div>

      <div className="legal-asterisk">
        <p>
          * Veillez à recueillir l'accord préalable de votre filleul avant transmission de ses coordonnées notamment dans le cadre d'un appel téléphonique. Notre politique de protection des données à caractère personnel lui sera présentée lors de l'entrée en relation.{' '}
          <Link href="/contact">Pour en savoir plus, contactez-nous</Link>.
        </p>
      </div>
    </form>
  );
}
