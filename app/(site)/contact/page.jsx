import Link from 'next/link';
import Image from 'next/image';
import ContactSujetsFilter from '@/components/ContactSujetsFilter';
import DispoStatus from '@/components/DispoStatus';

export const metadata = {
  title: 'Contacter Orizia Courtage — Conseil gratuit & personnalisé',
  description:
    'Contactez Cindy Urbansky, courtier indépendant dans les Hauts-de-France. Crédit immobilier, assurance, investissement — premier rendez-vous gratuit, réponse sous 24h.',
  alternates: { canonical: 'https://orizia-courtage.fr/contact' },
  openGraph: {
    title: 'Contacter Orizia Courtage — Conseil gratuit & personnalisé',
    description: 'Prenez rendez-vous en quelques clics. Cindy vous répond sous 24h par le canal de votre choix.',
    url: 'https://orizia-courtage.fr/contact',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://orizia-courtage.fr/images/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contacter Cindy Urbansky - Orizia Courtage',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://orizia-courtage.fr/contact' },
      ],
    },
    {
      '@type': 'FinancialService',
      name: 'Orizia Courtage',
      description: 'Courtier indépendant en crédit immobilier, assurance vie et investissement.',
      url: 'https://orizia-courtage.fr',
      telephone: '+33777259706',
      email: 'cindy.urbansky@orizia-courtage.fr',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
    },
  ],
};

const MOYENS = [
  {
    icon: '📅',
    title: 'Prendre rendez-vous',
    desc: 'Choisissez un créneau directement dans mon agenda. Visioconférence ou téléphone.',
    cta: 'Réserver un créneau',
    href: '/rendez-vous',
    primary: true,
    detail: 'Réponse sous 24h garantie',
    color: 'var(--orizia-primary)',
    bg: 'rgba(45,106,95,0.06)',
  },
  {
    icon: '📞',
    title: 'Appeler directement',
    desc: 'Pour une question rapide ou un premier contact sans formalité.',
    cta: '+33 7 77 25 97 06',
    href: 'tel:+33777259706',
    primary: false,
    detail: 'Lun–Ven 9h–18h',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.06)',
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    desc: 'Envoyez un message à votre rythme. Je réponds dans la journée.',
    cta: 'Écrire sur WhatsApp',
    href: 'https://wa.me/33777259706',
    primary: false,
    detail: 'Réponse le jour même',
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.06)',
    external: true,
  },
  {
    icon: '✉️',
    title: 'Par email',
    desc: 'Pour toute demande écrite, pièces jointes ou questions détaillées.',
    cta: 'cindy.urbansky@orizia-courtage.fr',
    href: 'mailto:cindy.urbansky@orizia-courtage.fr',
    primary: false,
    detail: 'Réponse sous 24h',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.06)',
  },
];

