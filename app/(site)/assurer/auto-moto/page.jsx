import Link from 'next/link';

export const metadata = {
  title: 'Assurance Auto & Moto 2026 : Baissez vos tarifs | Orizia',
  description:
    'Votre assurance auto ou moto flambe ? Je compare les offres, trouve le meilleur tarif et gère la résiliation pour vous. Étude gratuite et indépendante.',
  keywords: [
    'assurance auto courtier',
    'assurance moto pas chère',
    'résilier assurance auto loi hamon',
    'courtier indépendant auto moto',
    'devis assurance auto jeune conducteur',
    'comparatif assurance auto moto',
    'assurance auto tous risques tiers',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/assurer/auto-moto' },
  openGraph: {
    title: 'Assurance Auto & Moto 2026 : Baissez vos tarifs | Orizia',
    description: 'Ne subissez plus les hausses de tarifs de votre assureur. Je compare le marché, optimise vos garanties et m\'occupe de résilier votre ancien contrat. Gratuit et sans engagement.',
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
        text: 'La garantie responsabilité civile (le "tiers") est la seule assurance légalement obligatoire pour tout véhicule terrestre à moteur. Elle indemnise les victimes en cas d\'accident causé par votre véhicule. Rouler sans assurance est un délit lourdement sanctionné.',
      },
    },
    {
      '@type': 'Question',
      name: 'Tiers, intermédiaire ou tous risques : comment choisir ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le Tiers couvre les dégâts causés aux autres. L\'Intermédiaire vous protège contre le vol, l\'incendie et le bris de glace. Le Tous Risques couvre tout, y compris les dégâts sur votre propre véhicule même si vous êtes responsable. En rendez-vous, je vous oriente vers la formule la plus logique selon la cote Argus de votre véhicule.',
      },
    },
    {
      '@type': 'Question',
      name: 'Dois-je attendre la date d\'anniversaire pour changer d\'assureur ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolument pas ! Dès que votre contrat a plus d\'un an, la loi Hamon vous autorise à résilier n\'importe quand, sans frais. Le vrai plus ? Je m\'occupe moi-même des démarches de résiliation pour qu\'il n\'y ait aucune coupure de garantie.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi les tarifs des assurances augmentent-ils encore ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'inflation des pièces détachées, la technologie embarquée de plus en plus coûteuse à réparer, et la hausse des événements climatiques (grêle, tempêtes) font flamber la facture. C\'est pourquoi il est vital de comparer chaque année.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi confier mon assurance à un courtier indépendant ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contrairement à un agent général qui ne vend que sa marque, je travaille pour vous. Je scanne le marché, je négocie les prix, je vous explique les lignes en petits caractères et je gère la paperasse. Vous gagnez du temps, de l\'argent, et vous avez une interlocutrice unique : moi.',
      },
    },
  ],
};

const CHIFFRES = [
  { value: '+5%', label: 'Hausse moyenne subie en 2026', icon: '📈' },
  { value: '1 an', label: 'Délai avant résiliation libre (Hamon)', icon: '🔓' },
  { value: '0€', label: 'Frais de gestion Orizia', icon: '🤝' },
  { value: '400€', label: 'Économies moyennes constatées/an', icon: '💰' },
];

