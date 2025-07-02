
import OrderSystemTest from '@/components/test/OrderSystemTest';
import UnifiedHeader from '@/components/navigation/UnifiedHeader';
import EnhancedFooter from '@/components/common/EnhancedFooter';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
      <UnifiedHeader />
      <div className="py-20">
        <OrderSystemTest />
      </div>
      <EnhancedFooter />
    </div>
  );
}
