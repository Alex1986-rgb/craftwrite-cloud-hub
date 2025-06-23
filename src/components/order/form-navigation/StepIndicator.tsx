
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = [
    { number: 1, title: 'Контакты' },
    { number: 2, title: 'Услуга' },
    { number: 3, title: 'Детали' },
    { number: 4, title: 'Оплата' }
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.slice(0, totalSteps).map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step.number < currentStep
                  ? 'bg-green-500 text-white'
                  : step.number === currentStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step.number < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                step.number
              )}
            </div>
            <span className="text-xs mt-1 text-center">{step.title}</span>
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`h-px w-16 mx-2 ${
                step.number < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
