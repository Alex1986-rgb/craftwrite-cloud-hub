
import { TooltipProvider } from '@/components/ui/tooltip';
import { ReactNode } from 'react';

interface TooltipWrapperProps {
  children: ReactNode;
}

export default function TooltipWrapper({ children }: TooltipWrapperProps) {
  return (
    <TooltipProvider>
      {children}
    </TooltipProvider>
  );
}
