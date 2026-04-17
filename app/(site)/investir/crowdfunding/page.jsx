import Link from 'next/link';
import Image from 'next/image';
import SimulateurCrowdfunding from '@/components/SimulateurCrowdfunding';
import PlacementsComparatif from '@/components/PlacementsComparatif';
import RisqueJauge from '@/components/RisqueJauge';
import InvestisseurChecklist from '@/components/InvestisseurChecklist';
import ReadingProgress from '@/components/ReadingProgress';

// ── 1. MÉTADONNÉES SEO (Optimisées) ──
export const metadata = {
  title: 'Crowdfunding Immobilier 2026 : 8–12%/an avec un Expert | Orizia Courtage',
  description:
    'Je sélectionne et audite les projets de crowdfunding immobilier pour vous. 8–12%/an, dès 1 000€. Conseil indépendant et gratuit par Cindy Urbansky.',
  keywords: [
    'crowdfunding immobilier 2026',
    'crowdfunding immobilier risques avis',
    'meilleure plateforme crowdfunding immobilier',
    'investissement participatif immobilier conseil',
    'rendement crowdfunding net flat tax',
    'courtier crowdfunding indépendant Hauts-de-France',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/investir/crowdfunding' },
  openGraph: {
    title: 'Crowdfunding Immobilier 2026 : 8–12%/an avec un Expert | Orizia Courtage',
    description: 'Je sélectionne et audite les projets de crowdfunding immobilier pour vous. 8–12%/an, dès 1 000€. Conseil indépendant et gratuit.',
    url: 'https://orizia-courtage.fr/investir/crowdfunding',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/crowdfunding-immobilier.jpg',
        width: 1200,
        height: 630,
        alt: "Investir dans le Crowdfunding Immobilier avec Orizia Courtage - Cindy Urbansky",
      },
    ],
    locale: 'fr_FR',
    type: 'article',
  },
};

// ── 2. DONNÉES STRUCTURÉES (Optimisées E-E-A-T & GEO) ──
const investirCrowdfundingSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    // 1. Fil d'Ariane
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Investir', item: 'https://orizia-courtage.fr/investir' },
        { '@type': 'ListItem', position: 3, name: 'Crowdfunding Immobilier', item: 'https://orizia-courtage.fr/investir/crowdfunding' }
      ]
    },
    // 2. Le Service proposé
    {
      '@type': 'Service',
      name: "Courtage et Conseil en Crowdfunding Immobilier",
      serviceType: 'Investissement Participatif Immobilier',
      description:
        "Sélection, audit et conseil indépendant pour investir dans des projets de crowdfunding immobilier. Objectif de rendement 8-12%/an.",
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        image: 'https://orizia-courtage.fr/images/Orizia_logo.webp',
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
          "Audit des promoteurs, sélection des projets et définition de la stratégie de diversification 100% gratuites pour l'investisseur (rémunération par les plateformes partenaires).",
      },
    },
    // 3. La FAQ existante
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quel est le rendement moyen du crowdfunding immobilier en 2026 ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'En 2026, les rendements oscillent entre 8% et 12% brut par an — bien au-dessus du livret A (3%) ou de l\'assurance vie en fonds euros (2–3%). Mais un rendement élevé s\'accompagne toujours d\'un risque plus élevé. L\'analyse sérieuse du projet et du promoteur n\'est pas facultative.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quels sont les risques du crowdfunding immobilier ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le risque principal est la perte partielle ou totale du capital si le promoteur fait défaut. S\'y ajoutent le risque de retard, le capital bloqué 12 à 36 mois, et la qualité inégale des plateformes. Une diversification rigoureuse et un accompagnement expert limitent significativement l\'exposition à ces risques.',
          },
        },
        {
          '@type': 'Question',
          name: 'Pourquoi passer par un courtier pour investir dans le crowdfunding ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Les plateformes sont rémunérées par les promoteurs, pas par vous. Leurs intérêts ne sont pas toujours alignés avec les vôtres. En tant que courtière indépendante chez Orizia Courtage, j\'analyse les bilans des promoteurs, sélectionne les plateformes les plus solides et construis une stratégie adaptée à votre profil — le tout gratuitement.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quelle fiscalité s\'applique au crowdfunding immobilier ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Les intérêts sont soumis au Prélèvement Forfaitaire Unique (PFU) de 30% : 12,8% d\'impôt sur le revue + 17,2% de prélèvements sociaux. Si votre TMI est inférieur à 12,8%, l\'option pour le barème progressif peut être plus avantageuse.',
          },
        },
        {
          '@type': 'Question',
          name: 'Combien de temps mon capital est-il bloqué ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La durée d\'immobilisation est généralement de 12 à 36 mois. Il n\'existe pas de marché secondaire : vous ne pouvez pas récupérer votre capital avant l\'échéance. N\'investissez donc que de l\'épargne dont vous n\'aurez pas besoin sur cette période.',
          },
        },
      ],
    },
  ],
};

