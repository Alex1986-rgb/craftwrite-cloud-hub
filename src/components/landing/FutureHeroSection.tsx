
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Play, Zap, Star, Award, Users, CheckCircle } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function FutureHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStats, setActiveStats] = useState(0);
  const { trackInteraction } = useAnalytics();

  useEffect(() => {
    setIsVisible(true);
    
    // Анимация счетчиков
    const interval = setInterval(() => {
      setActiveStats(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: '2000+', label: 'Проектов', icon: Star },
    { number: '100%', label: 'Уникальность', icon: CheckCircle },
    { number: '30+', label: 'Экспертов', icon: Users },
    { number: '24ч', label: 'Доставка', icon: Zap }
  ];

  const handleCTAClick = (action: string) => {
    trackInteraction('hero_cta', action, { location: 'hero_section' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden particle-bg">
      {/* Динамический фон с градиентами */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl floating"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl floating-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl morphing-shape"></div>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        
        {/* Floating badges */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-8 animate-slide-up-stagger stagger-1">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className={`glass-card-modern transition-all duration-500 ${
                  activeStats === index ? 'glow-primary scale-110' : ''
                }`}
              >
                <div className="flex items-center gap-2 px-4 py-2">
                  <IconComponent className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-blue-600">{stat.number}</span>
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main heading с кинетической типографией */}
        <div className="mb-8 animate-slide-up-stagger stagger-2">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-primary font-bold leading-tight mb-4">
            <span className="block text-gradient-cyber">CopyPro</span>
            <span className="block text-gradient-primary">Cloud</span>
          </h1>
          <div className="relative">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-secondary font-medium text-gray-700 dark:text-gray-300">
              Будущее профессионального копирайтинга
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-primary rounded-full"></div>
          </div>
        </div>

        {/* Revolutionary subtitle */}
        <div className="max-w-4xl mx-auto mb-12 animate-slide-up-stagger stagger-3">
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 text-balance">
            Создаём контент нового поколения с помощью команды из 30+ AI-экспертов 
            и революционных технологий копирайтинга
          </p>
          
          {/* Interactive features list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { icon: Star, text: 'AI-powered контент', color: 'text-yellow-500' },
              { icon: Zap, text: 'Мгновенная доставка', color: 'text-blue-500' },
              { icon: Award, text: 'Премиум качество', color: 'text-purple-500' }
            ].map((feature, index) => (
              <div key={index} className="glass-card-modern glow-hover">
                <feature.icon className={`w-6 h-6 ${feature.color} mx-auto mb-2`} />
                <p className="text-sm font-medium">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next-gen CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up-stagger stagger-4">
          <Button 
            size="lg" 
            className="btn-modern group px-12 py-6 text-lg font-bold shadow-2xl" 
            asChild
            onClick={() => handleCTAClick('order_now')}
          >
            <Link to="/smart-order" className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              Создать контент
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="neo-card px-8 py-6 text-lg font-semibold border-0 glow-hover group"
            onClick={() => handleCTAClick('watch_demo')}
          >
            <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
            Смотреть демо
          </Button>
        </div>

        {/* Interactive stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up-stagger stagger-5">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className={`glass-card-modern text-center cursor-pointer transition-all duration-500 hover:scale-110 ${
                  activeStats === index ? 'glow-primary' : 'hover:glow-secondary'
                }`}
                onClick={() => setActiveStats(index)}
              >
                <IconComponent className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <div className="text-3xl font-bold text-gradient-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating call to action */}
        <div className="fixed bottom-8 right-8 z-50 animate-slide-up-stagger stagger-6">
          <Button 
            className="btn-modern rounded-full w-16 h-16 p-0 shadow-2xl"
            onClick={() => handleCTAClick('floating_cta')}
            asChild
          >
            <Link to="/contact">
              <Sparkles className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
