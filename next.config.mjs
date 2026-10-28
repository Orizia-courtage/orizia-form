/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // L'ancienne page de réglages est remplacée par le CRM.
  async redirects() {
    return [{ source: '/administration', destination: 'https://crm.orizia-courtage.fr/parametres/site', permanent: false }];
  },
};

export default nextConfig;
