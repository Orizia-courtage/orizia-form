import http from 'node:http';
import { MongoClient } from 'mongodb';

const { MONGODB_URI, MONGODB_DATABASE, RAC_COUNTER_SECRET } = process.env;
if (!MONGODB_URI || !MONGODB_DATABASE || !RAC_COUNTER_SECRET) throw new Error('Configuration du compteur RAC manquante.');

const client = new MongoClient(MONGODB_URI);
let database;

async function getDatabase() {
  if (!database) {
    await client.connect();
    database = client.db(MONGODB_DATABASE);
  }
  return database;
}

function json(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(payload));
}

function normalizedEmail(value) { return String(value || '').trim().toLowerCase(); }
function normalizedPhone(value) { return String(value || '').replace(/[^+\d]/g, '').replace(/^00/, '+'); }
function normalizedName(value) { return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, ''); }

async function readBody(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 32 * 1024) throw new Error('Payload too large.');
  }
  return body ? JSON.parse(body) : {};
}

async function allocateDossier(payload) {
  const db = await getDatabase();
  const email = normalizedEmail(payload.profil_mail);
  const phone = normalizedPhone(payload.profil_tel);
  const filters = [];
  if (email) filters.push({ email_normalized: email });
  if (phone) filters.push({ telephone_normalized: phone });
  const clients = db.collection('clients');
  let client = filters.length ? await clients.findOne({ $or: filters }) : null;
  const now = new Date();
  if (!client) {
    const created = {
      civilite: String(payload.profil_genre || '').trim() || null,
      prenom: String(payload.profil_prenom || '').trim(), nom: String(payload.profil_nom || '').trim(),
      date_naissance: /^\d{4}-\d{2}-\d{2}$/.test(String(payload.profil_date_naissance || '')) ? String(payload.profil_date_naissance) : null,
      searchName: `${normalizedName(payload.profil_nom)} ${normalizedName(payload.profil_prenom)}`,
      email: String(payload.profil_mail || '').trim() || null, email_normalized: email || null,
      telephone: String(payload.profil_tel || '').trim() || null, telephone_normalized: phone || null,
      source: 'Formulaire RAC Site', createdAt: now, updatedAt: now,
    };
    const result = await clients.insertOne(created);
    client = { ...created, _id: result.insertedId };
  } else {
    await clients.updateOne({ _id: client._id }, { $set: { updatedAt: now, lastSource: 'Formulaire RAC Site', ...(client.date_naissance ? {} : { date_naissance: /^\d{4}-\d{2}-\d{2}$/.test(String(payload.profil_date_naissance || '')) ? String(payload.profil_date_naissance) : null }) } });
  }
  const result = await db.collection('Counters').findOneAndUpdate(
    { _id: 'rac_dossier' }, { $inc: { sequence: 1 }, $set: { updatedAt: now } }, { upsert: true, returnDocument: 'after' },
  );
  const counter = result?.value ?? result;
  const sequence = Number(counter?.sequence);
  if (!Number.isSafeInteger(sequence) || sequence < 1) throw new Error('Compteur RAC invalide.');
  return { numero_dossier: `DS${String(sequence).padStart(6, '0')}`, client_id: client._id.toString() };
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'GET' && request.url === '/healthz') return json(response, 200, { ok: true });
  if (request.method !== 'POST' || !['/next', '/allocate-dossier'].includes(request.url)) return json(response, 404, { error: 'not_found' });
  if (request.headers['x-rac-counter-secret'] !== RAC_COUNTER_SECRET) return json(response, 401, { error: 'unauthorized' });

  try {
    if (request.url === '/allocate-dossier') return json(response, 200, await allocateDossier(await readBody(request)));
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
