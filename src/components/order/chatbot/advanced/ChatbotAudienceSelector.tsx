
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Bot, MessageSquare, Target } from 'lucide-react';

interface ChatbotAudience {
  id: string;
  name: string;
  description: string;
  scenarios: string[];
  platforms: string[];
  conversationStyle: string;
}

const CHATBOT_AUDIENCES = {
  'ecommerce': [
    {
      id: 'online-shoppers',
      name: 'Покупатели интернет-магазинов',
      description: 'Люди, совершающие покупки онлайн, ищущие информацию о товарах',
      scenarios: ['Помощь с выбором', 'Отслеживание заказа', 'Возврат товара', 'Консультация'],
      platforms: ['website', 'telegram', 'whatsapp'],
      conversationStyle: 'Дружелюбный и помогающий'
    },
    {
      id: 'price-hunters',
      name: 'Ищущие скидки и акции',
      description: 'Пользователи, активно ищущие выгодные предложения',
      scenarios: ['Уведомления о скидках', 'Персональные предложения', 'Сравнение цен'],
      platforms: ['telegram', 'vk', 'viber'],
      conversationStyle: 'Быстрый и информативный'
    }
  ],
  'services': [
    {
      id: 'service-seekers',
      name: 'Клиенты сферы услуг',
      description: 'Люди, ищущие или заказывающие различные услуги',
      scenarios: ['Запись на услугу', 'Консультация', 'Расчет стоимости', 'Отзывы'],
      platforms: ['whatsapp', 'telegram', 'website'],
      conversationStyle: 'Профессиональный и обстоятельный'
    },
    {
      id: 'urgent-clients',
      name: 'Клиенты срочных услуг',
      description: 'Пользователи, нуждающиеся в быстром решении проблем',
      scenarios: ['Экстренная помощь', 'Быстрая запись', 'Статус заявки'],
      platforms: ['telegram', 'whatsapp', 'viber'],
      conversationStyle: 'Быстрый и четкий'
    }
  ],
  'support': [
    {
      id: 'technical-users',
      name: 'Пользователи техподдержки',
      description: 'Клиенты, обращающиеся за технической помощью',
      scenarios: ['Решение проблем', 'Инструкции', 'Эскалация', 'FAQ'],
      platforms: ['website', 'telegram', 'discord'],
      conversationStyle: 'Терпеливый и подробный'
    },
    {
      id: 'new-users',
      name: 'Новые пользователи',
      description: 'Люди, впервые использующие продукт или услугу',
      scenarios: ['Онбординг', 'Обучение', 'Первые шаги', 'Настройка'],
      platforms: ['website', 'telegram', 'whatsapp'],
      conversationStyle: 'Обучающий и поддерживающий'
    }
  ],
  'entertainment': [
    {
      id: 'gamers',
      name: 'Игроки и геймеры',
      description: 'Пользователи игровых платформ и сообществ',
      scenarios: ['Игровые команды', 'Развлечения', 'Соревнования', 'Общение'],
      platforms: ['discord', 'telegram', 'vk'],
      conversationStyle: 'Неформальный и игровой'
    },
    {
      id: 'content-consumers',
      name: 'Потребители контента',
      description: 'Люди, ищущие развлекательный контент',
      scenarios: ['Рекомендации', 'Викторины', 'Новости', 'Подписки'],
      platforms: ['telegram', 'vk', 'facebook'],
      conversationStyle: 'Развлекательный и вовлекающий'
    }
  ]
};

interface ChatbotAudienceSelectorProps {
  onAudienceChange: (audience: string, scenarios: string[], style: string) => void;
  initialAudience?: string;
}

export default function ChatbotAudienceSelector({
  onAudienceChange,
  initialAudience
}: ChatbotAudienceSelectorProps) {
  const [category, setCategory] = useState<string>('');
  const [selectedAudience, setSelectedAudience] = useState<ChatbotAudience | null>(null);
  const [customAudience, setCustomAudience] = useState<string>(initialAudience || '');
  const [mode, setMode] = useState<'predefined' | 'custom'>('predefined');

  const handleCategoryChange = (categoryKey: string) => {
    setCategory(categoryKey);
    setSelectedAudience(null);
  };

  const handleAudienceSelect = (audience: ChatbotAudience) => {
    setSelectedAudience(audience);
    setCustomAudience(audience.description);
    onAudienceChange(audience.description, audience.scenarios, audience.conversationStyle);
  };

  const handleCustomChange = (value: string) => {
    setCustomAudience(value);
    onAudienceChange(value, [], 'Дружелюбный и профессиональный');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Целевая аудитория для чат-бота
        </CardTitle>
        <p className="text-sm text-gray-600">
          Выберите аудиторию для настройки стиля общения и сценариев
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            type="button"
            variant={mode === 'predefined' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('predefined')}
          >
            <Target className="w-4 h-4 mr-1" />
            Готовые варианты
          </Button>
          <Button
            type="button"
            variant={mode === 'custom' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('custom')}
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Ввести вручную
          </Button>
        </div>

        {mode === 'predefined' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Сфера применения</Label>
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите сферу" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecommerce">E-commerce и продажи</SelectItem>
                  <SelectItem value="services">Сфера услуг</SelectItem>
                  <SelectItem value="support">Техподдержка</SelectItem>
                  <SelectItem value="entertainment">Развлечения и контент</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {category && (
              <div className="space-y-3">
                <Label>Тип аудитории</Label>
                <div className="grid gap-3">
                  {CHATBOT_AUDIENCES[category as keyof typeof CHATBOT_AUDIENCES]?.map((audience) => (
                    <button
                      key={audience.id}
                      type="button"
                      onClick={() => handleAudienceSelect(audience)}
                      className={`p-4 border rounded-lg text-left transition-all ${
                        selectedAudience?.id === audience.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{audience.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            <Bot className="w-3 h-3 mr-1" />
                            {audience.conversationStyle}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{audience.description}</p>
                        
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-gray-700">Типовые сценарии:</div>
                          <div className="flex flex-wrap gap-1">
                            {audience.scenarios.slice(0, 3).map((scenario, index) => (
                              <span
                                key={index}
                                className="inline-block text-xs bg-gray-100 px-2 py-1 rounded"
                              >
                                {scenario}
                              </span>
                            ))}
                            {audience.scenarios.length > 3 && (
                              <span className="text-xs text-gray-500">+{audience.scenarios.length - 3}</span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs font-medium text-gray-700">Рекомендуемые платформы:</div>
                          <div className="flex flex-wrap gap-1">
                            {audience.platforms.map((platform, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {mode === 'custom' && (
          <div className="space-y-2">
            <Label htmlFor="custom-audience">Опишите вашу целевую аудиторию</Label>
            <Textarea
              id="custom-audience"
              value={customAudience}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder="Например: молодые мамы 25-35 лет, активно использующие мессенджеры для общения с брендами, ищущие быстрые ответы на вопросы о детских товарах"
              rows={4}
            />
          </div>
        )}

        {selectedAudience && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="space-y-2">
              <div className="font-medium text-blue-800">Выбранная аудитория: {selectedAudience.name}</div>
              <div className="text-sm text-blue-700">
                <strong>Стиль общения:</strong> {selectedAudience.conversationStyle}
              </div>
              <div className="text-sm text-blue-700">
                <strong>Основные сценарии:</strong> {selectedAudience.scenarios.join(', ')}
              </div>
            </div>
          </div>
        )}

        {customAudience && mode === 'custom' && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm text-green-800">
              <strong>Описание аудитории:</strong>
              <div className="mt-1">{customAudience}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
