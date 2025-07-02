
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import UnifiedHeader from '@/components/navigation/UnifiedHeader';
import EnhancedFooter from '@/components/common/EnhancedFooter';
import UniversalOrderTracker from '@/components/order/UniversalOrderTracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowLeft } from 'lucide-react';
import { useSystemSettings } from '@/hooks/useSystemSettings';

export default function OrderTrackingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [foundOrder, setFoundOrder] = useState(null);
  const { getSetting } = useSystemSettings();
  
  // Get tracking settings
  const trackingEnabled = getSetting('order_tracking_enabled', true);
  const trackingDescription = getSetting('tracking_page_description', 'Отслеживайте статус вашего заказа в режиме реального времени');

  // Check if order ID is provided in URL
  useEffect(() => {
    const orderId = searchParams.get('id');
    const orderEmail = searchParams.get('email');
    
    if (orderId) {
      setSearchQuery(orderId);
      // Auto-search if ID is provided
      handleSearch(orderId);
    } else if (orderEmail) {
      setSearchQuery(orderEmail);
    }
  }, [searchParams]);

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) return;
    
    // This will be handled by the UniversalOrderTracker component
    // For now, we'll pass the search query to it
    setFoundOrder({ searchQuery: query });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (!trackingEnabled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
        <UnifiedHeader />
        <div className="py-20">
          <div className="container mx-auto px-4">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6 text-center">
                <h2 className="text-xl font-semibold mb-2">Отслеживание временно недоступно</h2>
                <p className="text-gray-600 mb-4">Функция отслеживания заказов временно отключена</p>
                <Button onClick={handleBackToHome}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  На главную
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <EnhancedFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
      <UnifiedHeader />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Отслеживание заказа</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {trackingDescription}
            </p>
          </div>

          {/* Search Section */}
          {!foundOrder && (
            <Card className="max-w-2xl mx-auto mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Найти заказ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Номер заказа или Email
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Введите номер заказа или email"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => handleSearch()}
                        disabled={!searchQuery.trim()}
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Найти
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <p>💡 Вы можете найти заказ по:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Номеру заказа (из письма-подтверждения)</li>
                      <li>Email адресу, указанному при оформлении</li>
                      <li>Номеру телефона</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Tracking Results */}
          {foundOrder && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Результаты поиска</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setFoundOrder(null)}
                >
                  Новый поиск
                </Button>
              </div>
              
              <UniversalOrderTracker searchQuery={foundOrder.searchQuery} />
            </div>
          )}

          {/* Help Section */}
          <Card className="max-w-2xl mx-auto mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Нужна помощь?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>Если вы не можете найти свой заказ:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Проверьте правильность написания email или номера заказа</li>
                  <li>Поищите письмо-подтверждение в папке "Спам"</li>
                  <li>Свяжитесь с нашей поддержкой через чат или телефон</li>
                </ul>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => navigate('/contact')}>
                    Связаться с поддержкой
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate('/faq')}>
                    Частые вопросы
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <EnhancedFooter />
    </div>
  );
}
