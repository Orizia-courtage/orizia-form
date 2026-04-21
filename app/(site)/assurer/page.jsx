import Link from 'next/link';
import Image from 'next/image';
import ContactPopup from '@/components/ContactPopup';
import AnimatedStats from '@/components/AnimatedStats';
import AssurerQuiz from '@/components/AssurerQuiz';
import AssurerProduitsGrid from '@/components/AssurerProduitsGrid';
import ReadingProgressAssurer from '@/components/ReadingProgressAssurer';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Assurances 2026 : Emprunteur, Habitation, Auto & Moto | Orizia Courtage',
  description:
    'Emprunteur, habitation, auto/moto : arrêtez de subir la hausse des tarifs. Cindy Urbansky, courtier indépendant dans les Hauts-de-France, compare, optimise et résilie pour vous. Gratuit.',
  alternates: { canonical: 'https://orizia-courtage.fr/assurer' },
  openGraph: {
    title: 'Assurances 2026 : Ne payez plus trop cher | Orizia Courtage',
    description: 'Ne laissez plus vos contrats s\'envoler chaque année. Je mets le marché en concurrence, gère vos résiliations via la loi Hamon et Lemoine. Gratuit et indépendant.',
    url: 'https://orizia-courtage.fr/assurer',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/og-assurer.jpg',
        width: 1200,
        height: 630,
        alt: 'Courtage en assurance avec Orizia Courtage - Cindy Urbansky',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES ──
const assurerHubSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Assurer', item: 'https://orizia-courtage.fr/assurer' }
      ]
    },
    {
      '@type': 'InsuranceAgency',
      '@id': 'https://orizia-courtage.fr/#organization',
      name: 'Orizia Courtage',
      image: 'https://orizia-courtage.fr/images/Orizia_logo.webp',
      description: 'Cabinet de courtage en assurances géré par Cindy Urbansky. Spécialiste en délégation d\'assurance emprunteur, habitation et auto/moto.',
      areaServed: [
        { '@type': 'State', name: 'Hauts-de-France' },
        { '@type': 'City', name: 'Lille' },
        { '@type': 'City', name: 'Marcq-en-Barœul' }
      ]
    },
    {
      '@type': 'Service',
      name: 'Courtage et Optimisation d\'Assurances',
      provider: { '@id': 'https://orizia-courtage.fr/#organization' },
      description: 'Analyse, mise en concurrence et gestion de la résiliation pour vos contrats d\'assurance (Emprunteur, Habitation, Auto/Moto).',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Audit, comparaison et résiliation 100% gratuits pour le client.',
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
      name: 'Pourquoi passer par un courtier plutôt que mon assureur habituel ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un agent général ne peut vous proposer que les contrats de sa propre marque. En tant que courtier indépendant, je ne suis rattachée à aucun réseau. Je compare les offres de dizaines de compagnies pour vous trouver le meilleur rapport qualité/prix, en toute objectivité.',
      },
    },
    {
      '@type': 'Question',
      name: 'Est-ce que votre service de courtage me coûte plus cher ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pas du tout, c\'est 100% gratuit pour vous. En assurance, ma rémunération est prise en charge par la compagnie d\'assurance chez qui nous décidons de placer votre contrat. Vous ne payez aucun honoraire, et la prime n\'est pas majorée.',
      },
    },
    {
      '@type': 'Question',
      name: 'Puis-je vraiment changer d\'assurance à tout moment ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui ! Pour l\'assurance auto et habitation, la loi Hamon vous permet de résilier n\'importe quand après un an d\'engagement. Pour l\'assurance emprunteur, la loi Lemoine va encore plus loin : vous pouvez changer dès le lendemain de la signature de votre prêt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Que se passe-t-il en cas de sinistre ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vos contrats sont souscrits auprès de compagnies solides et reconnues (SwissLife, Cardif, etc.). En cas de sinistre, vous bénéficiez de toute leur infrastructure d\'assistance. Et je reste votre interlocutrice de confiance pour vous guider si la situation se complique.',
      },
    },
  ],
};

const ETAPES = [
  { n: '01', title: 'Audit de vos contrats', text: 'On fait le point sur ce que vous payez aujourd\'hui. Souvent, de mauvaises surprises s\'y cachent.' },
  { n: '02', title: 'Mise en concurrence', text: 'J\'interroge mes partenaires (SwissLife, Cardif, Abeille…) pour dénicher le tarif parfait selon votre profil.' },
  { n: '03', title: 'Zéro paperasse pour vous', text: 'Loi Hamon, Loi Lemoine — j\'utilise tous vos droits légaux pour résilier vos anciens contrats à votre place.' },
  { n: '04', title: 'Suivi sur le long terme', text: 'L\'année prochaine, si votre assureur augmente trop ses tarifs, je serai là pour vous le dire et re-comparer.' },
];

