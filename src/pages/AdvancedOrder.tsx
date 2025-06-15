
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVICES } from '@/data/services';
import { Service } from '@/data/types/service';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import AdvancedOrderSystem from '@/components/order/advanced/AdvancedOrderSystem';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function AdvancedOrder() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    if (slug) {
      const service = SERVICES.find(s => s.slug === slug);
      setSelectedService(service || null);
    }
  }, [slug]);

  const handleBack = () => {
    navigate('/order');
  };

  if (!selectedService) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto" />
              <h1 className="text-3xl font-bold text-slate-900">Услуга не найдена</h1>
              <p className="text-slate-600">
                Запрашиваемая услуга не существует или была удалена.
              </p>
              <Button onClick={handleBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Вернуться к каталогу
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button variant="outline" onClick={handleBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              К каталогу услуг
            </Button>
          </div>
          
          <AdvancedOrderSystem 
            selectedService={selectedService}
            onClose={handleBack}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
