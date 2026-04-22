import Link from 'next/link';
import ContactPopup from '@/components/ContactPopup';
import LexiqueGrid from '@/components/LexiqueGrid';

export const metadata = {
  title: "Lexique Crédit & Assurance : 50+ Termes | Orizia Courtage",
  description:
    "TAEG, taux d'endettement, délégation d'assurance, SCPI, PER, loi Lemoine… 50+ termes du crédit et de l'assurance expliqués par Cindy Urbansky.",
  alternates: { canonical: 'https://www.orizia-courtage.fr/lexique' },
  openGraph: {
    title: "Lexique du Crédit & de l'Assurance | Orizia Courtage",
    description: "50+ termes financiers expliqués simplement : TAEG, soulte, délégation d'assurance, SCPI, PER, loi Lemoine et bien plus.",
    url: 'https://www.orizia-courtage.fr/lexique',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://www.orizia-courtage.fr/images/og-lexique.webp',
        width: 1200,
        height: 630,
        alt: 'Lexique crédit et assurance — Orizia Courtage',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lexique Crédit & Assurance : 50+ Termes | Orizia Courtage",
    description: "TAEG, taux d'endettement, délégation d'assurance, SCPI, PER, loi Lemoine… 50+ termes du crédit et de l'assurance expliqués par Cindy Urbansky.",
    images: ['https://www.orizia-courtage.fr/images/og-lexique.webp'],
  },
};

const lexiqueSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Lexique Orizia Courtage',
  description: "Glossaire complet des termes du crédit immobilier, de l'assurance et des placements financiers.",
  url: 'https://www.orizia-courtage.fr/lexique',
  author: {
    '@type': 'Person',
    name: 'Cindy Urbansky',
    jobTitle: 'Courtier indépendant',
    url: 'https://www.orizia-courtage.fr/qui-suis-je',
  },
};

