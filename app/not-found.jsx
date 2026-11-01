import Link from 'next/link';
import HeaderV2 from '@/components/HeaderV2';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import ContactWidget from '@/components/ContactWidget';
import MobileCtaBar from '@/components/MobileCtaBar';
import '@/app/header-v2.css';

// Page 404 aux couleurs du site (à la place du message anglais par défaut).
export const metadata = {
  title: 'Page introuvable | Orizia Courtage',
  robots: { index: false, follow: true },
};

const LIENS = [
  { href: '/financer', icon: 'house', label: 'Financer un projet', sub: 'Crédit immobilier, regroupement, prêt personnel' },
  { href: '/assurer', icon: 'shield-check', label: 'Payer moins cher mes assurances', sub: 'Emprunteur, habitation, auto' },
  { href: '/investir', icon: 'trending-up', label: 'Faire fructifier mon épargne', sub: 'Assurance vie, PER, SCPI' },
  { href: '/contact', icon: 'phone', label: 'Parler à Cindy', sub: 'Réponse sous 24 h' },
];

export default function NotFound() {
  return (
    <>
      <HeaderV2 />
      <main className="oz-404">
        <div className="oz-404-inner">
          <span className="fin-badge">Erreur 404</span>
          <h1>Cette page n'existe pas (ou plus).</h1>
          <p>Le lien est peut-être ancien ou mal recopié. Voici les bons chemins :</p>
          <div className="oz-404-grid">
            {LIENS.map((l) => (
              <Link key={l.href} href={l.href} className="oz-404-card">
                <span className="oz-404-icon"><Icon name={l.icon} /></span>
                <span><strong>{l.label}</strong><small>{l.sub}</small></span>
                <Icon name="arrow-right" className="oz-arrow" />
              </Link>
            ))}
          </div>
          <Link href="/" className="fin-btn-primary oz-404-home">Revenir à l'accueil</Link>
        </div>
      </main>
      <Footer />
      <ContactWidget />
      <MobileCtaBar />
    </>
  );
}
