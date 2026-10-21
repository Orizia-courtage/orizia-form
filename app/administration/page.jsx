'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const sections = [
  {
    title: 'Endettement',
    description: 'Saisissez les pourcentages sans le signe %, par exemple 35 pour 35 %.',
    fields: [
      ['debt.maxRatio', 'Taux maximum'], ['debt.targetRatio', 'Taux cible'],
      ['debt.watchRatio', 'Seuil à surveiller'], ['debt.highRatio', 'Seuil élevé'], ['debt.criticalRatio', 'Seuil critique'],
    ],
    ratio: true,
  },
  {
    title: 'Crédit immobilier',
    description: 'Taux annuels en pourcentage.',
    fields: [['credit.defaultRate', 'Taux estimé par défaut'], ['credit.minRate', 'Taux minimum'], ['credit.maxRate', 'Taux maximum']],
  },
  {
    title: 'SCPI',
    description: 'Taux annuels en pourcentage.',
    fields: [
      ['scpi.defaultDistributionRate', 'Distribution par défaut'], ['scpi.minDistributionRate', 'Distribution minimum'],
      ['scpi.maxDistributionRate', 'Distribution maximum'], ['scpi.revaluationRate', 'Revalorisation annuelle'],
    ],
    ratioKeys: ['scpi.revaluationRate'],
  },
  {
    title: 'Autres simulateurs',
    description: 'Valeurs utilisées dans les calculateurs affichés sur le site.',
    fields: [
      ['crowdfunding.livretANetRate', 'Taux net du Livret A'], ['crowdfunding.defaultRate', 'Crowdfunding : taux par défaut'],
      ['crowdfunding.minRate', 'Crowdfunding : taux minimum'], ['crowdfunding.maxRate', 'Crowdfunding : taux maximum'],
      ['crowdfunding.flatTaxRate', 'Crowdfunding : PFU total'], ['crowdfunding.socialTaxRate', 'Crowdfunding : prélèvements sociaux'],
      ['soulte.sharingDutyRate', 'Droit de partage (soulte)'],
    ],
    ratioKeys: ['crowdfunding.flatTaxRate', 'crowdfunding.socialTaxRate', 'soulte.sharingDutyRate'],
  },
  {
    title: 'Assurance-vie',
    description: 'Les frais et prélèvements sont exprimés en pourcentage. Les abattements sont en euros.',
    fields: [
      ['assuranceVie.paymentFeeRate', 'Frais sur versement'], ['assuranceVie.managementFeeRate', 'Frais de gestion annuels'],
      ['assuranceVie.socialTaxRate', 'Prélèvements sociaux'], ['assuranceVie.pfnlBefore8YearsRate', 'PFNL avant 8 ans'],
      ['assuranceVie.pfnlAfter8YearsRate', 'PFNL après 8 ans'], ['assuranceVie.abatementSingle', 'Abattement personne seule'],
      ['assuranceVie.abatementCouple', 'Abattement couple'],
    ],
    ratioKeys: ['assuranceVie.paymentFeeRate', 'assuranceVie.managementFeeRate', 'assuranceVie.socialTaxRate', 'assuranceVie.pfnlBefore8YearsRate', 'assuranceVie.pfnlAfter8YearsRate'],
  },
];

function read(settings, path) { return path.split('.').reduce((value, key) => value?.[key], settings); }
function write(settings, path, value) {
  const keys = path.split('.'); const next = structuredClone(settings); let target = next;
  keys.slice(0, -1).forEach((key) => { target = target[key]; });
  target[keys.at(-1)] = value;
  return next;
}

