
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface Service {
  slug: string;
  name: string;
  desc: string;
}

interface OrderServiceGridProps {
  services: Service[];
  onOrderNow: () => void;
}

export default function OrderServiceGrid({ services, onOrderNow }: OrderServiceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10 mb-12 md:mb-20">
      {services.map((service, index) => (
        <Card 
          key={service.slug} 
          className="group p-4 md:p-8 hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-white/95 to-slate-50/30 backdrop-blur-sm hover:scale-105 hover:-translate-y-1 md:hover:-translate-y-3 relative overflow-hidden animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="flex flex-col h-full relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl md:rounded-3xl mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-lg">
              <Star className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-slate-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight">{service.name}</h3>
            <p className="text-slate-600 text-sm mb-4 md:mb-6 flex-grow line-clamp-3 leading-relaxed">{service.desc}</p>
            
            <div className="flex flex-col gap-3 md:gap-4">
              <Button asChild variant="outline" size="sm" className="border-2 border-slate-200/60 hover:border-blue-400/60 hover:bg-blue-50/80 transition-all duration-300 font-medium text-sm">
                <Link to={`/service/${service.slug}`}>Подробнее</Link>
              </Button>
              <Button 
                onClick={onOrderNow}
                size="sm" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 font-semibold text-sm"
              >
                Заказать сейчас
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
