
import ServiceSelector from "./ServiceSelector";

interface OrderFormServiceProps {
  filteredServices: string[];
  selectedService: string;
  onServiceSelect: (service: string) => void;
}

export default function OrderFormService({ 
  filteredServices, 
  selectedService, 
  onServiceSelect 
}: OrderFormServiceProps) {
  return (
    <section 
      className="space-y-4 md:space-y-6" 
      aria-labelledby="service-selection-heading"
      role="group"
      itemScope
      itemType="https://schema.org/Service"
    >
      <header>
        <h3 
          id="service-selection-heading"
          className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
        >
          Тип услуги
        </h3>
        <p className="text-sm text-gray-600 mt-2" id="service-description">
          Выберите наиболее подходящий тип контента для вашего проекта
        </p>
      </header>
      
      <div 
        role="radiogroup" 
        aria-labelledby="service-selection-heading"
        aria-describedby="service-description"
        aria-required="true"
      >
        <ServiceSelector
          services={filteredServices}
          selectedService={selectedService}
          onServiceSelect={onServiceSelect}
        />
      </div>
      
      {selectedService && (
        <div 
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4"
          role="status"
          aria-live="polite"
          aria-label={`Выбрана услуга: ${selectedService}`}
        >
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" aria-hidden="true"></div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Выбранная услуга:</h4>
              <p className="text-sm text-blue-700" itemProp="name">{selectedService}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Structured data for selected service */}
      {selectedService && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": selectedService,
              "serviceType": "Copywriting",
              "provider": {
                "@type": "Organization",
                "name": "CopyPro Cloud",
                "url": "https://copypro.cloud"
              },
              "areaServed": "RU",
              "availableLanguage": "Russian"
            })
          }}
        />
      )}
    </section>
  );
}
