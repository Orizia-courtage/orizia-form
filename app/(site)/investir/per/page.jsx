import Link from 'next/link';
import Image from 'next/image';
import PERCalculateur from '@/components/PERCalculateur';
import PERDefinition from '@/components/PERDefinition';
import PERvsAV from '@/components/PERvsAV';
import PERRisqueJauge from '@/components/PERRisqueJauge';
import PERProfilSelector from '@/components/PERProfilSelector';
import PERChecklist from '@/components/PERChecklist';
import ReadingProgressPER from '@/components/ReadingProgressPER';
import ContactPopup from '@/components/ContactPopup';

// ── 1. MÉTADONNÉES SEO (Optimisées) ──
export const metadata = {
  title: 'PER 2026 : Réduire ses Impôts & Préparer sa Retraite | Orizia Courtage',
  description:
    'Je calcule vos plafonds de déduction exacts et sélectionne le meilleur PER : 0% de frais, jusqu\'à 4 100€ récupérés sur l\'impôt pour 10 000€ versés. Cindy Urbansky.',
  alternates: { canonical: 'https://orizia-courtage.fr/investir/per' },
  openGraph: {
    title: 'PER 2026 : Réduire ses Impôts & Préparer sa Retraite | Orizia Courtage',
    description: 'Réduisez votre impôt dès cette année. Je calcule vos plafonds exacts, sélectionne le meilleur PER du marché et construis l\'allocation adaptée à votre horizon.',
    url: 'https://orizia-courtage.fr/investir/per',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/og-per.jpg',
        width: 1200,
        height: 630,
        alt: 'Plan Épargne Retraite avec Orizia Courtage - Cindy Urbansky',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES (E-E-A-T, GEO & Service) ──
const investirPerSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    // 1. Fil d'Ariane
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Investir', item: 'https://orizia-courtage.fr/investir' },
        { '@type': 'ListItem', position: 3, name: 'Plan Épargne Retraite (PER)', item: 'https://orizia-courtage.fr/investir/per' }
      ]
    },
    // 2. L'Organisation (Agence) pour l'E-E-A-T
    {
      '@type': 'InsuranceAgency',
      '@id': 'https://orizia-courtage.fr/#organization',
      name: 'Orizia Courtage',
      image: 'https://orizia-courtage.fr/images/Orizia_logo.webp',
      description: 'Cabinet de courtage indépendant spécialisé en épargne retraite (PER) et investissement financier dans les Hauts-de-France.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '23 boulevard Clemenceau',
        addressLocality: 'Marcq-en-Barœul',
        postalCode: '59700',
        addressRegion: 'Hauts-de-France',
        addressCountry: 'FR'
      }
    },
    // 3. Le Service spécifique
    {
      '@type': 'Service',
      name: 'Conseil et Courtage en Plan Épargne Retraite (PER)',
      serviceType: 'Conseil en Investissement Financier',
      provider: { '@id': 'https://orizia-courtage.fr/#organization' },
      description: 'Audit fiscal, calcul des plafonds de déduction, sélection du meilleur PER du marché (0% de frais) et construction de l\'allocation d\'actifs.',
      areaServed: [
        { '@type': 'State', name: 'Hauts-de-France' },
        { '@type': 'City', name: 'Lille' },
        { '@type': 'City', name: 'Marcq-en-Barœul' }
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'L\'audit initial et le conseil en sélection de PER sont gratuits pour le client (rémunération par l\'assureur partenaire).'
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
      name: 'Qu\'est-ce que le Plan Épargne Retraite (PER) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le PER est un produit d\'épargne retraite créé par la loi PACTE de 2019, qui remplace les anciens PERP, Madelin et PERCO. Son principal avantage : vos versements volontaires sont déductibles de votre revenu imposable, ce qui réduit directement votre impôt l\'année suivante. L\'épargne est en principe bloquée jusqu\'à la retraite, avec des exceptions (achat de résidence principale, invalidité, décès du conjoint…). À la retraite, vous sortez en capital, en rente viagère, ou en combinant les deux.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien puis-je déduire grâce au PER en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour un salarié, le plafond est de 10% des revenus professionnels nets N-1, dans la limite de 10% de 8 fois le PASS (soit environ 35 000€ en 2026). Pour un TNS, le plafond Madelin est bien plus élevé : 10% du bénéfice imposable + 15% sur la part entre 1 et 8 PASS, soit jusqu\'à environ 85 000€. Les plafonds non utilisés sont reportables sur 3 ans — vérifiez votre avis d\'imposition, rubrique « Plafond épargne retraite ».',
      },
    },
    {
      '@type': 'Question',
      name: 'Le PER bloque-t-il vraiment mon argent jusqu\'à la retraite ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En principe oui, mais des exceptions de déblocage anticipé existent sans pénalité : achat de la résidence principale, invalidité de 2ème ou 3ème catégorie, décès du conjoint ou partenaire de PACS, surendettement, expiration des droits au chômage, cessation d\'activité non salariée suite à liquidation judiciaire. Le déblocage pour résidence principale est le plus utilisé — votre PER peut servir d\'apport immobilier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vaut-il mieux sortir en capital ou en rente avec un PER ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La sortie en capital est généralement plus avantageuse pour les petits et moyens capitaux : les versements déduits sont imposés à l\'IR à la sortie, les gains au PFU 30%. La rente viagère garantit un revenu à vie — utile si votre espérance de vie est longue ou si vous avez peu d\'autres revenus à la retraite. Je vous aide à choisir selon votre TMI de retraite estimé lors du bilan annuel.',
      },
    },
    {
      '@type': 'Question',
      name: 'PER ou assurance vie : lequel choisir ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ce n\'est pas l\'un ou l\'autre — ils sont complémentaires. Le PER est optimal pour réduire votre impôt aujourd\'hui (TMI élevé, horizon retraite long). L\'assurance vie est idéale pour une épargne disponible à tout moment, avec fiscalité avantageuse après 8 ans et transmission optimisée. La stratégie optimale combine les deux : PER pour l\'économie fiscale immédiate, AV pour la liquidité et la transmission.',
      },
    },
    {
      '@type': 'Question',
      name: 'Le PER est-il intéressant pour un travailleur indépendant ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'C\'est l\'un des placements les plus efficaces pour un TNS. Le plafond Madelin est bien plus élevé que celui des salariés. Un TNS à 41% de TMI qui verse 10 000€ sur son PER récupère 4 100€ d\'impôt en moins dès l\'année suivante — un rendement fiscal garanti. Comme les revenus d\'un indépendant sont variables, vous pouvez aussi moduler vos versements selon votre bénéfice annuel.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi ouvrir un PER via un courtier plutôt qu\'en banque ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les PER bancaires appliquent souvent 2 à 4% de frais sur versements et des frais de gestion élevés qui grignotent la performance sur 20 ans. En tant que courtière indépendante, j\'accède à des contrats haut de gamme avec 0% de frais sur versements, une large gamme d\'UC (ETF, SCPI, fonds actions) et un suivi personnalisé de l\'allocation selon votre horizon de retraite.',
      },
    },
  ],
};

