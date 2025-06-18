
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

interface FilterRecommendationsProps {
  recommendations: string[];
}

export default function FilterRecommendations({ recommendations }: FilterRecommendationsProps) {
  return (
    <Alert className="border-amber-200 bg-amber-50">
      <Lightbulb className="h-4 w-4 text-amber-600" />
      <AlertDescription>
        <div className="space-y-1">
          <p className="font-medium text-amber-800 mb-2">Рекомендации:</p>
          <ul className="space-y-1 text-sm text-amber-700">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  );
}
