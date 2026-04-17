import Link from 'next/link';
import Image from 'next/image';
import GarantiesCarousel from '@/components/GarantiesCarousel';
import ProfilHabitationSelector from '@/components/ProfilHabitationSelector';
import HabitationChecklist from '@/components/HabitationChecklist';
import ReadingProgressHabitation from '@/components/ReadingProgressHabitation';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Assurance Habitation 2026 : Baissez la facture à Lille & Hauts-de-France | Orizia Courtage',
  description:
    'Hausse des tarifs habitation en 2026. Cindy Urbansky, courtière dans les Hauts-de-France, compare les offres MRH, ajuste vos garanties et gère la résiliation via la loi Hamon. Gratuit.',
  alternates: { canonical: 'https://orizia-courtage.fr/assurer/assurance-habitation' },
  openGraph: {
    title: 'Assurance Habitation 2026 : Baissez la facture | Orizia Courtage',
    description: 'Ne subissez pas l\'inflation. Je compare le marché, ajuste vos garanties et résilie votre ancien contrat via la loi Hamon, sans coupure. Gratuit et indépendant.',
    url: 'https://orizia-courtage.fr/assurer/assurance-habitation',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/og-assurance-habitation.jpg',
        width: 1200,
        height: 630,
        alt: 'Comparaison et courtage en assurance habitation avec Orizia',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES ──
const assuranceHabitationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Assurer', item: 'https://orizia-courtage.fr/assurer' },
        { '@type': 'ListItem', position: 3, name: 'Assurance Habitation', item: 'https://orizia-courtage.fr/assurer/assurance-habitation' }
      ]
    },
    {
      '@type': 'Service',
      name: "Courtage et Comparaison d'Assurance Habitation (MRH)",
      serviceType: 'Assurance Habitation (MRH, Locataire, Propriétaire, PNO)',
      description:
        "Service d'optimisation, de comparaison et de souscription d'assurance habitation pour locataires, propriétaires et PNO. Prise en charge de la résiliation via la loi Hamon.",
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        image: 'https://orizia-courtage.fr/images/Orizia_logo.webp',
      },
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
        description: 'Analyse de vos garanties, comparaison des devis et gestion administrative de la résiliation 100% gratuites pour l\'assuré.',
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
      name: "L'assurance habitation est-elle obligatoire en 2026 ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pour les locataires, oui, c'est une obligation légale stricte (loi de 1989) pour couvrir au moins les risques locatifs. Pour les propriétaires occupants, ce n'est obligatoire qu'en copropriété. Cependant, ne pas s'assurer, c'est prendre le risque d'assumer seul des centaines de milliers d'euros de frais en cas d'incendie affectant les voisins.",
      },
    },
    {
      '@type': 'Question',
      name: "Combien coûte une assurance habitation aujourd'hui ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Avec les risques climatiques, les prix grimpent de 6 à 8% en 2026. Comptez en moyenne 160€/an pour un locataire en T2, et de 170€ à 380€/an pour un propriétaire selon la maison. Mon travail consiste justement à aller chercher des tarifs inférieurs à ces moyennes de marché.",
      },
    },
    {
      '@type': 'Question',
      name: "Changer de contrat, c'est compliqué ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, grâce à la loi Hamon, vous êtes libre de partir quand vous voulez après 1 an de contrat, sans frais. Et surtout : c'est moi qui rédige et envoie la lettre de résiliation à votre ancien assureur. Vous n'avez rien à faire et il n'y a aucune coupure de couverture.",
      },
    },
    {
      '@type': 'Question',
      name: "Quelle est la différence entre locataire, propriétaire occupant et PNO ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le locataire assure ses meubles et sa responsabilité. Le propriétaire occupant assure en plus les murs de la maison. Le PNO (Propriétaire Non-Occupant) est pour les investisseurs : il couvre les murs et la responsabilité du bailleur quand le logement est vide ou en complément de l'assurance du locataire.",
      },
    },
    {
      '@type': 'Question',
      name: "Pourquoi passer par une courtière indépendante ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Votre banquier vous propose \"son\" produit. Moi, je vous propose \"le\" produit du marché le plus adapté à votre logement, en comparant des dizaines d'offres. Je chasse les garanties inutiles, je négocie le prix, et je suis votre interlocutrice unique tout au long de la vie du contrat. Le tout, gratuitement pour vous.",
      },
    },
  ],
};




