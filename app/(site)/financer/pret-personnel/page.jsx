import Link from 'next/link';
import Image from 'next/image';
import ContactPopup from '@/components/ContactPopup';
import ReadingProgressPretPersonnel from '@/components/ReadingProgressPretPersonnel';
import PretProjetSelector from '@/components/PretProjetSelector';
import PretPersonnelChecklist from '@/components/PretPersonnelChecklist';
import ScrollButton from '@/components/ScrollButton';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Prêt Personnel 2026 : Comparez les taux | Orizia Courtage',
  description:
    'Ne financez plus les marges des banques. Cindy Urbansky compare et négocie votre prêt personnel au meilleur TAEG dans les Hauts-de-France. Étude de faisabilité.',
  alternates: { canonical: 'https://www.orizia-courtage.fr/financer/pret-personnel' },
  openGraph: {
    title: 'Prêt Personnel 2026 : Comparez les taux | Orizia Courtage',
    description: 'Auto, travaux ou trésorerie : obtenez les fonds nécessaires à vos projets sans vous ruiner. Je négocie votre crédit au meilleur TAEG dans les Hauts-de-France.',
    url: 'https://www.orizia-courtage.fr/financer/pret-personnel',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://www.orizia-courtage.fr/images/og-pret-personnel.jpg',
        width: 1200,
        height: 630,
        alt: 'Prêt personnel avec Orizia Courtage - Cindy Urbansky',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES ──
const pretPersonnelSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Financer', item: 'https://www.orizia-courtage.fr/financer' },
        { '@type': 'ListItem', position: 3, name: 'Prêt Personnel', item: 'https://www.orizia-courtage.fr/financer/pret-personnel' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Courtage en Prêt Personnel et Crédit à la Consommation',
      serviceType: 'Courtage en Prêt Personnel',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        image: 'https://www.orizia-courtage.fr/images/Orizia_logo.webp',
      },
      description: 'Comparaison et négociation du meilleur TAEG pour vos projets auto, travaux ou trésorerie. Élimination des assurances facultatives imposées. Accès à un réseau de partenaires bancaires.',
      areaServed: [
        { '@type': 'State', name: 'Hauts-de-France' },
        { '@type': 'City', name: 'Lille' },
        { '@type': 'City', name: 'Marcq-en-Barœul' },
        { '@type': 'Country', name: 'France' },
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Étude et accompagnement sans frais de dossiers (rémunération par l\'organisme prêteur partenaire).',
      },
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu\'est-ce qu\'un prêt personnel ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'C\'est un crédit à la consommation qui vous permet d\'emprunter une somme d\'argent (généralement entre 1 000€ et 75 000€) pour financer un projet : achat d\'un véhicule, travaux, mariage, voyage, ou besoin de trésorerie. Contrairement au crédit affecté, le prêt personnel classique ne nécessite pas toujours de justifier l\'achat avec des factures.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence avec un crédit affecté ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le crédit affecté (comme un prêt auto en concession ou un prêt travaux sur devis) est lié à un achat précis. Si la vente est annulée, le crédit l\'est aussi. Le prêt personnel non affecté (trésorerie) vous laisse libre d\'utiliser les fonds comme vous le souhaitez, mais ses taux sont parfois légèrement plus élevés. J\'identifie avec vous la solution la plus économique.',
      },
    },
    {
      '@type': 'Question',
      name: 'L\'assurance est-elle obligatoire pour un prêt personnel ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Légalement, non ! Les banques et organismes de crédit essaient souvent de vous imposer leur assurance emprunteur (qui fait exploser le coût total du crédit). Sauf pour des montants très élevés ou des profils risqués, vous avez le droit de la refuser. Mon rôle est de vous éviter de payer cette surtaxe inutile.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu\'est-ce que le TAEG ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le Taux Annuel Effectif Global (TAEG) est le seul indicateur fiable pour comparer deux crédits. Il inclut le taux nominal, les frais de dossier et les éventuelles assurances obligatoires. C\'est ce chiffre que je négocie à la baisse pour vous.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi faire appel à un courtier pour un simple crédit conso ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Parce que les écarts de taux entre les organismes peuvent varier du simple au triple ! En passant par moi, vous évitez les "crédits revolving" toxiques, vous gagnez du temps (je consulte tous mes partenaires en une fois) et vous obtenez un prêt sur-mesure qui ne met pas votre budget quotidien dans le rouge.',
      },
    },
  ],
};

