import { NextResponse } from 'next/server';

export function proxy(request) {
  // Si les variables d'environnement ne sont pas définies, pas de protection
  if (!process.env.SITE_USER || !process.env.SITE_PASSWORD) {
    return NextResponse.next();
  }

  // Vérifier si l'utilisateur est déjà authentifié via cookie
  const authCookie = request.cookies.get('site-auth');
  
  if (authCookie?.value === 'authenticated') {
    return NextResponse.next();
  }

  // Vérifier les credentials dans l'en-tête Authorization (Basic Auth)
  const authHeader = request.headers.get('authorization');
  
  if (authHeader) {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    if (
      username === process.env.SITE_USER &&
      password === process.env.SITE_PASSWORD
    ) {
      // Authentification réussie : créer un cookie et continuer
      const response = NextResponse.next();
      response.cookies.set('site-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 jours
      });
      return response;
    }
  }

  // Demander l'authentification
  return new NextResponse('Authentification requise', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Site protégé"',
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf :
     * - api (API routes)
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico, robots.txt, etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.webp|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.ico).*)',
  ],
};
