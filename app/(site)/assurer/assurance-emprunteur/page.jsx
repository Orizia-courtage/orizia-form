import Link from 'next/link';

export const metadata = {
  title: 'Assurance Emprunteur 2026 : Économisez jusqu\'à 15 000€ sur votre prêt | Orizia Courtage',
  description:
    'L\'assurance emprunteur représente jusqu\'à 40% du coût total de votre crédit. Grâce à la loi Lemoine, changez à tout moment. Orizia Courtage vous trouve le meilleur contrat. Conseil gratuit et indépendant.',
  keywords: [
    'assurance emprunteur 2026',
    'délégation assurance emprunteur',
    'loi Lemoine résiliation',
    'changer assurance emprunteur',
    'meilleure assurance prêt immobilier',
    'assurance emprunteur courtier',
    'économiser assurance prêt',
    'assurance emprunteur pas chère',
  ],
  alternates: { canonical: 'https://orizia.fr/assurer/emprunteur' },
  openGraph: {
    title: 'Assurance Emprunteur 2026 : Économisez jusqu\'à 15 000€ | Orizia Courtage',
    description: 'Loi Lemoine : résiliez à tout moment. Orizia Courtage compare les meilleures offres et vous fait économiser des milliers d\'euros sur votre assurance de prêt.',
    url: 'https://orizia.fr/assurer/emprunteur',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu\'est-ce que l\'assurance emprunteur ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'assurance emprunteur est un contrat qui garantit le remboursement de votre prêt immobilier en cas de décès, invalidité ou incapacité de travail. Elle est exigée par toutes les banques pour accorder un crédit immobilier. Elle représente en moyenne 25 à 40% du coût total du crédit, soit entre 8 000€ et 20 000€ sur un prêt de 200 000€ sur 20 ans.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on changer d\'assurance emprunteur à tout moment en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, depuis la loi Lemoine du 1er juin 2022, vous pouvez résilier et changer votre assurance emprunteur à tout moment, sans frais et sans attendre de date anniversaire. La seule condition est que le nouveau contrat présente des garanties au moins équivalentes à celles exigées par votre banque. La procédure prend environ 3 semaines et votre taux de crédit ne change pas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien peut-on économiser en changeant d\'assurance emprunteur ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'économie moyenne constatée est de 6 500€ à 15 000€ sur la durée totale du prêt. Un emprunteur de 36 ans paie en moyenne 0,32%/an avec l\'assurance bancaire contre 0,14%/an avec un contrat délégué — soit plus de 50% d\'économie. Plus vous changez tôt dans la vie du prêt, plus l\'économie est importante.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ma banque peut-elle refuser ma délégation d\'assurance ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Non, votre banque ne peut pas refuser votre délégation d\'assurance si le contrat présente des garanties équivalentes (critères définis par la Fiche Standardisée d\'Information). Elle dispose de 10 jours ouvrés pour accepter ou refuser — et tout refus doit être motivé par écrit. En cas de refus abusif, vous pouvez saisir le médiateur bancaire.',
      },
    },
    {
      '@type': 'Question',
      name: 'Faut-il remplir un questionnaire de santé pour l\'assurance emprunteur ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depuis la loi Lemoine, le questionnaire médical est supprimé si : le capital emprunté est inférieur à 200 000€ par personne (400 000€ pour un couple) ET si le remboursement du prêt s\'achève avant vos 60 ans. Au-delà de ces seuils, un questionnaire de santé simplifié reste nécessaire, mais les conditions ont été assouplies.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelles sont les garanties indispensables d\'une assurance emprunteur ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les garanties obligatoires demandées par les banques sont le décès (DC) et la Perte Totale et Irréversible d\'Autonomie (PTIA). Les garanties recommandées sont l\'Invalidité Permanente Totale (IPT), l\'Invalidité Permanente Partielle (IPP) et l\'Incapacité Temporaire Totale de travail (ITT). La perte d\'emploi (PE) est optionnelle et souvent peu rentable. Orizia analyse votre profil pour ne vous faire payer que les garanties utiles.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi passer par un courtier pour son assurance emprunteur ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un courtier comme Orizia compare simultanément les offres de nombreux assureurs (Cardif, Abeille, SwissLife…) et négocie des tarifs indisponibles en direct. Il gère aussi toute la procédure de substitution auprès de votre banque — la phase administrative la plus chronophage. Le service est 100% gratuit pour vous : Orizia est rémunéré par l\'assureur partenaire.',
      },
    },
  ],
};

