// Métadonnées SEO d'un article : title, description, canonical, Open Graph, Twitter, robots.
import { ROBOTS } from '@/lib/indexing.mjs';
import { AUTHOR, BASE_URL, SILOS, articleUrl } from '@/lib/articles.mjs';

export function buildArticleMetadata(article) {
  const url = articleUrl(article);
  const title = /orizia/i.test(article.metaTitle) ? article.metaTitle : `${article.metaTitle} | Orizia`;
  // Image de partage aux couleurs de la marque, composée à partir de la photo principale de l'article.
  const version = Date.parse(article.updatedAt || article.publishedAt || '') || 0;
  const images = [{ url: `${BASE_URL}/og/article/${article.type}/${article.slug}.jpg?v=${version.toString(36)}`, width: 1200, height: 630, alt: article.title }];

  return {
    title: { absolute: title },
    description: article.metaDescription,
    keywords: article.keywords?.length ? article.keywords : undefined,
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    robots: ROBOTS,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: article.metaTitle,
      description: article.metaDescription,
      url,
      siteName: 'Orizia Courtage',
      locale: 'fr_FR',
      images,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [AUTHOR.url],
      section: article.silo ? SILOS[article.silo].label : undefined,
      tags: article.keywords?.length ? article.keywords : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
      images: images.map((image) => image.url),
    },
  };
}
