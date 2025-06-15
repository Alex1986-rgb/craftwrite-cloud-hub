
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, ArrowRight, CheckCircle, Clock, Star } from 'lucide-react';

interface ChatbotHeroSectionProps {
  onShowForm: () => void;
}

export default function ChatbotHeroSection({ onShowForm }: ChatbotHeroSectionProps) {
  return (
    <section className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            <Bot className="w-4 h-4 mr-2" />
            Умная автоматизация
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Создание <span className="text-gradient">чат-ботов</span>
            <br />
            нового поколения
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Профессиональные чат-боты с умными сценариями для Telegram, WhatsApp, VK и других платформ. 
            Увеличьте конверсию до 40% и автоматизируйте общение с клиентами.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600"
              onClick={onShowForm}
            >
              Создать чат-бота
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg">
              Примеры ботов
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              AI-готовые сценарии
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              Запуск за 3-7 дней
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              100+ успешных ботов
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