const CHIFFRES = [
  { value: '+7%', label: 'Hausse moyenne subie en 2026', icon: '📈' },
  { value: '250€', label: 'Économie annuelle possible', icon: '💰' },
  { value: '1 an', label: 'Délai pour changer librement', icon: '🔓' },
  { value: '0 effort', label: 'Je gère la résiliation', icon: '⚡' },
];

const GARANTIES = [
  {
    icon: '🔥',
    label: 'Incendie & Explosions',
    obligatoire: true,
    desc: 'La base absolue. Couvre la destruction de votre logement et de vos biens suite à un incendie ou un court-circuit majeur.',
  },
  {
    icon: '💧',
    label: 'Dégâts des eaux',
    obligatoire: true,
    desc: 'Le sinistre n°1 en France. Fuite, canalisation rompue ou infiltration : je vérifie toujours les plafonds d\'indemnisation.',
  },
  {
    icon: '🛡️',
    label: 'Responsabilité civile',
    obligatoire: true,
    desc: 'Vous blessez quelqu\'un ou vous cassez un objet chez des amis ? Cette garantie prend le relais pour toute votre famille.',
  },
  {
    icon: '🌪️',
    label: 'Catastrophes naturelles',
    obligatoire: true,
    desc: 'Inondations, sécheresse, tempêtes. Avec la taxe qui passe à 20%, c\'est le moment de comparer pour absorber cette hausse.',
  },
  {
    icon: '🔒',
    label: 'Vol & Vandalisme',
    obligatoire: false,
    desc: 'Souvent en option. Attention aux contrats qui imposent des serrures complexes ou excluent les objets de valeur.',
  },
  {
    icon: '🪟',
    label: 'Bris de glace',
    obligatoire: false,
    desc: 'Fenêtres, plaques vitrocéramiques, miroirs. Utile, mais il faut s\'assurer que la franchise ne soit pas supérieure au prix de la vitre.',
  },
  {
    icon: '⚖️',
    label: 'Protection juridique',
    obligatoire: false,
    desc: 'Litige avec un voisin, un artisan ou le syndic ? Vos frais d\'avocat sont pris en charge. Un vrai bouclier au quotidien.',
  },
  {
    icon: '💻',
    label: 'Dommages Électriques',
    obligatoire: false,
    desc: 'La foudre grille votre frigo et votre TV ? Cette option (souvent ignorée) vous sauve la mise. Idéal pour le télétravail.',
  },
];

const DANGERS = [
  {
    icon: '📈',
    title: 'La hausse silencieuse chaque année',
    text: 'En 2026, l\'assurance habitation prend +7% en moyenne. Si vous êtes chez le même assureur depuis 5 ans, vous payez probablement 30% de trop pour les mêmes garanties.',
  },
  {
    icon: '📋',
    title: 'La sous-assurance, un piège au moment du sinistre',
    text: 'Si vous avez déclaré 20 000€ de meubles mais que vous en avez 40 000€ suite à des rachats, l\'assureur réduira votre indemnisation de moitié. Je m\'assure que votre contrat colle à la réalité.',
  },
  {
    icon: '🔍',
    title: 'Les petites lignes qui font mal',
    text: '"Cave non couverte", "franchise vol de 800€", "vétusté déduite"... Les contrats ultra-low-cost d\'internet sont pleins de trous. Je décortique tout avant de vous faire signer.',
  },
];

const ETAPES = [
  {
    n: '01',
    title: 'On fait connaissance',
    text: 'Je veux comprendre votre logement : sa surface, vos objets de valeur, si vous avez une cheminée ou un chien catégorisé. Pas de robot, on en discute.',
  },
  {
    n: '02',
    title: 'Je fouille le marché',
    text: 'Je consulte mes partenaires (Cardif, SwissLife, Abeille...) et je vous présente les 2 ou 3 meilleures options, en vous expliquant clairement pourquoi.',
  },
  {
    n: '03',
    title: 'Je vire l\'ancien contrat',
    text: 'Dès qu\'on valide ensemble, je me charge de résilier votre contrat actuel (Loi Hamon). Vous n\'envoyez aucun courrier, je fais la transition sans trou de garantie.',
  },
  {
    n: '04',
    title: 'Un suivi qui dure',
    text: 'Vous faites une véranda ? Vous achetez un vélo électrique cher ? Vous m\'appelez, et j\'ajuste le contrat. Vous n\'êtes plus jamais un numéro.',
  },
];

