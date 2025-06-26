
import { CheckCircle } from 'lucide-react';

interface SeoArticleProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  getStepTitle: (step: number) => string;
}

export default function SeoArticleProgressIndicator({ 
  currentStep, 
  totalSteps, 
  getStepTitle 
}: SeoArticleProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              currentStep >= step 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'border-gray-300 text-gray-500'
            }`}>
              {currentStep > step ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{step}</span>
              )}
            </div>
            <span className={`ml-2 text-sm ${
              currentStep >= step ? 'text-blue-600 font-medium' : 'text-gray-500'
            }`}>
              {getStepTitle(step)}
            </span>
            {step < totalSteps && (
              <div className={`w-12 h-0.5 mx-4 ${
                currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
