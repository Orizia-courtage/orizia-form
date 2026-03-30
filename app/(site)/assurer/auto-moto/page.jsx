import Link from 'next/link';

export const metadata = {
  title: 'Assurance Auto & Moto 2026 : Économisez sur votre contrat | Orizia Courtage',
  description:
    'Les tarifs d\'assurance auto augmentent de +4 à 6% en 2026 pour la 3ème année consécutive. Orizia Courtage compare les meilleures offres auto et moto du marché. Tiers, intermédiaire, tous risques. Conseil gratuit et indépendant.',
  keywords: [
    'assurance auto 2026',
    'assurance moto 2026',
    'assurance auto pas chère courtier',
    'changer assurance auto loi Hamon',
    'assurance auto jeune conducteur',
    'assurance moto cylindrée',
    'comparatif assurance auto moto',
    'assurance auto tous risques tiers',
  ],
  alternates: { canonical: 'https://orizia.fr/assurer/auto-moto' },
  openGraph: {
    title: 'Assurance Auto & Moto 2026 : Économisez sur votre contrat | Orizia Courtage',
    description: '+4 à 6% en 2026 pour la 3ème année consécutive. Orizia compare les meilleures offres auto et moto du marché. Gratuit, indépendant, sans engagement.',
    url: 'https://orizia.fr/assurer/auto-moto',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quelle assurance auto est obligatoire en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La garantie responsabilité civile (RC) est la seule obligation légale pour tout véhicule terrestre à moteur en circulation. Elle couvre les dommages causés à des tiers (corporels et matériels). Rouler sans assurance est un délit passible de 3 750€ d\'amende, de la suspension du permis et de la confiscation du véhicule.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre assurance au tiers, intermédiaire et tous risques ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le tiers (RC) couvre uniquement les dommages causés à autrui — vous n\'êtes pas indemnisé si vous êtes responsable. L\'intermédiaire (tiers+) ajoute bris de glace, vol, incendie et parfois les catastrophes naturelles. Le tous risques couvre en plus vos propres dommages quel que soit le responsable, avec des options comme le véhicule de remplacement et l\'assistance 0 km. Le tous risques est recommandé pour tout véhicule de moins de 5 ans ou de valeur supérieure à 8 000€.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on changer d\'assurance auto ou moto en cours d\'année ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, grâce à la loi Hamon (2015), vous pouvez résilier votre assurance auto ou moto à tout moment après la première année de contrat, sans frais ni justification. La résiliation prend effet 1 mois après la notification. Votre nouveau courtier peut gérer la résiliation à votre place et coordonner les dates pour éviter tout jour sans couverture.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi les tarifs d\'assurance auto augmentent-ils encore en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour la 3ème année consécutive, les tarifs augmentent de +4 à 6%. Trois raisons principales : la hausse du coût des réparations (+12% sur les pièces, +8% sur la main-d\'œuvre), l\'augmentation des sinistres climatiques (grêle, inondations) et la sophistication électronique des véhicules modernes qui renchérit les réparations. Les jeunes conducteurs sont particulièrement touchés avec une prime moyenne de 2 177€/an.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment réduire sa prime d\'assurance auto en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Plusieurs leviers existent : changer d\'assureur via un courtier (économie moyenne de 200 à 400€/an), opter pour une franchise plus élevée en contrepartie d\'une prime réduite, limiter les kilomètres déclarés si vous roulez peu, installer un boîtier télématique (conduite connectée), regrouper auto et habitation chez le même assureur, ou choisir un véhicule moins puissant pour les jeunes conducteurs.',
      },
    },
    {
      '@type': 'Question',
      name: 'L\'assurance moto est-elle plus chère que l\'assurance auto ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pas nécessairement, mais les motos sont statistiquement plus accidentogènes. Le tarif dépend surtout de la cylindrée : un scooter 50cc s\'assure à partir de 200€/an au tiers, contre 900 à 1 500€/an tous risques pour une sportive haut de gamme. La saisonnalité est aussi un levier : de nombreux assureurs proposent des contrats suspension hivernale pour réduire la prime annuelle.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi passer par un courtier pour son assurance auto ou moto ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un courtier compare simultanément les offres de nombreux assureurs et négocie des tarifs inaccessibles en direct. L\'économie constatée est de 200€ à 400€/an pour un conducteur standard, jusqu\'à 600€ pour un jeune conducteur. Il gère aussi la résiliation de l\'ancien contrat et s\'assure que le nouveau couvre exactement vos besoins. Le service est 100% gratuit : le courtier est rémunéré par l\'assureur partenaire.',
      },
    },
  ],
};

