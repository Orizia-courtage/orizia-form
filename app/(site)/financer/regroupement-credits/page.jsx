import Link from 'next/link';
import Image from 'next/image';
import OriziaForm from '@/components/OriziaForm';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Regroupement de Crédits 2026 : Réduisez vos Mensualités | Orizia Courtage',
  description:
    'Réunissez vos crédits en un seul et réduisez vos mensualités jusqu\'à 60%. Cindy Urbansky, courtière indépendante dans les Hauts-de-France. Étude gratuite, sans engagement, réponse sous 24h.',
  keywords: [
    'regroupement de crédits 2026',
    'rachat de crédits courtier indépendant',
    'réduire mensualités crédit',
    'regroupement crédit immobilier consommation',
    'courtier rachat de crédits Hauts-de-France',
    'simulation regroupement crédits gratuit',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/financer/regroupement-credits' },
  openGraph: {
    title: 'Regroupement de Crédits : −60% sur vos mensualités | Orizia Courtage',
    description: 'Un seul crédit, une seule mensualité réduite. Orizia étudie votre dossier gratuitement et vous propose la solution adaptée à votre profil.',
    url: 'https://orizia-courtage.fr/financer/regroupement-credits',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/financer.jpg',
        width: 1200,
        height: 630,
        alt: 'Regroupement de crédits avec Orizia Courtage - Cindy Urbansky',
      },
    ],
    locale: 'fr_FR',
    type: 'article',
  },
};

// ── 2. DONNÉES STRUCTURÉES ──
const regroupementSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Financer', item: 'https://orizia-courtage.fr/financer' },
        { '@type': 'ListItem', position: 3, name: 'Regroupement de crédits', item: 'https://orizia-courtage.fr/financer/regroupement-credits' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Courtage en Regroupement de Crédits',
      serviceType: 'Rachat et Consolidation de Crédits',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        image: 'https://orizia-courtage.fr/images/Orizia_logo.webp',
      },
      description: 'Analyse du profil d\'endettement, mise en concurrence des établissements spécialisés et montage du dossier de regroupement de crédits. Réduction de mensualité jusqu\'à 60%.',
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
        text: 'La baisse de mensualité dépend du dossier, mais elle peut aller de 30 à 60% selon la situation. Cette baisse s’obtient en contrepartie d’un allongement de la durée de remboursement.',
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
        text: 'Oui, le coût total augmente souvent à cause de la durée plus longue. En revanche, la mensualité baisse immédiatement et le reste à vivre s’améliore.',
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
        text: 'Oui, l’étude est gratuite et sans engagement. Aucun frais n’est demandé avant la mise en place effective du regroupement.',
      },
    },
  ],
};

const CHIFFRES = [
  { value: '−60%', label: 'de réduction de mensualités possible', icon: '📉' },
  { value: '24h', label: 'pour une première réponse de principe', icon: '⚡' },
  { value: '100%', label: 'gratuit & sans engagement', icon: '🤝' },
  { value: '13 étapes', label: 'pour une analyse complète de votre profil', icon: '🔍' },
];

const CREDITS_REGROUPABLES = [
  { icon: '🏡', label: 'Crédit immobilier', desc: 'Résidence principale, secondaire ou investissement locatif' },
  { icon: '🛒', label: 'Crédits à la consommation', desc: 'Prêts personnels, crédits renouvelables, travaux' },
  { icon: '🚗', label: 'LOA / LLD', desc: 'Crédit-bail auto, rachat de contrat de location' },
  { icon: '💳', label: 'Dettes diverses', desc: 'Paiements en plusieurs fois, découverts chroniques' },
  { icon: '🏢', label: 'Crédits professionnels', desc: 'Sous conditions selon le profil et le montant' },
  { icon: '💰', label: 'Trésorerie complémentaire', desc: 'Possibilité d’intégrer une enveloppe de liquidités' },
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
    resultat: 'Rachat adossé à l’immobilier — durée adaptée à l’âge.',
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
    text: '13 questions sur votre situation financière. Aucun document à envoyer à ce stade. Comptez 5 à 8 minutes.',
  },
  {
    n: '02',
    icon: '🔍',
    title: 'Orizia analyse votre profil',
    text: 'Sous 24h ouvrées, Cindy étudie votre dossier, calcule votre taux d’endettement et identifie le bon segment.',
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
    text: 'Si vous acceptez, Orizia transmet le dossier et suit la procédure jusqu’au déblocage des fonds.',
  },
];

