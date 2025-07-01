
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export const EnhancedModal: React.FC<EnhancedModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[95vw] max-h-[95vh]'
  };

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  return (
    <Dialog open={isOpen} onOpenChange={closeOnOverlayClick ? onClose : undefined}>
      <DialogContent 
        className={cn(
          'sm:max-w-md animate-in fade-in-0 zoom-in-95 duration-300',
          sizeClasses[size],
          // Mobile optimizations
          'mx-4 sm:mx-auto',
          'max-h-[90vh] overflow-y-auto',
          // Enhanced styling
          'backdrop-blur-sm bg-white/95 border border-gray-200',
          'shadow-2xl rounded-lg',
          className
        )}
        onPointerDownOutside={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
      >
        {/* Header */}
        {(title || description || showCloseButton) && (
          <DialogHeader className="relative">
            {title && (
              <DialogTitle className="text-lg font-semibold pr-8">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className="text-sm text-gray-600">
                {description}
              </DialogDescription>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute right-0 top-0 h-8 w-8 rounded-full"
                aria-label="Закрыть модальное окно"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </DialogHeader>
        )}

        {/* Content */}
        <div className="space-y-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
