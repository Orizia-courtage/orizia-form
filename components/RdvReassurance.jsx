import Image from 'next/image';

export default function RdvReassurance() {
  return (
    <div className="rdv-reassurance">
      <div className="rdv-reassurance-cindy">
        <div className="rdv-reassurance-photo">
          <Image
            src="/images/photo-cindy.webp"
            alt="Cindy Urbansky — Orizia Courtage"
            fill
            style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
            sizes="80px"
          />
        </div>
        <div>
          <div className="rdv-reassurance-name">Cindy Urbansky</div>
          <div className="rdv-reassurance-role">Courtière indépendante · Orizia Courtage</div>
          <div className="rdv-reassurance-dispo">
            <span className="rdv-dispo-dot" />
            Prochain créneau disponible : aujourd'hui
          </div>
        </div>
      </div>

      <div className="rdv-reassurance-quote">
        « Vous parlez directement à moi — pas à un standard, pas à un commercial. Je réponds personnellement à chaque demande. »
      </div>

      <div className="rdv-reassurance-points">
        {[
          { icon: '🎯', text: 'Analyse personnalisée de votre situation' },
          { icon: '🔒', text: '100% gratuit, sans engagement' },
          { icon: '⚡', text: 'Réponse sous 24h garantie' },
          { icon: '📞', text: 'Par téléphone ou visioconférence' },
        ].map(p => (
          <div key={p.text} className="rdv-reassurance-point">
            <span>{p.icon}</span>
            <span>{p.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
