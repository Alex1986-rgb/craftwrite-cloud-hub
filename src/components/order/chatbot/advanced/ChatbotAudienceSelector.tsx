
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Brain, MessageSquare } from 'lucide-react';

interface ChatbotAudienceSelectorProps {
  onAudienceChange: (audience: string, scenarios: string[], style: string) => void;
  initialAudience?: string;
}

const AUDIENCE_TYPES = {
  b2b: {
    label: 'B2B клиенты',
    description: 'Бизнес-аудитория, корпоративные клиенты',
    scenarios: [
      'Квалификация лидов',
      'Презентация услуг',
      'Назначение встреч',
      'Обработка запросов',
      'Техническая поддержка'
    ],
    style: 'Профессиональный и деловой',
    icon: '💼'
  },
  b2c: {
    label: 'B2C покупатели',
    description: 'Конечные потребители, частные лица',
    scenarios: [
      'Консультация по товарам',
      'Оформление заказов',
      'Поддержка клиентов',
      'Программа лояльности',
      'Отзывы и рекомендации'
    ],
    style: 'Дружелюбный и понятный',
    icon: '🛍️'
  },
  education: {
    label: 'Образование',
    description: 'Студенты, преподаватели, учебные заведения',
    scenarios: [
      'Информация о курсах',
      'Запись на обучение',
      'Расписание занятий',
      'Техническая поддержка',
      'Оценки и результаты'
    ],
    style: 'Информативный и поддерживающий',
    icon: '🎓'
  },
  healthcare: {
    label: 'Медицина',
    description: 'Пациенты, медицинские учреждения',
    scenarios: [
      'Запись к врачу',
      'Медицинские консультации',
      'Результаты анализов',
      'Напоминания о приеме',
      'Экстренная помощь'
    ],
    style: 'Деликатный и профессиональный',
    icon: '🏥'
  },
  ecommerce: {
    label: 'Интернет-магазин',
    description: 'Покупатели онлайн-магазинов',
    scenarios: [
      'Помощь в выборе товара',
      'Статус заказа',
      'Возвраты и обмены',
      'Промокоды и скидки',
      'Рекомендации товаров'
    ],
    style: 'Продающий и вовлекающий',
    icon: '🛒'
  },
  finance: {
    label: 'Финансы',
    description: 'Клиенты банков, финансовых услуг',
    scenarios: [
      'Баланс и операции',
      'Кредитные продукты',
      'Инвестиционные услуги',
      'Блокировка карт',
      'Консультации по продуктам'
    ],
    style: 'Безопасный и доверительный',
    icon: '💰'
  },
  realestate: {
    label: 'Недвижимость',
    description: 'Покупатели и арендаторы недвижимости',
    scenarios: [
      'Поиск объектов',
      'Назначение просмотров',
      'Информация о районах',
      'Ипотечные программы',
      'Юридические вопросы'
    ],
    style: 'Консультативный и экспертный',
    icon: '🏠'
  },
  entertainment: {
    label: 'Развлечения',
    description: 'Пользователи развлекательных сервисов',
    scenarios: [
      'Рекомендации контента',
      'Билеты на мероприятия',
      'Игровые активности',
      'Конкурсы и розыгрыши',
      'Социальные функции'
    ],
    style: 'Развлекательный и энергичный',
    icon: '🎮'
  }
};

export default function ChatbotAudienceSelector({ 
  onAudienceChange, 
  initialAudience = '' 
}: ChatbotAudienceSelectorProps) {
  const [selectedAudience, setSelectedAudience] = useState(initialAudience);

  const handleAudienceSelect = (audienceKey: string) => {
    setSelectedAudience(audienceKey);
    
    const audienceData = AUDIENCE_TYPES[audienceKey as keyof typeof AUDIENCE_TYPES];
    if (audienceData) {
      onAudienceChange(audienceData.label, audienceData.scenarios, audienceData.style);
    }
  };

  const currentAudience = selectedAudience ? AUDIENCE_TYPES[selectedAudience as keyof typeof AUDIENCE_TYPES] : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Целевая аудитория
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Выберите тип аудитории</label>
          <Select value={selectedAudience} onValueChange={handleAudienceSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите целевую аудиторию" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(AUDIENCE_TYPES).map(([key, audience]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <span>{audience.icon}</span>
                    <span>{audience.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {currentAudience && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{currentAudience.icon}</span>
                <h3 className="font-medium">{currentAudience.label}</h3>
              </div>
              <p className="text-sm text-blue-800 mb-3">{currentAudience.description}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">Стиль общения:</span>
              </div>
              <Badge variant="outline" className="mb-3">
                {currentAudience.style}
              </Badge>
              
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4" />
                <span className="text-sm font-medium">Типичные сценарии:</span>
              </div>
              <div className="space-y-1">
                {currentAudience.scenarios.map((scenario, index) => (
                  <div key={index} className="text-sm text-blue-700">
                    • {scenario}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(AUDIENCE_TYPES).map(([key, audience]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleAudienceSelect(key)}
              className={`p-2 text-center rounded-lg border transition-all hover:shadow-md ${
                selectedAudience === key 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-xl mb-1">{audience.icon}</div>
              <div className="text-xs font-medium">{audience.label}</div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
