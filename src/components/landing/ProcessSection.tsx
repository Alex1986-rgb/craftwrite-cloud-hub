
import { Clock, UserCheck, FileText, Zap, CheckCircle, RefreshCw } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: UserCheck,
      title: "Анализ требований",
      description: "Детальное изучение ТЗ и подбор специалиста под тематику",
      time: "30 мин"
    },
    {
      icon: FileText,
      title: "Создание текста",
      description: "Написание уникального контента с учетом SEO-требований",
      time: "1-3 дня"
    },
    {
      icon: RefreshCw,
      title: "Проверка качества",
      description: "Редакторская правка, проверка уникальности и SEO-анализ",
      time: "2-4 часа"
    },
    {
      icon: Zap,
      title: "Доставка результата",
      description: "Готовый текст с отчетами и гарантией качества",
      time: "Мгновенно"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-blue-200">
            <Clock className="w-4 h-4" />
            Четкий процесс работы
          </div>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Как мы создаем идеальные тексты
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Отлаженный процесс с контролем на каждом этапе гарантирует высокое качество 
            и соблюдение всех требований к тексту
          </p>
        </div>

        <div className="relative">
          {/* Линия соединения */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-card border-4 border-primary/20 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-3 min-h-[48px]">{step.description}</p>
                
                <div className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  <Clock className="w-3 h-3" />
                  {step.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-16 bg-card rounded-2xl p-8 shadow-xl border border-primary/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-playfair font-bold mb-4">Контроль на каждом этапе</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Персональный менеджер</h4>
                    <p className="text-sm text-muted-foreground">Курирует ваш заказ от начала до завершения</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Промежуточные отчеты</h4>
                    <p className="text-sm text-muted-foreground">Уведомления о статусе на каждом этапе</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Возможность правок</h4>
                    <p className="text-sm text-muted-foreground">Бесплатные доработки в течение 7 дней</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop" 
                alt="Процесс работы над текстом"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
