import { ReactNode } from 'react';
import UnifiedHeader from '@/components/navigation/UnifiedHeader';
import ModernFooter from '@/components/common/ModernFooter';

interface GlobalLayoutProps {
  children: ReactNode;
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
      <UnifiedHeader />
      <main className="flex-1">
        {children}
      </main>
      <ModernFooter />
    </div>
  );
}