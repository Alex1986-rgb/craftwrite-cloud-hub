
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Lock, Shield, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  formatCardNumber,
  formatExpiryDate,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  getCardType
} from '@/utils/cardValidation';

interface BankCardFormProps {
  onSubmit: (cardData: CardData) => Promise<void>;
  loading?: boolean;
  amount: number;
  description: string;
}

interface CardData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export default function BankCardForm({ onSubmit, loading = false, amount, description }: BankCardFormProps) {
  const [cardData, setCardData] = useState<CardData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [errors, setErrors] = useState<Partial<CardData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof CardData, value: string) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    } else if (field === 'cardholderName') {
      formattedValue = value.toUpperCase();
    }

    setCardData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CardData> = {};

    if (!validateCardNumber(cardData.cardNumber)) {
      newErrors.cardNumber = 'Некорректный номер карты';
    }

    if (!validateExpiryDate(cardData.expiryDate)) {
      newErrors.expiryDate = 'Некорректная дата или карта просрочена';
    }

    if (!validateCVV(cardData.cvv)) {
      newErrors.cvv = 'CVV должен содержать 3-4 цифры';
    }

    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = 'Введите имя держателя карты';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Проверьте правильность введенных данных');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(cardData);
    } catch (error: any) {
      toast.error(error.message || 'Ошибка при обработке платежа');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardType = getCardType(cardData.cardNumber);
  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Данные банковской карты
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Сумма к оплате */}
          <div className="bg-slate-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">К оплате:</span>
              <span className="text-lg font-semibold text-green-600">
                {formatPrice(amount)}
              </span>
            </div>
            <div className="text-sm text-slate-500 mt-1">{description}</div>
          </div>

          {/* Номер карты */}
          <div>
            <Label htmlFor="cardNumber">Номер карты *</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                type="text"
                value={cardData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={errors.cardNumber ? 'border-red-500' : ''}
              />
              {cardType !== 'unknown' && (
                <div className="absolute right-3 top-2.5">
                  <span className="text-xs font-medium text-slate-500 uppercase">
                    {cardType}
                  </span>
                </div>
              )}
            </div>
            {errors.cardNumber && (
              <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>
            )}
          </div>

          {/* Срок действия и CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Срок действия *</Label>
              <Input
                id="expiryDate"
                type="text"
                value={cardData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                className={errors.expiryDate ? 'border-red-500' : ''}
              />
              {errors.expiryDate && (
                <p className="text-sm text-red-500 mt-1">{errors.expiryDate}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cvv">CVV *</Label>
              <Input
                id="cvv"
                type="password"
                value={cardData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value)}
                placeholder="123"
                maxLength={4}
                className={errors.cvv ? 'border-red-500' : ''}
              />
              {errors.cvv && (
                <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Имя держателя карты */}
          <div>
            <Label htmlFor="cardholderName">Имя держателя карты *</Label>
            <Input
              id="cardholderName"
              type="text"
              value={cardData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              placeholder="IVAN PETROV"
              className={errors.cardholderName ? 'border-red-500' : ''}
            />
            {errors.cardholderName && (
              <p className="text-sm text-red-500 mt-1">{errors.cardholderName}</p>
            )}
          </div>

          {/* Кнопка оплаты */}
          <Button
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
          >
            {loading || isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Обработка платежа...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Оплатить {formatPrice(amount)}
              </>
            )}
          </Button>

          {/* Информация о безопасности */}
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded">
            <Shield className="w-4 h-4 text-green-600" />
            <span>
              Ваши данные защищены по стандарту PCI DSS и передаются по защищенному соединению
            </span>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
