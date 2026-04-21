import Link from 'next/link';

export const metadata = {
  title: 'Politique de Confidentialité & Protection des Données | Orizia Courtage',
  description: 'Découvrez comment Orizia Courtage collecte, utilise et protège vos données personnelles. Conformité RGPD, droits d\'accès et de suppression, gestion des cookies.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://orizia-courtage.fr/confidentialite' },
};

const confidentialiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Politique de Confidentialité — Orizia Courtage',
  url: 'https://orizia-courtage.fr/confidentialite',
  description: 'Politique de protection des données personnelles du cabinet de courtage Orizia Courtage, conformément au RGPD.',
  publisher: {
    '@type': 'LocalBusiness',
    name: 'Orizia Courtage',
    url: 'https://orizia-courtage.fr',
  },
};

export default function ConfidentialitePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(confidentialiteSchema) }}
      />
      <main style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '100px 20px 80px', 
      color: 'var(--orizia-dark, #333)',
      lineHeight: '1.7'
    }}>
      
      <h1 style={{ 
        color: 'var(--orizia-accent, #1a1a1a)', 
        fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
        marginBottom: '24px',
        fontWeight: 900 
      }}>
        Politique de Confidentialité
      </h1>
      
      <p style={{ fontSize: '1.1rem', marginBottom: '40px', opacity: 0.8 }}>
        Chez Orizia Courtage, la transparence n'est pas qu'un argument commercial. En tant que courtier indépendant, je traite des informations intimes (finances, santé, projets de vie). La protection de vos données personnelles est donc une priorité absolue. Voici concrètement comment je les gère.
      </p>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3a6f6c)', fontSize: '1.5rem', marginBottom: '16px' }}>
          1. Quelles données je collecte ?
        </h2>
        <p>Dans le cadre de mon accompagnement, je suis amenée à collecter les données suivantes :</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Données d'identification :</strong> nom, prénom, adresse, téléphone, e-mail, situation familiale.</li>
          <li style={{ marginBottom: '8px' }}><strong>Données financières :</strong> revenus, charges, patrimoine, crédits en cours, avis d'imposition (strictement nécessaires pour l'étude de faisabilité d'un crédit ou d'un placement).</li>
          <li style={{ marginBottom: '8px' }}><strong>Données de santé :</strong> uniquement dans le cadre précis de la recherche d'une assurance emprunteur (si le questionnaire médical est requis par la loi). Ces données sont traitées avec une confidentialité renforcée.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3a6f6c)', fontSize: '1.5rem', marginBottom: '16px' }}>
          2. Pourquoi je collecte ces données ?
        </h2>
        <p>Je ne vous demande jamais d'informations inutiles. Vos données servent exclusivement à :</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li style={{ marginBottom: '8px' }}>Réaliser des simulations gratuites (capacité d'emprunt, économies d'assurance).</li>
          <li style={{ marginBottom: '8px' }}>Interroger mes partenaires bancaires et assureurs pour vous obtenir les meilleurs taux.</li>
          <li style={{ marginBottom: '8px' }}>Monter votre dossier de financement ou de souscription.</li>
          <li style={{ marginBottom: '8px' }}>Répondre à mes obligations légales et réglementaires (lutte contre le blanchiment, devoir de conseil ACPR).</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3a6f6c)', fontSize: '1.5rem', marginBottom: '16px' }}>
          3. Avec qui je partage vos données ?
        </h2>
        <p>
          <strong>Vos données ne sont JAMAIS vendues à des tiers.</strong><br /><br />
          Elles sont transmises de manière sécurisée <strong>uniquement à mes partenaires financiers</strong> (banques, compagnies d'assurance, sociétés de gestion) dans le but exclusif d'obtenir une proposition de contrat pour votre projet, et toujours avec votre accord préalable.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3a6f6c)', fontSize: '1.5rem', marginBottom: '16px' }}>
          4. Combien de temps je conserve vos données ?
        </h2>
        <p>Vos données sont conservées le temps nécessaire à la réalisation de votre projet, puis archivées conformément aux durées légales :</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Si vous devenez client :</strong> 5 ans après la fin de notre relation commerciale (obligation légale pour les courtiers).</li>
          <li style={{ marginBottom: '8px' }}><strong>Si vous restez prospect (pas de contrat signé) :</strong> 3 ans à compter de notre dernier contact.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3a6f6c)', fontSize: '1.5rem', marginBottom: '16px' }}>
          5. Vos droits (RGPD)
        </h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous êtes maître de vos données. Vous avez le droit :
        </p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li style={{ marginBottom: '8px' }}>D'accéder aux données que je possède sur vous.</li>
          <li style={{ marginBottom: '8px' }}>De demander leur rectification si elles sont inexactes.</li>
          <li style={{ marginBottom: '8px' }}>De demander leur suppression (droit à l'oubli), sous réserve de mes obligations légales de conservation.</li>
          <li style={{ marginBottom: '8px' }}>De vous opposer à leur traitement.</li>
        </ul>
        <p style={{ marginTop: '16px' }}>
          Pour exercer ces droits, il vous suffit de m'envoyer un e-mail directement à : <strong>[Ton adresse email de contact, ex: contact@orizia.fr]</strong>. Je vous répondrai personnellement dans les plus brefs délais.
        </p>
        <p style={{ marginTop: '16px', fontSize: '0.9rem', opacity: 0.8 }}>
          <em>Si vous estimez, après m'avoir contactée, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orizia-primary)' }}>www.cnil.fr</a>).</em>
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3a6f6c)', fontSize: '1.5rem', marginBottom: '16px' }}>
          6. Gestion des Cookies
        </h2>
        <p>
          Mon site web utilise un minimum de cookies. Ils servent principalement à assurer le bon fonctionnement technique du site (par exemple, la prise de rendez-vous en ligne via Cal.com) et à mesurer anonymement l'audience pour améliorer votre expérience de navigation. Aucun cookie publicitaire intrusif n'est utilisé sans votre consentement explicite.
        </p>
      </section>

      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <Link href="/" style={{ 
          display: 'inline-block', 
          padding: '12px 24px', 
          backgroundColor: 'var(--orizia-primary, #3a6f6c)', 
          color: '#fff', 
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'opacity 0.3s'
        }}>
          ← Retour à l'accueil
        </Link>
      </div>

    </main>
    </>
  );
}