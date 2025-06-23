
import { ReactNode } from 'react';
import OptimizedHeader from '@/components/common/OptimizedHeader';
import Footer from '@/components/common/Footer';
import FloatingOrderButton from '@/components/common/FloatingOrderButton';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <OptimizedHeader />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingOrderButton />
    </div>
  );
}
