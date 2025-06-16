
import { useParams } from 'react-router-dom';
import UnifiedOrderForm from '@/components/order/UnifiedOrderForm';
import { SERVICES } from '@/data/services';
import { getPromptByServiceId } from '@/data/servicesWithPrompts';
import { Clock, DollarSign, CheckCircle, Star, Users, Award, TrendingUp } from 'lucide-react';

interface ServiceHeroProps {
  service: any;
  prompt?: any;
}

function ServiceHero({ service, prompt }: ServiceHeroProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 mb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Заказать {service.name}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {service.detail}
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              {[...Array(service.popularity)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-600 ml-2">Популярная услуга</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-500 font-medium">Цена от</span>
              </div>
              <div className="font-bold text-2xl text-green-600">
                {service.price.min} ₽
              </div>
            </div>
            
            <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-500 font-medium">Срок выполнения</span>
              </div>
              <div className="font-bold text-2xl text-blue-600">
                {service.deliveryTime.min}-{service.deliveryTime.max} {service.deliveryTime.unit}
              </div>
            </div>
            
            <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-gray-500 font-medium">Сложность</span>
              </div>
              <div className="font-bold text-2xl text-orange-600">
                {service.difficulty}
              </div>
            </div>
            
            <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-500 font-medium">Эффективность</span>
              </div>
              <div className="font-bold text-2xl text-purple-600">
                {Math.floor(Math.random() * 20) + 80}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ServiceFeaturesProps {
  service: any;
}

function ServiceFeatures({ service }: ServiceFeaturesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Что входит в услугу
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {service.features.map((feature: string, index: number) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <span className="text-gray-700 font-medium">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ServiceProcessProps {
  service: any;
}

function ServiceProcess({ service }: ServiceProcessProps) {
  const processSteps = getProcessSteps(service.slug);
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
      <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Процесс работы
      </h3>
      <div className="grid md:grid-cols-4 gap-6">
        {processSteps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              {index + 1}
            </div>
            <h4 className="font-bold text-lg text-gray-900 mb-2">{step.title}</h4>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ServiceRulesProps {
  service: any;
}

function ServiceRules({ service }: ServiceRulesProps) {
  return (
    <div className="bg-amber-50 rounded-xl p-8 mb-8 border-l-4 border-amber-400">
      <h3 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-3">
        <Users className="w-7 h-7" />
        Требования для заказа
      </h3>
      <div className="grid gap-4">
        {service.rules.map((rule: string, index: number) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
            <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
              {index + 1}
            </span>
            <span className="text-amber-800 font-medium">{rule}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ServiceBenefitsProps {
  service: any;
}

function ServiceBenefits({ service }: ServiceBenefitsProps) {
  const benefits = getBenefits(service.slug);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
      <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Преимущества заказа у нас
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="text-center p-6 bg-gradient-to-b from-blue-50 to-purple-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <benefit.icon className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-xl text-gray-900 mb-3">{benefit.title}</h4>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getProcessSteps(serviceSlug: string) {
  const commonSteps = [
    { title: "Заявка", description: "Заполните форму с требованиями" },
    { title: "Анализ", description: "Анализируем ваши потребности" },
    { title: "Создание", description: "Пишем качественный контент" },
    { title: "Результат", description: "Получаете готовый текст" }
  ];

  const specificSteps: { [key: string]: any[] } = {
    'seo-article': [
      { title: "Анализ ключевых слов", description: "Исследуем запросы вашей ниши" },
      { title: "Структура статьи", description: "Создаем SEO-оптимизированный план" },
      { title: "Написание текста", description: "Создаем уникальный контент" },
      { title: "SEO-проверка", description: "Проверяем и оптимизируем" }
    ],
    'landing-page': [
      { title: "Анализ аудитории", description: "Изучаем вашу целевую аудиторию" },
      { title: "Продающая структура", description: "Создаем воронку продаж" },
      { title: "Копирайтинг", description: "Пишем продающие тексты" },
      { title: "Тестирование", description: "Проверяем эффективность" }
    ],
    'email-campaigns': [
      { title: "Стратегия писем", description: "Планируем email-последовательность" },
      { title: "Сегментация", description: "Определяем целевые группы" },
      { title: "Создание писем", description: "Пишем цепляющие email" },
      { title: "Оптимизация", description: "Настраиваем для максимальной конверсии" }
    ]
  };

  return specificSteps[serviceSlug] || commonSteps;
}

function getBenefits(serviceSlug: string) {
  const commonBenefits = [
    { icon: CheckCircle, title: "Качество", description: "Профессиональные тексты от опытных копирайтеров" },
    { icon: Clock, title: "Скорость", description: "Быстрое выполнение в указанные сроки" },
    { icon: Award, title: "Гарантия", description: "Бесплатные правки до полного соответствия" }
  ];

  const specificBenefits: { [key: string]: any[] } = {
    'seo-article': [
      { icon: TrendingUp, title: "TOP поисковых систем", description: "Статьи, которые попадают в ТОП Яндекса и Google" },
      { icon: Users, title: "Целевой трафик", description: "Привлекаем именно вашу аудиторию" },
      { icon: Award, title: "Уникальность 95%+", description: "Оригинальный контент без плагиата" }
    ],
    'landing-page': [
      { icon: TrendingUp, title: "Высокая конверсия", description: "Лендинги с конверсией от 3% до 15%" },
      { icon: Users, title: "Психология продаж", description: "Используем проверенные техники убеждения" },
      { icon: Award, title: "Готовность к запуску", description: "Получаете полностью готовый текст" }
    ],
    'email-campaigns': [
      { icon: TrendingUp, title: "Высокий Open Rate", description: "Письма с открываемостью от 25%" },
      { icon: Users, title: "Персонализация", description: "Индивидуальный подход к каждому сегменту" },
      { icon: Award, title: "Готовые шаблоны", description: "Получаете серию писем для автоматизации" }
    ]
  };

  return specificBenefits[serviceSlug] || commonBenefits;
}

export default function SpecializedOrderPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  
  const service = SERVICES.find(s => s.slug === serviceId);
  const prompt = serviceId ? getPromptByServiceId(serviceId) : null;

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Услуга не найдена
        </h1>
        <p className="text-gray-600 text-lg">
          Запрашиваемая услуга не существует или была удалена.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceHero service={service} prompt={prompt} />
      
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Основная колонка с контентом */}
            <div className="lg:col-span-2">
              <ServiceBenefits service={service} />
              <ServiceProcess service={service} />
              
              {/* Форма заказа */}
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  Оформить заказ
                </h2>
                <UnifiedOrderForm 
                  variant="public" 
                  onOrderCreated={() => {
                    console.log('Заказ создан для услуги:', serviceId);
                  }}
                />
              </div>
            </div>
            
            {/* Боковая колонка с дополнительной информацией */}
            <div className="lg:col-span-1">
              <ServiceFeatures service={service} />
              <ServiceRules service={service} />
              
              {service.recs && service.recs.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-6 mb-8 border-l-4 border-blue-400">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <Star className="w-6 h-6" />
                    Рекомендации экспертов
                  </h3>
                  <div className="space-y-3">
                    {service.recs.map((rec: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <span className="text-blue-600 text-xl">💡</span>
                        <span className="text-blue-700 text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Популярные теги
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Контактная информация */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 mt-8">
                <h3 className="text-xl font-bold mb-4">Нужна консультация?</h3>
                <p className="text-gray-300 mb-4">
                  Наши эксперты ответят на все вопросы и помогут выбрать оптимальный вариант
                </p>
                <div className="space-y-2 text-sm">
                  <p>📧 optteem@mail.ru</p>
                  <p>📱 +7 (925) 733-86-48</p>
                  <p>🕒 Работаем 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
