import Link from 'next/link';
import Image from 'next/image';
import ContactPopup from '@/components/ContactPopup';
import ReadingProgressRachatSoulte from '@/components/ReadingProgressRachatSoulte';
import SimulateurSoulte from '@/components/SimulateurSoulte';
import RachatSoulteChecklist from '@/components/RachatSoulteChecklist';
import ScrollButton from '@/components/ScrollButton';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Rachat de Soulte 2026 : Financer le Rachat de Part | Orizia Courtage',
  description:
    'Séparation, divorce ou succession : je finance le rachat de soulte pour que vous conserviez votre bien immobilier. Cindy Urbansky, courtier indépendant dans les Hauts-de-France. Étude gratuite.',
  alternates: { canonical: 'https://orizia-courtage.fr/financer/rachat-soulte' },
  openGraph: {
    title: 'Rachat de Soulte 2026 : Financer le Rachat de Part | Orizia Courtage',
    description: 'Divorce, séparation ou succession : je monte le financement pour que vous puissiez racheter la part de votre co-propriétaire et conserver votre bien. Étude gratuite.',
    url: 'https://orizia-courtage.fr/financer/rachat-soulte',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/og-rachat-soulte.jpg',
        width: 1200,
        height: 630,
        alt: 'Rachat de soulte avec Orizia Courtage - Cindy Urbansky',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES ──
const rachatSoulteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Financer', item: 'https://orizia-courtage.fr/financer' },
        { '@type': 'ListItem', position: 3, name: 'Rachat de Soulte', item: 'https://orizia-courtage.fr/financer/rachat-soulte' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Courtage en Financement de Rachat de Soulte',
      serviceType: 'Courtage en Rachat de Soulte',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        image: 'https://orizia-courtage.fr/images/Orizia_logo.webp',
        telephone: '+33XXXXXXXXX',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Marcq-en-Barœul',
          addressRegion: 'Hauts-de-France',
          addressCountry: 'FR',
        },
      },
      description: 'Montage du financement pour racheter la part d\'un co-propriétaire lors d\'un divorce, d\'une séparation ou d\'une succession. Accès à plus de 40 banques partenaires.',
      areaServed: [
        { '@type': 'State', name: 'Hauts-de-France' },
        { '@type': 'City', name: 'Lille' },
        { '@type': 'City', name: 'Marcq-en-Barœul' },
        { '@type': 'Country', name: 'France' },
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Étude de faisabilité gratuite et sans engagement.',
      },
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu\'est-ce que le rachat de soulte ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le rachat de soulte est l\'opération par laquelle l\'un des co-propriétaires d\'un bien immobilier rachète la part de l\'autre pour devenir seul propriétaire. Il intervient le plus souvent lors d\'un divorce, d\'une séparation de concubins ou d\'une succession. La soulte correspond à la somme versée au co-propriétaire sortant en contrepartie de sa part.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment est calculée la soulte ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La soulte est calculée sur la valeur vénale du bien au moment de la séparation, déduction faite du capital restant dû sur le crédit immobilier en cours. Par exemple : bien estimé à 300 000€, capital restant dû de 100 000€ → valeur nette de 200 000€. Pour une détention à 50/50, la soulte est de 100 000€. Un notaire officialise le calcul et la transaction.',
      },
    },
    {
      '@type': 'Question',
      name: 'Puis-je financer le rachat de soulte avec un crédit ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Le financement du rachat de soulte se fait généralement via un nouveau crédit immobilier qui intègre à la fois le montant de la soulte et le capital restant dû sur le prêt existant. C\'est précisément ce montage que je négocie pour vous auprès de mes partenaires bancaires.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ma banque actuelle est-elle obligée d\'accepter le rachat de soulte ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Non. Votre banque actuelle peut refuser ou proposer des conditions peu avantageuses. En tant que courtier indépendant, je consulte l\'ensemble de mes partenaires bancaires pour trouver l\'établissement qui accepte votre dossier aux meilleures conditions — y compris si votre banque actuelle refuse.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le rôle du notaire dans un rachat de soulte ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le notaire est indispensable : il rédige l\'acte de partage ou de licitation, calcule les droits de partage (2,5% de la valeur nette du bien), et officialise le transfert de propriété. Mon rôle est de monter le financement bancaire en parallèle pour que tout soit prêt le jour de la signature chez le notaire.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte votre accompagnement pour un rachat de soulte ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mon accompagnement est 100% gratuit pour vous. Je suis rémunérée par la banque partenaire chez qui nous signons le financement. L\'étude de faisabilité et le montage du dossier ne vous coûtent rien.',
      },
    },
  ],
};

