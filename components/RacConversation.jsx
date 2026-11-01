'use client';

// Formulaire de regroupement de crédits en conversation avec Cindy.
// Pensé d'abord pour le téléphone : zone de réponse collée en bas, gros boutons,
// bon clavier pour chaque question, remplissage automatique du navigateur.
// Les données envoyées sont construites par lib/rac-logic.js, comme l'ancien
// formulaire (components/OriziaFormClassique.jsx, toujours disponible).

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { isValidPhoneNumber, AsYouType } from 'libphonenumber-js';
import { countryOptions } from './countryOptions';
import { useSimulationConfig } from '@/components/SimulationConfigProvider';
import { mountTurnstile } from '@/lib/turnstile-lifecycle.mjs';
import { LOC_STATUTS, buildPayload, getSegmentType, normalizeStr, submissionResult } from '@/lib/rac-logic';
import '@/app/rac-chat.css';

const FORM_SUBMIT_ENDPOINT = '/api/orizia-form';
const FORM_RAPPEL_ENDPOINT = '/api/orizia-rappel';
const CONTACT_EMAIL = 'cindy.urbansky@orizia-courtage.fr';
const TURNSTILE_KEY = '0x4AAAAAACu8a5g2pFEtNqxD';
const RDV_URL = 'https://zcal.co/cindyurbansky/regroupement-credit';
const AVATAR = '/images/avatar-cindy.webp';
const DRAFT_KEY = 'orizia-rac-conversation';

const INIT = {
  souhait: '', statut_logement: '',
  nb_immo: 0, nb_conso: 0,
  mensualite_immo: '', capital_immo: '', mensualite_conso: '', capital_conso: '',
  has_loa: '', loa_mensualite: '', loa_duree: '', loa_total: '',
  has_paiement: '', paiement_total: '',
  somme_comp: '', type_projet: '',
  situation_familiale: '', profession: '',
  revenus_nets: '', autres_revenus: '',
  loyer: '', autres_charges: '',
  fichage: '', raison_fichage: '',
  civilite: '', prenom: '', nom: '', date_naissance: '', email: '',
  tel_etranger: 'non', tel_fr: '', tel_inter: '', code_pays: 'FR|+33',
  ville: '', cp: '',
  optin_orizia: '', optin_partenaires: '',
  // Champs propres à la conversation (non envoyés tels quels).
  treso_envie: '',
};

const nf = new Intl.NumberFormat('fr-FR');
const n = (v) => parseFloat(String(v ?? '').replace(/\s/g, '').replace(',', '.')) || 0;
const eur = (v) => `${nf.format(Math.round(n(v)))} €`;
const plural = (k, word) => `${k} ${word}${k > 1 ? 's' : ''}`;
const getTurnstileToken = () => document.querySelector('[data-turnstile-action="orizia_submit"] [name="cf-turnstile-response"]')?.value || '';
const resetTurnstile = (action) => window.dispatchEvent(new CustomEvent('orizia-turnstile-reset', { detail: action }));

function ageFrom(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (d.getMonth() !== Number(m[2]) - 1) return null;
  return new Date().getFullYear() - d.getFullYear();
}
export function debtRatio(f) {
  const rev = n(f.revenus_nets) + n(f.autres_revenus);
  if (!rev) return null;
  const ch = n(f.mensualite_immo) + n(f.mensualite_conso) + n(f.loa_mensualite) + n(f.loyer) + n(f.autres_charges);
  return Math.round((ch / rev) * 100);
}

// ─── Les questions ────────────────────────────────────────────
// say : messages de Cindy · input : type de réponse · answer : texte de la bulle
// de réponse · check : message d'erreur ou null · when : question posée ou non.
const GOALS = [
  { v: 'Réduire vos mensualités', label: 'Réduire mes mensualités', sub: 'Alléger le budget de chaque mois', icon: 'down' },
  { v: 'Renégocier vos crédits', label: 'Renégocier mes crédits', sub: 'Obtenir un meilleur taux global', icon: 'refresh' },
  { v: 'Financer un nouveau projet', label: 'Financer un nouveau projet', sub: 'Ajouter une trésorerie', icon: 'rocket' },
];
const goalLabel = (v) => GOALS.find((g) => g.v === v)?.label || v;
const YESNO = [{ v: 'non', label: 'Non' }, { v: 'oui', label: 'Oui' }];

