import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Financer vos projets en 2026 : Crédit & Rachat | Orizia',
  description: 'Crédit immobilier, prêt personnel ou regroupement de crédits. Courtière indépendante, je négocie les meilleurs taux pour vos projets. Étude gratuite.',
  keywords: [
    'courtier crédit immobilier',
    'regroupement de crédits',
    'financement prêt personnel courtier',
    'meilleur taux crédit 2026',
    'courtier indépendant',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/financer' },
  openGraph: {
    title: 'Financer vos projets en 2026 : Crédit & Rachat | Orizia',
    description: 'Ne financez plus les marges des banques. Je compare le marché et négocie votre crédit au meilleur taux. Étude gratuite et sans engagement.',
    url: 'https://orizia-courtage.fr/financer',
    type: 'website',
  },
};

const SOLUTIONS = [
  {
    icon: '🏠',
    title: 'Crédit immobilier',
    sub: 'Votre projet de vie',
    href: '/financer/credit-immobilier',
    description: 'Achat, construction ou investissement locatif. Je mets les banques en concurrence pour faire baisser le coût total de votre achat.',
    avantages: ['Taux négociés', 'Assurance emprunteur optimisée', 'Accompagnement jusqu\'au notaire'],
  },
  {
    icon: '🔄',
    title: 'Regroupement de crédits',
    sub: 'Votre budget respire',
    href: '/financer/regroupement-credits',
    description: 'Vos mensualités vous étouffent ? Je rassemble tous vos crédits en un seul pour faire chuter votre prélèvement mensuel jusqu\'à 60%.',
    avantages: ['Une seule mensualité allégée', 'Baisse du taux d\'endettement', 'Possibilité d\'inclure une trésorerie'],
  },
  {
    icon: '💶',
    title: 'Prêt personnel',
    sub: 'Vos projets concrets',
    href: '/financer/pret-personnel',
    description: 'Auto, travaux ou trésorerie. Je vous trouve le meilleur TAEG du marché pour que vous financiez vos projets, pas les marges de l\'organisme prêteur.',
    avantages: ['Sans assurances toxiques imposées', 'Mensualités fixes', 'Déblocage rapide'],
  },
];

const ETAPES = [
  { n: '01', title: 'Le point sur vos finances', text: 'On analyse ensemble votre capacité d\'emprunt réelle, sans jugement, lors d\'un premier échange.' },
  { n: '02', title: 'Je chasse le meilleur taux', text: 'J\'interroge mon réseau de banques partenaires et je négocie chaque dixième de point et chaque frais de dossier pour vous.' },
  { n: '03', title: 'Je m\'occupe de la paperasse', text: 'Montage du dossier bancaire, relances, négociation de l\'assurance emprunteur : je gère tout jusqu\'à l\'accord ferme.' },
  { n: '04', title: 'Déblocage et suivi', text: 'Je vous accompagne jusqu\'à la signature de l\'offre de prêt et le déblocage des fonds. Vous n\'êtes jamais seul(e).' },
];

const CHIFFRES = [
  { val: '+40', label: 'Banques & organismes comparés' },
  { val: '24h', label: 'Pour une 1ère estimation gratuite' },
  { val: '100%', label: 'Indépendante & objective' },
  { val: '1', label: 'Interlocutrice unique : moi' },
];

