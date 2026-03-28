'use client';
import { useState } from 'react';
import Link from 'next/link';

const fmt     = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const fmtDec  = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

export default function SimulateurSCPI() {
  const [mode,    setMode]    = useState('capital');  // 'capital' | 'mensuel'
  const [capital, setCapital] = useState(20000);
  const [epargne, setEpargne] = useState(200);
  const [duree,   setDuree]   = useState(10);         // en années
  const [taux,    setTaux]    = useState(5);           // rendement %/an

  // ── Mode Capital ──
  const revenusAnnuels     = capital * (taux / 100);
  const revenusMenusuels   = revenusAnnuels / 12;
  // Revalorisation des parts : +1%/an en moyenne
  const valeurPartsTerme   = capital * Math.pow(1.01, duree);

  // ── Mode Épargne mensuelle ──
  // Accumulation mensuelle sur la durée (sans intérêts composés — SCPI versements directs)
  const capitalConstitue   = epargne * 12 * duree;
  // Revenus une fois le capital constitué
  const revenusCapitalConst = capitalConstitue * (taux / 100) / 12;

  // Sliders %
  const pctCapital = ((capital - 1000)   / (200000 - 1000))  * 100;
  const pctEpargne = ((epargne - 50)     / (2000 - 50))      * 100;
  const pctDuree   = ((duree - 1)        / (30 - 1))         * 100;
  const pctTaux    = ((taux - 3)         / (8 - 3))          * 100;

  return (
    <div className="scpi-simu-outer">

      {/* Sélecteur de mode */}
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

      {/* Simulateur */}
      <div className="scpi-simu-wrap">

        {/* Colonne inputs */}
        <div className="scpi-simu-inputs">

          {mode === 'capital' ? (
            <>
              <div className="simu-field">
                <div className="simu-field-header">
                  <label>Capital à investir</label>
                  <span className="simu-field-value">{fmt(capital)}</span>
                </div>
                <div className="simu-slider-wrap">
                  <input
                    type="range" min={1000} max={200000} step={1000}
                    value={capital}
                    onChange={e => setCapital(Number(e.target.value))}
                    className="simu-slider"
                    style={{ '--pct': `${pctCapital}%` }}
                  />
                  <div className="simu-slider-labels"><span>1 000€</span><span>200 000€</span></div>
                </div>
              </div>

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
                  />
                  <div className="simu-slider-labels"><span>1 an</span><span>30 ans</span></div>
                </div>
              </div>

              <div className="simu-field">
                <div className="simu-field-header">
                  <label>Taux de distribution estimé</label>
                  <span className="simu-field-value">{taux}%/an</span>
                </div>
                <div className="simu-slider-wrap">
                  <input
                    type="range" min={3} max={8} step={0.1}
                    value={taux}
                    onChange={e => setTaux(Number(e.target.value))}
                    className="simu-slider"
                    style={{ '--pct': `${pctTaux}%` }}
                  />
                  <div className="simu-slider-labels"><span>3%</span><span>8%</span></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="simu-field">
                <div className="simu-field-header">
                  <label>Épargne mensuelle</label>
                  <span className="simu-field-value">{fmt(epargne)}/mois</span>
                </div>
                <div className="simu-slider-wrap">
                  <input
                    type="range" min={50} max={2000} step={50}
                    value={epargne}
                    onChange={e => setEpargne(Number(e.target.value))}
                    className="simu-slider"
                    style={{ '--pct': `${pctEpargne}%` }}
                  />
                  <div className="simu-slider-labels"><span>50€</span><span>2 000€</span></div>
                </div>
              </div>

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
                  />
                  <div className="simu-slider-labels"><span>1 an</span><span>30 ans</span></div>
                </div>
              </div>

              <div className="simu-field">
                <div className="simu-field-header">
                  <label>Taux de distribution estimé</label>
                  <span className="simu-field-value">{taux}%/an</span>
                </div>
                <div className="simu-slider-wrap">
                  <input
                    type="range" min={3} max={8} step={0.1}
                    value={taux}
                    onChange={e => setTaux(Number(e.target.value))}
                    className="simu-slider"
                    style={{ '--pct': `${pctTaux}%` }}
                  />
                  <div className="simu-slider-labels"><span>3%</span><span>8%</span></div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Colonne résultats */}
        <div className="scpi-simu-results">

          {mode === 'capital' ? (
            <>
              <div className="scpi-simu-result-header">
                <span>En investissant <strong>{fmt(capital)}</strong> dans des SCPI</span>
              </div>
              <div className="scpi-simu-result-grid">
                <div className="scpi-simu-result-block">
                  <span className="scpi-result-label">Revenus complémentaires potentiels</span>
                  <strong className="scpi-result-big">{fmtDec(revenusMenusuels)}<span>/mois</span></strong>
                  <span className="scpi-result-sub">soit {fmt(revenusAnnuels)}/an</span>
                </div>
                <div className="scpi-simu-result-divider" />
                <div className="scpi-simu-result-block">
                  <span className="scpi-result-label">Valeur estimée des parts dans {duree} ans</span>
                  <strong className="scpi-result-big scpi-result-big--secondary">{fmt(valeurPartsTerme)}</strong>
                  <span className="scpi-result-sub">avec revalorisation +1%/an estimée</span>
                </div>
              </div>
              <div className="scpi-simu-result-detail">
                <div className="simu-result-line">
                  <span>Capital investi</span><strong>{fmt(capital)}</strong>
                </div>
                <div className="simu-result-line">
                  <span>Revenus bruts sur {duree} ans</span>
                  <strong>{fmt(revenusAnnuels * duree)}</strong>
                </div>
                <div className="simu-result-line simu-result-line--sep" />
                <div className="simu-result-line simu-result-line--bold">
                  <span>Total perçu + valeur des parts</span>
                  <strong style={{ color: '#fff' }}>{fmt(revenusAnnuels * duree + valeurPartsTerme)}</strong>
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
                  <strong className="scpi-result-big">{fmt(capitalConstitue)}</strong>
                  <span className="scpi-result-sub">de parts SCPI accumulées</span>
                </div>
                <div className="scpi-simu-result-divider" />
                <div className="scpi-simu-result-block">
                  <span className="scpi-result-label">Revenus mensuels générés ensuite</span>
                  <strong className="scpi-result-big scpi-result-big--secondary">{fmtDec(revenusCapitalConst)}<span>/mois</span></strong>
                  <span className="scpi-result-sub">soit {fmt(revenusCapitalConst * 12)}/an</span>
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

          <Link href="/rendez-vous" className="fin-btn-primary scpi-simu-cta">
            📅 Affiner ma simulation avec un expert →
          </Link>

          <p className="simu-disclaimer">
            Simulation indicative basée sur un taux de distribution moyen. Les performances
            passées ne préjugent pas des performances futures. Investir dans des SCPI comporte
            un risque de perte en capital et de liquidité.
          </p>
        </div>
      </div>
    </div>
  );
}