
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Users } from "lucide-react";

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
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="mb-12">
          <Button variant="outline" asChild className="mb-8 hover:bg-white/80 border-2">
            <Link to="/portfolio" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Вернуться к портфолио
            </Link>
          </Button>
          
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <Badge className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 text-lg border-0">
              {project.category}
            </Badge>
            <div className="flex items-center gap-3 text-muted-foreground bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">{project.date}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="w-5 h-5" />
              <span className="font-medium">{project.duration}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="w-5 h-5" />
              <span className="font-medium">{project.client}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-playfair font-bold mb-8 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            {project.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </section>
  );
}
