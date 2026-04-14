import Link from 'next/link';
import Image from 'next/image';

// ── 1. MÉTADONNÉES SEO (Optimisées) ──
export const metadata = {
  title: 'Assurances 2026 : Emprunteur, Habitation, Auto | Orizia Courtage',
  description: 'Emprunteur, habitation, auto/moto : arrêtez de subir la hausse des tarifs. Cindy Urbansky, courtière dans les Hauts-de-France, compare et résilie pour vous.',
  keywords: [
    'courtier assurance indépendant Hauts-de-France',
    'comparatif assurance 2026',
    'résiliation assurance loi hamon',
    'loi lemoine assurance emprunteur',
    'économiser assurance auto habitation',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/assurer' },
  openGraph: {
    title: 'Assurances 2026 : Ne payez plus trop cher | Orizia Courtage',
    description: 'Ne laissez plus vos contrats s\'envoler chaque année. Je mets le marché en concurrence et je gère vos résiliations. Devis gratuit et sans engagement.',
    url: 'https://orizia-courtage.fr/assurer',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/assurer.jpg',
        width: 1200,
        height: 630,
        alt: 'Courtage en assurance avec Orizia Courtage - Cindy Urbansky',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES (Hub, Catalogue & FAQ) ──
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
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Pôle Assurances Orizia Courtage',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Délégation d\'Assurance Emprunteur (Loi Lemoine)' }
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Assurance Habitation (MRH, Locataire, PNO)' }
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Assurance Auto & Moto' }
          }
        ]
      }
    },
    // ⚠️ LA NOUVELLE FAQ EN DONNÉES STRUCTURÉES ⚠️
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Pourquoi passer par une courtière plutôt que mon assureur habituel ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Un agent général ne peut vous proposer que les contrats de sa propre marque. En tant que courtière indépendante, je ne suis rattachée à aucun réseau. Je compare les offres de dizaines de compagnies pour vous trouver le meilleur rapport qualité/prix, en toute objectivité.",
          },
        },
        {
          '@type': 'Question',
          name: "Est-ce que votre service de courtage me coûte plus cher ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Pas du tout, c'est 100% gratuit pour vous. En assurance, ma rémunération est prise en charge par la compagnie d'assurance chez qui nous décidons de placer votre contrat. Vous ne payez aucun honoraire, et la prime n'est pas majorée (elle est même souvent bien plus basse).",
          },
        },
        {
          '@type': 'Question',
          name: "Puis-je vraiment changer d'assurance à tout moment ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Oui ! Pour l'assurance auto et habitation, la loi Hamon vous permet de résilier n'importe quand après un an d'engagement. Pour l'assurance emprunteur, la loi Lemoine va encore plus loin : vous pouvez changer dès le lendemain de la signature de votre prêt, sans attendre un an.",
          },
        },
        {
          '@type': 'Question',
          name: "Que se passe-t-il en cas de sinistre ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Vos contrats sont souscrits auprès de compagnies solides et reconnues (SwissLife, Cardif, etc.). En cas de sinistre, vous bénéficiez de toute leur infrastructure d'assistance et d'indemnisation. Mais l'avantage, c'est que je reste votre interlocutrice de confiance pour vous guider si la situation se complique.",
          },
        },
      ],
    }
  ]
};

// On récupère le bloc FAAQ (C'est le 4ème élément du @graph, donc index 3)
const faqSchema = assurerHubSchema['@graph'][3];

const SOLUTIONS = [
  {
    icon: '📋',
    title: 'Assurance emprunteur',
    sub: 'Le plus gros levier d\'économie',
    href: '/assurer/assurance-emprunteur',
    description: 'Ne laissez pas la banque marger sur votre crédit immobilier. Je vous trouve un contrat équivalent, souvent deux fois moins cher.',
    avantages: ['Loi Lemoine : changement à tout moment', 'Jusqu\'à 15 000€ d\'économies', 'Je gère le bras de fer avec la banque'],
  },
  {
    icon: '🏡',
    title: 'Assurance habitation',
    sub: 'Votre cocon sécurisé',
    href: '/assurer/assurance-habitation',
    description: 'Les tarifs flambent à cause des risques climatiques. J\'ajuste vos garanties pour vous protéger efficacement sans surpayer.',
    avantages: ['Couverture sur-mesure (Propriétaire/Locataire)', 'Traque de la sur-assurance', 'Résiliation sans coupure'],
  },
  {
    icon: '🚗',
    title: 'Assurance auto & moto',
    sub: 'Roulez au juste prix',
    href: '/assurer/auto-moto',
    description: 'Tiers, intermédiaire ou tous risques : j\'adapte votre contrat à la valeur réelle de votre véhicule pour contrer l\'inflation.',
    avantages: ['Comparaison objective du marché', 'Assistance 0km & options utiles', 'Loi Hamon : je résilie pour vous'],
  },
];

