import Link from 'next/link';
import Image from 'next/image';
import ContactPopup from '@/components/ContactPopup';
import AssuranceEmprunteurCalc from '@/components/AssuranceEmprunteurCalc';
import LemoineQuiz from '@/components/LemoineQuiz';
import EmprunteurChecklist from '@/components/EmprunteurChecklist';
import ReadingProgressEmprunteur from '@/components/ReadingProgressEmprunteur';
import ScrollButton from '@/components/ScrollButton';

// -- 1. MÉTADONNÉES SEO --
export const metadata = {
  title: 'Assurance Emprunteur 2026 : Loi Lemoine | Orizia Courtage',
  description:
    "Votre banque vous surfacture votre assurance de prêt ? Grâce à la loi Lemoine, je résilie et vous fais économiser jusqu'à 15 000€. Courtier indépendant.",
  alternates: { canonical: 'https://www.orizia-courtage.fr/assurer/assurance-emprunteur' },
  openGraph: {
    title: 'Assurance Emprunteur 2026 : Économisez avec la Loi Lemoine | Orizia Courtage',
    description: "Ne laissez plus votre banque monopoliser votre assurance de prêt. Économisez jusqu'à 15 000€ grâce à la loi Lemoine. Je compare, je résilie, je gère tout.",
    url: 'https://www.orizia-courtage.fr/assurer/assurance-emprunteur',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://www.orizia-courtage.fr/images/og-assurance-emprunteur.webp',
        width: 1200,
        height: 630,
        alt: "Délégation d'assurance emprunteur avec Orizia Courtage",
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// -- 2. DONNÉES STRUCTURÉES --
const assuranceEmprunteurSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Assurer', item: 'https://www.orizia-courtage.fr/assurer' },
        { '@type': 'ListItem', position: 3, name: 'Assurance Emprunteur', item: 'https://www.orizia-courtage.fr/assurer/assurance-emprunteur' }
      ]
    },
    {
      '@type': 'Service',
      name: "Courtage et Délégation d'Assurance Emprunteur",
      description:
        "Service d'optimisation et de substitution d'assurance de prêt immobilier via la loi Lemoine. Économies moyennes de 15 000€ constatées.",
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        image: 'https://www.orizia-courtage.fr/images/Orizia_logo.webp',
      },
      areaServed: [
        { '@type': 'State', name: 'Hauts-de-France' },
        { '@type': 'City', name: 'Lille' },
        { '@type': 'City', name: 'Marcq-en-Barœul' },
        { '@type': 'Country', name: 'France' }
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description:
          "Étude de faisabilité et gestion administrative de la résiliation sans frais de dossieres pour l'emprunteur.",
      },
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Qu'est-ce que l'assurance emprunteur exactement ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "C'est le contrat qui rembourse votre crédit immobilier à votre place si vous avez un accident de la vie (décès, invalidité, arrêt de travail). C'est imposé par la banque, mais ce que l'on oublie souvent de vous dire, c'est qu'elle représente jusqu'à 40% du coût total de votre crédit.",
      },
    },
    {
      '@type': 'Question',
      name: "Puis-je vraiment changer d'assurance quand je veux ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolument ! Depuis la loi Lemoine (2022), vous êtes totalement libre de quitter l'assurance de votre banque à n'importe quel moment. Plus besoin d'attendre la date anniversaire. Vous pouvez changer dès le lendemain de la signature de votre prêt, ou 5 ans après.",
      },
    },
    {
      '@type': 'Question',
      name: "Combien d'argent puis-je espérer récupérer ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "C'est l'un des postes où l'optimisation est la plus spectaculaire. Mes clients économisent en moyenne entre 6 500€ et 15 000€ sur la durée restante de leur prêt. Les contrats indépendants sont souvent 50% moins chers que ceux des banques, à garanties strictement égales.",
      },
    },
    {
      '@type': 'Question',
      name: "Ma banque a-t-elle le droit de refuser mon nouveau contrat ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. La loi l'interdit. Si le nouveau contrat que je vous propose couvre exactement les mêmes choses que celui de la banque (ce qu'on appelle l'équivalence des garanties), la banque a 10 jours pour accepter. Si elle fait de la résistance, je monte au créneau pour vous.",
      },
    },
    {
      '@type': 'Question',
      name: "Vais-je devoir passer des examens médicaux ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "C'est la magie de la loi Lemoine : le questionnaire de santé a disparu ! Si vous empruntez moins de 200 000€ par personne (400 000€ pour un couple) et que vous finissez de rembourser avant 60 ans, on ne vous posera aucune question sur votre santé.",
      },
    },
    {
      '@type': 'Question',
      name: "Pourquoi faire appel à vous plutôt que de chercher moi-même ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Parce que changer d'assurance demande d'affronter sa banque, ce qui est souvent usant et technique. Je suis indépendante : je compare les meilleurs contrats, je m'assure de l'équivalence des garanties, et je gère 100% des courriers avec votre banque. Vous récupérez votre pouvoir d'achat sans la charge mentale. Mon service est sans frais de dossier pour vous, je suis rémunérée par l'assureur.",
      },
    },
  ],
};

