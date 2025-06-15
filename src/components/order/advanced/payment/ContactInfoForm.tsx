
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle } from 'lucide-react';
import { OrderFormData } from '@/types/advancedOrder';

interface ContactInfoFormProps {
  personalInfo: OrderFormData['personalInfo'];
  onPersonalInfoChange: (info: Partial<OrderFormData['personalInfo']>) => void;
  validationErrors: Record<string, string>;
}

export default function ContactInfoForm({
  personalInfo,
  onPersonalInfoChange,
  validationErrors
}: ContactInfoFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Контактная информация
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Имя *</Label>
            <Input
              id="name"
              value={personalInfo.name || ''}
              onChange={(e) => onPersonalInfoChange({ name: e.target.value })}
              placeholder="Введите ваше имя"
              className={validationErrors.name ? 'border-red-500' : ''}
            />
            {validationErrors.name && (
              <p className="text-sm text-red-600">{validationErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email || ''}
              onChange={(e) => onPersonalInfoChange({ email: e.target.value })}
              placeholder="your@email.com"
              className={validationErrors.email ? 'border-red-500' : ''}
            />
            {validationErrors.email && (
              <p className="text-sm text-red-600">{validationErrors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              value={personalInfo.phone || ''}
              onChange={(e) => onPersonalInfoChange({ phone: e.target.value })}
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Компания</Label>
            <Input
              id="company"
              value={personalInfo.company || ''}
              onChange={(e) => onPersonalInfoChange({ company: e.target.value })}
              placeholder="Название компании"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additional">Дополнительные пожелания</Label>
          <Textarea
            id="additional"
            placeholder="Любые дополнительные требования или пожелания к заказу"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}
