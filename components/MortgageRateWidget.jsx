'use client';

import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from '@vnedyalk0v/react19-simple-maps';
import geoData from '../data/france-zones.json';

import ReunionSVG           from '../src/assets/outremer/reunion.svg';
import GuadeloupeSVG        from '../src/assets/outremer/guadeloupe.svg';
import MartiniqueSVG        from '../src/assets/outremer/martinique.svg';
import GuyaneSVG            from '../src/assets/outremer/guyane.svg';
import NCaledonieSVG        from '../src/assets/outremer/nouvelle-caledonie.svg';
import MayotteSVG           from '../src/assets/outremer/mayotte.svg';
import PolynesieSVG         from '../src/assets/outremer/polynesie.svg';
import StMartinSVG          from '../src/assets/outremer/st-martin.svg';
import StBartSVG            from '../src/assets/outremer/st-barthelemy.svg';
import StPierreSVG          from '../src/assets/outremer/st-pierre-et-miquelon.svg';
import WallisFutunaSVG      from '../src/assets/outremer/wallis-futuna.svg';

const ISLAND_COMPONENTS = {
  'reunion':               ReunionSVG,
  'guadeloupe':            GuadeloupeSVG,
  'martinique':            MartiniqueSVG,
  'guyane':                GuyaneSVG,
  'nouvelle-caledonie':    NCaledonieSVG,
  'mayotte':               MayotteSVG,
  'polynesie':             PolynesieSVG,
  'saint-martin':          StMartinSVG,
  'saint-barthelemy':      StBartSVG,
  'saint-pierre-miquelon': StPierreSVG,
  'wallis-futuna':         WallisFutunaSVG,
};

// ─── RATES DATA ───────────────────────────────────────────────────────────────
export const RATES = {
  'ile-de-france':         { '10': 2.65, '11-15': 2.80, '16-20': 3.00, '21-25': 3.15 },
  'nord-ouest':            { '10': 2.70, '11-15': 2.85, '16-20': 3.05, '21-25': 3.20 },
  'nord-est':              { '10': 2.75, '11-15': 2.90, '16-20': 3.10, '21-25': 3.25 },
  'sud-ouest':             { '10': 2.80, '11-15': 2.95, '16-20': 3.15, '21-25': 3.30 },
  'sud-est':               { '10': 2.85, '11-15': 3.00, '16-20': 3.20, '21-25': 3.35 },
  'corse':                 { '10': 2.90, '11-15': 3.05, '16-20': 3.25, '21-25': 3.40 },
  'reunion':               { '10': 3.05, '11-15': 3.20, '16-20': 3.40, '21-25': 3.55 },
  'guadeloupe':            { '10': 3.10, '11-15': 3.25, '16-20': 3.45, '21-25': 3.60 },
  'guyane':                { '10': 3.15, '11-15': 3.30, '16-20': 3.50, '21-25': 3.65 },
  'nouvelle-caledonie':    { '10': 3.20, '11-15': 3.35, '16-20': 3.55, '21-25': 3.70 },
  'martinique':            { '10': 3.10, '11-15': 3.25, '16-20': 3.45, '21-25': 3.60 },
  'mayotte':               { '10': 3.25, '11-15': 3.40, '16-20': 3.60, '21-25': 3.75 },
  'polynesie':             { '10': 3.20, '11-15': 3.35, '16-20': 3.55, '21-25': 3.70 },
  'saint-martin':          { '10': 3.15, '11-15': 3.30, '16-20': 3.50, '21-25': 3.65 },
  'saint-barthelemy':      { '10': 3.15, '11-15': 3.30, '16-20': 3.50, '21-25': 3.65 },
  'saint-pierre-miquelon': { '10': 3.05, '11-15': 3.20, '16-20': 3.40, '21-25': 3.55 },
  'wallis-futuna':         { '10': 3.25, '11-15': 3.40, '16-20': 3.60, '21-25': 3.75 },
};

// ─── OUTRE-MER ────────────────────────────────────────────────────────────────
const OUTREMER_REGIONS = [
  { id: 'reunion',               label: 'La Réunion'               },
  { id: 'guadeloupe',            label: 'Guadeloupe'               },
  { id: 'martinique',            label: 'Martinique'               },
  { id: 'guyane',                label: 'Guyane'                   },
  { id: 'nouvelle-caledonie',    label: 'Nouvelle-Calédonie'       },
  { id: 'mayotte',               label: 'Mayotte'                  },
  { id: 'polynesie',             label: 'Polynésie'                },
  { id: 'saint-martin',          label: 'Saint-Martin'             },
  { id: 'saint-barthelemy',      label: 'Saint-Barthélemy'         },
  { id: 'saint-pierre-miquelon', label: 'Saint-Pierre-et-Miquelon' },
  { id: 'wallis-futuna',         label: 'Wallis et Futuna'         },
];

