import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('Contact rejects unverified requests before email and escapes verified messages', async () => {
 const previousFetch = globalThis.fetch, previousKey = process.env.TURNSTILE_SECRET_KEY;
 const sent = []; globalThis.contactTestSend = async data => {sent.push(data); return {};};
 process.env.TURNSTILE_SECRET_KEY = 'test';
 let action = 'orizia_contact';
 globalThis.fetch = async () => ({ok:true,json:async()=>({success:true,hostname:'www.orizia-courtage.fr',action})});
 try {
  const source = (await readFile(new URL('../app/api/contact/route.js',import.meta.url),'utf8'))
   .replace("import { Resend } from 'resend';",'class Resend { emails = {send: globalThis.contactTestSend}; }')
   .replace('@/lib/form-protection.mjs',new URL('../lib/form-protection.mjs',import.meta.url).href);
  const {POST} = await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
  const body = {prenom:'Test',nom:'Test',email:'test@example.invalid',commentaire:'<img src=x onerror=alert(1)>'};
  const req = data => new Request('https://www.orizia-courtage.fr/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  assert.equal((await POST(req(body))).status,403); assert.equal(sent.length,0);
  action='orizia_submit'; assert.equal((await POST(req({...body,turnstileToken:'wrong-action'}))).status,403); assert.equal(sent.length,0);
  action='orizia_contact';
  assert.equal((await POST(req({...body,turnstileToken:'fresh',commentaire:'a'.repeat(1001)}))).status,400);
  assert.equal((await POST(req({...body,turnstileToken:'fresh'}))).status,200);
  assert.equal(sent.length,1); assert.ok(sent[0].html.includes('&lt;img')); assert.ok(!sent[0].html.includes('<img'));
 } finally { globalThis.fetch=previousFetch; delete globalThis.contactTestSend; if(previousKey===undefined) delete process.env.TURNSTILE_SECRET_KEY; else process.env.TURNSTILE_SECRET_KEY=previousKey; }
});
