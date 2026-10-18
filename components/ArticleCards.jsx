import Link from 'next/link';

function formatDate(value) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
}

export default function ArticleCards({ articles, type }) {
  const basePath = type === 'blog' ? '/blog' : '/actualites';
  if (!articles.length) return null;
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(265px, 1fr))', gap: 24, marginTop: 38 }}>
    {articles.map((article) => <Link key={article.id} href={`${basePath}/${article.slug}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none', background: '#fff', border: '1px solid #e4e7eb', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 16px rgba(20,36,54,.06)' }}>
      {article.cover_image_url && <img src={article.cover_image_url} alt="" style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', display: 'block' }} />}
      <div style={{ padding: 22 }}>
        <p style={{ fontSize: '.8rem', color: '#65707b', margin: '0 0 9px' }}>{article.published_at ? formatDate(article.published_at) : ''}</p>
        <h2 style={{ color: 'var(--orizia-accent)', fontSize: '1.22rem', margin: '0 0 10px', lineHeight: 1.3 }}>{article.title}</h2>
        {article.excerpt && <p style={{ color: '#4c5966', lineHeight: 1.55, margin: 0 }}>{article.excerpt}</p>}
      </div>
    </Link>)}
  </div>;
}
