// ── RENDU ─────────────────────────────────────────────────

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="orz">

      {/* ── DEV ONLY : à supprimer en prod ── */}
      {process.env.NODE_ENV !== 'production' && (
  <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 6, maxHeight: '90vh', overflowY: 'auto' }}>
    {[
      // RDV (profils éligibles)
      'Investisseur 1',
      'Client projet premium 1', 'Client projet premium 2',
      'Trésorerie 1', 'Trésorerie 2', 'Trésorerie 3', 'Trésorerie 4', 'Trésorerie 5', 'Trésorerie 6', 'Trésorerie 7',
      'Pro Contraint 1', 'Pro Contraint 2', 'Pro Contraint 3', 'Pro Contraint 4', 'Pro Contraint 5',
      // BDF
      'BDF',
      // TNS
      'TNS 1', 'TNS 2', 'TNS 3',
      // LOC
      'LOC',
      // Autres (refus)
      'IR 1', 'IR 2',
      'Petit Pro 1', 'Petit Pro 2', 'Petit Pro 3', 'Petit Pro 4',
      'Client projet 1', 'Client projet 2', 'Client projet 3', 'Client projet 4', 'Client projet 5',
      'Pro Consommateur 1', 'Pro Consommateur 2', 'Pro Consommateur 3',
      'Autre',
    ].map(seg => (
      <button key={seg} onClick={() => { setSegment(seg); setDone(true); }}
        style={{ padding: '4px 10px', fontSize: '.75rem', background: '#0d2c54', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', textAlign: 'left' }}>
        {seg}
      </button>
    ))}
    <button onClick={() => { setDone(false); setSegment(''); }}
      style={{ padding: '4px 10px', fontSize: '.75rem', background: '#cf1322', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
      ↩ Reset
    </button>
  </div>
)}







      
      {!done && (
        <>
          {/* En-tête */}
          <div className="orz-header">
            <div className="orz-badge"><i className="fa-solid fa-shield-halved"></i> ORIZIA COURTAGE</div>
            <h1>Votre simulation de<br />regroupement de crédits</h1>
            <p>Gratuit · Sans engagement · Réponse sous 24h</p>
            <div className="orz-pills">
              <span className="orz-pill"><i className="fa-solid fa-lock"></i> Données sécurisées</span>
              <span className="orz-pill"><i className="fa-solid fa-check-circle"></i> Courtier certifié ORIAS</span>
              <span className="orz-pill"><i className="fa-solid fa-star"></i> Étude 100% gratuite</span>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="orz-prog">
            <div className="orz-prog-hd">
              <span className="orz-prog-lbl">Votre progression</span>
              <span className="orz-prog-cnt">Étape {step} sur {TOTAL_STEPS}</span>
            </div>
            <div className="orz-prog-bg">
              <div className="orz-prog-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Carte formulaire */}
          <div className="orz-card">
            <div className="orz-card-hd">
              <div className="orz-step-lbl">Étape {step} sur {TOTAL_STEPS}</div>
              <h2>{STEP_TITLES[step - 1]}</h2>
            </div>
            <div className="orz-card-bd">
              {step === 1  && <Step1  form={form} set={set} errors={errors} clearErr={clearErr} next={nextStep} />}
              {step === 2  && <Step2  form={form} set={set} errors={errors} clearErr={clearErr} next={nextStep} prev={prevStep} />}
              {step === 3  && <Step3  form={form} set={set} errors={errors} next={nextStep} prev={prevStep} />}
              {step === 4  && <Step4  form={form} set={set} errors={errors} clearErr={clearErr} next={nextStep} prev={prevStep} />}
              {step === 5  && <Step5  form={form} set={set} errors={errors} clearErr={clearErr} next={nextStep} prev={prevStep} />}
              {step === 6  && <Step6  form={form} set={set} errors={errors} clearErr={clearErr} next={nextStep} prev={prevStep} />}
              {step === 7  && <Step7  form={form} set={set} errors={errors} next={nextStep} prev={prevStep} />}
              {step === 8  && <Step8  form={form} set={set} errors={errors} next={nextStep} prev={prevStep} />}
              {step === 9  && <Step9  form={form} set={set} errors={errors} clearErr={clearErr} next={nextStep} prev={prevStep} />}
              {step === 10 && <Step10 form={form} set={set} errors={errors} clearErr={clearErr} next={nextStep} prev={prevStep} />}
              {step === 11 && <Step11 form={form} set={set} errors={errors} clearErr={clearErr} next={nextStep} prev={prevStep} />}
              {step === 12 && <Step12 form={form} set={set} errors={errors} clearErr={clearErr} next={nextStep} prev={prevStep}
                cityInput={cityInput} setCityInput={setCityInput} citySugg={citySugg} setCitySugg={setCitySugg} />}
              {step === 13 && <Step13 form={form} set={set} errors={errors} clearErr={clearErr}
                cityInput={cityInput} setCityInput={setCityInput} citySugg={citySugg} setCitySugg={setCitySugg}
                prev={prevStep} submit={submitForm} sending={sending} />}
            </div>
          </div>
        </>
      )}

      {done && (
        <SuccessScreen
          segment={segment}
          segType={getSegmentType(segment)}
          rappelSent={rappelSent}
          onRappel={demanderRappel}
          prenom={form.prenom}
        />
      )}
    </div>
  );
}