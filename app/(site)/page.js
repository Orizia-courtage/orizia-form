import Image from 'next/image';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import AnimatedStats from '@/components/AnimatedStats';
import ContactPopup from '@/components/ContactPopup';
import RdvButton from '@/components/RdvButton';
import Icon from '@/components/Icon';
import HomeSituations from '@/components/HomeSituations';
import TemoignagesCarousel from '@/components/TemoignagesCarousel';
import BrokerNetwork from '@/components/BrokerNetwork';
import HomeSteps from '@/components/HomeSteps';
import { COMPANY, COMPANY_IDENTIFIERS } from '@/lib/company.mjs';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Orizia Courtage — Courtier Indépendant | Hauts-de-France',
  description:
    'Cindy Urbansky, courtier indépendant certifié ORIAS à Marcq-en-Barœul. Crédit immobilier, assurance emprunteur, SCPI, PER. +40 banques comparées.',
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
  alternates: { canonical: 'https://www.orizia-courtage.fr' },
  openGraph: {
    title: 'Orizia Courtage — Courtier Indépendant | Crédit · Assurance · Patrimoine',
    description:
      'Je défends vos intérêts face aux banques et assureurs. Crédit immobilier, assurance emprunteur, SCPI, PER. +40 banques comparées. Étude de faisabilité à Marcq-en-Barœul.',
    url: 'https://www.orizia-courtage.fr',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://www.orizia-courtage.fr/images/img-orizia.webp',
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
    images: ['https://www.orizia-courtage.fr/images/img-orizia.webp'],
  },
};

// ── 2. DONNÉES STRUCTURÉES JSON-LD (E-E-A-T complet) ──
const oriziaSchema = {
  '@context': 'https://schema.org',
  '@type': ['FinancialService', 'LocalBusiness', 'InsuranceAgency'],
  '@id': 'https://www.orizia-courtage.fr/#organization',
  name: 'Orizia Courtage',
  legalName: COMPANY.denomination,
  alternateName: ['Orizia', 'Cindy Urbansky Courtier'],
  foundingDate: COMPANY.registeredAt,
  taxID: COMPANY.sirenCompact,
  identifier: COMPANY_IDENTIFIERS,
  slogan: 'Je ne travaille pas pour les banques. Je travaille pour vous.',
  url: 'https://www.orizia-courtage.fr',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.orizia-courtage.fr/images/Orizia_logo.webp',
    width: 160,
    height: 75,
  },
  image: 'https://www.orizia-courtage.fr/images/img-orizia.webp',
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
    'https://www.instagram.com/orizia_courtage/',
    'https://www.linkedin.com/in/cindy-urbansky-034323162/',
  ],
  founder: {
    '@type': 'Person',
    '@id': 'https://www.orizia-courtage.fr/qui-suis-je#cindy',
    name: 'Cindy Urbansky',
    jobTitle: 'Courtier Indépendant en financement, assurance et gestion de patrimoine',
    description:
      'Courtier indépendant certifié ORIAS avec 20 ans d\'expérience en intermédiation bancaire. Présidente du conseil de surveillance de l\'AFIB.',
    image: 'https://www.orizia-courtage.fr/images/photo-cindy-gp.webp',
    url: 'https://www.orizia-courtage.fr/qui-suis-je',
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
  priceRange: '€€',
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
        text: 'Les modalités de rémunération et les éventuels frais sont présentés de manière transparente avant tout engagement.',
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
    img: '/images/financer.webp',
    tag: 'Financer',
    icon: 'landmark',
    title: 'Votre meilleur taux, négocié pour vous',
    desc: 'Crédit immobilier, regroupement de crédits, prêt personnel, rachat de soulte. Je compare plus de 40 partenaires et je défends votre dossier jusqu\'à l\'accord.',
    links: [
      { label: 'Crédit immobilier', href: '/financer/credit-immobilier' },
      { label: 'Regroupement de crédits', href: '/financer/regroupement-credits' },
      { label: 'Prêt personnel', href: '/financer/pret-personnel' },
      { label: 'Rachat de soulte', href: '/financer/rachat-soulte' },
    ],
    cta: { href: '/financer', label: 'Étudier mon financement' },
  },
  {
    img: '/images/assurer.webp',
    tag: 'Assurer',
    icon: 'shield-check',
    title: 'Protéger ce qui compte, au juste prix',
    desc: 'Assurance emprunteur, habitation, auto et moto. Je vous évite de payer pour des garanties inutiles et je veille à ce que vous soyez vraiment couvert.',
    links: [
      { label: 'Assurance emprunteur', href: '/assurer/assurance-emprunteur' },
      { label: 'Assurance habitation', href: '/assurer/assurance-habitation' },
      { label: 'Auto et moto', href: '/assurer/auto-moto' },
    ],
    cta: { href: '/assurer', label: 'Auditer mes contrats' },
  },
  {
    img: '/images/investir.webp',
    tag: 'Investir',
    icon: 'trending-up',
    title: 'Faire fructifier votre capital, intelligemment',
    desc: 'SCPI, assurance vie, PER, crowdfunding. Je sélectionne les placements qui correspondent à vos objectifs et à votre fiscalité, pas à ceux d\'une banque.',
    links: [
      { label: 'SCPI', href: '/investir/scpi' },
      { label: 'Assurance vie', href: '/investir/assurance-vie' },
      { label: 'PER', href: '/investir/per' },
      { label: 'Crowdfunding', href: '/investir/crowdfunding' },
    ],
    cta: { href: '/investir', label: 'Voir les solutions' },
  },
];

