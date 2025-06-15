
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ContactData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface ProjectData {
  description: string;
}

interface ContactStepProps {
  contactData: ContactData;
  projectData: ProjectData;
  onContactChange: (field: string, value: string) => void;
  onProjectChange: (field: string, value: string) => void;
}

export default function ContactStep({
  contactData,
  projectData,
  onContactChange,
  onProjectChange
}: ContactStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Контактная информация</h3>
        <p className="text-gray-600">Расскажите о себе и вашем проекте</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Имя *</Label>
          <Input
            id="name"
            required
            value={contactData.name}
            onChange={(e) => onContactChange('name', e.target.value)}
            placeholder="Ваше имя"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={contactData.email}
            onChange={(e) => onContactChange('email', e.target.value)}
            placeholder="email@example.com"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            value={contactData.phone}
            onChange={(e) => onContactChange('phone', e.target.value)}
            placeholder="+7 (999) 123-45-67"
          />
        </div>
        
        <div>
          <Label htmlFor="company">Компания</Label>
          <Input
            id="company"
            value={contactData.company}
            onChange={(e) => onContactChange('company', e.target.value)}
            placeholder="Название компании"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Описание проекта *</Label>
        <Textarea
          id="description"
          required
          rows={4}
          value={projectData.description}
          onChange={(e) => onProjectChange('description', e.target.value)}
          placeholder="Опишите ваш проект, задачи бота, основные функции..."
        />
      </div>
    </div>
  );
}
