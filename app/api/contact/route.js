import { Resend } from 'resend';
import { readForm, verifyTurnstile, FormError } from '@/lib/form-protection.mjs';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { takeAdminAttempt, visitorOf } from '@/lib/admin-rate-limit';
import { SIGNATURE_BLOCK } from '@/lib/email-signature.mjs';

export const runtime = 'nodejs';
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));

const resend = new Resend(process.env.RESEND_API_KEY);

// Le message arrive dans le CRM (rubrique Rappels, notification sur le téléphone de Cindy).
async function sendToCrm(data) {
  const secret = process.env.CRM_INTEGRATION_SECRET;
  if (!secret) return false;
  const base = (process.env.CRM_URL || 'https://crm.orizia-courtage.fr').replace(/\/$/, '');
  try {
    const response = await fetch(`${base}/api/integrations/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-crm-integration-secret': secret },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(9000),
      cache: 'no-store',
    });
    if (!response.ok) console.error('CRM contact:', response.status, (await response.text().catch(() => '')).slice(0, 200));
    return response.ok;
  } catch (error) {
    console.error('CRM contact:', error?.message);
    return false;
  }
}

export async function POST(req) {
  try {
    const payload = await readForm(req, ['prenom', 'nom', 'email'], 'email');
    for (const key of ['prenom', 'nom', 'email', 'telephone', 'typedemande', 'urgence', 'commentaire']) {
      if (payload[key] !== undefined && typeof payload[key] !== 'string') throw new FormError('Champ invalide.');
    }
    if (!payload.commentaire?.trim()) throw new FormError('Veuillez saisir votre message.');
    await verifyTurnstile(payload.turnstileToken, req, 'orizia_contact');
    const attempt = await takeAdminAttempt({ supabase: getSupabaseAdmin(), request: req, scope: 'contact', limit: 5 });
    if (!attempt.allowed) throw new FormError('Trop de messages envoyés. Réessayez dans quelques minutes.', 429);
    const { prenom, nom, email, telephone, typedemande, urgence, commentaire } = Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, escapeHtml(value)]));

    // 1. Validation basique : vérifier que les champs obligatoires sont présents
    if (!email || !prenom || !nom || !commentaire) {
      return new Response(JSON.stringify({ error: 'Des champs obligatoires sont manquants.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. CRM d'abord ; l'e-mail à Cindy ne part qu'en secours, si le CRM n'a pas reçu le message.
    const crm = await sendToCrm({
      prenom: payload.prenom, nom: payload.nom, email: payload.email, telephone: payload.telephone || '',
      typedemande: payload.typedemande || '', urgence: payload.urgence || '', message: payload.commentaire,
      page: (() => { try { return new URL(req.headers.get('referer') || '').pathname; } catch { return null; } })(),
      visitor: visitorOf(req),
    });
    if (crm) return new Response(JSON.stringify({ success: true, message: 'Message envoyé.' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    const data = await resend.emails.send({
      from: 'widget@orizia-courtage.fr',
      to: 'cindy.urbansky@orizia-courtage.fr',
      subject: `Nouveau message de ${prenom} ${nom} — ${typedemande}`,
      html: `
        <h2>Nouveau message via le widget Orizia</h2>
        <p><strong>Prénom :</strong> ${prenom}</p>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        <p><strong>Type de demande :</strong> ${typedemande}</p>
        <p><strong>Urgence :</strong> ${urgence}</p>
        <p><strong>Commentaire :</strong> ${commentaire}</p>
        ${SIGNATURE_BLOCK}
      `,
    });

    // 3. Vérifier si Resend a renvoyé une erreur
    if (data.error) {
      console.error('Erreur Resend:', data.error);
      return new Response(JSON.stringify({ error: 'Erreur lors de l\'envoi de l\'email.' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Succès
    return new Response(JSON.stringify({ success: true, message: 'Message envoyé.' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // 4. Capturer les erreurs inattendues (ex: JSON mal formaté)
    if (error instanceof FormError) return Response.json({error: error.message}, {status: error.status});
    return new Response(JSON.stringify({ error: 'Erreur interne du serveur.' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}