export const QUESTIONS = [
  {
    id: 'prenom', input: 'text', field: 'prenom', placeholder: 'Votre prénom', autoComplete: 'given-name', autoCapitalize: 'words',
    say: () => ["Bonjour, je suis Cindy, votre courtière 👋", "En quelques minutes, on fait le point sur vos crédits, ensemble. Comment vous appelez-vous ?"],
    answer: (f) => f.prenom,
    check: (f) => (f.prenom.trim().length < 2 ? 'Indiquez votre prénom.' : null),
  },
  {
    id: 'souhait', input: 'cards', field: 'souhait', options: GOALS,
    say: (f) => [`Enchantée ${f.prenom} ! Qu'est-ce qui vous amène aujourd'hui ?`],
    answer: (f) => goalLabel(f.souhait),
  },
  {
    id: 'credits', input: 'counters',
    say: (f) => [f.souhait === 'Réduire vos mensualités' ? "C'est la demande la plus fréquente, et souvent la plus simple à obtenir." : 'Très bien, on va regarder ça.', 'Combien de crédits avez-vous en cours ? Comptez tout : immobilier, auto, travaux, renouvelable…'],
    answer: (f) => [f.nb_immo && `${f.nb_immo} crédit${f.nb_immo > 1 ? 's' : ''} immobilier${f.nb_immo > 1 ? 's' : ''}`, f.nb_conso && `${f.nb_conso} crédit${f.nb_conso > 1 ? 's' : ''} conso`].filter(Boolean).join(' et '),
    check: (f) => (f.nb_immo + f.nb_conso === 0 ? 'Indiquez au moins un crédit en cours.' : null),
  },
  {
    id: 'immo', input: 'amounts', when: (f) => f.nb_immo > 0,
    fields: [
      { key: 'mensualite_immo', label: 'Mensualité', unit: '€/mois', min: 100, err: 'Au moins 100 € par mois.' },
      { key: 'capital_immo', label: 'Capital restant dû', unit: '€', min: 5000, err: 'Au moins 5 000 €.' },
    ],
    say: (f) => [`Pour ${f.nb_immo > 1 ? 'vos crédits immobiliers' : 'votre crédit immobilier'} : combien remboursez-vous par mois, et combien reste-t-il à rembourser ?`, 'Un ordre de grandeur suffit, vous le trouvez sur votre relevé de prêt.'],
    answer: (f) => `${eur(f.mensualite_immo)}/mois · ${eur(f.capital_immo)} restants`,
  },
  {
    id: 'conso', input: 'amounts', when: (f) => f.nb_conso > 0,
    fields: [
      { key: 'mensualite_conso', label: 'Mensualités', unit: '€/mois', min: 30, err: 'Au moins 30 € par mois.' },
      { key: 'capital_conso', label: 'Capital restant dû', unit: '€', min: 500, err: 'Au moins 500 €.' },
    ],
    say: (f) => [`Et pour ${f.nb_conso > 1 ? `vos ${f.nb_conso} crédits conso, au total` : 'votre crédit conso'} ?`],
    answer: (f) => `${eur(f.mensualite_conso)}/mois · ${eur(f.capital_conso)} restants`,
  },
  {
    id: 'loa', input: 'chips', field: 'has_loa', options: YESNO,
    say: () => ['Avez-vous une location avec option d\'achat (LOA) ou une LLD en cours ? Souvent pour une voiture.'],
    answer: (f) => (f.has_loa === 'oui' ? 'Oui, une LOA / LLD' : 'Non'),
  },
  {
    id: 'loa_detail', input: 'amounts', when: (f) => f.has_loa === 'oui',
    fields: [
      { key: 'loa_mensualite', label: 'Loyer de la LOA', unit: '€/mois', min: 1, err: 'Indiquez le montant.' },
      { key: 'loa_duree', label: 'Durée restante', unit: 'mois', min: 1, err: 'Indiquez la durée.', integer: true },
    ],
    say: () => ['Combien payez-vous par mois, et pour combien de mois encore ?'],
    answer: (f) => `${eur(f.loa_mensualite)}/mois pendant ${n(f.loa_duree)} mois`,
  },
  {
    id: 'paiement', input: 'chips', field: 'has_paiement', options: YESNO,
    say: () => ['Des achats payés en plusieurs fois en cours ? (Cofidis, Oney, paiement en 4 fois…)'],
    answer: (f) => (f.has_paiement === 'oui' ? 'Oui' : 'Non'),
  },
  {
    id: 'paiement_detail', input: 'amounts', when: (f) => f.has_paiement === 'oui',
    fields: [{ key: 'paiement_total', label: 'Total restant à payer', unit: '€', min: 1, err: 'Indiquez le montant.' }],
    say: () => ['Au total, combien reste-t-il à payer sur ces achats ?'],
    answer: (f) => `${eur(f.paiement_total)} restants`,
  },
  {
    id: 'treso_envie', input: 'chips', field: 'treso_envie', when: (f) => f.souhait !== 'Financer un nouveau projet',
    options: [{ v: 'non', label: 'Non merci' }, { v: 'oui', label: 'Oui, pour un projet' }],
    say: () => ['Bon à savoir : on peut ajouter une somme pour un projet (travaux, voiture…) dans le même regroupement. Ça vous intéresse ?'],
    answer: (f) => (f.treso_envie === 'oui' ? 'Oui, pour un projet' : 'Non merci'),
  },
  {
    id: 'treso', input: 'amounts', when: (f) => f.souhait === 'Financer un nouveau projet' || f.treso_envie === 'oui',
    fields: [{ key: 'somme_comp', label: 'Somme souhaitée', unit: '€', min: 1, err: 'Indiquez la somme souhaitée.' }],
    say: (f) => [f.souhait === 'Financer un nouveau projet' ? 'Quelle somme souhaitez-vous financer pour votre projet ?' : 'De quelle somme auriez-vous besoin ?'],
    answer: (f) => eur(f.somme_comp),
  },
  {
    id: 'projet', input: 'chips', field: 'type_projet', when: (f) => n(f.somme_comp) > 0,
    options: ['Travaux', 'Voiture', 'Loisirs / Voyage', 'Immobilier', 'Autre'].map((v) => ({ v, label: v })),
    say: () => ['Pour quel type de projet ?'],
    answer: (f) => f.type_projet,
  },
  {
    id: 'logement', input: 'chips', field: 'statut_logement', columns: 1,
    options: [{ v: 'Propriétaire', label: 'Propriétaire' }, { v: 'Locataire', label: 'Locataire' }, { v: 'Hébergé à titre gratuit', label: 'Hébergé(e) à titre gratuit' }],
    say: () => ['Parlons un peu de vous. Vous êtes…'],
    answer: (f) => f.statut_logement,
  },
  {
    id: 'famille', input: 'chips', field: 'situation_familiale',
    options: ['Célibataire', 'Marié(e)', 'En couple', 'Pacsé(e)', 'Divorcé(e)', 'En instance de divorce', 'Veuf / Veuve'].map((v) => ({ v, label: v })),
    say: () => ['Votre situation familiale ?'],
    answer: (f) => f.situation_familiale,
  },
  {
    id: 'profession', input: 'chips', field: 'profession',
    options: ['Salarié (non cadre)', 'Salarié (cadre)', 'Fonctionnaire', 'Commerçant, Artisan', 'Profession libérale', "Chef d'entreprise", 'Retraité', 'Sans profession', 'Autre'].map((v) => ({ v, label: v })),
    say: () => ['Et votre profession ?'],
    answer: (f) => f.profession,
  },
  {
    id: 'fichage', input: 'chips', field: 'fichage', options: YESNO,
    say: () => ["Une question plus délicate, mais importante pour bien vous orienter : êtes-vous fiché(e) à la Banque de France (FICP ou FCC) ?", "Pas d'inquiétude : ça ne ferme pas toutes les portes, et votre réponse reste entre nous."],
    answer: (f) => (f.fichage === 'oui' ? 'Oui' : 'Non'),
  },
  {
    id: 'fichage_raison', input: 'chips', field: 'raison_fichage', columns: 1, when: (f) => f.fichage === 'oui',
    options: ['Incidents de paiement', 'Dossier de surendettement', 'Découverts répétitifs', 'Autre'].map((v) => ({ v, label: v })),
    say: () => ['Merci pour votre franchise. Pour quelle raison ?'],
    answer: (f) => f.raison_fichage,
  },
  {
    id: 'revenus', input: 'amounts',
    fields: [
      { key: 'revenus_nets', label: 'Revenus nets du foyer', unit: '€/mois', min: 1, err: 'Indiquez vos revenus.', hint: 'Avant impôt, tout le foyer' },
      { key: 'autres_revenus', label: 'Autres revenus', unit: '€/mois', optional: true, hint: 'Loyers perçus, pension… (facultatif)' },
    ],
    say: () => ['On y est presque côté budget. Quels sont les revenus nets mensuels de votre foyer ?'],
    answer: (f) => `${eur(f.revenus_nets)}/mois${n(f.autres_revenus) ? ` + ${eur(f.autres_revenus)}` : ''}`,
  },
  {
    id: 'charges', input: 'amounts',
    fields: [
      { key: 'loyer', label: 'Loyer', unit: '€/mois', min: 100, max: 10000, err: 'Entre 100 € et 10 000 €.', when: (f) => f.statut_logement === 'Locataire', hint: 'Charges comprises' },
      { key: 'autres_charges', label: 'Autres charges', unit: '€/mois', optional: true, hint: 'Pension alimentaire… (facultatif)' },
    ],
    say: (f) => [f.statut_logement === 'Locataire' ? 'Et vos charges hors crédits : votre loyer, et d\'autres charges régulières ?' : 'Avez-vous des charges régulières hors crédits, comme une pension alimentaire ?'],
    answer: (f) => [n(f.loyer) && `Loyer ${eur(f.loyer)}`, n(f.autres_charges) ? `autres ${eur(f.autres_charges)}` : (f.statut_logement === 'Locataire' ? '' : 'Pas d\'autre charge')].filter(Boolean).join(' · '),
  },
  {
    id: 'civilite', input: 'chips', field: 'civilite',
    options: [{ v: 'Madame', label: 'Madame' }, { v: 'Monsieur', label: 'Monsieur' }, { v: 'Autre', label: 'Autre' }],
    say: (f) => {
      const r = debtRatio(f);
      const lead = r === null ? [] : [`Vos charges représentent environ ${r} % de vos revenus. ${r > 35 ? "C'est au-dessus du seuil des banques : c'est exactement là qu'un regroupement aide." : r > 30 ? 'C\'est à surveiller, une optimisation est possible.' : 'Votre dossier part bien placé.'}`];
      return [...lead, `Merci ${f.prenom}, j'ai tout ce qu'il faut pour étudier votre dossier. Il me reste vos coordonnées pour vous répondre.`, 'Vous êtes…'];
    },
    answer: (f) => f.civilite,
  },
  {
    id: 'nom', input: 'text', field: 'nom', placeholder: 'Votre nom', autoComplete: 'family-name', autoCapitalize: 'words',
    say: () => ['Votre nom de famille ?'],
    answer: (f) => f.nom,
    check: (f) => (!f.nom.trim() ? 'Indiquez votre nom.' : null),
  },
  {
    id: 'naissance', input: 'date',
    say: () => ['Votre date de naissance ?'],
    answer: (f) => f.date_naissance.split('-').reverse().join('/'),
    check: (f) => { const a = ageFrom(f.date_naissance); return a === null ? 'Date incomplète.' : a < 18 || a > 89 ? 'Il faut avoir entre 18 et 89 ans.' : null; },
  },
  {
    id: 'email', input: 'text', field: 'email', type: 'email', inputMode: 'email', placeholder: 'prenom.nom@exemple.fr', autoComplete: 'email', autoCapitalize: 'none',
    say: () => ['Votre adresse e-mail ? Je vous y envoie la confirmation.'],
    answer: (f) => f.email,
    check: (f) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()) ? 'Cette adresse e-mail semble incomplète.' : null),
  },
  {
    id: 'tel', input: 'phone',
    say: () => ['Et votre numéro de téléphone, pour que je puisse vous rappeler ?'],
    answer: (f) => (f.tel_etranger === 'oui' ? `${f.code_pays.split('|')[1]} ${f.tel_inter}` : f.tel_fr),
    check: (f) => {
      if (f.tel_etranger === 'oui') {
        try { const [iso, dial] = f.code_pays.split('|'); return isValidPhoneNumber(dial + f.tel_inter.replace(/\D/g, ''), iso) ? null : 'Ce numéro ne semble pas valide.'; } catch { return 'Ce numéro ne semble pas valide.'; }
      }
      return /^[0-9]{10}$/.test(f.tel_fr.replace(/\s/g, '')) ? null : 'Il faut 10 chiffres, par exemple 06 12 34 56 78.';
    },
  },
  {
    id: 'ville', input: 'city',
    say: () => ['Dans quelle ville habitez-vous ? Ça me permet de cibler les banques partenaires de votre région.'],
    answer: (f) => `${f.ville} (${f.cp})`,
    check: (f) => (!f.ville ? 'Choisissez votre ville dans la liste.' : null),
  },
  {
    id: 'optin_orizia', input: 'consent', field: 'optin_orizia',
    say: () => ["Dernière chose, deux accords à me donner (ou pas, c'est vous qui choisissez) :", "Acceptez-vous de recevoir des appels, e-mails et SMS sur des offres de financement et d'assurance proposées par Orizia Courtage ?"],
    answer: (f) => (f.optin_orizia === 'oui' ? "J'accepte" : 'Je refuse'),
  },
  {
    id: 'optin_partenaires', input: 'consent', field: 'optin_partenaires',
    say: () => ["Et de recevoir des offres personnalisées de la part des partenaires d'Orizia Courtage, par téléphone, e-mail et SMS ?"],
    answer: (f) => (f.optin_partenaires === 'oui' ? "J'accepte" : 'Je refuse'),
  },
  {
    id: 'envoi', input: 'send',
    say: (f) => [`Parfait ${f.prenom}, votre dossier est complet ✅`, 'Voici votre situation. Je regroupe tout cela et je reviens vers vous sous 24 h.'],
  },
];
const visible = (f) => QUESTIONS.filter((q) => !q.when || q.when(f));

