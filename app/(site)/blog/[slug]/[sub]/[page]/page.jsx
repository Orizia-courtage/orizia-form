import { ListingRoute, listingParams, listingRouteMetadata } from '@/components/ListingRoutes';

// Thème paginé : /blog/financer/credit-immobilier/2.
export const revalidate = 600;
export const generateStaticParams = () => listingParams('blog', 3);
export const generateMetadata = async ({ params }) => listingRouteMetadata('blog', await params);
export default async function Page({ params }) { return <ListingRoute type="blog" {...await params} />; }
