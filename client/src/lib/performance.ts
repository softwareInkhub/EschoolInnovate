import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * Custom hook for debouncing values
 * Useful for expensive operations like search inputs
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook to defer the rendering of a component until after the initial render 
 * to improve perceived performance and initial load time
 */
export function useDeferredRender(delay: number = 100): boolean {
  const [shouldRender, setShouldRender] = useState(false);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldRender(true);
    }, delay);
    
    return () => clearTimeout(timeoutId);
  }, [delay]);
  
  return shouldRender;
}

/**
 * Hook for detecting if the component is visible in the viewport
 * Use this for lazy-loading components and implementing infinite scroll
 */
export function useInView(options?: IntersectionObserverInit): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);
  
  return [ref, isInView];
}

/**
 * Hook for throttling a function call
 * Use this for scroll events, window resizing, etc.
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 200
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  const lastRan = useRef(Date.now());
  
  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastRan.current >= delay) {
        lastRan.current = now;
        return callback(...args);
      }
      
      return undefined;
    },
    [callback, delay]
  );
}

/**
 * Utility to memoize expensive calculations between renders
 * @param calculate The expensive calculation function
 * @param dependencies Array of dependencies that trigger recalculation
 */
export function useMemoizedCalculation<T>(
  calculate: () => T,
  dependencies: React.DependencyList
): T {
  const [result, setResult] = useState<T>(calculate);
  
  useEffect(() => {
    const newResult = calculate();
    setResult(newResult);
  }, dependencies);
  
  return result;
}

/**
 * Hook to only render children when they're needed (when a parent container is visible)
 */
export function useOptimizedRender(threshold: number = 0.1): [React.RefObject<HTMLDivElement>, boolean] {
  return useInView({
    rootMargin: '200px',
    threshold
  });
}