import { NextResponse } from 'next/server';
import { readForm, FormError } from '@/lib/form-protection.mjs';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { takeAdminAttempt } from '@/lib/admin-rate-limit';
import { confirmAccord, verifyAccord } from '@/lib/parrainage-accord.mjs';

export const runtime = 'nodejs';

const CRENEAUX = ['Dès que possible', 'Le matin', 'Le midi', "L'après-midi", 'En soirée'];

// Le proche recommandé confirme qu'il souhaite être rappelé (lien signé reçu par e-mail).
export async function POST(request) {
  try {
    const payload = await readForm(request, ['id', 't'], null);
    if (!verifyAccord(payload.id, payload.t)) throw new FormError('Ce lien n\'est pas valide. Vous pouvez me contacter directement au 07 77 25 97 06.', 403);
    const creneau = CRENEAUX.includes(payload.creneau) ? payload.creneau : 'Dès que possible';

    const attempt = await takeAdminAttempt({ supabase: getSupabaseAdmin(), request, scope: 'parrainage-accord', limit: 6 });
    if (!attempt.allowed) throw new FormError('Trop de tentatives. Réessayez dans quelques minutes.', 429);

    const { status, data } = await confirmAccord(payload.id, creneau);
    if (status === 404) throw new FormError('Cette demande n\'est plus active. Vous pouvez me contacter directement au 07 77 25 97 06 ou prendre rendez-vous.', 404);
    if (status !== 200 || !data?.ok) throw new FormError('Envoi indisponible. Veuillez réessayer.', 503);

    // Accord enregistré dans le CRM : Cindy est prévenue par notification (plus d'e-mail en double).
    return NextResponse.json({ success: true, prenom: data.prenom || '' }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof FormError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error('Accord parrainage:', error);
    return NextResponse.json({ error: 'Envoi indisponible. Veuillez réessayer.' }, { status: 503 });
  }
}
