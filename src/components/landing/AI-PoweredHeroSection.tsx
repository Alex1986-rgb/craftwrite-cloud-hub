import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowDown, Zap, FileText, TrendingUp, Users, Clock, Target } from "lucide-react";
import CyberParticleField from "./CyberParticleField";
import HolographicIcon from "./HolographicIcon";

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
      {/* Next-Gen Cyber Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--deep-space))] via-[hsl(var(--ai-blue)/0.1)] to-[hsl(var(--electric-purple)/0.1)]">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Interactive Particle Field */}
        <CyberParticleField />
        
        {/* Holographic Grid */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, hsl(var(--ai-blue)/0.1) 1px, transparent 1px),
                linear-gradient(180deg, hsl(var(--electric-purple)/0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              animation: 'gradient-shift 8s ease-in-out infinite'
            }}
          />
        </div>
        
        {/* Floating Cyber Elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-float cyber-glow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
                backgroundColor: i % 2 === 0 ? 'hsl(var(--ai-blue))' : 'hsl(var(--neon-green))'
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-12">
          
          {/* Main Hero Content */}
          <div className="space-y-8">
            <Badge className="holographic-border px-6 py-2 text-lg font-medium bg-black/20 backdrop-blur-xl">
              <HolographicIcon icon={Zap} size={20} className="mr-2" />
              <span className="text-gradient-holographic">AI-Powered Content Factory</span>
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient-holographic drop-shadow-2xl">CopyPro Cloud</span>
                <br />
                <span className="text-white/90 drop-shadow-lg">Массовое создание</span>
                <br />
                <span className="text-gradient-holographic drop-shadow-2xl">SEO-контента</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                Загружайте файл с <strong className="text-gradient">1000+ URL</strong> — получайте готовую таблицу с 
                <strong className="text-gradient"> SEO-текстами, мета-тегами и LSI-ключами</strong> за 3 дня
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="cyber-glow magnetic-hover px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[hsl(var(--ai-blue))] to-[hsl(var(--electric-purple))] text-white border-0">
                <HolographicIcon icon={Zap} size={20} className="mr-2" />
                Загрузить файл с URL
              </Button>
              <Button variant="outline" size="lg" className="holographic-border magnetic-hover px-8 py-4 text-lg bg-black/20 backdrop-blur-xl text-white">
                <HolographicIcon icon={FileText} size={20} className="mr-2" />
                Посмотреть примеры
              </Button>
            </div>
          </div>

          {/* AI Stats Holographic Panel */}
          <Card className="holographic-border cyber-glow max-w-4xl mx-auto p-8 bg-black/10 backdrop-blur-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {AI_STATS.map((stat, index) => (
                <div key={index} className="text-center space-y-2 magnetic-hover">
                  <div className="text-3xl md:text-4xl font-bold text-gradient-holographic drop-shadow-xl">
                    {animatedStats[index].toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Demo Process Visualization */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Step 1 */}
              <Card className="holographic-border cyber-glow p-6 text-center space-y-4 stagger-item magnetic-hover bg-black/10 backdrop-blur-xl">
                <div className="w-16 h-16 mx-auto cyber-glow rounded-full flex items-center justify-center bg-gradient-to-br from-[hsl(var(--ai-blue))] to-[hsl(var(--neon-green))]">
                  <HolographicIcon icon={FileText} size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white">1. Загружаете файл</h3>
                <p className="text-white/70">
                  Excel/CSV с URL-адресами ваших страниц (до 10,000 строк)
                </p>
              </Card>

              {/* Step 2 */}
              <Card className="holographic-border cyber-glow p-6 text-center space-y-4 stagger-item magnetic-hover bg-black/10 backdrop-blur-xl">
                <div className="w-16 h-16 mx-auto cyber-glow rounded-full flex items-center justify-center bg-gradient-to-br from-[hsl(var(--electric-purple))] to-[hsl(var(--cyber-gold))]">
                  <HolographicIcon icon={Zap} size={32} animated />
                </div>
                <h3 className="text-xl font-semibold text-white">2. AI обрабатывает</h3>
                <p className="text-white/70">
                  Анализ конкурентов, подбор ключей, LSI-распределение
                </p>
              </Card>

              {/* Step 3 */}
              <Card className="holographic-border cyber-glow p-6 text-center space-y-4 stagger-item magnetic-hover bg-black/10 backdrop-blur-xl">
                <div className="w-16 h-16 mx-auto cyber-glow rounded-full flex items-center justify-center bg-gradient-to-br from-[hsl(var(--neon-green))] to-[hsl(var(--ai-blue))]">
                  <HolographicIcon icon={TrendingUp} size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white">3. Получаете результат</h3>
                <p className="text-white/70">
                  Готовая таблица с SEO-текстами, Title, Description
                </p>
              </Card>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center pt-8">
            <div className="animate-bounce cyber-glow p-3 rounded-full">
              <HolographicIcon icon={ArrowDown} size={24} animated />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}