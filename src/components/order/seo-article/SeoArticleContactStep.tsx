
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users } from 'lucide-react';

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface SeoArticleContactStepProps {
  contactInfo: ContactInfo;
  onContactChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SeoArticleContactStep({ contactInfo, onContactChange }: SeoArticleContactStepProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Контактная информация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                name="name"
                value={contactInfo.name}
                onChange={onContactChange}
                placeholder="Ваше имя"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={contactInfo.email}
                onChange={onContactChange}
                placeholder="email@example.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={contactInfo.phone}
                onChange={onContactChange}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
            
            <div>
              <Label htmlFor="company">Компания</Label>
              <Input
                id="company"
                name="company"
                value={contactInfo.company}
                onChange={onContactChange}
                placeholder="Название компании"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
