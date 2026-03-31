'use client';
import { useState, useEffect, useCallback } from 'react';
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
      { href: '/assurer/assurance-emprunteur', title: 'Assurance emprunteur', sub: 'Protégez votre prêt' },
      { href: '/assurer/assurance-habitation', title: 'Assurance habitation', sub: 'Votre logement sécurisé' },
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
      { value: '/assurer/assurance-emprunteur', label: '📋 Emprunteur' },
      { value: '/assurer/assurance-habitation', label: '🏡 Habitation' },
      { value: '/assurer/auto-moto',  label: '🚗 Auto / Moto' },
    ],
  },
};

const HIDE_SCROLL_HEADER  = ['/contact', '/rendez-vous', '/simulation'];
const STICKY_MOBILE_PAGES = ['/rendez-vous'];

const CAL_LINK   = 'cindy-urbansky/rendez-vous';
const CAL_ORIGIN = 'https://cal.eu';

function getMobileScrollType(pathname) {
  if (HIDE_SCROLL_HEADER.some(p => pathname.startsWith(p))) return 'hidden';
  if (pathname === '/')                                       return 'home';
  if (CATEGORY_PAGES.includes(pathname))                     return 'category';
  const isProductPage = CATEGORY_PAGES.some(c => pathname.startsWith(c + '/'));
  if (isProductPage)                                         return 'product';
  return 'home';
}