const CHIFFRES = [
  { value: "Jusqu'à\u00A040%", label: 'Du coût total de votre crédit', icon: '💰' },
  { value: '15\u00A0000€', label: 'Économies moyennes constatées', icon: '💶' },
  { value: '-50%', label: "Sur votre taux d'assurance", icon: '📈' },
  { value: '0\u00A0effort', label: 'Je gère toute la paperasse', icon: '✅' },
];

const ECONOMIES_EXEMPLES = [
  { profil: 'Couple, 32 ans',      pret: '250 000€ restants sur 25 ans', tauxBanque: '0,32%', tauxCourt: '0,13%', economie: '11 875€', couleur: '#16a34a' },
  { profil: 'Salarié, 38 ans',     pret: '180 000€ restants sur 20 ans', tauxBanque: '0,34%', tauxCourt: '0,15%', economie: '6 840€',  couleur: '#d97706' },
  { profil: 'Indépendant, 44 ans', pret: '300 000€ restants sur 20 ans', tauxBanque: '0,42%', tauxCourt: '0,24%', economie: '10 800€', couleur: 'var(--orizia-primary)' },
];

const GARANTIES = [
  { code: 'DC / PTIA', label: "Décès & Perte d'Autonomie",      obligatoire: true,  desc: 'Le socle exigé par toutes les banques. Rembourse le capital restant dû en cas de drame.',                                                                   icon: '🛡️' },
  { code: 'IPT / IPP', label: 'Invalidité (Totale ou Partielle)', obligatoire: false, desc: "Vous protège si une maladie ou un accident réduit votre capacité à travailler de façon permanente.",                                                          icon: '🏥' },
  { code: 'ITT',       label: 'Arrêt de travail temporaire',      obligatoire: false, desc: "L'assureur paie vos mensualités de crédit pendant votre arrêt maladie prolongé.",                                                                             icon: '⏱️' },
  { code: 'PE',        label: "Perte d'Emploi",                   obligatoire: false, desc: "Souvent chère avec beaucoup d'exclusions. Je vous aide à évaluer si elle vaut vraiment le coût dans votre situation.",                                        icon: '💼' },
];

