// Partage des pages du site (WhatsApp, Facebook, LinkedIn, Google) : titres, descriptions et image de marque.
// Un seul endroit pour toutes les pages, relu pour la conformité (courtage en crédit et en assurance) :
// aucune promesse de taux, d'économie ou de rendement, pas de « courtier indépendant » (sens légal précis),
// et rappel des risques sur les pages de placement.
import { BASE_URL } from '@/lib/articles.mjs';

const RISK_INVEST = 'Placement présentant un risque de perte en capital. Rendement non garanti.';

export const SHARE_PAGES = {
  accueil: {
    path: '/',
    eyebrow: 'Orizia Courtage',
    heading: 'Crédit, assurance et placements, avec une seule interlocutrice.',
    title: 'Orizia Courtage | Courtier crédit et assurance à Marcq-en-Barœul',
    description: 'Cindy Urbansky, courtière en crédit et en assurance à Marcq-en-Barœul : crédit immobilier, assurance emprunteur, regroupement de crédits, épargne. Premier échange sans engagement.',
    shareTitle: 'Orizia Courtage, courtier en crédit et en assurance',
    shareDescription: 'Crédit immobilier, assurance emprunteur, épargne : Cindy Urbansky vous accompagne de la première question jusqu’à la signature. Marcq-en-Barœul, Hauts-de-France.',
  },
  'qui-suis-je': {
    path: '/qui-suis-je',
    eyebrow: 'Qui suis-je',
    heading: 'Cindy Urbansky, fondatrice d’Orizia Courtage.',
    title: 'Cindy Urbansky, courtière en crédit et assurance | Orizia Courtage',
    description: 'Cindy Urbansky, fondatrice d’Orizia Courtage : 20 ans d’expérience en crédit, assurance et patrimoine, présidente du conseil de surveillance de l’AFIB. Marcq-en-Barœul.',
    shareTitle: 'Cindy Urbansky, fondatrice d’Orizia Courtage',
    shareDescription: '20 ans d’expérience en crédit, assurance et patrimoine. Présidente du conseil de surveillance de l’AFIB. Basée à Marcq-en-Barœul.',
  },
  contact: {
    path: '/contact',
    eyebrow: 'Contact',
    heading: 'Parlons de votre projet.',
    title: 'Contacter Orizia Courtage | Rendez-vous avec Cindy Urbansky',
    description: 'Contactez Cindy Urbansky, courtière en crédit et en assurance à Marcq-en-Barœul : rendez-vous sans engagement, au cabinet, par téléphone ou en visio. Réponse sous 24 h.',
    shareTitle: 'Contacter Cindy Urbansky, Orizia Courtage',
    shareDescription: 'Rendez-vous sans engagement, au cabinet, par téléphone ou en visio. Réponse sous 24 h.',
  },
  parrainage: {
    path: '/parrainage',
    eyebrow: 'Parrainage',
    heading: 'Recommandez Orizia Courtage à un proche.',
    title: 'Programme de parrainage | Orizia Courtage',
    description: 'Recommandez Orizia Courtage à un proche qui a un projet de crédit ou d’assurance. Une récompense en chèques cadeaux est prévue une fois son dossier finalisé, selon les conditions du programme.',
    shareTitle: 'Le programme de parrainage d’Orizia Courtage',
    shareDescription: 'Vous connaissez quelqu’un qui a un projet ? Recommandez-le. Récompense en chèques cadeaux une fois son dossier finalisé, selon les conditions du programme.',
  },
  lexique: {
    path: '/lexique',
    eyebrow: 'Lexique',
    heading: 'Les mots du crédit et de l’assurance, expliqués simplement.',
    title: 'Lexique du crédit et de l’assurance | Orizia Courtage',
    description: 'TAEG, taux d’endettement, délégation d’assurance, soulte, loi Lemoine, SCPI, PER : les termes du crédit et de l’assurance expliqués simplement par Cindy Urbansky.',
    shareTitle: 'Lexique du crédit et de l’assurance',
    shareDescription: 'TAEG, taux d’endettement, délégation d’assurance, soulte, loi Lemoine… expliqués simplement par Cindy Urbansky.',
  },
  blog: {
    path: '/blog',
    eyebrow: 'Le blog',
    heading: 'Des guides clairs pour vos projets de crédit, d’assurance et d’épargne.',
    title: 'Blog : guides crédit, assurance et épargne | Orizia Courtage',
    description: 'Guides pratiques sur le crédit immobilier, l’assurance emprunteur et l’épargne, écrits par Cindy Urbansky, courtière en crédit et en assurance à Marcq-en-Barœul.',
    shareTitle: 'Le blog d’Orizia Courtage',
    shareDescription: 'Guides pratiques sur le crédit immobilier, l’assurance emprunteur et l’épargne, écrits par Cindy Urbansky.',
  },
  actualites: {
    path: '/actualites',
    eyebrow: 'Actualités',
    heading: 'L’actualité du crédit, de l’assurance et de l’épargne, décryptée.',
    title: 'Actualités crédit, assurance et épargne | Orizia Courtage',
    description: 'Taux, réglementation, assurance emprunteur, épargne : l’actualité qui compte pour vos projets, décryptée par Cindy Urbansky, courtière en crédit et en assurance.',
    shareTitle: 'Les actualités d’Orizia Courtage',
    shareDescription: 'Taux, réglementation, assurance emprunteur, épargne : l’actualité qui compte pour vos projets, décryptée par Cindy Urbansky.',
  },
  financer: {
    path: '/financer',
    eyebrow: 'Financer',
    heading: 'Financer votre projet, avec une courtière à vos côtés.',
    title: 'Courtier en crédit : immobilier, regroupement, prêt | Orizia',
    description: 'Crédit immobilier, regroupement de crédits, prêt personnel, rachat de soulte : Cindy Urbansky étudie votre projet et présente votre dossier à ses partenaires bancaires. Étude sans engagement.',
    shareTitle: 'Financer votre projet avec Orizia Courtage',
    shareDescription: 'Crédit immobilier, regroupement de crédits, prêt personnel, rachat de soulte : une étude de votre projet, sans engagement.',
    credit: true,
  },
  'credit-immobilier': {
    path: '/financer/credit-immobilier',
    eyebrow: 'Financer',
    heading: 'Crédit immobilier : de la simulation à la signature.',
    title: 'Crédit immobilier : courtier à Marcq-en-Barœul | Orizia Courtage',
    description: 'Achat, construction, investissement locatif : Cindy Urbansky étudie votre projet, présente votre dossier à ses partenaires bancaires et vous accompagne jusqu’à la signature. Étude sans engagement.',
    shareTitle: 'Votre crédit immobilier avec Orizia Courtage',
    shareDescription: 'Achat, construction ou investissement locatif : une étude de votre projet et un accompagnement jusqu’à la signature.',
    credit: true,
  },
  'regroupement-credits': {
    path: '/financer/regroupement-credits',
    eyebrow: 'Financer',
    heading: 'Regroupement de crédits : faire le point sur vos mensualités.',
    title: 'Regroupement de crédits : étude de votre situation | Orizia Courtage',
    description: 'Regrouper vos crédits en un seul peut réduire la mensualité, en contrepartie possible d’une durée plus longue et d’un coût total plus élevé. Cindy Urbansky étudie votre situation.',
    shareTitle: 'Regroupement de crédits : étude de votre situation',
    shareDescription: 'Une mensualité plus basse, au prix possible d’une durée plus longue et d’un coût total plus élevé : Cindy Urbansky étudie si c’est adapté à votre situation.',
    credit: true,
  },
  'pret-personnel': {
    path: '/financer/pret-personnel',
    eyebrow: 'Financer',
    heading: 'Prêt personnel : financer un projet, en connaissance de cause.',
    title: 'Prêt personnel : auto, travaux, projets | Orizia Courtage',
    description: 'Auto, travaux, projet personnel : Cindy Urbansky étudie votre besoin et présente votre demande à ses partenaires. Délai de rétractation de 14 jours. Étude sans engagement.',
    shareTitle: 'Votre prêt personnel avec Orizia Courtage',
    shareDescription: 'Auto, travaux, projet personnel : une étude de votre besoin et de votre capacité de remboursement, sans engagement.',
    credit: true,
  },
  'rachat-soulte': {
    path: '/financer/rachat-soulte',
    eyebrow: 'Financer',
    heading: 'Rachat de soulte : garder le bien après une séparation ou une succession.',
    title: 'Rachat de soulte : financer le rachat de part | Orizia Courtage',
    description: 'Séparation, divorce, succession : Cindy Urbansky étudie le financement du rachat de la part de votre co-indivisaire pour conserver le bien. Étude de faisabilité sans engagement.',
    shareTitle: 'Rachat de soulte : étude de faisabilité',
    shareDescription: 'Séparation, divorce ou succession : une étude du financement pour racheter la part de votre co-indivisaire.',
    credit: true,
  },
  assurer: {
    path: '/assurer',
    eyebrow: 'Assurer',
    heading: 'Assurer ce qui compte, avec des garanties bien choisies.',
    title: 'Assurances : emprunteur, habitation, auto et moto | Orizia Courtage',
    description: 'Assurance emprunteur, habitation, auto et moto : Cindy Urbansky compare les offres de ses partenaires assureurs et vérifie les garanties, exclusions et franchises avec vous.',
    shareTitle: 'Vos assurances avec Orizia Courtage',
    shareDescription: 'Assurance emprunteur, habitation, auto et moto : une comparaison des offres et une lecture attentive des garanties, exclusions et franchises.',
  },
  'assurance-emprunteur': {
    path: '/assurer/assurance-emprunteur',
    eyebrow: 'Assurer',
    heading: 'Assurance emprunteur : changer de contrat avec la loi Lemoine.',
    title: 'Assurance emprunteur et loi Lemoine | Orizia Courtage',
    description: 'La loi Lemoine permet de changer d’assurance de prêt à tout moment, à garanties équivalentes. Cindy Urbansky compare les offres et s’occupe des démarches auprès de votre banque.',
    shareTitle: 'Assurance emprunteur : changer avec la loi Lemoine',
    shareDescription: 'Changer d’assurance de prêt à tout moment, à garanties équivalentes : une comparaison des offres et les démarches prises en charge.',
  },
  'assurance-habitation': {
    path: '/assurer/assurance-habitation',
    eyebrow: 'Assurer',
    heading: 'Assurance habitation : des garanties adaptées à votre logement.',
    title: 'Assurance habitation : comparer ses garanties | Orizia Courtage',
    description: 'Locataire ou propriétaire : Cindy Urbansky compare les offres d’assurance habitation, ajuste vos garanties et vous accompagne pour la résiliation de votre ancien contrat.',
    shareTitle: 'Assurance habitation avec Orizia Courtage',
    shareDescription: 'Une comparaison des offres, des garanties ajustées à votre logement et un accompagnement pour la résiliation de votre ancien contrat.',
  },
  'auto-moto': {
    path: '/assurer/auto-moto',
    eyebrow: 'Assurer',
    heading: 'Assurance auto et moto : comparer avant de signer.',
    title: 'Assurance auto et moto : comparer les offres | Orizia Courtage',
    description: 'Cindy Urbansky compare les offres d’assurance auto et moto de ses partenaires, vérifie garanties et franchises, et vous accompagne pour la résiliation de votre ancien contrat.',
    shareTitle: 'Assurance auto et moto avec Orizia Courtage',
    shareDescription: 'Une comparaison des offres, des garanties et franchises vérifiées, et un accompagnement pour la résiliation.',
  },
  investir: {
    path: '/investir',
    eyebrow: 'Investir',
    heading: 'Comprendre les placements avant de se lancer.',
    title: 'Investir : assurance vie, PER, SCPI, crowdfunding | Orizia Courtage',
    description: 'Assurance vie, PER, SCPI, crowdfunding : fonctionnement, risques et fiscalité expliqués par Cindy Urbansky. Tout placement comporte un risque de perte en capital.',
    shareTitle: 'Investir : comprendre les placements',
    shareDescription: 'Assurance vie, PER, SCPI, crowdfunding : fonctionnement, risques et fiscalité. Tout placement comporte un risque de perte en capital.',
    notice: RISK_INVEST,
  },
  'assurance-vie': {
    path: '/investir/assurance-vie',
    eyebrow: 'Investir',
    heading: 'Assurance vie : fonctionnement, supports et transmission.',
    title: 'Assurance vie : fonctionnement et fiscalité | Orizia Courtage',
    description: 'Fonds euros, unités de compte, transmission : comment fonctionne l’assurance vie. Les unités de compte présentent un risque de perte en capital. Information générale.',
    shareTitle: 'Assurance vie : comprendre avant de souscrire',
    shareDescription: 'Fonds euros, unités de compte, transmission. Les unités de compte présentent un risque de perte en capital.',
    notice: 'Unités de compte : risque de perte en capital. Rendement non garanti.',
  },
  per: {
    path: '/investir/per',
    eyebrow: 'Investir',
    heading: 'Plan d’épargne retraite : fonctionnement et fiscalité.',
    title: 'PER : fonctionnement, fiscalité et sortie | Orizia Courtage',
    description: 'Versements, déduction fiscale dans certaines limites, sortie à la retraite : comment fonctionne le PER. L’avantage dépend de votre tranche d’imposition et la sortie est fiscalisée.',
    shareTitle: 'Le plan d’épargne retraite expliqué',
    shareDescription: 'Versements, déduction dans certaines limites, sortie à la retraite. L’avantage fiscal dépend de votre tranche d’imposition ; la sortie est fiscalisée.',
    notice: 'Épargne bloquée jusqu’à la retraite, sauf cas prévus par la loi. Risque de perte en capital selon les supports.',
  },
  scpi: {
    path: '/investir/scpi',
    eyebrow: 'Investir',
    heading: 'SCPI : comprendre la pierre-papier avant d’investir.',
    title: 'SCPI : fonctionnement, risques et fiscalité | Orizia Courtage',
    description: 'Comment fonctionnent les SCPI : revenus non garantis, risque de perte en capital, liquidité limitée, durée recommandée de 8 à 10 ans. Information générale.',
    shareTitle: 'SCPI : comprendre avant d’investir',
    shareDescription: 'Fonctionnement, risques et fiscalité. Revenus non garantis, risque de perte en capital, liquidité limitée.',
    notice: 'Risque de perte en capital et de liquidité. Revenus non garantis. Les performances passées ne préjugent pas des performances futures.',
  },
  crowdfunding: {
    path: '/investir/crowdfunding',
    eyebrow: 'Investir',
    heading: 'Crowdfunding immobilier : fonctionnement et risques.',
    title: 'Crowdfunding immobilier : fonctionnement et risques | Orizia Courtage',
    description: 'Comment fonctionne le crowdfunding immobilier : plateformes agréées, durée, risque de retard et de perte totale. N’y placez qu’une petite part de votre épargne. Information générale.',
    shareTitle: 'Crowdfunding immobilier : comprendre les risques',
    shareDescription: 'Plateformes agréées, durée, risque de retard et de perte totale du capital. Information générale.',
    notice: 'Risque de perte totale du capital et d’illiquidité. Rendement non garanti.',
  },
};

