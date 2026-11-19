import Image from 'next/image';
import Icon from '@/components/Icon';
import { COMPANY } from '@/lib/company.mjs';
import { ARTICLE_TYPES, SILOS, articlePath, getPublishedArticles } from '@/lib/articles.mjs';
import { CAL_TIME_ZONE, fetchCalSlots } from '@/lib/cal-slots.mjs';
import LiensTracker from './LiensTracker';
import LiensStatus from './LiensStatus';
import LiensBooking from './LiensBooking';
import LiensShare from './LiensShare';
import './liens.css';

export const metadata = {
  title: 'Cindy Urbansky — Orizia Courtage | Tous mes liens',
  description: 'Prendre rendez-vous, lire mes derniers articles, me contacter : tout Orizia Courtage en une page.',
  alternates: { canonical: `${COMPANY.url}/liens` },
  openGraph: {
    title: 'Cindy Urbansky — Orizia Courtage',
    description: 'Rendez-vous, articles, contact : tout en une page.',
    url: `${COMPANY.url}/liens`,
    siteName: 'Orizia Courtage',
    images: [{ url: `${COMPANY.url}/images/og-accueil.jpg`, width: 1200, height: 630 }],
    locale: 'fr_FR',
    type: 'profile',
  },
};

export const viewport = { themeColor: '#1b1d1a' };

// Articles publiés depuis le CRM (la publication relance la page) et créneaux Cal.com : relus toutes les 5 minutes.
export const revalidate = 300;

// Créneaux des 3 prochaines semaines, chargés avec la page : l'agenda s'affiche même si /api est bloqué par le pare-feu.
async function initialSlots() {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: CAL_TIME_ZONE }).format(new Date());
  const end = new Date(`${today}T12:00:00Z`);
  end.setUTCDate(end.getUTCDate() + 21);
  const { slots } = await fetchCalSlots(today, end.toISOString().slice(0, 10), { revalidate: 300 });
  return slots || null;
}

// Les liens internes gardent la trace de la provenance (Instagram) dans les statistiques.
const utm = (href) => `${href}${href.includes('?') ? '&' : '?'}utm_source=instagram&utm_medium=bio`;

const QUICK = [
  { id: 'appel', icon: 'phone', label: 'Appeler', href: `tel:${COMPANY.phoneE164}` },
  { id: 'whatsapp', icon: 'message-circle', label: 'WhatsApp', href: 'https://wa.me/33777259706?text=Bonjour%20Cindy%2C%20je%20viens%20d%E2%80%99Instagram%20%3A%20', external: true },
  { id: 'email', icon: 'mail', label: 'E-mail', href: `mailto:${COMPANY.email}?subject=Contact%20depuis%20Instagram` },
];

const PROJETS = [
  { id: 'financer', icon: 'house', title: 'Financer', text: 'Crédit immo, rachat de crédits', href: '/financer', image: '/images/financer.webp' },
  { id: 'assurer', icon: 'shield-check', title: 'Assurer', text: 'Emprunteur, habitation, auto', href: '/assurer', image: '/images/assurer.webp' },
  { id: 'investir', icon: 'trending-up', title: 'Investir', text: 'Assurance vie, PER, SCPI', href: '/investir', image: '/images/investir.webp' },
];

