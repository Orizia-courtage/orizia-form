import Link from 'next/link';
import Image from 'next/image';
import ContactPopup from '@/components/ContactPopup';
import Icon from '@/components/Icon';
import CtaPresence from '@/components/CtaPresence';
import CreditWarning from '@/components/CreditWarning';
import { ROBOTS } from '@/lib/indexing.mjs';
import { plainMetadata } from '@/lib/share.mjs';
import { COMPANY, COMPANY_IDENTIFIERS, CREDIT_STATUS } from '@/lib/company.mjs';

const PATH = '/courtier-marcq-en-baroeul';
const URL = `${COMPANY.url}${PATH}`;
const LOCAL_LINE = 'Basée à Marcq-en-Barœul, rendez-vous en visio ou au cabinet.';

export const metadata = {
  ...plainMetadata({
    path: PATH,
    title: 'Courtier à Marcq-en-Barœul : crédit, assurance, placements | Orizia Courtage',
    description: `Cindy Urbansky, courtière indépendante à Marcq-en-Barœul (59700) : crédit immobilier, assurance emprunteur, placements. ${LOCAL_LINE}`,
  }),
  robots: ROBOTS,
};

const VILLES = ['Marcq-en-Barœul', 'Lille', 'La Madeleine', 'Mouvaux', 'Wasquehal', 'Bondues', 'Croix', 'Lambersart', 'Roubaix', 'Tourcoing', "Villeneuve-d'Ascq"];

const FAQ = [
  {
    q: 'Où se trouve le cabinet Orizia Courtage ?',
    r: `Le cabinet se trouve ${COMPANY.addressInline}. Je vous reçois sur rendez-vous, au cabinet ou en visioconférence, selon ce qui vous arrange.`,
  },
  {
    q: 'Faut-il venir au cabinet pour monter son dossier ?',
    r: 'Non. Vous pouvez venir au cabinet à Marcq-en-Barœul ou faire tout le parcours en visio et par téléphone. Les documents se transmettent en ligne, de façon sécurisée.',
  },
  {
    q: 'Intervenez-vous en dehors de Marcq-en-Barœul ?',
    r: 'Oui. J’accompagne des clients dans toute la métropole lilloise (Lille, La Madeleine, Mouvaux, Wasquehal, Bondues, Croix, Roubaix, Tourcoing…) et, en visio, partout en France.',
  },
  {
    q: 'Combien coûte un rendez-vous ?',
    r: 'Le premier rendez-vous est un échange de découverte, sans engagement. Les frais et modalités de l’accompagnement sont présentés de manière transparente avant tout engagement.',
  },
];

const SERVICES = [
  { icon: 'landmark', title: 'Financer', href: '/financer', text: 'Crédit immobilier, regroupement de crédits, prêt personnel, rachat de soulte : je compare les offres de plus de 40 banques pour votre projet dans la métropole lilloise.' },
  { icon: 'shield-check', title: 'Assurer', href: '/assurer', text: 'Assurance emprunteur, habitation, auto et moto : je mets les assureurs en concurrence et je m’occupe des démarches de changement de contrat.' },
  { icon: 'chart-column', title: 'Investir', href: '/investir', text: 'Assurance vie, PER, SCPI, crowdfunding : je construis avec vous une stratégie adaptée à vos objectifs et à votre profil.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: COMPANY.url },
        { '@type': 'ListItem', position: 2, name: 'Courtier à Marcq-en-Barœul', item: URL },
      ],
    },
    {
      '@type': ['FinancialService', 'LocalBusiness'],
      '@id': `${URL}#localbusiness`,
      name: 'Orizia Courtage',
      legalName: COMPANY.denomination,
      url: URL,
      image: `${COMPANY.url}/images/photo-cindy-gp.webp`,
      telephone: COMPANY.phoneE164,
      email: COMPANY.contactEmail,
      identifier: COMPANY_IDENTIFIERS,
      parentOrganization: { '@id': `${COMPANY.url}/#organization` },
      founder: { '@type': 'Person', name: COMPANY.manager },
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY.address.street,
        postalCode: COMPANY.address.postalCode,
        addressLocality: COMPANY.address.city,
        addressRegion: COMPANY.address.region,
        addressCountry: COMPANY.address.country,
      },
      areaServed: VILLES.map((name) => ({ '@type': 'City', name })),
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, r }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: r } })),
    },
  ],
};

