import { notFound } from 'next/navigation';
import ArticleView from '@/components/ArticleView';
import { getArticle, isValidPreviewToken } from '@/lib/articles.mjs';

// Aperçu d'un article avant publication, ouvert depuis le CRM.
// Accessible uniquement avec le lien signé ; jamais indexé ni mis en cache.
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Aperçu de l’article | Orizia',
  robots: { index: false, follow: false, nocache: true },
};

export default async function ArticlePreviewPage({ params, searchParams }) {
  const { type, slug } = await params;
  const { t } = await searchParams;
  if (!isValidPreviewToken(type, slug, t)) notFound();
  const article = await getArticle(type, slug, { includeDrafts: true });
  if (!article) notFound();
  return <ArticleView article={article} preview />;
}
