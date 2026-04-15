import ParrainageForm from '@/components/ParrainageForm';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Programme de Parrainage Orizia : Gagnez jusqu\'à 200€ | Orizia Courtage',
  description:
    'Recommandez Orizia Courtage à vos proches et recevez jusqu\'à 200€ en chèques cadeaux par dossier finalisé. Crédit immobilier, assurance emprunteur, placements. Parrainage simple et gratuit.',
  keywords: [
    'parrainage courtier immobilier',
    'recommander courtier indépendant',
    'programme parrainage crédit immobilier',
    'chèque cadeau parrainage courtage',
    'parrainage Orizia Courtage',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/parrainage' },
  openGraph: {
    title: 'Programme de Parrainage Orizia : Gagnez jusqu\'à 200€',
    description: 'Recommandez Orizia à vos proches et recevez jusqu\'à 200€ en chèques cadeaux. Crédit, assurance, placements — chaque dossier finalisé est récompensé.',
    url: 'https://orizia-courtage.fr/parrainage',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/Orizia_logo.webp',
        width: 1200,
        height: 630,
        alt: 'Programme de parrainage Orizia Courtage',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES ──
const parrainageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Parrainage', item: 'https://orizia-courtage.fr/parrainage' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Programme de Parrainage Orizia Courtage',
      serviceType: 'Programme de recommandation client',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        image: 'https://orizia-courtage.fr/images/Orizia_logo.webp',
      },
      description:
        'Recommandez Orizia Courtage à vos proches et recevez jusqu\'à 200€ en chèques cadeaux pour chaque dossier finalisé (crédit immobilier, assurance emprunteur, placements).',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Participation gratuite. Récompense versée sous forme de chèques cadeaux à la finalisation du dossier du filleul.',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Comment fonctionne le programme de parrainage Orizia ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vous recommandez Orizia Courtage à un proche en remplissant le formulaire de parrainage. Cindy prend contact avec votre filleul pour étudier son projet. Dès que son dossier est finalisé et signé, vous recevez tous les deux un chèque cadeau selon le type de dossier.',
          },
        },
        {
          '@type': 'Question',
          name: 'Combien puis-je gagner avec le parrainage ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pour un crédit immobilier finalisé : 200€ pour le parrain. Pour une délégation d\'assurance emprunteur : 100€ pour le parrain et 50€ pour le filleul. Pour un placement (SCPI, PER, Assurance Vie, Crowdfunding) ou une assurance habitation/auto : 50€ pour le parrain et 20€ pour le filleul. Il n\'y a pas de limite au nombre de parrainages.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quand est-ce que je reçois ma récompense ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La récompense est versée sous forme de chèques cadeaux à la finalisation du dossier de votre filleul, c\'est-à-dire après la signature du contrat ou de l\'offre de prêt.',
          },
        },
        {
          '@type': 'Question',
          name: 'Mon filleul doit-il être au courant avant que je le recommande ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui, son accord préalable est obligatoire avant de transmettre ses coordonnées. Conformément au RGPD, vous devez vous assurer que votre filleul accepte d\'être contacté par Orizia Courtage avant de soumettre le formulaire.',
          },
        },
        {
          '@type': 'Question',
          name: 'Puis-je parrainer plusieurs personnes ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolument. Il n\'y a aucune limite au nombre de filleuls que vous pouvez recommander. Chaque dossier finalisé donne droit à une récompense indépendante.',
          },
        },
      ],
    },
  ],
};

const faqItems = parrainageSchema['@graph'][2].mainEntity;

export default function ParrainagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(parrainageSchema) }}
      />

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

        {/* ── FORMULAIRE ── */}
        <section className="parrainage-form-section">
          <div className="parrainage-form-container">
            <div className="parrainage-header">
              <h2>Recommander un proche</h2>
              <p className="form-subtitle">
                Son accord* est obligatoire, transmettez-nous les coordonnées d'une ou plusieurs personnes de votre entourage et nous nous chargeons du reste.
              </p>
            </div>
            <ParrainageForm />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions sur le parrainage,<br />nos réponses directes</h2>
              <p>Tout ce que vous devez savoir avant de recommander Orizia à vos proches.</p>
            </div>
            <div className="crowd-faq-list">
              {faqItems.map((f, i) => (
                <details key={i} className="crowd-faq-item">
                  <summary>{f.name}</summary>
                  <p>{f.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Vous avez une question spécifique à votre situation ? Je vous réponds sous 24h.
              </p>
              <Link href="/contact" className="fin-btn-secondary">
                ✉️ Poser une autre question à Cindy
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
