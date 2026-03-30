import Link from 'next/link';
import OriziaForm from '@/components/OriziaForm'; // ← adapter le chemin selon votre structure

export const metadata = {
  title: 'Regroupement de Crédits 2026 : Réduisez vos mensualités | Orizia Courtage',
  description:
    'Réunissez tous vos crédits en un seul — immobilier, conso, LOA — et réduisez vos mensualités jusqu\'à 60%. Étude gratuite & sans engagement. Réponse sous 24h par Orizia Courtage.',
  keywords: [
    'regroupement de crédits 2026',
    'rachat de crédits',
    'réduire mensualités',
    'regroupement crédit immobilier consommation',
    'courtier rachat de crédits',
    'simulation regroupement crédits',
  ],
  alternates: { canonical: 'https://orizia.fr/financer/regroupement-credits' },
  openGraph: {
    title: 'Regroupement de Crédits : −60% sur vos mensualités | Orizia Courtage',
    description: 'Un seul crédit, une seule mensualité réduite. Orizia étudie votre dossier gratuitement et vous propose la solution adaptée à votre profil.',
    url: 'https://orizia.fr/financer/regroupement-credits',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu\'est-ce que le regroupement de crédits ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le regroupement de crédits (ou rachat de crédits) consiste à réunir plusieurs emprunts en cours — crédit immobilier, crédits à la consommation, LOA, dettes — en un seul crédit unique avec une mensualité réduite et un taux négocié. L\'objectif est de diminuer votre reste à vivre mensuel et de simplifier votre gestion budgétaire.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle économie mensuelle peut-on espérer ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La réduction de mensualité varie selon votre profil, mais elle est en moyenne de 30 à 60% sur l\'ensemble de vos remboursements. Par exemple, un foyer avec 1 800€/mois de mensualités cumulées peut descendre à 900–1 100€/mois après regroupement. Cette baisse est obtenue en allongeant la durée de remboursement — ce qui augmente le coût total du crédit, mais libère immédiatement du pouvoir d\'achat mensuel.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qui peut bénéficier d\'un regroupement de crédits ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Toute personne avec au moins 2 crédits en cours peut y prétendre : salarié en CDI, fonctionnaire, retraité. Les dossiers TNS (travailleurs non-salariés) sont étudiés au cas par cas. En revanche, être fiché FICP ou FCC bloque l\'accès au regroupement dans les conditions bancaires standard — Orizia vous en informe dès la première analyse.',
      },
    },
    {
      '@type': 'Question',
      name: 'Le regroupement de crédits coûte-t-il plus cher au total ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, en règle générale, le coût total du crédit augmente du fait de l\'allongement de la durée. C\'est le compromis fondamental : vous payez moins chaque mois, mais sur une période plus longue. Orizia vous présente une simulation complète avec coût total, mensualité avant/après et gain de reste à vivre — pour que vous décidiez en toute connaissance de cause.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps dure une étude de dossier ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Après soumission du formulaire, Orizia analyse votre profil sous 24h ouvrées et vous contacte pour présenter les solutions disponibles. La procédure complète (de l\'étude à la mise en place du nouveau crédit) prend généralement 4 à 8 semaines selon l\'établissement prêteur retenu.',
      },
    },
    {
      '@type': 'Question',
      name: 'L\'étude est-elle vraiment gratuite et sans engagement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, l\'étude de dossier par Orizia Courtage est 100% gratuite et sans engagement. Aucune somme ne vous sera demandée avant la mise en place effective du regroupement, conformément à la réglementation Lagarde sur le crédit à la consommation. Les honoraires d\'intermédiation sont perçus auprès de l\'établissement de crédit partenaire.',
      },
    },
  ],
};

const CHIFFRES = [
  { value: '−60%',    label: 'de réduction de mensualités possible',   icon: '📉' },
  { value: '24h',     label: 'pour une première réponse de principe',   icon: '⚡' },
  { value: '100%',    label: 'gratuit & sans engagement',               icon: '🤝' },
  { value: '13 étapes', label: 'pour une analyse complète de votre profil', icon: '🔍' },
];

const CREDITS_REGROUPABLES = [
  { icon: '🏡', label: 'Crédit immobilier',          desc: 'Résidence principale, secondaire ou investissement locatif' },
  { icon: '🛒', label: 'Crédits à la consommation',  desc: 'Prêts personnels, crédits renouvelables, travaux' },
  { icon: '🚗', label: 'LOA / LLD',                  desc: 'Crédit-bail auto, rachat de contrat de location' },
  { icon: '💳', label: 'Dettes diverses',             desc: 'Paiements en plusieurs fois, découverts chroniques' },
  { icon: '🏢', label: 'Crédits professionnels',     desc: 'Sous conditions selon le profil et le montant' },
  { icon: '💰', label: 'Trésorerie complémentaire',   desc: 'Vous pouvez inclure une enveloppe de liquidités dans le nouveau crédit' },
];

