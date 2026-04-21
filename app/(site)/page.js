import Image from 'next/image';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import AnimatedStats from '@/components/AnimatedStats';
import ContactPopup from '@/components/ContactPopup';
import HomeSituations from '@/components/HomeSituations';
import TemoignagesCarousel from '@/components/TemoignagesCarousel';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Orizia Courtage — Courtier Indépendant Crédit, Assurance & Patrimoine | Hauts-de-France',
  description:
    'Cindy Urbansky, courtier indépendant certifié ORIAS à Marcq-en-Barœul. Crédit immobilier, assurance emprunteur, SCPI, PER, regroupement de crédits. +40 banques comparées. Étude gratuite.',
  keywords: [
    'courtier indépendant Hauts-de-France',
    'courtier crédit immobilier Lille',
    'assurance emprunteur loi Lemoine',
    'SCPI investissement',
    'PER plan épargne retraite',
    'regroupement de crédits',
    'Orizia Courtage',
    'Cindy Urbansky courtier',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr' },
  openGraph: {
    title: 'Orizia Courtage — Courtier Indépendant | Crédit · Assurance · Patrimoine',
    description:
      'Je défends vos intérêts face aux banques et assureurs. Crédit immobilier, assurance emprunteur, SCPI, PER. +40 banques comparées. Étude gratuite à Marcq-en-Barœul.',
    url: 'https://orizia-courtage.fr',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/hero-orizia.jpg',
        width: 1200,
        height: 630,
        alt: 'Cindy Urbansky, courtier indépendant — Orizia Courtage, Marcq-en-Barœul',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orizia Courtage — Courtier Indépendant',
    description: 'Crédit, assurance, patrimoine. Je travaille pour vous, pas pour les banques.',
    images: ['https://orizia-courtage.fr/images/hero-orizia.jpg'],
  },
};

// ── 2. DONNÉES STRUCTURÉES JSON-LD (E-E-A-T complet) ──
const oriziaSchema = {
  '@context': 'https://schema.org',
  '@type': ['FinancialService', 'LocalBusiness', 'InsuranceAgency'],
  '@id': 'https://orizia-courtage.fr/#organization',
  name: 'Orizia Courtage',
  alternateName: ['Orizia', 'Cindy Urbansky Courtier'],
  slogan: 'Je ne travaille pas pour les banques. Je travaille pour vous.',
  url: 'https://orizia-courtage.fr',
  logo: {
    '@type': 'ImageObject',
    url: 'https://orizia-courtage.fr/images/Orizia_logo.webp',
    width: 160,
    height: 75,
  },
  image: 'https://orizia-courtage.fr/images/hero-orizia.jpg',
  description:
    'Cabinet de courtage indépendant fondé par Cindy Urbansky. Expertise en crédit immobilier, assurance emprunteur, regroupement de crédits, SCPI, PER et assurance vie. Immatriculé ORIAS. Basé à Marcq-en-Barœul, Hauts-de-France.',
  telephone: '+33777259706',
  email: 'cindy.urbansky@orizia-courtage.fr',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+33777259706',
      contactType: 'customer service',
      availableLanguage: ['French'],
      contactOption: 'TollFree',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/orizia-courtage',
    'https://www.facebook.com/orizia.courtage/',
    'https://www.instagram.com/orizia.courtage/',
    'https://www.linkedin.com/in/cindy-urbansky-034323162/',
  ],
  founder: {
    '@type': 'Person',
    '@id': 'https://orizia-courtage.fr/qui-suis-je#cindy',
    name: 'Cindy Urbansky',
    jobTitle: 'Courtier Indépendant en financement, assurance et gestion de patrimoine',
    description:
      'Courtier indépendant certifié ORIAS avec plus de 15 ans d\'expérience en intermédiation bancaire. Présidente du conseil de surveillance de l\'AFIB.',
    image: 'https://orizia-courtage.fr/images/photo-cindy.webp',
    url: 'https://orizia-courtage.fr/qui-suis-je',
    sameAs: 'https://www.linkedin.com/in/cindy-urbansky-034323162/',
    knowsAbout: [
      'Courtage en Crédit Immobilier',
      'Assurance Emprunteur',
      'Loi Lemoine',
      'Regroupement de crédits',
      'Rachat de soulte',
      'SCPI de rendement',
      'Plan Épargne Retraite (PER)',
      'Assurance Vie',
      'Crowdfunding immobilier',
    ],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '23 boulevard Clemenceau',
    addressLocality: 'Marcq-en-Barœul',
    postalCode: '59700',
    addressRegion: 'Hauts-de-France',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '50.66575178239067',
    longitude: '3.0792706233086244',
  },
  areaServed: [
    { '@type': 'City', name: 'Marcq-en-Barœul' },
    { '@type': 'City', name: 'Lille' },
    { '@type': 'City', name: 'Villeneuve-d\'Ascq' },
    { '@type': 'City', name: 'Roubaix' },
    { '@type': 'City', name: 'Tourcoing' },
    { '@type': 'State', name: 'Hauts-de-France' },
    { '@type': 'Country', name: 'France' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '€ (étude gratuite)',
  currenciesAccepted: 'EUR',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services Orizia Courtage',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Financer',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'LoanOrCredit', name: 'Crédit immobilier', loanType: 'Mortgage' } },
          { '@type': 'Offer', itemOffered: { '@type': 'LoanOrCredit', name: 'Regroupement de crédits', loanType: 'DebtConsolidation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'LoanOrCredit', name: 'Prêt personnel', loanType: 'PersonalLoan' } },
          { '@type': 'Offer', itemOffered: { '@type': 'LoanOrCredit', name: 'Rachat de soulte', loanType: 'Mortgage' } },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Assurer',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'InsuranceProduct', name: 'Assurance emprunteur' } },
          { '@type': 'Offer', itemOffered: { '@type': 'InsuranceProduct', name: 'Assurance habitation MRH' } },
          { '@type': 'Offer', itemOffered: { '@type': 'InsuranceProduct', name: 'Assurance auto et moto' } },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Investir',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'SCPI (Pierre-papier)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Plan Épargne Retraite (PER)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Assurance Vie' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Crowdfunding immobilier' } },
        ],
      },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Combien coûte le service d\'Orizia Courtage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'étude de faisabilité et l\'accompagnement sont 100% gratuits pour vous. Je suis rémunérée par la banque ou l\'assureur partenaire à la signature — jamais par vous.',
      },
    },
    {
      '@type': 'Question',
      name: 'Orizia Courtage est-il immatriculé à l\'ORIAS ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, Orizia Courtage est immatriculé à l\'ORIAS et régi par l\'ACPR. Cindy Urbansky est également Présidente du conseil de surveillance de l\'AFIB (Association Française des Intermédiaires en Bancassurance).',
      },
    },
    {
      '@type': 'Question',
      name: 'Dans quelles zones géographiques intervenez-vous ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Basée à Marcq-en-Barœul, j\'interviens dans toute la métropole lilloise et les Hauts-de-France. Je travaille également à distance en visioconférence pour les clients partout en France.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre un courtier et un conseiller bancaire ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un conseiller bancaire ne peut vous proposer que les produits de sa banque. En tant que courtier indépendant, je compare 40+ banques et assureurs pour trouver la meilleure solution pour votre situation — sans conflit d\'intérêts.',
      },
    },
  ],
};

