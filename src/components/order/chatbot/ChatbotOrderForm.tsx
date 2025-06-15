
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Bot, MessageSquare, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ChatbotOrderFormProps {
  selectedType?: string;
  onClose: () => void;
}

const PLATFORMS = [
  'Telegram',
  'WhatsApp Business',
  'Facebook Messenger',
  'VK Боты',
  'Viber',
  'Discord',
  'Веб-сайт',
  'Мобильное приложение'
];

const SCRIPT_COMPLEXITY = [
  { value: 'simple', label: 'Простые (до 10 сценариев)', price: 2500 },
  { value: 'medium', label: 'Средние (10-25 сценариев)', price: 5000 },
  { value: 'complex', label: 'Сложные (25+ сценариев)', price: 8000 },
  { value: 'enterprise', label: 'Корпоративные (50+ сценариев)', price: 15000 }
];

const ADDITIONAL_SERVICES = [
  { id: 'ai-integration', name: 'AI-интеграция готовность', price: 2000 },
  { id: 'voice-scripts', name: 'Голосовые сценарии', price: 3000 },
  { id: 'multilang', name: 'Многоязычность', price: 2500 },
  { id: 'analytics', name: 'Аналитика диалогов', price: 1500 },
  { id: 'crm-integration', name: 'CRM интеграция', price: 3500 }
];

export default function ChatbotOrderForm({ selectedType, onClose }: ChatbotOrderFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    platform: '',
    scriptType: selectedType || '',
    complexity: '',
    description: '',
    targetAudience: '',
    goals: '',
    additionalServices: [] as string[],
    deadline: '',
    budget: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(serviceId)
        ? prev.additionalServices.filter(id => id !== serviceId)
        : [...prev.additionalServices, serviceId]
    }));
  };

  const calculatePrice = () => {
    const complexityPrice = SCRIPT_COMPLEXITY.find(c => c.value === formData.complexity)?.price || 0;
    const additionalPrice = formData.additionalServices.reduce((sum, serviceId) => {
      const service = ADDITIONAL_SERVICES.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);
    return complexityPrice + additionalPrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Заказ успешно отправлен!",
      description: "Мы свяжемся с вами в течение 2 часов для уточнения деталей.",
    });

    setLoading(false);
    onClose();
  };

  const totalPrice = calculatePrice();

  return (
    <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8" />
            <div>
              <CardTitle className="text-2xl">Заказ скриптов для чат-ботов</CardTitle>
              <p className="opacity-90">Создадим эффективные сценарии диалогов</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Контактная информация
              </h3>
              
              <div>
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ваше имя"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              
              <div>
                <Label htmlFor="company">Компания</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Название компании"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Детали проекта
              </h3>
              
              <div>
                <Label htmlFor="platform">Платформа *</Label>
                <Select value={formData.platform} onValueChange={(value) => handleInputChange('platform', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите платформу" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map(platform => (
                      <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="complexity">Сложность проекта *</Label>
                <Select value={formData.complexity} onValueChange={(value) => handleInputChange('complexity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите сложность" />
                  </SelectTrigger>
                  <SelectContent>
                    {SCRIPT_COMPLEXITY.map(item => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label} - {item.price.toLocaleString()}₽
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="deadline">Срок выполнения</Label>
                <Select value={formData.deadline} onValueChange={(value) => handleInputChange('deadline', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите срок" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-5">3-5 дней</SelectItem>
                    <SelectItem value="1-week">1 неделя</SelectItem>
                    <SelectItem value="2-weeks">2 недели</SelectItem>
                    <SelectItem value="1-month">1 месяц</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="budget">Бюджет</Label>
                <Input
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="Примерный бюджет в рублях"
                />
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Дополнительные услуги</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {ADDITIONAL_SERVICES.map(service => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={formData.additionalServices.includes(service.id)}
                    onCheckedChange={() => handleServiceToggle(service.id)}
                  />
                  <Label htmlFor={service.id} className="flex-1 cursor-pointer">
                    {service.name}
                    <Badge variant="outline" className="ml-2">
                      +{service.price.toLocaleString()}₽
                    </Badge>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Описание проекта *</Label>
              <Textarea
                id="description"
                required
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Опишите ваш проект, функционал бота, основные сценарии..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="targetAudience">Целевая аудитория</Label>
                <Textarea
                  id="targetAudience"
                  rows={3}
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  placeholder="Кто будет использовать бота?"
                />
              </div>

              <div>
                <Label htmlFor="goals">Цели и KPI</Label>
                <Textarea
                  id="goals"
                  rows={3}
                  value={formData.goals}
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                  placeholder="Чего хотите достичь с помощью бота?"
                />
              </div>
            </div>
          </div>

          {/* Price Summary */}
          {totalPrice > 0 && (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Предварительная стоимость</h4>
                <div className="space-y-2">
                  {formData.complexity && (
                    <div className="flex justify-between">
                      <span>Базовая стоимость:</span>
                      <span>{SCRIPT_COMPLEXITY.find(c => c.value === formData.complexity)?.price.toLocaleString()}₽</span>
                    </div>
                  )}
                  {formData.additionalServices.length > 0 && (
                    <div className="flex justify-between">
                      <span>Дополнительные услуги:</span>
                      <span>+{(totalPrice - (SCRIPT_COMPLEXITY.find(c => c.value === formData.complexity)?.price || 0)).toLocaleString()}₽</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Итого:</span>
                    <span className="text-blue-600">{totalPrice.toLocaleString()}₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {loading ? 'Отправка...' : 'Отправить заказ'}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={onClose}>
              Отмена
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
