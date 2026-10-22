import http from 'node:http';
import { MongoClient } from 'mongodb';

const { MONGODB_URI, RAC_COUNTER_SECRET } = process.env;
if (!MONGODB_URI || !RAC_COUNTER_SECRET) throw new Error('Configuration du compteur RAC manquante.');

const client = new MongoClient(MONGODB_URI);
let database;

async function getDatabase() {
  if (!database) {
    await client.connect();
    database = client.db();
  }
  return database;
}

function json(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(payload));
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'GET' && request.url === '/healthz') return json(response, 200, { ok: true });
  if (request.method !== 'POST' || request.url !== '/next') return json(response, 404, { error: 'not_found' });
  if (request.headers['x-rac-counter-secret'] !== RAC_COUNTER_SECRET) return json(response, 401, { error: 'unauthorized' });

  try {
    const result = await (await getDatabase()).collection('Counters').findOneAndUpdate(
      { _id: 'rac_dossier' },
      { $inc: { sequence: 1 }, $set: { updatedAt: new Date() } },
      { upsert: true, returnDocument: 'after' },
    );
    const document = result?.value ?? result;
    const sequence = Number(document?.sequence);
    if (!Number.isSafeInteger(sequence) || sequence < 1) throw new Error('Compteur RAC invalide.');
    return json(response, 200, { numero_dossier: `DS${String(sequence).padStart(6, '0')}` });
  } catch (error) {
    console.error('RAC counter error', error instanceof Error ? error.message : 'unknown');
    return json(response, 503, { error: 'counter_unavailable' });
  }
});

server.listen(3000, '0.0.0.0');
