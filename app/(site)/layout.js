import '../globals.css';
import { Urbanist } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactWidget from '@/components/ContactWidget';

const urbanist = Urbanist({ subsets: ['latin'], weight: ['400','500','600','800','900'] });

export const metadata = {
  title: 'Orizia Courtage – Expert en Financement & Stratégie Patrimoniale',
  description: 'Concrétisez vos projets immobiliers et développez votre capital avec un accompagnement indépendant et sur-mesure.',
};

export default function SiteLayout({ children }) {
  return (
    <html lang="fr">
      <body className={urbanist.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ContactWidget />  {/* ← ajouté */}
      </body>
    </html>
  );
}