const SOCIALS = [
  { id: 'instagram', icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/orizia_courtage/' },
  { id: 'linkedin', icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/orizia-courtage' },
  { id: 'facebook', icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/orizia.courtage/' },
];

const dateFmt = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', timeZone: 'Europe/Paris' });

export default async function LiensPage() {
  const [articles, slots] = await Promise.all([getPublishedArticles(), initialSlots()]);
  const posts = articles.slice(0, 3).map((a) => ({
    url: articlePath(a),
    title: a.title,
    excerpt: a.excerpt,
    image: a.image?.url || (a.silo ? `/images/${a.silo}.webp` : null),
    label: a.silo ? SILOS[a.silo]?.label : ARTICLE_TYPES[a.type]?.label,
    date: a.publishedAt || a.updatedAt,
    minutes: a.readMinutes,
  }));
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Orizia Courtage, ${COMPANY.addressInline}`)}`;

  return (
    <LiensTracker>
      <main className="lk">
        {/* ── En-tête ── */}
        <header className="lk-hero">
          <div className="lk-hero-glow" aria-hidden="true" />
          <div className="lk-portrait">
            <svg className="lk-ring" viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="100" cy="100" r="96" />
            </svg>
            <div className="lk-photo">
              <Image src="/images/hero-cindy-assis.webp" alt="Cindy Urbansky, courtière indépendante" fill priority sizes="140px" quality={90} style={{ objectFit: 'cover', objectPosition: '50% 25%' }} />
            </div>
          </div>
          <p className="lk-brand">Orizia Courtage</p>
          <h1 className="lk-name">Cindy Urbansky</h1>
          <p className="lk-role">Courtière indépendante · Crédit, assurance &amp; placements<br />Marcq-en-Barœul &amp; partout en France</p>
          <LiensStatus />

          <nav className="lk-quick" aria-label="Me contacter">
            {QUICK.map((q) => (
              <a key={q.id} href={q.href} data-track={q.id} className="lk-quick-btn"
                {...(q.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...(q.download ? { download: 'Cindy-Urbansky.vcf' } : {})}>
                <span className="lk-quick-ico"><Icon name={q.icon} /></span>
                <span>{q.label}</span>
              </a>
            ))}
          </nav>
        </header>

        {/* ── Rendez-vous ── */}
        <section className="lk-section lk-section--booking" id="rdv" aria-labelledby="lk-rdv-title">
          <div className="lk-section-head">
            <span className="lk-kicker"><Icon name="calendar-check" /> 30 min · visio ou téléphone · gratuit</span>
            <h2 id="lk-rdv-title" className="lk-title">Réservez <em>votre créneau</em></h2>
          </div>
          <LiensBooking initialSlots={slots} />
        </section>

        {/* ── Projets ── */}
        <section className="lk-section" aria-labelledby="lk-projet-title">
          <h2 id="lk-projet-title" className="lk-title">Votre <em>projet</em></h2>
          <div className="lk-projets">
            {PROJETS.map((p) => (
              <a key={p.id} href={utm(p.href)} className="lk-projet" data-track={`projet-${p.id}`}>
                <Image src={p.image} alt="" fill sizes="(max-width: 520px) 33vw, 160px" style={{ objectFit: 'cover' }} />
                <span className="lk-projet-body">
                  <span className="lk-projet-ico"><Icon name={p.icon} /></span>
                  <strong>{p.title}</strong>
                  <small>{p.text}</small>
                </span>
              </a>
            ))}
          </div>
          <a href={utm('/')} className="lk-site" data-track="site">
            <span className="lk-site-logo"><Image src="/images/Orizia_logo-opt.webp" alt="" width={36} height={36} /></span>
            <span className="lk-site-text"><strong>Visiter le site</strong><small>orizia-courtage.fr</small></span>
            <Icon name="arrow-up-right" />
          </a>
        </section>

        {/* ── Articles ── */}
        <section className="lk-section" aria-labelledby="lk-blog-title">
          <div className="lk-section-row">
            <h2 id="lk-blog-title" className="lk-title">À <em>lire</em></h2>
            <a href={utm('/blog')} className="lk-more" data-track="blog">Tout le blog <Icon name="arrow-right" /></a>
          </div>
          {posts.length ? (
            <div className="lk-posts" role="list">
              {posts.map((post, i) => (
                <a key={post.url} href={utm(post.url)} className="lk-post" role="listitem" data-track={`article-${i + 1}`}>
                  <span className="lk-post-img">
                    {post.image && <Image src={post.image} alt="" fill sizes="(max-width: 520px) 78vw, 340px" style={{ objectFit: 'cover' }} />}
                    {i === 0 && <span className="lk-post-new">Nouveau</span>}
                  </span>
                  <span className="lk-post-body">
                    <span className="lk-post-meta">{[post.label, post.date && dateFmt.format(new Date(post.date)), post.minutes && `${post.minutes} min`].filter(Boolean).join(' · ')}</span>
                    <strong>{post.title}</strong>
                    {post.excerpt && <small>{post.excerpt}</small>}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="lk-empty">
              <Icon name="pen-line" />
              <p><strong>Les premiers articles arrivent.</strong> Taux, assurance, placements : mes décryptages apparaîtront ici dès leur publication.</p>
            </div>
          )}
        </section>

        {/* ── Recommander ── */}
        <section className="lk-section">
          <div className="lk-reco">
            <div>
              <strong>Un proche a un projet ?</strong>
              <p>Partagez cette page ou recommandez-moi : je m’occupe du reste.</p>
            </div>
            <div className="lk-reco-actions">
              <LiensShare />
              <a href={utm('/parrainage')} className="lk-reco-btn lk-reco-btn--ghost" data-track="parrainage"><Icon name="gift" /> Parrainage</a>
            </div>
          </div>
        </section>

        {/* ── Pied ── */}
        <footer className="lk-foot">
          <div className="lk-socials">
            {SOCIALS.map((s) => (
              <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} data-track={s.id}><Icon name={s.icon} /></a>
            ))}
          </div>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="lk-address" data-track="adresse">
            <Icon name="map-pin" /> {COMPANY.addressInline}
          </a>
          <p className="lk-legal">
            {COMPANY.legalName} — {COMPANY.legalForm.replace(/ à associé unique/, '')} au capital de {COMPANY.capital} · {COMPANY.rcs}
            {COMPANY.oriasNumber ? ` · ORIAS n° ${COMPANY.oriasNumber}` : ' · Immatriculation ORIAS en cours'}
            <br />
            <a href="/mentions-legales">Mentions légales</a> · <a href="/confidentialite">Confidentialité</a>
          </p>
        </footer>
      </main>
    </LiensTracker>
  );
}
