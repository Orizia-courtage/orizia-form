export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/gestion',
    },
    sitemap: 'https://www.orizia-courtage.fr/sitemap.xml',
  };
}
