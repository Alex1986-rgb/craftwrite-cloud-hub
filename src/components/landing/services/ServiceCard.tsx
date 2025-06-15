
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, CheckCircle } from "lucide-react";
import type { Service } from "./servicesData";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <div
      className="group relative bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Card background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Enhanced Icon */}
        <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
          <service.icon className="w-6 h-6 text-white" />
        </div>
        
        {/* Title and Price */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
            {service.title}
          </h3>
          <div className={`bg-gradient-to-r ${service.gradient} text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-md ml-2`}>
            {service.price}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-slate-600 leading-relaxed mb-4 text-sm">
          {service.desc}
        </p>
        
        {/* Features */}
        <div className="space-y-1 mb-4">
          {service.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <Button 
          asChild 
          className={`w-full group/btn bg-gradient-to-r ${service.gradient} hover:opacity-90 border-0 rounded-xl py-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm`}
        >
          <Link to="/order" className="flex items-center justify-center gap-2">
            <Zap className="w-3 h-3" />
            Заказать
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
