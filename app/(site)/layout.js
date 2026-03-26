import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactWidget from '@/components/ContactWidget';

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ContactWidget />
    </>
  );
}