import Link from 'next/link';

export const metadata = {
  title: 'Assurance Auto & Moto 2026 : Comparez et Économisez | Orizia Courtage',
  description:
    'Comparez votre assurance auto ou moto en 2026 et économisez jusqu\'à 400€/an. Tiers, intermédiaire, tous risques, loi Hamon, jeune conducteur. Conseil gratuit et indépendant.',
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
    title: 'Assurance Auto & Moto 2026 : Comparez et Économisez | Orizia Courtage',
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
        text: 'La garantie responsabilité civile est la seule assurance obligatoire pour tout véhicule terrestre à moteur en circulation. Elle couvre les dommages causés aux tiers. Rouler sans assurance reste un délit passible d\'une amende, d\'une suspension du permis et d\'une confiscation du véhicule.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre tiers, intermédiaire et tous risques ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le tiers couvre uniquement les dommages causés à autrui. L\'intermédiaire ajoute généralement le vol, l\'incendie et le bris de glace. Le tous risques couvre en plus vos propres dommages, même si vous êtes responsable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on changer d\'assurance auto ou moto en cours d\'année ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, après la première année de contrat, la loi Hamon permet de résilier à tout moment sans frais ni justification. Le nouveau contrat peut prendre le relais sans interruption de couverture.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi les tarifs augmentent-ils encore en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les prix augmentent à cause du coût des réparations, de la hausse des sinistres climatiques et de la complexité électronique des véhicules modernes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment réduire sa prime d\'assurance auto en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les principaux leviers sont la comparaison des offres, l\'ajustement des franchises, le kilométrage déclaré, le choix de la formule adaptée au véhicule et le regroupement de contrats.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi passer par un courtier ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un courtier compare plusieurs assureurs, négocie des offres adaptées à votre profil et gère souvent la résiliation à votre place. Cela permet de gagner du temps et de réduire le coût total.',
      },
    },
  ],
};

const CHIFFRES = [
  { value: '+5%', label: 'Hausse moyenne des tarifs 2026', icon: '📈' },
  { value: '2 177€', label: 'Prime moyenne jeune conducteur/an', icon: '🎓' },
  { value: '602€', label: 'Prime moyenne conducteur expérimenté/an', icon: '🚗' },
  { value: '400€', label: 'Économies max. via un courtier/an', icon: '💰' },
];

const FORMULES_AUTO = [
  {
    nom: 'Au tiers',
    icon: '🛡️',
    prix: '~165–340€/an',
    couleur: '#64748b',
    garanties: [
      { label: 'Responsabilité civile', inclus: true },
      { label: 'Bris de glace', inclus: false },
      { label: 'Vol & incendie', inclus: false },
      { label: 'Catastrophes naturelles', inclus: false },
      { label: 'Dommages tous accidents', inclus: false },
      { label: 'Véhicule de remplacement', inclus: false },
    ],
    pour: 'Véhicule de faible valeur ou ancien',
  },
  {
    nom: 'Intermédiaire',
    icon: '⚖️',
    prix: '~370–550€/an',
    couleur: '#d97706',
    featured: true,
    garanties: [
      { label: 'Responsabilité civile', inclus: true },
      { label: 'Bris de glace', inclus: true },
      { label: 'Vol & incendie', inclus: true },
      { label: 'Catastrophes naturelles', inclus: true },
      { label: 'Dommages tous accidents', inclus: false },
      { label: 'Véhicule de remplacement', inclus: false },
    ],
    pour: 'Véhicule récent sans aller jusqu\'au tous risques',
  },
  {
    nom: 'Tous risques',
    icon: '✅',
    prix: '~637–950€/an',
    couleur: '#16a34a',
    garanties: [
      { label: 'Responsabilité civile', inclus: true },
      { label: 'Bris de glace', inclus: true },
      { label: 'Vol & incendie', inclus: true },
      { label: 'Catastrophes naturelles', inclus: true },
      { label: 'Dommages tous accidents', inclus: true },
      { label: 'Véhicule de remplacement', inclus: true },
    ],
    pour: 'Véhicule neuf, financé ou de forte valeur',
  },
];