// ─── LABELS MÉTROPOLE ─────────────────────────────────────────────────────────
const ZONE_LABELS = [
  { id: 'nord-ouest',    label: 'Nord-Ouest', coords: [-0.8, 47.6], fontSize: 9,   lines: null },
  { id: 'nord-est',      label: 'Nord-Est',   coords: [5.8,  48.3], fontSize: 9,   lines: null },
  { id: 'sud-ouest',     label: 'Sud-Ouest',  coords: [0.6,  44.0], fontSize: 9,   lines: null },
  { id: 'sud-est',       label: 'Sud-Est',    coords: [5.6,  44.5], fontSize: 9,   lines: null },
  { id: 'corse',         label: 'Corse',      coords: [9.1,  42.2], fontSize: 7.5, lines: null },
  { id: 'ile-de-france',                      coords: [2.35, 48.7], fontSize: 7,   lines: ['Île-de', 'France'] },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function getBracket(years) {
  if (years <= 10) return '10';
  if (years <= 15) return '11-15';
  if (years <= 20) return '16-20';
  return '21-25';
}

function formatRate(rate) {
  return rate.toFixed(2).replace('.', ',') + '\u00a0%';
}

// ─── FRANCE MAP ───────────────────────────────────────────────────────────────
function FranceMap({ selected, onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ center: [2.5, 46.5], scale: 1500 }}
      width={380}
      height={460}
      style={{ width: '100%', maxWidth: '380px', height: 'auto', display: 'block' }}
      aria-label="Carte des régions de France métropolitaine"
    >
      <Geographies geography={geoData}>
        {({ geographies }) =>
          geographies
            .filter(geo => geo.properties.zoneId)
            .map((geo, i) => {
              const zoneId     = geo.properties.zoneId;
              const isSelected = selected === zoneId;
              const isHovered  = hovered  === zoneId;
              const fill = isSelected ? '#E87118' : isHovered ? '#EDAB78' : '#F2BC94';

              return (
                <Geography
                  key={`metropole-${i}`}
                  geography={geo}
                  fill={fill}
                  stroke="white"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  style={{
                    default: { outline: 'none', cursor: 'pointer', transition: 'fill 0.18s ease' },
                    hover:   { outline: 'none', cursor: 'pointer' },
                    pressed: { outline: 'none', cursor: 'pointer' },
                  }}
                  onClick={() => onSelect(zoneId)}
                  onMouseEnter={() => setHovered(zoneId)}
                  onMouseLeave={() => setHovered(null)}
                  role="button"
                  aria-label={zoneId}
                />
              );
            })
        }
      </Geographies>

      {ZONE_LABELS.map((zone) => (
        <Marker key={zone.id} coordinates={zone.coords}>
          {zone.lines ? (
            <text
              textAnchor="middle"
              fontSize={zone.fontSize}
              fontWeight="700"
              fill={selected === zone.id ? 'white' : '#7A3B0A'}
              style={{ pointerEvents: 'none', userSelect: 'none', fontFamily: 'inherit' }}
            >
              {zone.lines.map((line, i) => (
                <tspan key={i} x="0" dy={i === 0 ? 0 : zone.fontSize + 1}>{line}</tspan>
              ))}
            </text>
          ) : (
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={zone.fontSize}
              fontWeight="700"
              fill={selected === zone.id ? 'white' : '#7A3B0A'}
              style={{ pointerEvents: 'none', userSelect: 'none', fontFamily: 'inherit' }}
            >
              {zone.label}
            </text>
          )}
        </Marker>
      ))}
    </ComposableMap>
  );
}

