// Signature e-mail unique Orizia — identique à celle des formulaires (n8n).
// Source de vérité partagée par toutes les routes qui envoient un e-mail.
const LOGO = 'https://www.orizia-courtage.fr/_next/image?url=%2Fimages%2FOrizia_logo.webp&w=384&q=75';

export const SIGNATURE_HTML = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:4px;">
  <tr>
    <td width="31%" align="center" valign="middle" style="padding:6px 18px 6px 0;">
      <a href="https://www.orizia-courtage.fr/" style="text-decoration:none;"><img src="${LOGO}" width="120" alt="Orizia Courtage" style="display:block;width:120px;height:auto;border:0;"></a>
    </td>
    <td width="1" bgcolor="#1b1d1a" style="width:1px;font-size:1px;line-height:1px;">&nbsp;</td>
    <td valign="top" style="padding:2px 0 2px 20px;">
      <a href="https://www.orizia-courtage.fr/qui-suis-je" style="font-size:16px;line-height:21px;font-family:Georgia,'Times New Roman',serif;font-weight:bold;color:#1b1d1a;text-decoration:underline;">Cindy URBANSKY</a><br>
      <span style="display:inline-block;margin:2px 0 7px;font-size:13px;line-height:18px;color:#434844;font-style:italic;">Fondatrice &amp; Gérante</span><br>
      <a href="tel:+33777259706" style="font-size:13px;line-height:20px;color:#1b1d1a;text-decoration:none;">📞&nbsp; 07 77 25 97 06</a><br>
      <a href="mailto:cindy.urbansky@orizia-courtage.fr" style="font-size:13px;line-height:20px;color:#1b1d1a;text-decoration:none;">✉️&nbsp; cindy.urbansky@orizia-courtage.fr</a><br>
      <span style="display:inline-block;margin-top:6px;font-size:13px;line-height:19px;color:#434844;">Courtier indépendant en crédit, assurance<br>&amp; patrimoine</span>
    </td>
  </tr>
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
  <tr>
    <td width="25%" height="7" bgcolor="#b3ddcb" style="height:7px;font-size:1px;line-height:1px;">&nbsp;</td>
    <td width="25%" bgcolor="#6bb69b" style="height:7px;font-size:1px;line-height:1px;">&nbsp;</td>
    <td width="25%" bgcolor="#7f7f7f" style="height:7px;font-size:1px;line-height:1px;">&nbsp;</td>
    <td width="25%" bgcolor="#1b1d1a" style="height:7px;font-size:1px;line-height:1px;">&nbsp;</td>
  </tr>
</table>
<p style="margin:13px 0 0;font-size:12px;line-height:20px;color:#1b1d1a;">
  <a href="https://www.orizia-courtage.fr/" style="color:#1b1d1a;text-decoration:underline;font-weight:bold;">🌐 Site web</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://cal.com/cindy-urbansky/rendez-vous" style="color:#1b1d1a;text-decoration:underline;font-weight:bold;">📅 Rendez-vous</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/cindy-urbansky-034323162/" style="color:#1b1d1a;text-decoration:underline;font-weight:bold;">LinkedIn</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://www.orizia-courtage.fr/cindy-urbansky.vcf" style="color:#1b1d1a;text-decoration:underline;font-weight:bold;">👤 Enregistrer contact</a>
</p>`;

// Variante avec un trait de séparation au-dessus (pour l'ajouter en bas d'un e-mail).
export const SIGNATURE_BLOCK = `<div style="margin-top:28px;padding-top:20px;border-top:1px solid #e2e7e3;">${SIGNATURE_HTML}</div>`;

export const SIGNATURE_TEXT = `Cindy URBANSKY
Fondatrice & Gérante
Courtier indépendant en crédit, assurance & patrimoine

Téléphone : 07 77 25 97 06
E-mail : cindy.urbansky@orizia-courtage.fr

Site web : https://www.orizia-courtage.fr/
Rendez-vous : https://cal.com/cindy-urbansky/rendez-vous
LinkedIn : https://www.linkedin.com/in/cindy-urbansky-034323162/
Enregistrer le contact : https://www.orizia-courtage.fr/cindy-urbansky.vcf`;
