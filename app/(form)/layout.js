import '../globals.css';
import '../fontawesome.css';
import { DM_Sans } from 'next/font/google';
import ContactWidget from '@/components/ContactWidget';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400','500','600','700','800','900'] });

export const metadata = {
  title: 'Regroupement de crédits — Orizia Courtage',
  description: 'Simulez votre regroupement de crédits sans frais de dossier. Réponse sous 24h, sans engagement.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={dmSans.className}>
        {children}
        <ContactWidget />
      </body>
    </html>
  );
}