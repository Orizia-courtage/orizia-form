'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const sections = [
  { title: 'Endettement', description: 'Saisissez les pourcentages sans le signe %, par exemple 35 pour 35 %.', ratio: true, fields: [['debt.maxRatio', 'Taux maximum'], ['debt.targetRatio', 'Taux cible'], ['debt.watchRatio', 'Seuil à surveiller'], ['debt.highRatio', 'Seuil élevé'], ['debt.criticalRatio', 'Seuil critique']] },
  { title: 'Crédit immobilier', description: 'Taux annuels en pourcentage.', fields: [['credit.defaultRate', 'Taux estimé par défaut'], ['credit.minRate', 'Taux minimum'], ['credit.maxRate', 'Taux maximum']] },
  { title: 'SCPI', description: 'Taux annuels en pourcentage.', ratioKeys: ['scpi.revaluationRate'], fields: [['scpi.defaultDistributionRate', 'Distribution par défaut'], ['scpi.minDistributionRate', 'Distribution minimum'], ['scpi.maxDistributionRate', 'Distribution maximum'], ['scpi.revaluationRate', 'Revalorisation annuelle']] },
  { title: 'Autres simulateurs', description: 'Valeurs utilisées dans les calculateurs affichés sur le site.', ratioKeys: ['crowdfunding.flatTaxRate', 'crowdfunding.socialTaxRate', 'soulte.sharingDutyRate'], fields: [['crowdfunding.livretANetRate', 'Taux net du Livret A'], ['crowdfunding.defaultRate', 'Crowdfunding : taux par défaut'], ['crowdfunding.minRate', 'Crowdfunding : taux minimum'], ['crowdfunding.maxRate', 'Crowdfunding : taux maximum'], ['crowdfunding.flatTaxRate', 'Crowdfunding : PFU total'], ['crowdfunding.socialTaxRate', 'Crowdfunding : prélèvements sociaux'], ['soulte.sharingDutyRate', 'Droit de partage (soulte)']] },
  { title: 'Assurance-vie', description: 'Les frais et prélèvements sont exprimés en pourcentage. Les abattements sont en euros.', ratioKeys: ['assuranceVie.paymentFeeRate', 'assuranceVie.managementFeeRate', 'assuranceVie.socialTaxRate', 'assuranceVie.pfnlBefore8YearsRate', 'assuranceVie.pfnlAfter8YearsRate'], fields: [['assuranceVie.paymentFeeRate', 'Frais sur versement'], ['assuranceVie.managementFeeRate', 'Frais de gestion annuels'], ['assuranceVie.socialTaxRate', 'Prélèvements sociaux'], ['assuranceVie.pfnlBefore8YearsRate', 'PFNL avant 8 ans'], ['assuranceVie.pfnlAfter8YearsRate', 'PFNL après 8 ans'], ['assuranceVie.abatementSingle', 'Abattement personne seule'], ['assuranceVie.abatementCouple', 'Abattement couple']] },
];

const zoneLabels = { 'ile-de-france': 'Île-de-France', 'nord-ouest': 'Nord-Ouest', 'nord-est': 'Nord-Est', 'sud-ouest': 'Sud-Ouest', 'sud-est': 'Sud-Est', corse: 'Corse', reunion: 'La Réunion', guadeloupe: 'Guadeloupe', guyane: 'Guyane', 'nouvelle-caledonie': 'Nouvelle-Calédonie', martinique: 'Martinique', mayotte: 'Mayotte', polynesie: 'Polynésie française', 'saint-martin': 'Saint-Martin', 'saint-barthelemy': 'Saint-Barthélemy', 'saint-pierre-miquelon': 'Saint-Pierre-et-Miquelon', 'wallis-futuna': 'Wallis-et-Futuna' };
const durationLabels = { '10': 'Jusqu’à 10 ans', '11-15': '11 à 15 ans', '16-20': '16 à 20 ans', '21-25': '21 à 25 ans' };
const racSegmentGroups = [
  ['Profils aujourd’hui orientés vers un rendez-vous', ['Investisseur 1', 'Client projet premium 1', 'Client projet premium 2', 'Trésorerie 1', 'Trésorerie 2', 'Trésorerie 3', 'Trésorerie 4', 'Trésorerie 5', 'Trésorerie 6', 'Trésorerie 7', 'Pro Contraint 1', 'Pro Contraint 2', 'Pro Contraint 3', 'Pro Contraint 4', 'Pro Contraint 5']],
  ['Autres segments', ['IR 1', 'IR 2', 'Petit Pro 1', 'Petit Pro 2', 'Petit Pro 3', 'Petit Pro 4', 'Client projet 1', 'Client projet 2', 'Client projet 3', 'Client projet 4', 'Client projet 5', 'Pro Consommateur 1', 'Pro Consommateur 2', 'Pro Consommateur 3', 'Autre']],
];
const racSegmentCategory = (segment) => segment.startsWith('Investisseur') || segment.startsWith('Client projet premium') || segment.startsWith('Trésorerie') || segment.startsWith('Pro Contraint') ? 'rdv' : 'other';
function read(settings, path) { return path.split('.').reduce((value, key) => value?.[key], settings); }
function write(settings, path, value) { const keys = path.split('.'); const next = structuredClone(settings); let target = next; keys.slice(0, -1).forEach((key) => { target = target[key]; }); target[keys.at(-1)] = value; return next; }
const numberValue = (raw, fallback = 0) => { const value = Number(String(raw).replace(',', '.')); return Number.isFinite(value) ? value : fallback; };
const editableNumber = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return '';
  // A percentage stored as a ratio (for example 0.3) can otherwise become
  // 30.000000000000004 after JavaScript arithmetic.
  return String(Number(number.toFixed(6)));
};

