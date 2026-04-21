'use client';

import { useState } from 'react';

export default function LexiqueGrid({ termes, color }) {
  const [flipped, setFlipped] = useState(null); // index de la carte retournée

  return (
    <div className="lex-grid">
      {termes.map((t, i) => (
        <div
          key={t.terme}
          className={`lex-flip${flipped === i ? ' lex-flip--flipped' : ''}`}
          style={{ '--lex-color': color }}
        >
          <div className="lex-flip-inner">
            {/* ── Face avant : terme ── */}
            <div className="lex-face lex-face--front" onClick={() => setFlipped(i)}>
              <div className="lex-face-inner">
                <div className="lex-terme">{t.terme}</div>
                <div className="lex-hint">Appuyer pour la définition →</div>
              </div>
            </div>

            {/* ── Face arrière : définition ── */}
            <div className="lex-face lex-face--back" onClick={() => setFlipped(null)}>
              <button
                className="lex-back-btn"
                aria-label="Retour"
              >
                <i className="fa-solid fa-arrow-left" />
                Retour
              </button>
              <div className="lex-terme lex-terme--back">{t.terme}</div>
              <p className="lex-def">{t.def}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
