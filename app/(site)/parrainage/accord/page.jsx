import AccordParrainage from '@/components/AccordParrainage';

export const metadata = {
  title: 'Être rappelé(e) par Cindy | Orizia Courtage',
  robots: { index: false, follow: false },
};

export default async function AccordPage({ searchParams }) {
  const params = await searchParams;
  const id = typeof params?.id === 'string' ? params.id : '';
  const token = typeof params?.t === 'string' ? params.t : '';
  return (
    <main className="parrainage-page">
      <section className="parrainage-form-section parr-accord-section">
        <div className="parrainage-form-container">
          <div className="parrainage-header">
            <h1 className="parr-accord-title">Un proche vous a recommandé Orizia</h1>
            <p className="form-subtitle">Je suis Cindy Urbansky, courtière en crédit, assurance et placements. Je vous rappelle seulement si vous le souhaitez : le premier échange est gratuit et sans engagement.</p>
          </div>
          <AccordParrainage id={id} token={token} />
        </div>
      </section>
    </main>
  );
}
