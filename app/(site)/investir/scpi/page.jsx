import Link from 'next/link';
import Image from 'next/image';
import SimulateurSCPI from '@/components/SimulateurSCPI';
import SCPIDefinition from '@/components/SCPIDefinition';
import SCPIProfilFiscal from '@/components/SCPIProfilFiscal';
import SCPIChecklist from '@/components/SCPIChecklist';
import ReadingProgressSCPI from '@/components/ReadingProgressSCPI';
import SCPIRisqueJauge from '@/components/SCPIRisqueJauge';
import SCPIFiscaliteSelector from '@/components/SCPIFiscaliteSelector';

// ── 1. MÉTADONNÉES SEO (Optimisées) ──
export const metadata = {
  title: 'SCPI 2026 : Percevez des Loyers sans Gérer un Bien | Orizia Courtage',
  description:
    'Je sélectionne les meilleures SCPI parmi 200+ analysées et j\'optimise votre stratégie fiscale. 4–6%/an, zéro gestion, accessible dès 1 000€. Cindy Urbansky.',
  alternates: { canonical: 'https://orizia-courtage.fr/investir/scpi' },
  openGraph: {
    title: 'SCPI 2026 : Percevez des Loyers sans Gérer un Bien | Orizia Courtage',
    description: '4–6%/an, mutualisation du risque, zéro gestion. Je sélectionne les meilleures SCPI et j\'optimise votre fiscalité. Conseil indépendant, gratuit, personnalisé.',
    url: 'https://orizia-courtage.fr/investir/scpi',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/og-scpi.jpg',
        width: 1200,
        height: 630,
        alt: 'Investissement en SCPI avec Orizia Courtage - Cindy Urbansky',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES (E-E-A-T & Service) ──
const investirSCPISchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Investir', item: 'https://orizia-courtage.fr/investir' },
        { '@type': 'ListItem', position: 3, name: 'SCPI', item: 'https://orizia-courtage.fr/investir/scpi' }
      ]
    },
    {
      '@type': 'Service',
      name: 'Conseil et Courtage en SCPI (Société Civile de Placement Immobilier)',
      serviceType: 'Investissement Immobilier / Pierre-Papier',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        image: 'https://orizia-courtage.fr/images/Orizia_logo.webp',
      },
      description: 'Analyse du marché, sélection indépendante de SCPI (rendement, européennes, assurance vie) et optimisation fiscale de la détention.',
      areaServed: [
        { '@type': 'State', name: 'Hauts-de-France' },
        { '@type': 'City', name: 'Lille' },
        { '@type': 'City', name: 'Marcq-en-Barœul' },
        { '@type': 'Country', name: 'France' }
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Bilan patrimonial, sélection des SCPI et montage du dossier 100% gratuits pour le client (rémunération par les sociétés de gestion partenaires).'
      }
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu\'est-ce qu\'une SCPI ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une SCPI (Société Civile de Placement Immobilier) est un fonds d\'investissement collectif qui achète et gère un portefeuille d\'actifs immobiliers diversifiés (bureaux, commerces, logements, santé) agréé par l\'AMF. Chaque investisseur détient des parts et perçoit sa quote-part des loyers collectés, redistribués trimestriellement. On parle de "pierre-papier" : vous profitez de l\'immobilier réel sans aucune contrainte de gestion.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le rendement moyen des SCPI en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En 2026, le taux de distribution moyen des SCPI se situe entre 4% et 6% brut par an. Certaines SCPI spécialisées (santé, logistique, européennes) affichent des taux supérieurs à 6%. Ces rendements sont bien au-dessus des livrets bancaires et de l\'assurance vie en fonds euros, avec un sous-jacent immobilier tangible.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quels sont les risques d\'investir en SCPI ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les principaux risques sont : la perte en capital (valeur des parts pouvant baisser), le risque de liquidité (revente non garantie), le risque locatif (vacance) et le risque de change pour les SCPI européennes hors zone euro. La diversification sur plusieurs SCPI et une durée de détention de 8 à 10 ans minimum permettent de limiter significativement ces risques.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la fiscalité des SCPI ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les revenus de SCPI françaises sont intégrés à votre revenu imposable (TMI + 17,2% PS). Un investisseur à 45% de TMI est taxé à 62,2% sur ses revenus SCPI en direct. Les SCPI européennes bénéficient souvent de conventions fiscales plus avantageuses. Loger des SCPI dans une assurance vie permet de bénéficier de la flat tax à 30% — voire 7,5% après 8 ans. La bonne stratégie dépend entièrement de votre profil fiscal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien faut-il pour investir en SCPI ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le ticket d\'entrée varie : certaines SCPI sont accessibles dès 1 000€, d\'autres nécessitent 5 000 à 10 000€ minimum. Il est aussi possible d\'investir par versements programmés mensuels dès 50€/mois, ou à crédit pour bénéficier de l\'effet de levier. En tant que courtière indépendante, j\'oriente chaque client vers les SCPI les plus accessibles et adaptées à sa situation.',
      },
    },
  ],
};

