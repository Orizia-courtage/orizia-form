'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

// ── Constantes SG (tarification Sogecap) ──
const FRAIS_VERSEMENTS = 0.02;   // 2% sur chaque versement
const FRAIS_GESTION    = 0.00239; // 0.24%/an déduits du taux hypothétique

// ── Table rendements selon répartition ──
const REPARTITION = [
  { fe: 100, uc: 0,   taux: 0.50 },
  { fe: 95,  uc: 5,   taux: 0.73 },
  { fe: 90,  uc: 10,  taux: 0.95 },
  { fe: 85,  uc: 15,  taux: 1.18 },
  { fe: 80,  uc: 20,  taux: 1.40 },
  { fe: 75,  uc: 25,  taux: 1.63 },
  { fe: 70,  uc: 30,  taux: 1.85 },
  { fe: 65,  uc: 35,  taux: 2.08 },
  { fe: 60,  uc: 40,  taux: 2.30 },
  { fe: 55,  uc: 45,  taux: 2.53 },
  { fe: 50,  uc: 50,  taux: 2.75 },
  { fe: 45,  uc: 55,  taux: 2.98 },
  { fe: 40,  uc: 60,  taux: 3.20 },
  { fe: 35,  uc: 65,  taux: 3.43 },
  { fe: 30,  uc: 70,  taux: 3.65 },
  { fe: 25,  uc: 75,  taux: 3.88 },
  { fe: 20,  uc: 80,  taux: 4.10 },
  { fe: 15,  uc: 85,  taux: 4.33 },
  { fe: 10,  uc: 90,  taux: 4.55 },
  { fe: 5,   uc: 95,  taux: 4.78 },
  { fe: 0,   uc: 100, taux: 5.00 },
];

// ── Formatters ──
const fmt = (n) => new Intl.NumberFormat('fr-FR', {
  style: 'currency', currency: 'EUR',
  minimumFractionDigits: 2, maximumFractionDigits: 2,
}).format(n ?? 0);

const fmtShort = (n) => new Intl.NumberFormat('fr-FR', {
  style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
}).format(n ?? 0);

const NOW       = new Date();
const CUR_YEAR  = NOW.getFullYear();
const CUR_MONTH = String(NOW.getMonth() + 1).padStart(2, '0');
const CUR_DAY   = String(NOW.getDate()).padStart(2, '0');

function tauxNet(annualRate) {
  return Math.max(0, annualRate / 100 - FRAIS_GESTION);
}

function endDateStr(plusYears) {
  return `${CUR_DAY}/${CUR_MONTH}/${CUR_YEAR + plusYears}`;
}

// ── Formules financières ──
function calcFV(vi, vrMonth, dureeYears, annualRate) {
  const r       = tauxNet(annualRate);
  const n       = dureeYears;
  const viNet   = vi * (1 - FRAIS_VERSEMENTS);
  const pmtNet  = vrMonth * 12 * (1 - FRAIS_VERSEMENTS);
  if (r === 0) return viNet + pmtNet * n;
  return viNet * Math.pow(1 + r, n) + pmtNet * (Math.pow(1 + r, n) - 1) / r;
}


function calcMonthlyIncome(capital, perceptionYears, annualRate) {
  const r = tauxNet(annualRate);
  const n = perceptionYears;
  if (n === 0) return 0;
  if (r === 0) return capital / (n * 12);
  const pmtAnnuel = capital * r / (1 - Math.pow(1 + r, -n));
  return pmtAnnuel / 12;
}

function solveVI(target, vrMonth, dureeYears, annualRate) {
  const r      = tauxNet(annualRate);
  const n      = dureeYears;
  const pmtNet = vrMonth * 12 * (1 - FRAIS_VERSEMENTS);
  let viNet;
  if (r === 0) {
    viNet = target - pmtNet * n;
  } else {
    viNet = (target - pmtNet * (Math.pow(1 + r, n) - 1) / r) / Math.pow(1 + r, n);
  }
  // Reconvertir : viNet = vi * (1 - FRAIS_VERSEMENTS)  →  vi = viNet / (1 - FRAIS)
  return Math.max(0, viNet / (1 - FRAIS_VERSEMENTS));
}

