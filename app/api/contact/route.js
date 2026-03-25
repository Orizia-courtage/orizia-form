import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { prenom, nom, email, telephone, typedemande, urgence, commentaire } = await req.json();

  await resend.emails.send({
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

  return new Response('OK', { status: 200 });
}