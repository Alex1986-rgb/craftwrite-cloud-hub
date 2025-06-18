
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, Building } from 'lucide-react';

interface ContactInfoFormProps {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };
  onPersonalInfoChange: (info: Partial<ContactInfoFormProps['personalInfo']>) => void;
  validationErrors: Record<string, string>;
}

export default function ContactInfoForm({
  personalInfo,
  onPersonalInfoChange,
  validationErrors
}: ContactInfoFormProps) {
  const handleChange = (field: string, value: string) => {
    onPersonalInfoChange({ [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Контактная информация
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Имя *
          </Label>
          <Input
            id="name"
            value={personalInfo.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ваше имя"
            className={validationErrors.name ? 'border-red-500' : ''}
          />
          {validationErrors.name && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="your@email.com"
            className={validationErrors.email ? 'border-red-500' : ''}
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Телефон
          </Label>
          <Input
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+7 (999) 123-45-67"
          />
        </div>

        <div>
          <Label htmlFor="company" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Компания
          </Label>
          <Input
            id="company"
            value={personalInfo.company || ''}
            onChange={(e) => handleChange('company', e.target.value)}
            placeholder="Название компании"
          />
        </div>
      </CardContent>
    </Card>
  );
}
