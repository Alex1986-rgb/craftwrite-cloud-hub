
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface OrderFormLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  navigation: ReactNode;
  variant?: 'public' | 'client';
}

export function OrderFormLayout({ 
  children, 
  sidebar, 
  navigation, 
  variant = 'public' 
}: OrderFormLayoutProps) {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="lg:col-span-3">
          <Card className={`p-6 md:p-8 shadow-2xl border-0 ${
            variant === 'client' 
              ? 'glass-card' 
              : 'bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm'
          }`}>
            <div className="min-h-[400px]">
              {children}
            </div>
            {navigation}
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {sidebar}
          </div>
        </div>
      </div>
    </div>
  );
}
