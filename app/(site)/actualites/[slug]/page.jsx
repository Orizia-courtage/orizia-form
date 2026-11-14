import { notFound } from 'next/navigation';
import ArticleView from '@/components/ArticleView';
import { getArticle, getPublishedArticles } from '@/lib/articles.mjs';
import { buildArticleMetadata } from '@/lib/article-meta.mjs';

const TYPE = 'actualite';

// Pages mises en cache, rafraîchies à chaque publication depuis le CRM (et au plus tard toutes les 10 minutes).
export const revalidate = 600;

export async function generateStaticParams() {
  return (await getPublishedArticles(TYPE)).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(TYPE, slug);
  return article ? buildArticleMetadata(article) : {};
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticle(TYPE, slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