const CHIFFRES = [
  { value: '👔\u00A0~35\u00A0000€', label: 'Plafond déduction salarié 2026', icon: '' },
  { value: '⚙️\u00A0~85\u00A0000€', label: 'Plafond Madelin TNS 2026', icon: '' },
  { value: '⏳\u00A03 ans', label: 'Report des plafonds non utilisés', icon: '' },
  { value: '✨\u00A00€', label: 'Frais sur versements via Orizia', icon: '' },
];

const DANGERS = [
  {
    icon: '🏦',
    title: 'Votre banque vous vend son PER — pas le meilleur du marché',
    text: 'Avec 2 à 4% de frais sur versements et des fonds limités aux gammes maison, un PER bancaire sur 25 ans peut vous coûter plusieurs dizaines de milliers d\'euros de performance nette. La déduction fiscale attire l\'œil — mais les frais la rongent discrètement, année après année.',
  },
  {
    icon: '📊',
    title: 'Plafonds non utilisés : des milliers d\'euros de déduction oubliés',
    text: 'Les plafonds non utilisés sont reportables sur 3 ans. La grande majorité des épargnants l\'ignorent et laissent filer des milliers d\'euros de déduction. Un audit de votre situation fiscale révèle presque toujours des capacités inexploitées — parfois considerables.',
  },
  {
    icon: '⏳',
    title: 'Chaque année sans PER est une erreur fiscale qui se paie cash',
    text: '10 000€ investis à 35 ans valent le double à 60 ans à 5%/an. Et les impôts économisés chaque année — réinvestis eux aussi — multiplient encore l\'effet. Attendre coûte réellement de l\'argent, chaque année.',
  },
];

