import { after } from 'next/server';
import { INDEXING } from '@/lib/indexing.mjs';

// IndexNow : prévient Bing, Yandex, Seznam… dès qu'une page est publiée, modifiée ou retirée.
// Ne fait rien tant que l'indexation est désactivée (SITE_INDEXING ≠ "on").
// La clé est publique par conception : le fichier public/<clé>.txt prouve que le site en est propriétaire.
export const INDEXNOW_KEY = '4adfd227e4bc7221781c28050b84a9e2';
const HOST = 'www.orizia-courtage.fr';

export function notifySearchEngines(urls) {
  const list = [...new Set(urls)].filter((url) => typeof url === 'string' && url.startsWith(`https://${HOST}/`));
  if (!INDEXING || !list.length) return;
  // Après la réponse : la publication ne dépend jamais de la disponibilité d'IndexNow.
  after(async () => {
    try {
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`, urlList: list }),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok && response.status !== 202) console.warn('[indexnow] réponse', response.status);
    } catch (error) {
      console.warn('[indexnow] échec', error.message);
    }
  });
}