const ETAPES = [
  {
    n: '01',
    title: 'Estimation du bien et calcul de la soulte',
    text: 'On commence par estimer la valeur du bien (via une agence ou un notaire) et calculer le montant exact de la soulte. Je vous aide à comprendre chaque chiffre avant d\'aller plus loin.',
  },
  {
    n: '02',
    title: 'Analyse de votre capacité de financement',
    text: 'Je vérifie que votre situation financière (revenus, charges, taux d\'endettement) permet de porter seul le nouveau crédit. Si nécessaire, j\'identifie les leviers pour optimiser votre dossier.',
  },
  {
    n: '03',
    title: 'Montage du dossier et mise en concurrence',
    text: 'Je présente votre dossier à mes 40+ partenaires bancaires. Je négocie le taux, les frais de dossier et l\'assurance emprunteur pour minimiser le coût total de l\'opération.',
  },
  {
    n: '04',
    title: 'Coordination avec le notaire',
    text: 'Je travaille en parallèle avec votre notaire pour que le financement soit prêt le jour de la signature de l\'acte de partage. Vous n\'avez pas à gérer les deux fronts en même temps.',
  },
];

const DANGERS = [
  {
    icon: '🏦',
    title: 'Votre banque actuelle n\'est pas votre alliée',
    text: 'La banque qui détient votre crédit actuel a tout intérêt à vous proposer un rachat de soulte à ses propres conditions — souvent peu compétitives. Elle peut aussi refuser si votre profil a évolué. Je mets le marché en concurrence pour vous.',
  },
  {
    icon: '📊',
    title: 'Le taux d\'endettement change tout',
    text: 'Passer de deux revenus à un seul modifie radicalement votre capacité d\'emprunt. Certains dossiers nécessitent une restructuration préalable (regroupement de crédits, optimisation des charges) avant de pouvoir financer la soulte. Je l\'anticipe avec vous.',
  },
  {
    icon: '⏳',
    title: 'Le timing avec le notaire est critique',
    text: 'L\'acte de partage et le financement doivent être synchronisés. Un retard bancaire peut bloquer la procédure et générer des frais supplémentaires. Je coordonne les deux pour éviter tout décalage.',
  },
];

