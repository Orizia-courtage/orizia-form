const env = {
  NEXT_PUBLIC_DEBT_MAX_RATIO: process.env.NEXT_PUBLIC_DEBT_MAX_RATIO,
  NEXT_PUBLIC_DEBT_TARGET_RATIO: process.env.NEXT_PUBLIC_DEBT_TARGET_RATIO,
  NEXT_PUBLIC_DEBT_WATCH_RATIO: process.env.NEXT_PUBLIC_DEBT_WATCH_RATIO,
  NEXT_PUBLIC_DEBT_HIGH_RATIO: process.env.NEXT_PUBLIC_DEBT_HIGH_RATIO,
  NEXT_PUBLIC_DEBT_CRITICAL_RATIO: process.env.NEXT_PUBLIC_DEBT_CRITICAL_RATIO,
  NEXT_PUBLIC_CREDIT_IMMO_RATE_DEFAULT: process.env.NEXT_PUBLIC_CREDIT_IMMO_RATE_DEFAULT,
  NEXT_PUBLIC_CREDIT_IMMO_RATE_MIN: process.env.NEXT_PUBLIC_CREDIT_IMMO_RATE_MIN,
  NEXT_PUBLIC_CREDIT_IMMO_RATE_MAX: process.env.NEXT_PUBLIC_CREDIT_IMMO_RATE_MAX,
  NEXT_PUBLIC_MORTGAGE_RATES_BY_ZONE: process.env.NEXT_PUBLIC_MORTGAGE_RATES_BY_ZONE,
  NEXT_PUBLIC_SOULTE_SHARING_DUTY_RATE: process.env.NEXT_PUBLIC_SOULTE_SHARING_DUTY_RATE,
  NEXT_PUBLIC_SCPI_DISTRIBUTION_RATE_DEFAULT: process.env.NEXT_PUBLIC_SCPI_DISTRIBUTION_RATE_DEFAULT,
  NEXT_PUBLIC_SCPI_DISTRIBUTION_RATE_MIN: process.env.NEXT_PUBLIC_SCPI_DISTRIBUTION_RATE_MIN,
  NEXT_PUBLIC_SCPI_DISTRIBUTION_RATE_MAX: process.env.NEXT_PUBLIC_SCPI_DISTRIBUTION_RATE_MAX,
  NEXT_PUBLIC_SCPI_REVALUATION_RATE: process.env.NEXT_PUBLIC_SCPI_REVALUATION_RATE,
  NEXT_PUBLIC_CROWDFUNDING_FLAT_TAX_RATE: process.env.NEXT_PUBLIC_CROWDFUNDING_FLAT_TAX_RATE,
  NEXT_PUBLIC_LIVRET_A_NET_RATE: process.env.NEXT_PUBLIC_LIVRET_A_NET_RATE,
  NEXT_PUBLIC_CROWDFUNDING_RATE_DEFAULT: process.env.NEXT_PUBLIC_CROWDFUNDING_RATE_DEFAULT,
  NEXT_PUBLIC_CROWDFUNDING_RATE_MIN: process.env.NEXT_PUBLIC_CROWDFUNDING_RATE_MIN,
  NEXT_PUBLIC_CROWDFUNDING_RATE_MAX: process.env.NEXT_PUBLIC_CROWDFUNDING_RATE_MAX,
  NEXT_PUBLIC_CROWDFUNDING_PRESETS: process.env.NEXT_PUBLIC_CROWDFUNDING_PRESETS,
  NEXT_PUBLIC_ASSURANCE_EMPRUNTEUR_RATES: process.env.NEXT_PUBLIC_ASSURANCE_EMPRUNTEUR_RATES,
  NEXT_PUBLIC_AV_PAYMENT_FEE_RATE: process.env.NEXT_PUBLIC_AV_PAYMENT_FEE_RATE,
  NEXT_PUBLIC_AV_MANAGEMENT_FEE_RATE: process.env.NEXT_PUBLIC_AV_MANAGEMENT_FEE_RATE,
  NEXT_PUBLIC_AV_SOCIAL_TAX_RATE: process.env.NEXT_PUBLIC_AV_SOCIAL_TAX_RATE,
  NEXT_PUBLIC_AV_PFNL_BEFORE_8_YEARS_RATE: process.env.NEXT_PUBLIC_AV_PFNL_BEFORE_8_YEARS_RATE,
  NEXT_PUBLIC_AV_PFNL_AFTER_8_YEARS_RATE: process.env.NEXT_PUBLIC_AV_PFNL_AFTER_8_YEARS_RATE,
  NEXT_PUBLIC_AV_ABATEMENT_SINGLE: process.env.NEXT_PUBLIC_AV_ABATEMENT_SINGLE,
  NEXT_PUBLIC_AV_ABATEMENT_COUPLE: process.env.NEXT_PUBLIC_AV_ABATEMENT_COUPLE,
  NEXT_PUBLIC_AV_REPARTITION: process.env.NEXT_PUBLIC_AV_REPARTITION,
  NEXT_PUBLIC_PER_TMI_TRANCHES: process.env.NEXT_PUBLIC_PER_TMI_TRANCHES,
};

