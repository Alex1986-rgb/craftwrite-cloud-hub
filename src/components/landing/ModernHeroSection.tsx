import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  Star,
  Users,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ModernHeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { icon: Users, value: '2000+', label: 'Клиентов', color: 'text-blue-500' },
    { icon: Target, value: '99.9%', label: 'Качество', color: 'text-emerald-500' },
    { icon: TrendingUp, value: '180%', label: 'Рост конверсии', color: 'text-purple-500' },
    { icon: Shield, value: '100%', label: 'Уникальность', color: 'text-orange-500' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl animate-spatial-float"
          style={{
            left: `${mousePosition.x * 0.05}%`,
            top: `${mousePosition.y * 0.05}%`,
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full blur-3xl animate-spatial-float"
          style={{
            right: `${mousePosition.x * 0.03}%`,
            bottom: `${mousePosition.y * 0.03}%`,
            animationDelay: '2s'
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-text-reveal' : 'opacity-0'}`}>
            {/* Badge */}
            <Badge className="glass-effect text-primary border-primary/20 hover:border-primary/40 transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2" />
              Премиум копирайтинг 2025
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold font-playfair text-3d">
                <span className="block gradient-liquid bg-clip-text text-transparent animate-gradient-shift">
                  CopyPro Cloud
                </span>
                <span className="block text-foreground mt-2">
                  Будущее контента
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Революционная платформа AI-копирайтинга. 
                <span className="text-primary font-semibold"> Создаем тексты, которые продают на 180% лучше.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/order">
                <Button 
                  size="lg" 
                  className="magnetic glass-card bg-primary hover:bg-primary/90 text-primary-foreground border-none shadow-2xl group"
                >
                  <Zap className="w-5 h-5 mr-2 group-hover:animate-bounce-soft" />
                  Заказать сейчас
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="magnetic glass-effect border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              >
                Посмотреть портфолио
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">4.9/5 рейтинг</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span className="text-sm text-muted-foreground">Гарантия качества</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">+40% конверсия</span>
              </div>
            </div>
          </div>

          {/* Floating Stats Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`morph-card neomorphism p-6 text-center floating`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3 animate-glow-pulse`} />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 glass-card rounded-full flex items-center justify-center floating">
              <Sparkles className="w-12 h-12 text-primary animate-morph" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-24 h-24 glass-card rounded-full flex items-center justify-center floating" style={{ animationDelay: '1s' }}>
              <Zap className="w-8 h-8 text-yellow-500 animate-liquid-flow" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-soft">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}