const CATEGORIES = [
  {
    id: 'credit',
    label: '🏠 Crédit & Financement',
    color: 'var(--orizia-primary)',
    bg: 'rgba(45,106,95,0.04)',
    termes: [
      { terme: 'TAEG', def: "Taux Annuel Effectif Global. Le seul indicateur fiable pour comparer deux crédits : il inclut le taux nominal, les frais de dossier et les assurances obligatoires. C'est ce chiffre que je négocie à la baisse pour vous — pas seulement le taux affiché." },
      { terme: "Taux d'endettement", def: "Rapport entre vos charges mensuelles (crédits + loyer) et vos revenus nets. La limite légale est de 35 %. Au-delà, les banques refusent généralement tout nouveau crédit. Le regroupement de crédits permet de le faire baisser rapidement." },
      { terme: "Capacité d'emprunt", def: "Montant maximum que vous pouvez emprunter en respectant le taux d'endettement de 35 %. Elle dépend de vos revenus, de vos charges existantes, de la durée du prêt et du taux négocié. Je la calcule précisément lors du premier échange." },
      { terme: 'Apport personnel', def: "Somme que vous investissez de votre poche dans un achat immobilier. Les banques demandent généralement 10 % du prix pour couvrir les frais de notaire. Un apport plus élevé améliore les conditions du prêt et rassure les banques." },
      { terme: 'Prêt à Taux Zéro (PTZ)', def: "Prêt sans intérêts accordé aux primo-accédants sous conditions de ressources et de zone géographique. Il peut financer jusqu'à 40 % de l'achat. Beaucoup de primo-accédants passent à côté faute de l'avoir demandé — je vérifie systématiquement votre éligibilité." },
      { terme: 'Primo-accédant', def: "Personne qui achète sa résidence principale pour la première fois (ou qui n'a pas été propriétaire de sa résidence principale au cours des 2 dernières années). Ce statut ouvre droit à des aides spécifiques comme le PTZ." },
      { terme: 'Prêt relais', def: "Crédit court terme permettant d'acheter un nouveau bien avant d'avoir vendu l'ancien. Il avance une partie de la valeur du bien à vendre pour financer la transition sans stress de trésorerie. Je structure la transition pour éviter tout décalage." },
      { terme: 'Indemnités de Remboursement Anticipé (IRA)', def: "Pénalités dues à la banque si vous remboursez votre crédit avant son terme. Plafonnées légalement à 6 mois d'intérêts ou 3 % du capital restant dû. Je les négocie à la baisse ou à zéro lors du montage du dossier." },
      { terme: 'Offre de prêt', def: "Document officiel émis par la banque formalisant les conditions définitives du crédit. Vous disposez d'un délai légal de réflexion de 10 jours avant de pouvoir l'accepter. Je vous explique chaque ligne avant signature." },
      { terme: 'Regroupement de crédits', def: "Opération consistant à réunir plusieurs emprunts en cours en un seul crédit avec une mensualité réduite. La baisse peut aller de 30 à 60 %, en contrepartie d'un allongement de la durée totale de remboursement." },
      { terme: 'Rachat de soulte', def: "Opération par laquelle un co-propriétaire rachète la part de l'autre pour devenir seul propriétaire. Elle intervient lors d'un divorce, d'une séparation ou d'une succession. Je monte le financement et coordonne avec votre notaire." },
      { terme: 'Soulte', def: "Somme versée à un co-propriétaire en contrepartie de sa part dans un bien immobilier. Exemple : bien à 300 000 €, capital restant dû 100 000 € → valeur nette 200 000 € → soulte = 100 000 € pour une détention à 50/50." },
      { terme: 'Droits de partage', def: "Taxe de 2,5 % due au notaire lors d'un rachat de soulte, calculée sur la valeur nette du bien. Elle est incontournable et doit être intégrée dans le plan de financement dès le départ." },
      { terme: 'Crédit affecté', def: "Crédit lié à un achat précis (voiture, travaux…). Si la vente est annulée, le crédit l'est aussi. Ses taux sont souvent plus bas que le prêt personnel non affecté car le risque est mieux encadré." },
      { terme: 'Crédit renouvelable (revolving)', def: "Réserve d'argent disponible en permanence avec des taux pouvant frôler l'usure (jusqu'à 21 %). À éviter absolument : je vous oriente toujours vers un prêt amortissable classique avec une date de fin précise." },
      { terme: 'FICP', def: "Fichier des Incidents de remboursement des Crédits aux Particuliers. Un fichage FICP bloque la quasi-totalité des demandes de crédit. Il est géré par la Banque de France et dure 5 à 7 ans selon le type d'incident." },
      { terme: 'FCC', def: "Fichier Central des Chèques. Recense les incidents de paiement par chèque. Comme le FICP, il peut bloquer l'accès au crédit et dure 5 ans." },
      { terme: 'Courtier en crédit (COBSP)', def: "Intermédiaire en Opérations de Banque et Services de Paiement. Il compare les offres de plusieurs banques pour obtenir les meilleures conditions pour son client. Sa rémunération est prise en charge par la banque partenaire — sans frais de dossier pour vous." },
      { terme: 'Attestation de faisabilité', def: "Document délivré par le courtier attestant que votre dossier est finançable. Il rassure les vendeurs lors d'une offre d'achat et vous permet de visiter sereinement avec une enveloppe précise." },
    ],
  },
  {
    id: 'assurance',
    label: '🛡️ Assurance',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.04)',
    termes: [
      { terme: 'Assurance emprunteur', def: "Contrat obligatoire lié à un crédit immobilier qui rembourse les mensualités en cas de décès, invalidité ou arrêt de travail. Elle représente jusqu'à 40 % du coût total du crédit. Grâce à la loi Lemoine, vous pouvez en changer à tout moment." },
      { terme: "Délégation d'assurance", def: "Droit de choisir un assureur externe à la banque pour votre assurance emprunteur. Le contrat doit offrir des garanties équivalentes à celles exigées par la banque. C'est le principal levier d'économie sur un crédit immobilier — souvent 50 % moins cher." },
      { terme: 'Équivalence des garanties', def: "Principe légal selon lequel la banque doit accepter tout contrat d'assurance externe couvrant les mêmes risques que son contrat groupe. Elle dispose de 10 jours pour accepter ou refuser. Si elle résiste, je monte au créneau pour vous." },
      { terme: 'Loi Lemoine', def: "Loi de 2022 permettant de changer d'assurance emprunteur à tout moment, sans attendre la date anniversaire. Elle supprime aussi le questionnaire de santé pour les prêts < 200 000 € par personne remboursés avant 60 ans." },
      { terme: 'Questionnaire de santé', def: "Document demandé par les assureurs pour évaluer le risque médical d'un emprunteur. Depuis la loi Lemoine, il est supprimé sous certaines conditions (capital < 200 000 € par personne, fin du prêt avant 60 ans)." },
      { terme: "Droit à l'oubli", def: "Dispositif permettant aux anciens malades de ne pas déclarer certaines pathologies passées lors d'une demande d'assurance. Depuis la loi Lemoine, le délai est réduit à 5 ans pour les cancers et l'hépatite C." },
      { terme: 'DC / PTIA', def: "Décès et Perte Totale et Irréversible d'Autonomie. Garanties de base exigées par toutes les banques. Elles remboursent le capital restant dû en cas de décès ou d'invalidité totale." },
      { terme: 'IPT / IPP', def: "Invalidité Permanente Totale / Partielle. Garanties couvrant une réduction permanente de la capacité à travailler suite à une maladie ou un accident. L'IPP couvre les invalidités partielles (à partir de 33 % généralement)." },
      { terme: 'ITT', def: "Incapacité Temporaire de Travail. L'assureur prend en charge les mensualités du crédit pendant un arrêt maladie prolongé. Un délai de carence (souvent 90 jours) s'applique avant le déclenchement." },
      { terme: "Perte d'emploi (PE)", def: "Garantie optionnelle couvrant les mensualités en cas de chômage. Souvent chère avec beaucoup d'exclusions. Je vous aide à évaluer si elle vaut vraiment le coût dans votre situation." },
      { terme: 'Loi Hamon', def: "Loi permettant de résilier son assurance auto ou habitation à tout moment après 1 an de contrat, sans frais ni justification. Je me charge de la résiliation à votre place — zéro coupure de garantie." },
      { terme: 'MRH (Multirisque Habitation)', def: "Assurance habitation couvrant les risques liés au logement : incendie, dégâts des eaux, vol, responsabilité civile, catastrophes naturelles. Obligatoire pour les locataires, fortement recommandée pour tous les propriétaires." },
      { terme: 'PNO (Propriétaire Non-Occupant)', def: "Assurance habitation pour les propriétaires qui louent leur bien. Elle couvre les murs et la responsabilité du bailleur, notamment entre deux locataires ou si le locataire est mal assuré. Souvent oubliée par les investisseurs." },
      { terme: 'Sous-assurance', def: "Situation où la valeur déclarée des biens est inférieure à leur valeur réelle. En cas de sinistre, l'indemnisation est réduite proportionnellement. Je vérifie systématiquement que votre contrat colle à la réalité." },
      { terme: 'Franchise', def: "Montant restant à votre charge en cas de sinistre, non remboursé par l'assureur. Une franchise élevée réduit la prime mais augmente votre exposition financière. À bien calibrer selon votre situation." },
      { terme: 'Bonus-malus', def: "Coefficient appliqué à la prime d'assurance auto selon votre historique de sinistres. Le bonus maximal est de 50 % (coefficient 0,50). Il est transférable d'un assureur à l'autre — c'est votre meilleur argument de négociation." },
      { terme: 'Contrat groupe bancaire', def: "Assurance emprunteur proposée par la banque lors de la signature du crédit. Pratique mais souvent 2 à 3 fois plus chère que les contrats individuels à garanties équivalentes. C'est la vache à lait des banques." },
      { terme: 'Taxe catastrophes naturelles', def: "Taxe obligatoire incluse dans les contrats d'assurance habitation, passant à 20 % en 2026. Elle finance le régime d'indemnisation des catastrophes naturelles (inondations, sécheresse, tempêtes)." },
    ],
  },
  {
    id: 'investissement',
    label: '💼 Investissement & Patrimoine',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.04)',
    termes: [
      { terme: 'SCPI', def: "Société Civile de Placement Immobilier. Fonds collectif qui achète et gère un portefeuille d'actifs immobiliers. Vous détenez des parts et percevez votre quote-part des loyers trimestriellement, sans aucune contrainte de gestion. Accessible dès 1 000 €." },
      { terme: 'Taux de distribution (SCPI)', def: "Rendement annuel brut d'une SCPI, exprimé en pourcentage de la valeur de la part. En 2026, il se situe entre 4 % et 6 % pour les meilleures SCPI. À distinguer du rendement net après fiscalité." },
      { terme: 'SCPI européennes', def: "SCPI investissant dans des actifs immobiliers hors de France (Allemagne, Pays-Bas, Irlande…). Elles bénéficient souvent de conventions fiscales bilatérales permettant d'éviter les prélèvements sociaux français (17,2 %). Avantage décisif pour les TMI 30 %+." },
      { terme: 'Nue-propriété (SCPI)', def: "Stratégie consistant à acheter des parts de SCPI à prix décoté (15 à 30 %) en cédant temporairement l'usufruit. Aucun revenu pendant 5 à 15 ans = zéro fiscalité. Idéal pour les TMI élevés qui n'ont pas besoin de revenus immédiats." },
      { terme: 'Démembrement de propriété', def: "Séparation entre la nue-propriété (droit de disposer du bien) et l'usufruit (droit d'en percevoir les revenus). Utilisé en SCPI pour optimiser la fiscalité selon votre profil." },
      { terme: 'PER (Plan Épargne Retraite)', def: "Produit d'épargne retraite créé par la loi PACTE (2019). Vos versements sont déductibles de votre revenu imposable, réduisant directement votre impôt l'année suivante. L'épargne est bloquée jusqu'à la retraite, sauf exceptions légales." },
      { terme: 'Plafond Madelin', def: "Plafond de déduction fiscale spécifique aux travailleurs non-salariés (TNS) pour le PER. Bien plus élevé que celui des salariés : jusqu'à ~85 000 €/an. Le levier fiscal le plus puissant disponible pour un indépendant." },
      { terme: 'Plafonds reportés (PER)', def: "Les plafonds de déduction non utilisés sont reportables sur 3 ans. Beaucoup d'épargnants l'ignorent et laissent filer des milliers d'euros de déduction. Ils figurent sur votre avis d'imposition, rubrique « Plafond épargne retraite »." },
      { terme: 'Assurance vie', def: "Enveloppe fiscale permettant d'investir sur des supports en euros (capital garanti) et/ou en unités de compte. Votre argent n'est pas bloqué. Après 8 ans, la fiscalité devient très avantageuse : abattement annuel + taux réduit à 7,5 %." },
      { terme: 'Fonds en euros', def: "Support d'assurance vie à capital garanti par l'assureur. Rendement moyen de 2,5 à 3,5 % brut en 2026. Sécurisé mais sous-performant l'inflation sur le long terme si utilisé seul." },
      { terme: 'Unités de compte (UC)', def: "Supports d'investissement en assurance vie ou PER exposés aux marchés financiers (actions, obligations, SCPI, ETF…). Potentiel de rendement plus élevé mais risque de perte en capital. À calibrer selon votre horizon." },
      { terme: 'Flat tax (PFU)', def: "Prélèvement Forfaitaire Unique de 30 % (12,8 % d'impôt + 17,2 % de prélèvements sociaux) applicable aux revenus de capitaux mobiliers, notamment les intérêts du crowdfunding immobilier." },
      { terme: "TMI (Taux Marginal d'Imposition)", def: "Taux d'imposition appliqué à la dernière tranche de vos revenus. En France : 0 %, 11 %, 30 %, 41 % ou 45 %. Il détermine l'avantage fiscal du PER et la stratégie SCPI optimale. Visible sur votre avis d'imposition." },
      { terme: 'Crowdfunding immobilier', def: "Financement participatif permettant de prêter de l'argent à un promoteur immobilier via une plateforme agréée AMF. Rendement de 8 à 12 %/an sur 12 à 36 mois. Capital bloqué jusqu'à l'échéance, risque de perte en capital." },
      { terme: 'PSFP', def: "Prestataire de Services de Financement Participatif. Statut européen encadrant les plateformes de crowdfunding depuis 2022. Je ne travaille qu'avec des plateformes agréées PSFP." },
      { terme: 'Clause bénéficiaire', def: "Désignation dans un contrat d'assurance vie de la ou des personnes qui recevront le capital en cas de décès. Une clause mal rédigée peut transformer votre meilleur outil de transmission en cauchemar successoral. Je la rédige sur-mesure." },
      { terme: 'Transmission hors succession', def: "Mécanisme de l'assurance vie permettant de transmettre jusqu'à 152 500 € par bénéficiaire sans droits de succession (pour les versements avant 70 ans). Le meilleur outil de transmission disponible en France." },
      { terme: 'Gestion pilotée', def: "Mode de gestion d'un PER ou d'une assurance vie où l'allocation est automatiquement ajustée selon votre horizon : exposition forte aux UC jeune, sécurisation progressive à l'approche de la retraite." },
      { terme: 'ETF (Exchange Traded Fund)', def: "Fonds indiciel coté en bourse qui réplique la performance d'un indice (CAC 40, S&P 500…). Frais très bas, diversification immédiate. Disponible dans les PER et assurances vie haut de gamme." },
      { terme: 'Effet de levier', def: "Utilisation du crédit pour investir davantage que son capital propre. En immobilier locatif, les loyers remboursent partiellement le crédit, amplifiant le rendement sur l'apport initial." },
    ],
  },
  {
    id: 'fiscal',
    label: '🧾 Fiscalité',
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.04)',
    termes: [
      { terme: 'Déficit foncier', def: "Mécanisme fiscal permettant de déduire les charges d'un bien locatif (travaux, intérêts d'emprunt) de son revenu global, réduisant ainsi l'impôt. Particulièrement intéressant pour les TMI 30 %+." },
      { terme: 'LMNP (Loueur Meublé Non Professionnel)', def: "Statut fiscal pour les propriétaires qui louent un bien meublé. Permet d'amortir le bien et le mobilier, réduisant significativement la base imposable des loyers perçus." },
      { terme: 'Prélèvements sociaux', def: "Cotisations de 17,2 % prélevées sur les revenus du patrimoine (loyers, intérêts, plus-values). Elles s'ajoutent à l'impôt sur le revenu. Les SCPI européennes permettent souvent de les éviter grâce aux conventions fiscales." },
      { terme: 'Abattement fiscal (assurance vie)', def: "Après 8 ans, les gains d'une assurance vie bénéficient d'un abattement annuel de 4 600 € (personne seule) ou 9 200 € (couple). Au-delà, le taux réduit de 7,5 % s'applique sur les gains." },
      { terme: 'PASS (Plafond Annuel de la Sécurité Sociale)', def: "Référence utilisée pour calculer les plafonds de déduction du PER. En 2026, 1 PASS ≈ 46 368 €. Le plafond salarié est de 10 % de 8 PASS ≈ 35 000 €." },
      { terme: 'Plus-value immobilière', def: "Gain réalisé lors de la vente d'un bien immobilier (prix de vente - prix d'achat). Elle est imposée à 19 % + 17,2 % de prélèvements sociaux, avec des abattements progressifs selon la durée de détention (exonération totale après 22 ans pour l'IR, 30 ans pour les PS)." },
      { terme: 'Revenus fonciers', def: "Revenus issus de la location de biens immobiliers non meublés. Ils s'ajoutent à votre revenu imposable et sont taxés à votre TMI + 17,2 % de prélèvements sociaux. La stratégie SCPI doit en tenir compte." },
    ],
  },
  {
    id: 'reglementation',
    label: '⚖️ Réglementation',
    color: '#0369a1',
    bg: 'rgba(3,105,161,0.04)',
    termes: [
      { terme: 'ORIAS', def: "Organisme pour le Registre des Intermédiaires en Assurance, banque et finance. Tout courtier doit y être immatriculé pour exercer légalement. Cindy Urbansky est immatriculée à l'ORIAS." },
      { terme: 'ACPR', def: "Autorité de Contrôle Prudentiel et de Résolution. Superviseur des banques et assurances en France, sous l'égide de la Banque de France. Elle contrôle les courtiers et intermédiaires financiers." },
      { terme: 'AMF', def: "Autorité des Marchés Financiers. Régulateur des marchés financiers français. Elle agrée les SCPI, les plateformes de crowdfunding (PSFP) et supervise les conseillers en investissement." },
      { terme: 'DDA (Directive Distribution Assurance)', def: "Réglementation européenne encadrant la distribution des produits d'assurance. Elle impose la transparence sur la rémunération des intermédiaires et l'adéquation des produits aux besoins du client." },
      { terme: 'IOBSP', def: "Intermédiaire en Opérations de Banque et Services de Paiement. Statut réglementé des courtiers en crédit, soumis à des obligations de formation, d'immatriculation et de transparence." },
      { terme: 'MOBSP', def: "Mandataire Non Exclusif en Opérations de Banque et Services de Paiement. Statut d'Orizia Courtage : intermédiaire indépendant pouvant travailler avec plusieurs banques partenaires sans exclusivité." },
      { terme: 'Loi PACTE', def: "Loi relative à la croissance et la transformation des entreprises (2019). Elle a créé le PER en unifiant les anciens produits d'épargne retraite (PERP, Madelin, PERCO) en une enveloppe unique et plus flexible." },
      { terme: 'Loi Lagarde', def: "Loi de 2010 interdisant aux banques de modifier le taux d'un crédit immobilier si l'emprunteur choisit une assurance externe. Elle protège le droit à la délégation d'assurance." },
      { terme: 'FGAP', def: "Fonds de Garantie des Assurances de Personnes. Couvre jusqu'à 70 000 € par assureur et par assuré en cas de faillite d'un assureur vie. Au-delà, je recommande de diversifier sur 2 assureurs." },
      { terme: 'RGPD', def: "Règlement Général sur la Protection des Données. Encadre la collecte et l'utilisation des données personnelles. Dans le cadre du parrainage, vous devez obtenir l'accord de votre filleul avant de transmettre ses coordonnées." },
      { terme: 'AFIB', def: "Association Française des Intermédiaires en Bancassurance. Organisation professionnelle représentant les courtiers et intermédiaires du secteur. Cindy Urbansky en est Présidente du conseil de surveillance." },
    ],
  },
];

