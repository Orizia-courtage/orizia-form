import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = 'https://www.orizia-courtage.fr';
const LOGO_URL = `${SITE_URL}/images/Orizia_logo.webp`;

// ── SIGNATURE PROFESSIONNELLE (Format Tableau pour compatibilité Mail) ──
const getSignatureHTML = () => `
  <br/><br/>
  <div style="border-top: 1px solid #eee; padding-top: 20px; font-family: Arial, sans-serif;">
    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 500px;">
      <tr>
        <td style="padding-right: 20px; vertical-align: top; width: 120px;">
          <img src="${LOGO_URL}" alt="Orizia Courtage" width="120" style="display:block; border: none;" />
        </td>
        <td style="vertical-align: top; border-left: 2px solid #3a6f6c; padding-left: 20px;">
          <p style="margin:0 0 4px 0; font-weight:bold; color:#3a6f6c; font-size: 16px;">Cindy Urbansky</p>
          <p style="margin:0 0 12px 0; color:#666; font-size:14px;">Fondatrice & Courtier | Orizia Courtage</p>
          <p style="margin:4px 0; font-size:14px;">
            📞 <a href="tel:+33777259706" style="color:#333; text-decoration:none;">07 77 25 97 06</a><br/>
            ✉️ <a href="mailto:cindy.urbansky@orizia-courtage.fr" style="color:#3a6f6c; text-decoration:none;">cindy.urbansky@orizia-courtage.fr</a><br/>
            🌐 <a href="${SITE_URL}" style="color:#3a6f6c; text-decoration:none;">www.orizia-courtage.fr</a>
          </p>
        </td>
      </tr>
    </table>
  </div>
`;

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Ajout de parrainNom et filleulNom pour ton propre mail de récapitulatif
    const { 
      parrainNom, parrainPrenom, parrainEmail, parrainTel, 
      filleulNom, filleulPrenom, filleulEmail, filleulTel, 
      projetFilleul 
    } = data;

    const emailExpediteur = 'Cindy - Orizia Courtage <cindy.urbansky@orizia-courtage.fr>';
    const signature = getSignatureHTML();

    let projetContent = "";
    let siteLink = SITE_URL;
    const projetAffiche = projetFilleul || 'Aucun projet défini';

    if (projetFilleul?.includes("Investir")) {
      siteLink = `${SITE_URL}/investir`;
      projetContent = `
        <p>Concernant votre projet d'<strong>Investissement</strong>, je peux vous accompagner sur :</p>
        <ul>
          <li><strong>Crowdfunding :</strong> Financement participatif.</li>
          <li><strong>PER :</strong> Pour préparer votre retraite.</li>
          <li><strong>Assurance Vie :</strong> Épargne et transmission.</li>
          <li><strong>SCPI :</strong> Immobilier de rendement.</li>
        </ul>`;
    } else if (projetFilleul?.includes("Financer")) {
      siteLink = `${SITE_URL}/financer`;
      projetContent = `
        <p>Concernant votre projet de <strong>Financement</strong>, voici mes domaines d'expertise :</p>
        <ul>
          <li><strong>Crédit immobilier :</strong> Pour votre projet d'acquisition.</li>
          <li><strong>Regroupement de crédits :</strong> Pour réduire vos mensualités.</li>
          <li><strong>Prêt personnel :</strong> Pour financer vos projets divers.</li>
        </ul>`;
    } else if (projetFilleul?.includes("Assurer")) {
      siteLink = `${SITE_URL}/assurer`;
      projetContent = `
        <p>Concernant vos besoins en <strong>Assurance</strong>, je vous propose :</p>
        <ul>
          <li><strong>Assurance emprunteur :</strong> Pour protéger votre prêt au meilleur prix.</li>
          <li><strong>Assurance habitation :</strong> Pour sécuriser votre logement.</li>
          <li><strong>Assurance auto/moto :</strong> Pour rouler en toute sérénité.</li>
        </ul>`;
    } else {
      projetContent = `<p>Je vous accompagne sur l'ensemble de vos projets de <strong>Financement, d'Assurance et d'Investissement</strong> afin de vous proposer la solution la plus adaptée à votre situation.</p>`;
    }

    // ── 1. ENVOI AU FILLEUL ──
    await resend.emails.send({
      from: emailExpediteur,
      to: [filleulEmail],
      subject: `${parrainPrenom} m'a suggéré de vous contacter pour votre projet`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
          <p>Bonjour ${filleulPrenom},</p>
          <p><strong>${parrainPrenom}</strong> m'a informé que vous aviez un projet et m'a confirmé avoir eu votre accord pour que je puisse vous contacter par e-mail.</p>
          
          ${projetContent}
          
          <p>Sachez qu'il n'est pas nécessaire d'avoir un projet défini avec précision pour échanger. Mon rôle est de vous conseiller et de construire avec vous la stratégie la plus avantageuse.</p>
          
          <p><strong>Je me permettrai de vous appeler dans les prochaines 24h via le <a href="tel:+33777259706" style="color:#333; text-decoration:none;">07 77 25 97 06</a>.</strong> Je vous recommande d'enregistrer mon numéro afin de faciliter notre échange.</p>
          
          <p style="background-color: #f9f9f9; padding: 10px; border-left: 3px solid #3a6f6c;">
            <em>Note :</em> Le numéro de téléphone que ${parrainPrenom} m'a transmis pour vous joindre est le <strong>${filleulTel}</strong>. S'il y a une erreur, n'hésitez pas à me le faire savoir en répondant directement à cet e-mail.
          </p>
          
          <p>Si vous préférez choisir un créneau précis, vous pouvez réserver un rendez-vous directement dans mon agenda : 
          <a href="https://www.cal.eu/cindy-urbansky/rendez-vous" style="color:#3a6f6c; font-weight:bold;">Prendre rendez-vous ici</a>.</p>
          
          <p>Vous pouvez également consulter mon site pour découvrir mes solutions : <a href="${siteLink}" style="color:#3a6f6c;">${siteLink}</a>.</p>
          
          <p>Si vous avez la moindre question d'ici notre appel, n'hésitez pas à répondre à cet e-mail.</p>
          
          <p>À très bientôt,</p>
          ${signature}
        </div>`
    });

    // ── 2. ENVOI AU PARRAIN ──
    await resend.emails.send({
      from: emailExpediteur,
      to: [parrainEmail],
      subject: 'Merci pour votre recommandation ! 🎁',
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
          <p>Bonjour ${parrainPrenom},</p>
          <p>Je vous remercie chaleureusement pour votre confiance et pour m'avoir recommandé auprès de <strong>${filleulPrenom}</strong>.</p>
          <p>Je viens de lui envoyer un e-mail et je vais prendre contact avec lui téléphoniquement sous 24h.</p>
          <p><strong>Pour rappel :</strong> en cas de finalisation du dossier, vous recevrez par e-mail votre carte cadeau pour vous remercier de votre parrainage.</p>
          <p>À très bientôt,</p>
          ${signature}
        </div>`
    });

    // ── 3. ENVOI À CINDY (Toutes les infos complètes avec les noms) ──
    await resend.emails.send({
      from: emailExpediteur,
      to: ['cindy.urbansky@orizia-courtage.fr'],
      subject: `✨ Nouveau parrainage : ${parrainPrenom} ${parrainNom} recommande ${filleulPrenom} ${filleulNom}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
          <h2 style="color:#3a6f6c;">Détails complets du parrainage</h2>
          
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px;">LE PARRAIN</h3>
          <p>
            <strong>Nom complet :</strong> ${parrainPrenom} ${parrainNom}<br/>
            <strong>Email :</strong> <a href="mailto:${parrainEmail}" style="color:#3a6f6c;">${parrainEmail}</a><br/>
            <strong>Téléphone :</strong> <a href="tel:${parrainTel}" style="color:#3a6f6c;">${parrainTel}</a>
          </p>

          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 20px;">LE FILLEUL</h3>
          <p>
            <strong>Nom complet :</strong> ${filleulPrenom} ${filleulNom}<br/>
            <strong>Email :</strong> <a href="mailto:${filleulEmail}" style="color:#3a6f6c;">${filleulEmail}</a><br/>
            <strong>Téléphone :</strong> <a href="tel:${filleulTel}" style="color:#3a6f6c;">${filleulTel}</a><br/>
            <strong>Projet :</strong> <span style="color:#3a6f6c; font-weight:bold;">${projetAffiche}</span>
          </p>
        </div>`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}