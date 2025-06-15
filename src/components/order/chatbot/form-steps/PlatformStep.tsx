
import PlatformSelector from '../advanced/PlatformSelector';
import ScriptComplexityCalculator from '../advanced/ScriptComplexityCalculator';

interface PlatformStepProps {
  platforms: string[];
  scenarios: number;
  onPlatformsChange: (platforms: string[]) => void;
  onPlatformsPriceChange: (price: number) => void;
  onComplexityChange: (scenarios: number, price: number, level: string) => void;
}

export default function PlatformStep({
  platforms,
  scenarios,
  onPlatformsChange,
  onPlatformsPriceChange,
  onComplexityChange
}: PlatformStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Платформы и сложность</h3>
        <p className="text-gray-600">Выберите где будет работать бот и его сложность</p>
      </div>
      
      <PlatformSelector
        onPlatformsChange={onPlatformsChange}
        onPriceChange={onPlatformsPriceChange}
        initialPlatforms={platforms}
      />
      
      <ScriptComplexityCalculator
        onComplexityChange={onComplexityChange}
        initialScenarios={scenarios}
      />
    </div>
  );
}