const num = (key, fallback) => {
  const value = Number(env[key]);
  return Number.isFinite(value) ? value : fallback;
};

const json = (key, fallback) => {
  try {
    const raw = env[key];
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const formatPercent = (value, options = {}) => {
  const { ratio = false, maximumFractionDigits = 2 } = options;
  const percent = ratio ? value * 100 : value;
  return `${percent.toLocaleString('fr-FR', { maximumFractionDigits })}%`;
};

export const debtConfig = {
  maxRatio: num('NEXT_PUBLIC_DEBT_MAX_RATIO', 0.35),
  targetRatio: num('NEXT_PUBLIC_DEBT_TARGET_RATIO', 0.33),
  watchRatio: num('NEXT_PUBLIC_DEBT_WATCH_RATIO', 0.25),
  highRatio: num('NEXT_PUBLIC_DEBT_HIGH_RATIO', 0.35),
  criticalRatio: num('NEXT_PUBLIC_DEBT_CRITICAL_RATIO', 0.50),
};

export const creditConfig = {
  defaultRate: num('NEXT_PUBLIC_CREDIT_IMMO_RATE_DEFAULT', 3.5),
  minRate: num('NEXT_PUBLIC_CREDIT_IMMO_RATE_MIN', 2),
  maxRate: num('NEXT_PUBLIC_CREDIT_IMMO_RATE_MAX', 6),
  ratesByZone: json('NEXT_PUBLIC_MORTGAGE_RATES_BY_ZONE', {
    'ile-de-france': { '10': 2.65, '11-15': 2.80, '16-20': 3.00, '21-25': 3.15 },
    'nord-ouest': { '10': 2.70, '11-15': 2.85, '16-20': 3.05, '21-25': 3.20 },
    'nord-est': { '10': 2.75, '11-15': 2.90, '16-20': 3.10, '21-25': 3.25 },
    'sud-ouest': { '10': 2.80, '11-15': 2.95, '16-20': 3.15, '21-25': 3.30 },
    'sud-est': { '10': 2.85, '11-15': 3.00, '16-20': 3.20, '21-25': 3.35 },
    corse: { '10': 2.90, '11-15': 3.05, '16-20': 3.25, '21-25': 3.40 },
    reunion: { '10': 3.05, '11-15': 3.20, '16-20': 3.40, '21-25': 3.55 },
    guadeloupe: { '10': 3.10, '11-15': 3.25, '16-20': 3.45, '21-25': 3.60 },
    guyane: { '10': 3.15, '11-15': 3.30, '16-20': 3.50, '21-25': 3.65 },
    'nouvelle-caledonie': { '10': 3.20, '11-15': 3.35, '16-20': 3.55, '21-25': 3.70 },
    martinique: { '10': 3.10, '11-15': 3.25, '16-20': 3.45, '21-25': 3.60 },
    mayotte: { '10': 3.25, '11-15': 3.40, '16-20': 3.60, '21-25': 3.75 },
    polynesie: { '10': 3.20, '11-15': 3.35, '16-20': 3.55, '21-25': 3.70 },
    'saint-martin': { '10': 3.15, '11-15': 3.30, '16-20': 3.50, '21-25': 3.65 },
    'saint-barthelemy': { '10': 3.15, '11-15': 3.30, '16-20': 3.50, '21-25': 3.65 },
    'saint-pierre-miquelon': { '10': 3.05, '11-15': 3.20, '16-20': 3.40, '21-25': 3.55 },
    'wallis-futuna': { '10': 3.25, '11-15': 3.40, '16-20': 3.60, '21-25': 3.75 },
  }),
};

export const soulteConfig = {
  sharingDutyRate: num('NEXT_PUBLIC_SOULTE_SHARING_DUTY_RATE', 0.025),
};

export const scpiConfig = {
  defaultDistributionRate: num('NEXT_PUBLIC_SCPI_DISTRIBUTION_RATE_DEFAULT', 5),
  minDistributionRate: num('NEXT_PUBLIC_SCPI_DISTRIBUTION_RATE_MIN', 3),
  maxDistributionRate: num('NEXT_PUBLIC_SCPI_DISTRIBUTION_RATE_MAX', 8),
  revaluationRate: num('NEXT_PUBLIC_SCPI_REVALUATION_RATE', 0.01),
};

export const crowdfundingConfig = {
  flatTaxRate: num('NEXT_PUBLIC_CROWDFUNDING_FLAT_TAX_RATE', 0.30),
  livretANetRate: num('NEXT_PUBLIC_LIVRET_A_NET_RATE', 2.1),
  defaultRate: num('NEXT_PUBLIC_CROWDFUNDING_RATE_DEFAULT', 10),
  minRate: num('NEXT_PUBLIC_CROWDFUNDING_RATE_MIN', 6),
  maxRate: num('NEXT_PUBLIC_CROWDFUNDING_RATE_MAX', 14),
  presets: json('NEXT_PUBLIC_CROWDFUNDING_PRESETS', [
    { label: '🟢 Prudent', montant: 5000, taux: 8, duree: 12 },
    { label: '🟡 Équilibré', montant: 10000, taux: 10, duree: 24 },
    { label: '🔴 Dynamique', montant: 25000, taux: 12, duree: 36 },
  ]),
};

export const assuranceEmprunteurConfig = {
  ageRates: json('NEXT_PUBLIC_ASSURANCE_EMPRUNTEUR_RATES', [
    { label: '20–29 ans', tauxBanque: 0.0023, tauxOrizia: 0.0008, gain: 65 },
    { label: '30–35 ans', tauxBanque: 0.0030, tauxOrizia: 0.0012, gain: 60 },
    { label: '36–40 ans', tauxBanque: 0.0032, tauxOrizia: 0.0014, gain: 56 },
    { label: '41–45 ans', tauxBanque: 0.0038, tauxOrizia: 0.0020, gain: 47 },
    { label: '46–50 ans', tauxBanque: 0.0040, tauxOrizia: 0.0022, gain: 45 },
    { label: '51–55 ans', tauxBanque: 0.0044, tauxOrizia: 0.0026, gain: 41 },
    { label: '56–60 ans', tauxBanque: 0.0048, tauxOrizia: 0.0030, gain: 37 },
  ]),
};

export const assuranceVieConfig = {
  paymentFeeRate: num('NEXT_PUBLIC_AV_PAYMENT_FEE_RATE', 0.02),
  managementFeeRate: num('NEXT_PUBLIC_AV_MANAGEMENT_FEE_RATE', 0.00239),
  socialTaxRate: num('NEXT_PUBLIC_AV_SOCIAL_TAX_RATE', 0.172),
  pfnlBefore8YearsRate: num('NEXT_PUBLIC_AV_PFNL_BEFORE_8_YEARS_RATE', 0.128),
  pfnlAfter8YearsRate: num('NEXT_PUBLIC_AV_PFNL_AFTER_8_YEARS_RATE', 0.075),
  abatementSingle: num('NEXT_PUBLIC_AV_ABATEMENT_SINGLE', 4600),
  abatementCouple: num('NEXT_PUBLIC_AV_ABATEMENT_COUPLE', 9200),
  repartition: json('NEXT_PUBLIC_AV_REPARTITION', [
    { fe: 100, uc: 0, taux: 0.50 },
    { fe: 95, uc: 5, taux: 0.73 },
    { fe: 90, uc: 10, taux: 0.95 },
    { fe: 85, uc: 15, taux: 1.18 },
    { fe: 80, uc: 20, taux: 1.40 },
    { fe: 75, uc: 25, taux: 1.63 },
    { fe: 70, uc: 30, taux: 1.85 },
    { fe: 65, uc: 35, taux: 2.08 },
    { fe: 60, uc: 40, taux: 2.30 },
    { fe: 55, uc: 45, taux: 2.53 },
    { fe: 50, uc: 50, taux: 2.75 },
    { fe: 45, uc: 55, taux: 2.98 },
    { fe: 40, uc: 60, taux: 3.20 },
    { fe: 35, uc: 65, taux: 3.43 },
    { fe: 30, uc: 70, taux: 3.65 },
    { fe: 25, uc: 75, taux: 3.88 },
    { fe: 20, uc: 80, taux: 4.10 },
    { fe: 15, uc: 85, taux: 4.33 },
    { fe: 10, uc: 90, taux: 4.55 },
    { fe: 5, uc: 95, taux: 4.78 },
    { fe: 0, uc: 100, taux: 5.00 },
  ]),
};

export const perConfig = {
  tranches: json('NEXT_PUBLIC_PER_TMI_TRANCHES', [
    { label: '11%', tmi: 0.11, plafond: 4000 },
    { label: '30%', tmi: 0.30, plafond: 35000 },
    { label: '41%', tmi: 0.41, plafond: 35000 },
    { label: '45%', tmi: 0.45, plafond: 85000 },
  ]),
};
