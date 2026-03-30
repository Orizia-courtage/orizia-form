import Link from 'next/link';

export const metadata = {
  title: 'Assurance Habitation 2026 : Économisez jusqu\'à 250€/an | Orizia Courtage',
  description:
    'Les tarifs d\'assurance habitation augmentent de 6 à 8% en 2026. Orizia Courtage compare les meilleures offres du marché pour vous faire économiser jusqu\'à 250€ par an. Conseil gratuit, indépendant, sans engagement.',
  keywords: [
    'assurance habitation 2026',
    'assurance habitation pas chère',
    'assurance habitation courtier',
    'MRH locataire propriétaire',
    'assurance habitation hausse tarifs 2026',
    'changer assurance habitation',
    'assurance habitation garanties',
    'devis assurance habitation',
  ],
  alternates: { canonical: 'https://orizia.fr/assurer/habitation' },
  openGraph: {
    title: 'Assurance Habitation 2026 : Économisez jusqu\'à 250€/an | Orizia Courtage',
    description: 'Tarifs en hausse de 6 à 8% en 2026. Orizia compare les meilleures MRH du marché et vous fait économiser sur votre contrat. Gratuit et sans engagement.',
    url: 'https://orizia.fr/assurer/habitation',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'L\'assurance habitation est-elle obligatoire en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Elle est obligatoire pour les locataires (loi du 6 juillet 1989) : vous devez au minimum couvrir les risques locatifs (incendie, dégâts des eaux, explosion). Pour les propriétaires occupants, elle n\'est pas légalement obligatoire sauf en copropriété — mais elle est fortement recommandée. En l\'absence d\'assurance, vous êtes personnellement responsable de tous les dommages causés à des tiers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte une assurance habitation en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En 2026, les tarifs ont augmenté de 6 à 8% par rapport à 2025 en raison des risques climatiques. Pour un locataire, comptez environ 160€/an pour un appartement 2 pièces et 236€/an pour un 3 pièces. Pour un propriétaire, de 170€/an pour une maison à 326€/an pour un grand appartement. Ces tarifs varient selon la superficie, la localisation, les garanties et le niveau de franchise.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on changer d\'assurance habitation en cours d\'année ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, grâce à la loi Hamon (depuis 2015), vous pouvez résilier votre assurance habitation à tout moment après la première année de contrat, sans frais ni justification. La résiliation prend effet 1 mois après la notification. Votre nouveau courtier peut se charger de la résiliation à votre place.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre une assurance MRH locataire et propriétaire ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le contrat MRH locataire couvre vos biens personnels et votre responsabilité civile vis-à-vis du propriétaire et des tiers. Le contrat propriétaire occupant couvre en plus les murs et la structure du bâtiment. Le contrat propriétaire non-occupant (PNO) couvre le bâtiment mais pas les biens du locataire. Chaque situation nécessite un contrat adapté.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelles sont les garanties indispensables d\'une assurance habitation ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les garanties essentielles sont : incendie et événements assimilés, dégâts des eaux, vol et vandalisme, bris de glace, responsabilité civile vie privée, catastrophes naturelles et technologiques. Les garanties optionnelles utiles selon votre profil : protection juridique, valeur à neuf, garantie jardin, équipements électroniques. Orizia analyse votre logement et votre mode de vie pour sélectionner les garanties vraiment utiles.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi les tarifs augmentent-ils autant en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trois raisons principales : l\'augmentation des sinistres climatiques (sécheresses, inondations, tempêtes), la hausse de la surprime catastrophes naturelles de 12 à 20%, et l\'inflation du coût des matériaux de construction pour les remises en état. En 2026, les tarifs augmentent de 6 à 8% en moyenne nationale, avec des pointes à +15% dans certaines régions exposées (PACA, Occitanie, zones inondables).',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi passer par un courtier pour son assurance habitation ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un courtier compare simultanément les offres de nombreux assureurs et négocie des tarifs inaccessibles en direct. L\'économie moyenne constatée est de 150€ à 250€ par an. Il gère aussi la résiliation de l\'ancien contrat et s\'assure que les nouvelles garanties couvrent exactement vos besoins — ni plus, ni moins. Le service est 100% gratuit : le courtier est rémunéré par l\'assureur partenaire.',
      },
    },
  ],
};

