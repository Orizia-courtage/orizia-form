import Link from 'next/link';
import Image from 'next/image';

// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Financer vos projets en 2026 : Crédit & Rachat | Orizia Courtage',
  description: 'Crédit immobilier, prêt personnel ou regroupement de crédits. Courtière indépendante, je négocie les meilleurs taux pour vos projets. Étude gratuite.',
  keywords: [
    'courtier crédit immobilier',
    'regroupement de crédits',
    'financement prêt personnel courtier',
    'meilleur taux crédit 2026',
    'courtier indépendant',
    'courtier Hauts-de-France',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/financer' },
  openGraph: {
    title: 'Financer vos projets en 2026 : Crédit & Rachat | Orizia Courtage',
    description: 'Ne financez plus les marges des banques. Je compare le marché et négocie votre crédit au meilleur taux. Étude gratuite et sans engagement.',
    url: 'https://orizia-courtage.fr/financer',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/financer.jpg',
        width: 1200,
        height: 630,
        alt: 'Financer vos projets avec Orizia Courtage - Cindy Urbansky',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES ──
const financerHubSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Financer', item: 'https://orizia-courtage.fr/financer' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Courtage en Crédit Immobilier et Financement',
      serviceType: 'Courtage en Opérations de Banque (COBSP)',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        image: 'https://orizia-courtage.fr/images/Orizia_logo.webp',
      },
      description:
        'Négociation de crédit immobilier, regroupement de crédits et prêt personnel. Accès à plus de 40 banques partenaires. Étude gratuite et sans engagement.',
      areaServed: [
        { '@type': 'State', name: 'Hauts-de-France' },
        { '@type': 'City', name: 'Lille' },
        { '@type': 'City', name: 'Marcq-en-Barœul' },
        { '@type': 'Country', name: 'France' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Solutions de financement Orizia',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Crédit immobilier' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Regroupement de crédits' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Prêt personnel' } },
          { '@type': 'Offer', itemOffered: { '@type': 'FinancialProduct', name: 'Rachat de soulte' } },
        ],
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Étude de faisabilité et accompagnement gratuits (rémunération par la banque partenaire à la signature).',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Combien coûte le service d\'un courtier en crédit immobilier ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pour la majorité des financements, ma rémunération est prise en charge par la banque chez qui nous signons. Vous ne payez aucun honoraire. L\'étude de faisabilité et l\'accompagnement complet sont 100% gratuits pour vous.',
          },
        },
        {
          '@type': 'Question',
          name: 'Combien de banques comparez-vous pour mon crédit ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'J\'interroge plus de 40 banques et organismes partenaires pour chaque dossier. Contrairement à votre banque habituelle qui ne peut vous proposer que ses propres offres, je mets l\'ensemble du marché en concurrence pour vous obtenir le meilleur taux et les meilleures conditions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quel est le délai pour obtenir une réponse de principe ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Après notre premier échange et la réception de vos documents, je vous fournis une première estimation sous 24 à 48h. L\'accord de principe bancaire intervient généralement sous 1 à 2 semaines selon la complexité du dossier.',
          },
        },
        {
          '@type': 'Question',
          name: 'Mon dossier est-il finançable si j\'ai des crédits en cours ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Avoir des crédits en cours n\'est pas un obstacle en soi. Tout dépend de votre taux d\'endettement global. Si celui-ci est trop élevé, le regroupement de crédits peut être une solution pour le faire baisser avant de monter un nouveau dossier. Je fais le point avec vous lors du premier échange.',
          },
        },
        {
          '@type': 'Question',
          name: 'Puis-je faire appel à vous si ma banque a déjà refusé mon dossier ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui, et c\'est même l\'une des situations où je suis le plus utile. Un refus d\'une banque ne signifie pas un refus du marché. Chaque établissement a ses propres critères. Je connais les politiques de crédit de mes 40+ partenaires et je sais vers qui orienter votre dossier selon votre profil.',
          },
        },
        {
          '@type': 'Question',
          name: 'Que se passe-t-il après l\'accord de principe ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Je vous accompagne jusqu\'à la signature de l\'offre de prêt chez le notaire. Je gère les relances bancaires, la négociation de l\'assurance emprunteur, et je vous explique chaque document avant signature. Vous n\'êtes jamais seul(e) face à la banque.',
          },
        },
      ],
    },
  ],
};

