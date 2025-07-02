
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, FileText, Target, BarChart3 } from 'lucide-react';
import SmartOrderWizard from '@/components/smart-order/SmartOrderWizard';
import UniversalOrderSection from '@/components/landing/UniversalOrderSection';
import BulkSeoOrderForm from '@/components/smart-order/BulkSeoOrderForm';
import RichArticleSection from '@/components/blog/RichArticleSection';
import ComprehensiveSeo from '@/components/seo/ComprehensiveSeo';
import { smartOrderArticles } from '@/data/articles/smart-order-articles';

type OrderMode = 'quick' | 'bulk' | 'detailed';

export default function SmartOrder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeMode, setActiveMode] = useState<OrderMode>('quick');
  const preselectedService = searchParams.get('service') || undefined;

  const handleOrderComplete = (orderId: string) => {
    navigate(`/order-success?id=${orderId}`);
  };

  const handleClose = () => {
    navigate('/');
  };

  const modes = [
    {
      id: 'quick' as OrderMode,
      title: 'Быстрый заказ',
      description: 'Заказать текст за 3 минуты',
      icon: Zap,
      badge: 'Популярно'
    },
    {
      id: 'bulk' as OrderMode,
      title: 'Массовая SEO-генерация',
      description: 'Сотни страниц за час',
      icon: BarChart3,
      badge: 'Новое'
    },
    {
      id: 'detailed' as OrderMode,
      title: 'Детальный заказ',
      description: 'Пошаговый мастер',
      icon: Target,
      badge: 'Эксперт'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <ComprehensiveSeo
        title="Заказать текст онлайн - Умная форма заказа | CopyPro Cloud"
        description="Закажите качественный текст за 3 минуты. Автоматический расчёт цены, выбор сроков, гарантия результата. От 2000₽. Начните прямо сейчас!"
        keywords="заказать текст, копирайтер онлайн, написать статью, заказать контент, массовая seo оптимизация"
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Navigation */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-4">
              Центр заказа контента
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Выберите подходящий способ заказа
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modes.map((mode) => (
                <Button
                  key={mode.id}
                  variant={activeMode === mode.id ? 'default' : 'outline'}
                  onClick={() => setActiveMode(mode.id)}
                  className="h-auto p-6 flex flex-col items-center gap-3 relative"
                >
                  {mode.badge && (
                    <Badge className="absolute -top-2 -right-2 text-xs">
                      {mode.badge}
                    </Badge>
                  )}
                  <mode.icon className="w-8 h-8" />
                  <div className="text-center">
                    <div className="font-semibold">{mode.title}</div>
                    <div className="text-sm opacity-80">{mode.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Sections */}
        {activeMode === 'quick' && <UniversalOrderSection />}
        
        {activeMode === 'bulk' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                Массовая SEO-генерация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BulkSeoOrderForm />
            </CardContent>
          </Card>
        )}
        
        {activeMode === 'detailed' && (
          <SmartOrderWizard
            preselectedService={preselectedService}
            onOrderComplete={handleOrderComplete}
            onClose={handleClose}
          />
        )}
      </div>

      {/* Expert Articles Section */}
      <RichArticleSection 
        articles={smartOrderArticles}
        sectionTitle="Экспертные материалы по заказу контента"
        sectionDescription="Профессиональные стратегии и технологии от ведущих специалистов"
      />
    </main>
  );
}
