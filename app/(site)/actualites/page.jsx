import Link from 'next/link';
import ContactPopup from '@/components/ContactPopup';

export const metadata = {
  title: 'Actualités Crédit & Assurance 2026 | Orizia Courtage',
  description:
    'Actualités crédit immobilier, assurance emprunteur et placements. Analyses et décryptages par Cindy Urbansky, courtier indépendant.',
  alternates: { canonical: 'https://www.orizia-courtage.fr/actualites' },
  openGraph: {
    title: 'Actualités Crédit & Assurance 2026 | Orizia Courtage',
    description: 'Taux immobiliers, loi Lemoine, SCPI, PER : les actualités du secteur décryptées par Cindy Urbansky.',
    url: 'https://www.orizia-courtage.fr/actualites',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://www.orizia-courtage.fr/images/hero-orizia.webp',
        width: 1200,
        height: 630,
        alt: 'Orizia Courtage - Cindy Urbansky, courtier indépendant',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Actualités Crédit & Assurance 2026 | Orizia Courtage',
    description: 'Actualités crédit immobilier, assurance emprunteur et placements. Analyses et décryptages par Cindy Urbansky, courtier indépendant.',
    images: ['https://www.orizia-courtage.fr/images/hero-orizia.webp'],
  },
};

const actualitesSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Actualités Orizia Courtage',
  description: 'Actualités du crédit immobilier, de l\'assurance et des placements financiers.',
  url: 'https://www.orizia-courtage.fr/actualites',
  author: {
    '@type': 'Person',
    name: 'Cindy Urbansky',
    jobTitle: 'courtier indépendant',
  },
};

export default function ActualitesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(actualitesSchema) }} />

      <main>
        {/* ── HERO ── */}
        <section className="fin-hero ae-hero" style={{ minHeight: 'auto', paddingBottom: 60 }}>
          <div className="ae-hero-inner fin-hero-inner">
            <nav aria-label="breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: 16 }}>
              <Link href="/" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Accueil</Link>
              {' › '}
              <span>Actualités</span>
            </nav>
            <span className="fin-badge">📰 Marché & Réglementation</span>
            <h1 className="ae-hero-title">Les actualités du secteur</h1>
            <p className="ae-hero-intro">
              Taux immobiliers, évolutions réglementaires, nouvelles lois — je décrypte
              l'actualité du crédit, de l'assurance et des placements pour vous aider
              à prendre les meilleures décisions.
            </p>
          </div>
        </section>

        {/* ── ÉTAT VIDE ── */}
        <section className="crowd-section crowd-section--light" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center' }}>
          <div className="fin-section-inner" style={{ textAlign: 'center', width: '100%' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 20 }}>📰</div>
            <h2 style={{ color: 'var(--orizia-accent)', fontSize: '1.6rem', fontWeight: 900, marginBottom: 12 }}>
              Aucune actualité publiée pour l'instant
            </h2>
            <p style={{ color: 'var(--orizia-dark)', opacity: 0.65, maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.7 }}>
              Les premières actualités arrivent bientôt. En attendant, je reste disponible
              pour répondre à vos questions sur l'évolution des taux ou de la réglementation.
            </p>
            <ContactPopup label="📅 Me poser une question" className="fin-btn-primary" />
          </div>
        </section>
      </main>
    </>
  );
}
