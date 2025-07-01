
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Star, 
  Gift, 
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/hooks/useAnalytics';

interface SmartCTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'premium' | 'urgent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  personalization?: {
    userName?: string;
    discount?: number;
    urgency?: boolean;
    popularity?: boolean;
    testimonial?: string;
  };
  analytics?: {
    category: string;
    action: string;
    label?: string;
  };
  className?: string;
  disabled?: boolean;
}

export default function SmartCTAButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  personalization,
  analytics,
  className,
  disabled = false
}: SmartCTAButtonProps) {
  const [hoverState, setHoverState] = useState(false);
  const [clickAnimation, setClickAnimation] = useState(false);
  const [urgencyTimer, setUrgencyTimer] = useState(0);
  const { trackInteraction } = useAnalytics();

  // Urgency timer effect
  useEffect(() => {
    if (personalization?.urgency) {
      const timer = setInterval(() => {
        setUrgencyTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [personalization?.urgency]);

  const handleClick = () => {
    if (disabled) return;

    setClickAnimation(true);
    setTimeout(() => setClickAnimation(false), 600);

    if (analytics) {
      trackInteraction(analytics.action, analytics.category, {
        label: analytics.label,
        variant,
        personalization: !!personalization
      });
    }

    onClick?.();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white shadow-lg hover:shadow-xl';
      case 'secondary':
        return 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-900 border border-gray-300';
      case 'premium':
        return 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black shadow-lg hover:shadow-xl border-2 border-yellow-300';
      case 'urgent':
        return 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white shadow-lg hover:shadow-xl animate-pulse';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      case 'xl':
        return 'px-12 py-6 text-xl';
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'premium':
        return Star;
      case 'urgent':
        return Clock;
      default:
        return Sparkles;
    }
  };

  const Icon = getIcon();

  const buttonContent = (
    <Button
      className={cn(
        'relative overflow-hidden font-bold rounded-xl transition-all duration-500 group',
        getVariantStyles(),
        getSizeStyles(),
        hoverState && 'scale-105 rotate-1',
        clickAnimation && 'scale-95',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      disabled={disabled}
    >
      {/* Background effects */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500',
        'transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'
      )} />

      {/* Particle effects */}
      {hoverState && (
        <>
          <div className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full animate-ping" />
          <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute bottom-3 left-8 w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        <Icon className={cn(
          'transition-all duration-300',
          size === 'sm' ? 'w-4 h-4' : size === 'xl' ? 'w-6 h-6' : 'w-5 h-5',
          hoverState && 'rotate-12 scale-110'
        )} />
        
        <span className="font-bold">{children}</span>
        
        <ArrowRight className={cn(
          'transition-all duration-300',
          size === 'sm' ? 'w-4 h-4' : size === 'xl' ? 'w-6 h-6' : 'w-5 h-5',
          hoverState && 'translate-x-1'
        )} />
      </div>

      {/* Click ripple effect */}
      {clickAnimation && (
        <div className="absolute inset-0 bg-white/30 rounded-xl animate-ping" />
      )}
    </Button>
  );

  return (
    <div className="relative group">
      {/* Personalization badges */}
      {personalization && (
        <div className="absolute -top-2 -right-2 z-20 flex flex-col gap-1">
          {personalization.discount && (
            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs animate-bounce">
              <Gift className="w-3 h-3 mr-1" />
              -{personalization.discount}%
            </Badge>
          )}
          
          {personalization.popularity && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Популярно
            </Badge>
          )}
          
          {personalization.urgency && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs animate-pulse">
              <Clock className="w-3 h-3 mr-1" />
              {Math.max(0, 300 - urgencyTimer)}с
            </Badge>
          )}
        </div>
      )}

      {/* Personal greeting */}
      {personalization?.userName && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-gray-700 shadow-lg">
            <Users className="w-3 h-3 inline mr-1" />
            Привет, {personalization.userName}!
          </div>
        </div>
      )}

      {/* Main button */}
      {href ? (
        <a href={href} className="block">
          {buttonContent}
        </a>
      ) : (
        buttonContent
      )}

      {/* Testimonial tooltip */}
      {personalization?.testimonial && (
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-gray-700 shadow-xl max-w-xs">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-xs">5.0</span>
            </div>
            <p className="text-xs italic">"{personalization.testimonial}"</p>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/95 rotate-45" />
          </div>
        </div>
      )}

      {/* Glow effect */}
      <div className={cn(
        'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-xl -z-10',
        variant === 'primary' && 'bg-gradient-to-r from-blue-500 to-purple-600',
        variant === 'premium' && 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        variant === 'urgent' && 'bg-gradient-to-r from-red-500 to-orange-500'
      )} />
    </div>
  );
}