export default function AdministrationPage() {
  const [settings, setSettings] = useState(null); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [session, setSession] = useState(null); const [message, setMessage] = useState(''); const [saving, setSaving] = useState(false); const [selectedZone, setSelectedZone] = useState('ile-de-france');
  const configured = Boolean(supabase);
  useEffect(() => { fetch('/api/site-config', { cache: 'no-store' }).then((r) => r.json()).then((data) => setSettings(data.settings)).catch(() => setMessage('Impossible de charger les réglages.')); if (!supabase) return; supabase.auth.getSession().then(({ data }) => setSession(data.session)); const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession)); return () => listener.subscription.unsubscribe(); }, []);
  const updateField = (path, raw, ratio) => setSettings((current) => write(current, path, ratio ? numberValue(raw) / 100 : numberValue(raw)));
  const updateList = (path, index, patch) => setSettings((current) => { const list = [...(read(current, path) ?? [])]; list[index] = { ...list[index], ...patch }; return write(current, path, list); });
  const addListItem = (path, item) => setSettings((current) => write(current, path, [...(read(current, path) ?? []), item]));
  const removeListItem = (path, index) => setSettings((current) => write(current, path, (read(current, path) ?? []).filter((_, itemIndex) => itemIndex !== index)));
  const updateZone = (duration, raw) => setSettings((current) => write(current, `credit.ratesByZone.${selectedZone}.${duration}`, numberValue(raw)));
  const updateRacResult = (category, patch) => setSettings((current) => write(current, `rac.results.${category}`, { ...read(current, `rac.results.${category}`), ...patch }));
  const updateRacSegment = (segment, patch) => setSettings((current) => write(current, `rac.segments.${segment}`, { ...read(current, `rac.segments.${segment}`), ...patch }));
  const signIn = async (event) => { event.preventDefault(); if (!supabase) return; setMessage('Connexion…'); const response = await fetch('/api/admin-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }); const data = await response.json().catch(() => ({})); if (!response.ok || !data.session) { setMessage(data.error || 'Connexion impossible : vérifiez vos identifiants.'); return; } const { error } = await supabase.auth.setSession({ access_token: data.session.access_token, refresh_token: data.session.refresh_token }); setMessage(error ? 'Connexion impossible : vérifiez vos identifiants.' : 'Connexion établie.'); };
  const signOut = async () => { await supabase?.auth.signOut(); setMessage('Vous êtes déconnectée.'); };
  const save = async () => { setSaving(true); setMessage('Enregistrement…'); const response = await fetch('/api/site-config', { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify({ settings }) }); const data = await response.json().catch(() => ({})); setSaving(false); if (!response.ok) { setMessage(data.error || "L’enregistrement a échoué."); return; } setSettings(data.settings); setMessage('Enregistré — les simulateurs utilisent ces nouvelles valeurs immédiatement.'); };

  return <main style={{ minHeight: '100vh', background: '#f4f8f6', color: '#1b1d1a', padding: '48px 16px', fontFamily: 'inherit' }}><section style={{ maxWidth: 1050, margin: '0 auto' }}>
    <p style={eyebrowStyle}>ORIZIA COURTAGE · ESPACE PRIVÉ</p><h1 style={{ fontSize: 'clamp(30px, 5vw, 48px)', margin: '10px 0 8px' }}>Réglages du site</h1><p style={{ color: '#59635e', lineHeight: 1.6, marginTop: 0 }}>Modifiez les chiffres utilisés par les simulateurs et les repères affichés sans passer par GitHub ni Vercel.</p>
    {!configured && <div style={noticeStyle}>Configuration Supabase incomplète. Ajoutez les variables Supabase dans Vercel avant de pouvoir vous connecter.</div>}
    {!session && configured && <form onSubmit={signIn} style={cardStyle}><h2 style={{ marginTop: 0 }}>Connexion</h2><p style={descriptionStyle}>Utilisez le compte créé dans Supabase Authentication.</p><label style={labelStyle}>Adresse e-mail<input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label><label style={labelStyle}>Mot de passe<input style={inputStyle} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label><button style={buttonStyle} type="submit">Se connecter</button></form>}
    {session && settings && <><div style={{ ...noticeStyle, background: '#e3f3eb', borderColor: '#b3ddcb' }}>Connectée en tant que <strong>{session.user.email}</strong>. <button onClick={signOut} style={linkButtonStyle}>Se déconnecter</button></div>
      {sections.map((section) => <section key={section.title} style={cardStyle}><h2 style={{ margin: '0 0 6px' }}>{section.title}</h2><p style={descriptionStyle}>{section.description}</p><div style={gridStyle}>{section.fields.map(([path, label]) => { const ratio = section.ratio || section.ratioKeys?.includes(path); const value = read(settings, path); return <NumberField key={path} label={label} value={ratio ? Number(value ?? 0) * 100 : value ?? ''} onChange={(raw) => updateField(path, raw, ratio)} suffix={ratio || !path.includes('abatement') ? '%' : '€'} />; })}</div></section>)}
      <CrowdfundingEditor presets={settings.crowdfunding.presets} onUpdate={(i, patch) => updateList('crowdfunding.presets', i, patch)} onAdd={() => addListItem('crowdfunding.presets', { label: 'Nouveau profil', montant: 10000, taux: settings.crowdfunding.defaultRate, duree: 24 })} onRemove={(i) => removeListItem('crowdfunding.presets', i)} />
      <PerEditor items={settings.per.tranches} onUpdate={(i, patch) => updateList('per.tranches', i, patch)} onAdd={() => addListItem('per.tranches', { label: 'Nouvelle tranche', tmi: 0.3, plafond: 35000 })} onRemove={(i) => removeListItem('per.tranches', i)} />
      <AssuranceVieEditor items={settings.assuranceVie.repartition} onUpdate={(i, patch) => updateList('assuranceVie.repartition', i, patch)} onAdd={() => addListItem('assuranceVie.repartition', { fe: 50, uc: 50, taux: 2.75 })} onRemove={(i) => removeListItem('assuranceVie.repartition', i)} />
      <AssuranceRatesEditor items={settings.assuranceEmprunteur.ageRates} onUpdate={(i, patch) => updateList('assuranceEmprunteur.ageRates', i, patch)} onAdd={() => addListItem('assuranceEmprunteur.ageRates', { label: 'Nouvelle tranche', tauxBanque: 0.003, tauxOrizia: 0.0012, gain: 60 })} onRemove={(i) => removeListItem('assuranceEmprunteur.ageRates', i)} />
      <MortgageEditor rates={settings.credit.ratesByZone} selectedZone={selectedZone} onSelect={setSelectedZone} onUpdate={updateZone} />
      <RacResultsEditor results={settings.rac.results} onUpdate={updateRacResult} />
      <RacSegmentsEditor segments={settings.rac.segments} categoryResults={settings.rac.results} onUpdate={updateRacSegment} />
      <button onClick={save} disabled={saving} style={{ ...buttonStyle, opacity: saving ? .6 : 1 }}>{saving ? 'Enregistrement…' : 'Enregistrer les modifications'}</button></>}
    {message && <p aria-live="polite" style={{ marginTop: 18, color: message.startsWith('Enregistré') ? '#287155' : '#59433e' }}>{message}</p>}
  </section></main>;
}

function NumberField({ label, value, onChange, suffix }) { const hint = suffix === '€' ? 'Montant en euros' : suffix === 'mois' ? 'Nombre de mois' : 'Pourcentage'; const isInteger = suffix === 'mois'; return <label style={labelStyle}>{label}<span style={hintStyle}>{hint}</span><div style={{ position: 'relative' }}><input style={{ ...inputStyle, paddingRight: 40 }} type="number" inputMode={isInteger ? 'numeric' : 'decimal'} step={isInteger ? '1' : '0.01'} value={editableNumber(value)} onChange={(e) => onChange(e.target.value)} /><span style={suffixStyle}>{suffix}</span></div></label>; }
function Panel({ title, description, children }) { return <section style={cardStyle}><h2 style={{ margin: '0 0 6px' }}>{title}</h2><p style={descriptionStyle}>{description}</p>{children}</section>; }
function EditorCard({ children, onRemove }) { return <div style={editorCardStyle}>{onRemove && <button type="button" onClick={onRemove} style={removeButtonStyle}>Supprimer</button>}{children}</div>; }
function TextField({ label, value, onChange }) { return <label style={labelStyle}>{label}<input style={inputStyle} value={value ?? ''} onChange={(e) => onChange(e.target.value)} /></label>; }
function SmallNumber({ label, value, onChange, suffix = '%' }) { return <NumberField label={label} value={value} onChange={onChange} suffix={suffix} />; }
function CrowdfundingEditor({ presets, onUpdate, onAdd, onRemove }) { return <Panel title="Crowdfunding — profils prédéfinis" description="Ce sont les choix proposés au visiteur pour démarrer une simulation."><div style={editorGridStyle}>{presets.map((item, index) => <EditorCard key={`${item.label}-${index}`} onRemove={presets.length > 1 ? () => onRemove(index) : null}><TextField label="Nom du profil" value={item.label} onChange={(label) => onUpdate(index, { label })} /><SmallNumber label="Montant investi" value={item.montant} suffix="€" onChange={(montant) => onUpdate(index, { montant: numberValue(montant) })} /><SmallNumber label="Taux annuel" value={item.taux} onChange={(taux) => onUpdate(index, { taux: numberValue(taux) })} /><SmallNumber label="Durée" value={item.duree} suffix="mois" onChange={(duree) => onUpdate(index, { duree: numberValue(duree) })} /></EditorCard>)}</div><button type="button" onClick={onAdd} style={secondaryButtonStyle}>+ Ajouter un profil</button></Panel>; }
function PerEditor({ items, onUpdate, onAdd, onRemove }) { return <Panel title="PER — tranches d’imposition" description="Ces cartes déterminent l’économie d’impôt estimée dans le simulateur PER."><div style={editorGridStyle}>{items.map((item, index) => <EditorCard key={`${item.label}-${index}`} onRemove={items.length > 1 ? () => onRemove(index) : null}><TextField label="Nom de la tranche" value={item.label} onChange={(label) => onUpdate(index, { label })} /><SmallNumber label="Taux marginal d’imposition" value={Number(item.tmi) * 100} onChange={(value) => onUpdate(index, { tmi: numberValue(value) / 100 })} /><SmallNumber label="Plafond de déduction" value={item.plafond} suffix="€" onChange={(plafond) => onUpdate(index, { plafond: numberValue(plafond) })} /></EditorCard>)}</div><button type="button" onClick={onAdd} style={secondaryButtonStyle}>+ Ajouter une tranche</button></Panel>; }
function AssuranceVieEditor({ items, onUpdate, onAdd, onRemove }) { return <Panel title="Assurance-vie — rendements par répartition" description="Pour chaque composition, indiquez la part en fonds euros, la part en unités de compte et le rendement annuel estimé."><div style={editorGridStyle}>{items.map((item, index) => <EditorCard key={`${item.fe}-${item.uc}-${index}`} onRemove={items.length > 1 ? () => onRemove(index) : null}><SmallNumber label="Fonds euros" value={item.fe} onChange={(fe) => onUpdate(index, { fe: numberValue(fe), uc: Math.max(0, 100 - numberValue(fe)) })} /><SmallNumber label="Unités de compte" value={item.uc} onChange={(uc) => onUpdate(index, { uc: numberValue(uc), fe: Math.max(0, 100 - numberValue(uc)) })} /><SmallNumber label="Rendement annuel estimé" value={item.taux} onChange={(taux) => onUpdate(index, { taux: numberValue(taux) })} /></EditorCard>)}</div><button type="button" onClick={onAdd} style={secondaryButtonStyle}>+ Ajouter une répartition</button></Panel>; }
function AssuranceRatesEditor({ items, onUpdate, onAdd, onRemove }) { return <Panel title="Assurance emprunteur — taux par âge" description="Les taux sont annuels. Le gain est présenté comme une estimation au visiteur."><div style={editorGridStyle}>{items.map((item, index) => <EditorCard key={`${item.label}-${index}`} onRemove={items.length > 1 ? () => onRemove(index) : null}><TextField label="Tranche d’âge" value={item.label} onChange={(label) => onUpdate(index, { label })} /><SmallNumber label="Taux banque" value={Number(item.tauxBanque) * 100} onChange={(value) => onUpdate(index, { tauxBanque: numberValue(value) / 100 })} /><SmallNumber label="Taux Orizia" value={Number(item.tauxOrizia) * 100} onChange={(value) => onUpdate(index, { tauxOrizia: numberValue(value) / 100 })} /><SmallNumber label="Gain estimé" value={item.gain} onChange={(gain) => onUpdate(index, { gain: numberValue(gain) })} /></EditorCard>)}</div><button type="button" onClick={onAdd} style={secondaryButtonStyle}>+ Ajouter une tranche d’âge</button></Panel>; }
function MortgageEditor({ rates, selectedZone, onSelect, onUpdate }) { const zone = rates?.[selectedZone] ?? {}; return <Panel title="Taux immobilier par zone" description="Choisissez une zone, puis modifiez les taux annuels par durée. Les visiteurs verront les nouveaux taux dans le simulateur."><div style={zoneListStyle}>{Object.keys(rates ?? {}).map((key) => <button type="button" key={key} onClick={() => onSelect(key)} style={{ ...zoneButtonStyle, ...(key === selectedZone ? zoneButtonActiveStyle : {}) }}>{zoneLabels[key] ?? key}</button>)}</div><div style={{ ...editorCardStyle, marginTop: 18 }}><h3 style={{ marginTop: 0 }}>{zoneLabels[selectedZone] ?? selectedZone}</h3><div style={gridStyle}>{Object.entries(durationLabels).map(([duration, label]) => <SmallNumber key={duration} label={label} value={zone[duration] ?? ''} onChange={(value) => onUpdate(duration, value)} />)}</div></div></Panel>; }
function RacResultsEditor({ results, onUpdate }) { const cards = [['bdf', 'Fichage bancaire (BDF / FICP / FCC)'], ['tns', 'Travailleur non salarié (TNS)'], ['loc', 'Locataire ou hébergé gratuitement'], ['other', 'Autres profils']]; return <Panel title="Formulaire RAC — parcours de fin" description="La catégorie du dossier reste enregistrée dans le CRM. Ici, vous choisissez ce que la personne voit après l’envoi du formulaire."><div style={editorGridStyle}>{cards.map(([key, label]) => { const item = results?.[key] ?? {}; const appointment = item.mode === 'rdv'; return <EditorCard key={key}><strong style={{ fontSize: 16 }}>{label}</strong><label style={labelStyle}>Parcours affiché<select style={inputStyle} value={appointment ? 'rdv' : 'message'} onChange={(e) => onUpdate(key, { mode: e.target.value })}><option value="message">Message personnalisé</option><option value="rdv">Parcours éligible : rendez-vous et rappel</option></select></label>{appointment ? <p style={{ margin: 0, color: '#287155', lineHeight: 1.55 }}>La personne verra le même parcours qu’un profil éligible : prise de rendez-vous et demande de rappel.</p> : <><TextField label="Titre affiché" value={item.title} onChange={(title) => onUpdate(key, { title })} /><label style={labelStyle}>Message affiché<textarea style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }} value={item.body ?? ''} onChange={(e) => onUpdate(key, { body: e.target.value })} /></label></>}</EditorCard>; })}</div><p style={{ ...descriptionStyle, marginTop: 18 }}>Les changements prennent effet après « Enregistrer les modifications ». La catégorie d’origine demeure visible dans le CRM.</p></Panel>; }

