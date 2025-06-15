
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const PLATFORMS = [
  { name: 'Telegram', users: '700M+', growth: '+15%' },
  { name: 'WhatsApp Business', users: '2B+', growth: '+12%' },
  { name: 'Facebook Messenger', users: '1.3B+', growth: '+8%' },
  { name: 'VK Боты', users: '97M+', growth: '+20%' },
  { name: 'Viber', users: '260M+', growth: '+5%' },
  { name: 'Discord', users: '150M+', growth: '+25%' }
];

export default function ChatbotPlatformsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Поддерживаемые платформы
          </h2>
          <p className="text-slate-600">
            Создаем скрипты для всех популярных мессенджеров и платформ
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {PLATFORMS.map((platform, index) => (
            <Card key={index} className="hover:shadow-md transition-all border-0 bg-white/60">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-900">{platform.name}</h4>
                  <p className="text-sm text-slate-500">{platform.users} пользователей</p>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{platform.growth}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
