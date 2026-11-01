import Image from 'next/image';

// Petit bloc « humain » en tête des appels à l'action sombres de fin de page :
// le visage de Cindy, sa disponibilité et trois garanties. Purement visuel (aucun état).
export default function CtaPresence() {
  return (
    <div className="cta-presence">
      <span className="cta-presence-avatar">
        <Image src="/images/avatar-cindy.webp" alt="Cindy Urbansky" width={72} height={72} unoptimized />
        <span className="cta-presence-dot" aria-hidden="true" />
      </span>
      <span className="cta-presence-text">
        <strong>Cindy Urbansky</strong>
        <span>Courtière indépendante · répond sous 24 h</span>
      </span>
      <ul className="cta-presence-chips" aria-label="Mes engagements">
        <li>Premier échange offert</li>
        <li>Sans engagement</li>
        <li>100 % indépendante</li>
      </ul>
    </div>
  );
}
