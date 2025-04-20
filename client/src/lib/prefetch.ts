/**
 * Data prefetching utilities for improved performance
 */
import { queryClient } from "./queryClient";

// Common API endpoints that can be prefetched
const criticalDataUrls = [
  "/api/schools/featured",
  "/api/projects/featured",
  "/api/user", // Will return 401 for unauthenticated users, but the query is still registered
];

// Data that should be prefetched when visiting specific routes
const routeSpecificData: Record<string, string[]> = {
  "/schools": ["/api/schools"],
  "/projects": ["/api/projects"],
  "/competitions": ["/api/competitions"],
  "/courses": ["/api/courses/featured", "/api/courses/popular", "/api/courses/new"],
};

/**
 * Prefetches critical data that's needed for most page loads
 * This should be called early in the app lifecycle, ideally during idle time
 */
export function prefetchCriticalData() {
  if (typeof window === 'undefined') return;

  // Mark performance for tracking
  if (typeof performance !== 'undefined') {
    performance.mark('prefetch-start');
  }

  // Prefetch the critical data
  criticalDataUrls.forEach((url) => {
    queryClient.prefetchQuery({
      queryKey: [url],
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  });

  // Measure performance
  if (typeof performance !== 'undefined') {
    performance.mark('prefetch-end');
    performance.measure('data-prefetching', 'prefetch-start', 'prefetch-end');
  }
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
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  });
}

/**
 * Given a list of possible routes, prefetch data for all of them
 * Used for prefetching data for routes that might be navigated to next
 * @param routes List of routes that might be visited
 */
export function prefetchProbableRoutes(routes: string[]) {
  routes.forEach(route => {
    prefetchRouteData(route);
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
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}