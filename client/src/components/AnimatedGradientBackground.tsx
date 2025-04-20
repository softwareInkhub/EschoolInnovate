import { useEffect, useState, useRef } from 'react';

interface AnimatedGradientBackgroundProps {
  className?: string;
  colors?: string[];
  speed?: number; // Animation speed in seconds
  opacity?: number; // Background opacity
  blur?: number; // Blur amount in pixels
}

/**
 * A smooth animated gradient background component
 * - CSS-based animation for optimal performance
 * - Hardware-accelerated using transform properties
 * - Customizable colors, speed, and opacity
 */
export function AnimatedGradientBackground({
  className = "",
  colors = ["#143", "#336", "#155", "#334"], // Default dark sci-fi colors
  speed = 15, // Default animation cycle: 15 seconds
  opacity = 0.15, // Default low opacity to not distract from content
  blur = 50, // Default blur amount
}: AnimatedGradientBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const gradientRef = useRef<HTMLDivElement>(null);
  
  // Create CSS for the animated gradient
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    
    // Only run in browser
    if (typeof window === 'undefined' || !gradientRef.current) return;
    
    // Generate the gradient background
    const gradient = gradientRef.current;
    
    // Create a dynamic style element for the animation
    const styleElement = document.createElement('style');
    const animationName = `gradientAnimation-${Math.floor(Math.random() * 1000)}`;
    
    // Define the gradient positions for different keyframes
    styleElement.textContent = `
      @keyframes ${animationName} {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `;
    
    document.head.appendChild(styleElement);
    
    // Color string for linear gradient
    const colorString = colors.join(', ');
    
    // Apply styles to the gradient element
    gradient.style.background = `linear-gradient(-45deg, ${colorString})`;
    gradient.style.backgroundSize = '400% 400%';
    gradient.style.animation = `${animationName} ${speed}s ease infinite`;
    gradient.style.opacity = opacity.toString();
    gradient.style.filter = `blur(${blur}px)`;
    
    // Cleanup
    return () => {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [mounted, colors, speed, opacity, blur]);
  
  return (
    <div 
      ref={gradientRef}
      className={`fixed inset-0 -z-20 transition-opacity duration-1000 ${className}`}
      style={{
        willChange: 'background-position',
        transform: 'translateZ(0)', // Hardware acceleration
      }}
    />
  );
}