// Server-only: never expose webhook URLs or their shared key to the browser.
export function webhookConfig(kind, env = process.env) {
  const suffix = kind === 'rappel' ? 'RAPPEL' : 'SUBMIT';
  const n8nUrl = env[`N8N_WEBHOOK_${suffix}_URL`];
  const url = n8nUrl || env[`MAKE_WEBHOOK_${suffix}_URL`];
  if (!url) throw new Error('Webhook non configuré.');
  if (n8nUrl && !env.N8N_WEBHOOK_SECRET) {
    throw new Error('Clé du webhook n8n non configurée.');
  }
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:') throw new Error('Le webhook doit utiliser HTTPS.');
  return {
    url,
    headers: {
      'Content-Type': 'application/json',
      ...(n8nUrl ? { 'X-Orizia-Webhook-Key': env.N8N_WEBHOOK_SECRET } : {}),
    },
  };
}

export async function forwardWebhook(config, payload, fetcher = fetch) {
  // No retry or automatic fallback: an upstream timeout may follow a successful
  // insert/email, and retrying could create duplicate dossiers or messages.
  const response = await fetcher(config.url, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(25000),
    redirect: 'error',
    cache: 'no-store',
  });
  return response.ok;
}