function RacSegmentsEditor({ segments, categoryResults, onUpdate }) {
  return <Panel title="Formulaire RAC — réglage par segment" description="Chaque segment peut déroger à son parcours habituel. Exemple : arrêtez les rendez-vous pour « Investisseur 1 », ou acceptez « Petit Pro 2 ». Sans modification, le parcours de catégorie est appliqué.">
    {racSegmentGroups.map(([group, names]) => <div key={group} style={{ marginTop: 22 }}>
      <h3 style={{ margin: '0 0 12px', fontSize: 17 }}>{group}</h3>
      <div style={editorGridStyle}>{names.map((name) => {
        const fallback = racSegmentCategory(name) === 'rdv' ? { mode: 'rdv' } : (categoryResults?.other ?? { mode: 'message' });
        const item = { ...fallback, ...(segments?.[name] ?? {}) };
        const appointment = item.mode === 'rdv';
        return <EditorCard key={name}>
          <strong>{name}</strong>
          <label style={labelStyle}>Parcours affiché<select style={inputStyle} value={appointment ? 'rdv' : 'message'} onChange={(e) => onUpdate(name, { mode: e.target.value })}>
            <option value="rdv">Parcours éligible : rendez-vous et rappel</option>
            <option value="message">Message affiché</option>
          </select></label>
          {!appointment && <>
            <TextField label="Titre (facultatif)" value={segments?.[name]?.title ?? ''} onChange={(title) => onUpdate(name, { title })} />
            <label style={labelStyle}>Message (facultatif)<textarea style={{ ...inputStyle, minHeight: 94, resize: 'vertical' }} placeholder="Vide : utilise le message « Autres profils »." value={segments?.[name]?.body ?? ''} onChange={(e) => onUpdate(name, { body: e.target.value })} /></label>
          </>}
          <span style={{ color: '#59635e', fontSize: 12 }}>{segments?.[name] ? 'Réglage personnalisé actif' : 'Parcours par défaut'}</span>
        </EditorCard>;
      })}</div>
    </div>)}
  </Panel>;
}

