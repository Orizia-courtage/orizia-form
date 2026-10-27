'use client';

import { useState } from 'react';
import ContactPopup from '@/components/ContactPopup';

import Icon from '@/components/Icon';
const VEHICULES = [
  {
    id: 'neuf',
    icon: 'sparkles',
    label: 'Neuf ou < 2 ans',
    desc: 'Sorti de concession récemment',
  },
  {
    id: 'recent',
    icon: 'car',
    label: '2–7 ans',
    desc: 'Occasion récente, bonne valeur',
  },
  {
    id: 'ancien',
    icon: 'wrench',
    label: '+ de 7 ans',
    desc: 'Valeur Argus faible',
  },
  {
    id: 'loa',
    icon: 'file-text',
    label: 'LOA / LLD',
    desc: 'Véhicule en leasing',
  },
];

const RECOMMANDATIONS = {
  neuf: {
    formule: 'Tous risques',
    icon: 'circle-check',
    color: '#3e7f68',
    bg: 'rgba(62,127,104,0.06)',
    border: 'rgba(62,127,104,0.2)',
    raison: 'Un véhicule neuf représente un investissement important. Le Tous Risques est indispensable pour couvrir les dommages même si vous êtes responsable — et souvent exigé par le concessionnaire.',
    garanties: ['Responsabilité civile', 'Bris de glace', 'Vol & incendie', 'Dommages tous accidents', 'Assistance 0 km'],
    conseil: 'Pensez à négocier le rachat de franchise — sur un véhicule neuf, ça vaut vraiment le coup.',
    economie: null,
  },
  recent: {
    formule: 'Intermédiaire',
    icon: 'scale',
    color: '#a87a2c',
    bg: 'rgba(168,122,44,0.06)',
    border: 'rgba(168,122,44,0.2)',
    raison: 'Votre véhicule a encore une valeur significative mais le Tous Risques commence à coûter plus cher que ce qu\'il rapporte. L\'Intermédiaire est le meilleur compromis prix/protection.',
    garanties: ['Responsabilité civile', 'Bris de glace', 'Vol & incendie', 'Défense pénale'],
    conseil: 'Vérifiez votre bonus : si vous êtes à 50%, vous pouvez souvent négocier des garanties supplémentaires sans surcoût.',
    economie: 'Jusqu\'à 200€/an vs Tous Risques',
  },
  ancien: {
    formule: 'Au tiers',
    icon: 'shield-check',
    color: 'var(--orizia-primary)',
    bg: 'rgba(45,106,95,0.06)',
    border: 'rgba(45,106,95,0.2)',
    raison: 'Si votre voiture cote moins de 3 000€ à l\'Argus, payer un Tous Risques n\'a aucun sens économique. Le Tiers vous protège légalement et votre portefeuille vous remerciera.',
    garanties: ['Responsabilité civile', 'Défense pénale et recours'],
    conseil: 'Ajoutez éventuellement le bris de glace en option — c\'est peu cher et très utile au quotidien.',
    economie: 'Jusqu\'à 400€/an vs Tous Risques',
  },
  loa: {
    formule: 'Tous risques obligatoire',
    icon: 'clipboard-list',
    color: '#3e7f68',
    bg: 'rgba(62,127,104,0.06)',
    border: 'rgba(62,127,104,0.2)',
    raison: 'En LOA ou LLD, le Tous Risques est contractuellement obligatoire — le bailleur l\'exige. Mais vous pouvez choisir votre assureur librement et faire des économies significatives vs l\'assurance proposée par le concessionnaire.',
    garanties: ['Responsabilité civile', 'Bris de glace', 'Vol & incendie', 'Dommages tous accidents', 'Valeur à neuf (souvent exigée)'],
    conseil: 'L\'assurance proposée par le concessionnaire est souvent 30 à 50% plus chère. Je trouve mieux.',
    economie: 'Jusqu\'à 300€/an vs assurance concessionnaire',
  },
};

export default function AutoFormuleSelector() {
  const [selected, setSelected] = useState(null);
  const reco = selected ? RECOMMANDATIONS[selected] : null;

  return (
    <div className="afs-wrap">
      <div className="afs-label">Mon véhicule est…</div>
      <div className="afs-grid">
        {VEHICULES.map(v => (
          <button
            key={v.id}
            onClick={() => setSelected(selected === v.id ? null : v.id)}
            className={`afs-btn${selected === v.id ? ' afs-btn--active' : ''}`}
            style={selected === v.id && reco ? { borderColor: reco.color, background: reco.bg } : {}}
          >
            <span className="afs-btn-icon"><Icon name={v.icon} /></span>
            <span className="afs-btn-label">{v.label}</span>
            <span className="afs-btn-desc">{v.desc}</span>
          </button>
        ))}
      </div>

      {reco && (
        <div className="afs-result" style={{ borderColor: reco.border, background: reco.bg }} >
          <div className="afs-result-header">
            <div>
              <div className="afs-result-formule" style={{ color: reco.color }}>
                <Icon name={reco.icon} /> Formule recommandée : <strong>{reco.formule}</strong>
              </div>
              {reco.economie && (
                <div className="afs-result-economie"><Icon name="coins" /> {reco.economie}</div>
              )}
            </div>
          </div>

          <p className="afs-result-raison">{reco.raison}</p>

          <div className="afs-result-garanties">
            <div className="afs-result-garanties-title">Garanties incluses</div>
            <div className="afs-result-garanties-list">
              {reco.garanties.map(g => (
                <span key={g} className="afs-garantie-pill" style={{ borderColor: reco.border, color: reco.color }}>
                  <Icon name="check" /> {g}
                </span>
              ))}
            </div>
          </div>

          <div className="afs-result-conseil">
            <span><Icon name="message-circle" /></span>
            <p>{reco.conseil}</p>
          </div>

          <ContactPopup label="Obtenir mon devis personnalisé" icon="calendar-days" className="fin-btn-primary" style={{ display: 'inline-flex', marginTop: 16 }} />
        </div>
      )}
    </div>
  );
}
