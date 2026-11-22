import Icon from '@/components/Icon';
import Link from 'next/link';
import { ROBOTS } from '@/lib/indexing.mjs';
import { COMPANY } from '@/lib/company.mjs';
import { plainMetadata } from '@/lib/share.mjs';

export const metadata = {
  ...plainMetadata({
    path: '/confidentialite',
    title: 'Politique de confidentialité et cookies | Orizia Courtage',
    description: 'Comment Orizia Courtage collecte, utilise, conserve et protège vos données personnelles : finalités, bases légales, durées, destinataires, droits RGPD, cookies.',
  }),
  robots: ROBOTS,
};

// Date de la dernière mise à jour de cette politique : à changer à chaque modification.
const UPDATED = '22 novembre 2026';

const confidentialiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Politique de confidentialité — Orizia Courtage',
  url: 'https://www.orizia-courtage.fr/confidentialite',
  description: 'Politique de protection des données personnelles du cabinet de courtage Orizia Courtage (RGPD).',
  dateModified: '2026-11-22',
  publisher: { '@id': 'https://www.orizia-courtage.fr/#organization', name: 'Orizia Courtage' },
};

// Finalités, bases légales (art. 6 et 9 du RGPD) et durées de conservation : à tenir à jour avec le registre des traitements.
const TRAITEMENTS = [
  ['Répondre à une demande de contact, de rappel ou de simulation', 'Mesures précontractuelles prises à votre demande (art. 6.1.b)', '3 ans après le dernier contact si aucun contrat n’est conclu'],
  ['Étudier votre projet, monter votre dossier et le présenter aux banques et assureurs que vous nous chargez de consulter', 'Exécution du mandat de courtage (art. 6.1.b)', '5 ans après la fin de la relation'],
  ['Recueillir les informations de santé nécessaires à une assurance emprunteur', 'Votre consentement explicite (art. 9.2.a), donné au moment de la transmission', 'Avec le dossier, dans les mêmes durées ; transmises uniquement à l’assureur concerné'],
  ['Premier tri automatique des demandes de regroupement de crédits (voir section 4)', 'Mesures précontractuelles prises à votre demande (art. 6.1.b)', '3 ans après le dernier contact'],
  ['Respecter nos obligations légales : devoir de conseil, lutte contre le blanchiment, traitement des réclamations, comptabilité', 'Obligation légale (art. 6.1.c)', '5 ans après la fin de la relation (10 ans pour les pièces comptables)'],
  ['Vous adresser des offres par téléphone, e-mail ou SMS', 'Votre consentement (art. 6.1.a) ; pour un client, l’e-mail sur des services analogues relève de l’intérêt légitime (art. L. 34-5 du Code des postes et communications électroniques)', 'Jusqu’au retrait de votre accord, et au plus 3 ans après le dernier contact'],
  ['Gérer le programme de recommandation (parrain et proche recommandé)', 'Intérêt légitime du parrain et du cabinet (art. 6.1.f) ; accord du proche avant tout appel', 'Coordonnées du proche effacées sous 30 jours s’il ne souhaite pas être contacté'],
  ['Espace client et application mobile Orizia (iPhone, Android) : suivi du dossier, dépôt et numérisation de documents, messagerie et pièces jointes, notifications', 'Exécution du mandat (art. 6.1.b) ; notifications et carte de portefeuille : votre consentement', 'Messages et pièces jointes de la messagerie : 30 jours ; compte : durée du dossier, supprimable à tout moment depuis l’application'],
  ['Acceptation des conditions d’utilisation de l’espace client : date d’acceptation et version du texte accepté', 'Intérêt légitime à pouvoir établir que vous les avez acceptées (art. 6.1.f)', 'Conservées avec votre compte, jusqu’à sa suppression'],
  ['Signature électronique des documents du cabinet (mandat, lettre de mission…) et conservation de la preuve de votre signature (voir section 5)', 'Exécution du mandat (art. 6.1.b) ; intérêt légitime à pouvoir prouver votre accord (art. 6.1.f)', 'Document signé et preuve de signature : conservés avec le dossier, 5 ans après la fin de la relation'],
  ['Protéger le site contre les abus et les fausses demandes (adresse IP, type d’appareil)', 'Intérêt légitime (art. 6.1.f)', '7 jours'],
  ['Mesurer l’audience du site, sans cookie', 'Intérêt légitime (art. 6.1.f)', 'Statistiques globales, sans identifiant conservé'],
];

