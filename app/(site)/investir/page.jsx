import Link from 'next/link';
import Image from 'next/image';
import AnimatedStats from '@/components/AnimatedStats';
import InvestirQuiz from '@/components/InvestirQuiz';
import InvestirProduitsGrid from '@/components/InvestirProduitsGrid';
import ReadingProgressInvestir from '@/components/ReadingProgressInvestir';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Investir son argent en 2026 : Placements & Patrimoine | Orizia Courtage',
  description:
    'SCPI, Assurance Vie, PER, Crowdfunding : ne laissez plus votre banque limiter vos rendements. Cindy Urbansky, courtière indépendante, crée votre stratégie patrimoniale sur-mesure. Bilan gratuit.',
  alternates: { canonical: 'https://orizia-courtage.fr/investir' },
  openGraph: {
    title: 'Investir son argent en 2026 : Placements & Patrimoine | Orizia Courtage',
    description: 'Ne laissez plus votre argent dormir. Je sélectionne les meilleures SCPI, Assurances Vie et PER du marché pour construire votre patrimoine. Bilan gratuit.',
    url: 'https://orizia-courtage.fr/investir',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/og-investir.jpg',
        width: 1200,
        height: 630,
        alt: 'Investir avec Orizia Courtage - Cindy Urbansky',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES ──
const investirHubSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Investir', item: 'https://orizia-courtage.fr/investir' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Conseil en Stratégie Patrimoniale & Investissement',
      serviceType: 'Gestion de Patrimoine Indépendante',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        image: 'https://orizia-courtage.fr/images/Orizia_logo.webp',
      },
      description: 'Bilan patrimonial, sélection de SCPI, assurance vie, PER et crowdfunding immobilier. Conseil 100% indépendant par Cindy Urbansky, courtière certifiée ORIAS.',
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
        description: 'Bilan patrimonial et conseil 100% gratuits pour le client.',
      },
    },
  ],
};

const ETAPES = [
  {
    n: '01',
    title: 'Je comprends votre situation réelle',
    text: 'Objectifs, horizon, TMI, patrimoine existant — je ne recommande rien avant de comprendre où vous en êtes. Pas de formulaire générique : une vraie conversation.',
  },
  {
    n: '02',
    title: 'Je construis votre stratégie',
    text: 'SCPI, assurance vie, PER, crowdfunding — je sélectionne les produits adaptés à votre profil et je vous explique clairement pourquoi, sans jargon.',
  },
  {
    n: '03',
    title: 'Je gère la souscription',
    text: 'Dossiers, contrats, clauses bénéficiaires — je m\'occupe de toute la partie administrative pour que vous n\'ayez qu\'à valider.',
  },
  {
    n: '04',
    title: 'Je suis votre patrimoine dans la durée',
    text: 'Bilan annuel gratuit, alertes en cas de changement, arbitrages si votre situation évolue. Je reste votre courtière sur le long terme.',
  },
];

const FAQ_INVESTIR = [
  {
    q: 'Pourquoi passer par un courtier indépendant pour investir ?',
    r: 'Un conseiller bancaire ne peut vous proposer que les produits de son établissement. En tant que courtière indépendante, je n\'appartiens à aucun groupe bancaire et j\'accède à l\'ensemble du marché : SCPI, assurances vie haut de gamme, PER compétitifs, plateformes de crowdfunding agréées. Mon seul objectif est de trouver ce qui correspond à votre situation réelle.',
  },
  {
    q: 'Combien coûte un bilan patrimonial avec Orizia Courtage ?',
    r: 'Le bilan patrimonial et l\'accompagnement sont 100% gratuits pour vous. Je suis rémunérée par les sociétés de gestion ou assureurs partenaires sous forme de commission, encadrée par la réglementation DDA et communiquée de manière transparente dès notre premier échange.',
  },
  {
    q: 'Par quel placement commencer quand on débute ?',
    r: 'Cela dépend entièrement de votre situation : horizon, TMI, objectifs et patrimoine existant. En général, l\'assurance vie est un excellent point de départ pour sa flexibilité et sa fiscalité. Le PER est prioritaire si vous êtes fortement imposé. Les SCPI et le crowdfunding viennent en complément. C\'est précisément ce que nous définissons ensemble lors du premier rendez-vous.',
  },
  {
    q: 'Puis-je investir dans plusieurs produits en même temps ?',
    r: 'Absolument, et c\'est même recommandé. Une stratégie patrimoniale solide combine plusieurs placements complémentaires : assurance vie pour la liquidité et la transmission, PER pour l\'avantage fiscal immédiat, SCPI pour les revenus réguliers, crowdfunding pour dynamiser le rendement global. Je construis cette vision globale avec vous.',
  },
  {
    q: 'Mon argent est-il en sécurité ?',
    r: 'Je ne travaille qu\'avec des assureurs et sociétés de gestion agréés par l\'ACPR et l\'AMF. Les fonds en euros des assurances vie sont à capital garanti. Les SCPI sont agréées AMF. Le crowdfunding passe uniquement par des plateformes agréées PSFP. Chaque placement comporte ses propres risques que j\'explique clairement avant toute souscription.',
  },
];