// ─── Icônes ───────────────────────────────────────────────────
const ICON_PATHS = {
  down: <><path d="M3 7l6 6 4-4 8 8" /><path d="M21 11v6h-6" /></>,
  refresh: <><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16" /><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8" /><path d="M21 3v5h-5M3 21v-5h5" /></>,
  rocket: <><path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2" /><path d="M9 12a17 17 0 0 1 11-9 17 17 0 0 1-9 11l-2-2z" /><path d="M9 12H4l3-4h5M12 15v5l4-3v-5" /></>,
  send: <><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></>,
  back: <path d="M15 18l-6-6 6-6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  lock: <><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />,
};
function Ico({ name, size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICON_PATHS[name]}</svg>;
}

// ─── Composant principal ──────────────────────────────────────
export default function RacConversation() {
  const { debt: debtConfig, rac: racConfig } = useSimulationConfig();
  const reduce = useReducedMotion();
  const [form, setForm] = useState(INIT);
  const [answered, setAnswered] = useState([]); // ids des questions répondues, dans l'ordre
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [merging, setMerging] = useState(false);
  const [done, setDone] = useState(null); // { segment, prenom }
  const [sheet, setSheet] = useState(false);
  const [restored, setRestored] = useState(false);
  const threadRef = useRef(null);
  const rootRef = useRef(null);
  const lock = useRef(false);
  const rappelRef = useRef(null);
  const started = useRef(false);

  const set = useCallback((k, v) => { setForm((f) => ({ ...f, [k]: v })); setError(''); }, []);
  const list = useMemo(() => visible(form), [form]);
  const current = list.find((q) => !answered.includes(q.id));
  const progress = Math.round((answered.filter((id) => list.some((q) => q.id === id)).length / Math.max(list.length - 1, 1)) * 100);
  const ratio = debtRatio(form);

  // Brouillon : si la page est rechargée, on reprend où on en était (onglet seulement).
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || 'null');
      if (saved?.form && Array.isArray(saved.answered) && saved.answered.length) { setForm({ ...INIT, ...saved.form }); setAnswered(saved.answered); }
    } catch { /* stockage indisponible */ }
    setRestored(true);
  }, []);
  useEffect(() => {
    if (!restored || done) return;
    try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ form, answered })); } catch { /* ignore */ }
  }, [form, answered, restored, done]);

  // Cindy « écrit » un court instant avant chaque nouvelle question.
  useEffect(() => {
    if (!current || !restored) return;
    if (reduce) { setTyping(false); return; }
    setTyping(true);
    const lines = current.say(form).join(' ').length;
    const t = setTimeout(() => setTyping(false), Math.min(350 + lines * 6, 950));
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id, restored]);

  // Défile vers le dernier message.
  useEffect(() => {
    const el = threadRef.current; if (!el) return;
    requestAnimationFrame(() => el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' }));
  }, [answered.length, typing, merging, done, reduce]);

  // Sur téléphone, la barre d'action du site s'efface quand la conversation occupe l'écran.
  useEffect(() => {
    const el = rootRef.current; if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => document.body.classList.toggle('rac-chat-active', e.intersectionRatio > 0.35), { threshold: [0, 0.35, 0.6] });
    io.observe(el);
    return () => { io.disconnect(); document.body.classList.remove('rac-chat-active'); };
  }, []);

  // Turnstile chargé dès le début, prêt pour la fin.
  useEffect(() => {
    if (document.getElementById('cf-ts')) return;
    const s = document.createElement('script');
    s.id = 'cf-ts'; s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; s.async = true; s.defer = true;
    document.head.appendChild(s);
  }, []);

  function answer(q, overrides = {}) {
    const f = { ...form, ...overrides };
    if (Object.keys(overrides).length) setForm(f);
    // Prénom et nom : majuscule initiale (« julie » → « Julie », « le gall » → « Le Gall »).
    if (q.id === 'prenom' || q.id === 'nom') {
      f[q.field] = f[q.field].trim().replace(/\s+/g, ' ').replace(/(^|[\s'-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase());
      setForm((x) => ({ ...x, [q.field]: f[q.field] }));
    }
    let msg = q.check?.(f) || null;
    if (!msg && q.input === 'amounts') msg = q.fields.filter((x) => !x.when || x.when(f)).map((x) => (!x.optional && (n(f[x.key]) < (x.min || 1) || (x.max && n(f[x.key]) > x.max)) ? x.err : null)).find(Boolean) || null;
    if (!msg && q.field && ['cards', 'chips', 'consent'].includes(q.input) && !f[q.field]) msg = 'Choisissez une réponse.';
    if (msg) { setError(msg); return; }
    setError('');
    // Réponses qui n'ont plus lieu d'être (ex. « Non » à la LOA) : on vide les montants liés.
    if (q.id === 'loa' && f.has_loa === 'non') setForm((x) => ({ ...x, loa_mensualite: '', loa_duree: '', loa_total: '' }));
    if (q.id === 'loa_detail') setForm((x) => ({ ...x, loa_total: String(Math.round(n(x.loa_mensualite) * n(x.loa_duree))) }));
    if (q.id === 'paiement' && f.has_paiement === 'non') setForm((x) => ({ ...x, paiement_total: '' }));
    if (q.id === 'treso_envie' && f.treso_envie === 'non') setForm((x) => ({ ...x, somme_comp: '', type_projet: '' }));
    if (q.id === 'fichage' && f.fichage === 'non') setForm((x) => ({ ...x, raison_fichage: '' }));
    if (q.id === 'logement' && f.statut_logement !== 'Locataire') setForm((x) => ({ ...x, loyer: '' }));
    setAnswered((a) => [...a.filter((id) => id !== q.id), q.id]);
    if (!started.current) { started.current = true; rootRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
  }
  function back() {
    setError('');
    setAnswered((a) => {
      const shown = a.filter((id) => visible(form).some((q) => q.id === id));
      return a.filter((id) => id !== shown[shown.length - 1]);
    });
  }

  async function submit() {
    if (lock.current) return;
    const token = getTurnstileToken();
    if (!token) { setError('Vérification anti-robot en cours… réessayez dans un instant.'); return; }
    lock.current = true; setSending(true); setError(''); setMerging(true);
    const fd = buildPayload(form, debtConfig, token);
    rappelRef.current = { numero_dossier: fd.numero_dossier, date_creation: fd.date_creation, profil_prenom: fd.profil_prenom, profil_nom: fd.profil_nom, profil_tel: fd.profil_tel, profil_codetel: fd.profil_codetel, profil_mail: fd.profil_mail, profil_ville: fd.profil_ville, action: 'rappel_souhaite' };
    try {
      const [res] = await Promise.all([
        fetch(FORM_SUBMIT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fd) }),
        new Promise((r) => setTimeout(r, reduce ? 0 : 1600)), // le temps de voir les crédits se regrouper
      ]);
      const result = await submissionResult(res);
      rappelRef.current.numero_dossier = result.numero_dossier;
      rappelRef.current.rappelProof = result.rappelProof;
      try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      setDone({ segment: fd.Segment, prenom: form.prenom });
    } catch (e) {
      setMerging(false); resetTurnstile('orizia_submit');
      setError(e.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally { lock.current = false; setSending(false); }
  }

  const history = list.filter((q) => answered.includes(q.id));
  const facts = [
    ['Objectif', form.souhait && goalLabel(form.souhait)],
    ['Crédits', form.nb_immo + form.nb_conso > 0 && plural(form.nb_immo + form.nb_conso, 'crédit')],
    ['Mensualités', (n(form.mensualite_immo) + n(form.mensualite_conso)) > 0 && `${eur(n(form.mensualite_immo) + n(form.mensualite_conso))}/mois`],
    ['Reste à rembourser', (n(form.capital_immo) + n(form.capital_conso)) > 0 && eur(n(form.capital_immo) + n(form.capital_conso))],
    ['Trésorerie', n(form.somme_comp) > 0 && eur(form.somme_comp)],
    ['Revenus', n(form.revenus_nets) > 0 && `${eur(n(form.revenus_nets) + n(form.autres_revenus))}/mois`],
  ];

  return (
    <div className={`rc${answered.length === 0 && !done ? ' rc-intro' : ''}`} ref={rootRef}>
      <div className="rc-main">
        <header className="rc-head">
          <img src={AVATAR} alt="" width="40" height="40" className="rc-avatar" />
          <div className="rc-who"><b>Cindy Urbansky</b><small>Courtière · en ligne</small></div>
          <button type="button" className="rc-pill" onClick={() => setSheet(true)} aria-label="Voir mon dossier">
            {ratio !== null ? <span className={`rc-ratio ${ratio > 35 ? 'bad' : ratio > 30 ? 'warn' : 'ok'}`}>{ratio} %</span> : <span>Mon dossier</span>}
            <Ico name="chevron" size={16} />
          </button>
          <div className="rc-progress" role="progressbar" aria-label="Avancement" aria-valuemin={0} aria-valuemax={100} aria-valuenow={done ? 100 : progress}><i style={{ width: `${done ? 100 : progress}%` }} /></div>
        </header>

        <div className="rc-thread" ref={threadRef} aria-live="polite">
          {history.map((q) => (
            <div key={q.id} className="rc-turn">
              {q.say(form).map((line, i) => <Bubble key={i} who="her" instant>{line}</Bubble>)}
              {q.answer && <Bubble who="me" instant>{q.answer(form)}</Bubble>}
            </div>
          ))}
          {current && !done && (
            <div className="rc-turn">
              {typing ? <Typing /> : current.say(form).map((line, i) => <Bubble key={`${current.id}-${i}`} who="her" delay={i * 0.18}>{line}</Bubble>)}
              {current.id === 'envoi' && !typing && <Merge form={form} merging={merging} />}
            </div>
          )}
          {done && <Success done={done} racConfig={racConfig} rappelRef={rappelRef} />}
        </div>

        {!done && current && (
          <div className="rc-reply">
            <AnimatePresence mode="wait" initial={false}>
              {!typing && (
                <motion.div key={current.id} data-q={current.id} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: 8 }} transition={{ type: 'spring', stiffness: 420, damping: 34 }}>
                  <Reply q={current} form={form} set={set} answer={answer} submit={submit} sending={sending} />
                  <AnimatePresence>{error && <motion.p className="rc-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0, x: reduce ? 0 : [0, -6, 6, -4, 4, 0] }} exit={{ opacity: 0 }}>{error}</motion.p>}</AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
            {answered.length > 0 && !sending && <button type="button" className="rc-undo" onClick={back}><Ico name="back" size={15} />Modifier ma réponse précédente</button>}
          </div>
        )}
      </div>

      <Dossier facts={facts} ratio={ratio} debtConfig={debtConfig} open={sheet} onClose={() => setSheet(false)} />
    </div>
  );
}

// ─── Bulles ───────────────────────────────────────────────────
function Bubble({ who, children, delay = 0, instant }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={`rc-msg rc-${who}`} initial={instant || reduce ? false : { opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay, type: 'spring', stiffness: 380, damping: 30 }}>
      {children}
    </motion.div>
  );
}
function Typing() {
  return <div className="rc-msg rc-her rc-typing" aria-label="Cindy écrit"><i /><i /><i /></div>;
}

// ─── Zone de réponse ──────────────────────────────────────────
function Reply({ q, form, set, answer, submit, sending }) {
  // Place le curseur dans le premier champ, sans faire sauter la page.
  // Sur ordinateur seulement : sur téléphone, le clavier ne s'ouvre qu'au toucher.
  const box = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    box.current?.parentElement?.querySelector('input:not([type=hidden])')?.focus({ preventScroll: true });
  }, [q.id]);
  return <><span ref={box} hidden />{replyBody({ q, form, set, answer, submit, sending })}</>;
}

function replyBody({ q, form, set, answer, submit, sending }) {
  if (q.input === 'cards') return (
    <div className="rc-cards">
      {q.options.map((o) => (
        <motion.button whileTap={{ scale: 0.97 }} type="button" key={o.v} className={`rc-card${form[q.field] === o.v ? ' sel' : ''}`} onClick={() => answer(q, { [q.field]: o.v })}>
          <span className="rc-card-ic"><Ico name={o.icon} /></span><span><strong>{o.label}</strong><small>{o.sub}</small></span>
        </motion.button>
      ))}
    </div>
  );
  if (q.input === 'chips' || q.input === 'consent') return (
    <div className={`rc-chips${q.columns === 1 || q.input === 'consent' ? ' col' : ''}`}>
      {(q.input === 'consent' ? [{ v: 'oui', label: "J'accepte" }, { v: 'non', label: 'Je refuse' }] : q.options).map((o, i) => (
        <motion.button whileTap={{ scale: 0.95 }} type="button" key={o.v} className={`rc-chip${form[q.field] === o.v ? ' sel' : ''}`} style={{ animationDelay: `${i * 40}ms` }} onClick={() => answer(q, { [q.field]: o.v })}>{o.label}</motion.button>
      ))}
    </div>
  );
  if (q.input === 'counters') return (
    <div className="rc-stack">
      <Counter label="Crédits immobiliers" sub="Prêt immobilier, PTZ…" value={form.nb_immo} onChange={(v) => set('nb_immo', v)} />
      <Counter label="Crédits à la consommation" sub="Auto, travaux, renouvelable…" value={form.nb_conso} onChange={(v) => set('nb_conso', v)} />
      <Go onClick={() => answer(q)}>C'est tout</Go>
    </div>
  );
  if (q.input === 'amounts') {
    const fields = q.fields.filter((x) => !x.when || x.when(form));
    const loaTotal = q.id === 'loa_detail' && n(form.loa_mensualite) * n(form.loa_duree);
    return (
      <form noValidate className="rc-stack" onSubmit={(e) => { e.preventDefault(); answer(q); }}>
        <div className={`rc-amounts${fields.length > 1 ? ' two' : ''}`}>
          {fields.map((x, i) => <Amount key={x.key} field={x} value={form[x.key]} onChange={(v) => set(x.key, v)}  last={i === fields.length - 1} />)}
        </div>
        {loaTotal > 0 && <p className="rc-calc">Soit {eur(loaTotal)} au total</p>}
        <Go type="submit">{fields.every((x) => x.optional) && !fields.some((x) => n(form[x.key])) ? 'Aucune' : 'Valider'}</Go>
      </form>
    );
  }
  if (q.input === 'text') return (
    <form noValidate className="rc-inline" onSubmit={(e) => { e.preventDefault(); answer(q); }}>
      <label className="rc-sr" htmlFor={`rc-${q.id}`}>{q.placeholder}</label>
      <input id={`rc-${q.id}`} className="rc-input" type={q.type || 'text'} inputMode={q.inputMode} autoComplete={q.autoComplete} autoCapitalize={q.autoCapitalize} autoCorrect="off" spellCheck={false} enterKeyHint="next" placeholder={q.placeholder} value={form[q.field]} onChange={(e) => set(q.field, e.target.value)} />
      <Go type="submit" icon aria-label="Valider"><Ico name="send" size={18} /></Go>
    </form>
  );
  if (q.input === 'date') return <DateInput form={form} set={set} onSubmit={(iso) => answer(q, { date_naissance: iso })} />;
  if (q.input === 'phone') return <PhoneInput form={form} set={set} onSubmit={() => answer(q)} />;
  if (q.input === 'city') return <CityInput form={form} set={set} onPick={(ville, cp) => answer(q, { ville, cp })} />;
  if (q.input === 'send') return (
    <div className="rc-stack">
      <Turnstile action="orizia_submit" />
      <Go onClick={submit} disabled={sending} big>{sending ? 'Envoi en cours…' : <>Envoyer mon dossier <Ico name="send" size={18} /></>}</Go>
      <p className="rc-safe"><Ico name="lock" size={14} /> Données chiffrées, jamais revendues. Réponse sous 24 h.</p>
    </div>
  );
  return null;
}

function Go({ children, onClick, type = 'button', disabled, icon, big, ...rest }) {
  return <motion.button whileTap={{ scale: 0.96 }} type={type} className={`rc-go${icon ? ' icon' : ''}${big ? ' big' : ''}`} onClick={onClick} disabled={disabled} {...rest}>{children}</motion.button>;
}

function Counter({ label, sub, value, onChange }) {
  return (
    <div className={`rc-counter${value ? ' on' : ''}`}>
      <div><strong>{label}</strong><small>{sub}</small></div>
      <div className="rc-ctrl">
        <motion.button whileTap={{ scale: 0.85 }} type="button" onClick={() => onChange(Math.max(0, value - 1))} aria-label={`Retirer un ${label.toLowerCase()}`} disabled={!value}>−</motion.button>
        <motion.output key={value} initial={{ scale: 1.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 18 }} aria-live="polite">{value}</motion.output>
        <motion.button whileTap={{ scale: 0.85 }} type="button" onClick={() => onChange(Math.min(9, value + 1))} aria-label={`Ajouter un ${label.toLowerCase()}`}>+</motion.button>
      </div>
    </div>
  );
}

function Amount({ field, value, onChange, last }) {
  const [focus, setFocus] = useState(false);
  // Montants en euros entiers, avec les espaces des milliers pendant la frappe.
  const shown = n(value) ? nf.format(Math.round(n(value))) : '';
  return (
    <label className={`rc-amount${focus ? ' focus' : ''}`}>
      <span className="rc-amount-label">{field.label}{field.optional && <em> · facultatif</em>}</span>
      <span className="rc-amount-row">
        <input inputMode="numeric" enterKeyHint={last ? 'done' : 'next'} autoComplete="off" placeholder="0" value={shown} 
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 9))} />
        <span>{field.unit}</span>
      </span>
      {field.hint && <small>{field.hint}</small>}
    </label>
  );
}

