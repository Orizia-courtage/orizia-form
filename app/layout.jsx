import { Urbanist } from 'next/font/google';
import './globals.css';

const urbanist = Urbanist({ subsets: ['latin'], weight: ['400','500','600','800','900'] });

export const metadata = {
  title: 'Orizia Courtage – Expert en Financement & Stratégie Patrimoniale',
  description: 'Concrétisez vos projets immobiliers et développez votre capital.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={urbanist.className}>
        {children}
      </body>
    </html>
  );
}