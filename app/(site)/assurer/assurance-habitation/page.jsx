import Link from 'next/link';
import Image from 'next/image';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Assurance Habitation : Baissez la facture avec Orizia Courtage',
  description:
'Hausse des tarifs habitation en 2026. Cindy Urbansky, courtière dans les Hauts-de-France, compare les offres MRH, ajuste vos garanties et gère la résiliation. Gratuit.',
  keywords: [
    'assurance habitation courtier',
    'comparateur assurance habitation indépendant',
    'résilier assurance habitation loi hamon',
    'devis MRH locataire propriétaire',
    'assurance PNO pas chère',
    'assurance habitation hausse tarifs 2026',
    'assurance habitation garanties',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/assurer/assurance-habitation' },
  openGraph: {
    title: 'Assurance Habitation : Baissez la facture avec Orizia Courtage',
description: 'Ne subissez pas l\'inflation. Je compare le marché, ajuste vos garanties et résilie votre ancien contrat sans coupure. Service de courtage gratuit et indépendant.',
    url: 'https://orizia-courtage.fr/assurer/assurance-habitation',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/facture-assurance-hausse.webp',
        width: 1200,
        height: 630,
        alt: "Comparaison et courtage en assurance habitation avec Orizia",
      },
    ],
    locale: 'fr_FR',
    type: 'article',
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
        description: 'Analyse de vos garanties, comparaison des devis et gestion administrative de la résiliation 100% gratuites pour l\'assuré (rémunération par la compagnie d\'assurance partenaire).',
      },
    },
    {
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
    },
  ],
};

const faqSchema = assuranceHabitationSchema['@graph'][2];




const CHIFFRES = [
  { value: '+7%', label: 'Hausse moyenne subie en 2026', icon: '📈' },
  { value: '250€', label: 'Économie annuelle possible', icon: '💰' },
  { value: '1 an', label: 'Délai pour changer librement', icon: '🔓' },
  { value: '0 effort', label: 'Je gère la résiliation', icon: '⚡' },
];