const CHIFFRES = [
  { value: '25–40%', label: 'du coût total du crédit', icon: '📊' },
  { value: '15 000€', label: 'économies possibles sur 20 ans', icon: '💰' },
  { value: '−50%', label: 'de taux vs assurance bancaire', icon: '📉' },
  { value: '3 sem.', label: 'pour changer de contrat', icon: '⚡' },
];

const TAUX_COMPARATIF = [
  { age: '26 ans', banque: '0,23%', courtier: '0,08%', gain: '65%' },
  { age: '36 ans', banque: '0,32%', courtier: '0,14%', gain: '56%' },
  { age: '46 ans', banque: '0,40%', courtier: '0,22%', gain: '45%' },
  { age: '56 ans', banque: '0,48%', courtier: '0,30%', gain: '37%' },
];

const ECONOMIES_EXEMPLES = [
  {
    profil: 'Couple, 32 ans',
    pret: '250 000€ sur 25 ans',
    tauxBanque: '0,32%',
    tauxCourt: '0,13%',
    economie: '11 875€',
    couleur: '#16a34a',
  },
  {
    profil: 'Salarié, 38 ans',
    pret: '180 000€ sur 20 ans',
    tauxBanque: '0,34%',
    tauxCourt: '0,15%',
    economie: '6 840€',
    couleur: '#d97706',
  },
  {
    profil: 'TNS, 44 ans',
    pret: '300 000€ sur 20 ans',
    tauxBanque: '0,42%',
    tauxCourt: '0,24%',
    economie: '10 800€',
    couleur: 'var(--orizia-primary)',
  },
];

const GARANTIES = [
  {
    code: 'DC',
    label: 'Décès',
    obligatoire: true,
    desc: 'Remboursement intégral du capital restant dû en cas de décès de l\'assuré.',
    icon: '🛡️',
  },
  {
    code: 'PTIA',
    label: 'Perte Totale et Irréversible d\'Autonomie',
    obligatoire: true,
    desc: 'Déclenche le remboursement si l\'assuré ne peut plus accomplir seul les actes de la vie courante.',
    icon: '♿',
  },
  {
    code: 'IPT',
    label: 'Invalidité Permanente Totale',
    obligatoire: false,
    desc: 'Prend en charge les mensualités si votre taux d\'invalidité dépasse 66%.',
    icon: '🩺',
  },
  {
    code: 'IPP',
    label: 'Invalidité Permanente Partielle',
    obligatoire: false,
    desc: 'Couverture partielle pour un taux d\'invalidité entre 33% et 66%. Recommandée.',
    icon: '📋',
  },
  {
    code: 'ITT',
    label: 'Incapacité Temporaire Totale',
    obligatoire: false,
    desc: 'Prend en charge vos mensualités pendant un arrêt de travail total (maladie, accident).',
    icon: '🏥',
  },
  {
    code: 'PE',
    label: 'Perte d\'Emploi',
    obligatoire: false,
    desc: 'Optionnelle et souvent peu rentable. Délais de carence longs, conditions restrictives. À évaluer au cas par cas.',
    icon: '💼',
  },
];

const DANGERS = [
  {
    icon: '🏦',
    title: 'L\'assurance groupe bancaire : confortable pour la banque, coûteuse pour vous',
    text: 'Votre banque vous propose son assurance groupe à la signature du prêt. C\'est simple — mais les taux sont de 0,23% à 0,48%/an selon l\'âge, soit 2 à 3 fois plus chers qu\'un contrat individuel. Sur 20 ans, la différence peut dépasser 15 000€.',
  },
  {
    icon: '📋',
    title: 'La banque ne peut légalement pas vous forcer',
    text: 'Depuis la loi Lagarde (2010), vous êtes libre de choisir votre assureur. Depuis la loi Lemoine (2022), vous pouvez changer à tout moment. Pourtant, 80% des emprunteurs souscrivent encore l\'assurance de leur banque par méconnaissance ou pression commerciale.',
  },
  {
    icon: '⚠️',
    title: 'Chaque mois sans agir est de l\'argent perdu',
    text: 'L\'assurance emprunteur est calculée sur le capital restant dû. Plus vous changez tôt, plus vous économisez. Un changement effectué 5 ans après la signature fait encore économiser des milliers d\'euros — mais chaque mois de retard réduit le gain.',
  },
];