function solveVR(target, vi, dureeYears, annualRate) {
  const r     = tauxNet(annualRate);
  const n     = dureeYears;
  const viNet = vi * (1 - FRAIS_VERSEMENTS);
  let pmtNet;
  if (r === 0) {
    pmtNet = (target - viNet) / n;
  } else {
    pmtNet = (target - viNet * Math.pow(1 + r, n)) * r / (Math.pow(1 + r, n) - 1);
  }
  const vrMonthNet = pmtNet / 12;
  // Reconvertir en brut
  return Math.max(25, vrMonthNet / (1 - FRAIS_VERSEMENTS));
}

function calcNetRachat(capital, totalVers, dureeYears, abattement) {
  const gains       = Math.max(0, capital - totalVers);
  const socialTax   = gains * 0.172;
  const pfnlRate    = dureeYears >= 8 ? 0.075 : 0.128;
  const taxableGain = dureeYears >= 8 ? Math.max(0, gains - abattement) : gains;
  const pfnl        = taxableGain * pfnlRate;
  return capital - socialTax - pfnl;
}

function buildChartData(vi, vrMonth, dureeYears, annualRate) {
  const r      = tauxNet(annualRate);
  const viNet  = vi * (1 - FRAIS_VERSEMENTS);
  const pmtNet = vrMonth * 12 * (1 - FRAIS_VERSEMENTS);
  return Array.from({ length: dureeYears }, (_, i) => {
    const n   = i + 1;
    const val = r === 0
      ? viNet + pmtNet * n
      : viNet * Math.pow(1 + r, n) + pmtNet * (Math.pow(1 + r, n) - 1) / r;
    return { year: CUR_YEAR + n, value: Math.max(0, val) };
  });
}

