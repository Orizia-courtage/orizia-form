import Image from 'next/image';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';

// ── 1. MÉTADONNÉES SEO (Optimisées) ──
export const metadata = {
  title: 'Orizia Courtage, courtier indépendant crédit et assurance',
  description:
    'Cindy Urbansky, courtier indépendant dans les Hauts-de-France. Je négocie vos crédits immobiliers, optimise vos assurances et dynamise vos placements. Étude de faisabilité gratuite.',
  alternates: { canonical: 'https://orizia-courtage.fr' },
  openGraph: {
    title: 'Orizia Courtage | Courtier Indépendant Crédit & Assurance',
    description:
      'Ne laissez plus les banques décider pour vous. Je défends vos intérêts pour vos crédits, assurances et investissements. Bilan patrimonial gratuit.',
    url: 'https://orizia-courtage.fr',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/hero-orizia.jpg', // C'est fameux og:image !
        width: 1200,
        height: 630,
        alt: 'Cindy Urbansky - Orizia Courtage',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES (JSON-LD Optimisées E-E-A-T) ──
const oriziaSchema = {
  '@context': 'https://schema.org',
  '@type': ['FinancialService', 'LocalBusiness', 'InsuranceAgency'],
  name: 'Orizia Courtage',
  // legalName: 'Orizia Courtage SARL', // ⏳ À DÉCOMMENTER : Quand tu auras ta forme juridique exacte
  alternateName: ['Orizia','Cindy Urbansky'],
  slogan: 'Je ne travaille pas pour les banques. Je travaille pour vous.',
  url: 'https://orizia-courtage.fr',
  logo: 'https://orizia-courtage.fr/images/Orizia_logo.webp', 
  image: 'https://orizia-courtage.fr/images/hero-orizia.jpg',
  description: 'Cabinet de courtage indépendant géré par Cindy Urbansky. Expertise en crédit immobilier, assurances, regroupement de crédits et stratégie patrimoniale (SCPI, PER, Assurance-Vie).',
  
  // ── AUTORITÉ & LÉGAL (En attente d'immatriculation) ──
  // taxID: 'TON_SIRET_ICI', // ⏳ À DÉCOMMENTER : Quand tu auras ton SIRET
  // award: 'Immatriculée à l\'ORIAS sous le numéro TON_ORIAS_ICI', // ⏳ À DÉCOMMENTER : Quand tu auras ton ORIAS
  
  // ── AVIS CLIENS (En attente de récolte d'avis) ──
  /* ⏳ À DÉCOMMENTER : Quand tu auras une fiche Google My Business avec des avis
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    bestRating: '5',
    ratingCount: '1' 
  },
  */

  // ── INFOS DE CONTACT ──
  telephone: '+33777259706',
  email: 'cindy.urbansky@orizia-courtage.fr',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+33777259706',
    contactType: 'customer service',
    availableLanguage: ['French']
  },
  
  // ── RÉSEAUX SOCIAUX ──
  sameAs: [
    'https://www.linkedin.com/company/orizia-courtage', 
    'https://www.facebook.com/orizia.courtage/',
    'https://www.instagram.com/orizia.courtage/',
  ],

  // ── L'EXPERTE (Cindy Urbansky) ──
  founder: {
    '@type': 'Person',
    name: 'Cindy Urbansky',
    jobTitle: 'Courtier Indépendant en financement et assurance',
    description: 'Experte en financement immobilier et gestion de patrimoine avec plus de 15 ans d\'expérience terrain.',
    image: 'https://orizia-courtage.fr/images/photo-cindy.webp',
    sameAs: 'https://www.linkedin.com/in/cindy-urbansky-034323162/',
    knowsAbout: [
      'Courtage en Crédit Immobilier', 
      'Assurance Emprunteur', 
      'Loi Lemoine', 
      'Regroupement de crédits', 
      'SCPI de rendement', 
      'Plan Épargne Retraite (PER)',
      'Assurance Vie'
    ]
  },

  // ── ADRESSE ET GÉOLOCALISATION ──
  address: {
    '@type': 'PostalAddress',
    streetAddress: '23 boulevard Clemenceau',
    addressLocality: 'Marcq-en-Barœul',
    postalCode: '59700',
    addressRegion: 'Hauts-de-France',
    addressCountry: 'FR'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '50.66575178239067', 
    longitude: '3.0792706233086244'
  },
  // hasMap: 'https://goo.gl/maps/ton-lien-google-maps', // ⏳ À DÉCOMMENTER : Dès que tu as ta fiche Google My Business
  areaServed: [
    { '@type': 'City', name: 'Marcq-en-Barœul' },
    { '@type': 'City', name: 'Lille' },
    { '@type': 'State', name: 'Hauts-de-France' },
    { '@type': 'Country', name: 'France' }
  ],

  // ── HORAIRES ET PAIEMENT ──
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '13:00'
    }
  ],
  paymentAccepted: 'Virement bancaire, Prélèvement',
  currenciesAccepted: 'EUR',
  priceRange: '0€ pour l\'étude de faisabilité', 

  // ── CATALOGUE DÉTAILLÉ DE SERVICES ──
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Piliers d\'expertise Orizia : Investir, Financer, Assurer',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Investir (Stratégie Patrimoniale)',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Crowdfunding et Financement participatif' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Plan Épargne Retraite (PER / PERP)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Assurance Vie (Épargne & transmission)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'SCPI (Immobilier de rendement)' } }
        ]
      },
      {
        '@type': 'OfferCatalog',
        name: 'Financer (Crédits)',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Crédit immobilier' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Regroupement de crédits' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Prêt personnel' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Rachat de soulte' } }
        ]
      },
      {
        '@type': 'OfferCatalog',
        name: 'Assurer (Protection)',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Assurance emprunteur' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Assurance habitation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Assurance auto/moto' } }
        ]
      }
    ]
  }
};