const AVANTAGES = [
  {
    icon: '💰',
    title: 'Réduction d\'impôt immédiate et garantie',
    text: 'Chaque euro versé réduit votre revenu imposable. À 41% de TMI, 10 000€ versés = 4 100€ d\'impôt récupérés l\'année suivante. C\'est le seul placement avec un rendement fiscal garanti dès jour 1.',
  },
  {
    icon: '🏠',
    title: 'Déblocage anticipé pour votre résidence principale',
    text: 'Votre PER n\'est pas une prison. L\'achat de votre résidence principale permet un déblocage total ou partiel sans pénalité. Vous préparez votre retraite ET votre projet immobilier dans la même enveloppe.',
  },
  {
    icon: '📈',
    title: 'Performance maximale sur le long terme',
    text: 'Investi sur des UC (ETF monde, fonds actions, SCPI…) sur 20–30 ans, votre PER peut viser 4–7%/an. Combiné à l\'avantage fiscal initial, c\'est le placement retraite le plus puissant disponible en France.',
  },
  {
    icon: '🔄',
    title: 'Sortie flexible à la retraite',
    text: 'Capital en une fois ou progressivement, rente viagère, ou combinaison des deux. Vous choisissez à la retraite selon votre situation réelle — pas aujourd\'hui selon une hypothèse.',
  },
  {
    icon: '⚙️',
    title: 'Plafonds exceptionnels pour les TNS',
    text: 'Les travailleurs indépendants bénéficient du plafond Madelin : jusqu\'à 85 000€ déductibles par an. Un levier fiscal sans équivalent pour optimiser les années à hauts revenus.',
  },
  {
    icon: '🎁',
    title: 'Transmission avantageuse au décès',
    text: 'En cas de décès avant la retraite, le capital est transmis aux bénéficiaires avec la même fiscalité qu\'une assurance vie — exonération jusqu\'à 152 500€ par bénéficiaire pour les versements avant 70 ans.',
  },
];

const PROFILS = [
  {
    icon: '👔',
    title: 'Salarié cadre',
    tmi: '30% ou 41%',
    gain: '3 000–4 100€ d\'impôt en moins',
    base: 'pour 10 000€ versés',
    conseil: 'Versements réguliers mensuels + rattrapage des plafonds N-3',
    color: 'var(--orizia-primary)',
    featured: false,
  },
  {
    icon: '⚙️',
    title: 'Travailleur indépendant / TNS',
    tmi: '41% ou 45%',
    gain: 'Jusqu\'à 38 250€ d\'impôt en moins',
    base: 'avec plafond Madelin complet',
    conseil: 'Versements modulables selon le bénéfice — idéal les bonnes années',
    color: '#d97706',
    featured: true,
  },
  {
    icon: '🏢',
    title: 'Dirigeant de société',
    tmi: '41% ou 45%',
    gain: 'Déduction IS + IR possible',
    base: 'selon la structure de rémunération',
    conseil: 'Combinaison PER individuel + contrat Madelin via la société selon statut',
    color: '#7c3aed',
    featured: false,
  },
];

