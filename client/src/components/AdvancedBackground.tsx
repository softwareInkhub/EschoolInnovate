import { useState, useEffect } from 'react';
import { BackgroundAnimation } from './BackgroundAnimation';
import { EnhancedBackgroundAnimation } from './EnhancedBackgroundAnimation';
import { AnimatedGradientBackground } from './AnimatedGradientBackground';

export type BackgroundVariant = 'simple' | 'enhanced' | 'gradient' | 'combined';

interface AdvancedBackgroundProps {
  variant?: BackgroundVariant;
  className?: string;
  particleColor?: string;
  gradientColors?: string[];
  interactive?: boolean;
  gradientOpacity?: number;
  particleDensity?: number;
  colorTheme?: 'gold' | 'blue' | 'purple' | 'green';
  performanceMode?: boolean; // If true, will use lighter effects on low-end devices
}

/**
 * Versatile, performant background component that combines multiple effects
 * - Automatically detects device performance and adjusts effects
 * - Multiple variant options for different visual styles
 * - Smooth transitions between states
 */
export function AdvancedBackground({
  variant = 'enhanced',
  className = '',
  particleColor = 'rgba(255, 215, 0, 0.5)',
  gradientColors = ['#10101c', '#20143c', '#101020', '#142036'],
  interactive = true,
  gradientOpacity = 0.15,
  particleDensity = 0.08,
  colorTheme = 'gold',
  performanceMode = false,
}: AdvancedBackgroundProps) {
  // State to track if we should use performance mode
  const [usePerformanceMode, setUsePerformanceMode] = useState(performanceMode);
  
  // Detect device performance
  useEffect(() => {
    if (performanceMode) {
      setUsePerformanceMode(true);
      return;
    }
    
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Check for low-end devices that might struggle with effects
    const isLowEndDevice = () => {
      // Check for mobile or tablet
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      
      // Check for low memory (if available in browser)
      const hasLowMemory = !!(
        // @ts-ignore - deviceMemory is not in all browsers
        navigator.deviceMemory && navigator.deviceMemory < 4
      );
      
      // Check processor cores (if available)
      const hasLowCores = !!(
        navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
      );
      
      return isMobile || hasLowMemory || hasLowCores;
    };
    
    // Set performance mode if needed
    setUsePerformanceMode(isLowEndDevice());
  }, [performanceMode]);
  
  // Render the appropriate background variant
  const renderBackground = () => {
    // Always use simple variant in performance mode
    const effectiveVariant = usePerformanceMode ? 'simple' : variant;
    
    switch (effectiveVariant) {
      case 'simple':
        return (
          <BackgroundAnimation
            className={className}
            color={particleColor}
            density={particleDensity * 0.6} // Lower density for simple version
            speed={0.3}
          />
        );
      
      case 'enhanced':
        return (
          <EnhancedBackgroundAnimation
            className={className}
            interactive={interactive}
            colorTheme={colorTheme}
            density={particleDensity}
            noiseIntensity={0.5}
          />
        );
      
      case 'gradient':
        return (
          <AnimatedGradientBackground
            className={className}
            colors={gradientColors}
            opacity={gradientOpacity}
            blur={30}
          />
        );
      
      case 'combined':
        return (
          <>
            <AnimatedGradientBackground
              className={className}
              colors={gradientColors}
              opacity={gradientOpacity}
              blur={50}
            />
            <EnhancedBackgroundAnimation
              className={className}
              interactive={interactive}
              colorTheme={colorTheme}
              density={particleDensity * 0.8} // Slightly lower density when combined
            />
          </>
        );
      
      default:
        return (
          <BackgroundAnimation
            className={className}
            color={particleColor}
            density={particleDensity * 0.6}
          />
        );
    }
  };
  
  return renderBackground();
}