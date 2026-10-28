// Informations légales officielles d'Orizia Courtage (source : extrait Kbis du 27/10/2026).
// Source de vérité unique pour les mentions légales et les données structurées (JSON-LD).
export const COMPANY = {
  legalName: "Orizia Courtage",
  denomination: "ORIZIA COURTAGE",
  legalForm: "Société à responsabilité limitée à associé unique (SARL)",
  capital: "1 000 €",
  siren: "131 555 773",
  sirenCompact: "131555773",
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
  phone: "07 77 25 97 06",
  phoneE164: "+33777259706",
  url: "https://www.orizia-courtage.fr",
  // ORIAS : en cours d'immatriculation (Kbis). Numéro à renseigner dès attribution.
  oriasNumber: null,
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    url: "https://vercel.com",
  },
};

// Identifiants officiels pour le JSON-LD schema.org (Organization).
export const COMPANY_IDENTIFIERS = [
  { "@type": "PropertyValue", propertyID: "SIREN", value: COMPANY.sirenCompact },
  { "@type": "PropertyValue", propertyID: "RCS", value: COMPANY.rcs },
  { "@type": "PropertyValue", propertyID: "EUID", value: COMPANY.euid },
];
