
import { useParams } from 'react-router-dom';
import UnifiedOrderForm from '@/components/order/UnifiedOrderForm';
import { SERVICES } from '@/data/services';
import { getPromptByServiceId } from '@/data/servicesWithPrompts';

interface ServiceHeroProps {
  service: any;
  prompt?: any;
}

function ServiceHero({ service, prompt }: ServiceHeroProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-12 mb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Заказать {service.name}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {service.detail}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <span className="text-sm text-gray-500">Цена от</span>
              <div className="font-bold text-lg text-blue-600">
                {service.price.min} {service.price.currency}
              </div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <span className="text-sm text-gray-500">Срок</span>
              <div className="font-bold text-lg text-green-600">
                {service.deliveryTime.min}-{service.deliveryTime.max} {service.deliveryTime.unit}
              </div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <span className="text-sm text-gray-500">Сложность</span>
              <div className="font-bold text-lg text-orange-600">
                {service.difficulty}
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
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Что входит в услугу
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {service.features.map((feature: string, index: number) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">{feature}</span>
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
    <div className="bg-amber-50 rounded-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-amber-800 mb-4">
        Требования для заказа
      </h3>
      <ul className="space-y-2">
        {service.rules.map((rule: string, index: number) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-amber-600 font-bold">•</span>
            <span className="text-amber-700">{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SpecializedOrderPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  
  const service = SERVICES.find(s => s.slug === serviceId);
  const prompt = serviceId ? getPromptByServiceId(serviceId) : null;

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Услуга не найдена
        </h1>
        <p className="text-gray-600">
          Запрашиваемая услуга не существует или была удалена.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceHero service={service} prompt={prompt} />
      
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Основная колонка с формой */}
            <div className="lg:col-span-2">
              <UnifiedOrderForm 
                variant="public" 
                onOrderCreated={() => {
                  console.log('Заказ создан для услуги:', serviceId);
                }}
              />
            </div>
            
            {/* Боковая колонка с информацией */}
            <div className="lg:col-span-1">
              <ServiceFeatures service={service} />
              <ServiceRules service={service} />
              
              {service.recs && service.recs.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    Рекомендации
                  </h3>
                  <ul className="space-y-2">
                    {service.recs.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold">💡</span>
                        <span className="text-blue-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Популярные теги
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
