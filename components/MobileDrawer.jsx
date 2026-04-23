'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  {
    id: 'investir',
    label: 'Investir',
    href: '/investir',
    icon: '💼',
    gradient: 'linear-gradient(135deg, #C9A96E 0%, #8B7355 100%)',
    products: [
      { href: '/investir/scpi', label: 'SCPI', sub: 'Immobilier de rendement' },
      { href: '/investir/per', label: 'PER', sub: 'Préparez votre retraite' },
      { href: '/investir/assurance-vie', label: 'Assurance Vie', sub: 'Épargne & transmission' },
      { href: '/investir/crowdfunding', label: 'Crowdfunding', sub: 'Financement participatif' },
    ],
  },
  {
    id: 'financer',
    label: 'Financer',
    href: '/financer',
    icon: '🏠',
    gradient: 'linear-gradient(135deg, #432828 0%, #2a1818 100%)',
    products: [
      { href: '/financer/credit-immobilier', label: 'Crédit immobilier', sub: 'Votre projet immobilier' },
      { href: '/financer/regroupement-credits', label: 'Regroupement', sub: 'Réduisez vos mensualités' },
      { href: '/financer/pret-personnel', label: 'Prêt personnel', sub: 'Financez vos projets' },
      { href: '/financer/rachat-soulte', label: 'Rachat de soulte', sub: 'Divorce · Séparation' },
    ],
  },
  {
    id: 'assurer',
    label: 'Assurer',
    href: '/assurer',
    icon: '🛡️',
    gradient: 'linear-gradient(135deg, #7a4f4f 0%, #5a3737 100%)',
    products: [
      { href: '/assurer/assurance-emprunteur', label: 'Assurance emprunteur', sub: 'Protégez votre prêt' },
      { href: '/assurer/assurance-habitation', label: 'Assurance habitation', sub: 'Logement sécurisé' },
      { href: '/assurer/auto-moto', label: 'Auto / Moto', sub: 'Roulez sereinement' },
    ],
  },
];

const SECONDARY = [
  { href: '/qui-suis-je', label: 'Qui suis-je ?' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
  { href: '/actualites', label: 'Actualités' },
];

export default function MobileDrawer({ isOpen, onClose, onRdv }) {
  const [activeTab, setActiveTab] = useState('investir');
  const [isAnimating, setIsAnimating] = useState(false);

  // Masquer / afficher le ContactWidget selon l'état du drawer
  useEffect(() => {
    const widget = document.querySelector('.cw-trigger');
    if (!widget) return;
    widget.style.display = isOpen ? 'none' : '';
  }, [isOpen]);

  // Fermer avec Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Reset au close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setActiveTab('investir'), 300);
    }
  }, [isOpen]);

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsAnimating(false);
    }, 150);
  };

  const handleLink = () => {
    onClose();
  };

  const activeCategory = CATEGORIES.find(cat => cat.id === activeTab);

  return (
    <>
      {/* Overlay */}
      <div
        className={`mdr-overlay${isOpen ? ' mdr-overlay--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`mdr-v2${isOpen ? ' mdr-v2--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        {/* Header */}
        <div className="mdr-v2-header">
          <Link href="/" onClick={handleLink} className="mdr-v2-logo">
            <Image
              src="/images/Orizia_logo.webp"
              alt="Orizia Courtage"
              width={90}
              height={38}
              style={{ objectFit: 'contain' }}
            />
          </Link>
          <button className="mdr-v2-close" onClick={onClose} aria-label="Fermer le menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="mdr-v2-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`mdr-v2-tab${activeTab === cat.id ? ' mdr-v2-tab--active' : ''}`}
              onClick={() => handleTabChange(cat.id)}
              aria-selected={activeTab === cat.id}
            >
              <span className="mdr-v2-tab-icon">{cat.icon}</span>
              <span className="mdr-v2-tab-label">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="mdr-v2-content">
          {/* Hero Section */}
          <Link
            href={activeCategory.href}
            className="mdr-v2-hero"
            style={{ background: activeCategory.gradient }}
            onClick={handleLink}
          >
            <div className="mdr-v2-hero-icon">{activeCategory.icon}</div>
            <div className="mdr-v2-hero-text">
              <h2>Découvrir {activeCategory.label}</h2>
              <p>Vue d'ensemble et conseils</p>
            </div>
            <svg className="mdr-v2-hero-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>

          {/* Products Grid */}
          <div className={`mdr-v2-products${isAnimating ? ' mdr-v2-products--animating' : ''}`}>
            {activeCategory.products.map((product, idx) => (
              <Link
                key={product.href}
                href={product.href}
                className="mdr-v2-product"
                onClick={handleLink}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="mdr-v2-product-content">
                  <h3 className="mdr-v2-product-title">{product.label}</h3>
                  <p className="mdr-v2-product-sub">{product.sub}</p>
                </div>
                <svg className="mdr-v2-product-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </Link>
            ))}
          </div>

          {/* Secondary Links */}
          <div className="mdr-v2-secondary">
            {SECONDARY.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                className="mdr-v2-secondary-link"
                onClick={handleLink}
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mdr-v2-footer">
          <div className="mdr-v2-trust">
            <span>ORIAS</span>
            <span>·</span>
            <span>Sans frais</span>
            <span>·</span>
            <span>24h</span>
          </div>
          <button
            className="mdr-v2-cta"
            onClick={() => { onClose(); onRdv(); }}
          >
            <span className="mdr-v2-cta-icon">📅</span>
            <span className="mdr-v2-cta-text">
              <strong>Prendre rendez-vous</strong>
              <small>Gratuit · Sans engagement</small>
            </span>
            <svg className="mdr-v2-cta-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
