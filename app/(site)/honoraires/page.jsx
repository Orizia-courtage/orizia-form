import Icon from '@/components/Icon';
import Link from 'next/link';
import { ROBOTS } from '@/lib/indexing.mjs';
import { COMPANY, CREDIT_STATUS } from '@/lib/company.mjs';
import { plainMetadata } from '@/lib/share.mjs';

export const metadata = {
  ...plainMetadata({
    path: '/honoraires',
    title: 'Barème des honoraires | Orizia Courtage',
    description: 'Barème des honoraires et modes de rémunération d’Orizia Courtage : crédit immobilier, regroupement de crédits, assurance et placements.',
  }),
  robots: ROBOTS,
};

const h2 = { color: 'var(--orizia-primary, #3e7f68)', fontSize: '1.4rem', marginBottom: '12px' };
const section = { marginBottom: '36px' };

const BAREME = [
  {
    titre: '1. Crédit immobilier',
    texte: 'Honoraires de courtage calculés selon un pourcentage du montant du financement, avec un minimum forfaitaire.',
  },
  {
    titre: '2. Regroupement de crédits',
    texte: 'Honoraires calculés selon un pourcentage du montant total de l’opération, tenant compte de la nature du regroupement et des garanties mises en place.',
  },
  {
    titre: '3. Assurance',
    texte: 'Accompagnement et intermédiation en assurance, notamment en assurance emprunteur. Les éventuels honoraires sont communiqués préalablement au client. Les modalités de rémunération par les compagnies d’assurance sont également précisées, conformément à la réglementation.',
  },
  {
    titre: '4. Placements financiers',
    texte: 'Accompagnement et conseil dans la recherche de solutions d’investissement adaptées aux objectifs et à la situation du client. Les éventuels honoraires de conseil sont définis en fonction de la prestation réalisée. Les commissions et autres rémunérations perçues de partenaires sont portées à la connaissance du client, conformément aux obligations réglementaires.',
  },
];

export default function HonorairesPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px 80px', color: 'var(--orizia-dark, #333)', lineHeight: '1.7' }}>
      <h1 style={{ color: 'var(--orizia-accent, #1a1a1a)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '16px', fontWeight: 900 }}>
        Barème des honoraires
      </h1>
      <p style={{ marginBottom: '36px' }}>
        Chez {COMPANY.legalName}, je privilégie la transparence et la clarté dans la présentation de mes conditions tarifaires.
        Mes honoraires sont définis en fonction de la nature de la prestation, du montant de l’opération et de la complexité de votre situation.
      </p>

      <section style={section}>
        <h2 style={h2}>Comment je suis rémunérée</h2>
        <p>
          {COMPANY.legalName} peut être rémunérée de deux façons, éventuellement cumulées pour une même opération :
        </p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li style={{ marginBottom: '6px' }}><strong>par des honoraires</strong> versés par vous, client, selon le barème ci-dessous ;</li>
          <li style={{ marginBottom: '6px' }}><strong>par des commissions</strong> versées par les banques, organismes de crédit et compagnies d’assurance partenaires.</li>
        </ul>
        <p style={{ marginTop: '10px' }}>
          La nature et le montant de chaque rémunération vous sont communiqués avant toute intervention.
        </p>
      </section>

      {BAREME.map((b) => (
        <section key={b.titre} style={section}>
          <h2 style={h2}>{b.titre}</h2>
          <p>{b.texte}</p>
        </section>
      ))}

      <section style={section}>
        <h2 style={h2}>Conditions générales</h2>
        <p>
          Le montant des honoraires et les modalités de rémunération sont communiqués au client avant toute intervention et formalisés dans les documents contractuels appropriés.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong>Aucun versement, de quelque nature que ce soit, ne peut être exigé d’un particulier avant l’obtention d’un ou plusieurs prêts d’argent.</strong>{' '}
          Aucun honoraire lié à l’obtention d’un crédit n’est exigible avant le versement effectif des fonds, conformément à l’article L. 519-6 du Code monétaire et financier.
        </p>
      </section>

      <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
        {CREDIT_STATUS} <Link href="/mentions-legales" style={{ color: '#3e7f68' }}>Mentions légales</Link>.
      </p>

      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <Link href="/contact" style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: 'var(--orizia-primary, #3e7f68)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          Poser une question <Icon name="arrow-right" />
        </Link>
      </div>
    </main>
  );
}
