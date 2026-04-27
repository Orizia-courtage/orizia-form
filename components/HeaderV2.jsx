'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import MobileDrawer from '@/components/MobileDrawer';

// ── Icônes SVG inline ────────────────────────────────────────────────────────
const Icons = {
  Crowdfunding: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  PER: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  AssuranceVie: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  SCPI: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  CreditImmo: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><circle cx="12" cy="13" r="3"/>
    </svg>
  ),
  Regroupement: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    </svg>
  ),
  PretPerso: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </svg>
  ),
  Soulte: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>
    </svg>
  ),
  Emprunteur: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
    </svg>
  ),
  Habitation: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/>
    </svg>
  ),
  Auto: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Menu: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
};

// ── Données de navigation ────────────────────────────────────────────────────
const NAV = [
  {
    label: 'Investir',
    href: '/investir',
    color: '#C9A96E',
    tagline: 'Faites fructifier votre capital',
    stat: { number: '4,2%', label: 'Rendement moyen SCPI 2024' },
    bgImage: '/images/investir.webp',
    links: [
      { href: '/investir/crowdfunding',  title: 'Crowdfunding',   sub: 'Financement participatif', Icon: Icons.Crowdfunding },
      { href: '/investir/per',           title: 'PERP / PER',     sub: 'Préparez votre retraite',  Icon: Icons.PER },
      { href: '/investir/assurance-vie', title: 'Assurance Vie',  sub: 'Épargne & transmission',   Icon: Icons.AssuranceVie },
      { href: '/investir/scpi',          title: 'SCPI',           sub: 'Immobilier de rendement',  Icon: Icons.SCPI },
    ],
    cta: { href: '/investir', label: 'Explorer la stratégie patrimoniale' },
  },
  {
    label: 'Financer',
    href: '/financer',
    color: '#C9A96E',
    tagline: 'Votre meilleur taux, négocié',
    stat: { number: '+40', label: 'Banques comparées' },
    bgImage: '/images/financer.webp',
    links: [
      { href: '/financer/credit-immobilier',    title: 'Crédit immobilier',       sub: 'Votre projet immobilier',      Icon: Icons.CreditImmo },
      { href: '/financer/regroupement-credits', title: 'Regroupement de crédits', sub: 'Réduisez vos mensualités',     Icon: Icons.Regroupement },
      { href: '/financer/pret-personnel',       title: 'Prêt personnel',          sub: 'Financez vos projets',         Icon: Icons.PretPerso },
      { href: '/financer/rachat-soulte',        title: 'Rachat de soulte',        sub: 'Divorce · Séparation',         Icon: Icons.Soulte },
    ],
    cta: { href: '/financer', label: 'Faire une simulation gratuite' },
  },
  {
    label: 'Assurer',
    href: '/assurer',
    color: '#C9A96E',
    tagline: 'Protégez ce qui compte',
    stat: { number: '60%', label: 'Économie moyenne sur assurance emprunteur' },
    bgImage: '/images/assurer.webp',
    links: [
      { href: '/assurer/assurance-emprunteur', title: 'Assurance emprunteur', sub: 'Protégez votre prêt',       Icon: Icons.Emprunteur },
      { href: '/assurer/assurance-habitation', title: 'Assurance habitation', sub: 'Votre logement sécurisé',   Icon: Icons.Habitation },
      { href: '/assurer/auto-moto',            title: 'Auto / Moto',          sub: 'Roulez en toute sérénité',  Icon: Icons.Auto },
    ],
    cta: { href: '/contact', label: 'Obtenir un devis personnalisé' },
  },
];

const CAL_LINK   = 'cindy-urbansky/rendez-vous';
const CAL_ORIGIN = 'https://cal.eu';

