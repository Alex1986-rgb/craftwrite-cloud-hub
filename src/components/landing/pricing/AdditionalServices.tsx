
import { Clock, Shield, Users, Star, LucideIcon } from "lucide-react";

interface AdditionalService {
  name: string;
  price: string;
  icon: LucideIcon;
}

const additionalServices: AdditionalService[] = [
  { name: "Описания товаров", price: "от 150₽", icon: Clock },
  { name: "Тексты для соцсетей", price: "от 300₽", icon: Users },
  { name: "Email-рассылки", price: "от 800₽", icon: Shield },
  { name: "Продающие лендинги", price: "от 5000₽", icon: Star }
];

export default function AdditionalServices() {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-white rounded-3xl p-8 md:p-12 border border-slate-200/50 shadow-xl">
      <div className="text-center mb-8">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Дополнительные услуги
        </h3>
        <p className="text-lg text-muted-foreground">
          Расширьте возможности вашего контент-маркетинга
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {additionalServices.map((service) => (
          <div key={service.name} className="group text-center p-6 bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <service.icon className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2 text-foreground">{service.name}</h4>
            <p className="text-lg font-bold text-primary">{service.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