// Sous-traitants (article 28 du RGPD) : à tenir à jour avec le registre des traitements.
const SOUS_TRAITANTS = [
  ['Vercel Inc.', 'Hébergement du site et de l’espace client ; mesure d’audience sans cookie', 'Traitements exécutés à Paris (Union européenne) ; réseau de diffusion mondial · Data Privacy Framework, clauses contractuelles types'],
  ['MongoDB Inc. (Atlas)', 'Base de données des dossiers et des fiches clients', 'Union européenne (Paris)'],
  ['OVHcloud', 'Messagerie du cabinet et envoi des e-mails internes de suivi des demandes', 'France'],
  ['Serveur d’automatisation (n8n)', 'Enregistrement des demandes du site et envoi des e-mails de suivi', 'France, administré par un prestataire technique lié par un engagement de confidentialité ; flux chiffré relayé par Tailscale Inc. (États-Unis, Data Privacy Framework)'],
  ['Cloudflare Inc. (R2, Turnstile)', 'Stockage chiffré des documents que vous déposez ; protection anti-robot des formulaires', 'Documents : Union européenne ; anti-robot : réseau mondial · Data Privacy Framework'],
  ['Resend Inc.', 'Envoi des e-mails (confirmations, rendez-vous, demandes de documents, codes de signature et exemplaire des documents signés)', 'États-Unis · Data Privacy Framework, clauses contractuelles types'],
  ['Cal.com Inc.', 'Prise et gestion des rendez-vous', 'États-Unis / Union européenne · clauses contractuelles types'],
  ['Supabase Inc.', 'Réglages du site, articles et protection contre les envois abusifs (aucune donnée de dossier)', 'Royaume-Uni (Londres) · décision d’adéquation de la Commission européenne'],
  ['Google LLC / Apple Inc.', 'Distribution de l’application (Google Play, App Store), acheminement des notifications vers votre téléphone (identifiant technique de l’appareil, sans contenu de dossier) et carte de recommandation dans le portefeuille du téléphone (uniquement si vous l’ajoutez)', 'États-Unis · Data Privacy Framework'],
];

// Cookies et stockage local réellement utilisés (relevé du 20/11/2026) : à tenir à jour à chaque nouvel outil.
const TRACEURS = [
  ['Cookie « __cf_bm » (Cal.com, via Cloudflare)', 'Déposé par l’agenda de prise de rendez-vous Cal.com, sur la page Contact ou quand vous ouvrez l’agenda. Il sert uniquement à distinguer les visiteurs humains des robots (sécurité). Cal.com transmet aussi ses rapports d’erreurs techniques à son prestataire Sentry, sans cookie.', '30 minutes'],
  ['Cloudflare Turnstile', 'Vérification anti-robot des formulaires (contact, rappel, simulation, recommandation). Elle analyse des signaux techniques de votre navigateur au moment de l’envoi, sans cookie publicitaire ni suivi.', 'Le temps de la vérification'],
  ['Cookie de session de l’espace client (« orizia_espace »)', 'Déposé quand vous vous connectez à l’espace client ou à l’application. Il vous garde connecté(e) et protège l’accès à votre dossier ; il ne sert à aucun suivi.', '400 jours au plus, renouvelé à chaque visite ; supprimé à la déconnexion'],
  ['Réglages de l’espace client et de l’application (stockage local)', 'Gardés sur votre appareil uniquement : notifications activées, verrouillage de l’application activé, visite de découverte déjà vue.', 'Jusqu’à la désinstallation de l’application ou l’effacement des données du navigateur'],
  ['Brouillon du formulaire de simulation', 'Garde vos réponses en mémoire dans votre navigateur (stockage de session) si vous rechargez la page en cours de saisie. Rien n’est envoyé tant que vous ne validez pas.', 'Effacé à l’envoi ou à la fermeture de l’onglet'],
];

