import { ListingRoute, listingParams, listingRouteMetadata } from '@/components/ListingRoutes';

// Univers paginé (/blog/financer/2) ou thème (/blog/financer/credit-immobilier).
export const revalidate = 600;
export const generateStaticParams = () => listingParams('blog', 2);
export const generateMetadata = async ({ params }) => listingRouteMetadata('blog', await params);
export default async function Page({ params }) { return <ListingRoute type="blog" {...await params} />; }
