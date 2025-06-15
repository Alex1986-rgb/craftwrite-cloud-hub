
import { Card, CardContent } from '@/components/ui/card';
import { 
  Clock, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield, 
  BarChart3,
  MessageCircle,
  Target
} from 'lucide-react';

const BENEFITS = [
  {
    icon: Clock,
    title: 'Работа 24/7',
    description: 'Ваш бот не спит и всегда готов помочь клиентам в любое время',
    metric: '100% доступность'
  },
  {
    icon: TrendingUp,
    title: 'Увеличение продаж',
    description: 'Автоматизация воронки продаж и квалификация лидов',
    metric: 'до +40% конверсии'
  },
  {
    icon: Users,
    title: 'Масштабируемость',
    description: 'Обслуживание тысяч клиентов одновременно без дополнительного персонала',
    metric: '∞ клиентов'
  },
  {
    icon: Zap,
    title: 'Мгновенные ответы',
    description: 'Клиенты получают ответы за секунды, а не часы',
    metric: '<1 секунды'
  },
  {
    icon: Shield,
    title: 'Снижение нагрузки',
    description: 'Бот обрабатывает рутинные запросы, освобождая время сотрудников',
    metric: 'до -80% обращений'
  },
  {
    icon: BarChart3,
    title: 'Аналитика',
    description: 'Детальная статистика диалогов и поведения клиентов',
    metric: '100% отслеживание'
  },
  {
    icon: MessageCircle,
    title: 'Персонализация',
    description: 'Индивидуальный подход к каждому клиенту на основе данных',
    metric: 'личный помощник'
  },
  {
    icon: Target,
    title: 'Точность',
    description: 'Структурированные диалоги исключают человеческие ошибки',
    metric: '99.9% точность'
  }
];

export default function ChatbotBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Почему чат-боты эффективны?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Современные чат-боты не просто отвечают на вопросы — они становятся полноценными 
            помощниками, которые работают на результат вашего бизнеса
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            
            return (
              <Card 
                key={index} 
                className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-slate-50 to-blue-50/30"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  <h3 className="font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{benefit.description}</p>
                  
                  <div className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                    {benefit.metric}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ROI Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Окупаемость за 2-3 месяца</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">2,5x</div>
              <div className="text-blue-100">Рост лидогенерации</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">-70%</div>
              <div className="text-blue-100">Снижение затрат на поддержку</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">+150%</div>
              <div className="text-blue-100">Рост клиентского сервиса</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