export default function LexiquePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lexiqueSchema) }} />

      <main>
        {/* ── HERO ── */}
        <section className="fin-hero ae-hero" style={{ minHeight: 'auto', paddingBottom: 60 }}>
          <div className="ae-hero-inner fin-hero-inner">
            <nav aria-label="breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: 16 }}>
              <Link href="/" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Accueil</Link>
              {' › '}
              <span>Lexique</span>
            </nav>
            <span className="fin-badge">📖 Glossaire · 50+ termes</span>
            <h1 className="ae-hero-title">Lexique du crédit,<br />de l'assurance & des placements</h1>
            <p className="ae-hero-intro">
              Le jargon financier peut être opaque. Retrouvez ici tous les termes utilisés
              sur le site, expliqués simplement — pour que vous compreniez exactement
              ce que vous signez.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
              {CATEGORIES.map(c => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 100,
                    background: c.bg,
                    color: c.color,
                    border: `1px solid ${c.color}30`,
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATÉGORIES ── */}
        {CATEGORIES.map((cat, ci) => (
          <section
            key={cat.id}
            id={cat.id}
            className={`crowd-section ${ci % 2 === 0 ? 'crowd-section--white' : 'crowd-section--light'}`}
            style={{ scrollMarginTop: 80 }}
          >
            <div className="fin-section-inner">
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ color: cat.color, fontSize: '1.4rem', fontWeight: 900, margin: 0 }}>
                  {cat.label}
                </h2>
                <div style={{ height: 3, width: 48, background: cat.color, borderRadius: 2, marginTop: 10, opacity: 0.5 }} />
              </div>

              <LexiqueGrid termes={cat.termes} color={cat.color} />
            </div>
          </section>
        ))}

        {/* ── CTA ── */}
        <section className="fin-cta fin-cta--plain" style={{ background: 'var(--orizia-accent)' }}>
          <div className="fin-cta-inner">
            <h2 style={{ color: '#fff' }}>Un terme vous échappe encore ?</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>
              Je vous explique tout sans jargon, lors d'un premier échange sans engagement.
            </p>
            <div className="fin-hero-btns" style={{ justifyContent: 'center' }}>
              <ContactPopup label="📅 Poser une question à Cindy" className="fin-btn-primary" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
