import { NextResponse } from 'next/server';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { readForm, verifyTurnstile, FormError } from '@/lib/form-protection.mjs';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { takeAdminAttempt, takeQuota } from '@/lib/admin-rate-limit';
import { resendCard } from '@/lib/parrainage-accord.mjs';

export const runtime = 'nodejs';

// « J'ai perdu mon lien » : le CRM renvoie la carte de recommandation à l'adresse de la fiche
// si l'e-mail ET le téléphone correspondent. Réponse toujours identique : on ne révèle pas qui est client.
const DONE = { success: true };

export async function POST(request) {
  try {
    const payload = await readForm(request, ['email', 'telephone'], 'email');
    if (typeof payload.website === 'string' && payload.website.trim()) return NextResponse.json(DONE);
    const phone = parsePhoneNumberFromString(String(payload.telephone || ''), 'FR');
    if (!phone || !phone.isValid()) throw new FormError('Numéro de téléphone invalide.');

    await verifyTurnstile(payload.turnstileToken, request, 'orizia_lien');
    const attempt = await takeAdminAttempt({ supabase: getSupabaseAdmin(), request, scope: 'parrainage-lien', limit: 3 });
    if (!attempt.allowed) throw new FormError('Vous avez déjà fait plusieurs demandes. Réessayez dans quelques minutes.', 429);

    // 1 renvoi de carte par 24 h et par adresse e-mail, quelle que soit l'IP.
    const quota = await takeQuota({ supabase: getSupabaseAdmin(), scope: 'carte', id: String(payload.email).trim(), limit: 1 });
    if (!quota.allowed) return NextResponse.json(DONE, { headers: { 'Cache-Control': 'no-store' } });
    const { status } = await resendCard(String(payload.email).trim(), phone.number);
    if (status !== 200) console.error('Lien parrainage : CRM', status);
    return NextResponse.json(DONE, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof FormError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error('Lien parrainage:', error);
    return NextResponse.json({ error: 'Envoi indisponible. Veuillez réessayer.' }, { status: 503 });
  }
}
