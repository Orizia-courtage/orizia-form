import { shareImageUrl } from '@/lib/share.mjs';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import { ROBOTS } from '@/lib/indexing.mjs';
import { ARTICLE_TYPES, BASE_URL, LISTINGS, PER_PAGE, SILOS, THEMES, countLabel, listingHref, listingPath, themesOf } from '@/lib/articles.mjs';
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
        <ThemeLinks type={type} articles={articles} />
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

/** Accès direct à chaque thème qui a des articles (utile aux lecteurs et à l'exploration du site par Google). */
function ThemeLinks({ type, articles, silo = null, current = null }) {
  const themes = Object.entries(THEMES)
    .filter(([key, theme]) => (!silo || theme.silo === silo) && articles.some((article) => article.theme === key))
    .map(([key, theme]) => ({ key, ...theme, count: articles.filter((article) => article.theme === key).length }));
  if (!themes.length) return null;
  return (
    <nav className="oza-themes" aria-label="Thèmes">
      {silo && <Link href={listingPath(type, silo)} aria-current={!current ? 'page' : undefined}>Tout {SILOS[silo].label.toLowerCase()}</Link>}
      {themes.map((theme) => (
        <Link key={theme.key} href={listingHref(type, theme.silo, theme.key)} aria-current={current === theme.key ? 'page' : undefined}>
          {theme.label} <span className="oza-themes-count">{theme.count}</span>
        </Link>
      ))}
    </nav>
  );
}

/** Une liste : { silo: 'financer' | 'all', theme, page }. Renvoie ses textes et son adresse. */
export function listingInfo(type, { silo, theme = null, page = 1 }) {
  const words = LISTINGS[type];
  const univers = silo === 'all' ? null : SILOS[silo];
  const topic = theme ? THEMES[theme] : null;
  const name = topic ? topic.label : univers ? univers.label : null;
  const title = name ? `${words.heading} ${name}` : words.allLabel;
  const intro = topic
    ? `${type === 'blog' ? 'Mes guides' : 'Les actualités'} sur ${topic.label.toLowerCase()} : questions fréquentes, démarches, règles à connaître et exemples concrets.`
    : univers
      ? `${type === 'blog' ? 'Tous mes guides' : 'Toutes mes actualités'} pour ${univers.label.toLowerCase()} : ${univers.intro.replace(/\.$/, '').toLowerCase()}.`
      : type === 'blog'
        ? 'Tous mes guides sur le crédit, l’assurance et l’épargne, du plus récent au plus ancien.'
        : 'Toutes les actualités du crédit, de l’assurance et de l’épargne, de la plus récente à la plus ancienne.';
  return { words, univers, topic, title, intro, href: listingHref(type, silo, theme, page) };
}

/** Articles d'une liste, dans l'ordre d'affichage (piliers d'abord pour les guides). */
export function listingItems(type, { silo, theme = null }, articles) {
  return ordered(type, articles.filter((article) => (silo === 'all' || article.silo === silo) && (!theme || article.theme === theme)));
}
export const pageCount = (count) => Math.max(1, Math.ceil(count / PER_PAGE));

