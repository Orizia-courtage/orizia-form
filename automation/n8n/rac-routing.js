// p is the webhook payload; classification stays consistent with the form.
// Missing/unknown segments never authorize a client email.
let routingSegment = typeof p.Segment === 'string' ? p.Segment.trim() : 'Autre';
if (p.BDF === true || p.BDF === 'true') routingSegment = 'BDF';
else if (['Commerçant, Artisan', 'Profession libérale', "Chef d'entreprise"].includes(p.type_profession)) {
  if (!/^TNS [1-3]$/.test(routingSegment)) routingSegment = 'TNS';
} else if (['Locataire', 'Hébergé à titre gratuit'].includes(p.Type)) routingSegment = 'LOC';
const sendClientEmail = /^(Investisseur 1|Client projet premium [12]|Trésorerie [1-7]|Pro Contraint [1-5])$/.test(routingSegment);
const potential = sendClientEmail ? 'GROS POTENTIEL' : 'PETIT POTENTIEL';
const safeSubject = value => String(value ?? '').replace(/[\r\n\u0000-\u001f\u007f]/g, ' ').slice(0,150);
const internalSubject = `[${potential}] ${safeSubject(routingSegment)} | ${safeSubject(p.profil_prenom)} ${safeSubject(p.profil_nom)} | ${safeSubject(p.numero_dossier)}`;
const routingEscape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const routingBanner = `<div style="font-family:Arial,sans-serif;padding:20px;background:#F5F3EF;border-left:5px solid ${sendClientEmail ? '#432828' : '#C9A96E'};margin-bottom:20px;color:#432828;"><p style="margin:0 0 8px;font-size:18px;font-weight:bold;">${potential}</p><p style="margin:0 0 8px;">Segment : <strong>${routingEscape(routingSegment)}</strong></p><p style="margin:0;">${sendClientEmail ? 'Le workflow envoie ensuite un email de confirmation au client.' : 'Aucun email automatique n’est envoyé au client. Dossier à examiner pour un éventuel appel.'}</p></div>`;
