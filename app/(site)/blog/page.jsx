import Link from 'next/link';
import ContactPopup from '@/components/ContactPopup';
import ArticleCards from '@/components/ArticleCards';
import { getPublishedArticles } from '@/lib/articles';

export const metadata = { title: 'Blog : Conseils Crédit, Assurance & Patrimoine | Orizia', description: 'Conseils pratiques en crédit immobilier, assurance emprunteur, SCPI, PER et patrimoine.', alternates: { canonical: 'https://www.orizia-courtage.fr/blog' } };
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const articles = await getPublishedArticles('blog');
  return <main><section className="fin-hero ae-hero" style={{ minHeight: 'auto', paddingBottom: 60 }}><div className="ae-hero-inner fin-hero-inner"><nav aria-label="breadcrumb" style={{ fontSize: '.8rem', opacity: .6, marginBottom: 16 }}><Link href="/" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Accueil</Link>{' › '}<span>Blog</span></nav><span className="fin-badge">✍️ Conseils & Expertise</span><h1 className="ae-hero-title">Le blog Orizia</h1><p className="ae-hero-intro">Des conseils concrets sur le crédit immobilier, l'assurance, les placements et la gestion de patrimoine.</p></div></section><section className="crowd-section crowd-section--light" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center' }}><div className="fin-section-inner" style={{ textAlign: 'center', width: '100%' }}>{articles.length ? <ArticleCards articles={articles} type="blog" /> : <><div style={{ fontSize: '3.5rem', marginBottom: 20 }}>✍️</div><h2 style={{ color: 'var(--orizia-accent)', fontSize: '1.6rem', fontWeight: 900, marginBottom: 12 }}>Aucun article publié pour l'instant</h2><p style={{ color: 'var(--orizia-dark)', opacity: .65, maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.7 }}>Les premiers articles arrivent bientôt. En attendant, n'hésitez pas à me contacter directement.</p><ContactPopup label="📅 Poser une question à Cindy" className="fin-btn-primary" /></>}</div></section></main>;
}
