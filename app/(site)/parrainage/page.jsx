'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ParrainagePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const newErrors = {};

    // REGEX : Format e-mail classique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // REGEX : Accepte uniquement les chiffres (et optionnellement +, -, espaces ou points) mais AUCUNE lettre
    const phoneRegex = /^[0-9\s+.-]{10,20}$/;

    // ── VÉRIFICATION PARRAIN ──
    if (!data.parrainNom) newErrors.parrainNom = 'Ce champ est obligatoire';
    if (!data.parrainPrenom) newErrors.parrainPrenom = 'Ce champ est obligatoire';
    
    // Vérif Téléphone Parrain
    if (!data.parrainTel) {
      newErrors.parrainTel = 'Ce champ est obligatoire';
    } else if (!phoneRegex.test(data.parrainTel)) {
      newErrors.parrainTel = 'Numéro invalide (chiffres uniquement)';
    }

    // Vérif Email Parrain
    if (!data.parrainEmail) {
      newErrors.parrainEmail = 'Ce champ est obligatoire';
    } else if (!emailRegex.test(data.parrainEmail)) {
      newErrors.parrainEmail = 'Adresse e-mail invalide';
    }
    
    // ── VÉRIFICATION FILLEUL ──
    if (!data.filleulNom) newErrors.filleulNom = 'Ce champ est obligatoire';
    if (!data.filleulPrenom) newErrors.filleulPrenom = 'Ce champ est obligatoire';
    
    // Vérif Téléphone Filleul
    if (!data.filleulTel) {
      newErrors.filleulTel = 'Ce champ est obligatoire';
    } else if (!phoneRegex.test(data.filleulTel)) {
      newErrors.filleulTel = 'Numéro invalide (chiffres uniquement)';
    }

    // Vérif Email Filleul
    if (!data.filleulEmail) {
      newErrors.filleulEmail = 'Ce champ est obligatoire';
    } else if (!emailRegex.test(data.filleulEmail)) {
      newErrors.filleulEmail = 'Adresse e-mail invalide';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

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
        // Le code 429 correspond au blocage Vercel WAF
        alert("Vous avez envoyé trop de recommandations à la suite. Pour des raisons de sécurité, veuillez patienter quelques minutes avant d'en envoyer une nouvelle.");
      } else {
        alert("Une erreur s'est produite lors de l'envoi. Veuillez vérifier votre connexion ou réessayer plus tard.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion au serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="parrainage-page">

      {/* ── HERO ── */}
      <section className="parrainage-hero">
        <div className="parrainage-hero-inner">
          <span className="parrainage-badge">🎁 Programme de recommandation</span>
          <h1>
            Vous êtes satisfait de mon accompagnement ?<br />
            Parlez-en autour de vous.
          </h1>
          <p>
            Pour vous remercier de votre confiance, je vous offre, ainsi qu'à votre filleul, 
            des chèques cadeaux valables dans un large choix de boutiques pour chaque dossier finalisé.
          </p>
        </div>
      </section>

      {/* ── LES RÉCOMPENSES ── */}
      <section className="parrainage-rewards-section">
        <div className="parrainage-container">
          <div className="parrainage-header">
            <h2>Vos récompenses</h2>
            <p>Remises sous forme de chèques cadeaux à la finalisation du dossier de votre filleul.</p>
          </div>

          <div className="rewards-grid">
            <div className="reward-card card-financement">
              <div className="reward-icon">🏠</div>
              <h3>Financement</h3>
              <ul className="reward-list">
                <li>• Crédit immobilier</li>
                <li>• Regroupement de crédits</li>
                <li>• Prêt personnel</li>
              </ul>
              <div className="reward-badge badge-financement">Pour le parrain : 200 €</div>
            </div>

            <div className="reward-card card-assurance">
              <div className="reward-icon">📋</div>
              <h3>Assurance de prêt</h3>
              <ul className="reward-list">
                <li>• Délégation d'assurance emprunteur</li>
              </ul>
              <div className="reward-badge-group">
                <div className="reward-badge badge-assurance">Pour le parrain : 100 €</div>
                <div className="reward-badge badge-assurance light">Pour le filleul : 50 €</div>
              </div>
            </div>

            <div className="reward-card card-placement">
              <div className="reward-icon">🛡️</div>
              <h3>Placements & Autres</h3>
              <ul className="reward-list">
                <li>• SCPI / PER / Assurance Vie</li>
                <li>• Crowdfunding</li>
                <li>• Assurance Habitation / Auto</li>
              </ul>
              <div className="reward-badge-group">
                <div className="reward-badge badge-placement">Pour le parrain : 50 €</div>
                <div className="reward-badge badge-placement light">Pour le filleul : 20 €</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE DE PARRAINAGE ── */}
      <section className="parrainage-form-section">
        <div className="parrainage-form-container">
          
          <div className="parrainage-header">
            <h2>Recommander un proche</h2>
            <p className="form-subtitle">
              Son accord* est obligatoire, transmettez-nous les coordonnées d’une ou plusieurs personnes de votre entourage et nous nous chargeons du reste.
            </p>
          </div>

          {isSuccess ? (
            <div className="parrainage-success">
              <span className="success-icon">🎉</span>
              <h3>Merci pour votre recommandation !</h3>
              <p>Votre demande a bien été envoyée. Je prendrai contact avec votre filleul très prochainement.</p>
              <button onClick={() => setIsSuccess(false)} className="btn-success">
                Faire un nouveau parrainage
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="parrainage-form" noValidate>
              <div className="form-grid">
                
                {/* BLOC PARRAIN */}
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

                {/* BLOC FILLEUL */}
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
            </form>
          )}

          {/* ── MENTION LÉGALE ASTERISQUE ── */}
          <div className="legal-asterisk">
            <p>
              * Veillez à recueillir l’accord préalable de votre filleul avant transmission de ses coordonnées notamment dans le cadre d’un appel téléphonique. Notre politique de protection des données à caractère personnel lui sera présentée lors de l’entrée en relation. <Link href="/contact">Pour en savoir plus, contactez-nous</Link>.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}