const CHIFFRES = [
  { value: '+7%',     label: 'Hausse moyenne des tarifs 2026',     icon: '📈' },
  { value: '250€',    label: 'Économies moyennes via un courtier',  icon: '💰' },
  { value: '180€',    label: 'Tarif moyen locataire 3 pièces/an',  icon: '🏠' },
  { value: '1 mois',  label: 'Pour changer de contrat (loi Hamon)', icon: '⚡' },
];

const TARIFS_GRILLE = [
  {
    statut: 'Locataire',
    icon: '🔑',
    tarifs: [
      { surface: 'Studio / 1 pièce', prix: '~100–130€/an' },
      { surface: '2 pièces',         prix: '~160–180€/an' },
      { surface: '3 pièces',         prix: '~185–240€/an' },
      { surface: '4 pièces +',       prix: '~240–295€/an' },
    ],
    color: 'var(--orizia-primary)',
    note: 'Obligation légale. Minimum : garantie risques locatifs.',
  },
  {
    statut: 'Propriétaire occupant',
    icon: '🏡',
    tarifs: [
      { surface: 'Appartement T2',   prix: '~170–220€/an' },
      { surface: 'Appartement T3',   prix: '~215–265€/an' },
      { surface: 'Maison 80–100 m²', prix: '~140–200€/an' },
      { surface: 'Maison 150 m²+',   prix: '~250–380€/an' },
    ],
    color: '#d97706',
    note: 'Obligatoire en copropriété. Recommandé pour tout propriétaire.',
  },
  {
    statut: 'Propriétaire non-occupant',
    icon: '🏢',
    tarifs: [
      { surface: 'Appartement T1/T2', prix: '~80–130€/an' },
      { surface: 'Appartement T3/T4', prix: '~100–170€/an' },
      { surface: 'Maison',            prix: '~120–200€/an' },
      { surface: 'Immeuble entier',   prix: 'Sur devis' },
    ],
    color: '#7c3aed',
    note: 'Couvre le bâtiment, complète l\'assurance du locataire.',
  },
];

const GARANTIES = [
  {
    icon: '🔥',
    label: 'Incendie & événements assimilés',
    obligatoire: true,
    desc: 'Dommages causés par un incendie, une explosion, la foudre ou un court-circuit. Couvre la reconstruction ou le remplacement des biens.',
  },
  {
    icon: '💧',
    label: 'Dégâts des eaux',
    obligatoire: true,
    desc: 'Fuite, rupture de canalisation, infiltration. L\'un des sinistres les plus fréquents en France — 1 dossier sur 3 en assurance habitation.',
  },
  {
    icon: '🛡️',
    label: 'Responsabilité civile vie privée',
    obligatoire: true,
    desc: 'Couvre les dommages que vous causez involontairement à des tiers — chez vous ou à l\'extérieur. Inclut souvent toute la famille.',
  },
  {
    icon: '🌪️',
    label: 'Catastrophes naturelles',
    obligatoire: true,
    desc: 'Inondations, séismes, glissements de terrain. Surprime spécifique (passée de 12% à 20% en 2025). Obligatoire légalement.',
  },
  {
    icon: '🔒',
    label: 'Vol & vandalisme',
    obligatoire: false,
    desc: 'Couvre le vol par effraction, le vandalisme et les tentatives de vol. Le niveau de garantie varie fortement selon les contrats.',
  },
  {
    icon: '🪟',
    label: 'Bris de glace',
    obligatoire: false,
    desc: 'Fenêtres, baies vitrées, véranda, miroirs. Souvent mal couverte par les contrats basiques — vérifiez le plafond et les exclusions.',
  },
  {
    icon: '⚖️',
    label: 'Protection juridique',
    obligatoire: false,
    desc: 'Prise en charge des frais d\'avocat en cas de litige avec un voisin, votre propriétaire ou un artisan. Très utile en copropriété.',
  },
  {
    icon: '💻',
    label: 'Équipements électroniques',
    obligatoire: false,
    desc: 'PC, tablettes, TV, appareils photo — souvent mal couverts par défaut. Un avenant spécifique est recommandé si vous avez du matériel de valeur.',
  },
];

