'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const NAV = [
  {
    label: 'Investir',
    links: [
      { href: '/investir/crowdfunding',  title: 'Crowdfunding',   sub: 'Financement participatif' },
      { href: '/investir/per',            title: 'PERP / PER',     sub: 'Préparez votre retraite' },
      { href: '/investir/assurance-vie',  title: 'Assurance Vie',  sub: 'Épargne & transmission' },
      { href: '/investir/scpi',           title: 'SCPI',           sub: 'Immobilier de rendement' },
    ],
    cta: { href: '/contact', label: 'Prendre rendez-vous', img: '/images/investir.jpg', text: 'Construisez votre stratégie patrimoniale avec nos experts.' },
  },
  {
    label: 'Financer',
    links: [
      { href: '/financer/credit-immobilier',     title: 'Crédit immobilier',       sub: 'Votre projet immobilier' },
      { href: '/financer/regroupement-credits',  title: 'Regroupement de crédits', sub: 'Réduisez vos mensualités' },
      { href: '/financer/pret-personnel',        title: 'Prêt personnel',          sub: 'Financez vos projets' },
    ],
    cta: { href: '/simulation', label: 'Faire une simulation', img: '/images/financer.jpg', text: 'Obtenez votre simulation gratuite en quelques minutes.' },
  },
  {
    label: 'Assurer',
    links: [
      { href: '/assurer/emprunteur',  title: 'Assurance emprunteur', sub: 'Protégez votre prêt' },
      { href: '/assurer/habitation',  title: 'Assurance habitation', sub: 'Votre logement sécurisé' },
      { href: '/assurer/auto-moto',   title: 'Assurance auto/moto',  sub: 'Roulez en toute sérénité' },
    ],
    cta: { href: '/contact', label: 'Obtenir un devis', img: '/images/assurer.jpg', text: 'Comparez les meilleures offres du marché.' },
  },
];

const SCROLL_HEADER_CONFIG = {
  '/investir': {
    placeholder: 'Choisir un produit',
    options: [
      { value: '/investir/crowdfunding',  label: '📈 Crowdfunding' },
      { value: '/investir/per',           label: '🏦 PERP / PER' },
      { value: '/investir/assurance-vie', label: '🛡️ Assurance Vie' },
      { value: '/investir/scpi',          label: '🏢 SCPI' },
    ],
  },
  '/financer': {
    placeholder: 'Choisir un financement',
    options: [
      { value: '/financer/credit-immobilier',    label: '🏠 Crédit immobilier' },
      { value: '/financer/regroupement-credits', label: '💳 Regroupement' },
      { value: '/financer/pret-personnel',       label: '💶 Prêt personnel' },
    ],
  },
  '/assurer': {
    placeholder: 'Choisir une assurance',
    options: [
      { value: '/assurer/emprunteur', label: '📋 Emprunteur' },
      { value: '/assurer/habitation', label: '🏡 Habitation' },
      { value: '/assurer/auto-moto',  label: '🚗 Auto / Moto' },
    ],
  },
};

const HIDE_SCROLL_HEADER = ['/contact', '/rendez-vous', '/simulation'];
const STICKY_MOBILE_PAGES = ['/rendez-vous'];

export default function Header() {
  const [drawerOpen, setDrawerOpen]       = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [scrolled, setScrolled]           = useState(false);
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const matchKey         = Object.keys(SCROLL_HEADER_CONFIG).find(k => pathname.startsWith(k));
  const scrollConfig     = matchKey ? SCROLL_HEADER_CONFIG[matchKey] : null;
  const hideScrollHeader = HIDE_SCROLL_HEADER.some(p => pathname.startsWith(p));
  const isStickyMobile   = STICKY_MOBILE_PAGES.some(p => pathname.startsWith(p));

  return (
    <>
      {/* Header principal */}
      <header className={`site-header${isStickyMobile ? ' site-header--sticky' : ''}`}>
        <div className="header-container">
          {/* Logo */}
          <Link href="/" className="site-logo">
            <Image src="/images/Orizia_logo-removebg-preview.png" alt="Orizia Courtage" width={160} height={75} style={{ objectFit: 'contain' }} priority />
          </Link>

          {/* Nav Desktop */}
          <nav className="desktop-nav">
            <ul className="main-menu">
              {NAV.map(item => (
                <li key={item.label} className="menu-item">
                  <a href="#">{item.label} <span className="arrow">▾</span></a>
                  <div className="mega-menu">
                    <div className="mega-menu-inner">
                      <div className="mega-links">
                        <h3>{item.label}</h3>
                        <ul>
                          {item.links.map(l => (
                            <li key={l.href}>
                              <Link href={l.href}>
                                <strong>{l.title}</strong>
                                <span>{l.sub}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mega-cta">
                        <div className="cta-image" style={{ backgroundImage: `url(${item.cta.img})` }} />
                        <div className="cta-content">
                          <h4>{item.cta.label}</h4>
                          <p>{item.cta.text}</p>
                          <Link href={item.cta.href} className="btn-mega">{item.cta.label} →</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Boutons droite */}
          <div className="header-right">
            <Link href="/contact" style={{ textDecoration: 'none', color: 'var(--orizia-dark)', fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap' }}>
              Contactez-nous
            </Link>
            <Link href="/espace-client" className="btn-client">👤 Espace Client</Link>
            <button className="mobile-toggle" onClick={() => setDrawerOpen(true)} aria-label="Menu">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mini header mobile au scroll — masqué sur certaines pages */}
      {!hideScrollHeader && (
        <div className={`mobile-scroll-header${scrolled ? ' visible' : ''}`}>
          <Link href="/" className="mobile-scroll-logo">
            <Image src="/images/Orizia_logo-removebg-preview.png" alt="Orizia" width={90} height={40} style={{ objectFit: 'contain' }} priority />
          </Link>
          <select
             key={pathname}
            id="projet-select"
            name="projet"
            className="mobile-scroll-select"
            defaultValue=""
            onChange={e => { if (e.target.value) router.push(e.target.value); }}
          >
            <option value="" disabled>
              {scrollConfig ? scrollConfig.placeholder : 'Quel est votre projet ?'}
            </option>
            {scrollConfig
              ? scrollConfig.options.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))
              : (
                <>
                  <option value="/investir">💼 Investir</option>
                  <option value="/financer">🏠 Financer</option>
                  <option value="/assurer">🛡️ Assurer</option>
                </>
              )
            }
          </select>
        </div>
      )}

      {/* Overlay */}
      <div className={`mobile-overlay${drawerOpen ? ' open' : ''}`} onClick={() => setDrawerOpen(false)} />

      {/* Tiroir mobile */}
      <div className={`mobile-drawer${drawerOpen ? ' open' : ''}`}>
        <div className="mobile-drawer-header">
          <Image src="/images/Orizia_logo.jpg" alt="Orizia" width={120} height={50} style={{ objectFit: 'contain' }} />
          <button className="close-mobile" onClick={() => setDrawerOpen(false)}>✕</button>
        </div>
        <div className="mobile-drawer-content">
          <ul className="mobile-menu">
            {NAV.map((item, i) => (
              <li key={item.label}>
                <div className="mobile-accordion-title" onClick={() => setOpenAccordion(openAccordion === i ? null : i)}>
                  {item.label} <span>{openAccordion === i ? '−' : '+'}</span>
                </div>
                <div className="mobile-accordion-body" style={{ display: openAccordion === i ? 'flex' : 'none', flexDirection: 'column' }}>
                  {item.links.map(l => (
                    <Link key={l.href} href={l.href} onClick={() => setDrawerOpen(false)}>{l.title}</Link>
                  ))}
                  <Link href={item.cta.href} className="mobile-accordion-cta" onClick={() => setDrawerOpen(false)}>
                    {item.cta.label}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="mobile-action-buttons">
            <Link href="/contact" className="mobile-btn-contact" onClick={() => setDrawerOpen(false)}>Contactez-nous</Link>
            <Link href="/espace-client" className="btn-client mobile-btn-client" onClick={() => setDrawerOpen(false)}>👤 Espace Client</Link>
          </div>
        </div>
      </div>
    </>
  );
}