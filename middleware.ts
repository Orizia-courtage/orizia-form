import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// On renomme la fonction exportée de "middleware" à "proxy"
export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    // Décoder la chaîne Base64
    const [user, pwd] = atob(authValue).split(':');

    // Vérifier les identifiants
    if (user === process.env.SITE_USER && pwd === process.env.SITE_PASSWORD) {
      return NextResponse.next();
    }
  }

  // Si pas d'identifiants ou identifiants incorrects, forcer la popup
  return new NextResponse('Authentification requise', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Zone sécurisée"',
    },
  });
}

// Définir les routes à protéger (en excluant les images et fichiers vitaux)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|images/|.*\\.(?:webp|png|jpg|jpeg|svg|ico)$).*)',
  ],
};