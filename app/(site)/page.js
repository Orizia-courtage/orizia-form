import Image from 'next/image';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';

const SERVICES = [
  {
    img: '/images/investir.jpg',
    tag: 'Stratégie Patrimoniale',
    title: 'Faire fructifier votre capital, intelligemment',
    desc: 'SCPI, assurance-vie, PER, crowdfunding… Je sélectionne pour vous les placements qui correspondent vraiment à vos objectifs — pas à ceux de ma banque.',
    cta: { href: '/investir', label: 'Voir les solutions' },
  },
  {
    img: '/images/financer.jpg',
    tag: 'Financement',
    title: 'Votre meilleur taux, négocié pour vous',
    desc: 'Crédit immobilier, regroupement de crédits, prêt personnel… Je compare plus de 40 partenaires et je défends votre dossier jusqu\'à l\'accord.',
    cta: { href: '/simulation', label: 'Simuler gratuitement' },
  },
  {
    img: '/images/assurer.jpg',
    tag: 'Protection',
    title: 'Protéger ce qui compte, au juste prix',
    desc: 'Assurance emprunteur, habitation, auto/moto… Je vous évite de payer pour des garanties inutiles et je veille à ce que vous soyez vraiment couvert.',
    cta: { href: '/assurer', label: 'Obtenir un devis' },
  },
];

