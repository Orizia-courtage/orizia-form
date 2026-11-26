import './globals.css';
import './design-system.css';
import './design-home.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SimulationConfigProvider } from '@/components/SimulationConfigProvider';
import { fontSans, fontDisplay } from '@/lib/fonts';
import { ROBOTS } from '@/lib/indexing.mjs';
import { DEFAULT_SHARE, shareImageUrl } from '@/lib/share.mjs';

// Valeurs par défaut (pages sans métadonnées propres : mentions légales, confidentialité, liens de parrainage…).
export const metadata = {
  metadataBase: new URL('https://www.orizia-courtage.fr'),
  title: 'Orizia Courtage | Courtier crédit et assurance à Marcq-en-Barœul',
  description: 'Cindy Urbansky, courtière en crédit et en assurance à Marcq-en-Barœul : crédit immobilier, assurance emprunteur, épargne.',
  robots: ROBOTS,
  // Icônes déclarées à la main, depuis /public : leur adresse reste la même d'un déploiement à l'autre
  // (posées dans app/, Next leur ajoute un identifiant de déploiement, et Google veut une adresse d'icône stable).
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '64x64', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'Orizia Courtage',
    locale: 'fr_FR',
    title: 'Orizia Courtage, courtier en crédit et en assurance',
    description: 'Crédit immobilier, assurance emprunteur, épargne : Cindy Urbansky vous accompagne de la première question jusqu’à la signature.',
    images: [{ url: shareImageUrl(DEFAULT_SHARE), width: 1200, height: 630, alt: 'Orizia Courtage, courtier en crédit et en assurance' }],
  },
  twitter: { card: 'summary_large_image', images: [shareImageUrl(DEFAULT_SHARE)] },
};

export const viewport = {
  themeColor: '#1b1d1a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body className={fontSans.className}>
        <SimulationConfigProvider>{children}</SimulationConfigProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
