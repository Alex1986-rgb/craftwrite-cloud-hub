
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Library, Bookmark, MessageSquare, History, Zap, Edit3, BarChart3, Download, Brain } from "lucide-react";

export default function TabList() {
  return (
    <TabsList className="grid w-full grid-cols-10">
      <TabsTrigger value="generator" className="flex items-center gap-2">
        <Wand2 className="w-4 h-4" />
        Генератор
      </TabsTrigger>
      <TabsTrigger value="batch" className="flex items-center gap-2">
        <Zap className="w-4 h-4" />
        Пакетная
      </TabsTrigger>
      <TabsTrigger value="refiner" className="flex items-center gap-2">
        <Edit3 className="w-4 h-4" />
        Доработка
      </TabsTrigger>
      <TabsTrigger value="analyzer" className="flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        Анализ
      </TabsTrigger>
      <TabsTrigger value="assistant" className="flex items-center gap-2">
        <Brain className="w-4 h-4" />
        Ассистент
      </TabsTrigger>
      <TabsTrigger value="export" className="flex items-center gap-2">
        <Download className="w-4 h-4" />
        Экспорт
      </TabsTrigger>
      <TabsTrigger value="templates" className="flex items-center gap-2">
        <Library className="w-4 h-4" />
        Шаблоны
      </TabsTrigger>
      <TabsTrigger value="presets" className="flex items-center gap-2">
        <Bookmark className="w-4 h-4" />
        Пресеты
      </TabsTrigger>
      <TabsTrigger value="prompts" className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        Промпты
      </TabsTrigger>
      <TabsTrigger value="history" className="flex items-center gap-2">
        <History className="w-4 h-4" />
        История
      </TabsTrigger>
    </TabsList>
  );
}