const LOI_LEMOINE_POINTS = [
  {
    icon: '🔄',
    title: 'Résiliation à tout moment',
    desc: 'Plus d\'attente de date anniversaire. Résiliez et changez dès demain si vous le souhaitez, sans pénalité.',
  },
  {
    icon: '🩺',
    title: 'Questionnaire médical supprimé',
    desc: 'Pour un capital < 200 000€/personne avec remboursement avant 60 ans : aucune question de santé.',
  },
  {
    icon: '📬',
    title: 'Résiliation par lettre simple',
    desc: 'La banque ne peut pas exiger d\'envoi recommandé. Une lettre simple suffit (recommandé conseillé pour preuve).',
  },
  {
    icon: '✅',
    title: 'Refus de la banque encadré',
    desc: 'La banque dispose de 10 jours ouvrés pour répondre. Tout refus doit être motivé par écrit.',
  },
];

const ETAPES = [
  {
    n: '01',
    title: 'Analyse de votre contrat actuel',
    text: 'Taux, garanties, exclusions — Orizia audite votre contrat bancaire actuel et chiffre exactement combien vous payez de trop. Pas de jargon, un résultat en euros.',
  },
  {
    n: '02',
    title: 'Comparaison & sélection',
    text: 'Parmi nos partenaires assureurs (Cardif Elite, Abeille, SwissLife…), nous sélectionnons le contrat avec les meilleures garanties au taux le plus bas pour votre profil spécifique.',
  },
  {
    n: '03',
    title: 'Gestion du dossier de A à Z',
    text: 'Nous rédigeons la demande de substitution, la transmettons à votre banque et assurons le suivi jusqu\'à l\'acceptation. Vous n\'avez rien à faire, sauf signer.',
  },
  {
    n: '04',
    title: 'Suivi & optimisation continue',
    text: 'Un bilan annuel pour vérifier que votre contrat reste optimal. Si votre profil change (arrêt d\'une activité à risque, anniversaire fiscal…), nous réoptimisons.',
  },
];

const OBJECTIONS = [
  {
    q: '« Ma banque va refuser ou compliquer mon prêt. »',
    r: 'C\'est l\'argument n°1 des banques pour vous décourager. Il est faux. La loi Lagarde interdit formellement à la banque de modifier les conditions de votre crédit (taux, durée, montant) en cas de délégation d\'assurance. Si elle le fait, c\'est illégal et sanctionnable.',
  },
  {
    q: '« J\'ai déjà signé mon prêt, c\'est trop tard. »',
    r: 'La loi Lemoine vous permet de changer à tout moment, même 10 ans après la signature. Que vous ayez un prêt de 2015 ou de 2024, vous pouvez agir maintenant. Plus tôt vous agissez, plus vous économisez — mais il n\'est jamais trop tard.',
  },
  {
    q: '« C\'est trop de démarches pour moi. »',
    r: 'Orizia gère l\'intégralité des démarches à votre place. Vous fournissez votre offre de prêt et vos coordonnées — nous faisons le reste : comparaison, sélection, demande de substitution, relances, suivi. La procédure prend 2 à 3 semaines.',
  },
  {
    q: '« Mon état de santé va me pénaliser. »',
    r: 'Pas nécessairement. La loi Lemoine a supprimé le questionnaire médical pour les prêts < 200 000€/personne remboursés avant 60 ans. Pour les autres, les assureurs alternatifs ont souvent des conditions plus souples et plus adaptées que les contrats groupe bancaires.',
  },
];

