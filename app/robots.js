export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/administration'],
    },
    sitemap: 'https://www.orizia-courtage.fr/sitemap.xml',
  };
}
