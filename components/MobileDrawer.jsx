'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  {
    label: 'Investir',
    href: '/investir',
    icon: '💼',
    sub: 'SCPI · PER · Assurance vie',
    color: '#C9A96E',
    bg: 'rgba(201,169,110,0.1)',
    border: 'rgba(201,169,110,0.35)',
  },
  {
    label: 'Financer',
    href: '/financer',
    icon: '🏠',
    sub: 'Crédit · Regroupement',
    color: '#432828',
    bg: 'rgba(67,40,40,0.07)',
    border: 'rgba(67,40,40,0.2)',
  },
  {
    label: 'Assurer',
    href: '/assurer',
    icon: '🛡️',
    sub: 'Emprunteur · Habitation · Auto',
    color: '#7a4f4f',
    bg: 'rgba(122,79,79,0.07)',
    border: 'rgba(122,79,79,0.2)',
  },
];

const SUB_LINKS = {
  Investir: [
    { href: '/investir/scpi',          label: 'SCPI',           sub: 'Immobilier de rendement', icon: '🏗️' },
    { href: '/investir/per',           label: 'PER',            sub: 'Préparez votre retraite', icon: '🏖️' },
    { href: '/investir/assurance-vie', label: 'Assurance Vie',  sub: 'Épargne & transmission', icon: '🛡️' },
    { href: '/investir/crowdfunding',  label: 'Crowdfunding',   sub: 'Financement participatif', icon: '🤝' },
  ],
  Financer: [
    { href: '/financer/credit-immobilier',    label: 'Crédit immobilier',       sub: 'Votre projet immobilier', icon: '🏠' },
    { href: '/financer/regroupement-credits', label: 'Regroupement de crédits', sub: 'Réduisez vos mensualités', icon: '🔄' },
    { href: '/financer/pret-personnel',       label: 'Prêt personnel',          sub: 'Financez vos projets', icon: '🚗' },
    { href: '/financer/rachat-soulte',        label: 'Rachat de soulte',        sub: 'Divorce · Séparation', icon: '⚖️' },
  ],
  Assurer: [
    { href: '/assurer/assurance-emprunteur', label: 'Assurance emprunteur', sub: 'Protégez votre prêt', icon: '💰' },
    { href: '/assurer/assurance-habitation', label: 'Assurance habitation', sub: 'Votre logement sécurisé', icon: '🏠' },
    { href: '/assurer/auto-moto',            label: 'Auto / Moto',          sub: 'Roulez sereinement', icon: '🚗' },
  ],
};

const SECONDARY = [
  { href: '/qui-suis-je', label: 'Qui suis-je ?', icon: '👤' },
  { href: '/contact',     label: 'Contact',        icon: '✉️' },
  { href: '/blog',        label: 'Blog',           icon: '📝' },
  { href: '/actualites',  label: 'Actualités',     icon: '📰' },
];

