import { ListingRoute, listingParams, listingRouteMetadata } from '@/components/ListingRoutes';

// Univers paginé (/actualites/financer/2) ou thème (/actualites/financer/credit-immobilier).
export const revalidate = 600;
export const generateStaticParams = () => listingParams('actualite', 2);
export const generateMetadata = async ({ params }) => listingRouteMetadata('actualite', await params);
export default async function Page({ params }) { return <ListingRoute type="actualite" {...await params} />; }
