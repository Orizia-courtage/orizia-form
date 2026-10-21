import { createClient } from '@supabase/supabase-js';

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function requireAdmin(request) {
  const supabase = getSupabaseAdmin();
  const allowedEmail = process.env.ORIZIA_ADMIN_EMAIL?.trim().toLowerCase();
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!supabase || !allowedEmail || !token) return null;
  const { data, error } = await supabase.auth.getUser(token);
  if (error || data.user?.email?.toLowerCase() !== allowedEmail) return null;
  return { supabase, user: data.user };
}
