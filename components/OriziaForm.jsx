'use client';

import DatePicker, { registerLocale } from 'react-datepicker';
import { fr } from 'date-fns/locale/fr';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { isValidPhoneNumber, AsYouType } from 'libphonenumber-js';
import Select, { components as SelectComponents } from 'react-select';
import ReactCountryFlag from 'react-country-flag';
import { citiesData } from './citiesData';
import { PHONE_PATTERNS } from './PHONE_PATTERNS';
import { countryOptions } from './countryOptions';

registerLocale('fr', fr);

// ─── CONSTANTES ───────────────────────────────────────────────
const WEBHOOK_SUBMIT = 'https://hook.eu1.make.com/7er13ro11zpx7q8bblcag6m325fp8dqs';
const WEBHOOK_RAPPEL = 'https://hook.eu1.make.com/av4l1wfmfezsmgsz50c26w4jaoubrjqb';
const CONTACT_EMAIL  = 'cindy.urbansky@orizia-courtage.fr';
const TURNSTILE_KEY  = '0x4AAAAAACu8a5g2pFEtNqxD';
const TOTAL_STEPS    = 10;
const TNS_PROFESSIONS = ['Commerçant, Artisan', 'Profession libérale', "Chef d'entreprise"];
const LOC_STATUTS     = ['Locataire', 'Hébergé à titre gratuit'];

// ─── LOGIQUE MÉTIER (inchangée) ───────────────────────────────
function computeMAF(fd) {
  return (fd.tresorerie_souhaite||0)+(fd.crd_immo||0)+(fd.crd_conso||0)+(fd.total_loa||0)+(fd.total_remb_multiple||0);
}
function computeEV(fd) {
  const rev = (fd.revenu_foyer||0)+(fd.revenu_autre||0);
  if (!rev) return 0;
  return ((fd.charge_loyer||0)+(fd.charge_autres||0)+(fd.mensu_loa||0))/rev;
}
function determineSegment(fd) {
  const isTNS=TNS_PROFESSIONS.includes(fd.type_profession), isLOC=LOC_STATUTS.includes(fd.Type);
  const CI=fd.credit_immo||0, CC=fd.credit_conso||0, crdConso=fd.crd_conso||0, crdImmo=fd.crd_immo||0;
  const treso=fd.tresorerie_souhaite||0, maf=fd.MAF||0, ev=fd.EV||0, revFoyer=fd.revenu_foyer||0, totalCred=CI+CC;
  if(fd.BDF) return 'BDF';
  if(isTNS){if(crdConso>15000&&totalCred>=3)return 'TNS 1';if(crdConso>15000&&treso>0&&totalCred===2)return 'TNS 2';return 'TNS 3';}
  if(isLOC) return 'LOC';
  if(CI>=3&&revFoyer>1800) return 'Investisseur 1';
  if(CI===0&&CC===2&&crdConso>15000&&maf>20000) return 'Client projet premium 1';
  if(CI===0&&CC===2&&crdConso<25000&&treso>1000&&maf>25000) return 'Client projet premium 2';
  if(CI===0&&CC===0&&treso>40000) return 'Trésorerie 1';
  if(CI===1&&CC===0&&treso>20000&&crdImmo<50000) return 'Trésorerie 2';
  if(CC===1&&crdConso<20000&&treso>20000&&maf>50000&&ev<0.35&&revFoyer>3000) return 'Trésorerie 3';
  if(CC===1&&crdConso>15000&&treso>5000&&maf>20000&&ev<0.35) return 'Trésorerie 4';
  if(CC===2&&crdConso<15000&&treso>20000&&ev<0.35&&revFoyer>3000) return 'Trésorerie 5';
  if(CC===1&&crdConso>25000&&treso>1000) return 'Trésorerie 6';
  if(CC===1&&crdConso<25000&&treso>1000) return 'Trésorerie 7';
  if(CC>=2&&crdConso<15000&&maf>25000&&totalCred===3) return 'Pro Contraint 1';
  if(CC>=2&&crdConso>15000&&maf>20000&&ev<0.30&&revFoyer<2500&&totalCred===3) return 'Pro Contraint 2';
  if(CC>=2&&crdConso>15000&&maf>20000&&ev>0.30&&totalCred===3) return 'Pro Contraint 3';
  if(CI===0&&CC>=2&&crdConso<15000&&maf<25000&&ev<0.35&&revFoyer>2500&&totalCred===3) return 'Pro Contraint 4';
  if(CI===0&&CC>=3&&crdConso<15000&&ev>0.35&&totalCred===3) return 'Pro Contraint 5';
  if(CI>=1&&CC===0&&maf>50000) return 'IR 1';
  if(CI===1&&CC===1&&crdConso<10000&&treso===0&&maf>50000) return 'IR 2';
  if(CI===1&&CC===1&&crdConso>=10000&&crdConso<=20000&&maf<25000) return 'Petit Pro 1';
  if(CI===0&&CC===2&&crdConso<15000&&maf<25000) return 'Petit Pro 2';
  if(CI===0&&CC>=3&&crdConso<15000&&maf<25000&&ev<0.35&&revFoyer<2500) return 'Petit Pro 3';
  if(CI===1&&CC>=2&&crdConso<15000&&maf<25000) return 'Petit Pro 4';
  if(CI===2&&CC===0&&maf>50000&&ev<0.35) return 'Client projet 1';
  if(CI===1&&CC===1&&crdConso>20000&&maf>25000) return 'Client projet 2';
  if(CI===1&&CC===1&&crdConso<15000&&treso>0&&maf>25000) return 'Client projet 3';
  if(CI===2&&CC===1&&crdConso>8000&&maf>25000) return 'Client projet 4';
  if(CI===1&&CC===1&&crdConso>10000&&maf>50000) return 'Client projet 5';
  if(CC>=2&&crdConso>15000&&maf>25000&&ev<0.30&&revFoyer>1600&&totalCred>=3) return 'Pro Consommateur 1';
  if(CI===1&&CC>=2&&crdConso<15000&&maf>25000&&totalCred>=3) return 'Pro Consommateur 2';
  if(CI===2&&CC===1&&crdConso<10000&&treso>1000&&maf>50000&&ev<0.30&&revFoyer>3000&&totalCred>=3) return 'Pro Consommateur 3';
  return 'Autre';
}
function getSegmentType(seg) {
  if(seg==='BDF') return 'bdf';
  if(seg.startsWith('TNS')) return 'tns';
  if(seg==='LOC') return 'loc';
  if(seg.startsWith('Investisseur')||seg.startsWith('Client projet premium')||seg.startsWith('Trésorerie')||seg.startsWith('Pro Contraint')) return 'rdv';
  return 'other';
}
const genDossier=()=>{const d=new Date();return `DS${d.getFullYear().toString().slice(-2)}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}-${String(Math.floor(Math.random()*9999)).padStart(4,'0')}`;};
const normalizeStr=(s)=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/-/g,' ').replace(/\s+/g,' ').trim();
const fmtNum=(v)=>{const n=parseFloat(String(v||'').replace(/\s/g,'').replace(',','.'));return isNaN(n)?'':new Intl.NumberFormat('fr-FR').format(n);};

