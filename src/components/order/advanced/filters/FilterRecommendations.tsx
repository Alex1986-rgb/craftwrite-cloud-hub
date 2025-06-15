
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface FilterRecommendationsProps {
  recommendations: string[];
}

export default function FilterRecommendations({ recommendations }: FilterRecommendationsProps) {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <p className="font-medium text-blue-900 text-sm">Рекомендации:</p>
            <ul className="space-y-1">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="text-sm text-blue-700">• {rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
