import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function isAuthenticated(request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!token || !url || !key) return false;
  const client = createClient(url, key, { auth: { persistSession: false } });
  const { data: { user } } = await client.auth.getUser(token);
  return Boolean(user);
}

export async function GET(request) {
  if (!(await isAuthenticated(request))) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  const supabase = getAdminClient();
  if (!supabase) return NextResponse.json({ error: 'Configuration Supabase incomplète' }, { status: 500 });
  const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  if (!(await isAuthenticated(request))) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  const supabase = getAdminClient();
  if (!supabase) return NextResponse.json({ error: 'Configuration Supabase incomplète' }, { status: 500 });
  const body = await request.json();
  const { id, created_at, updated_at, ...article } = body;
  const { data, error } = await supabase.from('articles').insert(article).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(request) {
  if (!(await isAuthenticated(request))) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  const supabase = getAdminClient();
  const body = await request.json();
  const { id, created_at, updated_at, ...article } = body;
  if (!supabase || !id) return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  const { data, error } = await supabase.from('articles').update(article).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(request) {
  if (!(await isAuthenticated(request))) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  const supabase = getAdminClient();
  const id = new URL(request.url).searchParams.get('id');
  if (!supabase || !id) return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return new NextResponse(null, { status: 204 });
}
