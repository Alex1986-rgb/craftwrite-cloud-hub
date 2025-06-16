
import { Link } from 'react-router-dom';
import { SERVICES } from '@/data/services';
import { Clock, DollarSign, Star, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';

export default function ServicesCatalog() {
  const categories = [...new Set(SERVICES.map(s => s.category))];

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      'SEO и контент-маркетинг': TrendingUp,
      'Продающие тексты': Award,
      'Социальные сети': Users,
      'Маркетплейсы': DollarSign,
      'Корпоративные тексты': Star
    };
    const IconComponent = icons[category] || Star;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero секция */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Каталог услуг копирайтинга
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
          Профессиональное написание текстов для любых целей. 
          Более 18 видов контента от опытных копирайтеров с гарантией качества.
        </p>
        
        {/* Статистика */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">500+</div>
            <div className="text-gray-600">Довольных клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">24/7</div>
            <div className="text-gray-600">Поддержка</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">95%+</div>
            <div className="text-gray-600">Уникальность</div>
          </div>
        </div>
      </div>

      {/* Категории услуг */}
      {categories.map(category => (
        <div key={category} className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-100 rounded-lg">
              {getCategoryIcon(category)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {category}
              </h2>
              <p className="text-gray-600 mt-1">
                {getCategoryDescription(category)}
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES
              .filter(service => service.category === category)
              .map(service => (
                <div 
                  key={service.slug}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
                >
                  {/* Заголовок карточки */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        {[...Array(service.popularity)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {service.desc}
                    </p>
                  </div>
                  
                  {/* Информация о цене и сроках */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-bold">от {service.price.min} ₽</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {service.deliveryTime.min}-{service.deliveryTime.max} {service.deliveryTime.unit}
                        </span>
                      </div>
                    </div>
                    
                    {/* Теги */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                      {service.tags.length > 3 && (
                        <span className="text-gray-400 text-xs font-medium">
                          +{service.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    {/* Кнопка заказа */}
                    <Link 
                      to={`/order/${service.slug}`}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
                    >
                      Заказать
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      
      {/* CTA секция */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white mt-16">
        <h2 className="text-3xl font-bold mb-4">
          Не нашли подходящую услугу?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Мы создаем любые типы текстов под ваши задачи. 
          Свяжитесь с нами для индивидуального предложения.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contact"
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Связаться с нами
          </Link>
          <a 
            href="tel:+79257338648"
            className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
          >
            +7 (925) 733-86-48
          </a>
        </div>
      </div>
    </div>
  );
}

function getCategoryDescription(category: string): string {
  const descriptions: { [key: string]: string } = {
    'SEO и контент-маркетинг': 'Тексты для поисковых систем и привлечения трафика',
    'Продающие тексты': 'Лендинги и продающие страницы с высокой конверсией',
    'Социальные сети': 'Контент для социальных платформ и мессенджеров',
    'Маркетплейсы': 'Карточки товаров для онлайн-площадок',
    'Корпоративные тексты': 'Деловая документация и презентации'
  };
  
  return descriptions[category] || 'Профессиональные тексты для вашего бизнеса';
}
