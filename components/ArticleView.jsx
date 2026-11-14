import Image from 'next/image';
import Link from 'next/link';
import ContactPopup from '@/components/ContactPopup';
import ArticleCard from '@/components/ArticleCard';
import { COMPANY } from '@/lib/company.mjs';
import {
  ARTICLE_TYPES, AUTHOR, BASE_URL, SILOS, SITE_PAGES,
  absoluteUrl, articleUrl, formatDate, getRelatedArticles, siloNotice,
} from '@/lib/articles.mjs';
import { renderArticleBody } from '@/lib/article-render.mjs';
import '@/app/(site)/article.css';

const jsonLd = (data) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') });

function buildSchemas(article) {
  const type = ARTICLE_TYPES[article.type];
  const silo = article.silo ? SILOS[article.silo] : null;
  const url = articleUrl(article);

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': type.schemaType,
      headline: article.title,
      description: article.metaDescription,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      inLanguage: 'fr-FR',
      datePublished: article.publishedAt,
      dateModified: article.updatedAt || article.publishedAt,
      wordCount: article.words,
      ...(article.image ? { image: [absoluteUrl(article.image.url)] } : {}),
      ...(silo ? { articleSection: silo.label } : {}),
      ...(article.keywords?.length ? { keywords: article.keywords.join(', ') } : {}),
      author: { '@type': 'Person', name: AUTHOR.name, jobTitle: AUTHOR.jobTitle, url: AUTHOR.url },
      publisher: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: COMPANY.legalName,
        url: BASE_URL,
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/Orizia_logo.webp` },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: type.label, item: `${BASE_URL}${type.path}` },
        { '@type': 'ListItem', position: 3, name: article.title, item: url },
      ],
    },
  ];

  if (article.faq?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }
  return schemas;
}

export default async function ArticleView({ article, preview = false }) {
  const type = ARTICLE_TYPES[article.type];
  const silo = article.silo ? SILOS[article.silo] : null;
  const [{ html, toc }, related] = await Promise.all([renderArticleBody(article.body), getRelatedArticles(article)]);
  const parentLabel = article.parentPath ? SITE_PAGES[article.parentPath] : null;
  const updated = article.updatedAt && article.publishedAt && article.updatedAt.slice(0, 10) !== article.publishedAt.slice(0, 10);

  return (
    <>
      {!preview && buildSchemas(article).map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      ))}

      <main className="oza">
        {preview && (
          <p className="oza-preview" role="status">
            Aperçu — {article.status === 'published' ? 'article en ligne' : 'brouillon non publié, visible uniquement avec ce lien'}
          </p>
        )}

        <header className="fin-hero ae-hero oza-hero">
          <div className="ae-hero-inner fin-hero-inner">
            <nav aria-label="breadcrumb">
              <Link href="/">Accueil</Link>{' › '}
              <Link href={type.path}>{type.label}</Link>
              {silo && <>{' › '}<Link href={silo.path}>{silo.label}</Link></>}
            </nav>
            <span className="fin-badge">{silo ? `${type.label} · ${silo.label}` : type.label}</span>
            <h1 className="oza-title">{article.title}</h1>
            <p className="ae-hero-intro">{article.excerpt}</p>
            <p className="oza-meta">
              Par <Link href={AUTHOR.path}>{AUTHOR.name}</Link>
              {article.publishedAt && <> · Publié le <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></>}
              {updated && <> · Mis à jour le <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time></>}
              {' · '}{article.readMinutes} min de lecture
            </p>
          </div>
        </header>

        <div className="oza-layout">
          {toc.length >= 2 && (
            <nav className="oza-toc" aria-label="Sommaire">
              <p className="oza-toc-title">Sommaire</p>
              <ol>
                {toc.map((item) => (
                  <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
                ))}
                {article.faq?.length > 0 && <li><a href="#questions-frequentes">Questions fréquentes</a></li>}
              </ol>
            </nav>
          )}

          <article className="oza-article">
            {article.image && (
              <figure className="oza-figure">
                <Image
                  src={article.image.url}
                  alt={article.image.alt}
                  width={article.image.width}
                  height={article.image.height}
                  sizes="(max-width: 860px) 100vw, 760px"
                  priority
                />
                {(article.image.caption || article.image.credit) && (
                  <figcaption>{[article.image.caption, article.image.credit].filter(Boolean).join(' — ')}</figcaption>
                )}
              </figure>
            )}

            <div className="oza-prose" dangerouslySetInnerHTML={{ __html: html }} />

            {article.faq?.length > 0 && (
              <section className="oza-faq" aria-labelledby="questions-frequentes">
                <h2 id="questions-frequentes">Questions fréquentes</h2>
                {article.faq.map((item) => (
                  <details key={item.q}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </section>
            )}

            {parentLabel && (
              <p className="oza-parent">
                Pour aller plus loin : <Link href={article.parentPath}>{parentLabel}</Link>
              </p>
            )}

            {article.sources?.length > 0 && (
              <section className="oza-sources" aria-labelledby="sources">
                <h2 id="sources">Sources</h2>
                <ul>
                  {article.sources.map((source) => (
                    <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>
                  ))}
                </ul>
              </section>
            )}

            <aside className="oza-notice">
              {siloNotice(silo) && <p><strong>{siloNotice(silo)}</strong></p>}
              <p>
                Cet article est publié à titre d’information générale et ne constitue pas un conseil personnalisé.
                Chaque situation mérite une étude dédiée.
              </p>
            </aside>

            <aside className="oza-author">
              <Image src={AUTHOR.avatar} alt={AUTHOR.name} width={64} height={64} />
              <div>
                <p className="oza-author-name"><Link href={AUTHOR.path}>{AUTHOR.name}</Link></p>
                <p>{AUTHOR.jobTitle}, à {COMPANY.address.city} ({COMPANY.address.region}).</p>
              </div>
              <ContactPopup label="Parler de mon projet" icon="calendar-days" className="fin-btn-primary" />
            </aside>
          </article>
        </div>

        {related.length > 0 && (
          <section className="oza-related" aria-labelledby="a-lire-aussi">
            <div className="oza-related-inner">
              <h2 id="a-lire-aussi">À lire aussi</h2>
              <div className="oza-grid">
                {related.map((item) => <ArticleCard key={`${item.type}:${item.slug}`} article={item} heading="h3" />)}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