export default function MobileDrawer({ isOpen, onClose, onRdv }) {
  const [expanded, setExpanded] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [clickedCard, setClickedCard] = useState(null);

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

  // Reset expanded when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setExpanded(null);
      setHoveredCard(null);
      setClickedCard(null);
    }
  }, [isOpen]);

  const handleLink = () => {
    setExpanded(null);
    onClose();
  };

  const toggleExpand = (label) => {
    const newExpanded = expanded === label ? null : label;
    setExpanded(newExpanded);
    
    // Animation de feedback
    setClickedCard(label);
    setTimeout(() => setClickedCard(null), 300);
  };

  return (
    <>
      {/* Overlay flouté */}
      <div
        className={`mdr-overlay${isOpen ? ' mdr-overlay--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`mdr${isOpen ? ' mdr--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >

        {/* ── Header ── */}
        <div className="mdr-head">
          <Link href="/" onClick={handleLink} className="mdr-logo">
            <Image
              src="/images/Orizia_logo.webp"
              alt="Orizia Courtage"
              width={100}
              height={42}
              style={{ objectFit: 'contain' }}
            />
          </Link>
          <div className="mdr-head-right">
            <span className="mdr-head-badge">Courtier indépendant</span>
            <button className="mdr-close" onClick={onClose} aria-label="Fermer le menu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Corps scrollable ── */}
        <div className="mdr-body">

          {/* ── 1. Cards catégories ── */}
          <div className="mdr-cats">
            <p className="mdr-section-label">
              <span className="mdr-section-label-icon">✨</span>
              Mes expertises
            </p>
            <div className="mdr-cats-grid">
              {CATEGORIES.map((cat, idx) => (
                <div 
                  key={cat.label} 
                  className="mdr-cat-wrap"
                  style={{ 
                    animationDelay: `${idx * 50}ms`,
                  }}
                >
                  {/* Card cliquable → page catégorie */}
                  <Link
                    href={cat.href}
                    className={`mdr-cat-card${clickedCard === cat.label ? ' mdr-cat-card--clicked' : ''}`}
                    style={{ background: cat.bg, borderColor: cat.border }}
                    onClick={handleLink}
                    onMouseEnter={() => setHoveredCard(cat.label)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <span className="mdr-cat-icon">{cat.icon}</span>
                    <span className="mdr-cat-label" style={{ color: cat.color }}>{cat.label}</span>
                    <span className="mdr-cat-sub">{cat.sub}</span>
                    {hoveredCard === cat.label && (
                      <span className="mdr-cat-hover-hint">Voir tout</span>
                    )}
                  </Link>

                  {/* Bouton expand sous-pages */}
                  <button
                    className={`mdr-cat-expand${expanded === cat.label ? ' mdr-cat-expand--open' : ''}`}
                    onClick={() => toggleExpand(cat.label)}
                    aria-expanded={expanded === cat.label}
                    aria-label={`${expanded === cat.label ? 'Masquer' : 'Afficher'} les options ${cat.label}`}
                    style={{ borderColor: cat.border, color: cat.color }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── 2. Sous-pages (accordéon) ── */}
          {CATEGORIES.map((cat) => (
            expanded === cat.label && (
              <div key={cat.label} className="mdr-sublinks">
                <p className="mdr-section-label">
                  <span className="mdr-section-label-icon">{cat.icon}</span>
                  {cat.label} — détail
                </p>
                {SUB_LINKS[cat.label].map((l, idx) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="mdr-sublink"
                    onClick={handleLink}
                    style={{ 
                      animationDelay: `${idx * 40}ms`,
                    }}
                  >
                    <span className="mdr-sublink-icon">{l.icon}</span>
                    <span className="mdr-sublink-content">
                      <span className="mdr-sublink-title">{l.label}</span>
                      <span className="mdr-sublink-sub">{l.sub}</span>
                    </span>
                    <svg className="mdr-sublink-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </Link>
                ))}
              </div>
            )
          ))}

          {/* ── 3. Liens secondaires ── */}
          <div className="mdr-secondary">
            <p className="mdr-section-label">
              <span className="mdr-section-label-icon">🔗</span>
              Liens utiles
            </p>
            <div className="mdr-secondary-grid">
              {SECONDARY.map((s, idx) => (
                <Link 
                  key={s.href} 
                  href={s.href} 
                  className="mdr-secondary-link" 
                  onClick={handleLink}
                  style={{ 
                    animationDelay: `${idx * 40}ms`,
                  }}
                >
                  <span className="mdr-secondary-icon">{s.icon}</span>
                  <span className="mdr-secondary-label">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* ── Footer RDV ── */}
        <div className="mdr-footer">
          <div className="mdr-footer-trust">
            <span className="mdr-footer-trust-item">
              <span className="mdr-footer-trust-icon">🛡️</span>
              ORIAS certifié
            </span>
            <span className="mdr-footer-trust-sep">·</span>
            <span className="mdr-footer-trust-item">Sans frais</span>
            <span className="mdr-footer-trust-sep">·</span>
            <span className="mdr-footer-trust-item">
              <span className="mdr-footer-trust-icon">⚡</span>
              24h
            </span>
          </div>
          <button
            className="mdr-rdv-btn"
            onClick={() => { onClose(); onRdv(); }}
          >
            <span className="mdr-rdv-icon">📅</span>
            <span className="mdr-rdv-text">
              <strong>Prendre rendez-vous</strong>
              <small>Sans engagement · 100% en visio</small>
            </span>
            <svg className="mdr-rdv-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

      </div>
    </>
  );
}