const DIFFERENCIANTS = [
  {
    icon: '🎯',
    title: 'Indépendance totale',
    desc: 'Je n\'appartiens à aucun groupe bancaire. Mon seul intérêt, c\'est de trouver le produit qui sert VOS objectifs — pas ceux de mon employeur.',
    color: 'var(--orizia-primary)',
    bg: 'rgba(45,106,95,0.06)',
  },
  {
    icon: '🔒',
    title: 'Certifiée & réglementée',
    desc: 'Immatriculée ORIAS, contrôlée par l\'ACPR. Mon métier est strictement encadré pour protéger votre capital et vos intérêts.',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.06)',
  },
  {
    icon: '📞',
    title: 'Interlocutrice unique',
    desc: 'Pas de plateforme, pas de turnover. Je gère votre dossier de la première stratégie jusqu\'aux bilans annuels. Vous parlez toujours à Cindy.',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.06)',
  },
  {
    icon: '💶',
    title: '100% gratuit pour vous',
    desc: 'Mon accompagnement est gratuit. Je suis rémunérée par les sociétés de gestion partenaires — sans surcoût pour vous, jamais.',
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.06)',
  },
];

export default function InvestirPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(investirHubSchema) }}
      />

      <main>

        <ReadingProgressInvestir />

        {/* ── HERO ── */}
        <section className="inv-hero">
          <div className="inv-hero-bg-overlay" />
          <div className="inv-hero-inner">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="inv-hero-breadcrumb">
              <Link href="/">Accueil</Link>
              <span className="inv-hero-breadcrumb-sep">›</span>
              <span>Investir</span>
            </nav>

            {/* Contenu principal — 2 colonnes */}
            <div className="inv-hero-layout">
              {/* Gauche — texte */}
              <div className="inv-hero-text">
                <span className="inv-hero-badge">💼 Stratégie patrimoniale indépendante</span>
                <h1 className="inv-hero-title" style={{ color: 'var(--orizia-accent)' }}>
                  Votre argent mérite<br />
                  <em className="inv-hero-em" style={{ color: 'var(--orizia-primary)', fontStyle: 'normal' }}>mieux qu'une banque</em>
                </h1>
                <p className="inv-hero-desc" style={{ color: 'var(--orizia-dark)', opacity: 0.75 }}>
                  SCPI, Assurance Vie, PER, Crowdfunding — j'accède aux meilleurs
                  placements du marché, inaccessibles en banque classique.
                  Je construis votre stratégie patrimoniale sur-mesure.{' '}
                  <strong style={{ color: 'var(--orizia-accent)' }}>Gratuitement.</strong>
                </p>
                <div className="inv-hero-actions">
                  <Link href="/rendez-vous" className="fin-btn-primary inv-hero-cta-main">
                    📅 Bilan patrimonial gratuit
                  </Link>
                  <Link href="#produits" className="inv-hero-cta-ghost" style={{ color: 'var(--orizia-primary)', borderBottomColor: 'rgba(45,106,95,0.3)' }}>
                    Découvrir les placements ↓
                  </Link>
                </div>
                <div className="inv-hero-trust" style={{ borderTopColor: 'rgba(26,61,53,0.1)' }}>
                  <div className="inv-hero-trust-item" style={{ color: 'var(--orizia-dark)', opacity: 0.55 }}>
                    <span className="inv-hero-trust-dot" />
                    Conseil 100% indépendant
                  </div>
                  <div className="inv-hero-trust-item" style={{ color: 'var(--orizia-dark)', opacity: 0.55 }}>
                    <span className="inv-hero-trust-dot" />
                    Accès à tout le marché
                  </div>
                  <div className="inv-hero-trust-item" style={{ color: 'var(--orizia-dark)', opacity: 0.55 }}>
                    <span className="inv-hero-trust-dot" />
                    Réponse sous 24h
                  </div>
                </div>
              </div>

              {/* Droite — quiz */}
              <div className="inv-hero-quiz-wrap">
                <div className="inv-hero-quiz-eyebrow">
                  <span className="inv-hero-quiz-dot" />
                  Trouvez votre placement en 30 secondes
                </div>
                <InvestirQuiz />
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
                  alt="Cindy Urbansky, courtière indépendante en gestion de patrimoine"
                  title="Cindy Urbansky - Orizia Courtage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  sizes="(max-width: 768px) 150px, 180px"
                  priority
                />
              </div>
              <div className="ae-citation-content">
                <p className="ae-citation-quote">
                  « L'erreur la plus courante n'est pas de faire de mauvais placements —
                  c'est de laisser son argent se faire grignoter par l'inflation par peur de mal faire. »
                </p>
                <p className="ae-citation-text">
                  Mon rôle est de démystifier l'investissement. Je filtre les produits toxiques
                  ou trop chargés en frais, et je construis une stratégie qui vous ressemble.
                  En toute indépendance, sans jargon financier.
                </p>
                <span className="ae-citation-author">
                  — Cindy Urbansky, courtière indépendante · Orizia Courtage
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRODUITS ── */}
        <section id="produits" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mes solutions</span>
              <h2>4 placements, une stratégie<br />construite pour vous</h2>
              <p>
                Chaque placement a sa place dans un patrimoine bien structuré.
                Je sélectionne les meilleurs contrats du marché et construis
                l'allocation adaptée à votre profil.
              </p>
            </div>
            <InvestirProduitsGrid />
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Vous ne savez pas par quoi commencer ? C'est normal — c'est précisément
                pour ça que le premier rendez-vous existe.
              </p>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Définir ma stratégie avec Cindy
              </Link>
            </div>
          </div>
        </section>

        {/* ── POURQUOI ORIZIA ── */}
        <section id="section-pourquoi" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="inv-why-layout">
              <div className="inv-why-image">
                <Image
                  src="/images/investir.jpg"
                  alt="Cindy Urbansky, courtière en gestion de patrimoine – Orizia Courtage"
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
                <h2>Ce qui me différencie<br />d'un conseiller bancaire</h2>
                <p>
                  Votre banquier vous vend les produits de son employeur.
                  Moi, je travaille pour vous — et uniquement pour vous.
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
                <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 28 }}>
                  📅 Planifier mon bilan gratuit
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── ÉTAPES ── */}
        <section id="section-etapes" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mon accompagnement</span>
              <h2>Ce que je fais concrètement<br />pour vous, de A à Z</h2>
              <p>Du premier échange au bilan annuel — sans délégation, sans intermédiaire.</p>
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
                  alt="Cindy Urbansky préparant une stratégie patrimoniale pour ses clients"
                  title="Accompagnement patrimonial de A à Z – Orizia Courtage"
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
              <h2>Vos questions sur l'investissement,<br />mes réponses directes</h2>
              <p>Sans jargon. Sans langue de bois. Les vraies réponses.</p>
            </div>
            <div className="crowd-faq-list">
              {FAQ_INVESTIR.map((f, i) => (
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
              <Link href="/contact" className="fin-btn-secondary">
                ✉️ Poser une question à Cindy
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-accent)' }}>
          <div className="fin-cta-inner">
            <h2 style={{ color: 'var(--orizia-white)' }}>
              Prêt à réveiller votre épargne ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>
              Faisons connaissance. Nous analyserons votre patrimoine actuel et définirons
              ensemble une stratégie pour atteindre vos objectifs financiers.
              <strong style={{ color: '#fff' }}> 100% gratuit.</strong>
            </p>
            <div className="fin-hero-btns" style={{ justifyContent: 'center' }}>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Planifier mon bilan gratuit
              </Link>
              <Link href="/contact" className="fin-btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                ✉️ Poser une question
              </Link>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', maxWidth: 540, margin: '24px auto 0' }}>
              L'investissement comporte des risques de perte en capital. Je suis
              immatriculée à l'ORIAS, indépendante.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
