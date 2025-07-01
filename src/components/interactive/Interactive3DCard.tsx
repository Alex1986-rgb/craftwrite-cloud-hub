
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Zap, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/hooks/useAnalytics';

interface Interactive3DCardProps {
  title: string;
  description: string;
  price?: string;
  badge?: string;
  features?: string[];
  rating?: number;
  image?: string;
  gradient?: string;
  onAction?: () => void;
  actionText?: string;
  className?: string;
}

export default function Interactive3DCard({
  title,
  description,
  price,
  badge,
  features = [],
  rating = 5,
  image,
  gradient = 'from-blue-500 to-purple-600',
  onAction,
  actionText = 'Заказать',
  className
}: Interactive3DCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { trackInteraction } = useAnalytics();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * -10;
    const rotateY = (x - centerX) / centerX * 10;
    
    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    trackInteraction('3d_card', 'hover', { title });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleCardClick = () => {
    trackInteraction('3d_card', 'click', { title });
    onAction?.();
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative perspective-1000 group cursor-pointer",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <Card
        className={cn(
          "relative transition-all duration-500 ease-out transform-gpu",
          "hover:shadow-2xl hover:shadow-blue-500/25",
          "border-0 bg-gradient-to-br from-white to-gray-50/50",
          "backdrop-blur-sm overflow-hidden"
        )}
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg) translateZ(20px)` 
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
        }}
      >
        {/* Animated background gradient */}
        <div 
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
            `bg-gradient-to-br ${gradient}`
          )}
        />
        
        {/* Floating elements */}
        <div className="absolute top-4 right-4 flex gap-2">
          {badge && (
            <Badge className={cn(
              "bg-gradient-to-r text-white border-0 shadow-lg",
              gradient,
              "transform transition-all duration-300",
              isHovered ? "scale-110 rotate-3" : ""
            )}>
              {badge}
            </Badge>
          )}
          
          {rating && (
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs font-bold">{rating}</span>
            </div>
          )}
        </div>

        {/* Particle effect overlay */}
        <div className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
        </div>

        <CardHeader className="relative z-10 pb-4">
          <CardTitle className={cn(
            "text-xl font-bold transition-all duration-300",
            isHovered ? "text-blue-600 scale-105" : "text-gray-900"
          )}>
            {title}
          </CardTitle>
          
          {price && (
            <div className={cn(
              "text-2xl font-bold transition-all duration-300",
              `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`,
              isHovered ? "scale-110" : ""
            )}>
              {price}
            </div>
          )}
        </CardHeader>

        <CardContent className="relative z-10 space-y-4">
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>

          {features.length > 0 && (
            <div className="space-y-2">
              {features.slice(0, 3).map((feature, index) => (
                <div 
                  key={index}
                  className={cn(
                    "flex items-center gap-2 text-sm transition-all duration-300",
                    isHovered ? "translate-x-2" : ""
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full bg-gradient-to-r",
                    gradient
                  )} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          )}

          <Button
            className={cn(
              "w-full group relative overflow-hidden transition-all duration-500",
              `bg-gradient-to-r ${gradient}`,
              "hover:shadow-lg hover:shadow-blue-500/25",
              isHovered ? "scale-105 translate-y-[-2px]" : ""
            )}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {actionText}
              <ArrowRight className={cn(
                "w-4 h-4 transition-transform duration-300",
                isHovered ? "translate-x-1" : ""
              )} />
            </span>
            
            {/* Button shine effect */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
              "transform -skew-x-12 transition-transform duration-700",
              isHovered ? "translate-x-full" : "-translate-x-full"
            )} />
          </Button>
        </CardContent>

        {/* 3D depth indicator */}
        <div className={cn(
          "absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r transition-all duration-500",
          gradient,
          isHovered ? "h-2 shadow-lg" : "h-1"
        )} />
      </Card>

      {/* Shadow projection */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/10 blur-xl transition-all duration-500 -z-10",
          isHovered ? "scale-110 opacity-50" : "scale-100 opacity-20"
        )}
        style={{
          transform: `translate(${mousePosition.y * 2}px, ${mousePosition.x * 2 + 10}px)`
        }}
      />
    </div>
  );
}
