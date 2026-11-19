'use client';
import { useState } from 'react';
import { track } from '@vercel/analytics';
import Icon from '@/components/Icon';

export default function LiensShare() {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const data = {
      title: 'Cindy Urbansky — Orizia Courtage',
      text: 'Je te recommande Cindy, courtière indépendante (crédit, assurance, placements) :',
      url: 'https://www.orizia-courtage.fr/liens?utm_source=partage',
    };
    track('liens_clic', { cible: 'partager' });
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(`${data.text} ${data.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* partage annulé */ }
  };
  return (
    <button type="button" className="lk-reco-btn" onClick={share}>
      <Icon name={copied ? 'check' : 'send'} /> {copied ? 'Lien copié' : 'Partager'}
    </button>
  );
}
