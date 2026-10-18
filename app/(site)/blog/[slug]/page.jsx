import { notFound } from 'next/navigation';
import ArticlePage from '@/components/ArticlePage';
import { getPublishedArticle } from '@/lib/articles';
export const dynamic = 'force-dynamic';
export default async function Page({ params }) { const { slug } = await params; const article = await getPublishedArticle('blog', slug); if (!article) notFound(); return <ArticlePage article={article} basePath="/blog" />; }