export default function CourtierMarcqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main>

        {/* ── HERO ── */}
        <section className="qsj-hero">
          <div className="qsj-hero-inner">
            <nav aria-label="breadcrumb" className="qsj-breadcrumb">
              <Link href="/">Accueil</Link>
              <span>›</span>
              <span>Courtier à Marcq-en-Barœul</span>
            </nav>
            <div className="qsj-hero-layout">
              <div className="qsj-hero-photo-wrap">
                <div className="qsj-hero-photo">
                  <Image
                    src="/images/photo-cindy-gp.webp"
                    quality={90}
                    alt="Cindy Urbansky, courtière indépendante à Marcq-en-Barœul"
                    fill
                    style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                    priority
                    sizes="(max-width: 768px) 280px, 360px"
                  />
                </div>
              </div>
              <div className="qsj-hero-text">
                <span className="fin-badge"><Icon name="map-pin" /> Marcq-en-Barœul · 59700</span>
                <h1 className="qsj-hero-title">Votre courtier à Marcq-en-Barœul</h1>
                <p className="qsj-hero-subtitle">{LOCAL_LINE}</p>
                <p className="qsj-hero-desc">
                  Je suis Cindy Urbansky, fondatrice d’Orizia Courtage. Installée à <strong>Marcq-en-Barœul
                  depuis plus de 10 ans</strong>, je vous accompagne pour votre crédit, vos assurances et vos
                  placements, avec une seule interlocutrice du premier échange à la signature.
                </p>
                <p className="qsj-hero-desc">
                  <strong><Icon name="map-pin" /> {COMPANY.addressInline}</strong><br />
                  <a href={`tel:${COMPANY.phoneE164}`} style={{ color: '#3e7f68', fontWeight: 700 }}>{COMPANY.phone}</a>
                  {' · '}Lun–Ven, 9h–18h, sur rendez-vous
                </p>
                <div className="qsj-hero-actions">
                  <Link href="/contact#calendrier" className="fin-btn-primary"><Icon name="calendar-days" /> Prendre rendez-vous</Link>
                  <ContactPopup label="M'écrire" icon="mail" className="fin-btn-secondary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CABINET OU VISIO ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge"><Icon name="handshake" /> Rendez-vous</span>
              <h2>Au cabinet ou en visio,<br />comme vous préférez</h2>
              <p>Vous choisissez la formule qui vous convient. Le suivi est le même dans les deux cas.</p>
            </div>
            <div className="crowd-2col">
              {[
                { icon: 'building-2', titre: 'Au cabinet à Marcq-en-Barœul', desc: `Je vous reçois ${COMPANY.addressInline}, sur rendez-vous, pour faire le point sur votre projet de vive voix.` },
                { icon: 'laptop', titre: 'En visio ou par téléphone', desc: 'Depuis chez vous ou votre bureau, sans vous déplacer. Le lien de visioconférence vous est envoyé par e-mail.' },
              ].map((item) => (
                <div key={item.titre} className="crowd-schema-step" style={{ background: 'var(--orizia-light)', borderRadius: 12, padding: '18px 20px' }}>
                  <div className="crowd-schema-icon"><Icon name={item.icon} /></div>
                  <div className="crowd-schema-text">
                    <strong>{item.titre}</strong>
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mes services</span>
              <h2>Crédit, assurance et placements<br />dans la métropole lilloise</h2>
              <p>
                Je ne suis liée à aucune banque ni à aucun assureur par un contrat d’exclusivité.
                Je compare le marché pour rechercher la solution adaptée à votre situation.
              </p>
            </div>
            <div className="fin-cards">
              {SERVICES.map((s) => (
                <Link href={s.href} key={s.title} className="fin-card">
                  <div className="fin-card-icon"><Icon name={s.icon} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="fin-card-link">Découvrir <Icon name="arrow-right" className="oz-arrow" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── ANCRAGE LOCAL ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge"><Icon name="map-pin" /> Ancrage local</span>
              <h2>Une courtière qui connaît<br />le marché de la métropole lilloise</h2>
              <p>
                Prix au m² de Marcq-en-Barœul et des communes voisines, agences bancaires de la région,
                notaires et agents immobiliers du secteur : cette connaissance du terrain m’aide à présenter
                votre dossier dans les meilleures conditions.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              {VILLES.map((v) => (
                <span key={v} style={{ background: 'rgba(45,106,95,0.08)', color: '#3e7f68', border: '1px solid rgba(45,106,95,0.2)', borderRadius: 100, padding: '4px 12px', fontSize: '0.8rem', fontWeight: 700 }}>
                  <Icon name="map-pin" /> {v}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner" style={{ maxWidth: 800 }}>
            <div className="fin-section-head">
              <span className="fin-badge">Questions fréquentes</span>
              <h2>Votre courtier à Marcq-en-Barœul :<br />vos questions</h2>
            </div>
            {FAQ.map(({ q, r }) => (
              <details key={q} style={{ borderBottom: '1px solid rgba(45,106,95,0.15)', padding: '14px 0' }}>
                <summary style={{ fontWeight: 800, cursor: 'pointer' }}>{q}</summary>
                <p style={{ marginTop: 10 }}>{r}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-light)' }}>
          <div className="fin-cta-inner">
            <CtaPresence />
            <h2>Parlons de votre projet</h2>
            <p>{LOCAL_LINE} Premier rendez-vous sans engagement.</p>
            <div className="fin-hero-btns" style={{ justifyContent: 'center' }}>
              <Link href="/contact#calendrier" className="fin-btn-primary"><Icon name="calendar-days" /> Prendre rendez-vous</Link>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', maxWidth: 540, margin: '24px auto 0' }}>
              <CreditWarning />
              Aucun versement de quelque nature que ce soit ne peut être exigé d’un particulier, avant l’obtention d’un ou plusieurs prêts d’argent.{' '}
              {CREDIT_STATUS}{' '}
              <Link href="/mentions-legales" style={{ color: '#3e7f68' }}>Mentions légales</Link>.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
