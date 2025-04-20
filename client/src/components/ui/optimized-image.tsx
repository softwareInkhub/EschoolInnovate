import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  highPriority?: boolean;
  width?: number;
  height?: number;
  fill?: boolean;
}

/**
 * A component for optimized image loading with proper attributes
 * - Adds appropriate loading strategy (lazy/eager)
 * - Sets proper decoding attribute
 * - Adds fetchpriority based on importance
 * - Shows placeholder during loading
 * - Handles error states
 */
export function OptimizedImage({
  src,
  alt,
  className,
  placeholderClassName,
  highPriority = false,
  width,
  height,
  fill = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Reset loading state when src changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  // Extract dimensions for style
  const style: React.CSSProperties = {
    ...props.style,
  };

  if (fill) {
    style.objectFit = 'cover';
    style.position = 'absolute';
    style.width = '100%';
    style.height = '100%';
    style.top = 0;
    style.left = 0;
  } else if (width && height) {
    style.width = `${width}px`;
    style.height = `${height}px`;
  }

  // Apply appropriate optimizations
  const optimizedProps = {
    loading: highPriority ? 'eager' : 'lazy' as 'eager' | 'lazy',
    decoding: highPriority ? 'sync' : 'async' as 'sync' | 'async',
    fetchPriority: highPriority ? 'high' : 'auto' as 'high' | 'auto',
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-muted",
        fill ? "w-full h-full" : "",
        className
      )}
      style={fill ? { position: 'relative' } : undefined}
    >
      {!isLoaded && !error && (
        <div 
          className={cn(
            "absolute inset-0 bg-muted animate-pulse",
            placeholderClassName
          )}
          style={{
            backgroundSize: '400% 400%',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      )}

      {error ? (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-muted/50 text-muted-foreground text-sm p-4 text-center"
        >
          Failed to load image
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          style={style}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          {...optimizedProps}
          {...props}
        />
      )}
    </div>
  );
}