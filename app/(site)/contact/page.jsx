
import Link from 'next/link';

export const metadata = {
  title: 'Contacter Orizia Courtage — Prenez Rendez-vous Gratuitement',
  description:
    'Contactez Orizia Courtage pour un conseil en crédit immobilier, assurance vie, PER ou investissement. Rendez-vous gratuit, réponse sous 24h. Par téléphone, WhatsApp, email ou visioconférence.',
  keywords: [
    'contacter courtier indépendant',
    'rendez-vous courtier gratuit',
    'conseil crédit immobilier',
    'contact Orizia Courtage',
    'courtier assurance vie',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/contact' },
  openGraph: {
    title: 'Contacter Orizia Courtage — Conseil gratuit & personnalisé',
    description: 'Prenez rendez-vous en quelques clics. Cindy vous répond sous 24h par le canal de votre choix.',
    url: 'https://orizia.fr/contact',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Orizia Courtage',
  description: 'Courtier indépendant en crédit immobilier, assurance vie et investissement.',
  url: 'https://orizia-courtage.fr',
  telephone: '+33777259706',
  email: 'cindy.urbansky@orizia-courtage.fr', // ← remplacer
  sameAs: ['https://www.linkedin.com/in/cindy-urbansky'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '13:00',
    },
  ],
};

const MOYENS = [
  {
    icon: '📅',
    title: 'Prendre rendez-vous',
    desc: 'Choisissez un créneau directement dans mon agenda. Visioconférence ou téléphone.',
    cta: 'Réserver un créneau',
    href: '#calendrier',
    style: 'primary',
    detail: 'Réponse sous 24h garantie',
  },
  {
    icon: '📞',
    title: 'Appeler directement',
    desc: 'Pour une question rapide ou un premier contact sans formalité.',
    cta: 'Appeler Cindy',
    href: 'tel:+33777259706',
    style: 'secondary',
    detail: '+33 7 77 25 97 06',
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    desc: 'Envoyez un message à votre rythme. Je réponds dans la journée.',
    cta: 'Écrire sur WhatsApp',
    href: 'https://wa.me/33777259706',
    style: 'secondary',
    detail: 'Réponse le jour même',
    external: true,
  },
  {
    icon: '✉️',
    title: 'Par email',
    desc: 'Pour toute demande écrite, pièces jointes ou questions détaillées.',
    cta: 'Envoyer un email',
    href: 'mailto:cindy.urbansky@orizia-courtage.fr', // ← remplacer
    style: 'secondary',
    detail: 'cindy.urbansky@orizia-courtage.fr', // ← remplacer
  },
];

const SUJETS = [
  { icon: '🏡', label: 'Crédit immobilier',       href: '/financer/credit-immobilier' },
  { icon: '🛡️', label: 'Assurance vie',           href: '/investir/assurance-vie' },
  { icon: '🏦', label: 'Plan Épargne Retraite',    href: '/investir/per' },
  { icon: '🏢', label: 'SCPI',                     href: '/investir/scpi' },
  { icon: '📈', label: 'Crowdfunding',             href: '/investir/crowdfunding' },
  { icon: '🔄', label: 'Regroupement de crédits',  href: '/financer/regroupement-credits' },
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
    r: 'Tout à fait. En tant que courtier indépendant généraliste, Orizia peut vous accompagner simultanément sur un crédit immobilier, une assurance vie et un PER — avec une vision patrimoniale globale cohérente.',
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <main>

        {/* ── HERO ── */}
        <section className="fin-hero fin-hero--short">
          <div className="fin-hero-bg" />
          <div className="fin-hero-inner">
            <nav aria-label="breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: 16 }}>
              <Link href="/" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Accueil</Link>
              {' › '}
              <span>Contact</span>
            </nav>
            <span className="fin-badge">⚡ Réponse sous 24h</span>
            <h1>Parlons de votre projet</h1>
            <p>
              Crédit immobilier, assurance vie, PER, investissement —
              Cindy analyse votre situation et vous propose une solution adaptée.
              Premier rendez-vous <strong>gratuit et sans engagement</strong>,
              100% en visioconférence.
            </p>
          </div>
        </section>

        {/* ── MOYENS DE CONTACT ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <h2>Choisissez le canal<br />qui vous convient</h2>
              <p>Pas de standard, pas d'attente. Vous parlez directement avec Cindy.</p>
            </div>
            <div className="contact-moyens-grid">
              {MOYENS.map(m => (
                <a
                  key={m.title}
                  href={m.href}
                  className={`contact-moyen-card${m.style === 'primary' ? ' contact-moyen-card--primary' : ''}`}
                  {...(m.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <div className="contact-moyen-icon">{m.icon}</div>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                  <div className="contact-moyen-footer">
                    <span className="contact-moyen-cta">{m.cta} →</span>
                    <span className="contact-moyen-detail">{m.detail}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CINDY + DISPONIBILITÉS ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="contact-profil-bloc">
              <div className="contact-profil-photo">
                <img
                  src="/photo-cindy.jpg"
                  alt="Cindy Urbansky — Orizia Courtage"
                  width={160}
                  height={160}
                />
                <div className="contact-profil-dispo">
                  <span className="contact-dispo-dot" />
                  Disponible
                </div>
              </div>
              <div className="contact-profil-content">
                <span className="fin-badge">Votre interlocutrice</span>
                <h2>Cindy Urbansky<br /><span>Courtière indépendante — Orizia Courtage</span></h2>
                <p>
                  Courtière indépendante, je travaille sans mandat exclusif avec un réseau
                  de partenaires soigneusement sélectionnés : banques, assureurs, investisseurs.
                  Mon objectif est simple — trouver <strong>la meilleure solution pour vous</strong>,
                  pas pour ma banque.
                </p>
                <div className="contact-profil-stats">
                  <div className="contact-stat">
                    <strong>100%</strong>
                    <span>Indépendant</span>
                  </div>
                  <div className="contact-stat">
                    <strong>&lt; 24h</strong>
                    <span>Temps de réponse</span>
                  </div>
                  <div className="contact-stat">
                    <strong>0€</strong>
                    <span>Frais de conseil</span>
                  </div>
                  <div className="contact-stat">
                    <strong>100%</strong>
                    <span>Distanciel</span>
                  </div>
                </div>
                <div className="contact-horaires">
                  <div className="contact-horaires-title">🕐 Disponibilités</div>
                  <div className="contact-horaires-grid">
                    <div className="contact-horaire-item">
                      <span>Lundi — Vendredi</span>
                      <strong>9h00 – 19h00</strong>
                    </div>
                    <div className="contact-horaire-item">
                      <span>Samedi</span>
                      <strong>9h00 – 13h00</strong>
                    </div>
                    <div className="contact-horaire-item contact-horaire-item--off">
                      <span>Dimanche</span>
                      <strong>Fermé</strong>
                    </div>
                  </div>
                  <p className="contact-horaires-note">
                    💡 Hors horaires ? Laissez un message — je vous rappelle dès que possible.
                  </p>
                </div>
              </div>
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
            <div className="contact-sujets-grid">
              {SUJETS.map(s => (
                <Link key={s.label} href={s.href} className="contact-sujet-card">
                  <span className="contact-sujet-icon">{s.icon}</span>
                  <span className="contact-sujet-label">{s.label}</span>
                  <span className="contact-sujet-arrow">→</span>
                </Link>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontSize: '0.85rem', opacity: 0.6, marginTop: 20 }}>
              Votre projet ne figure pas dans la liste ?{' '}
              <a href="mailto:cindy.urbansky@orizia-courtage.fr" style={{ color: 'var(--orizia-primary)', fontWeight: 700 }}>
                Écrivez-moi directement →
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
                  <strong>Durée : 30 à 45 minutes</strong>
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

        {/* ── MENTIONS LÉGALES CONTACT ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="contact-legal-bloc">
              <div className="contact-legal-icon">🔒</div>
              <div>
                <strong>Vos données sont protégées</strong>
                <p>
                  Les informations transmises via ce formulaire ou par email sont utilisées
                  exclusivement dans le cadre de votre demande. Elles ne sont jamais
                  revendues ni partagées avec des tiers sans votre consentement explicite.
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification
                  et de suppression de vos données.{' '}
                  <Link href="/mentions-legales" style={{ color: 'var(--orizia-primary)' }}>
                    En savoir plus →
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