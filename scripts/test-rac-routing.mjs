import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const w=JSON.parse(readFileSync(new URL('../automation/n8n/orizia-rac.json',import.meta.url)));
const prepare=new Function('$input',w.nodes.find(n=>n.name==='Preparer rac').parameters.jsCode);
const base={numero_dossier:'TEST-001',profil_prenom:'Camille',profil_nom:'Test',profil_mail:'test@example.invalid',profil_tel:'0600000000',Type:'Propriétaire',type_profession:'Salarié',BDF:false};
const render=(Segment,extra={})=>prepare({first:()=>({json:{body:{...base,Segment,...extra}}})})[0].json;
const high=['Investisseur 1',...[1,2].map(n=>'Client projet premium '+n),...[1,2,3,4,5,6,7].map(n=>'Trésorerie '+n),...[1,2,3,4,5].map(n=>'Pro Contraint '+n)];
const low=['IR 1','IR 2',...[1,2,3,4].map(n=>'Petit Pro '+n),...[1,2,3,4,5].map(n=>'Client projet '+n),...[1,2,3].map(n=>'Pro Consommateur '+n),'Autre','LOC','BDF','TNS 1','TNS 2','TNS 3',undefined,'','Client projet premium inconnu'];
function path(result){
 const visited=[];let name='Reception rac';
 while(name){
  assert.ok(!visited.includes(name),'Workflow cycle');visited.push(name);
  const output=name==='Email client autorise'?(result.sendClientEmail?0:1):0;
  name=w.connections[name]?.main[output]?.[0]?.node;
 }
 return visited;
}
test('All high-potential segments notify Cindy then the client and confirm success',()=>{
 for(const segment of high){const r=render(segment);assert.equal(r.sendClientEmail,true,segment);assert.match(r.internalSubject,/^\[GROS POTENTIEL\]/);assert.ok(r.internalSubject.includes(segment));assert.match(r.html0,/GROS POTENTIEL/);assert.deepEqual(path(r),['Reception rac','Preparer rac','Enregistrer dossier MongoDB','Email rac Cindy','Email client autorise','Email rac client','Confirmer rac']);}
});
test('Low, unknown and missing segments notify Cindy but never reach the client email',()=>{
 for(const segment of low){const r=render(segment);assert.equal(r.sendClientEmail,false,String(segment));assert.match(r.internalSubject,/^\[PETIT POTENTIEL\]/);assert.match(r.html0,/Aucun email automatique/);assert.deepEqual(path(r),['Reception rac','Preparer rac','Enregistrer dossier MongoDB','Email rac Cindy','Email client autorise','Confirmer rac']);}
});
test('BDF, TNS and housing take priority over a conflicting high-potential segment',()=>{
 for(const extra of [{BDF:true},{BDF:'true'},{type_profession:'Commerçant, Artisan'},{type_profession:'Profession libérale'},{type_profession:"Chef d'entreprise"},{Type:'Locataire'},{Type:'Hébergé à titre gratuit'}]) assert.equal(render('Investisseur 1',extra).sendClientEmail,false);
 assert.equal(render('Investisseur 1',{BDF:true,Type:'Locataire',type_profession:'Profession libérale'}).routingSegment,'BDF');
 assert.equal(render('Investisseur 1',{Type:'Locataire',type_profession:'Profession libérale'}).routingSegment,'TNS');
});
test('Strict IF uses prepared data, internal fields are safe and MongoDB mapping stays intact',()=>{
 const gate=w.nodes.find(n=>n.name==='Email client autorise');
 assert.equal(gate.parameters.conditions.conditions[0].leftValue,"={{ $('Preparer rac').first().json.sendClientEmail }}");
 assert.equal(gate.parameters.conditions.conditions[0].operator.operation,'true');
 assert.equal(gate.parameters.conditions.options.typeValidation,'strict');
 assert.equal(w.nodes.find(n=>n.name==='Email rac Cindy').parameters.subject,"={{ $('Preparer rac').first().json.internalSubject }}");
 const r=render('<img src=x>\r\nBcc: bad@example.invalid');assert.doesNotMatch(r.internalSubject,/[\r\n]/);assert.ok(r.html0.includes('&lt;img'));assert.ok(!r.html0.includes('<img src=x>'));
 const fields=w.nodes.find(n=>n.type==='n8n-nodes-base.mongoDb').parameters.fields.split(',');assert.equal(fields.length,39);assert.ok(!fields.includes('sendClientEmail'));
});
