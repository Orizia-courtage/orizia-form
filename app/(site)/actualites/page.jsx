import Link from 'next/link';
import ContactPopup from '@/components/ContactPopup';
import ArticleCards from '@/components/ArticleCards';
import { getPublishedArticles } from '@/lib/articles';

export const metadata = { title: 'Actualités Crédit & Assurance | Orizia Courtage', description: 'Actualités crédit immobilier, assurance emprunteur et placements.', alternates: { canonical: 'https://www.orizia-courtage.fr/actualites' } };
export const dynamic = 'force-dynamic';

export default async function ActualitesPage() {
  const articles = await getPublishedArticles('actualite');
  return <main><section className="fin-hero ae-hero" style={{ minHeight: 'auto', paddingBottom: 60 }}><div className="ae-hero-inner fin-hero-inner"><nav aria-label="breadcrumb" style={{ fontSize: '.8rem', opacity: .6, marginBottom: 16 }}><Link href="/" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Accueil</Link>{' › '}<span>Actualités</span></nav><span className="fin-badge">📰 Marché & Réglementation</span><h1 className="ae-hero-title">Les actualités du secteur</h1><p className="ae-hero-intro">Taux immobiliers, évolutions réglementaires et nouvelles lois : l'actualité du crédit, de l'assurance et des placements décryptée.</p></div></section><section className="crowd-section crowd-section--light" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center' }}><div className="fin-section-inner" style={{ textAlign: 'center', width: '100%' }}>{articles.length ? <ArticleCards articles={articles} type="actualite" /> : <><div style={{ fontSize: '3.5rem', marginBottom: 20 }}>📰</div><h2 style={{ color: 'var(--orizia-accent)', fontSize: '1.6rem', fontWeight: 900, marginBottom: 12 }}>Aucune actualité publiée pour l'instant</h2><p style={{ color: 'var(--orizia-dark)', opacity: .65, maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.7 }}>Les premières actualités arrivent bientôt. Je reste disponible pour répondre à vos questions.</p><ContactPopup label="📅 Me poser une question" className="fin-btn-primary" /></>}</div></section></main>;
}
