
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceSelectorProps {
  services: string[];
  selectedService: string;
  onServiceSelect: (service: string) => void;
  className?: string;
}

interface ServiceCardProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function ServiceCard({ label, active, onClick }: ServiceCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
        active ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className={cn(
            "font-medium",
            active ? "text-blue-700" : "text-gray-700"
          )}>
            {label}
          </span>
          {active && (
            <Check className="w-5 h-5 text-blue-600" />
          )}
        </div>
      </CardContent>
    </Card>
  );
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
          <ServiceCard
            key={service}
            label={service}
            active={selectedService === service}
            onClick={() => onServiceSelect(service)}
          />
        ))}
      </div>

      {hasMoreServices && !showAll && (
        <div className="text-center">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowAll(true)}
            className="text-primary hover:text-primary/80"
          >
            Показать все услуги ({filteredServices.length - 6} еще)
          </Button>
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
