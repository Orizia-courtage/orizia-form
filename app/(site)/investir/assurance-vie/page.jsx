import Link from 'next/link';
// import SimulateurAssuranceVie from '@/components/SimulateurAssuranceVie';

export const metadata = {
  title: 'Assurance Vie 2026 : Épargne, Rendement & Transmission | Orizia Courtage',
  description:
    'Tout savoir sur l\'assurance vie en 2026 : fonctionnement, rendements, fiscalité avantageuse après 8 ans, transmission du patrimoine. Orizia Courtage vous aide à choisir le meilleur contrat adapté à votre profil. Conseil indépendant et gratuit.',
  keywords: [
    'assurance vie 2026',
    'meilleure assurance vie',
    'assurance vie courtier indépendant',
    'assurance vie rendement',
    'assurance vie fiscalité',
    'ouvrir assurance vie',
    'assurance vie unités de compte',
    'assurance vie transmission patrimoine',
  ],
  alternates: { canonical: 'https://orizia.fr/investir/assurance-vie' },
  openGraph: {
    title: 'Assurance Vie 2026 : Épargne, Rendement & Transmission | Orizia Courtage',
    description: 'L\'enveloppe fiscale préférée des Français. Orizia Courtage sélectionne pour vous le meilleur contrat selon votre profil. Gratuit, indépendant, personnalisé.',
    url: 'https://orizia.fr/investir/assurance-vie',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu\'est-ce que l\'assurance vie ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'assurance vie est un contrat d\'épargne entre vous et un assureur. Vous versez des primes qui sont investies sur des supports en euros (capital garanti) et/ou en unités de compte (actions, obligations, SCPI…). À tout moment, vous pouvez effectuer des rachats partiels ou totaux. En cas de décès, le capital est transmis aux bénéficiaires désignés avec une fiscalité très avantageuse.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le rendement d\'une assurance vie en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En 2026, les fonds en euros rapportent en moyenne 2,5 à 3,5% brut par an. Les unités de compte offrent un potentiel de 4 à 8%/an selon les supports choisis, avec un risque de perte en capital. Un contrat mixte (70% fonds euros / 30% UC) génère une hypothèse de rendement autour de 1,85%/an. Un contrat 100% UC peut viser 5%/an sur le long terme.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la fiscalité de l\'assurance vie après 8 ans ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Après 8 ans, les gains bénéficient d\'un abattement annuel de 4 600€ pour une personne seule ou 9 200€ pour un couple. Au-delà, un taux réduit de 7,5% s\'applique (PFNL), plus 17,2% de prélèvements sociaux. C\'est la fiscalité la plus avantageuse pour l\'épargne longue durée en France.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on retirer son argent d\'une assurance vie quand on veut ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Contrairement à une idée reçue, votre argent n\'est pas bloqué. Vous pouvez effectuer des rachats partiels ou totaux à tout moment. Seule la fiscalité change selon l\'ancienneté du contrat : elle est plus avantageuse après 8 ans.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi passer par un courtier pour ouvrir une assurance vie ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les contrats distribués par les banques sont souvent moins performants (frais sur versements élevés, fonds euros peu compétitifs, choix d\'UC limité) que ceux accessibles via un courtier indépendant. Orizia Courtage accède à une sélection de contrats haut de gamme normalement réservés aux professionnels, et vous accompagne dans le choix de l\'allocation adaptée à votre profil.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment l\'assurance vie permet-elle de transmettre son patrimoine ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En désignant un bénéficiaire dans votre contrat, le capital lui est transmis hors succession : jusqu\'à 152 500€ par bénéficiaire sans droits de succession pour les versements effectués avant 70 ans. C\'est le meilleur outil de transmission du patrimoine disponible en France.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps dure un rendez-vous avec Orizia ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le premier rendez-vous dure environ 45 minutes, en visioconférence ou par téléphone. Nous analysons votre situation patrimoniale, vos objectifs et votre profil de risque. Sous 48h, vous recevez une recommandation personnalisée avec les contrats sélectionnés et l\'allocation conseillée. L\'accompagnement est 100% gratuit.',
      },
    },
  ],
};