const ETAPES = [
  {
    icon: 'message-circle',
    title: 'On fait connaissance',
    text: '30 minutes en visio, par téléphone ou à Marcq-en-Barœul. Vous m\'exposez votre projet, je vous dis franchement ce qui est possible.',
    meta: 'Sans engagement',
  },
  {
    icon: 'search',
    title: 'J\'étudie et je compare',
    text: 'J\'analyse votre situation complète et je mets en concurrence plus de 40 banques et assureurs partenaires.',
    meta: 'Étude sous 24 à 48 h',
  },
  {
    icon: 'handshake',
    title: 'Je négocie pour vous',
    text: 'Taux, frais de dossier, assurance, pénalités : je défends votre dossier et je vous présente les meilleures offres, expliquées clairement.',
    meta: 'Vous gardez la main',
  },
  {
    icon: 'pen-line',
    title: 'Je vous accompagne jusqu\'au bout',
    text: 'Rendez-vous en agence, signature chez le notaire, suivi après la signature : vous parlez toujours à la même personne.',
    meta: 'Un seul interlocuteur',
  },
];

const POURQUOI = [
  { icon: 'user', title: 'Une seule interlocutrice', text: 'Pas de standard, pas de transfert de dossier. Vous avez mon numéro direct.' },
  { icon: 'scale', title: 'Aucun lien exclusif', text: 'Je ne travaille pour aucune banque. Ma seule mission : la meilleure solution pour vous.' },
  { icon: 'landmark', title: '+40 partenaires', text: 'Banques et assureurs mis en concurrence pour chaque dossier.' },
  { icon: 'badge-check', title: 'Réglementée et engagée', text: 'Immatriculée ORIAS, présidente du conseil de surveillance de l\'AFIB.' },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(oriziaSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="home">

        {/* ── HERO ── */}
        <section className="hh">
          <div className="hh-inner">
            <div className="hh-text">
              <p className="hh-eyebrow">
                <span className="hh-eyebrow-dot" aria-hidden="true" />
                Courtier indépendant à Marcq-en-Barœul, certifié ORIAS
              </p>
              <h1 className="hh-title">
                Votre courtier indépendant, de la première question jusqu’à la signature.
              </h1>
              <p className="hh-lead">
                Crédit, assurance, placements : je gère personnellement chaque dossier,
                je mets les banques en concurrence et je défends vos intérêts. Pas les leurs.
              </p>
              <div className="hh-ctas">
                <RdvButton className="fin-btn-primary hh-cta-main">Prendre rendez-vous</RdvButton>
                <a href="tel:+33777259706" className="fin-btn-secondary hh-cta-call">
                  <Icon name="phone" />
                  07 77 25 97 06
                </a>
              </div>
              <p className="hh-reassure">
                Premier échange de 30 minutes, sans engagement. Réponse sous 24 h.
              </p>

              <ul className="hh-proof" aria-label="Garanties">
                <li><Icon name="badge-check" /><span><strong>ORIAS</strong> Intermédiaire immatriculée</span></li>
                <li><Icon name="landmark" /><span><strong>+40</strong> banques et assureurs</span></li>
                <li><Icon name="award" /><span><strong>AFIB</strong> Présidente du conseil de surveillance</span></li>
              </ul>
            </div>

            <div className="hh-visual">
              <svg className="hh-ring" viewBox="0 0 600 600" aria-hidden="true">
                <circle className="hh-ring-a" cx="300" cy="300" r="290" />
                <circle className="hh-ring-b" cx="300" cy="300" r="248" />
              </svg>
              <div className="hh-photo">
                <Image
                  src="/images/hero-cindy-assis.webp"
                  quality={90}
                  alt="Cindy Urbansky, courtier indépendant, à son bureau d'Orizia Courtage"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 900px) 80vw, 480px"
                  style={{ objectFit: 'cover', objectPosition: '50% 30%' }}
                />
              </div>
              <div className="hh-card hh-card--a">
                <span className="hh-card-num">500+</span>
                <span className="hh-card-label">dossiers accompagnés</span>
              </div>
              <div className="hh-card hh-card--b">
                <span className="hh-card-avatar"><img src="/images/avatar-cindy.webp" alt="" width="40" height="40" /></span>
                <span>
                  <strong>Cindy Urbansky</strong>
                  <span>Fondatrice, 20 ans d’expérience</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── PARCOURS : PAR OÙ COMMENCER ── */}
        <section className="hp">
          <div className="hp-inner">
            <div className="hp-head">
              <h2>Par où commence-t-on&nbsp;?</h2>
              <p>Choisissez ce qui vous amène. Je vous montre concrètement comment je peux vous aider.</p>
            </div>
            <HomeSituations />
          </div>
        </section>

        {/* ── CHIFFRES ── */}
        <AnimatedStats />

        {/* ── CITATION CINDY ── */}
        <section className="hq">
          <div className="hq-inner">
            <div className="hq-photo">
              <Image
                src="/images/photo-cindy-gp.webp"
                quality={90}
                alt="Cindy Urbansky, courtier indépendant, Orizia Courtage"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
                sizes="(max-width: 900px) 70vw, 420px"
              />
            </div>
            <div className="hq-content">
              <blockquote className="hq-quote">
                « Je ne travaille pas pour les banques. Je travaille pour vous. »
              </blockquote>
              <p className="hq-text">
                Quand vous me confiez un dossier, je cherche la solution la plus juste
                pour votre situation, pas la plus rapide. Je pose les vraies questions,
                je compare ce qui mérite d’être comparé, et je vous explique chaque choix
                simplement. Pas de jargon, pas de pression.
              </p>
              <div className="hq-sign">
                <strong>Cindy Urbansky</strong>
                <span>Fondatrice d’Orizia Courtage</span>
              </div>
              <div className="hq-ctas">
                <RdvButton className="fin-btn-primary">Parler de mon projet</RdvButton>
                <Link href="/qui-suis-je" className="hq-link">
                  Mon parcours <Icon name="arrow-right" className="oz-arrow" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── LES 3 EXPERTISES ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mes expertises</span>
              <h2>Un seul interlocuteur, trois expertises</h2>
              <p>
                Je traite personnellement chaque dossier, sans déléguer.
                Vous avez un numéro direct, pas un service client.
              </p>
            </div>
            <div className="hx-grid">
              {SERVICES.map(s => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMENT ÇA SE PASSE ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Comment ça se passe</span>
              <h2>Quatre étapes, une seule personne</h2>
              <p>Du premier appel à la signature, vous savez toujours où en est votre dossier.</p>
            </div>
            <HomeSteps steps={ETAPES} />
            <div className="hs4-cta">
              <RdvButton className="fin-btn-primary">Commencer par un échange de 30 min</RdvButton>
            </div>
          </div>
        </section>

        {/* ── POURQUOI ORIZIA ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="hw-grid">
              <div className="hw-visual">
                <BrokerNetwork />
              </div>
              <div className="hw-text">
                <span className="fin-badge">Pourquoi Orizia</span>
                <h2>Le seul courtier à qui vous parlez directement</h2>
                <p className="hw-lead">
                  Je travaille seule, et c’est précisément ce qui fait la différence :
                  c’est moi qui vous réponds, moi qui négocie, moi qui suis votre dossier
                  de la première question à la remise des clés.
                </p>
                <ul className="hw-points">
                  {POURQUOI.map(p => (
                    <li key={p.title}>
                      <span className="hw-point-icon"><Icon name={p.icon} /></span>
                      <span>
                        <strong>{p.title}</strong>
                        {p.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGES ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Ils en parlent</span>
              <h2>Ce que disent mes partenaires</h2>
              <p>Des professionnels de la banque et de l’assurance qui ont travaillé avec moi.</p>
            </div>
            <TemoignagesCarousel />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner hf-grid">
            <div className="hf-head">
              <span className="fin-badge">Questions fréquentes</span>
              <h2>Les questions qu’on me pose le plus souvent</h2>
              <p>Une autre question&nbsp;? Appelez-moi directement, je réponds moi-même.</p>
              <a href="tel:+33777259706" className="hq-link">
                <Icon name="phone" /> 07 77 25 97 06
              </a>
            </div>
            <div className="crowd-faq-list">
              {faqSchema.mainEntity.map((f, i) => (
                <details key={i} className="crowd-faq-item" open={i === 0}>
                  <summary>{f.name}</summary>
                  <p>{f.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="fin-cta">
          <div className="fin-cta-inner">
            <h2>Un échange de 30 minutes. Sans engagement, sans jargon.</h2>
            <p>
              On commence par une conversation simple sur votre situation et vos objectifs.
              Je vous dis franchement ce qui est possible, dans quel délai et pourquoi.
            </p>
            <div className="fin-hero-btns">
              <RdvButton className="fin-btn-primary">Choisir un créneau</RdvButton>
              <ContactPopup label="Autres moyens de me joindre" icon="message-circle" className="fin-btn-secondary" />
            </div>
            <p className="hc-note">
              Réponse sous 24 h · En visio ou à Marcq-en-Barœul · Du lundi au vendredi, 9 h – 18 h
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
