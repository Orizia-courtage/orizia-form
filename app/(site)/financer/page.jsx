import Link from 'next/link';
import Image from 'next/image';
import ContactPopup from '@/components/ContactPopup';
import AnimatedStats from '@/components/AnimatedStats';
import FinancerQuiz from '@/components/FinancerQuiz';
import FinancerProduitsGrid from '@/components/FinancerProduitsGrid';
import ReadingProgressFinancer from '@/components/ReadingProgressFinancer';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Courtier en Crédit 2026 : Meilleur Taux Garanti | Orizia Courtage',
  description:
    'Crédit immobilier, regroupement de crédits, prêt personnel, rachat de soulte. Cindy Urbansky, courtier indépendant dans les Hauts-de-France, négocie votre financement auprès de 40+ banques. Étude gratuite.',
  alternates: { canonical: 'https://orizia-courtage.fr/financer' },
  openGraph: {
    title: 'Courtier en Crédit 2026 : Meilleur Taux Garanti | Orizia Courtage',
    description: 'Ne faites plus le tour des banques. Je compare 40+ établissements, négocie votre taux et votre assurance emprunteur. Étude gratuite et sans engagement.',
    url: 'https://orizia-courtage.fr/financer',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/financer.jpg',
        width: 1200,
        height: 630,
        alt: 'Courtier en crédit immobilier Orizia Courtage - Cindy Urbansky',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES ──
const financerHubSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Financer', item: 'https://orizia-courtage.fr/financer' },
      ],
    },
    {
      '@type': 'FinancialService',
      '@id': 'https://orizia-courtage.fr/#financer',
      name: 'Courtage en Crédit et Financement — Orizia Courtage',
      serviceType: 'Courtage en Opérations de Banque et Services de Paiement (COBSP)',
      provider: {
        '@type': 'LocalBusiness',
        '@id': 'https://orizia-courtage.fr/#organization',
        name: 'Orizia Courtage',
        image: 'https://orizia-courtage.fr/images/Orizia_logo.webp',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Marcq-en-Barœul',
          addressRegion: 'Hauts-de-France',
          addressCountry: 'FR',
        },
      },
      description:
        'Négociation de crédit immobilier, regroupement de crédits, prêt personnel et rachat de soulte. Accès à plus de 40 banques et organismes partenaires. Étude de faisabilité gratuite et sans engagement.',
      areaServed: [
        { '@type': 'State', name: 'Hauts-de-France' },
        { '@type': 'City', name: 'Lille' },
        { '@type': 'City', name: 'Marcq-en-Barœul' },
        { '@type': 'Country', name: 'France' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Solutions de financement Orizia Courtage',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'LoanOrCredit', name: 'Crédit immobilier', loanType: 'Mortgage' } },
          { '@type': 'Offer', itemOffered: { '@type': 'LoanOrCredit', name: 'Regroupement de crédits', loanType: 'DebtConsolidation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'LoanOrCredit', name: 'Prêt personnel', loanType: 'PersonalLoan' } },
          { '@type': 'Offer', itemOffered: { '@type': 'LoanOrCredit', name: 'Rachat de soulte', loanType: 'Mortgage' } },
        ],
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Étude de faisabilité et accompagnement complet gratuits. Rémunération par la banque partenaire à la signature.',
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
      name: 'Combien coûte le service d\'un courtier en crédit immobilier ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour la majorité des financements, ma rémunération est prise en charge par la banque chez qui nous signons. Vous ne payez aucun honoraire. L\'étude de faisabilité et l\'accompagnement complet sont 100% gratuits pour vous.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de banques comparez-vous pour mon crédit ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'J\'interroge plus de 40 banques et organismes partenaires pour chaque dossier. Contrairement à votre banque habituelle qui ne peut vous proposer que ses propres offres, je mets l\'ensemble du marché en concurrence pour vous obtenir le meilleur taux et les meilleures conditions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le délai pour obtenir une réponse de principe ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Après notre premier échange et la réception de vos documents, je vous fournis une première estimation sous 24 à 48h. L\'accord de principe bancaire intervient généralement sous 1 à 2 semaines selon la complexité du dossier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mon dossier est-il finançable si j\'ai des crédits en cours ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Avoir des crédits en cours n\'est pas un obstacle en soi. Tout dépend de votre taux d\'endettement global. Si celui-ci est trop élevé, le regroupement de crédits peut être une solution pour le faire baisser avant de monter un nouveau dossier. Je fais le point avec vous lors du premier échange.',
      },
    },
    {
      '@type': 'Question',
      name: 'Puis-je faire appel à vous si ma banque a déjà refusé mon dossier ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, et c\'est même l\'une des situations où je suis le plus utile. Un refus d\'une banque ne signifie pas un refus du marché. Chaque établissement a ses propres critères. Je connais les politiques de crédit de mes 40+ partenaires et je sais vers qui orienter votre dossier selon votre profil.',
      },
    },
    {
      '@type': 'Question',
      name: 'Que se passe-t-il après l\'accord de principe ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Je vous accompagne jusqu\'à la signature de l\'offre de prêt chez le notaire. Je gère les relances bancaires, la négociation de l\'assurance emprunteur, et je vous explique chaque document avant signature. Vous n\'êtes jamais seul(e) face à la banque.',
      },
    },
  ],
};