const DANGERS = [
  {
    icon: '📈',
    title: '+6 à +8% en 2026 : comparer n\'est plus une option',
    text: 'Les tarifs d\'assurance habitation augmentent mécaniquement chaque année en raison des risques climatiques. Sans comparaison, vous subissez des hausses automatiques. Un audit annuel de votre contrat permet d\'identifier des alternatives plus compétitives à garanties équivalentes — ou supérieures.',
  },
  {
    icon: '📋',
    title: 'Sous-assurance : l\'erreur la plus coûteuse',
    text: 'Beaucoup de contrats sont inadaptés : valeur des biens sous-estimée, superficie mal déclarée, objets de valeur non déclarés. En cas de sinistre, l\'indemnisation est réduite proportionnellement au sous-assurance — parfois de moitié. Orizia vérifie que votre déclaration est juste.',
  },
  {
    icon: '🔍',
    title: 'Les exclusions que personne ne lit... jusqu\'au sinistre',
    text: 'Balcon non couvert, cave exclue, franchise élevée sur le vol, délai de carence sur certains risques — les contrats low-cost cachent souvent des exclusions qui se révèlent au pire moment. Notre rôle est de lire les petites lignes avant vous.',
  },
];

const PROFILS = [
  {
    icon: '🔑',
    title: 'Locataire',
    desc: 'Obligation légale depuis 1989.',
    points: [
      'Garantie risques locatifs obligatoire',
      'RC vie privée incluse',
      'Attestation à fournir chaque année',
      'Biens personnels couverts selon formule',
    ],
    cta: 'Trouver mon contrat locataire',
    color: 'var(--orizia-primary)',
    featured: false,
  },
  {
    icon: '🏡',
    title: 'Propriétaire occupant',
    desc: 'Obligatoire en copropriété, recommandé partout.',
    points: [
      'Murs + biens personnels couverts',
      'Responsabilité civile propriétaire',
      'Garantie dommages aux tiers',
      'Options : jardin, piscine, dépendances',
    ],
    cta: 'Trouver mon contrat propriétaire',
    color: '#d97706',
    featured: true,
  },
  {
    icon: '🏢',
    title: 'Propriétaire non-occupant',
    desc: 'Pour les investisseurs immobiliers.',
    points: [
      'Couvre le bâtiment si logement vacant',
      'Complète l\'assurance du locataire',
      'RC propriétaire non-occupant',
      'Indispensable lors de la vacance locative',
    ],
    cta: 'Trouver mon contrat PNO',
    color: '#7c3aed',
    featured: false,
  },
];

const ETAPES = [
  {
    n: '01',
    title: 'Analyse de votre situation',
    text: 'Statut (locataire, propriétaire, PNO), type de logement, surface, localisation, biens de valeur, mode de vie — tout est pris en compte pour identifier les garanties vraiment nécessaires.',
  },
  {
    n: '02',
    title: 'Comparaison & sélection',
    text: 'Parmi nos assureurs partenaires, nous sélectionnons le contrat offrant les meilleures garanties au tarif le plus compétitif pour votre profil exact — sans sur-assurance inutile.',
  },
  {
    n: '03',
    title: 'Résiliation de l\'ancien contrat',
    text: 'Si vous avez déjà un contrat, nous gérons la résiliation à votre place (loi Hamon). Le nouveau contrat prend le relais sans aucun jour de découverture.',
  },
  {
    n: '04',
    title: 'Suivi & révision annuelle',
    text: 'Chaque année, nous vérifions que votre contrat s\'adapte à votre situation (déménagement, travaux, nouvel équipement). Et nous comparons si une meilleure offre est disponible.',
  },
];

