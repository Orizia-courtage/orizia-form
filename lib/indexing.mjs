// Indexation par les moteurs de recherche.
// Désactivée tant que SITE_INDEXING ≠ "on" (variable Vercel), p. ex. en attendant l'immatriculation ORIAS.
// Pour l'activer : SITE_INDEXING=on dans Vercel, puis redéployer.
export const INDEXING = process.env.SITE_INDEXING === 'on';
export const ROBOTS = INDEXING ? { index: true, follow: true } : { index: false, follow: false, nocache: true };
