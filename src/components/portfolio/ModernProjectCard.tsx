import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

type ModernProjectCardProps = {
  id: number;
  title: string;
  category: string;
  description: string;
  image?: string;
  metrics: Record<string, string>;
  tags: string[];
  featured?: boolean;
  onViewDetails: (id: number) => void;
};

export default function ModernProjectCard({ 
  id, 
  title, 
  category, 
  description, 
  image, 
  metrics, 
  tags, 
  featured,
  onViewDetails
}: ModernProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the first metric as the key result
  const keyMetric = Object.entries(metrics)[0];
  
  return (
    <Card 
      className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(id)}
    >
      {/* Large Image Preview - 60% of card */}
      <div className="relative h-64 bg-slate-100 overflow-hidden">
        {image ? (
          <img
            src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=800&q=80`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300"></div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/95 text-slate-700 font-semibold">
            {category}
          </Badge>
        </div>
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary text-white font-semibold">
              Премиум
            </Badge>
          </div>
        )}
        
        {/* Hover Overlay with Key Metric */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {keyMetric && (
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium opacity-90">{keyMetric[0]}</span>
              </div>
              <div className="text-2xl font-bold">{keyMetric[1]}</div>
            </div>
          )}
        </div>
      </div>

      {/* Simplified Content - 40% of card */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-slate-900 line-clamp-1">
          {title}
        </h3>
        
        <p className="text-slate-600 mb-4 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Key Tags - Max 3 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="text-xs bg-slate-100 text-slate-600"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full bg-slate-900 text-white hover:bg-primary transition-all duration-300 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(id);
          }}
        >
          <span>Изучить кейс</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </Card>
  );
}