
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { User, Mail, Phone, Building, MessageSquare, Star } from 'lucide-react';

interface ContactStepProps {
  data: {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    contactCompany: string;
    specialRequirements: string;
    previousExperience: boolean;
  };
  onUpdate: (data: Partial<ContactStepProps['data']>) => void;
}

export default function ContactStep({ data, onUpdate }: ContactStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Контактная информация
        </h2>
        <p className="text-gray-600">
          Финальный шаг! Укажите, как с вами связаться
        </p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contactName" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Имя и фамилия *
          </Label>
          <Input
            id="contactName"
            value={data.contactName}
            onChange={(e) => onUpdate({ contactName: e.target.value })}
            placeholder="Иван Петров"
            className="text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email *
          </Label>
          <Input
            id="contactEmail"
            type="email"
            value={data.contactEmail}
            onChange={(e) => onUpdate({ contactEmail: e.target.value })}
            placeholder="ivan@company.com"
            className="text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Телефон
          </Label>
          <Input
            id="contactPhone"
            type="tel"
            value={data.contactPhone}
            onChange={(e) => onUpdate({ contactPhone: e.target.value })}
            placeholder="+7 (999) 123-45-67"
            className="text-base"
          />
          <p className="text-xs text-gray-500">
            Для срочной связи по проекту
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactCompany" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Компания
          </Label>
          <Input
            id="contactCompany"
            value={data.contactCompany}
            onChange={(e) => onUpdate({ contactCompany: e.target.value })}
            placeholder="ООО Рога и Копыта"
            className="text-base"
          />
        </div>
      </div>

      {/* Special Requirements */}
      <div className="space-y-2">
        <Label htmlFor="specialRequirements" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Особые пожелания (необязательно)
        </Label>
        <Textarea
          id="specialRequirements"
          value={data.specialRequirements}
          onChange={(e) => onUpdate({ specialRequirements: e.target.value })}
          placeholder="Дополнительные требования, пожелания к стилю, примеры понравившихся текстов..."
          rows={4}
          className="text-base"
        />
      </div>

      {/* Previous Experience */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="previousExperience"
            checked={data.previousExperience}
            onCheckedChange={(checked) => onUpdate({ previousExperience: !!checked })}
          />
          <Label htmlFor="previousExperience" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            У меня уже есть опыт работы с копирайтерами
          </Label>
        </div>
        <p className="text-sm text-gray-600 ml-6">
          Это поможет нам лучше понять ваши ожидания
        </p>
      </div>

      {/* Communication Preferences */}
      <Card className="bg-purple-50 border-purple-200">
        <div className="p-4">
          <h4 className="font-semibold text-purple-900 mb-3">
            📱 Как мы будем общаться
          </h4>
          <ul className="text-sm text-purple-800 space-y-2">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Подтверждение заказа на email в течение 30 минут</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Звонок менеджера для уточнения деталей</span>
            </li>
            <li className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Регулярные отчёты о ходе работы</span>
            </li>
            <li className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Предварительный показ черновика (при необходимости)</span>
            </li>
          </ul>
        </div>
      </Card>

      {/* Data Processing Agreement */}
      <Card className="bg-gray-50 border-gray-200">
        <div className="p-4">
          <p className="text-xs text-gray-600">
            Отправляя заказ, вы соглашаетесь с{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">
              политикой обработки персональных данных
            </a>{' '}
            и{' '}
            <a href="/terms" className="text-blue-600 hover:underline">
              условиями оказания услуг
            </a>
            . Мы гарантируем конфиденциальность ваших данных и используем их 
            только для выполнения заказа.
          </p>
        </div>
      </Card>

      {/* Final CTA Preview */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">
            🎉 Отлично! Всё готово к отправке
          </h3>
          <p className="opacity-90">
            После нажатия кнопки "Отправить заказ" мы свяжемся с вами 
            в течение 30 минут для уточнения деталей
          </p>
        </div>
      </Card>
    </div>
  );
}