const CHIFFRES = [
  { value: '+5%',      label: 'Hausse moyenne des tarifs 2026',          icon: '📈' },
  { value: '2 177€',  label: 'Prime moyenne jeune conducteur/an',        icon: '🎓' },
  { value: '602€',    label: 'Prime moyenne conducteur expérimenté/an',  icon: '🚗' },
  { value: '400€',    label: 'Économies max. via un courtier/an',        icon: '💰' },
];

const FORMULES_AUTO = [
  {
    nom: 'Au Tiers',
    icon: '🛡️',
    prix: '~165–340€/an',
    couleur: '#64748b',
    obligatoire: true,
    garanties: [
      { label: 'Responsabilité civile',        inclus: true },
      { label: 'Bris de glace',                inclus: false },
      { label: 'Vol & incendie',               inclus: false },
      { label: 'Catastrophes naturelles',      inclus: false },
      { label: 'Dommages tous accidents',      inclus: false },
      { label: 'Véhicule de remplacement',     inclus: false },
    ],
    pour: 'Véhicule > 10 ans ou valeur < 3 000€',
  },
  {
    nom: 'Intermédiaire',
    icon: '⚖️',
    prix: '~370–550€/an',
    couleur: '#d97706',
    obligatoire: false,
    garanties: [
      { label: 'Responsabilité civile',        inclus: true },
      { label: 'Bris de glace',                inclus: true },
      { label: 'Vol & incendie',               inclus: true },
      { label: 'Catastrophes naturelles',      inclus: true },
      { label: 'Dommages tous accidents',      inclus: false },
      { label: 'Véhicule de remplacement',     inclus: false },
    ],
    pour: 'Véhicule 5–10 ans ou valeur 3 000–8 000€',
    featured: true,
  },
  {
    nom: 'Tous Risques',
    icon: '✅',
    prix: '~637–950€/an',
    couleur: '#16a34a',
    obligatoire: false,
    garanties: [
      { label: 'Responsabilité civile',        inclus: true },
      { label: 'Bris de glace',                inclus: true },
      { label: 'Vol & incendie',               inclus: true },
      { label: 'Catastrophes naturelles',      inclus: true },
      { label: 'Dommages tous accidents',      inclus: true },
      { label: 'Véhicule de remplacement',     inclus: true },
    ],
    pour: 'Véhicule < 5 ans ou valeur > 8 000€',
  },
];

const TARIFS_MOTO = [
  { cylindree: '≤ 50 cc (scooter)', tiers: '200–300€', inter: '300–400€', tousRisques: '400€+',        recommande: 'Tiers' },
  { cylindree: '125 cc',            tiers: '350–500€', inter: '500–600€', tousRisques: '600–700€',     recommande: 'Intermédiaire' },
  { cylindree: '126–600 cc',        tiers: '400–500€', inter: '500–700€', tousRisques: '700–950€',     recommande: 'Tous risques' },
  { cylindree: '600–999 cc',        tiers: '450–600€', inter: '600–900€', tousRisques: '900–1 200€',   recommande: 'Tous risques' },
  { cylindree: 'Grosse cyl. / Sportive', tiers: '500€+',   inter: '800€+',    tousRisques: '1 200–1 500€', recommande: 'Tous risques' },
];