const faqSchema = investirCrowdfundingSchema['@graph'][2];

const CHIFFRES = [
  { value: '8–12%', label: 'Rendement annuel brut moyen', icon: '📈 ' },
  { value: "Dès 1 000€", label: "Ticket d'entrée accessible", icon: '💶 ' },
  { value: '12–36 mois', label: "Durée d'investissement typique", icon: '⏳ ' },
  // ⚠️ Le fix est ici 👇
  { value: '⚖️\u00A0Flat\u00A0tax\u00A030%', label: 'Fiscalité applicable aux intérêts', icon: '' },
];

const DANGERS = [
  {
    icon: '🕵️',
    title: 'Les plateformes travaillent pour le promoteur — pas pour vous',
    text: 'C\'est le promoteur qui rémunère la plateforme. Leur modèle économique repose sur le remplissage des projets, pas sur la protection de votre capital. Leurs analyses de risque sont rarement indépendantes — et rarement lisibles pour un non-spécialiste.',
  },
  {
    icon: '📑',
    title: 'Lire un bilan de promoteur, ça s\'apprend',
    text: 'Ratio d\'endettement, fonds propres, historique de livraisons, garanties d\'achèvement : ces données sont publiques mais opaques sans formation financière. Un promoteur fragile, c\'est un risque de défaut que seul un regard expert détecte avant qu\'il soit trop tard.',
  },
  {
    icon: '🎯',
    title: 'La diversification ne s\'improvise pas',
    text: 'Mettre 10 000€ sur un seul projet, c\'est un risque inutile. Une vraie stratégie répartit le capital sur plusieurs projets, typologies d\'actifs et zones géographiques — avec méthode, pas au hasard.',
  },
];

const AVANTAGES = [
  { icon: '📈', title: '8–12% brut/an', text: 'Parmi les meilleurs rendements accessibles aux particuliers, bien au-dessus de l\'inflation et de tous les livrets bancaires.' },
  { icon: '💶', title: 'Dès 1 000€', text: 'L\'immobilier de rendement à portée de tous, sans mobiliser un apport important ni passer par un notaire.' },
  { icon: '⏱️', title: '12–36 mois', text: 'Durée maîtrisée avec une date de remboursement connue à l\'avance — idéal pour une épargne de moyen terme avec un objectif précis.' },
  { icon: '🏗️', title: 'Actif tangible', text: 'Votre argent finance un projet immobilier réel : construction, rénovation ou marchand de biens. Un sous-jacent concret, pas de la spéculation.' },
  { icon: '🔄', title: 'Diversification efficace', text: 'Complément naturel d\'une assurance vie, d\'un PER ou d\'une SCPI pour dynamiser votre portefeuille sans le déséquilibrer.' },
  { icon: '🚫', title: 'Zéro gestion', text: 'Pas de locataire à gérer, pas de travaux imprévus, pas de taxe foncière. Un placement 100% passif et dématérialisé.' },
];

