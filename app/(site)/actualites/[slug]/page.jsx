import { notFound } from 'next/navigation';
import ArticleView from '@/components/ArticleView';
import { ArticleListing, listingMetadata } from '@/components/ArticleHub';
import { LISTINGS, SILOS, getArticle, getPublishedArticles, listingKey } from '@/lib/articles.mjs';
import { buildArticleMetadata } from '@/lib/article-meta.mjs';

const TYPE = 'actualite';

// Pages mises en cache, rafraîchies à chaque publication depuis le CRM (et au plus tard toutes les 10 minutes).
export const revalidate = 600;

// Les adresses « financer », « assurer », « investir » et « toutes » sont des listes ; les autres, des articles.
export async function generateStaticParams() {
  const articles = (await getPublishedArticles(TYPE)).map((article) => ({ slug: article.slug }));
  return [...Object.keys(SILOS), LISTINGS[TYPE].all].map((slug) => ({ slug })).concat(articles);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const listing = listingKey(TYPE, slug);
  if (listing) {
    const articles = await getPublishedArticles(TYPE);
    return listingMetadata(TYPE, { silo: listing }, listing === 'all' ? articles.length : articles.filter((article) => article.silo === listing).length);
  }
  const article = await getArticle(TYPE, slug);
  return article ? buildArticleMetadata(article) : {};
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const listing = listingKey(TYPE, slug);
  if (listing) return <ArticleListing type={TYPE} listing={{ silo: listing }} articles={await getPublishedArticles(TYPE)} />;
  const article = await getArticle(TYPE, slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