export default function RachatSoultePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rachatSoulteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        <ReadingProgressRachatSoulte />

        {/* ── HERO ── */}
        <section className="fin-hero ae-hero">
          <div className="ae-hero-bg">
            <Image
              src="/images/discret-hero-bg.webp"
              alt=""
              fill
              priority
              quality={75}
              className="hero-image"
              sizes="100vw"
            />
          </div>
          <div className="ae-hero-inner fin-hero-inner">
            <nav aria-label="breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: 16 }}>
              <Link href="/" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Accueil</Link>
              {' › '}
              <Link href="/financer" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Financer</Link>
              {' › '}
              <span>Rachat de Soulte</span>
            </nav>
            <span className="fin-badge">⚖️ Divorce · Séparation · Succession</span>
            <h1 className="ae-hero-title">Rachat de soulte :<br />conservez votre bien, je monte le financement</h1>
            <p className="ae-hero-intro">
              Vous souhaitez racheter la part de votre ex-conjoint ou d'un co-héritier pour rester
              seul propriétaire ? Je monte le financement adapté à votre situation, je négocie
              les meilleures conditions et je coordonne avec votre notaire.{' '}
              <strong>Étude gratuite.</strong>
            </p>
            <div className="ae-hero-btns fin-hero-btns">
              <ContactPopup label="📅 Étudier mon financement" className="fin-btn-primary" />
              <ScrollButton targetId="section-simulateur" className="fin-btn-secondary">
                🧮 Calculer ma soulte
              </ScrollButton>
            </div>
            <div className="ae-hero-trust fin-hero-trust">
              <span>✅ +40 banques comparées</span>
              <span>🤝 Coordination avec votre notaire</span>
              <span>⚡ Réponse sous 24h</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
        <section className="fin-chiffres">
          <div className="ae-chiffres-inner fin-chiffres-inner">
            {[
              { val: '2,5%', label: 'Droits de partage dus au notaire', icon: '📋' },
              { val: '+40', label: 'Banques partenaires comparées', icon: '🏦' },
              { val: '100%', label: 'Gratuit pour vous', icon: '✨' },
              { val: '24h', label: 'Pour une première estimation', icon: '⚡' },
            ].map(c => (
              <div key={c.label} className="fin-chiffre">
                <strong>{c.icon} {c.val}</strong>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CITATION CINDY ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="ae-citation-card">
              <div className="ae-citation-photo">
                <Image
                  src="/images/photo-cindy.webp"
                  alt="Cindy Urbansky, courtier indépendant en rachat de soulte"
                  title="Cindy Urbansky - Orizia Courtage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  sizes="(max-width: 768px) 150px, 180px"
                  priority
                />
              </div>
              <div className="ae-citation-content">
                <p className="ae-citation-quote">
                  « Un rachat de soulte, c'est souvent l'une des opérations les plus stressantes de la vie — parce qu'elle se passe dans un contexte émotionnel difficile. »
                </p>
                <p className="ae-citation-text">
                  Mon rôle est de prendre en charge toute la partie financière pour que vous puissiez vous concentrer sur l'essentiel. Je monte le dossier, je négocie avec les banques, et je coordonne avec votre notaire pour que tout soit prêt à temps. Sans surprise, sans retard.
                </p>
                <span className="ae-citation-author">
Cindy Urbansky, courtier indépendant et fondatrice de Orizia Courtage                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── DÉFINITION ── */}
        <section id="section-definition" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge">Définition</span>
                <h2>Qu'est-ce que le rachat de soulte ?</h2>
                <p>
                  La <strong>soulte</strong> est la somme d'argent qu'un co-propriétaire verse
                  à l'autre pour racheter sa part d'un bien immobilier détenu en commun.
                  Elle intervient dans trois situations principales :
                </p>
                <ul style={{ margin: '16px 0 16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: '0.95rem', color: 'var(--orizia-dark)', lineHeight: 1.6 }}>
                    <strong>Divorce ou séparation</strong> — l'un des conjoints souhaite conserver le logement familial
                  </li>
                  <li style={{ fontSize: '0.95rem', color: 'var(--orizia-dark)', lineHeight: 1.6 }}>
                    <strong>Succession</strong> — un héritier rachète les parts des autres pour devenir seul propriétaire
                  </li>
                  <li style={{ fontSize: '0.95rem', color: 'var(--orizia-dark)', lineHeight: 1.6 }}>
                    <strong>Fin d'indivision</strong> — dissolution d'une SCI ou d'un achat entre amis
                  </li>
                </ul>
                <p>
                  Le montant de la soulte est calculé sur la <strong>valeur vénale actuelle du bien</strong>,
                  déduction faite du capital restant dû sur le crédit immobilier en cours.
                  Un notaire est obligatoire pour officialiser l'opération.
                </p>
              </div>
              <div className="crowd-schema">
                <div style={{ textAlign: 'center', marginBottom: 16, fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--orizia-primary)' }}>
                  Calcul de la soulte
                </div>
                <div className="crowd-schema-step">
                  <div className="crowd-schema-icon">🏠</div>
                  <div className="crowd-schema-text">
                    <strong>Valeur du bien</strong>
                    <span>Estimée par un agent ou un notaire</span>
                  </div>
                </div>
                <div className="crowd-schema-arrow">−</div>
                <div className="crowd-schema-step">
                  <div className="crowd-schema-icon">🏦</div>
                  <div className="crowd-schema-text">
                    <strong>Capital restant dû</strong>
                    <span>Sur le crédit immobilier en cours</span>
                  </div>
                </div>
                <div className="crowd-schema-arrow">÷ 2</div>
                <div className="crowd-schema-step crowd-schema-step--result">
                  <div className="crowd-schema-icon">💰</div>
                  <div className="crowd-schema-text">
                    <strong>Montant de la soulte</strong>
                    <span>À financer par le co-propriétaire rachetant</span>
                  </div>
                </div>
                <div style={{ marginTop: 12, background: 'var(--orizia-light)', borderRadius: 10, padding: '12px 14px', fontSize: '0.78rem', color: 'var(--orizia-dark)', opacity: 0.7 }}>
                  💡 <strong>Exemple :</strong> Bien à 300 000€ · CRD 100 000€ → Valeur nette 200 000€ → Soulte = <strong>100 000€</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SIMULATEUR ── */}
        <section id="section-simulateur" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">🧮 Simulateur</span>
              <h2>Calculez votre soulte<br />en temps réel</h2>
              <p>
                Renseignez les informations de votre bien pour obtenir une estimation immédiate
                du montant à financer et des droits de partage.
              </p>
            </div>
            <SimulateurSoulte />
          </div>
        </section>

        {/* ── DANGERS ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Les pièges à éviter
              </span>
              <h2>Pourquoi ne pas gérer<br />le financement seul</h2>
              <p>Le rachat de soulte cumule complexité bancaire et pression émotionnelle. Voici les 3 erreurs les plus fréquentes.</p>
            </div>
            <div className="ae-probleme-layout">
              <div className="ae-probleme-dangers">
                {DANGERS.map(d => (
                  <div key={d.title} className="crowd-avantage-card" style={{ borderLeft: '4px solid #dc2626' }}>
                    <div className="crowd-avantage-icon">{d.icon}</div>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                ))}
              </div>
              <div className="ae-probleme-image">
                <Image
                  src="/images/banque-pression.webp"
                  alt="Pression bancaire lors d'un rachat de soulte"
                  title="Les pièges du rachat de soulte sans courtier"
                  width={716}
                  height={1024}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── ÉTAPES ── */}
        <section id="section-accompagnement" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mon accompagnement</span>
              <h2>Ce que je fais concrètement<br />pour vous, de A à Z</h2>
              <p>Du calcul de la soulte à la signature chez le notaire — je gère tout le volet financier.</p>
            </div>
            <div className="ae-accompagnement-layout">
              <div className="ae-accompagnement-etapes">
                {ETAPES.map(e => (
                  <div key={e.n} className="ae-etape-row">
                    <div className="fin-etape-num" style={{ flexShrink: 0 }}>{e.n}</div>
                    <div>
                      <h3>{e.title}</h3>
                      <p>{e.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ae-accompagnement-image">
                <Image
                  src="/images/dossier_rachat_soulte.webp"
                  alt="Cindy Urbansky montant un dossier de rachat de soulte"
                  title="Accompagnement rachat de soulte – Orizia Courtage"
                  width={716}
                  height={1024}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="av-gratuit-bloc">
              <div className="av-gratuit-icon">🤝</div>
              <div>
                <strong>Un accompagnement complet, 100% gratuit pour vous</strong>
                <p>
                  Je suis rémunérée par la banque partenaire chez qui nous signons le financement.
                  L'étude de faisabilité, le montage du dossier et la coordination avec votre notaire
                  ne vous coûtent rien.
                </p>
              </div>
              <ContactPopup label="📅 Démarrer" className="fin-btn-primary" style={{ flexShrink: 0 }} />
            </div>
          </div>
        </section>

        {/* ── AUTO-ÉVALUATION ── */}
        <section id="section-autoevaluation" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <RachatSoulteChecklist />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="section-faq" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions sur le rachat de soulte,<br />mes réponses directes</h2>
              <p>Sans jargon. Sans langue de bois.</p>
            </div>
            <div className="crowd-faq-list">
              {faqSchema.mainEntity.map((f, i) => (
                <details key={i} className="crowd-faq-item">
                  <summary>{f.name}</summary>
                  <p>{f.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <ContactPopup label="✉️ Poser une autre question" className="fin-btn-secondary" />
            </div>
          </div>
        </section>

        {/* ── MAILLAGE INTERNE ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Aller plus loin</span>
              <h2>Optimisez l'ensemble<br />de votre situation financière</h2>
            </div>
            <div className="fin-cards fin-cards--light">
              {[
                {
                  href: '/financer/credit-immobilier',
                  icon: '🏠',
                  title: 'Crédit immobilier',
                  sub: 'Votre projet de vie',
                  text: 'Après le rachat de soulte, vous souhaitez renégocier votre crédit ou financer un nouveau projet ? Je m\'occupe de tout.',
                  badge: '🏦 +40 banques comparées',
                  badgeBg: 'rgba(45,106,95,0.1)',
                  badgeColor: 'var(--orizia-primary)',
                  badgeBorder: '1px solid rgba(45,106,95,0.25)',
                  featured: false,
                },
                {
                  href: '/assurer/assurance-emprunteur',
                  icon: '📋',
                  title: 'Assurance emprunteur',
                  sub: 'Réduire le coût de votre prêt',
                  text: 'Le nouveau crédit lié au rachat de soulte est l\'occasion idéale d\'optimiser votre assurance emprunteur et d\'économiser des milliers d\'euros.',
                  badge: '💰 Économisez jusqu\'à 15 000€',
                  badgeBg: 'rgba(201,169,110,0.12)',
                  badgeColor: 'var(--orizia-gold)',
                  badgeBorder: '1px solid rgba(201,169,110,0.3)',
                  featured: true,
                },
                {
                  href: '/financer/regroupement-credits',
                  icon: '🔄',
                  title: 'Regroupement de crédits',
                  sub: 'Alléger vos mensualités',
                  text: 'Si le rachat de soulte alourdit votre endettement, le regroupement de crédits peut réduire vos mensualités globales jusqu\'à 60%.',
                  badge: '📉 Jusqu\'à −60% de mensualités',
                  badgeBg: 'rgba(124,58,237,0.08)',
                  badgeColor: '#7c3aed',
                  badgeBorder: '1px solid rgba(124,58,237,0.2)',
                  featured: false,
                },
              ].map(s => (
                <Link href={s.href} key={s.title} className={`fin-card${s.featured ? ' fin-card--featured' : ''}`}>
                  {s.badge && (
                    <span className="fin-card-pill" style={{ background: s.badgeBg, color: s.badgeColor, border: s.badgeBorder }}>
                      {s.badge}
                    </span>
                  )}
                  <div className="fin-card-icon">{s.icon}</div>
                  <div className="fin-card-sub">{s.sub}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="fin-card-link">Découvrir →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-light)' }}>
          <div className="fin-cta-inner">
            <h2>Prêt(e) à conserver votre bien ?</h2>
            <p>Confiez-moi votre dossier. Je calcule la faisabilité, je monte le financement et je coordonne avec votre notaire pour que tout se passe sans accroc.</p>
            <div className="fin-hero-btns">
              <ContactPopup label="📅 Étudier mon rachat de soulte" className="fin-btn-primary" />
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
              Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
              Je suis immatriculée à l'ORIAS en tant que Mandataire Non Exclusif en Opérations de Banque et Services de Paiement (MOBSP).
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