const SOLUTIONS = [
  {
    icon: '🏠',
    title: 'Crédit immobilier',
    sub: 'Votre projet de vie',
    href: '/financer/credit-immobilier',
    description: 'Achat, construction ou investissement locatif. Je mets les banques en concurrence pour faire baisser le coût total de votre achat.',
    avantages: ['Taux négociés', 'Assurance emprunteur optimisée', 'Accompagnement jusqu\'au notaire'],
  },
  {
    icon: '🔄',
    title: 'Regroupement de crédits',
    sub: 'Votre budget respire',
    href: '/financer/regroupement-credits',
    description: 'Vos mensualités vous étouffent ? Je rassemble tous vos crédits en un seul pour faire chuter votre prélèvement mensuel jusqu\'à 60%.',
    avantages: ['Une seule mensualité allégée', 'Baisse du taux d\'endettement', 'Possibilité d\'inclure une trésorerie'],
  },
  {
    icon: '💶',
    title: 'Prêt personnel',
    sub: 'Vos projets concrets',
    href: '/financer/pret-personnel',
    description: 'Auto, travaux ou trésorerie. Je vous trouve le meilleur TAEG du marché pour que vous financiez vos projets, pas les marges de l\'organisme prêteur.',
    avantages: ['Sans assurances toxiques imposées', 'Mensualités fixes', 'Déblocage rapide'],
  },
  {
    icon: '⚖️',
    title: 'Rachat de soulte',
    sub: 'Divorce · Séparation · Succession',
    href: '/financer/rachat-soulte',
    description: 'Vous souhaitez conserver votre bien en rachetant la part de votre co-propriétaire ? Je monte le financement et coordonne avec votre notaire.',
    avantages: ['Calcul de la soulte expliqué', 'Coordination notaire incluse', '+40 banques comparées'],
  },
];

const ETAPES = [
  { n: '01', title: 'Le point sur vos finances', text: 'On analyse ensemble votre capacité d\'emprunt réelle, sans jugement, lors d\'un premier échange.' },
  { n: '02', title: 'Je chasse le meilleur taux', text: 'J\'interroge mon réseau de banques partenaires et je négocie chaque dixième de point et chaque frais de dossier pour vous.' },
  { n: '03', title: 'Je m\'occupe de la paperasse', text: 'Montage du dossier bancaire, relances, négociation de l\'assurance emprunteur : je gère tout jusqu\'à l\'accord ferme.' },
  { n: '04', title: 'Déblocage et suivi', text: 'Je vous accompagne jusqu\'à la signature de l\'offre de prêt et le déblocage des fonds. Vous n\'êtes jamais seul(e).' },
];

const CHIFFRES = [
  { val: '+40', label: 'Banques & organismes comparés', icon: '🏦' },
  { val: '24h', label: 'Pour une 1ère estimation gratuite', icon: '⚡' },
  { val: '100%', label: 'Indépendante & objective', icon: '🎯' },
  { val: '1', label: 'Interlocutrice unique : moi', icon: '🤝' },
];