// ─── ÉTAT INITIAL ─────────────────────────────────────────────
const INIT = {
  souhait:'', statut_logement:'',
  nb_immo:0, nb_conso:0,
  mensualite_immo:'', capital_immo:'', mensualite_conso:'', capital_conso:'',
  has_loa:'', loa_mensualite:'', loa_duree:'', loa_total:'',
  has_paiement:'', paiement_total:'',
  somme_comp:'', type_projet:'',
  situation_familiale:'', profession:'',
  revenus_nets:'', autres_revenus:'',
  loyer:'', autres_charges:'',
  fichage:'', raison_fichage:'',
  civilite:'', prenom:'', nom:'', date_naissance:'', email:'',
  tel_etranger:'', tel_fr:'', tel_inter:'', code_pays:'FR|+33',
  ville:'', cp:'',
  optin_orizia:'', optin_partenaires:'',
};

// ─── MÉTADONNÉES ÉTAPES ───────────────────────────────────────
const STEPS = [
  { title:'Votre objectif',            emoji:'🎯', hint:'Votre réponse oriente immédiatement votre dossier.' },
  { title:'Vos crédits en cours',      emoji:'💳', hint:'Comptez tous vos crédits : immobilier, auto, travaux, renouvelable…' },
  { title:'Montants de vos crédits',   emoji:'💰', hint:'Ces chiffres permettent de calculer votre taux d\'endettement réel.' },
  { title:'LOA & paiements fractionnés', emoji:'🚗', hint:'Ces engagements sont inclus dans votre endettement total.' },
  { title:'Trésorerie complémentaire', emoji:'🚀', hint:'Optionnel — intégrez un projet à financer en même temps.' },
  { title:'Votre profil',              emoji:'👤', hint:'Logement, situation familiale et profession influencent les conditions.' },
  { title:'Fichage bancaire',          emoji:'🔍', hint:'Soyez honnête — un fichage oriente vers des solutions alternatives.' },
  { title:'Revenus & charges',         emoji:'📊', hint:'Ces données calculent votre reste à vivre et capacité réelle.' },
  { title:'Vos coordonnées',           emoji:'✉️', hint:'Pour vous envoyer la simulation et vous recontacter sous 24h.' },
  { title:'Localisation & consentements', emoji:'📍', hint:'Votre ville identifie les partenaires bancaires de votre zone.' },
];
const MSGS = ['Démarrons !','On avance !','Très bien !','Parfait !','Excellent !','À mi-chemin !','Presque là !','Encore un peu !','Dernière ligne droite !','Dernière étape !'];

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────
export default function OriziaForm() {
  const [step, setStep]     = useState(1);
  const [dir, setDir]       = useState(1);
  const [key, setKey]       = useState(0);
  const [form, setForm]     = useState(INIT);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone]     = useState(false);
  const [segment, setSegment] = useState('');
  const [rappelSent, setRappel] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [citySugg, setCitySugg]   = useState([]);
  const rappelRef = useRef(null);
  const topRef    = useRef(null);

  // Turnstile
  useEffect(() => {
    if (!document.getElementById('cf-ts')) {
      const s = document.createElement('script');
      s.id='cf-ts'; s.src='https://challenges.cloudflare.com/turnstile/v0/api.js';
      s.async=true; s.defer=true; document.head.appendChild(s);
    }
  }, []);

  // Autocomplete villes
  useEffect(() => {
    if (!cityInput) { setCitySugg([]); return; }
    const n = normalizeStr(cityInput);
    setCitySugg(citiesData.filter(c=>normalizeStr(c[0]).startsWith(n)||c[1].startsWith(cityInput)).sort((a,b)=>a[0].localeCompare(b[0])).slice(0,5));
  }, [cityInput]);

  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const clr = (k) => setErrors(e=>{const n={...e};delete n[k];return n;});

  // Taux d'endettement live
  const taux = useMemo(() => {
    const rev = (parseFloat(form.revenus_nets)||0)+(parseFloat(form.autres_revenus)||0);
    if (!rev) return null;
    const ch = (parseFloat(form.mensualite_immo)||0)+(parseFloat(form.mensualite_conso)||0)+(parseFloat(form.loa_mensualite)||0)+(parseFloat(form.loyer)||0)+(parseFloat(form.autres_charges)||0);
    return Math.round((ch/rev)*100);
  }, [form.revenus_nets,form.autres_revenus,form.mensualite_immo,form.mensualite_conso,form.loa_mensualite,form.loyer,form.autres_charges]);

  // ── Validation ──
  function validate(s, overrides = {}) {
    const f = { ...form, ...overrides };
    const e={};
    if(s===1&&!f.souhait) e.souhait=true;
    if(s===2&&f.nb_immo===0&&f.nb_conso===0) e.credits=true;
    if(s===3){
      if(f.nb_immo>0){if(!f.mensualite_immo||+f.mensualite_immo<100)e.mensualite_immo=true;if(!f.capital_immo||+f.capital_immo<5000)e.capital_immo=true;}
      if(f.nb_conso>0){if(!f.mensualite_conso||+f.mensualite_conso<30)e.mensualite_conso=true;if(!f.capital_conso||+f.capital_conso<500)e.capital_conso=true;}
    }
    if(s===4){
      if(!f.has_loa)e.has_loa=true;
      else if(f.has_loa==='oui'){if(!f.loa_mensualite||+f.loa_mensualite<1)e.loa_mensualite=true;if(!f.loa_duree||+f.loa_duree<1)e.loa_duree=true;}
      if(!f.has_paiement)e.has_paiement=true;
      else if(f.has_paiement==='oui'&&(!f.paiement_total||+f.paiement_total<1))e.paiement_total=true;
    }
    if(s===5&&+f.somme_comp>0&&!f.type_projet)e.type_projet=true;
    if(s===6){if(!f.statut_logement)e.statut_logement=true;if(!f.situation_familiale)e.situation_familiale=true;if(!f.profession)e.profession=true;}
    if(s===7){if(!f.fichage)e.fichage=true;else if(f.fichage==='oui'&&!f.raison_fichage)e.raison_fichage=true;}
    if(s===8){if(!f.revenus_nets||+f.revenus_nets<1)e.revenus_nets=true;if(LOC_STATUTS.includes(f.statut_logement)&&(!f.loyer||+f.loyer<100||+f.loyer>10000))e.loyer=true;}
    if(s===9){
      if(!f.civilite)e.civilite=true;
      if(!f.prenom.trim())e.prenom=true;
      if(!f.nom.trim())e.nom=true;
      if(!f.date_naissance){e.ddn=true;}else{const age=new Date().getFullYear()-new Date(f.date_naissance).getFullYear();if(age<18||age>89)e.ddn=true;}
      if(!f.email.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))e.email=true;
      if(!f.tel_etranger){e.tel_etranger=true;}
      else if(f.tel_etranger==='oui'){if(!f.tel_inter.trim()){e.tel_inter=true;}else{try{const[iso,dial]=f.code_pays.split('|');if(!isValidPhoneNumber(dial+f.tel_inter.replace(/\D/g,''),iso))e.tel_inter=true;}catch{e.tel_inter=true;}}}
      else if(f.tel_etranger==='non'){if(!/^[0-9]{10}$/.test(f.tel_fr.replace(/\s/g,'')))e.tel_fr=true;}
    }
    if(s===10){
      if(!f.ville.trim())e.ville=true;
      if(!f.optin_orizia)e.optin_orizia=true;
      if(!f.optin_partenaires)e.optin_partenaires=true;
      const tok=document.querySelector('[name="cf-turnstile-response"]')?.value||document.querySelector('input[name="cf-turnstile-response"]')?.value;
      if(!tok)e.bot=true;
    }
    setErrors(e);
    return Object.keys(e).length===0;
  }

  const isBack = useRef(false);

  function go(target, direction) {
    isBack.current = direction < 0;
    setDir(direction); setKey(k=>k+1); setStep(target);
    setTimeout(()=>topRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),30);
    // Réinitialise le flag après le délai des auto-avances
    setTimeout(()=>{ isBack.current = false; }, 600);
  }
  function next(overrides = {}) {
    if(!validate(step, overrides)){setTimeout(()=>document.querySelector('.f-err.show')?.scrollIntoView({behavior:'smooth',block:'center'}),50);return;}
    go(Math.min(step+1,TOTAL_STEPS),1);
  }
  function prev() { go(Math.max(step-1,1),-1); }

  // ── Soumission ──
  async function submit() {
    if(!validate(10)){setTimeout(()=>document.querySelector('.f-err.show')?.scrollIntoView({behavior:'smooth',block:'center'}),50);return;}
    setSending(true);
    const loa_total=form.has_loa==='oui'?(parseFloat(form.loa_mensualite)||0)*(parseInt(form.loa_duree)||0):0;
    const fd={
      numero_dossier:genDossier(), date_creation:new Date().toISOString().split('T')[0],
      Raison:form.souhait, Type:form.statut_logement,
      credit_immo:form.nb_immo, credit_conso:form.nb_conso, Total_credit:form.nb_immo+form.nb_conso,
      mensu_immo:parseFloat(form.mensualite_immo)||null, crd_immo:parseFloat(form.capital_immo)||null,
      mensu_conso:parseFloat(form.mensualite_conso)||null, crd_conso:parseFloat(form.capital_conso)||null,
      loa:form.has_loa==='oui', mensu_loa:parseFloat(form.loa_mensualite)||null,
      duree_loa:parseInt(form.loa_duree)||null, total_loa:loa_total||null,
      paiment_multiple:form.has_paiement==='oui', total_remb_multiple:parseFloat(form.paiement_total)||null,
      tresorerie_souhaite:parseFloat(form.somme_comp)||null, projet_treso:form.type_projet,
      situation_familial:form.situation_familiale, type_profession:form.profession,
      revenu_foyer:parseFloat(form.revenus_nets)||null, revenu_autre:parseFloat(form.autres_revenus)||null,
      charge_loyer:parseFloat(form.loyer)||null, charge_autres:parseFloat(form.autres_charges)||0,
      BDF:form.fichage==='oui', raison_BDF:form.raison_fichage,
      profil_genre:form.civilite, profil_nom:form.nom, profil_prenom:form.prenom,
      profil_date_naissance:form.date_naissance, profil_mail:form.email,
      profil_numeroFR:form.tel_etranger==='oui',
      profil_tel:form.tel_etranger==='oui'?form.tel_inter:form.tel_fr,
      profil_codetel:form.tel_etranger==='oui'?form.code_pays.split('|')[1]:'+33',
      profil_ville:form.ville, profil_CP:form.cp,
      'Opt-in_Orizia':form.optin_orizia==='oui', 'Opt-in_Paternaire':form.optin_partenaires==='oui',
    };
    fd.MAF=computeMAF(fd); fd.EV=computeEV(fd);
    fd.Revenu=(fd.revenu_foyer||0)+(fd.revenu_autre||0);
    fd.Segment=determineSegment(fd);
    rappelRef.current={numero_dossier:fd.numero_dossier,date_creation:fd.date_creation,profil_prenom:fd.profil_prenom,profil_nom:fd.profil_nom,profil_tel:fd.profil_tel,profil_codetel:fd.profil_codetel,profil_mail:fd.profil_mail,profil_ville:fd.profil_ville,action:'rappel_souhaite'};
    try{await fetch(WEBHOOK_SUBMIT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(fd)});setSegment(fd.Segment);setDone(true);}
    catch{alert("Une erreur est survenue. Veuillez réessayer.");}
    finally{setSending(false);}
  }
  async function demanderRappel() {
    if(!rappelRef.current)return;setRappel('pending');
    try{await fetch(WEBHOOK_RAPPEL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(rappelRef.current)});setRappel('ok');}
    catch{setRappel(false);alert("Erreur lors de la demande de rappel.");}
  }

  // ── Résumé ──
  const summary = useMemo(()=>{
    const items=[];
    if(form.souhait) items.push({icon:'🎯',v:form.souhait.split(' ').slice(0,2).join(' ')+'…'});
    const nb=form.nb_immo+form.nb_conso;
    if(nb>0) items.push({icon:'💳',v:`${nb} crédit${nb>1?'s':''}`});
    const tot=(parseFloat(form.mensualite_immo)||0)+(parseFloat(form.mensualite_conso)||0);
    if(tot>0) items.push({icon:'📉',v:`${fmtNum(tot)} €/mois`});
    if(form.profession) items.push({icon:'💼',v:form.profession.split(' ')[0]});
    if(taux!==null) items.push({icon:'📊',v:`${taux}%`,color:taux>35?'#dc2626':taux>25?'#d97706':'#16a34a'});
    return items;
  },[form,taux]);

  if(done) return <SuccessScreen segment={segment} segType={getSegmentType(segment)} rappelSent={rappelSent} onRappel={demanderRappel} prenom={form.prenom}/>;

  const meta = STEPS[step-1];
  const pct  = Math.round((step/TOTAL_STEPS)*100);

  return (
    <div className="f-wrap" ref={topRef}>
      {/* ── HEADER ── */}
      <div className="f-header">
        <div className="f-badge"><i className="fa-solid fa-shield-halved"></i> ORIZIA COURTAGE</div>
        <h1 className="f-title">Votre simulation de<br/>regroupement de crédits</h1>
        <div className="f-trust">
          <span><i className="fa-solid fa-lock"></i> Données sécurisées</span>
          <span><i className="fa-solid fa-check-circle"></i> Courtier ORIAS</span>
          <span><i className="fa-solid fa-star"></i> 100% gratuit</span>
        </div>
      </div>

      {/* ── PROGRESS ── */}
      <div className="f-prog-wrap">
        <div className="f-prog-top">
          <span className="f-prog-msg">{MSGS[step-1]}</span>
          <span className="f-prog-count">{step} / {TOTAL_STEPS}</span>
        </div>
        <div className="f-prog-bar">
          <div className="f-prog-fill" style={{width:`${pct}%`}}/>
        </div>
        <div className="f-prog-dots">
          {STEPS.map((_,i)=>(
            <div key={i} className={`f-dot${i<step?i===step-1?' f-dot--active':' f-dot--done':''}`}/>
          ))}
        </div>
      </div>

      {/* ── CARD ── */}
      <div className="f-card">
        {/* Card header */}
        <div className="f-card-top">
          <button className="f-back" onClick={prev} style={{visibility:step>1?'visible':'hidden'}} aria-label="Retour">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="f-card-meta">
            <span className="f-step-emoji">{meta.emoji}</span>
            <div>
              <div className="f-step-num">Étape {step} sur {TOTAL_STEPS}</div>
              <h2 className="f-step-title">{meta.title}</h2>
            </div>
          </div>
          <div style={{width:36}}/>
        </div>

        {/* Hint */}
        <div className="f-hint">
          <i className="fa-solid fa-circle-info"></i>
          <span>{meta.hint}</span>
        </div>

        {/* Contenu animé */}
        <div key={key} className={`f-body f-anim-${dir>0?'fwd':'bwd'}`}>
          {step===1  && <S1  form={form} set={set} clr={clr} errors={errors} next={next}/>}
          {step===2  && <S2  form={form} set={set} errors={errors} next={next}/>}
          {step===3  && <S3  form={form} set={set} clr={clr} errors={errors} next={next}/>}
          {step===4  && <S4  form={form} set={set} clr={clr} errors={errors} next={next} isBack={isBack}/>}
          {step===5  && <S5  form={form} set={set} clr={clr} errors={errors} next={next} isBack={isBack}/>}
          {step===6  && <S6  form={form} set={set} clr={clr} errors={errors} next={next} isBack={isBack}/>}
          {step===7  && <S7  form={form} set={set} clr={clr} errors={errors} next={next} isBack={isBack}/>}
          {step===8  && <S8  form={form} set={set} clr={clr} errors={errors} taux={taux} next={next}/>}
          {step===9  && <S9  form={form} set={set} clr={clr} errors={errors} next={next}/>}
          {step===10 && <S10 form={form} set={set} clr={clr} errors={errors} cityInput={cityInput} setCityInput={setCityInput} citySugg={citySugg} setCitySugg={setCitySugg} submit={submit} sending={sending}/>}
        </div>
      </div>

      {/* ── RÉSUMÉ FLOTTANT ── */}
      {summary.length>0 && (
        <div className="f-summary">
          {summary.map((s,i)=>(
            <span key={i} className="f-sum-tag" style={s.color?{color:s.color,borderColor:s.color+'33'}:{}}>
              {s.icon} {s.v}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── COMPOSANTS UTILITAIRES ───────────────────────────────────
function Err({show,children}){return <div className={`f-err${show?' show':''}`}><i className="fa-solid fa-triangle-exclamation"></i> {children}</div>;}

function Card({emoji,label,sub,selected,onClick}){
  return(
    <button type="button" className={`f-card-opt${selected?' sel':''}`} onClick={onClick}>
      <span className="f-card-opt-icon">{emoji}</span>
      <span className="f-card-opt-text"><strong>{label}</strong>{sub&&<span>{sub}</span>}</span>
      <span className="f-card-opt-check"><i className="fa-solid fa-check"></i></span>
    </button>
  );
}

function Chip({label,selected,onClick}){
  return <button type="button" className={`f-chip${selected?' sel':''}`} onClick={onClick}>{label}</button>;
}

function Ctr({icon,label,sub,value,onChange}){
  return(
    <div className={`f-ctr${value>0?' active':''}`}>
      <div className="f-ctr-info">
        <i className={icon}></i>
        <div><strong>{label}</strong>{sub&&<span>{sub}</span>}</div>
      </div>
      <div className="f-ctr-ctrl">
        <button type="button" className="f-ctr-btn" onClick={()=>onChange(Math.max(0,value-1))}>−</button>
        <span className="f-ctr-val">{value}</span>
        <button type="button" className="f-ctr-btn" onClick={()=>onChange(value+1)}>+</button>
      </div>
    </div>
  );
}

function Amt({id,label,sub,value,onChange,unit='€',error,errorMsg,readOnly,inputMode='decimal'}){
  const [disp,setDisp]=useState(value?fmtNum(value):'');
  return(
    <div className="f-field">
      {label&&<label className="f-label" htmlFor={id}>{label}</label>}
      {sub&&<span className="f-sub">{sub}</span>}
      <div className="f-input-u">
        <input id={id} type="text" inputMode={inputMode}
          className={`f-input${error?' f-input-err':''}`}
          placeholder="0"
          value={readOnly?(value?fmtNum(value):''):disp}
          onChange={readOnly?undefined:e=>{setDisp(e.target.value);onChange(e.target.value.replace(/\s/g,'').replace(',','.'));}}
          onBlur={readOnly?undefined:()=>{if(value)setDisp(fmtNum(value));}}
          onFocus={readOnly?undefined:()=>setDisp(value||'')}
          readOnly={readOnly}/>
        <span className="f-unit">{unit}</span>
      </div>
      {error&&errorMsg&&<Err show>{errorMsg}</Err>}
    </div>
  );
}

function Btn({label='Continuer',onClick,submit,sending}){
  return(
    <div className="f-nav">
      {submit
        ?<button type="button" className="f-btn-submit" onClick={submit} disabled={sending}>
          {sending?<><i className="fa-solid fa-spinner fa-spin"></i> Envoi…</>:<><i className="fa-solid fa-paper-plane"></i> Valider ma simulation</>}
        </button>
        :<button type="button" className="f-btn-next" onClick={onClick}>{label} <i className="fa-solid fa-arrow-right"></i></button>
      }
    </div>
  );
}

const DInput=React.forwardRef(({value,onClick,onChange,placeholder,className},ref)=>{
  const hc=e=>{let r=e.target.value.replace(/\D/g,'').slice(0,8);let f=r;if(r.length>=3&&r.length<=4)f=r.slice(0,2)+'/'+r.slice(2);else if(r.length>=5)f=r.slice(0,2)+'/'+r.slice(2,4)+'/'+r.slice(4);e.target.value=f;onChange(e);};
  return <input ref={ref} type="text" value={value} onClick={onClick} onChange={hc} placeholder={placeholder} className={className} maxLength={10} inputMode="numeric"/>;
});
DInput.displayName='DInput';

const FlagOpt=({data,...p})=>{const iso=data.value?.split('|')[0];return <SelectComponents.Option {...p}><span style={{display:'flex',alignItems:'center',gap:8}}>{iso&&iso!=='--'&&<ReactCountryFlag countryCode={iso} svg style={{width:'1.2em',height:'1.2em',borderRadius:2}}/>}{data.label}</span></SelectComponents.Option>;};
const FlagVal=({data,...p})=>{const iso=data.value?.split('|')[0];return <SelectComponents.SingleValue {...p}><span style={{display:'flex',alignItems:'center',gap:8}}>{iso&&iso!=='--'&&<ReactCountryFlag countryCode={iso} svg style={{width:'1.2em',height:'1.2em',borderRadius:2}}/>}{data.label}</span></SelectComponents.SingleValue>;};

// ─── ÉTAPES ───────────────────────────────────────────────────

// S1 — Objectif
function S1({form,set,clr,errors,next}){
  const opts=[
    {v:'Réduire vos mensualités',   e:'📉',s:'Alléger vos remboursements mensuels'},
    {v:'Renégocier vos crédits',    e:'🔄',s:'Obtenir un meilleur taux global'},
    {v:'Financer un nouveau projet',e:'🚀',s:'Intégrer une trésorerie complémentaire'},
  ];
  return(
    <div className="f-step">
      <div className="f-opts">
        {opts.map(o=><Card key={o.v} emoji={o.e} label={o.v} sub={o.s} selected={form.souhait===o.v} onClick={()=>{set('souhait',o.v);clr('souhait');setTimeout(()=>next({souhait:o.v}),280);}}/>)}
      </div>
      <Err show={errors.souhait}>Veuillez sélectionner votre objectif.</Err>
    </div>
  );
}

// S2 — Nombre de crédits
function S2({form,set,errors,next}){
  return(
    <div className="f-step">
      <Ctr icon="fa-solid fa-building-columns" label="Crédit(s) immobilier(s)" sub="Prêt immobilier, PTZ…" value={form.nb_immo} onChange={v=>set('nb_immo',v)}/>
      <Ctr icon="fa-solid fa-credit-card" label="Crédit(s) à la consommation" sub="Auto, travaux, renouvelable…" value={form.nb_conso} onChange={v=>set('nb_conso',v)}/>
      <Err show={errors.credits}>Veuillez indiquer au minimum 1 crédit en cours.</Err>
      <Btn onClick={next}/>
    </div>
  );
}

// S3 — Montants
function S3({form,set,clr,errors,next}){
  return(
    <div className="f-step">
      {form.nb_immo>0&&(
        <div className="f-block">
          <div className="f-block-title"><i className="fa-solid fa-building-columns"></i> Crédit{form.nb_immo>1?'s':''} immobilier{form.nb_immo>1?'s':''}</div>
          <div className="f-row2">
            <Amt id="mi" label="Mensualité(s)" unit="€/mois" placeholder="ex : 850" value={form.mensualite_immo} onChange={v=>{set('mensualite_immo',v);clr('mensualite_immo');}} error={errors.mensualite_immo} errorMsg="Minimum 100 €/mois."/>
            <Amt id="ci" label="Capital restant dû" unit="€" placeholder="ex : 120 000" value={form.capital_immo} onChange={v=>{set('capital_immo',v);clr('capital_immo');}} error={errors.capital_immo} errorMsg="Minimum 5 000 €."/>
          </div>
        </div>
      )}
      {form.nb_conso>0&&(
        <div className="f-block">
          <div className="f-block-title"><i className="fa-solid fa-credit-card"></i> Crédit{form.nb_conso>1?'s':''} conso</div>
          <div className="f-row2">
            <Amt id="mc" label="Mensualité(s)" unit="€/mois" placeholder="ex : 350" value={form.mensualite_conso} onChange={v=>{set('mensualite_conso',v);clr('mensualite_conso');}} error={errors.mensualite_conso} errorMsg="Minimum 30 €/mois."/>
            <Amt id="cc" label="Capital restant dû" unit="€" placeholder="ex : 15 000" value={form.capital_conso} onChange={v=>{set('capital_conso',v);clr('capital_conso');}} error={errors.capital_conso} errorMsg="Minimum 500 €."/>
          </div>
        </div>
      )}
      <Btn onClick={next}/>
    </div>
  );
}

// S4 — LOA / paiements
function S4({form,set,clr,errors,next,isBack}){
  const loaTotal=form.has_loa==='oui'?((parseFloat(form.loa_mensualite)||0)*(parseInt(form.loa_duree)||0)).toFixed(0):'';
  useEffect(()=>{if(form.has_loa==='oui')set('loa_total',loaTotal);},[form.loa_mensualite,form.loa_duree]);

  useEffect(()=>{
    if(isBack?.current) return;
    if(form.has_loa==='non'&&form.has_paiement==='non'){
      setTimeout(()=>next({has_loa:'non',has_paiement:'non'}),280);
    }
  },[form.has_loa,form.has_paiement]);

  return(
    <div className="f-step">
      <div className="f-field">
        <label className="f-label">Avez-vous une LOA / LLD en cours ?</label>
        <div className="f-chips">
          <Chip label="Oui" selected={form.has_loa==='oui'} onClick={()=>{set('has_loa','oui');clr('has_loa');}}/>
          <Chip label="Non" selected={form.has_loa==='non'} onClick={()=>{set('has_loa','non');clr('has_loa');}}/>
        </div>
        <Err show={errors.has_loa}>Veuillez répondre.</Err>
      </div>
      {form.has_loa==='oui'&&(
        <div className="f-cond">
          <div className="f-row2">
            <Amt id="lm" label="Mensualité LOA" unit="€/mois" value={form.loa_mensualite} onChange={v=>{set('loa_mensualite',v);clr('loa_mensualite');}} error={errors.loa_mensualite} errorMsg="Montant invalide."/>
            <Amt id="ld" label="Durée restante" unit="mois" inputMode="numeric" value={form.loa_duree} onChange={v=>{set('loa_duree',v);clr('loa_duree');}} error={errors.loa_duree} errorMsg="Durée invalide."/>
          </div>
          {loaTotal&&<div className="f-calc"><i className="fa-solid fa-calculator"></i> Total LOA : <strong>{fmtNum(loaTotal)} €</strong></div>}
        </div>
      )}
      <div className="f-field" style={{marginTop:20}}>
        <label className="f-label">Des paiements en plusieurs fois ?</label>
        <span className="f-sub">Achats fractionnés, Cofidis, Cetelem…</span>
        <div className="f-chips">
          <Chip label="Oui" selected={form.has_paiement==='oui'} onClick={()=>{set('has_paiement','oui');clr('has_paiement');}}/>
          <Chip label="Non" selected={form.has_paiement==='non'} onClick={()=>{set('has_paiement','non');clr('has_paiement');}}/>
        </div>
        <Err show={errors.has_paiement}>Veuillez répondre.</Err>
      </div>
      {form.has_paiement==='oui'&&(
        <div className="f-cond">
          <Amt id="pt" label="Total restant à rembourser" unit="€" value={form.paiement_total} onChange={v=>{set('paiement_total',v);clr('paiement_total');}} error={errors.paiement_total} errorMsg="Montant invalide."/>
        </div>
      )}
      {/* Bouton visible seulement si au moins un "oui" */}
      {(form.has_loa==='oui'||form.has_paiement==='oui')&&<Btn onClick={next}/>}
    </div>
  );
}

// S5 — Trésorerie
function S5({form,set,clr,errors,next,isBack}){
  const projets=[{v:'Travaux',e:'🔨'},{v:'Voiture',e:'🚗'},{v:'Loisirs / Voyage',e:'✈️'},{v:'Immobilier',e:'🏠'},{v:'Autre',e:'💡'}];

  useEffect(()=>{
    if(isBack?.current) return;
    if(+form.somme_comp>0&&form.type_projet){
      setTimeout(()=>next({somme_comp:form.somme_comp,type_projet:form.type_projet}),280);
    }
  },[form.type_projet]);

  return(
    <div className="f-step">
      <div className="f-field">
        <label className="f-label">Souhaitez-vous intégrer une trésorerie ? <span className="f-opt-badge">Optionnel</span></label>
        <span className="f-sub">Laissez vide si vous ne souhaitez pas de trésorerie supplémentaire.</span>
        <Amt id="sc" unit="€" value={form.somme_comp} onChange={v=>{set('somme_comp',v);if(!v)set('type_projet','');clr('type_projet');}}/>
      </div>
      {+form.somme_comp>0&&(
        <div className="f-cond">
          <label className="f-label">Pour quel projet ?</label>
          <div className="f-chips f-chips--wrap">{projets.map(p=><Chip key={p.v} label={`${p.e} ${p.v}`} selected={form.type_projet===p.v} onClick={()=>{set('type_projet',p.v);clr('type_projet');}}/>)}</div>
          <Err show={errors.type_projet}>Veuillez sélectionner un type de projet.</Err>
        </div>
      )}
      <Btn onClick={next} label={+form.somme_comp>0?'Continuer':'Passer cette étape'}/>
    </div>
  );
}

// S6 — Profil
function S6({form,set,clr,errors,next,isBack}){
  const sits=['Célibataire','Marié(e)','En couple','Pacsé(e)','Divorcé(e)','En instance de divorce','Veuf / Veuve'];
  const profs=['Salarié (non cadre)','Salarié (cadre)','Fonctionnaire','Commerçant, Artisan','Profession libérale',"Chef d'entreprise",'Retraité','Sans profession','Autre'];

  useEffect(()=>{
    if(isBack?.current) return;
    if(form.statut_logement&&form.situation_familiale&&form.profession){
      setTimeout(()=>next({statut_logement:form.statut_logement,situation_familiale:form.situation_familiale,profession:form.profession}),280);
    }
  },[form.statut_logement,form.situation_familiale,form.profession]);

  return(
    <div className="f-step">
      <div className="f-field">
        <label className="f-label">Situation de logement</label>
        <div className="f-opts">
          {[{v:'Propriétaire',e:'🏠',s:'Vous êtes propriétaire'},{v:'Locataire',e:'🔑',s:'Vous payez un loyer'},{v:'Hébergé à titre gratuit',e:'🤝',s:'Logé gratuitement'}].map(o=>(
            <Card key={o.v} emoji={o.e} label={o.v} sub={o.s} selected={form.statut_logement===o.v} onClick={()=>{set('statut_logement',o.v);clr('statut_logement');}}/>
          ))}
        </div>
        <Err show={errors.statut_logement}>Veuillez sélectionner votre situation.</Err>
      </div>
      <div className="f-field">
        <label className="f-label">Situation familiale</label>
        <div className="f-chips f-chips--wrap">{sits.map(s=><Chip key={s} label={s} selected={form.situation_familiale===s} onClick={()=>{set('situation_familiale',s);clr('situation_familiale');}}/>)}</div>
        <Err show={errors.situation_familiale}>Veuillez sélectionner votre situation familiale.</Err>
      </div>
      <div className="f-field">
        <label className="f-label">Votre profession</label>
        <div className="f-chips f-chips--wrap">{profs.map(p=><Chip key={p} label={p} selected={form.profession===p} onClick={()=>{set('profession',p);clr('profession');}}/>)}</div>
        <Err show={errors.profession}>Veuillez sélectionner votre profession.</Err>
      </div>
    </div>
  );
}

// S7 — Fichage
function S7({form,set,clr,errors,next,isBack}){
  const raisons=['Incidents de paiement','Dossier de surendettement','Découverts répétitifs','Autre'];

  useEffect(()=>{
    if(isBack?.current) return;
    if(form.fichage==='non'){
      setTimeout(()=>next({fichage:'non',raison_fichage:''}),280);
    }
  },[form.fichage]);

  useEffect(()=>{
    if(isBack?.current) return;
    if(form.fichage==='oui'&&form.raison_fichage){
      setTimeout(()=>next({fichage:'oui',raison_fichage:form.raison_fichage}),280);
    }
  },[form.raison_fichage]);

  return(
    <div className="f-step">
      <div className="f-field">
        <label className="f-label">Faites-vous l'objet d'un fichage bancaire (FICP / FCC) ?</label>
        <div className="f-chips">
          <Chip label="✅ Non" selected={form.fichage==='non'} onClick={()=>{set('fichage','non');set('raison_fichage','');clr('fichage');}}/>
          <Chip label="⚠️ Oui" selected={form.fichage==='oui'} onClick={()=>{set('fichage','oui');clr('fichage');}}/>
        </div>
        <Err show={errors.fichage}>Veuillez répondre à cette question.</Err>
      </div>
      {form.fichage==='oui'&&(
        <div className="f-cond">
          <label className="f-label">Raison du fichage</label>
          <div className="f-chips f-chips--wrap">{raisons.map(r=><Chip key={r} label={r} selected={form.raison_fichage===r} onClick={()=>{set('raison_fichage',r);clr('raison_fichage');}}/>)}</div>
          <Err show={errors.raison_fichage}>Veuillez sélectionner la raison.</Err>
        </div>
      )}
    </div>
  );
}

// S8 — Finances
function S8({form,set,clr,errors,taux,next}){
  const isLoc=LOC_STATUTS.includes(form.statut_logement);
  const tc=taux===null?null:taux>50?'#dc2626':taux>35?'#ea580c':taux>25?'#d97706':'#16a34a';
  return(
    <div className="f-step">
      <div className="f-block">
        <div className="f-block-title"><i className="fa-solid fa-arrow-trend-up"></i> Revenus</div>
        <div className="f-row2">
          <Amt id="rn" label="Revenus nets mensuels du foyer" unit="€/mois" sub="Net avant impôts" value={form.revenus_nets} onChange={v=>{set('revenus_nets',v);clr('revenus_nets');}} error={errors.revenus_nets} errorMsg="Veuillez saisir un revenu valide."/>
          <Amt id="ar" label="Autres revenus" unit="€/mois" sub="Pension, locatif… (optionnel)" value={form.autres_revenus} onChange={v=>set('autres_revenus',v)}/>
        </div>
      </div>
      <div className="f-block">
        <div className="f-block-title"><i className="fa-solid fa-arrow-trend-down"></i> Charges hors crédits</div>
        <div className="f-row2">
          {isLoc&&<Amt id="lo" label="Loyer mensuel" unit="€/mois" sub="Charges comprises" value={form.loyer} onChange={v=>{set('loyer',v);clr('loyer');}} error={errors.loyer} errorMsg="Loyer entre 100 € et 10 000 €."/>}
          <Amt id="ac" label="Autres charges récurrentes" unit="€/mois" sub="Pension alimentaire… (optionnel)" value={form.autres_charges} onChange={v=>set('autres_charges',v)}/>
        </div>
      </div>
      {taux!==null&&(
        <div className="f-taux" style={{borderColor:tc+'40',background:tc+'0a'}}>
          <div className="f-taux-hd">
            <span>Taux d'endettement estimé</span>
            <strong style={{color:tc}}>{taux}%</strong>
          </div>
          <div className="f-taux-track">
            <div className="f-taux-fill" style={{width:`${Math.min(taux,100)}%`,background:tc}}/>
            <div className="f-taux-mark" style={{left:'35%'}}><span>35%</span></div>
          </div>
          <p className="f-taux-msg">
            {taux>35?'⚠️ Au-dessus du seuil bancaire — le regroupement peut vous aider.':taux>25?'📊 Taux à surveiller — une optimisation est possible.':'✅ Taux sain — votre dossier est bien positionné.'}
          </p>
        </div>
      )}
      <Btn onClick={next}/>
    </div>
  );
}

// S9 — Coordonnées
function S9({form,set,clr,errors,next}){
  const telRef=useRef(null);
  const maxDate=new Date(); maxDate.setFullYear(maxDate.getFullYear()-18);
  const minDate=new Date(); minDate.setFullYear(minDate.getFullYear()-89);
  const selStyles={
    control:(b,s)=>({...b,border:s.isFocused?'2px solid var(--orizia-primary)':'2px solid rgba(26,61,53,.14)',borderRadius:10,fontFamily:"'DM Sans',sans-serif",fontSize:'.9rem',minHeight:'48px',boxShadow:s.isFocused?'0 0 0 3px rgba(45,106,95,.1)':'none','&:hover':{borderColor:'var(--orizia-primary)'}}),
    option:(b,s)=>({...b,backgroundColor:s.isSelected?'var(--orizia-accent)':s.isFocused?'var(--orizia-light)':'#fff',color:s.isSelected?'#fff':'var(--orizia-accent)',fontFamily:"'DM Sans',sans-serif",fontSize:'.88rem',cursor:'pointer'}),
    menu:(b)=>({...b,borderRadius:10,overflow:'hidden',boxShadow:'0 8px 24px rgba(26,61,53,.12)',border:'2px solid var(--orizia-primary)',zIndex:200}),
    container:(b)=>({...b,flex:1}),
    indicatorSeparator:()=>({display:'none'}),
  };
  return(
    <div className="f-step">
      <div className="f-field">
        <label className="f-label">Civilité</label>
        <div className="f-chips">
          {['Monsieur','Madame','Autre'].map(c=><Chip key={c} label={c==='Monsieur'?'M.':c==='Madame'?'Mme':'Autre'} selected={form.civilite===c} onClick={()=>{set('civilite',c);clr('civilite');}}/>)}
        </div>
        <Err show={errors.civilite}>Veuillez sélectionner votre civilité.</Err>
      </div>
      <div className="f-row2">
        <div className="f-field">
          <label className="f-label" htmlFor="prenom">Prénom</label>
          <input id="prenom" type="text" className={`f-input${errors.prenom?' f-input-err':''}`} placeholder="Votre prénom" value={form.prenom} onChange={e=>{set('prenom',e.target.value);clr('prenom');}}/>
          <Err show={errors.prenom}>Prénom obligatoire.</Err>
        </div>
        <div className="f-field">
          <label className="f-label" htmlFor="nom">Nom</label>
          <input id="nom" type="text" className={`f-input${errors.nom?' f-input-err':''}`} placeholder="Votre nom" value={form.nom} onChange={e=>{set('nom',e.target.value);clr('nom');}}/>
          <Err show={errors.nom}>Nom obligatoire.</Err>
        </div>
      </div>
      <div className="f-field">
        <label className="f-label">Date de naissance</label>
        <DatePicker selected={form.date_naissance?new Date(form.date_naissance):null}
          onChange={d=>{set('date_naissance',d?d.toISOString().split('T')[0]:'');clr('ddn');}}
          dateFormat="dd/MM/yyyy" showMonthDropdown showYearDropdown dropdownMode="select"
          locale="fr" placeholderText="JJ/MM/AAAA" maxDate={maxDate} minDate={minDate}
          customInput={<DInput className={`f-input${errors.ddn?' f-input-err':''}`}/>}
          wrapperClassName="f-dp-wrap" calendarClassName="f-dp"/>
        <Err show={errors.ddn}>Âge invalide (18–89 ans).</Err>
      </div>
      <div className="f-field">
        <label className="f-label" htmlFor="email">Adresse email</label>
        <input id="email" type="email" className={`f-input${errors.email?' f-input-err':''}`} placeholder="mon.nom@domaine.com" value={form.email} onChange={e=>{set('email',e.target.value);clr('email');}}/>
        <Err show={errors.email}>Adresse email invalide.</Err>
      </div>
      <div className="f-field">
        <label className="f-label">Numéro de téléphone étranger (hors France) ?</label>
        <div className="f-chips">
          <Chip label="Non — numéro français" selected={form.tel_etranger==='non'} onClick={()=>{set('tel_etranger','non');set('tel_inter','');clr('tel_etranger');}}/>
          <Chip label="Oui — numéro étranger" selected={form.tel_etranger==='oui'} onClick={()=>{set('tel_etranger','oui');set('tel_fr','');clr('tel_etranger');}}/>
        </div>
        <Err show={errors.tel_etranger}>Veuillez indiquer le type de numéro.</Err>
      </div>
      {form.tel_etranger==='non'&&(
        <div ref={telRef} className="f-cond">
          <label className="f-label">Numéro de téléphone</label>
          <span className="f-sub">10 chiffres — ex : 0612345678</span>
          <input type="text" className={`f-input${errors.tel_fr?' f-input-err':''}`} placeholder="0612345678" value={form.tel_fr}
            onChange={e=>{set('tel_fr',new AsYouType('FR').input(e.target.value));clr('tel_fr');}}/>
          <Err show={errors.tel_fr}>Numéro invalide (10 chiffres).</Err>
        </div>
      )}
      {form.tel_etranger==='oui'&&(
        <div ref={telRef} className="f-cond">
          <label className="f-label">Code pays & numéro</label>
          <div className="f-tel-row">
            <Select options={countryOptions} value={countryOptions.find(o=>o.value===form.code_pays)||null}
              onChange={opt=>{if(!opt||opt.isDisabled)return;set('code_pays',opt.value);set('tel_inter','');}}
              placeholder="🔍 Pays…" noOptionsMessage={()=>'Aucun pays trouvé'}
              isOptionDisabled={opt=>!!opt.isDisabled}
              components={{Option:FlagOpt,SingleValue:FlagVal}}
              menuPortalTarget={typeof document!=='undefined'?document.body:null}
              menuPosition="fixed" styles={{...selStyles,menuPortal:(b)=>({...b,zIndex:9999})}}/>
            <div style={{flex:1}}>
              <input type="text" className={`f-input${errors.tel_inter?' f-input-err':''}`} placeholder="Numéro sans indicatif" value={form.tel_inter}
                onChange={e=>{const[iso]=form.code_pays.split('|');set('tel_inter',new AsYouType(iso).input(e.target.value));clr('tel_inter');}}/>
            </div>
          </div>
          <Err show={errors.tel_inter}>Numéro invalide.</Err>
        </div>
      )}
      <Btn onClick={next}/>
    </div>
  );
}

// S10 — Localisation & consentements
function S10({form,set,clr,errors,cityInput,setCityInput,citySugg,setCitySugg,submit,sending}){
  const tsRef=useRef(null); const wid=useRef(null);
  useEffect(()=>{
    const render=()=>{if(tsRef.current&&window.turnstile&&!wid.current){wid.current=window.turnstile.render(tsRef.current,{sitekey:TURNSTILE_KEY,theme:'light'});}};
    if(window.turnstile){render();}else{const iv=setInterval(()=>{if(window.turnstile){clearInterval(iv);render();}},100);return()=>clearInterval(iv);}
    return()=>{if(wid.current&&window.turnstile){window.turnstile.remove(wid.current);wid.current=null;}};
  },[]);
  function selCity(c){setCityInput(`${c[0]} (${c[1]})`);set('ville',c[0]);set('cp',c[1]);setCitySugg([]);clr('ville');}
  return(
    <div className="f-step">
      <div className="f-field">
        <label className="f-label" htmlFor="ville">Votre ville ou code postal</label>
        <div className="f-ac">
          <input id="ville" type="text" className={`f-input${errors.ville?' f-input-err':''}`} placeholder="Commencez à taper…" value={cityInput}
            onChange={e=>{setCityInput(e.target.value);if(!e.target.value){set('ville','');set('cp','');}clr('ville');}} autoComplete="off"/>
          {citySugg.length>0&&(
            <div className="f-ac-list">
              {citySugg.map((c,i)=><div key={i} className="f-ac-item" onClick={()=>selCity(c)}><strong>{c[0]}</strong> <span>({c[1]})</span></div>)}
            </div>
          )}
        </div>
        <Err show={errors.ville}>Veuillez sélectionner une ville dans la liste.</Err>
      </div>
      <div className="f-divider"><span>Consentements</span></div>
      <div className="f-optin">
        <p>J'accepte de recevoir des appels, emails et SMS sur des offres de solutions de financement et d'assurance proposées par <strong>Orizia Courtage</strong>.</p>
        <div className="f-chips">
          <Chip label="✅ J'accepte" selected={form.optin_orizia==='oui'} onClick={()=>{set('optin_orizia','oui');clr('optin_orizia');}}/>
          <Chip label="❌ Je refuse" selected={form.optin_orizia==='non'} onClick={()=>{set('optin_orizia','non');clr('optin_orizia');}}/>
        </div>
        <Err show={errors.optin_orizia}>Veuillez accepter ou refuser ce consentement.</Err>
      </div>
      <div className="f-optin">
        <p>J'accepte de recevoir des offres personnalisées de la part des <strong>partenaires d'Orizia Courtage</strong> par téléphone, email et SMS.</p>
        <div className="f-chips">
          <Chip label="✅ J'accepte" selected={form.optin_partenaires==='oui'} onClick={()=>{set('optin_partenaires','oui');clr('optin_partenaires');}}/>
          <Chip label="❌ Je refuse" selected={form.optin_partenaires==='non'} onClick={()=>{set('optin_partenaires','non');clr('optin_partenaires');}}/>
        </div>
        <Err show={errors.optin_partenaires}>Veuillez accepter ou refuser ce consentement.</Err>
      </div>
      <div style={{display:'flex',justifyContent:'center',margin:'20px 0 8px'}}><div ref={tsRef}/></div>
      <Err show={errors.bot}>Veuillez valider que vous n'êtes pas un robot.</Err>
      <Btn submit={submit} sending={sending}/>
    </div>
  );
}

// ─── ÉCRAN DE RÉSULTAT ────────────────────────────────────────
function SuccessScreen({segment,segType,rappelSent,onRappel,prenom}){
  const h={rdv:{icon:'fa-solid fa-check',title:'Dossier enregistré !',color:'#16a34a'},bdf:{icon:'fa-solid fa-triangle-exclamation',title:'Dossier bien reçu',color:'#f59e0b'},tns:{icon:'fa-solid fa-circle-info',title:'Dossier bien reçu',color:'#3b82f6'},loc:{icon:'fa-solid fa-circle-info',title:'Dossier bien reçu',color:'#3b82f6'},other:{icon:'fa-solid fa-circle-info',title:'Dossier bien reçu',color:'#3b82f6'}}[segType]||{icon:'fa-solid fa-circle-info',title:'Dossier bien reçu',color:'#3b82f6'};
  return(
    <div className="f-success">
      <div className="f-success-hero">
        <div className="f-success-ico"><i className={h.icon} style={{color:h.color}}></i></div>
        <h2>{h.title}</h2>
        <p>Vos informations ont été reçues et sécurisées.<br/><strong style={{color:'#fff'}}>Un e-mail de confirmation vient de vous être envoyé.</strong></p>
      </div>
      {segType==='rdv'&&(
        <div className="f-success-body">
          <p className="f-success-cta">Votre profil nous permet de vous proposer une solution adaptée.<br/><strong>Découvrez vos nouvelles mensualités — Étude 100% gratuite & sans engagement</strong></p>
          <a href="https://zcal.co/cindyurbansky/regroupement-credit" target="_blank" rel="noopener noreferrer" className="f-cta-primary"><i className="fa-regular fa-calendar-check"></i> Choisir mon créneau de rendez-vous</a>
          {rappelSent!=='ok'
            ?<button className="f-cta-secondary" onClick={onRappel} disabled={rappelSent==='pending'}>{rappelSent==='pending'?<><i className="fa-solid fa-spinner fa-spin"></i> Envoi…</>:<><i className="fa-solid fa-phone-volume"></i> Je préfère être rappelé(e)</>}</button>
            :<div className="f-rappel-ok"><i className="fa-solid fa-circle-check" style={{color:'#16a34a',marginRight:6}}></i><strong>C'est noté !</strong> Je vous rappelle très prochainement.</div>
          }
        </div>
      )}
      {segType==='bdf'&&<div className="f-msg"><div className="f-msg-ico">🙏</div><p>Merci {prenom?prenom+' ':''}d'avoir pris le temps de compléter ce formulaire.</p><p>Malheureusement, nous ne sommes pas en mesure de traiter les dossiers présentant un fichage bancaire (FICP / FCC).</p><p>Nous vous souhaitons de trouver rapidement la solution qui vous convient.</p></div>}
      {segType==='tns'&&<div className="f-msg"><div className="f-msg-ico">🚀</div><p>Merci {prenom?prenom+' ':''}pour votre confiance !</p><p>Votre profil TNS présente des spécificités que nous n'intégrons pas encore dans notre processus standard. N'hésitez pas à me contacter : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p></div>}
      {(segType==='loc'||segType==='other')&&<div className="f-msg"><div className="f-msg-ico">💬</div><p>Merci {prenom?prenom+' ':''}d'avoir pris le temps de remplir ce formulaire.</p><p>Après analyse, il nous est malheureusement impossible de vous proposer une solution adaptée à ce jour. Pour toute question : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p></div>}
    </div>
  );
}
