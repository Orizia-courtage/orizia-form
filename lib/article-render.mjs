// Conversion du contenu d'un article (Markdown) en HTML prêt à afficher :
// HTML assaini, ancres sur les intertitres, sommaire, tableaux défilables, liens externes sécurisés.
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const SITE_HOSTS = ['https://www.orizia-courtage.fr', 'https://orizia-courtage.fr'];

const stripTags = (html) => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, '’').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();

// Seules les images hébergées par le site (stockage Supabase ou dossier public) passent par l'optimiseur.
function isOptimizable(src) {
  if (src.startsWith('/') && !src.startsWith('//')) return true;
  try {
    return new URL(src).host === new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).host && src.includes('/storage/v1/object/public/');
  } catch {
    return false;
  }
}

export function slugify(value) {
  return value
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'section';
}

export async function renderArticleBody(markdown) {
  // remark-html assainit le HTML par défaut (aucun script ni attribut dangereux).
  const file = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  let html = String(file);

  // Un seul H1 par page (le titre de l'article) : les H1 du contenu deviennent des H2.
  html = html.replace(/<(\/?)h1(\s[^>]*)?>/g, '<$1h2>');

  // Ancres + sommaire (H2 uniquement, pour rester lisible).
  const toc = [];
  const used = new Set();
  html = html.replace(/<h([23])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/g, (match, level, inner) => {
    const label = stripTags(inner);
    let id = slugify(label);
    for (let n = 2; used.has(id); n += 1) id = `${slugify(label)}-${n}`;
    used.add(id);
    if (level === '2') toc.push({ id, label });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  // Tableaux : conteneur défilable sur mobile.
  html = html.replace(/<table>/g, '<div class="oza-table"><table>').replace(/<\/table>/g, '</table></div>');

  // Liens : les liens internes restent relatifs, les liens externes s'ouvrent dans un nouvel onglet.
  html = html.replace(/<a href="([^"]*)"/g, (match, href) => {
    const site = SITE_HOSTS.find((host) => href === host || href.startsWith(`${host}/`));
    if (site) return `<a href="${href.slice(site.length) || '/'}"`;
    if (/^https?:\/\//.test(href)) return `<a href="${href}" target="_blank" rel="noopener noreferrer"`;
    return match;
  });

  // Surlignage : ==texte== devient <mark>.
  html = html.replace(/==(\S[^=<>\n]{0,238}\S)==/g, '<mark>$1</mark>');

  // Encadrés : une citation qui commence par un mot-clé en gras prend la couleur correspondante.
  html = html.replace(/<blockquote>(\s*<p><strong>)(Attention|Exemple|Bon à savoir|À retenir)/g, (match, open, label) => {
    const kind = label === 'Attention' ? 'warn' : label === 'Exemple' ? 'example' : 'key';
    return `<blockquote class="oza-callout oza-callout--${kind}">${open}${label}`;
  });

  // Images du contenu : figure avec légende, dimensions fixes (pas de saut de mise en page),
  // chargement différé et versions allégées servies par l'optimiseur d'images du site.
  html = html.replace(/<p>\s*(<img [^>]*>)\s*<\/p>/g, (match, tag) => {
    const attr = (name) => (tag.match(new RegExp(`${name}="([^"]*)"`)) || [])[1] || '';
    const src = attr('src');
    if (!src) return '';
    const caption = attr('title');
    const optimized = (width) => `/_next/image?url=${encodeURIComponent(src)}&amp;w=${width}&amp;q=75`;
    const sources = isOptimizable(src)
      ? `src="${optimized(1200)}" srcset="${optimized(640)} 640w, ${optimized(828)} 828w, ${optimized(1200)} 1200w" sizes="(max-width: 860px) 100vw, 760px"`
      : `src="${src}"`;
    return `<figure class="oza-inline-figure"><img ${sources} alt="${attr('alt')}" width="1200" height="675" loading="lazy" decoding="async">${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
  });
  html = html.replace(/<img (?![^>]*loading=)/g, '<img loading="lazy" decoding="async" ');

  return { html, toc };
}
