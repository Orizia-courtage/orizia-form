import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import RdvButton from '@/components/RdvButton';
import RecommendationForm from '@/components/RecommendationForm';
import { resolveReferral, shortName } from '@/lib/referral.mjs';
import './recommandation.css';

export const dynamic = 'force-dynamic';

// Page personnelle de recommandation d'un client (QR code de sa carte Wallet / lien partagé).
export async function generateMetadata({ params }) {
  const { code } = await params;
  const referral = await resolveReferral(code);
  const who = referral ? shortName(referral.parrain) : 'Un client';
  return {
    title: `${who} vous recommande Cindy Urbansky | Orizia Courtage`,
    description: 'Courtière indépendante en crédit, assurance et patrimoine. Laissez vos coordonnées : je vous rappelle sous 24 h.',
    robots: { index: false, follow: false },
  };
}

export default async function RecommendationPage({ params }) {
  const { code } = await params;
  const referral = await resolveReferral(code);
  if (!referral) notFound();
  const who = shortName(referral.parrain);

  return (
    <main className="reco">
      <section className="reco-hero">
        <div className="reco-inner">
          <div className="reco-card">
            <div className="reco-person">
              <img src="/images/photo-cindy.webp" alt="Cindy Urbansky, courtière Orizia Courtage" width="96" height="96" />
              <div>
                <span className="reco-kicker"><Icon name="heart-handshake" /> Recommandation de {who}</span>
                <h1><em>{who}</em> vous recommande Cindy Urbansky</h1>
                <p>Courtière indépendante en crédit, assurance et patrimoine, à Marcq-en-Barœul et partout en France.</p>
              </div>
            </div>
            <ul className="reco-proofs">
              <li><Icon name="landmark" /> Plus de 40 banques et assureurs mis en concurrence</li>
              <li><Icon name="user" /> Une seule interlocutrice, du premier appel à la signature</li>
              <li><Icon name="timer" /> Rappel sous 24 h, sans engagement</li>
            </ul>
            <div className="reco-quick">
              <a className="reco-btn reco-btn--ghost" href="tel:+33777259706"><Icon name="phone" /> 07 77 25 97 06</a>
              <a className="reco-btn reco-btn--ghost" href="/cindy-urbansky.vcf"><Icon name="user-round" /> Enregistrer le contact</a>
              <RdvButton className="reco-btn reco-btn--ghost">Prendre rendez-vous</RdvButton>
            </div>
          </div>

          <div className="reco-form-card">
            <h2>Être rappelé(e) par Cindy</h2>
            <p className="reco-form-lead">Laissez vos coordonnées : je vous rappelle sous 24 h pour parler de votre projet. {referral.parrain.prenom} sera remercié(e) si votre dossier aboutit.</p>
            <RecommendationForm code={referral.code} parrainPrenom={referral.parrain.prenom} />
          </div>
        </div>
      </section>
    </main>
  );
}
