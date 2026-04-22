import Link from 'next/link';

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
  description: 'Mentions légales et informations réglementaires du cabinet de courtage Orizia Courtage, immatriculé à l\'ORIAS et contrôlé par l\'ACPR.',
  publisher: {
    '@type': 'LocalBusiness',
    name: 'Orizia Courtage',
    url: 'https://www.orizia-courtage.fr',
  },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mentionsSchema) }}
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
        marginBottom: '40px',
        fontWeight: 900 
      }}>
        Mentions Légales
      </h1>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3a6f6c)', fontSize: '1.5rem', marginBottom: '16px' }}>
          1. Éditeur du site
        </h2>
        <p>
          Le présent site, accessible à l’URL <strong>orizia.fr</strong>, est édité par :<br /><br />
          <strong>Orizia Courtage</strong><br />
          Forme juridique : [Statut juridique, ex: SASU, SARL, Entreprise Individuelle]<br />
          Capital social : [Montant du capital] euros<br />
          Siège social : [Ton adresse complète, ex: 123 rue de la République, 59000 Lille]<br />
          SIRET : [Ton numéro SIRET à 14 chiffres]<br />
          RCS : Inscrite au Registre du Commerce et des Sociétés de [Ville du RCS]<br />
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3a6f6c)', fontSize: '1.5rem', marginBottom: '16px' }}>
          2. Directrice de la publication
        </h2>
        <p>
          <strong>Cindy Urbansky</strong><br />
          Contact : <a href="mailto:contact@orizia.fr" style={{ color: 'var(--orizia-primary)' }}>contact@orizia.fr</a><br />
          Téléphone : [Ton numéro de téléphone]
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3a6f6c)', fontSize: '1.5rem', marginBottom: '16px' }}>
          3. Hébergement du site
        </h2>
        <p>
          Le site est hébergé par :<br />
          <strong>[Nom de l'hébergeur, ex: Vercel Inc. / OVH / Hostinger]</strong><br />
          Adresse : [Adresse postale de l'hébergeur]<br />
          Site web : [Lien vers le site de l'hébergeur]
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3a6f6c)', fontSize: '1.5rem', marginBottom: '16px' }}>
          4. Informations réglementaires (ORIAS & ACPR)
        </h2>
        <p>
          Orizia Courtage exerce en tant que Courtier en assurance et Courtier en opérations de banque et en services de paiement (COBSP).<br /><br />
          Immatriculée au Registre Unique des Intermédiaires en Assurance, Banque et Finance (<strong>ORIAS</strong>) sous le numéro : <strong>[Ton numéro ORIAS]</strong> (vérifiable sur <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orizia-primary)' }}>www.orias.fr</a>).
        </p>
        <p style={{ marginTop: '16px' }}>
          L'activité est placée sous le contrôle de l'Autorité de Contrôle Prudentiel et de Résolution (<strong>ACPR</strong>) :<br />
          4 Place de Budapest, CS 92459, 75436 Paris Cedex 09.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3a6f6c)', fontSize: '1.5rem', marginBottom: '16px' }}>
          5. Traitement des données personnelles (RGPD)
        </h2>
        <p>
          Les informations recueillies via les formulaires (contact, simulation, prise de rendez-vous) sont enregistrées dans un fichier informatisé par Orizia Courtage pour le traitement de votre demande de financement ou d'assurance.
        </p>
        <p style={{ marginTop: '16px' }}>
          Conformément à la loi "Informatique et Libertés" et au RGPD, vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données. Vous pouvez exercer ce droit en contactant : <strong>[Ton adresse email]</strong>.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--orizia-primary, #3a6f6c)', fontSize: '1.5rem', marginBottom: '16px' }}>
          6. Réclamation et Médiation
        </h2>
        <p>
          En cas de litige ou de réclamation, vous pouvez adresser votre demande par écrit à l'adresse du siège social ou par e-mail.<br />
          Si aucune solution amiable n'est trouvée, vous avez la possibilité de saisir gratuitement le médiateur de la consommation compétent :<br />
          <strong>[Nom du médiateur auquel tu es affiliée obligatoirement, ex: CNPM Médiation Consommation ou Devigny Médiation]</strong><br />
          Adresse web du médiateur : [Lien du médiateur]
        </p>
      </section>

      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <Link href="/" style={{ 
          display: 'inline-block', 
          padding: '12px 24px', 
          backgroundColor: 'var(--orizia-light, #f4f4f4)', 
          color: 'var(--orizia-dark)', 
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          ← Retour à l'accueil
        </Link>
      </div>

    </main>
    </>
  );
}