const RISQUES = [
  {
    niveau: 'Moyen', color: '#d97706', bg: '#fffbeb', border: '#fed7aa', icon: '🟠',
    title: 'Blocage jusqu\'à la retraite',
    text: 'Sauf exceptions légales, votre épargne est immobilisée. Le PER n\'est pas un placement de liquidité — il faut disposer d\'une épargne de précaution accessible par ailleurs.',
    mitigation: 'Mon rôle : dimensionner le PER en complément d\'une AV liquide, jamais à la place.',
  },
  {
    niveau: 'Moyen', color: '#d97706', bg: '#fffbeb', border: '#fed7aa', icon: '🟠',
    title: 'Perte en capital sur unités de compte',
    text: 'Les UC suivent les marchés financiers et peuvent baisser à court terme. Sur 20–30 ans, les données historiques montrent des performances positives significatives pour les profils bien diversifiés.',
    mitigation: 'Mon rôle : utiliser la gestion pilotée — exposition UC forte jeune, sécurisation progressive à l\'approche de la retraite.',
  },
  {
    niveau: 'Faible', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '🟢',
    title: 'Imposition à la sortie',
    text: 'Les sommes déduites à l\'entrée sont imposées à l\'IR à la sortie. Si votre TMI de retraite est identique à celui d\'aujourd\'hui, le gain est limité. Dans la majorité des cas, le TMI baisse significativement à la retraite.',
    mitigation: 'Mon rôle : estimer votre TMI de retraite avant de valider la stratégie PER — le calcul se fait en 10 minutes.',
  },
  {
    niveau: 'Faible', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '🟢',
    title: 'Risque législatif',
    text: 'La fiscalité du PER dépend de la loi. Ce risque existe pour tout placement fiscal. La déduction à l\'entrée est acquise l\'année du versement — seule la fiscalité de sortie pourrait évoluer.',
    mitigation: 'Mon rôle : vous tenir informé des évolutions réglementaires et adapter la stratégie si nécessaire lors du bilan annuel.',
  },
];

const ETAPES = [
  {
    n: '01',
    title: 'J\'audite votre situation fiscale',
    text: 'TMI, revenus, plafonds disponibles N / N-1 / N-2 / N-3 — je calcule exactement combien vous pouvez déduire cette année et ce que ça représente en économie d\'impôt concrète, en euros.',
  },
  {
    n: '02',
    title: 'Je sélectionne le contrat optimal',
    text: 'Parmi mes contrats partenaires (Abeille Épargne Active, Cardif Elite, Celebéa Vie, SwissLife Strategic Premium, SwissLife Vie Génération) — 0% de frais sur versements, large gamme d\'UC.',
  },
  {
    n: '03',
    title: 'Je construis votre allocation',
    text: 'Gestion pilotée ou libre, ETF, SCPI, fonds actions — je construis une allocation adaptée à votre horizon retraite, avec sécurisation progressive automatique à l\'approche de l\'échéance.',
  },
  {
    n: '04',
    title: 'J\'anticipe votre stratégie de sortie',
    text: 'Je n\'attends pas la retraite pour y penser : j\'anticipe les cas de déblocage (résidence principale, période difficile) et j\'articule votre PER avec votre assurance vie pour une liquidité optimale.',
  },
];

const OBJECTIONS = [
  {
    q: '« Je suis encore jeune, j\'ai le temps. »',
    r: '10 000€ versés à 30 ans valent environ 43 000€ à 60 ans à 5%/an. Les mêmes 10 000€ à 50 ans : 16 000€. Plus tôt vous commencez, moins vous avez besoin de verser pour atteindre le même capital. Et chaque année d\'attente, c\'est aussi une déduction fiscale ratée.',
  },
  {
    q: '« Mon employeur me propose déjà un PERCO. »',
    r: 'Le PERCO de votre entreprise et un PER individuel sont cumulables. Profitez de l\'abondement employeur sur le PERCO (c\'est de l\'argent gratuit) ET ouvrez un PER individuel pour les versements volontaires qui bénéficieront de votre plafond personnel.',
  },
  {
    q: '« J\'ai peur que mon argent soit bloqué. »',
    r: 'Le déblocage pour achat de résidence principale change la donne : votre PER peut servir d\'apport immobilier. Et pour le reste : c\'est précisément parce que l\'argent est bloqué que l\'État vous offre la déduction. C\'est le deal — et il est très avantageux.',
  },
  {
    q: '« Je ne sais pas si je serai imposable à la retraite. »',
    r: 'C\'est exactement le calcul qu\'on fait ensemble. Si votre TMI baisse à la retraite — ce qui est le cas pour environ 80% des épargnants — le PER est rentable. Sinon, je vous oriente vers l\'assurance vie. Il n\'y a pas de réponse universelle : il y a votre réponse.',
  },
];