const RISQUES = [
  {
    niveau: 'Élevé', color: '#dc2626', bg: '#fff1f0', border: '#fecaca', icon: '🔴',
    title: 'Perte en capital',
    text: 'En cas de défaillance du promoteur, vous pouvez perdre tout ou partie de votre capital. Ce risque est réel : certaines plateformes ont enregistré des taux de défaut supérieurs à 10% en 2023–2024.',
    mitigation: 'Mon rôle : auditer le promoteur avant de vous recommander le projet.',
  },
  {
    niveau: 'Moyen', color: '#d97706', bg: '#fffbeb', border: '#fed7aa', icon: '🟠',
    title: 'Retard de remboursement',
    text: 'Un chantier peut accuser des retards : permis de construire, problèmes techniques, ralentissement du marché. Le remboursement peut être décalé de plusieurs mois.',
    mitigation: 'Mon rôle : sélectionner des promoteurs avec un track record solide et vérifié.',
  },
  {
    niveau: 'Moyen', color: '#d97706', bg: '#fffbeb', border: '#fed7aa', icon: '🟠',
    title: 'Capital illiquide',
    text: 'Aucun marché secondaire ne permet de revendre vos parts avant l\'échéance. Si vous avez besoin de liquidités, vous ne pouvez pas récupérer votre argent avant terme.',
    mitigation: 'Mon rôle : calibrer l\'allocation au crowdfunding selon votre besoin réel de liquidité.',
  },
  {
    niveau: 'Faible', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '🟢',
    title: 'Risque de plateforme',
    text: 'La faillite d\'une plateforme non agréée peut compliquer le suivi de vos investissements. Une plateforme agréée AMF/PSFP offre un cadre légal et une protection renforcée.',
    mitigation: 'Mon rôle : ne travailler qu\'avec des plateformes agréées, auditées par mes soins.',
  },
];

const COMPARATIF = [
  { produit: 'Livret A', rendement: '3%', duree: 'Libre', risque: '⭐ Très faible', liquidite: '✅ Immédiate', highlight: false },
  { produit: 'Assurance Vie', rendement: '2–4%', duree: '8 ans+', risque: '⭐ Très faible', liquidite: '✅ Bonne', highlight: false },
  { produit: 'SCPI', rendement: '4–6%', duree: '8–10 ans', risque: '⭐⭐ Faible', liquidite: '⚠️ Limitée', highlight: false },
  { produit: '📈 Crowdfunding immo', rendement: '8–12%', duree: '1–3 ans', risque: '⭐⭐⭐ Moyen', liquidite: '❌ Bloqué', highlight: true },
  { produit: 'Actions bourse', rendement: 'Variable', duree: 'Variable', risque: '⭐⭐⭐⭐ Élevé', liquidite: '✅ Immédiate', highlight: false },
];

const ETAPES = [
  {
    n: '01',
    title: 'Bilan de votre situation',
    text: 'Je commence par comprendre vos objectifs, votre horizon d\'investissement et votre tolérance au risque. Pas de formulaire générique — une vraie conversation.',
  },
  {
    n: '02',
    title: 'Audit des plateformes',
    text: 'Je ne recommande que les plateformes agréées AMF dont j\'ai vérifié le taux de défaut historique, la transparence et la solidité financière. Plusieurs ne passent pas mes critères.',
  },
  {
    n: '03',
    title: 'Sélection des projets',
    text: 'Pour chaque projet, j\'analyse le bilan du promoteur, les garanties prises et le réalisme du plan de financement. Si quelque chose cloche, je ne vous le recommande pas.',
  },
  {
    n: '04',
    title: 'Stratégie de diversification',
    text: 'Je construis avec vous un portefeuille réparti sur plusieurs projets, typologies et zones géographiques pour optimiser le couple rendement/risque — adapté à vous, pas copié-collé.',
  },
];

