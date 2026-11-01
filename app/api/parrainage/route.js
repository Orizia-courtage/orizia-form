import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { readForm, verifyTurnstile, FormError } from '@/lib/form-protection.mjs';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { takeAdminAttempt, takeQuota, visitorOf, DAILY_SCOPE, DAILY_LIMIT, DAY_MS, DAILY_MESSAGE } from '@/lib/admin-rate-limit';
import { SIGNATURE_BLOCK } from '@/lib/email-signature.mjs';
import { resolveReferral } from '@/lib/referral.mjs';
import { accordLink } from '@/lib/parrainage-accord.mjs';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);
const SITE_URL = 'https://www.orizia-courtage.fr';
const MIN_FILL_MS = 2500; // un humain met plus de 2,5 s à remplir le formulaire
const REQUIRED = ['filleulNom', 'filleulPrenom', 'filleulEmail', 'filleulTel'];
const PARRAIN_FIELDS = ['parrainNom', 'parrainPrenom', 'parrainEmail', 'parrainTel'];
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
    if (!response.ok) { console.error('CRM parrainage:', response.status); return null; }
    const data = await response.json().catch(() => ({}));
    return typeof data.id === 'string' ? data.id : null;
  } catch (error) {
    console.error('CRM parrainage:', error?.message);
    return null;
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

// Signature unique partagée (identique à celle des formulaires n8n).

export async function POST(request) {
  try {
    // 1. Origine, taille, types, longueurs (lib/form-protection) — e-mails validés séparément car il y en a deux.
    const payload = await readForm(request, REQUIRED, null);

    // 2. Pièges anti-robot silencieux : on répond « succès » sans rien envoyer.
    if (typeof payload.website === 'string' && payload.website.trim()) return NextResponse.json({ success: true });
    if (typeof payload.elapsed !== 'number' || payload.elapsed < MIN_FILL_MS) return NextResponse.json({ success: true });

    // 3. Validation stricte des champs.
    // Deux parcours : le parrain remplit le formulaire (ses coordonnées + celles du proche), ou le proche
    // arrive par la carte / page de recommandation du parrain (/r/CODE) : le parrain vient alors du CRM.
    const viaCard = typeof payload.parrainCode === 'string' && payload.parrainCode.trim() !== '';
    let parrainPrenom; let parrainNom; let parrainEmail; let parrainTel;
    if (viaCard) {
      const referral = await resolveReferral(payload.parrainCode);
      if (!referral) throw new FormError('Ce lien de recommandation n\'est plus valide. Contactez directement Orizia Courtage.', 404);
      ({ prenom: parrainPrenom, nom: parrainNom, email: parrainEmail, telephone: parrainTel } = referral.parrain);
      parrainEmail = String(parrainEmail || '').trim();
      parrainTel = String(parrainTel || '').trim();
    } else {
      if (PARRAIN_FIELDS.some((key) => typeof payload[key] !== 'string' || !payload[key].trim())) throw new FormError('Veuillez remplir tous les champs obligatoires.');
      parrainPrenom = cleanName(payload.parrainPrenom, 'Prénom du parrain');
      parrainNom = cleanName(payload.parrainNom, 'Nom du parrain');
      parrainEmail = String(payload.parrainEmail || '').trim();
      if (!emailRe.test(parrainEmail)) throw new FormError('Adresse e-mail invalide.');
      parrainTel = cleanPhone(payload.parrainTel);
    }
    const filleulPrenom = cleanName(payload.filleulPrenom, 'Votre prénom');
    const filleulNom = cleanName(payload.filleulNom, 'Votre nom');
    const filleulEmail = String(payload.filleulEmail || '').trim();
    if (!emailRe.test(filleulEmail)) throw new FormError('Adresse e-mail invalide.');
    const filleulTel = cleanPhone(payload.filleulTel);
    const projets = { Investir: '/investir', Financer: '/financer', Assurer: '/assurer' };
    const projetRaw = typeof payload.projetFilleul === 'string' ? payload.projetFilleul : '';
    const projetKey = Object.keys(projets).find(k => projetRaw.includes(k)) || null;

    // 4. Vérification Cloudflare Turnstile (jeton à usage unique, action et domaine contrôlés).
    await verifyTurnstile(payload.turnstileToken, request, 'orizia_parrainage');

    // 5. Limitation : 3 recommandations par 15 minutes et par adresse IP.
    const attempt = await takeAdminAttempt({ supabase: getSupabaseAdmin(), request, scope: 'parrainage', limit: 3 });
    if (!attempt.allowed) throw new FormError('Vous avez déjà envoyé plusieurs recommandations. Réessayez dans quelques minutes.', 429);
    const daily = await takeAdminAttempt({ supabase: getSupabaseAdmin(), request, scope: DAILY_SCOPE, limit: DAILY_LIMIT, windowMs: DAY_MS });
    if (!daily.allowed) throw new FormError(DAILY_MESSAGE, 429);

    // 6. Quotas par personne, quelle que soit l'adresse IP (anti-harcèlement, réputation des e-mails) :
    //    un même proche reçoit au plus 1 e-mail par 24 h, un même parrain génère au plus 5 recommandations
    //    par 24 h. Au-delà on répond « succès » sans rien envoyer (rien à apprendre pour un robot).
    const supabase = getSupabaseAdmin();
    const parrainKey = viaCard ? `code:${String(payload.parrainCode).trim()}` : `mail:${parrainEmail}`;
    const quotas = await Promise.all([
      takeQuota({ supabase, scope: 'reco-proche-mail', id: filleulEmail, limit: 1 }),
      takeQuota({ supabase, scope: 'reco-proche-tel', id: filleulTel.replace(/\D/g, ''), limit: 1 }),
      takeQuota({ supabase, scope: 'reco-parrain', id: parrainKey, limit: 5 }),
    ]);
    if (quotas.some((q) => !q.allowed)) return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });

    const emailExpediteur = 'Cindy - Orizia Courtage <cindy.urbansky@orizia-courtage.fr>';
    const signature = SIGNATURE_BLOCK;
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

    // Remontée CRM d'abord : son identifiant sert au lien « Oui, je souhaite être rappelé(e) ».
    const crmId = await notifyCrm({
      filleulPrenom, filleulNom, filleulTel, filleulEmail,
      parrainPrenom, parrainNom, parrainTel, parrainEmail,
      projetFilleul: projetRaw, page: viaCard ? '/r' : '/parrainage', visitor: visitorOf(request),
      ...(viaCard ? { parrainCode: payload.parrainCode } : {}),
    });
    const rappelLink = !viaCard && crmId ? accordLink(crmId) : null;
    const rdvLink = 'https://cal.com/cindy-urbansky/rendez-vous';
    const cta = (href, label, dark) => `<a href="${escapeHtml(href)}" style="display:inline-block;margin:0 8px 10px 0;background:${dark ? '#1b1d1a' : '#6bb69b'};color:${dark ? '#ffffff' : '#1b1d1a'};text-decoration:none;font-weight:bold;padding:13px 18px;border-radius:10px">${label}</a>`;

    // ── 1. ENVOI AU FILLEUL ──
    await resend.emails.send({
      from: emailExpediteur,
      to: [filleulEmail],
      subject: viaCard ? `Suite à la recommandation de ${parrainPrenom}` : `${parrainPrenom} vous recommande Orizia Courtage`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
          <p>Bonjour ${e.filleulPrenom},</p>
          ${viaCard
            ? `<p>Merci d'avoir laissé vos coordonnées suite à la recommandation de <strong>${e.parrainPrenom}</strong>. Je suis ravie de pouvoir vous accompagner.</p>`
            : `<p><strong>${e.parrainPrenom} ${e.parrainNom}</strong> m'a parlé de vous et pense que je pourrais vous aider dans un projet. Je suis Cindy Urbansky, courtière chez Orizia Courtage.</p>`}

          ${projetContent}

          <p>Sachez qu'il n'est pas nécessaire d'avoir un projet défini avec précision pour échanger. Mon rôle est de vous conseiller et de construire avec vous la stratégie la plus avantageuse. Le premier échange est gratuit et sans engagement.</p>

          ${viaCard ? `
          <p><strong>Je me permettrai de vous appeler dans les prochaines 24h via le <a href="tel:+33777259706" style="color:#333; text-decoration:none;">07 77 25 97 06</a>.</strong> Je vous recommande d'enregistrer mon numéro afin de faciliter notre échange.</p>
          <p style="background-color: #f9f9f9; padding: 10px; border-left: 3px solid #3a6f6c;">
            <em>Note :</em> Le numéro que vous m'avez indiqué est le <strong>${e.filleulTel}</strong>. S'il y a une erreur, n'hésitez pas à me le faire savoir en répondant directement à cet e-mail.
          </p>
          <p>Si vous préférez choisir un créneau précis, vous pouvez réserver un rendez-vous directement dans mon agenda :
          <a href="${rdvLink}" style="color:#3a6f6c; font-weight:bold;">Prendre rendez-vous ici</a>.</p>` : `
          <p><strong>Je ne vous appellerai pas sans votre accord.</strong> Si vous souhaitez en parler, choisissez simplement :</p>
          <div style="margin:14px 0 6px">${rappelLink ? cta(rappelLink, 'Oui, je souhaite être rappelé(e)', false) : ''}${cta(rdvLink, 'Prendre rendez-vous', true)}</div>
          <p>Vous pouvez aussi répondre directement à cet e-mail.</p>
          <p style="color:#5d6560; font-size:12px; line-height:1.5; border-top:1px solid #e3e7e4; padding-top:10px; margin-top:16px">Vous recevez ce message unique parce que ${e.parrainPrenom} m'a transmis vos coordonnées. Sans réponse de votre part, elles seront effacées sous 30 jours et vous ne recevrez aucun autre message.</p>`}

          <p>Vous pouvez également consulter mon site pour découvrir mes solutions : <a href="${e.siteLink}" style="color:#3a6f6c;">${e.siteLink}</a>.</p>

          <p>À très bientôt,</p>
          ${signature}
        </div>`,
    });

    // ── 2. ENVOI AU PARRAIN ──
    // Remerciement au parrain : 1 e-mail par 24 h au maximum (même s'il recommande plusieurs proches).
    const merci = emailRe.test(parrainEmail) ? await takeQuota({ supabase, scope: 'merci-parrain', id: parrainEmail, limit: 1 }) : { allowed: false };
    if (merci.allowed) await resend.emails.send({
      from: emailExpediteur,
      to: [parrainEmail],
      subject: 'Merci pour votre recommandation ! 🎁',
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
          <p>Bonjour ${e.parrainPrenom},</p>
          <p>Je vous remercie chaleureusement pour votre confiance et pour m'avoir recommandé auprès de <strong>${e.filleulPrenom}</strong>${viaCard ? ', qui vient de me laisser ses coordonnées grâce à votre carte' : ''}.</p>
          ${viaCard
            ? '<p>Je vais prendre contact avec lui téléphoniquement sous 24h.</p>'
            : `<p>Je viens de lui envoyer un e-mail de votre part. Dès qu'il me donne son feu vert, je le contacte. N'hésitez pas à le prévenir pour qu'il surveille sa boîte mail (et ses indésirables).</p>`}
          <p><strong>Pour rappel :</strong> en cas de finalisation du dossier, vous recevrez par e-mail votre carte cadeau pour vous remercier de votre parrainage.</p>
          <p>À très bientôt,</p>
          ${signature}
        </div>`,
    });

    // ── 3. ENVOI À CINDY : seulement en secours, si le CRM n'a pas reçu la recommandation ──
    if (!crmId) await resend.emails.send({
      from: emailExpediteur,
      to: ['cindy.urbansky@orizia-courtage.fr'],
      subject: `✨ Nouveau parrainage${viaCard ? ' (carte)' : ''} : ${parrainPrenom} ${parrainNom} recommande ${filleulPrenom} ${filleulNom}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
          <h2 style="color:#3a6f6c;">Détails complets du parrainage</h2>
          ${viaCard
            ? '<p style="background:#e9f6ef;padding:10px;border-radius:8px"><strong>Le proche a lui-même laissé ses coordonnées</strong> : vous pouvez l\'appeler.</p>'
            : '<p style="background:#fff4e0;padding:10px;border-radius:8px"><strong>En attente de son accord</strong> : coordonnées saisies par le parrain. Attendez qu\'il clique « être rappelé » (vous recevrez un e-mail) ou qu\'il prenne rendez-vous avant de l\'appeler. Sans réponse, la demande s\'efface du CRM sous 30 jours.</p>'}

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

    return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof FormError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error('Parrainage:', error);
    return NextResponse.json({ error: 'Envoi indisponible. Veuillez réessayer.' }, { status: 503 });
  }
}
