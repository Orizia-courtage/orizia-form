import Icon from '@/components/Icon';
import Link from 'next/link';
import { COMPANY } from '@/lib/company.mjs';

export const metadata = {
  title: 'Mentions Légales — ORIAS & ACPR | Orizia Courtage',
  description: 'Mentions légales du cabinet Orizia Courtage : éditeur, hébergeur, immatriculation ORIAS, contrôle ACPR, médiation et traitement des données personnelles.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.orizia-courtage.fr/mentions-legales' },
};

const mentionsSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Mentions Légales — Orizia Courtage',
  url: 'https://www.orizia-courtage.fr/mentions-legales',
  description: 'Mentions légales et informations réglementaires du cabinet de courtage Orizia Courtage.',
  publisher: {
    '@type': 'Organization',
    '@id': 'https://www.orizia-courtage.fr/#organization',
    name: 'Orizia Courtage',
    legalName: COMPANY.denomination,
    url: 'https://www.orizia-courtage.fr',
    taxID: COMPANY.sirenCompact,
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'SIREN', value: COMPANY.sirenCompact },
      { '@type': 'PropertyValue', propertyID: 'RCS', value: COMPANY.rcs },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      postalCode: COMPANY.address.postalCode,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.region,
      addressCountry: COMPANY.address.country,
    },
  },
};

const h2 = { color: 'var(--orizia-primary, #3e7f68)', fontSize: '1.5rem', marginBottom: '16px' };

export default function MentionsLegalesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mentionsSchema) }} />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px 80px', color: 'var(--orizia-dark, #333)', lineHeight: '1.7' }}>

        <h1 style={{ color: 'var(--orizia-accent, #1a1a1a)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '40px', fontWeight: 900 }}>
          Mentions Légales
        </h1>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={h2}>1. Éditeur du site</h2>
          <p>
            Le présent site, accessible à l’adresse <strong>www.orizia-courtage.fr</strong>, est édité par :<br /><br />
            <strong>{COMPANY.denomination}</strong><br />
            Forme juridique : {COMPANY.legalForm}<br />
            Capital social : {COMPANY.capital}<br />
            Siège social : {COMPANY.addressInline}<br />
            SIREN : {COMPANY.siren}<br />
            {COMPANY.rcs}<br />
            Numéro de gestion : {COMPANY.gestion}<br />
            Identifiant européen (EUID) : {COMPANY.euid}<br />
            Adresse e-mail : <a href={`mailto:${COMPANY.email}`} style={{ color: 'var(--orizia-primary)' }}>{COMPANY.email}</a><br />
            Téléphone : {COMPANY.phone}
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={h2}>2. Directrice de la publication</h2>
          <p>
            <strong>{COMPANY.manager}</strong>, gérante.<br />
            Contact : <a href={`mailto:${COMPANY.email}`} style={{ color: 'var(--orizia-primary)' }}>{COMPANY.email}</a><br />
            Téléphone : {COMPANY.phone}
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={h2}>3. Hébergement du site</h2>
          <p>
            Le site est hébergé par :<br />
            <strong>{COMPANY.host.name}</strong><br />
            Adresse : {COMPANY.host.address}<br />
            Site web : <a href={COMPANY.host.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orizia-primary)' }}>{COMPANY.host.url}</a>
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={h2}>4. Informations réglementaires (ORIAS &amp; ACPR)</h2>
          <p>
            {COMPANY.denomination} exerce en tant que Courtier en assurance et Courtier en opérations de banque et en services de paiement (COBSP).<br /><br />
            Immatriculation au Registre Unique des Intermédiaires en Assurance, Banque et Finance (<strong>ORIAS</strong>) : numéro <strong>en cours d’attribution</strong> (vérifiable sur <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orizia-primary)' }}>www.orias.fr</a> dès sa publication).
          </p>
          <p style={{ marginTop: '16px' }}>
            L’activité est placée sous le contrôle de l’Autorité de Contrôle Prudentiel et de Résolution (<strong>ACPR</strong>) :<br />
            4 Place de Budapest, CS 92459, 75436 Paris Cedex 09.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={h2}>5. Traitement des données personnelles (RGPD)</h2>
          <p>
            Les informations recueillies via les formulaires (contact, simulation, prise de rendez-vous) sont enregistrées dans un fichier informatisé par {COMPANY.denomination} pour le traitement de votre demande de financement ou d’assurance.
          </p>
          <p style={{ marginTop: '16px' }}>
            Conformément à la loi « Informatique et Libertés » et au RGPD, vous disposez d’un droit d’accès, de rectification, de portabilité et d’effacement de vos données. Vous pouvez exercer ce droit en contactant : <a href={`mailto:${COMPANY.email}`} style={{ color: 'var(--orizia-primary)' }}>{COMPANY.email}</a>.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={h2}>6. Réclamation et Médiation</h2>
          <p>
            En cas de litige ou de réclamation, vous pouvez adresser votre demande par écrit au siège social ({COMPANY.addressInline}) ou par e-mail à <a href={`mailto:${COMPANY.email}`} style={{ color: 'var(--orizia-primary)' }}>{COMPANY.email}</a>.<br />
            Si aucune solution amiable n’est trouvée, vous avez la possibilité de saisir gratuitement le médiateur de la consommation compétent : <strong>médiateur en cours de désignation</strong> (ses coordonnées seront publiées ici dès sa désignation).
          </p>
        </section>

        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <Link href="/" style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: 'var(--orizia-light, #f4f4f4)', color: 'var(--orizia-dark)', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            <Icon name="arrow-left" /> Retour à l'accueil
          </Link>
        </div>

      </main>
    </>
  );
}
