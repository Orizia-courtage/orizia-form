import { DM_Sans } from 'next/font/google';

import './globals.css';

import { Analytics } from "@vercel/analytics/next"

import { SpeedInsights } from "@vercel/speed-insights/next"



const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400','500','600','700','800','900'] });



export const metadata = {

  title: 'Orizia Courtage – Expert en Financement & Stratégie Patrimoniale',

  description: 'Concrétisez vos projets immobiliers et développez votre capital.',

};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Préconnexion cal.eu — économise ~330ms sur mobile */}
        <link rel="preconnect" href="https://www.cal.eu" />
        <link rel="dns-prefetch" href="https://www.cal.eu" />
      </head>
      <body className={dmSans.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}