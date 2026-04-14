import Link from 'next/link';
import Image from 'next/image';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Investir son argent en 2026 : Placements & Patrimoine | Orizia Courtage',
  description:
    'SCPI, Assurance Vie, PER, Crowdfunding : ne laissez plus votre banque limiter vos rendements. Cindy Urbansky, courtière indépendante, crée votre stratégie patrimoniale sur-mesure. Bilan gratuit.',
  keywords: [
    'conseiller en gestion de patrimoine indépendant',
    'investir son argent 2026',
    'meilleur placement SCPI',
    'optimiser assurance vie courtier',
    'comparatif PER retraite',
    'crowdfunding immobilier conseil',
    'courtier indépendant Hauts-de-France',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/investir' },
  openGraph: {
    title: 'Investir son argent en 2026 : Placements & Patrimoine | Orizia Courtage',
    description: 'Ne laissez plus votre argent dormir. Je sélectionne les meilleures SCPI, Assurances Vie et PER du marché pour construire votre patrimoine. Bilan gratuit.',
    url: 'https://orizia-courtage.fr/investir',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/investir.jpg',
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
      description:
        'Bilan patrimonial, sélection de SCPI, assurance vie, PER et crowdfunding immobilier. Conseil 100% indépendant par Cindy Urbansky, courtière certifiée ORIAS.',
      areaServed: [
        { '@type': 'State', name: 'Hauts-de-France' },
        { '@type': 'City', name: 'Lille' },
        { '@type': 'City', name: 'Marcq-en-Barœul' },
        { '@type': 'Country', name: 'France' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Solutions d\'investissement Orizia',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'SCPI (Immobilier de rendement)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Assurance Vie (Épargne & transmission)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Plan Épargne Retraite (PER)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Crowdfunding Immobilier' } },
        ],
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Bilan patrimonial et conseil 100% gratuits pour le client.',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Pourquoi passer par un courtier indépendant pour investir ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Un conseiller bancaire ne peut vous proposer que les produits de son établissement. En tant que courtière indépendante, je n\'appartiens à aucun groupe bancaire et j\'accède à l\'ensemble du marché : SCPI, assurances vie haut de gamme, PER compétitifs, plateformes de crowdfunding agréées. Mon seul objectif est de trouver ce qui correspond à votre situation réelle.',
          },
        },
        {
          '@type': 'Question',
          name: 'Combien coûte un bilan patrimonial avec Orizia Courtage ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le bilan patrimonial et l\'accompagnement sont 100% gratuits pour vous. Je suis rémunérée par les sociétés de gestion ou assureurs partenaires sous forme de commission, encadrée par la réglementation DDA et communiquée de manière transparente dès notre premier échange.',
          },
        },
        {
          '@type': 'Question',
          name: 'Par quel placement commencer quand on débute ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cela dépend entièrement de votre situation : horizon, TMI, objectifs et patrimoine existant. En général, l\'assurance vie est un excellent point de départ pour sa flexibilité et sa fiscalité. Le PER est prioritaire si vous êtes fortement imposé. Les SCPI et le crowdfunding viennent en complément. C\'est précisément ce que nous définissons ensemble lors du premier rendez-vous.',
          },
        },
      ],
    },
  ],
};

