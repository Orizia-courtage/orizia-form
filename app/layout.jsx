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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body className={urbanist.className}>
        {children}
      </body>
    </html>
  );
}