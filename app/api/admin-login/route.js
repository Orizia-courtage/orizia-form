import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { takeAdminAttempt } from '@/lib/admin-rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const payload = await request.json().catch(() => null);
  const email = typeof payload?.email === 'string' ? payload.email.trim() : '';
  const password = typeof payload?.password === 'string' ? payload.password : '';
  if (!email || email.length > 320 || !password || password.length > 256) return NextResponse.json({ error: 'Identifiants invalides.' }, { status: 400 });

  const admin = getSupabaseAdmin();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!admin || !url || !publishableKey) return NextResponse.json({ error: 'Connexion temporairement indisponible.' }, { status: 503 });

  const attempt = await takeAdminAttempt({ supabase: admin, request, scope: 'login', limit: 5 });
  if (!attempt.allowed) return NextResponse.json({ error: 'Trop de tentatives. Réessayez dans quelques minutes.' }, { status: 429, headers: { 'Retry-After': String(attempt.retryAfter) } });

  const auth = createClient(url, publishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await auth.auth.signInWithPassword({ email, password });
  if (error || !data.session) return NextResponse.json({ error: 'Connexion impossible : vérifiez vos identifiants.' }, { status: 401 });
  if (data.user?.email?.toLowerCase() !== process.env.ORIZIA_ADMIN_EMAIL?.trim().toLowerCase()) {
    await auth.auth.signOut();
    return NextResponse.json({ error: 'Connexion impossible : vérifiez vos identifiants.' }, { status: 401 });
  }
  return NextResponse.json({ session: data.session }, { headers: { 'Cache-Control': 'no-store' } });
}
