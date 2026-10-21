// Function body shared by the n8n email expression and the local preview.
// p contains the validated document from "Preparer rac".
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const base = 'https://www.orizia-courtage.fr';
const logo = base + '/_next/image?url=%2Fimages%2FOrizia_logo.webp&amp;w=384&amp;q=75';
const signature = base + '/images/cindy-signature-banner.jpg';
const dossier = esc(p.numero_dossier);
const prenom = esc(p.profil_prenom);
const objectif = esc(p.Raison || 'Regroupement de crédits');
return `<!doctype html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">
<title>Votre demande est entre de bonnes mains | Orizia Courtage</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}table{border-collapse:collapse}
img{border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}
a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}
@media only screen and (max-width:620px){
 .outer{padding:16px 8px!important}.pad{padding-left:24px!important;padding-right:24px!important}
 .headline{font-size:30px!important;line-height:36px!important}.brand{width:150px!important;height:auto!important}
 .signature-photo{width:72px!important;height:90px!important}.signature-gap{width:16px!important}
 .signature-name{font-size:20px!important}.contact-link{font-size:13px!important;word-break:break-word!important}
 .button{display:block!important;text-align:center!important}.footer{padding-left:16px!important;padding-right:16px!important}
}
</style>
</head>
<body style="margin:0;padding:0;background-color:#f5f8f7;font-family:Arial,Helvetica,sans-serif;color:#1b1d1a;">
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">Merci ${prenom}. Votre demande est enregistrée : découvrez les prochaines étapes avec Cindy, votre interlocutrice Orizia.</div>
<table role="presentation" width="100%" bgcolor="#f5f8f7" cellpadding="0" cellspacing="0" border="0"><tr><td class="outer" align="center" style="padding:32px 16px;">
<!--[if mso]><table role="presentation" width="600" align="center"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#FFFFFF;">
<tr><td class="pad" align="center" bgcolor="#FFFFFF" style="padding:28px 40px 24px;border-top:4px solid #6bb69b;">
 <a href="${base}/" style="text-decoration:none;"><img class="brand" src="${logo}" width="176" height="102" alt="Orizia Courtage — Financement et patrimoine" style="display:block;width:176px;height:102px;color:#432828;font-size:14px;"></a>
</td></tr>
<tr><td class="pad" bgcolor="#1b1d1a" style="padding:32px 40px 36px;background-color:#1b1d1a;">
 <p style="margin:0 0 16px;font-size:11px;line-height:16px;font-weight:bold;letter-spacing:2px;color:#b3ddcb;text-transform:uppercase;">VOTRE DEMANDE EST ENREGISTRÉE</p>
 <h1 class="headline" style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:36px;line-height:42px;font-weight:normal;color:#FFFFFF;">Votre projet avance.<br>Faisons le point ensemble.</h1>
 <p style="margin:0;font-size:16px;line-height:25px;color:#dcece6;">Une première étape franchie, et une interlocutrice<br class="desktop-break"> à vos côtés pour la suite.</p>
</td></tr>
<tr><td class="pad" bgcolor="#edf5f1" style="padding:16px 40px;color:#1b1d1a;">
 <p style="margin:0;font-size:12px;line-height:20px;">VOTRE RÉFÉRENCE <strong style="display:block;font-size:16px;letter-spacing:1px;overflow-wrap:anywhere;word-break:break-word;">${dossier}</strong></p>
</td></tr>
<tr><td class="pad" style="padding:32px 40px 24px;">
 <p style="margin:0 0 16px;font-size:16px;line-height:26px;">Bonjour ${prenom},</p>
 <p style="margin:0 0 16px;font-size:16px;line-height:26px;color:#514B47;">Merci de m’avoir confié votre demande de regroupement de crédits. J’ai bien reçu les informations de votre formulaire et je vais prendre le temps d’étudier votre situation.</p>
 <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#f5f8f7" style="padding:16px 20px;border-left:3px solid #6bb69b;">
 <p style="margin:0 0 4px;font-size:11px;line-height:16px;font-weight:bold;letter-spacing:1px;color:#58756a;">VOTRE OBJECTIF</p>
  <p style="margin:0;font-size:16px;line-height:24px;color:#1b1d1a;overflow-wrap:anywhere;word-break:break-word;">${objectif}</p>
 </td></tr></table>
</td></tr>
<tr><td class="pad" style="padding:0 40px 28px;">
 <h2 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:25px;line-height:32px;color:#432828;">Et maintenant ?</h2>
 <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr><td width="36" valign="top" style="padding:0 12px 18px 0;color:#8A6633;font-size:20px;line-height:24px;font-family:Georgia,serif;">01</td><td valign="top" style="padding-bottom:18px;"><p style="margin:0 0 4px;font-weight:bold;font-size:15px;line-height:23px;color:#432828;">J’étudie votre demande</p><p style="margin:0;font-size:14px;line-height:22px;color:#625B56;">Je fais le point sur vos informations et sur votre objectif.</p></td></tr>
  <tr><td width="36" valign="top" style="padding:0 12px 18px 0;color:#8A6633;font-size:20px;line-height:24px;font-family:Georgia,serif;">02</td><td valign="top" style="padding-bottom:18px;"><p style="margin:0 0 4px;font-weight:bold;font-size:15px;line-height:23px;color:#432828;">Nous échangeons sur votre projet</p><p style="margin:0;font-size:14px;line-height:22px;color:#625B56;">Je reviens vers vous pour préciser votre besoin et répondre à vos questions.</p></td></tr>
  <tr><td width="36" valign="top" style="padding:0 12px 0 0;color:#8A6633;font-size:20px;line-height:24px;font-family:Georgia,serif;">03</td><td valign="top"><p style="margin:0 0 4px;font-weight:bold;font-size:15px;line-height:23px;color:#432828;">Je vous explique les suites possibles</p><p style="margin:0;font-size:14px;line-height:22px;color:#625B56;">Selon votre situation, nous examinons les possibilités d’accompagnement et les prochaines démarches.</p></td></tr>
 </table>
</td></tr>
<tr><td class="pad" bgcolor="#edf5f1" style="padding:24px 40px;">
 <p style="margin:0 0 8px;font-size:16px;line-height:24px;font-weight:bold;color:#1b1d1a;">Pour reconnaître mon appel</p>
 <p style="margin:0 0 18px;font-size:14px;line-height:22px;color:#434844;">Enregistrez mon numéro : <a href="tel:+33777259706" style="color:#1b1d1a;font-weight:bold;text-decoration:none;white-space:nowrap;">07 77 25 97 06</a>.</p>
 <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#6bb69b" style="border-radius:6px;text-align:center;mso-padding-alt:15px 24px;">
  <a class="button" href="${base}/cindy-urbansky.vcf" style="display:inline-block;padding:15px 24px;border:1px solid #6bb69b;border-radius:6px;font-size:15px;line-height:20px;font-weight:bold;text-decoration:none;color:#1b1d1a;background-color:#6bb69b;mso-padding-alt:0;">Ajouter Cindy à mes contacts</a>
 </td></tr></table>
 <p style="margin:12px 0 0;font-size:12px;line-height:19px;color:#625B56;">Sur votre téléphone, ouvrez la fiche contact puis enregistrez-la dans votre répertoire.</p>
</td></tr>
<tr><td class="pad" style="padding:28px 40px 32px;">
 <p style="margin:0 0 24px;font-size:15px;line-height:24px;color:#514B47;">Une précision à ajouter ? Répondez simplement à cet email ou appelez-moi directement.<br>Au plaisir d’échanger avec vous,</p>
 <img src="${signature}" width="480" alt="Cindy Urbansky — Orizia Courtage" style="display:block;width:100%;max-width:480px;height:auto;border:0;">
 <p style="margin:16px 0 0;font-size:13px;line-height:21px;color:#434844;"><strong>Cindy URBANSKY</strong><br>Fondatrice &amp; Gérante<br>Courtier indépendant en crédit, assurance &amp; patrimoine<br><a href="tel:+33777259706" style="color:#1b1d1a;text-decoration:none;">07 77 25 97 06</a> · <a href="mailto:cindy.urbansky@orizia-courtage.fr" style="color:#1b1d1a;text-decoration:underline;">cindy.urbansky@orizia-courtage.fr</a></p>
</td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;"><tr><td class="footer" align="center" style="padding:22px 36px 8px;">
 <p style="margin:0 0 10px;font-size:12px;line-height:19px;color:#6C625A;">Cet email confirme la réception de votre formulaire.<br>Il ne constitue pas un accord de financement.</p>
 <p style="margin:0 0 10px;font-size:12px;line-height:19px;color:#6C625A;"><a href="${base}/" style="color:#432828;text-decoration:underline;">Orizia Courtage</a>&nbsp; · &nbsp;<a href="${base}/confidentialite" style="color:#432828;text-decoration:underline;">Confidentialité</a></p>
 <p style="margin:0;font-size:11px;line-height:18px;color:#6C625A;">Vous n’êtes pas à l’origine de cette demande ?<br><a href="mailto:cindy.urbansky@orizia-courtage.fr" style="color:#432828;text-decoration:underline;">Prévenez-moi simplement.</a></p>
</td></tr></table>
</td></tr></table>
</body></html>`;
