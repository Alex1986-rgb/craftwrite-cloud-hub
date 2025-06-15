
import { Clock, UserCheck, FileText, Zap, CheckCircle, RefreshCw, ArrowRight, Play, Star } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      icon: UserCheck,
      title: "Анализ требований",
      description: "Детальное изучение ТЗ и подбор специалиста под тематику",
      time: "30 мин",
      details: "Анализируем целевую аудиторию, конкурентов и специфику ниши",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: FileText,
      title: "Создание текста",
      description: "Написание уникального контента с учетом SEO-требований",
      time: "1-3 дня",
      details: "Структурируем контент, прорабатываем LSI-ключи и эмоциональные триггеры",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: RefreshCw,
      title: "Проверка качества",
      description: "Редакторская правка, проверка уникальности и SEO-анализ",
      time: "2-4 часа",
      details: "Многоуровневая проверка: уникальность, читаемость, SEO-соответствие",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Zap,
      title: "Доставка результата",
      description: "Готовый текст с отчетами и гарантией качества",
      time: "Мгновенно",
      details: "Предоставляем файлы, отчеты по уникальности и SEO-рекомендации",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    }
  ];

  const advantages = [
    { icon: Star, title: "Персональный менеджер", desc: "Курирует ваш заказ от начала до завершения" },
    { icon: CheckCircle, title: "Промежуточные отчеты", desc: "Уведомления о статусе на каждом этапе" },
    { icon: RefreshCw, title: "Возможность правок", desc: "Бесплатные доработки в течение 7 дней" }
  ];

  const playAnimation = () => {
    setIsPlaying(true);
    steps.forEach((_, index) => {
      setTimeout(() => {
        setActiveStep(index);
      }, index * 800);
    });
    
    setTimeout(() => {
      setActiveStep(null);
      setIsPlaying(false);
    }, steps.length * 800 + 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-green-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 text-lg mb-6 shadow-lg">
            <Clock className="w-5 h-5 mr-2" />
            Четкий процесс работы
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Как мы создаем идеальные тексты
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Отлаженный процесс с контролем на каждом этапе гарантирует высокое качество 
            и соблюдение всех требований к тексту
          </p>

          <Button 
            onClick={playAnimation}
            disabled={isPlaying}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <Play className="w-5 h-5 mr-2" />
            {isPlaying ? 'Демонстрация...' : 'Посмотреть процесс'}
          </Button>
        </div>

        {/* Процесс работы */}
        <div className="relative mb-20">
          {/* Анимированная линия соединения */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-300 to-green-200 transform -translate-y-1/2 z-0 rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full opacity-30 animate-pulse"></div>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <Card 
                key={index} 
                className={`p-8 group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-0 ${
                  activeStep === index 
                    ? 'shadow-2xl scale-105 ring-4 ring-blue-200' 
                    : 'shadow-lg hover:shadow-xl'
                } ${step.bgColor}`}
                onMouseEnter={() => !isPlaying && setActiveStep(index)}
                onMouseLeave={() => !isPlaying && setActiveStep(null)}
              >
                <div className="text-center relative">
                  {/* Иконка с анимацией */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-all duration-300 ${
                    activeStep === index ? 'animate-pulse scale-110' : ''
                  }`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Номер шага */}
                  <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r ${step.color} text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg ${
                    activeStep === index ? 'animate-bounce' : ''
                  }`}>
                    {index + 1}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
                  <p className="text-slate-600 mb-4 min-h-[48px] leading-relaxed">{step.description}</p>
                  
                  {/* Время выполнения */}
                  <div className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-md mb-4 ${
                    activeStep === index ? 'ring-2 ring-blue-300' : ''
                  }`}>
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-slate-700">{step.time}</span>
                  </div>

                  {/* Детали (показываются при наведении) */}
                  <div className={`transition-all duration-300 overflow-hidden ${
                    activeStep === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-sm text-slate-500 bg-white/50 rounded-lg p-3 backdrop-blur-sm">
                      {step.details}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Преимущества работы с нами */}
        <Card className="p-8 bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-sm border-0 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-playfair font-bold mb-6 text-slate-900">
                Контроль на каждом этапе
              </h3>
              
              <div className="space-y-6">
                {advantages.map((advantage, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <advantage.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{advantage.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{advantage.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Начать работу
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-2xl blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop" 
                alt="Процесс работы над текстом"
                className="relative w-full h-80 object-cover rounded-2xl shadow-xl"
              />
              
              {/* Статистика поверх изображения */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">99%</div>
                    <div className="text-xs text-slate-600">Довольных клиентов</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">24ч</div>
                    <div className="text-xs text-slate-600">Средний срок</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">5000+</div>
                    <div className="text-xs text-slate-600">Проектов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProcessSection;
