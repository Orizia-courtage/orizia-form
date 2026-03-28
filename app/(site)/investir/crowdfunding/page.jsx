import Link from 'next/link';
import SimulateurCrowdfunding from '@/components/SimulateurCrowdfunding';


export const metadata = {
  title: 'Crowdfunding Immobilier 2026 : Investir avec un Expert | Orizia Courtage',
  description:
    'Rendements 8–12%/an, dès 1 000€. Orizia Courtage vous accompagne pour investir dans le crowdfunding immobilier en toute sécurité : sélection des projets, analyse des risques, stratégie de diversification.',
  keywords: [
    'crowdfunding immobilier courtier',
    'financement participatif immobilier conseil',
    'investissement crowdfunding accompagné',
    'rendement crowdfunding immobilier 2026',
    'crowdfunding immobilier risques',
    'meilleur crowdfunding immobilier',
  ],
  alternates: { canonical: 'https://orizia.fr/investir/crowdfunding' },
  openGraph: {
    title: 'Crowdfunding Immobilier 2026 : Investir avec un Expert | Orizia Courtage',
    description: 'Rendements 8–12%/an, dès 1 000€. Conseil indépendant, sélection des meilleures plateformes, stratégie de diversification personnalisée.',
    url: 'https://orizia.fr/investir/crowdfunding',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quel est le rendement moyen du crowdfunding immobilier en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En 2026, les rendements oscillent entre 8% et 12% brut par an. C\'est bien supérieur aux livrets bancaires (3%) ou à l\'assurance vie en fonds euros (2–3%). Mais attention : un rendement élevé s\'accompagne toujours d\'un risque plus élevé. L\'analyse du projet et du promoteur est indispensable avant d\'investir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quels sont les risques du crowdfunding immobilier ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le risque principal est la perte partielle ou totale du capital en cas de défaillance du promoteur. S\'y ajoutent le risque de retard de remboursement, le risque de liquidité (capital bloqué 12 à 36 mois) et le risque lié à la qualité de la plateforme. Une diversification sur plusieurs projets et un accompagnement expert limitent significativement ces risques.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi passer par un courtier pour investir dans le crowdfunding immobilier ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les plateformes sont rémunérées par les promoteurs, pas par vous. Leurs intérêts ne sont pas toujours alignés avec les vôtres. Un courtier indépendant comme Orizia analyse les bilans des promoteurs, sélectionne les plateformes les plus fiables et construit une stratégie de diversification adaptée à votre profil — le tout gratuitement pour vous.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle fiscalité s\'applique au crowdfunding immobilier ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les intérêts perçus sont soumis au Prélèvement Forfaitaire Unique (PFU) de 30% : 12,8% d\'impôt sur le revenu + 17,2% de prélèvements sociaux. Si votre TMI est inférieur à 12,8%, vous pouvez opter pour le barème progressif lors de votre déclaration.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps est bloqué mon capital ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La durée d\'immobilisation est généralement de 12 à 36 mois. Il n\'existe pas de marché secondaire : vous ne pouvez pas récupérer votre capital avant l\'échéance. N\'investissez donc que de l\'épargne dont vous n\'aurez pas besoin sur cette durée.',
      },
    },
  ],
};

const DANGERS = [
  {
    icon: '🕵️',
    title: 'Les plateformes travaillent pour le promoteur',
    text: 'C\'est le promoteur qui rémunère la plateforme — pas vous. Leur modèle économique repose sur le remplissage des projets, pas nécessairement sur la protection de votre capital. Leurs analyses de risque sont rarement indépendantes.',
  },
  {
    icon: '📑',
    title: 'Analyser un bilan de promoteur, ça s\'apprend',
    text: 'Ratio d\'endettement, fonds propres, historique de livraisons, garanties d\'achèvement : ces données sont publiques mais illisibles sans formation. Un promoteur fragile financièrement = risque de défaut élevé que seul un œil expert détecte.',
  },
  {
    icon: '🎯',
    title: 'La diversification ne s\'improvise pas',
    text: 'Concentrer 10 000€ sur un seul projet, c\'est prendre un risque inutile. Une bonne stratégie répartit le capital sur plusieurs projets, typologies d\'actifs et zones géographiques — ce qui demande méthode et expérience.',
  },
];

