
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Users, DollarSign, Award, ExternalLink, ArrowRight, BarChart } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Area, AreaChart } from 'recharts';

type EnhancedPortfolioCardProps = {
  id: number;
  title: string;
  category: string;
  description: string;
  image?: string;
  metrics: Record<string, string>;
  tags: string[];
  featured?: boolean;
  results: string[];
};

const generateMockData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: i + 1,
    value: Math.floor(Math.random() * 100) + 50 + i * 10
  }));
};

export default function EnhancedPortfolioCard({ 
  id, 
  title, 
  category, 
  description, 
  image, 
  metrics, 
  tags, 
  featured,
  results 
}: EnhancedPortfolioCardProps) {
  const mockChartData = generateMockData();
  
  return (
    <Card className="group overflow-hidden bg-white shadow-lg border-0 hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 relative">
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-3 py-1.5 font-semibold shadow-lg">
            <Award className="w-4 h-4 mr-1" />
            ТОП КЕЙС
          </Badge>
        </div>
      )}

      {/* Изображение с мини-графиком */}
      <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {image ? (
          <img
            src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=600&q=80`}
            alt={title}
            className="w-full h-full object-cover transition-all hover:scale-110 duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-purple-500/10">
            <BarChart className="w-16 h-16 text-primary" />
          </div>
        )}
        
        {/* Мини-график поверх изображения */}
        <div className="absolute bottom-4 right-4 w-32 h-16 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData}>
              <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-white/90 text-primary border-primary/20 font-semibold">
            {category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-8">
        <h3 className="text-2xl font-playfair font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-6 text-base leading-relaxed">
          {description}
        </p>

        {/* Основные метрики */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {Object.entries(metrics).slice(0, 3).map(([key, value], index) => {
            const icons = [TrendingUp, Users, DollarSign];
            const Icon = icons[index];
            const colors = ['text-blue-600', 'text-green-600', 'text-purple-600'];
            
            return (
              <div key={key} className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl hover:shadow-md transition-all duration-300 group-hover:scale-105">
                <Icon className={`w-5 h-5 mx-auto mb-2 ${colors[index]}`} />
                <div className="text-lg font-bold text-primary mb-1">{value}</div>
                <div className="text-xs text-muted-foreground capitalize font-medium">{key}</div>
              </div>
            );
          })}
        </div>

        {/* Ключевые результаты */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Ключевые результаты:</h4>
          <div className="space-y-2">
            {results.slice(0, 2).map((result, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-muted-foreground">{result}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Теги */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-3 py-1 bg-slate-100 hover:bg-slate-200 transition-colors duration-200">
              {tag}
            </Badge>
          ))}
        </div>

        <Button asChild className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300 bg-gradient-to-r from-primary to-blue-600 text-white border-0 py-3 font-semibold">
          <Link to={`/portfolio/${id}`} className="flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Изучить кейс детально
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