const OBJECTIONS = [
  {
    q: '« Je n\'ai pas le temps de m\'occuper de la paperasse. »',
    r: 'C\'est l\'argument n°1 de mes clients ! C\'est exactement pour cela que je fais tout à votre place. La loi Hamon m\'autorise à résilier votre contrat pour vous. Votre seule action ? Me dire "oui".',
  },
  {
    q: '« Je suis chez mon banquier, c\'est plus simple pour les prélèvements. »',
    r: 'C\'est simple, mais c\'est très cher. Les banques facturent souvent la "praticité" au prix fort. Changer avec moi vous prend 15 minutes et vous fait économiser des centaines d\'euros sur le long terme.',
  },
  {
    q: '« Est-ce que vos contrats couvrent aussi bien ? »',
    r: 'Souvent mieux ! Mon indépendance me permet de fuir les contrats "bas de gamme" bourrés d\'exclusions. Je ne vous propose que des assureurs solides avec qui j\'ai l\'habitude de travailler en cas de sinistre.',
  },
  {
    q: '« Et si j\'ai un dégât des eaux demain ? »',
    r: 'Je m\'assure toujours que les dates se chevauchent parfaitement. À minuit le contrat A s\'arrête, à minuit et une seconde le contrat B prend le relais. Vous n\'êtes jamais à découvert.',
  },
];

const LOI_HAMON_POINTS = [
  {
    icon: '🔄',
    title: 'Départ libre',
    desc: 'Après 1 an d\'ancienneté, vous n\'êtes plus prisonnier. Vous partez quand bon vous semble.',
  },
  {
    icon: '📬',
    title: 'Transition rapide',
    desc: 'Il suffit d\'un petit mois de préavis pour que le nouveau contrat soit actif.',
  },
  {
    icon: '🤝',
    title: 'Zéro courrier pour vous',
    desc: 'Je signe, je poste, j\'informe votre assureur. Vous ne faites rien.',
  },
  {
    icon: '✅',
    title: 'Continuité totale',
    desc: 'La bascule est millimétrée. Votre maison est protégée H24, 7j/7.',
  },
];