const STATS = [
  { value: '500+', label: 'Dossiers accompagnés' },
  { value: '15 ans', label: "D'expérience terrain" },
  { value: '98%', label: 'Clients satisfaits' },
  { value: 'ORIAS', label: 'Immatriculée & certifiée' },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="orizia-hero">
        <div className="image-column">
          <div className="column-image">
            <Image
              src="/images/hero-orizia.jpg"
              alt="Cindy Urbansky, courtière indépendante – Orizia Courtage"
              fill
              priority
            />
          </div>
        </div>
        <div className="orizia-hero-content">
          <p style={{
            color: 'var(--orizia-primary)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 12,
          }}>
            Courtière indépendante · Certifiée ORIAS · Lille
          </p>
          <h1>
            Votre courtière indépendante,<br />
            de la première question<br />
            jusqu'à la signature
          </h1>
          <p>
            Je gère personnellement chaque dossier, du début à la fin.
            Pas de commercial intermédiaire, pas d'objectif bancaire à atteindre —
            juste une professionnelle engagée pour défendre vos intérêts.
          </p>
          <div className="buttons">
            <Link href="/simulation" className="orizia-btn-main">
              Faire une simulation gratuite
            </Link>
            <Link href="/rendez-vous" className="orizia-btn-sec">
              Échanger avec Cindy
            </Link>
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
              alt="Cindy Urbansky – Courtière indépendante, Orizia Courtage"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            />
          </div>

          {/* Citation */}
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
              Cindy Urbansky — Fondatrice & Courtière
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
                « Je ne travaille pas pour les banques. Je travaille pour vous.
              </p>
              <p style={{
                color: 'var(--orizia-dark)',
                fontSize: '1.05rem',
                fontWeight: 500,
                lineHeight: 1.7,
                margin: '0 0 24px',
              }}>
                Quand vous me confiez un dossier, je cherche la solution la plus juste
                pour votre situation — pas la plus rapide. Je pose les vraies questions,
                je compare ce qui mérite d'être comparé, et je vous explique chaque choix
                dans un langage humain. Pas de jargon. Pas de pression. »
              </p>
              <Link href="/rendez-vous" className="orizia-btn-main" style={{ display: 'inline-block' }}>
                Parler à Cindy gratuitement →
              </Link>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ backgroundColor: 'var(--orizia-accent)', padding: '40px 20px' }}>
        <div className="home-stats-grid">
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#E6F5F2' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'rgba(230,245,242,0.75)', fontWeight: 600 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--orizia-light)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{
            color: 'var(--orizia-primary)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            textAlign: 'center',
            marginBottom: 8,
          }}>
            Ce que je fais concrètement pour vous
          </p>
          <h2 style={{
            textAlign: 'center',
            color: 'var(--orizia-accent)',
            fontSize: '2.2rem',
            fontWeight: 900,
            marginBottom: 12,
            marginTop: 0,
          }}>
            Un seul interlocuteur.<br />
            Trois expertises à votre service.
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--orizia-dark)',
            opacity: 0.7,
            maxWidth: 600,
            margin: '0 auto 50px',
            lineHeight: 1.6,
          }}>
            Je traite personnellement chaque dossier — sans déléguer, sans intermédiaire.
            Vous avez un numéro. Pas un service client.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 30,
          }}>
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
            <p style={{
              color: 'var(--orizia-primary)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 8,
            }}>
              Pourquoi Orizia ?
            </p>
            <h2 style={{
              color: 'var(--orizia-accent)',
              fontSize: '2rem',
              fontWeight: 900,
              marginTop: 0,
              marginBottom: 16,
            }}>
              Le seul courtier à qui vous<br />parlez directement
            </h2>
            <p style={{ color: 'var(--orizia-dark)', lineHeight: 1.7, marginBottom: 24 }}>
              Je travaille seule. Et c'est précisément ce qui fait la différence.
              Pas de standardiste, pas de transfert de dossier — c'est moi qui vous
              réponds, moi qui négocie, moi qui suis votre dossier de la première
              question à la remise des clés. Je n'ai aucun accord exclusif avec aucune
              banque : je compare objectivement, et je ne recommande que ce qui
              est bon pour vous.
            </p>
            {[
              'Étude personnalisée et 100% gratuite',
              'Accès à plus de 40 partenaires bancaires',
              'Vous parlez toujours à la même personne',
              'Indépendante : aucun lien exclusif avec les banques',
              'Immatriculée ORIAS — réglementée et engagée',
            ].map(item => (
              <div key={item} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 10,
              }}>
                <span style={{ color: 'var(--orizia-primary)', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                <span style={{ fontWeight: 600 }}>{item}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 28 }}>
              <Link href="/rendez-vous" className="orizia-btn-main">
                Prendre rendez-vous gratuitement
              </Link>
              <Link href="/simulation" className="orizia-btn-sec">
                Faire une simulation
              </Link>
            </div>
          </div>

          <div
            className="home-why-image"
            style={{
              position: 'relative',
              height: 420,
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(29,30,24,0.12)',
            }}
          >
            <Image
              src="/images/hero-orizia.jpg"
              alt="Cabinet Orizia Courtage — Cindy Urbansky, courtière indépendante"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* ── RASSURANCE FINALE ── */}
      <section style={{
        padding: '60px 20px',
        backgroundColor: 'var(--orizia-light)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <p style={{
            color: 'var(--orizia-primary)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.8rem',
            marginBottom: 16,
          }}>
            Première étape
          </p>
          <h2 style={{
            color: 'var(--orizia-accent)',
            fontSize: '1.8rem',
            fontWeight: 900,
            marginBottom: 16,
            lineHeight: 1.3,
          }}>
            Un échange de 30 minutes.<br />
            Sans engagement. Sans jargon.
          </h2>
          <p style={{
            color: 'var(--orizia-dark)',
            opacity: 0.7,
            lineHeight: 1.7,
            marginBottom: 32,
          }}>
            On commence par une conversation simple sur votre situation et vos objectifs.
            Je vous dis franchement ce qui est possible, dans quel délai et pourquoi.
            C'est gratuit. Et ça n'engage à rien.
          </p>
          <Link href="/rendez-vous" className="orizia-btn-main" style={{ fontSize: '1.1rem', padding: '20px 40px' }}>
            Réserver mon créneau gratuit →
          </Link>
          <p style={{
            marginTop: 16,
            fontSize: '0.82rem',
            color: 'var(--orizia-dark)',
            opacity: 0.5,
          }}>
            Réponse sous 24h · Disponible en visio ou en présentiel
          </p>
        </div>
      </section>
    </>
  );
}