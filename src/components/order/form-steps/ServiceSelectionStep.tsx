
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, FileText } from 'lucide-react';

interface ServiceSelectionStepProps {
  formData: {
    service: string;
  };
  serviceTitle?: string;
  selectedPackage?: string;
  onServiceSelect: (service: string) => void;
}

const DEFAULT_SERVICES = [
  'SEO-статья',
  'Лендинг',
  'Email-рассылка',
  'Контент для Telegram',
  'Скрипты для чат-бота',
  'Тексты для сайта',
  'Посты для Instagram',
  'Карточки Wildberries',
  'Карточки Ozon',
  'Скрипты для YouTube',
  'Посты для LinkedIn'
];

export default function ServiceSelectionStep({ 
  formData, 
  serviceTitle, 
  selectedPackage, 
  onServiceSelect 
}: ServiceSelectionStepProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Выберите услугу</h3>
      </div>
      {serviceTitle || selectedPackage ? (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-medium text-blue-900">Выбранная услуга:</p>
          <p className="text-blue-700">{serviceTitle || selectedPackage}</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {DEFAULT_SERVICES.map((service) => (
            <Card 
              key={service}
              className={`cursor-pointer transition-all ${
                formData.service === service ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-200'
              }`}
              onClick={() => onServiceSelect(service)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <span>{service}</span>
                {formData.service === service && (
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
