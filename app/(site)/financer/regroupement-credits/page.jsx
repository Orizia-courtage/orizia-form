import Link from 'next/link';
import Image from 'next/image';
import OriziaForm from '@/components/OriziaForm';
import FormStepper from '@/components/FormStepper';
import ReadingProgressRegroupement from '@/components/ReadingProgressRegroupement';
import SimulateurRegroupement from '@/components/SimulateurRegroupement';
import RegroupementChecklist from '@/components/RegroupementChecklist';
import ContactPopup from '@/components/ContactPopup';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Regroupement de Crédits 2026 : Réduisez vos Mensualités | Orizia Courtage',
  description:
    'Réunissez vos crédits en un seul et réduisez vos mensualités jusqu\'à 60%. Cindy Urbansky, courtier indépendant dans les Hauts-de-France. Étude gratuite, sans engagement, réponse sous 24h.',
  alternates: { canonical: 'https://www.orizia-courtage.fr/financer/regroupement-credits' },
  openGraph: {
    title: 'Regroupement de Crédits : −60% sur vos mensualités | Orizia Courtage',
    description: 'Un seul crédit, une seule mensualité réduite. J\'étudie votre dossier gratuitement et vous propose la solution adaptée à votre profil.',
    url: 'https://www.orizia-courtage.fr/financer/regroupement-credits',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://www.orizia-courtage.fr/images/og-regroupement-credits.jpg',
        width: 1200,
        height: 630,
        alt: 'Regroupement de crédits avec Orizia Courtage - Cindy Urbansky',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES ──
const regroupementSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Financer', item: 'https://www.orizia-courtage.fr/financer' },
        { '@type': 'ListItem', position: 3, name: 'Regroupement de crédits', item: 'https://www.orizia-courtage.fr/financer/regroupement-credits' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Courtage en Regroupement de Crédits',
      serviceType: 'Rachat et Consolidation de Crédits',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        image: 'https://www.orizia-courtage.fr/images/Orizia_logo.webp',
        telephone: '+33XXXXXXXXX',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Marcq-en-Baroeul',
          addressRegion: 'Hauts-de-France',
          addressCountry: 'FR',
        },
      },
      description: 'Analyse du profil d\'endettement, mise en concurrence des établissements spécialisés et montage du dossier de regroupement de crédits. Réduction de mensualité jusqu\'à 60%.',
      areaServed: [
        { '@type': 'State', name: 'Hauts-de-France' },
        { '@type': 'City', name: 'Lille' },
        { '@type': 'City', name: 'Marcq-en-Baroeul' },
        { '@type': 'Country', name: 'France' },
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Étude de dossier gratuite et sans engagement.',
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
      name: 'Qu\'est-ce que le regroupement de crédits ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le regroupement de crédits consiste à réunir plusieurs emprunts en cours — crédit immobilier, crédits à la consommation, LOA, dettes — en un seul crédit avec une mensualité réduite et une durée renégociée.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle économie mensuelle peut-on espérer ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La baisse de mensualité dépend du dossier, mais elle peut aller de 30 à 60% selon la situation. Cette baisse s\'obtient en contrepartie d\'un allongement de la durée de remboursement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qui peut bénéficier d\'un regroupement de crédits ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les profils avec au moins deux crédits en cours peuvent être étudiés : salariés, fonctionnaires, retraités et certains indépendants. Les dossiers fichés FICP ou FCC nécessitent une analyse spécifique.',
      },
    },
    {
      '@type': 'Question',
      name: 'Le regroupement de crédits coûte-t-il plus cher au total ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, le coût total augmente souvent à cause de la durée plus longue. En revanche, la mensualité baisse immédiatement et le reste à vivre s\'améliore.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps dure une étude de dossier ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La première réponse peut intervenir sous 24h ouvrées. La mise en place complète prend généralement de 4 à 8 semaines selon le dossier.',
      },
    },
    {
      '@type': 'Question',
      name: 'L\'étude est-elle gratuite et sans engagement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, l\'étude est gratuite et sans engagement. Aucun frais n\'est demandé avant la mise en place effective du regroupement.',
      },
    },
  ],
};

const CHIFFRES = [
  { value: '-60%', label: 'de réduction de mensualités possible', icon: '📉' },
  { value: '24h', label: 'pour une première réponse de principe', icon: '⚡' },
  { value: '100%', label: 'gratuit & sans engagement', icon: '🤝' },
  { value: '10\u00A0questions', label: 'pour une analyse complète de votre profil', icon: '🔍' },
];

