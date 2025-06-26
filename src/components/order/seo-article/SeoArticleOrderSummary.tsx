
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SeoArticleOrderSummaryProps {
  wordCount: string;
  paymentMethod: string;
  calculatePrice: () => number;
  currentStep: number;
}

export default function SeoArticleOrderSummary({ 
  wordCount, 
  paymentMethod, 
  calculatePrice, 
  currentStep 
}: SeoArticleOrderSummaryProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Сводка заказа</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Услуга:</span>
            <span>SEO-статья</span>
          </div>
          {wordCount && (
            <div className="flex justify-between">
              <span>Объем:</span>
              <span>{wordCount}</span>
            </div>
          )}
          {currentStep === 4 && paymentMethod && (
            <div className="flex justify-between">
              <span>Способ оплаты:</span>
              <span className="text-sm">
                {paymentMethod === 'yookassa' && 'ЮKassa'}
                {paymentMethod === 'card' && 'Банковская карта'}
                {paymentMethod === 'bank' && 'Банковский перевод'}
              </span>
            </div>
          )}
          <div className="border-t pt-3">
            <div className="flex justify-between font-semibold">
              <span>Итого:</span>
              <span className="text-green-600">{calculatePrice().toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
