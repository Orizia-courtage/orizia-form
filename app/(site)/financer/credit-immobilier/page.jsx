import Link from 'next/link';
import Image from 'next/image';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Crédit Immobilier 2026 : Obtenez le meilleur taux | Orizia Courtage',
  description: 'Achat, construction ou investissement locatif. Cindy Urbansky, courtière indépendante dans les Hauts-de-France, négocie votre taux et votre assurance emprunteur. Étude gratuite.',
  keywords: [
    'courtier crédit immobilier Hauts-de-France',
    'meilleur taux immobilier 2026',
    'simulation prêt immobilier gratuit',
    'financement achat maison courtier',
    'capacité emprunt courtier indépendant',
    'délégation assurance emprunteur',
    'primo-accédant PTZ 2026',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/financer/credit-immobilier' },
  openGraph: {
    title: 'Crédit Immobilier 2026 : Obtenez le meilleur taux | Orizia Courtage',
    description: 'Ne vous épuisez pas à faire le tour des banques. Je négocie votre crédit immobilier et votre assurance de prêt pour faire baisser le coût total de votre achat.',
    url: 'https://orizia-courtage.fr/financer/credit-immobilier',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/financer.jpg',
        width: 1200,
        height: 630,
        alt: 'Crédit immobilier avec Orizia Courtage - Cindy Urbansky',
      },
    ],
    locale: 'fr_FR',
    type: 'article',
  },
};

// ── 2. DONNÉES STRUCTURÉES ──
const creditImmobilierSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Financer', item: 'https://orizia-courtage.fr/financer' },
        { '@type': 'ListItem', position: 3, name: 'Crédit Immobilier', item: 'https://orizia-courtage.fr/financer/credit-immobilier' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Courtage en Crédit Immobilier',
      serviceType: 'Courtage en Opérations de Banque (COBSP)',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        image: 'https://orizia-courtage.fr/images/Orizia_logo.webp',
      },
      description: 'Négociation du taux, délégation d\'assurance emprunteur, montage du dossier bancaire et accompagnement jusqu\'à la signature chez le notaire. Accès à plus de 40 banques partenaires.',
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
      name: 'Quel est l\'apport personnel minimum pour acheter en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En règle générale, les banques demandent 10% d\'apport. Cela sert à couvrir les "frais de notaire" et les frais de garantie. Emprunter sans apport (à 110%) est devenu très rare, mais reste possible pour certains profils (primo-accédants à fort potentiel, investissement locatif spécifique).',
      },
    },
    {
      '@type': 'Question',
      name: 'Puis-je emprunter si je ne suis pas en CDI ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, c\'est plus complexe mais tout à fait possible. Si vous êtes indépendant, chef d\'entreprise, en CDD ou intérimaire régulier, la banque demandera généralement 3 ans d\'ancienneté ou 3 bilans comptables pour calculer une moyenne de vos revenus sécurisés.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi passer par une courtière plutôt que ma propre banque ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Votre conseiller bancaire ne vous proposera que le taux de SA banque (qui n\'est souvent pas le meilleur). En tant que courtière, j\'interroge tout le marché. Je négocie le taux, je supprime les frais inutiles, et surtout, je vous détache de l\'assurance bancaire hors de prix pour faire baisser le coût total de plusieurs milliers d\'euros.',
      },
    },
    {
      '@type': 'Question',
      name: 'À quel moment dois-je vous contacter ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le plus tôt possible ! L\'idéal est de me contacter avant même de commencer vos visites. Nous calculerons ensemble votre enveloppe exacte (capacité d\'emprunt). Ainsi, quand vous aurez le coup de cœur, vous pourrez faire une offre sereinement, avec une attestation de faisabilité qui rassurera le vendeur.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte votre accompagnement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour la majorité des dossiers de crédit immobilier, mes honoraires de courtage sont transparents et intégrés au plan de financement. Ils sont largement amortis par les économies réalisées sur le taux et l\'assurance. Un premier bilan de faisabilité est 100% gratuit et sans engagement.',
      },
    },
  ],
};

const CHIFFRES = [
  { value: '+40', label: 'Banques partenaires comparées', icon: '🏦' },
  { value: '33%', label: 'Taux d\'endettement maximal légal', icon: '⚖️' },
  { value: '24h', label: 'Pour calculer votre enveloppe', icon: '⚡' },
  { value: '1', label: 'Interlocutrice unique (moi)', icon: '🤝' },
];