const FISCAL_EXEMPLES = [
  { tmi: '11%', versement: 5000, gain: 550, profil: 'Salarié modeste' },
  { tmi: '30%', versement: 8000, gain: 2400, profil: 'Cadre' },
  { tmi: '41%', versement: 10000, gain: 4100, profil: 'Cadre supérieur / TNS' },
  { tmi: '45%', versement: 15000, gain: 6750, profil: 'Dirigeant / TNS élevé' },
];

export default function PERPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(investirPerSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>

        <ReadingProgressPER />

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
              <span>Plan Épargne Retraite</span>
            </nav>
            <span className="fin-badge">🏦 Réduire ses impôts tout en préparant sa retraite</span>
            <h1>PER : payez moins d'impôts<br />dès cette année</h1>
            <p>
              Le Plan Épargne Retraite vous permet de{' '}
              <strong>déduire vos versements de votre revenu imposable</strong> — jusqu'à{' '}
              <strong>4 100€ récupérés sur l'impôt</strong> pour 10 000€ versés à 41% de TMI.
              Je calcule vos plafonds exacts, sélectionne le meilleur contrat et construis
              votre allocation. <strong>Gratuitement.</strong>
            </p>
            <div className="ae-hero-btns fin-hero-btns">
              <ContactPopup label="📅 Calculer mon gain fiscal" className="fin-btn-primary"/>
              <Link href="#section-fiscalite" className="fin-btn-secondary">
                🧮 Voir les exemples chiffrés
              </Link>
            </div>
            <div className="ae-hero-trust fin-hero-trust">
              <span>✅ 0% de frais sur versements</span>
              <span>📋 Plafonds calculés sur-mesure</span>
              <span>⚡ Réponse sous 24h</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS (Dynamique avec icônes) ── */}
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
                  alt="Cindy Urbansky, courtière experte en Plan Épargne Retraite"
                  title="Cindy Urbansky - Orizia Courtage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  sizes="(max-width: 768px) 150px, 180px"
                  priority
                />
              </div>
              <div className="ae-citation-content">
                <p className="ae-citation-quote">
                  « Le PER est l'outil fiscal le plus puissant disponible en France
                  — et le plus mal utilisé.
                </p>
                <p className="ae-citation-text">
                  La plupart de mes clients arrivent avec des plafonds non utilisés
                  depuis 3 ans, un contrat bancaire chargé en frais, et aucune idée
                  du montant qu'ils auraient pu récupérer sur leur impôt. Ce
                  rendez-vous, c'est souvent une révélation. »
                </p>
                <span className="ae-citation-author">
                  — Cindy Urbansky, courtière indépendante · Orizia Courtage
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── ERREURS COURANTES (Avec image) ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Les erreurs coûteuses à éviter
              </span>
              <h2>Pourquoi la plupart des épargnants<br />ratent leur PER</h2>
              <p>
                Le PER est l'outil fiscal le plus puissant disponible — mais il est souvent
                mal utilisé, mal dimensionné, ou souscrit dans le mauvais contrat.
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
              
              <div className="ae-probleme-image">
                <Image 
                  src="/images/banque-pression.webp" 
                  alt="Pression bancaire et complexité fiscale pour le PER"
                  width={716}
                  height={1024}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--orizia-accent)', marginBottom: 12 }}>
                Je calcule vos plafonds exacts et sélectionne le meilleur contrat avec 0% de frais.
              </p>
              <p style={{ fontSize: '1rem', opacity: 0.7, marginBottom: 24, maxWidth: 640, margin: '0 auto 24px' }}>
                Je récupère aussi vos plafonds non utilisés des 3 dernières années —
                souvent plusieurs milliers d'euros de déduction oubliés.
              </p>
              <ContactPopup label="📅 Calculer mes plafonds gratuitement" className="fin-btn-primary"/>
            </div>
          </div>
        </section>

        {/* ── DÉFINITION ── */}
        <section id="section-definition" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Définition</span>
              <h2>Le PER en clair :<br />comment ça fonctionne vraiment</h2>
              <p>
                Créé par la loi PACTE en 2019, le PER remplace les anciens PERP, Madelin et PERCO.
                Chaque euro versé réduit directement votre impôt l'année suivante.
              </p>
            </div>
            <PERDefinition />
          </div>
        </section>

        {/* ── AVANTAGES ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Les atouts</span>
              <h2>6 raisons pour lesquelles<br />le PER est incontournable</h2>
              <p>
                Le PER est le seul placement qui vous fait gagner de l'argent{' '}
                <em>dès la première année</em> grâce à la déduction fiscale — en plus
                de préparer votre retraite sur le long terme.
              </p>
            </div>
            <div className="crowd-avantages-grid">
              {AVANTAGES.map(a => (
                <div
                  key={a.title}
                  className="crowd-avantage-card"
                  style={
                    a.title === 'Réduction d\'impôt immédiate et garantie' || a.title === 'Plafonds exceptionnels pour les TNS'
                      ? { borderTop: '3px solid var(--orizia-gold)', background: 'rgba(201,169,110,0.04)' }
                      : {}
                  }
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <h3 style={{ margin: 0 }}>{a.title}</h3>
                    <span style={{ fontSize: '1.6rem', flexShrink: 0, marginLeft: 10 }}>{a.icon}</span>
                  </div>
                  {(a.title === 'Réduction d\'impôt immédiate et garantie' || a.title === 'Plafonds exceptionnels pour les TNS') && (
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

        {/* ── CALCULATEUR FISCAL PER ── */}
        <section id="section-fiscalite" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Calculateur fiscal 2026</span>
              <h2>Combien allez-vous<br />récupérer sur votre impôt ?</h2>
              <p>
                Sélectionnez votre TMI et ajustez votre versement pour voir votre économie en temps réel.
              </p>
            </div>
            <PERCalculateur />

            {/* Exemples fiscaux de référence */}
            <div className="per-fiscal-exemples">
              <div className="per-fiscal-exemples-title">📊 Exemples de référence 2026</div>
              <div className="per-fiscal-exemples-grid">
                {FISCAL_EXEMPLES.map(ex => (
                  <div key={ex.tmi} className="per-fiscal-ex">
                    <div className="per-fiscal-ex-profil">{ex.profil}</div>
                    <div className="per-fiscal-ex-tmi">TMI {ex.tmi}</div>
                    <div className="per-fiscal-ex-versement">
                      {ex.versement.toLocaleString('fr-FR')}€ versés
                    </div>
                    <div className="per-fiscal-ex-gain">
                      -{ex.gain.toLocaleString('fr-FR')}€ d'impôt
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="per-plafonds-bloc">
              <div className="per-plafonds-header">
                <span>📋</span>
                <h3>Plafonds de déduction 2026 — ce que vous pouvez vraiment déduire</h3>
              </div>
              <div className="per-plafonds-grid">
                <div className="per-plafond-item">
                  <strong>Salarié</strong>
                  <span>10% des revenus nets N-1</span>
                  <div className="per-plafond-max">Max. ~35 000€/an</div>
                </div>
                <div className="per-plafond-item">
                  <strong>TNS / Indépendant</strong>
                  <span>Plafond Madelin : 10% du bénéfice + 15% sur 1–8 PASS</span>
                  <div className="per-plafond-max">Max. ~85 000€/an</div>
                </div>
                <div className="per-plafond-item">
                  <strong>Plafonds reportés</strong>
                  <span>Non-utilisation des 3 dernières années cumulable</span>
                  <div className="per-plafond-max">Report N-1, N-2, N-3</div>
                </div>
                <div className="per-plafond-item">
                  <strong>Couple</strong>
                  <span>Chaque conjoint dispose de son propre plafond, cumulable si déclaration commune</span>
                  <div className="per-plafond-max">Jusqu'à ×2 du plafond individuel</div>
                </div>
              </div>
              <div className="crowd-risques-note" style={{ marginTop: 20 }}>
                💡 <strong>Où trouver vos plafonds :</strong> votre avis d'imposition, rubrique{' '}
                <em>« Plafond épargne retraite »</em>. Je les calcule et les optimise
                lors du premier rendez-vous — avec les reports des 3 années précédentes.
              </div>
            </div>

            <div className="crowd-cta-band" style={{ marginTop: 36 }}>
              <div>
                <strong>Votre gain fiscal exact calculé en 30 minutes.</strong>
                <p>
                  Apportez votre dernier avis d'imposition — je calcule vos plafonds
                  disponibles, votre économie d'impôt et le montant optimal à verser
                  vis-à-vis de votre TMI.
                </p>
              </div>
              <ContactPopup label="📅 Calculer mon gain" className="fin-btn-on-dark"/>
              
            </div>
          </div>
        </section>

        {/* ── PROFILS ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Votre situation</span>
              <h2>Le PER s'adapte<br />à votre statut professionnel</h2>
              <p>
                Salarié, indépendant ou dirigeant — les plafonds et la stratégie optimale
                ne sont pas les mêmes. Sélectionnez votre profil pour voir ce que ça
                représente concrètement.
              </p>
            </div>
            <PERProfilSelector />
          </div>
        </section>

        {/* ── PER VS AV ── */}
        <section id="section-comparaison" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Comparaison</span>
              <h2>PER ou assurance vie :<br />ce n'est pas l'un ou l'autre</h2>
              <p>
                Les deux enveloppes sont complémentaires. Sélectionnez votre objectif principal
                pour voir la recommandation adaptée à votre situation.
              </p>
            </div>
            <PERvsAV />
          </div>
        </section>

        {/* ── RISQUES ── */}
        <section id="section-risques" className="crowd-section" style={{ background: '#fafafa' }}>
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Analyse des risques
              </span>
              <h2>Les risques réels,<br />sans langue de bois</h2>
              <p>
                Le PER est un outil puissant — mais il comporte des contraintes spécifiques
                qu'il faut connaître avant d'y verser. Voici mon analyse transparente,
                et comment je les adresse concrètement.
              </p>
            </div>
            <PERRisqueJauge />
          </div>
        </section>

        {/* ── ACCOMPAGNEMENT (Avec image) ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mon accompagnement</span>
              <h2>Ce que je fais concrètement<br />pour vous, de A à Z</h2>
              <p>
                Du calcul de vos plafonds à la construction de l'allocation, en passant
                par la stratégie de sortie et le suivi annuel — sans délégation,
                sans intermédiaire.
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
                  src="/images/dossier_per.webp" 
                  alt="Cindy Urbansky gérant le dossier de courtage PER"
                  title="Accompagnement Orizia Courtage de A à Z"
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
                  Je suis rémunérée par l'assureur partenaire sous forme de commission
                  de distribution, encadrée par la réglementation DDA et communiquée
                  de façon transparente. Vous ne payez rien de plus qu'en souscrivant
                  directement — mais vous bénéficiez d'un audit fiscal personnalisé,
                  d'un conseil expert et d'un accès à des contrats haut de gamme.
                </p>
              </div>
              <ContactPopup label="📅 Démarrer" className="fin-btn-primary" style={{ flexShrink: 0 }}/>
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
            <div className="crowd-faq-list">
              {OBJECTIONS.map((o, i) => (
                <details key={i} className="crowd-faq-item">
                  <summary>{o.q}</summary>
                  <p>{o.r}</p>
                </details>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Une situation particulière ? Je vous réponds personnellement sous 24h.
              </p>
              <div className="ae-hero-btns" style={{ justifyContent: 'center' }}>
                <ContactPopup label="📅 Prendre rendez-vous" className="fin-btn-primary"/>
                  
                <ContactPopup label="✉️ Poser une question" className="fin-btn-secondary"/>
              </div>
            </div>
          </div>
        </section>

        {/* ── AUTO-ÉVALUATION ── */}
        <section id="section-autoevaluation" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <PERChecklist />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions sur le PER,<br />mes réponses directes</h2>
              <p>Sans jargon. Sans langue de bois. Les vraies réponses.</p>
            </div>
            <div className="crowd-faq-list">
              {faqSchema.mainEntity.map((f, i) => (
                <details key={i} className="crowd-faq-item" style={{ borderColor: 'var(--orizia-gold)' }}>
                  <summary>{f.name}</summary>
                  <p>{f.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Vous avez une question spécifique à votre situation ? Je vous réponds sous 24h.
              </p>
              <ContactPopup label="✉️ Poser une autre question à Cindy" className="fin-btn-secondary"/>
                
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
                Le PER est la base fiscale — mais une stratégie patrimoniale solide
                combine plusieurs placements complémentaires. Je construis cette vision
                globale avec vous dès le premier rendez-vous.
              </p>
            </div>
            <div className="fin-cards">
              {[
                {
                  href: '/investir/assurance-vie',
                  icon: '🛡️',
                  title: 'Assurance Vie',
                  sub: 'Épargne disponible & transmission',
                  text: 'Le complément naturel du PER : épargne liquide à tout moment, fiscalité avantageuse après 8 ans et transmission hors succession jusqu\'à 152 500€ par bénéficiaire.',
                  badge: '✅ Fiscalité optimisée après 8 ans',
                  pillBg: 'rgba(201,169,110,0.12)',
                  pillColor: 'var(--orizia-gold)',
                  pillBorder: 'rgba(201,169,110,0.3)',
                  featured: true,
                },
                {
                  href: '/investir/scpi',
                  icon: '🏢',
                  title: 'SCPI',
                  sub: 'Immobilier de rendement',
                  text: '4–6%/an, zéro gestion. Logeable dans votre PER ou votre AV pour combiner rendement immobilier et fiscalité optimisée dans une seule enveloppe.',
                  badge: '🏢 4–6%/an sans gestion',
                  pillBg: 'rgba(45,106,95,0.1)',
                  pillColor: 'var(--orizia-primary)',
                  pillBorder: 'rgba(45,106,95,0.25)',
                  featured: false,
                },
                {
                  href: '/investir/crowdfunding',
                  icon: '📈',
                  title: 'Crowdfunding immobilier',
                  sub: 'Financement participatif',
                  text: '8–12%/an sur 12–36 mois. Le complément dynamique idéal pour les capitaux non immobilisés dans le PER — rendement élevé à court terme.',
                  badge: '📈 8–12%/an sur 12–36 mois',
                  pillBg: 'rgba(3,105,161,0.08)',
                  pillColor: '#0369a1',
                  pillBorder: 'rgba(3,105,161,0.2)',
                  featured: false,
                },
              ].map(s => (
                <Link key={s.title} href={s.href} className={`fin-card${s.featured ? ' fin-card--featured' : ''}`}>
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
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-white  )' }}>
          <div className="fin-cta-inner">
            <h2>Récupérez vos impôts<br />dès cette année</h2>
            <p>
              Je calcule vos plafonds de déduction exacts, sélectionne le meilleur
              contrat PER du marché et vous accompagne de la souscription au suivi annuel.
              0% de frais sur versements. 100% gratuit pour vous.
            </p>
            <div className="ae-hero-btns fin-hero-btns">
              <ContactPopup label="📅 Calculer mon gain fiscal avec Cindy" className="fin-btn-primary"/>
              <ContactPopup label="Poser une question" className="fin-btn-secondary"/>
            </div>
            <p style={{
              marginTop: 24, fontSize: '0.75rem', opacity: 0.55,
              maxWidth: 540, margin: '24px auto 0',
            }}>
              Le PER comporte un risque de perte en capital sur les unités de compte.
              Les performances passées ne préjugent pas des performances futures.
              L'avantage fiscal dépend de votre situation personnelle et est susceptible d'évoluer.
              Je suis immatriculée à l'ORIAS, régie par l'ACPR —
              rémunérée par les assureurs partenaires, jamais par vous.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}