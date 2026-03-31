import Link from 'next/link';

export const metadata = {
  title: 'Assurance Vie 2026 : Conseil Indépendant & Contrats Haut de Gamme | Orizia',
  description:
    'Je sélectionne pour vous le meilleur contrat d\'assurance vie : 0% de frais, rendement optimisé, transmission jusqu\'à 152 500€/bénéficiaire. Cindy Urbansky – Orizia Courtage.',
  keywords: [
    'assurance vie courtier indépendant',
    'meilleur contrat assurance vie 2026',
    'assurance vie transmission patrimoine',
    'assurance vie frais versement 0%',
    'ouvrir assurance vie conseil gratuit',
    'assurance vie rendement unités de compte',
  ],
  alternates: { canonical: 'https://orizia.fr/investir/assurance-vie' },
  openGraph: {
    title: 'Assurance Vie 2026 : Conseil Indépendant & Contrats Haut de Gamme | Orizia',
    description: 'Je sélectionne pour vous le meilleur contrat d\'assurance vie. 0% de frais sur versements, contrats haut de gamme, accompagnement personnalisé. Gratuit et indépendant.',
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
        text: 'L\'assurance vie est une enveloppe fiscale dans laquelle vous investissez sur des supports en euros (capital garanti) et/ou en unités de compte (actions, obligations, SCPI…). Votre argent n\'est pas bloqué : vous pouvez retirer à tout moment. En cas de décès, le capital est transmis aux bénéficiaires désignés hors succession, avec une fiscalité très avantageuse.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le rendement d\'une assurance vie en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En 2026, les fonds en euros rapportent en moyenne 2,5 à 3,5% brut par an. Les unités de compte offrent un potentiel de 4 à 8%/an selon les supports, avec risque de perte en capital. Un profil équilibré (50% fonds euros / 50% UC) peut viser environ 2,75%/an ; un profil dynamique (20/80) peut tabler sur 4–5%/an sur le long terme.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la fiscalité de l\'assurance vie après 8 ans ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Après 8 ans, les gains bénéficient d\'un abattement annuel de 4 600€ pour une personne seule ou 9 200€ pour un couple. Au-delà, un taux réduit de 7,5% s\'applique, plus 17,2% de prélèvements sociaux. C\'est la fiscalité la plus avantageuse sur l\'épargne longue durée disponible en France.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on retirer son argent d\'une assurance vie quand on veut ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Votre argent n\'est pas bloqué. Vous pouvez effectuer des rachats partiels ou totaux à tout moment, en quelques jours ouvrés. La durée de 8 ans n\'est qu\'un seuil de maturité fiscale — pas une période d\'immobilisation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi passer par un courtier pour ouvrir une assurance vie ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les contrats distribués en banque affichent souvent 2 à 4% de frais sur versements, une gamme UC limitée et des fonds euros peu compétitifs. En tant que courtière indépendante, j\'accède à des contrats haut de gamme (Abeille, Cardif, SwissLife…) à 0% de frais sur versements, normalement réservés aux professionnels — et je construis avec vous l\'allocation adaptée à votre profil.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment l\'assurance vie permet-elle de transmettre son patrimoine ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En désignant un bénéficiaire dans votre contrat, le capital lui est transmis hors succession : jusqu\'à 152 500€ par bénéficiaire sans droits de succession pour les versements effectués avant 70 ans. Avec 2 enfants bénéficiaires, c\'est 305 000€ transmis totalement exonérés. C\'est le meilleur outil de transmission disponible en France.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps dure un rendez-vous avec Cindy Urbansky ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le premier rendez-vous dure environ 45 minutes, en visioconférence ou par téléphone. J\'analyse votre situation patrimoniale, vos objectifs et votre profil de risque. Sous 48h, vous recevez une recommandation personnalisée avec les contrats sélectionnés et l\'allocation conseillée. L\'accompagnement est 100% gratuit.',
      },
    },
  ],
};

