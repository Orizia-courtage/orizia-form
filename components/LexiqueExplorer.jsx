'use client';

import { useMemo, useState } from 'react';
import Icon from '@/components/Icon';
import LexiqueGrid from '@/components/LexiqueGrid';

// Lexique : barre de recherche + catégories collantes, puis les cartes filtrées.
// Sans recherche, toutes les catégories s'affichent comme avant (ancres #credit, #assurance…).
const norm = (v) => String(v || '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');

export default function LexiqueExplorer({ categories }) {
  const [query, setQuery] = useState('');
  const q = norm(query.trim());
  const shown = useMemo(() => categories
    .map((c) => ({ ...c, termes: q ? c.termes.filter((t) => norm(t.terme).includes(q) || norm(t.def).includes(q)) : c.termes }))
    .filter((c) => c.termes.length), [categories, q]);
  const total = shown.reduce((n, c) => n + c.termes.length, 0);

  return (
    <>
      <div className="lex-toolbar">
        <div className="lex-toolbar-inner">
          <label className="lex-search">
            <Icon name="search" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Chercher un terme : TAEG, SCPI, Lemoine…" aria-label="Chercher un terme du lexique" />
          </label>
          <nav className="lex-chips" aria-label="Catégories du lexique">
            {categories.map((c) => <a key={c.id} href={`#${c.id}`} onClick={() => setQuery('')}>{c.label}</a>)}
          </nav>
        </div>
      </div>

      {q && <p className="lex-count" role="status">{total ? `${total} terme${total > 1 ? 's' : ''} trouvé${total > 1 ? 's' : ''}` : 'Aucun terme ne correspond. Posez-moi directement la question !'}</p>}

      {shown.map((cat, ci) => (
        <section key={cat.id} id={cat.id} className={`crowd-section lex-section ${ci % 2 === 0 ? 'crowd-section--white' : 'crowd-section--light'}`} style={{ scrollMarginTop: 150 }}>
          <div className="fin-section-inner">
            <div style={{ marginBottom: 28 }}>
              <h2 className="lex-cat-title" style={{ color: cat.color }}>{cat.label}</h2>
              <div style={{ height: 3, width: 48, background: cat.color, borderRadius: 2, marginTop: 10, opacity: 0.5 }} />
            </div>
            <LexiqueGrid key={q} termes={cat.termes} color={cat.color} />
          </div>
        </section>
      ))}
    </>
  );
}