const PROFILS = [
  {
    icon: '👨‍👩‍👧',
    title: 'Famille en CDI',
    desc: 'Revenus stables, multiple crédits accumulés après des achats successifs (voiture, travaux, mobilier).',
    resultat: 'Profil le plus favorable — réduction de 40 à 60% de la mensualité.',
    color: '#16a34a',
  },
  {
    icon: '👴',
    title: 'Retraité propriétaire',
    desc: 'Revenu fixe, patrimoine immobilier, souhait de libérer du reste à vivre.',
    resultat: 'Rachat adossé à l\'immobilier — durée adaptée à l\'âge.',
    color: 'var(--orizia-primary)',
  },
  {
    icon: '💼',
    title: 'Fonctionnaire',
    desc: 'Emploi garanti, solvabilité reconnue par les banques, dossier prioritaire.',
    resultat: 'Conditions négociées préférentielles — taux parmi les plus bas.',
    color: '#d97706',
  },
  {
    icon: '🔧',
    title: 'TNS / Indépendant',
    desc: 'Revenus variables, bilans à présenter, étude spécifique requise.',
    resultat: 'Étude au cas par cas — solutions partielles parfois disponibles.',
    color: '#7c3aed',
  },
];

const COMMENT_CA_MARCHE = [
  {
    n: '01',
    icon: '📋',
    title: 'Vous complétez le formulaire',
    text: '13 questions sur votre situation financière actuelle — revenus, charges, crédits en cours. Aucun document à envoyer à ce stade. Comptez 5 à 8 minutes.',
  },
  {
    n: '02',
    icon: '🔍',
    title: 'Orizia analyse votre profil',
    text: 'Sous 24h ouvrées, Cindy étudie votre dossier, calcule votre taux d\'endettement, votre MAF (Montant À Financer) et détermine le segment le plus adapté.',
  },
  {
    n: '03',
    icon: '📞',
    title: 'Vous recevez une proposition',
    text: 'Appel ou visioconférence pour vous présenter la simulation : mensualité avant/après, durée, taux, coût total. Vous décidez en toute transparence.',
  },
  {
    n: '04',
    icon: '✅',
    title: 'Montage et mise en place',
    text: 'Si vous acceptez, Orizia monte le dossier, le transmet à l\'établissement prêteur et suit la procédure jusqu\'au déblocage des fonds. Délai : 4 à 8 semaines.',
  },
];

const ALERTES = [
  {
    icon: '✅',
    label: 'Idéal si votre taux d\'endettement dépasse 35%',
  },
  {
    icon: '✅',
    label: 'Idéal si vous avez 3 crédits ou plus en cours',
  },
  {
    icon: '✅',
    label: 'Idéal si vous avez un projet (travaux, auto) à financer en même temps',
  },
  {
    icon: '❌',
    label: 'Non adapté si vous êtes fiché FICP / FCC',
  },
  {
    icon: '❌',
    label: 'Non adapté si vous avez moins d\'1 an de crédits en cours',
  },
];

