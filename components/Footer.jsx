import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--orizia-accent)', color: 'var(--orizia-light)', padding: '60px 20px 30px' }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', // Ajusté pour faire tenir 6 colonnes sur grand écran
        gap: 30, 
        marginBottom: 40 
      }}>
        
        {/* ── COLONNE 1 : LOGO & RÉSEAUX SOCIAUX ── */}
        <div>
          <Image 
            src="/images/Orizia_logo.webp" 
            alt="Orizia Courtage" 
            width={130} 
            height={60} 
            style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', marginBottom: 16 }} 
          />
          <p style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.6, marginBottom: 20 }}>
            Expert en Financement & Patrimoine. Courtier certifié ORIAS.
          </p>
          
          {/* Réseaux Sociaux */}
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="https://www.linkedin.com/company/orizia-courtage" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--orizia-light)', opacity: 0.8, transition: 'opacity 0.3s' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/orizia.courtage/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'var(--orizia-light)', opacity: 0.8, transition: 'opacity 0.3s' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/orizia.courtage/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'var(--orizia-light)', opacity: 0.8, transition: 'opacity 0.3s' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 1.76-6.98 6.208-.058 1.281-.072 1.688-.072 4.947s.014 3.666.072 4.947c.2 4.444 2.618 6.008 6.98 6.208 1.281.058 1.689.072 4.947.072s3.668-.014 4.947-.072c4.357-.2 6.78-1.764 6.98-6.208.058-1.281.072-1.689.072-4.947s-.014-3.666-.072-4.947c-.2-4.444-2.62-6.008-6.98-6.208-1.281-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ── COLONNES 2, 3, 4 : MENU DES SERVICES ── */}
        {[
          { title: 'Investir', href: '/investir', links: [['Crowdfunding', '/investir/crowdfunding'], ['PERP / PER', '/investir/per'], ['Assurance Vie', '/investir/assurance-vie'], ['SCPI', '/investir/scpi']] },
          { title: 'Financer', href: '/financer', links: [['Crédit immobilier', '/financer/credit-immobilier'], ['Regroupement de crédits', '/financer/regroupement-credits'], ['Prêt personnel', '/financer/pret-personnel'], ['Rachat de soulte', '/financer/rachat-soulte']] },
          { title: 'Assurer', href: '/assurer',  links: [['Assurance emprunteur', '/assurer/assurance-emprunteur'], ['Assurance habitation', '/assurer/assurance-habitation'], ['Assurance auto/moto', '/assurer/auto-moto']] },
        ].map(col => (
          <div key={col.title}>
            <Link href={col.href} style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16, color: 'var(--orizia-gold)' }}>
                {col.title}
              </div>
            </Link>
            {col.links.map(([label, href]) => (
              <Link key={href} href={href} style={{ display: 'block', color: 'var(--orizia-light)', textDecoration: 'none', fontSize: '0.85rem', marginBottom: 8, opacity: 0.85 }}>
                {label}
              </Link>
            ))}
          </div>
        ))}

        {/* ── COLONNE 5 : AUTRES ── */}
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16, color: 'var(--orizia-gold)' }}>
            Autres
          </div>
          {[
            ['Parrainage', '/parrainage'],
            ['Mon blog', '/blog'],
            ['Les actualités', '/actualites'],
            ['Qui suis-je ?', '/qui-suis-je'],
            ['Lexique', '/lexique'],
          ].map(([label, href]) => (
            <Link key={href} href={href} style={{ display: 'block', color: 'var(--orizia-light)', textDecoration: 'none', fontSize: '0.85rem', marginBottom: 8, opacity: 0.85 }}>
              {label}
            </Link>
          ))}
        </div>

        {/* ── COLONNE 6 : CONTACT & HORAIRES ── */}
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16, color: 'var(--orizia-gold)' }}>
            Contact & Horaires
          </div>
          
          <div style={{ fontSize: '0.85rem', marginBottom: 12, opacity: 0.85, lineHeight: 1.5 }}>
            <span style={{ marginRight: 8 }}>📍</span> 
            <a
    href="https://www.google.com/maps/search/?api=1&query=23+bd+Clemenceau+59700+Marcq-en-Baroeul"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: 'inherit', textDecoration: 'none' }}
  >
    23 bd Clemenceau<br />
    <span style={{ marginLeft: 24 }}>59700 Marcq-en-Barœul</span>
  </a>
          </div>

          <div style={{ fontSize: '0.85rem', marginBottom: 12, opacity: 0.85 }}>
            <span style={{ marginRight: 8 }}>📞</span> 
            <a href="tel:+33777259706" style={{ color: 'inherit', textDecoration: 'none' }}>07 77 25 97 06</a>
          </div>

          <div style={{ fontSize: '0.85rem', marginBottom: 16, opacity: 0.85 }}>
            <span style={{ marginRight: 8 }}>✉️</span> 
            <a href="mailto:cindy.urbansky@orizia-courtage.fr" style={{ color: 'inherit', textDecoration: 'none' }}>Envoyer un e-mail</a>
          </div>

          <div style={{ fontSize: '0.8rem', opacity: 0.7, lineHeight: 1.6, backgroundColor: 'rgba(255,255,255,0.05)', padding: '10px 12px', borderRadius: 8 }}>
            <strong>Horaires :</strong><br/>
            Lun - Ven : 9h00 – 18h00<br/>
          </div>
        </div>

      </div>

      {/* ── BARRE DU BAS : COPYRIGHT & LIENS LÉGAUX ── */}
      <div style={{ borderTop: '1px solid rgba(230,245,242,0.15)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, fontSize: '0.8rem', opacity: 0.6 }}>
        <span>© {new Date().getFullYear()} Orizia Courtage. Tous droits réservés.</span>
        
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Link href="/mentions-legales" style={{ color: 'inherit', textDecoration: 'none' }}>Mentions légales</Link>
          <Link href="/confidentialite" style={{ color: 'inherit', textDecoration: 'none' }}>Confidentialité</Link>
        </div>
      </div>
      
    </footer>
  );
}