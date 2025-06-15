
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, TrendingUp, Award } from 'lucide-react';

interface ExpertInsight {
  type: 'quote' | 'tip' | 'stat';
  author?: string;
  role?: string;
  content: string;
  metric?: string;
  value?: string;
}

interface ExpertInsightsProps {
  insights: ExpertInsight[];
  className?: string;
}

export default function ExpertInsights({ insights, className }: ExpertInsightsProps) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'quote': return Quote;
      case 'tip': return Star;
      case 'stat': return TrendingUp;
      default: return Award;
    }
  };

  const getInsightStyle = (type: string) => {
    switch (type) {
      case 'quote': 
        return 'from-blue-50 to-purple-50 border-blue-200 text-blue-900';
      case 'tip': 
        return 'from-yellow-50 to-orange-50 border-yellow-200 text-yellow-900';
      case 'stat': 
        return 'from-green-50 to-emerald-50 border-green-200 text-green-900';
      default: 
        return 'from-gray-50 to-slate-50 border-gray-200 text-gray-900';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {insights.map((insight, index) => {
        const Icon = getInsightIcon(insight.type);
        const style = getInsightStyle(insight.type);
        
        return (
          <Card key={index} className={`bg-gradient-to-br border ${style}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  insight.type === 'quote' ? 'bg-blue-500' :
                  insight.type === 'tip' ? 'bg-yellow-500' :
                  'bg-green-500'
                } text-white`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed mb-2">
                    {insight.content}
                  </p>
                  
                  {insight.author && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs italic">
                        — {insight.author}
                      </span>
                      {insight.role && (
                        <Badge variant="outline" className="text-xs">
                          {insight.role}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {insight.type === 'stat' && insight.metric && insight.value && (
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-medium">{insight.metric}</span>
                      <Badge className="bg-green-100 text-green-800">
                        {insight.value}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
