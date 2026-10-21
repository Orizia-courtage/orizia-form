// Client-facing refusal email. p is the validated RAC form payload.
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const base = 'https://www.orizia-courtage.fr';
const prenom = esc(p.profil_prenom);
const dossier = esc(p.numero_dossier);
const logo = `${base}/_next/image?url=%2Fimages%2FOrizia_logo.webp&amp;w=384&amp;q=75`;
const signature = `${base}/images/cindy-signature-banner.jpg`;
return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><title>Votre demande de regroupement de crédits | Orizia Courtage</title></head>
<body style="margin:0;padding:0;background:#f5f8f7;font-family:Arial,Helvetica,sans-serif;color:#1b1d1a;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;">Un point sur votre demande de regroupement de crédits.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f8f7;"><tr><td align="center" style="padding:32px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;">
<tr><td align="center" style="padding:26px 32px 22px;border-top:5px solid #6bb69b;"><a href="${base}/"><img src="${logo}" width="150" alt="Orizia Courtage" style="display:block;border:0;width:150px;height:auto;"></a></td></tr>
<tr><td style="padding:34px 40px;background:#1b1d1a;color:#ffffff;"><p style="margin:0 0 12px;color:#b3ddcb;font-size:11px;font-weight:bold;letter-spacing:1.6px;">REGROUPEMENT DE CRÉDITS</p><h1 style="margin:0;font-size:30px;line-height:38px;font-weight:700;">Un point sur votre demande</h1></td></tr>
<tr><td style="padding:34px 40px 18px;"><p style="margin:0 0 18px;font-size:16px;line-height:25px;">Bonjour ${prenom},</p><p style="margin:0 0 18px;font-size:16px;line-height:25px;color:#434844;">Après examen des informations communiquées, je ne suis malheureusement pas en mesure de donner une suite favorable à votre demande de regroupement de crédits à ce jour.</p><p style="margin:0 0 18px;font-size:16px;line-height:25px;color:#434844;">Votre situation peut évoluer. En cas de changement de situation, vous pouvez revenir vers moi pour effectuer un nouveau test : je serai ravie de refaire le point avec vous.</p></td></tr>
<tr><td style="padding:8px 40px 34px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-radius:9px;background:#6bb69b;"><a href="${base}/financer/regroupement-credits" style="display:inline-block;padding:14px 20px;color:#1b1d1a;font-size:15px;font-weight:bold;text-decoration:none;">Refaire un test plus tard</a></td></tr></table><p style="margin:16px 0 0;font-size:12px;line-height:18px;color:#7f7f7f;">Référence de votre demande : ${dossier}</p></td></tr>
<tr><td style="padding:0 40px 28px;"><img src="${signature}" width="480" alt="Cindy Urbansky — Orizia Courtage" style="display:block;width:100%;max-width:480px;height:auto;border:0;"></td></tr>
<tr><td style="padding:22px 40px;background:#edf5f1;text-align:center;"><p style="margin:0 0 7px;font-size:14px;font-weight:bold;color:#1b1d1a;">Cindy URBANSKY</p><p style="margin:0 0 8px;font-size:13px;line-height:20px;color:#434844;">Fondatrice &amp; Gérante<br>Courtier indépendant en crédit, assurance &amp; patrimoine</p><p style="margin:0;font-size:13px;line-height:21px;"><a href="tel:+33777259706" style="color:#1b1d1a;text-decoration:none;">07 77 25 97 06</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="mailto:cindy.urbansky@orizia-courtage.fr" style="color:#1b1d1a;text-decoration:underline;">cindy.urbansky@orizia-courtage.fr</a></p></td></tr>
</table>
<p style="margin:16px 0 0;font-size:11px;line-height:17px;color:#7f7f7f;text-align:center;">Orizia Courtage · <a href="${base}/qui-suis-je" style="color:#7f7f7f;">Qui suis-je ?</a> · <a href="https://cal.com/cindy-urbansky/rendez-vous" style="color:#7f7f7f;">Prendre rendez-vous</a> · <a href="${base}/cindy-urbansky.vcf" style="color:#7f7f7f;">Enregistrer le contact</a></p>
</td></tr></table></body></html>`;
