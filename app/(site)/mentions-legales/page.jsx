import Icon from '@/components/Icon';
import { ROBOTS } from '@/lib/indexing.mjs';
import Link from 'next/link';
import { COMPANY, COMPANY_IDENTIFIERS } from '@/lib/company.mjs';
import { plainMetadata } from '@/lib/share.mjs';

export const metadata = {
  ...plainMetadata({
    path: '/mentions-legales',
    title: 'Mentions légales : ORIAS, ACPR, médiation | Orizia Courtage',
    description: 'Mentions légales du cabinet Orizia Courtage : éditeur, hébergeur, immatriculation ORIAS, contrôle ACPR, médiation et traitement des données personnelles.',
  }),
  robots: ROBOTS,
};

const mentionsSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Mentions légales — Orizia Courtage',
  url: 'https://www.orizia-courtage.fr/mentions-legales',
  description: 'Mentions légales et informations réglementaires du cabinet de courtage Orizia Courtage.',
  publisher: {
    '@type': 'Organization',
    '@id': 'https://www.orizia-courtage.fr/#organization',
    name: 'Orizia Courtage',
    legalName: COMPANY.denomination,
    url: 'https://www.orizia-courtage.fr',
    identifier: COMPANY_IDENTIFIERS,
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
          Mentions légales
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
            Adresse e-mail : <a href={`mailto:${COMPANY.email}`} style={{ color: '#3e7f68' }}>{COMPANY.email}</a><br />
            Téléphone : {COMPANY.phone}
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={h2}>2. Directrice de la publication</h2>
          <p>
            <strong>{COMPANY.manager}</strong>, gérante.<br />
            Contact : <a href={`mailto:${COMPANY.email}`} style={{ color: '#3e7f68' }}>{COMPANY.email}</a><br />
            Téléphone : {COMPANY.phone}
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={h2}>3. Hébergement du site</h2>
          <p>
            Le site est hébergé par :<br />
            <strong>{COMPANY.host.name}</strong><br />
            Adresse : {COMPANY.host.address}<br />
            Téléphone : {COMPANY.host.phone}<br />
            Contact : <a href={`mailto:${COMPANY.host.email}`} style={{ color: '#3e7f68' }}>{COMPANY.host.email}</a> ou <a href={COMPANY.host.contactUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3e7f68' }}>vercel.com/contact</a><br />
            Site web : <a href={COMPANY.host.url} target="_blank" rel="noopener noreferrer" style={{ color: '#3e7f68' }}>{COMPANY.host.url}</a>
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={h2}>4. Informations réglementaires (ORIAS &amp; ACPR)</h2>
          <p>
            {COMPANY.denomination} est immatriculée au Registre unique des intermédiaires en assurance, banque et finance (<strong>ORIAS</strong>) sous le numéro <strong>{COMPANY.oriasNumber}</strong>, en qualité de <strong>courtier en assurance (COA)</strong>. Immatriculation vérifiable sur <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#3e7f68' }}>www.orias.fr</a>.
          </p>
          {COMPANY.cobspPending && (
            <p style={{ marginTop: '16px' }}>
              Son inscription en qualité de <strong>courtier en opérations de banque et en services de paiement (COBSP)</strong> est en cours. Elle sera indiquée ici dès son enregistrement par l’ORIAS.
            </p>
          )}
          <p style={{ marginTop: '16px' }}>
            Association professionnelle : {COMPANY.denomination} est membre de <strong>{COMPANY.association.name}</strong>, {COMPANY.association.description}, {COMPANY.association.address} (<a href={COMPANY.association.url} target="_blank" rel="noopener noreferrer" style={{ color: '#3e7f68' }}>votrasso.org</a>), pour son activité de courtage en assurance.
          </p>
          <p style={{ marginTop: '16px' }}>
            L’activité est placée sous le contrôle de l’Autorité de contrôle prudentiel et de résolution (<strong>ACPR</strong>) :<br />
            4 place de Budapest, CS 92459, 75436 Paris Cedex 09.
          </p>
          <p style={{ marginTop: '16px' }}>
            Rémunération : {COMPANY.denomination} n’est liée par aucun contrat d’exclusivité avec une banque ou un assureur. Elle peut être rémunérée par des honoraires versés par le client et par des commissions versées par les établissements prêteurs et les compagnies d’assurance. La nature et le montant de la rémunération sont communiqués avant tout engagement. Voir le <Link href="/honoraires" style={{ color: '#3e7f68' }}>barème des honoraires</Link>.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={h2}>5. Données personnelles et cookies</h2>
          <p>
            {COMPANY.denomination} est responsable du traitement des données personnelles collectées sur ce site (formulaires de contact, de rappel, de simulation et de recommandation, prise de rendez-vous, espace client).
            Les finalités, bases légales, durées de conservation, destinataires et cookies sont détaillés dans la <Link href="/confidentialite" style={{ color: '#3e7f68' }}>politique de confidentialité</Link>.
          </p>
          <p style={{ marginTop: '16px' }}>
            Conformément au RGPD et à la loi « Informatique et Libertés », vous disposez des droits d’accès, de rectification, d’effacement, de limitation, de portabilité et d’opposition, ainsi que du droit de définir des directives sur le sort de vos données après votre décès.
            Pour les exercer : <a href={`mailto:${COMPANY.email}`} style={{ color: '#3e7f68' }}>{COMPANY.email}</a>. Vous pouvez également saisir la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#3e7f68' }}>www.cnil.fr</a>).
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={h2}>6. Réclamation et médiation</h2>
          <p>
            Toute réclamation peut être adressée par écrit au siège social ({COMPANY.addressInline}) ou par e-mail à <a href={`mailto:${COMPANY.email}`} style={{ color: '#3e7f68' }}>{COMPANY.email}</a>. Nous en accusons réception sous 10 jours ouvrables et y répondons dans un délai maximal de 2 mois à compter de sa réception.
          </p>
          <p style={{ marginTop: '16px' }}>
            Si la réponse ne vous satisfait pas, ou en l’absence de réponse dans ce délai, vous pouvez saisir gratuitement le médiateur de la consommation : <strong>{COMPANY.mediator.name}</strong>, {COMPANY.mediator.address} — <a href={COMPANY.mediator.url} target="_blank" rel="noopener noreferrer" style={{ color: '#3e7f68' }}>www.mediation-assurance.org</a>. Le médiateur doit être saisi dans un délai d’un an à compter de votre réclamation écrite.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={h2}>7. Propriété intellectuelle</h2>
          <p>
            Les textes, visuels, logos, simulateurs et la structure de ce site sont la propriété de {COMPANY.denomination} ou sont utilisés avec l’accord de leurs auteurs. Toute reproduction ou réutilisation, totale ou partielle, sans autorisation écrite préalable est interdite, à l’exception des courtes citations mentionnant leur source.
          </p>
          <p style={{ marginTop: '16px' }}>
            Les contenus du site (guides, actualités, lexique, simulateurs) sont fournis à titre d’information générale. Ils ne constituent ni un conseil personnalisé, ni une offre de contrat : seule une étude de votre situation permet de formuler une recommandation.
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
