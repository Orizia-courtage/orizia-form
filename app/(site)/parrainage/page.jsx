import Link from 'next/link';
import ParrainageForm from '@/components/ParrainageForm';
import RetrouverLien from '@/components/RetrouverLien';
import ContactPopup from '@/components/ContactPopup';

import Icon from '@/components/Icon';
// ── 1. MÉTADONNÉES SEO ──
export const metadata = {
  title: 'Programme de Parrainage Orizia : jusqu\'à 200€ | Orizia Courtage',
  description:
    'Recommandez-moi à vos proches et recevez jusqu\'à 200€ par dossier finalisé. Crédit immobilier, assurance emprunteur et placements.',
  alternates: { canonical: 'https://www.orizia-courtage.fr/parrainage' },
  openGraph: {
    title: 'Programme de Parrainage Orizia : Gagnez jusqu\'à 200€',
    description: 'Recommandez-moi à vos proches et recevez jusqu\'à 200€ en chèques cadeaux. Crédit, assurance, placements — chaque dossier finalisé est récompensé.',
    url: 'https://www.orizia-courtage.fr/parrainage',
    siteName: 'Orizia Courtage',
    images: [
      {
        url: 'https://www.orizia-courtage.fr/images/og-parrainage.webp',
        width: 1200,
        height: 630,
        alt: 'Programme de parrainage Orizia Courtage — Gagnez jusqu\'à 200€',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// ── 2. DONNÉES STRUCTURÉES ──
const parrainageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.orizia-courtage.fr' },
        { '@type': 'ListItem', position: 2, name: 'Parrainage', item: 'https://www.orizia-courtage.fr/parrainage' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Programme de Parrainage Orizia Courtage',
      serviceType: 'Programme de recommandation client',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Orizia Courtage',
        image: 'https://www.orizia-courtage.fr/images/Orizia_logo.webp',
      },
      description:
        'Recommandez-moi à vos proches et recevez jusqu\'à 200€ en chèques cadeaux pour chaque dossier finalisé (crédit immobilier, assurance emprunteur, placements).',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Récompense versée au parrain sous forme de chèques cadeaux à la finalisation du dossier du filleul.',
      },
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment fonctionne le programme de parrainage Orizia ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le plus simple : envoyez votre lien personnel (reçu avec votre carte de recommandation) à votre proche par WhatsApp ou SMS, il laisse lui-même ses coordonnées. Vous pouvez aussi remplir le formulaire ci-dessus : votre proche reçoit alors un e-mail de ma part à votre nom, et je l\'appelle seulement s\'il le souhaite. Dès que son dossier est finalisé et signé, vous recevez un chèque cadeau selon le type de dossier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien puis-je gagner avec le parrainage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour un financement finalisé (crédit immobilier, regroupement de crédits, prêt personnel) : 200€ pour le parrain. Pour une délégation d\'assurance emprunteur : 50€. Pour un placement (SCPI, PER, assurance vie ou crowdfunding) : 100€. La mutuelle santé et la prévoyance ne donnent pas droit à une récompense. Il n\'y a pas de limite au nombre de parrainages.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quand est-ce que je reçois ma récompense ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La récompense est versée sous forme de chèques cadeaux à la finalisation du dossier de votre filleul, c\'est-à-dire après la signature du contrat ou de l\'offre de prêt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mon filleul doit-il être au courant avant que je le recommande ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, prévenez-le avant de transmettre ses coordonnées. Il recevra un seul e-mail de ma part, à votre nom, et c\'est lui qui choisit d\'être rappelé ou de prendre rendez-vous : je ne l\'appelle jamais sans son accord. Sans réponse de sa part, ses coordonnées sont effacées sous 30 jours.',
      },
    },
    {
      '@type': 'Question',
      name: 'J\'ai perdu mon lien de recommandation, comment le retrouver ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cliquez sur « Lien perdu ? Recevoir à nouveau ma carte » en haut de cette page et indiquez l\'e-mail et le téléphone donnés lors de votre dossier : votre carte et votre lien vous sont renvoyés par e-mail. Si vous avez un espace client, votre lien est aussi dans l\'onglet « Parrainer ».',
      },
    },
    {
      '@type': 'Question',
      name: 'Puis-je parrainer plusieurs personnes ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolument. Il n\'y a aucune limite au nombre de filleuls que vous pouvez recommander. Chaque dossier finalisé donne droit à une récompense indépendante.',
      },
    },
  ],
};