const AVANTAGES = [
  { icon: '📈', title: '8–12% brut/an', text: 'Parmi les meilleurs rendements accessibles aux particuliers, bien au-dessus de l\'inflation et des livrets bancaires.' },
  { icon: '💶', title: 'Dès 1 000€',     text: 'L\'immobilier à portée de tous. Vous accédez à des projets de plusieurs millions sans mobiliser un apport conséquent.' },
  { icon: '⏱️', title: '12–36 mois',     text: 'Durée maîtrisée avec une date de remboursement connue à l\'avance. Idéal pour une épargne de moyen terme.' },
  { icon: '🏗️', title: 'Actif tangible', text: 'Votre argent finance un projet immobilier réel : construction, rénovation ou opération marchande. Un sous-jacent concret.' },
  { icon: '🔄', title: 'Diversification', text: 'Complément idéal à une assurance vie, un PER ou une SCPI pour dynamiser votre portefeuille patrimonial.' },
  { icon: '🚫', title: 'Zéro gestion',   text: 'Pas de locataire, pas de travaux, pas de taxe foncière. Un placement 100% passif et dématérialisé.' },
];

const RISQUES = [
  {
    niveau: 'Élevé', color: '#dc2626', bg: '#fff1f0', border: '#fecaca', icon: '🔴',
    title: 'Perte en capital',
    text: 'En cas de défaillance du promoteur, vous pouvez perdre tout ou partie de votre capital. Ce risque est réel : certaines plateformes ont enregistré des taux de défaut supérieurs à 10% en 2023.',
    mitigation: 'Notre rôle : auditer le promoteur avant de vous recommander le projet.',
  },
  {
    niveau: 'Moyen', color: '#d97706', bg: '#fffbeb', border: '#fed7aa', icon: '🟠',
    title: 'Retard de remboursement',
    text: 'Un chantier peut accuser des retards : permis de construire, problèmes techniques, ralentissement du marché. Le remboursement peut être décalé de plusieurs mois, voire années.',
    mitigation: 'Notre rôle : sélectionner des promoteurs avec un track record solide de livraisons.',
  },
  {
    niveau: 'Moyen', color: '#d97706', bg: '#fffbeb', border: '#fed7aa', icon: '🟠',
    title: 'Capital illiquide',
    text: 'Aucun marché secondaire ne permet de revendre vos parts avant l\'échéance. Si vous avez besoin de liquidités, vous ne pouvez pas récupérer votre argent avant terme.',
    mitigation: 'Notre rôle : n\'allouer au crowdfunding qu\'une fraction adaptée de votre épargne.',
  },
  {
    niveau: 'Faible', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '🟢',
    title: 'Risque de plateforme',
    text: 'La faillite d\'une plateforme non agréée peut compliquer le suivi de vos investissements. Une plateforme agréée AMF/PSFP offre un cadre légal protecteur.',
    mitigation: 'Notre rôle : ne travailler qu\'avec des plateformes agréées et auditées par nos soins.',
  },
];

const COMPARATIF = [
  { produit: 'Livret A',           rendement: '3%',      duree: 'Libre',    risque: '⭐ Très faible',  liquidite: '✅ Immédiate',  highlight: false },
  { produit: 'Assurance Vie',      rendement: '2–4%',    duree: '8 ans+',   risque: '⭐ Très faible',  liquidite: '✅ Bonne',       highlight: false },
  { produit: 'SCPI',               rendement: '4–6%',    duree: '8–10 ans', risque: '⭐⭐ Faible',     liquidite: '⚠️ Limitée',   highlight: false },
  { produit: '📈 Crowdfunding immo', rendement: '8–12%', duree: '1–3 ans',  risque: '⭐⭐⭐ Moyen',   liquidite: '❌ Bloqué',     highlight: true  },
  { produit: 'Actions bourse',     rendement: 'Variable', duree: 'Variable', risque: '⭐⭐⭐⭐ Élevé', liquidite: '✅ Immédiate',  highlight: false },
];

const ETAPES = [
  { n: '01', title: 'Bilan patrimonial',         text: 'Nous analysons votre situation globale, vos objectifs, votre horizon et votre tolérance au risque pour définir la bonne allocation au crowdfunding.' },
  { n: '02', title: 'Audit des plateformes',      text: 'Nous ne recommandons que les plateformes agréées AMF dont nous avons vérifié le taux de défaut, la transparence et la solidité financière.' },
  { n: '03', title: 'Sélection des projets',      text: 'Pour chaque projet, nous analysons le bilan du promoteur, les garanties prises et le réalisme du plan de financement avant toute recommandation.' },
  { n: '04', title: 'Stratégie de diversification', text: 'Nous construisons avec vous un portefeuille réparti sur plusieurs projets, typologies et zones géographiques pour optimiser le couple rendement/risque.' },
];

