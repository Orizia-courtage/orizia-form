'use client';

import { useSimulationConfig } from '@/components/SimulationConfigProvider';
import { formatPercent } from '@/lib/simulationConfig';

export function CrowdfundingTaxValue({ part = 'total' }) {
  const { crowdfunding } = useSimulationConfig();
  const value = part === 'social' ? crowdfunding.socialTaxRate : part === 'pfnl' ? crowdfunding.pfnlRate : crowdfunding.flatTaxRate;
  return <>{formatPercent(value, { ratio: true, maximumFractionDigits: 2 })}</>;
}

export function CrowdfundingTaxParagraph() {
  return <>
    Les intérêts perçus sont des <strong>revenus de capitaux mobiliers</strong>{' '}
    soumis au <strong>Prélèvement Forfaitaire Unique (PFU) de <CrowdfundingTaxValue /></strong>.
    Voici comment ça se décompose — et ce que ça change concrètement sur votre gain.
  </>;
}

export function CrowdfundingTaxBreakdown() {
  return <div className="crowd-fiscalite-grid">
    <div className="crowd-fiscalite-item" style={{ background: 'var(--orizia-gold-light)', border: '1px solid rgba(107,182,155,0.4)' }}>
      <strong><CrowdfundingTaxValue part="pfnl" /></strong><span>Impôt sur le revenu</span>
    </div>
    <div className="crowd-fiscalite-plus">+</div>
    <div className="crowd-fiscalite-item" style={{ background: 'var(--orizia-gold-light)', border: '1px solid rgba(107,182,155,0.4)' }}>
      <strong><CrowdfundingTaxValue part="social" /></strong><span>Prélèvements sociaux</span>
    </div>
    <div className="crowd-fiscalite-plus">=</div>
    <div className="crowd-fiscalite-item crowd-fiscalite-total" style={{ border: '2px solid var(--orizia-gold)' }}>
      <strong><CrowdfundingTaxValue /></strong><span>Flat tax totale</span>
    </div>
  </div>;
}
