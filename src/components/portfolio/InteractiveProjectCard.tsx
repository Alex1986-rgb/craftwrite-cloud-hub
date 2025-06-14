
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, DollarSign, Award, ArrowRight, Star, Zap, Eye, Heart, Share2 } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Area, AreaChart } from 'recharts';

type InteractiveProjectCardProps = {
  id: number;
  title: string;
  category: string;
  description: string;
  image?: string;
  metrics: Record<string, string>;
  tags: string[];
  featured?: boolean;
  results: string[];
  onViewDetails: (id: number) => void;
};

const generateMockData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: i + 1,
    value: Math.floor(Math.random() * 100) + 50 + i * 15
  }));
};

export default function InteractiveProjectCard({ 
  id, 
  title, 
  category, 
  description, 
  image, 
  metrics, 
  tags, 
  featured,
  results,
  onViewDetails
}: InteractiveProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const mockChartData = generateMockData();
  
  return (
    <Card 
      className="group overflow-hidden glass-effect border-0 hover:shadow-glow-purple transition-all duration-700 hover:-translate-y-6 relative animate-scale-in cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(id)}
    >
      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-600 hover:bg-red-50'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          className="p-2 rounded-full bg-white/80 text-slate-600 backdrop-blur-sm hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hover:scale-110"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Premium badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white border-0 px-4 py-2 font-bold shadow-lg animate-pulse">
            <Star className="w-4 h-4 mr-1" />
            ПРЕМИУМ
          </Badge>
        </div>
      )}

      {/* Image with advanced effects */}
      <div className="relative h-64 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
        {image ? (
          <img
            src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=800&q=80`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20">
            <Eye className="w-16 h-16 text-primary opacity-60" />
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Category badge */}
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-white/90 text-primary border-primary/20 font-bold glass-effect px-3 py-1 shadow-lg">
            {category}
          </Badge>
        </div>

        {/* Interactive chart overlay */}
        <div className={`absolute bottom-4 left-4 right-4 h-20 glass-effect rounded-xl p-3 shadow-xl border-white/20 transition-all duration-700 ${
          isHovered ? 'opacity-100 scale-105 -translate-y-2' : 'opacity-0 scale-95'
        }`}>
          <div className="text-xs font-semibold text-white mb-1 flex items-center justify-between">
            <span>Рост показателей</span>
            <Badge className="bg-green-500/80 text-white border-0 text-xs px-2 py-0.5">
              +{Math.floor(Math.random() * 200) + 50}%
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData}>
              <defs>
                <linearGradient id={`gradient-${id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#10B981" 
                fill={`url(#gradient-${id})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Success indicator */}
        <div className={`absolute bottom-4 right-4 transition-all duration-500 ${
          isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
        }`}>
          <div className="flex items-center gap-2 bg-green-500/90 text-white px-3 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            Завершен
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-playfair font-bold mb-3 text-slate-900 group-hover:text-primary transition-colors duration-300 leading-tight">
          {title}
        </h3>
        
        <p className="text-slate-600 mb-6 text-base leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Animated metrics */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {Object.entries(metrics).slice(0, 3).map(([key, value], index) => {
            const icons = [TrendingUp, Users, DollarSign];
            const Icon = icons[index];
            const colors = [
              'from-blue-500 to-cyan-500',
              'from-green-500 to-emerald-500', 
              'from-purple-500 to-violet-500'
            ];
            
            return (
              <div key={key} className="text-center p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105 border border-slate-100">
                <div className={`inline-flex p-2 bg-gradient-to-r ${colors[index]} rounded-lg mb-2 shadow-md transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-lg font-bold text-slate-800 mb-1">{value}</div>
                <div className="text-xs text-slate-500 capitalize font-medium uppercase tracking-wide">{key}</div>
              </div>
            );
          })}
        </div>

        {/* Key achievements */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Ключевые результаты
          </h4>
          <div className="space-y-2">
            {results.slice(0, 2).map((result, index) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-gradient-to-l from-green-100/50 to-green-50/50 rounded-lg border-l-2 border-green-500">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-slate-700 text-sm font-medium">{result}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={tag} 
              className={`text-xs px-3 py-1 font-medium transition-all duration-200 hover:scale-105 glass-effect ${
                index % 3 === 0 ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                index % 3 === 1 ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge className="bg-slate-100 text-slate-600 text-xs px-3 py-1">
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-500 bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white border-0 py-3 font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] rounded-xl"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(id);
          }}
        >
          <div className="flex items-center justify-center gap-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <Eye className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Изучить кейс</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
          </div>
        </Button>
      </CardContent>
    </Card>
  );
}