const TYPES_PROJETS = [
  {
    icon: '🔑',
    title: 'Primo-accédant',
    desc: 'Votre premier achat immobilier.',
    points: [
      'Calcul du Prêt à Taux Zéro (PTZ)',
      'Accompagnement de A à Z (promesse, notaire)',
      'Pédagogie et vulgarisation bancaire',
      'Optimisation de l\'apport personnel',
    ],
    cta: 'Calculer mon enveloppe',
    color: 'var(--orizia-primary)',
    featured: true,
  },
  {
    icon: '🏢',
    title: 'Investissement locatif',
    desc: 'Construire son patrimoine.',
    points: [
      'Optimisation de l\'effet de levier',
      'Stratégie de déficit foncier ou LMNP',
      'Minimisation de l\'apport demandé',
      'Maintien de votre capacité d\'endettement',
    ],
    cta: 'Financer mon investissement',
    color: '#d97706',
    featured: false,
  },
  {
    icon: '🏡',
    title: 'Achat Revente (Secundo)',
    desc: 'Acheter avant d\'avoir vendu.',
    points: [
      'Mise en place d\'un prêt relais',
      'Gestion de la transition de trésorerie',
      'Négociation des indemnités de remboursement anticipé (IRA)',
      'Financement de la nouvelle résidence',
    ],
    cta: 'Sécuriser ma transition',
    color: '#7c3aed',
    featured: false,
  },
];

const DANGERS = [
  {
    icon: '💔',
    title: 'La loyauté bancaire ne paie pas',
    text: 'C\'est dur à entendre, mais votre banque depuis 15 ans ne vous fera pas le meilleur taux par "gentillesse". Les banques réservent souvent leurs meilleures conditions pour attirer de nouveaux clients. Il faut faire jouer la concurrence.',
  },
  {
    icon: '💸',
    title: 'Le piège de l\'assurance groupe',
    text: 'La banque va accepter de baisser son taux à condition que vous preniez son assurance emprunteur. Ce qu\'elle ne dit pas, c\'est que cette assurance est 2 à 3 fois plus chère que le marché. Mon rôle est de contourner ce piège.',
  },
  {
    icon: '⏳',
    title: 'La perte de temps et d\'énergie',
    text: 'Monter un dossier, prendre RDV avec 4 banques différentes, relancer les conseillers qui ne répondent pas... Faire son crédit seul est un travail à temps plein. Laissez-moi cette charge mentale.',
  },
];

const ETAPES = [
  {
    n: '01',
    title: 'Le Passeport Emprunteur',
    text: 'On se parle. Je définis votre capacité d\'emprunt au centime près. Vous repartez avec une enveloppe claire pour cibler vos visites sans perdre de temps.',
  },
  {
    n: '02',
    title: 'Vous signez le compromis',
    text: 'Dès que vous avez trouvé votre pépite et signé le compromis de vente, je prends le relais. Vous me fournissez vos pièces, je monte un dossier bancaire en béton.',
  },
  {
    n: '03',
    title: 'Je mets les banques au combat',
    text: 'Je présente votre dossier à mes partenaires bancaires. Je négocie le taux (TAEG), les frais de dossier, les pénalités de remboursement anticipé et l\'assurance de prêt.',
  },
  {
    n: '04',
    title: 'L\'accord et le champagne',
    text: 'Je vous présente les meilleures offres. On choisit la banque ensemble. Je vous accompagne jusqu\'au rendez-vous en agence, puis jusqu\'à la signature chez le notaire.',
  },
];

const OBJECTIONS = [
  {
    q: '« Ma banque me connaît, ça ira plus vite avec eux. »',
    r: 'Plus vite, peut-être. Moins cher, c\'est rare. Je dépose d\'ailleurs systématiquement le dossier dans votre propre banque pour qu\'elle doive s\'aligner sur les offres de ses concurrentes. Je l\'oblige à faire un effort.',
  },
  {
    q: '« Un courtier, ça coûte cher. »',
    r: 'C\'est l\'inverse. Les honoraires de courtage sont intégrés dans votre plan de financement. Mais surtout, la baisse du taux et la délégation d\'assurance que je vous obtiens vous font économiser des dizaines de milliers d\'euros sur la durée du prêt.',
  },
  {
    q: '« On m\'a dit que j\'étais limite au niveau de l\'endettement. »',
    r: 'C\'est précisément là que mon expertise intervient. Le calcul du taux d\'endettement (33 ou 35%) peut varier d\'une banque à l\'autre selon la façon dont on présente vos revenus ou si l\'on restructure vos petits crédits en cours.',
  },
  {
    q: '« J\'ai eu un problème de santé, je n\'aurai pas mon prêt. »',
    r: 'Grâce à la loi Lemoine, le questionnaire de santé est supprimé pour les prêts < 200 000€ par personne remboursés avant 60 ans. Et si vous n\'entrez pas dans ce cadre, j\'ai des partenaires assureurs spécialisés dans les risques aggravés.',
  },
];

