
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Target, Clock } from "lucide-react";
import { QuickPreset } from "../data/quickPresetsData";

interface PresetCardProps {
  preset: QuickPreset;
  onClick: (preset: QuickPreset) => void;
}

export default function PresetCard({ preset, onClick }: PresetCardProps) {
  const getColorClasses = (color: string) => {
    const colorMap = {
      green: "bg-green-50 border-green-200 text-green-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800",
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      slate: "bg-slate-50 border-slate-200 text-slate-800",
      pink: "bg-pink-50 border-pink-200 text-pink-800",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
      emerald: "bg-emerald-50 border-emerald-200 text-emerald-800"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-50 border-gray-200 text-gray-800";
  };

  const getBadgeColor = (color: string) => {
    const colorMap = {
      green: "bg-green-100 text-green-800",
      purple: "bg-purple-100 text-purple-800",
      orange: "bg-orange-100 text-orange-800",
      blue: "bg-blue-100 text-blue-800",
      slate: "bg-slate-100 text-slate-800",
      pink: "bg-pink-100 text-pink-800",
      indigo: "bg-indigo-100 text-indigo-800",
      emerald: "bg-emerald-100 text-emerald-800"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer border-2 ${getColorClasses(preset.color)}`}
      onClick={() => onClick(preset)}
    >
      <CardContent className="p-4">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center">
            <div className={`p-3 rounded-full ${getBadgeColor(preset.color)}`}>
              <preset.icon className="w-6 h-6" />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-1">{preset.name}</h4>
            <p className="text-xs opacity-80 leading-relaxed">{preset.description}</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs opacity-70">
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              {preset.settings.length[0]}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {preset.settings.tone}
            </div>
          </div>

          {preset.popular && (
            <Badge className="text-xs bg-yellow-100 text-yellow-800">
              <Star className="w-3 h-3 mr-1" />
              Популярный
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
