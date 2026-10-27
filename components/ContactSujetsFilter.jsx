'use client';

import { useState } from 'react';
import Link from 'next/link';

import Icon from '@/components/Icon';
const SUJETS = [
  { icon: 'house-plus', label: 'Crédit immobilier',        href: '/financer/credit-immobilier',       cat: 'financer' },
  { icon: 'refresh-cw', label: 'Regroupement de crédits',  href: '/financer/regroupement-credits',    cat: 'financer' },
  { icon: 'euro', label: 'Prêt personnel',            href: '/financer/pret-personnel',          cat: 'financer' },
  { icon: 'scale', label: 'Rachat de soulte',          href: '/financer/rachat-soulte',           cat: 'financer' },
  { icon: 'shield-check', label: 'Assurance vie',            href: '/investir/assurance-vie',           cat: 'investir' },
  { icon: 'landmark', label: 'Plan Épargne Retraite',     href: '/investir/per',                     cat: 'investir' },
  { icon: 'building-2', label: 'SCPI',                      href: '/investir/scpi',                    cat: 'investir' },
  { icon: 'trending-up', label: 'Crowdfunding',              href: '/investir/crowdfunding',            cat: 'investir' },
  { icon: 'clipboard-list', label: 'Assurance emprunteur',      href: '/assurer/assurance-emprunteur',     cat: 'assurer' },
  { icon: 'house', label: 'Assurance habitation',      href: '/assurer/assurance-habitation',     cat: 'assurer' },
  { icon: 'car', label: 'Assurance auto & moto',     href: '/assurer/auto-moto',                cat: 'assurer' },
];

const CATS = [
  { id: 'all',     label: 'Tous les sujets', icon: 'target' },
  { id: 'financer', label: 'Financer',       icon: 'euro' },
  { id: 'investir', label: 'Investir',       icon: 'trending-up' },
  { id: 'assurer',  label: 'Assurer',        icon: 'shield-check' },
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
            <span><Icon name={c.icon} /></span> {c.label}
          </button>
        ))}
      </div>

      {/* Grille */}
      <div className="contact-sujets-grid">
        {filtered.map(s => (
          <Link key={s.label} href={s.href} className="contact-sujet-card">
            <span className="contact-sujet-icon"><Icon name={s.icon} /></span>
            <span className="contact-sujet-label">{s.label}</span>
            <span className="contact-sujet-arrow"><Icon name="arrow-right" className="oz-arrow" /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