const CREDITS_REGROUPABLES = [
  { icon: '🏡', label: 'Crédit immobilier', desc: 'Résidence principale, secondaire ou investissement locatif' },
  { icon: '🛒', label: 'Crédits à la consommation', desc: 'Prêts personnels, crédits renouvelables, travaux' },
  { icon: '🚗', label: 'LOA / LLD', desc: 'Crédit-bail auto, rachat de contrat de location' },
  { icon: '💳', label: 'Dettes diverses', desc: 'Paiements en plusieurs fois, découverts chroniques' },
  { icon: '🏢', label: 'Crédits professionnels', desc: 'Sous conditions selon le profil et le montant' },
  { icon: '💰', label: 'Trésorerie complémentaire', desc: 'Possibilité d\'intégrer une enveloppe de liquidités' },
];

const PROFILS = [
  {
    icon: '👨‍👩‍👧',
    title: 'Famille en CDI',
    desc: 'Revenus stables, crédits accumulés après plusieurs achats.',
    resultat: 'Profil le plus favorable — réduction de 40 à 60% de la mensualité.',
    color: '#16a34a',
  },
  {
    icon: '👴',
    title: 'Retraité propriétaire',
    desc: 'Revenu fixe, patrimoine immobilier, besoin de reste à vivre.',
    resultat: 'Rachat adossé à l\'immobilier — durée adaptée à l\'âge.',
    color: 'var(--orizia-primary)',
  },
  {
    icon: '💼',
    title: 'Fonctionnaire',
    desc: 'Emploi stable, solvabilité reconnue, dossier prioritaire.',
    resultat: 'Conditions souvent plus avantageuses.',
    color: '#d97706',
  },
  {
    icon: '🔧',
    title: 'TNS / Indépendant',
    desc: 'Revenus variables, bilans à analyser, étude spécifique requise.',
    resultat: 'Étude au cas par cas — solutions partielles parfois possibles.',
    color: '#7c3aed',
  },
];

const COMMENT_CA_MARCHE = [
  {
    n: '01',
    icon: '📋',
    title: 'Vous complétez le formulaire',
    text: '10 questions sur votre situation financière. Aucun document à envoyer à ce stade. Comptez 5 à 8 minutes.',
  },
  {
    n: '02',
    icon: '🔍',
    title: 'J\'analyse votre profil',
    text: 'Sous 24h ouvrées, j\'étudie votre dossier, calcule votre taux d\'endettement et identifie le bon segment.',
  },
  {
    n: '03',
    icon: '📞',
    title: 'Vous recevez une proposition',
    text: 'Simulation avant/après, durée, taux, coût total. Vous décidez en toute transparence.',
  },
  {
    n: '04',
    icon: '✅',
    title: 'Montage et mise en place',
    text: 'Si vous acceptez, je transmets le dossier et suis la procédure jusqu\'au déblocage des fonds.',
  },
];

