/**
 * Base de données des articles de blog organisés en cocon sémantique
 * Structure : 3 silos (Investir, Financer, Assurer) avec articles niveau 2 et 3
 */

export const BLOG_ARTICLES = [
  // ═══════════════════════════════════════════════════════════
  // SILO 1 : INVESTIR (Patrimoine & Placements)
  // ═══════════════════════════════════════════════════════════
  
  // Niveau 2 : Articles piliers du silo Investir
  {
    slug: 'scpi-guide-complet-investissement-immobilier',
    title: 'SCPI : Le guide complet pour investir dans l\'immobilier sans contrainte',
    excerpt: 'Découvrez comment les SCPI permettent d\'investir dans l\'immobilier professionnel avec un ticket d\'entrée accessible et sans gestion locative.',
    silo: 'investir',
    level: 2,
    publishedDate: '2026-04-15',
    readTime: '8 min',
    image: '/images/dossier_scpi.webp',
    author: 'Cindy Urbansky',
    keywords: ['SCPI', 'investissement immobilier', 'pierre papier', 'rendement locatif'],
  },
  {
    slug: 'assurance-vie-optimiser-fiscalite-transmission',
    title: 'Assurance vie : Comment optimiser la fiscalité et la transmission',
    excerpt: 'L\'assurance vie reste le placement préféré des Français. Découvrez comment l\'utiliser pour réduire vos impôts et transmettre votre patrimoine.',
    silo: 'investir',
    level: 2,
    publishedDate: '2026-04-12',
    readTime: '10 min',
    image: '/images/dossier_assurance_vie.webp',
    author: 'Cindy Urbansky',
    keywords: ['assurance vie', 'fiscalité', 'transmission patrimoine', 'succession'],
  },
  {
    slug: 'per-preparer-retraite-avantages-fiscaux',
    title: 'PER : Préparer sa retraite tout en réduisant ses impôts',
    excerpt: 'Le Plan Épargne Retraite offre des avantages fiscaux immédiats. Guide complet pour bien choisir et optimiser votre PER.',
    silo: 'investir',
    level: 2,
    publishedDate: '2026-04-10',
    readTime: '7 min',
    image: '/images/dossier_per.webp',
    author: 'Cindy Urbansky',
    keywords: ['PER', 'retraite', 'défiscalisation', 'épargne retraite'],
  },

  // Niveau 3 : Articles spécifiques du silo Investir
  {
    slug: 'scpi-rendement-2026-meilleures-performances',
    title: 'SCPI : Les meilleures performances 2026 et prévisions',
    excerpt: 'Analyse des SCPI les plus performantes en 2026 : rendements, taux d\'occupation, et perspectives pour les investisseurs.',
    silo: 'investir',
    level: 3,
    parent: 'scpi-guide-complet-investissement-immobilier',
    publishedDate: '2026-04-18',
    readTime: '6 min',
    image: '/images/dossier_scpi.webp',
    author: 'Cindy Urbansky',
    keywords: ['SCPI rendement', 'performance SCPI', 'classement SCPI 2026'],
  },
  {
    slug: 'scpi-fiscalite-imposition-revenus-fonciers',
    title: 'SCPI : Comprendre la fiscalité et l\'imposition des revenus',
    excerpt: 'Comment sont imposés les revenus de SCPI ? Guide pratique sur la fiscalité, les prélèvements sociaux et l\'optimisation fiscale.',
    silo: 'investir',
    level: 3,
    parent: 'scpi-guide-complet-investissement-immobilier',
    publishedDate: '2026-04-16',
    readTime: '5 min',
    image: '/images/dossier_scpi.webp',
    author: 'Cindy Urbansky',
    keywords: ['SCPI fiscalité', 'imposition SCPI', 'revenus fonciers'],
  },
  {
    slug: 'assurance-vie-fonds-euros-vs-unites-compte',
    title: 'Assurance vie : Fonds euros ou unités de compte, que choisir ?',
    excerpt: 'Comparatif détaillé entre fonds euros sécurisés et unités de compte dynamiques pour optimiser le rendement de votre assurance vie.',
    silo: 'investir',
    level: 3,
    parent: 'assurance-vie-optimiser-fiscalite-transmission',
    publishedDate: '2026-04-14',
    readTime: '6 min',
    image: '/images/dossier_assurance_vie.webp',
    author: 'Cindy Urbansky',
    keywords: ['fonds euros', 'unités de compte', 'rendement assurance vie'],
  },
  {
    slug: 'per-sortie-capital-ou-rente-comment-choisir',
    title: 'PER : Sortie en capital ou en rente, comment choisir ?',
    excerpt: 'À la retraite, faut-il récupérer son PER en capital ou en rente viagère ? Analyse des avantages et inconvénients de chaque option.',
    silo: 'investir',
    level: 3,
    parent: 'per-preparer-retraite-avantages-fiscaux',
    publishedDate: '2026-04-11',
    readTime: '5 min',
    image: '/images/dossier_per.webp',
    author: 'Cindy Urbansky',
    keywords: ['PER sortie', 'capital ou rente', 'déblocage PER'],
  },

  // ═══════════════════════════════════════════════════════════
  // SILO 2 : FINANCER (Crédit & Emprunt)
  // ═══════════════════════════════════════════════════════════
  
  // Niveau 2 : Articles piliers du silo Financer
  {
    slug: 'credit-immobilier-obtenir-meilleur-taux-2026',
    title: 'Crédit immobilier 2026 : Comment obtenir le meilleur taux',
    excerpt: 'Les taux de crédit immobilier évoluent. Découvrez les stratégies pour négocier le meilleur taux et optimiser votre capacité d\'emprunt.',
    silo: 'financer',
    level: 2,
    publishedDate: '2026-04-20',
    readTime: '9 min',
    image: '/images/dossier_credit_immobilier.webp',
    author: 'Cindy Urbansky',
    keywords: ['crédit immobilier', 'taux immobilier 2026', 'négociation taux'],
  },
  {
    slug: 'regroupement-credits-reduire-mensualites',
    title: 'Regroupement de crédits : Réduire ses mensualités de 30% à 60%',
    excerpt: 'Le rachat de crédits permet de regrouper tous vos prêts en un seul. Guide complet pour alléger vos mensualités et retrouver du pouvoir d\'achat.',
    silo: 'financer',
    level: 2,
    publishedDate: '2026-04-17',
    readTime: '8 min',
    image: '/images/dossier_regroupement_credit.webp',
    author: 'Cindy Urbansky',
    keywords: ['regroupement crédits', 'rachat de crédits', 'réduire mensualités'],
  },
  {
    slug: 'pret-personnel-financer-projets-rapidement',
    title: 'Prêt personnel : Financer vos projets rapidement et sans justificatif',
    excerpt: 'Le crédit à la consommation permet de financer vos projets personnels. Comparatif des offres et conseils pour emprunter au meilleur taux.',
    silo: 'financer',
    level: 2,
    publishedDate: '2026-04-13',
    readTime: '6 min',
    image: '/images/dossier_pret_personnel.webp',
    author: 'Cindy Urbansky',
    keywords: ['prêt personnel', 'crédit consommation', 'financement projet'],
  },

  // Niveau 3 : Articles spécifiques du silo Financer
  {
    slug: 'credit-immobilier-apport-personnel-combien',
    title: 'Crédit immobilier : Quel apport personnel minimum en 2026 ?',
    excerpt: 'Faut-il 10% ou 20% d\'apport pour obtenir un crédit immobilier ? Analyse des exigences bancaires et solutions pour emprunter sans apport.',
    silo: 'financer',
    level: 3,
    parent: 'credit-immobilier-obtenir-meilleur-taux-2026',
    publishedDate: '2026-04-22',
    readTime: '5 min',
    image: '/images/dossier_credit_immobilier.webp',
    author: 'Cindy Urbansky',
    keywords: ['apport personnel', 'crédit sans apport', 'financement immobilier'],
  },
  {
    slug: 'credit-immobilier-taux-endettement-33-pourcent',
    title: 'Taux d\'endettement à 33% : Comment calculer et optimiser',
    excerpt: 'Le taux d\'endettement maximum est fixé à 33%. Découvrez comment le calculer et les astuces pour augmenter votre capacité d\'emprunt.',
    silo: 'financer',
    level: 3,
    parent: 'credit-immobilier-obtenir-meilleur-taux-2026',
    publishedDate: '2026-04-21',
    readTime: '6 min',
    image: '/images/dossier_credit_immobilier.webp',
    author: 'Cindy Urbansky',
    keywords: ['taux endettement', 'capacité emprunt', 'règle 33%'],
  },
  {
    slug: 'regroupement-credits-quand-faire-rachat',
    title: 'Regroupement de crédits : Quand est-ce vraiment intéressant ?',
    excerpt: 'Le rachat de crédits n\'est pas toujours avantageux. Analyse des situations où le regroupement est pertinent et des pièges à éviter.',
    silo: 'financer',
    level: 3,
    parent: 'regroupement-credits-reduire-mensualites',
    publishedDate: '2026-04-19',
    readTime: '5 min',
    image: '/images/dossier_regroupement_credit.webp',
    author: 'Cindy Urbansky',
    keywords: ['rachat crédits avantageux', 'simulation regroupement', 'coût rachat'],
  },

  // ═══════════════════════════════════════════════════════════
  // SILO 3 : ASSURER (Protection & Sécurité)
  // ═══════════════════════════════════════════════════════════
  
  // Niveau 2 : Articles piliers du silo Assurer
  {
    slug: 'assurance-emprunteur-loi-lemoine-changer-assurance',
    title: 'Loi Lemoine : Changez d\'assurance emprunteur à tout moment',
    excerpt: 'Depuis 2022, vous pouvez changer d\'assurance de prêt quand vous voulez. Guide complet pour économiser jusqu\'à 15 000€ sur votre crédit.',
    silo: 'assurer',
    level: 2,
    publishedDate: '2026-04-23',
    readTime: '9 min',
    image: '/images/dossier_assurance_emprunteur.webp',
    author: 'Cindy Urbansky',
    keywords: ['loi Lemoine', 'assurance emprunteur', 'changement assurance prêt'],
  },
  {
    slug: 'assurance-habitation-garanties-indispensables',
    title: 'Assurance habitation : Les garanties vraiment indispensables',
    excerpt: 'Quelles garanties choisir pour votre assurance habitation ? Analyse des couvertures essentielles et des options à éviter.',
    silo: 'assurer',
    level: 2,
    publishedDate: '2026-04-09',
    readTime: '7 min',
    image: '/images/dossier-courtage-habitation.webp',
    author: 'Cindy Urbansky',
    keywords: ['assurance habitation', 'garanties habitation', 'MRH'],
  },
  {
    slug: 'assurance-auto-reduire-prime-sans-perdre-garanties',
    title: 'Assurance auto : Réduire sa prime sans perdre en garanties',
    excerpt: 'Les tarifs d\'assurance auto explosent. Découvrez comment économiser sur votre prime tout en conservant une protection optimale.',
    silo: 'assurer',
    level: 2,
    publishedDate: '2026-04-07',
    readTime: '6 min',
    image: '/images/dossier_assurance_auto_moto.webp',
    author: 'Cindy Urbansky',
    keywords: ['assurance auto', 'réduire prime auto', 'économiser assurance'],
  },

  // Niveau 3 : Articles spécifiques du silo Assurer
  {
    slug: 'assurance-emprunteur-questionnaire-sante-conseils',
    title: 'Assurance emprunteur : Bien remplir le questionnaire de santé',
    excerpt: 'Le questionnaire de santé est crucial pour votre assurance de prêt. Conseils pour le remplir correctement et éviter les refus.',
    silo: 'assurer',
    level: 3,
    parent: 'assurance-emprunteur-loi-lemoine-changer-assurance',
    publishedDate: '2026-04-25',
    readTime: '5 min',
    image: '/images/dossier_assurance_emprunteur.webp',
    author: 'Cindy Urbansky',
    keywords: ['questionnaire santé', 'assurance prêt santé', 'déclaration santé'],
  },
  {
    slug: 'assurance-emprunteur-garanties-ipp-itt-itpt',
    title: 'Assurance emprunteur : Comprendre les garanties IPP, ITT, ITPT',
    excerpt: 'Décryptage des garanties d\'assurance de prêt : Invalidité, Incapacité de Travail, Perte d\'Emploi. Lesquelles choisir ?',
    silo: 'assurer',
    level: 3,
    parent: 'assurance-emprunteur-loi-lemoine-changer-assurance',
    publishedDate: '2026-04-24',
    readTime: '6 min',
    image: '/images/dossier_assurance_emprunteur.webp',
    author: 'Cindy Urbansky',
    keywords: ['garanties assurance prêt', 'IPP ITT ITPT', 'couverture emprunteur'],
  },
  {
    slug: 'assurance-habitation-sinistre-degats-eaux-procedure',
    title: 'Dégât des eaux : Procédure et indemnisation par l\'assurance',
    excerpt: 'Que faire en cas de dégât des eaux ? Guide pratique pour déclarer le sinistre et obtenir une indemnisation rapide de votre assurance.',
    silo: 'assurer',
    level: 3,
    parent: 'assurance-habitation-garanties-indispensables',
    publishedDate: '2026-04-08',
    readTime: '5 min',
    image: '/images/dossier-courtage-habitation.webp',
    author: 'Cindy Urbansky',
    keywords: ['dégât des eaux', 'sinistre habitation', 'indemnisation assurance'],
  },
];

/**
 * Récupère les articles d'un silo spécifique
 */
export function getArticlesBySilo(silo) {
  return BLOG_ARTICLES.filter(article => article.silo === silo)
    .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
}

/**
 * Récupère les articles liés (même silo, même niveau ou parent)
 */
export function getRelatedArticles(currentSlug, silo, maxResults = 5) {
  const currentArticle = BLOG_ARTICLES.find(a => a.slug === currentSlug);
  if (!currentArticle) return [];

  return BLOG_ARTICLES
    .filter(article => 
      article.slug !== currentSlug && 
      article.silo === silo &&
      (article.parent === currentArticle.parent || article.level === currentArticle.level)
    )
    .slice(0, maxResults);
}

/**
 * Récupère un article par son slug
 */
export function getArticleBySlug(slug) {
  return BLOG_ARTICLES.find(article => article.slug === slug);
}

/**
 * Récupère tous les articles (pour la page blog principale)
 */
export function getAllArticles() {
  return BLOG_ARTICLES.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
}

/**
 * Récupère les articles niveau 2 (piliers) d'un silo
 */
export function getPillarArticles(silo) {
  return BLOG_ARTICLES
    .filter(article => article.silo === silo && article.level === 2)
    .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
}