const ALERTES = [
  { icon: '✅', label: 'Idéal si votre taux d’endettement dépasse 35%' },
  { icon: '✅', label: 'Idéal si vous avez 3 crédits ou plus en cours' },
  { icon: '✅', label: 'Idéal si vous avez un projet à financer en même temps' },
  { icon: '❌', label: 'Non adapté si vous êtes fiché FICP / FCC' },
  { icon: '❌', label: 'Non adapté si vous avez moins d’1 an de crédits en cours' },
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
        {/* ── HERO (Avec background) ── */}
        <section className="fin-hero ae-hero">
          <div className="ae-hero-bg">
            <Image
              src="/images/discret-hero-bg.webp"
              alt=""
              fill
              priority
              quality={75}
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
                🔍 Démarrer mon étude gratuite →
              </a>
              <a href="#comment" className="fin-btn-secondary">
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

        {/* ── CITATION CINDY (Avec photo) ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="ae-citation-card">
              <div className="ae-citation-photo">
                <Image
                  src="/images/photo-cindy.webp"
                  alt="Cindy Urbansky, courtière indépendante en regroupement de crédits"
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
                  — Cindy Urbansky, courtière indépendante · Orizia Courtage
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="comment" className="crowd-section crowd-section--white">
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
                  ce qui augmente le coût global du crédit. Orizia vous présente
                  une simulation complète pour décider en connaissance de cause.
                </p>

                <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {ALERTES.map((a, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: a.icon === '✅' ? '#16a34a' : '#dc2626',
                      }}
                    >
                      <span>{a.icon}</span>
                      {a.label}
                    </div>
                  ))}
                </div>
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

        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Le processus</span>
              <h2>De votre formulaire à votre<br />nouvelle mensualité en 4 étapes</h2>
              <p>Tout commence par quelques minutes de formulaire. Orizia s’occupe du reste.</p>
            </div>
            <div className="ae-accompagnement-layout">
              <div className="ae-accompagnement-etapes">
                {COMMENT_CA_MARCHE.map(e => (
                  <div key={e.n} className="ae-etape-row">
                    <div className="fin-etape-num" style={{ flexShrink: 0 }}>{e.n}</div>
                    <div>
                      <h3>{e.icon} {e.title}</h3>
                      <p>{e.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ae-accompagnement-image">
                <Image
                  src="/images/dossier-courtage.webp"
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

        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Votre profil</span>
              <h2>Le regroupement est-il<br />fait pour votre situation ?</h2>
              <p>
                Les conditions varient selon votre statut. Voici les profils les plus fréquents
                et leur potentiel de solution.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 48,
              alignItems: 'start',
            }}
              className="rc-profils-layout"
            >
              {/* Image à gauche */}
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

              {/* Grille 2×2 à droite */}
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}
                  className="rc-profils-grid"
                >
                  {PROFILS.map(p => (
                    <div
                      key={p.title}
                      style={{
                        background: '#fff',
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
                  <a href="#formulaire" className="fin-btn-primary">
                    🔍 Démarrer l'analyse →
                  </a>
                </div>
              </div>
            </div>

            <style>{`
              @media (max-width: 900px) {
                .rc-profils-layout { grid-template-columns: 1fr !important; }
              }
              @media (max-width: 500px) {
                .rc-profils-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
          </div>
        </section>

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
                13 questions · 5 à 8 minutes · Réponse sous 24h<br />
                <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                  Aucun document à envoyer à ce stade. Vos données sont sécurisées.
                </span>
              </p>
            </div>

            <OriziaForm />
          </div>
        </section>

        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions sur le regroupement<br />de crédits, nos réponses</h2>
              <p>Des réponses claires, sans jargon financier.</p>
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
              <Link href="/contact" className="fin-btn-secondary">
                ✉️ Poser une autre question à Cindy
              </Link>
            </div>
          </div>
        </section>

        

        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Aller plus loin</span>
              <h2>Optimisez l'ensemble<br />de votre situation financière</h2>
              <p>Le regroupement de crédits est souvent le point de départ d'une remise à plat complète.</p>
            </div>
            <div className="fin-cards">
              {[
                {
                  href: '/financer/credit-immobilier',
                  icon: '🏡',
                  title: 'Crédit Immobilier',
                  sub: 'Financer un projet',
                  text: 'Après assainissement de votre budget, vous souhaitez acquérir un bien ? Orizia négocie votre crédit immobilier aux meilleures conditions.',
                },
                {
                  href: '/assurer/emprunteur',
                  icon: '📋',
                  title: 'Assurance Emprunteur',
                  sub: 'Réduire le coût de votre prêt',
                  text: 'Si votre regroupement inclut un prêt immobilier, optimiser l’assurance emprunteur peut générer des économies supplémentaires.',
                },
                {
                  href: '/investir/assurance-vie',
                  icon: '🛡️',
                  title: 'Assurance Vie',
                  sub: 'Épargner en parallèle',
                  text: 'Une mensualité allégée libère de la capacité d’épargne. L’assurance vie est l’outil idéal pour faire fructifier ce surplus mensuel.',
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

        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-white)' }}>
          <div className="fin-cta-inner">
            <h2>Vos mensualités pèsent trop.<br />Faites-les baisser dès maintenant.</h2>
            <p>
              5 minutes de formulaire. 24h de délai. Une proposition concrète.
              Orizia Courtage analyse votre profil, identifie la solution optimale
              et vous accompagne jusqu'à la mise en place. Gratuitement.
            </p>
            <div className="fin-hero-btns">
              <a href="#formulaire" className="fin-btn-primary">
                🔍 Démarrer mon étude gratuite →
              </a>
              <Link href="/contact" className="fin-btn-secondary">
                Poser une question
              </Link>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 560, margin: '24px auto 0' }}>
              Le regroupement de crédits peut allonger la durée de remboursement et augmenter le coût total du crédit.
              Une simulation complète vous sera fournie avant toute décision.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}