const ETAPES = [
  { n: '01', title: 'Audit de vos contrats', text: 'On fait le point sur ce que vous payez aujourd\'hui. Souvent, de mauvaises surprises s\'y cachent.' },
  { n: '02', title: 'Mise en concurrence', text: 'J\'interroge mes dizaines de partenaires (SwissLife, Cardif, Abeille...) pour dénicher le tarif parfait.' },
  { n: '03', title: 'Zéro paperasse pour vous', text: 'Loi Hamon, Loi Lemoine... J\'utilise tous vos droits légaux pour résilier vos anciens contrats à votre place.' },
  { n: '04', title: 'Suivi sur le long terme', text: 'L\'année prochaine, si votre assureur augmente trop ses tarifs, je serai là pour vous le dire et re-comparer.' },
];

const CHIFFRES = [
  { val: '100%', label: 'De la paperasse gérée par mes soins', icon: '📝' },
  { val: '+30',  label: 'Assureurs partenaires comparés', icon: '🤝' },
  { val: '-50%', label: 'D\'économies possibles sur votre prêt', icon: '💰' },
  { val: '0€',   label: 'De frais d\'étude pour vous', icon: '✨' },
];

export default function AssurerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(assurerHubSchema) }}
      />
      <main className="assurer-page">

        {/* ── HERO ── */}
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
          <div className="ae-hero-inner">
            <span className="fin-badge ae-hero-badge">🛡️ Courtage 100% Indépendant</span>
            <h1 className="ae-hero-title">Protégez ce qui compte<br />sans payer la taxe de fidélité</h1>
            <p className="ae-hero-intro">
              Emprunteur, habitation ou auto/moto : vos assureurs augmentent vos tarifs chaque année. 
              Je suis là pour dire stop. Je compare le marché, je trouve le juste prix, et <strong>je résilie 
              vos anciens contrats à votre place</strong>.
            </p>
            <div className="ae-hero-btns">
              <Link href="/contact" className="fin-btn-primary">
                🔍 Faire auditer mes contrats actuels →
              </Link>
              <Link href="/rendez-vous" className="fin-btn-secondary">
                📅 Prendre rendez-vous avec Cindy
              </Link>
            </div>
            <div className="ae-hero-trust">
              <span>✅ Accompagnement de A à Z</span>
              <span>🤝 100% gratuit et sans engagement</span>
              <span>⚡ Zéro coupure de garantie</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
        <section className="fin-chiffres">
          <div className="ae-chiffres-inner">
            {CHIFFRES.map(c => (
              <div key={c.label} className="fin-chiffre">
                <strong>{c.icon}{c.val}</strong>
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
                  alt="Cindy Urbansky, courtière indépendante"
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
                  — Cindy Urbansky, courtière indépendante · Orizia Courtage
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── NOS SOLUTIONS ── */}
        <section className="fin-solutions">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Vos contrats au crible</span>
              <h2>Quelle assurance voulez-vous<br />optimiser aujourd'hui ?</h2>
              <p>On peut commencer par un seul contrat, ou tout regrouper pour maximiser les économies et simplifier votre gestion.</p>
            </div>
            <div className="fin-cards">
              {SOLUTIONS.map(s => (
                <Link href={s.href} key={s.title} className="fin-card">
                  <div className="fin-card-icon">{s.icon}</div>
                  <div className="fin-card-sub">{s.sub}</div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <ul className="fin-card-avantages">
                    {s.avantages.map(a => (
                      <li key={a}>✓ {a}</li>
                    ))}
                  </ul>
                  <span className="fin-card-link">Optimiser ce contrat →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOCUS ASSURANCE EMPRUNTEUR ── */}
        <section className="fin-process" style={{ background: '#fff' }}>
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}>
                💡 Le saviez-vous ?
              </span>
              <h2>L'assurance de votre prêt immobilier<br />est une mine d'or (pour votre banque)</h2>
              <p>La Loi Lemoine vous autorise à résilier le contrat de votre banque <strong>à tout moment</strong>. Et c'est là que je vous fais gagner le plus d'argent.</p>
            </div>
            <div className="fin-focus-grid" style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '40px'
            }}>
              {[
                { icon: '💰', title: 'Des milliers d\'euros récupérés', text: 'Sortir du contrat groupe de la banque divise souvent la facture par deux.' },
                { icon: '📝', title: 'Je résilie quand je veux', text: 'Plus besoin d\'attendre la date d\'anniversaire de votre prêt. On peut agir demain.' },
                { icon: '⚡', title: 'Transition invisible', text: 'Zéro coupure. Le nouveau contrat prend le relais à la minute où l\'ancien s\'arrête.' },
                { icon: '🥊', title: 'J\'affronte la banque', text: 'Les banques détestent perdre cette marge. Je m\'occupe de tout le bras de fer juridique.' },
              ].map(f => (
                <div key={f.title} className="fin-focus-card" style={{
                  background: 'var(--orizia-light)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)'
                }}>
                  <div className="fin-focus-icon" style={{ fontSize: '2rem', marginBottom: '12px' }}>{f.icon}</div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--orizia-accent)', marginBottom: '8px' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--orizia-dark)', opacity: 0.8 }}>{f.text}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Link href="/assurer/assurance-emprunteur" className="fin-btn-secondary">
                Découvrir comment baisser mes mensualités →
              </Link>
            </div>
          </div>
        </section>

        {/* ── COMMENT ÇA MARCHE ── */}
        <section className="fin-process">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mon engagement : le "zéro friction"</span>
              <h2>Vous choisissez, je m'occupe du reste</h2>
              <p>Changer d'assurance est censé être compliqué. C'est pour ça que j'en ai fait mon métier.</p>
            </div>
            <div className="fin-etapes">
              {ETAPES.map((e, i) => (
                <div key={e.n} className="fin-etape">
                  <div className="fin-etape-num">{e.n}</div>
                  {i < ETAPES.length - 1 && <div className="fin-etape-line" />}
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── POURQUOI ORIZIA ── */}
        <section className="fin-why">
          <div className="fin-section-inner fin-why-inner">
            <div className="fin-why-text">
              <span className="fin-badge">Le modèle Orizia</span>
              <h2>Une courtière indépendante,<br />100% de votre côté</h2>
              <p>
                Je ne suis mariée à aucun assureur. Quand je vous conseille un contrat, c'est parce que c'est le meilleur pour <strong>vous</strong>, pas parce que j'ai un quota à respecter.
              </p>
              <p>
                <strong>Et combien ça vous coûte ? Rien.</strong> Dans le cadre de l'assurance, ma rémunération est directement prise en charge par la compagnie que nous choisissons ensemble. Vous ne payez pas plus cher, mais vous bénéficiez de mon accompagnement sur le long terme.
              </p>
              <ul className="fin-why-list">
                <li>🛡️ Défense acharnée de vos intérêts</li>
                <li>📊 Comparaison objective et sans filtre</li>
                <li>🤝 Traque des petites lignes et des exclusions</li>
                <li>📋 Fin de la corvée administrative pour vous</li>
                <li>💬 Une seule interlocutrice qui connaît votre dossier</li>
              </ul>
              <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 24 }}>
                📅 Me confier vos contrats →
              </Link>
            </div>
            <div className="ae-probleme-image">
                <Image
                  src="/images/courtier-assurance-independant.webp"
                  alt="Courtier en assurance indépendant comparant des contrats habitation pour ses clientse"
                  title="Comparaison et courtage en assurance habitation"
                  width={716}
                  height={1024}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
          </div>
        </section>

        {/* ── LA NOUVELLE SECTION FAQ ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Questions fréquentes sur mon approche</h2>
              <p>La transparence est au cœur de mon métier de courtière. Voici les questions qu'on me pose le plus souvent.</p>
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
              <Link href="/contact" className="fin-btn-secondary">
                ✉️ Poser une autre question à Cindy
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="fin-cta">
          <div className="fin-cta-inner">
            <h2>Prêt(e) à arrêter de payer trop cher ?</h2>
            <p>
              Faites-moi passer vos avis d'échéance actuels. Je vous dirai très honnêtement si vous êtes bien assuré(e) ou si on peut faire beaucoup mieux ailleurs.
            </p>
            <div className="fin-hero-btns">
              <Link href="/contact" className="fin-btn-primary">
                ✉️ M'envoyer mes contrats actuels →
              </Link>
              <Link href="/rendez-vous" className="fin-btn-outline">
                📅 Prendre un rendez-vous téléphonique
              </Link>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
              Orizia Courtage est un cabinet de courtage indépendant, immatriculé à l'ORIAS. Nos recommandations s'appuient sur une analyse objective du marché pour vous garantir des contrats adaptés à vos exigences et besoins (directive DDA).
            </p>
          </div>
        </section>

      </main>
    </>
  );
}