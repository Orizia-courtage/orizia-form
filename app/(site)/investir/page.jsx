import Link from 'next/link';

export const metadata = {
  title: 'Investir son argent en 2026 : Placements & Conseils | Orizia',
  description: 'SCPI, Assurance Vie, PER : ne laissez plus votre banque limiter vos rendements. Courtière indépendante, je crée votre stratégie de placement sur-mesure.',
  keywords: [
    'conseiller en gestion de patrimoine indépendant',
    'investir son argent 2026',
    'meilleur placement SCPI',
    'optimiser assurance vie courtier',
    'comparatif PER',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/investir' },
  openGraph: {
    title: 'Investir son argent en 2026 : Placements & Conseils | Orizia',
    description: 'Ne laissez plus votre argent dormir. Je sélectionne les meilleures SCPI, Assurances Vie et PER du marché pour construire votre patrimoine.',
    url: 'https://orizia-courtage.fr/investir',
    type: 'website',
  },
};

const PRODUITS = [
  {
    href: '/investir/scpi',
    icon: '🏢',
    title: 'SCPI',
    sub: 'L\'immobilier sans contrainte',
    desc: 'Investissez dans l\'immobilier professionnel (bureaux, santé, logistique) et touchez des loyers réguliers, sans aucune gestion locative de votre côté.',
    tag: 'Rendement régulier',
    tagColor: 'var(--orizia-primary)',
  },
  {
    href: '/investir/assurance-vie',
    icon: '🛡️',
    title: 'Assurance Vie',
    sub: 'Le couteau suisse du patrimoine',
    desc: 'Oubliez les fonds en euros moribonds de votre banque. Je construis une allocation sur-mesure (fonds garantis + unités de compte) pour dynamiser votre capital.',
    tag: 'Liquidité & Transmission',
    tagColor: 'var(--orizia-accent)',
  },
  {
    href: '/investir/per',
    icon: '🏦',
    title: 'PER',
    sub: 'Défiscaliser pour la retraite',
    desc: 'Transformez vos impôts en patrimoine. C\'est le seul placement qui vous fait gagner de l\'argent l\'année même de votre versement grâce à la déduction fiscale.',
    tag: 'Réduction d\'impôt',
    tagColor: '#b45309',
  },
  {
    href: '/investir/crowdfunding',
    icon: '📈',
    title: 'Crowdfunding',
    sub: 'Le boost à court terme',
    desc: 'Financez des opérations de promotion immobilière triées sur le volet. L\'objectif ? Viser un rendement élevé sur une durée courte (12 à 36 mois).',
    tag: 'Dynamique',
    tagColor: '#0369a1',
  },
];

const STATS = [
  { value: '+500', label: 'Clients accompagnés' },
  { value: '4,8★', label: 'Note moyenne Google' },
  { value: '15 ans', label: 'D\'expérience en finance' },
  { value: '100%', label: 'Indépendante' },
];

const POURQUOI = [
  { icon: '🎯', title: 'Indépendance totale', desc: 'Je n\'appartiens à aucun groupe bancaire. Mon seul intérêt, c\'est de trouver le produit qui sert VOS objectifs.' },
  { icon: '🔒', title: 'Sécurité absolue', desc: 'Certifiée ORIAS et contrôlée par l\'ACPR, mon métier est strictement encadré pour protéger votre capital.' },
  { icon: '📞', title: 'Interlocutrice unique', desc: 'Pas de plateforme ni de turnover. Je gère votre dossier de la première stratégie jusqu\'aux bilans annuels.' },
  { icon: '💶', title: 'Zéro honoraire', desc: 'Mon accompagnement est gratuit pour vous. Je suis rémunérée par les sociétés de gestion partenaires, sans surcoût.' },
];

export default function InvestirPage() {
  return (
    <main>

      {/* ── HERO ── */}
      <section style={{ background: 'var(--orizia-accent)', padding: '70px 20px 60px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            display: 'inline-block', background: 'rgba(255,255,255,0.15)',
            color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 1,
            textTransform: 'uppercase', padding: '6px 18px', borderRadius: 100,
            marginBottom: 20, border: '1px solid rgba(255,255,255,0.3)'
          }}>
            💼 Investissement & Patrimoine
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900,
            color: '#fff', lineHeight: 1.15, marginBottom: 18
          }}>
            Ne laissez plus votre banque<br />décider du sort de votre épargne
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', lineHeight: 1.6,
            marginBottom: 32, maxWidth: 600, margin: '0 auto 32px'
          }}>
            En tant que courtière indépendante, j'analyse votre situation et je vous donne 
            accès aux meilleurs placements du marché, inaccessibles dans une banque classique.
          </p>
          <Link href="/rendez-vous" className="investir-hero-btn" style={{ 
            display: 'inline-block', background: '#fff', color: 'var(--orizia-accent)', 
            padding: '14px 28px', borderRadius: 8, fontWeight: 800, textDecoration: 'none' 
          }}>
            Faire un bilan patrimonial gratuit →
          </Link>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#fff', padding: '32px 20px', borderBottom: '1px solid rgba(58,111,108,0.12)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, textAlign: 'center' }}>
          {STATS.map(s => (
            <div key={s.label} style={{ padding: '8px 0' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--orizia-accent)' }}>{s.value}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--orizia-primary)', fontWeight: 600, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CITATION CINDY ── */}
      <section style={{ background: 'var(--orizia-light)', padding: '60px 20px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: '36px 40px',
            borderLeft: '5px solid var(--orizia-primary)',
            boxShadow: '0 4px 24px rgba(58,111,108,0.08)',
          }}>
            <p style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'var(--orizia-accent)',
              lineHeight: 1.55,
              marginBottom: 16,
            }}>
              « L'erreur la plus courante n'est pas de faire de mauvais placements, c'est de laisser son argent se faire grignoter par l'inflation par peur de mal faire. »
            </p>
            <p style={{
              fontSize: '1rem',
              color: 'var(--orizia-dark)',
              lineHeight: 1.75,
              margin: '0 0 20px',
              opacity: 0.8,
            }}>
              Mon rôle est de démystifier l'investissement. Je vous explique clairement où va votre argent, je filtre les produits toxiques ou trop chargés en frais de votre banque, et je construis une stratégie qui vous ressemble. En toute indépendance, et sans aucun jargon financier.
            </p>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--orizia-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              — Cindy Urbansky, courtière indépendante · Orizia Courtage
            </span>
          </div>
        </div>
      </section>

      {/* ── PRODUITS ── */}
      <section style={{ background: '#fff', padding: '60px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--orizia-accent)', marginBottom: 10 }}>
              Mes solutions d'investissement
            </h2>
            <p style={{ color: 'var(--orizia-dark)', opacity: 0.7, fontSize: '1rem' }}>
              Je sélectionne rigoureusement chaque fonds pour vous offrir le meilleur rapport rendement / risque.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {PRODUITS.map(p => (
              <Link 
                key={p.href} 
                href={p.href} 
                className="investir-card"
                style={{
                  display: 'block', padding: 24, background: '#fff', border: '1px solid #e2e8f0', 
                  borderRadius: 16, textDecoration: 'none', transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>{p.icon}</div>
                <span style={{
                  display: 'inline-block', background: p.tagColor, color: '#fff',
                  fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px',
                  borderRadius: 100, marginBottom: 10, letterSpacing: 0.5
                }}>
                  {p.tag}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--orizia-accent)', marginBottom: 4 }}>{p.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--orizia-primary)', fontWeight: 600, marginBottom: 10 }}>{p.sub}</p>
                <p style={{ fontSize: '0.88rem', color: 'var(--orizia-dark)', opacity: 0.75, lineHeight: 1.55 }}>{p.desc}</p>
                <div style={{ marginTop: 16, fontSize: '0.88rem', fontWeight: 700, color: 'var(--orizia-primary)' }}>
                  Découvrir cette solution →
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <p style={{ fontSize: '0.9rem', opacity: 0.7, fontStyle: 'italic' }}>
              Vous ne savez pas par quoi commencer ? C'est normal. Discutons-en lors d'un premier échange.
            </p>
          </div>
        </div>
      </section>

      {/* ── POURQUOI ORIZIA ── */}
      <section style={{ background: 'var(--orizia-light)', padding: '60px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 900, color: 'var(--orizia-accent)', marginBottom: 16 }}>
            Pourquoi investir à mes côtés ?
          </h2>
          <p style={{ color: 'var(--orizia-dark)', opacity: 0.7, fontSize: '1rem', marginBottom: 40, lineHeight: 1.6 }}>
            Le monde de la finance est complexe. Je simplifie les processus et je m'assure que vos intérêts passent toujours en premier.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, textAlign: 'left' }}>
            {POURQUOI.map(item => (
              <div key={item.title} style={{ padding: 20, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 10 }}>{item.icon}</div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--orizia-accent)', marginBottom: 6 }}>{item.title}</h4>
                <p style={{ fontSize: '0.83rem', color: 'var(--orizia-dark)', opacity: 0.75, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ background: 'var(--orizia-primary)', padding: '50px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 900, color: '#fff', marginBottom: 14 }}>
            Prêt à réveiller votre épargne ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', marginBottom: 28, lineHeight: 1.6 }}>
            Faisons connaissance. Nous analyserons votre patrimoine actuel et définirons ensemble une stratégie pour atteindre vos objectifs financiers.
          </p>
          <Link href="/rendez-vous" className="investir-hero-btn" style={{ 
            display: 'inline-block', background: '#fff', color: 'var(--orizia-accent)', 
            padding: '14px 28px', borderRadius: 8, fontWeight: 800, textDecoration: 'none' 
          }}>
            📅 Planifier mon bilan gratuit →
          </Link>
          <p style={{ marginTop: 20, fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', maxWidth: 450, margin: '20px auto 0' }}>
            L'investissement comporte des risques de perte en capital. Orizia Courtage, cabinet indépendant immatriculé à l'ORIAS.
          </p>
        </div>
      </section>

    </main>
  );
}