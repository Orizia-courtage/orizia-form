import '../globals.css';
import '../fontawesome.css';
import '../design-system.css';
import { fontSans, fontDisplay } from '@/lib/fonts';
import ContactWidget from '@/components/ContactWidget';


export const metadata = {
  title: 'Regroupement de crédits — Orizia Courtage',
  description: 'Simulez votre regroupement de crédits. Réponse sous 24h, sans engagement.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body className={fontSans.className}>
        {children}
        <ContactWidget />
      </body>
    </html>
  );
}
