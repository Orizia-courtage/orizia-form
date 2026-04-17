import RdvReassurance from '@/components/RdvReassurance';

export const metadata = {
  title: 'Prendre rendez-vous avec Cindy Urbansky — Courtière Indépendante | Orizia Courtage',
  description:
    'Réservez un créneau gratuit de 30 minutes avec Cindy Urbansky, courtière indépendante à Marcq-en-Barœul. Crédit immobilier, assurance, placements : je fais le point sur votre situation sans engagement.',
  keywords: [
    'prendre rendez-vous courtier indépendant',
    'bilan patrimonial gratuit Hauts-de-France',
    'rendez-vous crédit immobilier Lille',
    'consultation gratuite courtière',
    'rendez-vous Cindy Urbansky Orizia',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/rendez-vous' },
  openGraph: {
    title: 'Prendre rendez-vous avec Cindy Urbansky — Courtière Indépendante',
    description: 'Bloquez un créneau de 30 minutes dans mon agenda. 100% gratuit, sans engagement. Je vous rappelle personnellement pour faire avancer vos projets.',
    url: 'https://orizia-courtage.fr/rendez-vous',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/photo-cindy.webp',
        width: 1200,
        height: 630,
        alt: 'Prendre rendez-vous avec Cindy Urbansky - Orizia Courtage',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

const rdvSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Rendez-vous', item: 'https://orizia-courtage.fr/rendez-vous' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Consultation gratuite avec Cindy Urbansky — Courtière Indépendante',
      serviceType: 'Bilan patrimonial et conseil en courtage',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        telephone: '+33777259706',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '23 boulevard Clemenceau',
          addressLocality: 'Marcq-en-Barœul',
          postalCode: '59700',
          addressRegion: 'Hauts-de-France',
          addressCountry: 'FR',
        },
      },
      description:
        'Consultation téléphonique ou visio de 30 minutes, gratuite et sans engagement. Analyse de votre situation financière, de vos projets de crédit, d\'assurance ou d\'investissement.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Consultation 100% gratuite et sans engagement.',
      },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: 'https://orizia-courtage.fr/rendez-vous',
        serviceType: 'Prise de rendez-vous en ligne',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Le rendez-vous est-il vraiment gratuit ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui, totalement. La consultation de 30 minutes est 100% gratuite et sans engagement. Je suis rémunérée par les partenaires bancaires ou assureurs uniquement si vous décidez de signer un contrat — jamais par vous directement.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment se déroule le rendez-vous ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vous choisissez un créneau dans le calendrier. À l\'heure convenue, Cindy vous appelle directement sur votre téléphone ou vous rejoignez en visioconférence. En 30 minutes, on fait le point sur votre situation, vos objectifs et je vous indique clairement ce qui est possible et dans quel délai.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quels sujets peut-on aborder lors du rendez-vous ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tout ce qui touche à votre patrimoine et vos finances : crédit immobilier, regroupement de crédits, prêt personnel, assurance emprunteur, assurance habitation ou auto, SCPI, PER, assurance vie, crowdfunding. Vous pouvez aussi venir avec plusieurs sujets — je m\'adapte à votre situation.',
          },
        },
        {
          '@type': 'Question',
          name: 'Dois-je préparer des documents avant le rendez-vous ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Non, aucun document n\'est nécessaire pour le premier échange. C\'est une conversation libre pour comprendre votre situation. Si votre projet avance, je vous indiquerai ensuite précisément quels documents rassembler.',
          },
        },
        {
          '@type': 'Question',
          name: 'Puis-je annuler ou reporter mon rendez-vous ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui, vous recevez un e-mail de confirmation avec un lien pour annuler ou reporter votre créneau à tout moment, sans frais ni justification.',
          },
        },
      ],
    },
  ],
};

const faqItems = rdvSchema['@graph'][2].mainEntity;

export default function RendezVous() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rdvSchema) }}
      />
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
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px' }}>
          <RdvReassurance />
        </div>
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

      {/* ── FAQ ── */}
      <section className="crowd-section crowd-section--light">
        <div className="fin-section-inner">
          <div className="fin-section-head">
            <span className="fin-badge">FAQ</span>
            <h2>Vos questions avant de réserver,<br />mes réponses directes</h2>
            <p>Tout ce que vous devez savoir sur le déroulement du rendez-vous.</p>
          </div>
          <div className="crowd-faq-list">
            {faqItems.map((f, i) => (
              <details key={i} className="crowd-faq-item">
                <summary>{f.name}</summary>
                <p>{f.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </main>
    </>
  );
}