const DANGERS = [
  {
    icon: '🏦',
    title: 'Les contrats bancaires vous coûtent de l\'argent — silencieusement',
    text: 'Frais de versement de 2 à 4%, fonds euros peu compétitifs, gamme UC limitée aux fonds maison : votre conseiller bancaire vous vend le contrat de son employeur, pas le meilleur du marché. La différence sur 20 ans peut représenter des dizaines de milliers d\'euros perdus.',
  },
  {
    icon: '📊',
    title: 'Choisir son allocation sans analyse, c\'est risqué',
    text: 'Un contrat 100% fonds euros sous-performe l\'inflation. Un contrat 100% UC peut perdre 30% en un an. L\'allocation optimale dépend de votre horizon, votre TMI et votre tolérance réelle au risque — pas d\'une case à cocher sur un formulaire.',
  },
  {
    icon: '📜',
    title: 'La clause bénéficiaire bâclée peut tout ruiner',
    text: 'Une clause standard ne couvre pas les situations familiales complexes : enfants de plusieurs unions, PACS, donation-partage… Une clause mal rédigée peut transformer votre meilleur outil de transmission en cauchemar successoral.',
  },
];

const AVANTAGES = [
  {
    icon: '📈',
    title: 'Double moteur de performance',
    text: 'Combinez la sécurité du fonds en euros (capital garanti) avec le potentiel des unités de compte. Résultat : jusqu\'à 5–8%/an sur le long terme, sans tout risquer.',
  },
  {
    icon: '🏦',
    title: 'Fiscalité ultra-avantageuse',
    text: 'Après 8 ans : abattement de 4 600€ (ou 9 200€ en couple) + taux réduit à 7,5%. Aucun autre placement ne combine épargne disponible et fiscalité aussi allégée.',
  },
  {
    icon: '💸',
    title: 'Votre capital reste disponible',
    text: 'Rachats partiels possibles à tout moment, en quelques jours. Vous ne sacrifiez pas votre liquidité pour obtenir une bonne fiscalité — les deux coexistent.',
  },
  {
    icon: '🎁',
    title: 'Transmission hors succession',
    text: 'Jusqu\'à 152 500€ par bénéficiaire transmis sans droits de succession. Le seul placement qui vous permet de choisir librement qui hérite — et à quel coût fiscal.',
  },
  {
    icon: '🔄',
    title: 'Versements à votre rythme',
    text: 'Versement initial unique, mensualités automatiques, versements ponctuels… Vous épargnez quand vous le pouvez, au montant que vous décidez.',
  },
  {
    icon: '🌍',
    title: 'Accès aux meilleures classes d\'actifs',
    text: 'SCPI, ETF, fonds actions mondiales, private equity, fonds obligataires : tout dans une seule enveloppe, gérée par un professionnel qui connaît votre situation.',
  },
];

const RISQUES = [
  {
    niveau: 'Faible', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '🟢',
    title: 'Perte sur fonds en euros',
    text: 'Le fonds en euros est à capital garanti par l\'assureur. Sauf faillite (couverte jusqu\'à 70 000€ par le FGAP), vous ne pouvez pas perdre cette partie de votre épargne.',
    mitigation: 'Mon rôle : sélectionner des assureurs solides avec des fonds euros compétitifs et transparents.',
  },
  {
    niveau: 'Moyen', color: '#d97706', bg: '#fffbeb', border: '#fed7aa', icon: '🟠',
    title: 'Fluctuation des unités de compte',
    text: 'Les UC suivent les marchés financiers. Sur 1 an, un fonds actions peut perdre 20 à 30%. Sur 10–20 ans, l\'historique montre des performances significativement positives pour les profils bien diversifiés.',
    mitigation: 'Mon rôle : calibrer précisément la part UC à votre horizon réel et votre tolérance au risque — pas à celle d\'un formulaire.',
  },
  {
    niveau: 'Faible', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '🟢',
    title: 'Risque de liquidité',
    text: 'Le seul vrai risque de liquidité est de racheter la part UC en période de baisse de marchés. Le fonds euros est lui toujours disponible à sa valeur nette.',
    mitigation: 'Mon rôle : dimensionner la part sécurisée pour couvrir vos besoins de liquidité à court terme, avant d\'allouer le reste en UC.',
  },
  {
    niveau: 'Faible', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '🟢',
    title: 'Défaillance de l\'assureur',
    text: 'En cas de faillite de l\'assureur, le Fonds de Garantie des Assurances de Personnes (FGAP) couvre jusqu\'à 70 000€ par assureur et par assuré.',
    mitigation: 'Mon rôle : diversifier sur 2 assureurs si votre capital dépasse 70 000€ — une précaution simple et efficace.',
  },
];

