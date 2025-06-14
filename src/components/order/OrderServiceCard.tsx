
import { cn } from "@/lib/utils";

type OrderServiceCardProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const TAG_COLORS: Record<string, string> = {
  "SEO-статья": "border-blue-400 bg-blue-50/80 text-blue-900",
  "Описание товара": "border-green-400 bg-green-50/80 text-green-900",
  "Текст для соцсетей": "border-indigo-300 bg-indigo-50/80 text-indigo-900",
  "Продающий текст": "border-red-300 bg-red-50/80 text-red-900",
  "Лендинг": "border-amber-400 bg-amber-50/80 text-amber-900",
  "E-mail рассылка": "border-fuchsia-400 bg-fuchsia-50/80 text-fuchsia-900",
  "Уникальный заказ": "border-gray-400 bg-gray-50/80 text-gray-900"
};

export default function OrderServiceCard({ label, active, onClick }: OrderServiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full p-4 border rounded-xl flex items-center justify-start gap-2 font-semibold text-left hover:scale-105 transition-all duration-200 animate-fade-in",
        active
          ? "shadow-lg ring-2 ring-primary"
          : "opacity-75 hover:shadow-md",
        TAG_COLORS[label] || "border-gray-200 bg-card text-foreground"
      )}
      aria-pressed={active}
    >
      <span className="truncate">{label}</span>
      {active && (
        <span className="ml-auto rounded px-2 py-0.5 text-xs bg-primary text-primary-foreground shadow animate-fade-in">
          выбрано
        </span>
      )}
    </button>
  );
}

