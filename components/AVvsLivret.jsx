'use client';

const COLS = [
  {
    id: 'livretA',
    label: 'Livret A',
    icon: '🏦',
    color: '#64748b',
    bg: 'rgba(100,116,139,0.05)',
    border: 'rgba(100,116,139,0.15)',
    best: false,
  },
  {
    id: 'pel',
    label: 'PEL',
    icon: '🏠',
    color: '#64748b',
    bg: 'rgba(100,116,139,0.05)',
    border: 'rgba(100,116,139,0.15)',
    best: false,
  },
  {
    id: 'av',
    label: 'Assurance Vie',
    icon: '🛡️',
    color: 'var(--orizia-primary)',
    bg: 'rgba(45,106,95,0.05)',
    border: 'rgba(45,106,95,0.25)',
    best: true,
  },
];

const CRITERES = [
  {
    label: 'Rendement 2026',
    icon: '📈',
    livretA: { val: '3%', note: 'Taux réglementé', ok: true },
    pel:     { val: '2,25%', note: 'Taux garanti à l\'ouverture', ok: null },
    av:      { val: '2,5–5%', note: 'Selon profil (fonds € + UC)', ok: true, star: true },
  },
  {
    label: 'Disponibilité',
    icon: '💸',
    livretA: { val: 'Immédiate', note: 'Retrait en 24–48h', ok: true },
    pel:     { val: 'Bloqué 4 ans', note: 'Pénalité si retrait avant', ok: false },
    av:      { val: 'À tout moment', note: 'Rachat partiel en quelques jours', ok: true, star: true },
  },
  {
    label: 'Fiscalité',
    icon: '🧾',
    livretA: { val: 'Exonéré', note: 'Aucun impôt ni PS', ok: true },
    pel:     { val: 'IR + PS', note: 'Intérêts imposables dès l\'ouverture', ok: false },
    av:      { val: '7,5% après 8 ans', note: 'Abattement 4 600€/an + taux réduit', ok: true, star: true },
  },
  {
    label: 'Transmission',
    icon: '🎁',
    livretA: { val: 'Succession', note: 'Intégré à l\'actif successoral', ok: false },
    pel:     { val: 'Succession', note: 'Intégré à l\'actif successoral', ok: false },
    av:      { val: 'Hors succession', note: '152 500€/bénéf. exonérés', ok: true, star: true },
  },
  {
    label: 'Plafond',
    icon: '🔝',
    livretA: { val: '22 950€', note: 'Plafond réglementaire', ok: null },
    pel:     { val: '61 200€', note: 'Plafond réglementaire', ok: null },
    av:      { val: 'Illimité', note: 'Aucun plafond de versement', ok: true, star: true },
  },
  {
    label: 'Supports',
    icon: '📊',
    livretA: { val: 'Taux fixe', note: 'Aucun choix de support', ok: false },
    pel:     { val: 'Taux fixe', note: 'Aucun choix de support', ok: false },
    av:      { val: 'ETF, SCPI, actions…', note: 'Large gamme selon contrat', ok: true, star: true },
  },
];

function StatusIcon({ ok }) {
  if (ok === true)  return <span style={{ color: '#16a34a', fontWeight: 900, fontSize: '1rem' }}>✓</span>;
  if (ok === false) return <span style={{ color: '#dc2626', fontWeight: 900, fontSize: '1rem' }}>✗</span>;
  return <span style={{ color: '#d97706', fontWeight: 900, fontSize: '1rem' }}>~</span>;
}

export default function AVvsLivret() {
  return (
    <div className="avvsl-wrap">
      <div className="avvsl-cols">
        {COLS.map(col => (
          <div
            key={col.id}
            className={`avvsl-col${col.best ? ' avvsl-col--best' : ''}`}
            style={{ borderColor: col.border, background: col.bg }}
          >
            {col.best && (
              <div className="avvsl-ribbon" style={{ background: col.color }}>
                ⭐ Recommandé
              </div>
            )}
            {/* En-tête colonne */}
            <div className="avvsl-col-head" style={{ borderBottomColor: col.border }}>
              <div className="avvsl-col-icon">{col.icon}</div>
              <div className="avvsl-col-name" style={{ color: col.color }}>{col.label}</div>
            </div>

            {/* Critères */}
            {CRITERES.map(cr => {
              const cell = cr[col.id];
              return (
                <div key={cr.label} className="avvsl-cell">
                  <div className="avvsl-cell-crit">
                    <span className="avvsl-cell-crit-icon">{cr.icon}</span>
                    {cr.label}
                  </div>
                  <div className="avvsl-cell-body">
                    <StatusIcon ok={cell.ok} />
                    <div>
                      <div
                        className="avvsl-cell-val"
                        style={{ color: cell.ok === true ? (col.best ? col.color : '#16a34a') : cell.ok === false ? '#dc2626' : '#d97706' }}
                      >
                        {cell.val}
                      </div>
                      <div className="avvsl-cell-note">{cell.note}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="crowd-risques-note" style={{ marginTop: 20 }}>
        💡 <strong>En résumé :</strong> le Livret A est idéal pour l'épargne de précaution (3–6 mois de charges).
        L'assurance vie prend le relais pour tout ce qui dépasse — meilleur rendement, fiscalité avantageuse
        après 8 ans, et transmission hors succession jusqu'à 152 500€ par bénéficiaire.
      </div>
    </div>
  );
}