// Date de naissance en trois cases (jour, mois, année) : le clavier numérique
// s'ouvre et on passe d'une case à l'autre automatiquement.
function DateInput({ form, set, onSubmit }) {
  const [y0, m0, d0] = (form.date_naissance || '--').split('-');
  const [d, setD] = useState(d0 || ''); const [m, setM] = useState(m0 || ''); const [y, setY] = useState(y0 || '');
  const refs = [useRef(null), useRef(null), useRef(null)];
  const iso = d.length && m.length && y.length === 4 ? `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}` : '';
  useEffect(() => { set('date_naissance', iso); }, [iso, set]);
  const box = (val, setter, max, i, label, ph) => (
    <label className="rc-date-box"><span className="rc-sr">{label}</span>
      <input ref={refs[i]} inputMode="numeric" pattern="[0-9]*" autoComplete={['bday-day', 'bday-month', 'bday-year'][i]} placeholder={ph} value={val} maxLength={max} 
        enterKeyHint={i === 2 ? 'done' : 'next'}
        onChange={(e) => { const v = e.target.value.replace(/\D/g, '').slice(0, max); setter(v); if (v.length === max && i < 2) refs[i + 1].current?.focus(); }}
        onKeyDown={(e) => { if (e.key === 'Backspace' && !val && i > 0) refs[i - 1].current?.focus(); }} />
    </label>
  );
  return (
    <form noValidate className="rc-inline" onSubmit={(e) => { e.preventDefault(); onSubmit(iso); }}>
      <div className="rc-date">{box(d, setD, 2, 0, 'Jour', 'JJ')}<span>/</span>{box(m, setM, 2, 1, 'Mois', 'MM')}<span>/</span>{box(y, setY, 4, 2, 'Année', 'AAAA')}</div>
      <Go type="submit" icon aria-label="Valider"><Ico name="send" size={18} /></Go>
    </form>
  );
}