const ETAPES = [
  {
    n: '01',
    title: 'Le bilan de faisabilité',
    text: 'On analyse ensemble votre capacité d\'emprunt réelle — revenus, charges, apport, taux d\'endettement. Je vous donne une enveloppe précise avant même vos visites.',
  },
  {
    n: '02',
    title: 'Je mets les banques en compétition',
    text: 'Je présente votre dossier à mes 40+ partenaires bancaires. Je négocie le taux, les frais de dossier, les pénalités de remboursement anticipé et l\'assurance emprunteur.',
  },
  {
    n: '03',
    title: 'Je monte le dossier en béton',
    text: 'Pièces justificatives, argumentaire bancaire, mise en valeur de votre profil — je construis un dossier qui maximise vos chances d\'accord aux meilleures conditions.',
  },
  {
    n: '04',
    title: 'Jusqu\'à la signature chez le notaire',
    text: 'Je vous accompagne jusqu\'au bout : relances, offre de prêt, coordination avec le notaire. Vous n\'êtes jamais seul(e) face à la banque.',
  },
];

const DIFFERENCIANTS = [
  {
    icon: '🏦',
    title: '+40 banques comparées',
    desc: 'Votre banque ne vous proposera jamais l\'offre de son concurrent. Moi, je consulte tout le marché pour chaque dossier.',
    color: 'var(--orizia-primary)',
    bg: 'rgba(45,106,95,0.06)',
  },
  {
    icon: '💰',
    title: 'Taux + assurance négociés',
    desc: 'Le vrai levier d\'économie est souvent l\'assurance emprunteur — 2× moins chère hors banque. Je négocie les deux.',
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.06)',
  },
  {
    icon: '📞',
    title: 'Interlocutrice unique',
    desc: 'Pas de centre d\'appels, pas de turnover. Je gère votre dossier du premier échange à la remise des clés.',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.06)',
  },
  {
    icon: '🎯',
    title: '100% gratuit pour vous',
    desc: 'Ma rémunération est prise en charge par la banque partenaire. Vous ne payez aucun honoraire de courtage.',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.06)',
  },
];

const FAQ_FINANCER = faqSchema.mainEntity.map(f => ({ q: f.name, r: f.acceptedAnswer.text }));

