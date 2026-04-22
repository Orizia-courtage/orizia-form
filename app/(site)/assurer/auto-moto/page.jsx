import Link from 'next/link';
import Image from 'next/image';
import ContactPopup from '@/components/ContactPopup';
import MotoTarifSelector from '@/components/MotoTarifSelector';
import AutoFormuleSelector from '@/components/AutoFormuleSelector';
import AutoProfilSelector from '@/components/AutoProfilSelector';
import AutoChecklist from '@/components/AutoChecklist';
import ReadingProgressAutoMoto from '@/components/ReadingProgressAutoMoto';
import ScrollButton from '@/components/ScrollButton';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Assurance Auto & Moto 2026 : Baissez vos tarifs à Lille & Hauts-de-France | Orizia Courtage',
  description:
    'Votre assurance auto ou moto flambe ? Cindy Urbansky, courtier dans les Hauts-de-France, compare les offres, trouve le meilleur tarif et gère la résiliation via la loi Hamon. Gratuit.',
  alternates: { canonical: 'https://www.orizia-courtage.fr/assurer/auto-moto' },
  openGraph: {
    title: 'Assurance Auto & Moto 2026 : Baissez vos tarifs | Orizia Courtage',
    description: 'Ne subissez plus les hausses de tarifs. Je compare le marché, optimise vos garanties et résilie votre ancien contrat via la loi Hamon. Gratuit et indépendant.',
    url: 'https://www.orizia-courtage.fr/assurer/auto-moto',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://www.orizia-courtage.fr/images/og-auto-moto.jpg',
        width: 1200,
        height: 630,
        alt: 'Comparaison et courtage en assurance auto moto avec Orizia Courtage - Cindy Urbansky',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES ──
const assuranceAutoMotoSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Assurer', item: 'https://www.orizia-courtage.fr/assurer' },
        { '@type': 'ListItem', position: 3, name: 'Assurance Auto & Moto', item: 'https://www.orizia-courtage.fr/assurer/auto-moto' }
      ]
    },
    {
      '@type': 'Service',
      name: "Courtage et Comparaison d'Assurance Auto et Moto",
      serviceType: 'Assurance Véhicule (Auto, Moto, Scooter)',
      description:
        "Service d'optimisation, de comparaison et de souscription d'assurance auto et moto. Prise en charge de la résiliation via la loi Hamon.",
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        image: 'https://www.orizia-courtage.fr/images/Orizia_logo.webp',
      },
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
        description:
          "Analyse des besoins, comparaison des devis et gestion administrative de la résiliation 100% gratuites pour l'assuré.",
      },
    },
  ]
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
        text: 'Le Tiers couvre les dégâts causés aux autres. L\'Intermédiaire vous protège contre le vol, l\'incendie et le bris de glace. Le Tous Risques couvre tout, y compris les dégâts sur votre propre véhicule même si vous êtes responsable. En tant que courtier, je vous oriente vers la formule la plus logique selon la cote Argus de votre véhicule.',
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
      name: 'Pourquoi confier mon assurance à un courtier indépendant comme Orizia ?',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(assuranceAutoMotoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        <ReadingProgressAutoMoto />

        {/* ── HERO (Avec image de fond) ── */}
        <section className="fin-hero ae-hero">
          <div className="ae-hero-bg">
            <Image
              src="/images/discret-hero-bg.webp"
              alt=""
              fill
              priority
              quality={80}
              sizes="100vw"
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
              <span>Assurance Auto & Moto</span>
            </nav>
            <span className="fin-badge ae-hero-badge">📈 +5% d'augmentation en 2026</span>
            <h1 className="ae-hero-title">Votre assurance auto flambe ?<br />Je remets les compteurs à zéro.</h1>
            <p className="ae-hero-intro">
              Arrêtez de payer la taxe de la fidélité. Je compare les offres du marché, 
              <strong> je déniche le tarif le plus juste </strong> et je gère toute la résiliation 
              à votre place. Un accompagnement <strong>100% dédié à vos intérêts</strong>.
            </p>
            <div className="ae-hero-btns">
              <ContactPopup label="📅 Faire un bilan gratuit avec Cindy" className="fin-btn-primary" />
              <ScrollButton targetId="section-formules" className="fin-btn-secondary">
                🔍 Voir les formules
              </ScrollButton>
            </div>
            <div className="ae-hero-trust">
              <span>✅ Loi Hamon : je m'occupe de résilier</span>
              <span>🚗 Courtage 100% indépendant</span>
              <span>⚡ Étude personnalisée sous 24h</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES ── */}
        <section className="fin-chiffres">
          <div className="ae-chiffres-inner">
            {CHIFFRES.map(c => (
              <div key={c.label} className="fin-chiffre">
                <strong>{c.icon} {c.value}</strong>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CITATION CINDY (Avec photo intégrée) ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="ae-citation-card">
              <div className="ae-citation-photo">
                <Image
                  src="/images/photo-cindy.webp"
                  alt="Cindy Urbansky, courtier indépendant"
                  title="Cindy Urbansky - Orizia Courtage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  sizes="(max-width: 768px) 150px, 180px"
                  priority
                />
              </div>
              <div className="ae-citation-content">
                <p className="ae-citation-quote">
                  « Chaque année, votre fidélité est paradoxalement sanctionnée par une hausse de vos cotisations. »
                </p>
                <p className="ae-citation-text">
                  Mon rôle est de dire stop à ces augmentations silencieuses. Je mets les assureurs en concurrence, je déniche les garanties qui vous protègent vraiment, et surtout : je m'occupe de toute la paperasse pour résilier votre ancien contrat. Vous roulez l'esprit léger, je gère le reste.
                </p>
                <span className="ae-citation-author">
Cindy Urbansky, courtier indépendant et fondatrice de Orizia Courtage                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── DANGERS (Avec nouvelle image) ── */}
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
                  src="/images/hausse-assurance-auto.webp" // À adapter avec ton nom de fichier réel
                  alt="Hausse des tarifs d'assurance auto et moto"
                  title="La fidélité coûte cher en assurance"
                  width={716}
                  height={1024}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── FORMULES AUTO ── */}
        <section id="section-formules" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Cibler vos besoins</span>
              <h2>Tiers, intermédiaire ou tous risques :<br />on adapte la formule à votre voiture</h2>
              <p>
                Ne payez que pour les garanties qui ont un sens par rapport à la valeur actuelle de votre véhicule.
              </p>
            </div>
            <AutoFormuleSelector />
          </div>
        </section>

        {/* ── MOTO ── */}
        <section id="section-moto" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Spécial Motards ✌️</span>
              <h2>Assurance moto : on ajuste<br />selon la cylindrée et l'usage</h2>
              <p>
                Parce qu'on n'assure pas un scooter 125cc comme une routière de 1000cc.
              </p>
            </div>
            <MotoTarifSelector />
          </div>
        </section>

        {/* ── PROFILS ── */}
        <section id="section-profils" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Sur-mesure</span>
              <h2>À chaque profil,<br />sa stratégie pour faire baisser le prix</h2>
              <p>Je ne rentre personne dans des cases génériques. On cherche les leviers qui vous correspondent.</p>
            </div>
            <AutoProfilSelector />
          </div>
        </section>

        {/* ── LOI HAMON / ACCOMPAGNEMENT (Avec nouvelle image) ── */}
        <section id="section-hamon" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}>
                ✅ Loi Hamon — Je m'occupe de tout
              </span>
              <h2>Changer d'assureur<br />n'a jamais été aussi simple</h2>
              <p>
                Dès que votre contrat actuel a soufflé sa première bougie, vous avez le droit de partir à tout moment. 
                Et c'est moi qui m'occupe de la transition !
              </p>
            </div>

            {/* Points Loi Hamon */}
            <div className="am-hamon-grid">
              {LOI_HAMON_POINTS.map(p => (
                <div key={p.title} className="am-hamon-card">
                  <div className="am-hamon-icon">{p.icon}</div>
                  <div className="am-hamon-title">{p.title}</div>
                  <div className="am-hamon-desc">{p.desc}</div>
                </div>
              ))}
            </div>

            <div className="ae-accompagnement-layout" style={{ marginTop: 40 }}>
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
                  src="/images/dossier_assurance_auto_moto.webp"
                  alt="Courtier préparant un dossier d'assurance auto/moto"
                  title="Un accompagnement de A à Z sans coupure"
                  width={863}
                  height={1080}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
        

        {/* ── OBJECTIONS ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">On en parle ?</span>
              <h2>Les excuses qu'on se donne pour ne pas changer<br />(et pourquoi il faut franchir le cap)</h2>
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
            <AutoChecklist />
          </div>
        </section>

        {/* ── FAQ ── */}
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
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Vous avez une question spécifique à votre situation ? Je vous réponds sous 24h.
              </p>
              <ContactPopup label="✉️ Poser une autre question à Cindy" className="fin-btn-secondary" />
            </div>          
          </div>
        </section>

        {/* ── MAILLAGE INTERNE ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Vision globale</span>
              <h2>Puisqu'on y est, si on optimisait<br />le reste de vos contrats ?</h2>
              <p>Faire le tri dans l'auto, c'est bien. Regrouper ses assurances pour avoir un conseiller unique et faire des économies d'échelle, c'est mieux.</p>
            </div>
            <div className="fin-cards fin-cards--light">
              {[
                {
                  href: '/assurer/assurance-habitation',
                  icon: '🏠',
                  title: 'Assurance Habitation',
                  sub: 'Protéger votre cocon',
                  text: 'Comme pour l\'auto, les tarifs augmentent. Faisons le point pour protéger vos biens au prix juste.',
                  badge: '🏠 Audit gratuit de votre contrat',
                  pillBg: 'rgba(217,119,6,0.08)',
                  pillColor: '#d97706',
                  pillBorder: 'rgba(217,119,6,0.2)',
                  featured: false,
                },
                {
                  href: '/assurer/assurance-emprunteur',
                  icon: '📋',
                  title: 'Assurance Emprunteur',
                  sub: 'L\'économie massive',
                  text: 'C\'est souvent là que je vous fais gagner le plus d\'argent (plusieurs milliers d\'euros sur un crédit immobilier).',
                  badge: '💰 Économisez jusqu\'à 15 000€',
                  pillBg: 'rgba(201,169,110,0.12)',
                  pillColor: 'var(--orizia-gold)',
                  pillBorder: 'rgba(201,169,110,0.3)',
                  featured: true,
                },
                {
                  href: '/investir/per',
                  icon: '💰',
                  title: 'Plan Épargne Retraite',
                  sub: 'Défiscaliser utile',
                  text: 'Vos économies d\'assurance réinvesties dans votre retraite, avec une déduction d\'impôt à la clé.',
                  badge: '🏦 Déduction fiscale immédiate',
                  pillBg: 'rgba(45,106,95,0.1)',
                  pillColor: 'var(--orizia-primary)',
                  pillBorder: 'rgba(45,106,95,0.25)',
                  featured: false,
                },
              ].map(s => (
                <Link href={s.href} key={s.title} className={`fin-card${s.featured ? ' fin-card--featured' : ''}`}>
                  {s.badge && (
                    <span className="fin-card-pill" style={{
                      background: s.pillBg,
                      color: s.pillColor,
                      border: `1px solid ${s.pillBorder}`,
                    }}>
                      {s.badge}
                    </span>
                  )}
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
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-light)' }}>
          <div className="fin-cta-inner">
            <h2>Prêt(e) à arrêter de payer<br />votre assurance trop cher ?</h2>
            <p>
              Je compare les meilleures offres du marché, je vous conseille en totale indépendance et je m'occupe de la paperasse. Vous n'avez plus d'excuses pour ne pas faire d'économies.
            </p>
            <div className="ae-hero-btns">
              <ContactPopup label="✉️ Contactez moi" className="fin-btn-primary" />
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
              Je suis immatriculée à l'ORIAS. Je travaille dans vos intérêts et suis rémunérée
              par la compagnie d'assurance choisie, sans surcoût pour vous.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}