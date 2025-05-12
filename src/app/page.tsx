import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import getApartments from "./lib/getApartments";
import ApartmentsPage from "@/components/homepage/ApartmentsPage";

export default async function Home() {
  const queryClient = new QueryClient();

  // Prefetch the "posts" query on the server
  await queryClient.prefetchQuery({
    queryKey: ["apartments"],
    queryFn: getApartments,
  });

  // Serialize (dehydrate) the query cache and pass it to the client
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ApartmentsPage />
    </HydrationBoundary>
  );
}
