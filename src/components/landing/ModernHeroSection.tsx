import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import FloatingParticles from "@/components/ui/floating-particles";
import AnimatedCounter from "@/components/ui/animated-counter";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star, Zap, Shield, Award, TrendingUp, CheckCircle, Play, Globe, Users, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ModernHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const trustIndicators = [
    { icon: Star, text: "4.9/5", value: "98% довольных", gradient: "from-yellow-400 to-orange-500" },
    { icon: Shield, text: "100%", value: "Гарантия качества", gradient: "from-green-400 to-emerald-500" },
    { icon: Clock, text: "24ч", value: "Быстрая доставка", gradient: "from-blue-400 to-cyan-500" },
    { icon: Award, text: "50+", value: "Экспертов", gradient: "from-purple-400 to-pink-500" }
  ];

  const stats = [
    { value: 5000, suffix: "+", label: "Проектов", icon: Globe },
    { value: 98, suffix: "%", label: "Довольных", icon: Star },
    { value: 24, suffix: "ч", label: "Мин. срок", icon: Clock },
    { value: 180, suffix: "%", label: "Рост продаж", icon: TrendingUp }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-pink-400/8 to-violet-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Particles */}
        <FloatingParticles count={30} />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.03)_1px,transparent_0)] [background-size:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Premium Badge */}
            <GlassCard variant="frosted" className="inline-flex items-center gap-3 px-6 py-4">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Award className="w-3 h-3 text-white" />
              </div>
              <span className="text-slate-800 font-semibold">Премиальный копирайтинг с 2019 года</span>
            </GlassCard>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                  Продающие
                </div>
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  тексты
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl mt-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  от 500₽ за 24 часа
                </div>
              </h1>
              
              <p className="text-xl sm:text-2xl text-slate-600 max-w-2xl leading-relaxed">
                Команда из <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50+ экспертов</span> создает контент, 
                который увеличивает продажи на <span className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">40-180%</span>
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              {trustIndicators.map((indicator, index) => (
                <GlassCard key={index} variant="elevated" className="group p-4 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${indicator.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <indicator.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-slate-800">{indicator.text}</div>
                      <div className="text-sm text-slate-600">{indicator.value}</div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="group px-10 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 text-lg" 
                asChild
              >
                <Link to="#order" className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  Заказать текст
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="group px-10 py-6 border-2 border-slate-300 text-slate-700 hover:bg-white/80 backdrop-blur-sm rounded-2xl transition-all duration-500 hover:scale-105 text-lg font-semibold"
                asChild
              >
                <Link to="/portfolio" className="flex items-center gap-3">
                  <Play className="w-6 h-6" />
                  Примеры работ
                </Link>
              </Button>
            </div>

            {/* Quick Features */}
            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
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
          </div>

          {/* Right Column - Stats & Visual */}
          <div className={`space-y-8 transition-all duration-1200 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <GlassCard key={index} variant="frosted" className="group p-8 text-center hover:scale-105">
                  <div className="flex flex-col items-center space-y-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${
                      index === 0 ? 'from-blue-500 to-cyan-500' :
                      index === 1 ? 'from-yellow-500 to-orange-500' :
                      index === 2 ? 'from-green-500 to-emerald-500' :
                      'from-purple-500 to-pink-500'
                    } rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <AnimatedCounter 
                      end={stat.value}
                      suffix={stat.suffix}
                      className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                    />
                    <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Achievement Card */}
            <GlassCard variant="elevated" className="bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-blue-700/90 p-8 text-white relative overflow-hidden group hover:scale-105">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">5 лет</div>
                    <div className="text-blue-100 text-lg">в топе рынка</div>
                  </div>
                </div>
                <p className="text-blue-50 leading-relaxed text-lg">
                  Помогли 1000+ компаниям увеличить продажи с помощью качественного контента
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;