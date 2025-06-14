
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MessageCircle, Calendar, Star, Zap, Target, Award, Phone, Calculator } from "lucide-react";
import { useState } from "react";

export default function ProjectCTA() {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const ctaOptions = [
    {
      id: 'consultation',
      title: 'Бесплатная консультация',
      description: 'Обсудим ваш проект и составим план действий',
      icon: MessageCircle,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50',
      badge: 'Бесплатно',
      action: 'Получить консультацию'
    },
    {
      id: 'estimate',
      title: 'Оценка проекта',
      description: 'Рассчитаем стоимость и сроки реализации',
      icon: Calculator,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      badge: '24 часа',
      action: 'Получить оценку'
    },
    {
      id: 'meeting',
      title: 'Личная встреча',
      description: 'Встретимся и обсудим детали вашего проекта',
      icon: Calendar,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-50',
      badge: 'VIP',
      action: 'Запланировать встречу'
    }
  ];

  const achievements = [
    { icon: Star, value: '500+', label: 'Успешных проектов' },
    { icon: Award, value: '98%', label: 'Довольных клиентов' },
    { icon: Zap, value: '24/7', label: 'Поддержка' },
    { icon: Target, value: '250%', label: 'Средний ROI' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-primary/10 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full px-6 py-3 mb-6">
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold">Готовы к успеху?</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Создадим такой же успех для вас
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Более 500 компаний уже доверили нам свой рост. Присоединяйтесь к числу успешных!
          </p>

          {/* Achievement Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{achievement.value}</div>
                  <div className="text-sm text-slate-300">{achievement.label}</div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {ctaOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card 
                key={option.id}
                className={`group p-8 transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 bg-gradient-to-br ${option.bgColor} border-0 shadow-lg cursor-pointer relative overflow-hidden animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setHoveredAction(option.id)}
                onMouseLeave={() => setHoveredAction(null)}
              >
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={`bg-gradient-to-r ${option.color} text-white border-0 animate-pulse`}>
                    {option.badge}
                  </Badge>
                </div>

                <div className="relative z-10">
                  <div className={`inline-flex p-4 bg-gradient-to-r ${option.color} text-white rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-slate-900 transition-colors">
                    {option.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {option.description}
                  </p>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 text-white border-0 py-3 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {option.action}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>

                {/* Animated Corner */}
                <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-r ${option.color} opacity-10 rounded-full transition-all duration-500 ${hoveredAction === option.id ? 'scale-150' : 'scale-100'}`}></div>
              </Card>
            );
          })}
        </div>

        {/* Emergency Contact */}
        <Card className="p-8 bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-pulse-glow">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/20 rounded-2xl">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Срочная консультация</h3>
                <p className="text-orange-100">Нужен результат уже завтра? Звоните прямо сейчас!</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="text-3xl font-bold">+7 (495) 123-45-67</div>
              <Badge className="bg-white/20 text-white border-white/30 animate-bounce">
                Доступно 24/7
              </Badge>
            </div>
          </div>
        </Card>

        {/* Trust Indicators */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="inline-flex items-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Сертифицированные специалисты</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span>Гарантия результата</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span>Быстрый старт</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
