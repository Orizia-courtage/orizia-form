// Envoi des e-mails clients du site par le CRM (POST /api/integrations/email) : gabarit commun Orizia
// (barre verte, logo, formule de politesse, signature, mentions légales, lien de désinscription),
// expéditeur et réponses cindy.urbansky@orizia-courtage.fr, et respect des désinscriptions.
// Secours : si le CRM est injoignable, envoi direct par Resend (sans gabarit), pour ne pas perdre le message.
import { Resend } from 'resend';
import { SIGNATURE_BLOCK } from '@/lib/email-signature.mjs';

export const FROM = 'Cindy Urbansky - Orizia Courtage <cindy.urbansky@orizia-courtage.fr>';
export const REPLY_TO = 'cindy.urbansky@orizia-courtage.fr';

/**
 * mail : { to, subject, title, html (contenu, sans formule de politesse ni signature), text, closing, marketing }
 * Renvoie { sent: true } ou { sent: false, reason: 'unsubscribed' }.
 */
export async function sendClientEmail(mail) {
  const secret = process.env.CRM_INTEGRATION_SECRET;
  const base = (process.env.CRM_URL || 'https://crm.orizia-courtage.fr').replace(/\/$/, '');
  if (secret) {
    try {
      const response = await fetch(`${base}/api/integrations/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-crm-integration-secret': secret },
        body: JSON.stringify({ template: 'custom', ...mail }),
        signal: AbortSignal.timeout(15000),
        cache: 'no-store',
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) return { sent: data.sent !== false, reason: data.reason };
      console.error('CRM e-mail :', response.status, data.error);
    } catch (error) {
      console.error('CRM e-mail :', error?.message);
    }
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: FROM, replyTo: REPLY_TO, to: [mail.to], subject: mail.subject,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#1b1d1a">${mail.html}<p>${mail.closing || 'Bien cordialement,'}</p>${SIGNATURE_BLOCK}</div>`,
    text: mail.text,
  });
  if (error) throw new Error(error.message || 'resend');
  return { sent: true };
}