// ─── OUTRE-MER GRID ───────────────────────────────────────────────────────────
function OutreMerGrid({ selected, onSelect }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
      width: '100%',
      padding: '4px 0',
      overflowY: 'auto',
      maxHeight: '460px',
    }}>
      {OUTREMER_REGIONS.map((region) => {
        const isSelected      = selected === region.id;
        const IslandComponent = ISLAND_COMPONENTS[region.id];
        const fillColor       = isSelected ? '#E87118' : '#F2BC94';

        return (
          <div
            key={region.id}
            onClick={() => onSelect(region.id)}
            style={{
              background: 'white',
              border: `2px solid ${isSelected ? '#E87118' : 'transparent'}`,
              borderRadius: '14px',
              padding: '8px 6px 4px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              transition: 'all 0.18s ease',
              boxShadow: isSelected
                ? '0 4px 14px rgba(232,113,24,0.3)'
                : '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <span style={{
              fontSize: '8px',
              fontWeight: '800',
              color: isSelected ? '#E87118' : '#1A2D5A',
              textTransform: 'uppercase',
              letterSpacing: '0.3px',
              textAlign: 'center',
              lineHeight: 1.3,
            }}>
              {region.label}
            </span>

            {IslandComponent && (
              <IslandComponent
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  color: fillColor,        // currentColor dans le SVG
                  transition: 'color 0.18s ease',
                }}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function MortgageRateWidget() {
  const [tab, setTab]                       = useState('metropole');
  const [selectedRegion, setSelectedRegion] = useState('ile-de-france');
  const [years, setYears]                   = useState(16);

  const bracket   = getBracket(years);
  const rate      = RATES[selectedRegion]?.[bracket] ?? 0;
  const sliderPct = ((years - 10) / 15) * 100;

  const METROPOLE_ZONE_LABELS = {
    'ile-de-france': 'Île-de-France',
    'nord-ouest':    'Nord-Ouest',
    'nord-est':      'Nord-Est',
    'sud-ouest':     'Sud-Ouest',
    'sud-est':       'Sud-Est',
    'corse':         'Corse',
  };

  const regionLabel =
    tab === 'metropole'
      ? METROPOLE_ZONE_LABELS[selectedRegion] ?? ''
      : OUTREMER_REGIONS.find(r => r.id === selectedRegion)?.label ?? '';

  const today = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const handleTabChange = (next) => {
    setTab(next);
    setSelectedRegion(next === 'metropole' ? 'ile-de-france' : 'reunion');
  };

  return (
    <>
      <style>{`
        .mrw-slider {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 4px; border-radius: 4px;
          outline: none; cursor: pointer;
          background: linear-gradient(
            to right,
            #E87118 0%, #E87118 ${sliderPct}%,
            #DEDEDE ${sliderPct}%, #DEDEDE 100%
          );
          transition: background 0.1s;
        }
        .mrw-slider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 24px; height: 24px; border-radius: 50%;
          background: #E87118; border: 3px solid white;
          box-shadow: 0 2px 8px rgba(232,113,24,0.45); cursor: pointer;
        }
        .mrw-slider::-moz-range-thumb {
          width: 24px; height: 24px; border-radius: 50%;
          background: #E87118; border: 3px solid white;
          box-shadow: 0 2px 8px rgba(232,113,24,0.45); cursor: pointer;
        }
      `}</style>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '16px',
        maxWidth: '880px', margin: '0 auto', padding: '20px',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}>

        {/* LEFT PANEL */}
        <div style={{
          background: 'white', borderRadius: '26px', padding: '32px 30px',
          width: '300px', flexShrink: 0,
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
          display: 'flex', flexDirection: 'column', gap: '20px',
        }}>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#1A2D5A' }}>
            {regionLabel}
          </h2>
          <div style={{
            background: '#FEF0E6', borderRadius: '18px', padding: '16px 22px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 7L12 14L19 7" stroke="#22C55E" strokeWidth="2.8"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: '40px', fontWeight: '800', color: '#1A2D5A', letterSpacing: '-1.5px', lineHeight: 1 }}>
              {formatRate(rate)}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: '#9AA0B0', lineHeight: '1.5' }}>
            Taux sur {years} ans mis à jour le&nbsp;: {today}
          </p>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
              <span style={{ fontSize: '17px', fontWeight: '700', color: '#1A2D5A' }}>J'emprunte sur</span>
              <span style={{ fontSize: '17px', fontWeight: '800', color: '#E87118' }}>{years} ans</span>
            </div>
            <div style={{ padding: '0 2px' }}>
              <input
                type="range" min={10} max={25} step={1} value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="mrw-slider"
                aria-label="Durée d'emprunt en années"
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              {[10, 15, 20, 25].map((y) => (
                <div key={y} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#1A2D5A' }}>{y}</div>
                  <div style={{ fontSize: '12px', color: '#9AA0B0' }}>ans</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{
          background: '#FEF0E6', borderRadius: '26px', padding: '28px 24px 24px',
          flex: '1 1 380px', minWidth: '320px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
        }}>
          {tab === 'metropole'
            ? <FranceMap selected={selectedRegion} onSelect={setSelectedRegion} />
            : <OutreMerGrid selected={selectedRegion} onSelect={setSelectedRegion} />
          }
          <div style={{
            display: 'flex', background: 'white', borderRadius: '50px',
            padding: '4px', gap: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginTop: 'auto',
          }}>
            {[{ key: 'metropole', label: 'Métropole' }, { key: 'outremer', label: 'Outre Mer' }].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                style={{
                  background: tab === key ? '#E87118' : 'transparent',
                  border: 'none', borderRadius: '50px', padding: '11px 30px',
                  cursor: 'pointer',
                  color: tab === key ? 'white' : '#E87118',
                  fontSize: '15px', fontWeight: '700',
                  transition: 'all 0.2s ease', fontFamily: 'inherit',
                  boxShadow: tab === key ? '0 4px 14px rgba(232,113,24,0.35)' : 'none',
                  whiteSpace: 'nowrap',
                }}
                aria-pressed={tab === key}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}