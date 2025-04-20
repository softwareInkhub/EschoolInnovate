import { queryClient } from './queryClient';

/**
 * Prefetch important data when the app is idle
 * This improves perceived performance by loading data before users need it
 */
export function prefetchCriticalData() {
  // Use requestIdleCallback when browser is idle
  const prefetch = () => {
    // Prefetch featured schools for the landing and explore pages
    queryClient.prefetchQuery({
      queryKey: ['/api/schools/featured'],
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
    
    // Prefetch featured projects
    queryClient.prefetchQuery({
      queryKey: ['/api/projects/featured'],
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };
  
  // Use requestIdleCallback when available, fall back to setTimeout
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as any).requestIdleCallback(prefetch, { timeout: 5000 });
  } else {
    setTimeout(prefetch, 1000);
  }
}

/**
 * Prefetch data for a specific route
 * Call this function when hovering over a link to preload data
 */
export function prefetchRoute(route: string) {
  switch (route) {
    case '/schools':
      queryClient.prefetchQuery({
        queryKey: ['/api/schools'],
        staleTime: 1000 * 60 * 5, // 5 minutes
      });
      break;
    case '/projects':
      queryClient.prefetchQuery({
        queryKey: ['/api/projects'],
        staleTime: 1000 * 60 * 5, // 5 minutes
      });
      break;
    case '/competitions':
      queryClient.prefetchQuery({
        queryKey: ['/api/competitions'],
        staleTime: 1000 * 60 * 5, // 5 minutes
      });
      break;
    default:
      break;
  }
}