
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target } from "lucide-react";

const ServiceCTA = () => {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-br from-white/80 via-blue-50/50 to-purple-50/30 backdrop-blur-lg rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-2xl border border-blue-200/30 relative overflow-hidden max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Нужен другой тип текста?
          </h3>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            Создаем тексты любой сложности и тематики. Обсудим ваш уникальный проект!
          </p>
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 border-0 rounded-full px-8 py-4 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Link to="/order" className="flex items-center gap-3">
              <Target className="w-5 h-5" />
              Обсудить проект
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCTA;
