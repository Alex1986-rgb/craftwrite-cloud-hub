
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import OrderServiceCard from "./OrderServiceCard";
import { cn } from "@/lib/utils";

interface ServiceSelectorProps {
  services: string[];
  selectedService: string;
  onServiceSelect: (service: string) => void;
  className?: string;
}

export default function ServiceSelector({ 
  services, 
  selectedService, 
  onServiceSelect,
  className 
}: ServiceSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredServices = services.filter(service =>
    service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedServices = showAll ? filteredServices : filteredServices.slice(0, 6);
  const hasMoreServices = filteredServices.length > 6;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="service-search">Выберите услугу *</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="service-search"
            placeholder="Найти услугу..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {searchTerm && (
          <div className="text-sm text-muted-foreground">
            Найдено: {filteredServices.length} услуг
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {displayedServices.map((service) => (
          <OrderServiceCard
            key={service}
            label={service}
            active={selectedService === service}
            onClick={() => onServiceSelect(service)}
          />
        ))}
      </div>

      {hasMoreServices && !showAll && (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="text-primary hover:text-primary/80 text-sm font-medium underline-offset-4 hover:underline"
          >
            Показать все услуги ({filteredServices.length - 6} еще)
          </button>
        </div>
      )}

      {filteredServices.length === 0 && searchTerm && (
        <div className="text-center py-8 text-muted-foreground">
          <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Услуги не найдены</p>
          <p className="text-sm">Попробуйте изменить поисковый запрос</p>
        </div>
      )}
    </div>
  );
}