export default function AssuranceEmprunteurPage() {
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
              <Link href="/assurer" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Assurer</Link>
              {' › '}
              <span>Assurance Emprunteur</span>
            </nav>
            <span className="fin-badge">💰 Économisez jusqu'à 15 000€ sur votre prêt</span>
            <h1>Assurance emprunteur :<br />payez 2× moins, à garanties égales</h1>
            <p>
              L'assurance de prêt représente <strong>25 à 40% du coût total de votre crédit</strong>.
              Grâce à la loi Lemoine, vous pouvez changer de contrat <strong>à tout moment, sans frais</strong>,
              et économiser des milliers d'euros. Orizia Courtage s'occupe de tout — gratuitement.
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Faire auditer mon contrat gratuitement →
              </Link>
              <Link href="#economies" className="fin-btn-secondary">
                💰 Voir les économies possibles
              </Link>
            </div>
            <div className="fin-hero-trust">
              <span>✅ Loi Lemoine : changement à tout moment</span>
              <span>🏦 Contrats Cardif, Abeille, SwissLife…</span>
              <span>⚡ Démarches gérées par Orizia</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
        <section className="fin-chiffres">
          <div className="fin-chiffres-inner">
            {CHIFFRES.map(c => (
              <div key={c.value} className="fin-chiffre">
                <strong>{c.icon} {c.value}</strong>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROBLÈME ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Le poste oublié qui coûte le plus cher
              </span>
              <h2>Votre assurance bancaire vous coûte<br />probablement des milliers d'euros de trop</h2>
              <p>
                Quand vous signez votre prêt, la banque vous propose son assurance groupe.
                C'est pratique — mais c'est souvent 2 à 3 fois plus cher qu'un contrat individuel.
                Voici pourquoi.
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
                Un audit gratuit vous montre exactement ce que vous perdez chaque mois.
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 20 }}>
                Transmettez votre offre de prêt — Orizia calcule votre économie potentielle sous 24h.
              </p>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Auditer mon contrat gratuitement →
              </Link>
            </div>
          </div>
        </section>

        {/* ── TABLEAU TAUX COMPARATIFS ── */}
        <section id="economies" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Taux 2026 — Chiffres réels</span>
              <h2>Assurance bancaire vs contrat délégué :<br />la différence en chiffres</h2>
              <p>
                Ces taux sont constatés en mars 2026 pour un prêt de 200 000€.
                L'écart est systématiquement en faveur du contrat délégué — quel que soit l'âge.
              </p>
            </div>

            <div className="ae-taux-table-wrap">
              <table className="ae-taux-table">
                <thead>
                  <tr>
                    <th>Profil</th>
                    <th className="ae-col--banque">Assurance bancaire</th>
                    <th className="ae-col--courtier">Contrat Orizia</th>
                    <th className="ae-col--gain">Économie</th>
                  </tr>
                </thead>
                <tbody>
                  {TAUX_COMPARATIF.map(row => (
                    <tr key={row.age}>
                      <td><strong>{row.age}</strong></td>
                      <td className="ae-col--banque ae-taux--bad">
                        <span>{row.banque}<small>/an</small></span>
                      </td>
                      <td className="ae-col--courtier ae-taux--good">
                        <span>{row.courtier}<small>/an</small></span>
                      </td>
                      <td className="ae-col--gain">
                        <span className="ae-gain-badge">−{row.gain}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="ae-taux-source">
                Source : Le Partenaire — baromètre mars 2026. Taux pour un capital de 200 000€, garanties DC/PTIA/ITT/IPT.
              </p>
            </div>

            {/* Exemples concrets d'économies */}
            <div className="ae-economies-grid">
              {ECONOMIES_EXEMPLES.map(ex => (
                <div key={ex.profil} className="ae-economie-card">
                  <div className="ae-economie-profil">{ex.profil}</div>
                  <div className="ae-economie-pret">{ex.pret}</div>
                  <div className="ae-economie-taux-row">
                    <div className="ae-economie-taux ae-economie-taux--bad">
                      <span>Banque</span>
                      <strong>{ex.tauxBanque}/an</strong>
                    </div>
                    <div className="ae-economie-arrow">→</div>
                    <div className="ae-economie-taux ae-economie-taux--good">
                      <span>Orizia</span>
                      <strong>{ex.tauxCourt}/an</strong>
                    </div>
                  </div>
                  <div className="ae-economie-total" style={{ borderColor: ex.couleur, color: ex.couleur }}>
                    🎯 Économie totale estimée : <strong>{ex.economie}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="crowd-risques-note" style={{ marginTop: 24 }}>
              💡 Ces estimations sont calculées sur la durée totale du prêt, en partant du taux actuel.
              L'économie réelle dépend de votre profil de santé, de votre profession et du capital restant dû.
              Orizia calcule votre économie personnalisée lors du premier rendez-vous.
            </div>

            <div className="crowd-cta-band" style={{ marginTop: 32 }}>
              <div>
                <strong>Votre économie personnalisée calculée en 24h.</strong>
                <p>Transmettez-nous votre tableau d'amortissement — on fait le reste.</p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Calculer mon économie →
              </Link>
            </div>
          </div>
        </section>

        {/* ── LOI LEMOINE ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}>
                  ✅ Loi Lemoine 2022
                </span>
                <h2>La loi Lemoine a tout changé :<br />voici vos droits exacts</h2>
                <p>
                  Depuis le <strong>1er juin 2022</strong>, la loi Lemoine vous donne le droit de
                  résilier et remplacer votre assurance emprunteur <strong>à tout moment</strong>,
                  sans frais, sans pénalité et sans attendre de date anniversaire.
                </p>
                <p>
                  Ce droit s'applique à <strong>tous les prêts immobiliers en cours</strong>,
                  peu importe leur date de signature. Que vous ayez signé il y a 2 ans ou 15 ans,
                  vous pouvez agir dès maintenant.
                </p>
                <p>
                  La seule condition : le nouveau contrat doit présenter des garanties
                  au moins <strong>équivalentes</strong> à celles exigées par votre banque
                  — définies par la Fiche Standardisée d'Information (FSI).
                </p>
                <Link href="/rendez-vous" className="fin-btn-primary" style={{ display: 'inline-block', marginTop: 16 }}>
                  📅 Changer d'assurance maintenant →
                </Link>
              </div>

              {/* Schéma loi Lemoine */}
              <div className="crowd-schema">
                <div style={{ textAlign: 'center', marginBottom: 16, fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--orizia-primary)' }}>
                  Vos droits en 2026
                </div>
                {LOI_LEMOINE_POINTS.map(pt => (
                  <div key={pt.title} className="ae-lemoine-point">
                    <div className="ae-lemoine-icon">{pt.icon}</div>
                    <div>
                      <strong>{pt.title}</strong>
                      <span>{pt.desc}</span>
                    </div>
                  </div>
                ))}
                <div style={{
                  marginTop: 16,
                  background: 'rgba(22,163,74,0.06)',
                  border: '1.5px solid rgba(22,163,74,0.2)',
                  borderRadius: 12,
                  padding: '14px 16px',
                  fontSize: '0.82rem',
                  color: '#16a34a',
                  fontWeight: 700,
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}>
                  🩺 Questionnaire médical supprimé<br />
                  <span style={{ fontWeight: 400, opacity: 0.8 }}>
                    pour capital &lt; 200 000€/pers. remboursé avant 60 ans
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GARANTIES ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Les garanties</span>
              <h2>Quelles garanties choisir ?<br />Ce qui est utile vs ce qui est superflu</h2>
              <p>
                Toutes les garanties ne sont pas obligatoires. Orizia ne vous fait souscrire
                que celles qui correspondent à votre profil réel — pas à un forfait standard.
              </p>
            </div>
            <div className="ae-garanties-grid">
              {GARANTIES.map(g => (
                <div
                  key={g.code}
                  className={`ae-garantie-card${g.obligatoire ? ' ae-garantie-card--obligatoire' : ''}`}
                >
                  <div className="ae-garantie-header">
                    <span className="ae-garantie-icon">{g.icon}</span>
                    <div>
                      <div className="ae-garantie-code">{g.code}</div>
                      <div className="ae-garantie-label">{g.label}</div>
                    </div>
                    <span className={`ae-garantie-badge${g.obligatoire ? ' ae-garantie-badge--req' : ' ae-garantie-badge--opt'}`}>
                      {g.obligatoire ? '✅ Obligatoire' : 'Optionnelle'}
                    </span>
                  </div>
                  <p className="ae-garantie-desc">{g.desc}</p>
                </div>
              ))}
            </div>
            <div className="crowd-risques-note" style={{ marginTop: 24 }}>
              💡 <strong>L'astuce Orizia :</strong> les contrats délégués permettent de moduler les quotités
              (part couverte par chaque co-emprunteur) et d'activer uniquement les garanties nécessaires.
              Un couple peut, par exemple, couvrir à 100% l'emprunteur principal et à 50% le co-emprunteur —
              ce que les contrats groupe bancaires ne permettent pas toujours.
            </div>
          </div>
        </section>

        {/* ── ACCOMPAGNEMENT ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Notre accompagnement</span>
              <h2>Orizia gère tout,<br />vous n'avez qu'à signer</h2>
              <p>
                De l'audit de votre contrat actuel à l'acceptation par la banque —
                la procédure complète prise en charge, sans frais pour vous.
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
            <div className="av-gratuit-bloc">
              <div className="av-gratuit-icon">🤝</div>
              <div>
                <strong>Un service complet, 100% gratuit pour vous</strong>
                <p>
                  Orizia Courtage est rémunéré par l'assureur partenaire sous forme de commission,
                  encadrée par la réglementation DDA et communiquée de façon transparente dès le
                  premier échange. Vous ne payez pas plus cher qu'en souscrivant directement —
                  mais vous bénéficiez d'un expert qui gère toute la procédure.
                </p>
              </div>
              <Link href="/rendez-vous" className="fin-btn-primary" style={{ flexShrink: 0 }}>
                📅 Démarrer →
              </Link>
            </div>
          </div>
        </section>

        {/* ── OBJECTIONS ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">On répond à vos doutes</span>
              <h2>Votre banque vous a peut-être dit<br />que ce n'était pas possible</h2>
              <p>
                Ce sont les 4 freins les plus fréquents. Voici ce que dit vraiment la loi.
              </p>
            </div>
            <div className="av-objections-grid">
              {OBJECTIONS.map((o, i) => (
                <div key={i} className="av-objection-card">
                  <div className="av-objection-q">{o.q}</div>
                  <div className="av-objection-r">{o.r}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Votre situation est particulière ? On analyse votre dossier en 24h.
              </p>
              <div className="fin-hero-btns" style={{ justifyContent: 'center' }}>
                <Link href="/rendez-vous" className="fin-btn-primary">
                  📅 Prendre rendez-vous →
                </Link>
                <Link href="/contact" className="fin-btn-secondary">
                  ✉️ Poser une question
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions sur l'assurance emprunteur,<br />nos réponses d'experts</h2>
              <p>Des réponses précises, vérifiées, sans jargon.</p>
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
                Une question sur votre contrat spécifique ?
              </p>
              <Link href="/contact" className="fin-btn-secondary">
                Poser ma question →
              </Link>
            </div>
          </div>
        </section>

        {/* ── MAILLAGE INTERNE ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Aller plus loin</span>
              <h2>Optimisez l'ensemble<br />de votre projet immobilier</h2>
              <p>L'assurance emprunteur est un levier parmi d'autres. Découvrez comment réduire le coût global.</p>
            </div>
            <div className="fin-cards">
              {[
                {
                  href: '/financer/credit-immobilier',
                  icon: '🏡',
                  title: 'Crédit Immobilier',
                  sub: 'Financer votre projet',
                  text: 'Un meilleur taux de crédit + une assurance optimisée : Orizia négocie les deux simultanément pour minimiser le coût total.',
                },
                {
                  href: '/investir/assurance-vie',
                  icon: '🛡️',
                  title: 'Assurance Vie',
                  sub: 'Épargner en parallèle',
                  text: 'Pendant que votre prêt s\'amortit, construisez votre patrimoine. L\'assurance vie est le placement complémentaire idéal.',
                },
                {
                  href: '/assurer/habitation',
                  icon: '🏠',
                  title: 'Assurance Habitation',
                  sub: 'Protéger votre bien',
                  text: 'Obligatoire pour un logement en copropriété, fortement recommandée en maison individuelle. Orizia compare les meilleures offres.',
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
            <h2>Chaque mois sans agir,<br />c'est de l'argent laissé à votre banque</h2>
            <p>
              Orizia audite votre contrat actuel, trouve le meilleur contrat du marché
              et gère toute la procédure de substitution. En 3 semaines, votre assurance
              est optimisée — sans aucun risque sur votre prêt.
            </p>
            <div className="fin-hero-btns">
              <Link href="/rendez-vous" className="fin-btn-primary">
                📅 Auditer mon contrat gratuitement →
              </Link>
              <Link href="/contact" className="fin-btn-outline">
                Poser une question
              </Link>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
              Les économies indiquées sont des estimations basées sur les taux moyens constatés en mars 2026
              et dépendent du profil de l'emprunteur. Orizia Courtage, courtier en assurance régi par l'ACPR,
              rémunéré par les assureurs partenaires, jamais par le client.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}