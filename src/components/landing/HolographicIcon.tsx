import { LucideIcon } from 'lucide-react';

interface HolographicIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  animated?: boolean;
}

export default function HolographicIcon({ 
  icon: Icon, 
  size = 32, 
  className = "", 
  animated = true 
}: HolographicIconProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Glow layers */}
      <div className="absolute inset-0 opacity-50">
        <Icon 
          size={size} 
          className="w-full h-full text-cyan-400 blur-sm" 
        />
      </div>
      <div className="absolute inset-0 opacity-30">
        <Icon 
          size={size} 
          className="w-full h-full text-purple-400 blur-md" 
        />
      </div>
      
      {/* Main icon with holographic effect */}
      <div className={`relative ${animated ? 'animate-pulse' : ''}`}>
        <Icon 
          size={size} 
          className="w-full h-full text-gradient-holographic drop-shadow-lg" 
          style={{
            filter: 'drop-shadow(0 0 10px hsl(var(--ai-blue)))'
          }}
        />
      </div>
      
      {/* Reflection effect */}
      <div className="absolute top-full left-0 w-full h-full opacity-20 transform scale-y-[-1] origin-top">
        <Icon 
          size={size} 
          className="w-full h-full text-gradient-holographic" 
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
          }}
        />
      </div>
    </div>
  );
}