// Métadonnées SEO d'un article : title, description, canonical, Open Graph, Twitter, robots.
import { ROBOTS } from '@/lib/indexing.mjs';
import { AUTHOR, SILOS, absoluteUrl, articleUrl } from '@/lib/articles.mjs';

export function buildArticleMetadata(article) {
  const url = articleUrl(article);
  const title = /orizia/i.test(article.metaTitle) ? article.metaTitle : `${article.metaTitle} | Orizia`;
  const images = article.image
    ? [{ url: absoluteUrl(article.image.url), width: article.image.width, height: article.image.height, alt: article.image.alt }]
    : [{ url: absoluteUrl(article.type === 'blog' ? '/images/og-blog.jpg' : '/images/og-actualites.jpg'), width: 1200, height: 630, alt: article.title }];

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
