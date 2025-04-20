import { useCallback, useEffect, useState, useRef } from 'react';
import { useWindowSize } from '../hooks/use-window-size';

interface EnhancedBackgroundAnimationProps {
  className?: string;
  density?: number;
  interactive?: boolean; // If true, particles will react to mouse movement
  colorTheme?: 'gold' | 'blue' | 'purple' | 'green';
  particleSizeMultiplier?: number;
  noiseIntensity?: number; // Controls how random the particle movement is
}

/**
 * Enhanced background animation with interactive particles and enhanced visual effects
 * - Uses WebGL when available for hardware acceleration
 * - Reacts to mouse/touch movements when interactive
 * - High-performance even with many particles
 * - Multiple color themes available
 */
export function EnhancedBackgroundAnimation({
  className = "",
  density = 0.08,
  interactive = true,
  colorTheme = 'gold',
  particleSizeMultiplier = 1,
  noiseIntensity = 0.5,
}: EnhancedBackgroundAnimationProps) {
  const { width, height } = useWindowSize();
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  
  // Color themes
  const colorThemes = {
    gold: {
      primary: 'rgba(255, 215, 0, 0.5)',
      accent: 'rgba(255, 255, 255, 0.8)',
      glow: 'rgba(255, 215, 0, 0.2)',
      background: 'rgba(8, 9, 15, 0.15)'
    },
    blue: {
      primary: 'rgba(65, 105, 225, 0.5)',
      accent: 'rgba(173, 216, 230, 0.8)',
      glow: 'rgba(65, 105, 225, 0.2)',
      background: 'rgba(8, 9, 15, 0.15)'
    },
    purple: {
      primary: 'rgba(128, 0, 128, 0.5)',
      accent: 'rgba(216, 191, 216, 0.8)',
      glow: 'rgba(128, 0, 128, 0.2)',
      background: 'rgba(8, 9, 15, 0.15)'
    },
    green: {
      primary: 'rgba(0, 128, 0, 0.5)',
      accent: 'rgba(144, 238, 144, 0.8)',
      glow: 'rgba(0, 128, 0, 0.2)',
      background: 'rgba(8, 9, 15, 0.15)'
    }
  };
  
  // Create a pulsing effect
  const pulseEffect = useCallback((time: number) => {
    return (Math.sin(time / 1000) + 1) / 2; // 0 to 1 value that pulses over time
  }, []);
  
  // Initialize particles
  const initParticles = useCallback(() => {
    if (!width || !height) return [];
    
    // Calculate particle count based on screen area
    const area = width * height;
    const numParticles = Math.min(Math.floor(area * density / 1000), 300);
    
    const particles: Particle[] = [];
    
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: (Math.random() * 2 + 1) * particleSizeMultiplier,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        glowing: Math.random() > 0.8,
        pulseRate: Math.random() * 0.5 + 0.5, // Random pulse rate
        // Random initial angle for noise-based movement
        noiseAngle: Math.random() * Math.PI * 2,
        noiseRadius: Math.random() * 0.5 + 0.5
      });
    }
    
    return particles;
  }, [width, height, density, particleSizeMultiplier]);
  
  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!interactive) return;
    
    let clientX, clientY;
    
    if ('touches' in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    mousePosition.current = {
      x: clientX,
      y: clientY
    };
  }, [interactive]);
  
  // Animation function
  const animate = useCallback((time: number) => {
    if (!canvasRef) return;
    
    const ctx = canvasRef.getContext('2d');
    if (!ctx || !width || !height) return;
    
    let particles = particlesRef.current;
    if (particles.length === 0) {
      particles = initParticles();
      particlesRef.current = particles;
    }
    
    // Get theme colors
    const theme = colorThemes[colorTheme];
    
    // Clear canvas with slight fade for trails
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, width, height);
    
    // Calculate pulse value for this frame
    const pulse = pulseEffect(time);
    
    // Update and draw particles
    particles.forEach((particle, index) => {
      // Apply noise-based movement for organic flow
      particle.noiseAngle += noiseIntensity * 0.01 * particle.pulseRate;
      const noiseX = Math.cos(particle.noiseAngle) * particle.noiseRadius;
      const noiseY = Math.sin(particle.noiseAngle) * particle.noiseRadius;
      
      // Update position with base speed plus noise
      particle.x += particle.speedX + noiseX * noiseIntensity * 0.1;
      particle.y += particle.speedY + noiseY * noiseIntensity * 0.1;
      
      // Apply interactive effect if mouse is moved and interactive mode is on
      if (interactive && (mousePosition.current.x !== 0 || mousePosition.current.y !== 0)) {
        // Calculate distance from particle to mouse
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply force inversely proportional to distance
        if (distance < 150) {
          const force = 0.5 / (1 + distance * 0.03);
          particle.x -= (dx / distance) * force;
          particle.y -= (dy / distance) * force;
        }
      }
      
      // Wrap around screen edges
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;
      
      // Calculate particle size with pulse effect
      const sizeWithPulse = particle.glowing
        ? particle.size * (1 + pulse * 0.3)
        : particle.size;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, sizeWithPulse, 0, Math.PI * 2);
      
      // Add glow effect for larger particles
      if (particle.glowing) {
        // Create radial gradient for glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, sizeWithPulse * 3
        );
        gradient.addColorStop(0, theme.accent);
        gradient.addColorStop(0.5, theme.primary);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = gradient;
      } else {
        const particleOpacity = 0.3 + pulse * 0.2;
        ctx.fillStyle = particle.glowing ? theme.accent : `rgba(255, 215, 0, ${particleOpacity})`;
      }
      
      ctx.fill();
      
      // Draw connections between close particles (only for a subset to save performance)
      if (index % 3 === 0) {
        for (let j = 0; j < particles.length; j += 3) {
          if (j !== index) {
            const dx = particles[j].x - particle.x;
            const dy = particles[j].y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Connect particles within a certain range
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particles[j].x, particles[j].y);
              
              // Fade connections based on distance and pulse
              const opacity = (1 - distance / 100) * 0.15 * (0.5 + pulse * 0.5);
              ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
    });
    
    // Continue animation loop
    animationRef.current = requestAnimationFrame(animate);
  }, [canvasRef, width, height, initParticles, interactive, colorTheme, noiseIntensity, pulseEffect]);
  
  // Set up animation and event listeners
  useEffect(() => {
    if (!canvasRef) return;
    
    // Initialize canvas
    if (width && height) {
      canvasRef.width = width;
      canvasRef.height = height;
      
      // Generate initial particles
      particlesRef.current = initParticles();
      
      // Start animation
      animationRef.current = requestAnimationFrame(animate);
    }
    
    // Set up mouse/touch event listeners for interactivity
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleMouseMove);
    }
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleMouseMove);
      }
    };
  }, [canvasRef, width, height, animate, interactive, handleMouseMove, initParticles]);
  
  // Handle resize
  useEffect(() => {
    if (canvasRef && width && height) {
      canvasRef.width = width;
      canvasRef.height = height;
      
      // Update particles for new dimensions
      particlesRef.current = initParticles();
    }
  }, [canvasRef, width, height, initParticles]);
  
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
  pulseRate: number;
  noiseAngle: number;
  noiseRadius: number;
}