export default function ParrainagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(parrainageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="parrainage-page">

        {/* ── HERO ── */}
        <section className="parrainage-hero">
          <div className="parrainage-hero-inner">
            <span className="parrainage-badge"><Icon name="gift" /> Programme de recommandation</span>
            <h1>
              Vous êtes satisfait de mon accompagnement ?<br />
              Parlez-en autour de vous.
            </h1>
            <p>
              Pour vous remercier de votre confiance, je vous offre des chèques cadeaux
              valables dans un large choix de boutiques pour chaque dossier finalisé.
            </p>
          </div>
        </section>

        {/* ── LIEN PERSONNEL (déjà client) ── */}
        <section className="parr-share-section">
          <div className="parr-share-card">
            <div className="parr-share-icon"><Icon name="smartphone" /></div>
            <div className="parr-share-body">
              <h2>Vous avez déjà votre carte de recommandation ?</h2>
              <p>Le plus simple : <strong>envoyez votre lien personnel</strong> à votre proche par WhatsApp ou SMS (bouton « Partager » dans l&apos;e-mail de votre carte ou dans votre espace client). Il laisse lui-même ses coordonnées et la recommandation vous est attribuée automatiquement.</p>
              <RetrouverLien />
            </div>
          </div>
        </section>

        {/* ── LES RÉCOMPENSES ── */}
        <section className="parrainage-rewards-section">
          <div className="parrainage-container">
            <div className="parrainage-header">
              <h2>Vos récompenses</h2>
              <p>Remises sous forme de chèques cadeaux à la finalisation du dossier de votre filleul.</p>
            </div>
            <div className="rewards-grid">
              <div className="reward-card card-financement">
                <div className="reward-icon"><Icon name="house" /></div>
                <h3>Financement</h3>
                <ul className="reward-list">
                  <li>• Crédit immobilier</li>
                  <li>• Regroupement de crédits</li>
                  <li>• Prêt personnel</li>
                </ul>
                <div className="reward-badge badge-financement">Pour le parrain : 200 €</div>
              </div>
              <div className="reward-card card-assurance">
                <div className="reward-icon"><Icon name="clipboard-list" /></div>
                <h3>Assurance de prêt</h3>
                <ul className="reward-list">
                  <li>• Délégation d'assurance emprunteur</li>
                </ul>
                <div className="reward-badge-group">
                  <div className="reward-badge badge-assurance">Pour le parrain : 50 €</div>
                </div>
              </div>
              <div className="reward-card card-placement">
                <div className="reward-icon"><Icon name="shield-check" /></div>
                <h3>Placements & Autres</h3>
                <ul className="reward-list">
                  <li>• SCPI / PER / Assurance Vie</li>
                  <li>• Crowdfunding</li>
                </ul>
                <div className="reward-badge-group">
                  <div className="reward-badge badge-placement">Pour le parrain : 100 €</div>
                </div>
              </div>
            </div>
            <p className="parr-reward-note">La mutuelle santé et la prévoyance ne donnent pas droit à une récompense.</p>
          </div>
        </section>

        {/* ── COMMENT ÇA SE PASSE POUR VOTRE PROCHE ── */}
        <section className="parr-steps-section">
          <div className="parrainage-container">
            <div className="parrainage-header">
              <h2>Comment ça se passe pour votre proche</h2>
              <p>Simple, sans pression, et toujours avec son accord.</p>
            </div>
            <ol className="parr-steps">
              <li><span className="parr-steps-num">1</span><div><h3>Il reçoit un message à votre nom</h3><p>Votre lien par WhatsApp ou SMS, ou un e-mail de ma part si vous passez par le formulaire.</p></div></li>
              <li><span className="parr-steps-num">2</span><div><h3>Il choisit d&apos;être rappelé</h3><p>Ou il réserve un rendez-vous. Je ne l&apos;appelle jamais sans son accord.</p></div></li>
              <li><span className="parr-steps-num">3</span><div><h3>Étude gratuite, vous êtes remercié</h3><p>Le premier échange est sans engagement. À la signature de son dossier, vous recevez votre chèque cadeau.</p></div></li>
            </ol>
          </div>
        </section>

        {/* ── FORMULAIRE ── */}
        <section className="parrainage-form-section">
          <div className="parrainage-form-container">
            <div className="parrainage-header">
              <h2>Vous préférez que je le contacte ?</h2>
              <p className="form-subtitle">
                Prévenez votre proche, puis transmettez-moi ses coordonnées : il recevra un e-mail de ma part à votre nom et choisira s&apos;il souhaite être rappelé.
              </p>
            </div>
            <ParrainageForm />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions sur le parrainage,<br />nos réponses directes</h2>
              <p>Tout ce que vous devez savoir avant de recommander Orizia à vos proches.</p>
            </div>
            <div className="crowd-faq-list">
              {faqSchema.mainEntity.map((f, i) => (
                <details key={i} className="crowd-faq-item">
                  <summary>{f.name}</summary>
                  <p>{f.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: 16 }}>
                Vous avez une question spécifique à votre situation ? Je vous réponds sous 24h.
              </p>
              <ContactPopup label="Poser une autre question à Cindy" icon="mail" className="fin-btn-secondary"/>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