export default function AssuranceHabitationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(assuranceHabitationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        <ReadingProgressHabitation />
        {/* ── HERO (Avec l'image de fond discrète et les classes de l'assurance emprunteur) ── */}
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
          <div className="ae-hero-inner">
            <nav aria-label="breadcrumb" className="ae-breadcrumb">
              <Link href="/">Accueil</Link>
              {' › '}
              <Link href="/assurer">Assurer</Link>
              {' › '}
              <span>Assurance Habitation</span>
            </nav>
            <span className="fin-badge ae-hero-badge">📈 +7% en 2026 — L'inflation touche votre maison</span>
            <h1 className="ae-hero-title">Arrêtez de surpayer<br />votre assurance habitation</h1>
            <p className="ae-hero-intro">
              Votre assureur profite de votre fidélité pour augmenter les prix. Je mets le marché 
              en concurrence pour vous faire économiser <strong>jusqu'à 250€/an</strong>, 
              avec les bonnes garanties. Et la paperasse de résiliation ? <strong>C'est moi qui m'en occupe.</strong>
            </p>
            <div className="ae-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Lancer mon comparatif gratuit
              </Link>
              <Link href="#section-profils" className="fin-btn-secondary">
                🔍 Voir selon mon profil
              </Link>
            </div>
            <div className="ae-hero-trust">
              <span>✅ Loi Hamon : je résilie à votre place</span>
              <span>🤝 Interlocutrice 100% dédiée</span>
              <span>⚡ 0 jour sans couverture</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
        <section className="fin-chiffres">
          <div className="ae-chiffres-inner">
            {CHIFFRES.map(c => (
              <div key={c.label} className="fin-chiffre">
                <strong>{c.icon}{c.value}</strong>
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
                  alt="Cindy Urbansky, courtière indépendante"
                  title="Cindy Urbansky - Orizia Courtage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  sizes="(max-width: 768px) 150px, 180px"
                />
              </div>
              <div className="ae-citation-content">
                <p className="ae-citation-quote">
                  « On paie tous notre assurance habitation par habitude, sans réaliser que les tarifs explosent chaque année. »
                </p>
                <p className="ae-citation-text">
                  Mon rôle n'est pas de vous vendre un énième contrat, mais d'éplucher les petites lignes de l'actuel. Si vous payez trop cher pour être mal indemnisé en cas de pépin, je vous trouve mieux ailleurs et je m'occupe de résilier pour vous. Vous ne touchez à aucune paperasse.
                </p>
                <span className="ae-citation-author">
                  Cindy Urbansky, courtier indépendant et fondatrice de Orizia Courtage
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLÈME (Avec nouvelle image) ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ L'inaction vous coûte cher
              </span>
              <h2>Pourquoi garder votre contrat actuel<br />est (souvent) une mauvaise idée</h2>
              <p>
                L'assurance habitation est le budget où l'on perd le plus d'argent par simple inertie.
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

              {/* IMAGE 1 AJOUTÉE ICI */}
              <div className="ae-probleme-image">
                <Image
                  src="/images/facture-assurance-hausse.webp"
                  alt="Hausse des tarifs d'assurance habitation"
                  title="Ne subissez plus la hausse des cotisations"
                  width={716}
                  height={1024}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="ae-probleme-cta">
              <p className="ae-probleme-cta-text">Envoyez-moi votre avis d'échéance, je vous dis tout de suite si vous payez trop cher.</p>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Faire analyser mon contrat actuel
              </Link>
            </div>
          </div>
        </section>

        {/* ── PROFILS ── */}
        <section id="section-profils" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Zéro forfaits génériques</span>
              <h2>On ajuste le contrat<br />à votre statut réel</h2>
              <p>Parce qu'un locataire d'un studio n'a pas les mêmes besoins qu'un propriétaire d'une villa avec piscine.</p>
            </div>
            <ProfilHabitationSelector />
          </div>
        </section>

        {/* ── GARANTIES (Carousel Base / Option) ── */}
        <section id="section-garanties" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="ae-garanties-head">
              <span className="fin-badge">Les garanties qui comptent</span>
              <h2>Ne payez que pour ce qui<br />vous protège vraiment</h2>
              <p>Je traque la "sur-assurance" (payer pour un jardin au 4ème étage) et la "sous-assurance" (matériel high-tech non couvert).</p>
            </div>
            <GarantiesCarousel />
          </div>
        </section>

        {/* ── ACCOMPAGNEMENT & ETAPES (Avec nouvelle image) ── */}
        <section id="section-accompagnement" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">De l'humain</span>
              <h2>Je ne suis pas un robot comparateur.<br />Je gère tout, de A à Z.</h2>
              <p>
                Pas de centre d'appels à l'étranger. Je travaille seule, en totale indépendance, 
                pour défendre uniquement vos intérêts.
              </p>
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

              {/* IMAGE 2 AJOUTÉE ICI */}
              <div className="ae-accompagnement-image">
                <Image
                  src="/images/dossier-courtage-habitation.webp"
                  alt="Courtier préparant un dossier d'assurance habitation"
                  title="Un accompagnement transparent et sans effort"
                  width={863}
                  height={1080}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="av-gratuit-bloc" style={{ marginTop: '40px' }}>
              <div className="av-gratuit-icon">🤝</div>
              <div>
                <strong>Un accompagnement expert, 100% gratuit pour vous</strong>
                <p>
                  Je suis rémunérée directement par l'assureur que nous choisissons ensemble. 
                  Vous ne payez pas de frais de dossier, vous ne payez pas plus cher votre cotisation, 
                  mais vous gagnez une alliée qui lit les petites lignes à votre place.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary" style={{ flexShrink: 0 }}>
                📅 On fait le point ?
              </Link>
            </div>
          </div>
        </section>

        {/* ── LOI HAMON ── */}
        <section id="section-hamon" className="crowd-section" style={{ background: 'var(--orizia-accent)' }}>
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(201,169,110,0.15)', color: 'var(--orizia-gold)', border: '1px solid rgba(201,169,110,0.3)' }}>
                ✅ Mon service "Zéro paperasse"
              </span>
              <h2 style={{ color: 'var(--orizia-white)' }}>
                Quitter votre assureur<br />n'a jamais été aussi simple
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.65)' }}>
                La loi Hamon vous libère après 1 an. Moi, je m'occupe de tout le reste —
                résiliation, transition, continuité de couverture. Votre seule action : me dire oui.
              </p>
            </div>

            {/* Timeline 4 étapes */}
            <div className="ah-hamon-timeline">
              {LOI_HAMON_POINTS.map((pt, i) => (
                <div key={pt.title} className="ah-hamon-tl-step">
                  <div className="ah-hamon-tl-icon">{pt.icon}</div>
                  {i < LOI_HAMON_POINTS.length - 1 && (
                    <div className="ah-hamon-tl-connector" />
                  )}
                  <div className="ah-hamon-tl-title">{pt.title}</div>
                  <div className="ah-hamon-tl-desc">{pt.desc}</div>
                </div>
              ))}
            </div>

            {/* Bloc chrono */}
            <div className="ah-hamon-chrono">
              <div className="ah-hamon-chrono-item">
                <div className="ah-hamon-chrono-icon">⏱️</div>
                <div className="ah-hamon-chrono-val">15 min</div>
                <div className="ah-hamon-chrono-label">Votre investissement temps</div>
              </div>
              <div className="ah-hamon-chrono-sep">→</div>
              <div className="ah-hamon-chrono-item">
                <div className="ah-hamon-chrono-icon">📬</div>
                <div className="ah-hamon-chrono-val">1 mois</div>
                <div className="ah-hamon-chrono-label">Préavis légal</div>
              </div>
              <div className="ah-hamon-chrono-sep">→</div>
              <div className="ah-hamon-chrono-item">
                <div className="ah-hamon-chrono-icon">🛡️</div>
                <div className="ah-hamon-chrono-val">0 jour</div>
                <div className="ah-hamon-chrono-label">Sans couverture</div>
              </div>
              <div className="ah-hamon-chrono-sep">→</div>
              <div className="ah-hamon-chrono-item ah-hamon-chrono-item--gold">
                <div className="ah-hamon-chrono-icon">💰</div>
                <div className="ah-hamon-chrono-val">~250€</div>
                <div className="ah-hamon-chrono-label">Économies annuelles</div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link href="/rendez-vous" className="fin-btn-on-dark">
                📅 Me déléguer ma résiliation
              </Link>
            </div>
          </div>
        </section>

        {/* ── OBJECTIONS ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">On en discute</span>
              <h2>Les excuses pour ne pas s'en occuper<br />(et pourquoi il faut s'y mettre)</h2>
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
            <HabitationChecklist />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions, mes réponses d'experte</h2>
              <p>Encore des doutes ? Posez-moi vos questions spécifiques, je réponds sans filtre.</p>
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
          </div>
        </section>

        {/* ── MAILLAGE INTERNE ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Vision Globale</span>
              <h2>On fait le grand ménage<br />dans vos contrats ?</h2>
              <p>Avoir une courtière dédiée, c'est l'occasion de centraliser et d'optimiser l'ensemble de votre budget.</p>
            </div>
            <div className="fin-cards fin-cards--light">
              {[
                {
                  href: '/assurer/auto-moto',
                  icon: '🚗',
                  title: 'Assurance Auto & Moto',
                  sub: 'Couper dans les frais',
                  text: 'Comme pour la maison, l\'auto augmente. Confiez-moi vos contrats, je fais un tir groupé pour négocier les meilleurs tarifs.',
                  badge: null,
                },
                {
                  href: '/assurer/assurance-emprunteur',
                  icon: '📋',
                  title: 'Assurance Emprunteur',
                  sub: 'L\'économie massive',
                  text: 'Vous remboursez un crédit immo ? C\'est là que je vous fais gagner le plus d\'argent (souvent plus de 10 000€ d\'économies).',
                  badge: '💰 Économisez jusqu\'à 15 000€',
                },
                {
                  href: '/investir/per',
                  icon: '💰',
                  title: 'Plan Épargne Retraite',
                  sub: 'Défiscaliser utile',
                  text: 'Prenez l\'argent économisé sur vos assurances et placez-le pour réduire vos impôts et préparer l\'avenir.',
                  badge: null,
                },
              ].map(s => (
                <Link href={s.href} key={s.title} className={`fin-card${s.badge ? ' fin-card--featured' : ''}`}>
                  {s.badge && (
                    <span className="fin-card-pill" style={{
                      background: 'rgba(201,169,110,0.12)',
                      color: 'var(--orizia-gold)',
                      border: '1px solid rgba(201,169,110,0.3)',
                    }}>
                      {s.badge}
                    </span>
                  )}
                  <div className="fin-card-icon">{s.icon}</div>
                  <div className="fin-card-sub">{s.sub}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="fin-card-link">Découvrir</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-light)' }}>
          <div className="fin-cta-inner">
            <h2>Prêt(e) à remettre votre assureur<br />en concurrence ?</h2>
            <p>
              Je scanne le marché, j'ajuste vos garanties, je déniche le tarif juste et 
              je m'occupe de la lettre de résiliation. Vous n'avez strictement rien à perdre, 
              à part quelques dizaines d'euros d'économies chaque mois.
            </p>
            <div className="ae-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Lancer mon comparatif avec Cindy
              </Link>
              <Link href="/contact" className="fin-btn-secondary">
                ✉️ M'envoyer un message
              </Link>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', maxWidth: 540, margin: '24px auto 0' }}>
              Les économies dépendent de votre localisation et de vos antécédents d'assurance.
              Je suis immatriculée à l'ORIAS, régie par l'ACPR.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}