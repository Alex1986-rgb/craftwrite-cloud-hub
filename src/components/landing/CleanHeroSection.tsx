import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle, Star, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";

const CleanHeroSection = () => {
  const trustBadges = [
    { icon: Star, text: "4.9/5", label: "Рейтинг клиентов" },
    { icon: Award, text: "50+", label: "Экспертов" },
    { icon: Clock, text: "24ч", label: "Мин. срок" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(100,116,139,0.15)_1px,transparent_0)] [background-size:24px_24px]"></div>
      </div>
      
      {/* Single accent blob */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center space-y-12">
          
          {/* Trust indicators */}
          <div className="flex justify-center items-center gap-8 mb-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-slate-700">
                <badge.icon className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-bold text-lg">{badge.text}</div>
                  <div className="text-sm text-slate-500">{badge.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Main headline - simplified */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight">
              Продающие тексты
              <br />
              <span className="text-blue-600">от 500₽ за 24 часа</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Команда из 50+ экспертов создает контент, который увеличивает продажи на 40-180%
            </p>
          </div>

          {/* Clean CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-10 py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300" 
              asChild
            >
              <Link to="#order" className="flex items-center gap-3">
                Заказать текст
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-10 py-6 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-lg font-semibold"
              asChild
            >
              <Link to="/portfolio" className="flex items-center gap-3">
                <Play className="w-5 h-5" />
                Примеры работ
              </Link>
            </Button>
          </div>

          {/* Simple guarantees */}
          <div className="flex flex-wrap justify-center gap-8 text-slate-600">
            {[
              "Без предоплаты",
              "Правки бесплатно", 
              "Гарантия результата"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Clean stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">5000+</div>
              <div className="text-slate-600">Проектов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">98%</div>
              <div className="text-slate-600">Довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">24ч</div>
              <div className="text-slate-600">Минимальный срок</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleanHeroSection;