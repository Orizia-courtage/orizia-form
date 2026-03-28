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
      { href: '/investir/per',           title: 'PERP / PER',     sub: 'Préparez votre retraite' },
      { href: '/investir/assurance-vie', title: 'Assurance Vie',  sub: 'Épargne & transmission' },
      { href: '/investir/scpi',          title: 'SCPI',           sub: 'Immobilier de rendement' },
    ],
    cta: { href: '/contact', label: 'Prendre rendez-vous', img: '/images/investir.jpg', text: 'Construisez votre stratégie patrimoniale avec nos experts.' },
  },
  {
    label: 'Financer',
    links: [
      { href: '/financer/credit-immobilier',    title: 'Crédit immobilier',       sub: 'Votre projet immobilier' },
      { href: '/financer/regroupement-credits', title: 'Regroupement de crédits', sub: 'Réduisez vos mensualités' },
      { href: '/financer/pret-personnel',       title: 'Prêt personnel',          sub: 'Financez vos projets' },
    ],
    cta: { href: '/simulation', label: 'Faire une simulation', img: '/images/financer.jpg', text: 'Obtenez votre simulation gratuite en quelques minutes.' },
  },
  {
    label: 'Assurer',
    links: [
      { href: '/assurer/emprunteur', title: 'Assurance emprunteur', sub: 'Protégez votre prêt' },
      { href: '/assurer/habitation', title: 'Assurance habitation', sub: 'Votre logement sécurisé' },
      { href: '/assurer/auto-moto',  title: 'Assurance auto/moto',  sub: 'Roulez en toute sérénité' },
    ],
    cta: { href: '/contact', label: 'Obtenir un devis', img: '/images/assurer.jpg', text: 'Comparez les meilleures offres du marché.' },
  },
];

const CATEGORY_PAGES = ['/investir', '/financer', '/assurer'];

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

const HIDE_SCROLL_HEADER  = ['/contact', '/rendez-vous', '/simulation'];
const STICKY_MOBILE_PAGES = ['/rendez-vous'];

// Détermine quel type de barre afficher
function getMobileScrollType(pathname) {
  if (HIDE_SCROLL_HEADER.some(p => pathname.startsWith(p))) return 'hidden';
  if (pathname === '/')                                       return 'home';      // select projet
  if (CATEGORY_PAGES.includes(pathname))                     return 'category';  // select produits
  const isProductPage = CATEGORY_PAGES.some(c => pathname.startsWith(c + '/'));
  if (isProductPage)                                         return 'product';   // bouton Cal
  return 'home'; // fallback
}

export default function Header() {
  const [drawerOpen, setDrawerOpen]       = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [scrolled, setScrolled]           = useState(false);
  const [headerHidden, setHeaderHidden]   = useState(false);
  const router   = useRouter();
  const pathname = usePathname();

  // Charge Cal.eu une seule fois
  useEffect(() => {
    if (document.querySelector('script[src="https://cal.eu/embed.js"]')) return;
    const script = document.createElement('script');
    script.src   = 'https://cal.eu/embed.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cache le header quand [data-hide-header] est visible
  useEffect(() => {
    setHeaderHidden(false);
    let observer;
    const timer = setTimeout(() => {
      const target = document.querySelector('[data-hide-header]');
      if (!target) return;
      observer = new IntersectionObserver(
        ([entry]) => setHeaderHidden(entry.isIntersecting),
        { threshold: 0.1 }
      );
      observer.observe(target);
    }, 200);
    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  const isStickyMobile  = STICKY_MOBILE_PAGES.some(p => pathname.startsWith(p));
  const mobileScrollType = getMobileScrollType(pathname);

  // Config du select selon la page catégorie courante
  const categoryKey    = CATEGORY_PAGES.find(c => pathname.startsWith(c));
  const scrollConfig   = categoryKey ? SCROLL_HEADER_CONFIG[categoryKey] : null;

  return (
    <>
      {/* ── Header principal ── */}
      <header className={[
        'site-header',
        isStickyMobile ? 'site-header--sticky'  : '',
        headerHidden   ? 'site-header--hidden'   : '',
        scrolled       ? 'site-header--scrolled' : '',
      ].filter(Boolean).join(' ')}>
        <div className="header-container">

          <Link href="/" className="site-logo">
            <Image src="/images/Orizia_logo-removebg-preview.png" alt="Orizia Courtage" width={160} height={75} style={{ objectFit: 'contain' }} priority />
          </Link>

          <nav className="desktop-nav">
            <ul className="main-menu">
              {NAV.map(item => (
                <li key={item.label} className="menu-item">
                  <Link href={`/${item.label.toLowerCase()}`}>
                    {item.label} <span className="arrow">▾</span>
                  </Link>
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

          <div className="header-right">
            <Link href="/contact" style={{ textDecoration: 'none', color: 'var(--orizia-dark)', fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap' }}>
              Contactez-nous
            </Link>
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

      {/* ── Barre sticky mobile ── */}
      {mobileScrollType !== 'hidden' && (
        <div className={`mobile-scroll-header${scrolled ? ' visible' : ''}`}>

          {/* CAS 1 — Accueil : select "Quel est votre projet ?" */}
          {mobileScrollType === 'home' && (
            <>
              <Link href="/" className="mobile-scroll-logo">
                <Image src="/images/Orizia_logo-removebg-preview.png" alt="Orizia" width={80} height={36} style={{ objectFit: 'contain' }} priority />
              </Link>
              <select
                key={pathname}
                className="mobile-scroll-select"
                defaultValue=""
                onChange={e => { if (e.target.value) router.push(e.target.value); }}
              >
                <option value="" disabled>Quel est votre projet ?</option>
                <option value="/investir">💼 Investir</option>
                <option value="/financer">🏠 Financer</option>
                <option value="/assurer">🛡️ Assurer</option>
              </select>
            </>
          )}

          {/* CAS 2 — Page catégorie : select produits */}
          {mobileScrollType === 'category' && scrollConfig && (
            <>
              <Link href="/" className="mobile-scroll-logo">
                <Image src="/images/Orizia_logo-removebg-preview.png" alt="Orizia" width={80} height={36} style={{ objectFit: 'contain' }} priority />
              </Link>
              <select
                key={pathname}
                className="mobile-scroll-select"
                defaultValue=""
                onChange={e => { if (e.target.value) router.push(e.target.value); }}
              >
                <option value="" disabled>{scrollConfig.placeholder}</option>
                {scrollConfig.options.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </>
          )}

          {/* CAS 3 — Page produit : bouton Cal RDV */}
          {mobileScrollType === 'product' && (
            <button
              data-cal-link="cindy-urbansky/rendez-vous"
              data-cal-origin="https://cal.eu"
              data-cal-config='{"layout":"month_view"}'
              className="mobile-sticky-btn mobile-sticky-btn--full"
            >
              📅 Prendre rendez-vous — Gratuit & sans engagement
            </button>
          )}

        </div>
      )}

      {/* ── Overlay ── */}
      <div className={`mobile-overlay${drawerOpen ? ' open' : ''}`} onClick={() => setDrawerOpen(false)} />

      {/* ── Tiroir mobile ── */}
      <div className={`mobile-drawer${drawerOpen ? ' open' : ''}`}>
        <div className="mobile-drawer-header">
          <Image src="/images/Orizia_logo-removebg-preview.png" alt="Orizia" width={120} height={50} style={{ objectFit: 'contain' }} />
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
          </div>
        </div>
      </div>
    </>
  );
}