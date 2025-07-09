import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star, Zap, Shield, Award, TrendingUp, CheckCircle, Play, Users, Palette, Target } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ModernHeroSection = () => {
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const isMobile = useIsMobile();

  const testimonials = [
    { text: "Продажи выросли на 180% за 3 месяца", author: "Дмитрий К., IT-компания" },
    { text: "Лучшие тексты на рынке!", author: "Анна М., E-commerce" },
    { text: "Команда мечты для бизнеса", author: "Сергей Р., Стартап" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setAnimatedNumber(prev => prev < 2000 ? prev + 67 : 2000);
    }, 30);

    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    
    return () => {
      clearInterval(timer);
      clearInterval(testimonialTimer);
    };
  }, []);

  const trustMetrics = [
    { icon: Star, text: "4.9★", subtext: "Рейтинг клиентов", color: "text-yellow-500" },
    { icon: Users, text: "52", subtext: "Эксперта", color: "text-blue-500" },
    { icon: Shield, text: "100%", subtext: "Уникальность", color: "text-green-500" },
    { icon: Zap, text: "24ч", subtext: "Экспресс", color: "text-purple-500" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20">
      {/* Modern geometric background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/4 to-purple-500/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-emerald-500/4 to-cyan-500/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-16 w-2 h-2 bg-purple-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-emerald-400/20 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Enhanced Content */}
          <div className={`space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Premium Badge with Animation */}
            <div className="flex items-center justify-start">
              <Badge className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500/15 to-purple-500/15 text-blue-800 border-blue-200/50 hover:scale-105 transition-all duration-300 shadow-lg backdrop-blur-sm">
                <Award className="w-5 h-5" />
                <span className="font-semibold">Элитная команда с 2019 года</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </Badge>
            </div>

            {/* Revolutionary Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                  Тексты, которые
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  продают сами
                </span>
              </h1>
              
              <div className="space-y-4">
                <p className="text-xl sm:text-2xl text-slate-600 font-medium leading-relaxed">
                  <span className="text-blue-600 font-bold">52 эксперта</span> создают контент, 
                  который увеличивает продажи на <span className="text-green-600 font-bold">40-180%</span>
                </p>
                
                {/* Rotating testimonial */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-slate-500">Отзыв клиента</span>
                  </div>
                  <p className="text-slate-700 italic font-medium">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    — {testimonials[currentTestimonial].author}
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Metrics Row */}
            <div className="grid grid-cols-4 gap-4">
              {trustMetrics.map((metric, index) => (
                <div key={index} className="group text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2 ${metric.color} bg-current/10`}>
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <div className={`font-bold text-lg ${metric.color}`}>{metric.text}</div>
                  <div className="text-xs text-slate-600">{metric.subtext}</div>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 text-lg relative overflow-hidden" 
                  asChild
                >
                  <Link to="#order" className="flex items-center gap-3">
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Sparkles className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">Заказать за 24 часа</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group px-10 py-5 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 rounded-2xl transition-all duration-300 hover:scale-105 text-lg font-semibold"
                  asChild
                >
                  <Link to="/portfolio" className="flex items-center gap-3">
                    <Play className="w-5 h-5" />
                    Примеры работ
                  </Link>
                </Button>
              </div>

              {/* Enhanced guarantees */}
              <div className="flex flex-wrap gap-6 text-sm">
                {[
                  { icon: CheckCircle, text: "Без предоплаты", color: "text-green-600" },
                  { icon: Shield, text: "Правки бесплатно", color: "text-blue-600" },
                  { icon: Award, text: "Гарантия результата", color: "text-purple-600" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/50">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="font-medium text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Visual */}
          <div className={`space-y-8 transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Main Achievement Card */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-3xl font-black">5 лет</div>
                    <div className="text-blue-100 font-medium">лидер рынка</div>
                  </div>
                </div>
                <p className="text-blue-50 leading-relaxed text-lg">
                  Помогли <span className="font-bold text-white">1000+ компаниям</span> увеличить продажи 
                  с помощью профессионального контента
                </p>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {animatedNumber >= 2000 ? '2000+' : animatedNumber}
                    </div>
                    <div className="text-xs text-blue-200">проектов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-xs text-blue-200">клиентов довольны</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, value: "180%", label: "Рост конверсии", color: "from-orange-500 to-red-500" },
                { icon: Palette, value: "24ч", label: "Срок доставки", color: "from-purple-500 to-pink-500" },
                { icon: Users, value: "52", label: "Экспертов", color: "from-blue-500 to-cyan-500" },
                { icon: Award, value: "100%", label: "Уникальность", color: "from-green-500 to-emerald-500" }
              ].map((stat, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 text-center hover:scale-105 cursor-pointer">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;