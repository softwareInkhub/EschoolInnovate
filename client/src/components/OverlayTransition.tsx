import { useState, useEffect } from 'react';

interface OverlayTransitionProps {
  className?: string;
  duration?: number; // Duration in milliseconds
  pattern?: 'lines' | 'shapes' | 'dots' | 'grid';
  color?: string;
  delay?: number; // Delay before starting in milliseconds
  onComplete?: () => void;
}

/**
 * A high-performance overlay transition effect
 * - CSS-based animations for optimal performance
 * - Multiple pattern options
 * - Callback on completion
 * - Can be used for page transitions or visual effects
 */
export function OverlayTransition({
  className = '',
  duration = 1200,
  pattern = 'lines',
  color = '#FFD700', // Gold color
  delay = 0,
  onComplete
}: OverlayTransitionProps) {
  const [isActive, setIsActive] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  
  // Render the appropriate pattern
  const renderPattern = () => {
    switch (pattern) {
      case 'lines':
        return (
          <div className="absolute inset-0 flex flex-col justify-between overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="transform-gpu h-1 bg-current w-full"
                style={{
                  transform: `translateX(${isActive ? '0%' : '-100%'})`,
                  transition: `transform ${duration * 0.8}ms cubic-bezier(0.7, 0, 0.3, 1) ${delay + (i * 50)}ms`
                }}
              />
            ))}
          </div>
        );
        
      case 'shapes':
        return (
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 overflow-hidden">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="transform-gpu bg-current rounded-full"
                style={{
                  transform: `scale(${isActive ? 1 : 0})`,
                  transition: `transform ${duration * 0.7}ms cubic-bezier(0.3, 0, 0.7, 1) ${delay + (Math.random() * 300)}ms`
                }}
              />
            ))}
          </div>
        );
        
      case 'dots':
        return (
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-2 p-4 overflow-hidden">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="transform-gpu bg-current rounded-full"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: `scale(${isActive ? 1 : 0})`,
                  transition: `all ${duration * 0.6}ms cubic-bezier(0.2, 0, 0.8, 1) ${delay + (i % 10) * 30 + Math.floor(i / 10) * 20}ms`
                }}
              />
            ))}
          </div>
        );
        
      case 'grid':
      default:
        return (
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), 
                               linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              opacity: isActive ? 1 : 0,
              transform: `scale(${isActive ? 1 : 1.5})`,
              transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
            }}
          />
        );
    }
  };
  
  // Handle animation lifecycle
  useEffect(() => {
    if (!isActive) return;
    
    // Start transition after delay
    const timer = setTimeout(() => {
      setIsActive(false);
    }, delay);
    
    // Remove from DOM after animation completes
    const cleanupTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, delay + duration + 100); // Add a little buffer
    
    return () => {
      clearTimeout(timer);
      clearTimeout(cleanupTimer);
    };
  }, [isActive, delay, duration, onComplete]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 pointer-events-none text-${color} ${className}`}
      aria-hidden="true"
    >
      {renderPattern()}
    </div>
  );
}