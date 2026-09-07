import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readForm, verifyTurnstile, createCallbackProof, verifyCallbackProof, callbackData } from '../lib/form-protection.mjs';
import { mountTurnstile } from '../lib/turnstile-lifecycle.mjs';

const env = { TURNSTILE_SECRET_KEY: 'test-secret-not-a-real-key' };
const payload = { numero_dossier: 'TEST-001', profil_nom: 'Test', profil_prenom: 'Camille', profil_mail: 'test@example.invalid', profil_tel: '0600000000' };
const request = (body = payload, headers = {}) => new Request('https://www.orizia-courtage.fr/api/orizia-form', {
  method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body),
});
const failure = status => error => error.status === status;
const verified = (overrides = {}) => async () => ({ ok: true, json: async () => ({ success: true, hostname: 'www.orizia-courtage.fr', action: 'orizia_submit', ...overrides }) });

test('Valid form survives validation; wrong origin, malformed JSON and nested payloads fail', async () => {
  assert.deepEqual(await readForm(request()), payload);
  await assert.rejects(readForm(request(payload, { origin: 'https://attacker.invalid' })), failure(403));
  await assert.rejects(readForm(request({ ...payload, unexpected: {} })), failure(400));
  await assert.rejects(readForm(new Request(request().url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{' })), failure(400));
  await assert.rejects(readForm(request(payload, { 'content-type': 'text/plain' })), failure(415));
});
test('Oversized body is rejected even without Content-Length', async () => {
  await assert.rejects(readForm(request({ ...payload, field: 'x'.repeat(33000) })), failure(413));
  await assert.rejects(readForm(request({ ...payload, profil_mail: 'name\r\n@example.org' })), failure(400));
});
test('Missing server secret or token never bypasses Turnstile', async () => {
  let calls = 0;
  const fake = async () => { calls++; throw new Error('should not call'); };
  await assert.rejects(verifyTurnstile('token', request(), 'orizia_submit', {}, fake), failure(503));
  await assert.rejects(verifyTurnstile('', request(), 'orizia_submit', env, fake), failure(403));
  assert.equal(calls, 0);
});
test('Only a valid token for this hostname and action is accepted', async () => {
  await verifyTurnstile('token', request(), 'orizia_submit', env, verified());
  for (const bad of [{ success: false }, { hostname: 'attacker.invalid' }, { action: 'orizia_rappel' }, { action: undefined }]) {
    await assert.rejects(verifyTurnstile('token', request(), 'orizia_submit', env, verified(bad)), failure(403));
  }
  await assert.rejects(verifyTurnstile('token', request(), 'orizia_submit', env, async () => { throw new Error('timeout'); }), failure(503));
});
test('Callback proof is bound to the original contact and dossier, expires and rejects tampering', () => {
  const now = 1800000000000;
  const proof = createCallbackProof(payload, env, now);
  verifyCallbackProof(callbackData(payload), proof, env, now + 1000);
  for (const key of ['numero_dossier', 'profil_nom', 'profil_mail', 'profil_tel']) {
    assert.throws(() => verifyCallbackProof({ ...payload, [key]: 'changed' }, proof, env, now), failure(403));
  }
  assert.throws(() => verifyCallbackProof(payload, proof, env, now + 7201000), failure(403));
  assert.throws(() => verifyCallbackProof(payload, proof, { TURNSTILE_SECRET_KEY: 'other' }, now), failure(403));
  assert.throws(() => verifyCallbackProof(payload, undefined, env, now), failure(403));
});
test('Widget handles delayed script loading, token expiry, targeted reset and cleanup (including widget ID 0)', () => {
  const tokens = [], messages = [], callbacks = {};
  const input = { value: 'expired-token' };
  let tick, event, resets = 0, removed = 0;
  const browser = { setInterval: fn => { tick = fn; return 1; }, clearInterval() {},
    addEventListener: (_, fn) => { event = fn; }, removeEventListener() {} };
  const cleanup = mountTurnstile({ querySelector: () => input }, 'orizia_rappel', 'site', t => tokens.push(t), m => messages.push(m), browser);
  browser.turnstile = { render: (_, options) => { Object.assign(callbacks, options); return 0; }, reset: () => resets++, remove: () => removed++ };
  tick();
  assert.equal(callbacks.action, 'orizia_rappel');
  callbacks.callback('fresh');
  callbacks['expired-callback']();
  assert.equal(input.value, '');
  assert.equal(tokens.at(-1), '');
  event({ detail: 'orizia_submit' });
  assert.equal(resets, 0);
  event({ detail: 'orizia_rappel' });
  assert.equal(resets, 1);
  cleanup();
  callbacks.callback('late');
  assert.equal(tokens.at(-1), '');
  assert.equal(removed, 1);
});

// Exercise real route orchestration with fake network responses, no mail or DB.
async function loadRoute(kind) {
  let code = readFileSync(new URL(`../app/api/orizia-${kind}/route.js`, import.meta.url), 'utf8');
  code = code.replace("import { NextResponse } from 'next/server';", 'const NextResponse={json:(data,init)=>Response.json(data,init)};');
  for (const name of ['automation-webhook', 'form-protection']) {
    code = code.replace(`@/lib/${name}.mjs`, new URL(`../lib/${name}.mjs`, import.meta.url).href);
  }
  return import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
}
test('Routes require validation before forwarding, strip anti-bot fields and issue proof only after successful submission', async () => {
  const oldFetch = globalThis.fetch;
  const keys = ['TURNSTILE_SECRET_KEY', 'N8N_WEBHOOK_SUBMIT_URL', 'N8N_WEBHOOK_RAPPEL_URL', 'N8N_WEBHOOK_SECRET'];
  const saved = Object.fromEntries(keys.map(k => [k, process.env[k]]));
  Object.assign(process.env, env, { N8N_WEBHOOK_SUBMIT_URL: 'https://upstream.invalid/form', N8N_WEBHOOK_RAPPEL_URL: 'https://upstream.invalid/rappel', N8N_WEBHOOK_SECRET: 'test' });
  const calls = [];
  let action = 'orizia_submit', accepted = true, upstreamOk = true;
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    if (url.includes('siteverify')) return { ok: true, json: async () => ({ success: accepted, action, hostname: 'www.orizia-courtage.fr' }) };
    return { ok: upstreamOk };
  };
  try {
    const form = await loadRoute('form');
    const rappel = await loadRoute('rappel');
    assert.equal((await form.POST(request())).status, 403);
    assert.equal(calls.length, 0);
    const response = await form.POST(request({ ...payload, turnstileToken: 'fresh' }));
    const result = await response.json();
    assert.equal(response.status, 200);
    assert.ok(result.rappelProof);
    assert.equal(JSON.parse(calls.at(-1).options.body).turnstileToken, undefined);
    accepted = false; // Cloudflare's timeout-or-duplicate result on a reused token.
    assert.equal((await form.POST(request({ ...payload, turnstileToken: 'used' }))).status, 403);
    assert.equal(calls.filter(x => x.url.includes('upstream.invalid')).length, 1);
    accepted = true; action = 'orizia_rappel';
    assert.equal((await rappel.POST(request({ ...payload, turnstileToken: 'fresh' }))).status, 403);
    assert.equal((await rappel.POST(request({ ...payload, turnstileToken: 'fresh', rappelProof: result.rappelProof }))).status, 200);
    const sent = JSON.parse(calls.at(-1).options.body);
    assert.equal(sent.rappelProof, undefined);
    assert.equal(sent.turnstileToken, undefined);
    assert.equal(sent.action, 'rappel_souhaite');
    action = 'orizia_submit'; upstreamOk = false;
    const failed = await form.POST(request({ ...payload, turnstileToken: 'fresh' }));
    assert.equal(failed.status, 502);
    assert.equal((await failed.json()).rappelProof, undefined);
  } finally {
    globalThis.fetch = oldFetch;
    for (const k of keys) { if (saved[k] === undefined) delete process.env[k]; else process.env[k] = saved[k]; }
  }
});
