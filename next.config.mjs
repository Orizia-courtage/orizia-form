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
    qualities: [75],
    minimumCacheTTL: 31536000,
  },
  compress: true,
};

export default nextConfig;
