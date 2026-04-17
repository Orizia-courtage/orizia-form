const ETAPES = [
  {
    n: '1',
    icon: '💶',
    title: 'Vous versez',
    desc: 'Chaque mois ou ponctuellement, selon vos revenus. Pas de montant minimum imposé.',
    color: 'var(--orizia-accent)',
    textColor: '#fff',
  },
  {
    n: '2',
    icon: '🧾',
    title: 'L\'État vous rembourse',
    desc: 'Vos versements sont déduits de votre revenu imposable. L\'économie d\'impôt arrive dès l\'année suivante.',
    color: '#16a34a',
    textColor: '#fff',
  },
  {
    n: '3',
    icon: '📈',
    title: 'Votre épargne fructifie',
    desc: 'Fonds euros sécurisés ou unités de compte (ETF, SCPI…). La gestion pilotée sécurise automatiquement à l\'approche de la retraite.',
    color: '#d97706',
    textColor: '#fff',
  },
  {
    n: '4',
    icon: '🏖️',
    title: 'Vous sortez à la retraite',
    desc: 'En capital (une fois ou progressivement), en rente viagère, ou les deux. Vous choisissez selon votre situation.',
    color: 'var(--orizia-primary)',
    textColor: '#fff',
  },
];

const POINTS = [
  {
    icon: '🏠',
    title: 'Déblocage anticipé possible',
    desc: 'Achat de résidence principale, invalidité, décès du conjoint, surendettement — votre épargne n\'est pas une prison.',
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.06)',
    border: 'rgba(22,163,74,0.2)',
  },
  {
    icon: '📅',
    title: 'Créé par la loi PACTE 2019',
    desc: 'Remplace les anciens PERP, Madelin et PERCO. Un seul contrat, plus simple, plus flexible.',
    color: 'var(--orizia-primary)',
    bg: 'rgba(45,106,95,0.06)',
    border: 'rgba(45,106,95,0.2)',
  },
  {
    icon: '🎁',
    title: 'Transmission hors succession',
    desc: 'En cas de décès avant la retraite, le capital est transmis aux bénéficiaires avec la même fiscalité qu\'une assurance vie.',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.06)',
    border: 'rgba(217,119,6,0.2)',
  },
];

export default function PERDefinition() {
  return (
    <div className="per-def-wrap">

      {/* Timeline horizontale */}
      <div className="per-def-timeline">
        {ETAPES.map((e) => (
          <div key={e.n} className="per-def-step-wrap">
            <div className="per-def-step" style={{ borderColor: e.color }}>
              <div className="per-def-step-num" style={{ background: e.color, color: e.textColor }}>
                {e.n}
              </div>
              <div className="per-def-step-icon">{e.icon}</div>
              <div className="per-def-step-title">{e.title}</div>
              <div className="per-def-step-desc">{e.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 3 points clés */}
      <div className="per-def-points">
        {POINTS.map(p => (
          <div key={p.title} className="per-def-point" style={{ background: p.bg, border: `1px solid ${p.border}` }}>
            <div className="per-def-point-icon" style={{ color: p.color }}>{p.icon}</div>
            <div>
              <div className="per-def-point-title" style={{ color: p.color }}>{p.title}</div>
              <div className="per-def-point-desc">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
