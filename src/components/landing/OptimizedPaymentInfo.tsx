import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CreditCard, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const PAYMENT_BENEFITS = [
  {
    icon: Shield,
    title: 'Без предоплаты',
    description: 'Платите только после получения готового результата',
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: Clock,
    title: 'Гибкие сроки',
    description: 'Оплачиваете поэтапно при больших проектах',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: CreditCard,
    title: 'Любой способ',
    description: 'Карта, перевод, наличные — как удобно',
    color: 'from-purple-500 to-purple-600'
  }
];

const SECURITY_FEATURES = [
  'Договор на каждый проект',
  'Чеки и отчетные документы',
  'Работаем официально с 2019 года',
  'Гарантия возврата средств'
];

export default function OptimizedPaymentInfo() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="px-4 py-2 text-sm font-semibold bg-green-50 text-green-700 border-green-200 mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Безопасная оплата
          </Badge>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            Никаких рисков для вас
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы настолько уверены в качестве, что готовы работать без предоплаты
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Payment Benefits */}
          <div className="space-y-4">
            {PAYMENT_BENEFITS.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-sm bg-white hover:shadow-md transition-all duration-300">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${benefit.color} text-white flex items-center justify-center`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security Info */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="text-xl font-bold">Полная безопасность</h4>
            </div>
            
            <ul className="space-y-3">
              {SECURITY_FEATURES.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* FAQ Link */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                <span>Подробнее об оплате и НДС</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className="text-center mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-blue-800 text-sm">
            <span className="font-semibold">Для больших проектов:</span> 
            {" "}возможна поэтапная оплата. НДС включается при необходимости. 
            Все детали обсуждаем индивидуально.
          </p>
        </div>
      </div>
    </section>
  );
}