import { INDEXING } from '@/lib/indexing.mjs';

// Sans indexation, les robots peuvent lire les pages (pour voir la consigne « noindex »)
// mais aucun plan du site n'est annoncé.
export default function robots() {
  if (!INDEXING) return { rules: { userAgent: '*', allow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.orizia-courtage.fr/sitemap.xml',
  };
}
