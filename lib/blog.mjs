// Lecture des articles du blog (content/blog/<rubrique>/<slug>.md|.mdx).
// Chaque fichier commence par un en-tête (frontmatter) :
//   ---
//   title: "Taux immobiliers : ce qui change en décembre"
//   date: 2026-11-18
//   excerpt: "Une phrase d'accroche."
//   image: /images/blog/taux-decembre.webp   (facultatif)
//   draft: true                               (facultatif : article masqué)
//   ---
// Un nouvel article publié remonte tout seul sur /liens (et partout où getLatestPosts est utilisé).
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.join(process.cwd(), 'content', 'blog');

export const CATEGORIES = {
  financer: { label: 'Financer', image: '/images/financer.webp' },
  assurer: { label: 'Assurer', image: '/images/assurer.webp' },
  investir: { label: 'Investir', image: '/images/investir.webp' },
};

// Adresse publique d'un article. À garder alignée avec la future page article.
export const postUrl = (category, slug) => `/blog/${category}/${slug}`;

export function getAllPosts() {
  const posts = [];
  for (const category of Object.keys(CATEGORIES)) {
    const dir = path.join(ROOT, category);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!/\.mdx?$/.test(file)) continue;
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
      const date = data.date ? new Date(data.date) : null;
      if (data.draft || !data.title || !date || Number.isNaN(date.getTime())) continue;
      if (date > new Date()) continue; // article programmé : pas encore visible
      const slug = data.slug || file.replace(/\.mdx?$/, '');
      const words = content.split(/\s+/).filter(Boolean).length;
      posts.push({
        slug,
        category,
        categoryLabel: CATEGORIES[category].label,
        title: String(data.title),
        excerpt: data.excerpt || data.description || '',
        image: data.image || CATEGORIES[category].image,
        date: date.toISOString(),
        readingMinutes: Math.max(1, Math.round(words / 220)),
        url: data.url || postUrl(category, slug),
      });
    }
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getLatestPosts(count = 3) {
  return getAllPosts().slice(0, count);
}