const CHIFFRES = [
  { value: '📈\u00A04–6%', label: 'Rendement annuel brut moyen', icon: '' },
  { value: "💶\u00A0Dès 1\u00A0000€", label: "Ticket d'entrée accessible", icon: '' },
  { value: '🔍\u00A0200+', label: 'SCPI analysées par mes soins', icon: '' },
  { value: '⏳\u00A08–10 ans', label: 'Durée de détention recommandée', icon: '' },
];

const DANGERS = [
  {
    icon: '🏢',
    title: 'Toutes les SCPI ne se valent pas — et certaines sont à éviter',
    text: 'Sur les 200+ SCPI du marché, certaines affichent des taux de vacance locative inquiétants, des frais de souscription excessifs ou une stratégie patrimoniale inadaptée à 2026. Sans analyse experte, vous investissez à l\'aveugle dans un marché de plus en plus complexe.',
  },
  {
    icon: '📉',
    title: 'La valeur des parts peut baisser — comme ça s\'est vu',
    text: 'La crise de l\'immobilier de bureaux a impacté plusieurs SCPI entre 2022 et 2024. Certaines ont vu leur valeur de part chuter de 15 à 20%. Savoir lesquelles ont résisté — et comprendre pourquoi — demande une expertise que peu de particuliers peuvent développer seuls.',
  },
  {
    icon: '💶',
    title: 'La fiscalité peut annuler jusqu\'à 62% de votre rendement',
    text: 'Sans optimisation (assurance vie, démembrement, SCPI européennes), les revenus SCPI peuvent être taxés jusqu\'à 62% pour les plus hauts revenus. Le rendement brut affiché et le rendement net dans votre poche sont deux réalités très différentes.',
  },
];

const AVANTAGES = [
  {
    icon: '🏢',
    title: '4–6% brut/an, versés chaque trimestre',
    text: 'Des rendements stables et réguliers, bien supérieurs aux livrets bancaires et à l\'assurance vie en fonds euros — avec un sous-jacent immobilier tangible et diversifié.',
  },
  {
    icon: '🔄',
    title: 'Diversification dès le premier euro',
    text: 'Une seule SCPI peut regrouper des centaines d\'actifs sur plusieurs secteurs et pays. Votre risque est mutualisé dès la première part — impossible avec un investissement immobilier direct.',
  },
  {
    icon: '🚫',
    title: 'Zéro gestion, vraiment',
    text: 'Pas de locataire, pas de travaux, pas de taxe foncière à gérer. La société de gestion agréée AMF s\'occupe de tout. Vous percevez vos loyers sans rien faire.',
  },
  {
    icon: '💶',
    title: 'Accessible dès 1 000€ ou 50€/mois',
    text: 'Certaines SCPI sont accessibles dès 1 000€ en capital, ou via des versements mensuels programmés à partir de 50€/mois. L\'immobilier professionnel n\'est plus réservé aux gros patrimoines.',
  },
  {
    icon: '📈',
    title: 'Double performance : loyers + revalorisation',
    text: 'En plus des revenus trimestriels, la valeur des parts peut s\'apprécier avec le temps. Deux sources de performance dans un seul investissement.',
  },
  {
    icon: '🌍',
    title: 'SCPI européennes : avantage fiscal majeur',
    text: 'Les SCPI investies en Allemagne, Pays-Bas, Irlande… échappent souvent aux prélèvements sociaux français grâce aux conventions fiscales bilatérales. Un avantage décisif pour les TMI élevés.',
  },
];

