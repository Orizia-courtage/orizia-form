'use client';

import { useState } from 'react';
import Link from 'next/link';

const PROFILS = [
  {
    id: 'locataire',
    icon: '🔑',
    label: 'Locataire',
    desc: 'Vous louez votre logement',
    tarif: '~160€/an',
    garanties: ['Risques locatifs (obligatoire)', 'Responsabilité civile', 'Meubles & effets personnels', 'Dégâts des eaux'],
    conseil: 'L\'attestation est exigée par votre propriétaire. Je vous la fournis rapidement.',
    color: 'var(--orizia-primary)',
  },
  {
    id: 'proprietaire',
    icon: '🏡',
    label: 'Propriétaire occupant',
    desc: 'Vous êtes propriétaire de votre résidence',
    tarif: '~220€/an',
    garanties: ['Murs & structure du bâtiment', 'Dépendances (garage, cave)', 'Contenu & mobilier', 'Catastrophes naturelles'],
    conseil: 'La valeur à neuf est recommandée pour éviter la sous-assurance.',
    color: '#d97706',
    featured: true,
  },
  {
    id: 'pno',
    icon: '🏢',
    label: 'Propriétaire non-occupant',
    desc: 'Vous louez votre bien à des tiers',
    tarif: '~110€/an',
    garanties: ['Murs & structure', 'Responsabilité civile bailleur', 'Vacance locative couverte', 'Déductible des revenus fonciers'],
    conseil: 'Indispensable entre deux locataires. Souvent oublié par les investisseurs.',
    color: '#7c3aed',
  },
];

export default function ProfilHabitationSelector() {
  const [selected, setSelected] = useState(null);
  const profil = selected !== null ? PROFILS[selected] : null;

  return (
    <div className="profil-hab-wrap">
      {/* Sélecteur */}
      <div className="profil-hab-tabs">
        {PROFILS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setSelected(i)}
            className={`profil-hab-tab${selected === i ? ' profil-hab-tab--active' : ''}`}
            style={selected === i ? { borderColor: p.color, background: `${p.color}12` } : {}}
          >
            <span className="profil-hab-icon">{p.icon}</span>
            <span className="profil-hab-label">{p.label}</span>
            <span className="profil-hab-desc">{p.desc}</span>
          </button>
        ))}
      </div>

      {/* Résultat */}
      {profil ? (
        <div className="profil-hab-result" style={{ borderColor: `${profil.color}40` }}>
          <div className="profil-hab-result-header">
            <div>
              <span style={{ fontSize: '2rem' }}>{profil.icon}</span>
              <h3 style={{ color: profil.color }}>{profil.label}</h3>
              <div className="profil-hab-tarif">Tarif moyen : <strong style={{ color: profil.color }}>{profil.tarif}</strong></div>
            </div>
            <div className="profil-hab-conseil" style={{ borderColor: `${profil.color}40`, background: `${profil.color}08` }}>
              <span style={{ color: profil.color, fontWeight: 800, fontSize: '0.78rem', display: 'block', marginBottom: 4 }}>💡 Mon conseil</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--orizia-dark)', opacity: 0.8, margin: 0, lineHeight: 1.5 }}>{profil.conseil}</p>
            </div>
          </div>

          <div className="profil-hab-garanties">
            <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: profil.color, marginBottom: 12 }}>
              Garanties essentielles
            </div>
            <div className="profil-hab-garanties-grid">
              {profil.garanties.map(g => (
                <div key={g} className="profil-hab-garantie" style={{ borderLeft: `3px solid ${profil.color}` }}>
                  ✅ {g}
                </div>
              ))}
            </div>
          </div>

          <div className="profil-hab-cta">
            <Link href="/rendez-vous" className="fin-btn-primary">
              📅 Obtenir mon devis {profil.label.toLowerCase()}
            </Link>
          </div>
        </div>
      ) : (
        <div className="profil-hab-placeholder">
          <span style={{ fontSize: '2.5rem', opacity: 0.3 }}>🏠</span>
          <p>Sélectionnez votre profil pour voir les garanties recommandées et une estimation de tarif</p>
        </div>
      )}
    </div>
  );
}