export default function RegroupementCreditsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>

        {/* ── HERO ── */}
        <section className="fin-hero">
          <div className="fin-hero-bg" />
          <div className="fin-hero-inner">
            <nav aria-label="breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: 16 }}>
              <Link href="/" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Accueil</Link>
              {' › '}
              <Link href="/financer" style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>Financer</Link>
              {' › '}
              <span>Regroupement de crédits</span>
            </nav>
            <span className="fin-badge">💡 Étude gratuite · Réponse sous 24h</span>
            <h1>Regroupement de crédits :<br />une seule mensualité, réduite jusqu'à −60%</h1>
            <p>
              Vous cumulez plusieurs crédits et vos mensualités pèsent sur votre budget ?
              Le regroupement de crédits réunit tous vos emprunts en <strong>un seul</strong>,
              avec une mensualité unique et allégée. Orizia Courtage étudie votre
              dossier <strong>gratuitement</strong> et sans engagement.
            </p>
            <div className="fin-hero-btns">
              <a href="#formulaire" className="fin-btn-primary">
                🔍 Démarrer mon étude gratuite →
              </a>
              <a href="#comment" className="fin-btn-secondary">
                Comment ça marche ?
              </a>
            </div>
            <div className="fin-hero-trust">
              <span>✅ 100% gratuit & sans engagement</span>
              <span>⚡ Réponse sous 24h</span>
              <span>🔒 Données sécurisées</span>
            </div>
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ── */}
        <section className="fin-chiffres">
          <div className="fin-chiffres-inner">
            {CHIFFRES.map(c => (
              <div key={c.value} className="fin-chiffre">
                <strong>{c.icon} {c.value}</strong>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPLICATION ── */}
        <section id="comment" className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="crowd-2col">
              <div>
                <span className="fin-badge">C'est quoi exactement ?</span>
                <h2>Transformez plusieurs dettes<br />en un seul crédit allégé</h2>
                <p>
                  Le regroupement de crédits fonctionne comme une opération de consolidation :
                  un établissement de crédit rachète l'ensemble de vos emprunts en cours
                  et vous propose un <strong>nouveau crédit unique</strong> à un taux et
                  une durée négociés.
                </p>
                <p>
                  Résultat immédiat : votre mensualité globale baisse, parfois de moitié.
                  Votre taux d'endettement se normalise. Vous retrouvez du <strong>reste à vivre</strong>
                  chaque mois.
                </p>
                <p style={{ fontSize: '0.85rem', opacity: 0.6, fontStyle: 'italic' }}>
                  ⚠️ Contrepartie : la durée totale de remboursement s'allonge,
                  ce qui augmente le coût global du crédit. Orizia vous présente
                  une simulation complète pour décider en connaissance de cause.
                </p>

                {/* Alertes synthétiques */}
                <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {ALERTES.map((a, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: a.icon === '✅' ? '#16a34a' : '#dc2626',
                      }}
                    >
                      <span>{a.icon}</span>
                      {a.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Crédits regroupables */}
              <div>
                <div style={{
                  background: 'var(--orizia-light)',
                  borderRadius: 16,
                  padding: '28px 24px',
                  border: '1.5px solid rgba(58,111,108,0.2)',
                }}>
                  <div style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    color: 'var(--orizia-primary)',
                    marginBottom: 18,
                    textAlign: 'center',
                  }}>
                    Quels crédits peut-on regrouper ?
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {CREDITS_REGROUPABLES.map(c => (
                      <div
                        key={c.label}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 12,
                          background: '#fff',
                          borderRadius: 10,
                          padding: '12px 14px',
                          border: '1px solid rgba(58,111,108,0.12)',
                        }}
                      >
                        <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: 1 }}>{c.icon}</span>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--orizia-accent)', marginBottom: 2 }}>
                            {c.label}
                          </div>
                          <div style={{ fontSize: '0.77rem', color: 'var(--orizia-dark)', opacity: 0.6, lineHeight: 1.4 }}>
                            {c.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMMENT ÇA MARCHE ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Le processus</span>
              <h2>De votre formulaire à votre<br />nouvelle mensualité en 4 étapes</h2>
              <p>
                Tout commence par 5 minutes de formulaire. Orizia s'occupe du reste.
              </p>
            </div>
            <div className="fin-etapes">
              {COMMENT_CA_MARCHE.map(e => (
                <div key={e.n} className="fin-etape">
                  <div className="fin-etape-num">{e.n}</div>
                  <h3>{e.icon} {e.title}</h3>
                  <p>{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROFILS ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Votre profil</span>
              <h2>Le regroupement est-il<br />fait pour votre situation ?</h2>
              <p>
                Les conditions varient selon votre statut. Voici les 4 profils
                les plus fréquents et leur potentiel de solution.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
              {PROFILS.map(p => (
                <div
                  key={p.title}
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: '22px 20px',
                    border: `2px solid ${p.color}22`,
                    transition: 'box-shadow 0.2s',
                  }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{p.icon}</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--orizia-accent)', marginBottom: 6 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--orizia-dark)', opacity: 0.7, marginBottom: 12, lineHeight: 1.5 }}>
                    {p.desc}
                  </p>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: p.color,
                    background: `${p.color}12`,
                    padding: '8px 12px',
                    borderRadius: 8,
                    lineHeight: 1.4,
                  }}>
                    🎯 {p.resultat}
                  </div>
                </div>
              ))}
            </div>
            <div className="crowd-cta-band">
              <div>
                <strong>Vous ne savez pas si votre profil est éligible ?</strong>
                <p>
                  Le formulaire ci-dessous analyse votre situation en détail et
                  vous donne une réponse de principe sous 24h — sans engagement.
                </p>
              </div>
              <a href="#formulaire" className="fin-btn-primary">
                🔍 Démarrer l'analyse →
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            LE FORMULAIRE — section centrale
        ══════════════════════════════════════════ */}
        <section
          id="formulaire"
          className="crowd-section crowd-section--light"
          style={{ paddingTop: 60, paddingBottom: 60 }}
        >
          <div className="fin-section-inner" style={{ maxWidth: 800 }}>
            <div className="fin-section-head">
              <span className="fin-badge">Étude personnalisée</span>
              <h2>Complétez votre dossier en ligne</h2>
              <p>
                13 questions · 5 à 8 minutes · Réponse sous 24h<br />
                <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                  Aucun document à envoyer à ce stade. Vos données sont sécurisées.
                </span>
              </p>
            </div>

            {/* Le formulaire multi-étapes */}
            <OriziaForm />

          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">FAQ</span>
              <h2>Vos questions sur le regroupement<br />de crédits, nos réponses</h2>
              <p>Des réponses claires, sans jargon financier.</p>
            </div>
            <div className="crowd-faq-list">
              {faqSchema.mainEntity.map((f, i) => (
                <details key={i} className="crowd-faq-item">
                  <summary>{f.name}</summary>
                  <p>{f.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONFIANCE ── */}
        <section className="crowd-section crowd-section--light">
          <div className="fin-section-inner">
            <div className="av-gratuit-bloc">
              <div className="av-gratuit-icon">🔒</div>
              <div>
                <strong>Vos données sont sécurisées et ne seront jamais revendues</strong>
                <p>
                  Orizia Courtage est un courtier en crédit immatriculé à l'ORIAS.
                  Vos informations sont transmises exclusivement aux établissements
                  de crédit partenaires dans le cadre de votre demande, conformément
                  au RGPD. Aucune revente à des tiers. Aucun démarchage commercial non sollicité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── MAILLAGE INTERNE ── */}
        <section className="crowd-section crowd-section--white">
          <div className="fin-section-inner">
            <div className="fin-section-head">
              <span className="fin-badge">Aller plus loin</span>
              <h2>Optimisez l'ensemble<br />de votre situation financière</h2>
              <p>Le regroupement de crédits est souvent le point de départ d'une remise à plat complète.</p>
            </div>
            <div className="fin-cards">
              {[
                {
                  href: '/financer/credit-immobilier',
                  icon: '🏡',
                  title: 'Crédit Immobilier',
                  sub: 'Financer un projet',
                  text: 'Après assainissement de votre budget, vous souhaitez acquérir un bien ? Orizia négocie votre crédit immobilier aux meilleures conditions.',
                },
                {
                  href: '/assurer/emprunteur',
                  icon: '📋',
                  title: 'Assurance Emprunteur',
                  sub: 'Réduire le coût de votre prêt',
                  text: 'Si votre regroupement inclut un prêt immobilier, optimiser l\'assurance emprunteur peut générer 5 000 à 15 000€ d\'économies supplémentaires.',
                },
                {
                  href: '/investir/assurance-vie',
                  icon: '🛡️',
                  title: 'Assurance Vie',
                  sub: 'Épargner en parallèle',
                  text: 'Une mensualité allégée libère de la capacité d\'épargne. L\'assurance vie est l\'outil idéal pour faire fructifier ce surplus mensuel.',
                },
              ].map(s => (
                <Link href={s.href} key={s.title} className="fin-card">
                  <div className="fin-card-icon">{s.icon}</div>
                  <div className="fin-card-sub">{s.sub}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="fin-card-link">En savoir plus →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="fin-cta">
          <div className="fin-cta-inner">
            <h2>Vos mensualités pèsent trop.<br />Faites-les baisser dès maintenant.</h2>
            <p>
              5 minutes de formulaire. 24h de délai. Une proposition concrète.
              Orizia Courtage analyse votre profil, identifie la solution optimale
              et vous accompagne jusqu'à la mise en place. Gratuitement.
            </p>
            <div className="fin-hero-btns">
              <a href="#formulaire" className="fin-btn-primary">
                🔍 Démarrer mon étude gratuite →
              </a>
              <Link href="/contact" className="fin-btn-outline">
                Poser une question
              </Link>
            </div>
            <p style={{ marginTop: 24, fontSize: '0.75rem', opacity: 0.55, maxWidth: 560, margin: '24px auto 0' }}>
              Orizia Courtage, courtier en crédit immatriculé à l'ORIAS. Le regroupement de crédits peut allonger
              la durée de remboursement et augmenter le coût total du crédit. Une simulation complète vous sera
              fournie avant toute décision. Aucun frais perçu auprès de l'emprunteur avant déblocage des fonds (loi Lagarde).
            </p>
          </div>
        </section>

      </main>
    </>
  );
}