// ── Mini graphique SVG ──
function BarChart({ data }) {
  if (!data?.length) return null;
  const maxVal = Math.max(...data.map(d => d.value), 1);
  const W = 600, H = 180, PL = 70, PB = 28, PT = 10, PR = 10;
  const CW = W - PL - PR;
  const CH = H - PB - PT;
  const barW = Math.max(4, Math.min(32, CW / data.length - 3));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {[0, 0.25, 0.5, 0.75, 1].map(pct => {
        const y = PT + CH * (1 - pct);
        return (
          <g key={pct}>
            <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#e2e8f0" strokeWidth={1} />
            <text x={PL - 5} y={y + 4} textAnchor="end" fontSize={9} fill="#94a3b8">
              {fmtShort(maxVal * pct)}
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const x    = PL + i * (CW / data.length) + (CW / data.length - barW) / 2;
        const h    = Math.max(1, (d.value / maxVal) * CH);
        const y    = PT + CH - h;
        const show = data.length <= 10 || i === 0 || i === data.length - 1 || i % Math.ceil(data.length / 8) === 0;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} fill="var(--orizia-primary)" rx={3} opacity={0.85} />
            {show && (
              <text x={x + barW / 2} y={H - 2} textAnchor="middle" fontSize={8} fill="#64748b">
                {d.year}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ── Indicateur d'étapes ──
function StepIndicator({ current }) {
  const steps = ['Objectif', 'Calcul', 'Paramètres', 'Répartition', 'Résultats'];
  return (
    <div className="av-steps">
      {steps.map((s, i) => (
        <div key={i} className={[
          'av-step',
          current === i + 1 ? 'av-step--active' : '',
          current > i + 1   ? 'av-step--done'   : '',
        ].filter(Boolean).join(' ')}>
          <div className="av-step-dot">{current > i + 1 ? '✓' : i + 1}</div>
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
}

// ── Composant principal ──
export default function SimulateurAssuranceVie() {
  const [step,            setStep]            = useState(1);
  const [goal,            setGoal]            = useState('');       // 'capital' | 'revenus'
  const [subgoal,         setSubgoal]         = useState('');       // 'calcul_capital' | 'calcul_vi' | 'calcul_vr'
  const [vi,              setVi]              = useState(0);
  const [vr,              setVr]              = useState(25);
  const [dureeEpargne,    setDureeEpargne]    = useState(20);
  const [capitalCible,    setCapitalCible]    = useState(50000);
  const [revenusCompl,    setRevenusCompl]    = useState(500);
  const [dureePerception, setDureePerception] = useState(12);
  const [repartIdx,       setRepartIdx]       = useState(6);        // défaut 70FE/30UC
  const [abattType,       setAbattType]       = useState('seul');   // 'seul' | 'couple' | 'sans'

  const repartData = REPARTITION[repartIdx];
  const annualRate = repartData.taux;
  const pctSlider  = (repartIdx / 20) * 100;

  const abattAmount = abattType === 'couple' ? 9200 : abattType === 'seul' ? 4600 : 0;

  // ── Calculs ──
  const results = useMemo(() => {
    const n  = dureeEpargne * 12;
    const rM = annualRate / 100 / 12;

    const targetCapitalFromRevenu = () => {
      const m = dureePerception * 12;
      if (rM === 0) return revenusCompl * m;
      return revenusCompl * (1 - Math.pow(1 + rM, -m)) / rM;
    };

    if (goal === 'capital') {
      if (subgoal === 'calcul_capital') {
        const capital       = calcFV(vi, vr, dureeEpargne, annualRate);
        const totalVers     = vi + vr * n;
        const netRachat     = calcNetRachat(capital, totalVers, dureeEpargne, abattAmount);
        return { capital, totalVers, netRachat, viNeeded: null, vrNeeded: null, revenusMensuels: null };
      }
      if (subgoal === 'calcul_vi') {
        const viNeeded  = solveVI(capitalCible, vr, dureeEpargne, annualRate);
        const viSafe    = Math.max(0, viNeeded);
        const totalVers = viSafe + vr * n;
        const netRachat = calcNetRachat(capitalCible, totalVers, dureeEpargne, abattAmount);
        return { capital: capitalCible, totalVers, netRachat, viNeeded: viSafe, vrNeeded: null, revenusMensuels: null };
      }
      if (subgoal === 'calcul_vr') {
        const vrNeeded  = Math.max(25, solveVR(capitalCible, vi, dureeEpargne, annualRate));
        const totalVers = vi + vrNeeded * n;
        const netRachat = calcNetRachat(capitalCible, totalVers, dureeEpargne, abattAmount);
        return { capital: capitalCible, totalVers, netRachat, viNeeded: null, vrNeeded, revenusMensuels: null };
      }
    }

    if (goal === 'revenus') {
      if (subgoal === 'calcul_capital') {
        const capital         = calcFV(vi, vr, dureeEpargne, annualRate);
        const revenusMensuels = calcMonthlyIncome(capital, dureePerception, annualRate);
        const totalVers       = vi + vr * n;
        const netRachat       = calcNetRachat(capital, totalVers, dureeEpargne, abattAmount);
        return { capital, totalVers, netRachat, viNeeded: null, vrNeeded: null, revenusMensuels };
      }
      if (subgoal === 'calcul_vi') {
        const target   = targetCapitalFromRevenu();
        const viNeeded = Math.max(0, solveVI(target, vr, dureeEpargne, annualRate));
        const totalVers = viNeeded + vr * n;
        const netRachat = calcNetRachat(target, totalVers, dureeEpargne, abattAmount);
        return { capital: target, totalVers, netRachat, viNeeded, vrNeeded: null, revenusMensuels: revenusCompl };
      }
      if (subgoal === 'calcul_vr') {
        const target   = targetCapitalFromRevenu();
        const vrNeeded = Math.max(25, solveVR(target, vi, dureeEpargne, annualRate));
        const totalVers = vi + vrNeeded * n;
        const netRachat = calcNetRachat(target, totalVers, dureeEpargne, abattAmount);
        return { capital: target, totalVers, netRachat, viNeeded: null, vrNeeded, revenusMensuels: revenusCompl };
      }
    }

    return null;
  }, [goal, subgoal, vi, vr, dureeEpargne, capitalCible, revenusCompl, dureePerception, annualRate, abattAmount]);

  const chartVI = results?.viNeeded   ?? vi;
  const chartVR = results?.vrNeeded   ?? vr;
  const chartData = buildChartData(chartVI, chartVR, dureeEpargne, annualRate);

  const displayVI = subgoal === 'calcul_vi' ? (results?.viNeeded ?? 0) : vi;
  const displayVR = subgoal === 'calcul_vr' ? (results?.vrNeeded ?? 25) : vr;

  // ─────────────────────────────────────────────
  // STEP 1 — Objectif
  // ─────────────────────────────────────────────
  if (step === 1) return (
    <div className="av-simu">
      <StepIndicator current={1} />
      <div className="av-card">
        <h3 className="av-card-title">Que souhaitez-vous obtenir ?</h3>
        <div className="av-goal-grid">
          {[
            { key: 'capital', icon: '🏦', title: 'Un capital à terme',           sub: 'Vous constituer une épargne pour vos projets' },
            { key: 'revenus', icon: '💸', title: 'Revenus complémentaires',       sub: 'Disposer de revenus futurs réguliers' },
          ].map(o => (
            <button key={o.key} className={`av-goal-btn${goal === o.key ? ' active' : ''}`} onClick={() => setGoal(o.key)}>
              <span className="av-goal-icon">{o.icon}</span>
              <strong>{o.title}</strong>
              <span>{o.sub}</span>
            </button>
          ))}
        </div>
        <div className="av-nav">
          <span />
          <button className="fin-btn-primary" disabled={!goal} onClick={() => setStep(2)}>Continuer</button>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────
  // STEP 2 — Sous-objectif
  // ─────────────────────────────────────────────
  if (step === 2) {
    const opts = goal === 'capital' ? [
      { key: 'calcul_capital', icon: '📊', title: 'Votre capital à terme',      sub: 'À calculer selon votre capacité d\'épargne' },
      { key: 'calcul_vi',      icon: '💶', title: 'Votre versement initial',     sub: 'Trouver le versement initial nécessaire pour atteindre le capital souhaité' },
      { key: 'calcul_vr',      icon: '🔄', title: 'Vos versements réguliers',    sub: 'Trouver les versements réguliers nécessaires pour atteindre le capital souhaité' },
    ] : [
      { key: 'calcul_capital', icon: '📊', title: 'Vos revenus complémentaires', sub: 'Calculer le montant de vos revenus futurs' },
      { key: 'calcul_vi',      icon: '💶', title: 'Votre versement initial',      sub: 'Trouver le versement initial nécessaire pour atteindre les revenus souhaités' },
      { key: 'calcul_vr',      icon: '🔄', title: 'Vos versements réguliers',     sub: 'Trouver les versements réguliers nécessaires pour atteindre les revenus souhaités' },
    ];

    return (
      <div className="av-simu">
        <StepIndicator current={2} />
        <div className="av-card">
          <h3 className="av-card-title">Que souhaitez-vous calculer ?</h3>
          <div className="av-subgoal-list">
            {opts.map(o => (
              <button key={o.key} className={`av-subgoal-btn${subgoal === o.key ? ' active' : ''}`} onClick={() => setSubgoal(o.key)}>
                <span className="av-subgoal-icon">{o.icon}</span>
                <div className="av-subgoal-text">
                  <strong>{o.title}</strong>
                  <span>{o.sub}</span>
                </div>
                <span className="av-subgoal-radio">{subgoal === o.key ? '●' : '○'}</span>
              </button>
            ))}
          </div>
          <div className="av-nav">
            <button className="fin-btn-secondary" onClick={() => setStep(1)}>← Retour</button>
            <button className="fin-btn-primary" disabled={!subgoal} onClick={() => setStep(3)}>Continuer</button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // STEP 3 — Paramètres
  // ─────────────────────────────────────────────
  if (step === 3) return (
    <div className="av-simu">
      <StepIndicator current={3} />
      <div className="av-card">

        {/* Cible capital */}
        {goal === 'capital' && subgoal !== 'calcul_capital' && (
          <div className="av-section">
            <h3 className="av-section-title">Quel capital à terme souhaitez-vous ?</h3>
            <div className="av-field">
              <label>Capital à terme souhaité</label>
              <div className="av-input-wrap">
                <input type="number" min={1000} step={1000} value={capitalCible}
                  onChange={e => setCapitalCible(Math.max(0, Number(e.target.value)))} className="av-input" />
                <span className="av-input-unit">€</span>
              </div>
            </div>
          </div>
        )}

        {/* Cible revenus */}
        {goal === 'revenus' && subgoal !== 'calcul_capital' && (
          <div className="av-section">
            <h3 className="av-section-title">Quels revenus complémentaires souhaitez-vous ?</h3>
            <div className="av-fields-row">
              <div className="av-field">
                <label>Revenus complémentaires souhaités</label>
                <div className="av-input-wrap">
                  <input type="number" min={25} step={25} value={revenusCompl}
                    onChange={e => setRevenusCompl(Math.max(25, Number(e.target.value)))} className="av-input" />
                  <span className="av-input-unit">€/mois</span>
                </div>
              </div>
              <div className="av-field">
                <label>Durée de perception</label>
                <div className="av-input-wrap">
                  <input type="number" min={1} max={30} step={1} value={dureePerception}
                    onChange={e => setDureePerception(Math.min(30, Math.max(1, Number(e.target.value))))} className="av-input" />
                  <span className="av-input-unit">ans</span>
                </div>
                <span className="av-input-hint">Max. 30 ans</span>
              </div>
            </div>
          </div>
        )}

        {/* Épargne */}
        <div className="av-section">
          <h3 className="av-section-title">Combien pouvez-vous épargner ?</h3>
          <p className="av-section-sub">
            L'assurance vie vous permet d'effectuer soit un versement initial, soit des versements réguliers, soit les deux.
          </p>
          <div className="av-fields-row">
            {subgoal !== 'calcul_vi' && (
              <div className="av-field">
                <label>Versement initial</label>
                <div className="av-input-wrap">
                  <input type="number" min={0} step={100} value={vi}
                    onChange={e => setVi(Math.max(0, Number(e.target.value)))} className="av-input" />
                  <span className="av-input-unit">€</span>
                </div>
                <span className="av-input-hint">Brut de frais sur versements</span>
              </div>
            )}
            {subgoal !== 'calcul_vr' && (
              <div className="av-field">
                <label>Versement régulier</label>
                <div className="av-input-wrap">
                  <input type="number" min={25} step={25} value={vr}
                    onChange={e => setVr(Math.max(25, Number(e.target.value)))} className="av-input" />
                  <span className="av-input-unit">€/mois</span>
                </div>
                <span className="av-input-hint">Min. 25€/mois – Brut de frais</span>
              </div>
            )}
            <div className="av-field">
              <label>Durée de l'épargne</label>
              <div className="av-input-wrap">
                <input type="number" min={1} max={30} step={1} value={dureeEpargne}
                  onChange={e => setDureeEpargne(Math.min(30, Math.max(1, Number(e.target.value))))} className="av-input" />
                <span className="av-input-unit">ans</span>
              </div>
              <span className="av-input-hint">Max. 30 ans</span>
            </div>
          </div>
        </div>

        {/* Durée perception pour revenus mode calcul_capital */}
        {goal === 'revenus' && subgoal === 'calcul_capital' && (
          <div className="av-section">
            <h3 className="av-section-title">Combien de temps souhaitez-vous percevoir des revenus ?</h3>
            <div className="av-field" style={{ maxWidth: 220 }}>
              <label>Durée de perception</label>
              <div className="av-input-wrap">
                <input type="number" min={1} max={30} step={1} value={dureePerception}
                  onChange={e => setDureePerception(Math.min(30, Math.max(1, Number(e.target.value))))} className="av-input" />
                <span className="av-input-unit">ans</span>
              </div>
              <span className="av-input-hint">Max. 30 ans</span>
            </div>
          </div>
        )}

        <div className="av-nav">
          <button className="fin-btn-secondary" onClick={() => setStep(2)}>← Retour</button>
          <button className="fin-btn-primary" onClick={() => setStep(4)}>Continuer</button>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────
  // STEP 4 — Répartition
  // ─────────────────────────────────────────────
  if (step === 4) return (
    <div className="av-simu">
      <StepIndicator current={4} />
      <div className="av-card">
        <h3 className="av-card-title">Quelle répartition souhaitez-vous ?</h3>
        <p className="av-section-sub">
          Combinez la sécurité du fonds en euros avec le potentiel des unités de compte
          (risque de perte en capital).
        </p>

        <div className="av-repartition">
          <div className="av-repartition-axis">
            <span>🛡️ Prudente</span>
            <span>🚀 Risquée</span>
          </div>
          <div className="simu-slider-wrap" style={{ margin: '14px 0 6px' }}>
            <input type="range" min={0} max={20} step={1} value={repartIdx}
              onChange={e => setRepartIdx(Number(e.target.value))}
              className="simu-slider" style={{ '--pct': `${pctSlider}%` }} />
          </div>

          <div className="av-repartition-display">
            <div className="av-repart-block av-repart-block--fe">
              <strong>{repartData.fe}%</strong>
              <span>Fonds en euros</span>
              <small>Sécurisé · 0,5%/an</small>
            </div>
            <div className="av-repart-plus">+</div>
            <div className="av-repart-block av-repart-block--uc">
              <strong>{repartData.uc}%</strong>
              <span>Unités de Compte</span>
              <small>Dynamique · 5%/an</small>
            </div>
            <div className="av-repart-equals">=</div>
            <div className="av-repart-block av-repart-block--rate">
              <strong>{repartData.taux.toFixed(2)}%</strong>
              <span>Rendement estimé</span>
              <small>par an</small>
            </div>
          </div>

          <p className="av-repartition-note">
            Hypothèse basée sur un rendement moyen de 0,5%/an pour le fonds en euros et 5%/an
            pour les unités de compte — performances brutes moyennes des 5 dernières années.
            Les performances passées ne préjugent pas des performances futures.
          </p>
        </div>

        <div className="av-nav">
          <button className="fin-btn-secondary" onClick={() => setStep(3)}>← Retour</button>
          <button className="fin-btn-primary" onClick={() => setStep(5)}>Voir mes résultats</button>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────
  // STEP 5 — Résultats
  // ─────────────────────────────────────────────
  if (step === 5 && results) {
    const pfnlRate  = dureeEpargne >= 8 ? '7,5%' : '12,8%';
    const abattLabel = abattType === 'couple' ? '9 200€ (couple)' : abattType === 'seul' ? '4 600€ (personne seule)' : 'sans abattement';

    return (
      <div className="av-simu">
        <StepIndicator current={5} />
        <div className="av-card av-card--results">

          {/* ── Résultat principal ── */}
          <div className="av-result-hero">
            {goal === 'capital' && subgoal === 'calcul_capital' && (
              <>
                <span className="av-result-label">Votre capital à terme</span>
                <strong className="av-result-big">{fmt(results.capital)}</strong>
                <span className="av-result-date">au {endDateStr(dureeEpargne)}</span>
              </>
            )}
            {goal === 'capital' && subgoal === 'calcul_vi' && (
              <>
                <span className="av-result-label">Votre versement initial nécessaire</span>
                <strong className="av-result-big">{fmt(results.viNeeded)}</strong>
                {results.viNeeded <= 0
                  ? <span className="av-result-note-good">✅ Vos versements réguliers seuls suffisent !</span>
                  : <span className="av-result-date">pour atteindre {fmt(capitalCible)} au {endDateStr(dureeEpargne)}</span>
                }
              </>
            )}
            {goal === 'capital' && subgoal === 'calcul_vr' && (
              <>
                <span className="av-result-label">Vos versements réguliers nécessaires</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: 'center' }}>
                  <strong className="av-result-big">{fmt(results.vrNeeded)}</strong>
                  <span style={{ color: '#fff', opacity: 0.7, fontSize: '1.1rem' }}>/mois</span>
                </div>
                <span className="av-result-date">pour atteindre {fmt(capitalCible)} au {endDateStr(dureeEpargne)}</span>
              </>
            )}
            {goal === 'revenus' && (
              <>
                <span className="av-result-label">Vos revenus complémentaires potentiels</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: 'center' }}>
                  <strong className="av-result-big">{fmt(results.revenusMensuels)}</strong>
                  <span style={{ color: '#fff', opacity: 0.7, fontSize: '1.1rem' }}>/mois</span>
                </div>
                <span className="av-result-date">
                  pendant {dureePerception} ans — de {CUR_YEAR + dureeEpargne} à {CUR_YEAR + dureeEpargne + dureePerception}
                </span>
                {subgoal === 'calcul_vi' && (
                  <div className="av-result-note-block">
                    Versement initial nécessaire :{' '}
                    <strong>{results.viNeeded <= 0 ? 'Aucun' : fmt(results.viNeeded)}</strong>
                  </div>
                )}
                {subgoal === 'calcul_vr' && (
                  <div className="av-result-note-block">
                    Versements réguliers nécessaires : <strong>{fmt(results.vrNeeded)}/mois</strong>
                  </div>
                )}
              </>
            )}
          </div>

          {/* ── Graphique ── */}
          <div className="av-chart-section">
            <h4>Évolution annuelle de votre capital projeté</h4>
            <BarChart data={chartData} />
          </div>

          {/* ── Résultats détaillés ── */}
          <div className="av-details">
            <h4>Résultats détaillés de votre simulation</h4>
            <div className="av-details-grid">
              <div className="av-detail-block">
                <span>Capital à terme</span>
                <strong>{fmt(results.capital)}</strong>
              </div>
              <div className="av-detail-block">
                <span>Versement initial brut</span>
                <strong>{fmt(displayVI)}</strong>
              </div>
              <div className="av-detail-block">
                <span>Versements réguliers bruts</span>
                <strong>{fmt(displayVR)}/mois</strong>
              </div>
              <div className="av-detail-block av-detail-block--highlight">
                <span>Retrait (rachat) net estimé</span>
                <strong>{fmt(results.netRachat)}</strong>
              </div>
              <div className="av-detail-block">
                <span>Taux de rendement moyen annuel</span>
                <strong>{annualRate.toFixed(2)}%</strong>
              </div>
              <div className="av-detail-block">
                <span>Répartition des versements</span>
                <strong>{repartData.fe}% FE / {repartData.uc}% UC</strong>
              </div>
            </div>

            {/* ── Fiscalité ── */}
            <div className="av-fiscal">
              <div className="av-fiscal-cols">
                {/* Abattement */}
                <div className="av-fiscal-col">
                  <div className="av-fiscal-col-title">① Abattement</div>
                  <p className="av-fiscal-col-desc">
                    En cas de rachats après 8 ans, les gains sont imposables après un abattement annuel.
                    {dureeEpargne < 8 && <strong> ⚠️ Votre contrat a moins de 8 ans — abattement non applicable.</strong>}
                  </p>
                  <div className="av-fiscal-options">
                    {[
                      { key: 'seul',   label: 'Avec abattement de 4 600€ — personne seule' },
                      { key: 'couple', label: 'Avec abattement de 9 200€ — couple marié/pacsé' },
                      { key: 'sans',   label: 'Sans abattement (si déjà utilisé)' },
                    ].map(o => (
                      <label key={o.key} className={`av-fiscal-option${abattType === o.key ? ' active' : ''}`}>
                        <input type="radio" name="abattement" value={o.key}
                          checked={abattType === o.key} onChange={() => setAbattType(o.key)} />
                        <span>{o.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* PFNL */}
                <div className="av-fiscal-col">
                  <div className="av-fiscal-col-title">② Fiscalité applicable</div>
                  <div className={`av-pfnl-badge${dureeEpargne >= 8 ? ' av-pfnl-badge--good' : ' av-pfnl-badge--warn'}`}>
                    PFNL {pfnlRate} {dureeEpargne >= 8 ? '✅ Après 8 ans' : '⚠️ Avant 8 ans'}
                  </div>
                  {dureeEpargne >= 8 ? (
                    <p className="av-fiscal-text">
                      PFNL 7,5% retenu par l'assureur l'année du rachat sur les gains après abattement
                      de {abattLabel}. Option barème IR possible l'année suivante.
                    </p>
                  ) : (
                    <p className="av-fiscal-text">
                      PFNL 12,8% retenu par l'assureur l'année du rachat.
                      L'abattement sera accessible à partir des 8 ans du contrat.
                      Option barème IR possible l'année suivante.
                    </p>
                  )}
                  <p className="av-fiscal-note">
                    + 17,2% de prélèvements sociaux sur l'ensemble des gains, quelle que soit la durée.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="av-result-cta">
            <div>
              <strong>Passez de la simulation à l'action</strong>
              <p>
                Un expert Orizia affine cette simulation selon votre situation fiscale réelle,
                sélectionne le contrat le plus adapté et vous accompagne jusqu'à la souscription.
              </p>
            </div>
            <Link href="/rendez-vous" className="fin-btn-primary">
              📅 Être accompagné gratuitement
            </Link>
          </div>

          <div className="av-nav" style={{ marginTop: 12 }}>
            <button className="fin-btn-secondary" onClick={() => { setStep(1); setGoal(''); setSubgoal(''); }}>
              ↺ Nouvelle simulation
            </button>
            <button className="fin-btn-secondary" onClick={() => setStep(4)}>
              ← Modifier la répartition
            </button>
          </div>

          <p className="simu-disclaimer" style={{ marginTop: 16 }}>
            Simulation indicative à titre pédagogique. Les rendements ne sont pas garantis.
            Investir comporte un risque de perte en capital. Orizia Courtage, courtier indépendant.
          </p>
        </div>
      </div>
    );
  }

  return null;
}