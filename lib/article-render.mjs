// Conversion du contenu d'un article (Markdown) en HTML prêt à afficher :
// HTML assaini, ancres sur les intertitres, sommaire, tableaux défilables, liens externes sécurisés.
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const SITE_HOSTS = ['https://www.orizia-courtage.fr', 'https://orizia-courtage.fr'];

const stripTags = (html) => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, '’').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();

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

  // Images du contenu : chargement différé.
  html = html.replace(/<img /g, '<img loading="lazy" decoding="async" ');

  return { html, toc };
}