const ETAPES = [
  {
    n: '01',
    title: 'Je comprends votre situation réelle',
    text: 'Objectif d\'épargne, horizon, TMI, capacité mensuelle, patrimoine existant — je ne recommande rien avant de comprendre où vous en êtes. Pas de formulaire générique : une vraie conversation.',
  },
  {
    n: '02',
    title: 'Je sélectionne le contrat optimal',
    text: 'J\'accède à des contrats haut de gamme inaccessibles en banque : Abeille Épargne Active, Cardif Elite, Celebéa Vie, SwissLife Strategic Premium, SwissLife Vie Génération. 0% de frais sur versements.',
  },
  {
    n: '03',
    title: 'Je construis votre allocation',
    text: 'Fonds euros, UC obligataires, actions, SCPI, ETF — je construis une allocation personnalisée à votre profil de risque, révisée chaque année lors d\'un bilan annuel gratuit.',
  },
  {
    n: '04',
    title: 'Je rédige votre clause bénéficiaire',
    text: 'Je rédige avec vous une clause sur-mesure adaptée à votre situation familiale. Pas la clause standard de l\'assureur — une clause qui protège vraiment vos proches.',
  },
];

const PROFILS = [
  {
    icon: '🛡️',
    title: 'Profil Prudent',
    desc: 'Vous prioritisez la sécurité de votre capital avant tout.',
    repart: '80% Fonds euros / 20% UC',
    rendement: '~1,4%/an',
    for: 'Horizon < 8 ans · Faible tolérance au risque',
    color: 'var(--orizia-primary)',
  },
  {
    icon: '⚖️',
    title: 'Profil Équilibré',
    desc: 'Vous cherchez le juste équilibre entre sécurité et performance.',
    repart: '50% Fonds euros / 50% UC',
    rendement: '~2,75%/an',
    for: 'Horizon 8–15 ans · Profil de risque modéré',
    color: '#d97706',
    featured: true,
  },
  {
    icon: '🚀',
    title: 'Profil Dynamique',
    desc: 'Vous visez la performance maximale sur le long terme.',
    repart: '20% Fonds euros / 80% UC',
    rendement: '~4,1%/an',
    for: 'Horizon 15+ ans · Forte tolérance au risque',
    color: '#dc2626',
  },
];

