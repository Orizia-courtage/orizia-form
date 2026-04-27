import HeaderV2 from '@/components/HeaderV2';
import HeaderScrollProgress from '@/components/HeaderScrollProgress';
import Footer from '@/components/Footer';
import ContactWidget from '@/components/ContactWidget';
import '@/app/header-v2.css';

export default function SiteLayout({ children }) {
  return (
    <>
      <HeaderV2 />
      <HeaderScrollProgress />
      {children}
      <Footer />
      <ContactWidget />
    </>
  );
}