const FAQ_CONTACT = [
  {
    q: 'Le premier rendez-vous est-il vraiment gratuit ?',
    r: 'Oui, sans exception. Le premier rendez-vous est un échange de découverte, sans engagement. Orizia Courtage est rémunéré par les établissements partenaires uniquement si un dossier aboutit à une souscription. Vous ne payez jamais de frais de conseil.',
  },
  {
    q: 'En combien de temps puis-je obtenir un rendez-vous ?',
    r: 'Généralement sous 24 à 48h selon les disponibilités. Pour les demandes urgentes (offre immobilière acceptée, optimisation fiscale de fin d\'année), précisez-le dans votre message — votre demande sera traitée en priorité.',
  },
  {
    q: 'Les rendez-vous se font-ils en présentiel ?',
    r: 'Orizia Courtage fonctionne en 100% distanciel — visioconférence ou téléphone. Cela vous permet d\'être accompagné depuis chez vous, sans vous déplacer, quel que soit votre lieu de résidence en France.',
  },
  {
    q: 'Quels documents préparer avant le rendez-vous ?',
    r: 'Aucun document n\'est nécessaire pour le premier rendez-vous. C\'est un échange pour comprendre votre situation et vos objectifs. Les pièces justificatives ne sont demandées qu\'à partir de l\'étape de montage de dossier.',
  },
  {
    q: 'Puis-je être accompagné sur plusieurs sujets à la fois ?',
    r: 'Tout à fait. En tant que courtier indépendant généraliste, je peux vous accompagner simultanément sur un crédit immobilier, une assurance vie et un PER — avec une vision patrimoniale globale cohérente.',
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <main>

        {/* ── HERO ── */}
        <section className="inv-hero">
          <div className="inv-hero-bg-overlay" />
          <div className="inv-hero-inner">
            <nav aria-label="breadcrumb" className="inv-hero-breadcrumb">
              <Link href="/">Accueil</Link>
              <span className="inv-hero-breadcrumb-sep">›</span>
              <span>Contact</span>
            </nav>
            <div className="inv-hero-layout">
              <div className="inv-hero-text">
                <span className="inv-hero-badge">⚡ Réponse sous 24h</span>
                <h1 className="inv-hero-title" style={{ color: 'var(--orizia-accent)' }}>
                  Parlons de<br />
                  <em className="inv-hero-em" style={{ color: 'var(--orizia-primary)', fontStyle: 'normal' }}>votre projet</em>
                </h1>
                <p className="inv-hero-desc" style={{ color: 'var(--orizia-dark)', opacity: 0.75 }}>
                  Crédit immobilier, assurance, investissement — Cindy analyse votre situation
                  et vous propose une solution adaptée. Premier rendez-vous{' '}
                  <strong style={{ color: 'var(--orizia-accent)' }}>gratuit et sans engagement</strong>,
                  100% en visioconférence.
                </p>
                <div className="inv-hero-trust" style={{ borderTopColor: 'rgba(26,61,53,0.1)', paddingTop: 20, marginTop: 8 }}>
                  <div className="inv-hero-trust-item" style={{ color: 'var(--orizia-dark)', opacity: 0.55 }}>
                    <span className="inv-hero-trust-dot" />
                    100% gratuit & sans engagement
                  </div>
                  <div className="inv-hero-trust-item" style={{ color: 'var(--orizia-dark)', opacity: 0.55 }}>
                    <span className="inv-hero-trust-dot" />
                    Réponse sous 24h
                  </div>
                  <div className="inv-hero-trust-item" style={{ color: 'var(--orizia-dark)', opacity: 0.55 }}>
                    <span className="inv-hero-trust-dot" />
                    100% distanciel
                  </div>
                </div>
              </div>

              {/* Droite — Cindy card */}
              <div className="contact-cindy-card">
                <div className="contact-cindy-photo">
                  <Image
                    src="/images/photo-cindy.webp"
                    alt="Cindy Urbansky, courtier indépendant – Orizia Courtage"
                    fill
                    style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                    sizes="200px"
                    priority
                  />
                </div>
                <div className="contact-cindy-info">
                  <DispoStatus />
                  <div className="contact-cindy-name">Cindy Urbansky</div>
                  <div className="contact-cindy-role">courtier indépendant · Orizia Courtage</div>
                  <div className="contact-cindy-stats">
                    <div className="contact-cindy-stat">
                      <strong>15 ans</strong>
                      <span>d'expérience</span>
                    </div>
                    <div className="contact-cindy-stat">
                      <strong>+500</strong>
                      <span>dossiers</span>
                    </div>
                    <div className="contact-cindy-stat">
                      <strong>0€</strong>
                      <span>de frais</span>
                    </div>
                  </div>
                  <div className="contact-cindy-horaires">
                    <span>🕐</span>
                    <span>Lun–Ven · 9h–18h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MOYENS DE CONTACT ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Choisissez votre canal</span>
              <h2>Comment souhaitez-vous<br />me contacter ?</h2>
              <p>Pas de standard, pas d'attente. Vous parlez directement avec Cindy.</p>
            </div>
            <div className="contact-moyens-grid">
              {MOYENS.map(m => (
                <a
                  key={m.title}
                  href={m.href}
                  className={`contact-moyen-card${m.primary ? ' contact-moyen-card--primary' : ''}`}
                  style={m.primary ? {} : { borderTopColor: m.color }}
                  {...(m.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <div className="contact-moyen-icon" style={{ color: m.color, background: m.bg }}>
                    {m.icon}
                  </div>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                  <div className="contact-moyen-footer">
                    <span className="contact-moyen-cta" style={{ color: m.color }}>
                      {m.cta} 
                    </span>
                    <span className="contact-moyen-detail">{m.detail}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── SUJET DE LA DEMANDE ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Je peux vous aider sur</span>
              <h2>Quel est votre projet ?</h2>
              <p>
                Chaque sujet a sa page dédiée avec toutes les informations clés.
                Consultez-la avant votre rendez-vous pour gagner du temps.
              </p>
            </div>
            <ContactSujetsFilter />
            <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.6, marginTop: 20 }}>
              Votre projet ne figure pas dans la liste ?{' '}
              <a href="mailto:cindy.urbansky@orizia-courtage.fr" style={{ color: 'var(--orizia-primary)', fontWeight: 700 }}>
                Écrivez-moi directement
              </a>
            </p>
          </div>
        </section>

        {/* ── CALENDRIER ── */}
        <section id="calendrier" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">📅 Prise de rendez-vous</span>
              <h2>Réservez votre créneau<br />en quelques secondes</h2>
              <p>
                Choisissez directement dans mon agenda le jour et l'heure qui vous conviennent.
                Vous recevrez une confirmation et un lien de visioconférence par email.
              </p>
            </div>

            {/* Réassurance avant le calendrier */}
            <div className="contact-cal-reassurance">
              <div className="contact-cal-item">
                <span>🎥</span>
                <div>
                  <strong>Visioconférence ou téléphone</strong>
                  <span>Le lien vous est envoyé automatiquement</span>
                </div>
              </div>
              <div className="contact-cal-item">
                <span>⏱️</span>
                <div>
                  <strong>Durée : 15 ou 30 minutes</strong>
                  <span>Pas de préparation nécessaire</span>
                </div>
              </div>
              <div className="contact-cal-item">
                <span>🔄</span>
                <div>
                  <strong>Annulation libre</strong>
                  <span>Modifiable jusqu'à 24h avant</span>
                </div>
              </div>
              <div className="contact-cal-item">
                <span>🎁</span>
                <div>
                  <strong>100% gratuit</strong>
                  <span>Aucune obligation de suite</span>
                </div>
              </div>
            </div>

            <div className="contact-cal-wrapper">
              <iframe
                src="https://cal.eu/cindy-urbansky?embed=true&theme=light"
                style={{
                  width: '100%',
                  minHeight: 680,
                  border: 'none',
                  borderRadius: 16,
                }}
                title="Réserver un rendez-vous avec Cindy Urbansky — Orizia Courtage"
              />
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Questions fréquentes<br />avant de nous contacter</h2>
              <p>Les réponses aux doutes les plus courants — honnêtes et directes.</p>
            </div>
            <div className="crowd-faq-list">
              {FAQ_CONTACT.map((f, i) => (
                <details key={i} className="crowd-faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── RGPD ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="contact-legal-bloc">
              <div className="contact-legal-icon">🔒</div>
              <div>
                <strong>Vos données sont protégées</strong>
                <p>
                  Les informations transmises sont utilisées exclusivement dans le cadre de votre demande.
                  Elles ne sont jamais revendues ni partagées sans votre consentement.
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression.{' '}
                  <Link href="/mentions-legales" style={{ color: 'var(--orizia-primary)' }}>
                    En savoir plus
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
