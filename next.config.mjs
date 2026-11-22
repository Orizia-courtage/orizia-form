const isDev = process.env.NODE_ENV !== 'production';

function supabaseOrigin() {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin;
  } catch {
    return '';
  }
}

// Politique de sécurité du contenu : le navigateur ne charge que ce qui vient du site lui-même et des
// services réellement utilisés (Cloudflare Turnstile pour l'anti-robot, Cal.com pour l'agenda intégré,
// Supabase pour les images d'articles). Tout nouveau service externe doit être ajouté ici.
// 'unsafe-inline' reste nécessaire : Next.js insère des scripts et des styles dans la page.
const TURNSTILE = 'https://challenges.cloudflare.com';
// Barre d'outils Vercel, présente seulement sur les aperçus.
const VERCEL_LIVE = process.env.VERCEL_ENV === 'preview' ? 'https://vercel.live' : '';
const csp = [
  ["default-src", "'self'"],
  // En développement, les mesures d'audience Vercel chargent une version de test depuis va.vercel-scripts.com ;
  // en ligne, elles sont servies par le site lui-même (/_vercel/...).
  ["script-src", "'self'", "'unsafe-inline'", isDev ? "'unsafe-eval' https://va.vercel-scripts.com" : '', TURNSTILE, VERCEL_LIVE],
  ["style-src", "'self'", "'unsafe-inline'"],
  ["img-src", "'self'", 'data:', 'blob:', supabaseOrigin(), VERCEL_LIVE],
  ["font-src", "'self'", 'data:'],
  ["connect-src", "'self'", TURNSTILE, VERCEL_LIVE, isDev ? 'ws:' : ''],
  ["frame-src", TURNSTILE, 'https://cal.com', 'https://app.cal.com', VERCEL_LIVE],
  ["worker-src", "'self'", 'blob:'],
  ["object-src", "'none'"],
  ["base-uri", "'self'"],
  ["form-action", "'self'"],
  ["frame-ancestors", "'none'"],
  ...(isDev ? [] : [["upgrade-insecure-requests"]]),
].map((directive) => directive.filter(Boolean).join(' ')).join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // Tant que l'indexation n'est pas activée (SITE_INDEXING=on), aucune page, image ou PDF n'est indexé.
  ...(process.env.SITE_INDEXING === 'on' ? [] : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }]),
];

// Images des articles : hébergées dans le stockage Supabase du site.
function supabaseImagePatterns() {
  try {
    const { protocol, hostname, port } = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
    return [{ protocol: protocol.replace(':', ''), hostname, port, pathname: '/storage/v1/object/public/**' }];
  } catch {
    return [];
  }
}

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
    qualities: [75, 80, 90],
    minimumCacheTTL: 31536000,
    remotePatterns: supabaseImagePatterns(),
  },
  // Polices et logo des visuels pour les réseaux sociaux, lus depuis le disque par la route.
  outputFileTracingIncludes: {
    '/api/articles/social': ['./lib/social/*'],
    '/og/**/*': ['./lib/social/*', './public/images/hero-cindy-portrait.webp'],
  },
  compress: true,
};

export default nextConfig;