const PROFILS_AUTO = [
  {
    icon: '🎓',
    title: 'Jeune conducteur',
    desc: 'Moins de 3 ans de permis — le profil le plus pénalisé.',
    points: [
      'Prime moyenne 2 177€/an en 2026',
      'Surprime jeune conducteur jusqu\'à +100%',
      'Conduite accompagnée (AAC) réduit la prime',
      'Boîtier télématique : option économique',
    ],
    astuce: 'Un courtier trouve les assureurs spécialisés jeunes conducteurs — souvent 400€ de moins.',
    color: '#dc2626',
  },
  {
    icon: '🚗',
    title: 'Conducteur expérimenté',
    desc: 'Bonus maximum, historique de conduite établi.',
    points: [
      'Prime moyenne 602€/an en 2026',
      'Bonus 0,50 = réduction maximale de 50%',
      'Large choix de formules et assureurs',
      'Regroupement multi-véhicule négociable',
    ],
    astuce: 'Même avec un bon bonus, comparer tous les 2 ans économise en moyenne 200€/an.',
    color: 'var(--orizia-primary)',
    featured: true,
  },
  {
    icon: '🏍️',
    title: 'Motard',
    desc: 'Moto, scooter, scooter 125 ou grosse cylindrée.',
    points: [
      'Tarif dépend fortement de la cylindrée',
      'Suspension hivernale = économies réelles',
      'Équipement conducteur couvrable en option',
      'Contrat spécifique si usage piste/compétition',
    ],
    astuce: 'Certains assureurs proposent des contrats "garage" pour la saison hivernale.',
    color: '#7c3aed',
  },
];

const DANGERS = [
  {
    icon: '📈',
    title: '+5% en 2026 : 3ème hausse consécutive',
    text: 'Depuis 2024, les tarifs auto augmentent chaque année : +5–6% en 2024, +6% en 2025, +4–6% en 2026. Sans comparaison active, vous absorbez mécaniquement ces hausses. Un conducteur qui ne compare pas depuis 5 ans paie en moyenne 25 à 30% de plus qu\'un conducteur qui change régulièrement.',
  },
  {
    icon: '📋',
    title: 'Les renouvellements tacites font exploser les primes',
    text: 'La plupart des contrats se renouvellent automatiquement avec la hausse annuelle. L\'assureur envoie l\'avis d\'échéance 2 mois avant la date anniversaire — c\'est votre fenêtre pour résilier. Beaucoup de conducteurs ne lisent pas cet avis et ratent leur chance annuelle d\'optimiser.',
  },
  {
    icon: '🔍',
    title: 'La formule ne correspond plus au véhicule',
    text: 'Un tous risques sur une voiture de 15 ans vaut rarement son coût — l\'indemnisation en cas de sinistre sera calée sur la valeur vénale du véhicule, souvent très faible. À l\'inverse, assurer au tiers une voiture de 3 ans achetée à crédit vous laisse sans protection en cas d\'accident responsable.',
  },
];

const ETAPES = [
  {
    n: '01',
    title: 'Analyse de votre profil conducteur',
    text: 'Bonus/malus, historique de sinistres, type de véhicule, kilométrage annuel, usage (perso/pro), ZFE… chaque élément influe sur le tarif. Nous construisons votre profil exact pour comparer les bonnes offres.',
  },
  {
    n: '02',
    title: 'Comparaison & sélection',
    text: 'Nos assureurs partenaires sont comparés sur les garanties, les franchises, les exclusions et le tarif. Nous vous présentons le contrat optimal — ni trop couvert, ni sous-couvert.',
  },
  {
    n: '03',
    title: 'Résiliation de l\'ancien contrat',
    text: 'Après la première année, Orizia envoie la résiliation à votre ancien assureur en votre nom. Le nouveau contrat prend effet le lendemain — aucun jour sans couverture, aucune démarche de votre part.',
  },
  {
    n: '04',
    title: 'Alerte anniversaire & suivi annuel',
    text: 'Chaque année, Orizia vous alerte 3 mois avant votre date anniversaire pour comparer à nouveau. Si une offre plus avantageuse existe, nous vous la soumettons avant que le tacite reconduction ne s\'active.',
  },
];

const OBJECTIONS = [
  {
    q: '« Je suis chez MAIF / MACIF depuis 20 ans, je ne veux pas changer. »',
    r: 'La fidélité ne garantit plus les meilleurs tarifs — MAIF, MACIF, AXA et Allianz ont tous augmenté de +6% en 2025. Nos comparaisons révèlent régulièrement des contrats équivalents ou supérieurs à 200€ de moins par an, y compris pour des profils fidèles depuis longtemps.',
  },
  {
    q: '« J\'ai un malus / antécédent de sinistre. »',
    r: 'C\'est précisément pour les profils "compliqués" qu\'un courtier est le plus utile. Les assureurs spécialisés (résiliés, malussés) proposent des tarifs bien plus compétitifs que les grands réseaux pour ces profils. Orizia connaît les acteurs qui acceptent vos antécédents au meilleur prix.',
  },
  {
    q: '« Mon véhicule est ancien, ce n\'est pas la peine de comparer. »',
    r: 'Si votre véhicule a peu de valeur, un contrat tiers ou intermédiaire adapté coûte parfois 3 fois moins cher qu\'un tous risques inadapté que vous payez par habitude. L\'audit révèle souvent des doublons de garanties inutiles sur les anciens véhicules.',
  },
  {
    q: '« Je roule peu, mon assurance est déjà bon marché. »',
    r: 'La conduite au kilomètre (ou contrat faible kilométrage) est une formule spécifique que peu de conducteurs connaissent. Si vous roulez moins de 8 000 km/an, vous pouvez économiser 30 à 40% par rapport à un contrat classique. Orizia compare ces formules en priorité pour votre profil.',
  },
];