const FAQ_FINANCER = [
  {
    q: 'Combien coûte le service d\'un courtier en crédit immobilier ?',
    r: 'Pour la majorité des financements, ma rémunération est prise en charge par la banque chez qui nous signons. Vous ne payez aucun honoraire. L\'étude de faisabilité et l\'accompagnement complet sont 100% gratuits pour vous.',
  },
  {
    q: 'Combien de banques comparez-vous pour mon crédit ?',
    r: 'J\'interroge plus de 40 banques et organismes partenaires pour chaque dossier. Contrairement à votre banque habituelle qui ne peut vous proposer que ses propres offres, je mets l\'ensemble du marché en concurrence pour vous obtenir le meilleur taux et les meilleures conditions.',
  },
  {
    q: 'Quel est le délai pour obtenir une réponse de principe ?',
    r: 'Après notre premier échange et la réception de vos documents, je vous fournis une première estimation sous 24 à 48h. L\'accord de principe bancaire intervient généralement sous 1 à 2 semaines selon la complexité du dossier.',
  },
  {
    q: 'Mon dossier est-il finançable si j\'ai des crédits en cours ?',
    r: 'Avoir des crédits en cours n\'est pas un obstacle en soi. Tout dépend de votre taux d\'endettement global. Si celui-ci est trop élevé, le regroupement de crédits peut être une solution pour le faire baisser avant de monter un nouveau dossier. Je fais le point avec vous lors du premier échange.',
  },
  {
    q: 'Puis-je faire appel à vous si ma banque a déjà refusé mon dossier ?',
    r: 'Oui, et c\'est même l\'une des situations où je suis le plus utile. Un refus d\'une banque ne signifie pas un refus du marché. Chaque établissement a ses propres critères. Je connais les politiques de crédit de mes 40+ partenaires et je sais vers qui orienter votre dossier selon votre profil.',
  },
  {
    q: 'Que se passe-t-il après l\'accord de principe ?',
    r: 'Je vous accompagne jusqu\'à la signature de l\'offre de prêt chez le notaire. Je gère les relances bancaires, la négociation de l\'assurance emprunteur, et je vous explique chaque document avant signature. Vous n\'êtes jamais seul(e) face à la banque.',
  },
];

