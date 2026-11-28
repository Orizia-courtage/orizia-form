// Informations légales officielles d'Orizia Courtage (source : extrait Kbis du 27/10/2026).
// Source de vérité unique pour les mentions légales et les données structurées (JSON-LD).
export const COMPANY = {
  legalName: "Orizia Courtage",
  denomination: "ORIZIA COURTAGE",
  legalForm: "Société à responsabilité limitée à associé unique (SARL)",
  capital: "1 000 €",
  siren: "131 555 773",
  sirenCompact: "131555773",
  siret: "131 555 773 00012",
  siretCompact: "13155577300012",
  rcs: "RCS Lille Métropole 131 555 773",
  rcsCity: "Lille Métropole",
  gestion: "2026B04948",
  euid: "FR5910.131555773",
  registeredAt: "2026-10-26",
  activityStart: "2026-10-08",
  address: {
    street: "23 boulevard Clemenceau",
    postalCode: "59700",
    city: "Marcq-en-Barœul",
    region: "Hauts-de-France",
    country: "FR",
  },
  addressInline: "23 boulevard Clemenceau, 59700 Marcq-en-Barœul",
  manager: "Cindy Urbansky",
  email: "cindy.urbansky@orizia-courtage.fr",
  // Adresse générique affichée dans les mentions légales (contact, RGPD, réclamations).
  contactEmail: "contact@orizia-courtage.fr",
  phone: "07 77 25 97 06",
  phoneE164: "+33777259706",
  url: "https://www.orizia-courtage.fr",
  // ORIAS (attestation du 20/11/2026) : inscrit en qualité de courtier d'assurance (COA) uniquement,
  // du 20/11/2026 au 28/02/2027 (renouvellement annuel). L'inscription COBSP (crédit) est en cours :
  // passer cobspPending à false et ajouter la catégorie dès l'attestation reçue.
  oriasNumber: "26013524",
  oriasCategories: ["Courtier en assurance (COA)"],
  cobspPending: true,
  // Association professionnelle agréée par l'ACPR (adhésion du 02/11/2026 au 31/12/2027, activité courtage en assurance).
  association: {
    name: "VotrAsso",
    description: "association professionnelle d'autorégulation du courtage en assurance, agréée par l'ACPR",
    address: "33 rue de la République, 69002 Lyon",
    url: "https://votrasso.org",
    memberRef: "18149",
  },
  // Médiateur de la consommation (convention via VotrAsso du 02/11/2026).
  mediator: {
    name: "La Médiation de l'Assurance",
    address: "TSA 50110, 75441 Paris Cedex 09",
    url: "https://www.mediation-assurance.org",
  },
  // TVA : exonération propre au courtage (art. 261 C du CGI), pas de numéro de TVA intracommunautaire.
  // Garantie financière : aucun fonds encaissé, donc pas d'obligation (indications de la gérante, 22/11/2026).
  vatExempt: true,
  // Responsabilité civile professionnelle (attestation Orus du 02/11/2026, valable du 03/11/2026 au 28/02/2028).
  // Le contrat couvre l'activité d'intermédiaire d'assurance : à compléter pour le crédit dès l'inscription COBSP.
  rcPro: {
    insurer: "AIG Europe SA",
    insurerAddress: "succursale pour la France, Tour CBX, 1 Passerelle des Reflets, 92913 Paris La Défense Cedex",
    policyNumber: "RCPA278684637",
    broker: "Orus France",
    territory: "France métropolitaine, Martinique, Guadeloupe et La Réunion",
  },
  acpr: "Autorité de contrôle prudentiel et de résolution (ACPR), 4 place de Budapest, CS 92459, 75436 Paris Cedex 09",
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    url: "https://vercel.com",
    // Téléphone administratif enregistré par Vercel (pas de standard public) ; contact recommandé : e-mail ou formulaire.
    phone: "+1 951-383-6898",
    email: "privacy@vercel.com",
    contactUrl: "https://vercel.com/contact",
  },
};

// Phrase de statut réutilisée dans les pieds de page des pages (assurance, placements, crédit).
export const STATUS_SHORT = `Courtier en assurance immatriculé à l'ORIAS sous le n° ${COMPANY.oriasNumber} (www.orias.fr), sous le contrôle de l'ACPR, membre de ${COMPANY.association.name}.`;
export const CREDIT_STATUS = COMPANY.cobspPending
  ? `${STATUS_SHORT} Inscription en qualité de courtier en opérations de banque et en services de paiement (COBSP) en cours.`
  : STATUS_SHORT;

// Adhésion professionnelle, pour le JSON-LD (Organization.memberOf).
export const ORGANIZATION_MEMBERSHIPS = [
  {
    "@type": "Organization",
    name: COMPANY.association.name,
    url: COMPANY.association.url,
    description: COMPANY.association.description,
  },
];

// Identifiants officiels pour le JSON-LD schema.org (Organization).
export const COMPANY_IDENTIFIERS = [
  { "@type": "PropertyValue", propertyID: "SIREN", value: COMPANY.sirenCompact },
  { "@type": "PropertyValue", propertyID: "SIRET", value: COMPANY.siretCompact },
  { "@type": "PropertyValue", propertyID: "RCS", value: COMPANY.rcs },
  { "@type": "PropertyValue", propertyID: "EUID", value: COMPANY.euid },
  { "@type": "PropertyValue", propertyID: "ORIAS", name: "Immatriculation ORIAS (courtier en assurance)", value: COMPANY.oriasNumber, url: "https://www.orias.fr" },
];