export function listingMetadata(type, listing, count) {
  const { title, intro, href } = listingInfo(type, listing);
  const page = listing.page || 1;
  const fullTitle = page > 1 ? `${title}, page ${page}` : title;
  const url = `${BASE_URL}${href}`;
  return {
    title: { absolute: `${fullTitle} | ${ARTICLE_TYPES[type].label} Orizia` },
    description: page > 1 ? `${intro} Page ${page}.` : intro,
    // Une liste encore vide n'a rien à offrir aux moteurs de recherche.
    robots: count > 0 ? ROBOTS : { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: { type: 'website', title: fullTitle, description: intro, url, siteName: 'Orizia Courtage', locale: 'fr_FR', images: [{ url: shareImageUrl(type === 'blog' ? 'blog' : 'actualites'), width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title: fullTitle, description: intro, images: [shareImageUrl(type === 'blog' ? 'blog' : 'actualites')] },
  };
}

function Pagination({ type, listing, pages }) {
  const page = listing.page || 1;
  if (pages <= 1) return null;
  const link = (number) => listingHref(type, listing.silo, listing.theme, number);
  const numbers = [...new Set([1, page - 1, page, page + 1, pages])].filter((number) => number >= 1 && number <= pages).sort((a, b) => a - b);
  return (
    <nav className="oza-pages" aria-label="Pages">
      {page > 1 && <Link href={link(page - 1)} rel="prev">← Précédente</Link>}
      {numbers.map((number, index) => (
        <span key={number}>
          {index > 0 && number - numbers[index - 1] > 1 && <span className="oza-pages-gap">…</span>}
          {number === page ? <span aria-current="page">{number}</span> : <Link href={link(number)}>{number}</Link>}
        </span>
      ))}
      {page < pages && <Link href={link(page + 1)} rel="next">Suivante →</Link>}
    </nav>
  );
}

/** Liste paginée d'un univers, d'un thème ou de tous les articles : /blog/financer, /blog/financer/credit-immobilier/2… */
export function ArticleListing({ type, listing, articles }) {
  const { words, univers, topic, title, intro, href } = listingInfo(type, listing);
  const page = listing.page || 1;
  const base = ARTICLE_TYPES[type];
  const all = listingItems(type, listing, articles);
  const pages = pageCount(all.length);
  const items = all.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const crumbs = [
    { name: 'Accueil', item: BASE_URL },
    { name: base.label, item: `${BASE_URL}${base.path}` },
    ...(topic ? [{ name: univers.label, item: `${BASE_URL}${listingPath(type, listing.silo)}` }] : []),
    { name: page > 1 ? `${title}, page ${page}` : title, item: `${BASE_URL}${href}` },
  ];
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb })) };
  const parent = topic || univers;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
      <main className="oza">
        <header className="fin-hero ae-hero oza-hero">
          <div className="ae-hero-inner fin-hero-inner">
            <nav aria-label="breadcrumb">
              <Link href="/">Accueil</Link>{' › '}<Link href={base.path}>{base.label}</Link>
              {topic && <>{' › '}<Link href={listingPath(type, listing.silo)}>{univers.label}</Link></>}
            </nav>
            <span className="fin-badge">{all.length ? countLabel(type, all.length) : base.label}</span>
            <h1 className="oza-title">{title}{page > 1 ? <span className="oza-title-page">, page {page}</span> : null}</h1>
            <p className="ae-hero-intro">{intro}</p>
          </div>
        </header>

        <div className="oza-list">
          <nav className="oza-filters" aria-label="Univers">
            <Link href={listingPath(type, 'all')} aria-current={listing.silo === 'all' ? 'page' : undefined}>{words.allLabel}</Link>
            {Object.entries(SILOS).map(([key, item]) => (
              <Link key={key} href={listingPath(type, key)} aria-current={listing.silo === key ? 'page' : undefined}>{item.label}</Link>
            ))}
          </nav>
          {univers && <ThemeLinks type={type} articles={articles} silo={listing.silo} current={listing.theme} />}

          {items.length > 0 ? (
            <div className="oza-grid">
              {items.map((article) => <ArticleCard key={`${article.type}-${article.slug}`} article={article} heading="h2" />)}
            </div>
          ) : (
            <p className="oza-empty">
              {type === 'blog' ? 'Aucun guide' : 'Aucune actualité'} ici pour l’instant.{' '}
              <Link href={base.path}>Revenir {type === 'blog' ? 'au blog' : 'aux actualités'}</Link>
            </p>
          )}

          <Pagination type={type} listing={listing} pages={pages} />

          {parent && (
            <p className="oza-parent">
              Besoin d’un accompagnement ? <Link href={parent.path}>Voir mes solutions : {parent.label.toLowerCase()}</Link>
            </p>
          )}
        </div>
      </main>
    </>
  );
}