const TARIFS_MOTO = [
  { cylindree: '≤ 50 cc', tiers: '200–300€', inter: '300–400€', tousRisques: '400€+', recommande: 'Tiers' },
  { cylindree: '125 cc', tiers: '350–500€', inter: '500–600€', tousRisques: '600–700€', recommande: 'Intermédiaire' },
  { cylindree: '126–600 cc', tiers: '400–500€', inter: '500–700€', tousRisques: '700–950€', recommande: 'Tous risques' },
  { cylindree: '600–999 cc', tiers: '450–600€', inter: '600–900€', tousRisques: '900–1 200€', recommande: 'Tous risques' },
  { cylindree: 'Grosse cylindrée', tiers: '500€+', inter: '800€+', tousRisques: '1 200–1 500€', recommande: 'Tous risques' },
];

const PROFILS_AUTO = [
  {
    icon: '🎓',
    title: 'Jeune conducteur',
    desc: 'Moins de 3 ans de permis.',
    points: [
      'Prime moyenne 2 177€/an en 2026',
      'Surprime jeune conducteur',
      'AAC réduit la prime',
      'Boîtier télématique utile',
    ],
    astuce: 'Un courtier trouve souvent des assureurs plus compétitifs sur ce profil.',
    color: '#dc2626',
  },
  {
    icon: '🚗',
    title: 'Conducteur expérimenté',
    desc: 'Bonus maximum et historique établi.',
    points: [
      'Prime moyenne 602€/an en 2026',
      'Bonus 0,50 = réduction maximale',
      'Large choix de formules',
      'Regroupement multi-véhicule possible',
    ],
    astuce: 'Comparer régulièrement permet d\'éviter l\'érosion silencieuse des tarifs.',
    color: 'var(--orizia-primary)',
    featured: true,
  },
  {
    icon: '🏍️',
    title: 'Motard',
    desc: 'Moto, scooter ou grosse cylindrée.',
    points: [
      'Tarif selon cylindrée',
      'Suspension hivernale possible',
      'Équipement conducteur en option',
      'Contrats spécifiques selon usage',
    ],
    astuce: 'Les contrats saisonniers peuvent réduire la prime annuelle.',
    color: '#7c3aed',
  },
];

const DANGERS = [
  {
    icon: '📈',
    title: 'Les tarifs montent chaque année',
    text: 'Sans comparaison active, vous subissez mécaniquement les hausses de renouvellement.',
  },
  {
    icon: '📋',
    title: 'Le tacite reconduit votre contrat',
    text: 'Si vous ne vérifiez pas l\'avis d\'échéance, vous laissez souvent passer l\'occasion d\'optimiser.',
  },
  {
    icon: '🔍',
    title: 'La formule n\'est plus adaptée',
    text: 'Un tous risques sur une voiture ancienne ou un tiers sur une voiture récente peut coûter trop cher ou protéger trop peu.',
  },
];

const ETAPES = [
  {
    n: '01',
    title: 'Analyse de votre profil',
    text: 'Bonus, sinistres, véhicule, kilométrage, usage perso ou pro, tout est pris en compte.',
  },
  {
    n: '02',
    title: 'Comparaison des offres',
    text: 'Les garanties, franchises, exclusions et tarifs sont comparés pour viser la meilleure formule.',
  },
  {
    n: '03',
    title: 'Résiliation de l\'ancien contrat',
    text: 'Après la première année, la résiliation peut être gérée pour vous sans interruption de couverture.',
  },
  {
    n: '04',
    title: 'Suivi annuel',
    text: 'Une nouvelle comparaison peut être faite chaque année avant le renouvellement.',
  },
];

const OBJECTIONS = [
  {
    q: '« Je suis fidèle depuis longtemps. »',
    r: 'La fidélité ne garantit pas le meilleur tarif. Les écarts restent souvent significatifs.',
  },
  {
    q: '« J\'ai un malus. »',
    r: 'Les profils malussés ont aussi des solutions, souvent via des assureurs spécialisés.',
  },
  {
    q: '« Mon véhicule est ancien. »',
    r: 'Dans ce cas, une formule plus légère peut être bien plus pertinente qu\'un tous risques.',
  },
  {
    q: '« Je roule peu. »',
    r: 'Une formule faible kilométrage ou saisonnière peut réduire fortement la prime.',
  },
];

