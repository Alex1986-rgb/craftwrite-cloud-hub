
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Calendar, Clock, Users } from "lucide-react";

type ModernProjectHeroProps = {
  project: {
    title: string;
    category: string;
    date: string;
    duration: string;
    client: string;
    description: string;
  };
};

export default function ModernProjectHero({ project }: ModernProjectHeroProps) {
  return (
    <section className="pt-24 pb-12 bg-white">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8 text-slate-600 hover:text-slate-900">
          <Link to="/portfolio" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Назад к портфолио
          </Link>
        </Button>
        
        {/* Main Content */}
        <div className="text-center mb-12">
          {/* Category Badge */}
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 mb-6">
            {project.category}
          </Badge>
          
          {/* Title with Key Metric */}
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-slate-900 leading-tight">
            {project.title}
          </h1>
          
          {/* Key Result */}
          <div className="inline-flex items-center gap-3 bg-green-50 rounded-full px-6 py-3 mb-6">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-semibold text-lg">
              Конверсия выросла на 245%
            </span>
          </div>
          
          {/* Brief Description */}
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Полная оптимизация контента интернет-магазина электроники. 
            Результат превзошёл все ожидания.
          </p>

          {/* Main CTA */}
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold">
            Изучить детали проекта
          </Button>
        </div>

        {/* Project Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-slate-50 rounded-xl">
            <Calendar className="w-6 h-6 text-slate-400 mx-auto mb-3" />
            <div className="text-sm text-slate-500 mb-1">Дата запуска</div>
            <div className="font-semibold text-slate-900">{project.date}</div>
          </div>

          <div className="text-center p-6 bg-slate-50 rounded-xl">
            <Clock className="w-6 h-6 text-slate-400 mx-auto mb-3" />
            <div className="text-sm text-slate-500 mb-1">Длительность</div>
            <div className="font-semibold text-slate-900">{project.duration}</div>
          </div>

          <div className="text-center p-6 bg-slate-50 rounded-xl">
            <Users className="w-6 h-6 text-slate-400 mx-auto mb-3" />
            <div className="text-sm text-slate-500 mb-1">Клиент</div>
            <div className="font-semibold text-slate-900">{project.client}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
