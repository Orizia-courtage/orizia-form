import { NextResponse } from 'next/server';

const PUBLIC_PATHS = new Set([
  '/cindy-urbansky.vcf',
  '/images/photo-cindy.webp',
]);

// Jeton de session dérivé des identifiants : non forgeable sans connaître le mot de passe.
async function expectedToken() {
  const data = new TextEncoder().encode(`${process.env.SITE_USER}:${process.env.SITE_PASSWORD}:orizia-site-lock-v1`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Comparaison à temps constant (évite de deviner une valeur caractère par caractère).
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function proxy(request) {
  if (PUBLIC_PATHS.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Si les variables d'environnement ne sont pas définies, pas de protection.
  if (!process.env.SITE_USER || !process.env.SITE_PASSWORD) {
    return NextResponse.next();
  }

  const token = await expectedToken();

  // Cookie de session déjà posé et valide.
  const authCookie = request.cookies.get('site-auth');
  if (authCookie && safeEqual(authCookie.value, token)) {
    return NextResponse.next();
  }

  // Vérifier les identifiants dans l'en-tête Authorization (Basic Auth).
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Basic ')) {
    let username = '';
    let password = '';
    try {
      const decoded = atob(authHeader.slice(6));
      const idx = decoded.indexOf(':');
      if (idx !== -1) { username = decoded.slice(0, idx); password = decoded.slice(idx + 1); }
    } catch { /* en-tête mal formé : identifiants vides, l'accès sera refusé */ }

    if (safeEqual(username, process.env.SITE_USER) && safeEqual(password, process.env.SITE_PASSWORD)) {
      const response = NextResponse.next();
      response.cookies.set('site-auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 jours
      });
      return response;
    }
  }

  // Demander l'authentification.
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
