// Partage du lien de recommandation par SMS depuis un e-mail.
// Les messageries (Gmail, Outlook…) bloquent souvent les liens « sms: » et iPhone / Android
// n'écrivent pas le message pré-rempli de la même façon : ce relais ouvre la bonne application SMS.
//   /partager?c=CODE            → SMS
//   /partager?c=CODE&via=whatsapp → WhatsApp

const SITE_URL = 'https://www.orizia-courtage.fr';
const escapeHtml = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function shareText(code) {
  return `Je te recommande Cindy Urbansky, ma courtière : elle s'est occupée de mon dossier et c'était top. Laisse tes coordonnées ici, elle te rappelle : ${SITE_URL}/r/${code}`;
}

export function GET(request) {
  const url = new URL(request.url);
  const code = String(url.searchParams.get('c') || '').toUpperCase();
  if (!/^[A-Z0-9]{4,12}$/.test(code)) return Response.redirect(`${SITE_URL}/parrainage`, 302);
  const text = encodeURIComponent(shareText(code));
  const ua = request.headers.get('user-agent') || '';
  const apple = /iPhone|iPad|iPod|Macintosh/i.test(ua);
  const whatsapp = url.searchParams.get('via') === 'whatsapp';
  const target = whatsapp ? `https://wa.me/?text=${text}` : `sms:${apple ? '&' : '?'}body=${text}`;
  const label = whatsapp ? 'Ouvrir WhatsApp' : 'Ouvrir mes messages';
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Partager ma recommandation</title>
<style>body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#f4f7f5;color:#1b1d1a;display:grid;place-items:center;min-height:100vh;padding:16px;box-sizing:border-box}main{max-width:420px;background:#fff;border-radius:18px;padding:28px 22px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,.06)}h1{font-size:1.25rem;margin:0 0 10px}p{line-height:1.5;color:#4b524d}a.btn{display:block;background:#1b1d1a;color:#fff;text-decoration:none;font-weight:700;padding:15px;border-radius:12px;margin:18px 0 10px}button{width:100%;padding:13px;border-radius:12px;border:1px solid #cfd8d3;background:#fff;font-size:1rem;cursor:pointer}small{display:block;margin-top:14px;color:#7a827d;word-break:break-all}</style></head>
<body><main><h1>Partager ma recommandation</h1><p>Votre message est prêt : choisissez simplement le ou les proches à qui l'envoyer.</p>
<a class="btn" id="go" href="${escapeHtml(target)}">${label}</a>
<button type="button" id="copy">Copier le lien</button><small>${escapeHtml(`${SITE_URL}/r/${code}`)}</small></main>
<script>
document.getElementById('copy').onclick=function(){var t=${JSON.stringify(shareText(code))};(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){document.getElementById('copy').textContent='Message copié ✓'}).catch(function(){prompt('Copiez le message :',t)})};
setTimeout(function(){location.href=document.getElementById('go').href},150);
</script></body></html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
}
