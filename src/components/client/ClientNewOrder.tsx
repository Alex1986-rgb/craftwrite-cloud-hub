
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Upload, 
  Plus,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

export default function ClientNewOrder() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    additionalRequirements: '',
    files: [] as File[]
  });

  const services: Service[] = [
    {
      id: 'seo-article',
      name: 'SEO-статья',
      price: 8500,
      duration: '3-5 дней',
      description: 'Оптимизированная статья для продвижения сайта'
    },
    {
      id: 'landing',
      name: 'Продающий лендинг',
      price: 25000,
      duration: '7-10 дней',
      description: 'Конверсионный текст для посадочной страницы'
    },
    {
      id: 'email-campaign',
      name: 'Email-кампания',
      price: 12000,
      duration: '5-7 дней',
      description: 'Серия писем для email-маркетинга'
    },
    {
      id: 'smm-content',
      name: 'SMM-контент',
      price: 15000,
      duration: '3-5 дней',
      description: 'Контент для социальных сетей'
    },
    {
      id: 'press-release',
      name: 'Пресс-релиз',
      price: 6500,
      duration: '2-3 дня',
      description: 'Официальное сообщение для СМИ'
    }
  ];

  const selectedServiceData = services.find(s => s.id === selectedService);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...Array.from(files)]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted:', { ...formData, service: selectedService });
    // Здесь будет логика отправки заказа
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Новый заказ</h1>
        <p className="text-slate-600">Создайте заказ на написание текстов</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Выберите услугу
            </CardTitle>
            <CardDescription>
              Выберите тип контента, который вам нужен
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedService === service.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{service.name}</h3>
                    <Badge variant="secondary">₽{service.price.toLocaleString()}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{service.description}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    {service.duration}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        {selectedService && (
          <Card>
            <CardHeader>
              <CardTitle>Детали заказа</CardTitle>
              <CardDescription>
                Заполните информацию о вашем проекте
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Название проекта</Label>
                <Input
                  id="title"
                  placeholder="Например: SEO-статья для блога о маркетинге"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Описание и техническое задание</Label>
                <Textarea
                  id="description"
                  placeholder="Опишите подробно, что вам нужно. Укажите целевую аудиторию, ключевые слова, стиль написания и другие важные детали..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deadline">Желаемый срок</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    required
                  />
                </div>
                <div className="flex items-end">
                  <div className="w-full p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Стоимость:</span>
                      <span className="font-bold text-lg">₽{selectedServiceData?.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="additional">Дополнительные требования</Label>
                <Textarea
                  id="additional"
                  placeholder="Любые дополнительные пожелания или требования..."
                  value={formData.additionalRequirements}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalRequirements: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* File Upload */}
        {selectedService && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Файлы и материалы
              </CardTitle>
              <CardDescription>
                Загрузите файлы с техническим заданием, примерами или другими материалами
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500">Нажмите для загрузки</span>
                    <span className="text-slate-600"> или перетащите файлы сюда</span>
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.png,.zip"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Поддерживаемые форматы: PDF, DOC, DOCX, TXT, JPG, PNG, ZIP (макс. 10 МБ)
                  </p>
                </div>

                {formData.files.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Загруженные файлы:</h4>
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          Удалить
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit */}
        {selectedService && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">Итого к оплате</h3>
                  <p className="text-sm text-slate-600">
                    {selectedServiceData?.name} • {selectedServiceData?.duration}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">₽{selectedServiceData?.price.toLocaleString()}</div>
                  <Button type="submit" className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Создать заказ
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
}
