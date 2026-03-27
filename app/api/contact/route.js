import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { prenom, nom, email, telephone, typedemande, urgence, commentaire } = await req.json();

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
    console.error('Erreur serveur:', error);
    return new Response(JSON.stringify({ error: 'Erreur interne du serveur.' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}