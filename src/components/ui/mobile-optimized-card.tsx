
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MobileOptimizedCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'elevated' | 'minimal';
  touchFeedback?: boolean;
}

export const MobileOptimizedCard = React.forwardRef<HTMLDivElement, MobileOptimizedCardProps>(
  ({ title, children, className, variant = 'default', touchFeedback = false, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          // Base mobile optimizations
          'w-full transition-all duration-200',
          // Variant styles
          variant === 'glass' && 'glass-card backdrop-blur-lg bg-white/90 border-white/20',
          variant === 'elevated' && 'shadow-lg hover:shadow-xl',
          variant === 'minimal' && 'border-none shadow-none',
          // Touch feedback
          touchFeedback && 'active:scale-[0.98] cursor-pointer',
          // Mobile spacing
          'p-4 sm:p-6 rounded-lg sm:rounded-xl',
          className
        )}
        {...props}
      >
        {title && (
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl font-semibold">{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent className={cn('space-y-4', !title && 'pt-0')}>
          {children}
        </CardContent>
      </Card>
    );
  }
);

MobileOptimizedCard.displayName = 'MobileOptimizedCard';
