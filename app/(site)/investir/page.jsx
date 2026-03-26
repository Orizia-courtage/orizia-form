import Link from 'next/link';

const PRODUITS = [
  {
    href: '/investir/scpi',
    icon: '🏢',
    title: 'SCPI',
    sub: 'Immobilier de rendement',
    desc: 'Investissez dans l\'immobilier professionnel sans les contraintes de gestion. Rendement moyen entre 4% et 6% par an.',
    tag: 'Populaire',
    tagColor: 'var(--orizia-primary)',
  },
  {
    href: '/investir/assurance-vie',
    icon: '🛡️',
    title: 'Assurance Vie',
    sub: 'Épargne & transmission',
    desc: 'Le placement préféré des Français. Faites fructifier votre épargne tout en préparant la transmission de votre patrimoine.',
    tag: 'Fiscalement avantageux',
    tagColor: 'var(--orizia-accent)',
  },
  {
    href: '/investir/per',
    icon: '🏦',
    title: 'PERP / PER',
    sub: 'Préparez votre retraite',
    desc: 'Constituez un capital pour votre retraite tout en réduisant votre impôt sur le revenu dès aujourd\'hui.',
    tag: 'Déduction fiscale',
    tagColor: '#b45309',
  },
  {
    href: '/investir/crowdfunding',
    icon: '📈',
    title: 'Crowdfunding',
    sub: 'Financement participatif',
    desc: 'Financez des projets immobiliers ou d\'entreprise à fort potentiel. Rendements attractifs sur des durées courtes.',
    tag: 'Rendement élevé',
    tagColor: '#0369a1',
  },
];

const STATS = [
  { value: '+500', label: 'Clients accompagnés' },
  { value: '4,8★', label: 'Note moyenne' },
  { value: '15 ans', label: 'D\'expérience' },
  { value: '100%', label: 'Indépendant' },
];

const POURQUOI = [
  { icon: '🎯', title: 'Conseil objectif',    desc: 'Nous comparons toutes les offres du marché sans conflit d\'intérêt.' },
  { icon: '🔒', title: 'Sécurité juridique',  desc: 'Certifiés ORIAS, nous sommes soumis à une réglementation stricte.' },
  { icon: '📞', title: 'Suivi personnalisé',  desc: 'Un conseiller dédié vous accompagne sur la durée.' },
  { icon: '💶', title: 'Gratuit pour vous',   desc: 'Notre rémunération est prise en charge par les établissements partenaires.' },
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
            Faites travailler<br />votre argent pour vous
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', lineHeight: 1.6,
            marginBottom: 32, maxWidth: 560, margin: '0 auto 32px'
          }}>
            Nos conseillers indépendants analysent votre situation et vous orientent vers les placements les plus adaptés à vos objectifs.
          </p>
          <Link href="/rendez-vous" className="investir-hero-btn">
            Prendre rendez-vous gratuitement →
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

      {/* ── PRODUITS ── */}
      <section style={{ background: 'var(--orizia-light)', padding: '60px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--orizia-accent)', marginBottom: 10 }}>
              Nos solutions d'investissement
            </h2>
            <p style={{ color: 'var(--orizia-dark)', opacity: 0.7, fontSize: '1rem' }}>
              Chaque solution est sélectionnée et négociée pour vous offrir le meilleur rapport rendement / risque.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {PRODUITS.map(p => (
              <Link key={p.href} href={p.href} className="investir-card">
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
                  En savoir plus →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI ORIZIA ── */}
      <section style={{ background: '#fff', padding: '60px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 900, color: 'var(--orizia-accent)', marginBottom: 16 }}>
            Pourquoi investir avec Orizia ?
          </h2>
          <p style={{ color: 'var(--orizia-dark)', opacity: 0.7, fontSize: '1rem', marginBottom: 40, lineHeight: 1.6 }}>
            En tant que courtier indépendant certifié ORIAS, nous n'avons aucun lien capitalistique avec les établissements que nous vous recommandons.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, textAlign: 'left' }}>
            {POURQUOI.map(item => (
              <div key={item.title} style={{ padding: 20, background: 'var(--orizia-light)', borderRadius: 12 }}>
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
            Prêt à faire fructifier votre épargne ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', marginBottom: 28, lineHeight: 1.6 }}>
            Prenez rendez-vous avec l'un de nos experts. C'est gratuit, sans engagement, et ça peut tout changer.
          </p>
          <Link href="/rendez-vous" className="investir-hero-btn">
            Prendre rendez-vous gratuitement →
          </Link>
        </div>
      </section>

    </main>
  );
}