import { Resend } from 'resend';
import { readForm, verifyTurnstile, FormError } from '@/lib/form-protection.mjs';

export const runtime = 'nodejs';
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const payload = await readForm(req, ['prenom', 'nom', 'email'], 'email');
    for (const key of ['prenom', 'nom', 'email', 'telephone', 'typedemande', 'urgence', 'commentaire']) {
      if (payload[key] !== undefined && typeof payload[key] !== 'string') throw new FormError('Champ invalide.');
    }
    if (!payload.commentaire?.trim()) throw new FormError('Veuillez saisir votre message.');
    await verifyTurnstile(payload.turnstileToken, req, 'orizia_contact');
    const { prenom, nom, email, telephone, typedemande, urgence, commentaire } = Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, escapeHtml(value)]));

    // 1. Validation basique : vérifier que les champs obligatoires sont présents
    if (!email || !prenom || !nom || !commentaire) {
      return new Response(JSON.stringify({ error: 'Des champs obligatoires sont manquants.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Envoi de l'email via Resend
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