export const metadata = {
  title: 'Prendre rendez-vous : Bilan gratuit avec votre courtière | Orizia',
  description:
    'Planifiez un échange téléphonique gratuit et sans engagement. Crédit, assurance ou investissement : je fais le point sur vos projets pour optimiser votre budget.',
  keywords: [
    'prendre rendez-vous courtier',
    'bilan patrimonial gratuit',
    'simulation crédit immobilier',
    'optimisation assurance',
    'rendez-vous Cindy Urbansky',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/rendez-vous' },
  openGraph: {
    title: 'Prendre rendez-vous : Bilan gratuit avec votre courtière | Orizia',
    description: 'Bloquez un créneau de 30 minutes dans mon agenda. C\'est 100% gratuit, sans engagement, et je vous rappelle personnellement pour faire avancer vos projets.',
    url: 'https://orizia-courtage.fr/rendez-vous',
    type: 'website',
  },
};

export default function RendezVous() {
  return (
    <main>

      <section className="rdv-hero">
        <div className="rdv-hero-inner">
          <span className="rdv-badge">Consultation gratuite & sans engagement</span>
          <h1>Parlez à un expert Orizia</h1>
          <p>Choisissez votre créneau ci-dessous. En 30 minutes, on analyse votre situation et on vous propose les meilleures solutions.</p>
        </div>
      </section>

      <section className="rdv-steps">
        <div className="rdv-steps-inner">
          {[
            { n: '1', title: 'Choisissez un créneau',  text: "Sélectionnez le jour et l'heure qui vous conviennent dans le calendrier." },
            { n: '2', title: 'Confirmez vos infos',    text: 'Renseignez votre nom et e-mail pour recevoir la confirmation par mail.' },
            { n: '3', title: "L'expert vous appelle",  text: 'Cindy vous contacte au créneau choisi pour un échange personnalisé.' },
          ].map((s) => (
            <div key={s.n} className="rdv-step">
              <div className="rdv-step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rdv-cal-section">
        <div className="rdv-cal-wrapper" data-hide-header>
          <iframe
            src="https://cal.eu/cindy-urbansky/rendez-vous?embed=true"
            style={{ width: '100%', height: '750px', border: 'none', display: 'block' }}
            id="cal-invite"
          />
        </div>
      </section>

      <section className="rdv-trust">
        <div className="rdv-trust-inner">
          <span>🔒 Données sécurisées</span>
          <span>✅ Sans engagement</span>
          <span>📞 Par téléphone ou visio</span>
          <span>⚡ Confirmation immédiate</span>
        </div>
      </section>

    </main>
  );
}