const OBJECTIONS = [
  {
    q: '« Mon contrat actuel me convient, je ne veux pas changer. »',
    r: 'C\'est souvent une habitude, pas un choix éclairé. Un audit de 15 minutes révèle souvent des économies de 100 à 250€/an à garanties égales ou supérieures. Si votre contrat est réellement optimal, on vous le dira — et vous restez où vous êtes.',
  },
  {
    q: '« Changer d\'assurance habitation est compliqué. »',
    r: 'Depuis la loi Hamon, c\'est une démarche simple après la première année de contrat. Et concrètement, Orizia s\'occupe de tout : résiliation de l\'ancien contrat, souscription du nouveau, coordination des dates pour éviter toute période sans couverture.',
  },
  {
    q: '« Je passe déjà par mon banquier / assureur historique. »',
    r: 'Les bancassureurs et grands réseaux facturent en moyenne 20 à 30% plus cher que les contrats disponibles via un courtier indépendant. Leur avantage : la praticité. Leur inconvénient : vous payez cette praticité chaque année, indéfiniment.',
  },
  {
    q: '« J\'ai des objets de valeur, mon profil est compliqué. »',
    r: 'C\'est précisément pour les profils atypiques (collections, bijoux, instruments de musique, matériel photo, local professionnel à domicile) que le courtier est le plus utile. Les contrats standards excluent souvent ces cas — nous trouvons des contrats spécifiques.',
  },
];

const LOI_HAMON_POINTS = [
  {
    icon: '🔄',
    title: 'Résiliation à tout moment',
    desc: 'Après 12 mois de contrat, résiliez quand vous voulez, sans frais ni justification.',
  },
  {
    icon: '📬',
    title: 'Préavis d\'1 mois seulement',
    desc: 'Le nouveau contrat prend effet 1 mois après la notification de résiliation.',
  },
  {
    icon: '🤝',
    title: 'Votre courtier gère la résiliation',
    desc: 'Orizia envoie la résiliation à votre place — vous n\'avez aucune démarche à effectuer.',
  },
  {
    icon: '✅',
    title: 'Aucun jour sans couverture',
    desc: 'Le nouveau contrat démarre le lendemain de la fin de l\'ancien, sans discontinuité.',
  },
];