function PhoneInput({ form, set, onSubmit }) {
  const foreign = form.tel_etranger === 'oui';
  const iso = form.code_pays.split('|')[0];
  return (
    <form noValidate className="rc-stack" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <div className="rc-inline">
        {foreign && (
          <label className="rc-country"><span className="rc-sr">Pays</span>
            <select value={form.code_pays} onChange={(e) => { set('code_pays', e.target.value); set('tel_inter', ''); }}>
              {countryOptions.map((o) => <option key={o.value + o.label} value={o.value} disabled={o.isDisabled}>{o.label}</option>)}
            </select>
          </label>
        )}
        <label className="rc-sr" htmlFor="rc-tel">Numéro de téléphone</label>
        <input id="rc-tel" className="rc-input" type="tel" inputMode="tel" autoComplete={foreign ? 'tel-national' : 'tel-national'} enterKeyHint="done" 
          placeholder={foreign ? 'Numéro sans indicatif' : '06 12 34 56 78'} value={foreign ? form.tel_inter : form.tel_fr}
          onChange={(e) => {
            let v = e.target.value;
            // Remplissage automatique au format international : on revient au format français.
            if (!foreign) v = v.replace(/^\+33\s?/, '0').replace(/^0033/, '0');
            set(foreign ? 'tel_inter' : 'tel_fr', new AsYouType(foreign ? iso : 'FR').input(v));
          }} />
        <Go type="submit" icon aria-label="Valider"><Ico name="send" size={18} /></Go>
      </div>
      <button type="button" className="rc-link" onClick={() => { set('tel_etranger', foreign ? 'non' : 'oui'); set(foreign ? 'tel_inter' : 'tel_fr', ''); }}>
        {foreign ? 'J\'ai un numéro français' : 'J\'ai un numéro étranger'}
      </button>
    </form>
  );
}

