/**
 * Data prefetching utilities for improved performance
 */
import { queryClient } from "./queryClient";

// Common API endpoints that can be prefetched
const criticalDataUrls = [
  "/api/schools/featured",
  "/api/projects/featured",
];

// Basic map of routes to API endpoints
const routeSpecificData: Record<string, string[]> = {
  "/schools": ["/api/schools"],
  "/projects": ["/api/projects"], 
  "/competitions": ["/api/competitions"],
};

/**
 * Prefetches critical data that's needed for most page loads
 */
export function prefetchCriticalData() {
  if (typeof window === 'undefined') return;

  // Prefetch the critical data with a short timeout to let
  // the initial page render complete first
  setTimeout(() => {
    criticalDataUrls.forEach((url) => {
      queryClient.prefetchQuery({
        queryKey: [url],
        staleTime: 1000 * 60 * 2, // 2 minutes
      });
    });
  }, 100);
}

/**
 * Prefetches data for a specific route
 * @param route The route being navigated to
 */
export function prefetchRouteData(route: string) {
  // Extract the base route (remove query params and hash)
  const baseRoute = route.split('?')[0].split('#')[0];
  
  // Find data to prefetch for this route
  const dataToPrefetch = routeSpecificData[baseRoute] || [];
  if (dataToPrefetch.length === 0) return;
  
  // Prefetch all the data for this route
  dataToPrefetch.forEach((url) => {
    queryClient.prefetchQuery({
      queryKey: [url],
      staleTime: 1000 * 60 * 2, // 2 minutes
    });
  });
}

/**
 * Prefetches data for a specific resource by ID
 * @param resourceType The type of resource (e.g., 'school', 'project')
 * @param id The ID of the resource
 */
export function prefetchResourceById(resourceType: string, id: string | number) {
  queryClient.prefetchQuery({
    queryKey: [`/api/${resourceType}s/${id}`],
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}