const FORMULES_AUTO = [
  {
    nom: 'Au tiers',
    icon: '🛡️',
    prix: 'Le plus économique',
    couleur: '#64748b',
    garanties: [
      { label: 'Responsabilité civile', inclus: true },
      { label: 'Défense pénale et recours', inclus: true },
      { label: 'Bris de glace', inclus: false },
      { label: 'Vol & incendie', inclus: false },
      { label: 'Dommages tous accidents', inclus: false },
    ],
    pour: 'Idéal pour une voiture ancienne ou de faible valeur.',
  },
  {
    nom: 'Intermédiaire',
    icon: '⚖️',
    prix: 'Le bon compromis',
    couleur: '#d97706',
    featured: true,
    garanties: [
      { label: 'Responsabilité civile', inclus: true },
      { label: 'Défense pénale et recours', inclus: true },
      { label: 'Bris de glace', inclus: true },
      { label: 'Vol & incendie', inclus: true },
      { label: 'Dommages tous accidents', inclus: false },
    ],
    pour: 'Le choix malin pour un véhicule d\'occasion de quelques années.',
  },
  {
    nom: 'Tous risques',
    icon: '✅',
    prix: 'La tranquillité absolue',
    couleur: '#16a34a',
    garanties: [
      { label: 'Responsabilité civile', inclus: true },
      { label: 'Défense pénale et recours', inclus: true },
      { label: 'Bris de glace', inclus: true },
      { label: 'Vol & incendie', inclus: true },
      { label: 'Dommages tous accidents', inclus: true },
    ],
    pour: 'Indispensable pour un véhicule neuf, récent ou en LOA/LLD.',
  },
];

const TARIFS_MOTO = [
  { cylindree: '≤ 50 cc', tiers: 'Dès 200€', inter: 'Dès 300€', tousRisques: 'Sur mesure', recommande: 'Tiers' },
  { cylindree: '125 cc', tiers: 'Dès 350€', inter: 'Dès 500€', tousRisques: 'Sur mesure', recommande: 'Intermédiaire' },
  { cylindree: '126–600 cc', tiers: 'Dès 400€', inter: 'Dès 500€', tousRisques: 'Dès 700€', recommande: 'Tous risques' },
  { cylindree: '600–999 cc', tiers: 'Dès 450€', inter: 'Dès 600€', tousRisques: 'Dès 900€', recommande: 'Tous risques' },
  { cylindree: 'Grosse cylindrée', tiers: 'Dès 500€', inter: 'Dès 800€', tousRisques: 'Dès 1 200€', recommande: 'Tous risques' },
];

const PROFILS_AUTO = [
  {
    icon: '🎓',
    title: 'Jeune conducteur',
    desc: 'La prime pique les yeux la première année.',
    points: [
      'Surprime légale applicable',
      'La conduite accompagnée (AAC) fait baisser le prix',
      'Boîtier connecté = bonne idée',
    ],
    astuce: 'Mon conseil : Je démarche les assureurs qui sont plus cléments avec les novices pour diviser la note.',
    color: '#dc2626',
  },
  {
    icon: '🚗',
    title: 'Conducteur expérimenté',
    desc: 'Bonus à 50% depuis des années.',
    points: [
      'Vous devriez payer le prix plancher',
      'Possibilité de rachat de franchise',
      'Regroupement familial très avantageux',
    ],
    astuce: 'Attention à "l\'érosion de fidélité" : si vous n\'avez pas changé depuis 5 ans, vous payez très probablement trop cher.',
    color: 'var(--orizia-primary)',
    featured: true,
  },
  {
    icon: '🏍️',
    title: 'Motard',
    desc: 'Du scooter urbain à la grosse cylindrée.',
    points: [
      'Garantie équipement (casque, gants, cuir)',
      'Option suspension hivernale',
      'Assistance 0km indispensable',
    ],
    astuce: 'Je construis des contrats modulables. Si votre moto hiberne 4 mois dans l\'année, votre facture aussi.',
    color: '#7c3aed',
  },
];

const DANGERS = [
  {
    icon: '📈',
    title: 'La taxe invisible de la fidélité',
    text: 'En assurance, être fidèle coûte cher. Votre assureur augmente discrètement votre tarif de 4 à 6% chaque année au moment du renouvellement automatique.',
  },
  {
    icon: '📋',
    title: 'Le piège des garanties inutiles',
    text: 'Payer un "Tous risques" sur une Clio de 2010 qui ne cote plus grand-chose ? C\'est de l\'argent jeté par les fenêtres. Les formules doivent évoluer avec votre voiture.',
  },
  {
    icon: '🔍',
    title: 'Le parcours du combattant',
    text: 'Chercher, comparer 15 devis, lire les petites lignes des franchises, faire la lettre recommandée de résiliation... C\'est long. C\'est pour ça que je le fais pour vous.',
  },
];

