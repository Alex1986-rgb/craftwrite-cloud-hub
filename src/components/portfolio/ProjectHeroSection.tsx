
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Users, Star, Zap, Target, TrendingUp } from "lucide-react";

type ProjectHeroSectionProps = {
  project: {
    title: string;
    category: string;
    date: string;
    duration: string;
    client: string;
    description: string;
  };
};

export default function ProjectHeroSection({ project }: ProjectHeroSectionProps) {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden min-h-screen flex items-center">
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/50 to-purple-900/50">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-full blur-xl animate-pulse"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <Button variant="outline" asChild className="mb-8 hover:bg-white/10 border-white/20 text-white backdrop-blur-sm animate-fade-in">
              <Link to="/portfolio" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Вернуться к портфолио
              </Link>
            </Button>
            
            <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Badge className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 text-lg border-0 shadow-lg animate-pulse-glow">
                <Star className="w-5 h-5 mr-2" />
                {project.category}
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-playfair font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight animate-scale-in" style={{ animationDelay: '0.4s' }}>
              {project.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-200 max-w-4xl leading-relaxed mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Zap className="w-5 h-5 mr-2" />
                Изучить кейс
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm">
                <Target className="w-5 h-5 mr-2" />
                Обсудить проект
              </Button>
            </div>
          </div>

          {/* Floating Metadata Cards */}
          <div className="lg:col-span-4 space-y-6">
            <div className="grid gap-4">
              {/* Project Info Cards */}
              <div className="glass-effect rounded-2xl p-6 hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-lg">Дата запуска</div>
                    <div className="text-blue-200">{project.date}</div>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-2xl p-6 hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '1.2s' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-lg">Длительность</div>
                    <div className="text-green-200">{project.duration}</div>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-2xl p-6 hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '1.4s' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-lg">Клиент</div>
                    <div className="text-purple-200">{project.client}</div>
                  </div>
                </div>
              </div>

              {/* Success Indicator */}
              <div className="glass-effect rounded-2xl p-6 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-500/30 hover:shadow-glow-green transition-all duration-500 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '1.6s' }}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl animate-pulse">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-lg">Статус</div>
                    <div className="text-emerald-200 font-bold">Успешно завершен</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-soft">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