const RISQUES = [
  {
    niveau: 'Élevé', color: '#dc2626', bg: '#fff1f0', border: '#fecaca', icon: '🔴',
    title: 'Perte en capital',
    text: 'La valeur des parts peut baisser si le marché immobilier se retourne ou si la qualité du portefeuille se dégrade. La période 2022–2024 sur les SCPI de bureaux l\'a démontré concrètement.',
    mitigation: 'Mon rôle : sélectionner des SCPI avec des portefeuilles diversifiés, des bilans solides et un historique de résistance aux crises.',
  },
  {
    niveau: 'Élevé', color: '#dc2626', bg: '#fff1f0', border: '#fecaca', icon: '🔴',
    title: 'Risque de liquidité',
    text: 'Les SCPI ne sont pas des placements liquides. La revente de vos parts peut prendre plusieurs semaines, voire être impossible en marché dégradé. Ce n\'est pas un placement de trésorerie.',
    mitigation: 'Mon rôle : n\'orienter vers les SCPI à capital variable qu\'avec un horizon de 8 à 10 ans minimum, jamais sur des capitaux dont vous pourriez avoir besoin.',
  },
  {
    niveau: 'Moyen', color: '#d97706', bg: '#fffbeb', border: '#fed7aa', icon: '🟠',
    title: 'Risque locatif',
    text: 'Des locataires défaillants, des vacances prolongées ou un secteur en difficulté (bureaux, commerce) peuvent réduire les revenus distribués sur une ou plusieurs années.',
    mitigation: 'Mon rôle : privilégier des SCPI multi-secteurs avec un taux d\'occupation financier supérieur à 90% et des locataires institutionnels solides.',
  },
  {
    niveau: 'Faible', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '🟢',
    title: 'Risque de change',
    text: 'Les SCPI européennes exposées hors zone euro (Royaume-Uni, pays nordiques…) comportent un risque de change mineur mais réel à connaître avant d\'investir.',
    mitigation: 'Mon rôle : arbitrer entre SCPI zone euro et hors zone selon votre profil et votre tolérance à ce risque spécifique.',
  },
];

const ETAPES = [
  {
    n: '01',
    title: 'J\'analyse votre profil fiscal',
    text: 'Votre TMI détermine quelle stratégie SCPI adopter. SCPI en direct, en assurance vie, en nue-propriété ou européenne — chaque profil fiscal a sa solution optimale. Je commence toujours par là.',
  },
  {
    n: '02',
    title: 'Je sélectionne les meilleures SCPI',
    text: 'J\'analyse plus de 200 SCPI : taux d\'occupation, qualité du patrimoine, solidité de la société de gestion, frais réels et historique de distribution — notamment pendant les crises de 2022–2024.',
  },
  {
    n: '03',
    title: 'J\'optimise le financement',
    text: 'Investissement comptant, à crédit (effet de levier), par versements mensuels ou en démembrement — j\'optimise la structure de financement selon votre situation patrimoniale et fiscale.',
  },
  {
    n: '04',
    title: 'Je vous accompagne dans la durée',
    text: 'Bilan annuel, suivi des distributions, alertes en cas de changement significatif sur votre SCPI, arbitrages si votre situation personnelle évolue. Je reste votre courtière sur le long terme.',
  },
];

