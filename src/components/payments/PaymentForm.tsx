
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Shield, Lock, CheckCircle } from 'lucide-react';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';

const PRICING_PLANS = [
  { id: 'price_starter', name: 'Стартовый', price: 2000, description: 'Для небольших проектов' },
  { id: 'price_professional', name: 'Профессиональный', price: 8000, description: 'Для серьезного бизнеса' },
  { id: 'price_enterprise', name: 'Корпоративный', price: 25000, description: 'Для крупных компаний' }
];

export default function PaymentForm() {
  const [selectedPlan, setSelectedPlan] = useState(PRICING_PLANS[1]);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const { loading, handleStripeCheckout } = useStripeCheckout();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreementAccepted) {
      alert('Необходимо принять условия соглашения');
      return;
    }
    await handleStripeCheckout(selectedPlan.id);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Оформить заказ
            </h2>
            <p className="text-xl text-slate-600">
              Выберите тариф и заполните контактную информацию для начала работы
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Выбор тарифа */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Выбор тарифа
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {PRICING_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPlan.id === plan.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{plan.name}</h3>
                        <p className="text-sm text-gray-600">{plan.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">₽{plan.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">за проект</div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">Безопасная оплата</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    Все платежи защищены SSL-шифрованием
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Форма контактов и оплаты */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Контактная информация
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ваше имя"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>

                  <div className="flex items-start space-x-2 pt-4">
                    <Checkbox
                      id="agreement"
                      checked={agreementAccepted}
                      onCheckedChange={(checked) => setAgreementAccepted(checked as boolean)}
                    />
                    <Label htmlFor="agreement" className="text-sm leading-relaxed">
                      Я принимаю{' '}
                      <a href="/privacy" className="text-blue-600 hover:underline">
                        условия соглашения
                      </a>{' '}
                      и даю согласие на обработку персональных данных
                    </Label>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-medium">Итого к оплате:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ₽{selectedPlan.price.toLocaleString()}
                      </span>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      size="lg"
                      disabled={loading || !agreementAccepted}
                    >
                      {loading ? (
                        'Обработка...'
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Перейти к оплате
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      После оплаты мы свяжемся с вами в течение 2 часов
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
