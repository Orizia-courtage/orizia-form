export default function FormStepper() {
  const steps = [
    { n: '1', label: 'Votre situation', desc: 'Revenus, crédits en cours, profil' },
    { n: '2', label: 'Vos besoins', desc: 'Objectif, montant, durée souhaitée' },
    { n: '3', label: 'Vos coordonnées', desc: 'Pour vous recontacter sous 24h' },
  ];

  return (
    <div className="form-stepper">
      <div className="form-stepper-header">
        <span className="form-stepper-badge">📋 Étude personnalisée</span>
        <h3 className="form-stepper-title">3 étapes · 5 minutes · Réponse sous 24h</h3>
        <p className="form-stepper-desc">Aucun document à fournir à ce stade. Vos données sont sécurisées et ne seront jamais revendues.</p>
      </div>

      <div className="form-stepper-steps">
        {steps.map((s, i) => (
          <div key={s.n} className="form-stepper-step">
            <div className="form-stepper-num">{s.n}</div>
            {i < steps.length - 1 && <div className="form-stepper-connector" />}
            <div className="form-stepper-content">
              <div className="form-stepper-step-label">{s.label}</div>
              <div className="form-stepper-step-desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="form-stepper-bar">
        <div className="form-stepper-bar-fill" style={{ width: '33%' }} />
      </div>
    </div>
  );
}