const OBJECTIONS = [
  {
    q: '« J\'ai déjà une assurance vie en banque. »',
    r: 'C\'est le cas de la majorité de mes clients. Je commence toujours par auditer le contrat existant. Si les frais sont trop élevés ou la performance décevante, je vous guide vers une solution plus adaptée — sans vous forcer à fermer l\'actuel.',
  },
  {
    q: '« Je ne sais pas combien placer. »',
    r: 'C\'est précisément pour ça que le premier rendez-vous existe. J\'analyse votre budget, vos charges, vos projets et je vous propose un montant initial et une mensualité qui ne mettent pas votre quotidien en péril.',
  },
  {
    q: '« J\'ai peur de prendre des risques. »',
    r: 'Je calibre l\'allocation à votre profil réel, pas à un profil théorique. Un profil prudent peut rester à 80–100% sur le fonds en euros, capital garanti. Vous ne prenez jamais plus de risque que ce que vous avez explicitement validé.',
  },
  {
    q: '« Est-ce vraiment gratuit ? »',
    r: 'Totalement. Je suis rémunérée par l\'assureur partenaire sous forme de commission de distribution, incluse dans le contrat. Ce mécanisme est encadré par la réglementation DDA et vous est communiqué de manière transparente dès notre premier échange.',
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
            <h1>Assurance vie : le placement<br />que vous avez — mais pas optimisé</h1>
            <p>
              La majorité des Français possède une assurance vie en banque — et paient
              trop de frais pour des performances insuffisantes. Je sélectionne pour vous
              les meilleurs contrats du marché, construis l'allocation adaptée à votre profil
              et rédige votre clause bénéficiaire sur-mesure.{' '}
              <strong>Gratuitement.</strong>
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Auditer mon contrat gratuitement →
              </Link>
              <Link href="#notre-approche" className="fin-btn-secondary">
                🔍 Découvrir mon approche
              </Link>
            </div>
            <div className="fin-hero-trust">
              <span>✅ 0% de frais sur versements</span>
              <span>🏦 Contrats haut de gamme exclusifs</span>
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

        {/* ── CITATION CINDY ── */}
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
                « L'assurance vie est le placement que presque tout le monde possède
                — et que presque personne n'a vraiment optimisé.
              </p>
              <p style={{
                fontSize: '1rem',
                color: 'var(--orizia-dark)',
                lineHeight: 1.75,
                margin: '0 0 20px',
                opacity: 0.8,
              }}>
                Trop de frais, une allocation trop prudente, une clause bénéficiaire
                rédigée à la va-vite : trois erreurs silencieuses qui coûtent des milliers
                d'euros sur 20 ans. Mon travail, c'est de les corriger — dès le premier
                rendez-vous. »
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

        {/* ── IDÉES REÇUES ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Ce que votre banque ne vous dit pas
              </span>
              <h2>Pourquoi votre contrat actuel<br />vous coûte probablement de l'argent</h2>
              <p>
                90% des contrats d'assurance vie sont souscrits en banque.
                Et 90% des Français paient trop de frais pour des performances
                en-dessous de ce qui est accessible sur le marché.
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
                J'accède aux meilleurs contrats du marché avec 0% de frais sur versements.
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 20 }}>
                Un audit gratuit de votre contrat actuel vous montre concrètement
                ce que vous perdez chaque année.
              </p>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Auditer mon contrat gratuitement →
              </Link>
            </div>
          </div>
        </section>

        {/* ── DÉFINITION ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge">Définition</span>
                <h2>L'assurance vie :<br />bien plus qu'une simple épargne</h2>
                <p>
                  L'assurance vie est une <strong>enveloppe fiscale</strong> — pas un simple
                  livret. À l'intérieur, vous choisissez les supports :{' '}
                  <strong>fonds en euros</strong> (capital garanti, rendement stable) et{' '}
                  <strong>unités de compte</strong> (actions, obligations, SCPI, ETF…).
                </p>
                <p>
                  Contrairement à une idée très répandue, votre argent{' '}
                  <strong>n'est pas bloqué</strong>. Vous pouvez effectuer des rachats
                  partiels ou totaux à tout moment, en quelques jours ouvrés. La durée
                  de 8 ans n'est qu'un seuil de maturité fiscale.
                </p>
                <p>
                  C'est aussi l'<strong>outil de transmission le plus puissant</strong> du
                  droit français : le capital est versé directement aux bénéficiaires
                  désignés, hors succession, avec une fiscalité spécifique très avantageuse.
                </p>
              </div>
              <div className="crowd-schema">
                <div style={{
                  textAlign: 'center', marginBottom: 16, fontWeight: 800,
                  fontSize: '0.85rem', textTransform: 'uppercase',
                  letterSpacing: '0.06em', color: 'var(--orizia-primary)',
                }}>
                  Structure d'un contrat
                </div>
                <div className="crowd-schema-step crowd-schema-step--orizia">
                  <div className="crowd-schema-icon">🛡️</div>
                  <strong>Votre contrat d'assurance vie</strong>
                  <span>Sélectionné et optimisé par Cindy</span>
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
                Épargne disponible, fiscalité allégée, transmission optimisée, accès aux
                marchés mondiaux — aucun autre placement ne combine autant d'atouts
                dans une seule enveloppe.
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
                de votre âge, de votre horizon et de votre tolérance réelle aux fluctuations
                — pas d'une case à cocher.
              </p>
            </div>
            <div className="av-profils-grid">
              {PROFILS.map(p => (
                <div
                  key={p.title}
                  className={`av-profil-card${p.featured ? ' av-profil-card--featured' : ''}`}
                >
                  {p.featured && <div className="av-profil-badge">⭐ Le plus choisi</div>}
                  <div className="av-profil-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p className="av-profil-desc">{p.desc}</p>
                  <div className="av-profil-repart"><span>{p.repart}</span></div>
                  <div className="av-profil-rendement" style={{ color: p.color }}>
                    {p.rendement}
                  </div>
                  <p className="av-profil-for">🎯 {p.for}</p>
                </div>
              ))}
            </div>
            <div className="crowd-cta-band" style={{ marginTop: 36 }}>
              <div>
                <strong>Votre profil optimal se construit avec un expert — pas un algorithme.</strong>
                <p>
                  J'analyse votre situation complète : TMI, objectifs, horizon et
                  patrimoine existant pour définir l'allocation la plus pertinente pour vous.
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
                d'être bien structurée. Voici mon analyse transparente de chaque risque,
                et comment je les adresse concrètement.
              </p>
            </div>
            <div className="crowd-risques-grid">
              {RISQUES.map(r => (
                <div
                  key={r.title}
                  className="crowd-risque-card"
                  style={{ background: r.bg, borderColor: r.border }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: '1.4rem' }}>{r.icon}</span>
                    <div>
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 700,
                        textTransform: 'uppercase', color: r.color,
                      }}>
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
              <h2>La fiscalité de l'assurance vie,<br />expliquée clairement</h2>
              <p>
                La fiscalité de l'assurance vie est l'une des plus avantageuses du
                patrimoine français — mais elle dépend de l'ancienneté du contrat
                et du montant des versements. Voici comment ça fonctionne vraiment.
              </p>
            </div>

            <div className="av-fiscal-timeline">
              <div className="av-fiscal-tl-item">
                <div className="av-fiscal-tl-dot av-fiscal-tl-dot--warn">0–4 ans</div>
                <div className="av-fiscal-tl-content">
                  <h4>Avant 4 ans</h4>
                  <p>
                    PFNL 12,8% + 17,2% PS = <strong>30%</strong> sur les gains.
                    Ou option barème IR l'année suivante si plus avantageux.
                  </p>
                  <div className="av-fiscal-tl-tag av-fiscal-tl-tag--warn">⚠️ Peu favorable</div>
                </div>
              </div>
              <div className="av-fiscal-tl-connector" />
              <div className="av-fiscal-tl-item">
                <div className="av-fiscal-tl-dot av-fiscal-tl-dot--mid">4–8 ans</div>
                <div className="av-fiscal-tl-content">
                  <h4>De 4 à 8 ans</h4>
                  <p>
                    PFNL 12,8% + 17,2% PS. Option barème IR N+1 possible.
                    Pas encore d'abattement annuel sur les retraits.
                  </p>
                  <div className="av-fiscal-tl-tag av-fiscal-tl-tag--mid">⏳ En attente</div>
                </div>
              </div>
              <div className="av-fiscal-tl-connector" />
              <div className="av-fiscal-tl-item">
                <div className="av-fiscal-tl-dot av-fiscal-tl-dot--good">8 ans+</div>
                <div className="av-fiscal-tl-content">
                  <h4>Après 8 ans ✅</h4>
                  <p>
                    Abattement annuel{' '}
                    <strong>4 600€ (seul)</strong> ou{' '}
                    <strong>9 200€ (couple)</strong>.
                    Puis PFNL 7,5% + 17,2% PS seulement sur le surplus.
                  </p>
                  <div className="av-fiscal-tl-tag av-fiscal-tl-tag--good">✅ Fiscalité optimale</div>
                </div>
              </div>
            </div>

            <div className="av-transmission-bloc">
              <div className="av-transmission-header">
                <span>🎁</span>
                <h3>Transmission : l'atout que la banque ne met jamais en avant</h3>
              </div>
              <div className="av-transmission-grid">
                <div className="av-transm-item">
                  <strong>Versements avant 70 ans</strong>
                  <span>
                    Jusqu'à <strong>152 500€ par bénéficiaire</strong> transmis
                    sans droits de succession
                  </span>
                </div>
                <div className="av-transm-item">
                  <strong>Versements après 70 ans</strong>
                  <span>
                    Abattement global de <strong>30 500€</strong> sur les primes versées.
                    Les gains restent entièrement exonérés.
                  </span>
                </div>
                <div className="av-transm-item">
                  <strong>Conjoint / partenaire PACS</strong>
                  <span>
                    Exonération <strong>totale</strong> des droits de succession, sans plafond.
                  </span>
                </div>
                <div className="av-transm-item">
                  <strong>Hors succession</strong>
                  <span>
                    Le capital ne rentre pas dans l'actif successoral : vous transmettez
                    à qui vous voulez, dans les conditions que vous choisissez.
                  </span>
                </div>
              </div>
              <div className="crowd-risques-note" style={{ marginTop: 20 }}>
                💡 <strong>Exemple concret :</strong> avec 2 enfants bénéficiaires, vous
                pouvez transmettre jusqu'à{' '}
                <strong>305 000€ totalement exonérés</strong> de droits de succession
                via votre assurance vie. Aucun autre placement ne permet ça.
              </div>
            </div>

            <div className="crowd-cta-band" style={{ marginTop: 36 }}>
              <div>
                <strong>Votre situation fiscale mérite une analyse personnalisée.</strong>
                <p>
                  TMI, situation familiale, patrimoine existant — j'optimise votre
                  assurance vie selon votre situation réelle, pas une moyenne statistique.
                </p>
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
              <span className="fin-badge">Mon accompagnement</span>
              <h2>Ce que je fais concrètement<br />pour vous, de A à Z</h2>
              <p>
                De votre premier échange à la rédaction de la clause bénéficiaire —
                et jusqu'au bilan annuel. Pas de délégation, pas d'intermédiaire :
                c'est moi qui gère tout.
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
                  Je suis rémunérée par l'assureur partenaire sous forme de commission
                  de distribution, incluse dans le contrat et encadrée par la réglementation
                  DDA. Vous ne payez rien de plus qu'en souscrivant directement — mais vous
                  bénéficiez d'un conseil expert et d'un accès à des contrats inaccessibles
                  en banque classique.
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
              <span className="fin-badge">Vous hésitez encore ?</span>
              <h2>Les vraies questions —<br />avec des réponses honnêtes</h2>
              <p>
                Voici ce que mes clients me disent le plus souvent avant de prendre
                rendez-vous — et ce que je leur réponds, sans formule commerciale.
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
                Une autre question ? Je vous réponds personnellement sous 24h.
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
              <h2>Vos questions sur l'assurance vie,<br />mes réponses directes</h2>
              <p>Sans jargon. Sans langue de bois. Les vraies réponses.</p>
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
                Une question spécifique à votre situation personnelle ?
              </p>
              <Link href="/contact" className="fin-btn-secondary">
                Poser ma question à Cindy →
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
              <p>
                L'assurance vie est la base — mais une stratégie patrimoniale solide
                combine plusieurs placements complémentaires. Je construis cette vision
                globale avec vous.
              </p>
            </div>
            <div className="fin-cards">
              {[
                {
                  href: '/investir/scpi',
                  icon: '🏢',
                  title: 'SCPI',
                  sub: 'Immobilier de rendement',
                  text: '4–6%/an, zéro gestion. Logez des SCPI dans votre assurance vie pour combiner rendement immobilier et fiscalité AV dans une seule enveloppe.',
                },
                {
                  href: '/investir/crowdfunding',
                  icon: '📈',
                  title: 'Crowdfunding immobilier',
                  sub: 'Financement participatif',
                  text: '8–12%/an sur 12–36 mois. Le complément dynamique idéal pour booster le rendement global sans déséquilibrer votre patrimoine.',
                },
                {
                  href: '/investir/per',
                  icon: '🏦',
                  title: 'Plan Épargne Retraite',
                  sub: 'Préparez votre retraite',
                  text: 'Complémentaire à l\'AV : déduisez vos versements de votre revenu imposable dès cette année et construisez votre retraite avec un avantage fiscal immédiat.',
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
              J'audite votre contrat actuel, sélectionne le meilleur contrat du marché
              selon votre profil et vous accompagne de la souscription au suivi annuel.
              0% de frais sur versements. Entièrement gratuit pour vous.
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Prendre rendez-vous avec Cindy →
              </Link>
              <Link href="/contact" className="fin-btn-outline">
                Poser une question
              </Link>
            </div>
            <p style={{
              marginTop: 24, fontSize: '0.75rem', opacity: 0.55,
              maxWidth: 540, margin: '24px auto 0',
            }}>
              L'assurance vie comporte un risque de perte en capital sur les unités
              de compte. Les performances passées ne préjugent pas des performances
              futures. Orizia Courtage, courtière en assurance régie par l'ACPR,
              immatriculée ORIAS — rémunérée par les assureurs partenaires, jamais
              par le client.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}