export default function CrowdfundingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>

        {/* ── HERO ── */}
        <section className="fin-hero">
          <div className="fin-hero-bg" />
          <div className="fin-hero-inner">
            <nav aria-label="breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: 16 }}>
              <Link href="/" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Accueil</Link>
              {' › '}
              <Link href="/investir" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Investir</Link>
              {' › '}
              <span>Crowdfunding immobilier</span>
            </nav>
            <span className="fin-badge">📈 Financement participatif immobilier</span>
            <h1>Crowdfunding immobilier :<br />8 à 12% par an, bien accompagné</h1>
            <p>
              Investir dans le crowdfunding immobilier sans conseil, c'est naviguer sans boussole.
              Orizia Courtage sélectionne pour vous les meilleurs projets, analyse les risques
              à votre place et construit une stratégie adaptée à votre profil.
              <strong> Le tout gratuitement.</strong>
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Prendre rendez-vous gratuitement →
              </Link>
              <Link href="/contact" className="fin-btn-secondary">
                Poser une question
              </Link>
            </div>
            <div className="fin-hero-trust">
              <span>✅ Conseil 100% indépendant</span>
              <span>🏦 Plateformes agréées AMF uniquement</span>
              <span>⚡ Réponse sous 24h</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES ── */}
        <section className="fin-chiffres">
          <div className="fin-chiffres-inner">
            <div className="fin-chiffre"><strong>8–12%</strong><span>Rendement annuel brut moyen</span></div>
            <div className="fin-chiffre"><strong>Dès 1 000€</strong><span>Ticket d'entrée accessible</span></div>
            <div className="fin-chiffre"><strong>12–36 mois</strong><span>Durée d'investissement typique</span></div>
            <div className="fin-chiffre"><strong>Flat tax 30%</strong><span>Fiscalité applicable aux intérêts</span></div>
          </div>
        </section>

        {/* ── DANGER — INVESTIR SEUL ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Ce que personne ne vous dit
              </span>
              <h2>Pourquoi investir seul<br />dans le crowdfunding est risqué</h2>
              <p>
                Des centaines de particuliers ouvrent un compte sur une plateforme sans analyse préalable.
                Voici les 3 erreurs qui coûtent cher.
              </p>
            </div>
            <div className="crowd-avantages-grid">
              {DANGERS.map(d => (
                <div key={d.title} className="crowd-avantage-card" style={{ borderLeft: '4px solid #dc2626' }}>
                  <div className="crowd-avantage-icon">{d.icon}</div>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--orizia-accent)', marginBottom: 6 }}>
                C'est exactement pour ça qu'Orizia Courtage existe.
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 20 }}>
                Nous analysons à votre place ce que vous n'avez ni le temps ni les outils de faire.
              </p>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Me faire accompagner gratuitement →
              </Link>
            </div>
          </div>
        </section>

        {/* ── QU'EST-CE QUE C'EST ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge">Définition</span>
                <h2>Qu'est-ce que le crowdfunding immobilier ?</h2>
                <p>
                  Le <strong>crowdfunding immobilier</strong> est un mécanisme qui permet à des
                  particuliers de <strong>prêter de l'argent à un promoteur ou un marchand de biens</strong>
                  via une plateforme agréée par l'AMF. En échange, vous percevez des intérêts fixes
                  sur toute la durée du projet, puis récupérez votre capital à terme.
                </p>
                <p>
                  Réglementé depuis 2022 par le statut européen de <strong>Prestataire de Services
                  de Financement Participatif (PSFP)</strong>, le secteur offre un cadre juridique
                  solide. Mais un cadre légal ne protège pas d'un mauvais projet ou d'un promoteur
                  fragile financièrement.
                </p>
                <p>
                  Contrairement à l'achat immobilier direct, vous n'avez <strong>aucune gestion
                  locative, aucune taxe foncière, aucun recours notarial</strong>. C'est un
                  investissement passif et 100% dématérialisé — à condition d'être bien conseillé.
                </p>
              </div>

              {/* Schéma */}
              <div className="crowd-schema">
                <div style={{ textAlign: 'center', marginBottom: 16, fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--orizia-primary)' }}>
                  Comment ça fonctionne
                </div>
                <div className="crowd-schema-step">
                  <div className="crowd-schema-icon">👤</div>
                  <strong>Vous investissez</strong>
                  <span>Dès 1 000€ en ligne</span>
                </div>
                <div className="crowd-schema-arrow">↓</div>
                <div className="crowd-schema-step crowd-schema-step--orizia">
                  <div className="crowd-schema-icon">🏢</div>
                  <strong>Orizia sélectionne & analyse</strong>
                  <span>Audit promoteur + stratégie</span>
                </div>
                <div className="crowd-schema-arrow">↓</div>
                <div className="crowd-schema-step crowd-schema-step--platform">
                  <div className="crowd-schema-icon">🏦</div>
                  <strong>Plateforme agréée AMF</strong>
                  <span>Collecte et gestion des fonds</span>
                </div>
                <div className="crowd-schema-arrow">↓</div>
                <div className="crowd-schema-step">
                  <div className="crowd-schema-icon">🏗️</div>
                  <strong>Promoteur immobilier</strong>
                  <span>Construit / rénove / revend</span>
                </div>
                <div className="crowd-schema-arrow">↓</div>
                <div className="crowd-schema-step crowd-schema-step--result">
                  <div className="crowd-schema-icon">💰</div>
                  <strong>Vous êtes remboursé</strong>
                  <span>Capital + 8–12%/an à l'échéance</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── AVANTAGES ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Les atouts</span>
              <h2>Pourquoi le crowdfunding immobilier<br />mérite une place dans votre patrimoine</h2>
              <p>Un placement haut rendement, sur une durée courte, sans contrainte de gestion — à condition d'être bien accompagné.</p>
            </div>
            <div className="crowd-avantages-grid">
              {AVANTAGES.map(a => (
                <div key={a.title} className="crowd-avantage-card">
                  <div className="crowd-avantage-icon">{a.icon}</div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARATIF ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Comparatif objectif</span>
              <h2>Le crowdfunding face aux autres placements</h2>
              <p>
                Le crowdfunding n'est pas fait pour 100% de votre épargne — mais il a une place
                précise dans une stratégie patrimoniale bien construite.
              </p>
            </div>
            <div className="crowd-table-wrap">
              <table className="crowd-table">
                <thead>
                  <tr>
                    <th>Placement</th>
                    <th>Rendement</th>
                    <th>Durée recommandée</th>
                    <th>Niveau de risque</th>
                    <th>Liquidité</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARATIF.map(row => (
                    <tr key={row.produit} className={row.highlight ? 'crowd-table-highlight' : ''}>
                      <td><strong>{row.produit}</strong></td>
                      <td><strong style={row.highlight ? { color: 'var(--orizia-primary)' } : {}}>{row.rendement}</strong></td>
                      <td>{row.duree}</td>
                      <td>{row.risque}</td>
                      <td>{row.liquidite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="crowd-table-note">
              ⚠️ Rendements indicatifs. Tout investissement comporte un risque de perte en capital.
            </p>
            <div className="crowd-cta-band" style={{ marginTop: 36 }}>
              <div>
                <strong>Quelle allocation pour votre profil ?</strong>
                <p>Crowdfunding, SCPI, assurance vie, PER : nous construisons ensemble la répartition optimale selon vos objectifs.</p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Définir ma stratégie →
              </Link>
            </div>
          </div>
        </section>

        {/* ── RISQUES ── */}
        <section className="crowd-section" style={{ background: '#fafafa' }}>
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Analyse des risques
              </span>
              <h2>Les risques réels,<br />expliqués honnêtement</h2>
              <p>
                Nous ne vendons pas du rêve. Voici une analyse transparente des risques —
                et comment notre accompagnement les réduit concrètement.
              </p>
            </div>
            <div className="crowd-risques-grid">
              {RISQUES.map(r => (
                <div key={r.title} className="crowd-risque-card" style={{ background: r.bg, borderColor: r.border }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: '1.4rem' }}>{r.icon}</span>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: r.color }}>Risque {r.niveau}</span>
                      <h3 style={{ margin: 0, color: r.color }}>{r.title}</h3>
                    </div>
                  </div>
                  <p>{r.text}</p>
                  <div className="crowd-risque-tip">🛡️ {r.mitigation}</div>
                </div>
              ))}
            </div>

            {/* CTA après les risques — moment clé de conversion */}
            <div className="crowd-cta-band" style={{ marginTop: 40 }}>
              <div>
                <strong>Ces risques vous inquiètent ? C'est une bonne chose.</strong>
                <p>
                  Les investisseurs qui réussissent sont ceux qui comprennent les risques avant d'investir.
                  Notre rôle est de vous aider à les maîtriser — pas à les ignorer.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Analyser mon profil →
              </Link>
            </div>
          </div>
        </section>

        {/* ── FISCALITÉ ── */}
<section className="crowd-section crowd-section--white">
  <div className="fin-section-inner">
    <div className="fin-section-head">
      <span className="fin-badge">Fiscalité 2026</span>
      <h2>Ce que vous touchez<br />vraiment après impôts</h2>
      <p>
        Les intérêts perçus via le crowdfunding immobilier sont des{' '}
        <strong>revenus de capitaux mobiliers</strong> soumis au{' '}
        <strong>Prélèvement Forfaitaire Unique (PFU) de 30%</strong> — la "flat tax".
      </p>
    </div>

    {/* Décomposition flat tax */}
    <div className="crowd-fiscalite-grid">
      <div className="crowd-fiscalite-item">
        <strong>12,8%</strong>
        <span>Impôt sur le revenu</span>
      </div>
      <div className="crowd-fiscalite-plus">+</div>
      <div className="crowd-fiscalite-item">
        <strong>17,2%</strong>
        <span>Prélèvements sociaux</span>
      </div>
      <div className="crowd-fiscalite-plus">=</div>
      <div className="crowd-fiscalite-item crowd-fiscalite-total">
        <strong>30%</strong>
        <span>Flat tax totale</span>
      </div>
    </div>

    {/* Notes fiscales */}
    <div className="crowd-fiscalite-notes">
      <div className="crowd-fiscalite-note">
        <span className="crowd-fiscalite-note-icon">💡</span>
        <p>
          <strong>Bon à savoir :</strong> si votre taux marginal d'imposition est inférieur
          à 12,8%, vous pouvez opter pour le <strong>barème progressif</strong> et réduire
          votre charge fiscale. Votre conseiller Orizia peut vous guider sur ce choix.
        </p>
      </div>
      <div className="crowd-fiscalite-note">
        <span className="crowd-fiscalite-note-icon">⚠️</span>
        <p>
          Il n'existe <strong>pas d'enveloppe fiscale dédiée</strong> pour le crowdfunding
          (contrairement à l'assurance vie ou au PER). C'est pourquoi la place du crowdfunding
          dans votre patrimoine global doit être réfléchie avec un expert.
        </p>
      </div>
    </div>

    {/* Simulateur interactif */}
    <div className="fin-section-head" style={{ marginTop: 56 }}>
      <span className="fin-badge">Simulation interactive</span>
      <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 900, color: 'var(--orizia-accent)' }}>
        Calculez votre gain net<br />en temps réel
      </h3>
      <p>Ajustez le montant, le taux et la durée pour estimer vos intérêts après flat tax.</p>
    </div>
    <SimulateurCrowdfunding />

  </div>
</section>

        {/* ── NOTRE SÉLECTION ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="crowd-2col" style={{ alignItems: 'center' }}>
              <div>
                <span className="fin-badge">Notre sélection</span>
                <h2>Quelles plateformes<br />recommandons-nous ?</h2>
                <p>
                  Nous avons audité plus de 15 plateformes actives sur le marché français.
                  Notre sélection repose sur des critères stricts et non négociables.
                </p>
                <ul className="fin-why-list" style={{ marginBottom: 28 }}>
                  <li>✅ Agrément AMF/PSFP en règle</li>
                  <li>📊 Taux de défaut historique inférieur à 3%</li>
                  <li>🔍 Transparence totale sur les promoteurs</li>
                  <li>🏗️ Analyse systématique des permis et garanties</li>
                  <li>💬 Service client réactif en cas de retard</li>
                </ul>
                <div className="crowd-risques-note">
                  🔒 <strong>Nous ne publions pas notre liste en ligne.</strong> Notre sélection
                  est partagée uniquement en rendez-vous, après analyse de votre profil.
                  Pourquoi ? Parce qu'une plateforme adaptée à un profil agressif ne l'est pas
                  pour un profil prudent.
                </div>
              </div>
              <div>
                <div className="crowd-fiscalite-exemple" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 16 }}>🏆</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--orizia-accent)', marginBottom: 12 }}>
                    Accédez à notre sélection exclusive
                  </h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.75, marginBottom: 24, lineHeight: 1.6 }}>
                    15+ plateformes auditées. Seulement les meilleures retenues.
                    Découvrez lesquelles correspondent à votre profil lors d'un rendez-vous gratuit.
                  </p>
                  <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}>
                    📅 Obtenir ma sélection personnalisée →
                  </Link>
                  <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: 12 }}>
                    Gratuit · Sans engagement · Réponse sous 24h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ACCOMPAGNEMENT ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Notre accompagnement</span>
              <h2>Comment Orizia vous accompagne<br />de A à Z</h2>
              <p>
                De l'analyse de votre profil à la sélection des projets, en passant par la
                stratégie de diversification et le suivi — voici notre méthode.
              </p>
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
            <div className="crowd-cta-band" style={{ marginTop: 48 }}>
              <div>
                <strong>Un accompagnement complet, 100% gratuit pour vous</strong>
                <p>
                  Orizia est rémunéré par les plateformes, jamais par vous.
                  Notre indépendance garantit que nous travaillons dans votre intérêt.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Démarrer gratuitement →
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions, nos réponses d'experts</h2>
              <p>Des réponses honnêtes, sans jargon, par des professionnels de la finance.</p>
            </div>
            <div className="crowd-faq-list">
              {faqSchema.mainEntity.map((f, i) => (
                <details key={i} className="crowd-faq-item">
                  <summary>{f.name}</summary>
                  <p>{f.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Vous avez d'autres questions ? Nos experts vous répondent sous 24h.
              </p>
              <Link href="/contact" className="fin-btn-secondary">
                Poser ma question →
              </Link>
            </div>
          </div>
        </section>

        {/* ── MAILLAGE INTERNE SEO ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Aller plus loin</span>
              <h2>Complétez votre stratégie patrimoniale</h2>
              <p>
                Le crowdfunding est un outil parmi d'autres. Une stratégie patrimoniale
                équilibrée combine plusieurs placements complémentaires.
              </p>
            </div>
            <div className="fin-cards">
              {[
                {
                  href: '/investir/scpi',
                  icon: '🏢',
                  title: 'SCPI',
                  sub: 'Immobilier de rendement',
                  text: '4–6%/an, mutualisation du risque sur des centaines d\'actifs, pas de gestion. Le placement immobilier préféré des Français.',
                },
                {
                  href: '/investir/assurance-vie',
                  icon: '🛡️',
                  title: 'Assurance Vie',
                  sub: 'Épargne & transmission',
                  text: 'L\'enveloppe fiscale la plus avantageuse après 8 ans. Idéale en complément du crowdfunding pour sécuriser une partie de votre épargne.',
                },
                {
                  href: '/investir/per',
                  icon: '🏦',
                  title: 'PERP / PER',
                  sub: 'Préparez votre retraite',
                  text: 'Réduisez vos impôts aujourd\'hui et constituez un capital retraite. Un avantage fiscal immédiat et concret.',
                },
              ].map(s => (
                <Link href={s.href} key={s.title} className="fin-card">
                  <div className="fin-card-icon">{s.icon}</div>
                  <div className="fin-card-sub">{s.sub}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="fin-card-link">En savoir plus →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="fin-cta">
          <div className="fin-cta-inner">
            <h2>Prêt à investir<br />intelligemment ?</h2>
            <p>
              30 minutes avec un expert Orizia suffisent pour définir votre stratégie,
              identifier les meilleurs projets et éviter les pièges les plus courants.
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Prendre rendez-vous →
              </Link>
              <Link href="/contact" className="fin-btn-outline">
                Poser une question
              </Link>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 520, margin: '24px auto 0' }}>
              Investir comporte des risques de perte en capital. Les performances passées ne préjugent pas des performances futures.
              Orizia Courtage, courtier indépendant — rémunéré par les plateformes partenaires, jamais par le client.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}