const DANGERS = [
  {
    icon: '🏦',
    title: 'Les contrats bancaires sont souvent sous-performants',
    text: 'Frais de versement de 2 à 4%, fonds euros peu compétitifs, gamme d\'UC limitée aux fonds maison : votre conseiller bancaire vous vend le contrat de son employeur, pas le meilleur du marché. La différence sur 20 ans peut représenter des dizaines de milliers d\'euros.',
  },
  {
    icon: '📊',
    title: 'L\'allocation ne s\'improvise pas',
    text: 'Un contrat 100% fonds euros sous-performe l\'inflation. Un contrat 100% UC peut perdre 30% en un an. Trouver le bon équilibre entre sécurité et performance nécessite une analyse de votre horizon, de votre tolérance au risque et de votre TMI.',
  },
  {
    icon: '📜',
    title: 'La clause bénéficiaire est souvent bâclée',
    text: 'Une clause bénéficiaire mal rédigée peut transformer votre outil de transmission en cauchemar successoral. Les formules standard des assureurs ne couvrent pas les situations familiales complexes (enfants de plusieurs unions, PACS, donation-partage…).',
  },
];

const AVANTAGES = [
  { icon: '📈', title: 'Double moteur de performance', text: 'Combinez la sécurité du fonds en euros (capital garanti) avec le potentiel des unités de compte pour viser jusqu\'à 5–8%/an sur le long terme.' },
  { icon: '🏦', title: 'Fiscalité ultra-avantageuse', text: 'Après 8 ans : abattement de 4 600€ (ou 9 200€ en couple) + taux réduit à 7,5%. Aucun autre placement n\'offre cette enveloppe fiscale.' },
  { icon: '💸', title: 'Capital toujours disponible', text: 'Votre argent n\'est pas bloqué. Rachats partiels possibles à tout moment, en quelques jours. Idéal pour une épargne de précaution ou de projet.' },
  { icon: '🎁', title: 'Transmission hors succession', text: 'Jusqu\'à 152 500€ par bénéficiaire transmis sans droits de succession. Le meilleur outil de transmission du patrimoine en France.' },
  { icon: '🔄', title: 'Versements flexibles', text: 'Versement initial unique, versements programmés mensuels, trimestriels ou annuels — ou les deux. Adaptez votre épargne à votre capacité du moment.' },
  { icon: '🌍', title: 'Accès aux meilleures classes d\'actifs', text: 'Via les unités de compte, accédez à des SCPI, ETF, fonds actions mondiales, private equity et fonds obligataires dans une seule enveloppe.' },
];

const RISQUES = [
  {
    niveau: 'Faible', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '🟢',
    title: 'Perte en capital sur fonds euros',
    text: 'Le fonds en euros est à capital garanti par l\'assureur. Sauf faillite de l\'assureur (couverte jusqu\'à 70 000€ par le FGAP), vous ne pouvez pas perdre votre capital sur cette partie.',
    mitigation: 'Notre rôle : sélectionner des assureurs solides avec des fonds euros compétitifs.',
  },
  {
    niveau: 'Moyen', color: '#d97706', bg: '#fffbeb', border: '#fed7aa', icon: '🟠',
    title: 'Perte en capital sur unités de compte',
    text: 'Les UC sont soumises aux fluctuations des marchés financiers. Sur 1 an, un fonds actions peut perdre 20 à 30%. Sur 10–20 ans, l\'historique montre des performances positives significatives.',
    mitigation: 'Notre rôle : calibrer la part UC à votre horizon de placement et votre tolérance au risque.',
  },
  {
    niveau: 'Faible', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '🟢',
    title: 'Risque de liquidité',
    text: 'Votre capital est disponible à tout moment. Le seul "risque" est de racheter en période de baisse des marchés pour la part UC. Le fonds euros est lui toujours disponible à sa valeur.',
    mitigation: 'Notre rôle : dimensionner la part sécurisée pour couvrir vos besoins de liquidité à court terme.',
  },
  {
    niveau: 'Faible', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '🟢',
    title: 'Risque de contrepartie',
    text: 'En cas de défaillance de l\'assureur, le Fonds de Garantie des Assurances de Personnes (FGAP) couvre jusqu\'à 70 000€ par assureur et par assuré.',
    mitigation: 'Notre rôle : diversifier sur 2 assureurs si votre capital dépasse 70 000€.',
  },
];

