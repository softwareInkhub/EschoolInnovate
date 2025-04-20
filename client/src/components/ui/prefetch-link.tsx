import { Link } from "wouter";
import { useCallback, useState } from "react";
import { prefetchRouteData } from "@/lib/prefetch";

interface PrefetchLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * A link component that prefetches data for the target route
 * on hover and focus, improving perceived performance
 */
export function PrefetchLink({
  href,
  children,
  className,
  prefetch = true,
  onClick,
  ...props
}: PrefetchLinkProps) {
  const [prefetched, setPrefetched] = useState(false);

  // Handle prefetch on hover or focus
  const handlePrefetch = useCallback(() => {
    if (prefetch && !prefetched) {
      prefetchRouteData(href);
      setPrefetched(true);
    }
  }, [href, prefetch, prefetched]);

  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      onClick={(e) => {
        // Handle prefetch first in case we navigate
        if (prefetch && !prefetched) {
          prefetchRouteData(href);
          setPrefetched(true);
        }
        // Call the user's onClick handler if provided
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}

/**
 * Prefetch data for a set of likely navigation targets
 * @param routes Array of route paths to prefetch
 */
export function usePrefetchRoutes(routes: string[]) {
  const [prefetched, setPrefetched] = useState(false);

  const prefetchRoutes = useCallback(() => {
    if (!prefetched) {
      routes.forEach(route => {
        prefetchRouteData(route);
      });
      setPrefetched(true);
    }
  }, [routes, prefetched]);

  return { prefetchRoutes };
}