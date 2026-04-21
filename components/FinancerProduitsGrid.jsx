import Link from 'next/link';

const PRODUITS = [
  {
    href: '/financer/credit-immobilier',
    icon: '🏠',
    badge: '⭐ Le plus demandé',
    badgeColor: 'var(--orizia-primary)',
    title: 'Crédit immobilier',
    sub: 'Achat · Construction · Investissement locatif',
    desc: 'Je mets 40+ banques en concurrence pour vous obtenir le meilleur taux. Je négocie aussi l\'assurance emprunteur — souvent 2× moins chère qu\'en banque.',
    points: ['Taux négocié au centime', 'Assurance emprunteur optimisée', 'Accompagnement jusqu\'au notaire'],
    color: 'var(--orizia-primary)',
    featured: true,
  },
  {
    href: '/financer/regroupement-credits',
    icon: '🔄',
    badge: null,
    title: 'Regroupement de crédits',
    sub: 'Réduire vos mensualités jusqu\'à −60%',
    desc: 'Plusieurs crédits qui pèsent sur votre budget ? Je les regroupe en un seul avec une mensualité allégée. Vous retrouvez du reste à vivre immédiatement.',
    points: ['Une seule mensualité réduite', 'Taux d\'endettement normalisé', 'Trésorerie complémentaire possible'],
    color: '#7c3aed',
    featured: false,
  },
  {
    href: '/financer/pret-personnel',
    icon: '💶',
    badge: null,
    title: 'Prêt personnel',
    sub: 'Auto · Travaux · Trésorerie',
    desc: 'Je compare les TAEG du marché et élimine les assurances facultatives imposées. Vous financez vos projets, pas les marges des organismes prêteurs.',
    points: ['Meilleur TAEG du marché', 'Sans assurances toxiques', 'Réponse de principe sous 48h'],
    color: '#d97706',
    featured: false,
  },
  {
    href: '/financer/rachat-soulte',
    icon: '⚖️',
    badge: null,
    title: 'Rachat de soulte',
    sub: 'Divorce · Séparation · Succession',
    desc: 'Vous souhaitez conserver votre bien en rachetant la part de votre co-propriétaire ? Je monte le financement et coordonne avec votre notaire.',
    points: ['Calcul de la soulte expliqué', 'Coordination notaire incluse', '+40 banques comparées'],
    color: '#16a34a',
    featured: false,
  },
];

export default function FinancerProduitsGrid() {
  return (
    <div className="fpg-grid">
      {PRODUITS.map(p => (
        <Link href={p.href} key={p.title} className={`fpg-card${p.featured ? ' fpg-card--featured' : ''}`} style={{ '--card-color': p.color }}>
          {p.badge && (
            <span className="fpg-badge" style={{ background: p.color }}>
              {p.badge}
            </span>
          )}
          <div className="fpg-icon">{p.icon}</div>
          <div className="fpg-sub">{p.sub}</div>
          <h3 className="fpg-title" style={{ color: p.color }}>{p.title}</h3>
          <p className="fpg-desc">{p.desc}</p>
          <ul className="fpg-points">
            {p.points.map(pt => (
              <li key={pt}>
                <span style={{ color: p.color }}>✓</span> {pt}
              </li>
            ))}
          </ul>
          <span className="fpg-link" style={{ color: p.color }}>Découvrir →</span>
        </Link>
      ))}
    </div>
  );
}