const CHIFFRES = [
  { value: 'Jusqu\'à\u00A075k€', label: 'Plafond légal d\'emprunt', icon: '💰' },
  { value: '1 à 7 ans', label: 'Durée de remboursement', icon: '⏳' },
  { value: '0€', label: 'De frais d\'étude Orizia', icon: '🤝' },
  { value: '24\u00A0à\u00A048h', label: 'Pour une réponse de principe', icon: '⚡' },
];


const DANGERS = [
  {
    icon: '🎣',
    title: 'Le piège des taux d\'appel sur internet',
    text: 'Vous voyez "À partir de 0,90%" en grand, mais en petits caractères, c\'est valable uniquement sur 12 mois pour 5 000€. Pour votre vrai projet sur 48 mois, le taux grimpe à 6% ou 7%. Je vous donne l\'heure juste, sans fausses promesses.',
  },
  {
    icon: '🛡️',
    title: 'L\'assurance facultative (qui vous est imposée)',
    text: 'Sur un prêt personnel, l\'assurance décès/invalidité n\'est quasiment jamais obligatoire. Pourtant, les organismes la cochent par défaut, gonflant votre mensualité de 10 à 20€. Je veille à supprimer ces frais superflus.',
  },
  {
    icon: '🔄',
    title: 'Le crédit renouvelable toxique',
    text: 'Certaines enseignes transforment habilement votre demande de prêt en "crédit renouvelable" (réserve d\'argent) avec des taux frôlant l\'usure (jusqu\'à 21%). Avec moi, vous signez un prêt amortissable classique, clair, avec une date de fin précise.',
  },
];

const ETAPES = [
  {
    n: '01',
    title: 'Le point sur vos finances',
    text: 'On analyse ensemble vos revenus, vos charges (taux d\'endettement) et le montant dont vous avez réellement besoin. On ne s\'endette jamais à l\'aveugle.',
  },
  {
    n: '02',
    title: 'Je consulte mes partenaires',
    text: 'Je soumets votre dossier à mon réseau d\'organismes de crédit et de banques partenaires. J\'épluche les TAEG pour vous sortir l\'offre la moins chère.',
  },
  {
    n: '03',
    title: 'Vous choisissez, on valide',
    text: 'Je vous présente les offres retenues de manière transparente. Vous choisissez la durée et la mensualité avec lesquelles vous êtes le plus à l\'aise.',
  },
  {
    n: '04',
    title: 'Déblocage des fonds',
    text: 'Après signature et passé le délai légal de rétractation (jusqu\'à 14 jours, réductible à 8 jours), l\'argent arrive directement sur votre compte bancaire.',
  },
];

const OBJECTIONS = [
  {
    q: '« Je peux faire une simulation en 2 minutes sur internet, pourquoi passer par vous ? »',
    r: 'Les simulateurs internet captent vos données pour vous harceler, et le taux final proposé après étude du dossier est rarement le taux affiché au début. Moi, je vous obtiens de vrais accords de principe fermes, sans faire sonner votre téléphone toutes les heures.',
  },
  {
    q: '« Est-ce que vos services vont me coûter cher ? »',
    r: 'Zéro. Pour les prêts personnels, je suis rémunérée directement par l\'établissement bancaire partenaire chez qui nous signons le prêt. Mon accompagnement est sans frais de dossier pour vous.',
  },
  {
    q: '« J\'ai déjà plusieurs petits crédits en cours... »',
    r: 'Dans ce cas, faire un nouveau prêt est souvent une mauvaise idée. Je vous orienterai plutôt vers un "regroupement de crédits" : on rassemble toutes vos dettes en un seul prêt, pour faire baisser drastiquement votre mensualité globale.',
  },
  {
    q: '« Quel est le délai pour avoir l\'argent ? »',
    r: 'Il faut compter 24 à 48h pour un accord de principe. Une fois l\'offre signée, la loi impose un délai de rétractation. Concrètement, vous pouvez avoir les fonds sur votre compte en 8 à 14 jours selon les établissements.',
  },
];

