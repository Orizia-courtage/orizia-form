import Image from 'next/image';
import Link from 'next/link';
import { ARTICLE_TYPES, SILOS, articlePath, formatDate } from '@/lib/articles.mjs';

export default function ArticleCard({ article, heading: Heading = 'h3' }) {
  const silo = article.silo ? SILOS[article.silo] : null;
  return (
    <article className="oza-card">
      {article.image && (
        <Image
          className="oza-card-image"
          src={article.image.url}
          alt=""
          width={article.image.width}
          height={article.image.height}
          sizes="(max-width: 700px) 100vw, 380px"
        />
      )}
      <div className="oza-card-body">
        <p className="oza-card-tag">{silo ? silo.label : ARTICLE_TYPES[article.type].label}{article.pillar ? ' · Guide' : ''}</p>
        <Heading className="oza-card-title">
          <Link href={articlePath(article)}>{article.title}</Link>
        </Heading>
        <p className="oza-card-excerpt">{article.excerpt}</p>
        <p className="oza-card-meta">
          {article.publishedAt && <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>}
          {' · '}{article.readMinutes} min
        </p>
      </div>
    </article>
  );
}
