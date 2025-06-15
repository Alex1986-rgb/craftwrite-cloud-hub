
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Target, Zap, Bot } from 'lucide-react';

const CHATBOT_FEATURES = [
  {
    icon: MessageSquare,
    title: 'Умные диалоги',
    description: 'Естественные сценарии общения с клиентами'
  },
  {
    icon: Target,
    title: 'Целевые воронки',
    description: 'Конверсионные последовательности для продаж'
  },
  {
    icon: Zap,
    title: 'Быстрые ответы',
    description: 'Мгновенная обработка типовых запросов'
  },
  {
    icon: Bot,
    title: 'AI-интеграция',
    description: 'Готовность к подключению ИИ-помощников'
  }
];

export default function ChatbotFeaturesSection() {
  return (
    <section className="py-16 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Почему наши скрипты эффективны
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Мы создаем не просто диалоги, а продуманные сценарии, которые ведут пользователя к целевому действию
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHATBOT_FEATURES.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80">
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
