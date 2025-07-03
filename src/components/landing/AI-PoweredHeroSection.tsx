import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowDown, Zap, FileText, TrendingUp, Users, Clock, Target } from "lucide-react";

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
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-500/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-12">
          
          {/* Main Hero Content */}
          <div className="space-y-8">
            <Badge className="glass-interactive px-6 py-2 text-lg font-medium">
              🤖 AI-Powered Content Factory
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient">CopyPro Cloud</span>
                <br />
                <span className="text-foreground">Массовое создание</span>
                <br />
                <span className="text-gradient">SEO-контента</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Загружайте файл с <strong>1000+ URL</strong> — получайте готовую таблицу с 
                <strong> SEO-текстами, мета-тегами и LSI-ключами</strong> за час
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="glass-interactive px-8 py-4 text-lg font-semibold">
                <Zap className="w-5 h-5 mr-2" />
                Загрузить файл с URL
              </Button>
              <Button variant="outline" size="lg" className="glass-interactive px-8 py-4 text-lg">
                <FileText className="w-5 h-5 mr-2" />
                Посмотреть примеры
              </Button>
            </div>
          </div>

          {/* AI Stats Glass Panel */}
          <Card className="glass-hero max-w-4xl mx-auto p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {AI_STATS.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-gradient">
                    {animatedStats[index].toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Demo Process Visualization */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Step 1 */}
              <Card className="glass-panel p-6 text-center space-y-4 stagger-item">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">1. Загружаете файл</h3>
                <p className="text-muted-foreground">
                  Excel/CSV с URL-адресами ваших страниц (до 10,000 строк)
                </p>
              </Card>

              {/* Step 2 */}
              <Card className="glass-panel p-6 text-center space-y-4 stagger-item">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-400 rounded-full flex items-center justify-center animate-pulse">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">2. AI обрабатывает</h3>
                <p className="text-muted-foreground">
                  Анализ конкурентов, подбор ключей, LSI-распределение
                </p>
              </Card>

              {/* Step 3 */}
              <Card className="glass-panel p-6 text-center space-y-4 stagger-item">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">3. Получаете результат</h3>
                <p className="text-muted-foreground">
                  Готовая таблица с SEO-текстами, Title, Description
                </p>
              </Card>
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