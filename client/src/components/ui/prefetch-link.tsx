import { Link } from 'wouter';
import { prefetchRoute } from '@/lib/prefetch';
import { MouseEvent, FC, ReactNode } from 'react';

type PrefetchLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  prefetch?: boolean;
};

/**
 * Enhanced Link component that prefetches data when hovering
 * Improves perceived performance by preloading route data
 */
export const PrefetchLink: FC<PrefetchLinkProps> = ({
  href,
  children,
  className,
  onClick,
  prefetch = true,
  ...props
}) => {
  const handleMouseEnter = () => {
    if (prefetch) {
      prefetchRoute(href);
    }
  };

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
};