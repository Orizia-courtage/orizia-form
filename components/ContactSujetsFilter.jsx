'use client';

import { useState } from 'react';
import Link from 'next/link';

const SUJETS = [
  { icon: '🏡', label: 'Crédit immobilier',        href: '/financer/credit-immobilier',       cat: 'financer' },
  { icon: '🔄', label: 'Regroupement de crédits',  href: '/financer/regroupement-credits',    cat: 'financer' },
  { icon: '💶', label: 'Prêt personnel',            href: '/financer/pret-personnel',          cat: 'financer' },
  { icon: '⚖️', label: 'Rachat de soulte',          href: '/financer/rachat-soulte',           cat: 'financer' },
  { icon: '🛡️', label: 'Assurance vie',            href: '/investir/assurance-vie',           cat: 'investir' },
  { icon: '🏦', label: 'Plan Épargne Retraite',     href: '/investir/per',                     cat: 'investir' },
  { icon: '🏢', label: 'SCPI',                      href: '/investir/scpi',                    cat: 'investir' },
  { icon: '📈', label: 'Crowdfunding',              href: '/investir/crowdfunding',            cat: 'investir' },
  { icon: '📋', label: 'Assurance emprunteur',      href: '/assurer/assurance-emprunteur',     cat: 'assurer' },
  { icon: '🏠', label: 'Assurance habitation',      href: '/assurer/assurance-habitation',     cat: 'assurer' },
  { icon: '🚗', label: 'Assurance auto & moto',     href: '/assurer/auto-moto',                cat: 'assurer' },
];

const CATS = [
  { id: 'all',     label: 'Tous les sujets', icon: '🎯' },
  { id: 'financer', label: 'Financer',       icon: '💶' },
  { id: 'investir', label: 'Investir',       icon: '📈' },
  { id: 'assurer',  label: 'Assurer',        icon: '🛡️' },
];

export default function ContactSujetsFilter() {
  const [cat, setCat] = useState('all');
  const filtered = cat === 'all' ? SUJETS : SUJETS.filter(s => s.cat === cat);

  return (
    <div>
      {/* Filtres */}
      <div className="csf-filters">
        {CATS.map(c => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`csf-filter${cat === c.id ? ' csf-filter--active' : ''}`}
          >
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      {/* Grille */}
      <div className="contact-sujets-grid">
        {filtered.map(s => (
          <Link key={s.label} href={s.href} className="contact-sujet-card">
            <span className="contact-sujet-icon">{s.icon}</span>
            <span className="contact-sujet-label">{s.label}</span>
            <span className="contact-sujet-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
