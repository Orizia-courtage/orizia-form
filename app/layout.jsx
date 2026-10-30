import './globals.css';
import './design-system.css';
import './design-home.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SimulationConfigProvider } from '@/components/SimulationConfigProvider';
import { fontSans, fontDisplay } from '@/lib/fonts';
import { ROBOTS } from '@/lib/indexing.mjs';

export const metadata = {
  title: 'Orizia Courtage – Expert en Financement & Stratégie Patrimoniale',
  description: 'Concrétisez vos projets immobiliers et développez votre capital.',
  robots: ROBOTS,
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