const DANGERS = [
  { icon: '🏦', title: 'Le piège du contrat bancaire "par défaut"',           text: "À la signature du crédit, par simplicité ou par pression, vous signez l'assurance de la banque. Problème : leurs taux sont 2 à 3 fois plus élevés que le prix réel du marché. Une \"facilité\" qui vous coûte le prix d'une voiture neuve sur 20 ans." },
  { icon: '🔒', title: 'Ce que votre conseiller ne vous crie pas sur les toits', text: "Vous êtes totalement libre de choisir votre assureur, ou d'en changer. Les banques le savent mais freinent des quatre fers, car l'assurance emprunteur est l'un de leurs produits les plus rentables." },
  { icon: '⏱️', title: 'Le temps joue contre votre portefeuille',              text: "Plus vous attendez, plus vous engraissez la banque. L'assurance se paie chaque mois sur le capital restant. En changeant aujourd'hui plutôt que dans 3 ans, vous sauvez des milliers d'euros de vos propres poches." },
];

const LOI_LEMOINE_POINTS = [
  { icon: '✅', title: 'Liberté immédiate',              desc: "Changement autorisé n'importe quand. Plus de préavis annuel à respecter." },
  { icon: '🏥', title: 'Fin du questionnaire de santé',  desc: 'Sous conditions (capital < 200k€/pers, fin du prêt avant 60 ans), votre passé médical ne vous pénalise plus.' },
  { icon: '⏱️', title: "Droit à l'oubli réduit",        desc: 'Le délai passe de 10 à 5 ans pour les anciens malades (cancers, hépatite C).' },
  { icon: '🛡️', title: 'Équivalence stricte',           desc: "La banque DOIT accepter le nouveau contrat s'il vous couvre aussi bien que le sien." },
];

const ETAPES = [
  { n: '01', title: "J'épluche votre contrat actuel",         text: "Envoyez-moi votre offre de prêt. Je décortique ce que vous payez aujourd'hui et je vous donne un chiffre clair : combien vous allez économiser." },
  { n: '02', title: 'Je sélectionne le contrat parfait',      text: "En tant qu'indépendante, j'interroge les grands noms de l'assurance (Cardif, SwissLife...) pour trouver le meilleur taux, avec des garanties béton validées par la banque." },
  { n: '03', title: 'Je monte au front face à la banque',     text: "C'est la partie que mes clients détestent, et c'est mon expertise. Je prépare le dossier, j'envoie la résiliation, je relance votre banquier. Je gère le bras de fer." },
  { n: '04', title: 'Vous constatez la baisse de vos mensualités', text: 'Une fois la substitution acceptée, votre nouveau contrat prend le relais. Vous êtes aussi bien couvert, mais votre prélèvement mensuel fond considérablement.' },
];

const OBJECTIONS = [
  { q: '« Si je fais ça, ma banque va changer le taux de mon crédit. »',        r: "C'est du chantage pur et simple, et c'est illégal. La loi Lagarde interdit formellement à une banque de modifier votre taux de crédit ou vos conditions si vous prenez une assurance externe." },
  { q: '« Je viens juste de signer mon prêt, je dois attendre un an, non ? »',  r: "Plus maintenant ! Avec la loi Lemoine, le droit de résiliation est permanent. Vous avez signé hier ? On peut changer demain. Il n'y a plus de période de blocage." },
  { q: '« Ça a l\'air d\'être une montagne de démarches administratives. »',    r: "Pour vous ? Aucune. Vous me signez un mandat, et je fais absolument tout. Je récupère les documents, je gère les courriers recommandés, je relance le service prêt de votre banque. C'est du clé en main." },
  { q: "« Mon état de santé s'est dégradé depuis la signature. »",              r: "Si vous êtes éligible à la suppression du questionnaire médical (moins de 200k€ par emprunteur, fin du prêt avant 60 ans), on ne vous posera aucune question. Votre santé actuelle n'impactera pas le tarif." },
];

