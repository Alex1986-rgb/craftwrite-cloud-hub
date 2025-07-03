import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowDown, Zap, FileText, TrendingUp, Users, Clock, Target } from "lucide-react";
import NextGenParticleField from "./NextGenParticleField";
import HolographicCard from "./HolographicCard";

const AI_STATS = [
  { label: "SEO-текстов сгенерировано", value: 12847, suffix: "+" },
  { label: "Клиентов довольны", value: 2156, suffix: "%" },
  { label: "Ключевых слов обработано", value: 895420, suffix: "K" },
  { label: "Часов экономии времени", value: 15672, suffix: "H" }
];

export default function AIPoweredHeroSection() {
  const [animatedStats, setAnimatedStats] = useState(AI_STATS.map(() => 0));

  useEffect(() => {
    const timers = AI_STATS.map((stat, index) => {
      return setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.value / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = Math.floor(current);
            return newStats;
          });
        }, duration / steps);
      }, index * 200);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Next-Gen Animated Background */}
      <div className="absolute inset-0 morphing-gradient">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        
        {/* Advanced Particle System */}
        <NextGenParticleField />
        
        {/* Holographic Elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 glass-holographic rounded-full floating-3d"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-12">
          
          {/* Main Hero Content */}
          <div className="space-y-8">
            <Badge className="glass-holographic neon-glow px-8 py-3 text-xl font-medium">
              🤖 Next-Gen AI Content Platform
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-holographic">CopyPro Cloud</span>
                <br />
                <span className="text-foreground">Профессиональное создание</span>
                <br />
                <span className="text-holographic">SEO-контента за 3 дня</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Загружайте файл с <strong>1000+ URL</strong> — получайте готовую таблицу с 
                <strong> экспертно проверенными SEO-текстами, мета-тегами и LSI-ключами</strong> за 3 дня
              </p>
            </div>

            {/* Next-Gen CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="glass-ultra magnetic-hover px-10 py-5 text-xl font-semibold">
                <Zap className="w-6 h-6 mr-3" />
                Заказать профессиональную обработку
              </Button>
              <Button variant="outline" size="lg" className="glass-holographic neon-glow px-10 py-5 text-xl">
                <FileText className="w-6 h-6 mr-3" />
                Посмотреть примеры работ
              </Button>
            </div>
          </div>

          {/* Next-Gen AI Stats Panel */}
          <HolographicCard variant="ultra" className="max-w-5xl mx-auto p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-holographic mb-2">
                Результаты профессиональной работы
              </h3>
              <p className="text-muted-foreground">3 дня экспертного качества вместо 1 часа автоматизации</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {AI_STATS.map((stat, index) => (
                <div key={index} className="text-center space-y-3 magnetic-hover">
                  <div className="text-4xl md:text-5xl font-bold text-holographic">
                    {animatedStats[index].toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </HolographicCard>

          {/* Demo Process Visualization */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Step 1 */}
              <HolographicCard variant="neon" className="p-8 text-center space-y-6 stagger-item liquid-morph">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center floating-3d">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-holographic">1. Загружаете файл</h3>
                <p className="text-muted-foreground text-lg">
                  Excel/CSV с URL-адресами ваших страниц (до 10,000 строк)
                </p>
                <Badge className="glass-interactive">День 1: Начало</Badge>
              </HolographicCard>

              {/* Step 2 */}
              <HolographicCard variant="neon" className="p-8 text-center space-y-6 stagger-item liquid-morph">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-400 rounded-full flex items-center justify-center floating-3d neon-glow">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-holographic">2. Экспертная обработка</h3>
                <p className="text-muted-foreground text-lg">
                  AI-анализ + проверка 50+ экспертов-копирайтеров
                </p>
                <Badge className="glass-interactive">День 1-2: Работа</Badge>
              </HolographicCard>

              {/* Step 3 */}
              <HolographicCard variant="neon" className="p-8 text-center space-y-6 stagger-item liquid-morph">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center floating-3d">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-holographic">3. Готовый результат</h3>
                <p className="text-muted-foreground text-lg">
                  Проверенная таблица с гарантией качества
                </p>
                <Badge className="glass-interactive">День 3: Результат</Badge>
              </HolographicCard>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center pt-8">
            <div className="animate-bounce">
              <ArrowDown className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}