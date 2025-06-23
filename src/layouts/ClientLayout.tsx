
import React, { ReactNode } from 'react';
import UnifiedHeader from '@/components/navigation/UnifiedHeader';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <UnifiedHeader />
      <main>
        {children}
      </main>
    </div>
  );
}
