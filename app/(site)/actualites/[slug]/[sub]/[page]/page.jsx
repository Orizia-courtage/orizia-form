import { ListingRoute, listingParams, listingRouteMetadata } from '@/components/ListingRoutes';

// Thème paginé : /actualites/financer/credit-immobilier/2.
export const revalidate = 600;
export const generateStaticParams = () => listingParams('actualite', 3);
export const generateMetadata = async ({ params }) => listingRouteMetadata('actualite', await params);
export default async function Page({ params }) { return <ListingRoute type="actualite" {...await params} />; }
