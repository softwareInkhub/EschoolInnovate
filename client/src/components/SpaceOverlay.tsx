import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../hooks/use-window-size';

interface SpaceOverlayProps {
  className?: string;
  starCount?: number;
  meteorCount?: number;
  meteorFrequency?: number; // Seconds between meteor animations
  isActive?: boolean;
}

/**
 * A dynamic space-themed overlay with stars and shooting stars/meteors
 * - Optimized for performance with canvas rendering
 * - Responsive to window size changes
 * - Customizable star and meteor count
 */
export function SpaceOverlay({
  className = '',
  starCount = 200,
  meteorCount = 5,
  meteorFrequency = 5,
  isActive = true
}: SpaceOverlayProps) {
  const { width, height } = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const animationRef = useRef<number>(0);
  
  // Generate stars with different sizes and opacities
  useEffect(() => {
    if (!width || !height) return;
    
    const newStars: Star[] = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.003
    }));
    
    setStars(newStars);
  }, [width, height, starCount]);
  
  // Handle meteor creation on a timer
  useEffect(() => {
    if (!isActive || !width || !height) return;
    
    // Initial meteors
    const initialMeteors: Meteor[] = Array.from({ length: Math.min(2, meteorCount) }).map(() => 
      createMeteor(width, height)
    );
    setMeteors(initialMeteors);
    
    // Setup timer for new meteors
    const meteorTimer = setInterval(() => {
      if (Math.random() > 0.6) { // Only 40% chance of meteor to make it feel more random
        setMeteors(prev => {
          // If we have too many meteors, remove the oldest ones
          const newMeteors = prev.length >= meteorCount 
            ? [...prev.slice(1), createMeteor(width, height)]
            : [...prev, createMeteor(width, height)];
          return newMeteors;
        });
      }
    }, meteorFrequency * 1000);
    
    return () => clearInterval(meteorTimer);
  }, [isActive, width, height, meteorCount, meteorFrequency]);
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || !isActive || !width || !height) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    
    // Render function
    let frame = 0;
    const render = () => {
      if (!ctx) return;
      
      // Clear canvas with almost full transparency to create trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw stars
      stars.forEach((star, index) => {
        // Update star twinkle
        const twinkle = Math.sin(frame * star.twinkleSpeed + index) * 0.3 + 0.7;
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * twinkle, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();
      });
      
      // Update and draw meteors
      const updatedMeteors: Meteor[] = [];
      
      meteors.forEach(meteor => {
        // Update meteor position
        meteor.x += meteor.speed * meteor.directionX;
        meteor.y += meteor.speed * meteor.directionY;
        meteor.life -= 0.01;
        
        // Only keep meteors that are still on screen and alive
        if (
          meteor.x > -100 && 
          meteor.x < width + 100 && 
          meteor.y > -100 && 
          meteor.y < height + 100 &&
          meteor.life > 0
        ) {
          updatedMeteors.push(meteor);
          
          // Draw meteor
          ctx.beginPath();
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(
            meteor.x - meteor.speed * meteor.directionX * 10, 
            meteor.y - meteor.speed * meteor.directionY * 10
          );
          
          // Create gradient for meteor tail
          const gradient = ctx.createLinearGradient(
            meteor.x, meteor.y,
            meteor.x - meteor.speed * meteor.directionX * 10,
            meteor.y - meteor.speed * meteor.directionY * 10
          );
          
          gradient.addColorStop(0, `rgba(255, 240, 200, ${meteor.life})`);
          gradient.addColorStop(0.3, `rgba(255, 210, 120, ${meteor.life * 0.6})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = meteor.size;
          ctx.stroke();
          
          // Draw meteor head (brighter point)
          ctx.beginPath();
          ctx.arc(meteor.x, meteor.y, meteor.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${meteor.life})`;
          ctx.fill();
        }
      });
      
      // Update meteors state if needed (only when some are removed)
      if (updatedMeteors.length !== meteors.length) {
        setMeteors(updatedMeteors);
      }
      
      frame++;
      
      // Continue animation loop
      animationRef.current = requestAnimationFrame(render);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(render);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isActive, stars, meteors, width, height]);
  
  if (!isActive) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.8 }}
    />
  );
}

// Helper function to create a new meteor
function createMeteor(width: number = window.innerWidth, height: number = window.innerHeight): Meteor {
  // Determine meteor properties
  const size = Math.random() * 3 + 1;
  const speed = Math.random() * 5 + 8;
  
  // Start position - top half of the screen, anywhere horizontally
  const startX = Math.random() * width;
  const startY = -50; // Start above the visible area
  
  // Direction - diagonal down to the right or left
  const directionX = (Math.random() - 0.5) * 2; // -1 to 1
  const directionY = Math.random() * 0.5 + 0.5; // 0.5 to 1 (always down)
  
  return {
    x: startX,
    y: startY,
    size,
    speed,
    directionX,
    directionY,
    life: 1 // Full life to start, will decrease over time
  };
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

interface Meteor {
  x: number;
  y: number;
  size: number;
  speed: number;
  directionX: number;
  directionY: number;
  life: number; // 0-1 value that decreases over time
}