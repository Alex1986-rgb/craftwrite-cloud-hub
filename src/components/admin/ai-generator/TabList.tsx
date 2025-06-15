
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wand2, 
  Library, 
  Bookmark, 
  MessageSquare, 
  History, 
  Zap, 
  Edit3, 
  BarChart3, 
  Download, 
  Brain,
  Target,
  Users,
  TestTube,
  Share2,
  TrendingUp
} from "lucide-react";

export default function TabList() {
  return (
    <TabsList className="grid w-full grid-cols-12 text-xs">
      <TabsTrigger value="generator" className="flex items-center gap-1 px-2">
        <Wand2 className="w-3 h-3" />
        Генератор
      </TabsTrigger>
      <TabsTrigger value="batch" className="flex items-center gap-1 px-2">
        <Zap className="w-3 h-3" />
        Пакетная
      </TabsTrigger>
      <TabsTrigger value="refiner" className="flex items-center gap-1 px-2">
        <Edit3 className="w-3 h-3" />
        Доработка
      </TabsTrigger>
      <TabsTrigger value="analyzer" className="flex items-center gap-1 px-2">
        <BarChart3 className="w-3 h-3" />
        Анализ
      </TabsTrigger>
      <TabsTrigger value="assistant" className="flex items-center gap-1 px-2">
        <Brain className="w-3 h-3" />
        Ассистент
      </TabsTrigger>
      <TabsTrigger value="personalization" className="flex items-center gap-1 px-2">
        <Users className="w-3 h-3" />
        Персонализация
      </TabsTrigger>
      <TabsTrigger value="competitors" className="flex items-center gap-1 px-2">
        <TrendingUp className="w-3 h-3" />
        Конкуренты
      </TabsTrigger>
      <TabsTrigger value="abtest" className="flex items-center gap-1 px-2">
        <TestTube className="w-3 h-3" />
        A/B тесты
      </TabsTrigger>
      <TabsTrigger value="prediction" className="flex items-center gap-1 px-2">
        <Target className="w-3 h-3" />
        Прогноз
      </TabsTrigger>
      <TabsTrigger value="cms" className="flex items-center gap-1 px-2">
        <Share2 className="w-3 h-3" />
        CMS
      </TabsTrigger>
      <TabsTrigger value="export" className="flex items-center gap-1 px-2">
        <Download className="w-3 h-3" />
        Экспорт
      </TabsTrigger>
      <TabsTrigger value="history" className="flex items-center gap-1 px-2">
        <History className="w-3 h-3" />
        История
      </TabsTrigger>
    </TabsList>
  );
}
