
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleSystemProps {
  particleCount?: number;
  colors?: string[];
  className?: string;
  interactive?: boolean;
  type?: 'floating' | 'stars' | 'network' | 'snow';
}

export default function ParticleSystem({
  particleCount = 50,
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b'],
  className,
  interactive = true,
  type = 'floating'
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isInside: false });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createParticle = (): Particle => {
      const particle: Particle = {
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 200 + 100
      };

      // Adjust based on particle type
      switch (type) {
        case 'stars':
          particle.vx = 0;
          particle.vy = 0;
          particle.size = Math.random() * 2 + 0.5;
          break;
        case 'network':
          particle.vx *= 0.5;
          particle.vy *= 0.5;
          break;
        case 'snow':
          particle.vx = Math.random() * 1 - 0.5;
          particle.vy = Math.random() * 2 + 1;
          particle.size = Math.random() * 4 + 2;
          break;
      }

      return particle;
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, createParticle);
    };

    const updateParticles = () => {
      particlesRef.current.forEach((particle, index) => {
        particle.life++;
        
        // Movement based on type
        switch (type) {
          case 'floating':
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            if (interactive && mouseRef.current.isInside) {
              const dx = mouseRef.current.x - particle.x;
              const dy = mouseRef.current.y - particle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.1;
                particle.vy += (dy / distance) * force * 0.1;
              }
            }
            break;
            
          case 'stars':
            // Twinkling effect
            particle.opacity = 0.3 + Math.sin(particle.life * 0.02) * 0.5;
            break;
            
          case 'network':
            particle.x += particle.vx;
            particle.y += particle.vy;
            break;
            
          case 'snow':
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx += Math.sin(particle.life * 0.01) * 0.1;
            break;
        }

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.offsetWidth;
        if (particle.x > canvas.offsetWidth) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.offsetHeight;
        if (particle.y > canvas.offsetHeight) particle.y = 0;

        // Respawn particles
        if (particle.life >= particle.maxLife) {
          particlesRef.current[index] = createParticle();
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particlesRef.current.forEach((particle) => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        
        switch (type) {
          case 'stars':
            // Draw star shape
            ctx.beginPath();
            const spikes = 5;
            const outerRadius = particle.size;
            const innerRadius = particle.size * 0.4;
            
            for (let i = 0; i < spikes * 2; i++) {
              const angle = (i / (spikes * 2)) * Math.PI * 2;
              const radius = i % 2 === 0 ? outerRadius : innerRadius;
              const x = particle.x + Math.cos(angle) * radius;
              const y = particle.y + Math.sin(angle) * radius;
              
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            break;
            
          default:
            // Draw circle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        
        ctx.restore();
      });

      // Draw connections for network type
      if (type === 'network') {
        ctx.strokeStyle = colors[0];
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.3;
        
        particlesRef.current.forEach((particle, i) => {
          particlesRef.current.slice(i + 1).forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.globalAlpha = (100 - distance) / 100 * 0.3;
              ctx.stroke();
            }
          });
        });
      }
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      mouseRef.current.isInside = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
    };

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    // Initialize
    resizeCanvas();
    initParticles();
    animate();

    // Add event listeners
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseenter', handleMouseEnter);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseenter', handleMouseEnter);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount, colors, interactive, type]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute inset-0 pointer-events-none",
        interactive && "pointer-events-auto",
        className
      )}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
