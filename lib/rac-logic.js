// Logique métier du formulaire de regroupement de crédits (RAC), partagée par le
// formulaire conversation. Copie conforme de components/OriziaFormClassique.jsx :
// les données envoyées au CRM et la segmentation doivent rester identiques.

export const TNS_PROFESSIONS = ['Commerçant, Artisan', 'Profession libérale', "Chef d'entreprise"];
export const LOC_STATUTS     = ['Locataire', 'Hébergé à titre gratuit'];

// ─── LOGIQUE MÉTIER (inchangée) ───────────────────────────────
export function computeMAF(fd) {
  return (fd.tresorerie_souhaite||0)+(fd.crd_immo||0)+(fd.crd_conso||0)+(fd.total_loa||0)+(fd.total_remb_multiple||0);
}
export function computeEV(fd) {
  const rev = (fd.revenu_foyer||0)+(fd.revenu_autre||0);
  if (!rev) return 0;
  return ((fd.charge_loyer||0)+(fd.charge_autres||0)+(fd.mensu_loa||0))/rev;
}
export function determineSegment(fd, debtConfig) {
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
  if(CC===1&&crdConso<20000&&treso>20000&&maf>50000&&ev<debtConfig.maxRatio&&revFoyer>3000) return 'Trésorerie 3';
  if(CC===1&&crdConso>15000&&treso>5000&&maf>20000&&ev<debtConfig.maxRatio) return 'Trésorerie 4';
  if(CC===2&&crdConso<15000&&treso>20000&&ev<debtConfig.maxRatio&&revFoyer>3000) return 'Trésorerie 5';
  if(CC===1&&crdConso>25000&&treso>1000) return 'Trésorerie 6';
  if(CC===1&&crdConso<25000&&treso>1000) return 'Trésorerie 7';
  if(CC>=2&&crdConso<15000&&maf>25000&&totalCred===3) return 'Pro Contraint 1';
  if(CC>=2&&crdConso>15000&&maf>20000&&ev<debtConfig.targetRatio&&revFoyer<2500&&totalCred===3) return 'Pro Contraint 2';
  if(CC>=2&&crdConso>15000&&maf>20000&&ev>debtConfig.targetRatio&&totalCred===3) return 'Pro Contraint 3';
  if(CI===0&&CC>=2&&crdConso<15000&&maf<25000&&ev<debtConfig.maxRatio&&revFoyer>2500&&totalCred===3) return 'Pro Contraint 4';
  if(CI===0&&CC>=3&&crdConso<15000&&ev>debtConfig.maxRatio&&totalCred===3) return 'Pro Contraint 5';
  if(CI>=1&&CC===0&&maf>50000) return 'IR 1';
  if(CI===1&&CC===1&&crdConso<10000&&treso===0&&maf>50000) return 'IR 2';
  if(CI===1&&CC===1&&crdConso>=10000&&crdConso<=20000&&maf<25000) return 'Petit Pro 1';
  if(CI===0&&CC===2&&crdConso<15000&&maf<25000) return 'Petit Pro 2';
  if(CI===0&&CC>=3&&crdConso<15000&&maf<25000&&ev<debtConfig.maxRatio&&revFoyer<2500) return 'Petit Pro 3';
  if(CI===1&&CC>=2&&crdConso<15000&&maf<25000) return 'Petit Pro 4';
  if(CI===2&&CC===0&&maf>50000&&ev<debtConfig.maxRatio) return 'Client projet 1';
  if(CI===1&&CC===1&&crdConso>20000&&maf>25000) return 'Client projet 2';
  if(CI===1&&CC===1&&crdConso<15000&&treso>0&&maf>25000) return 'Client projet 3';
  if(CI===2&&CC===1&&crdConso>8000&&maf>25000) return 'Client projet 4';
  if(CI===1&&CC===1&&crdConso>10000&&maf>50000) return 'Client projet 5';
  if(CC>=2&&crdConso>15000&&maf>25000&&ev<debtConfig.targetRatio&&revFoyer>1600&&totalCred>=3) return 'Pro Consommateur 1';
  if(CI===1&&CC>=2&&crdConso<15000&&maf>25000&&totalCred>=3) return 'Pro Consommateur 2';
  if(CI===2&&CC===1&&crdConso<10000&&treso>1000&&maf>50000&&ev<debtConfig.targetRatio&&revFoyer>3000&&totalCred>=3) return 'Pro Consommateur 3';
  return 'Autre';
}
export function getSegmentType(seg) {
  if(seg==='BDF') return 'bdf';
  if(seg.startsWith('TNS')) return 'tns';
  if(seg==='LOC') return 'loc';
  if(seg.startsWith('Investisseur')||seg.startsWith('Client projet premium')||seg.startsWith('Trésorerie')||seg.startsWith('Pro Contraint')) return 'rdv';
  return 'other';
}
export const normalizeStr=(s)=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/-/g,' ').replace(/\s+/g,' ').trim();
export const fmtNum=(v)=>{const n=parseFloat(String(v||'').replace(/\s/g,'').replace(',','.'));return isNaN(n)?'':new Intl.NumberFormat('fr-FR').format(n);};
// A date of birth is a calendar date, not an instant in UTC. Using
// toISOString() on a date selected at local midnight shifts it back one day
// in positive time zones such as France.
export const formatDateOnly = (date) => date ? `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}` : '';
export const parseDateOnly = (value) => { const match = String(value ?? '').match(/^(\d{4})-(\d{2})-(\d{2})$/); return match ? new Date(Number(match[1]), Number(match[2])-1, Number(match[3])) : null; };

export async function submissionResult(res){
  const body=await res.json().catch(()=>null);
  if(!res.ok)throw new Error(res.status===429?'Trop de demandes. Veuillez patienter quelques minutes avant de réessayer.':body?.error||'Envoi indisponible. Veuillez réessayer.');
  return body;
}

/** Données envoyées à /api/orizia-form (même construction que l'ancien formulaire). */
export function buildPayload(form, debtConfig, turnstileToken) {
    const loa_total=form.has_loa==='oui'?(parseFloat(form.loa_mensualite)||0)*(parseInt(form.loa_duree)||0):0;
  const fd={
    date_creation:new Date().toISOString().split('T')[0],
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
    turnstileToken,
  };
  fd.MAF=computeMAF(fd); fd.EV=computeEV(fd);
  fd.Revenu=(fd.revenu_foyer||0)+(fd.revenu_autre||0);
  fd.Segment=determineSegment(fd, debtConfig);
  return fd;
}
