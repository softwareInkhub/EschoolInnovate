import { useState, useEffect } from 'react';

// Custom hook to get and track window dimensions
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: typeof window !== 'undefined' ? window.innerWidth : undefined,
    height: typeof window !== 'undefined' ? window.innerHeight : undefined,
  });
  
  useEffect(() => {
    // Only execute this code client-side
    if (typeof window === 'undefined') {
      return;
    }

    let resizeTimeoutId: number | null = null;

    // Function to update window size in state
    function handleResize() {
      // Debounce resize
      if (resizeTimeoutId) {
        window.cancelAnimationFrame(resizeTimeoutId);
      }
      
      // Use requestAnimationFrame for smoother updates
      resizeTimeoutId = window.requestAnimationFrame(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    }
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Initial call to set correct size
    handleResize();
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutId) {
        window.cancelAnimationFrame(resizeTimeoutId);
      }
    };
  }, []);
  
  return windowSize;
}