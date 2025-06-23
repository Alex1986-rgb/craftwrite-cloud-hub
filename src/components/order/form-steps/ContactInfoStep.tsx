
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface ContactInfoStepProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactInfoStep({ formData, onInputChange }: ContactInfoStepProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Контактная информация</h3>
      </div>
      <div>
        <Label htmlFor="name">Ваше имя *</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder="Введите ваше имя"
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          placeholder="your@email.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Телефон *</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={onInputChange}
          placeholder="+7 (999) 123-45-67"
          required
        />
      </div>
    </div>
  );
}
