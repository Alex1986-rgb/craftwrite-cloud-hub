
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Users, Star, Target, Download, Share } from "lucide-react";

type CompactProjectHeroProps = {
  project: {
    title: string;
    category: string;
    date: string;
    duration: string;
    client: string;
    description: string;
  };
};

export default function CompactProjectHero({ project }: CompactProjectHeroProps) {
  return (
    <section id="hero" className="pt-24 pb-16 bg-gradient-to-br from-slate-900 via-blue-900/50 to-purple-900/30 text-white relative overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Back Button */}
        <Button variant="outline" asChild className="mb-6 hover:bg-white/10 border-white/20 text-white backdrop-blur-sm">
          <Link to="/portfolio" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            К портфолио
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Badge className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-2 mb-6 border-0">
              <Star className="w-4 h-4 mr-2" />
              {project.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              {project.description}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <Button className="bg-white text-slate-900 hover:bg-slate-100 font-semibold">
                <Target className="w-4 h-4 mr-2" />
                Смотреть результаты
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Скачать кейс
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Share className="w-4 h-4 mr-2" />
                Поделиться
              </Button>
            </div>
          </div>

          {/* Project Info Sidebar */}
          <div className="space-y-4">
            <div className="glass-effect rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold mb-4">Информация о проекте</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-sm text-slate-300">Дата запуска</div>
                    <div className="font-medium">{project.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-sm text-slate-300">Длительность</div>
                    <div className="font-medium">{project.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm text-slate-300">Клиент</div>
                    <div className="font-medium">{project.client}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 w-full justify-center py-2">
                    ✅ Успешно завершен
                  </Badge>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-effect rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold mb-4">Быстрые результаты</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">+245%</div>
                  <div className="text-xs text-slate-300">Конверсия</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">+180%</div>
                  <div className="text-xs text-slate-300">Трафик</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">+320%</div>
                  <div className="text-xs text-slate-300">Продажи</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">-42%</div>
                  <div className="text-xs text-slate-300">Отказы</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