export default function PretPersonnelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pretPersonnelSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        <ReadingProgressPretPersonnel />
        
        {/* ── HERO (Avec background) ── */}
        <section className="fin-hero ae-hero">
          <div className="ae-hero-bg">
            <Image
              src="/images/discret-hero-bg.webp"
              alt=""
              fill
              priority
              quality={75}
              sizes="100vw"
              className="hero-image"
              sizes="100vw"
            />
          </div>
          <div className="ae-hero-inner fin-hero-inner">
            <nav aria-label="breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: 16 }}>
              <Link href="/" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Accueil</Link>
              {' › '}
              <Link href="/financer" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Financer</Link>
              {' › '}
              <span>Prêt Personnel</span>
            </nav>
            <span className="fin-badge">💡 Auto, Travaux, Trésorerie</span>
            <h1 className="ae-hero-title">Financez vos projets,<br />pas les marges des banques</h1>
            <p className="ae-hero-intro">
              Souscrire un prêt personnel sur internet est devenu trop facile, et souvent <strong>trop cher</strong>.
              En tant que courtier indépendant, je compare les taux (TAEG), j'élimine les assurances inutiles
              et je vous trouve la mensualité qui <strong>respecte votre budget</strong>.
            </p>
            <div className="ae-hero-btns fin-hero-btns">
              <ContactPopup label="📅 Faire une simulation avec Cindy" className="fin-btn-primary" />
              <ScrollButton targetId="section-projets" className="fin-btn-secondary">
                🔍 Voir les types de prêts
              </ScrollButton>
            </div>
            <div className="ae-hero-trust fin-hero-trust">
              <span>✅ Accompagnement sans frais de dossier</span>
              <span>🛡️ Zéro crédit toxique (renouvelable)</span>
              <span>⚡ Réponse de principe sous 48h</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
        <section className="fin-chiffres">
          <div className="ae-chiffres-inner fin-chiffres-inner">
            {CHIFFRES.map(c => (
              <div key={c.label} className="fin-chiffre">
                <strong style={{ whiteSpace: 'nowrap' }}>{c.icon} {c.value}</strong>
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
                  alt="Cindy Urbansky, courtier indépendant en prêt personnel"
                  title="Cindy Urbansky - Orizia Courtage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  sizes="(max-width: 768px) 150px, 180px"
                  priority
                />
              </div>
              <div className="ae-citation-content">
                <p className="ae-citation-quote">
                  « Aujourd'hui, on peut souscrire un crédit en trois clics sur son smartphone. C'est rapide, oui. Mais c'est souvent hors de prix. »
                </p>
                <p className="ae-citation-text">
                  Mon approche est à l'opposé de cette consommation frénétique : on prend le temps de définir votre vrai besoin, j'élimine les assurances facultatives, et je vais chercher le taux qui respecte votre budget quotidien. Vous financez vos projets, pas les marges des banques.
                </p>
                <span className="ae-citation-author">
Cindy Urbansky, courtier indépendant et fondatrice de Orizia Courtage                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLÈME ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Ce que les publicités ne disent pas
              </span>
              <h2>Pourquoi souscrire seul<br />est le meilleur moyen de payer trop cher</h2>
              <p>
                Derrière les offres alléchantes des organismes de crédit se cachent souvent des pratiques qui font gonfler la note finale.
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
              <div className="ae-probleme-image">
                <Image
                  src="/images/banque-pression.webp"
                  alt="Pression des organismes de crédit lors d'une souscription de prêt personnel"
                  title="Les pièges des crédits à la consommation"
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
                Confiez-moi la recherche de votre financement.
              </p>
              <ContactPopup label="📅 Étudier ma capacité d'emprunt" className="fin-btn-primary" />
            </div>
          </div>
        </section>

        {/* ── TYPES DE PRÊTS ── */}
        <section id="section-projets" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">À chaque projet sa solution</span>
              <h2>On ne finance pas une voiture<br />comme on finance des travaux</h2>
              <p>
                Selon la nature de votre besoin, je vous oriente vers un crédit "affecté" (taux souvent plus bas) ou "non affecté" (plus de liberté).
              </p>
            </div>
            <PretProjetSelector />
          </div>
        </section>

        {/* ── FOCUS REGROUPEMENT ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge" style={{ background: 'rgba(124,58,237,0.1)', color: '#7c3aed' }}>
                  🔄 Cas particulier : Le regroupement de crédits
                </span>
                <h2>Vos mensualités<br />vous étouffent ?</h2>
                <p>
                  Prêt auto + crédit travaux + dettes renouvelables... Si l'accumulation de crédits pèse trop lourd sur votre reste à vivre chaque mois, souscrire un nouveau prêt est dangereux.
                </p>
                <p>
                  La solution s'appelle le <strong>regroupement (ou rachat) de crédits</strong>. 
                  Je m'occupe de fusionner toutes vos dettes actuelles en <strong>un seul prêt</strong>, 
                  avec <strong>une seule mensualité</strong>, souvent réduite de 30 à 50% (en allongeant la durée de remboursement).
                </p>
                <ContactPopup label="📅 Calculer mon nouveau reste à vivre" className="fin-btn-primary" style={{ display: 'inline-block', marginTop: 16 }} />
              </div>
              <div className="crowd-schema">
                <div style={{ textAlign: 'center', marginBottom: 16, fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--orizia-primary)' }}>
                  L'effet Regroupement
                </div>
                <div className="crowd-schema-step" style={{ background: 'rgba(220,38,38,0.08)', border: '1.5px solid rgba(220,38,38,0.2)' }}>
                  <div className="crowd-schema-icon">💳</div>
                  <strong>Avant : 3 crédits = 850€/mois</strong>
                  <span>Taux d'endettement dans le rouge</span>
                </div>
                <div className="crowd-schema-arrow">↓</div>
                <div className="crowd-schema-step crowd-schema-step--orizia">
                  <div className="crowd-schema-icon">🔄</div>
                  <strong>Intervention Orizia</strong>
                  <span>Négociation et rachat soldé</span>
                </div>
                <div className="crowd-schema-arrow">↓</div>
                <div className="crowd-schema-step" style={{ background: 'rgba(22,163,74,0.08)', border: '1.5px solid rgba(22,163,74,0.2)' }}>
                  <div className="crowd-schema-icon">✅</div>
                  <strong>Après : 1 crédit = 480€/mois</strong>
                  <span>Budget respirable (+ possibilité d'inclure une trésorerie)</span>
                </div>
                <div style={{ marginTop: 12, fontSize: '0.75rem', opacity: 0.6, textAlign: 'center' }}>
                  *L'allongement de la durée de remboursement entraîne une majoration du coût total du crédit.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ACCOMPAGNEMENT ── */}
        <section id="section-accompagnement" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Processus clair</span>
              <h2>Comment on travaille ensemble ?</h2>
              <p>
                Pas de démarches épuisantes. Vous me confiez vos documents, je m'occupe de trouver l'argent.
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
                  src="/images/dossier_pret_personnel.webp"
                  alt="Cindy Urbansky montant un dossier de prêt personnel"
                  title="Accompagnement de A à Z pour votre prêt personnel"
                  width={716}
                  height={1024}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="av-sans frais de dossier-bloc">
              <div className="av-sans frais de dossier-icon">🤝</div>
              <div>
                <strong>Un accompagnement expert, sans frais de dossier</strong>
                <p>
                  Pour les crédits à la consommation, je suis rémunérée directement par l'organisme prêteur sous forme de commission d'apporteur d'affaires. Mon travail de recherche et de négociation ne vous coûte absolument rien.
                </p>
              </div>
              <ContactPopup label="📅 Démarrer ma demande" className="fin-btn-primary" style={{ flexShrink: 0 }} />
            </div>
          </div>
        </section>

        {/* ── AUTO-ÉVALUATION ── */}
        <section id="section-autoevaluation" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <PretPersonnelChecklist />
          </div>
        </section>

        {/* ── OBJECTIONS ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Transparence</span>
              <h2>Les questions qu'on se pose<br />avant d'emprunter</h2>
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

        {/* ── FAQ ── */}
        <section id="section-faq" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions techniques,<br />mes réponses directes</h2>
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
              <ContactPopup label="✉️ Poser une autre question" className="fin-btn-secondary" />
            </div>
          </div>
        </section>

        {/* ── MAILLAGE INTERNE ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Vision Globale</span>
              <h2>Préparez l'avenir sereinement</h2>
            </div>
            <div className="fin-cards fin-cards--white">
              {[
                {
                  href: '/financer/credit-immobilier',
                  icon: '🏡',
                  title: 'Crédit Immobilier',
                  sub: 'Votre projet de vie',
                  text: 'Vous souhaitez acheter un bien immobilier ? La démarche est très différente d\'un prêt personnel. Je vous accompagne de A à Z.',
                  badge: '🏡 Votre prochain grand projet',
                  badgeBg: 'rgba(45,106,95,0.1)',
                  badgeColor: 'var(--orizia-primary)',
                  badgeBorder: '1px solid rgba(45,106,95,0.25)',
                  featured: true,
                },
                {
                  href: '/assurer/auto-moto',
                  icon: '🚗',
                  title: 'Assurance Auto',
                  sub: 'Protéger votre achat',
                  text: 'Vous venez de financer un véhicule ? Ne payez pas votre assurance plein pot. Je compare le marché pour vous.',
                  badge: '⚡ Résiliation gérée pour vous',
                  badgeBg: 'rgba(99,102,241,0.08)',
                  badgeColor: '#6366f1',
                  badgeBorder: '1px solid rgba(99,102,241,0.2)',
                  featured: false,
                },
                {
                  href: '/investir/assurance-vie',
                  icon: '🛡️',
                  title: 'Assurance Vie',
                  sub: 'L\'épargne de précaution',
                  text: 'Même en remboursant un crédit, il est vital de se constituer une épargne de sécurité. Découvrons l\'assurance vie.',
                  badge: '✅ Fiscalité optimisée après 8 ans',
                  badgeBg: 'rgba(201,169,110,0.12)',
                  badgeColor: 'var(--orizia-gold)',
                  badgeBorder: '1px solid rgba(201,169,110,0.3)',
                  featured: false,
                },
              ].map(s => (
                <Link href={s.href} key={s.title} className={`fin-card${s.featured ? ' fin-card--featured' : ''}`}>
                  {s.badge && (
                    <span className="fin-card-pill" style={{ background: s.badgeBg, color: s.badgeColor, border: s.badgeBorder }}>
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
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-white)' }}>
          <div className="fin-cta-inner">
            <h2>Prêt(e) à financer votre projet<br />au juste prix ?</h2>
            <p>
              On fait le point sur votre budget, je définis l'enveloppe possible et je m'occupe d'aller chercher le meilleur TAEG du marché. Sans engagement.
            </p>
            <div className="fin-hero-btns">
              <ContactPopup label="📅 Lancer mon étude" className="fin-btn-primary" />
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
              Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager. 
              Aucun versement de quelque nature que ce soit ne peut être exigé d'un particulier, avant l'obtention d'un ou plusieurs prêts d'argent.
              Je suis immatriculée à l'ORIAS en tant que Mandataire Non Exclusif en Opérations de Banque et Services de Paiement (MOBSP).
            </p>
          </div>
        </section>

      </main>
    </>
  );
}