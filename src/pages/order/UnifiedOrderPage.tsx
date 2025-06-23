
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import EnhancedUnifiedOrderForm from '@/components/order/EnhancedUnifiedOrderForm';
import { getServiceConfig } from '@/data/serviceFormConfigs';
import { Clock, FileText, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function UnifiedOrderPage() {
  const params = useParams();
  const serviceId = params.serviceId || params['*']?.split('/')[0];
  
  // Если serviceId не найден, пытаемся извлечь из pathname
  if (!serviceId) {
    const pathname = window.location.pathname;
    const match = pathname.match(/\/order\/([^\/]+)/);
    if (match) {
      const extractedServiceId = match[1];
      return <UnifiedOrderPageContent serviceId={extractedServiceId} />;
    }
    return <Navigate to="/services" replace />;
  }

  return <UnifiedOrderPageContent serviceId={serviceId} />;
}

function UnifiedOrderPageContent({ serviceId }: { serviceId: string }) {
  const serviceConfig = getServiceConfig(serviceId);
  
  if (!serviceConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Услуга не найдена</h1>
            <p className="text-gray-600">Конфигурация для услуги "{serviceId}" не найдена.</p>
            <p className="text-sm text-gray-500 mt-2">Доступные услуги: seo-article, landing-page, website-texts, social-media, email-campaigns</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
      <div className="container mx-auto px-4 py-8">
        <EnhancedUnifiedOrderForm serviceId={serviceId} />
        
        {/* Информационные блоки в футере */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Качественный контент</h3>
              <p className="text-sm text-gray-600">Профессиональные тексты от экспертов</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Быстрые сроки</h3>
              <p className="text-sm text-gray-600">От 1 дня в зависимости от сложности</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Гарантия качества</h3>
              <p className="text-sm text-gray-600">Бесплатные правки в течение 7 дней</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
