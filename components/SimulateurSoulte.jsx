'use client';

import { useState, useMemo } from 'react';
import ContactPopup from '@/components/ContactPopup';

const QP_PRESETS = ['25', '33', '50', '67', '75'];

export default function SimulateurSoulte() {
  const [valeur, setValeur] = useState('');
  const [crd, setCrd] = useState('');
  const [quotePart, setQuotePart] = useState('50');
  const [customQP, setCustomQP] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const activeQP = showCustom ? customQP : quotePart;

  const handlePreset = (v) => {
    setQuotePart(v);
    setShowCustom(false);
    setCustomQP('');
  };

  const handleCustomToggle = () => {
    setShowCustom(true);
    setQuotePart('');
  };

  const handleCustomChange = (e) => {
    const raw = e.target.value.replace(',', '.');
    if (raw === '' || /^\d{0,2}(\.\d{0,2})?$/.test(raw)) {
      setCustomQP(raw);
    }
  };

  const fmt = (n) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(n);

  const result = useMemo(() => {
    const v = parseFloat(valeur.replace(/\s/g, '').replace(',', '.'));
    const c = parseFloat((crd || '0').replace(/\s/g, '').replace(',', '.'));
    const q = parseFloat(activeQP);
    if (!v || isNaN(v) || v <= 0) return null;
    const crdVal = isNaN(c) || c < 0 ? 0 : c;
    const valeurNette = v - crdVal;
    if (valeurNette <= 0) return { error: 'Le capital restant dû dépasse la valeur du bien.' };
    if (!q || isNaN(q) || q <= 0 || q >= 100) return null;
    const soulte = valeurNette * (q / 100);
    const droitsPartage = valeurNette * 0.025;
    return { valeurNette, soulte, droitsPartage, quotePart: q };
  }, [valeur, crd, activeQP]);

  return (
    <div className="ss-wrap">

      {/* ── FORMULAIRE ── */}
      <div className="ss-form">

        {/* Valeur du bien */}
        <div className="ss-field">
          <label className="ss-label" htmlFor="ss-valeur">
            <span className="ss-label-icon">🏠</span>
            Valeur estimée du bien
          </label>
          <div className="ss-input-wrap">
            <input
              id="ss-valeur"
              type="text"
              inputMode="decimal"
              placeholder="300 000"
              value={valeur}
              onChange={e => setValeur(e.target.value)}
              className="ss-input"
              autoComplete="off"
            />
            <span className="ss-unit">€</span>
          </div>
          <p className="ss-hint">Estimation agence ou notaire</p>
        </div>

        {/* Capital restant dû */}
        <div className="ss-field">
          <label className="ss-label" htmlFor="ss-crd">
            <span className="ss-label-icon">🏦</span>
            Capital restant dû
          </label>
          <div className="ss-input-wrap">
            <input
              id="ss-crd"
              type="text"
              inputMode="decimal"
              placeholder="100 000"
              value={crd}
              onChange={e => setCrd(e.target.value)}
              className="ss-input"
              autoComplete="off"
            />
            <span className="ss-unit">€</span>
          </div>
          <p className="ss-hint">Laissez vide si le bien est sans crédit</p>
        </div>

        {/* Quote-part */}
        <div className="ss-field ss-field--qp">
          <label className="ss-label">
            <span className="ss-label-icon">⚖️</span>
            Quote-part à racheter
          </label>
          <div className="ss-qp-grid">
            {QP_PRESETS.map(v => (
              <button
                key={v}
                type="button"
                onClick={() => handlePreset(v)}
                className={`ss-qp-btn${!showCustom && quotePart === v ? ' ss-qp-btn--active' : ''}`}
              >
                {v}%
              </button>
            ))}
            <button
              type="button"
              onClick={handleCustomToggle}
              className={`ss-qp-btn ss-qp-btn--autre${showCustom ? ' ss-qp-btn--active' : ''}`}
            >
              Autre
            </button>
          </div>
          {showCustom && (
            <div className="ss-custom-wrap">
              <div className="ss-input-wrap ss-input-wrap--sm">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="ex : 40"
                  value={customQP}
                  onChange={handleCustomChange}
                  className="ss-input ss-input--sm"
                  autoFocus
                  autoComplete="off"
                />
                <span className="ss-unit">%</span>
              </div>
              <p className="ss-hint">Entre 0,01 et 99,99%</p>
            </div>
          )}
          <p className="ss-hint">Part détenue par le co-propriétaire sortant</p>
        </div>
      </div>

      {/* ── RÉSULTAT ── */}
      {result && !result.error && (
        <div className="ss-result">
          <div className="ss-result-cards">

            <div className="ss-result-card">
              <div className="ss-result-card-icon">📐</div>
              <span className="ss-result-card-label">Valeur nette du bien</span>
              <span className="ss-result-card-value">{fmt(result.valeurNette)}</span>
              <span className="ss-result-card-sub">Valeur − Capital restant dû</span>
            </div>

            <div className="ss-result-card ss-result-card--main">
              <div className="ss-result-card-icon">💰</div>
              <span className="ss-result-card-label">Soulte à financer</span>
              <span className="ss-result-card-value ss-result-card-value--main">{fmt(result.soulte)}</span>
              <span className="ss-result-card-sub">{result.quotePart}% de la valeur nette</span>
            </div>

            <div className="ss-result-card">
              <div className="ss-result-card-icon">📋</div>
              <span className="ss-result-card-label">Droits de partage notaire</span>
              <span className="ss-result-card-value">{fmt(result.droitsPartage)}</span>
              <span className="ss-result-card-sub">2,5% de la valeur nette</span>
            </div>

          </div>

          <div className="ss-result-footer">
            <div className="ss-result-disclaimer">
              <span className="ss-result-disclaimer-icon">ℹ️</span>
              <p>Estimation indicative. Je vérifie la faisabilité complète de votre financement gratuitement et sans engagement.</p>
            </div>
            <ContactPopup label="📅 Étudier mon financement" className="fin-btn-primary ss-result-cta" />
          </div>
        </div>
      )}

      {result?.error && (
        <div className="ss-error">
          <span>⚠️</span>
          <p>{result.error}</p>
        </div>
      )}

      {!result && (
        <div className="ss-placeholder">
          <div className="ss-placeholder-inner">
            <span className="ss-placeholder-icon">🧮</span>
            <p>Renseignez la valeur du bien pour voir le calcul apparaître ici.</p>
          </div>
        </div>
      )}
    </div>
  );
}