const cardStyle = { background: '#fff', border: '1px solid #dce8e1', borderRadius: 18, padding: 28, marginTop: 22, boxShadow: '0 10px 30px rgba(27,29,26,.06)' };
const noticeStyle = { background: '#fff8e8', border: '1px solid #ead49c', borderRadius: 12, padding: '14px 16px', margin: '22px 0', lineHeight: 1.5 };
const eyebrowStyle = { color: '#43866f', fontWeight: 800, letterSpacing: '0.08em', fontSize: 12, margin: 0 };
const descriptionStyle = { margin: '0 0 20px', color: '#59635e', fontSize: 14, lineHeight: 1.55 };
const labelStyle = { display: 'grid', gap: 6, fontWeight: 700, fontSize: 14 };
const hintStyle = { fontSize: 12, color: '#7f7f7f', fontWeight: 500 };
const inputStyle = { width: '100%', boxSizing: 'border-box', padding: '11px 12px', borderRadius: 9, border: '1px solid #b9c9c0', font: 'inherit', color: '#1b1d1a', background: '#fff' };
const suffixStyle = { position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#59635e', fontSize: 13, pointerEvents: 'none' };
const buttonStyle = { border: 0, borderRadius: 10, padding: '13px 18px', marginTop: 18, background: '#1b1d1a', color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer' };
const secondaryButtonStyle = { ...buttonStyle, background: '#e3f3eb', color: '#1b1d1a', marginTop: 16 };
const linkButtonStyle = { background: 'none', border: 0, color: '#1b1d1a', textDecoration: 'underline', cursor: 'pointer', font: 'inherit', fontWeight: 700 };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 };
const editorGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(235px, 1fr))', gap: 14 };
const editorCardStyle = { display: 'grid', gap: 13, padding: 18, border: '1px solid #dce8e1', borderRadius: 14, background: '#f8fbf9' };
const removeButtonStyle = { justifySelf: 'end', border: 0, background: 'transparent', color: '#8d4237', fontWeight: 700, cursor: 'pointer', padding: 0 };
const zoneListStyle = { display: 'flex', flexWrap: 'wrap', gap: 8 };
const zoneButtonStyle = { border: '1px solid #b9c9c0', background: '#fff', borderRadius: 99, padding: '8px 11px', cursor: 'pointer', color: '#29453b', fontWeight: 700, fontSize: 13 };
const zoneButtonActiveStyle = { background: '#1b1d1a', color: '#fff', borderColor: '#1b1d1a' };