const LOI_HAMON_POINTS = [
  { icon: '🔄', title: 'Résiliation à tout moment', desc: 'Après 12 mois de contrat, sans frais.' },
  { icon: '📬', title: 'Préavis d\'1 mois', desc: 'Le changement prend effet après notification.' },
  { icon: '🤝', title: 'Orizia gère la résiliation', desc: 'La démarche peut être faite pour vous.' },
  { icon: '📅', title: 'Alerte anniversaire', desc: 'Un rappel avant la date d\'échéance peut éviter le renouvellement automatique.' },
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
            <span className="fin-badge">📈 +5% en 2026 — hausse des tarifs</span>
            <h1>Assurance auto & moto :<br />arrêtez de payer trop cher</h1>
            <p>
              Pour la 3ème année consécutive, les tarifs augmentent de
              <strong> +4 à 6%</strong>. Orizia compare les offres auto et moto du marché
              pour vous aider à économiser jusqu'à <strong>400€/an</strong>.
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

        {/* CHIFFRES */}
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

        {/* DANGERS */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Ce qui fait grimper votre prime
              </span>
              <h2>3 raisons pour lesquelles vous payez<br />plus cher que nécessaire</h2>
              <p>
                Sans comparaison régulière, vous laissez les renouvellements tacites et les hausses tarifaires rogner votre budget.
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
              <span className="fin-badge">Formules Auto 2026</span>
              <h2>Tiers, intermédiaire ou tous risques :<br />laquelle vous correspond vraiment ?</h2>
              <p>
                Le bon niveau de couverture dépend de la valeur du véhicule, de son âge et de votre usage.
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
                  <div className="am-formule-pour">🎯 {f.pour}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MOTO */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Tarifs Moto 2026</span>
              <h2>Assurance moto : les tarifs<br />par cylindrée en 2026</h2>
              <p>
                Le prix dépend surtout de la cylindrée, du type de moto et de l'usage réel.
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
            </div>
          </div>
        </section>

        {/* PROFILS */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Votre profil</span>
              <h2>Jeune conducteur, expérimenté<br />ou motard — le conseil n'est pas le même</h2>
              <p>Chaque profil a ses leviers spécifiques.</p>
            </div>
            <div className="av-profils-grid">
              {PROFILS_AUTO.map(p => (
                <div key={p.title} className={`av-profil-card${p.featured ? ' av-profil-card--featured' : ''}`}>
                  {p.featured && <div className="av-profil-badge">✅ Profil standard</div>}
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
                    💡 {p.astuce}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOI HAMON */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}>
                  ✅ Loi Hamon — Vos droits
                </span>
                <h2>Changer d'assurance auto<br />à tout moment — sans frais</h2>
                <p>
                  Après la première année, la loi Hamon permet de résilier votre contrat auto ou moto à tout moment.
                </p>
                <p>
                  Orizia peut gérer la procédure pour vous afin d\'éviter toute interruption de couverture.
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
              <span className="fin-badge">Notre accompagnement</span>
              <h2>Orizia s'occupe de tout,<br />de A à Z</h2>
              <p>De l'analyse de votre profil à l'alerte annuelle avant renouvellement.</p>
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
              <span className="fin-badge">On répond à vos doutes</span>
              <h2>Les 4 raisons de ne pas changer —<br />et pourquoi elles ne tiennent pas</h2>
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
              <h2>Vos questions sur l'assurance auto & moto,<br />nos réponses d'experts</h2>
            </div>
            <div className="crowd-faq-list">
              {faqSchema.mainEntity.map((f, i) => (
                <details key={i} className="crowd-faq-item">
                  <summary>{f.name}</summary>
                  <p>{f.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* MAILLAGE INTERNE */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Aller plus loin</span>
              <h2>Optimisez toutes vos assurances<br />en un rendez-vous</h2>
            </div>
            <div className="fin-cards">
              {[
                {
                  href: '/assurer/habitation',
                  icon: '🏠',
                  title: 'Assurance Habitation',
                  sub: 'Protéger votre logement',
                  text: 'Comparez et optimisez votre contrat habitation.',
                },
                {
                  href: '/assurer/emprunteur',
                  icon: '📋',
                  title: 'Assurance Emprunteur',
                  sub: 'Optimiser votre prêt',
                  text: 'Réduisez le coût global de votre crédit immobilier.',
                },
                {
                  href: '/financer/credit-immobilier',
                  icon: '🏡',
                  title: 'Crédit Immobilier',
                  sub: 'Financer votre projet',
                  text: 'Négociez votre financement et votre assurance ensemble.',
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

        {/* CTA FINAL */}
        <section className="fin-cta">
          <div className="fin-cta-inner">
            <h2>+5% en 2026 — c'est le moment<br />de faire jouer la concurrence</h2>
            <p>
              Orizia compare les meilleures offres auto et moto, gère la résiliation et vous aide à économiser sans perdre de garanties.
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Comparer mon contrat gratuitement →
              </Link>
              <Link href="/contact" className="fin-btn-outline">
                Poser une question
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}