const ETAPES = [
  {
    n: '01',
    title: 'Analyse de votre situation',
    text: 'Objectif (épargne, retraite, transmission), horizon de placement, TMI, capacité d\'épargne mensuelle, patrimoine existant — tout est pris en compte avant de recommander quoi que ce soit.',
  },
  {
    n: '02',
    title: 'Sélection du contrat optimal',
    text: 'Nous accédons à une sélection de contrats haut de gamme — Abeille Épargne Active, Cardif Elite, Celebéa Vie, SwissLife Strategic Premium, SwissLife Vie Génération — exclusivement distribués via des courtiers agréés.',
  },
  {
    n: '03',
    title: 'Construction de l\'allocation',
    text: 'Fonds euros, UC obligataires, actions, SCPI, ETF — nous construisons une allocation personnalisée à votre profil de risque, révisée chaque année lors d\'un bilan annuel.',
  },
  {
    n: '04',
    title: 'Rédaction de la clause bénéficiaire',
    text: 'Nous rédigeons avec vous une clause bénéficiaire sur-mesure adaptée à votre situation familiale pour optimiser la transmission de votre patrimoine hors succession.',
  },
];

const PROFILS = [
  {
    icon: '🛡️',
    title: 'Profil Prudent',
    desc: 'Vous prioritisez la sécurité de votre capital.',
    repart: '80% Fonds euros / 20% UC',
    rendement: '~1,4%/an',
    for: 'Horizon < 8 ans, faible tolérance au risque',
    color: 'var(--orizia-primary)',
  },
  {
    icon: '⚖️',
    title: 'Profil Équilibré',
    desc: 'Vous cherchez un bon équilibre sécurité / performance.',
    repart: '50% Fonds euros / 50% UC',
    rendement: '~2,75%/an',
    for: 'Horizon 8–15 ans, profil de risque modéré',
    color: '#d97706',
    featured: true,
  },
  {
    icon: '🚀',
    title: 'Profil Dynamique',
    desc: 'Vous visez la performance maximale sur le long terme.',
    repart: '20% Fonds euros / 80% UC',
    rendement: '~4,1%/an',
    for: 'Horizon 15+ ans, forte tolérance au risque',
    color: '#dc2626',
  },
];

const OBJECTIONS = [
  {
    q: '« J\'ai déjà une assurance vie en banque. »',
    r: 'C\'est le cas de la majorité de nos clients. Nous commençons toujours par auditer votre contrat existant. Si les frais sont trop élevés ou la performance décevante, nous vous guidons vers une solution plus adaptée — sans vous obliger à fermer l\'actuel.',
  },
  {
    q: '« Je ne sais pas combien placer. »',
    r: 'C\'est précisément pour ça que le rendez-vous existe. Nous analysons votre budget, vos charges, vos projets et définissons ensemble un montant initial et une mensualité qui ne mettent pas votre quotidien en péril.',
  },
  {
    q: '« J\'ai peur de prendre des risques. »',
    r: 'Nous calibrons l\'allocation à votre profil réel. Un profil prudent peut rester à 80–100% sur le fonds en euros, capital garanti. Vous ne prenez jamais plus de risque que ce que vous avez explicitement accepté.',
  },
  {
    q: '« Est-ce vraiment gratuit ? »',
    r: 'Totalement. Orizia est rémunéré par l\'assureur partenaire sous forme de commission de distribution, incluse dans le contrat. Ce système est encadré par la réglementation DDA et nous vous est communiqué de manière transparente dès le premier rendez-vous.',
  },
];

