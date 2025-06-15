
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Lightbulb } from "lucide-react";
import { quickPresetsData, QuickPreset } from "./data/quickPresetsData";
import PresetCard from "./components/PresetCard";

interface QuickPresetsProps {
  onApplyPreset: (preset: QuickPreset) => void;
}

export default function QuickPresets({ onApplyPreset }: QuickPresetsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-5 h-5 text-orange-600" />
          <h3 className="text-xl font-semibold">Быстрые пресеты</h3>
          <Badge className="bg-orange-100 text-orange-800">
            Мгновенный старт
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {quickPresetsData.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              onClick={onApplyPreset}
            />
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Совет</span>
          </div>
          <p className="text-xs text-purple-700 leading-relaxed">
            Быстрые пресеты — это ваш путь к мгновенному созданию качественного контента. 
            Каждый пресет настроен профессионалами для максимальной эффективности в своей нише.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
