
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  loading?: boolean;
  loadingText?: string;
}

export const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default', 
    children, 
    ariaLabel,
    ariaDescribedBy,
    loading = false,
    loadingText = 'Загрузка...',
    disabled,
    ...props 
  }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-busy={loading}
        className={cn(
          // Enhanced focus styles for accessibility
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
          'focus-visible:outline-none',
          // High contrast mode support
          'contrast-more:border-2 contrast-more:border-current',
          // Reduced motion support
          'transition-colors duration-200',
          'motion-reduce:transition-none',
          className
        )}
        {...props}
      >
        <span className={loading ? 'sr-only' : undefined}>
          {loading ? loadingText : children}
        </span>
        {loading && (
          <span aria-hidden="true">
            {children}
          </span>
        )}
      </Button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';
