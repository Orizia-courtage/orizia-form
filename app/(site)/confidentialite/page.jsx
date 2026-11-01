import Icon from '@/components/Icon';
import { ROBOTS } from '@/lib/indexing.mjs';
﻿import Link from 'next/link';

export const metadata = {
  title: 'Politique de Confidentialité & Données | Orizia Courtage',
  description: 'Découvrez comment Orizia Courtage collecte, utilise et protège vos données personnelles. Conformité RGPD, droits d\'accès et de suppression, gestion des cookies.',
  robots: ROBOTS,
  alternates: { canonical: 'https://www.orizia-courtage.fr/confidentialite' },
};

const confidentialiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Politique de Confidentialité — Orizia Courtage',
  url: 'https://www.orizia-courtage.fr/confidentialite',
  description: 'Politique de protection des données personnelles du cabinet de courtage Orizia Courtage, conformément au RGPD.',
  publisher: {
    '@type': 'LocalBusiness',
    name: 'Orizia Courtage',
    url: 'https://www.orizia-courtage.fr',
  },
};

// Sous-traitants (article 28 du RGPD) : à tenir à jour avec le registre des traitements.
const SOUS_TRAITANTS = [
  ['Vercel Inc.', 'Hébergement du site, de l\'outil de suivi des dossiers et de l\'espace client', 'États-Unis / Union européenne · Data Privacy Framework, clauses contractuelles types'],
  ['MongoDB Inc. (Atlas)', 'Base de données des dossiers et des fiches clients', 'Union européenne · clauses contractuelles types'],
  ['Cloudflare Inc. (R2, Turnstile)', 'Stockage chiffré des documents que vous déposez ; protection anti-robot des formulaires', 'Union européenne / États-Unis · Data Privacy Framework'],
  ['Resend Inc.', 'Envoi des e-mails (confirmations, rendez-vous, demandes de documents)', 'États-Unis · Data Privacy Framework, clauses contractuelles types'],
  ['Cal.com Inc.', 'Prise et gestion des rendez-vous', 'États-Unis / Union européenne · clauses contractuelles types'],
  ['Supabase Inc.', 'Réglages des simulateurs et protection contre les envois abusifs (aucune donnée de dossier)', 'Union européenne'],
  ['Google LLC / Apple Inc.', 'Carte de recommandation dans le portefeuille du téléphone (uniquement si vous l\'ajoutez)', 'États-Unis · Data Privacy Framework'],
  ['Orizia Courtage (serveur en France)', 'Automatisation du traitement des demandes du site', 'France'],
];

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
        <h2 style={{ color: 'var(--orizia-primary, #3e7f68)', fontSize: '1.5rem', marginBottom: '16px' }}>
          1. Quelles données je collecte ?
        </h2>
        <p>Dans le cadre de mon accompagnement, je suis amenée à collecter les données suivantes :</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Données d'identification :</strong> nom, prénom, adresse, téléphone, e-mail, situation familiale.</li>
          <li style={{ marginBottom: '8px' }}><strong>Données financières :</strong> revenus, charges, patrimoine, crédits en cours, avis d'imposition (strictement nécessaires pour l'étude de faisabilité d'un crédit ou d'un placement).</li>
          <li style={{ marginBottom: '8px' }}><strong>Données techniques des formulaires :</strong> lorsque vous envoyez une demande (rappel, recommandation, fin de simulation), l'adresse IP de votre connexion et le type d'appareil et de navigateur utilisés (par exemple « iPhone · Safari »).</li>
          <li style={{ marginBottom: '8px' }}><strong>Espace client :</strong> votre identifiant (adresse e-mail), votre mot de passe (enregistré sous forme chiffrée, jamais lisible), vos messages avec votre conseillère et, si vous les activez, les informations techniques nécessaires aux notifications sur votre téléphone.</li>
          <li style={{ marginBottom: '8px' }}><strong>Données de santé :</strong> uniquement dans le cadre précis de la recherche d'une assurance emprunteur (si le questionnaire médical est requis par la loi). Ces données sont traitées avec une confidentialité renforcée.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3e7f68)', fontSize: '1.5rem', marginBottom: '16px' }}>
          2. Pourquoi je collecte ces données ?
        </h2>
        <p>Je ne vous demande jamais d'informations inutiles. Vos données servent exclusivement à :</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li style={{ marginBottom: '8px' }}>Réaliser des simulations (capacité d'emprunt, économies d'assurance).</li>
          <li style={{ marginBottom: '8px' }}>Interroger mes partenaires bancaires et assureurs pour vous obtenir les meilleurs taux.</li>
          <li style={{ marginBottom: '8px' }}>Monter votre dossier de financement ou de souscription.</li>
          <li style={{ marginBottom: '8px' }}>Répondre à mes obligations légales et réglementaires (lutte contre le blanchiment, devoir de conseil ACPR).</li>
          <li style={{ marginBottom: '8px' }}>Protéger le site contre les abus et les fausses demandes (adresse IP et type d'appareil) : c'est un intérêt légitime au sens du RGPD. Une même adresse IP ne peut pas envoyer plus de 3 demandes par jour.</li>
          <li style={{ marginBottom: '8px' }}>Vous tenir informé(e) de l'avancement de vos dossiers dans votre espace client et, si vous l'avez accepté (par exemple en ajoutant votre carte de parrainage à votre téléphone), vous adresser des informations commerciales. Vous pouvez retirer cet accord à tout moment en supprimant la carte, en désactivant les notifications ou en me l'écrivant.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3e7f68)', fontSize: '1.5rem', marginBottom: '16px' }}>
          3. Avec qui je partage vos données ?
        </h2>
        <p>
          <strong>Vos données ne sont JAMAIS vendues à des tiers.</strong><br /><br />
          Elles sont transmises de manière sécurisée <strong>uniquement à mes partenaires financiers</strong> (banques, compagnies d'assurance, sociétés de gestion) dans le but exclusif d'obtenir une proposition de contrat pour votre projet, et toujours avec votre accord préalable.
        </p>
        <p style={{ marginTop: '16px' }}>
          Pour faire fonctionner ce site, mon outil de suivi des dossiers et votre espace client, je fais appel à des <strong>prestataires techniques (sous-traitants)</strong>. Ils agissent uniquement sur mes instructions, sont liés par un contrat de traitement des données (article 28 du RGPD) et ne peuvent pas utiliser vos données pour leur propre compte :
        </p>
        <div style={{ overflowX: 'auto', marginTop: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #e3e7e4' }}>
                <th style={{ padding: '8px 10px 8px 0' }}>Prestataire</th>
                <th style={{ padding: '8px 10px' }}>Rôle</th>
                <th style={{ padding: '8px 0 8px 10px' }}>Localisation et garanties</th>
              </tr>
            </thead>
            <tbody>
              {SOUS_TRAITANTS.map(([nom, role, lieu]) => (
                <tr key={nom} style={{ borderBottom: '1px solid #eef1ef', verticalAlign: 'top' }}>
                  <td style={{ padding: '8px 10px 8px 0', fontWeight: 600 }}>{nom}</td>
                  <td style={{ padding: '8px 10px' }}>{role}</td>
                  <td style={{ padding: '8px 0 8px 10px' }}>{lieu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '12px' }}>
          <strong>Transferts hors de l'Union européenne :</strong> certains de ces prestataires sont des sociétés américaines. Les transferts éventuels vers les États-Unis sont encadrés par le cadre de protection des données UE–États-Unis (<em>Data Privacy Framework</em>), auquel ces sociétés adhèrent, et par les clauses contractuelles types de la Commission européenne. Vous pouvez m'en demander le détail à tout moment.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3e7f68)', fontSize: '1.5rem', marginBottom: '16px' }}>
          4. Combien de temps je conserve vos données ?
        </h2>
        <p>Vos données sont conservées le temps nécessaire à la réalisation de votre projet, puis <strong>supprimées automatiquement</strong> à l'issue des durées ci-dessous :</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Si vous devenez client :</strong> 5 ans après la fin de notre relation commerciale (obligation légale pour les courtiers), puis suppression automatique de la fiche, des dossiers, des documents et des rendez-vous.</li>
          <li style={{ marginBottom: '8px' }}><strong>Si vous restez prospect (pas de contrat signé) :</strong> 3 ans à compter de notre dernier contact, puis suppression automatique.</li>
          <li style={{ marginBottom: '8px' }}><strong>Adresse IP et type d'appareil des formulaires :</strong> 7 jours, puis suppression automatique.</li>
          <li style={{ marginBottom: '8px' }}><strong>Coordonnées d'un proche recommandé par un client :</strong> effacées sous 30 jours s'il ne souhaite pas être contacté.</li>
          <li style={{ marginBottom: '8px' }}><strong>Messages de l'espace client :</strong> 30 jours, puis suppression automatique.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3e7f68)', fontSize: '1.5rem', marginBottom: '16px' }}>
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
          Pour exercer ces droits, il vous suffit de m'envoyer un e-mail directement à : <strong><a href="mailto:cindy.urbansky@orizia-courtage.fr" style={{ color: '#3e7f68' }}>cindy.urbansky@orizia-courtage.fr</a></strong>. Je vous répondrai personnellement dans les plus brefs délais.
        </p>
        <p style={{ marginTop: '16px', fontSize: '0.9rem', opacity: 0.8 }}>
          <em>Si vous estimez, après m'avoir contactée, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#3e7f68' }}>www.cnil.fr</a>).</em>
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3e7f68)', fontSize: '1.5rem', marginBottom: '16px' }}>
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
          backgroundColor: 'var(--orizia-primary, #3e7f68)', 
          color: '#fff', 
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'opacity 0.3s'
        }}>
          <Icon name="arrow-left" /> Retour à l'accueil
        </Link>
      </div>

    </main>
    </>
  );
}