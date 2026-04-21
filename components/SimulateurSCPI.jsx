'use client';
import { useState } from 'react';
import ContactPopup from '@/components/ContactPopup';

const fmt    = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const fmtDec = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

export default function SimulateurSCPI() {
  const [mode,    setMode]    = useState('capital');
  const [capital, setCapital] = useState(20000);
  const [epargne, setEpargne] = useState(200);
  const [duree,   setDuree]   = useState(10);
  const [taux,    setTaux]    = useState(5);

  // ── Mode Capital ──
  const revenusAnnuels    = capital * (taux / 100);
  const revenusMenusuels  = revenusAnnuels / 12;
  const valeurPartsTerme  = capital * Math.pow(1.01, duree);

  // ── Mode Épargne mensuelle ──
  const capitalConstitue    = epargne * 12 * duree;
  const revenusCapitalConst = capitalConstitue * (taux / 100) / 12;

  // Sliders fill
  const pctCapital = ((capital - 1000)  / (200000 - 1000)) * 100;
  const pctEpargne = ((epargne - 50)    / (2000 - 50))     * 100;
  const pctDuree   = ((duree - 1)       / (30 - 1))        * 100;
  const pctTaux    = ((taux - 3)        / (8 - 3))         * 100;

  return (
    <div className="scpi-simu-outer">

      {/* ── Sélecteur de mode ── */}
      <div className="scpi-simu-modes">
        <button
          className={`scpi-simu-mode${mode === 'capital' ? ' active' : ''}`}
          onClick={() => setMode('capital')}
        >
          <span className="scpi-simu-mode-icon">🏦</span>
          <span>Je dispose d'un capital<br /><strong>à investir maintenant</strong></span>
        </button>
        <button
          className={`scpi-simu-mode${mode === 'mensuel' ? ' active' : ''}`}
          onClick={() => setMode('mensuel')}
        >
          <span className="scpi-simu-mode-icon">🐷</span>
          <span>Je n'ai pas de capital mais<br /><strong>je peux épargner chaque mois</strong></span>
        </button>
      </div>

      {/* ── Simulateur ── */}
      <div className="scpi-simu-wrap">

        {/* Inputs */}
        <div className="scpi-simu-inputs">
          {mode === 'capital' ? (
            <>
              {/* Capital */}
              <div className="simu-field">
                <div className="simu-field-header">
                  <label>Capital à investir en SCPI</label>
                  <span className="simu-field-value">{fmt(capital)}</span>
                </div>
                <div className="simu-slider-wrap">
                  <input
                    type="range" min={1000} max={200000} step={1000}
                    value={capital}
                    onChange={e => setCapital(Number(e.target.value))}
                    className="simu-slider"
                    style={{ '--pct': `${pctCapital}%` }}
                    aria-label="Capital à investir"
                  />
                  <div className="simu-slider-labels"><span>1 000€</span><span>200 000€</span></div>
                </div>
              </div>

              {/* Durée */}
              <div className="simu-field">
                <div className="simu-field-header">
                  <label>Durée de détention</label>
                  <span className="simu-field-value">{duree} ans</span>
                </div>
                <div className="simu-slider-wrap">
                  <input
                    type="range" min={1} max={30} step={1}
                    value={duree}
                    onChange={e => setDuree(Number(e.target.value))}
                    className="simu-slider"
                    style={{ '--pct': `${pctDuree}%` }}
                    aria-label="Durée de détention en années"
                  />
                  <div className="simu-slider-labels"><span>1 an</span><span>30 ans</span></div>
                </div>
              </div>

              {/* Taux */}
              <div className="simu-field">
                <div className="simu-field-header">
                  <label>Taux de distribution estimé (SCPI)</label>
                  <span className="simu-field-value">{taux}%/an</span>
                </div>
                <div className="simu-slider-wrap">
                  <input
                    type="range" min={3} max={8} step={0.1}
                    value={taux}
                    onChange={e => setTaux(Number(e.target.value))}
                    className="simu-slider"
                    style={{ '--pct': `${pctTaux}%` }}
                    aria-label="Taux de distribution annuel"
                  />
                  <div className="simu-slider-labels"><span>3%</span><span>8%</span></div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Épargne mensuelle */}
              <div className="simu-field">
                <div className="simu-field-header">
                  <label>Épargne mensuelle investie</label>
                  <span className="simu-field-value">{fmt(epargne)}/mois</span>
                </div>
                <div className="simu-slider-wrap">
                  <input
                    type="range" min={50} max={2000} step={50}
                    value={epargne}
                    onChange={e => setEpargne(Number(e.target.value))}
                    className="simu-slider"
                    style={{ '--pct': `${pctEpargne}%` }}
                    aria-label="Épargne mensuelle"
                  />
                  <div className="simu-slider-labels"><span>50€</span><span>2 000€</span></div>
                </div>
              </div>

              {/* Durée */}
              <div className="simu-field">
                <div className="simu-field-header">
                  <label>Durée d'épargne</label>
                  <span className="simu-field-value">{duree} ans</span>
                </div>
                <div className="simu-slider-wrap">
                  <input
                    type="range" min={1} max={30} step={1}
                    value={duree}
                    onChange={e => setDuree(Number(e.target.value))}
                    className="simu-slider"
                    style={{ '--pct': `${pctDuree}%` }}
                    aria-label="Durée d'épargne en années"
                  />
                  <div className="simu-slider-labels"><span>1 an</span><span>30 ans</span></div>
                </div>
              </div>

              {/* Taux */}
              <div className="simu-field">
                <div className="simu-field-header">
                  <label>Taux de distribution estimé (SCPI)</label>
                  <span className="simu-field-value">{taux}%/an</span>
                </div>
                <div className="simu-slider-wrap">
                  <input
                    type="range" min={3} max={8} step={0.1}
                    value={taux}
                    onChange={e => setTaux(Number(e.target.value))}
                    className="simu-slider"
                    style={{ '--pct': `${pctTaux}%` }}
                    aria-label="Taux de distribution annuel"
                  />
                  <div className="simu-slider-labels"><span>3%</span><span>8%</span></div>
                </div>
              </div>
            </>
          )}

          {/* Note pédagogique */}
          <div className="simu-note">
            💡 Ces taux sont représentatifs du marché SCPI en 2026.
            La SCPI sélectionnée et la structure fiscale choisie changeront le rendement net réel.
          </div>
        </div>

        {/* Résultats */}
        <div className="scpi-simu-results">
          {mode === 'capital' ? (
            <>
              <div className="scpi-simu-result-header">
                <span>En investissant <strong>{fmt(capital)}</strong> dans des SCPI</span>
              </div>
              <div className="scpi-simu-result-grid">
                <div className="scpi-simu-result-block">
                  <span className="scpi-result-label">Revenus complémentaires potentiels</span>
                  <strong key={revenusMenusuels} className="scpi-result-big">
                    {fmtDec(revenusMenusuels)}<span>/mois</span>
                  </strong>
                  <span className="scpi-result-sub">soit {fmt(revenusAnnuels)}/an</span>
                </div>
                <div className="scpi-simu-result-divider" />
                <div className="scpi-simu-result-block">
                  <span className="scpi-result-label">Valeur estimée des parts dans {duree} ans</span>
                  <strong key={valeurPartsTerme} className="scpi-result-big scpi-result-big--secondary">
                    {fmt(valeurPartsTerme)}
                  </strong>
                  <span className="scpi-result-sub">avec revalorisation +1%/an estimée</span>
                </div>
              </div>
              <div className="scpi-simu-result-detail">
                <div className="simu-result-line">
                  <span>Capital investi</span><strong>{fmt(capital)}</strong>
                </div>
                <div className="simu-result-line">
                  <span>Revenus bruts sur {duree} ans</span>
                  <strong>{fmt(Math.round(revenusAnnuels * duree))}</strong>
                </div>
                <div className="simu-result-line simu-result-line--sep" />
                <div className="simu-result-line simu-result-line--bold">
                  <span>Total perçu + valeur des parts</span>
                  <strong style={{ color: '#fff' }}>
                    {fmt(Math.round(revenusAnnuels * duree + valeurPartsTerme))}
                  </strong>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="scpi-simu-result-header">
                <span>En épargnant <strong>{fmt(epargne)}/mois</strong> pendant <strong>{duree} ans</strong></span>
              </div>
              <div className="scpi-simu-result-grid">
                <div className="scpi-simu-result-block">
                  <span className="scpi-result-label">Capital constitué</span>
                  <strong key={capitalConstitue} className="scpi-result-big">
                    {fmt(capitalConstitue)}
                  </strong>
                  <span className="scpi-result-sub">de parts SCPI accumulées</span>
                </div>
                <div className="scpi-simu-result-divider" />
                <div className="scpi-simu-result-block">
                  <span className="scpi-result-label">Revenus mensuels générés ensuite</span>
                  <strong key={revenusCapitalConst} className="scpi-result-big scpi-result-big--secondary">
                    {fmtDec(revenusCapitalConst)}<span>/mois</span>
                  </strong>
                  <span className="scpi-result-sub">soit {fmt(Math.round(revenusCapitalConst * 12))}/an</span>
                </div>
              </div>
              <div className="scpi-simu-result-detail">
                <div className="simu-result-line">
                  <span>Versements mensuels</span><strong>{fmt(epargne)}/mois</strong>
                </div>
                <div className="simu-result-line">
                  <span>Durée d'épargne</span><strong>{duree} ans</strong>
                </div>
                <div className="simu-result-line simu-result-line--sep" />
                <div className="simu-result-line simu-result-line--bold">
                  <span>Capital total constitué</span>
                  <strong style={{ color: '#fff' }}>{fmt(capitalConstitue)}</strong>
                </div>
              </div>
            </>
          )}

          <ContactPopup label="📅 Affiner ma simulation avec Cindy" className="fin-btn-primary scpi-simu-cta" />

          <p className="simu-disclaimer">
            Simulation indicative basée sur un taux de distribution moyen. Les performances
            passées ne préjugent pas des performances futures. Investir dans des SCPI
            comporte un risque de perte en capital et de liquidité.
          </p>
        </div>
      </div>
    </div>
  );
}