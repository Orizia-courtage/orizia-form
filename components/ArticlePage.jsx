import Link from 'next/link';

export default function ArticlePage({ article, basePath }) {
  const date = article.published_at && new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(article.published_at));
  return <main><article style={{ maxWidth: 820, margin: '0 auto', padding: '70px 24px' }}>
    <Link href={basePath} style={{ color: 'var(--orizia-accent)', textDecoration: 'none' }}>← Retour</Link>
    <p style={{ color: '#697580', marginTop: 32 }}>{date}</p><h1 style={{ color: 'var(--orizia-accent)', fontSize: 'clamp(2rem, 5vw, 3.4rem)', lineHeight: 1.12, margin: '10px 0 22px' }}>{article.title}</h1>
    {article.excerpt && <p style={{ fontSize: '1.2rem', color: '#52606d', lineHeight: 1.6 }}>{article.excerpt}</p>}
    {article.cover_image_url && <img src={article.cover_image_url} alt="" style={{ width: '100%', borderRadius: 16, margin: '25px 0 35px', maxHeight: 460, objectFit: 'cover' }} />}
    <div style={{ whiteSpace: 'pre-wrap', color: '#263746', lineHeight: 1.85, fontSize: '1.05rem' }}>{article.content}</div>
  </article></main>;
}
