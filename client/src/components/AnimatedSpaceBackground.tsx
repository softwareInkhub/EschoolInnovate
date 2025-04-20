import { useState, useEffect } from 'react';
import { AdvancedBackground } from './AdvancedBackground';
import { SpaceOverlay } from './SpaceOverlay';
import { OverlayTransition } from './OverlayTransition';

interface AnimatedSpaceBackgroundProps {
  className?: string;
  transitionOnMount?: boolean;
  variant?: 'simple' | 'enhanced' | 'gradient' | 'combined';
  showSpaceOverlay?: boolean;
  showStars?: boolean;
  interactive?: boolean;
  performanceMode?: boolean;
  colorTheme?: 'gold' | 'blue' | 'purple' | 'green';
}

/**
 * A complete animated space background with multiple effects
 * - Combines particle animations, gradients, and space elements
 * - Automatically adjusts for performance
 * - Supports transitions and interactive elements
 */
export function AnimatedSpaceBackground({
  className = '',
  transitionOnMount = true,
  variant = 'enhanced',
  showSpaceOverlay = true,
  showStars = true,
  interactive = true,
  performanceMode = false,
  colorTheme = 'gold'
}: AnimatedSpaceBackgroundProps) {
  const [showTransition, setShowTransition] = useState(transitionOnMount);
  const [mounted, setMounted] = useState(false);
  
  // Handle mount animation
  useEffect(() => {
    setMounted(true);
    
    // Add a small delay to make sure transition renders first
    if (transitionOnMount) {
      const timer = setTimeout(() => {
        setShowTransition(false);
      }, 2000); // Transition will auto-hide after its animation completes
      
      return () => clearTimeout(timer);
    }
  }, [transitionOnMount]);
  
  return (
    <>
      {/* Base background with particles */}
      <AdvancedBackground
        className={className}
        variant={variant}
        interactive={interactive && !performanceMode}
        colorTheme={colorTheme}
        performanceMode={performanceMode}
      />
      
      {/* Space overlay with stars and meteors */}
      {showSpaceOverlay && mounted && (
        <SpaceOverlay 
          starCount={performanceMode ? 100 : 200}
          meteorCount={performanceMode ? 3 : 8}
          meteorFrequency={performanceMode ? 8 : 4}
        />
      )}
      
      {/* Transition effect */}
      {showTransition && (
        <OverlayTransition 
          pattern="lines"
          color="#FFD700"
          duration={1500}
          onComplete={() => setShowTransition(false)}
        />
      )}
    </>
  );
}