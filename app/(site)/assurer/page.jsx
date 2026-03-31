import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Assurances 2026 : Ne payez plus trop cher | Orizia Courtage',
  description: 'Emprunteur, habitation, auto/moto : arrêtez de subir la hausse des tarifs. Courtière indépendante, je compare et résilie pour vous. Étude gratuite.',
  keywords: [
    'courtier assurance indépendant',
    'comparatif assurance 2026',
    'résiliation assurance loi hamon',
    'loi lemoine assurance emprunteur',
    'économiser assurance auto habitation',
  ],
  alternates: { canonical: 'https://orizia-courtage.fr/assurer' },
  openGraph: {
    title: 'Assurances 2026 : Ne payez plus trop cher | Orizia Courtage',
    description: 'Ne laissez plus vos contrats s\'envoler chaque année. Je mets le marché en concurrence et je gère vos résiliations. Devis gratuit et sans engagement.',
    url: 'https://orizia.fr/assurer',
    type: 'website',
  },
};

const SOLUTIONS = [
  {
    icon: '📋',
    title: 'Assurance emprunteur',
    sub: 'Le plus gros levier d\'économie',
    href: '/assurer/emprunteur',
    description: 'Ne laissez pas la banque marger sur votre crédit immobilier. Je vous trouve un contrat équivalent, souvent deux fois moins cher.',
    avantages: ['Loi Lemoine : changement à tout moment', 'Jusqu\'à 15 000€ d\'économies', 'Je gère le bras de fer avec la banque'],
  },
  {
    icon: '🏡',
    title: 'Assurance habitation',
    sub: 'Votre cocon sécurisé',
    href: '/assurer/habitation',
    description: 'Les tarifs flambent à cause des risques climatiques. J\'ajuste vos garanties pour vous protéger efficacement sans surpayer.',
    avantages: ['Couverture sur-mesure (Propriétaire/Locataire)', 'Traque de la sur-assurance', 'Résiliation sans coupure'],
  },
  {
    icon: '🚗',
    title: 'Assurance auto & moto',
    sub: 'Roulez au juste prix',
    href: '/assurer/auto-moto',
    description: 'Tiers, intermédiaire ou tous risques : j\'adapte votre contrat à la valeur réelle de votre véhicule pour contrer l\'inflation.',
    avantages: ['Comparaison objective du marché', 'Assistance 0km & options utiles', 'Loi Hamon : je résilie pour vous'],
  },
];

const ETAPES = [
  { n: '01', title: 'Audit de vos contrats', text: 'On fait le point sur ce que vous payez aujourd\'hui. Souvent, de mauvaises surprises s\'y cachent.' },
  { n: '02', title: 'Mise en concurrence', text: 'J\'interroge mes dizaines de partenaires (SwissLife, Cardif, Abeille...) pour dénicher le tarif parfait.' },
  { n: '03', title: 'Zéro paperasse pour vous', text: 'Loi Hamon, Loi Lemoine... J\'utilise tous vos droits légaux pour résilier vos anciens contrats à votre place.' },
  { n: '04', title: 'Suivi sur le long terme', text: 'L\'année prochaine, si votre assureur augmente trop ses tarifs, je serai là pour vous le dire et re-comparer.' },
];

const CHIFFRES = [
  { val: '100%', label: 'De la paperasse gérée par mes soins' },
  { val: '+30',  label: 'Assureurs partenaires comparés' },
  { val: '-50%', label: 'D\'économies possibles sur votre prêt' },
  { val: '0€',   label: 'De frais d\'étude pour vous' },
];