export default function Header() {
  const [drawerOpen, setDrawerOpen]       = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [scrolled, setScrolled]           = useState(false);
  const [headerHidden, setHeaderHidden]   = useState(false);
  const [calReady, setCalReady]           = useState(false);
  const router   = useRouter();
  const pathname = usePathname();

  // ── Chargement + initialisation Cal.eu ──────────────────────────────────
  useEffect(() => {
    const initCal = () => {
      if (!window.Cal) return;
      // Initialisation officielle Cal.eu
      window.Cal('init', { origin: CAL_ORIGIN });
      window.Cal('ui', {
        theme: 'light',
        styles: { branding: { brandColor: '#3a6f6c' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
      setCalReady(true);
    };

    // Script déjà présent (navigation client-side)
    if (window.Cal) {
      initCal();
      return;
    }

    // Injection du snippet Cal.eu (méthode officielle pour SPA)
    (function (C, A, L) {
      const p = (a, ar) => { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function (...args) {
        const cal = C.Cal;
        if (!cal.loaded) {
          cal.ns  = {};
          cal.q   = cal.q || [];
          const s = d.createElement('script');
          s.src   = A;
          s.async = true;
          s.onload = initCal;
          d.head.appendChild(s);
          cal.loaded = true;
        }
        if (args[0] === L) {
          const api = function (...a) { p(api, a); };
          api.q = [];
          const ns = args[1];
          if (typeof ns === 'string') {
            cal.ns[ns] = api;
            p(api, args);
            p(cal, [L, api]);
          } else {
            p(cal, args);
          }
          return;
        }
        p(cal, args);
      };
    })(window, `${CAL_ORIGIN}/embed.js`, 'init');
  }, []);

  // ── Ré-init Cal à chaque changement de route (navigation client-side) ──
  useEffect(() => {
    if (window.Cal) {
      window.Cal('init', { origin: CAL_ORIGIN });
      setCalReady(true);
    }
  }, [pathname]);

  // ── Ouvre la modale Cal programmatiquement ──────────────────────────────
  const openCalModal = useCallback(() => {
    if (window.Cal) {
      window.Cal('modal', {
        calLink: CAL_LINK,
        config: { layout: 'month_view' },
      });
    }
  }, []);

  // ── Scroll listener ─────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Cache le header quand [data-hide-header] est visible ────────────────
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

  const isStickyMobile   = STICKY_MOBILE_PAGES.some(p => pathname.startsWith(p));
  const mobileScrollType = getMobileScrollType(pathname);
  const categoryKey      = CATEGORY_PAGES.find(c => pathname.startsWith(c));
  const scrollConfig     = categoryKey ? SCROLL_HEADER_CONFIG[categoryKey] : null;

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
            <Image
              src="/images/Orizia_logo.webp"
              alt="Orizia Courtage"
              width={160}
              height={75}
              style={{ objectFit: 'contain' }}
              priority
            />
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
                        {/* Remplacement du <h3> par un <div> */}
                        <div className="mega-menu-title">{item.label}</div>
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
                          {/* Remplacement du <h4> par un <div> */}
                          <div className="mega-cta-title">{item.cta.label}</div>
                          <p>{item.cta.text}</p>
                          <Link href={item.cta.href} className="btn-mega">
                            {item.cta.label} →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-right">
            <Link
              href="/contact"
              style={{ textDecoration: 'none', color: 'var(--orizia-dark)', fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap' }}
            >
              Contactez-nous
            </Link>
            <button
              className="mobile-toggle"
              onClick={() => setDrawerOpen(true)}
              aria-label="Menu"
            >
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

          {/* CAS 1 — Accueil */}
          {mobileScrollType === 'home' && (
            <>
              <Link href="/" className="mobile-scroll-logo">
                <Image
                  src="/images/Orizia_logo.webp"
                  alt="Orizia"
                  width={80}
                  height={36}
                  style={{ objectFit: 'contain' }}
                  priority
                />
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

          {/* CAS 2 — Page catégorie */}
          {mobileScrollType === 'category' && scrollConfig && (
            <>
              <Link href="/" className="mobile-scroll-logo">
                <Image
                  src="/images/Orizia_logo.webp"
                  alt="Orizia"
                  width={80}
                  height={36}
                  style={{ objectFit: 'contain' }}
                  priority
                />
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

          {/* CAS 3 — Page produit : bouton Cal via onClick ✅ */}
          {mobileScrollType === 'product' && (
            <button
              onClick={openCalModal}
              className="mobile-sticky-btn mobile-sticky-btn--full"
              disabled={!calReady}
            >
              📅 Prendre rendez-vous — Gratuit &amp; sans engagement
            </button>
          )}

        </div>
      )}

      {/* ── Overlay ── */}
      <div
        className={`mobile-overlay${drawerOpen ? ' open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* ── Tiroir mobile ── */}
      <div className={`mobile-drawer${drawerOpen ? ' open' : ''}`}>
        <div className="mobile-drawer-header">
          <Image
            src="/images/Orizia_logo.webp"
            alt="Orizia"
            width={120}
            height={50}
            style={{ objectFit: 'contain' }}
          />
          <button className="close-mobile" onClick={() => setDrawerOpen(false)}>✕</button>
        </div>
        <div className="mobile-drawer-content">
          <ul className="mobile-menu">
            {NAV.map((item, i) => (
              <li key={item.label}>
                <div
                  className="mobile-accordion-title"
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                >
                  {item.label} <span>{openAccordion === i ? '−' : '+'}</span>
                </div>
                <div
                  className="mobile-accordion-body"
                  style={{ display: openAccordion === i ? 'flex' : 'none', flexDirection: 'column' }}
                >
                  {item.links.map(l => (
                    <Link key={l.href} href={l.href} onClick={() => setDrawerOpen(false)}>
                      {l.title}
                    </Link>
                  ))}
                  <Link
                    href={item.cta.href}
                    className="mobile-accordion-cta"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {item.cta.label}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="mobile-action-buttons">
            {/* Bouton RDV dans le drawer aussi ✅ */}
            <button
              onClick={() => { setDrawerOpen(false); openCalModal(); }}
              className="mobile-btn-rdv"
            >
              📅 Prendre rendez-vous
            </button>
            <Link
              href="/contact"
              className="mobile-btn-contact"
              onClick={() => setDrawerOpen(false)}
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}