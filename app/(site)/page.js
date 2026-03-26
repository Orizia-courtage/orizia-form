import Image from 'next/image';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';


const SERVICES = [
  {
    img: '/images/investir.jpg',
    tag: 'Stratégie',
    title: 'Investir & Développer votre patrimoine',
    desc: 'Crowdfunding, SCPI, assurance-vie, PER… Faites fructifier votre capital avec nos solutions sur-mesure.',
    cta: { href: '/investir', label: 'Découvrir nos solutions' },
  },
  {
    img: '/images/financer.jpg',
    tag: 'Financement',
    title: 'Financer vos projets immobiliers',
    desc: 'Crédit immobilier, regroupement de crédits, prêt personnel… Nous négocions les meilleures conditions pour vous.',
    cta: { href: '/simulation', label: 'Faire une simulation' },
  },
  {
    img: '/images/assurer.jpg',
    tag: 'Protection',
    title: 'Assurer & Protéger ce qui compte',
    desc: 'Assurance emprunteur, habitation, auto/moto… Soyez protégé avec les meilleures offres du marché.',
    cta: { href: '/assurer', label: 'Obtenir un devis' },
  },
];

const STATS = [
  { value: '500+', label: 'Clients accompagnés' },
  { value: '15 ans', label: "D'expérience" },
  { value: '98%', label: 'Clients satisfaits' },
  { value: 'ORIAS', label: 'Courtier certifié' },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="orizia-hero">
        <div className="image-column">
          <div className="column-image">
            <Image src="/images/hero-orizia.jpg" alt="Orizia Courtage" fill priority />
          </div>
        </div>
        <div className="orizia-hero-content">
          <p style={{ color: 'var(--orizia-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
            Courtier indépendant certifié ORIAS
          </p>
          <h1>Expert en Financement &amp;<br />Stratégie Patrimoniale</h1>
          <p>Concrétisez vos projets immobiliers et développez votre capital avec un accompagnement indépendant et sur-mesure. Sécurisons votre avenir dès aujourd&apos;hui.</p>
          <div className="buttons">
            <Link href="/simulation" className="orizia-btn-main">Faire une simulation gratuite</Link>
            <Link href="/rendez-vous" className="orizia-btn-sec">Prendre rendez-vous</Link>
          </div>
        </div>
      </section>

      {/* ── CITATION CINDY ── */}
<section style={{ padding: '80px 20px', backgroundColor: 'var(--orizia-light)' }}>
  <div style={{
    maxWidth: 900,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: 60,
    flexWrap: 'wrap',
  }}>

    {/* Photo */}
    <div style={{
  width: 290,
  height: 290,
  flexShrink: 0,
  margin: '0 auto',
  position: 'relative',
  borderRadius: '50%',
  overflow: 'hidden',
  border: '4px solid var(--orizia-primary)',
  boxShadow: '0 12px 40px rgba(31,63,63,0.18)',
}}>
  <Image
    src="/images/photo-cindy.webp"
    alt="Cindy Urbansky – Orizia Courtage"
    fill
    style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
  />
</div>



    {/* Texte */}
    <div style={{ flex: 1, minWidth: 260 }}>
      <span style={{
        color: 'var(--orizia-primary)',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontSize: '0.8rem',
        marginBottom: 16,
        display: 'block',
      }}>
        Cindy Urbansky — Fondatrice
      </span>
      <blockquote style={{ margin: 0, padding: 0 }}>
        <p style={{
          color: 'var(--orizia-accent)',
          fontSize: '1.35rem',
          fontWeight: 800,
          lineHeight: 1.5,
          marginTop: 0,
          marginBottom: 16,
        }}>
          « Mon rôle ne se limite pas à trouver une solution.
        </p>
        <p style={{
          color: 'var(--orizia-dark)',
          fontSize: '1.05rem',
          fontWeight: 500,
          lineHeight: 1.7,
          margin: 0,
        }}>
          Je vous l&apos;explique, je la challenge, et je m&apos;assure qu&apos;elle vous correspond vraiment.
          Parce qu&apos;un bon choix financier, ce n&apos;est pas seulement un bon taux.
          C&apos;est un choix que vous comprenez. »
        </p>
      </blockquote>
    </div>

  </div>
</section>


      {/* ── STATS ── */}
      <section style={{ backgroundColor: 'var(--orizia-accent)', padding: '40px 20px' }}>
  <div className="home-stats-grid">
    {STATS.map(s => (
      <div key={s.label}>
        <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#E6F5F2' }}>{s.value}</div>
        <div style={{ fontSize: '0.9rem', color: 'rgba(230,245,242,0.75)', fontWeight: 600 }}>{s.label}</div>
      </div>
    ))}
  </div>
</section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--orizia-light)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ color: 'var(--orizia-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 8 }}>Nos expertises</p>
          <h2 style={{ textAlign: 'center', color: 'var(--orizia-accent)', fontSize: '2.2rem', fontWeight: 900, marginBottom: 50, marginTop: 0 }}>
            Un accompagnement complet,<br />de A à Z
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 30 }}>
            {SERVICES.map(s => (
  <ServiceCard key={s.title} {...s} />
))}

          </div>
        </div>
      </section>

      {/* ── POURQUOI ORIZIA ── */}
      <section style={{ padding: '80px 20px', backgroundColor: '#fff' }}>
  <div className="home-why-grid">
    <div>
      <p style={{ color: 'var(--orizia-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
        Pourquoi nous choisir
      </p>
      <h2 style={{ color: 'var(--orizia-accent)', fontSize: '2rem', fontWeight: 900, marginTop: 0, marginBottom: 24 }}>
        Un courtier 100% indépendant à vos côtés
      </h2>
      <p style={{ color: 'var(--orizia-dark)', lineHeight: 1.7, marginBottom: 16 }}>
        Chez Orizia Courtage, nous travaillons exclusivement pour vous. Sans lien exclusif avec aucun établissement financier, nous comparons objectivement les offres du marché pour vous obtenir les meilleures conditions.
      </p>
      {[
        'Étude personnalisée et gratuite',
        'Accès à plus de 40 partenaires bancaires',
        'Accompagnement de A à Z',
        'Courtier certifié ORIAS',
      ].map(item => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ color: 'var(--orizia-primary)', fontSize: '1.2rem' }}>✓</span>
          <span style={{ fontWeight: 600 }}>{item}</span>
        </div>
      ))}
      <Link href="/rendez-vous" className="orizia-btn-main" style={{ display: 'inline-block', marginTop: 24 }}>
        Prendre rendez-vous
      </Link>
    </div>

    <div className="home-why-image" style={{ position: 'relative', height: 420, borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 40px rgba(29,30,24,0.12)' }}>
      <Image src="/images/hero-orizia.jpg" alt="Cabinet Orizia Courtage" fill style={{ objectFit: 'cover' }} />
    </div>
  </div>
</section>
    </>
  );
}