const ETAPES = [
  {
    n: '01',
    title: 'J\'écoute vos besoins',
    text: 'Pas de questionnaire robotique. On fait le point ensemble sur votre véhicule, votre usage (pro/perso) et votre historique (bonus/malus).',
  },
  {
    n: '02',
    title: 'Je chasse le meilleur contrat',
    text: 'Je compare les offres de mes partenaires assureurs en épluchant ce qui compte vraiment : le tarif, mais surtout les franchises et les exclusions.',
  },
  {
    n: '03',
    title: 'Je m\'occupe de la paperasse',
    text: 'Votre contrat a plus d\'un an ? Parfait. Grâce à la loi Hamon, je résilie votre ancienne assurance en votre nom. Zéro coupure, zéro stress.',
  },
  {
    n: '04',
    title: 'Je veille sur vous chaque année',
    text: 'Je ne disparais pas après la signature. À chaque date anniversaire, on vérifie si votre contrat est toujours le plus compétitif du marché.',
  },
];

const OBJECTIONS = [
  {
    q: '« Je suis dans la même agence depuis 10 ans, ils me connaissent. »',
    r: 'Humainement, c\'est agréable. Financièrement, c\'est souvent une erreur. Les algorithmes des assureurs ne récompensent plus la fidélité. Laissez-moi comparer, juste pour voir.',
  },
  {
    q: '« J\'ai eu un accrochage récent, personne ne voudra de moi. »',
    r: 'Faux. Même avec un petit malus, certaines compagnies spécialisées proposent des tarifs agressifs. C\'est mon métier de savoir à quelle porte frapper.',
  },
  {
    q: '« Je roule très peu, je télétravaille. »',
    r: 'Excellente nouvelle pour votre portefeuille ! Les formules "Pay as you drive" ou forfait kilométrique peuvent réduire votre facture de 30%.',
  },
  {
    q: '« Les démarches de changement m\'épuisent d\'avance. »',
    r: 'C\'est la raison d\'être de mon accompagnement : je rédige et j\'envoie la résiliation (Loi Hamon). Vous n\'avez strictement rien à faire.',
  },
];

const LOI_HAMON_POINTS = [
  { icon: '🔄', title: 'Liberté totale', desc: 'Après 1 an, vous êtes libre de partir quand vous voulez.' },
  { icon: '📬', title: 'Préavis express', desc: '1 mois seulement pour basculer sur le nouveau contrat.' },
  { icon: '🤝', title: 'Je gère la transition', desc: 'Je m\'occupe de toute la liaison avec votre ancien assureur.' },
  { icon: '🛡️', title: 'Zéro interruption', desc: 'La nouvelle assurance prend le relais à la minute près.' },
];