export default function CreditImmobilierPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creditImmobilierSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              <span>Crédit Immobilier</span>
            </nav>
            <span className="fin-badge">🏡 Votre projet de vie</span>
            <h1 className="ae-hero-title">Le bon crédit n'est pas qu'un taux.<br />C'est une stratégie.</h1>
            <p className="ae-hero-intro">
              Ne vous épuisez pas à faire le tour des banques. Je calcule votre enveloppe,
              <strong> je mets les banques en concurrence </strong> et je négocie les moindres frais
              à votre place. Concentrez-vous sur les cartons, je m'occupe des millions.
            </p>
            <div className="ae-hero-btns fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Calculer ma capacité d'emprunt →
              </Link>
              <Link href="#projets" className="fin-btn-secondary">
                🔍 Voir selon mon projet
              </Link>
            </div>
            <div className="ae-hero-trust fin-hero-trust">
              <span>✅ +40 banques interrogées</span>
              <span>🛡️ Accompagnement jusqu'au notaire</span>
              <span>⚡ Étude de faisabilité en 24h</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
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
                  alt="Cindy Urbansky, courtière indépendante en crédit immobilier"
                  title="Cindy Urbansky - Orizia Courtage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  sizes="(max-width: 768px) 150px, 180px"
                  priority
                />
              </div>
              <div className="ae-citation-content">
                <p className="ae-citation-quote">
                  « Trouver la maison de ses rêves est déjà un parcours du combattant. Chercher le financement ne devrait pas l'être. »
                </p>
                <p className="ae-citation-text">
                  Mon métier, c'est de vous enlever toute cette charge mentale bancaire. Vous visitez, vous choisissez, et pendant ce temps, je mets les banques en compétition pour vous obtenir le crédit le moins cher possible. Je suis votre bouclier face aux exigences des banquiers.
                </p>
                <span className="ae-citation-author">
                  — Cindy Urbansky, courtière indépendante · Orizia Courtage
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── DANGERS DE FAIRE SEUL ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Ce que la banque ne vous dit pas
              </span>
              <h2>Négocier seul son prêt,<br />c'est partir avec un handicap</h2>
              <p>
                Le banquier défend les intérêts de sa banque. Mon travail est de défendre exclusivement les vôtres.
              </p>
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
                  alt="Pression bancaire lors d'une négociation de crédit immobilier"
                  title="Pourquoi négocier seul son crédit est risqué"
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

        {/* ── TYPES DE PROJETS ── */}
        <section id="projets" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Votre situation</span>
              <h2>Un montage financier sur-mesure<br />selon votre projet</h2>
              <p>On ne finance pas sa première résidence principale comme on finance un immeuble de rapport.</p>
            </div>
            <div className="av-profils-grid">
              {TYPES_PROJETS.map(p => (
                <div
                  key={p.title}
                  className={`av-profil-card${p.featured ? ' av-profil-card--featured' : ''}`}
                  style={p.featured ? { borderColor: p.color } : {}}
                >
                  {p.featured && (
                    <div className="av-profil-badge" style={{ background: p.color }}>
                      ⭐ Le plus courant
                    </div>
                  )}
                  <div className="av-profil-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p className="av-profil-desc" style={{ marginBottom: 14 }}>{p.desc}</p>
                  <ul className="ah-profil-points">
                    {p.points.map((pt, i) => (
                      <li key={i}>✅ {pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOCUS LE SECRET D'ORIZIA (TAUX + ASSURANCE) ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}>
                  💡 Le vrai secret d'un bon crédit
                </span>
                <h2>Le taux, c'est l'arbre.<br />L'assurance, c'est la forêt.</h2>
                <p>
                  Tout le monde se bat pour gagner 0,10% sur le taux d'intérêt de la banque. C'est bien. 
                  Mais le vrai levier d'économie se cache dans <strong>l'assurance emprunteur</strong>.
                </p>
                <p>
                  Mon approche est globale : je vous négocie un excellent taux bancaire, ET je remplace 
                  immédiatement l'assurance très coûteuse de la banque par un contrat externe (délégation d'assurance). 
                  Résultat ? <strong>Vous gagnez sur les deux tableaux</strong> et la baisse du coût total de votre achat est massive.
                </p>
                <Link href="/assurer/emprunteur" className="fin-btn-secondary" style={{ display: 'inline-block', marginTop: 16 }}>
                  Comprendre la magie de l'assurance prêt →
                </Link>
              </div>
              <div className="crowd-schema">
                <div style={{ textAlign: 'center', marginBottom: 16, fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--orizia-primary)' }}>
                  La méthode Orizia
                </div>
                <div className="crowd-schema-step" style={{ background: 'rgba(220,38,38,0.08)', border: '1.5px solid rgba(220,38,38,0.2)' }}>
                  <div className="crowd-schema-icon">🏦</div>
                  <strong>Proposition classique (Banque seule)</strong>
                  <span>Bon taux + Assurance hors de prix = Coût élevé</span>
                </div>
                <div className="crowd-schema-arrow">↓</div>
                <div className="crowd-schema-step crowd-schema-step--orizia">
                  <div className="crowd-schema-icon">⚔️</div>
                  <strong>Mon intervention</strong>
                  <span>Mise en concurrence + Séparation de l'assurance</span>
                </div>
                <div className="crowd-schema-arrow">↓</div>
                <div className="crowd-schema-step" style={{ background: 'rgba(22,163,74,0.08)', border: '1.5px solid rgba(22,163,74,0.2)' }}>
                  <div className="crowd-schema-icon">✅</div>
                  <strong>Accord final</strong>
                  <span>Taux au plancher + Assurance divisée par 2</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ACCOMPAGNEMENT (ÉTAPES) ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">De l'idée à la remise des clés</span>
              <h2>On y va étape par étape,<br />je suis à vos côtés</h2>
              <p>Pas de plateforme impersonnelle, pas de changement d'interlocuteur. Je gère votre dossier du début à la fin.</p>
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
                  title="Accompagnement de A à Z pour votre crédit immobilier"
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

        {/* ── OBJECTIONS ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Transparence totale</span>
              <h2>Les a priori sur les courtiers<br />(et ce qu'il en est vraiment)</h2>
            </div>
            <div className="av-objections-grid">
              {OBJECTIONS.map((o, i) => (
                <div key={i} className="av-objection-card">
                  <div className="av-objection-q">{o.q}</div>
                  <div className="av-objection-r">{o.r}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions, mes réponses d'experte</h2>
              <p>L'immobilier est complexe, je m'occupe de le rendre compréhensible.</p>
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
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Vous avez une question spécifique à votre situation ? Je vous réponds sous 24h.
              </p>
              <Link href="/contact" className="fin-btn-secondary">
                ✉️ Poser une autre question à Cindy
              </Link>
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <Link href="/contact" className="fin-btn-secondary">
                ✉️ Poser une question spécifique à Cindy
              </Link>
            </div>
          </div>
        </section>

        {/* ── MAILLAGE INTERNE ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Pendant qu'on y est</span>
              <h2>On sécurise le reste de votre projet ?</h2>
            </div>
            <div className="fin-cards">
              {[
                {
                  href: '/assurer/assurance-emprunteur',
                  icon: '📋',
                  title: 'Assurance Emprunteur',
                  sub: 'L\'économie cachée',
                  text: 'Obligatoire avec votre prêt immobilier. Découvrez comment je la négocie pour vous faire économiser des milliers d\'euros.',
                },
                {
                  href: '/assurer/assurance-habitation',
                  icon: '🏠',
                  title: 'Assurance Habitation',
                  sub: 'Protéger votre nouvel achat',
                  text: 'Avant la remise des clés chez le notaire, vous devrez assurer les murs. Je vous trouve la meilleure couverture au juste prix.',
                },
                {
                  href: '/financer/rachat-soulte',
                  icon: '⚖️',
                  title: 'Rachat de soulte',
                  sub: 'Divorce · Séparation · Succession',
                  text: 'Vous souhaitez conserver votre bien en rachetant la part de votre co-propriétaire ? Je monte le financement et coordonne avec votre notaire.',
                },
              ].map(s => (
                <Link href={s.href} key={s.title} className="fin-card">
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
        <section className="fin-cta">
          <div className="fin-cta-inner">
            <h2>Prêt(e) à savoir combien<br />vous pouvez emprunter ?</h2>
            <p>
              Prenez rendez-vous avec moi. On fait le point sur vos revenus, votre apport, 
              et je vous donne une estimation claire et précise pour démarrer vos visites sereinement.
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Faire un point avec Cindy →
              </Link>
              <Link href="/contact" className="fin-btn-outline">
                ✉️ Lui envoyer un message
              </Link>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
              Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
              Orizia Courtage, immatriculée à l'ORIAS en tant que Mandataire Non Exclusif en Opérations de Banque et Services de Paiement (MOBSP). 
              L'étude est gratuite et sans engagement.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}