const TARIFS_GRILLE = [
  {
    statut: 'Locataire',
    icon: '🔑',
    tarifs: [
      { surface: 'Studio / 1 pièce', prix: '~100–130€/an' },
      { surface: '2 pièces', prix: '~160–180€/an' },
      { surface: '3 pièces', prix: '~185–240€/an' },
      { surface: '4 pièces +', prix: '~240–295€/an' },
    ],
    color: 'var(--orizia-primary)',
    note: 'Attestation exigée par votre propriétaire à la remise des clés.',
  },
  {
    statut: 'Propriétaire occupant',
    icon: '🏡',
    tarifs: [
      { surface: 'Appartement T2', prix: '~170–220€/an' },
      { surface: 'Appartement T3', prix: '~215–265€/an' },
      { surface: 'Maison 80–100 m²', prix: '~140–200€/an' },
      { surface: 'Maison 150 m²+', prix: '~250–380€/an' },
    ],
    color: '#d97706',
    note: 'Couverture intégrale des murs, clôtures et de vos biens.',
  },
  {
    statut: 'Propriétaire non-occupant (PNO)',
    icon: '🏢',
    tarifs: [
      { surface: 'Appartement T1/T2', prix: '~80–130€/an' },
      { surface: 'Appartement T3/T4', prix: '~100–170€/an' },
      { surface: 'Maison', prix: '~120–200€/an' },
      { surface: 'Immeuble entier', prix: 'Sur devis' },
    ],
    color: '#7c3aed',
    note: 'Indispensable pour protéger votre investissement locatif.',
  },
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

const PROFILS = [
  {
    icon: '🔑',
    title: 'Locataire',
    desc: 'L\'attestation qu\'il vous faut vite.',
    points: [
      'Garantie risques locatifs obligatoire',
      'Responsabilité civile incluse',
      'Protection de vos meubles et effets persos',
      'Attestation immédiate pour le propriétaire',
    ],
    cta: 'Assurer ma location',
    color: 'var(--orizia-primary)',
    featured: false,
  },
  {
    icon: '🏡',
    title: 'Propriétaire occupant',
    desc: 'Le bouclier de votre patrimoine.',
    points: [
      'Couverture des murs et de la toiture',
      'Protection des dépendances (garage, cave)',
      'Options piscines et aménagements extérieurs',
      'Garantie "Valeur à neuf" recommandée',
    ],
    cta: 'Protéger ma maison',
    color: '#d97706',
    featured: true,
  },
  {
    icon: '🏢',
    title: 'Investisseur (PNO)',
    desc: 'La sécurité pour vos biens loués.',
    points: [
      'Indispensable entre deux locataires',
      'Prend le relais si le locataire est mal assuré',
      'Déductible de vos revenus fonciers',
      'Garantie loyers impayés en option possible',
    ],
    cta: 'Sécuriser mon investissement',
    color: '#7c3aed',
    featured: false,
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

      <main>
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
                📅 Lancer mon comparatif gratuit →
              </Link>
              <Link href="#profils" className="fin-btn-secondary">
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
                📅 Faire analyser mon contrat actuel →
              </Link>
            </div>
          </div>
        </section>

        {/* ── GRILLE TARIFS 2026 ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">La réalité du marché</span>
              <h2>Combien ça coûte vraiment<br />une bonne assurance en 2026 ?</h2>
              <p>
                Voici les moyennes nationales constatées. Mon défi au quotidien ? 
                Trouver des contrats plus complets qui se situent sous ces fourchettes.
              </p>
            </div>
            <div className="ah-tarifs-grid">
              {TARIFS_GRILLE.map(g => (
                <div key={g.statut} className="ah-tarif-card">
                  <div className="ah-tarif-header" style={{ borderColor: g.color }}>
                    <span className="ah-tarif-icon">{g.icon}</span>
                    <h3 style={{ color: g.color }}>{g.statut}</h3>
                  </div>
                  <div className="ah-tarif-list">
                    {g.tarifs.map(t => (
                      <div key={t.surface} className="ah-tarif-row">
                        <span>{t.surface}</span>
                        <strong>{t.prix}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="ah-tarif-note">💡 {g.note}</div>
                </div>
              ))}
            </div>
            <div className="crowd-risques-note" style={{ marginTop: 24 }}>
              💡 <strong>Une moyenne n'est pas une fatalité :</strong> les prix explosent dans les zones inondables, 
              mais si vous avez le bon profil, je peux négocier avec mes partenaires pour faire baisser la facture.
            </div>
          </div>
        </section>

        {/* ── PROFILS ── */}
        <section id="profils" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Zéro forfaits génériques</span>
              <h2>On ajuste le contrat<br />à votre statut réel</h2>
              <p>Parce qu'un locataire d'un studio n'a pas les mêmes besoins qu'un propriétaire d'une villa avec piscine.</p>
            </div>
            <div className="av-profils-grid">
              {PROFILS.map(p => (
                <div
                  key={p.title}
                  className={`av-profil-card${p.featured ? ' av-profil-card--featured' : ''}`}
                  style={p.featured ? { borderColor: '#d97706' } : {}}
                >
                  {p.featured && (
                    <div className="av-profil-badge" style={{ background: '#d97706' }}>
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

        {/* ── GARANTIES (Optimisées pour utiliser le CSS de l'assurance emprunteur) ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="ae-garanties-head">
              <span className="fin-badge">Les garanties qui comptent</span>
              <h2>Ne payez que pour ce qui<br />vous protège vraiment</h2>
              <p>Je traque la "sur-assurance" (payer pour un jardin au 4ème étage) et la "sous-assurance" (matériel high-tech non couvert).</p>
            </div>
            
            <div className="ae-garanties-flex">
              {GARANTIES.map(g => (
                <div
                  key={g.label}
                  className={`ae-garantie-flex-card ${g.obligatoire ? 'ae-garantie-flex-card--base' : 'ae-garantie-flex-card--option'}`}
                >
                  <div className="ae-garantie-flex-header">
                    <span className="ae-garantie-flex-icon">{g.icon}</span>
                    <div style={{ flex: 1, marginTop: '4px' }}>
                      <div className="ae-garantie-flex-label" style={{ fontSize: '1.1rem' }}>{g.label}</div>
                    </div>
                    <span className={`ae-garantie-flex-badge ${g.obligatoire ? 'ae-garantie-flex-badge--base' : 'ae-garantie-flex-badge--option'}`}>
                      {g.obligatoire ? 'Base' : 'Option'}
                    </span>
                  </div>
                  <p className="ae-garantie-flex-desc">{g.desc}</p>
                </div>
              ))}
            </div>
            
          </div>
        </section>

        {/* ── ACCOMPAGNEMENT & ETAPES (Avec nouvelle image) ── */}
        <section className="crowd-section crowd-section--white">
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
                📅 On fait le point ? →
              </Link>
            </div>
          </div>
        </section>

        {/* ── LOI HAMON ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}>
                  ✅ Mon service "Zéro paperasse"
                </span>
                <h2>Quitter votre assureur<br />n'a jamais été aussi simple</h2>
                <p>
                  Beaucoup n'osent pas changer d'assurance par peur des complications administratives. 
                  <strong> La bonne nouvelle : la loi Hamon vous permet de résilier quand vous voulez après 1 an.</strong>
                </p>
                <p>
                  La meilleure nouvelle ? <strong>C'est moi qui m'en occupe.</strong> Je rédige, j'envoie, 
                  je coordonne les dates. Vous dormez sur vos deux oreilles sans aucune coupure de garantie.
                </p>
                <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-block', marginTop: 16 }}>
                  📅 Me déléguer votre résiliation →
                </Link>
              </div>

              {/* Schéma droits */}
              <div className="crowd-schema">
                <div style={{ textAlign: 'center', marginBottom: 16, fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--orizia-primary)' }}>
                  La transition en douceur
                </div>
                <div className="ae-lemoine-points-list">
                  {LOI_HAMON_POINTS.map(pt => (
                    <div key={pt.title} className="ae-lemoine-point-item">
                      <div className="ae-lemoine-point-icon">{pt.icon}</div>
                      <div className="ae-lemoine-point-text">
                        <strong>{pt.title}</strong>
                        <span>{pt.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="crowd-schema-step crowd-schema-step--orizia" style={{ marginTop: 24, textAlign: 'center' }}>
                  <div className="crowd-schema-icon">⏱️</div>
                  <strong>Votre investissement temps ?</strong>
                  <span>Environ 15 minutes. Je gère le reste.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OBJECTIONS ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">On en discute</span>
              <h2>Les excuses pour ne pas s'en occuper<br />(et pourquoi il faut s'y mettre)</h2>
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
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <Link href="/contact" className="fin-btn-secondary">✉️ Poser une autre question à Cindy</Link>
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
            <div className="fin-cards">
              {[
                {
                  href: '/assurer/auto-moto',
                  icon: '🚗',
                  title: 'Assurance Auto & Moto',
                  sub: 'Couper dans les frais',
                  text: 'Comme pour la maison, l\'auto augmente. Confiez-moi vos contrats, je fais un tir groupé pour négocier les meilleurs tarifs.',
                },
                {
                  href: '/assurer/assurance-emprunteur',
                  icon: '📋',
                  title: 'Assurance Emprunteur',
                  sub: 'L\'économie massive',
                  text: 'Vous remboursez un crédit immo ? C\'est là que je vous fais gagner le plus d\'argent (souvent plus de 10 000€ d\'économies).',
                },
                {
                  href: '/investir/per',
                  icon: '💰',
                  title: 'Plan Épargne Retraite',
                  sub: 'Défiscaliser utile',
                  text: 'Prenez l\'argent économisé sur vos assurances et placez-le pour réduire vos impôts et préparer l\'avenir.',
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
            <h2>Prêt(e) à remettre votre assureur<br />en concurrence ?</h2>
            <p>
              Je scanne le marché, j'ajuste vos garanties, je déniche le tarif juste et 
              je m'occupe de la lettre de résiliation. Vous n'avez strictement rien à perdre, 
              à part quelques dizaines d'euros d'économies chaque mois.
            </p>
            <div className="ae-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Lancer mon comparatif avec Cindy →
              </Link>
              <Link href="/contact" className="fin-btn-outline">
                ✉️ M'envoyer un message
              </Link>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
              Les économies dépendent de votre localisation et de vos antécédents d'assurance.
              Orizia Courtage est une structure indépendante, régie par l'ACPR et immatriculée à l'ORIAS. 
              Mon accompagnement est financé par les compagnies partenaires, 100% transparent pour vous.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}