export default function AssuranceEmprunteurPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(assuranceEmprunteurSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        <ReadingProgressEmprunteur />

        {/* -- HERO -- */}
        <section className="fin-hero ae-hero">
          <div className="ae-hero-bg">
            <Image
              src="/images/discret-hero-bg.webp"
              alt=""
              fill
              priority
              quality={80}
              sizes="100vw"
              className="hero-image"
              sizes="100vw"
            />
          </div>

          <div className="ae-hero-inner">
            <nav aria-label="breadcrumb" className="ae-breadcrumb">
              <Link href="/">Accueil</Link>
              {' › '}
              <Link href="/assurer">Assurer</Link>
              {' › '}
              <span>Assurance Emprunteur</span>
            </nav>

            <span className="fin-badge ae-hero-badge">
              💰 Divisez le coût de votre assurance par deux
            </span>

            <h1 className="ae-hero-title">
              Arrêtez de laisser des milliers<br />d'euros à votre banque
            </h1>

            <p className="ae-hero-intro">
              Votre assurance de crédit vous coûte probablement beaucoup trop cher. Avec la{' '}
              <strong>loi Lemoine</strong>, changez de contrat à tout moment. En tant que courtière
              indépendante, je compare les taux,{' '}
              <strong>je défie votre banque à votre place</strong>, et je vous fais économiser{' '}
              <strong>jusqu'à 15 000€</strong>.
            </p>

            <div className="ae-hero-btns">
              <ContactPopup label="📅 Calculer mon économie avec Cindy" className="fin-btn-primary" />
              <ScrollButton targetId="section-calculateur" className="fin-btn-secondary">
                📊 Voir les vrais chiffres
              </ScrollButton>
            </div>

            <div className="ae-hero-trust">
              <span>✅ Loi Lemoine : je résilie quand je veux</span>
              <span>💼 Service 100% délégué, sans frais de dossier</span>
              <span>💰 Mêmes garanties, prix divisé par 2</span>
            </div>
          </div>
        </section>

        {/* -- CHIFFRES CLÉS -- */}
        <section className="fin-chiffres">
          <div className="ae-chiffres-inner">
            {CHIFFRES.map(c => (
              <div key={c.label} className="fin-chiffre">
                <strong>{c.icon}{c.value}</strong>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* -- CITATION CINDY -- */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="ae-citation-card">
              <div className="ae-citation-photo">
                <Image
                  src="/images/photo-cindy.webp"
                  alt="Cindy Urbansky, courtière experte en assurance de prêt immobilier"
                  title="Cindy Urbansky - Orizia Courtage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  sizes="(max-width: 768px) 150px, 180px"
                  priority
                />
              </div>

              <div className="ae-citation-content">
                <p className="ae-citation-quote">
                  « L'assurance de prêt est la vache à lait des banques. On vous l'impose
                  discrètement à la signature, et vous finissez par payer des milliers d'euros en
                  trop. »
                </p>
                <p className="ae-citation-text">
                  Mon métier, c'est de reprendre cet argent pour le remettre dans votre poche. Et
                  le meilleur ? Je monte au front face à votre banque et je m'occupe de toutes les
                  démarches, sans que vous n'ayez à lever le petit doigt.
                </p>
                <span className="ae-citation-author">
                  Cindy Urbansky, courtier indépendant et fondatrice de Orizia Courtage
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* -- PROBLÈME -- */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                ⚠️ Ce qu'on ne vous dit pas à la signature
              </span>
              <h2>Pourquoi vous engraissez votre banque<br />chaque mois (sans le savoir)</h2>
              <p>
                L'assurance groupe de la banque est le produit financier le plus margé du marché.
                Il est temps de reprendre le contrôle.
              </p>
            </div>

            <div className="ae-probleme-layout">
              <div className="ae-probleme-dangers">
                {DANGERS.map(d => (
                  <div key={d.title} className="crowd-avantage-card" style={{ borderLeft: '4px solid #dc2626' }}>
                    <div className="crowd-avantage-icon">{d.icon}</div>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                ))}
              </div>
              <div className="ae-probleme-image">
                <Image
                  src="/images/banque-pression.webp"
                  alt="Client surpris par le coût caché de son assurance emprunteur bancaire"
                  title="Les coûts cachés de l'assurance bancaire"
                  width={716}
                  height={1024}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="ae-probleme-cta">
              <p className="ae-probleme-cta-text">Arrêtez l'hémorragie financière dès aujourd'hui.</p>
              <ContactPopup label="📊 Faire chiffrer mes économies" className="fin-btn-primary" />
            </div>
          </div>
        </section>

        {/* -- CALCULATEUR TAUX COMPARATIFS -- */}
        <section id="section-calculateur" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">La réalité des chiffres</span>
              <h2>Banque vs Courtier :<br />le match est plié d'avance</h2>
              <p>
                Entrez votre situation et voyez en temps réel combien vous pouvez récupérer.
                Le constat est simple : sortir de sa banque permet presque toujours de diviser la facture par deux.
              </p>
            </div>
            <AssuranceEmprunteurCalc />

            {/* Exemples concrets */}
            <div className="ae-economies-grid">
              <div className="ae-economies-title">📊 Exemples concrets de clients accompagnés</div>
              <div className="ae-economies-cards">
                {ECONOMIES_EXEMPLES.map(e => (
                  <div key={e.profil} className="ae-economie-card" style={{ borderTopColor: e.couleur }}>
                    <div className="ae-economie-profil">{e.profil}</div>
                    <div className="ae-economie-pret">{e.pret}</div>
                    <div className="ae-economie-taux-row">
                      <div className="ae-economie-taux-item ae-economie-taux-item--bad">
                        <div className="ae-economie-taux-label">Banque</div>
                        <div className="ae-economie-taux-val">{e.tauxBanque}/an</div>
                      </div>
                      <div className="ae-economie-taux-arrow">→</div>
                      <div className="ae-economie-taux-item ae-economie-taux-item--good">
                        <div className="ae-economie-taux-label">Orizia</div>
                        <div className="ae-economie-taux-val" style={{ color: e.couleur }}>{e.tauxCourt}/an</div>
                      </div>
                    </div>
                    <div className="ae-economie-gain" style={{ color: e.couleur, borderTopColor: `${e.couleur}20` }}>
                      <span className="ae-economie-gain-label">Économie totale</span>
                      <span className="ae-economie-gain-val">{e.economie}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* -- LOI LEMOINE QUIZ -- */}
        <section id="section-lemoine" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head" style={{ marginBottom: 32 }}>
              <span className="fin-badge" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}>
                ✅ Êtes-vous éligible ?
              </span>
              <h2>Vérifiez votre éligibilité<br />à la loi Lemoine en 3 questions</h2>
              <p>Répondez à 3 questions pour savoir si vous pouvez changer d'assurance sans questionnaire médical.</p>
            </div>
            <LemoineQuiz />
          </div>
        </section>

        {/* -- LOI LEMOINE DÉTAIL -- */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="ae-lemoine-banner">
              <Image
                src="/images/loi-lemoine.webp"
                alt="Signature d'un nouveau contrat d'assurance emprunteur grâce à la loi Lemoine"
                title="Changer d'assurance de prêt avec la Loi Lemoine"
                width={2814}
                height={1247}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                sizes="(max-width: 768px) 100vw, 60vw"
                loading="lazy"
              />
            </div>

            <div className="ae-lemoine-layout">
              <div className="ae-lemoine-text">
                <span className="fin-badge ae-lemoine-text-badge">✅ La loi est de votre côté</span>
                <h2>La loi Lemoine : l'outil ultime<br />pour reprendre le pouvoir</h2>
                <p>
                  Oubliez les anciennes règles restrictives. Aujourd'hui, changer d'assurance de
                  prêt n'a jamais été aussi simple et rapide.
                </p>
                <p>
                  Peu importe quand vous avez signé votre crédit immobilier, la loi s'applique.{' '}
                  <strong>La banque n'a plus le droit de vous retenir.</strong>
                </p>
                <ContactPopup label="⚖️ Faire valoir mes droits" className="fin-btn-primary" />
              </div>

              <div className="ae-lemoine-card">
                <div className="ae-lemoine-card-title">Ce qui a changé pour vous</div>
                <div className="ae-lemoine-points-list">
                  {LOI_LEMOINE_POINTS.map(pt => (
                    <div key={pt.title} className="ae-lemoine-point-item">
                      <div className="ae-lemoine-point-icon">{pt.icon}</div>
                      <div className="ae-lemoine-point-text">
                        <strong>{pt.title}</strong>
                        <span>{pt.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -- GARANTIES -- */}
        <section id="section-garanties" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="ae-garanties-head">
              <span className="fin-badge">Les garanties</span>
              <h2>Moins cher, oui.<br />Mais aussi bien couvert ? Mieux.</h2>
              <p>
                Je ne sacrifie jamais votre protection pour afficher un prix bas. Mon rôle est
                d'analyser les exigences strictes de votre banque, et de vous trouver le contrat
                qui matche à 100%.
              </p>
            </div>

            <div className="ae-garanties-flex">
              {GARANTIES.map(g => (
                <div
                  key={g.code}
                  className={`ae-garantie-flex-card ${g.obligatoire ? 'ae-garantie-flex-card--base' : 'ae-garantie-flex-card--option'}`}
                >
                  <div className="ae-garantie-flex-header">
                    <span className="ae-garantie-flex-icon">{g.icon}</span>
                    <div>
                      <div className="ae-garantie-flex-code">{g.code}</div>
                      <div className="ae-garantie-flex-label">{g.label}</div>
                    </div>
                    <span className={`ae-garantie-flex-badge ${g.obligatoire ? 'ae-garantie-flex-badge--base' : 'ae-garantie-flex-badge--option'}`}>
                      {g.obligatoire ? 'Base' : 'Option'}
                    </span>
                  </div>
                  <p className="ae-garantie-flex-desc">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -- ACCOMPAGNEMENT -- */}
        <section id="section-accompagnement" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Mon engagement : le "zéro friction"</span>
              <h2>Détendez-vous,<br />j'affronte la banque à votre place</h2>
              <p>
                Changer d'assurance fait peur car la banque aime faire traîner les choses. Mon job ?
                Mettre la pression juridique pour que ça aille vite.
              </p>
            </div>

            <div className="ae-accompagnement-layout">
              <div className="ae-accompagnement-etapes">
                {ETAPES.map(e => (
                  <div key={e.n} className="ae-etape-row">
                    <div className="fin-etape-num" style={{ flexShrink: 0 }}>{e.n}</div>
                    <div>
                      <h3>{e.title}</h3>
                      <p>{e.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ae-accompagnement-image">
                <Image
                  src="/images/dossier_assurance_emprunteur.webp"
                  alt="Courtière Orizia Courtage gérant un dossier de délégation d'assurance"
                  title="Un accompagnement de A à Z"
                  width={863}
                  height={1080}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="av-gratuit-bloc" style={{ marginTop: '40px' }}>
              <div className="av-gratuit-icon">🤝</div>
              <div>
                <strong>Et le plus beau : c'est sans frais de dossier pour vous.</strong>
                <p>
                  Je suis rémunérée par la compagnie d'assurance partenaire, de manière totalement
                  transparente. Vous profitez d'une experte dédiée pour affronter votre banque, sans
                  débourser un centime d'honoraires de courtage.
                </p>
              </div>
              <ContactPopup label="🚀 On lance la machine ?" className="fin-btn-primary" style={{ flexShrink: 0 }} />
            </div>
          </div>
        </section>

        {/* -- OBJECTIONS -- */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Cassons les mythes</span>
              <h2>Ce que votre banquier<br />va essayer de vous faire croire</h2>
            </div>
            <div className="crowd-faq-list">
              {OBJECTIONS.map((o, i) => (
                <details key={i} className="crowd-faq-item">
                  <summary>{o.q}</summary>
                  <p>{o.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* -- AUTO-ÉVALUATION -- */}
        <section id="section-autoevaluation" className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <EmprunteurChecklist />
          </div>
        </section>

        {/* -- FAQ -- */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions, mes réponses cash</h2>
              <p>On démystifie l'assurance de prêt ensemble.</p>
            </div>
            <div className="crowd-faq-list">
              {faqSchema.mainEntity.map((f, i) => (
                <details key={i} className="crowd-faq-item" style={{ borderColor: 'var(--orizia-gold)' }}>
                  <summary>{f.name}</summary>
                  <p>{f.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Vous avez une question spécifique à votre situation ? Je vous réponds sous 24h.
              </p>
              <ContactPopup label="📞 Poser une autre question à Cindy" className="fin-btn-secondary" />
            </div>
          </div>
        </section>

        {/* -- MAILLAGE INTERNE -- */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Pendant qu'on y est</span>
              <h2>Optimisez tout votre<br />budget immobilier</h2>
            </div>
            <div className="fin-cards fin-cards--white">
              {[
                { href: '/assurer/assurance-habitation', icon: '🏠', title: 'Assurance Habitation', sub: 'Protéger votre cocon', text: "Votre prêt est protégé, mais qu'en est-il de vos murs ? Confiez-moi votre MRH, je m'assure que votre maison est vraiment couverte.", badge: '🏠 Obligatoire avant la remise des clés', pillBg: 'rgba(217,119,6,0.08)', pillColor: '#d97706', pillBorder: 'rgba(217,119,6,0.2)', featured: false },
                { href: '/assurer/auto-moto', icon: '🚗', title: 'Assurance Auto & Moto', sub: 'Couper dans les frais', text: "Comme pour la maison, l'auto augmente. Confiez-moi vos contrats, je fais un tir groupé pour négocier les meilleurs tarifs.", badge: '✅ Résiliation gérée pour vous', pillBg: 'rgba(124,58,237,0.08)', pillColor: '#7c3aed', pillBorder: 'rgba(124,58,237,0.2)', featured: false },
                { href: '/investir/per', icon: '🏖️', title: 'Plan Épargne Retraite', sub: 'Réinvestir vos gains', text: "Vous venez d'économiser 10 000€ sur votre crédit ? Placez cette économie mensuelle sur un PER pour réduire vos impôts intelligemment.", badge: '💡 Réduisez vos impôts dès cette année', pillBg: 'rgba(201,169,110,0.12)', pillColor: 'var(--orizia-gold)', pillBorder: 'rgba(201,169,110,0.3)', featured: true },
              ].map(s => (
                <Link href={s.href} key={s.title} className={`fin-card${s.featured ? ' fin-card--featured' : ''}`}>
                  {s.badge && (
                    <span className="fin-card-pill" style={{ background: s.pillBg, color: s.pillColor, border: `1px solid ${s.pillBorder}` }}>
                      {s.badge}
                    </span>
                  )}
                  <div className="fin-card-icon">{s.icon}</div>
                  <div className="fin-card-sub">{s.sub}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="fin-card-link">Découvrir ?</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* -- CTA FINAL -- */}
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-white)' }}>
          <div className="fin-cta-inner">
            <h2>Ne laissez plus la banque<br />décider pour vous</h2>
            <p>
              Je calcule votre économie potentielle, je trouve le contrat qui matche
              parfaitement avec les exigences de votre banque, et je prends le relais sur toute la
              partie administrative.
            </p>
            <div className="ae-hero-btns">
              <ContactPopup label="📞 Contactez-moi" className="fin-btn-primary" />
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 540, margin: '24px auto 0' }}>
              *Les économies potentielles sont données à titre indicatif et dépendent de votre
              capital restant dû, de la durée de votre prêt et de votre profil. Je suis
              immatriculée à l'ORIAS, indépendante, et je défends vos intérêts face aux
              établissements bancaires.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}