export default function AssuranceHabitationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>

        {/* ── HERO ── */}
        <section className="fin-hero">
          <div className="fin-hero-bg" />
          <div className="fin-hero-inner">
            <nav aria-label="breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: 16 }}>
              <Link href="/" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Accueil</Link>
              {' › '}
              <Link href="/assurer" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Assurer</Link>
              {' › '}
              <span>Assurance Habitation</span>
            </nav>
            <span className="fin-badge">📈 Tarifs en hausse de +7% en 2026 — Comparez maintenant</span>
            <h1>Assurance habitation :<br />le bon contrat au meilleur prix</h1>
            <p>
              En 2026, les tarifs d'assurance habitation augmentent de <strong>6 à 8%</strong>.
              Orizia Courtage compare les meilleures offres du marché pour vous faire économiser
              jusqu'à <strong>250€ par an</strong> — à garanties équivalentes ou supérieures.
              Locataire, propriétaire ou investisseur. <strong>100% gratuit.</strong>
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Comparer mon contrat gratuitement →
              </Link>
              <Link href="#profils" className="fin-btn-secondary">
                🔍 Trouver mon profil
              </Link>
            </div>
            <div className="fin-hero-trust">
              <span>✅ Loi Hamon : changement à tout moment</span>
              <span>🏦 Contrats Cardif, Abeille, SwissLife…</span>
              <span>⚡ Résiliation gérée par Orizia</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
        <section className="fin-chiffres">
          <div className="fin-chiffres-inner">
            {CHIFFRES.map(c => (
              <div key={c.value} className="fin-chiffre">
                <strong>{c.icon} {c.value}</strong>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROBLÈME ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Ce que votre assureur actuel ne vous dit pas
              </span>
              <h2>3 raisons pour lesquelles<br />votre contrat actuel vous coûte trop cher</h2>
              <p>
                L'assurance habitation est le poste où les épargnants perdent le plus
                d'argent par inertie. Voici pourquoi il faut comparer en 2026.
              </p>
            </div>
            <div className="crowd-avantages-grid">
              {DANGERS.map(d => (
                <div key={d.title} className="crowd-avantage-card" style={{ borderLeft: '4px solid #dc2626' }}>
                  <div className="crowd-avantage-icon">{d.icon}</div>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--orizia-accent)', marginBottom: 6 }}>
                Un audit de votre contrat actuel révèle en 24h ce que vous payez de trop.
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 20 }}>
                Transmettez votre contrat ou votre avis d'échéance — Orizia fait la comparaison à votre place.
              </p>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Auditer mon contrat gratuitement →
              </Link>
            </div>
          </div>
        </section>

        {/* ── GRILLE TARIFS 2026 ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Tarifs 2026 — Données réelles</span>
              <h2>Combien coûte une assurance habitation<br />en France en 2026 ?</h2>
              <p>
                Ces fourchettes sont issues du baromètre janvier 2026.
                Les tarifs varient selon la région, le niveau de garanties et le profil.
                Les zones PACA, Occitanie et inondables connaissent des hausses plus marquées.
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
                  <div className="ah-tarif-note">{g.note}</div>
                </div>
              ))}
            </div>
            <div className="crowd-risques-note" style={{ marginTop: 24 }}>
              💡 <strong>Bon à savoir :</strong> ces tarifs représentent la moyenne de marché.
              Via Orizia, vous accédez à des contrats négociés avec nos assureurs partenaires — souvent
              15 à 30% en dessous de ces fourchettes pour un niveau de garanties supérieur.
            </div>
            <div className="crowd-cta-band" style={{ marginTop: 32 }}>
              <div>
                <strong>Votre devis personnalisé en 24h.</strong>
                <p>Orientez-nous sur votre logement — Orizia vous envoie une comparaison sur-mesure.</p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Obtenir mon devis →
              </Link>
            </div>
          </div>
        </section>

        {/* ── PROFILS ── */}
        <section id="profils" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Votre situation</span>
              <h2>Locataire, propriétaire ou investisseur :<br />le contrat n'est pas le même</h2>
              <p>
                Chaque statut d'occupation génère des besoins distincts. Orizia
                sélectionne le contrat adapté à votre situation réelle — pas un forfait générique.
              </p>
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
                      🏠 Le plus courant
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
            <div className="crowd-cta-band" style={{ marginTop: 36 }}>
              <div>
                <strong>Votre profil mérite un contrat taillé sur-mesure.</strong>
                <p>
                  Indiquez-nous votre statut et votre logement — Orizia vous propose
                  les meilleures offres du marché adaptées à votre situation exacte.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Trouver mon contrat →
              </Link>
            </div>
          </div>
        </section>

        {/* ── GARANTIES ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Les garanties</span>
              <h2>Quelles garanties choisir ?<br />Indispensables vs optionnelles</h2>
              <p>
                Toutes les garanties ne se valent pas selon votre logement et votre mode de vie.
                Orizia analyse votre profil pour ne vous faire couvrir que ce qui est utile.
              </p>
            </div>
            <div className="ae-garanties-grid">
              {GARANTIES.map(g => (
                <div
                  key={g.label}
                  className={`ae-garantie-card${g.obligatoire ? ' ae-garantie-card--obligatoire' : ''}`}
                >
                  <div className="ae-garantie-header">
                    <span className="ae-garantie-icon">{g.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div className="ae-garantie-label">{g.label}</div>
                    </div>
                    <span className={`ae-garantie-badge${g.obligatoire ? ' ae-garantie-badge--req' : ' ae-garantie-badge--opt'}`}>
                      {g.obligatoire ? '✅ Standard' : 'Optionnelle'}
                    </span>
                  </div>
                  <p className="ae-garantie-desc">{g.desc}</p>
                </div>
              ))}
            </div>
            <div className="crowd-risques-note" style={{ marginTop: 24 }}>
              💡 <strong>L'astuce Orizia :</strong> les contrats bancaires packagés incluent souvent des
              garanties inutiles (ex : garantie jardin pour un appartement au 4ème étage) et omettent
              des garanties essentielles (ex : équipements électroniques pour un télétravailleur).
              Nous calibrons précisément votre couverture.
            </div>
          </div>
        </section>

        {/* ── LOI HAMON ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}>
                  ✅ Loi Hamon — Vos droits
                </span>
                <h2>Changer d'assurance habitation<br />est simple et gratuit</h2>
                <p>
                  Depuis la <strong>loi Hamon de 2014</strong>, vous pouvez résilier votre
                  assurance habitation à tout moment après la première année de contrat,
                  sans frais, sans pénalité, sans justification.
                </p>
                <p>
                  La résiliation prend effet <strong>1 mois</strong> après la notification.
                  Votre nouveau contrat démarre immédiatement après — aucun jour sans
                  couverture. Orizia gère l'intégralité de la procédure à votre place.
                </p>
                <p>
                  Contrairement à l'assurance emprunteur, il n'y a pas d'équivalence de
                  garanties à justifier. Vous pouvez choisir librement votre nouvel assureur,
                  y compris avec des garanties différentes.
                </p>
                <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-block', marginTop: 16 }}>
                  📅 Changer de contrat maintenant →
                </Link>
              </div>

              {/* Schéma droits */}
              <div className="crowd-schema">
                <div style={{ textAlign: 'center', marginBottom: 16, fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--orizia-primary)' }}>
                  Comment ça se passe
                </div>
                {LOI_HAMON_POINTS.map(pt => (
                  <div key={pt.title} className="ae-lemoine-point">
                    <div className="ae-lemoine-icon">{pt.icon}</div>
                    <div>
                      <strong>{pt.title}</strong>
                      <span>{pt.desc}</span>
                    </div>
                  </div>
                ))}
                <div className="crowd-schema-step crowd-schema-step--orizia" style={{ marginTop: 12 }}>
                  <div className="crowd-schema-icon">⏱️</div>
                  <strong>Durée totale de la procédure</strong>
                  <span>Environ 3 à 4 semaines · Orizia gère tout</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ACCOMPAGNEMENT ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Notre accompagnement</span>
              <h2>Orizia s'occupe de tout,<br />vous n'avez qu'à valider</h2>
              <p>
                De l'audit de votre contrat actuel à la prise d'effet du nouveau —
                une procédure complète sans effort de votre part.
              </p>
            </div>
            <div className="fin-etapes">
              {ETAPES.map(e => (
                <div key={e.n} className="fin-etape">
                  <div className="fin-etape-num">{e.n}</div>
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                </div>
              ))}
            </div>
            <div className="av-gratuit-bloc">
              <div className="av-gratuit-icon">🤝</div>
              <div>
                <strong>Un service complet, 100% gratuit pour vous</strong>
                <p>
                  Orizia Courtage est rémunéré par l'assureur partenaire sous forme de commission,
                  encadrée par la réglementation DDA et communiquée de façon transparente.
                  Vous ne payez jamais plus cher qu'en souscrivant directement — et vous
                  bénéficiez d'un expert qui lit les petites lignes à votre place.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary" style={{ flexShrink: 0 }}>
                📅 Démarrer →
              </Link>
            </div>
          </div>
        </section>

        {/* ── OBJECTIONS ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">On répond à vos doutes</span>
              <h2>Vous hésitez encore ?<br />Voici nos réponses directes.</h2>
              <p>Les 4 freins les plus fréquents — avec des réponses honnêtes.</p>
            </div>
            <div className="av-objections-grid">
              {OBJECTIONS.map((o, i) => (
                <div key={i} className="av-objection-card">
                  <div className="av-objection-q">{o.q}</div>
                  <div className="av-objection-r">{o.r}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Un profil particulier ? Un logement atypique ? On analyse votre cas en 24h.
              </p>
              <div className="fin-hero-btns" style={{ justifyContent: 'center' }}>
                <Link href="/rendez-vous" className="fin-btn-primary">📅 Prendre rendez-vous →</Link>
                <Link href="/contact" className="fin-btn-secondary">✉️ Poser une question</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions sur l'assurance habitation,<br />nos réponses d'experts</h2>
              <p>Des réponses précises, à jour pour 2026, sans jargon.</p>
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
                Une question sur votre logement spécifique ?
              </p>
              <Link href="/contact" className="fin-btn-secondary">Poser ma question →</Link>
            </div>
          </div>
        </section>

        {/* ── MAILLAGE INTERNE ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Aller plus loin</span>
              <h2>Protégez l'ensemble<br />de votre patrimoine</h2>
              <p>L'assurance habitation s'inscrit dans une stratégie de protection globale.</p>
            </div>
            <div className="fin-cards">
              {[
                {
                  href: '/assurer/emprunteur',
                  icon: '📋',
                  title: 'Assurance Emprunteur',
                  sub: 'Protéger votre prêt',
                  text: 'Si vous êtes propriétaire avec un crédit en cours, économisez jusqu\'à 15 000€ en changeant votre assurance de prêt. Loi Lemoine : résiliation à tout moment.',
                },
                {
                  href: '/financer/credit-immobilier',
                  icon: '🏡',
                  title: 'Crédit Immobilier',
                  sub: 'Financer votre projet',
                  text: 'Vous achetez un bien ? Orizia négocie votre crédit ET votre assurance emprunteur simultanément pour minimiser le coût total de votre acquisition.',
                },
                {
                  href: '/investir/scpi',
                  icon: '🏢',
                  title: 'SCPI',
                  sub: 'Investissement immobilier',
                  text: '4–6%/an sans gestion. Complétez votre patrimoine immobilier avec des SCPI — en pleine propriété ou dans une assurance vie.',
                },
              ].map(s => (
                <Link href={s.href} key={s.title} className="fin-card">
                  <div className="fin-card-icon">{s.icon}</div>
                  <div className="fin-card-sub">{s.sub}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="fin-card-link">En savoir plus →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="fin-cta">
          <div className="fin-cta-inner">
            <h2>+7% en 2026 —<br />c'est le moment de comparer</h2>
            <p>
              Orizia compare les meilleures offres d'assurance habitation du marché,
              gère la résiliation de votre contrat actuel et coordonne la prise d'effet
              du nouveau. Zéro effort. Zéro frais. Jusqu'à 250€ économisés par an.
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Comparer mon contrat gratuitement →
              </Link>
              <Link href="/contact" className="fin-btn-outline">
                Poser une question
              </Link>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
              Les économies indiquées sont des estimations basées sur les tarifs moyens de marché 2026.
              Les tarifs réels dépendent du profil de l'assuré, de la localisation et des garanties souscrites.
              Orizia Courtage, courtier en assurance régi par l'ACPR, rémunéré par les assureurs partenaires, jamais par le client.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}