export default function RegroupementCreditsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(regroupementSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        <ReadingProgressRegroupement />

        {/* ── HERO ── */}
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
              <span>Regroupement de crédits</span>
            </nav>
            <span className="fin-badge">💡 Étude gratuite · Réponse sous 24h</span>
            <h1 className="ae-hero-title">Regroupement de crédits :<br />une seule mensualité, réduite jusqu'à −60%</h1>
            <p className="ae-hero-intro">
              Vous cumulez plusieurs crédits et vos mensualités pèsent sur votre budget ?
              Le regroupement de crédits réunit tous vos emprunts en <strong>un seul</strong>,
              avec une mensualité unique et allégée. J'étudie votre
              dossier <strong>gratuitement</strong> et sans engagement.
            </p>
            <div className="ae-hero-btns fin-hero-btns">
              <a href="#formulaire" className="fin-btn-primary">
                🔍 Démarrer mon étude gratuite
              </a>
              <a href="#section-comprendre" className="fin-btn-secondary">
                Comment ça marche ?
              </a>
            </div>
            <div className="ae-hero-trust fin-hero-trust">
              <span>✅ 100% gratuit & sans engagement</span>
              <span>⚡ Réponse sous 24h</span>
              <span>🔒 Données sécurisées</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
        <section className="fin-chiffres">
          <div className="ae-chiffres-inner fin-chiffres-inner">
            {CHIFFRES.map(c => (
              <div key={c.value} className="fin-chiffre">
                <strong>{c.icon} {c.value}</strong>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CITATION CINDY ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="ae-citation-card">
              <div className="ae-citation-photo">
                <Image
                  src="/images/photo-cindy.webp"
                  alt="Cindy Urbansky, courtier indépendant en regroupement de crédits"
                  title="Cindy Urbansky - Orizia Courtage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  sizes="(max-width: 768px) 150px, 180px"
                  priority
                />
              </div>
              <div className="ae-citation-content">
                <p className="ae-citation-quote">
                  « Quand les mensualités dépassent 35% de vos revenus, ce n'est plus un problème de budget — c'est un problème de structure. »
                </p>
                <p className="ae-citation-text">
                  Le regroupement de crédits n'est pas une solution miracle, mais c'est souvent la seule qui redonne de l'air immédiatement. Mon rôle est d'analyser votre situation honnêtement, de vous présenter les chiffres réels — économies immédiates et coût total — et de vous laisser décider en toute connaissance de cause.
                </p>
                <span className="ae-citation-author">
Cindy Urbansky, courtier indépendant et fondatrice de Orizia Courtage                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPRENDRE ── */}
        <section id="section-comprendre" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge">C'est quoi exactement ?</span>
                <h2>Transformez plusieurs dettes<br />en un seul crédit allégé</h2>
                <p>
                  Le regroupement de crédits fonctionne comme une opération de consolidation :
                  un établissement de crédit rachète l'ensemble de vos emprunts en cours
                  et vous propose un <strong>nouveau crédit unique</strong> à un taux et
                  une durée négociés.
                </p>
                <p>
                  Résultat immédiat : votre mensualité globale baisse, parfois de moitié.
                  Votre taux d'endettement se normalise. Vous retrouvez du <strong>reste à vivre</strong>
                  chaque mois.
                </p>
                <p style={{ fontSize: '0.85rem', opacity: 0.6, fontStyle: 'italic' }}>
                  ⚠️ Contrepartie : la durée totale de remboursement s'allonge,
                  ce qui augmente le coût global du crédit. Je vous présente
                  une simulation complète pour décider en connaissance de cause.
                </p>
              </div>

              <div>
                <div style={{
                  background: 'var(--orizia-light)',
                  borderRadius: 16,
                  padding: '28px 24px',
                  border: '1.5px solid rgba(58,111,108,0.2)',
                }}>
                  <div style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    color: 'var(--orizia-primary)',
                    marginBottom: 18,
                    textAlign: 'center',
                  }}>
                    Quels crédits peut-on regrouper ?
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {CREDITS_REGROUPABLES.map(c => (
                      <div
                        key={c.label}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 12,
                          background: '#fff',
                          borderRadius: 10,
                          padding: '12px 14px',
                          border: '1px solid rgba(58,111,108,0.12)',
                        }}
                      >
                        <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: 1 }}>{c.icon}</span>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--orizia-accent)', marginBottom: 2 }}>
                            {c.label}
                          </div>
                          <div style={{ fontSize: '0.77rem', color: 'var(--orizia-dark)', opacity: 0.6, lineHeight: 1.4 }}>
                            {c.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SIMULATEUR ── */}
        <section id="section-simulateur" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">📊 Simulateur</span>
              <h2>Calculez votre taux d'endettement<br />et votre mensualité cible</h2>
              <p>
                Renseignez vos mensualités actuelles et vos revenus pour voir immédiatement
                si le regroupement peut vous aider — et de combien.
              </p>
            </div>
            <SimulateurRegroupement />
          </div>
        </section>

        {/* ── PROCESSUS ── */}
        <section id="section-processus" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Le processus</span>
              <h2>De votre formulaire à votre<br />nouvelle mensualité en 4 étapes</h2>
              <p>Tout commence par quelques minutes de formulaire. Je m'occupe du reste.</p>
            </div>
            <div className="ae-accompagnement-layout">
              <div className="ae-accompagnement-etapes">
                {COMMENT_CA_MARCHE.map(e => (
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
                  src="/images/dossier_regroupement_credit.webp"
                  alt="Cindy Urbansky analysant un dossier de regroupement de crédits"
                  title="Analyse et montage de dossier de regroupement de crédits"
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

        {/* ── PROFILS ── */}
        <section id="section-profils" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Votre profil</span>
              <h2>Le regroupement est-il<br />fait pour votre situation ?</h2>
              <p>
                Les conditions varient selon votre statut. Voici les profils les plus fréquents
                et leur potentiel de solution.
              </p>
            </div>

            <div className="rc-profils-layout">
              <div>
                <Image
                  src="/images/banque-pression.webp"
                  alt="Pression financière liée à l'accumulation de crédits"
                  title="Le regroupement de crédits pour retrouver de l'air dans son budget"
                  width={716}
                  height={1024}
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 16 }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>

              <div>
                <div className="rc-profils-grid">
                  {PROFILS.map(p => (
                    <div
                      key={p.title}
                      style={{
                        background: 'var(--orizia-white)',
                        borderRadius: 16,
                        padding: '22px 20px',
                        border: `2px solid ${p.color}22`,
                      }}
                    >
                      <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{p.icon}</div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--orizia-accent)', marginBottom: 6 }}>
                        {p.title}
                      </h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--orizia-dark)', opacity: 0.7, marginBottom: 12, lineHeight: 1.5 }}>
                        {p.desc}
                      </p>
                      <div style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: p.color,
                        background: `${p.color}12`,
                        padding: '8px 12px',
                        borderRadius: 8,
                        lineHeight: 1.4,
                      }}>
                        🎯 {p.resultat}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="crowd-cta-band" style={{ margin: 0 }}>
                  <div>
                    <strong>Vous ne savez pas si votre profil est éligible ?</strong>
                    <p>
                      Le formulaire ci-dessous analyse votre situation en détail et
                      vous donne une réponse de principe sous 24h — sans engagement.
                    </p>
                  </div>
                  <a href="#formulaire" className="fin-btn-on-dark">
                    🔍 Démarrer l'analyse
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── AUTO-ÉVALUATION ── */}
        <section id="section-autoevaluation" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <RegroupementChecklist />
          </div>
        </section>

        {/* ── FORMULAIRE ── */}
        <section
          id="formulaire"
          className="crowd-section crowd-section--light"
          style={{ paddingTop: 60, paddingBottom: 60 }}
        >
          <div className="fin-section-inner" style={{ maxWidth: 800 }}>
            <div className="fin-section-head">
              <span className="fin-badge">Étude personnalisée</span>
              <h2>Complétez votre dossier en ligne</h2>
              <p>
                10 questions · 5 à 8 minutes · Réponse sous 24h<br />
                <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                  Aucun document à envoyer à ce stade. Vos données sont sécurisées.
                </span>
              </p>
            </div>
            <div className="f-wrap-embedded">
              <OriziaForm />
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="section-faq" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions sur le regroupement<br />de crédits, mes réponses</h2>
              <p>Des réponses claires, sans jargon financier.</p>
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
              <span className="fin-badge">Aller plus loin</span>
              <h2>Optimisez l'ensemble<br />de votre situation financière</h2>
              <p>Le regroupement de crédits est souvent le point de départ d'une remise à plat complète.</p>
            </div>
            <div className="fin-cards fin-cards--white">
              {[
                {
                  href: '/financer/credit-immobilier',
                  icon: '🏡',
                  title: 'Crédit Immobilier',
                  sub: 'Financer un projet',
                  text: 'Après assainissement de votre budget, vous souhaitez acquérir un bien ? Je négocie votre crédit immobilier aux meilleures conditions.',
                  badge: '🏦 +40 banques comparées',
                  badgeBg: 'rgba(45,106,95,0.1)',
                  badgeColor: 'var(--orizia-primary)',
                  badgeBorder: '1px solid rgba(45,106,95,0.25)',
                  featured: false,
                },
                {
                  href: '/assurer/assurance-emprunteur',
                  icon: '📋',
                  title: 'Assurance Emprunteur',
                  sub: 'Réduire le coût de votre prêt',
                  text: 'Si votre regroupement inclut un prêt immobilier, optimiser l\'assurance emprunteur peut générer des économies supplémentaires.',
                  badge: '� Économisez jusqu\'à 15 000€',
                  badgeBg: 'rgba(201,169,110,0.12)',
                  badgeColor: 'var(--orizia-gold)',
                  badgeBorder: '1px solid rgba(201,169,110,0.3)',
                  featured: true,
                },
                {
                  href: '/investir/assurance-vie',
                  icon: '🛡️',
                  title: 'Assurance Vie',
                  sub: 'Épargner en parallèle',
                  text: 'Une mensualité allégée libère de la capacité d\'épargne. L\'assurance vie est l\'outil idéal pour faire fructifier ce surplus mensuel.',
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
            <h2>Vos mensualités pèsent trop.<br />Faites-les baisser dès maintenant.</h2>
            <p>
              5 minutes de formulaire. 24h de délai. Une proposition concrète.
              J'analyse votre profil, j'identifie la solution optimale
              et je vous accompagne jusqu'à la mise en place. Sans frais.
            </p>
            <div className="fin-hero-btns">
              <a href="#formulaire" className="fin-btn-primary">
                🔍 Démarrer mon étude gratuite
              </a>
              <ContactPopup />
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 560, margin: '24px auto 0' }}>
              Le regroupement de crédits peut allonger la durée de remboursement et augmenter le coût total du crédit.
              Une simulation complète vous sera fournie avant toute décision.
              Je suis immatriculée à l'ORIAS en tant que Mandataire Non Exclusif en Opérations de Banque et Services de Paiement (MOBSP).
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
