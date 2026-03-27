import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Assurer votre projet | Orizia Courtage',
  description: 'Assurance emprunteur, habitation, auto/moto : Orizia Courtage compare les meilleures offres du marché pour vous protéger au meilleur prix.',
};

const SOLUTIONS = [
  {
    icon: '📋',
    title: 'Assurance emprunteur',
    sub: 'Protégez votre prêt',
    href: '/assurer/emprunteur',
    description: 'Couvrez votre crédit immobilier en cas de décès, invalidité ou incapacité de travail. Économisez jusqu\'à 50% par rapport à l\'assurance bancaire.',
    avantages: ['Délégation d\'assurance loi Lemoine', 'Économies jusqu\'à 15 000€', 'Résiliation à tout moment'],
  },
  {
    icon: '🏡',
    title: 'Assurance habitation',
    sub: 'Votre logement sécurisé',
    href: '/assurer/habitation',
    description: 'Propriétaire ou locataire, protégez votre logement et vos biens contre les accidents, vols et sinistres du quotidien.',
    avantages: ['Garanties personnalisables', 'Meilleur rapport qualité/prix', 'Gestion des sinistres simplifiée'],
  },
  {
    icon: '🚗',
    title: 'Assurance auto/moto',
    sub: 'Roulez en toute sérénité',
    href: '/assurer/auto-moto',
    description: 'Tiers, tiers étendu ou tous risques — trouvez la couverture adaptée à votre véhicule et votre profil conducteur.',
    avantages: ['Comparaison de +30 assureurs', 'Couverture sur-mesure', 'Assistance 24h/24 incluse'],
  },
];

const ETAPES = [
  { n: '01', title: 'Analyse de votre situation', text: 'Votre conseiller évalue vos besoins réels et votre profil pour cibler les meilleures garanties.' },
  { n: '02', title: 'Comparaison des offres', text: 'Nous interrogeons +30 assureurs partenaires pour obtenir les meilleures conditions du marché.' },
  { n: '03', title: 'Recommandation personnalisée', text: 'Nous vous présentons les 3 meilleures offres avec un comparatif clair et transparent.' },
  { n: '04', title: 'Souscription accompagnée', text: 'Votre courtier gère toutes les démarches administratives jusqu\'à la mise en place de votre contrat.' },
];

const CHIFFRES = [
  { val: '-50%',  label: 'Économies moyennes sur l\'assurance emprunteur' },
  { val: '+30',   label: 'Assureurs partenaires comparés' },
  { val: '24h',   label: 'Délai moyen pour une première offre' },
  { val: '100%',  label: 'Gratuit & sans engagement' },
];

export default function AssurerPage() {
  return (
    <main className="assurer-page">

      {/* ── HERO ── */}
      <section className="fin-hero">
        <div className="fin-hero-bg" />
        <div className="fin-hero-inner">
          <span className="fin-badge">🛡️ Assurance sur-mesure</span>
          <h1>Protégez ce qui compte<br />au meilleur prix</h1>
          <p>
            Assurance emprunteur, habitation ou auto/moto —
            Orizia Courtage compare +30 assureurs et vous obtient la meilleure couverture
            au prix le plus juste.
          </p>
          <div className="fin-hero-btns">
            <Link href="/contact" className="fin-btn-primary">
              Obtenir un devis gratuit →
            </Link>
            <Link href="/rendez-vous" className="fin-btn-secondary">
              📅 Prendre rendez-vous
            </Link>
          </div>
          <div className="fin-hero-trust">
            <span>✅ Gratuit & sans engagement</span>
            <span>🔒 Données sécurisées</span>
            <span>⚡ Réponse sous 24h</span>
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
            <h2>Quelle assurance vous correspond ?</h2>
            <p>Chaque situation est unique. Nos courtiers trouvent la couverture adaptée à votre profil.</p>
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

      {/* ── FOCUS ASSURANCE EMPRUNTEUR ── */}
      <section className="fin-process" style={{ background: '#fff' }}>
        <div className="fin-section-inner">
          <div className="fin-section-head">
            <span className="fin-badge">💡 Le saviez-vous ?</span>
            <h2>L'assurance emprunteur,<br />un vrai levier d'économies</h2>
            <p>Depuis la loi Lemoine (2022), vous pouvez changer d'assurance emprunteur à tout moment, sans frais.</p>
          </div>
          <div className="fin-focus-grid">
            {[
              { icon: '💰', title: 'Jusqu\'à 15 000€ économisés', text: 'En délégant votre assurance emprunteur à un assureur externe plutôt qu\'à votre banque.' },
              { icon: '📝', title: 'Résiliation à tout moment', text: 'La loi Lemoine vous permet de changer d\'assurance emprunteur sans attendre l\'échéance annuelle.' },
              { icon: '⚡', title: 'Mise en place rapide', text: 'Votre nouveau contrat peut être opérationnel en moins de 10 jours ouvrés.' },
              { icon: '🤝', title: 'Accompagnement complet', text: 'Orizia gère toutes les démarches avec votre banque pour vous, sans aucune contrainte.' },
            ].map(f => (
              <div key={f.title} className="fin-focus-card">
                <div className="fin-focus-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
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
            {ETAPES.map(e => (
              <div key={e.n} className="fin-etape">
                <div className="fin-etape-num">{e.n}</div>
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
            <h2>Un courtier indépendant,<br />100% de votre côté</h2>
            <p>
              Orizia Courtage n'est lié à aucun assureur. Nous comparons objectivement
              le marché pour vous trouver la meilleure couverture au prix le plus juste.
              <strong> Notre service est entièrement gratuit pour vous</strong> —
              nous sommes rémunérés par l'assureur retenu.
            </p>
            <ul className="fin-why-list">
              <li>🛡️ +30 assureurs partenaires comparés</li>
              <li>📊 Comparaison objective et transparente</li>
              <li>🤝 Négociation des garanties et des tarifs</li>
              <li>📋 Gestion complète des démarches administratives</li>
              <li>💬 Un interlocuteur unique du début à la fin</li>
            </ul>
            <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 24 }}>
              Parler à un expert →
            </Link>
          </div>
          <div className="fin-why-image">
            <Image
              src="/images/assurer.jpg"
              alt="Courtier assurance Orizia Courtage"
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
          <h2>Prêt à mieux vous protéger ?</h2>
          <p>Devis gratuit en 2 minutes. Nos experts vous répondent sous 24h.</p>
          <div className="fin-hero-btns">
            <Link href="/contact" className="fin-btn-primary">
              Obtenir mon devis gratuit →
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