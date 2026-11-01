import QRCode from 'qrcode';

export const runtime = 'nodejs';

// QR code de la page de recommandation d'un client (www.orizia-courtage.fr/r/CODE),
// sous forme d'image PNG : utilisé dans l'e-mail de la carte de recommandation,
// où les messageries n'affichent pas les images intégrées au message.
export async function GET(_request, { params }) {
  const { code: raw } = await params;
  const code = String(raw || '').replace(/\.png$/i, '').toUpperCase();
  if (!/^[A-Z0-9]{4,12}$/.test(code)) return new Response('Code invalide', { status: 400 });
  const png = await QRCode.toBuffer(`https://www.orizia-courtage.fr/r/${code}`, {
    type: 'png', width: 480, margin: 2, errorCorrectionLevel: 'M', color: { dark: '#1b1d1a', light: '#ffffff' },
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Robots-Tag': 'noindex' } });
}
