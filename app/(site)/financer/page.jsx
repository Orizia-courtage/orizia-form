import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Financer votre projet | Orizia Courtage',
  description: 'Crédit immobilier, regroupement de crédits, prêt personnel : Orizia Courtage vous accompagne pour financer tous vos projets au meilleur taux.',
};

const SOLUTIONS = [
  {
    icon: '🏠',
    title: 'Crédit immobilier',
    sub: 'Votre projet immobilier',
    href: '/financer/credit-immobilier',
    description: 'Achat, construction ou investissement locatif — nous négocions le meilleur taux auprès de nos partenaires bancaires.',
    avantages: ['Taux négociés en exclusivité', 'Réponse de principe sous 48h', 'Accompagnement jusqu\'au déblocage'],
  },
  {
    icon: '💳',
    title: 'Regroupement de crédits',
    sub: 'Réduisez vos mensualités',
    href: '/financer/regroupement-credits',
    description: 'Réunissez tous vos crédits en un seul pour alléger votre budget mensuel et retrouver de la sérénité.',
    avantages: ['Jusqu\'à -60% sur vos mensualités', 'Un seul interlocuteur', 'Bilan gratuit & sans engagement'],
  },
  {
    icon: '💶',
    title: 'Prêt personnel',
    sub: 'Financez vos projets',
    href: '/financer/pret-personnel',
    description: 'Travaux, véhicule, voyage ou dépense imprévue — obtenez un financement rapide et adapté à votre situation.',
    avantages: ['Déblocage rapide des fonds', 'Sans justificatif d\'achat', 'Taux fixe & mensualités stables'],
  },
];

const ETAPES = [
  { n: '01', title: 'Simulation gratuite', text: 'En 2 minutes, estimez votre capacité d\'emprunt et vos mensualités sans engagement.' },
  { n: '02', title: 'Étude personnalisée', text: 'Votre courtier analyse votre dossier et sollicite les meilleures offres bancaires.' },
  { n: '03', title: 'Négociation', text: 'Nous négocions pour vous le taux, l\'assurance et les conditions de remboursement.' },
  { n: '04', title: 'Signature & déblocage', text: 'Votre conseiller vous accompagne jusqu\'à la signature et le déblocage des fonds.' },
];

const CHIFFRES = [
  { val: '0,85%', label: 'Taux moyen obtenu sur 20 ans' },
  { val: '48h',   label: 'Délai moyen de réponse de principe' },
  { val: '98%',   label: 'Clients satisfaits' },
  { val: '+50',   label: 'Partenaires bancaires' },
];

export default function FinancerPage() {
  return (
    <main className="financer-page">

      {/* ── HERO ── */}
      <section className="fin-hero">
        <div className="fin-hero-bg" />
        <div className="fin-hero-inner">
          <span className="fin-badge">💶 Financement sur-mesure</span>
          <h1>Financez vos projets<br />au meilleur taux</h1>
          <p>
            Crédit immobilier, regroupement de crédits ou prêt personnel —
            Orizia Courtage compare, négocie et vous obtient les meilleures conditions du marché.
          </p>
          <div className="fin-hero-btns">
            <Link href="/simulation" className="fin-btn-primary">
              Faire une simulation gratuite →
            </Link>
            <Link href="/rendez-vous" className="fin-btn-secondary">
              📅 Prendre rendez-vous
            </Link>
          </div>
          <div className="fin-hero-trust">
            <span>✅ Gratuit & sans engagement</span>
            <span>🔒 Données sécurisées</span>
            <span>⚡ Réponse sous 48h</span>
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

      {/* ── NOS SOLUTIONS ── */}
      <section className="fin-solutions">
        <div className="fin-section-inner">
          <div className="fin-section-head">
            <span className="fin-badge">Nos solutions</span>
            <h2>Quel financement vous correspond ?</h2>
            <p>Chaque projet est unique. Nos courtiers trouvent la solution adaptée à votre situation.</p>
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
                <span className="fin-card-link">En savoir plus →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="fin-process">
        <div className="fin-section-inner">
          <div className="fin-section-head">
            <span className="fin-badge">Notre méthode</span>
            <h2>Comment ça marche ?</h2>
            <p>Un accompagnement simple, rapide et 100% gratuit pour vous.</p>
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
            <span className="fin-badge">Pourquoi Orizia ?</span>
            <h2>Un courtier indépendant,<br />à votre service</h2>
            <p>
              Contrairement à votre banque, Orizia Courtage travaille pour vous —
              pas pour les établissements financiers. Notre rémunération est versée
              par la banque choisie, <strong>notre service est donc entièrement gratuit pour vous</strong>.
            </p>
            <ul className="fin-why-list">
              <li>🏦 Accès à +50 banques et organismes de crédit</li>
              <li>📊 Comparaison objective de toutes les offres</li>
              <li>🤝 Négociation du taux, de l'assurance et des frais</li>
              <li>📋 Constitution et suivi de votre dossier</li>
              <li>💬 Un interlocuteur unique du début à la fin</li>
            </ul>
            <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 24 }}>
              Parler à un expert →
            </Link>
          </div>
          <div className="fin-why-image">
            <Image
              src="/images/financer.jpg"
              alt="Courtier Orizia Courtage"
              width={520}
              height={420}
              style={{ objectFit: 'cover', borderRadius: 20, width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="fin-cta">
        <div className="fin-cta-inner">
          <h2>Prêt à concrétiser votre projet ?</h2>
          <p>Simulation gratuite en 2 minutes. Nos experts vous répondent sous 48h.</p>
          <div className="fin-hero-btns">
            <Link href="/simulation" className="fin-btn-primary">
              Simuler mon financement →
            </Link>
            <Link href="/rendez-vous" className="fin-btn-outline">
              📅 Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}