import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--orizia-accent)', color: 'var(--orizia-light)', padding: '60px 20px 30px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
        <div>
          <Image src="/images/Orizia_logo-removebg-preview.png" alt="Orizia Courtage" width={130} height={60} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', marginBottom: 16 }} />
          <p style={{ fontSize: '0.88rem', opacity: 0.8, lineHeight: 1.6 }}>Expert en Financement &amp; Patrimoine. Courtier certifié ORIAS.</p>
        </div>
        {[
          { title: 'Investir', href: '/investir', links: [['Crowdfunding', '/investir/crowdfunding'], ['PERP / PER', '/investir/per'], ['Assurance Vie', '/investir/assurance-vie'], ['SCPI', '/investir/scpi']] },
          { title: 'Financer', href: '/financer', links: [['Crédit immobilier', '/financer/credit-immobilier'], ['Regroupement de crédits', '/financer/regroupement-credits'], ['Prêt personnel', '/financer/pret-personnel']] },
          { title: 'Assurer', href: '/assurer',  links: [['Assurance emprunteur', '/assurer/emprunteur'], ['Assurance habitation', '/assurer/habitation'], ['Assurance auto/moto', '/assurer/auto-moto']] },
        ].map(col => (
          <div key={col.title}>
            {/* ← Titre cliquable */}
            <Link href={col.href} style={{ display: 'block', textDecoration: 'none' }}>
              <h4 style={{ fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16, opacity: 0.6, color: 'var(--orizia-light)' }}>
                {col.title}
              </h4>
            </Link>
            {col.links.map(([label, href]) => (
              <Link key={href} href={href} style={{ display: 'block', color: 'var(--orizia-light)', textDecoration: 'none', fontSize: '0.9rem', marginBottom: 8, opacity: 0.85 }}>{label}</Link>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(230,245,242,0.15)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontSize: '0.8rem', opacity: 0.6 }}>
        <span>© {new Date().getFullYear()} Orizia Courtage. Tous droits réservés.</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link href="/mentions-legales" style={{ color: 'inherit', textDecoration: 'none' }}>Mentions légales</Link>
          <Link href="/confidentialite" style={{ color: 'inherit', textDecoration: 'none' }}>Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}