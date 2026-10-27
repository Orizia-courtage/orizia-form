import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';

export default function ServiceCard({ img, tag, icon, title, desc, links = [], cta }) {
  return (
    <article className="hx-card">
      <div className="hx-media">
        <Image src={img} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px" style={{ objectFit: 'cover' }} />
        <span className="hx-tag">{icon ? <Icon name={icon} /> : null}{tag}</span>
      </div>
      <div className="hx-body">
        <h3>{title}</h3>
        <p>{desc}</p>
        {links.length > 0 && (
          <ul className="hx-links">
            {links.map(l => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}<Icon name="arrow-right" className="oz-arrow" /></Link>
              </li>
            ))}
          </ul>
        )}
        <Link href={cta.href} className="hx-cta">
          {cta.label}
          <Icon name="arrow-right" className="oz-arrow" />
        </Link>
      </div>
    </article>
  );
}
