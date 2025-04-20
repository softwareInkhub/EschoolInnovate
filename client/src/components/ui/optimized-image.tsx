import { useState, useEffect, useRef } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  aspectRatio?: string;
  loadingHeight?: string;
  enableGPUAcceleration?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '',
  className,
  aspectRatio = 'aspect-video',
  loadingHeight = 'h-48',
  enableGPUAcceleration = true,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setError(false);
    
    if (!src) {
      setError(true);
      return;
    }
    
    const img = new Image();
    
    const onLoad = () => {
      setIsLoaded(true);
    };
    
    const onError = () => {
      setError(true);
    };
    
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
    img.src = src;
    
    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [src]);
  
  // Determine which src to use
  const imageSrc = error && fallbackSrc ? fallbackSrc : src;
  
  return (
    <div className={cn(aspectRatio, "relative overflow-hidden rounded-md bg-muted", className)}>
      {!isLoaded && (
        <Skeleton className={cn("absolute inset-0", loadingHeight)} />
      )}
      
      <img
        ref={imageRef}
        src={imageSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setError(true);
          setIsLoaded(true);
        }}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300", 
          isLoaded ? "opacity-100" : "opacity-0",
          enableGPUAcceleration ? "transform-gpu backface-visibility-hidden will-change-transform" : ""
        )}
        {...props}
      />
    </div>
  );
}