const LOI_HAMON_POINTS = [
  {
    icon: '🔄',
    title: 'Résiliation à tout moment',
    desc: 'Après 12 mois de contrat, résiliez sans frais, sans justification, quand vous voulez.',
  },
  {
    icon: '📬',
    title: 'Préavis d\'1 mois',
    desc: 'Le changement est effectif 1 mois après la notification de résiliation à l\'assureur.',
  },
  {
    icon: '🤝',
    title: 'Orizia gère la résiliation',
    desc: 'Nous envoyons la lettre de résiliation en votre nom — vous n\'avez aucune démarche à faire.',
  },
  {
    icon: '📅',
    title: 'Alerte anniversaire incluse',
    desc: 'Orizia vous prévient 3 mois avant chaque date d\'échéance pour comparer avant le tacite.',
  },
];

export default function AssuranceAutoMotoPage() {
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
              <span>Assurance Auto & Moto</span>
            </nav>
            <span className="fin-badge">📈 +5% en 2026 — 3ème hausse consécutive</span>
            <h1>Assurance auto & moto :<br />arrêtez de payer trop cher</h1>
            <p>
              Pour la 3ème année consécutive, les tarifs auto progressent de{' '}
              <strong>+4 à 6%</strong>. Un jeune conducteur paie en moyenne{' '}
              <strong>2 177€/an</strong>. Orizia Courtage compare les meilleures offres
              du marché pour vous faire économiser jusqu'à <strong>400€/an</strong>
              — sans perdre une seule garantie. <strong>Gratuit.</strong>
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Comparer mon contrat gratuitement →
              </Link>
              <Link href="#formules" className="fin-btn-secondary">
                🔍 Comparer les formules
              </Link>
            </div>
            <div className="fin-hero-trust">
              <span>✅ Loi Hamon : changement à tout moment</span>
              <span>🚗 Auto & 🏍️ Moto comparés</span>
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
                ⚠️ Ce qui fait grimper votre prime sans que vous le voyiez
              </span>
              <h2>3 raisons pour lesquelles vous payez<br />plus cher que nécessaire</h2>
              <p>
                La demande de devis auto a bondi de <strong>+23% en 2025</strong> selon
                lesfurets.com. Les automobilistes qui comparent économisent. Les autres subissent.
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
                Un audit de votre contrat actuel révèle en 24h ce que vous pouvez économiser.
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 20 }}>
                Transmettez votre carte verte ou votre avis d'échéance — Orizia fait la comparaison à votre place.
              </p>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Auditer mon contrat gratuitement →
              </Link>
            </div>
          </div>
        </section>

        {/* ── FORMULES AUTO ── */}
        <section id="formules" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Formules Auto 2026</span>
              <h2>Tiers, intermédiaire ou tous risques :<br />laquelle vous correspond vraiment ?</h2>
              <p>
                Le choix de la formule est la décision la plus structurante de votre assurance.
                Orizia analyse la valeur de votre véhicule et votre historique pour vous
                recommander la formule optimale — ni trop, ni trop peu.
              </p>
            </div>
            <div className="am-formules-grid">
              {FORMULES_AUTO.map(f => (
                <div
                  key={f.nom}
                  className={`am-formule-card${f.featured ? ' am-formule-card--featured' : ''}`}
                  style={f.featured ? { borderColor: f.couleur } : {}}
                >
                  {f.featured && (
                    <div className="am-formule-badge" style={{ background: f.couleur }}>
                      ⚖️ Le plus choisi
                    </div>
                  )}
                  <div className="am-formule-header" style={{ color: f.couleur }}>
                    <span>{f.icon}</span>
                    <h3>{f.nom}</h3>
                  </div>
                  <div className="am-formule-prix" style={{ color: f.couleur }}>{f.prix}</div>
                  <ul className="am-formule-garanties">
  {f.garanties.map(g => (
    <li key={g.label} className={g.inclus ? 'am-garantie--ok' : 'am-garantie--no'}>
      <span>{g.inclus ? '✅' : '❌'}</span>
      {g.label}
    </li>
  ))}
</ul>
                  <div className="am-formule-pour">
                    🎯 {f.pour}
                  </div>
                </div>
              ))}
            </div>
            <div className="crowd-risques-note" style={{ marginTop: 20 }}>
              💡 <strong>La règle simple :</strong> si la valeur de votre véhicule &lt; 3 000€,
              le tiers suffit. Entre 3 000€ et 8 000€, l'intermédiaire est le meilleur compromis.
              Au-dessus de 8 000€ ou pour un véhicule financé à crédit, le tous risques est indispensable.
            </div>
          </div>
        </section>

        {/* ── TARIFS MOTO ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Tarifs Moto 2026</span>
              <h2>Assurance moto : les tarifs<br />par cylindrée en 2026</h2>
              <p>
                Le prix d'une assurance moto dépend avant tout de la cylindrée.
                Le prix moyen toutes motos confondues est de <strong>623€/an</strong>
                en 2026, en hausse de +7% par rapport à 2021.
              </p>
            </div>
            <div className="am-moto-table-wrap">
              <table className="ae-taux-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Cylindrée</th>
                    <th className="ae-col--banque">Au tiers</th>
                    <th>Intermédiaire</th>
                    <th className="ae-col--courtier">Tous risques</th>
                    <th>Recommandé</th>
                  </tr>
                </thead>
                <tbody>
                  {TARIFS_MOTO.map(row => (
                    <tr key={row.cylindree}>
                      <td><strong>{row.cylindree}</strong></td>
                      <td className="ae-col--banque" style={{ fontSize: '0.85rem' }}>{row.tiers}</td>
                      <td style={{ fontSize: '0.85rem' }}>{row.inter}</td>
                      <td className="ae-col--courtier" style={{ fontSize: '0.85rem' }}>{row.tousRisques}</td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          background: 'rgba(58,111,108,0.1)',
                          color: 'var(--orizia-primary)',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: '100px',
                          whiteSpace: 'nowrap',
                        }}>
                          {row.recommande}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="ae-taux-source">
                Source : codeclic.com & jeswitch.fr — barème 2026. Tarifs indicatifs selon profil et assureur.
              </p>
            </div>
            <div className="crowd-risques-note">
              💡 <strong>Astuce moto :</strong> si vous ne roulez pas de novembre à mars,
              un contrat avec <strong>suspension hivernale</strong> réduit la prime annuelle de 20 à 30%.
              Orizia identifie les assureurs qui proposent cette option parmi ses partenaires.
            </div>
          </div>
        </section>

        {/* ── PROFILS CONDUCTEURS ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Votre profil</span>
              <h2>Jeune conducteur, expérimenté<br />ou motard — le conseil n'est pas le même</h2>
              <p>
                Chaque profil a ses leviers spécifiques. Orizia adapte la stratégie
                à votre situation exacte pour identifier les économies réelles.
              </p>
            </div>
            <div className="av-profils-grid">
              {PROFILS_AUTO.map(p => (
                <div
                  key={p.title}
                  className={`av-profil-card${p.featured ? ' av-profil-card--featured' : ''}`}
                >
                  {p.featured && <div className="av-profil-badge">✅ Profil standard</div>}
                  <div className="av-profil-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p className="av-profil-desc">{p.desc}</p>
                  <ul className="ah-profil-points" style={{ marginBottom: 12 }}>
  {p.points.map((pt, i) => (
    <li key={i}>• {pt}</li>
  ))}
</ul>
                  <div style={{
                    background: 'rgba(58,111,108,0.06)',
                    borderRadius: 8,
                    padding: '10px 12px',
                    fontSize: '0.78rem',
                    color: p.color,
                    fontWeight: 700,
                    lineHeight: 1.4,
                  }}>
                    💡 {p.astuce}
                  </div>
                </div>
              ))}
            </div>
            <div className="crowd-cta-band" style={{ marginTop: 36 }}>
              <div>
                <strong>Votre profil mérite une comparaison sur-mesure.</strong>
                <p>
                  Bonus/malus, historique de sinistres, kilométrage, usage professionnel —
                  Orizia prend tout en compte pour trouver votre meilleur contrat.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Comparer mon profil →
              </Link>
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
                <h2>Changer d'assurance auto<br />à tout moment — sans frais</h2>
                <p>
                  Depuis la <strong>loi Hamon de 2014</strong>, résiliez votre assurance auto
                  ou moto à tout moment après la première année de contrat — sans frais,
                  sans justification, sans attendre l'anniversaire.
                </p>
                <p>
                  La résiliation prend effet <strong>1 mois</strong> après notification.
                  Pas de jour sans couverture : le nouveau contrat démarre immédiatement
                  après. Orizia gère l'intégralité de la procédure à votre place.
                </p>
                <p>
                  Depuis 2015, les demandes de comparaison auto ont augmenté de{' '}
                  <strong>+23% en un an</strong>. Les conducteurs qui utilisent ce droit
                  économisent en moyenne <strong>200 à 400€/an</strong>.
                </p>
                <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-block', marginTop: 16 }}>
                  📅 Changer de contrat maintenant →
                </Link>
              </div>
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
                  <strong>Durée totale</strong>
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
              <h2>Orizia s'occupe de tout,<br />de A à Z</h2>
              <p>
                De l'analyse de votre profil conducteur à l'alerte anniversaire annuelle —
                un suivi complet sans effort de votre part.
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
                  bénéficiez en plus de l'alerte anniversaire annuelle qui vous évite
                  toute hausse silencieuse.
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
              <h2>Les 4 raisons de ne pas changer —<br />et pourquoi elles ne tiennent pas</h2>
              <p>Des réponses directes, sans langue de bois.</p>
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
                Un profil particulier (malus, résiliation, usage pro) ? On analyse votre cas en 24h.
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
              <h2>Vos questions sur l'assurance auto & moto,<br />nos réponses d'experts</h2>
              <p>Des réponses à jour pour 2026, sans jargon inutile.</p>
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
                Une question sur votre véhicule ou votre profil spécifique ?
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
              <h2>Optimisez toutes vos<br />assurances en un rendez-vous</h2>
              <p>Auto, habitation, emprunteur — Orizia peut tout comparer lors d'un seul échange.</p>
            </div>
            <div className="fin-cards">
              {[
                {
                  href: '/assurer/habitation',
                  icon: '🏠',
                  title: 'Assurance Habitation',
                  sub: 'Protéger votre logement',
                  text: 'Tarifs en hausse de +7% en 2026. Orizia compare les meilleures MRH et gère la résiliation de votre ancien contrat. Économies jusqu\'à 250€/an.',
                },
                {
                  href: '/assurer/emprunteur',
                  icon: '📋',
                  title: 'Assurance Emprunteur',
                  sub: 'Optimiser votre prêt',
                  text: 'Si vous avez un crédit immobilier, changez d\'assurance emprunteur et économisez jusqu\'à 15 000€ sur la durée de votre prêt grâce à la loi Lemoine.',
                },
                {
                  href: '/financer/credit-immobilier',
                  icon: '🏡',
                  title: 'Crédit Immobilier',
                  sub: 'Financer votre projet',
                  text: 'Vous avez un projet immobilier ? Orizia négocie votre crédit et votre assurance emprunteur en même temps pour minimiser le coût total.',
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
            <h2>+5% en 2026 — c'est le moment<br />de faire jouer la concurrence</h2>
            <p>
              Orizia compare les meilleures offres auto et moto du marché,
              gère la résiliation de votre contrat actuel et vous alerte
              chaque année avant le tacite reconduction. Zéro effort. Zéro frais.
              Jusqu'à 400€ économisés par an.
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
              Les économies indiquées sont des estimations basées sur les tarifs moyens de marché mars 2026
              (sources : lecomparateurassurance.com, legipermis.com, jeswitch.fr).
              Les tarifs réels dépendent du profil conducteur, du véhicule et des garanties souscrites.
              Orizia Courtage, courtier en assurance régi par l'ACPR, rémunéré par les assureurs partenaires.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}