export default function AssuranceViePage() {
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
              <Link href="/investir" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Investir</Link>
              {' › '}
              <span>Assurance Vie</span>
            </nav>
            <span className="fin-badge">🛡️ L'enveloppe fiscale préférée des Français</span>
            <h1>Assurance vie : épargnez,<br />investissez, transmettez</h1>
            <p>
              L'assurance vie est le placement le plus polyvalent du patrimoine français :
              épargne disponible, rendement optimisé, fiscalité allégée après 8 ans et
              transmission hors succession jusqu'à <strong>152 500€ par bénéficiaire</strong>.
              Orizia sélectionne le meilleur contrat pour vous. <strong>Gratuitement.</strong>
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Prendre rendez-vous gratuitement →
              </Link>
              <Link href="#notre-approche" className="fin-btn-secondary">
                🔍 Découvrir notre approche
              </Link>
            </div>
            <div className="fin-hero-trust">
              <span>✅ 0% de frais sur versements</span>
              <span>🏦 Contrats haut de gamme sélectionnés</span>
              <span>⚡ Réponse sous 24h</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
        <section className="fin-chiffres">
          <div className="fin-chiffres-inner">
            <div className="fin-chiffre"><strong>1 900 Mds€</strong><span>Encours total en France</span></div>
            <div className="fin-chiffre"><strong>2,5–5%</strong><span>Rendement annuel selon profil</span></div>
            <div className="fin-chiffre"><strong>152 500€</strong><span>Exonération par bénéficiaire</span></div>
            <div className="fin-chiffre"><strong>8 ans</strong><span>Pour la fiscalité optimale</span></div>
          </div>
        </section>

        {/* ── IDÉES REÇUES ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Ce que votre banque ne vous dit pas
              </span>
              <h2>Pourquoi votre contrat actuel<br />vous coûte probablement de l'argent</h2>
              <p>
                90% des contrats d'assurance vie en France sont souscrits en banque.
                Et 90% des Français paient trop de frais pour des performances insuffisantes.
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
                Orizia accède aux meilleurs contrats du marché avec 0% de frais sur versements.
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 20 }}>
                Un audit gratuit de votre contrat actuel vous permet de mesurer concrètement ce que vous perdez.
              </p>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Auditer mon contrat gratuitement →
              </Link>
            </div>
          </div>
        </section>

        {/* ── QU'EST-CE QUE L'AV ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge">Définition</span>
                <h2>Assurance vie :<br />bien plus qu'une épargne</h2>
                <p>
                  L'assurance vie est une <strong>enveloppe fiscale</strong> qui contient vos
                  investissements — pas un simple livret. À l'intérieur, vous choisissez les
                  supports : <strong>fonds en euros</strong> (capital garanti, rendement stable)
                  et <strong>unités de compte</strong> (actions, obligations, SCPI, ETF…).
                </p>
                <p>
                  Contrairement à une idée reçue, votre argent <strong>n'est pas bloqué</strong>.
                  Vous pouvez effectuer des rachats partiels ou totaux à tout moment, en quelques
                  jours ouvrés. La durée de 8 ans n'est qu'un seuil de maturité fiscale — pas une
                  période de blocage.
                </p>
                <p>
                  C'est aussi un <strong>outil de transmission</strong> hors du commun :
                  le capital est versé directement aux bénéficiaires désignés, hors succession,
                  avec une fiscalité spécifique très avantageuse.
                </p>
              </div>
              <div className="crowd-schema">
                <div style={{ textAlign: 'center', marginBottom: 16, fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--orizia-primary)' }}>
                  Structure d'un contrat
                </div>
                <div className="crowd-schema-step crowd-schema-step--orizia">
                  <div className="crowd-schema-icon">🛡️</div>
                  <strong>Votre contrat d'assurance vie</strong>
                  <span>Sélectionné et optimisé par Orizia</span>
                </div>
                <div className="crowd-schema-arrow">↓</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="crowd-schema-step" style={{ background: 'rgba(58,111,108,0.08)' }}>
                    <div className="crowd-schema-icon">🏦</div>
                    <strong>Fonds en euros</strong>
                    <span>Capital garanti · 2,5–3,5%/an</span>
                  </div>
                  <div className="crowd-schema-step" style={{ background: 'rgba(217,119,6,0.08)' }}>
                    <div className="crowd-schema-icon">📈</div>
                    <strong>Unités de Compte</strong>
                    <span>Marchés financiers · 4–8%/an</span>
                  </div>
                </div>
                <div className="crowd-schema-arrow">↓</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="crowd-schema-step" style={{ padding: '12px 14px' }}>
                    <div className="crowd-schema-icon" style={{ fontSize: '1.2rem' }}>💸</div>
                    <strong style={{ fontSize: '0.8rem' }}>Rachat partiel</strong>
                    <span>À tout moment</span>
                  </div>
                  <div className="crowd-schema-step crowd-schema-step--result" style={{ padding: '12px 14px' }}>
                    <div className="crowd-schema-icon" style={{ fontSize: '1.2rem' }}>🎁</div>
                    <strong style={{ fontSize: '0.8rem' }}>Transmission</strong>
                    <span>Hors succession</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── AVANTAGES ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Les atouts</span>
              <h2>6 raisons pour lesquelles<br />l'assurance vie reste imbattable</h2>
              <p>
                Dans un univers de placements complexe, l'assurance vie reste le seul véhicule
                qui combine épargne, investissement, fiscalité et transmission dans une seule enveloppe.
              </p>
            </div>
            <div className="crowd-avantages-grid">
              {AVANTAGES.map(a => (
                <div key={a.title} className="crowd-avantage-card">
                  <div className="crowd-avantage-icon">{a.icon}</div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROFILS ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Votre profil de risque</span>
              <h2>Prudent, équilibré ou dynamique :<br />quelle allocation pour vous ?</h2>
              <p>
                Il n'existe pas une assurance vie universelle. L'allocation idéale dépend
                de votre âge, de votre horizon et de votre tolérance aux fluctuations.
              </p>
            </div>
            <div className="av-profils-grid">
              {PROFILS.map(p => (
                <div key={p.title} className={`av-profil-card${p.featured ? ' av-profil-card--featured' : ''}`}>
                  {p.featured && <div className="av-profil-badge">⭐ Le plus choisi</div>}
                  <div className="av-profil-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p className="av-profil-desc">{p.desc}</p>
                  <div className="av-profil-repart"><span>{p.repart}</span></div>
                  <div className="av-profil-rendement" style={{ color: p.color }}>{p.rendement}</div>
                  <p className="av-profil-for">🎯 {p.for}</p>
                </div>
              ))}
            </div>
            <div className="crowd-cta-band" style={{ marginTop: 36 }}>
              <div>
                <strong>Votre profil optimal est entre les mains d'un expert.</strong>
                <p>
                  Un conseiller Orizia analyse votre situation complète : TMI, objectifs,
                  horizon et patrimoine existant pour définir l'allocation la plus pertinente.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Définir mon profil →
              </Link>
            </div>
          </div>
        </section>

        {/* ── RISQUES ── */}
        <section className="crowd-section" style={{ background: '#fafafa' }}>
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Analyse des risques
              </span>
              <h2>Les risques réels,<br />sans langue de bois</h2>
              <p>
                L'assurance vie est l'un des placements les moins risqués — à condition
                d'être bien structurée. Voici une analyse transparente de chaque risque.
              </p>
            </div>
            <div className="crowd-risques-grid">
              {RISQUES.map(r => (
                <div key={r.title} className="crowd-risque-card" style={{ background: r.bg, borderColor: r.border }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: '1.4rem' }}>{r.icon}</span>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: r.color }}>
                        Risque {r.niveau}
                      </span>
                      <h3 style={{ margin: 0, color: r.color }}>{r.title}</h3>
                    </div>
                  </div>
                  <p>{r.text}</p>
                  <div className="crowd-risque-tip">🛡️ {r.mitigation}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FISCALITÉ ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Fiscalité 2026</span>
              <h2>La fiscalité de l'assurance vie,<br />expliquée simplement</h2>
              <p>
                La fiscalité de l'assurance vie est l'une des plus avantageuses du patrimoine
                français — mais elle dépend de l'ancienneté du contrat et du montant des versements.
              </p>
            </div>
            <div className="av-fiscal-timeline">
              <div className="av-fiscal-tl-item">
                <div className="av-fiscal-tl-dot av-fiscal-tl-dot--warn">0–4 ans</div>
                <div className="av-fiscal-tl-content">
                  <h4>Avant 4 ans</h4>
                  <p>PFNL 12,8% + 17,2% PS = <strong>30%</strong> sur les gains. Ou option barème IR l'année suivante.</p>
                  <div className="av-fiscal-tl-tag av-fiscal-tl-tag--warn">⚠️ Peu favorable</div>
                </div>
              </div>
              <div className="av-fiscal-tl-connector" />
              <div className="av-fiscal-tl-item">
                <div className="av-fiscal-tl-dot av-fiscal-tl-dot--mid">4–8 ans</div>
                <div className="av-fiscal-tl-content">
                  <h4>De 4 à 8 ans</h4>
                  <p>PFNL 12,8% + 17,2% PS. Option barème IR N+1. Pas encore d'abattement annuel.</p>
                  <div className="av-fiscal-tl-tag av-fiscal-tl-tag--mid">⏳ En attente</div>
                </div>
              </div>
              <div className="av-fiscal-tl-connector" />
              <div className="av-fiscal-tl-item">
                <div className="av-fiscal-tl-dot av-fiscal-tl-dot--good">8 ans+</div>
                <div className="av-fiscal-tl-content">
                  <h4>Après 8 ans ✅</h4>
                  <p>Abattement annuel <strong>4 600€ (seul)</strong> ou <strong>9 200€ (couple)</strong>. Puis PFNL 7,5% + 17,2% PS.</p>
                  <div className="av-fiscal-tl-tag av-fiscal-tl-tag--good">✅ Fiscalité optimale</div>
                </div>
              </div>
            </div>
            <div className="av-transmission-bloc">
              <div className="av-transmission-header">
                <span>🎁</span>
                <h3>Transmission : l'atout majeur de l'assurance vie</h3>
              </div>
              <div className="av-transmission-grid">
                <div className="av-transm-item">
                  <strong>Versements avant 70 ans</strong>
                  <span>Jusqu'à <strong>152 500€ par bénéficiaire</strong> transmis sans droits de succession</span>
                </div>
                <div className="av-transm-item">
                  <strong>Versements après 70 ans</strong>
                  <span>Abattement global de <strong>30 500€</strong> sur les primes versées. Les gains sont exonérés.</span>
                </div>
                <div className="av-transm-item">
                  <strong>Conjoint / partenaire PACS</strong>
                  <span>Exonération <strong>totale</strong> des droits de succession, sans plafond</span>
                </div>
                <div className="av-transm-item">
                  <strong>Hors succession</strong>
                  <span>Le capital ne rentre pas dans l'actif successoral — liberté de désigner qui vous voulez</span>
                </div>
              </div>
              <div className="crowd-risques-note" style={{ marginTop: 20 }}>
                💡 <strong>Exemple concret :</strong> avec 2 enfants bénéficiaires, vous pouvez transmettre
                jusqu'à <strong>305 000€ totalement exonérés</strong> de droits de succession via votre assurance vie.
              </div>
            </div>
            <div className="crowd-cta-band" style={{ marginTop: 36 }}>
              <div>
                <strong>Votre situation fiscale mérite une analyse personnalisée.</strong>
                <p>TMI, situation familiale, patrimoine existant — Orizia optimise votre assurance vie selon votre situation réelle.</p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Optimiser ma fiscalité →
              </Link>
            </div>
          </div>
        </section>

        {/* ── ACCOMPAGNEMENT ── */}
        <section id="notre-approche" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Notre accompagnement</span>
              <h2>Orizia s'occupe de tout,<br />de A à Z</h2>
              <p>
                De l'analyse de votre situation à la rédaction de la clause bénéficiaire,
                en passant par la sélection du contrat et le suivi annuel — voici notre méthode.
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
                <strong>Un accompagnement complet, 100% gratuit pour vous</strong>
                <p>
                  Orizia Courtage est rémunéré par l'assureur partenaire sous forme de commission
                  de distribution, incluse dans le contrat et encadrée par la réglementation DDA.
                  Vous ne payez rien de plus qu'en souscrivant directement — mais vous bénéficiez
                  d'un conseil expert et d'un accès à des contrats haut de gamme inaccessibles en banque.
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
              <h2>Vous hésitez encore ?<br />C'est normal.</h2>
              <p>
                Voici les questions que nous entendons le plus souvent — avec des réponses
                honnêtes, sans formule commerciale.
              </p>
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
                Une autre question ? Notre conseillère vous répond en moins de 24h.
              </p>
              <div className="fin-hero-btns" style={{ justifyContent: 'center' }}>
                <Link href="/rendez-vous" className="fin-btn-primary">
                  📅 Prendre rendez-vous →
                </Link>
                <Link href="/contact" className="fin-btn-secondary">
                  ✉️ Poser une question
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions sur l'assurance vie,<br />nos réponses d'experts</h2>
              <p>Des réponses honnêtes, sans jargon inutile.</p>
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
                Une question spécifique à votre situation ?
              </p>
              <Link href="/contact" className="fin-btn-secondary">
                Poser ma question →
              </Link>
            </div>
          </div>
        </section>

        {/* ── MAILLAGE INTERNE ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Aller plus loin</span>
              <h2>Complétez votre stratégie<br />patrimoniale</h2>
              <p>L'assurance vie s'intègre dans une stratégie globale. Découvrez nos autres solutions.</p>
            </div>
            <div className="fin-cards">
              {[
                {
                  href: '/investir/scpi',
                  icon: '🏢',
                  title: 'SCPI',
                  sub: 'Immobilier de rendement',
                  text: '4–6%/an, zéro gestion. Loger des SCPI dans votre assurance vie pour combiner rendement immobilier et fiscalité AV.',
                },
                {
                  href: '/investir/crowdfunding',
                  icon: '📈',
                  title: 'Crowdfunding',
                  sub: 'Financement participatif',
                  text: '8–12%/an sur 12–36 mois. Complément dynamique pour booster le rendement global de votre patrimoine.',
                },
                {
                  href: '/investir/per',
                  icon: '🏦',
                  title: 'Plan Épargne Retraite',
                  sub: 'Préparez votre retraite',
                  text: 'Complémentaire à l\'AV : déduisez vos versements de votre revenu imposable aujourd\'hui et construisez votre retraite.',
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
            <h2>Votre argent mérite mieux<br />qu'un contrat bancaire standard</h2>
            <p>
              Orizia analyse votre contrat actuel, sélectionne le meilleur contrat du marché
              selon votre profil et vous accompagne de la souscription au suivi annuel.
              0% de frais sur versements. 100% indépendant.
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Prendre rendez-vous →
              </Link>
              <Link href="/contact" className="fin-btn-outline">
                Poser une question
              </Link>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
              L'assurance vie comporte un risque de perte en capital sur les unités de compte.
              Les performances passées ne préjugent pas des performances futures.
              Orizia Courtage, courtier en assurance régi par l'ACPR, rémunéré par les assureurs partenaires, jamais par le client.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}