function CityInput({ form, set, onPick }) {
  const [text, setText] = useState(form.ville ? `${form.ville} (${form.cp})` : '');
  const [cities, setCities] = useState(null);
  // La liste des communes est lourde : chargée seulement à cette étape.
  useEffect(() => { let on = true; import('./citiesData').then((m) => on && setCities(m.citiesData)); return () => { on = false; }; }, []);
  const sugg = useMemo(() => {
    if (!cities || text.trim().length < 2) return [];
    const q = normalizeStr(text);
    return cities.filter((c) => normalizeStr(c[0]).startsWith(q) || c[1].startsWith(text.trim())).sort((a, b) => a[0].localeCompare(b[0])).slice(0, 6);
  }, [text, cities]);
  return (
    <div className="rc-stack">
      <label className="rc-sr" htmlFor="rc-ville">Ville ou code postal</label>
      <input id="rc-ville" className="rc-input" autoComplete="off" autoCapitalize="words" enterKeyHint="search" placeholder="Ville ou code postal" value={text} 
        onChange={(e) => { setText(e.target.value); if (form.ville) { set('ville', ''); set('cp', ''); } }} />
      {sugg.length > 0 && (
        <ul className="rc-sugg" role="listbox" aria-label="Villes proposées">
          {sugg.map((c) => <li key={c[0] + c[1]}><button type="button" role="option" aria-selected="false" onClick={() => { setText(`${c[0]} (${c[1]})`); onPick(c[0], c[1]); }}><strong>{c[0]}</strong><span>{c[1]}</span></button></li>)}
        </ul>
      )}
      {!cities && text.length > 1 && <p className="rc-hint">Chargement des villes…</p>}
    </div>
  );
}

