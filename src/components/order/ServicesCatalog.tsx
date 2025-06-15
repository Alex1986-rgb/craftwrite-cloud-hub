
import { Link } from 'react-router-dom';
import { SERVICES } from '@/data/services';
import { Clock, DollarSign, Star } from 'lucide-react';

export default function ServicesCatalog() {
  const categories = [...new Set(SERVICES.map(s => s.category))];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Каталог услуг копирайтинга
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Профессиональное написание текстов для любых целей. 
          Выберите подходящую услугу и оформите заказ онлайн.
        </p>
      </div>

      {categories.map(category => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-500 pl-4">
            {category}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES
              .filter(service => service.category === category)
              .map(service => (
                <Link 
                  key={service.slug}
                  to={`/order/${service.slug}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {[...Array(service.popularity)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.desc}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-green-600">
                      <DollarSign className="w-4 h-4" />
                      <span>от {service.price.min} {service.price.currency}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                      <Clock className="w-4 h-4" />
                      <span>{service.deliveryTime.min}-{service.deliveryTime.max} {service.deliveryTime.unit}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1">
                      {service.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                      {service.tags.length > 3 && (
                        <span className="text-gray-400 text-xs">
                          +{service.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
