
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
    <section className="space-y-4 md:space-y-6" aria-labelledby="service-selection-heading">
      <h3 
        id="service-selection-heading"
        className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
      >
        Тип услуги
      </h3>
      <div role="region" aria-label="Выбор типа услуги">
        <ServiceSelector
          services={filteredServices}
          selectedService={selectedService}
          onServiceSelect={onServiceSelect}
        />
      </div>
    </section>
  );
}