// ... la suite de ton code (const SERVICES etc.)
const SERVICES = [
  {
    img: '/images/investir.jpg',
    tag: 'Stratégie Patrimoniale',
    title: 'Faire fructifier votre capital, intelligemment',
    desc: 'SCPI, assurance-vie, PER, crowdfunding… Je sélectionne pour vous les placements qui correspondent vraiment à vos objectifs — pas à ceux de ma banque.',
    cta: { href: '/investir', label: 'Voir les solutions' },
  },
  {
    img: '/images/financer.jpg',
    tag: 'Financement',
    title: 'Votre meilleur taux, négocié pour vous',
    desc: 'Crédit immobilier, regroupement de crédits, prêt personnel… Je compare plus de 40 partenaires et je défends votre dossier jusqu\'à l\'accord.',
    cta: { href: '/financer', label: 'Simuler gratuitement' }, // Modifié pour rediriger vers le hub financer ou simulation
  },
  {
    img: '/images/assurer.jpg',
    tag: 'Protection',
    title: 'Protéger ce qui compte, au juste prix',
    desc: 'Assurance emprunteur, habitation, auto/moto… Je vous évite de payer pour des garanties inutiles et je veille à ce que vous soyez vraiment couvert.',
    cta: { href: '/assurer', label: 'Obtenir un devis' },
  },
];

const STATS = [
  { value: '500+', label: 'Dossiers accompagnés' },
  { value: '15 ans', label: "D'expérience terrain" },
  { value: '98%', label: 'Clients satisfaits' },
  { value: 'ORIAS', label: 'Immatriculée & certifiée' },
];

