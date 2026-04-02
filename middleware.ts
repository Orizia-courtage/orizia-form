import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// C'est cette ligne précise que Next.js cherchait et ne trouvait pas :
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

// Définir les routes à protéger (le site entier)
export const config = {
  matcher: '/:path*',
};