export default function AssuranceAutoMotoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        {/* HERO */}
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
            <span className="fin-badge">📈 +5% d'augmentation en 2026</span>
            <h1>Votre assurance auto flambe ?<br />Je remets les compteurs à zéro.</h1>
            <p>
              Arrêtez de payer la taxe de la fidélité. Je compare les offres du marché, 
              <strong> je déniche le tarif le plus juste </strong> et je gère toute la résiliation 
              à votre place. Un accompagnement <strong>100% dédié à vos intérêts</strong>.
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Faire un bilan gratuit avec Cindy →
              </Link>
              <Link href="#formules" className="fin-btn-secondary">
                🔍 Voir les formules
              </Link>
            </div>
            <div className="fin-hero-trust">
              <span>✅ Loi Hamon : je m'occupe de résilier</span>
              <span>🚗 Courtage 100% indépendant</span>
              <span>⚡ Étude personnalisée sous 24h</span>
            </div>
          </div>
        </section>

        {/* CHIFFRES */}
        <section className="fin-chiffres">
          <div className="fin-chiffres-inner">
            {CHIFFRES.map(c => (
              <div key={c.label} className="fin-chiffre">
                <strong>{c.icon} {c.value}</strong>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CITATION CINDY */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div style={{
              background: '#fff',
              borderRadius: 16,
              padding: '36px 40px',
              borderLeft: '5px solid var(--orizia-primary)',
              boxShadow: '0 4px 24px rgba(58,111,108,0.08)',
              maxWidth: 780,
              margin: '0 auto',
            }}>
              <p style={{
                fontSize: '1.2rem',
                fontWeight: 800,
                color: 'var(--orizia-accent)',
                lineHeight: 1.55,
                marginBottom: 16,
              }}>
                « Chaque année, votre fidélité est paradoxalement sanctionnée par une hausse de vos cotisations. »
              </p>
              <p style={{
                fontSize: '1rem',
                color: 'var(--orizia-dark)',
                lineHeight: 1.75,
                margin: '0 0 20px',
                opacity: 0.8,
              }}>
                Mon rôle est de dire stop à ces augmentations silencieuses. Je mets les assureurs en concurrence, je déniche les garanties qui vous protègent vraiment, et surtout : je m'occupe de toute la paperasse pour résilier votre ancien contrat. Vous roulez l'esprit léger, je gère le reste.
              </p>
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--orizia-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                — Cindy Urbansky, courtière indépendante · Orizia Courtage
              </span>
            </div>
          </div>
        </section>

        {/* DANGERS */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Ce qui grignote votre budget
              </span>
              <h2>Pourquoi vous payez certainement<br />votre assurance trop cher</h2>
              <p>
                Si vous laissez faire, votre assureur en profite. Voici comment vous perdez de l'argent sans vous en rendre compte.
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
          </div>
        </section>

        {/* FORMULES AUTO */}
        <section id="formules" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Cibler vos besoins</span>
              <h2>Tiers, intermédiaire ou tous risques :<br />on adapte la formule à votre voiture</h2>
              <p>
                Ne payez que pour les garanties qui ont un sens par rapport à la valeur actuelle de votre véhicule.
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
                      ⚖️ Le meilleur compromis
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
                  <div className="am-formule-pour">💡 {f.pour}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MOTO */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Spécial Motards ✌️</span>
              <h2>Assurance moto : on ajuste<br />selon la cylindrée et l'usage</h2>
              <p>
                Parce qu'on n'assure pas un scooter 125cc comme une routière de 1000cc.
              </p>
            </div>
            <div className="am-moto-table-wrap" style={{ overflowX: 'auto' }}>
              <table className="ae-taux-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Cylindrée</th>
                    <th className="ae-col--banque">Au tiers</th>
                    <th>Intermédiaire</th>
                    <th className="ae-col--courtier">Tous risques</th>
                    <th>Recommandation</th>
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
            </div>
          </div>
        </section>

        {/* PROFILS */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Sur-mesure</span>
              <h2>À chaque profil,<br />sa stratégie pour faire baisser le prix</h2>
              <p>Je ne rentre personne dans des cases génériques. On cherche les leviers qui vous correspondent.</p>
            </div>
            <div className="av-profils-grid">
              {PROFILS_AUTO.map(p => (
                <div key={p.title} className={`av-profil-card${p.featured ? ' av-profil-card--featured' : ''}`}>
                  {p.featured && <div className="av-profil-badge">✅ Profil le plus courant</div>}
                  <div className="av-profil-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p className="av-profil-desc">{p.desc}</p>
                  <ul className="ah-profil-points" style={{ marginBottom: 12 }}>
                    {p.points.map((pt, i) => <li key={i}>• {pt}</li>)}
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
                    {p.astuce}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Étudier mon profil avec Cindy →
              </Link>
            </div>
          </div>
        </section>

        {/* LOI HAMON */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}>
                  ✅ Loi Hamon — Je m'occupe de tout
                </span>
                <h2>Changer d'assureur<br />n'a jamais été aussi simple</h2>
                <p>
                  Vous craignez la paperasse ? Rassurez-vous. Dès que votre contrat actuel a soufflé sa première bougie, <strong>vous avez le droit de partir à tout moment</strong>.
                </p>
                <p>
                  Et la meilleure nouvelle ? Vous ne faites aucune lettre recommandée. <strong>C'est moi qui m'occupe de résilier pour vous</strong>.
                </p>
              </div>
              <div className="crowd-schema">
                <div style={{
                  textAlign: 'center',
                  marginBottom: 16,
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--orizia-primary)',
                }}>
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
              </div>
            </div>
          </div>
        </section>

        {/* ACCOMPAGNEMENT */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mon accompagnement</span>
              <h2>Je gère votre dossier<br />de A à Z</h2>
              <p>Pas de plateforme téléphonique. Je suis votre interlocutrice unique, du devis jusqu'à la signature.</p>
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
          </div>
        </section>

        {/* OBJECTIONS */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">On en parle ?</span>
              <h2>Les excuses qu'on se donne pour ne pas changer<br />(et pourquoi il faut franchir le cap)</h2>
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

        {/* FAQ */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions, mes réponses d'experte</h2>
              <p>La transparence avant tout. Si vous avez une question plus spécifique, n'hésitez pas à me contacter.</p>
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
              <Link href="/contact" className="fin-btn-secondary">
                ✉️ Poser une autre question à Cindy
              </Link>
            </div>
          </div>
        </section>

        {/* MAILLAGE INTERNE */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Vision globale</span>
              <h2>Puisqu'on y est, si on optimisait<br />le reste de vos contrats ?</h2>
              <p>Faire le tri dans l'auto, c'est bien. Regrouper ses assurances pour avoir un conseiller unique et faire des économies d'échelle, c'est mieux.</p>
            </div>
            <div className="fin-cards">
              {[
                {
                  href: '/assurer/assurance-habitation',
                  icon: '🏠',
                  title: 'Assurance Habitation',
                  sub: 'Protéger votre cocon',
                  text: 'Comme pour l\'auto, les tarifs augmentent. Faisons le point pour protéger vos biens au prix juste.',
                },
                {
                  href: '/assurer/assurance-emprunteur',
                  icon: '📋',
                  title: 'Assurance Emprunteur',
                  sub: 'L\'économie massive',
                  text: 'C\'est souvent là que je vous fais gagner le plus d\'argent (plusieurs milliers d\'euros sur un crédit immobilier).',
                },
                {
                  href: '/investir/per',
                  icon: '💰',
                  title: 'Plan Épargne Retraite',
                  sub: 'Défiscaliser utile',
                  text: 'Vos économies d\'assurance réinvesties dans votre retraite, avec une déduction d\'impôt à la clé.',
                },
              ].map(s => (
                <Link href={s.href} key={s.title} className="fin-card">
                  <div className="fin-card-icon">{s.icon}</div>
                  <div className="fin-card-sub">{s.sub}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="fin-card-link">Découvrir l'approche →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="fin-cta">
          <div className="fin-cta-inner">
            <h2>Prêt(e) à arrêter de payer<br />votre assurance trop cher ?</h2>
            <p>
              Je compare les meilleures offres du marché, je vous conseille en totale indépendance et je m'occupe de la paperasse. Vous n'avez plus d'excuses pour ne pas faire d'économies.
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Lancer ma comparaison avec Cindy →
              </Link>
              <Link href="/contact" className="fin-btn-outline">
                ✉️ M'envoyer un message
              </Link>
            </div>
            <p style={{
              marginTop: 24, fontSize: '0.75rem', opacity: 0.55,
              maxWidth: 540, margin: '24px auto 0',
            }}>
              L'économie réalisée dépend de votre profil, de votre bonus-malus et de votre lieu de résidence. 
              Orizia Courtage est immatriculée à l'ORIAS. Je travaille dans vos intérêts et suis rémunérée 
              par la compagnie d'assurance choisie, sans surcoût pour vous.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}