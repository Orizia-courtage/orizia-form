import { Resend } from 'resend';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { readForm, verifyTurnstile, FormError } from '@/lib/form-protection.mjs';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { takeAdminAttempt } from '@/lib/admin-rate-limit';
import { CRENEAUX, SUJETS } from '@/lib/rappel-options';

export const runtime = 'nodejs';

const TO = 'cindy.urbansky@orizia-courtage.fr';
const MIN_FILL_MS = 2500; // un humain met plus de 2,5 s à remplir le formulaire
const escapeHtml = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// Ajoute la demande dans « Rappels » du CRM (Source : Formulaire).
async function sendToCrm(data) {
  const secret = process.env.CRM_INTEGRATION_SECRET;
  if (!secret) return false;
  const base = (process.env.CRM_URL || 'https://crm.orizia-courtage.fr').replace(/\/$/, '');
  try {
    const response = await fetch(`${base}/api/integrations/rappel-express`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-crm-integration-secret': secret },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(6000),
      cache: 'no-store',
    });
    if (!response.ok) console.error('CRM rappel:', response.status);
    return response.ok;
  } catch (error) {
    console.error('CRM rappel:', error?.message);
    return false;
  }
}

const ok = () => Response.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });

export async function POST(request) {
  try {
    const payload = await readForm(request, ['prenom', 'telephone'], null);

    // 1. Pièges anti-robot silencieux : on répond « succès » sans rien envoyer
    if (typeof payload.website === 'string' && payload.website.trim()) return ok();
    if (typeof payload.elapsed !== 'number' || payload.elapsed < MIN_FILL_MS) return ok();

    // 2. Validation stricte des champs
    const prenom = payload.prenom.trim();
    if (prenom.length > 60 || !/^[\p{L}][\p{L}\p{M} '’.-]*$/u.test(prenom)) throw new FormError('Prénom invalide.');
    const phone = parsePhoneNumberFromString(payload.telephone, 'FR');
    if (!phone || !phone.isValid()) throw new FormError('Numéro de téléphone invalide.');
    const creneau = CRENEAUX.includes(payload.creneau) ? payload.creneau : CRENEAUX[0];
    const sujet = SUJETS.includes(payload.sujet) ? payload.sujet : 'Non précisé';
    if (payload.consent !== true) throw new FormError('Merci d’accepter d’être recontacté(e).');
    const page = typeof payload.page === 'string' && /^\/[\w\-/]{0,120}$/.test(payload.page) ? payload.page : '/';

    // 3. Vérification Cloudflare Turnstile (jeton à usage unique, action et domaine contrôlés)
    await verifyTurnstile(payload.turnstileToken, request, 'orizia_rappel_express');

    // 4. Limitation : 3 demandes par 15 minutes et par adresse IP
    const attempt = await takeAdminAttempt({ supabase: getSupabaseAdmin(), request, scope: 'rappel', limit: 3 });
    if (!attempt.allowed) throw new FormError('Vous avez déjà envoyé plusieurs demandes. Cindy vous rappelle très vite.', 429);

    // 5. Email à Cindy
    const national = phone.formatNational();
    const intl = phone.format('E.164');
    const when = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris', dateStyle: 'full', timeStyle: 'short' });
    const resend = new Resend(process.env.RESEND_API_KEY);
    // L'e-mail et le CRM partent en parallèle : la demande est acceptée si l'un des deux l'a reçue.
    const [mail, crm] = await Promise.all([
      resend.emails.send({
      from: 'Orizia Courtage <widget@orizia-courtage.fr>',
      to: TO,
      subject: `À rappeler : ${prenom} — ${national} (${creneau})`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;color:#1b1d1a">
          <h2 style="margin:0 0 4px">Demande de rappel</h2>
          <p style="margin:0 0 20px;color:#5f655f">Reçue le ${escapeHtml(when)} depuis le site</p>
          <table style="border-collapse:collapse;width:100%;font-size:15px">
            <tr><td style="padding:8px 0;color:#5f655f;width:140px">Prénom</td><td style="padding:8px 0"><strong>${escapeHtml(prenom)}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#5f655f">Téléphone</td><td style="padding:8px 0"><a href="tel:${intl}" style="color:#3e7f68;font-weight:bold">${escapeHtml(national)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#5f655f">Créneau souhaité</td><td style="padding:8px 0">${escapeHtml(creneau)}</td></tr>
            <tr><td style="padding:8px 0;color:#5f655f">Sujet</td><td style="padding:8px 0">${escapeHtml(sujet)}</td></tr>
            <tr><td style="padding:8px 0;color:#5f655f">Page</td><td style="padding:8px 0">${escapeHtml(page)}</td></tr>
          </table>
          <p style="margin:24px 0 0"><a href="tel:${intl}" style="display:inline-block;background:#1b1d1a;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:bold">Appeler ${escapeHtml(prenom)}</a>
            <a href="https://crm.orizia-courtage.fr/rappels" style="display:inline-block;margin-left:8px;color:#3e7f68;padding:12px 6px;text-decoration:none;font-weight:bold">Voir dans le CRM →</a></p>
          <p style="margin:20px 0 0;font-size:12px;color:#7f7f7f">Le visiteur a accepté d’être recontacté par téléphone.</p>
        </div>`,
      }).then(({ error }) => { if (error) throw new Error(error.message || 'resend'); return true; })
        .catch((err) => { console.error('Resend rappel:', err); return false; }),
      sendToCrm({ prenom, telephone: intl, creneau, sujet, page }),
    ]);
    if (!mail && !crm) {
      return Response.json({ error: 'Envoi indisponible. Appelez directement le 07 77 25 97 06.' }, { status: 502 });
    }
    return ok();
  } catch (error) {
    if (error instanceof FormError) return Response.json({ error: error.message }, { status: error.status });
    console.error('Rappel:', error);
    return Response.json({ error: 'Envoi indisponible. Appelez directement le 07 77 25 97 06.' }, { status: 500 });
  }
}