function Turnstile({ action, onToken }) {
  const element = useRef(null);
  const [error, setError] = useState('');
  useEffect(() => mountTurnstile(element.current, action, TURNSTILE_KEY, onToken, setError), [action, onToken]);
  return (
    <div className="rc-turnstile" data-turnstile-action={action}>
      <div ref={element} />
      {error && <p className="rc-error" role="alert">{error} <button type="button" className="rc-link" onClick={() => resetTurnstile(action)}>Relancer</button></p>}
    </div>
  );
}

// ─── Ce que la personne paie chaque mois, puis tout réuni en un seul crédit ───
// Une barre = le total des mensualités ; chaque couleur = un type de crédit,
// d'une largeur proportionnelle à ce qu'il coûte par mois.
function Merge({ form, merging }) {
  const reduce = useReducedMotion();
  const segs = [
    { k: 'immo', label: form.nb_immo > 1 ? `${form.nb_immo} crédits immobiliers` : 'Crédit immobilier', v: n(form.mensualite_immo), c: '#6bb69b' },
    { k: 'conso', label: form.nb_conso > 1 ? `${form.nb_conso} crédits conso` : 'Crédit conso', v: n(form.mensualite_conso), c: '#b3ddcb' },
    { k: 'loa', label: 'LOA / LLD', v: n(form.loa_mensualite), c: '#e9d9a8' },
  ].filter((x) => x.v > 0);
  const total = segs.reduce((t, x) => t + x.v, 0);
  const count = form.nb_immo + form.nb_conso + (form.has_loa === 'oui' ? 1 : 0) + (form.has_paiement === 'oui' ? 1 : 0);
  const ease = [0.22, 0.61, 0.36, 1];
  return (
    <motion.div className="rc-merge" initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <div className="rc-merge-top">
        <span>{merging ? 'Après le regroupement' : `Aujourd'hui · ${count} prélèvement${count > 1 ? 's' : ''}`}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.b key={merging ? 'after' : 'before'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            {merging ? '1 seul prélèvement' : <>{eur(total)} <small>par mois</small></>}
          </motion.b>
        </AnimatePresence>
      </div>
      <motion.div className="rc-bar" animate={{ gap: merging ? 0 : 4 }} transition={{ duration: reduce ? 0 : 0.6, ease }} role="img"
        aria-label={merging ? 'Tous vos crédits réunis en une seule mensualité' : segs.map((x) => `${x.label} : ${eur(x.v)} par mois`).join(', ')}>
        {segs.map((x, i) => (
          <motion.span key={x.k} style={{ flexGrow: x.v, transformOrigin: 'left' }}
            initial={reduce ? false : { scaleX: 0 }} animate={{ scaleX: 1, backgroundColor: merging ? '#dff1e9' : x.c, borderRadius: merging ? 0 : 10 }}
            transition={{ scaleX: { delay: 0.5 + i * 0.15, duration: 0.6, ease }, default: { duration: reduce ? 0 : 0.6, ease } }}>
            {!merging && x.v / total > 0.22 && <em>{eur(x.v)}</em>}
          </motion.span>
        ))}
        <AnimatePresence>{merging && <motion.strong className="rc-bar-one" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : 0.5 }}>1 mensualité unique</motion.strong>}</AnimatePresence>
      </motion.div>
      <AnimatePresence mode="wait" initial={false}>
        {!merging ? (
          <motion.ul key="legend" className="rc-legend" exit={{ opacity: 0 }}>
            {segs.map((x) => <li key={x.k}><i style={{ background: x.c }} />{x.label}<b>{eur(x.v)}/mois</b></li>)}
            {form.has_paiement === 'oui' && <li><i className="hollow" />Paiements en plusieurs fois<b>{eur(form.paiement_total)} restants</b></li>}
            {n(form.somme_comp) > 0 && <li className="plus"><i className="plus">+</i>Pour votre projet{form.type_projet ? ` (${form.type_projet.toLowerCase()})` : ''}<b>{eur(form.somme_comp)}</b></li>}
          </motion.ul>
        ) : (
          <motion.p key="after" className="rc-merge-note" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : 0.4 }}>
            Vos {count} prélèvements{n(form.somme_comp) > 0 ? ' et votre projet' : ''} réunis en un seul crédit. Cindy calcule la nouvelle mensualité avec les banques partenaires.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Mon dossier (panneau sur ordinateur, tiroir sur téléphone) ─
function Dossier({ facts, ratio, debtConfig, open, onClose }) {
  const reduce = useReducedMotion();
  const max = Math.round((debtConfig?.maxRatio ?? 0.35) * 100);
  const content = (
    <>
      <h3>Votre dossier</h3>
      <p className="rc-dossier-sub">Il se complète au fil de la conversation.</p>
      <dl>{facts.map(([k, v]) => <div key={k} className={v ? '' : 'empty'}><dt>{k}</dt><dd>{v || 'à venir'}</dd></div>)}</dl>
      <div className="rc-gauge" hidden={ratio === null}>
        <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="26" fill="none" stroke="var(--oz-mint-soft, #dff1e9)" strokeWidth="8" />
          <motion.circle cx="32" cy="32" r="26" fill="none" strokeWidth="8" strokeLinecap="round" transform="rotate(-90 32 32)" strokeDasharray="163.4"
            animate={{ strokeDashoffset: 163.4 * (1 - Math.min(ratio ?? 0, 100) / 100), stroke: ratio > max ? '#b0473b' : ratio > max - 5 ? '#a87a2c' : '#3e7f68' }}
            initial={false} transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 60, damping: 16 }} />
        </svg>
        <div><b>{ratio ?? 0} %</b><small>Taux d'endettement estimé</small></div>
      </div>
    </>
  );
  return (
    <>
      <aside className="rc-dossier">{content}</aside>
      <AnimatePresence>
        {open && (
          <motion.div className="rc-sheet-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
            <motion.div className="rc-sheet" role="dialog" aria-modal="true" aria-label="Votre dossier" onClick={(e) => e.stopPropagation()}
              initial={reduce ? false : { y: '100%' }} animate={{ y: 0 }} exit={reduce ? { opacity: 0 } : { y: '100%' }} transition={{ type: 'spring', stiffness: 380, damping: 36 }}
              drag={reduce ? false : 'y'} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }} onDragEnd={(_, i) => { if (i.offset.y > 80) onClose(); }}>
              <span className="rc-grip" aria-hidden="true" />
              {content}
              <button type="button" className="rc-go" onClick={onClose}>Continuer la conversation</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Fin : rendez-vous, rappel ou message adapté ──────────────
function Success({ done, racConfig, rappelRef }) {
  const segType = getSegmentType(done.segment);
  const categoryConfig = segType === 'rdv' ? { mode: 'rdv' } : racConfig?.results?.[segType];
  const configured = { ...categoryConfig, ...(racConfig?.segments?.[done.segment] ?? {}) };
  const showAppointment = configured?.mode === 'rdv';
  const [token, setToken] = useState('');
  const [rappel, setRappel] = useState('');
  const [err, setErr] = useState('');
  const lock = useRef(false);
  async function demanderRappel() {
    if (!rappelRef.current || lock.current || rappel === 'ok') return;
    lock.current = true; setRappel('pending'); setErr('');
    try {
      const res = await fetch(FORM_RAPPEL_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...rappelRef.current, turnstileToken: token }) });
      await submissionResult(res); setRappel('ok');
    } catch (e) { setRappel(''); resetTurnstile('orizia_rappel'); setErr(e.message || 'Erreur lors de la demande de rappel.'); } finally { lock.current = false; }
  }
  return (
    <div className="rc-turn">
      <Bubble who="her" delay={0.1}>{showAppointment ? `C'est envoyé, ${done.prenom} ! 🎉 Votre profil me permet de vous proposer une solution adaptée.` : `Merci ${done.prenom}, j'ai bien reçu votre dossier.`}</Bubble>
      <Bubble who="her" delay={0.4}>{showAppointment ? 'Choisissez un créneau pour découvrir vos nouvelles mensualités, ou je vous rappelle si vous préférez.' : (configured?.body || 'Après analyse, il nous est malheureusement impossible de vous proposer une solution adaptée à ce jour.')}</Bubble>
      <Bubble who="her" delay={0.6}>Un e-mail de confirmation vient de vous être envoyé.</Bubble>
      {showAppointment ? (
        <motion.div className="rc-final" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <a className="rc-go big" href={RDV_URL} target="_blank" rel="noopener noreferrer"><Ico name="calendar" size={18} /> Choisir mon créneau</a>
          {rappel !== 'ok' ? (
            <>
              <Turnstile action="orizia_rappel" onToken={setToken} />
              <button type="button" className="rc-second" onClick={demanderRappel} disabled={rappel === 'pending' || !token}><Ico name="phone" size={17} />{rappel === 'pending' ? 'Envoi…' : 'Je préfère être rappelé(e)'}</button>
            </>
          ) : <p className="rc-ok">C'est noté ! Je vous rappelle très prochainement.</p>}
          {err && <p className="rc-error" role="alert">{err}</p>}
        </motion.div>
      ) : (
        <p className="rc-hint">Une question ? Écrivez-moi : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
      )}
    </div>
  );
}
