import Link from 'next/link';
import SimulateurSCPI from '@/components/SimulateurSCPI';

export const metadata = {
  title: 'SCPI 2026 : Percevez des Loyers sans Gérer un Bien | Orizia Courtage',
  description:
    'Je sélectionne les meilleures SCPI parmi 200+ analysées et j\'optimise votre stratégie fiscale. 4–6%/an, zéro gestion, accessible dès 1 000€. Cindy Urbansky – Orizia Courtage.',
  keywords: [
    'SCPI 2026',
    'investir SCPI courtier indépendant',
    'meilleure SCPI rendement',
    'SCPI pierre papier immobilier',
    'SCPI fiscalité optimisée',
    'SCPI européenne TMI élevé',
    'SCPI assurance vie',
    'SCPI risques conseils',
  ],
  alternates: { canonical: 'https://orizia.fr/investir/scpi' },
  openGraph: {
    title: 'SCPI 2026 : Percevez des Loyers sans Gérer un Bien | Orizia Courtage',
    description: '4–6%/an, mutualisation du risque, zéro gestion. Je sélectionne les meilleures SCPI et j\'optimise votre fiscalité. Conseil indépendant, gratuit, personnalisé.',
    url: 'https://orizia.fr/investir/scpi',
    type: 'article',
  },
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

const TYPES_SCPI = [
  { type: 'SCPI de rendement',     description: 'Génèrent des revenus locatifs réguliers via bureaux, commerces, entrepôts',    rendement: '4–7%',  horizon: '8–15 ans',  fiscal: '⚠️ Revenus fonciers' },
  { type: 'SCPI européennes',      description: 'Investies en zone euro, fiscalité souvent plus avantageuse pour TMI élevés',   rendement: '4–6%',  horizon: '8–12 ans',  fiscal: '✅ Fiscal avantageux' },
  { type: 'SCPI de plus-value',    description: 'Axées sur la valorisation des parts plutôt que les revenus immédiats',         rendement: '2–3%',  horizon: '10–20 ans', fiscal: '✅ PV mobilières' },
  { type: 'SCPI fiscales',         description: 'Pinel, Déficit Foncier : réduction d\'impôt en contrepartie d\'un rendement moindre', rendement: '1–3%', horizon: '15+ ans', fiscal: '✅ Réduction IR' },
  { type: 'SCPI en assurance vie', description: 'Accessibles dans une AV : fiscalité optimisée et liquidité améliorée',         rendement: '3–5%',  horizon: '8+ ans',    fiscal: '✅ Flat tax 30%' },
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
              <span>SCPI</span>
            </nav>
            <span className="fin-badge">🏢 Pierre-papier & immobilier de rendement</span>
            <h1>SCPI : percevez des loyers<br />sans gérer un seul bien</h1>
            <p>
              Investissez dans l'immobilier professionnel dès 1 000€ et percevez des revenus
              locatifs trimestriels sans aucune contrainte de gestion. Je sélectionne pour vous
              les meilleures SCPI parmi 200+ analysées et j'optimise votre stratégie fiscale.{' '}
              <strong>Gratuitement.</strong>
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Trouver mes SCPI idéales →
              </Link>
              <Link href="/contact" className="fin-btn-secondary">
                Poser une question
              </Link>
            </div>
            <div className="fin-hero-trust">
              <span>✅ Conseil 100% indépendant</span>
              <span>🏦 200+ SCPI analysées</span>
              <span>⚡ Réponse sous 24h</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
        <section className="fin-chiffres">
          <div className="fin-chiffres-inner">
            <div className="fin-chiffre"><strong>4–6%</strong><span>Rendement annuel brut moyen</span></div>
            <div className="fin-chiffre"><strong>Dès 1 000€</strong><span>Ticket d'entrée accessible</span></div>
            <div className="fin-chiffre"><strong>200+</strong><span>SCPI analysées par mes soins</span></div>
            <div className="fin-chiffre"><strong>8–10 ans</strong><span>Durée de détention recommandée</span></div>
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
                « La SCPI, c'est l'immobilier locatif dans sa meilleure version :
                les loyers arrivent, les problèmes restent chez la société de gestion.
              </p>
              <p style={{
                fontSize: '1rem',
                color: 'var(--orizia-dark)',
                lineHeight: 1.75,
                margin: '0 0 20px',
                opacity: 0.8,
              }}>
                Ce que je fais, c'est aller plus loin : choisir les SCPI qui ont
                résisté aux crises de 2022–2024, et structurer la détention pour
                que vous touchiez vraiment ce qui est affiché — pas une version
                amputée par la fiscalité. »
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

        {/* ── DANGERS ── */}
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
                J'analyse les SCPI à votre place — vous investissez sereinement.
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 20 }}>
                Gratuit, indépendant, personnalisé selon votre situation fiscale et patrimoniale réelle.
              </p>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Me faire accompagner gratuitement →
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
                <h2>Qu'est-ce qu'une SCPI ?</h2>
                <p>
                  Une <strong>SCPI (Société Civile de Placement Immobilier)</strong> est un
                  fonds d'investissement collectif qui achète et gère un portefeuille d'actifs
                  immobiliers — bureaux, commerces, entrepôts, cliniques, résidences. Chaque
                  investisseur détient des parts et perçoit sa quote-part des loyers collectés.
                </p>
                <p>
                  Agréées par l'<strong>AMF</strong>, les SCPI sont gérées par des sociétés de
                  gestion professionnelles qui s'occupent de tout : acquisition, gestion locative,
                  travaux, comptabilité et distribution des revenus. Vous n'avez strictement
                  rien à gérer.
                </p>
                <p>
                  On parle de <strong>« pierre-papier »</strong> : vous investissez dans de
                  l'immobilier réel, mais sous forme de parts. Résultat : vous profitez de
                  tous les avantages de l'immobilier locatif, sans aucun de ses contraintes
                  opérationnelles.
                </p>
              </div>

              {/* Schéma */}
              <div className="crowd-schema">
                <div style={{
                  textAlign: 'center', marginBottom: 16, fontWeight: 800,
                  fontSize: '0.85rem', textTransform: 'uppercase',
                  letterSpacing: '0.06em', color: 'var(--orizia-primary)',
                }}>
                  Comment ça fonctionne
                </div>
                <div className="crowd-schema-step crowd-schema-step--orizia">
                  <div className="crowd-schema-icon">🏢</div>
                  <strong>Cindy analyse & recommande</strong>
                  <span>Sélection des meilleures SCPI pour votre profil fiscal</span>
                </div>
                <div className="crowd-schema-arrow">↓</div>
                <div className="crowd-schema-step">
                  <div className="crowd-schema-icon">👤</div>
                  <strong>Vous achetez des parts</strong>
                  <span>Dès 1 000€ comptant, à crédit ou mensuel</span>
                </div>
                <div className="crowd-schema-arrow">↓</div>
                <div className="crowd-schema-step crowd-schema-step--platform">
                  <div className="crowd-schema-icon">🏦</div>
                  <strong>Société de gestion agréée AMF</strong>
                  <span>Gère l'intégralité du portefeuille immobilier</span>
                </div>
                <div className="crowd-schema-arrow">↓</div>
                <div className="crowd-schema-step">
                  <div className="crowd-schema-icon">🏗️</div>
                  <strong>Centaines d'actifs immobiliers</strong>
                  <span>Bureaux, commerces, santé, logistique…</span>
                </div>
                <div className="crowd-schema-arrow">↓</div>
                <div className="crowd-schema-step crowd-schema-step--result">
                  <div className="crowd-schema-icon">💰</div>
                  <strong>Vous percevez vos loyers</strong>
                  <span>Trimestriellement, sans rien faire</span>
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
              <h2>6 raisons d'investir en SCPI<br />plutôt qu'en immobilier direct</h2>
              <p>
                La SCPI offre tous les avantages de l'immobilier sans aucun de ses
                inconvénients opérationnels — à condition de bien la choisir et
                de structurer correctement la détention.
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

        {/* ── TYPES ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Les différentes SCPI</span>
              <h2>Quelle SCPI pour quel profil fiscal ?</h2>
              <p>
                Il n'existe pas une SCPI universelle. Le type optimal dépend de votre TMI,
                votre horizon et vos objectifs patrimoniaux. C'est là que mon expertise
                fait concrètement la différence.
              </p>
            </div>
            <div className="crowd-table-wrap">
              <table className="crowd-table">
                <thead>
                  <tr>
                    <th>Type de SCPI</th>
                    <th>Objectif</th>
                    <th>Rendement</th>
                    <th>Horizon</th>
                    <th>Fiscalité</th>
                  </tr>
                </thead>
                <tbody>
                  {TYPES_SCPI.map(t => (
                    <tr key={t.type}>
                      <td><strong>{t.type}</strong></td>
                      <td>{t.description}</td>
                      <td><strong style={{ color: 'var(--orizia-primary)' }}>{t.rendement}</strong></td>
                      <td>{t.horizon}</td>
                      <td>{t.fiscal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="crowd-table-note">
              ⚠️ Ce tableau est indicatif. La SCPI adaptée à votre profil dépend
              de votre situation fiscale personnelle — pas d'une règle générale.
            </p>
            <div className="crowd-cta-band" style={{ marginTop: 36 }}>
              <div>
                <strong>Quelle SCPI correspond à votre TMI ?</strong>
                <p>
                  TMI 30%, 41%, 45% — chaque tranche a sa stratégie SCPI optimale.
                  Je la calcule avec vous en rendez-vous, en 30 minutes.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Trouver ma SCPI idéale →
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
              <h2>Les risques réels,<br />expliqués honnêtement</h2>
              <p>
                Je ne vends pas du rêve. Voici une analyse transparente des risques SCPI
                — et le rôle concret que je joue pour les réduire avant chaque investissement.
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
            <div className="crowd-cta-band" style={{ marginTop: 40 }}>
              <div>
                <strong>Ces risques vous freinent ? C'est sain.</strong>
                <p>
                  Les SCPI les mieux sélectionnées ont traversé les crises de 2008 et 2022
                  sans défaut de distribution. Mon rôle est de vous orienter exclusivement
                  vers ces acteurs solides.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Analyser mon profil →
              </Link>
            </div>
          </div>
        </section>

        {/* ── FISCALITÉ ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Fiscalité SCPI 2026</span>
              <h2>Ce que vous touchez vraiment<br />après impôts</h2>
              <p>
                La fiscalité des SCPI est plus complexe que celle du crowdfunding. Elle varie
                selon votre TMI, la stratégie de détention et la nationalité de la SCPI.
                C'est précisément là que mon accompagnement change le rendement net final.
              </p>
            </div>
            <div className="scpi-fiscalite-grid">
              <div className="scpi-fiscalite-card">
                <div className="scpi-fiscalite-card-icon">🇫🇷</div>
                <h3>SCPI françaises en direct</h3>
                <p>
                  Revenus fonciers soumis à votre{' '}
                  <strong>TMI + 17,2%</strong> de prélèvements sociaux.
                  Un investisseur à 45% de TMI est taxé à <strong>62,2%</strong> sur ses
                  revenus SCPI en direct.
                </p>
                <div className="scpi-fiscalite-tag scpi-fiscalite-tag--warn">⚠️ Attention aux TMI élevés</div>
              </div>
              <div className="scpi-fiscalite-card">
                <div className="scpi-fiscalite-card-icon">🌍</div>
                <h3>SCPI européennes</h3>
                <p>
                  Grâce aux{' '}
                  <strong>conventions fiscales bilatérales</strong>, les revenus issus
                  de SCPI investies en Allemagne, Pays-Bas, Irlande… échappent souvent
                  aux prélèvements sociaux français.
                </p>
                <div className="scpi-fiscalite-tag scpi-fiscalite-tag--good">✅ Idéal pour TMI 30%+</div>
              </div>
              <div className="scpi-fiscalite-card">
                <div className="scpi-fiscalite-card-icon">🛡️</div>
                <h3>SCPI en assurance vie</h3>
                <p>
                  Logée dans une assurance vie, la SCPI bénéficie de la{' '}
                  <strong>flat tax à 30%</strong> — voire 7,5% + abattements après 8 ans.
                  Liquidité améliorée en bonus.
                </p>
                <div className="scpi-fiscalite-tag scpi-fiscalite-tag--good">✅ Meilleur ratio net/brut</div>
              </div>
              <div className="scpi-fiscalite-card">
                <div className="scpi-fiscalite-card-icon">📊</div>
                <h3>SCPI en nue-propriété</h3>
                <p>
                  Vous achetez des parts à prix décoté (15–30%) et{' '}
                  <strong>aucun revenu n'est généré</strong> pendant la période de
                  démembrement (5–15 ans). À l'issue, vous récupérez la pleine propriété.
                  Zéro fiscalité pendant la période.
                </p>
                <div className="scpi-fiscalite-tag scpi-fiscalite-tag--good">✅ Stratégie patrimoniale avancée</div>
              </div>
            </div>
            <div className="crowd-risques-note" style={{ marginTop: 28 }}>
              💡 <strong>Mon approche :</strong> je commence toujours par analyser votre situation
              fiscale avant de recommander une SCPI. La même SCPI peut être excellente pour un
              profil et contre-productive pour un autre selon le TMI et les objectifs patrimoniaux.
            </div>
          </div>
        </section>

        {/* ── SIMULATEUR ── */}
        <section className="crowd-section crowd-section--light">
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
            <SimulateurSCPI />
          </div>
        </section>

        {/* ── ACCOMPAGNEMENT ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mon accompagnement</span>
              <h2>Ce que je fais concrètement<br />pour vous, de A à Z</h2>
              <p>
                De l'analyse fiscale à la souscription, en passant par la sélection des SCPI
                et le suivi annuel — sans délégation, sans intermédiaire supplémentaire.
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
            <div className="crowd-cta-band" style={{ marginTop: 48 }}>
              <div>
                <strong>Un accompagnement complet, 100% gratuit pour vous</strong>
                <p>
                  Je suis rémunérée par les sociétés de gestion partenaires — jamais
                  par vous. Mon indépendance garantit que je travaille exclusivement
                  dans votre intérêt.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Démarrer gratuitement →
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--light">
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
                Une question spécifique à votre situation ? Je vous réponds personnellement sous 24h.
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
                La SCPI est la colonne vertébrale immobilière de votre patrimoine.
                Je construis avec vous une stratégie globale qui combine les meilleures
                enveloppes selon vos objectifs.
              </p>
            </div>
            <div className="fin-cards">
              {[
                {
                  href: '/investir/crowdfunding',
                  icon: '📈',
                  title: 'Crowdfunding immobilier',
                  sub: 'Financement participatif',
                  text: '8–12%/an sur 12–36 mois. Le complément dynamique idéal aux SCPI pour dynamiser votre rendement global sur le court terme.',
                },
                {
                  href: '/investir/assurance-vie',
                  icon: '🛡️',
                  title: 'Assurance Vie',
                  sub: 'Épargne & transmission',
                  text: 'L\'enveloppe pour loger vos SCPI et bénéficier d\'une fiscalité optimisée. Idéal pour les profils TMI 30%+ qui veulent garder la liquidité.',
                },
                {
                  href: '/investir/per',
                  icon: '🏦',
                  title: 'PER',
                  sub: 'Préparez votre retraite',
                  text: 'Réduisez vos impôts dès cette année et préparez votre retraite. Combiné aux SCPI dans une AV, un duo particulièrement puissant.',
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
              <Link href="/contact" className="fin-btn-outline">
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