export default function AdministrationPage() {
  const [settings, setSettings] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [mortgageJson, setMortgageJson] = useState('');
  const [structuredJson, setStructuredJson] = useState({ assuranceRates: '', assuranceVieRepartition: '', perTranches: '', crowdfundingPresets: '' });

  const configured = Boolean(supabase);
  useEffect(() => {
    fetch('/api/site-config', { cache: 'no-store' }).then((r) => r.json()).then((data) => {
      setSettings(data.settings); setMortgageJson(JSON.stringify(data.settings?.credit?.ratesByZone ?? {}, null, 2));
      setStructuredJson({
        assuranceRates: JSON.stringify(data.settings?.assuranceEmprunteur?.ageRates ?? [], null, 2),
        assuranceVieRepartition: JSON.stringify(data.settings?.assuranceVie?.repartition ?? [], null, 2),
        perTranches: JSON.stringify(data.settings?.per?.tranches ?? [], null, 2),
        crowdfundingPresets: JSON.stringify(data.settings?.crowdfunding?.presets ?? [], null, 2),
      });
    }).catch(() => setMessage('Impossible de charger les réglages.'));
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  const formattedUpdatedAt = useMemo(() => session && message.startsWith('Enregistré') ? message : '', [message, session]);
  const updateField = (path, raw, ratio) => {
    const number = Number(String(raw).replace(',', '.'));
    if (!Number.isFinite(number)) return;
    setSettings((current) => write(current, path, ratio ? number / 100 : number));
  };
  const signIn = async (event) => {
    event.preventDefault();
    if (!supabase) return;
    setMessage('Connexion…');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? 'Connexion impossible : vérifiez vos identifiants.' : 'Connexion établie.');
  };
  const save = async () => {
    let next = settings;
    try {
      next = write(next, 'credit.ratesByZone', JSON.parse(mortgageJson));
      next = write(next, 'assuranceEmprunteur.ageRates', JSON.parse(structuredJson.assuranceRates));
      next = write(next, 'assuranceVie.repartition', JSON.parse(structuredJson.assuranceVieRepartition));
      next = write(next, 'per.tranches', JSON.parse(structuredJson.perTranches));
      next = write(next, 'crowdfunding.presets', JSON.parse(structuredJson.crowdfundingPresets));
    } catch { setMessage('Un tableau de réglages contient un JSON invalide.'); return; }
    setSaving(true); setMessage('Enregistrement…');
    const response = await fetch('/api/site-config', {
      method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify({ settings: next }),
    });
    const data = await response.json().catch(() => ({}));
    setSaving(false);
    if (!response.ok) { setMessage(data.error || "L'enregistrement a échoué."); return; }
    setSettings(data.settings); setMortgageJson(JSON.stringify(data.settings.credit.ratesByZone, null, 2));
    setStructuredJson({
      assuranceRates: JSON.stringify(data.settings.assuranceEmprunteur.ageRates, null, 2),
      assuranceVieRepartition: JSON.stringify(data.settings.assuranceVie.repartition, null, 2),
      perTranches: JSON.stringify(data.settings.per.tranches, null, 2),
      crowdfundingPresets: JSON.stringify(data.settings.crowdfunding.presets, null, 2),
    });
    setMessage('Enregistré — les simulateurs utilisent ces nouvelles valeurs immédiatement.');
  };
  const signOut = async () => { await supabase?.auth.signOut(); setMessage('Vous êtes déconnecté.'); };

  return <main style={{ minHeight: '100vh', background: '#f4f8f6', color: '#1b1d1a', padding: '48px 16px', fontFamily: 'inherit' }}>
    <section style={{ maxWidth: 980, margin: '0 auto' }}>
      <p style={{ color: '#43866f', fontWeight: 800, letterSpacing: '0.08em', fontSize: 12, margin: 0 }}>ORIZIA COURTAGE · ESPACE PRIVÉ</p>
      <h1 style={{ fontSize: 'clamp(30px, 5vw, 48px)', margin: '10px 0 8px' }}>Réglages des taux</h1>
      <p style={{ color: '#59635e', lineHeight: 1.6, marginTop: 0 }}>Modifiez les paramètres des simulateurs sans passer par GitHub ni Vercel.</p>
      {!configured && <div style={noticeStyle}>Configuration Supabase incomplète. Ajoutez les quatre variables demandées dans Vercel avant de pouvoir vous connecter.</div>}
      {!session && configured && <form onSubmit={signIn} style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Connexion</h2><p style={{ color: '#59635e' }}>Utilisez le compte créé dans Supabase Authentication.</p>
        <label style={labelStyle}>Adresse e-mail<input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label style={labelStyle}>Mot de passe<input style={inputStyle} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        <button style={buttonStyle} type="submit">Se connecter</button>
      </form>}
      {session && settings && <>
        <div style={{ ...noticeStyle, background: '#e3f3eb', borderColor: '#b3ddcb' }}>Connectée en tant que <strong>{session.user.email}</strong>. <button onClick={signOut} style={linkButtonStyle}>Se déconnecter</button></div>
        {sections.map((section) => <section key={section.title} style={cardStyle}>
          <h2 style={{ margin: '0 0 6px' }}>{section.title}</h2><p style={{ margin: '0 0 20px', color: '#59635e', fontSize: 14 }}>{section.description}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
            {section.fields.map(([path, label]) => { const ratio = section.ratio || section.ratioKeys?.includes(path); const value = read(settings, path); return <label key={path} style={labelStyle}>{label}<span style={{ fontSize: 12, color: '#7f7f7f' }}>{ratio ? 'Pourcentage' : 'Pourcentage'}</span><input style={inputStyle} type="number" step="0.01" value={ratio ? Number(value ?? 0) * 100 : value ?? ''} onChange={(e) => updateField(path, e.target.value, ratio)} /></label>; })}
          </div>
        </section>)}
        <section style={cardStyle}><h2 style={{ marginTop: 0 }}>Taux immobilier par zone</h2><p style={{ color: '#59635e', fontSize: 14 }}>Conservez les zones et les durées existantes ; modifiez uniquement les chiffres souhaités.</p><textarea value={mortgageJson} onChange={(e) => setMortgageJson(e.target.value)} spellCheck="false" style={{ ...inputStyle, minHeight: 330, fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: 12, lineHeight: 1.5, resize: 'vertical' }} /></section>
        <JsonSetting title="Assurance emprunteur — taux par âge" description="Chaque ligne définit le taux banque, le taux Orizia et le gain estimé pour une tranche d’âge." value={structuredJson.assuranceRates} onChange={(value) => setStructuredJson((current) => ({ ...current, assuranceRates: value }))} />
        <JsonSetting title="Assurance-vie — rendements par répartition" description="Répartition fonds euros / unités de compte et rendement annuel estimé." value={structuredJson.assuranceVieRepartition} onChange={(value) => setStructuredJson((current) => ({ ...current, assuranceVieRepartition: value }))} />
        <JsonSetting title="PER — tranches d’imposition" description="TMI et plafond de déduction utilisés par le simulateur PER." value={structuredJson.perTranches} onChange={(value) => setStructuredJson((current) => ({ ...current, perTranches: value }))} />
        <JsonSetting title="Crowdfunding — profils prédéfinis" description="Montant, taux et durée proposés dans les boutons de simulation." value={structuredJson.crowdfundingPresets} onChange={(value) => setStructuredJson((current) => ({ ...current, crowdfundingPresets: value }))} />
        <button onClick={save} disabled={saving} style={{ ...buttonStyle, opacity: saving ? .6 : 1 }}>{saving ? 'Enregistrement…' : 'Enregistrer les modifications'}</button>
      </>}
      {message && <p aria-live="polite" style={{ marginTop: 18, color: message.startsWith('Enregistré') ? '#287155' : '#59433e' }}>{formattedUpdatedAt || message}</p>}
    </section>
  </main>;
}

const cardStyle = { background: '#fff', border: '1px solid #dce8e1', borderRadius: 18, padding: 28, marginTop: 22, boxShadow: '0 10px 30px rgba(27,29,26,.06)' };
const noticeStyle = { background: '#fff8e8', border: '1px solid #ead49c', borderRadius: 12, padding: '14px 16px', margin: '22px 0', lineHeight: 1.5 };
const labelStyle = { display: 'grid', gap: 6, fontWeight: 700, fontSize: 14 };
const inputStyle = { width: '100%', boxSizing: 'border-box', padding: '11px 12px', borderRadius: 9, border: '1px solid #b9c9c0', font: 'inherit', color: '#1b1d1a', background: '#fff' };
const buttonStyle = { border: 0, borderRadius: 10, padding: '13px 18px', marginTop: 18, background: '#1b1d1a', color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer' };
const linkButtonStyle = { background: 'none', border: 0, color: '#1b1d1a', textDecoration: 'underline', cursor: 'pointer', font: 'inherit', fontWeight: 700 };
function JsonSetting({ title, description, value, onChange }) { return <section style={cardStyle}><h2 style={{ marginTop: 0 }}>{title}</h2><p style={{ color: '#59635e', fontSize: 14 }}>{description}</p><textarea value={value} onChange={(e) => onChange(e.target.value)} spellCheck="false" style={{ ...inputStyle, minHeight: 240, fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: 12, lineHeight: 1.5, resize: 'vertical' }} /></section>; }
