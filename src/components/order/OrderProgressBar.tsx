
import React, { useEffect, useRef } from "react";

interface OrderProgressBarProps {
  progress: number; // 0-100
  flash?: boolean;
  onFlashEnd?: () => void;
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

export default function OrderProgressBar({ progress, flash, onFlashEnd }: OrderProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (flash && barRef.current) {
      barRef.current.classList.add("order-progress-flash");
      const handle = setTimeout(() => {
        barRef.current?.classList.remove("order-progress-flash");
        onFlashEnd?.();
      }, 700); // анимация 0.7s
      return () => clearTimeout(handle);
    }
  }, [flash, onFlashEnd]);

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
          ref={barRef}
          className={`h-3 transition-[width] duration-500 ease-in-out rounded-full ${getBarColor(progress)}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <style>
        {`
          .order-progress-flash {
            animation: order-flash 0.7s cubic-bezier(0.19,1,0.22,1);
            box-shadow: 0 0 18px 6px #e7fca2;
          }
          @keyframes order-flash {
            0% { box-shadow: 0 0 0 0 #e7fca200; }
            20% { box-shadow: 0 0 25px 10px #f6fa6f60; }
            40% { box-shadow: 0 0 22px 6px #e7fca2; }
            70% { box-shadow: 0 0 18px 4px #e7fca280; }
            100% { box-shadow: 0 0 0 0 #e7fca200; }
          }
        `}
      </style>
    </div>
  );
}
