
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, CheckCircle } from 'lucide-react';

interface OrderFormContactProps {
  form: {
    name: string;
    email: string;
    phone?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nameInputRef: React.RefObject<HTMLInputElement>;
  formProgress: number;
  variant?: 'public' | 'client';
  userPrefilled?: boolean;
}

export default function OrderFormContact({
  form,
  handleChange,
  nameInputRef,
  formProgress,
  variant = 'public',
  userPrefilled = false
}: OrderFormContactProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {variant === 'client' ? 'Контактная информация' : 'Расскажите о себе'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {userPrefilled 
            ? 'Ваши данные предзаполнены из профиля. Проверьте и измените при необходимости.'
            : 'Заполните контактные данные для связи с вами'
          }
        </p>
        {userPrefilled && (
          <Badge className="mt-2 bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Данные из профиля
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Имя и фамилия *
          </Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              ref={nameInputRef}
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Введите ваше имя"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Email *
          </Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="pl-10"
              required
            />
          </div>
        </div>

        {variant === 'client' && (
          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Телефон (необязательно)
            </Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone || ''}
                onChange={handleChange}
                placeholder="+7 (999) 123-45-67"
                className="pl-10"
              />
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
        * Обязательные поля для связи с вами
      </div>
    </div>
  );
}