export default function AssurerPage() {
  return (
    <main className="assurer-page">

      {/* ── HERO ── */}
      <section className="fin-hero">
        <div className="fin-hero-bg" />
        <div className="fin-hero-inner">
          <span className="fin-badge">🛡️ Courtage 100% Indépendant</span>
          <h1>Protégez ce qui compte<br />sans payer la taxe de fidélité</h1>
          <p>
            Emprunteur, habitation ou auto/moto : vos assureurs augmentent vos tarifs chaque année. 
            Je suis là pour dire stop. Je compare le marché, je trouve le juste prix, et <strong>je résilie 
            vos anciens contrats à votre place</strong>.
          </p>
          <div className="fin-hero-btns">
            <Link href="/contact" className="fin-btn-primary">
              🔍 Faire auditer mes contrats actuels →
            </Link>
            <Link href="/rendez-vous" className="fin-btn-secondary">
              📅 Prendre rendez-vous avec Cindy
            </Link>
          </div>
          <div className="fin-hero-trust">
            <span>✅ Accompagnement de A à Z</span>
            <span>🤝 100% gratuit et sans engagement</span>
            <span>⚡ Zéro coupure de garantie</span>
          </div>
        </div>
      </section>

      {/* ── CHIFFRES CLÉS ── */}
      <section className="fin-chiffres">
        <div className="fin-chiffres-inner">
          {CHIFFRES.map(c => (
            <div key={c.label} className="fin-chiffre">
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
              « Payer une assurance, c'est acheter de la tranquillité d'esprit. Mais quand je vois les tarifs augmenter silencieusement chaque année, je vois surtout de l'argent jeté par les fenêtres. »
            </p>
            <p style={{
              fontSize: '1rem',
              color: 'var(--orizia-dark)',
              lineHeight: 1.75,
              margin: '0 0 20px',
              opacity: 0.8,
            }}>
              Mon rôle n'est pas de vous sur-assurer, mais de trouver le contrat qui vous couvre vraiment, au juste prix, et de gérer toute la paperasse de résiliation à votre place. Vous êtes protégé, je m'occupe du reste.
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
            <span className="fin-badge">Vos contrats au crible</span>
            <h2>Quelle assurance voulez-vous<br />optimiser aujourd'hui ?</h2>
            <p>On peut commencer par un seul contrat, ou tout regrouper pour maximiser les économies et simplifier votre gestion.</p>
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
                <span className="fin-card-link">Optimiser ce contrat →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOCUS ASSURANCE EMPRUNTEUR ── */}
      <section className="fin-process" style={{ background: '#fff' }}>
        <div className="fin-section-inner">
          <div className="fin-section-head">
            <span className="fin-badge" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}>
              💡 Le saviez-vous ?
            </span>
            <h2>L'assurance de votre prêt immobilier<br />est une mine d'or (pour votre banque)</h2>
            <p>La Loi Lemoine vous autorise à résilier le contrat de votre banque <strong>à tout moment</strong>. Et c'est là que je vous fais gagner le plus d'argent.</p>
          </div>
          <div className="fin-focus-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '40px'
          }}>
            {[
              { icon: '💰', title: 'Des milliers d\'euros récupérés', text: 'Sortir du contrat groupe de la banque divise souvent la facture par deux.' },
              { icon: '📝', title: 'Je résilie quand je veux', text: 'Plus besoin d\'attendre la date d\'anniversaire de votre prêt. On peut agir demain.' },
              { icon: '⚡', title: 'Transition invisible', text: 'Zéro coupure. Le nouveau contrat prend le relais à la minute où l\'ancien s\'arrête.' },
              { icon: '🥊', title: 'J\'affronte la banque', text: 'Les banques détestent perdre cette marge. Je m\'occupe de tout le bras de fer juridique.' },
            ].map(f => (
              <div key={f.title} className="fin-focus-card" style={{
                background: 'var(--orizia-light)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <div className="fin-focus-icon" style={{ fontSize: '2rem', marginBottom: '12px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--orizia-accent)', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--orizia-dark)', opacity: 0.8 }}>{f.text}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href="/assurer/emprunteur" className="fin-btn-secondary">
              Découvrir comment baisser mes mensualités →
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="fin-process">
        <div className="fin-section-inner">
          <div className="fin-section-head">
            <span className="fin-badge">Mon engagement : le "zéro friction"</span>
            <h2>Vous choisissez, je m'occupe du reste</h2>
            <p>Changer d'assurance est censé être compliqué. C'est pour ça que j'en ai fait mon métier.</p>
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
            <h2>Une courtière indépendante,<br />100% de votre côté</h2>
            <p>
              Je ne suis mariée à aucun assureur. Quand je vous conseille un contrat, c'est parce que c'est le meilleur pour <strong>vous</strong>, pas parce que j'ai un quota à respecter.
            </p>
            <p>
              <strong>Et combien ça vous coûte ? Rien.</strong> Dans le cadre de l'assurance, ma rémunération est directement prise en charge par la compagnie que nous choisissons ensemble. Vous ne payez pas plus cher, mais vous bénéficiez de mon accompagnement sur le long terme.
            </p>
            <ul className="fin-why-list">
              <li>🛡️ Défense acharnée de vos intérêts</li>
              <li>📊 Comparaison objective et sans filtre</li>
              <li>🤝 Traque des petites lignes et des exclusions</li>
              <li>📋 Fin de la corvée administrative pour vous</li>
              <li>💬 Une seule interlocutrice qui connaît votre dossier</li>
            </ul>
            <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 24 }}>
              📅 Me confier vos contrats →
            </Link>
          </div>
          <div className="fin-why-image">
            <Image
              src="/images/assurer.jpg"
              alt="Cindy Urbansky, courtière en assurances Orizia Courtage"
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
          <h2>Prêt(e) à arrêter de payer trop cher ?</h2>
          <p>
            Faites-moi passer vos avis d'échéance actuels. Je vous dirai très honnêtement si vous êtes bien assuré(e) ou si on peut faire beaucoup mieux ailleurs.
          </p>
          <div className="fin-hero-btns">
            <Link href="/contact" className="fin-btn-primary">
              ✉️ M'envoyer mes contrats actuels →
            </Link>
            <Link href="/rendez-vous" className="fin-btn-outline">
              📅 Prendre un rendez-vous téléphonique
            </Link>
          </div>
          <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
            Orizia Courtage est un cabinet de courtage indépendant, immatriculé à l'ORIAS. Nos recommandations s'appuient sur une analyse objective du marché pour vous garantir des contrats adaptés à vos exigences et besoins (directive DDA).
          </p>
        </div>
      </section>

    </main>
  );
}