
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  Clock, 
  Users, 
  MessageCircle, 
  Target, 
  Zap 
} from 'lucide-react';

const BENEFITS = [
  {
    icon: TrendingUp,
    title: 'Увеличение конверсии',
    description: 'Наши скрипты повышают конверсию на 25-40% благодаря продуманным воронкам',
    stat: '+40%',
    color: 'text-green-600'
  },
  {
    icon: Clock,
    title: 'Экономия времени',
    description: 'Автоматизация ответов на 80% типовых вопросов освобождает время сотрудников',
    stat: '80%',
    color: 'text-blue-600'
  },
  {
    icon: Users,
    title: 'Улучшение клиентского опыта',
    description: 'Мгновенные ответы 24/7 повышают удовлетворенность клиентов',
    stat: '24/7',
    color: 'text-purple-600'
  },
  {
    icon: MessageCircle,
    title: 'Качество диалогов',
    description: 'Естественные сценарии, неотличимые от общения с живым оператором',
    stat: '95%',
    color: 'text-orange-600'
  },
  {
    icon: Target,
    title: 'Точная сегментация',
    description: 'Умная квалификация лидов и персонализированные предложения',
    stat: '3x',
    color: 'text-red-600'
  },
  {
    icon: Zap,
    title: 'Быстрое внедрение',
    description: 'Готовые скрипты можно интегрировать за 1-2 дня',
    stat: '1-2 дня',
    color: 'text-yellow-600'
  }
];

export default function ChatbotBenefits() {
  return (
    <section className="py-16 bg-white/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Преимущества наших чат-бот скриптов
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Каждый скрипт разрабатывается с учетом психологии пользователей и лучших практик конверсионного дизайна
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-slate-50 ${benefit.color}`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-3">
                      {benefit.description}
                    </p>
                    <div className={`text-2xl font-bold ${benefit.color}`}>
                      {benefit.stat}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
