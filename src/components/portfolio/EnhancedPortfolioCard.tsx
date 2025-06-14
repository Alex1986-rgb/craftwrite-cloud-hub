
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Users, DollarSign, Award, ArrowRight, BarChart, Star, Zap } from "lucide-react";
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
    <Card className="group overflow-hidden bg-white/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-700 hover:-translate-y-6 relative">
      {/* Premium badge for featured projects */}
      {featured && (
        <div className="absolute top-6 left-6 z-20">
          <Badge className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white border-0 px-4 py-2 font-bold shadow-lg animate-pulse">
            <Star className="w-4 h-4 mr-1" />
            ПРЕМИУМ КЕЙС
          </Badge>
        </div>
      )}

      {/* Modern image with overlay effects */}
      <div className="relative h-72 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {image ? (
          <img
            src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=800&q=80`}
            alt={title}
            className="w-full h-full object-cover transition-all hover:scale-110 duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20">
            <BarChart className="w-20 h-20 text-primary opacity-60" />
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Interactive chart overlay */}
        <div className="absolute bottom-6 right-6 w-40 h-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="text-xs font-semibold text-slate-600 mb-1">Рост показателей</div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData}>
              <defs>
                <linearGradient id={`gradient-${id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                fill={`url(#gradient-${id})`}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category badge */}
        <div className="absolute top-6 right-6">
          <Badge className="bg-white/90 text-primary border-primary/20 font-bold backdrop-blur-sm px-4 py-2 shadow-lg">
            {category}
          </Badge>
        </div>

        {/* Success indicator */}
        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-2 bg-green-500/90 text-white px-3 py-2 rounded-full text-sm font-semibold">
            <Zap className="w-4 h-4" />
            Успешно завершен
          </div>
        </div>
      </div>

      <CardContent className="p-8">
        {/* Title with modern typography */}
        <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-slate-900 group-hover:text-primary transition-colors duration-300 leading-tight">
          {title}
        </h3>
        
        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
          {description}
        </p>

        {/* Enhanced metrics with animations */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Object.entries(metrics).slice(0, 3).map(([key, value], index) => {
            const icons = [TrendingUp, Users, DollarSign];
            const Icon = icons[index];
            const colors = [
              'from-blue-500 to-cyan-500',
              'from-green-500 to-emerald-500', 
              'from-purple-500 to-violet-500'
            ];
            
            return (
              <div key={key} className="text-center p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-slate-100">
                <div className={`inline-flex p-3 bg-gradient-to-r ${colors[index]} rounded-xl mb-3 shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-2">{value}</div>
                <div className="text-xs text-slate-500 capitalize font-semibold uppercase tracking-wide">{key}</div>
              </div>
            );
          })}
        </div>

        {/* Key results with modern styling */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Ключевые достижения
          </h4>
          <div className="space-y-3">
            {results.slice(0, 3).map((result, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border-l-4 border-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-slate-700 font-medium">{result}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modern tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag, index) => (
            <Badge 
              key={tag} 
              className={`text-sm px-4 py-2 font-medium transition-all duration-200 hover:scale-105 ${
                index % 3 === 0 ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                index % 3 === 1 ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Enhanced CTA button */}
        <Button asChild className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-500 bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white border-0 py-4 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] rounded-2xl">
          <Link to={`/portfolio/${id}`} className="flex items-center justify-center gap-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <TrendingUp className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Изучить кейс детально</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
