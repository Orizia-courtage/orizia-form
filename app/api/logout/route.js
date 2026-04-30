import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
  
  // Supprimer le cookie d'authentification
  response.cookies.delete('site-auth');
  
  return response;
}
