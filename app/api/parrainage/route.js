import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { readForm, verifyTurnstile, FormError } from '@/lib/form-protection.mjs';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { takeAdminAttempt } from '@/lib/admin-rate-limit';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);
const SITE_URL = 'https://www.orizia-courtage.fr';
const LOGO_URL = `${SITE_URL}/images/Orizia_logo.webp`;
const MIN_FILL_MS = 2500; // un humain met plus de 2,5 s à remplir le formulaire
const REQUIRED = ['parrainNom', 'parrainPrenom', 'parrainEmail', 'parrainTel', 'filleulNom', 'filleulPrenom', 'filleulEmail', 'filleulTel'];
const emailRe = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const nameRe = /^[\p{L}][\p{L}\p{M} '’.-]{0,59}$/u;

// Échappe chaque valeur interpolée dans le HTML des e-mails (comme /api/contact et /api/rappel).
const escapeHtml = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Remonte le parrainage dans le CRM (« Rappels demandés », Source : Parrainage). Best-effort.
async function notifyCrm(payload) {
  const secret = process.env.CRM_INTEGRATION_SECRET;
  if (!secret) return false;
  const base = (process.env.CRM_URL || 'https://crm.orizia-courtage.fr').replace(/\/$/, '');
  try {
    const response = await fetch(`${base}/api/integrations/parrainage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-crm-integration-secret': secret },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(9000),
      cache: 'no-store',
    });
    if (!response.ok) console.error('CRM parrainage:', response.status);
    return response.ok;
  } catch (error) {
    console.error('CRM parrainage:', error?.message);
    return false;
  }
}

function cleanPhone(value) {
  const phone = parsePhoneNumberFromString(String(value || ''), 'FR');
  if (!phone || !phone.isValid()) throw new FormError('Numéro de téléphone invalide.');
  return phone.formatNational();
}

function cleanName(value, label) {
  const name = String(value || '').trim();
  if (!nameRe.test(name)) throw new FormError(`${label} invalide.`);
  return name;
}

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
          <p style="margin:0 0 12px 0; color:#666; font-size:14px;">Fondatrice &amp; Courtier | Orizia Courtage</p>
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
    // 1. Origine, taille, types, longueurs (lib/form-protection) — e-mails validés séparément car il y en a deux.
    const payload = await readForm(request, REQUIRED, null);

    // 2. Pièges anti-robot silencieux : on répond « succès » sans rien envoyer.
    if (typeof payload.website === 'string' && payload.website.trim()) return NextResponse.json({ success: true });
    if (typeof payload.elapsed !== 'number' || payload.elapsed < MIN_FILL_MS) return NextResponse.json({ success: true });

    // 3. Validation stricte des champs.
    const parrainPrenom = cleanName(payload.parrainPrenom, 'Prénom du parrain');
    const parrainNom = cleanName(payload.parrainNom, 'Nom du parrain');
    const filleulPrenom = cleanName(payload.filleulPrenom, 'Prénom du filleul');
    const filleulNom = cleanName(payload.filleulNom, 'Nom du filleul');
    const parrainEmail = String(payload.parrainEmail || '').trim();
    const filleulEmail = String(payload.filleulEmail || '').trim();
    if (!emailRe.test(parrainEmail) || !emailRe.test(filleulEmail)) throw new FormError('Adresse e-mail invalide.');
    const parrainTel = cleanPhone(payload.parrainTel);
    const filleulTel = cleanPhone(payload.filleulTel);
    const projets = { Investir: '/investir', Financer: '/financer', Assurer: '/assurer' };
    const projetRaw = typeof payload.projetFilleul === 'string' ? payload.projetFilleul : '';
    const projetKey = Object.keys(projets).find(k => projetRaw.includes(k)) || null;

    // 4. Vérification Cloudflare Turnstile (jeton à usage unique, action et domaine contrôlés).
    await verifyTurnstile(payload.turnstileToken, request, 'orizia_parrainage');

    // 5. Limitation : 3 recommandations par 15 minutes et par adresse IP.
    const attempt = await takeAdminAttempt({ supabase: getSupabaseAdmin(), request, scope: 'parrainage', limit: 3 });
    if (!attempt.allowed) throw new FormError('Vous avez déjà envoyé plusieurs recommandations. Réessayez dans quelques minutes.', 429);

    const emailExpediteur = 'Cindy - Orizia Courtage <cindy.urbansky@orizia-courtage.fr>';
    const signature = getSignatureHTML();
    const siteLink = SITE_URL + (projetKey ? projets[projetKey] : '');
    const projetAffiche = projetRaw.trim() || 'Aucun projet défini';

    let projetContent;
    if (projetKey === 'Investir') {
      projetContent = `
        <p>Concernant votre projet d'<strong>Investissement</strong>, je peux vous accompagner sur :</p>
        <ul>
          <li><strong>Crowdfunding :</strong> Financement participatif.</li>
          <li><strong>PER :</strong> Pour préparer votre retraite.</li>
          <li><strong>Assurance Vie :</strong> Épargne et transmission.</li>
          <li><strong>SCPI :</strong> Immobilier de rendement.</li>
        </ul>`;
    } else if (projetKey === 'Financer') {
      projetContent = `
        <p>Concernant votre projet de <strong>Financement</strong>, voici mes domaines d'expertise :</p>
        <ul>
          <li><strong>Crédit immobilier :</strong> Pour votre projet d'acquisition.</li>
          <li><strong>Regroupement de crédits :</strong> Pour réduire vos mensualités.</li>
          <li><strong>Prêt personnel :</strong> Pour financer vos projets divers.</li>
        </ul>`;
    } else if (projetKey === 'Assurer') {
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

    // Valeurs échappées pour l'interpolation HTML.
    const e = {
      parrainPrenom: escapeHtml(parrainPrenom), parrainNom: escapeHtml(parrainNom),
      filleulPrenom: escapeHtml(filleulPrenom), filleulNom: escapeHtml(filleulNom),
      parrainEmail: escapeHtml(parrainEmail), filleulEmail: escapeHtml(filleulEmail),
      parrainTel: escapeHtml(parrainTel), filleulTel: escapeHtml(filleulTel),
      projetAffiche: escapeHtml(projetAffiche), siteLink: escapeHtml(siteLink),
    };

    // ── 1. ENVOI AU FILLEUL ──
    await resend.emails.send({
      from: emailExpediteur,
      to: [filleulEmail],
      subject: `${parrainPrenom} m'a suggéré de vous contacter pour votre projet`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
          <p>Bonjour ${e.filleulPrenom},</p>
          <p><strong>${e.parrainPrenom}</strong> m'a informé que vous aviez un projet et m'a confirmé avoir eu votre accord pour que je puisse vous contacter par e-mail.</p>

          ${projetContent}

          <p>Sachez qu'il n'est pas nécessaire d'avoir un projet défini avec précision pour échanger. Mon rôle est de vous conseiller et de construire avec vous la stratégie la plus avantageuse.</p>

          <p><strong>Je me permettrai de vous appeler dans les prochaines 24h via le <a href="tel:+33777259706" style="color:#333; text-decoration:none;">07 77 25 97 06</a>.</strong> Je vous recommande d'enregistrer mon numéro afin de faciliter notre échange.</p>

          <p style="background-color: #f9f9f9; padding: 10px; border-left: 3px solid #3a6f6c;">
            <em>Note :</em> Le numéro de téléphone que ${e.parrainPrenom} m'a transmis pour vous joindre est le <strong>${e.filleulTel}</strong>. S'il y a une erreur, n'hésitez pas à me le faire savoir en répondant directement à cet e-mail.
          </p>

          <p>Si vous préférez choisir un créneau précis, vous pouvez réserver un rendez-vous directement dans mon agenda :
          <a href="https://cal.com/cindy-urbansky/rendez-vous" style="color:#3a6f6c; font-weight:bold;">Prendre rendez-vous ici</a>.</p>

          <p>Vous pouvez également consulter mon site pour découvrir mes solutions : <a href="${e.siteLink}" style="color:#3a6f6c;">${e.siteLink}</a>.</p>

          <p>Si vous avez la moindre question d'ici notre appel, n'hésitez pas à répondre à cet e-mail.</p>

          <p>À très bientôt,</p>
          ${signature}
        </div>`,
    });

    // ── 2. ENVOI AU PARRAIN ──
    await resend.emails.send({
      from: emailExpediteur,
      to: [parrainEmail],
      subject: 'Merci pour votre recommandation ! 🎁',
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
          <p>Bonjour ${e.parrainPrenom},</p>
          <p>Je vous remercie chaleureusement pour votre confiance et pour m'avoir recommandé auprès de <strong>${e.filleulPrenom}</strong>.</p>
          <p>Je viens de lui envoyer un e-mail et je vais prendre contact avec lui téléphoniquement sous 24h.</p>
          <p><strong>Pour rappel :</strong> en cas de finalisation du dossier, vous recevrez par e-mail votre carte cadeau pour vous remercier de votre parrainage.</p>
          <p>À très bientôt,</p>
          ${signature}
        </div>`,
    });

    // ── 3. ENVOI À CINDY (récapitulatif complet) ──
    await resend.emails.send({
      from: emailExpediteur,
      to: ['cindy.urbansky@orizia-courtage.fr'],
      subject: `✨ Nouveau parrainage : ${parrainPrenom} ${parrainNom} recommande ${filleulPrenom} ${filleulNom}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
          <h2 style="color:#3a6f6c;">Détails complets du parrainage</h2>

          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px;">LE PARRAIN</h3>
          <p>
            <strong>Nom complet :</strong> ${e.parrainPrenom} ${e.parrainNom}<br/>
            <strong>Email :</strong> <a href="mailto:${e.parrainEmail}" style="color:#3a6f6c;">${e.parrainEmail}</a><br/>
            <strong>Téléphone :</strong> <a href="tel:${e.parrainTel}" style="color:#3a6f6c;">${e.parrainTel}</a>
          </p>

          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 20px;">LE FILLEUL</h3>
          <p>
            <strong>Nom complet :</strong> ${e.filleulPrenom} ${e.filleulNom}<br/>
            <strong>Email :</strong> <a href="mailto:${e.filleulEmail}" style="color:#3a6f6c;">${e.filleulEmail}</a><br/>
            <strong>Téléphone :</strong> <a href="tel:${e.filleulTel}" style="color:#3a6f6c;">${e.filleulTel}</a><br/>
            <strong>Projet :</strong> <span style="color:#3a6f6c; font-weight:bold;">${e.projetAffiche}</span>
          </p>
        </div>`,
    });

    // Remontée CRM best-effort : ne bloque pas la réponse au visiteur.
    await notifyCrm({
      filleulPrenom, filleulNom, filleulTel, filleulEmail,
      parrainPrenom, parrainNom, parrainTel, parrainEmail,
      projetFilleul: projetRaw, page: '/parrainage',
    });

    return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof FormError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error('Parrainage:', error);
    return NextResponse.json({ error: 'Envoi indisponible. Veuillez réessayer.' }, { status: 503 });
  }
}