export default function FinancerPage() {
  return (
    <main className="financer-page">

      {/* ── INJECTION DONNÉES STRUCTURÉES ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financerHubSchema) }}
      />

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
          <span className="fin-badge">💶 Financement sur-mesure</span>
          <h1 className="ae-hero-title">Financez vos projets<br />sans vous faire plumer</h1>
          <p className="ae-hero-intro">
            Crédit immobilier, prêt personnel ou regroupement de crédits. En tant que
            courtière indépendante, je compare, je négocie et je vais chercher <strong>le taux
            qui respecte vraiment votre budget</strong>.
          </p>
          <div className="ae-hero-btns fin-hero-btns">
            <Link href="/simulation" className="fin-btn-primary">
              💻 Lancer une simulation gratuite →
            </Link>
            <Link href="/rendez-vous" className="fin-btn-secondary">
              📅 Faire le point avec Cindy
            </Link>
          </div>
          <div className="ae-hero-trust fin-hero-trust">
            <span>✅ Accompagnement de A à Z</span>
            <span>🛡️ Étude 100% sans engagement</span>
            <span>⚡ Réponse de principe sous 48h</span>
          </div>
        </div>
      </section>

      {/* ── CHIFFRES CLÉS (Avec icônes) ── */}
      <section className="fin-chiffres">
        <div className="ae-chiffres-inner fin-chiffres-inner">
          {CHIFFRES.map(c => (
            <div key={c.val} className="fin-chiffre">
              <strong>{c.icon} {c.val}</strong>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CITATION CINDY (Avec photo) ── */}
      <section className="crowd-section crowd-section--light" style={{ padding: '40px 20px 20px' }}>
        <div className="fin-section-inner">
          <div className="ae-citation-card">
            <div className="ae-citation-photo">
              <Image
                src="/images/photo-cindy.webp"
                alt="Cindy Urbansky, courtière indépendante en crédit immobilier"
                title="Cindy Urbansky - Orizia Courtage"
                fill
                style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                sizes="(max-width: 768px) 150px, 180px"
                priority
              />
            </div>
            <div className="ae-citation-content">
              <p className="ae-citation-quote">
                « Une banque ne vous proposera jamais l'offre de son concurrent, même si elle est meilleure pour vous. »
              </p>
              <p className="ae-citation-text">
                C'est là que j'interviens. Je ne vends pas de crédits : je mets les banques en compétition
                pour vous obtenir le financement qui respecte vraiment votre budget et vos projets.
                Sans jargon, sans frais cachés, et en toute indépendance.
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
            <span className="fin-badge">Votre projet</span>
            <h2>On finance quoi aujourd'hui ?</h2>
            <p>À chaque étape de vie son financement. Je vous oriente vers le montage bancaire le plus économique pour vous.</p>
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
                <span className="fin-card-link">Découvrir l'approche →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="fin-process">
        <div className="fin-section-inner">
          <div className="fin-section-head">
            <span className="fin-badge">Mon engagement</span>
            <h2>Vous choisissez, je m'occupe du reste</h2>
            <p>Faire un crédit est souvent un parcours du combattant. Mon rôle est de vous décharger de toute la charge mentale bancaire.</p>
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
                alt="Cindy Urbansky montant un dossier de crédit immobilier pour ses clients"
                title="Montage de dossier de crédit – Orizia Courtage"
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

      {/* ── POURQUOI ORIZIA ── */}
      <section className="fin-why">
        <div className="fin-section-inner fin-why-inner">
          <div className="fin-why-text">
            <span className="fin-badge">Le modèle Orizia</span>
            <h2>L'avantage d'une<br />courtière indépendante</h2>
            <p>
              Je travaille pour vous, pas pour les banques. Je suis certifiée ORIAS 
              et n'ai aucun quota à remplir auprès des établissements financiers. Mon seul 
              objectif est que votre dossier passe, aux meilleures conditions.
            </p>
            <p>
              Et la meilleure nouvelle ? Pour la majorité des financements, <strong>ma rémunération est prise 
              en charge par la banque chez qui nous signons</strong>.
            </p>
            <ul className="fin-why-list">
              <li>🛡️ Défense exclusive de vos intérêts</li>
              <li>💬 Zéro plateforme : vous m'avez en ligne directement</li>
              <li>🔍 Explication claire de chaque ligne du contrat</li>
              <li>🤝 Transparence totale sur ma rémunération</li>
            </ul>
            <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 24 }}>
              📅 Me confier votre recherche →
            </Link>
          </div>
          <div className="fin-why-image">
            <Image
              src="/images/financer.jpg"
              alt="Cindy Urbansky, courtière Orizia Courtage"
              width={520}
              height={420}
              style={{ objectFit: 'cover', borderRadius: 20, width: '100%', height: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="crowd-section crowd-section--light">
        <div className="fin-section-inner">
          <div className="fin-section-head">
            <span className="fin-badge">FAQ</span>
            <h2>Vos questions sur le financement,<br />mes réponses directes</h2>
            <p>Sans jargon. Sans langue de bois. Les vraies réponses.</p>
          </div>
          <div className="crowd-faq-list">
            {FAQ_FINANCER.map((f, i) => (
              <details key={i} className="crowd-faq-item">
                <summary>{f.q}</summary>
                <p>{f.r}</p>
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

      {/* ── CTA FINAL ── */}
      <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-white)' }}>
        <div className="fin-cta-inner">
          <h2>Prêt(e) à faire décoller votre projet ?</h2>
          <p>Ne vous épuisez pas à faire le tour des banques. Confiez-moi votre dossier, je m'occupe d'aller chercher le meilleur accord de principe.</p>
          <div className="fin-hero-btns">
            <Link href="/simulation" className="fin-btn-primary">
              💻 Estimer mon financement →
            </Link>
            <Link href="/rendez-vous" className="fin-btn-secondary">
              ✉️ Poser une question à Cindy
            </Link>
          </div>
          <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
            Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
            Orizia Courtage, immatriculée à l'ORIAS, intervient en qualité de courtier en opérations de banque et en services de paiement (COBSP).
          </p>
        </div>
      </section>

    </main>
  );
}