export default function HeaderV2() {
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [activeMenu, setActiveMenu]     = useState(null);
  const [scrolled, setScrolled]         = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [calReady, setCalReady]         = useState(false);
  const [isOnline, setIsOnline]         = useState(true);
  const calLoadingRef = useRef(false);
  const closeTimer    = useRef(null);
  const pathname      = usePathname();

  // ── Disponibilité (lun–ven 9h–18h) ─────────────────────────────────────
  const [dispoText, setDispoText] = useState('');
  
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const day = now.getDay(); // 0=dim, 6=sam
      const h   = now.getHours();
      const online = day >= 1 && day <= 5 && h >= 9 && h < 18;
      setIsOnline(online);
      setDispoText(online ? 'Disponible maintenant' : 'Disponible lun–ven 9h–18h');
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  // ── Scroll simple avec seuil unique ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Cache le header quand [data-hide-header] est visible ─────────────────
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
    return () => { clearTimeout(timer); observer?.disconnect(); };
  }, [pathname]);

  // ── Ferme le mega-menu à chaque navigation ───────────────────────────────
  useEffect(() => { setActiveMenu(null); }, [pathname]);

  // ── Cal.eu lazy load ─────────────────────────────────────────────────────
  const loadCal = useCallback(() => {
    return new Promise((resolve) => {
      if (window.Cal) { resolve(); return; }
      if (calLoadingRef.current) {
        const wait = setInterval(() => { if (window.Cal) { clearInterval(wait); resolve(); } }, 50);
        return;
      }
      calLoadingRef.current = true;
      const initCal = () => {
        window.Cal('init', { origin: CAL_ORIGIN });
        window.Cal('ui', { theme: 'light', styles: { branding: { brandColor: '#3a6f6c' } }, hideEventTypeDetails: false, layout: 'month_view' });
        setCalReady(true);
        resolve();
      };
      (function (C, A, L) {
        const p = (a, ar) => { a.q.push(ar); };
        const d = C.document;
        C.Cal = C.Cal || function (...args) {
          const cal = C.Cal;
          if (!cal.loaded) {
            cal.ns = {}; cal.q = cal.q || [];
            const s = d.createElement('script');
            s.src = A; s.async = true; s.onload = initCal;
            d.head.appendChild(s); cal.loaded = true;
          }
          if (args[0] === L) {
            const api = function (...a) { p(api, a); };
            api.q = [];
            const ns = args[1];
            if (typeof ns === 'string') { cal.ns[ns] = api; p(api, args); p(cal, [L, api]); }
            else { p(cal, args); }
            return;
          }
          p(cal, args);
        };
      })(window, `${CAL_ORIGIN}/embed.js`, 'init');
    });
  }, []);

  useEffect(() => {
    if (window.Cal) { window.Cal('init', { origin: CAL_ORIGIN }); setCalReady(true); }
  }, [pathname]);

  const openCalModal = useCallback(async () => {
    await loadCal();
    window.Cal('modal', { calLink: CAL_LINK, config: { layout: 'month_view' } });
  }, [loadCal]);

  // ── Gestion hover mega-menu avec délai ───────────────────────────────────
  const handleMenuEnter = (label) => {
    clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };
  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const activeItem = NAV.find(n => n.label === activeMenu);

  return (
    <>
      <header
        className={[
          'hv2',
          scrolled       ? 'hv2--scrolled' : '',
          headerHidden   ? 'hv2--hidden'   : '',
        ].filter(Boolean).join(' ')}
      >
        {/* ── Barre supérieure (disparaît au scroll) ── */}
        <div className="hv2-topbar">
          <div className="hv2-topbar-inner">
            <span className="hv2-topbar-trust">
              <span className="hv2-topbar-dot" />
              Courtier indépendant · Certifié ORIAS · Sans frais de dossier
            </span>
            <div className="hv2-topbar-links">
              <Link href="/qui-suis-je">Qui suis-je ?</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/actualites">Actualités</Link>
            </div>
          </div>
        </div>

        {/* ── Barre principale ── */}
        <div className="hv2-main">
          <div className="hv2-main-inner">

            {/* Logo */}
            <Link href="/" className="hv2-logo">
              <Image
                src="/images/Orizia_logo.webp"
                alt="Orizia Courtage"
                width={148}
                height={68}
                style={{ objectFit: 'contain' }}
                priority
                sizes="148px"
              />
            </Link>

            {/* Nav centrale */}
            <nav className="hv2-nav" aria-label="Navigation principale">
              {NAV.map(item => (
                <div
                  key={item.label}
                  className={`hv2-nav-item${activeMenu === item.label ? ' hv2-nav-item--active' : ''}`}
                  onMouseEnter={() => handleMenuEnter(item.label)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link href={item.href} className="hv2-nav-link">
                    {item.label}
                    <span className="hv2-nav-chevron">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </span>
                  </Link>
                  <span className="hv2-nav-underline" style={{ '--accent': item.color }} />
                </div>
              ))}
            </nav>

            {/* Droite */}
            <div className="hv2-right">
              {/* Dispo pill */}
              <div className={`hv2-dispo${isOnline ? ' hv2-dispo--online' : ' hv2-dispo--offline'}`}>
                <span className="hv2-dispo-dot" />
                <span className="hv2-dispo-label">{dispoText}</span>
              </div>

              {/* CTA Contact */}
              <Link href="/contact" className="hv2-contact-btn">
                <span className="hv2-contact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <span className="hv2-contact-text">
                  <span className="hv2-contact-main">Me contacter</span>
                  <span className="hv2-contact-sub">Réponse sous 24h</span>
                </span>
              </Link>

              {/* Burger mobile */}
              <button
                className="hv2-burger"
                onClick={() => setDrawerOpen(true)}
                aria-label="Ouvrir le menu"
              >
                <Icons.Menu />
              </button>
            </div>

          </div>
        </div>

        {/* ── Mega-menu ── */}
        <div
          className={`hv2-mega${activeMenu ? ' hv2-mega--open' : ''}`}
          onMouseEnter={() => clearTimeout(closeTimer.current)}
          onMouseLeave={handleMenuLeave}
          aria-hidden={!activeMenu}
        >
          {activeItem && (
            <div className="hv2-mega-inner" key={activeItem.label}>
              
              {/* Image de fond */}
              <div className="hv2-mega-bg">
                <Image
                  src={activeItem.bgImage}
                  alt={activeItem.label}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  sizes="1200px"
                  priority
                />
                <div className="hv2-mega-bg-overlay" />
              </div>

              {/* Contenu par-dessus */}
              <div className="hv2-mega-content">
                
                {/* Header avec tagline */}
                <div className="hv2-mega-header">
                  <h3 className="hv2-mega-title">{activeItem.label}</h3>
                  <p className="hv2-mega-tagline">{activeItem.tagline}</p>
                </div>

                {/* Grille produits */}
                <div className="hv2-mega-products">
                  {activeItem.links.map((l, i) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="hv2-mega-product"
                      onClick={() => setActiveMenu(null)}
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <span className="hv2-mega-product-icon" style={{ '--c': activeItem.color }}>
                        <l.Icon />
                      </span>
                      <span className="hv2-mega-product-text">
                        <strong>{l.title}</strong>
                        <span>{l.sub}</span>
                      </span>
                      <span className="hv2-mega-product-arrow"><Icons.Arrow /></span>
                    </Link>
                  ))}
                </div>

                {/* Footer : stat + trust + CTA */}
                <div className="hv2-mega-footer">
                  <div className="hv2-mega-footer-stat">
                    <span className="hv2-mega-footer-number" style={{ color: activeItem.color }}>
                      {activeItem.stat.number}
                    </span>
                    <span className="hv2-mega-footer-label">{activeItem.stat.label}</span>
                  </div>

                  <div className="hv2-mega-footer-trust">
                    {['ORIAS', 'Sans frais', 'Réponse 24h', '+40 banques'].map(t => (
                      <span key={t} className="hv2-mega-footer-badge">{t}</span>
                    ))}
                  </div>

                  <button 
                    className="hv2-mega-footer-cta" 
                    onClick={() => { setActiveMenu(null); openCalModal(); }}
                  >
                    <Icons.Calendar />
                    Prendre rendez-vous
                  </button>
                </div>

              </div>

            </div>
          )}
        </div>

        {/* Barre de progression scroll */}
        <div className="hv2-progress" aria-hidden="true" />
      </header>

      {/* Overlay mega-menu */}
      <div
        className={`hv2-overlay${activeMenu ? ' hv2-overlay--open' : ''}`}
        onClick={() => setActiveMenu(null)}
        aria-hidden="true"
      />

      {/* Overlay drawer mobile */}
      <div
        className={`mobile-overlay${drawerOpen ? ' open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onRdv={openCalModal}
      />
    </>
  );
}
