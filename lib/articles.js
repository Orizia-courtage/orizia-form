import { getPublicSupabase } from './supabase';

export async function getPublishedArticles(type) {
  const supabase = getPublicSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from('articles')
    .select('id, slug, type, title, excerpt, cover_image_url, published_at, author')
    .eq('type', type)
    .eq('is_published', true)
    .order('published_at', { ascending: false });
  return data || [];
}

export async function getPublishedArticle(type, slug) {
  const supabase = getPublicSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('type', type)
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();
  return data;
}
