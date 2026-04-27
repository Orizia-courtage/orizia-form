import Link from 'next/link';
import ContactPopup from '@/components/ContactPopup';

export const metadata = {
  title: 'Blog : Conseils Crédit, Assurance & Patrimoine | Orizia',
  description:
    'Conseils pratiques en crédit immobilier, assurance emprunteur, SCPI, PER et patrimoine. Articles par Cindy Urbansky, courtier indépendant.',
  alternates: { canonical: 'https://www.orizia-courtage.fr/blog' },
  openGraph: {
    title: 'Blog : Conseils Crédit, Assurance & Patrimoine | Orizia',
    description: 'Conseils pratiques en crédit immobilier, assurance et investissement par Cindy Urbansky, courtier indépendant.',
    url: 'https://www.orizia-courtage.fr/blog',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://www.orizia-courtage.fr/images/og-blog.webp',
        width: 1200,
        height: 630,
        alt: 'Blog conseils crédit, assurance et patrimoine — Orizia Courtage',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog : Conseils Crédit, Assurance & Patrimoine | Orizia',
    description: 'Conseils pratiques en crédit immobilier, assurance emprunteur, SCPI, PER et patrimoine. Articles par Cindy Urbansky, courtier indépendant.',
    images: ['https://www.orizia-courtage.fr/images/og-blog.webp'],
  },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Blog Orizia Courtage',
  description: 'Conseils en crédit immobilier, assurance emprunteur, SCPI, PER et gestion de patrimoine.',
  url: 'https://www.orizia-courtage.fr/blog',
  author: {
    '@type': 'Person',
    name: 'Cindy Urbansky',
    jobTitle: 'courtier indépendant',
    url: 'https://www.orizia-courtage.fr/qui-suis-je',
  },
};

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      <main>
        {/* ── HERO ── */}
        <section className="fin-hero ae-hero" style={{ minHeight: 'auto', paddingBottom: 60 }}>
          <div className="ae-hero-inner fin-hero-inner">
            <nav aria-label="breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: 16 }}>
              <Link href="/" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Accueil</Link>
              {' › '}
              <span>Blog</span>
            </nav>
            <span className="fin-badge">✍️ Conseils & Expertise</span>
            <h1 className="ae-hero-title">Le blog Orizia</h1>
            <p className="ae-hero-intro">
              Des conseils concrets sur le crédit immobilier, l'assurance, les placements
              et la gestion de patrimoine — rédigés par Cindy Urbansky, courtier indépendant
              dans les Hauts-de-France.
            </p>
          </div>
        </section>

        {/* ── ÉTAT VIDE ── */}
        <section className="crowd-section crowd-section--light" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center' }}>
          <div className="fin-section-inner" style={{ textAlign: 'center', width: '100%' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 20 }}>✍️</div>
            <h2 style={{ color: 'var(--orizia-accent)', fontSize: '1.6rem', fontWeight: 900, marginBottom: 12 }}>
              Aucun article publié pour l'instant
            </h2>
            <p style={{ color: 'var(--orizia-dark)', opacity: 0.65, maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.7 }}>
              Les premiers articles arrivent bientôt. En attendant, n'hésitez pas à me contacter
              directement pour toute question sur votre projet financier.
            </p>
            <ContactPopup label="📅 Poser une question à Cindy" className="fin-btn-primary" />
          </div>
        </section>
      </main>
    </>
  );
}
