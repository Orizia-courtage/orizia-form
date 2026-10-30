const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // Tant que l'indexation n'est pas activée (SITE_INDEXING=on), aucune page, image ou PDF n'est indexé.
  ...(process.env.SITE_INDEXING === 'on' ? [] : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }]),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // Permet une compilation de contrôle hors du dossier synchronisé par OneDrive.
  distDir: process.env.NEXT_BUILD_DIR || '.next',
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    qualities: [75, 80],
    minimumCacheTTL: 31536000,
  },
  compress: true,
};

export default nextConfig;
