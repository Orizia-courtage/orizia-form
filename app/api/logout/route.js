import { NextResponse } from 'next/server';

export async function GET(request) {
  const response = NextResponse.redirect(new URL('/', request.url));
  
  // Supprimer le cookie d'authentification
  response.cookies.delete('site-auth');
  
  return response;
}