const h2 = { color: 'var(--orizia-primary, #3e7f68)', fontSize: '1.5rem', marginBottom: '16px' };
const section = { marginBottom: '40px' };
const link = { color: '#3e7f68' };
const th = (pos) => ({ padding: pos === 0 ? '8px 10px 8px 0' : pos === 2 ? '8px 0 8px 10px' : '8px 10px' });

function Table({ head, rows }) {
  return (
    <div style={{ overflowX: 'auto', marginTop: '12px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #e3e7e4' }}>
            {head.map((label, i) => <th key={label} style={th(i)}>{label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} style={{ borderBottom: '1px solid #eef1ef', verticalAlign: 'top' }}>
              {row.map((cell, i) => <td key={i} style={{ ...th(i), fontWeight: i === 0 ? 600 : 400 }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ConfidentialitePage() {
  const mail = <a href={`mailto:${COMPANY.email}`} style={link}>{COMPANY.email}</a>;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(confidentialiteSchema) }} />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px 80px', color: 'var(--orizia-dark, #333)', lineHeight: '1.7' }}>
        <h1 style={{ color: 'var(--orizia-accent, #1a1a1a)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '12px', fontWeight: 900 }}>
          Politique de confidentialité
        </h1>
        <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '24px' }}>Dernière mise à jour : {UPDATED}</p>
        <p style={{ fontSize: '1.05rem', marginBottom: '40px', opacity: 0.85 }}>
          En tant que courtier, je traite des informations personnelles et parfois sensibles (situation financière, santé, projets de vie).
          Cette page explique, conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés,
          quelles données sont collectées, pourquoi, combien de temps elles sont gardées, à qui elles sont transmises et comment exercer vos droits.
        </p>

        <section style={section}>
          <h2 style={h2}>1. Responsable du traitement</h2>
          <p>
            <strong>{COMPANY.denomination}</strong>, {COMPANY.legalForm} au capital de {COMPANY.capital}, {COMPANY.rcs}, dont le siège est au {COMPANY.addressInline},
            représentée par {COMPANY.manager}, gérante. Contact pour toute question sur vos données : {mail} ou par courrier au siège.
          </p>
          <p style={{ marginTop: '12px' }}>
            Le cabinet n’a pas désigné de délégué à la protection des données, cette désignation n’étant pas obligatoire pour son activité : la gérante répond directement à vos demandes.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>2. Les données collectées</h2>
          <ul style={{ marginLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Identité et coordonnées :</strong> nom, prénom, date de naissance, adresse, téléphone, e-mail, situation familiale.</li>
            <li style={{ marginBottom: '8px' }}><strong>Situation professionnelle et financière :</strong> profession, revenus, charges, patrimoine, crédits en cours, avis d’imposition, et votre déclaration d’une éventuelle inscription au fichier de la Banque de France (FICP ou FCC).</li>
            <li style={{ marginBottom: '8px' }}><strong>Données de santé :</strong> uniquement pour une assurance emprunteur, lorsque l’assureur l’exige, avec votre consentement explicite. Elles sont traitées avec une confidentialité renforcée et transmises à l’assureur seul.</li>
            <li style={{ marginBottom: '8px' }}><strong>Documents</strong> que vous déposez (justificatifs, offres de prêt, contrats), vos <strong>messages</strong> et leurs pièces jointes dans l’espace client, et votre <strong>signature</strong> lorsque vous signez un document en ligne.</li>
            <li style={{ marginBottom: '8px' }}><strong>Données techniques :</strong> adresse IP et type d’appareil et de navigateur lors de l’envoi d’un formulaire ; identifiants et mot de passe chiffré de l’espace client ; identifiant technique de votre téléphone si vous activez les notifications.</li>
            <li style={{ marginBottom: '8px' }}><strong>Données de tiers :</strong> co-emprunteur que vous déclarez, ou proche que vous recommandez. Pensez à les informer : nous leur présentons cette politique dès le premier contact.</li>
          </ul>
          <p style={{ marginTop: '10px' }}>Les informations marquées comme obligatoires dans les formulaires sont nécessaires pour étudier votre demande ; sans elles, nous ne pouvons pas y donner suite.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>3. Pourquoi, sur quelle base et combien de temps</h2>
          <p>Chaque traitement repose sur une base légale prévue par le RGPD. Les données sont ensuite supprimées automatiquement à l’issue de la durée indiquée.</p>
          <Table head={['Finalité', 'Base légale', 'Durée de conservation']} rows={TRAITEMENTS} />
          <p style={{ marginTop: '12px' }}><strong>Vos données ne sont jamais vendues</strong>, ni transmises à des tiers pour leur propre prospection.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>4. Premier tri automatique des demandes de regroupement de crédits</h2>
          <p>
            Lorsque vous remplissez le formulaire de regroupement de crédits, vos réponses font l’objet d’un premier tri automatique, sans intervention humaine immédiate.
            Les critères utilisés sont votre déclaration d’une inscription au fichier de la Banque de France, votre statut professionnel (salarié, indépendant, chef d’entreprise),
            votre statut de logement et l’équilibre entre vos revenus et vos charges, au regard des critères des établissements prêteurs avec lesquels je travaille.
          </p>
          <p style={{ marginTop: '12px' }}>
            Ce tri peut conduire à l’envoi automatique d’une réponse indiquant que votre demande ne peut pas être suivie à ce stade. Conformément à l’article 22 du RGPD,
            vous pouvez à tout moment <strong>demander que votre dossier soit réexaminé personnellement</strong> par la conseillère, faire valoir votre point de vue et contester cette réponse,
            simplement en répondant à l’e-mail reçu ou en écrivant à {mail}.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>5. Application mobile et signature électronique</h2>
          <p>
            L’application <strong>Orizia</strong> (iPhone et Android) donne accès à votre espace client. Elle est réservée aux clients du cabinet : votre compte est créé par votre conseillère.
            Elle ne contient <strong>aucune publicité</strong>, ne vous suit pas d’une application à l’autre et n’accède ni à votre position, ni à vos contacts.
          </p>
          <p style={{ marginTop: '12px' }}>Elle ne demande une autorisation que pour la fonction que vous utilisez :</p>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Appareil photo et photos :</strong> pour photographier ou numériser un justificatif, ou en choisir un dans vos photos. Seuls les fichiers que vous envoyez nous sont transmis.</li>
            <li style={{ marginBottom: '8px' }}><strong>Face ID, Touch ID ou empreinte :</strong> pour vous connecter ou verrouiller l’application. La reconnaissance est faite par votre téléphone : nous ne recevons aucune donnée biométrique.</li>
            <li style={{ marginBottom: '8px' }}><strong>Notifications :</strong> pour vous prévenir d’un message ou de l’avancement d’un dossier. Vous choisissez ce que vous recevez et pouvez les désactiver à tout moment.</li>
          </ul>
          <p style={{ marginTop: '12px' }}>
            <strong>Suppression du compte :</strong> vous pouvez supprimer votre compte depuis l’application (Compte, puis « Supprimer mon compte »). Votre accès est supprimé immédiatement ; vos dossiers et leurs documents restent conservés pendant les durées indiquées à la section 3, puis sont effacés.
          </p>
          <p style={{ marginTop: '12px' }}>
            <strong>Signature électronique :</strong> lorsque le cabinet vous envoie un document à signer, vous pouvez le signer dans votre espace client. Il s’agit d’une signature électronique simple au sens du règlement européen eIDAS (n° 910/2014).
            Après lecture du document, vous donnez votre accord, tracez votre signature et confirmez avec un code à usage unique envoyé à votre adresse e-mail. Selon le document, la date du jour, la ville que vous indiquez et des informations de votre fiche (nom, prénom, date de naissance, téléphone, e-mail) y sont inscrites.
          </p>
          <p style={{ marginTop: '12px' }}>
            <strong>Preuve de signature :</strong> pour pouvoir établir que vous avez bien signé, nous conservons le document signé et un certificat de signature : votre identité et votre identifiant, le texte de votre accord, la date et l’heure de la signature et de la vérification du code, l’adresse IP et le type d’appareil utilisés, l’empreinte numérique du document d’origine et du document signé, et l’image de votre signature.
            Le document signé est scellé numériquement, de sorte que toute modification ultérieure est détectable. Un exemplaire vous est envoyé par e-mail et reste disponible dans votre espace client.
            Le document signé et sa preuve sont conservés avec votre dossier, <strong>5 ans après la fin de la relation</strong>, puis supprimés. Vous pouvez toujours préférer signer à la main et nous transmettre le document signé.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>6. Qui reçoit vos données</h2>
          <ul style={{ marginLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}><strong>La gérante du cabinet</strong>, seule personne habilitée à consulter les dossiers.</li>
            <li style={{ marginBottom: '8px' }}><strong>Les banques, organismes de crédit et compagnies d’assurance</strong> que vous nous chargez de consulter, uniquement pour obtenir une proposition pour votre projet et avec votre accord.</li>
            <li style={{ marginBottom: '8px' }}><strong>Les autorités</strong> qui peuvent l’exiger dans le cadre de la loi (ACPR, Tracfin, administration fiscale, justice).</li>
            <li style={{ marginBottom: '8px' }}><strong>Des prestataires techniques (sous-traitants)</strong>, qui agissent uniquement sur nos instructions, sont liés par un engagement de confidentialité et de sécurité (article 28 du RGPD) et ne peuvent pas utiliser vos données pour leur propre compte :</li>
          </ul>
          <Table head={['Prestataire', 'Rôle', 'Localisation et garanties']} rows={SOUS_TRAITANTS} />
          <p style={{ marginTop: '12px' }}>
            <strong>Transferts hors de l’Union européenne :</strong> certains prestataires sont des sociétés américaines et l’un d’eux héberge des données au Royaume-Uni, pays reconnu par la Commission européenne comme offrant une protection adéquate. Les transferts éventuels vers les États-Unis sont encadrés par le cadre de protection des données UE–États-Unis (<em>Data Privacy Framework</em>), auquel ces sociétés adhèrent, et par les clauses contractuelles types de la Commission européenne. Vous pouvez en obtenir le détail sur simple demande.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>7. Sécurité</h2>
          <p>
            Les échanges avec le site sont chiffrés (HTTPS). Les documents déposés sont stockés chiffrés, l’accès aux dossiers est protégé par mot de passe et réservé à la gérante,
            les mots de passe de l’espace client sont enregistrés sous forme chiffrée et les formulaires sont protégés contre les envois automatisés.
            En cas de violation de données présentant un risque pour vous, la CNIL et, si nécessaire, les personnes concernées sont informées dans les délais prévus par le RGPD.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>8. Démarchage et prospection</h2>
          <p>
            Aucun appel commercial ne vous est passé sans votre accord préalable : soit vous avez demandé à être rappelé(e), soit vous avez accepté d’être contacté(e) dans un formulaire.
            Cet accord est facultatif et peut être retiré à tout moment, par simple e-mail ou en le disant lors d’un appel. Chaque e-mail commercial comporte un lien de désinscription.
            Si vous êtes déjà client, des informations sur des services comparables à ceux dont vous bénéficiez peuvent vous être envoyées par e-mail, sauf opposition de votre part.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>9. Vos droits</h2>
          <p>Vous disposez des droits suivants sur vos données :</p>
          <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li style={{ marginBottom: '6px' }}><strong>accès</strong> : savoir quelles données sont détenues et en obtenir une copie ;</li>
            <li style={{ marginBottom: '6px' }}><strong>rectification</strong> des données inexactes ou incomplètes ;</li>
            <li style={{ marginBottom: '6px' }}><strong>effacement</strong>, sous réserve des durées de conservation imposées par la loi ;</li>
            <li style={{ marginBottom: '6px' }}><strong>limitation</strong> du traitement, par exemple le temps de vérifier une contestation ;</li>
            <li style={{ marginBottom: '6px' }}><strong>portabilité</strong> : recevoir les données que vous avez fournies dans un format lisible par machine ;</li>
            <li style={{ marginBottom: '6px' }}><strong>opposition</strong> au traitement fondé sur l’intérêt légitime, et à tout moment, sans motif, à la prospection ;</li>
            <li style={{ marginBottom: '6px' }}><strong>retrait de votre consentement</strong>, sans remettre en cause les traitements déjà réalisés ;</li>
            <li style={{ marginBottom: '6px' }}><strong>réexamen humain</strong> d’une réponse issue du tri automatique (section 4) ;</li>
            <li style={{ marginBottom: '6px' }}><strong>directives</strong> sur le sort de vos données après votre décès.</li>
          </ul>
          <p style={{ marginTop: '16px' }}>
            Pour les exercer, écrivez à {mail} ou par courrier au {COMPANY.addressInline}. Une réponse vous est apportée dans un délai d’un mois,
            prolongeable de deux mois pour une demande complexe (vous en seriez alors informé(e)). Une pièce d’identité peut vous être demandée en cas de doute raisonnable sur votre identité.
          </p>
          <p style={{ marginTop: '16px' }}>
            Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL :
            3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou en ligne sur <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" style={link}>cnil.fr</a>.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>10. Cookies et traceurs</h2>
          <p>
            Ce site, l’espace client et l’application ne déposent <strong>aucun cookie publicitaire, aucun cookie de réseau social et aucun cookie de mesure d’audience</strong>. C’est pourquoi aucun bandeau ne vous demande votre accord :
            les seuls éléments utilisés ci-dessous sont nécessaires au service que vous demandez ou à la sécurité du site, et sont dispensés de consentement (article 82 de la loi Informatique et Libertés, lignes directrices de la CNIL).
          </p>
          <Table head={['Élément', 'Quand et pourquoi', 'Durée']} rows={TRACEURS} />
          <p style={{ marginTop: '12px' }}>
            <strong>Mesure d’audience :</strong> Vercel Web Analytics et Speed Insights fonctionnent <strong>sans cookie</strong> et ne conservent aucun identifiant d’un jour à l’autre.
            Ils fournissent uniquement des statistiques globales (pages vues, provenance, temps de chargement), sans permettre de vous suivre d’un site à l’autre. Aucune mesure d’audience n’est faite dans l’espace client ni dans l’application.
          </p>
          <p style={{ marginTop: '12px' }}>
            Vous pouvez à tout moment supprimer ou bloquer les cookies depuis les réglages de votre navigateur. Bloquer le cookie de Cal.com peut empêcher l’agenda en ligne de s’afficher :
            vous pouvez alors nous joindre par téléphone ou par e-mail.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>11. Modifications</h2>
          <p>
            Cette politique peut évoluer, notamment lors de l’ajout d’un outil ou d’un prestataire. La date de dernière mise à jour figure en haut de page.
            Voir aussi les <Link href="/mentions-legales" style={link}>mentions légales</Link>.
          </p>
        </section>

        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <Link href="/" style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: 'var(--orizia-primary, #3e7f68)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            <Icon name="arrow-left" /> Retour à l’accueil
          </Link>
        </div>
      </main>
    </>
  );
}
