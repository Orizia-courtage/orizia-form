'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function ServiceCard({ img, tag, title, desc, cta }) {
  return (
    <div
      style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(29,30,24,0.08)', transition: 'transform 0.3s', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ position: 'relative', height: 220, overflow: 'hidden', flexShrink: 0 }}>
        {/* ↑ overflow: hidden + flexShrink: 0 ajoutés */}
        <Image src={img} alt={title} fill style={{ objectFit: 'cover' }} />
        <span style={{ position: 'absolute', top: 16, left: 16, background: 'var(--orizia-primary)', color: '#E6F5F2', padding: '4px 12px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {tag}
        </span>
      </div>
      <div style={{ padding: '28px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: 'var(--orizia-accent)', fontSize: '1.2rem', fontWeight: 800, marginTop: 0, marginBottom: 12 }}>{title}</h3>
        <p style={{ color: 'var(--orizia-dark)', fontSize: '0.93rem', lineHeight: 1.6, flex: 1, marginTop: 0 }}>{desc}</p>
        <Link href={cta.href} className="orizia-btn-main" style={{ marginTop: 20, textAlign: 'center', display: 'block' }}>
          {cta.label}
        </Link>
      </div>
    </div>
  );
}