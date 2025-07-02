
import OrderSystemTest from '@/components/test/OrderSystemTest';
import UnifiedHeader from '@/components/navigation/UnifiedHeader';
import EnhancedFooter from '@/components/common/EnhancedFooter';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-muted/20 to-primary/5 rounded-full blur-2xl animate-pulse opacity-30" style={{ animationDelay: '0.8s' }}></div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      <UnifiedHeader />
      <div className="py-20 relative z-10">
        <OrderSystemTest />
      </div>
      <EnhancedFooter />
    </div>
  );
}