export default function CrowdfundingPage() {
  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(investirCrowdfundingSchema) }}
      />

      <main>

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

          <div className="ae-hero-inner">
            <nav aria-label="breadcrumb" className="ae-breadcrumb">
              <Link href="/">Accueil</Link>
              {' › '}
              <Link href="/investir">Investir</Link>
              {' › '}
              <span>Crowdfunding immobilier</span>
            </nav>
            <span className="fin-badge">📈 Financement participatif immobilier 2026</span>
            <h1 className="ae-hero-title">Crowdfunding immobilier :<br />8 à 12% par an, sans naviguer à l'aveugle</h1>
            <p className="ae-hero-intro">
              Investir seul dans le crowdfunding, c'est analyser des bilans de promoteurs
              sans formation, comparer des plateformes sans critères objectifs, et diversifier
              sans stratégie. Je m'occupe de tout ça à votre place.{' '}
              <strong>Gratuitement.</strong>
            </p>
            <div className="ae-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Échanger avec Cindy gratuitement →
              </Link>
              <Link href="/contact" className="fin-btn-secondary">
                Poser une question
              </Link>
            </div>
            <div className="ae-hero-trust">
              <span>✅ Conseil 100% indépendant</span>
              <span>🏦 Plateformes agréées AMF uniquement</span>
              <span>⚡ Réponse sous 24h</span>
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

        {/* ── CITATION CINDY (Avec photo insérée) ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="ae-citation-card">
              <div className="ae-citation-photo">
                <Image
                  src="/images/photo-cindy.webp"
                  alt="Cindy Urbansky, courtière experte en crowdfunding immobilier"
                  title="Cindy Urbansky - Orizia Courtage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  sizes="(max-width: 768px) 150px, 180px"
                  priority
                />
              </div>

              <div className="ae-citation-content">
                <p className="ae-citation-quote">
                  « Je ne vous recommande jamais un projet que je n'investirais pas moi-même. »
                </p>
                <p className="ae-citation-text">
                  Avant chaque recommandation, j'analyse le bilan du promoteur, l'historique
                  de la plateforme et la cohérence du plan de financement. Ce travail prend
                  du temps — mais c'est précisément ce que vous méritez avant d'engager
                  votre épargne.
                </p>
                <span className="ae-citation-author">
                  — Cindy Urbansky, courtière indépendante · Orizia Courtage
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── DANGER — INVESTIR SEUL (Avec image contextuelle) ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Ce que personne ne vous dit
              </span>
              <h2>Pourquoi investir seul<br />dans le crowdfunding est risqué</h2>
              <p>
                Des centaines de particuliers ouvrent un compte sur une plateforme sans analyse préalable.
                Voici les 3 erreurs qui coûtent cher — et comment je les évite pour vous.
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
                  src="/images/banque-pression.webp"
                  alt="Particulier inquiet face à la complexité de l'analyse financière"
                  title="Les risques d'investir seul sans analyse expert"
                  width={716}
                  height={1024}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--orizia-accent)', marginBottom: 6 }}>
                C'est exactement pour ça que j'existe.
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 20 }}>
                J'analyse à votre place ce que vous n'avez ni le temps ni les outils de faire —
                et je vous dis clairement ce qui vaut le coup, et ce qui ne vaut pas.
              </p>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Me faire accompagner gratuitement →
              </Link>
            </div>
          </div>
        </section>

        {/* ── QU'EST-CE QUE C'EST ── */}
        <section id="section-definition" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">

            {/* Titre centré */}
            <div className="fin-section-head" style={{ marginBottom: 40 }}>
              <span className="fin-badge">Définition</span>
              <h2>Qu'est-ce que le crowdfunding immobilier ?</h2>
              <p>
                Vous prêtez de l'argent à un promoteur via une plateforme agréée AMF.
                Il construit ou rénove. Vous percevez des intérêts fixes, puis récupérez votre capital.
              </p>
            </div>

            {/* 3 points clés */}
            <div className="crd-points">
              <div className="crd-point">
                <div className="crd-point-icon">🏛️</div>
                <div>
                  <strong>Cadre légal solide</strong>
                  <p>Encadré depuis 2022 par le statut européen <strong>PSFP</strong>. Mais un cadre légal ne protège pas d'un mauvais promoteur — c'est là qu'intervient mon analyse.</p>
                </div>
              </div>
              <div className="crd-point">
                <div className="crd-point-icon">🚫</div>
                <div>
                  <strong>Zéro gestion</strong>
                  <p>Aucune gestion locative, aucune taxe foncière, aucun recours notarial. Un investissement 100% passif et dématérialisé.</p>
                </div>
              </div>
              <div className="crd-point">
                <div className="crd-point-icon">📅</div>
                <div>
                  <strong>Durée courte et maîtrisée</strong>
                  <p>12 à 36 mois. Vous connaissez la date de remboursement à l'avance — contrairement à la bourse ou aux SCPI.</p>
                </div>
              </div>
            </div>

            {/* Flux "Comment ça fonctionne" */}
            <div className="crd-flow-title">Comment ça fonctionne</div>
            <div className="crd-flow">
              {[
                { icon: '👤', label: 'Vous investissez', sub: 'Dès 1 000€, en ligne', color: 'var(--orizia-white)', textColor: 'var(--orizia-accent)', border: '1px solid rgba(26,61,53,0.12)' },
                { icon: '🏢', label: 'Orizia sélectionne', sub: 'Audit promoteur + stratégie', color: 'var(--orizia-accent)', textColor: '#fff', gold: true },
                { icon: '🏦', label: 'Plateforme AMF', sub: 'Collecte et gestion', color: 'var(--orizia-light)', textColor: 'var(--orizia-accent)', border: '1px solid rgba(26,61,53,0.1)' },
                { icon: '🏗️', label: 'Promoteur', sub: 'Construit / rénove / revend', color: 'var(--orizia-white)', textColor: 'var(--orizia-accent)', border: '1px solid rgba(26,61,53,0.12)' },
                { icon: '💰', label: 'Vous êtes remboursé', sub: 'Capital + 8–12%/an', color: 'var(--orizia-gold-light)', textColor: 'var(--orizia-accent)', border: '2px solid var(--orizia-gold)' },
              ].map((step, i, arr) => (
                <div key={step.label} className="crd-flow-item">
                  <div className="crd-flow-card" style={{ background: step.color, border: step.gold ? '2px solid var(--orizia-gold)' : step.border }}>
                    <span className="crd-flow-icon">{step.icon}</span>
                    <strong style={{ color: step.textColor }}>{step.label}</strong>
                    <span style={{ color: step.textColor, opacity: step.gold ? 0.85 : 0.65 }}>{step.sub}</span>
                    {step.gold && <span className="crd-flow-badge">Orizia</span>}
                  </div>
                  {i < arr.length - 1 && <div className="crd-flow-arrow">→</div>}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── AVANTAGES ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Les atouts</span>
              <h2>Pourquoi le crowdfunding immobilier<br />mérite une place dans votre patrimoine</h2>
              <p>
                Haut rendement, durée courte, zéro gestion — à condition d'être bien accompagné
                et de n'y allouer qu'une fraction adaptée à votre profil.
              </p>
            </div>
            <div className="crowd-avantages-grid">
              {AVANTAGES.map(a => (
                <div
                  key={a.title}
                  className="crowd-avantage-card"
                  style={
                    a.title === '8–12% brut/an' || a.title === 'Zéro gestion'
                      ? { borderTop: '3px solid var(--orizia-gold)', background: 'rgba(201,169,110,0.04)' }
                      : {}
                  }
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <h3 style={{ margin: 0 }}>{a.title}</h3>
                    <span style={{ fontSize: '1.6rem', flexShrink: 0, marginLeft: 10 }}>{a.icon}</span>
                  </div>
                  {(a.title === '8–12% brut/an' || a.title === 'Zéro gestion') && (
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
                      ⭐ Avantage différenciant
                    </div>
                  )}
                  <p>{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARATIF ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Comparatif objectif</span>
              <h2>Le crowdfunding face aux autres placements</h2>
              <p>
                Le crowdfunding n'est pas fait pour 100% de votre épargne — mais il a
                une place précise dans une stratégie patrimoniale bien construite.
                Cliquez sur chaque placement pour comparer.
              </p>
            </div>
            <PlacementsComparatif />
            <div className="crowd-cta-band" style={{ marginTop: 36 }}>
              <div>
                <strong>Quelle allocation pour votre profil ?</strong>
                <p>
                  Crowdfunding, SCPI, assurance vie, PER : je construis avec vous la
                  répartition optimale selon vos objectifs et votre tolérance au risque.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-on-dark">
                📅 Définir ma stratégie →
              </Link>
            </div>
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
                Comparez l'exposition aux risques avec et sans accompagnement.
                Cliquez sur chaque risque pour voir comment je le réduis concrètement.
              </p>
            </div>
            <RisqueJauge />
            <div className="crowd-cta-band" style={{ marginTop: 40 }}>
              <div>
                <strong>Ces risques vous inquiètent ? C'est une très bonne chose.</strong>
                <p>
                  Les investisseurs qui réussissent comprennent les risques avant d'investir.
                  Mon rôle est de vous aider à les maîtriser — pas à les minimiser pour
                  vous convaincre.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-on-dark">
                📅 Analyser mon profil →
              </Link>
            </div>
          </div>
        </section>

        {/* ── FISCALITÉ + SIMULATEUR ── */}
        <section id="section-fiscalite" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Fiscalité 2026</span>
              <h2>Ce que vous touchez<br />vraiment après impôts</h2>
              <p>
                Les intérêts perçus sont des <strong>revenus de capitaux mobiliers</strong>{' '}
                soumis au <strong>Prélèvement Forfaitaire Unique (PFU) de 30%</strong>.
                Voici comment ça se décompose — et ce que ça change concrètement sur votre gain.
              </p>
            </div>

            {/* Décomposition flat tax */}
            <div className="crowd-fiscalite-grid">
              <div className="crowd-fiscalite-item" style={{ background: 'var(--orizia-gold-light)', border: '1px solid rgba(201,169,110,0.4)' }}>
                <strong>12,8%</strong>
                <span>Impôt sur le revenu</span>
              </div>
              <div className="crowd-fiscalite-plus">+</div>
              <div className="crowd-fiscalite-item" style={{ background: 'var(--orizia-gold-light)', border: '1px solid rgba(201,169,110,0.4)' }}>
                <strong>17,2%</strong>
                <span>Prélèvements sociaux</span>
              </div>
              <div className="crowd-fiscalite-plus">=</div>
              <div className="crowd-fiscalite-item crowd-fiscalite-total" style={{ border: '2px solid var(--orizia-gold)' }}>
                <strong>30%</strong>
                <span>Flat tax totale</span>
              </div>
            </div>

            {/* Notes fiscales */}
            <div className="crowd-fiscalite-notes">
              <div className="crowd-fiscalite-note" style={{ background: 'var(--orizia-gold-light)', border: '1px solid rgba(201,169,110,0.3)' }}>
                <span className="crowd-fiscalite-note-icon">💡</span>
                <p>
                  <strong>Bon à savoir :</strong> si votre taux marginal d'imposition est
                  inférieur à 12,8%, vous pouvez opter pour le{' '}
                  <strong>barème progressif</strong> et réduire votre charge fiscale.
                  Je peux vous guider sur ce choix lors de notre rendez-vous.
                </p>
              </div>
              <div className="crowd-fiscalite-note" style={{ background: 'var(--orizia-gold-light)', border: '1px solid rgba(201,169,110,0.3)' }}>
                <span className="crowd-fiscalite-note-icon">⚠️</span>
                <p>
                  Il n'existe <strong>pas d'enveloppe fiscale dédiée</strong> pour le
                  crowdfunding (contrairement à l'assurance vie ou au PER). C'est pourquoi
                  sa place dans votre patrimoine global mérite réflexion avec un expert.
                </p>
              </div>
            </div>

            {/* Simulateur */}
            <div className="fin-section-head" style={{ marginTop: 56 }}>
              <span className="fin-badge">Simulation interactive</span>
              <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 900, color: 'var(--orizia-accent)' }}>
                Calculez votre gain net<br />en temps réel
              </h3>
              <p>
                Ajustez le montant, le taux et la durée pour voir exactement ce que
                vous percevez après flat tax — et comparer avec un livret A.
              </p>
            </div>
            <SimulateurCrowdfunding />
          </div>
        </section>

        {/* ── NOTRE SÉLECTION ── */}
        <section id="section-selection" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">

            <div className="crd-sel-wrap">

              {/* Colonne gauche — critères */}
              <div className="crd-sel-left">
                <span className="fin-badge">Ma sélection</span>
                <h2>Quelles plateformes<br />je recommande — et pourquoi</h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--orizia-dark)', opacity: 0.75, lineHeight: 1.65, marginBottom: 28 }}>
                  J'ai audité plus de 15 plateformes actives sur le marché français.
                  Ma sélection repose sur 5 critères non négociables — plusieurs plateformes
                  bien connues n'en font pas partie.
                </p>

                <div className="crd-criteres">
                  {[
                    { icon: '🏛️', label: 'Agrément AMF/PSFP', desc: 'En règle et à jour — je vérifie chaque année' },
                    { icon: '📊', label: 'Taux de défaut < 3%', desc: 'Historique vérifié sur les 3 dernières années' },
                    { icon: '🔍', label: 'Transparence totale', desc: 'Bilans des promoteurs accessibles et lisibles' },
                    { icon: '🏗️', label: 'Permis & garanties', desc: 'Analyse systématique avant chaque recommandation' },
                    { icon: '💬', label: 'Suivi en cas de retard', desc: 'Service client réactif, pas de silence radio' },
                  ].map((c, i) => (
                    <div key={c.label} className="crd-critere-row">
                      <div className="crd-critere-num">{i + 1}</div>
                      <div className="crd-critere-icon">{c.icon}</div>
                      <div>
                        <div className="crd-critere-label">{c.label}</div>
                        <div className="crd-critere-desc">{c.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colonne droite — vault CTA */}
              <div className="crd-sel-vault">
                <div className="crd-vault-lock">🔒</div>
                <div className="crd-vault-badge">Accès exclusif</div>
                <h3 className="crd-vault-title">Ma liste de plateformes<br />sélectionnées</h3>
                <p className="crd-vault-desc">
                  15+ plateformes auditées. Seulement les meilleures retenues.
                  Je ne la publie pas en ligne — une plateforme adaptée à un profil
                  dynamique ne l'est pas pour un profil prudent.
                </p>

                <div className="crd-vault-stats">
                  <div className="crd-vault-stat">
                    <strong>15+</strong>
                    <span>Plateformes auditées</span>
                  </div>
                  <div className="crd-vault-stat-sep" />
                  <div className="crd-vault-stat">
                    <strong>&lt; 3%</strong>
                    <span>Taux de défaut max</span>
                  </div>
                  <div className="crd-vault-stat-sep" />
                  <div className="crd-vault-stat">
                    <strong>0€</strong>
                    <span>Pour y accéder</span>
                  </div>
                </div>

                <Link href="/rendez-vous" className="fin-btn-on-dark" style={{ width: '100%', justifyContent: 'center' }}>
                  📅 Obtenir ma sélection personnalisée →
                </Link>
                <p className="crd-vault-note">
                  Gratuit · Sans engagement · Réponse sous 24h
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── ACCOMPAGNEMENT (Avec image contextuelle) ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mon accompagnement</span>
              <h2>Ce que je fais concrètement<br />pour vous, de A à Z</h2>
              <p>
                De votre premier échange à la confirmation de votre investissement —
                voici comment je travaille, pas à pas.
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
                  src="/images/dossier-courtage.webp"
                  alt="Dossier de courtage Orizia parfaitement organisé"
                  title="Un accompagnement transparent de A à Z"
                  width={863}
                  height={1080}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="crowd-cta-band" style={{ marginTop: 48 }}>
              <div>
                <strong>Un accompagnement complet, 100% gratuit pour vous</strong>
                <p>
                  Je suis rémunérée par les plateformes partenaires — jamais par vous.
                  Cette indépendance est ma garantie de travailler uniquement dans votre intérêt.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-on-dark">
                📅 Démarrer gratuitement →
              </Link>
            </div>
          </div>
        </section>

        {/* ── CHECKLIST ── */}
        <section id="section-autoevaluation" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Auto-évaluation</span>
              <h2>Suis-je prêt à investir<br />dans le crowdfunding ?</h2>
              <p>Cochez les critères qui correspondent à votre situation pour obtenir une recommandation personnalisée.</p>
            </div>
            <InvestisseurChecklist />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions sur le crowdfunding,<br />mes réponses directes</h2>
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
                Vous avez une question spécifique à votre situation ? Je vous réponds sous 24h.
              </p>
              <Link href="/contact" className="fin-btn-secondary">
                ✉️ Poser une autre question à Cindy
              </Link>
            </div>
          </div>
        </section>

        {/* ── MAILLAGE INTERNE ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Aller plus loin</span>
              <h2>Complétez votre stratégie patrimoniale</h2>
              <p>
                Le crowdfunding est un outil parmi d'autres. Une stratégie équilibrée
                combine plusieurs placements complémentaires — je vous aide à trouver
                le bon dosage.
              </p>
            </div>
            <div className="fin-cards fin-cards--light">
              {[
                {
                  href: '/investir/scpi',
                  icon: '🏢',
                  title: 'SCPI',
                  sub: 'Immobilier de rendement',
                  text: '4–6%/an, risque mutualisé sur des centaines d\'actifs, zéro gestion. Le placement immobilier préféré des Français pour sécuriser le socle.',
                  ribbon: '🏢 Socle patrimonial',
                  ribbonColor: 'var(--orizia-accent)',
                  pillBg: 'rgba(26,61,53,0.08)',
                  pillColor: 'var(--orizia-accent)',
                  pillBorder: 'rgba(26,61,53,0.15)',
                },
                {
                  href: '/investir/assurance-vie',
                  icon: '🛡️',
                  title: 'Assurance Vie',
                  sub: 'Épargne & transmission',
                  text: 'L\'enveloppe fiscale la plus avantageuse après 8 ans. Idéale en complément du crowdfunding pour sécuriser une partie de votre épargne disponible.',
                  ribbon: '✅ Fiscalité optimisée',
                  ribbonColor: 'var(--orizia-primary)',
                  pillBg: 'rgba(201,169,110,0.12)',
                  pillColor: 'var(--orizia-gold)',
                  pillBorder: 'rgba(201,169,110,0.3)',
                },
                {
                  href: '/investir/per',
                  icon: '🏦',
                  title: 'PER',
                  sub: 'Préparez votre retraite',
                  text: 'Réduisez vos impôts cette année et constituez un capital retraite. Un avantage fiscal immédiat qui se voit dès votre prochaine déclaration.',
                  ribbon: '🔗 Avantage fiscal immédiat',
                  ribbonColor: '#7c3aed',
                  pillBg: 'rgba(124,58,237,0.08)',
                  pillColor: '#7c3aed',
                  pillBorder: 'rgba(124,58,237,0.2)',
                },
              ].map(s => (
                <Link key={s.title} href={s.href} className="fin-card">
                  {s.ribbon && (
                    <span className="fin-card-pill" style={{
                      background: `${s.pillBg}`,
                      color: s.pillColor,
                      border: `1px solid ${s.pillBorder}`,
                    }}>
                      {s.ribbon}
                    </span>
                  )}
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
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-light)' }}>
          <div className="fin-cta-inner">
            <h2>Prêt à investir<br />intelligemment ?</h2>
            <p>
              30 minutes avec moi suffisent pour définir votre stratégie, identifier
              les projets adaptés à votre profil et éviter les pièges les plus courants.
              Pas de discours commercial — juste une analyse honnête.
            </p>
            <div className="ae-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Prendre rendez-vous avec Cindy →
              </Link>
              <Link href="/contact" className="fin-btn-secondary">
                Poser une question
              </Link>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 520, margin: '24px auto 0' }}>
              Investir comporte des risques de perte en capital. Les performances passées ne
              préjugent pas des performances futures. Orizia Courtage, courtière indépendante
              immatriculée ORIAS — rémunérée par les plateformes partenaires, jamais par le client.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}