export default function FinancerPage() {
  return (
    <main className="financer-page">

      {/* ── HERO ── */}
      <section className="fin-hero">
        <div className="fin-hero-bg" />
        <div className="fin-hero-inner">
          <span className="fin-badge">💶 Financement sur-mesure</span>
          <h1>Financez vos projets<br />sans vous faire plumer</h1>
          <p>
            Crédit immobilier, prêt personnel ou regroupement de crédits. En tant que 
            courtière indépendante, je compare, je négocie et je vais chercher <strong>le taux 
            qui respecte vraiment votre budget</strong>.
          </p>
          <div className="fin-hero-btns">
            <Link href="/simulation" className="fin-btn-primary">
              💻 Lancer une simulation gratuite →
            </Link>
            <Link href="/rendez-vous" className="fin-btn-secondary">
              📅 Faire le point avec Cindy
            </Link>
          </div>
          <div className="fin-hero-trust">
            <span>✅ Accompagnement de A à Z</span>
            <span>🛡️ Étude 100% sans engagement</span>
            <span>⚡ Réponse de principe sous 48h</span>
          </div>
        </div>
      </section>

      {/* ── CHIFFRES CLÉS ── */}
      <section className="fin-chiffres">
        <div className="fin-chiffres-inner">
          {CHIFFRES.map(c => (
            <div key={c.val} className="fin-chiffre">
              <strong>{c.val}</strong>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CITATION CINDY ── */}
      <section className="crowd-section crowd-section--light" style={{ padding: '40px 20px 20px' }}>
        <div className="fin-section-inner">
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: '36px 40px',
            borderLeft: '5px solid var(--orizia-primary)',
            boxShadow: '0 4px 24px rgba(58,111,108,0.08)',
            maxWidth: 780,
            margin: '0 auto',
          }}>
            <p style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'var(--orizia-accent)',
              lineHeight: 1.55,
              marginBottom: 16,
            }}>
              « Une banque ne vous proposera jamais l'offre de son concurrent, même si elle est meilleure pour vous. »
            </p>
            <p style={{
              fontSize: '1rem',
              color: 'var(--orizia-dark)',
              lineHeight: 1.75,
              margin: '0 0 20px',
              opacity: 0.8,
            }}>
              C'est là que j'interviens. Je ne vends pas de crédits : je mets les banques en compétition pour vous obtenir le financement qui respecte vraiment votre budget et vos projets. Sans jargon, sans frais cachés, et en toute indépendance.
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

      {/* ── NOS SOLUTIONS ── */}
      <section className="fin-solutions">
        <div className="fin-section-inner">
          <div className="fin-section-head">
            <span className="fin-badge">Votre projet</span>
            <h2>On finance quoi aujourd'hui ?</h2>
            <p>À chaque étape de vie son financement. Je vous oriente vers le montage bancaire le plus économique pour vous.</p>
          </div>
          <div className="fin-cards">
            {SOLUTIONS.map(s => (
              <Link href={s.href} key={s.title} className="fin-card">
                <div className="fin-card-icon">{s.icon}</div>
                <div className="fin-card-sub">{s.sub}</div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <ul className="fin-card-avantages">
                  {s.avantages.map(a => (
                    <li key={a}>✓ {a}</li>
                  ))}
                </ul>
                <span className="fin-card-link">Découvrir l'approche →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="fin-process">
        <div className="fin-section-inner">
          <div className="fin-section-head">
            <span className="fin-badge">Mon engagement</span>
            <h2>Vous choisissez, je m'occupe du reste</h2>
            <p>Faire un crédit est souvent un parcours du combattant. Mon rôle est de vous décharger de toute la charge mentale bancaire.</p>
          </div>
          <div className="fin-etapes">
            {ETAPES.map((e, i) => (
              <div key={e.n} className="fin-etape">
                <div className="fin-etape-num">{e.n}</div>
                {i < ETAPES.length - 1 && <div className="fin-etape-line" />}
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI ORIZIA ── */}
      <section className="fin-why">
        <div className="fin-section-inner fin-why-inner">
          <div className="fin-why-text">
            <span className="fin-badge">Le modèle Orizia</span>
            <h2>L'avantage d'une<br />courtière indépendante</h2>
            <p>
              Je travaille pour vous, pas pour les banques. Je suis certifiée ORIAS 
              et n'ai aucun quota à remplir auprès des établissements financiers. Mon seul 
              objectif est que votre dossier passe, aux meilleures conditions.
            </p>
            <p>
              Et la meilleure nouvelle ? Pour la majorité des financements, <strong>ma rémunération est prise 
              en charge par la banque chez qui nous signons</strong>.
            </p>
            <ul className="fin-why-list">
              <li>🛡️ Défense exclusive de vos intérêts</li>
              <li>💬 Zéro plateforme : vous m'avez en ligne directement</li>
              <li>🔍 Explication claire de chaque ligne du contrat</li>
              <li>🤝 Transparence totale sur ma rémunération</li>
            </ul>
            <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 24 }}>
              📅 Me confier votre recherche →
            </Link>
          </div>
          <div className="fin-why-image">
            <Image
              src="/images/financer.jpg"
              alt="Cindy Urbansky, courtière Orizia Courtage"
              width={520}
              height={420}
              style={{ objectFit: 'cover', borderRadius: 20, width: '100%', height: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            />
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="fin-cta">
        <div className="fin-cta-inner">
          <h2>Prêt(e) à faire décoller votre projet ?</h2>
          <p>Ne vous épuisez pas à faire le tour des banques. Confiez-moi votre dossier, je m'occupe d'aller chercher le meilleur accord de principe.</p>
          <div className="fin-hero-btns">
            <Link href="/simulation" className="fin-btn-primary">
              💻 Estimer mon financement →
            </Link>
            <Link href="/rendez-vous" className="fin-btn-outline">
              ✉️ Poser une question à Cindy
            </Link>
          </div>
          <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
            Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
            Orizia Courtage, immatriculée à l'ORIAS, intervient en qualité de courtier en opérations de banque et en services de paiement (COBSP).
          </p>
        </div>
      </section>

    </main>
  );
}