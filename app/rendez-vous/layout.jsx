import '../globals.css';
import ContactWidget from '@/components/ContactWidget';

export const metadata = {
  title: 'Orizia Courtage',
  description: 'Orizia Courtage - Prise de rendez-vous',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <ContactWidget />  {/* ← ajouté */}
      </body>
    </html>
  )
}