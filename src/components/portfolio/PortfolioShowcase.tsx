
import { PORTFOLIO_EXAMPLES } from '@/data/portfolioExamples';

interface PortfolioShowcaseProps {
  maxItems?: number;
}

const PortfolioShowcase = ({ maxItems = 6 }: PortfolioShowcaseProps) => {
  const displayItems = PORTFOLIO_EXAMPLES.slice(0, maxItems);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Наши работы</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Примеры качественных текстов, которые помогли нашим клиентам достичь успеха
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-2">
                  {item.service_slug}
                </span>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {item.tags?.[0] || 'Проект'}
                  </div>
                  <div className="text-sm font-semibold text-green-600">
                    +{Object.values(item.metrics)[0] || '100%'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