const DIFFERENCIANTS = [
  {
    icon: '🎯',
    title: 'Indépendance totale',
    desc: 'Je ne suis rattachée à aucun assureur. Mon seul intérêt, c\'est de trouver le contrat qui sert VOS intérêts.',
    color: 'var(--orizia-primary)',
    bg: 'rgba(45,106,95,0.06)',
  },
  {
    icon: '⚖️',
    title: 'Loi Hamon & Lemoine',
    desc: 'Je maîtrise vos droits légaux et je les utilise pour vous libérer de vos anciens contrats sans coupure.',
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.06)',
  },
  {
    icon: '📞',
    title: 'Interlocutrice unique',
    desc: 'Pas de centre d\'appels. Je gère votre dossier de l\'audit à la résiliation. Vous parlez toujours à Cindy.',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.06)',
  },
  {
    icon: '💶',
    title: '100% gratuit pour vous',
    desc: 'Mon accompagnement est gratuit. Je suis rémunérée par les compagnies partenaires — sans surcoût pour vous.',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.06)',
  },
];

const FAQ_ASSURER = faqSchema.mainEntity.map(f => ({ q: f.name, r: f.acceptedAnswer.text }));

export default function AssurerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(assurerHubSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>

        <ReadingProgressAssurer />

        {/* ── HERO SPLIT ── */}
        <section className="inv-hero">
          <div className="inv-hero-bg-overlay" />
          <div className="inv-hero-inner">
            <nav aria-label="breadcrumb" className="inv-hero-breadcrumb">
              <Link href="/">Accueil</Link>
              <span className="inv-hero-breadcrumb-sep">›</span>
              <span>Assurer</span>
            </nav>

            <div className="inv-hero-layout">
              {/* Gauche — texte */}
              <div className="inv-hero-text">
                <span className="inv-hero-badge">🛡️ Courtage en assurance indépendant</span>
                <h1 className="inv-hero-title" style={{ color: 'var(--orizia-accent)' }}>
                  Protégez ce qui compte<br />
                  <em className="inv-hero-em" style={{ color: 'var(--orizia-primary)', fontStyle: 'normal' }}>sans payer trop cher</em>
                </h1>
                <p className="inv-hero-desc" style={{ color: 'var(--orizia-dark)', opacity: 0.75 }}>
                  Emprunteur, habitation, auto/moto — vos assureurs augmentent vos tarifs
                  chaque année. Je compare le marché, trouve le juste prix et{' '}
                  <strong style={{ color: 'var(--orizia-accent)' }}>résilie vos anciens contrats à votre place.</strong>
                </p>
                <div className="inv-hero-actions">
                  <ContactPopup label="📅 Auditer mes contrats gratuitement" className="fin-btn-primary inv-hero-cta-main" />
                  <Link href="#produits" className="inv-hero-cta-ghost" style={{ color: 'var(--orizia-primary)', borderBottomColor: 'rgba(45,106,95,0.3)' }}>
                    Voir mes solutions ↓
                  </Link>
                </div>
                <div className="inv-hero-trust" style={{ borderTopColor: 'rgba(26,61,53,0.1)' }}>
                  <div className="inv-hero-trust-item" style={{ color: 'var(--orizia-dark)', opacity: 0.55 }}>
                    <span className="inv-hero-trust-dot" />
                    Loi Hamon & Lemoine maîtrisées
                  </div>
                  <div className="inv-hero-trust-item" style={{ color: 'var(--orizia-dark)', opacity: 0.55 }}>
                    <span className="inv-hero-trust-dot" />
                    Zéro coupure de garantie
                  </div>
                  <div className="inv-hero-trust-item" style={{ color: 'var(--orizia-dark)', opacity: 0.55 }}>
                    <span className="inv-hero-trust-dot" />
                    100% gratuit pour vous
                  </div>
                </div>
              </div>

              {/* Droite — quiz */}
              <div className="inv-hero-quiz-wrap">
                <div className="inv-hero-quiz-eyebrow">
                  <span className="inv-hero-quiz-dot" />
                  Quel contrat optimiser en premier ?
                </div>
                <AssurerQuiz />
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ANIMÉES ── */}
        <AnimatedStats />

        {/* ── CITATION CINDY ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="ae-citation-card">
              <div className="ae-citation-photo">
                <Image
                  src="/images/photo-cindy.webp"
                  alt="Cindy Urbansky, courtier indépendant en assurance"
                  title="Cindy Urbansky - Orizia Courtage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  sizes="(max-width: 768px) 150px, 180px"
                  priority
                />
              </div>
              <div className="ae-citation-content">
                <p className="ae-citation-quote">
                  « Payer une assurance, c'est acheter de la tranquillité d'esprit. Mais quand je vois les tarifs augmenter silencieusement chaque année, je vois surtout de l'argent jeté par les fenêtres. »
                </p>
                <p className="ae-citation-text">
                  Mon rôle n'est pas de vous sur-assurer, mais de trouver le contrat qui vous couvre vraiment, au juste prix, et de gérer toute la paperasse de résiliation à votre place. Vous êtes protégé, je m'occupe du reste.
                </p>
                <span className="ae-citation-author">
Cindy Urbansky, courtier indépendant et fondatrice de Orizia Courtage                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRODUITS ── */}
        <section id="produits" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mes solutions</span>
              <h2>3 contrats, une stratégie<br />pour arrêter de payer trop cher</h2>
              <p>
                Chaque contrat a son levier d'économie. Je les optimise ensemble
                pour maximiser vos gains et simplifier votre gestion.
              </p>
            </div>
            <AssurerProduitsGrid />
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Vous ne savez pas par où commencer ? C'est précisément pour ça que le premier rendez-vous existe.
              </p>
              <ContactPopup label="📅 Auditer tous mes contrats avec Cindy" className="fin-btn-primary" />
            </div>
          </div>
        </section>

        {/* ── POURQUOI ORIZIA ── */}
        <section id="section-pourquoi" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="inv-why-layout">
              <div className="inv-why-image">
                <Image
                  src="/images/courtier-assurance-independant.webp"
                  alt="Cindy Urbansky, courtier indépendant en assurance – Orizia Courtage"
                  width={600}
                  height={480}
                  style={{ objectFit: 'cover', borderRadius: 20, width: '100%', height: 'auto' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="inv-why-image-badge">
                  <span className="inv-why-image-badge-icon">🏆</span>
                  <div>
                    <div className="inv-why-image-badge-val">15 ans</div>
                    <div className="inv-why-image-badge-label">d'expérience</div>
                  </div>
                </div>
              </div>
              <div className="inv-why-content">
                <span className="fin-badge">Pourquoi Orizia ?</span>
                <h2>Ce qui me différencie<br />d'un agent d'assurance</h2>
                <p>
                  Un agent général vous vend les produits de son employeur.
                  Moi, je travaille pour vous — et uniquement pour vous.
                </p>
                <div className="inv-why-grid">
                  {DIFFERENCIANTS.map(d => (
                    <div key={d.title} className="inv-why-item" style={{ background: d.bg }}>
                      <div className="inv-why-item-icon" style={{ color: d.color }}>{d.icon}</div>
                      <div>
                        <div className="inv-why-item-title" style={{ color: d.color }}>{d.title}</div>
                        <div className="inv-why-item-desc">{d.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <ContactPopup label="📅 Me confier mes contrats" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 28 }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── ÉTAPES ── */}
        <section id="section-etapes" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mon engagement : le "zéro friction"</span>
              <h2>Vous choisissez,<br />je m'occupe du reste</h2>
              <p>Changer d'assurance est censé être compliqué. C'est pour ça que j'en ai fait mon métier.</p>
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
                  alt="Cindy Urbansky préparant un dossier d'assurance pour ses clients"
                  title="Accompagnement de A à Z – Orizia Courtage"
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

        {/* ── FAQ ── */}
        <section id="section-faq" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions sur mon approche,<br />mes réponses directes</h2>
              <p>La transparence est au cœur de mon métier. Voici les questions qu'on me pose le plus souvent.</p>
            </div>
            <div className="crowd-faq-list">
              {FAQ_ASSURER.map((f, i) => (
                <details key={i} className="crowd-faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.r}</p>
                </details>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Vous avez une question spécifique ? Je vous réponds sous 24h.
              </p>
              <ContactPopup label="✉️ Poser une question à Cindy" className="fin-btn-secondary" />
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-white)' }}>
          <div className="fin-cta-inner">
            <h2>
              Prêt(e) à arrêter de payer trop cher ?
            </h2>
            <p>
              Faites-moi passer vos avis d'échéance. Je vous dirai honnêtement si vous êtes
              bien assuré(e) ou si on peut faire beaucoup mieux ailleurs.{' '}
              <strong>100% gratuit.</strong>
            </p>
            <div className="fin-hero-btns" style={{ justifyContent: 'center' }}>
              <ContactPopup label="✉️ Contactez moi" className="fin-btn-primary" />
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', maxWidth: 540, margin: '24px auto 0' }}>
              Je suis immatriculée à l'ORIAS, régie par l'ACPR.
              Rémunérée par les compagnies partenaires, jamais par vous.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
