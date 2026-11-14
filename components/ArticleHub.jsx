import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import { ROBOTS } from '@/lib/indexing.mjs';
import { ARTICLE_TYPES, BASE_URL, LISTINGS, SILOS, countLabel, listingPath } from '@/lib/articles.mjs';
import '@/app/(site)/article.css';

const LATEST = 5;
// Guides : les piliers d'abord. Actualités : simplement les plus récentes.
const ordered = (type, articles) => (type === 'blog' ? [...articles].sort((a, b) => (b.pillar === true) - (a.pillar === true)) : articles);

/** Accueil du blog ou des actualités : choix de l'univers, puis les 5 derniers et l'accès à tout. */
export function ArticleHub({ type, articles }) {
  const words = LISTINGS[type];
  return (
    <div className="oza-list">
      <section className="oza-list-section" aria-labelledby="oza-univers">
        <div className="oza-list-head">
          <h2 id="oza-univers">Par où voulez-vous commencer ?</h2>
          <p>Choisissez un univers pour voir {type === 'blog' ? 'tous ses guides' : 'toutes ses actualités'}.</p>
        </div>
        <div className="oza-universes">
          {Object.entries(SILOS).map(([key, silo]) => {
            const count = articles.filter((article) => article.silo === key).length;
            const body = (
              <>
                <span className="oza-universe-count">{count ? countLabel(type, count) : 'Bientôt'}</span>
                <span className="oza-universe-title">{silo.label}</span>
                <span className="oza-universe-intro">{silo.intro}</span>
                {count > 0 && <span className="oza-universe-more">Voir {type === 'blog' ? 'les guides' : 'les actualités'} <span aria-hidden="true">→</span></span>}
              </>
            );
            return count > 0
              ? <Link key={key} href={listingPath(type, key)} className="oza-universe">{body}</Link>
              : <div key={key} className="oza-universe oza-universe--empty">{body}</div>;
          })}
        </div>
      </section>

      <section className="oza-list-section" aria-labelledby="oza-derniers">
        <div className="oza-list-head oza-list-head--row">
          <h2 id="oza-derniers">{words.latest}</h2>
          {articles.length > LATEST && <Link href={listingPath(type, 'all')}>{words.allLabel} ({articles.length}) →</Link>}
        </div>
        <div className="oza-grid">
          {articles.slice(0, LATEST).map((article) => <ArticleCard key={article.slug} article={article} heading="h3" />)}
        </div>
        <p className="oza-more">
          <Link href={listingPath(type, 'all')} className="fin-btn-primary">{words.allLabel}</Link>
        </p>
      </section>
    </div>
  );
}

const listingTexts = (type, key) => {
  const words = LISTINGS[type];
  const silo = key === 'all' ? null : SILOS[key];
  const title = silo ? `${words.heading} ${silo.label}` : words.allLabel;
  const intro = silo
    ? `${type === 'blog' ? 'Tous mes guides' : 'Toutes mes actualités'} pour ${silo.label.toLowerCase()} : ${silo.intro.replace(/\.$/, '').toLowerCase()}.`
    : type === 'blog'
      ? 'Tous mes guides sur le crédit, l’assurance et l’épargne, du plus récent au plus ancien.'
      : 'Toutes les actualités du crédit, de l’assurance et de l’épargne, de la plus récente à la plus ancienne.';
  return { words, silo, title, intro };
};

export function listingMetadata(type, key, count) {
  const { title, intro } = listingTexts(type, key);
  const url = `${BASE_URL}${listingPath(type, key)}`;
  return {
    title: { absolute: `${title} | ${ARTICLE_TYPES[type].label} Orizia` },
    description: intro,
    // Une liste encore vide n'a rien à offrir aux moteurs de recherche.
    robots: count > 0 ? ROBOTS : { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: { type: 'website', title, description: intro, url, siteName: 'Orizia Courtage', locale: 'fr_FR' },
  };
}

/** Liste complète d'un univers (ou de tous) : /blog/financer, /actualites/toutes… */
export function ArticleListing({ type, listing, articles }) {
  const { words, silo, title, intro } = listingTexts(type, listing);
  const base = ARTICLE_TYPES[type];
  const items = ordered(type, silo ? articles.filter((article) => article.silo === listing) : articles);
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: base.label, item: `${BASE_URL}${base.path}` },
      { '@type': 'ListItem', position: 3, name: title, item: `${BASE_URL}${listingPath(type, listing)}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
      <main className="oza">
        <header className="fin-hero ae-hero oza-hero">
          <div className="ae-hero-inner fin-hero-inner">
            <nav aria-label="breadcrumb">
              <Link href="/">Accueil</Link>{' › '}<Link href={base.path}>{base.label}</Link>
            </nav>
            <span className="fin-badge">{items.length ? countLabel(type, items.length) : base.label}</span>
            <h1 className="oza-title">{title}</h1>
            <p className="ae-hero-intro">{intro}</p>
          </div>
        </header>

        <div className="oza-list">
          <nav className="oza-filters" aria-label="Univers">
            <Link href={listingPath(type, 'all')} aria-current={listing === 'all' ? 'page' : undefined}>{words.allLabel}</Link>
            {Object.entries(SILOS).map(([key, item]) => (
              <Link key={key} href={listingPath(type, key)} aria-current={listing === key ? 'page' : undefined}>{item.label}</Link>
            ))}
          </nav>

          {items.length > 0 ? (
            <div className="oza-grid">
              {items.map((article) => <ArticleCard key={article.slug} article={article} heading="h2" />)}
            </div>
          ) : (
            <p className="oza-empty">
              {type === 'blog' ? 'Aucun guide' : 'Aucune actualité'} dans cet univers pour l’instant.{' '}
              <Link href={base.path}>Revenir {type === 'blog' ? 'au blog' : 'aux actualités'}</Link>
            </p>
          )}

          {silo && (
            <p className="oza-parent">
              Besoin d’un accompagnement ? <Link href={silo.path}>Voir mes solutions pour {silo.label.toLowerCase()}</Link>
            </p>
          )}
        </div>
      </main>
    </>
  );
}
