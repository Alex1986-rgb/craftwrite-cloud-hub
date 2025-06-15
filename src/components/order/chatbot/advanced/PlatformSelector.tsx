
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Smartphone, Users, TrendingUp, MessageSquare } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  users: string;
  growth: string;
  category: string;
  features: string[];
  recommended: boolean;
  price: number;
}

const PLATFORMS: Platform[] = [
  {
    id: 'telegram',
    name: 'Telegram',
    users: '700M+',
    growth: '+15%',
    category: 'Мессенджер',
    features: ['Inline клавиатуры', 'Медиа файлы', 'Группы и каналы', 'Webhook API'],
    recommended: true,
    price: 0
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    users: '2B+',
    growth: '+12%',
    category: 'Бизнес мессенджер',
    features: ['Шаблоны сообщений', 'Каталог товаров', 'Быстрые ответы', 'Аналитика'],
    recommended: true,
    price: 2000
  },
  {
    id: 'facebook',
    name: 'Facebook Messenger',
    users: '1.3B+',
    growth: '+8%',
    category: 'Социальная сеть',
    features: ['Rich media', 'Persistent menu', 'Webview', 'Payments'],
    recommended: false,
    price: 1500
  },
  {
    id: 'vk',
    name: 'VK Боты',
    users: '97M+',
    growth: '+20%',
    category: 'Социальная сеть RU',
    features: ['Клавиатуры', 'Карусели', 'Callback API', 'VK Pay'],
    recommended: true,
    price: 1000
  },
  {
    id: 'viber',
    name: 'Viber',
    users: '260M+',
    growth: '+5%',
    category: 'Мессенджер',
    features: ['Rich media', 'Keyboard', 'Broadcast', 'Public accounts'],
    recommended: false,
    price: 1200
  },
  {
    id: 'discord',
    name: 'Discord',
    users: '150M+',
    growth: '+25%',
    category: 'Игровой мессенджер',
    features: ['Slash commands', 'Embeds', 'Voice integration', 'Server management'],
    recommended: false,
    price: 1800
  },
  {
    id: 'website',
    name: 'Веб-сайт',
    users: 'Неограничено',
    growth: 'Стабильно',
    category: 'Веб-интеграция',
    features: ['Custom UI', 'Полная кастомизация', 'Analytics', 'A/B тестирование'],
    recommended: true,
    price: 3000
  }
];

interface PlatformSelectorProps {
  onPlatformsChange: (platforms: string[]) => void;
  onPriceChange: (price: number) => void;
  initialPlatforms?: string[];
}

export default function PlatformSelector({
  onPlatformsChange,
  onPriceChange,
  initialPlatforms = []
}: PlatformSelectorProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(initialPlatforms);
  const [showAll, setShowAll] = useState(false);

  const handlePlatformToggle = (platformId: string) => {
    const newSelected = selectedPlatforms.includes(platformId)
      ? selectedPlatforms.filter(id => id !== platformId)
      : [...selectedPlatforms, platformId];
    
    setSelectedPlatforms(newSelected);
    onPlatformsChange(newSelected);
    
    // Calculate total additional price
    const totalPrice = newSelected.reduce((sum, id) => {
      const platform = PLATFORMS.find(p => p.id === id);
      return sum + (platform?.price || 0);
    }, 0);
    onPriceChange(totalPrice);
  };

  const recommendedPlatforms = PLATFORMS.filter(p => p.recommended);
  const otherPlatforms = PLATFORMS.filter(p => !p.recommended);
  const displayPlatforms = showAll ? PLATFORMS : recommendedPlatforms;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="w-5 h-5" />
          Выбор платформ
        </CardTitle>
        <p className="text-sm text-gray-600">
          Выберите платформы для развертывания чат-бота
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showAll && (
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">Рекомендуемые</Badge>
            <span className="text-sm text-gray-500">Лучшие платформы для большинства задач</span>
          </div>
        )}

        <div className="grid gap-3">
          {displayPlatforms.map((platform) => (
            <div
              key={platform.id}
              className={`border rounded-lg p-4 transition-all cursor-pointer ${
                selectedPlatforms.includes(platform.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handlePlatformToggle(platform.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedPlatforms.includes(platform.id)}
                  onChange={() => handlePlatformToggle(platform.id)}
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{platform.name}</h4>
                    {platform.recommended && (
                      <Badge variant="outline" className="text-xs">Рекомендуем</Badge>
                    )}
                    {platform.price > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        +{platform.price.toLocaleString()}₽
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {platform.users}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {platform.growth}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {platform.category}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {platform.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-block text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="w-full"
        >
          {showAll ? 'Показать только рекомендуемые' : `Показать все платформы (+${otherPlatforms.length})`}
        </Button>

        {selectedPlatforms.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">Выбранные платформы:</span>
            </div>
            <div className="text-sm text-blue-700">
              {selectedPlatforms.map(id => PLATFORMS.find(p => p.id === id)?.name).join(', ')}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
