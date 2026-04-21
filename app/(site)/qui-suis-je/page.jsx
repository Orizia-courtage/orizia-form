import Image from 'next/image';
import Link from 'next/link';
import ContactPopup from '@/components/ContactPopup';
import TemoignagesCarousel from '@/components/TemoignagesCarousel';

export const metadata = {
  title: 'Qui suis-je ? Cindy Urbansky, Courtière Indépendante | Orizia Courtage',
  description:
    'Cindy Urbansky, courtière indépendante à Marcq-en-Barœul (Hauts-de-France). 15+ ans d\'expérience en crédit, assurance et gestion de patrimoine. Présidente de l\'AFIB. Découvrez mon parcours.',
  alternates: { canonical: 'https://orizia-courtage.fr/qui-suis-je' },
  openGraph: {
    title: 'Cindy Urbansky — Courtière Indépendante | Orizia Courtage',
    description: '15+ ans d\'expérience en crédit immobilier, assurance et patrimoine. Présidente de l\'AFIB. Basée à Marcq-en-Barœul, Hauts-de-France.',
    url: 'https://orizia-courtage.fr/qui-suis-je',
    siteName: 'Orizia Courtage',
    images: [{ url: 'https://orizia-courtage.fr/images/photo-cindy.webp', width: 800, height: 800, alt: 'Cindy Urbansky - Orizia Courtage' }],
    locale: 'fr_FR',
    type: 'profile',
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Cindy Urbansky',
  jobTitle: 'Courtière indépendante en crédit, assurance et gestion de patrimoine',
  description: 'Courtière indépendante certifiée ORIAS, fondatrice d\'Orizia Courtage à Marcq-en-Barœul. Présidente du conseil de surveillance de l\'AFIB. Plus de 15 ans d\'expérience dans l\'intermédiation bancaire et l\'assurance.',
  image: 'https://orizia-courtage.fr/images/photo-cindy.webp',
  url: 'https://orizia-courtage.fr/qui-suis-je',
  sameAs: ['https://www.linkedin.com/in/cindy-urbansky-034323162/'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Marcq-en-Barœul',
    addressRegion: 'Hauts-de-France',
    addressCountry: 'FR',
  },
  worksFor: {
    '@type': 'LocalBusiness',
    name: 'Orizia Courtage',
    url: 'https://orizia-courtage.fr',
  },
  alumniOf: { '@type': 'EducationalOrganization', name: 'ISCI — BTS Commerce & Management' },
  knowsAbout: ['Crédit immobilier', 'Assurance emprunteur', 'Regroupement de crédits', 'SCPI', 'PER', 'Assurance vie', 'Gestion de patrimoine', 'Intermédiation bancaire'],
};

const PARCOURS = [
  {
    periode: '2025 – Présent',
    poste: 'Directrice',
    entreprise: 'Simply Miob',
    type: 'CDI',
    icon: '🏢',
    color: 'var(--orizia-primary)',
  },
  {
    periode: '2021 – Présent',
    poste: 'Présidente du conseil de surveillance',
    entreprise: 'AFIB — Association Française des Intermédiaires en Bancassurance',
    type: 'Indépendant',
    icon: '⚖️',
    color: '#7c3aed',
    highlight: true,
  },
  {
    periode: '2023 – 2025',
    poste: 'Directrice commerciale des réseaux Crédit Libra et Simply MIOB',
    entreprise: 'Premista',
    type: 'CDI',
    icon: '📊',
    color: '#d97706',
  },
  {
    periode: '2017 – 2023',
    poste: 'Responsable Brookéo',
    entreprise: 'Brookéo — Groupe VILAVI',
    type: 'CDI · Hauts-de-France',
    icon: '🤝',
    color: 'var(--orizia-primary)',
    desc: 'Pilotage de la politique commerciale, animation des partenariats, gestion prévisionnelle des équipes au niveau national.',
  },
  {
    periode: '2014 – 2017',
    poste: 'Responsable d\'équipe',
    entreprise: 'FRANFINANCE',
    type: 'CDI · Marcq-en-Barœul',
    icon: '👥',
    color: '#16a34a',
  },
  {
    periode: '2013',
    poste: 'Responsable commerciale',
    entreprise: 'Avon',
    type: 'CDI · Nord',
    icon: '💼',
    color: '#0369a1',
  },
  {
    periode: '2011 – 2013',
    poste: 'Courtier en regroupement de crédits (IOBSP)',
    entreprise: 'Indépendant',
    type: 'Nord',
    icon: '🔄',
    color: '#d97706',
  },
  {
    periode: '2008 – 2010',
    poste: 'Analyste en regroupement de crédits',
    entreprise: 'Empruntis',
    type: 'CDI · Île-de-France',
    icon: '📋',
    color: 'var(--orizia-primary)',
  },
  {
    periode: '2005 – 2008',
    poste: 'Conseiller banque particulier',
    entreprise: 'LCL',
    type: 'CDI · Les Ulis, Île-de-France',
    icon: '🏦',
    color: '#dc2626',
  },
];

const CHIFFRES = [
  { val: '15+', label: 'Ans d\'expérience', icon: '📅' },
  { val: '2005', label: 'Début de carrière dans la banque', icon: '🏦' },
  { val: 'AFIB', label: 'Présidente du conseil de surveillance', icon: '⚖️' },
  { val: 'ORIAS', label: 'Immatriculée & certifiée', icon: '🛡️' },
];

export default function QuiSuisJePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <main>

        {/* ── HERO ── */}
        <section className="qsj-hero">
          <div className="qsj-hero-inner">
            <nav aria-label="breadcrumb" className="qsj-breadcrumb">
              <Link href="/">Accueil</Link>
              <span>›</span>
              <span>Qui suis-je ?</span>
            </nav>

            <div className="qsj-hero-layout">
              {/* Photo */}
              <div className="qsj-hero-photo-wrap">
                <div className="qsj-hero-photo">
                  <Image
                    src="/images/photo-cindy.webp"
                    alt="Cindy Urbansky — Courtière indépendante, fondatrice d'Orizia Courtage"
                    fill
                    style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                    priority
                    sizes="(max-width: 768px) 280px, 360px"
                  />
                </div>
                <div className="qsj-hero-photo-badge">
                  <span>🏆</span>
                  <div>
                    <strong>15+ ans</strong>
                    <span>d'expérience</span>
                  </div>
                </div>
              </div>

              {/* Texte */}
              <div className="qsj-hero-text">
                <span className="fin-badge">👋 Courtière indépendante · Hauts-de-France</span>
                <h1 className="qsj-hero-title">
                  Cindy Urbansky
                </h1>
                <p className="qsj-hero-subtitle">
                  Fondatrice d'Orizia Courtage · Présidente de l'AFIB
                </p>
                <p className="qsj-hero-desc">
                  Née dans le Nord, installée à <strong>Marcq-en-Barœul depuis plus de 10 ans</strong>,
                  j'ai construit ma carrière dans l'intermédiation bancaire depuis 2005 — d'abord
                  comme conseillère en banque, puis analyste crédit, courtière indépendante,
                  directrice commerciale, et aujourd'hui fondatrice d'Orizia Courtage.
                </p>
                <p className="qsj-hero-desc">
                  Ce qui me motive depuis le début ? <strong>Défendre les intérêts des particuliers
                  face aux établissements financiers.</strong> Pas de quota, pas de conflit d'intérêts —
                  juste une professionnelle engagée pour vous obtenir les meilleures conditions.
                </p>
                <div className="qsj-hero-actions">
                  <ContactPopup label="📅 Contactez-moi" className="fin-btn-primary" />
                  <a
                    href="https://www.linkedin.com/in/cindy-urbansky-034323162/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fin-btn-secondary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
        <section className="fin-chiffres">
          <div className="ae-chiffres-inner fin-chiffres-inner">
            {CHIFFRES.map(c => (
              <div key={c.label} className="fin-chiffre">
                <strong>{c.icon} {c.val}</strong>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── MON HISTOIRE ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge">Mon histoire</span>
                <h2>De la banque de détail<br />à l'indépendance totale</h2>
                <p>
                  Tout a commencé en 2005 chez LCL, où j'ai appris les fondamentaux de la relation
                  bancaire et du crédit. Puis Empruntis, où j'ai découvert l'analyse crédit et
                  le regroupement de dettes — un métier qui m'a passionnée par sa complexité
                  et son impact direct sur la vie des gens.
                </p>
                <p>
                  Après une expérience en indépendant, j'ai rejoint le groupe VILAVI pendant
                  près de 6 ans pour piloter le réseau Brookéo à l'échelle nationale. C'est là
                  que j'ai développé une vision globale du marché de l'intermédiation bancaire —
                  ses forces, ses dérives, et ce qui manquait : <strong>un accompagnement vraiment
                  indépendant, centré sur le client.</strong>
                </p>
                <p>
                  Orizia Courtage est née de cette conviction. Installée à Marcq-en-Barœul,
                  au cœur des Hauts-de-France, je travaille seule — sans délégation, sans
                  intermédiaire — pour défendre exclusivement vos intérêts.
                </p>
              </div>
              <div className="crowd-schema">
                <div style={{ textAlign: 'center', marginBottom: 20, fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--orizia-primary)' }}>
                  Mon engagement
                </div>
                {[
                  { icon: '🎯', titre: 'Indépendance totale', desc: 'Aucun lien exclusif avec une banque ou un assureur. Je travaille pour vous, pas pour eux.' },
                  { icon: '🔍', titre: 'Expertise terrain', desc: '15+ ans dans l\'intermédiation bancaire, de l\'analyse crédit à la direction commerciale nationale.' },
                  { icon: '🤝', titre: 'Relation directe', desc: 'Vous parlez toujours à moi. Pas à un centre d\'appels, pas à un assistant.' },
                  { icon: '⚖️', titre: 'Engagement sectoriel', desc: 'Présidente de l\'AFIB — je contribue à l\'amélioration des pratiques du secteur.' },
                ].map(e => (
                  <div key={e.titre} className="crowd-schema-step" style={{ marginBottom: 12 }}>
                    <div className="crowd-schema-icon">{e.icon}</div>
                    <div className="crowd-schema-text">
                      <strong>{e.titre}</strong>
                      <span>{e.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PARCOURS ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Parcours professionnel</span>
              <h2>20 ans d'expérience<br />dans la finance et le crédit</h2>
              <p>De conseillère bancaire à fondatrice de cabinet de courtage — chaque étape a renforcé mon expertise au service de mes clients.</p>
            </div>

            <div className="qsj-timeline">
              {PARCOURS.map((p, i) => (
                <div key={i} className={`qsj-timeline-item${p.highlight ? ' qsj-timeline-item--highlight' : ''}`}>
                  <div className="qsj-timeline-dot" style={{ background: p.color }}>
                    {p.icon}
                  </div>
                  <div className="qsj-timeline-content">
                    <div className="qsj-timeline-periode">{p.periode}</div>
                    <div className="qsj-timeline-poste" style={{ color: p.color }}>{p.poste}</div>
                    <div className="qsj-timeline-entreprise">{p.entreprise}</div>
                    {p.type && <div className="qsj-timeline-type">{p.type}</div>}
                    {p.desc && <p className="qsj-timeline-desc">{p.desc}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Formation */}
            <div className="qsj-formation">
              <div className="qsj-formation-icon">🎓</div>
              <div>
                <div className="qsj-formation-titre">BTS Commerce & Management</div>
                <div className="qsj-formation-ecole">ISCI · 2003 – 2005</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGES ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Ce qu'ils disent de moi</span>
              <h2>Recommandations LinkedIn<br />de mes pairs et partenaires</h2>
              <p>Des professionnels du secteur qui ont travaillé avec moi et témoignent de mon engagement.</p>
            </div>

            <TemoignagesCarousel />
          </div>
        </section>

        {/* ── MARCQ-EN-BARŒUL ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge">📍 Ancrée dans les Hauts-de-France</span>
                <h2>Marcq-en-Barœul,<br />ma ville depuis plus de 10 ans</h2>
                <p>
                  Installée à Marcq-en-Barœul depuis plus d'une décennie, je connais
                  intimement le marché immobilier et financier de la métropole lilloise.
                  Les prix au m², les quartiers qui montent, les banques locales les plus
                  réactives, les notaires de confiance — cette connaissance terrain est
                  un avantage concret pour mes clients de la région.
                </p>
                <p>
                  Mais je travaille aussi à distance, en visioconférence, pour accompagner
                  des clients partout en France. La proximité géographique n'est pas
                  une condition — l'engagement, lui, est toujours au rendez-vous.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
                  {['Marcq-en-Barœul', 'Lille', 'Villeneuve d\'Ascq', 'Roubaix', 'Tourcoing', 'Hauts-de-France'].map(v => (
                    <span key={v} style={{
                      background: 'rgba(45,106,95,0.08)',
                      color: 'var(--orizia-primary)',
                      border: '1px solid rgba(45,106,95,0.2)',
                      borderRadius: 100,
                      padding: '4px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                    }}>
                      📍 {v}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: '🏠', titre: 'Marché immobilier local', desc: 'Connaissance fine des prix et des tendances de la métropole lilloise.' },
                  { icon: '🏦', titre: 'Réseau bancaire régional', desc: 'Relations établies avec les agences locales pour des réponses plus rapides.' },
                  { icon: '🤝', titre: 'Réseau de partenaires', desc: 'Notaires, agents immobiliers, experts-comptables — un écosystème de confiance.' },
                  { icon: '💻', titre: 'Accompagnement à distance', desc: 'Visioconférence disponible pour les clients hors région.' },
                ].map(item => (
                  <div key={item.titre} style={{
                    display: 'flex', gap: 14, alignItems: 'flex-start',
                    background: 'var(--orizia-light)', borderRadius: 12, padding: '14px 16px',
                    border: '1px solid rgba(45,106,95,0.1)',
                  }}>
                    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--orizia-accent)', marginBottom: 3 }}>{item.titre}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--orizia-dark)', opacity: 0.65, lineHeight: 1.4 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-light)' }}>
          <div className="fin-cta-inner">
            <h2>Travaillons ensemble</h2>
            <p>
              Que vous ayez un projet immobilier, un crédit à optimiser ou un patrimoine
              à construire — je suis là pour vous accompagner avec la même rigueur
              et le même engagement que j'apporte à chaque dossier.
            </p>
            <div className="fin-hero-btns" style={{ justifyContent: 'center' }}>
              <ContactPopup label="✉️ M'envoyer un message" className="fin-btn-primary" />
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