export default function SCPIPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(investirSCPISchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>

        <ReadingProgressSCPI />

        {/* ── HERO (Avec background) ── */}
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
          <div className="ae-hero-inner fin-hero-inner">
            <nav aria-label="breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: 16 }}>
              <Link href="/" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Accueil</Link>
              {' › '}
              <Link href="/investir" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Investir</Link>
              {' › '}
              <span>SCPI</span>
            </nav>
            <span className="fin-badge">🏢 Pierre-papier & immobilier de rendement</span>
            <h1 className="ae-hero-title">SCPI : percevez des loyers<br />sans gérer un seul bien</h1>
            <p className="ae-hero-intro">
              Investissez dans l'immobilier professionnel dès 1 000€ et percevez des revenus
              locatifs trimestriels sans aucune contrainte de gestion. Je sélectionne pour vous
              les meilleures SCPI parmi 200+ analysées et j'optimise votre stratégie fiscale.{' '}
              <strong>Gratuitement.</strong>
            </p>
            <div className="ae-hero-btns fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Trouver mes SCPI idéales →
              </Link>
              <Link href="/contact" className="fin-btn-secondary">
                Poser une question
              </Link>
            </div>
            <div className="ae-hero-trust fin-hero-trust">
              <span>✅ Conseil 100% indépendant</span>
              <span>🏦 200+ SCPI analysées</span>
              <span>⚡ Réponse sous 24h</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS (Avec icônes) ── */}
        <section className="fin-chiffres">
          <div className="ae-chiffres-inner fin-chiffres-inner">
            {CHIFFRES.map(c => (
              <div key={c.label} className="fin-chiffre">
                <div className="fin-chiffre-icon" style={{ fontSize: '2rem', marginBottom: 8 }}>{c.icon}</div>
                <strong>{c.value}</strong>
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
                  alt="Cindy Urbansky, courtière experte en SCPI"
                  title="Cindy Urbansky - Orizia Courtage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  sizes="(max-width: 768px) 150px, 180px"
                  priority
                />
              </div>
              <div className="ae-citation-content">
                <p className="ae-citation-quote">
                  « La SCPI, c'est l'immobilier locatif dans sa meilleure version :
                  les loyers arrivent, les problèmes restent chez la société de gestion.
                </p>
                <p className="ae-citation-text">
                  Ce que je fais, c'est aller plus loin : choisir les SCPI qui ont
                  résisté aux crises de 2022–2024, et structurer la détention pour
                  que vous touchiez vraiment ce qui est affiché — pas une version
                  amputée par la fiscalité. »
                </p>
                <span className="ae-citation-author">
                  — Cindy Urbansky, courtière indépendante · Orizia Courtage
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── DANGERS (Avec image contextuelle) ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Ce que personne ne vous dit
              </span>
              <h2>Pourquoi choisir sa SCPI seul<br />est une erreur fréquente</h2>
              <p>
                Le marché des SCPI s'est considérablement complexifié depuis 2022. Mauvaise
                sélection, fiscalité ignorée, frais cachés : voici les 3 pièges que j'aide
                mes clients à éviter — avant d'investir.
              </p>
            </div>

            <div className="ae-probleme-layout" style={{ marginTop: '40px' }}>
              <div className="ae-probleme-dangers" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {DANGERS.map(d => (
                  <div key={d.title} className="crowd-avantage-card" style={{ borderLeft: '4px solid #dc2626', background: '#fff' }}>
                    <div className="crowd-avantage-icon" style={{ display: 'none' }}>{d.icon}</div>
                    <div className="ae-danger-icon" style={{ fontSize: '2rem', marginBottom: '12px' }}>{d.icon}</div>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                ))}
              </div>

              {/* IMAGE 1 */}
              <div className="ae-probleme-image">
                <Image 
                  src="/images/banque-pression.webp"
                  alt="Analyse de la complexité du marché immobilier des SCPI"
                  title="Éviter les pièges du marché de la pierre-papier"
                  width={716}
                  height={1024}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--orizia-accent)', marginBottom: 6 }}>
                J'analyse les SCPI à votre place — vous investissez sereinement.
              </p>
              <p style={{ fontSize: '1rem', opacity: 0.7, marginBottom: 24, maxWidth: 640, margin: '0 auto 24px' }}>
                Gratuit, indépendant, personnalisé selon votre situation fiscale et patrimoniale réelle.
              </p>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Me faire accompagner gratuitement →
              </Link>
            </div>
          </div>
        </section>

        {/* ── DÉFINITION ── */}
        <section id="section-definition" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Définition</span>
              <h2>Qu'est-ce qu'une SCPI ?</h2>
              <p>
                Une <strong>SCPI (Société Civile de Placement Immobilier)</strong> est un
                fonds d'investissement collectif qui achète et gère un portefeuille d'actifs
                immobiliers. Vous détenez des parts et percevez votre quote-part des loyers —
                sans aucune contrainte de gestion.
              </p>
            </div>
            <SCPIDefinition />
          </div>
        </section>

        {/* ── AVANTAGES ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Les atouts</span>
              <h2>6 raisons d'investir en SCPI<br />plutôt qu'en immobilier direct</h2>
              <p>
                La SCPI offre tous les avantages de l'immobilier sans aucun de ses
                inconvénients opérationnels — à condition de bien la choisir et
                de structurer correctement la détention.
              </p>
            </div>
            <div className="crowd-avantages-grid">
              {AVANTAGES.map(a => (
                <div
                  key={a.title}
                  className="crowd-avantage-card"
                  style={
                    a.title === 'Zéro gestion, vraiment' || a.title === 'SCPI européennes : avantage fiscal majeur'
                      ? { borderTop: '3px solid var(--orizia-gold)', background: 'rgba(201,169,110,0.04)' }
                      : {}
                  }
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <h3 style={{ margin: 0 }}>{a.title}</h3>
                    <span style={{ fontSize: '1.6rem', flexShrink: 0, marginLeft: 10 }}>{a.icon}</span>
                  </div>
                  {(a.title === 'Zéro gestion, vraiment' || a.title === 'SCPI européennes : avantage fiscal majeur') && (
                    <div style={{
                      display: 'inline-block',
                      fontSize: '0.65rem', fontWeight: 800,
                      background: 'rgba(201,169,110,0.15)',
                      color: 'var(--orizia-gold)',
                      border: '1px solid rgba(201,169,110,0.3)',
                      borderRadius: 100,
                      padding: '2px 8px',
                      marginBottom: 8,
                    }}>
                      ⭐ Avantage vs immobilier direct
                    </div>
                  )}
                  <p>{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROFIL FISCAL ── */}
        <section id="section-profil" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Les différentes SCPI</span>
              <h2>Quelle SCPI pour quel profil fiscal ?</h2>
              <p>
                Il n'existe pas une SCPI universelle. Sélectionnez votre TMI et votre
                objectif pour voir la stratégie optimale adaptée à votre situation.
              </p>
            </div>
            <SCPIProfilFiscal />
          </div>
        </section>

        {/* ── RISQUES ── */}
        <section id="section-risques" className="crowd-section" style={{ background: '#fafafa' }}>
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Analyse des risques
              </span>
              <h2>Les risques réels,<br />expliqués honnêtement</h2>
              <p>
                Je ne vends pas du rêve. Voici une analyse transparente des risques SCPI
                — et le rôle concret que je joue pour les réduire avant chaque investissement.
              </p>
            </div>
            <SCPIRisqueJauge />
          </div>
        </section>

        {/* ── FISCALITÉ ── */}
        <section id="section-fiscalite" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Fiscalité SCPI 2026</span>
              <h2>Ce que vous touchez vraiment<br />après impôts</h2>
              <p>
                La fiscalité des SCPI varie selon votre TMI et la stratégie de détention.
                Sélectionnez votre situation pour voir le rendement net estimé.
              </p>
            </div>
            <SCPIFiscaliteSelector />
          </div>
        </section>

        {/* ── SIMULATEUR ── */}
        <section id="section-simulateur" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Simulation interactive</span>
              <h2>Calculez vos revenus SCPI<br />en temps réel</h2>
              <p>
                Capital disponible ou épargne mensuelle — estimez vos revenus locatifs
                potentiels selon votre situation. La simulation est indicative ; j'affine
                les chiffres en rendez-vous selon les SCPI sélectionnées pour vous.
              </p>
            </div>
            <div style={{ borderRadius: 20, overflow: 'hidden' }}>
              <SimulateurSCPI />
            </div>
          </div>
        </section>

        {/* ── ACCOMPAGNEMENT (Avec image) ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mon accompagnement</span>
              <h2>Ce que je fais concrètement<br />pour vous, de A à Z</h2>
              <p>
                De l'analyse fiscale à la souscription, en passant par la sélection des SCPI
                et le suivi annuel — sans délégation, sans intermédiaire supplémentaire.
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
              <div className="ae-accompagnement-image">
                <Image 
                  src="/images/dossier-courtage.webp" 
                  alt="Préparation et gestion d'un portefeuille SCPI par un courtier"
                  title="Gestion complète de votre investissement SCPI"
                  width={716}
                  height={1024}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="av-gratuit-bloc" style={{ marginTop: 48 }}>
              <div className="av-gratuit-icon" style={{ fontSize: '2rem' }}>🤝</div>
              <div>
                <strong>Un accompagnement complet, 100% gratuit pour vous</strong>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                  Je suis rémunérée par les sociétés de gestion partenaires — jamais
                  par vous. Mon indépendance garantit que je travaille exclusivement
                  dans votre intérêt.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary" style={{ flexShrink: 0 }}>
                📅 Démarrer gratuitement →
              </Link>
            </div>
          </div>
        </section>

        {/* ── OBJECTIONS ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Vous hésitez encore ?</span>
              <h2>Les vraies objections —<br />avec des réponses honnêtes</h2>
              <p>
                Voici ce que mes clients me disent le plus souvent avant de prendre
                rendez-vous — et ce que je leur réponds, sans formule commerciale.
              </p>
            </div>
            <div className="crowd-faq-list">
              {[
                {
                  q: '« C\'est illiquide — je ne peux pas récupérer mon argent quand je veux. »',
                  r: 'C\'est vrai, et c\'est assumé. Les SCPI sont des placements de long terme (8–10 ans minimum). C\'est précisément pour ça qu\'elles offrent un rendement supérieur aux livrets. Mon rôle : ne jamais vous orienter vers une SCPI avec des capitaux dont vous pourriez avoir besoin. L\'épargne de précaution reste sur un livret.',
                },
                {
                  q: '« J\'ai peur de la baisse de 2022–2024 sur les SCPI de bureaux. »',
                  r: 'Cette crise a touché principalement les SCPI mono-secteur bureaux, mal diversifiées géographiquement. Les SCPI multi-secteurs et européennes ont très bien résisté. Mon travail, c\'est précisément de distinguer les SCPI solides de celles qui ont montré leurs faiblesses — et de ne recommander que les premières.',
                },
                {
                  q: '« La fiscalité est trop complexe pour moi. »',
                  r: 'C\'est exactement pour ça que je commence toujours par un audit fiscal. TMI, revenus fonciers existants, objectifs patrimoniaux — je calcule le rendement net réel dans votre situation spécifique. Vous n\'avez pas à comprendre la fiscalité SCPI : c\'est mon métier.',
                },
                {
                  q: '« Je peux investir directement sans passer par un courtier. »',
                  r: 'Oui, techniquement. Mais sans analyse des 200+ SCPI du marché, sans optimisation fiscale et sans suivi annuel, vous prenez des risques évitables. Et mon accompagnement est 100% gratuit pour vous — je suis rémunérée par les sociétés de gestion. Il n\'y a aucune raison de ne pas en bénéficier.',
                },
              ].map((o, i) => (
                <details key={i} className="crowd-faq-item">
                  <summary>{o.q}</summary>
                  <p>{o.r}</p>
                </details>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <div className="fin-hero-btns" style={{ justifyContent: 'center' }}>
                <Link href="/rendez-vous" className="fin-btn-primary">📅 Prendre rendez-vous →</Link>
                <Link href="/contact" className="fin-btn-secondary">✉️ Poser une question</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── AUTO-ÉVALUATION ── */}
        <section id="section-autoevaluation" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <SCPIChecklist />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions SCPI,<br />mes réponses directes</h2>
              <p>Sans jargon financier. Les vraies réponses.</p>
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
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Aller plus loin</span>
              <h2>Complétez votre stratégie<br />patrimoniale</h2>
              <p>
                La SCPI est la colonne vertébrale immobilière de votre patrimoine.
                Je construis avec vous une stratégie globale qui combine les meilleures
                enveloppes selon vos objectifs.
              </p>
            </div>
            <div className="fin-cards">
              <Link href="/investir/crowdfunding" className="fin-card">
                <span className="fin-card-pill" style={{ background: 'rgba(217,119,6,0.1)', color: '#d97706', border: '1px solid rgba(217,119,6,0.25)' }}>⚡ Rendement court terme</span>
                <div className="fin-card-icon">📈</div>
                <div className="fin-card-sub">Financement participatif</div>
                <h3>Crowdfunding immobilier</h3>
                <p>8–12%/an sur 12–36 mois. Le complément dynamique idéal aux SCPI pour dynamiser votre rendement global sur le court terme.</p>
                <span className="fin-card-link">En savoir plus →</span>
              </Link>
              <Link href="/investir/assurance-vie" className="fin-card fin-card--featured">
                <span className="fin-card-pill" style={{ background: 'rgba(201,169,110,0.12)', color: 'var(--orizia-gold)', border: '1px solid rgba(201,169,110,0.3)' }}>✅ Fiscalité optimisée</span>
                <div className="fin-card-icon">🛡️</div>
                <div className="fin-card-sub">Épargne & transmission</div>
                <h3>Assurance Vie</h3>
                <p>L'enveloppe pour loger vos SCPI et bénéficier d'une fiscalité optimisée. Idéal pour les profils TMI 30%+ qui veulent garder la liquidité.</p>
                <span className="fin-card-link">En savoir plus →</span>
              </Link>
              <Link href="/investir/per" className="fin-card">
                <div className="fin-card-icon">🏦</div>
                <div className="fin-card-sub">Préparez votre retraite</div>
                <h3>PER</h3>
                <p>Réduisez vos impôts dès cette année et préparez votre retraite. Combiné aux SCPI dans une AV, un duo particulièrement puissant.</p>
                <span className="fin-card-link">En savoir plus →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-white)' }}>
          <div className="fin-cta-inner">
            <h2>Prête à percevoir vos premiers<br />loyers sans gérer un bien ?</h2>
            <p>
              J'analyse votre situation fiscale et patrimoniale, sélectionne les SCPI
              les plus adaptées parmi 200+ analysées et vous accompagne jusqu'à la
              souscription — et au-delà.
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Prendre rendez-vous avec Cindy →
              </Link>
              <Link href="/contact" className="fin-btn-secondary">
                Poser une question
              </Link>
            </div>
            <p style={{
              marginTop: 24, fontSize: '0.75rem', opacity: 0.55,
              maxWidth: 520, margin: '24px auto 0',
            }}>
              Investir dans des SCPI comporte des risques de perte en capital et de liquidité.
              Les performances passées ne préjugent pas des performances futures.
              Orizia Courtage, courtière indépendante régie par l'ACPR, immatriculée ORIAS —
              rémunérée par les sociétés de gestion partenaires, jamais par le client.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}