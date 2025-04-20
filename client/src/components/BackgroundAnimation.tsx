import { useCallback, useEffect, useState } from 'react';
import { useWindowSize } from '../hooks/use-window-size';

interface BackgroundAnimationProps {
  className?: string;
  density?: number; // Number of particles per 1000 pixels squared
  speed?: number; // Animation speed multiplier
  color?: string; // Main particle color
  accent?: string; // Accent particle color (for highlights)
  static?: boolean; // If true, particles won't move (just show static particles)
}

/**
 * A high-performance background animation with particles
 * - Uses requestAnimationFrame for smooth animations
 * - Canvas-based rendering for optimal performance
 * - Responsive to window size changes
 * - Throttled to prevent performance issues
 */
export function BackgroundAnimation({
  className = "",
  density = 0.06, // Default: slightly sparse
  speed = 0.5, // Default: moderately slow
  color = "rgba(255, 215, 0, 0.5)", // Default: golden
  accent = "rgba(255, 255, 255, 0.8)", // Default: white
  static: isStatic = false,
}: BackgroundAnimationProps) {
  const { width, height } = useWindowSize();
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  
  // Setup and animation loop
  const setupAnimation = useCallback(() => {
    if (!canvasRef || !width || !height) return;
    
    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvasRef.width = width;
    canvasRef.height = height;
    
    // Calculate number of particles based on screen area and density
    const area = width * height;
    const numParticles = Math.min(Math.floor(area * density / 1000), 200); // Cap at 200 particles
    
    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        glowing: Math.random() > 0.8, // 20% particles are brighter
      });
    }
    
    // Animation frames counter for optimization
    let frameCounter = 0;
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas with a slight fade effect
      ctx.fillStyle = 'rgba(8, 9, 15, 0.2)'; // Dark background with alpha for trails
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Only update position if not static
        if (!isStatic) {
          // Update positions
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Wrap around screen edges
          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;
        }
        
        // Draw particle
        const particleColor = particle.glowing ? accent : color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });
      
      // Throttled additional effects (only every 3 frames)
      if (frameCounter % 3 === 0 && !isStatic) {
        // Draw connections between close particles (for a network effect)
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only connect particles within a certain distance
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              
              // Fade the connection based on distance
              const opacity = 1 - distance / 100;
              ctx.strokeStyle = `rgba(255, 215, 0, ${opacity * 0.1})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
      
      frameCounter++;
      
      // Continue animation loop
      if (!isStatic) {
        requestAnimationFrame(animate);
      }
    };
    
    // Start animation
    animate();
    
    // Handle static mode (just render once)
    if (isStatic) {
      // Draw static particles in a single frame
      particles.forEach(particle => {
        const particleColor = particle.glowing ? accent : color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });
    }
  }, [canvasRef, width, height, density, speed, color, accent, isStatic]);
  
  // Initialize and handle resize
  useEffect(() => {
    if (canvasRef) {
      setupAnimation();
    }
  }, [canvasRef, setupAnimation]);
  
  return (
    <canvas
      ref={setCanvasRef}
      className={`fixed inset-0 -z-10 bg-[#080915] ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  glowing: boolean;
}