const PRODUITS = [
  {
    href: '/investir/scpi',
    icon: '🏢',
    title: 'SCPI',
    sub: 'L\'immobilier sans contrainte',
    desc: 'Investissez dans l\'immobilier professionnel (bureaux, santé, logistique) et touchez des loyers réguliers, sans aucune gestion locative de votre côté.',
    tag: 'Rendement régulier',
    tagColor: 'var(--orizia-primary)',
  },
  {
    href: '/investir/assurance-vie',
    icon: '🛡️',
    title: 'Assurance Vie',
    sub: 'Le couteau suisse du patrimoine',
    desc: 'Oubliez les fonds en euros moribonds de votre banque. Je construis une allocation sur-mesure (fonds garantis + unités de compte) pour dynamiser votre capital.',
    tag: 'Liquidité & Transmission',
    tagColor: 'var(--orizia-accent)',
  },
  {
    href: '/investir/per',
    icon: '🏦',
    title: 'PER',
    sub: 'Défiscaliser pour la retraite',
    desc: 'Transformez vos impôts en patrimoine. C\'est le seul placement qui vous fait gagner de l\'argent l\'année même de votre versement grâce à la déduction fiscale.',
    tag: 'Réduction d\'impôt',
    tagColor: '#b45309',
  },
  {
    href: '/investir/crowdfunding',
    icon: '📈',
    title: 'Crowdfunding',
    sub: 'Le boost à court terme',
    desc: 'Financez des opérations de promotion immobilière triées sur le volet. L\'objectif ? Viser un rendement élevé sur une durée courte (12 à 36 mois).',
    tag: 'Dynamique',
    tagColor: '#0369a1',
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

const CHIFFRES = [
  { value: '+500', label: 'Clients accompagnés', icon: '🤝' },
  { value: '15 ans', label: "D'expérience en finance", icon: '🏆' },
  { value: '100%', label: 'Indépendante', icon: '🎯' },
  { value: '0€', label: 'De frais pour vous', icon: '✨' },
];

const POURQUOI = [
  { icon: '🎯', title: 'Indépendance totale', desc: 'Je n\'appartiens à aucun groupe bancaire. Mon seul intérêt, c\'est de trouver le produit qui sert VOS objectifs.' },
  { icon: '🔒', title: 'Sécurité absolue', desc: 'Certifiée ORIAS et contrôlée par l\'ACPR, mon métier est strictement encadré pour protéger votre capital.' },
  { icon: '📞', title: 'Interlocutrice unique', desc: 'Pas de plateforme ni de turnover. Je gère votre dossier de la première stratégie jusqu\'aux bilans annuels.' },
  { icon: '💶', title: 'Zéro honoraire', desc: 'Mon accompagnement est gratuit pour vous. Je suis rémunérée par les sociétés de gestion partenaires, sans surcoût.' },
];

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

export default function InvestirPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(investirHubSchema) }}
      />

      <main>

        {/* ── HERO (Avec background) ── */}
        <section className="fin-hero ae-hero">
          <div className="ae-hero-bg">
            <Image
              src="/images/discret-hero-bg.webp"
              alt=""
              fill
              priority
              quality={80}
              className="hero-image"
              sizes="100vw"
            />
          </div>
          <div className="ae-hero-inner fin-hero-inner">
            <span className="fin-badge">💼 Investissement & Stratégie Patrimoniale</span>
            <h1 className="ae-hero-title">
              Ne laissez plus votre banque<br />décider du sort de votre épargne
            </h1>
            <p className="ae-hero-intro">
              En tant que courtière indépendante, j'analyse votre situation et je vous donne
              accès aux meilleurs placements du marché, inaccessibles dans une banque classique.{' '}
              <strong>Gratuitement.</strong>
            </p>
            <div className="ae-hero-btns fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Faire un bilan patrimonial gratuit →
              </Link>
              <Link href="/contact" className="fin-btn-secondary">
                Poser une question
              </Link>
            </div>
            <div className="ae-hero-trust fin-hero-trust">
              <span>✅ Conseil 100% indépendant</span>
              <span>🏦 Accès à tout le marché</span>
              <span>⚡ Réponse sous 24h</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS (Avec icônes) ── */}
        <section className="fin-chiffres">
          <div className="ae-chiffres-inner fin-chiffres-inner">
            {CHIFFRES.map(c => (
              <div key={c.label} className="fin-chiffre">
                <strong>{c.icon} {c.value}</strong>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CITATION CINDY (Avec photo) ── */}
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
                  « L'erreur la plus courante n'est pas de faire de mauvais placements, c'est de laisser son argent se faire grignoter par l'inflation par peur de mal faire. »
                </p>
                <p className="ae-citation-text">
                  Mon rôle est de démystifier l'investissement. Je vous explique clairement où va votre argent,
                  je filtre les produits toxiques ou trop chargés en frais de votre banque, et je construis
                  une stratégie qui vous ressemble. En toute indépendance, et sans aucun jargon financier.
                </p>
                <span className="ae-citation-author">
                  — Cindy Urbansky, courtière indépendante · Orizia Courtage
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRODUITS (Grille 4 colonnes responsive) ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mes solutions</span>
              <h2>Mes solutions d'investissement</h2>
              <p>Je sélectionne rigoureusement chaque fonds pour vous offrir le meilleur rapport rendement / risque.</p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 20,
            }}
              className="investir-produits-grid"
            >
              {PRODUITS.map(p => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="investir-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 24,
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 16,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: 12 }}>{p.icon}</div>
                  <span style={{
                    display: 'inline-block', background: p.tagColor, color: '#fff',
                    fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px',
                    borderRadius: 100, marginBottom: 10, letterSpacing: 0.5,
                  }}>
                    {p.tag}
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--orizia-accent)', marginBottom: 4 }}>{p.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--orizia-primary)', fontWeight: 600, marginBottom: 10 }}>{p.sub}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--orizia-dark)', opacity: 0.75, lineHeight: 1.55, flex: 1 }}>{p.desc}</p>
                  <div style={{ marginTop: 16, fontSize: '0.85rem', fontWeight: 700, color: 'var(--orizia-primary)' }}>
                    Découvrir cette solution →
                  </div>
                </Link>
              ))}
            </div>
            <style>{`
              @media (max-width: 900px) {
                .investir-produits-grid { grid-template-columns: repeat(2, 1fr) !important; }
              }
              @media (max-width: 500px) {
                .investir-produits-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, fontStyle: 'italic' }}>
                Vous ne savez pas par quoi commencer ? C'est normal. Discutons-en lors d'un premier échange.
              </p>
            </div>
          </div>
        </section>

        {/* ── POURQUOI ORIZIA (Avec image) ── */}
        <section className="fin-why">
          <div className="fin-section-inner fin-why-inner">
            <div className="fin-why-text">
              <span className="fin-badge">Pourquoi Orizia ?</span>
              <h2>Pourquoi investir<br />à mes côtés ?</h2>
              <p>
                Le monde de la finance est complexe. Je simplifie les processus et je m'assure
                que vos intérêts passent toujours en premier.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
                {POURQUOI.map(item => (
                  <div key={item.title} style={{ padding: 20, background: 'var(--orizia-light)', borderRadius: 12 }}>
                    <div style={{ fontSize: '1.6rem', marginBottom: 10 }}>{item.icon}</div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--orizia-accent)', marginBottom: 6 }}>{item.title}</h4>
                    <p style={{ fontSize: '0.83rem', color: 'var(--orizia-dark)', opacity: 0.75, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 28 }}>
                📅 Planifier mon bilan gratuit →
              </Link>
            </div>
            <div className="fin-why-image">
              <Image
                src="/images/investir.jpg"
                alt="Cindy Urbansky, courtière en gestion de patrimoine – Orizia Courtage"
                width={520}
                height={420}
                style={{ objectFit: 'cover', borderRadius: 20, width: '100%', height: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              />
            </div>
          </div>
        </section>

        {/* ── ÉTAPES (ae-accompagnement-layout) ── */}
        <section className="crowd-section crowd-section--light">
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
        <section className="crowd-section crowd-section--light">
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
              <Link href="/contact" className="fin-btn-secondary">
                ✉️ Poser une autre question à Cindy
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="fin-cta">
          <div className="fin-cta-inner">
            <h2>Prêt à réveiller votre épargne ?</h2>
            <p>
              Faisons connaissance. Nous analyserons votre patrimoine actuel et définirons ensemble
              une stratégie pour atteindre vos objectifs financiers.
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Planifier mon bilan gratuit →
              </Link>
              <Link href="/contact" className="fin-btn-outline">
                ✉️ Poser une question à Cindy
              </Link>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
              L'investissement comporte des risques de perte en capital. Orizia Courtage, cabinet indépendant immatriculé à l'ORIAS.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