export default function FinancerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(financerHubSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main>

        <ReadingProgressFinancer />

        {/* ── HERO SPLIT ── */}
        <section className="inv-hero">
          <div className="inv-hero-bg-overlay" />
          <div className="inv-hero-inner">
            <nav aria-label="breadcrumb" className="inv-hero-breadcrumb">
              <Link href="/">Accueil</Link>
              <span className="inv-hero-breadcrumb-sep">›</span>
              <span>Financer</span>
            </nav>

            <div className="inv-hero-layout">
              {/* Gauche — texte */}
              <div className="inv-hero-text">
                <span className="inv-hero-badge">🏦 Courtage en crédit indépendant</span>
                <h1 className="inv-hero-title" style={{ color: 'var(--orizia-accent)' }}>
                  Votre projet mérite<br />
                  <em className="inv-hero-em" style={{ color: 'var(--orizia-primary)', fontStyle: 'normal' }}>le meilleur taux du marché</em>
                </h1>
                <p className="inv-hero-desc" style={{ color: 'var(--orizia-dark)', opacity: 0.75 }}>
                  Crédit immobilier, regroupement, prêt personnel, rachat de soulte —
                  je compare 40+ banques, négocie chaque dixième de point
                  et vous accompagne jusqu'à la signature.{' '}
                  <strong style={{ color: 'var(--orizia-accent)' }}>Gratuitement.</strong>
                </p>
                <div className="inv-hero-actions">
                  <ContactPopup label="📅 Étude gratuite avec Cindy" className="fin-btn-primary inv-hero-cta-main" />
                  <Link href="#produits" className="inv-hero-cta-ghost" style={{ color: 'var(--orizia-primary)', borderBottomColor: 'rgba(45,106,95,0.3)' }}>
                    Voir mes solutions ↓
                  </Link>
                </div>
                <div className="inv-hero-trust" style={{ borderTopColor: 'rgba(26,61,53,0.1)' }}>
                  <div className="inv-hero-trust-item" style={{ color: 'var(--orizia-dark)', opacity: 0.55 }}>
                    <span className="inv-hero-trust-dot" />
                    +40 banques comparées
                  </div>
                  <div className="inv-hero-trust-item" style={{ color: 'var(--orizia-dark)', opacity: 0.55 }}>
                    <span className="inv-hero-trust-dot" />
                    Réponse sous 24h
                  </div>
                  <div className="inv-hero-trust-item" style={{ color: 'var(--orizia-dark)', opacity: 0.55 }}>
                    <span className="inv-hero-trust-dot" />
                    100% gratuit pour vous
                  </div>
                </div>
              </div>

              {/* Droite — quiz */}
              <div className="inv-hero-quiz-wrap">
                <div className="inv-hero-quiz-eyebrow">
                  <span className="inv-hero-quiz-dot" />
                  Quel financement vous correspond ?
                </div>
                <FinancerQuiz />
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ANIMÉES ── */}
        <AnimatedStats />

        {/* ── CITATION CINDY ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="ae-citation-card">
              <div className="ae-citation-photo">
                <Image
                  src="/images/photo-cindy.webp"
                  alt="Cindy Urbansky, courtier indépendant en crédit immobilier"
                  title="Cindy Urbansky - Orizia Courtage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  sizes="(max-width: 768px) 150px, 180px"
                  priority
                />
              </div>
              <div className="ae-citation-content">
                <p className="ae-citation-quote">
                  « Une banque ne vous proposera jamais l'offre de son concurrent, même si elle est meilleure pour vous. »
                </p>
                <p className="ae-citation-text">
                  Mon rôle est de mettre les banques en compétition pour vous — pas de vous vendre
                  le crédit le plus rapide. Je négocie le taux, l'assurance, les frais de dossier
                  et les pénalités de remboursement anticipé. Chaque ligne du contrat compte.
                </p>
                <span className="ae-citation-author">
Cindy Urbansky, courtier indépendant et fondatrice de Orizia Courtage                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRODUITS ── */}
        <section id="produits" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mes solutions</span>
              <h2>4 financements, un courtier<br />qui défend vos intérêts</h2>
              <p>
                À chaque situation son montage bancaire optimal.
                Je vous oriente vers la solution la plus économique pour votre profil.
              </p>
            </div>
            <FinancerProduitsGrid />
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Vous ne savez pas par où commencer ? C'est précisément pour ça que le premier échange existe.
              </p>
              <ContactPopup label="📅 Faire le point avec Cindy" className="fin-btn-primary" />
            </div>
          </div>
        </section>

        {/* ── POURQUOI ORIZIA ── */}
        <section id="section-pourquoi" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="inv-why-layout">
              <div className="inv-why-image">
                <Image
                  src="/images/financer.jpg"
                  alt="Cindy Urbansky, courtier indépendant en crédit immobilier – Orizia Courtage"
                  width={600}
                  height={480}
                  style={{ objectFit: 'cover', borderRadius: 20, width: '100%', height: 'auto' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="inv-why-image-badge">
                  <span className="inv-why-image-badge-icon">🏆</span>
                  <div>
                    <div className="inv-why-image-badge-val">15 ans</div>
                    <div className="inv-why-image-badge-label">d'expérience</div>
                  </div>
                </div>
              </div>
              <div className="inv-why-content">
                <span className="fin-badge">Pourquoi Orizia ?</span>
                <h2>Ce qui me différencie<br />de votre conseiller bancaire</h2>
                <p>
                  Votre banquier défend les intérêts de sa banque.
                  Moi, je travaille exclusivement pour vous — sans quota, sans conflit d'intérêts.
                </p>
                <div className="inv-why-grid">
                  {DIFFERENCIANTS.map(d => (
                    <div key={d.title} className="inv-why-item" style={{ background: d.bg }}>
                      <div className="inv-why-item-icon" style={{ color: d.color }}>{d.icon}</div>
                      <div>
                        <div className="inv-why-item-title" style={{ color: d.color }}>{d.title}</div>
                        <div className="inv-why-item-desc">{d.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <ContactPopup label="📅 Me confier mon dossier" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 28 }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── ÉTAPES ── */}
        <section id="section-etapes" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mon engagement</span>
              <h2>De votre premier échange<br />à la remise des clés</h2>
              <p>Faire un crédit est un parcours du combattant. Mon rôle est de vous en décharger complètement.</p>
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
                  src="/images/dossier-courtage.webp"
                  alt="Cindy Urbansky montant un dossier de crédit immobilier"
                  title="Accompagnement de A à Z – Orizia Courtage"
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

        {/* ── FAQ ── */}
        <section id="section-faq" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions sur le financement,<br />mes réponses directes</h2>
              <p>Sans jargon. Sans langue de bois. Les vraies réponses.</p>
            </div>
            <div className="crowd-faq-list">
              {FAQ_FINANCER.map((f, i) => (
                <details key={i} className="crowd-faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.r}</p>
                </details>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Vous avez une question spécifique à votre situation ? Je vous réponds sous 24h.
              </p>
              <ContactPopup label="✉️ Poser une question à Cindy" className="fin-btn-secondary" />
            </div>
          </div>
        </section>

        {/* ── MAILLAGE INTERNE ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Vision globale</span>
              <h2>Votre financement est bouclé ?<br />Optimisons le reste.</h2>
              <p>Un crédit bien négocié est un bon début. Voici comment aller encore plus loin.</p>
            </div>
            <div className="fin-cards fin-cards--light">
              {[
                {
                  href: '/assurer/assurance-emprunteur',
                  icon: '📋',
                  title: 'Assurance Emprunteur',
                  sub: 'L\'économie cachée de votre crédit',
                  text: 'L\'assurance emprunteur représente jusqu\'à 40% du coût total de votre crédit. Je la négocie pour vous faire économiser jusqu\'à 15 000€.',
                  badge: '💰 Jusqu\'à 15 000€ d\'économies',
                },
                {
                  href: '/investir/assurance-vie',
                  icon: '🛡️',
                  title: 'Assurance Vie',
                  sub: 'Épargner en parallèle',
                  text: 'Même en remboursant un crédit, il est vital de se constituer une épargne. L\'assurance vie est l\'enveloppe idéale pour faire fructifier votre surplus mensuel.',
                  badge: null,
                },
                {
                  href: '/investir/per',
                  icon: '🏦',
                  title: 'Plan Épargne Retraite',
                  sub: 'Réduire vos impôts',
                  text: 'Vous remboursez un crédit et payez des impôts ? Le PER vous permet de déduire vos versements de votre revenu imposable dès cette année.',
                  badge: null,
                },
              ].map(s => (
                <Link href={s.href} key={s.title} className={`fin-card${s.badge ? ' fin-card--featured' : ''}`}>
                  {s.badge && (
                    <span className="fin-card-pill" style={{ background: 'rgba(201,169,110,0.12)', color: 'var(--orizia-gold)', border: '1px solid rgba(201,169,110,0.3)' }}>
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
            <h2>
              Prêt(e) à obtenir<br />le meilleur taux du marché ?
            </h2>
            <p>
              Confiez-moi votre dossier. Je compare 40+ banques, négocie chaque condition
              et vous accompagne jusqu'à la signature.{' '}
              <strong>100% gratuit.</strong>
            </p>
            <div className="fin-hero-btns" style={{ justifyContent: 'center' }}>
              <ContactPopup label="📅 Lancer mon étude gratuite" className="fin-btn-primary" />
              <ContactPopup label="✉️ Poser une question" className="fin-btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }} />
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', maxWidth: 540, margin: '24px auto 0' }}>
              Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
              Orizia Courtage, immatriculée à l'ORIAS, intervient en qualité de Mandataire Non Exclusif en Opérations de Banque et Services de Paiement (MOBSP).
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