// Pages sans image propre (mentions légales, confidentialité, liens de parrainage…).
export const DEFAULT_SHARE = 'accueil';

export const shareImageUrl = (key) => `${BASE_URL}/og/page/${key}.jpg`;

/**
 * Pages sans visuel propre (mentions légales, confidentialité, honoraires) : titre, description, adresse canonique
 * et aperçu de partage à leur nom (sans cela, le partage affiche le titre et l'adresse de l'accueil).
 */
export function plainMetadata({ path, title, description }) {
  const url = `${BASE_URL}${path}`;
  const image = { url: shareImageUrl(DEFAULT_SHARE), width: 1200, height: 630, alt: 'Orizia Courtage, courtier en crédit et en assurance' };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { type: 'website', title, description, url, siteName: 'Orizia Courtage', locale: 'fr_FR', images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}

/** Titre, description, Open Graph et Twitter d'une page du site. */
export function shareMetadata(key) {
  const page = SHARE_PAGES[key];
  const url = `${BASE_URL}${page.path === '/' ? '' : page.path}`;
  const image = { url: shareImageUrl(key), width: 1200, height: 630, alt: `${page.shareTitle} — Orizia Courtage` };
  return {
    title: { absolute: page.title },
    description: page.description,
    openGraph: {
      type: 'website',
      title: page.shareTitle,
      description: page.shareDescription,
      url,
      siteName: 'Orizia Courtage',
      locale: 'fr_FR',
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: page.shareTitle, description: page.shareDescription, images: [image.url] },
  };
}
