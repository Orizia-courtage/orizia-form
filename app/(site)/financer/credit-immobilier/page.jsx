import Link from 'next/link';
import Image from 'next/image';
import ContactPopup from '@/components/ContactPopup';
import CapaciteEmpruntCalc from '@/components/CapaciteEmpruntCalc';
import CreditProjetSelector from '@/components/CreditProjetSelector';
import CreditChecklist from '@/components/CreditChecklist';
import ReadingProgressCredit from '@/components/ReadingProgressCredit';
import ScrollButton from '@/components/ScrollButton';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Crédit Immobilier 2026 : Obtenez le meilleur taux | Orizia Courtage',
  description: 'Achat, construction ou investissement locatif. Je négocie votre taux et votre assurance emprunteur dans les Hauts-de-France. Étude gratuite.',
  alternates: { canonical: 'https://orizia-courtage.fr/financer/credit-immobilier' },
  openGraph: {
    title: 'Crédit Immobilier 2026 : Obtenez le meilleur taux | Orizia Courtage',
    description: 'Ne vous épuisez pas à faire le tour des banques. Je négocie votre crédit immobilier et votre assurance de prêt pour faire baisser le coût total de votre achat.',
    url: 'https://orizia-courtage.fr/financer/credit-immobilier',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/og-credit-immobilier.jpg',
        width: 1200,
        height: 630,
        alt: 'Crédit immobilier avec Orizia Courtage - Cindy Urbansky',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
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
      serviceType: 'Courtage en Crédit Immobilier',
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
      name: 'Pourquoi passer par un courtier plutôt que ma propre banque ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Votre conseiller bancaire ne vous proposera que le taux de SA banque (qui n\'est souvent pas le meilleur). En tant que courtier, j\'interroge tout le marché. Je négocie le taux, je supprime les frais inutiles, et surtout, je vous détache de l\'assurance bancaire hors de prix pour faire baisser le coût total de plusieurs milliers d\'euros.',
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
        <ReadingProgressCredit />

        {/* ── HERO (Avec background) ── */}
        <section className="fin-hero ae-hero">
          <div className="ae-hero-bg">
            <Image
              src="/images/discret-hero-bg.webp"
              alt=""
              fill
              priority
              quality={75}
              sizes="100vw"
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
              <ContactPopup label="📅 Calculer ma capacité d'emprunt" className="fin-btn-primary" />
              <ScrollButton targetId="section-projets" className="fin-btn-secondary">
                🔍 Voir selon mon projet
              </ScrollButton>
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
                  « Trouver la maison de ses rêves est déjà un parcours du combattant. Chercher le financement ne devrait pas l'être. »
                </p>
                <p className="ae-citation-text">
                  Mon métier, c'est de vous enlever toute cette charge mentale bancaire. Vous visitez, vous choisissez, et pendant ce temps, je mets les banques en compétition pour vous obtenir le crédit le moins cher possible. Je suis votre bouclier face aux exigences des banquiers.
                </p>
                <span className="ae-citation-author">
Cindy Urbansky, courtier indépendant et fondatrice de Orizia Courtage                </span>
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
        <section id="section-projets" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Votre situation</span>
              <h2>Un montage financier sur-mesure<br />selon votre projet</h2>
              <p>On ne finance pas sa première résidence principale comme on finance un immeuble de rapport.</p>
            </div>
            <CreditProjetSelector />
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
                <Link href="/assurer/assurance-emprunteur" className="fin-btn-secondary" style={{ display: 'inline-block', marginTop: 16 }}>
                  Comprendre la magie de l'assurance prêt
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
        <section id="section-etapes" className="crowd-section crowd-section--light">
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
                  src="/images/dossier_credit_immobilier.webp"
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

        {/* ── SIMULATEUR CAPACITÉ D'EMPRUNT ── */}
        <section id="section-simulateur" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Estimation rapide</span>
              <h2>Combien pouvez-vous<br />emprunter ?</h2>
              <p>Ajustez vos revenus et la durée pour obtenir une première estimation. Je calcule votre capacité exacte en rendez-vous.</p>
            </div>
            <CapaciteEmpruntCalc />
          </div>
        </section>

        {/* ── OBJECTIONS ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Transparence totale</span>
              <h2>Les a priori sur les courtiers<br />(et ce qu'il en est vraiment)</h2>
            </div>
            <div className="crowd-faq-list">
              {OBJECTIONS.map((o, i) => (
                <details key={i} className="crowd-faq-item">
                  <summary>{o.q}</summary>
                  <p>{o.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── AUTO-ÉVALUATION ── */}
        <section id="section-autoevaluation" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <CreditChecklist />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="section-faq" className="crowd-section crowd-section--light">
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
              <ContactPopup label="✉️ Poser une autre question à Cindy" className="fin-btn-secondary" />
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
            <div className="fin-cards fin-cards--light">
              <Link href="/assurer/assurance-emprunteur" className="fin-card fin-card--featured">
                <span className="fin-card-pill" style={{ background: 'rgba(201,169,110,0.12)', color: 'var(--orizia-gold)', border: '1px solid rgba(201,169,110,0.3)' }}>
                  💰 Économisez jusqu'à 15 000€
                </span>
                <div className="fin-card-icon">📋</div>
                <div className="fin-card-sub">L'économie cachée</div>
                <h3>Assurance Emprunteur</h3>
                <p>Obligatoire avec votre prêt immobilier. Je la négocie pour vous faire économiser des milliers d'euros.</p>
                <span className="fin-card-link">Découvrir →</span>
              </Link>
              <Link href="/assurer/assurance-habitation" className="fin-card">
                <span className="fin-card-pill" style={{ background: 'rgba(217,119,6,0.08)', color: '#d97706', border: '1px solid rgba(217,119,6,0.2)' }}>
                  🏠 Obligatoire avant la remise des clés
                </span>
                <div className="fin-card-icon">🏠</div>
                <div className="fin-card-sub">Protéger votre nouvel achat</div>
                <h3>Assurance Habitation</h3>
                <p>Avant la remise des clés chez le notaire, vous devrez assurer les murs. Je vous trouve la meilleure couverture au juste prix.</p>
                <span className="fin-card-link">Découvrir →</span>
              </Link>
              <Link href="/financer/rachat-soulte" className="fin-card">
                <span className="fin-card-pill" style={{ background: 'rgba(22,163,74,0.08)', color: '#16a34a', border: '1px solid rgba(22,163,74,0.2)' }}>
                  ⚖️ Coordination notaire incluse
                </span>
                <div className="fin-card-icon">⚖️</div>
                <div className="fin-card-sub">Divorce · Séparation · Succession</div>
                <h3>Rachat de soulte</h3>
                <p>Vous souhaitez conserver votre bien en rachetant la part de votre co-propriétaire ? Je monte le financement et coordonne avec votre notaire.</p>
                <span className="fin-card-link">Découvrir →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-light)' }}>
          <div className="fin-cta-inner">
            <h2>Prêt(e) à savoir combien<br />vous pouvez emprunter ?</h2>
            <p>
              Prenez rendez-vous avec moi. On fait le point sur vos revenus, votre apport, 
              et je vous donne une estimation claire et précise pour démarrer vos visites sereinement.
            </p>
            <div className="fin-hero-btns">
              <ContactPopup label="📅 Faire un point ensemble" className="fin-btn-primary" />
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
              Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
              Je suis immatriculée à l'ORIAS en tant que Mandataire Non Exclusif en Opérations de Banque et Services de Paiement (MOBSP).
              L'étude est gratuite et sans engagement.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}