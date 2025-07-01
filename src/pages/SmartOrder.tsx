
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SmartOrderWizard from '@/components/smart-order/SmartOrderWizard';
import ComprehensiveSeo from '@/components/seo/ComprehensiveSeo';

export default function SmartOrder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || undefined;

  const handleOrderComplete = (orderId: string) => {
    navigate(`/order-success?id=${orderId}`);
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <ComprehensiveSeo
        title="Заказать текст онлайн - Умная форма заказа | CopyPro Cloud"
        description="Закажите качественный текст за 3 минуты. Автоматический расчёт цены, выбор сроков, гарантия результата. От 2000₽. Начните прямо сейчас!"
        keywords="заказать текст, копирайтер онлайн, написать статью, заказать контент"
      />
      
      <div className="container mx-auto px-4 py-8">
        <SmartOrderWizard
          preselectedService={preselectedService}
          onOrderComplete={handleOrderComplete}
          onClose={handleClose}
        />
      </div>
    </main>
  );
}