export default function HomePage() {
  return (
    <>
      {/* ── INJECTION DES DONNÉES STRUCTURÉES ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(oriziaSchema) }}
      />

      <main>
        {/* ── HERO ── */}
        <section className="orizia-hero">
          <div className="image-column">
            <div className="column-image">
              <Image
                src="/images/hero-orizia.jpg"
                alt="Cindy Urbansky, courtière indépendante – Orizia Courtage"
                fill
                priority
              />
            </div>
          </div>
          <div className="orizia-hero-content">
            <p style={{
              color: 'var(--orizia-primary)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 12,
            }}>
              Courtier indépendant · Certifiée ORIAS · Hauts-de-France
            </p>
            <h1>
              Votre courtier indépendant,<br />
              de la première question<br />
              jusqu'à la signature
            </h1>
            <p>
              Je gère personnellement chaque dossier, du début à la fin.
              Pas de commercial intermédiaire, pas d'objectif bancaire à atteindre —
              juste une professionnelle engagée pour défendre vos intérêts.
            </p>
            <div className="buttons">
              <Link href="/simulation" className="orizia-btn-main">
                Faire une simulation gratuite
              </Link>
              <Link href="/rendez-vous" className="orizia-btn-sec">
                Échanger avec Cindy
              </Link>
            </div>
          </div>
        </section>

        {/* ── CITATION CINDY ── */}
        <section style={{ padding: '80px 20px', backgroundColor: 'var(--orizia-light)' }}>
          <div style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 60,
            flexWrap: 'wrap',
          }}>
            {/* Photo */}
            <div style={{
              width: 290,
              height: 290,
              flexShrink: 0,
              margin: '0 auto',
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid var(--orizia-primary)',
              boxShadow: '0 12px 40px rgba(31,63,63,0.18)',
            }}>
              <Image
                src="/images/photo-cindy.webp"
                alt="Cindy Urbansky – Courtière indépendante, Orizia Courtage"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
              />
            </div>

            {/* Citation */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <span style={{
                color: 'var(--orizia-primary)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: '0.8rem',
                marginBottom: 16,
                display: 'block',
              }}>
                Cindy Urbansky — Fondatrice & Courtière
              </span>
              <blockquote style={{ margin: 0, padding: 0 }}>
                <p style={{
                  color: 'var(--orizia-accent)',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  lineHeight: 1.5,
                  marginTop: 0,
                  marginBottom: 16,
                }}>
                  « Je ne travaille pas pour les banques. Je travaille pour vous.
                </p>
                <p style={{
                  color: 'var(--orizia-dark)',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  lineHeight: 1.7,
                  margin: '0 0 24px',
                }}>
                  Quand vous me confiez un dossier, je cherche la solution la plus juste
                  pour votre situation — pas la plus rapide. Je pose les vraies questions,
                  je compare ce qui mérite d'être comparé, et je vous explique chaque choix
                  dans un langage humain. Pas de jargon. Pas de pression. »
                </p>
                <Link href="/rendez-vous" className="orizia-btn-main" style={{ display: 'inline-block' }}>
                  Parler à Cindy gratuitement →
                </Link>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ backgroundColor: 'var(--orizia-accent)', padding: '40px 20px' }}>
          <div className="home-stats-grid">
            {STATS.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#E6F5F2' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(230,245,242,0.75)', fontWeight: 600 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section style={{ padding: '80px 20px', backgroundColor: 'var(--orizia-light)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p style={{
              color: 'var(--orizia-primary)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              Ce que je fais concrètement pour vous
            </p>
            <h2 style={{
              textAlign: 'center',
              color: 'var(--orizia-accent)',
              fontSize: '2.2rem',
              fontWeight: 900,
              marginBottom: 12,
              marginTop: 0,
            }}>
              Un seul interlocuteur.<br />
              Trois expertises à votre service.
            </h2>
            <p style={{
              textAlign: 'center',
              color: 'var(--orizia-dark)',
              opacity: 0.7,
              maxWidth: 600,
              margin: '0 auto 50px',
              lineHeight: 1.6,
            }}>
              Je traite personnellement chaque dossier — sans déléguer, sans intermédiaire.
              Vous avez un numéro. Pas un service client.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 30,
            }}>
              {SERVICES.map(s => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* ── POURQUOI ORIZIA ── */}
        <section style={{ padding: '80px 20px', backgroundColor: '#fff' }}>
          <div className="home-why-grid" style={{
            maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 60, flexWrap: 'wrap'
          }}>
            <div style={{ flex: '1 1 400px' }}>
              <p style={{
                color: 'var(--orizia-primary)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 8,
              }}>
                Pourquoi Orizia ?
              </p>
              <h2 style={{
                color: 'var(--orizia-accent)',
                fontSize: '2rem',
                fontWeight: 900,
                marginTop: 0,
                marginBottom: 16,
              }}>
                Le seul courtier à qui vous<br />parlez directement
              </h2>
              <p style={{ color: 'var(--orizia-dark)', lineHeight: 1.7, marginBottom: 24 }}>
                Je travaille seule. Et c'est précisément ce qui fait la différence.
                Pas de standardiste, pas de transfert de dossier — c'est moi qui vous
                réponds, moi qui négocie, moi qui suis votre dossier de la première
                question à la remise des clés. Je n'ai aucun accord exclusif avec aucune
                banque : je compare objectivement, et je ne recommande que ce qui
                est bon pour vous.
              </p>
              {[
                'Étude personnalisée et 100% gratuite',
                'Accès à plus de 40 partenaires bancaires',
                'Vous parlez toujours à la même personne',
                'Indépendante : aucun lien exclusif avec les banques',
                'Immatriculée ORIAS — réglementée et engagée',
              ].map(item => (
                <div key={item} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 10,
                }}>
                  <span style={{ color: 'var(--orizia-primary)', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                  <span style={{ fontWeight: 600 }}>{item}</span>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 28 }}>
                <Link href="/rendez-vous" className="orizia-btn-main">
                  Prendre rendez-vous gratuitement
                </Link>
                <Link href="/simulation" className="orizia-btn-sec">
                  Faire une simulation
                </Link>
              </div>
            </div>

            <div
              className="home-why-image"
              style={{
                flex: '1 1 400px',
                position: 'relative',
                height: 420,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(29,30,24,0.12)',
              }}
            >
              <Image
                src="/images/hero-orizia.jpg"
                alt="Cabinet Orizia Courtage — Cindy Urbansky, courtière indépendante"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        {/* ── RASSURANCE FINALE ── */}
        <section style={{
          padding: '60px 20px',
          backgroundColor: 'var(--orizia-light)',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <p style={{
              color: 'var(--orizia-primary)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.8rem',
              marginBottom: 16,
            }}>
              Première étape
            </p>
            <h2 style={{
              color: 'var(--orizia-accent)',
              fontSize: '1.8rem',
              fontWeight: 900,
              marginBottom: 16,
              lineHeight: 1.3,
            }}>
              Un échange de 30 minutes.<br />
              Sans engagement. Sans jargon.
            </h2>
            <p style={{
              color: 'var(--orizia-dark)',
              opacity: 0.7,
              lineHeight: 1.7,
              marginBottom: 32,
            }}>
              On commence par une conversation simple sur votre situation et vos objectifs.
              Je vous dis franchement ce qui est possible, dans quel délai et pourquoi.
              C'est gratuit. Et ça n'engage à rien.
            </p>
            <Link href="/rendez-vous" className="orizia-btn-main" style={{ fontSize: '1.1rem', padding: '20px 40px' }}>
              Réserver mon créneau gratuit →
            </Link>
            <p style={{
              marginTop: 16,
              fontSize: '0.82rem',
              color: 'var(--orizia-dark)',
              opacity: 0.5,
            }}>
              Réponse sous 24h · Disponible en visio ou en présentiel
            </p>
          </div>
        </section>
      </main>
    </>
  );
}