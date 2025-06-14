
import React from "react";

interface OrderProgressBarProps {
  progress: number; // 0-100
}
const PROGRESS_COLORS = [
  "bg-gray-200",  // 0-19%
  "bg-orange-300", // 20-39%
  "bg-amber-400",  // 40-59%
  "bg-yellow-400", // 60-79%
  "bg-green-500",  // 80-100%
];
function getBarColor(progress: number) {
  if (progress < 20) return PROGRESS_COLORS[0];
  if (progress < 40) return PROGRESS_COLORS[1];
  if (progress < 60) return PROGRESS_COLORS[2];
  if (progress < 80) return PROGRESS_COLORS[3];
  return PROGRESS_COLORS[4];
}

export default function OrderProgressBar({ progress }: OrderProgressBarProps) {
  return (
    <div className="w-full mb-5 animate-fade-in">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-semibold text-muted-foreground">Заполнено: {progress}%</span>
        <span className="text-xs font-semibold text-muted-foreground">
          {progress >= 100 ? "Готово к отправке" : "Осталось заполнить"}
        </span>
      </div>
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden border border-muted/30 shadow">
        <div
          className={`h-3 transition-[width] duration-500 ease-in-out rounded-full ${getBarColor(progress)}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
