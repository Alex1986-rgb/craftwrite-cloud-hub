
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, CheckCircle, ArrowRight, Calculator } from 'lucide-react';

export default function SmartOrderCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Умная форма заказа
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Закажите идеальный текст за 3 минуты
          </h2>
          
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Революционная система заказа с автоматическим расчётом цены,<br />
            умными подсказками и гарантией результата
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-4 text-center">
                <Calculator className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Точная цена сразу</h4>
                <p className="text-sm opacity-90">
                  Калькулятор рассчитает стоимость автоматически
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Быстрое оформление</h4>
                <p className="text-sm opacity-90">
                  Заполните форму всего за 3 минуты
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Гарантия качества</h4>
                <p className="text-sm opacity-90">
                  100% уникальность и соответствие ТЗ
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main CTA */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                <Link to="/smart-order">
                  Заказать текст за 3 минуты
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
              >
                <Link to="/order/seo-article-modern">
                  <Sparkles className="w-5 h-5 mr-2" />
                  SEO-статья с AI
                </Link>
              </Button>
            </div>
            
            <p className="text-sm opacity-75">
              Никаких скрытых платежей • Прозрачное ценообразование • Быстрый старт
            </p>
          </div>

          {/* Social proof */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Более 2000 заказов</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Средняя оценка 4.9/5</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Доставка в срок 98%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