const SERVICES = [
  {
    img: '/images/investir.jpg',
    tag: 'Stratégie Patrimoniale',
    title: 'Faire fructifier votre capital, intelligemment',
    desc: 'SCPI, assurance vie, PER, crowdfunding… Je sélectionne pour vous les placements qui correspondent vraiment à vos objectifs — pas à ceux de ma banque.',
    cta: { href: '/investir', label: 'Voir les solutions' },
  },
  {
    img: '/images/financer.jpg',
    tag: 'Financement',
    title: 'Votre meilleur taux, négocié pour vous',
    desc: 'Crédit immobilier, regroupement de crédits, prêt personnel… Je compare plus de 40 partenaires et je défends votre dossier jusqu\'à l\'accord.',
    cta: { href: '/financer', label: 'Étudier mon financement' },
  },
  {
    img: '/images/assurer.jpg',
    tag: 'Protection',
    title: 'Protéger ce qui compte, au juste prix',
    desc: 'Assurance emprunteur, habitation, auto/moto… Je vous évite de payer pour des garanties inutiles et je veille à ce que vous soyez vraiment couvert.',
    cta: { href: '/assurer', label: 'Auditer mes contrats' },
  },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(oriziaSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main>

        {/* ── HERO (inchangé) ── */}
        <section className="orizia-hero">
          <div className="image-column">
            <div className="column-image">
              <Image
                src="/images/hero-orizia.webp"
                alt="Cindy Urbansky, courtier indépendant – Orizia Courtage, Marcq-en-Barœul"
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                quality={85}
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
              Courtier indépendant · Certifié ORIAS · Hauts-de-France
            </p>
            <h1>
              Votre courtier indépendant,<br />
              de la première question<br />
              jusqu'à la signature
            </h1>
            <p>
              Je gère personnellement chaque dossier, du début à la fin.
              Pas de commercial intermédiaire, pas d'objectif bancaire à atteindre —
              juste un professionnel engagé pour défendre vos intérêts.
            </p>
            <div className="buttons">
              <ContactPopup label="📅 Prendre rendez-vous gratuitement" className="orizia-btn-main" />
              <ContactPopup label="✉️ Échanger avec Cindy" className="orizia-btn-sec" />
            </div>
          </div>
        </section>

        {/* ── STATS ANIMÉES ── */}
        <AnimatedStats />

        {/* ── CITATION CINDY ── */}
        <section className="home-citation-section">
          <div className="home-citation-inner">
            <div className="home-citation-photo">
              <Image
                src="/images/photo-cindy.webp"
                alt="Cindy Urbansky – courtier indépendant, Orizia Courtage"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
                sizes="(max-width: 768px) 120px, 200px"
              />
            </div>
            <div className="home-citation-content">
              <span className="home-citation-role">
                Cindy Urbansky — Fondatrice · Courtier indépendant · Présidente AFIB
              </span>
              <blockquote className="home-citation-quote">
                « Je ne travaille pas pour les banques. Je travaille pour vous. »
              </blockquote>
              <p className="home-citation-text">
                Quand vous me confiez un dossier, je cherche la solution la plus juste
                pour votre situation — pas la plus rapide. Je pose les vraies questions,
                je compare ce qui mérite d'être comparé, et je vous explique chaque choix
                dans un langage humain. Pas de jargon. Pas de pression.
              </p>
              <div className="home-citation-badges">
                {['15+ ans d\'expérience', '+40 banques comparées', 'ORIAS certifié', '100% gratuit'].map(b => (
                  <span key={b} className="home-citation-badge">{b}</span>
                ))}
              </div>
              <ContactPopup label="📅 Parler à Cindy gratuitement" className="fin-btn-primary" />
            </div>
          </div>
        </section>

        {/* ── VOTRE SITUATION ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Votre situation</span>
              <h2>Quelle est votre priorité<br />du moment ?</h2>
              <p>
                Sélectionnez votre situation pour voir comment je peux vous aider concrètement.
              </p>
            </div>
            <HomeSituations />
          </div>
        </section>

        {/* ── LES 3 EXPERTISES ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mes expertises</span>
              <h2>Un seul interlocuteur.<br />Trois expertises à votre service.</h2>
              <p>
                Je traite personnellement chaque dossier — sans déléguer, sans intermédiaire.
                Vous avez un numéro direct. Pas un service client.
              </p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 28,
            }}>
              {SERVICES.map(s => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* ── POURQUOI ORIZIA ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="home-why-grid">
              <div className="home-why-text">
                <span className="fin-badge">Pourquoi Orizia ?</span>
                <h2 style={{ color: 'var(--orizia-accent)', fontSize: '2rem', fontWeight: 900, marginTop: 12, marginBottom: 16 }}>
                  Le seul courtier à qui vous<br />parlez directement
                </h2>
                <p style={{ color: 'var(--orizia-dark)', lineHeight: 1.7, marginBottom: 24, opacity: 0.8 }}>
                  Je travaille seule. Et c'est précisément ce qui fait la différence.
                  Pas de standardiste, pas de transfert de dossier — c'est moi qui vous
                  réponds, moi qui négocie, moi qui suis votre dossier de la première
                  question à la remise des clés.
                </p>
                <div className="home-why-points">
                  {[
                    { icon: '🎯', text: 'Étude personnalisée et 100% gratuite' },
                    { icon: '🏦', text: 'Accès à plus de 40 partenaires bancaires' },
                    { icon: '📞', text: 'Vous parlez toujours à la même personne' },
                    { icon: '⚖️', text: 'Aucun lien exclusif avec les banques' },
                    { icon: '🛡️', text: 'Immatriculée ORIAS — réglementée et engagée' },
                    { icon: '🏆', text: 'Présidente du conseil de surveillance de l\'AFIB' },
                  ].map(item => (
                    <div key={item.text} className="home-why-point">
                      <span className="home-why-point-icon">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
                  <ContactPopup label="📅 Prendre rendez-vous" className="fin-btn-primary" />
                  <Link href="/qui-suis-je" className="fin-btn-secondary">
                    En savoir plus sur Cindy →
                  </Link>
                </div>
              </div>

              <div className="home-why-image-wrap">
                <Image
                  src="/images/hero-orizia.jpg"
                  alt="Cindy Urbansky, courtier indépendant — Orizia Courtage"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGES ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Ils en parlent</span>
              <h2>Ce que disent mes partenaires</h2>
              <p>Des professionnels du secteur qui témoignent de leur expérience avec moi.</p>
            </div>
            <TemoignagesCarousel />
            
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Les questions qu'on me pose<br />le plus souvent</h2>
            </div>
            <div className="crowd-faq-list" style={{ maxWidth: 760, margin: '0 auto' }}>
              {faqSchema.mainEntity.map((f, i) => (
                <details key={i} className="crowd-faq-item">
                  <summary>{f.name}</summary>
                  <p>{f.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-accent)' }}>
          <div className="fin-cta-inner">
            <h2 style={{ color: '#fff' }}>
              Un échange de 30 minutes.<br />Sans engagement. Sans jargon.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>
              On commence par une conversation simple sur votre situation et vos objectifs.
              Je vous dis franchement ce qui est possible, dans quel délai et pourquoi.
              C'est gratuit. Et ça n'engage à rien.
            </p>
            <div className="fin-hero-btns" style={{ justifyContent: 'center' }}>
              <ContactPopup label="📅 Réserver mon créneau gratuit" className="fin-btn-primary" />
              <ContactPopup label="✉️ M'envoyer un message" className="fin-btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }} />
            </div>
            <p style={{ marginTop: 16, fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)' }}>
              Réponse sous 24h · Disponible en visio ou en présentiel · Marcq-en-Barœul
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
