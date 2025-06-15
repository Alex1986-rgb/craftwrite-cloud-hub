
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Smartphone, MessageCircle, Send, Users, Globe, Zap } from 'lucide-react';

interface PlatformSelectorProps {
  onPlatformsChange: (platforms: string[]) => void;
  onPriceChange: (price: number) => void;
  initialPlatforms?: string[];
}

const PLATFORMS = [
  {
    id: 'telegram',
    name: 'Telegram',
    icon: Send,
    description: 'Популярный мессенджер с богатыми возможностями',
    basePrice: 0,
    features: ['Inline клавиатуры', 'Файлы до 2GB', 'Группы и каналы'],
    popular: true
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    icon: MessageCircle,
    description: 'Бизнес-мессенджер для работы с клиентами',
    basePrice: 2000,
    features: ['Шаблоны сообщений', 'Метки', 'Каталог товаров']
  },
  {
    id: 'vk',
    name: 'ВКонтакте',
    icon: Users,
    description: 'Социальная сеть с мессенджером',
    basePrice: 1500,
    features: ['Карусели', 'Клавиатуры', 'Интеграция с сообществом']
  },
  {
    id: 'viber',
    name: 'Viber',
    icon: Smartphone,
    description: 'Мессенджер для персонального общения',
    basePrice: 1500,
    features: ['Rich Media', 'Клавиатуры', 'Широкая аудитория']
  },
  {
    id: 'website',
    name: 'Веб-сайт',
    icon: Globe,
    description: 'Встроенный чат на вашем сайте',
    basePrice: 3000,
    features: ['Полная кастомизация', 'Интеграция с CRM', 'Аналитика']
  },
  {
    id: 'facebook',
    name: 'Facebook Messenger',
    icon: MessageCircle,
    description: 'Мессенджер Facebook для бизнеса',
    basePrice: 2500,
    features: ['Автоответы', 'Persistent Menu', 'Postback кнопки']
  }
];

export default function PlatformSelector({ 
  onPlatformsChange, 
  onPriceChange, 
  initialPlatforms = ['telegram'] 
}: PlatformSelectorProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(initialPlatforms);

  const handlePlatformToggle = (platformId: string) => {
    let newPlatforms: string[];
    
    if (platformId === 'telegram') {
      // Telegram всегда должен быть включен
      return;
    }
    
    if (selectedPlatforms.includes(platformId)) {
      newPlatforms = selectedPlatforms.filter(id => id !== platformId);
    } else {
      newPlatforms = [...selectedPlatforms, platformId];
    }
    
    setSelectedPlatforms(newPlatforms);
    onPlatformsChange(newPlatforms);
    
    // Рассчитываем цену дополнительных платформ
    const additionalPrice = newPlatforms
      .filter(id => id !== 'telegram')
      .reduce((total, id) => {
        const platform = PLATFORMS.find(p => p.id === id);
        return total + (platform?.basePrice || 0);
      }, 0);
    
    onPriceChange(additionalPrice);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Платформы для бота
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Выберите платформы, на которых будет работать ваш бот
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            const isSelected = selectedPlatforms.includes(platform.id);
            const isBase = platform.id === 'telegram';
            
            return (
              <div
                key={platform.id}
                className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${isBase ? 'ring-2 ring-green-200' : ''}`}
                onClick={() => handlePlatformToggle(platform.id)}
              >
                {platform.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500">
                    Популярный
                  </Badge>
                )}
                
                {isBase && (
                  <Badge className="absolute -top-2 -left-2 bg-green-500">
                    Базовая
                  </Badge>
                )}
                
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isSelected}
                    disabled={isBase}
                    onChange={() => handlePlatformToggle(platform.id)}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-blue-600" />
                      <h3 className="font-medium">{platform.name}</h3>
                      {platform.basePrice > 0 && (
                        <Badge variant="outline">
                          +{platform.basePrice.toLocaleString()}₽
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {platform.description}
                    </p>
                    
                    <div className="space-y-1">
                      {platform.features.map((feature, index) => (
                        <div key={index} className="text-xs text-gray-500">
                          • {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Выбрано платформ:</strong> {selectedPlatforms.length}
            <br />
            <strong>Базовая платформа:</strong> Telegram (включена)
            {selectedPlatforms.length > 1 && (
              <>
                <br />
                <strong>Дополнительные:</strong> {selectedPlatforms.filter(p => p !== 'telegram').join(', ')}
              </>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
