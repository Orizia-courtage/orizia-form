// p is the webhook payload; classification stays consistent with the form.
// Every completed form receives a client email: confirmation for high potential,
// neutral refusal for the other automated routing outcomes.
let routingSegment = typeof p.Segment === 'string' ? p.Segment.trim() : 'Autre';
if (p.BDF === true || p.BDF === 'true') routingSegment = 'BDF';
else if (['Commerçant, Artisan', 'Profession libérale', "Chef d'entreprise"].includes(p.type_profession)) {
  if (!/^TNS [1-3]$/.test(routingSegment)) routingSegment = 'TNS';
} else if (['Locataire', 'Hébergé à titre gratuit'].includes(p.Type)) routingSegment = 'LOC';
const sendClientEmail = /^(Investisseur 1|Client projet premium [12]|Trésorerie [1-7]|Pro Contraint [1-5])$/.test(routingSegment);
const potential = sendClientEmail ? 'GROS POTENTIEL' : 'PETIT POTENTIEL';
const refus_formulaire = sendClientEmail ? null : (
  routingSegment === 'BDF' ? 'Fichage Banque de France' :
  routingSegment === 'LOC' ? 'Statut locataire ou hébergé à titre gratuit' :
  /^TNS/.test(routingSegment) ? 'Statut professionnel indépendant (TNS)' :
  /^IR/.test(routingSegment) ? 'Critères financiers hors segment prioritaire' :
  'Hors segment prioritaire (' + routingSegment + ')'
);
const safeSubject = value => String(value ?? '').replace(/[\r\n\u0000-\u001f\u007f]/g, ' ').slice(0,150);
const internalSubject = `[${potential}] ${safeSubject(routingSegment)} | ${safeSubject(p.profil_prenom)} ${safeSubject(p.profil_nom)} | ${safeSubject(p.numero_dossier)}`;
const routingEscape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const routingBanner = `<div style="font-family:Arial,sans-serif;padding:20px;background:#f5f8f7;border-left:5px solid ${sendClientEmail ? '#6bb69b' : '#7f7f7f'};margin-bottom:20px;color:#1b1d1a;"><p style="margin:0 0 8px;font-size:18px;font-weight:bold;">${potential}</p><p style="margin:0 0 8px;">Segment : <strong>${routingEscape(routingSegment)}</strong></p>${refus_formulaire ? `<p style="margin:0 0 8px;">Motif interne : <strong>${routingEscape(refus_formulaire)}</strong></p>` : ''}<p style="margin:0;">${sendClientEmail ? 'Le workflow envoie ensuite un email de confirmation au client.' : 'Le workflow envoie ensuite un email de refus sans motif détaillé au client.'}</p></div>`;
