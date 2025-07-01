
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface MobileOptimizedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'mobile';
  loading?: boolean;
  children: React.ReactNode;
}

export const MobileOptimizedButton = React.forwardRef<HTMLButtonElement, MobileOptimizedButtonProps>(
  ({ className, variant = 'default', size = 'default', loading = false, children, disabled, ...props }, ref) => {
    // Handle mobile size internally, don't pass it to Button component
    const buttonSize = size === 'mobile' ? 'default' : size;
    
    return (
      <Button
        ref={ref}
        variant={variant}
        size={buttonSize}
        disabled={disabled || loading}
        className={cn(
          // Base mobile optimizations
          'touch-target min-h-[44px] min-w-[44px]',
          // Enhanced touch feedback
          'active:scale-95 transition-transform duration-150',
          // Mobile-specific sizing
          size === 'mobile' && 'h-12 px-6 text-base font-semibold',
          // Loading state
          loading && 'pointer-events-none',
          // Improved tap targets
          'focus-visible:ring-2 focus-visible:ring-offset-2',
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Button>
    );
  }
);

MobileOptimizedButton.displayName = 'MobileOptimizedButton';
