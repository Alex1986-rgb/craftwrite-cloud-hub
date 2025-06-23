
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import UnifiedHeader from '@/components/navigation/UnifiedHeader';
import Footer from '@/components/common/Footer';

interface PublicLayoutProps {
  children?: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <UnifiedHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
