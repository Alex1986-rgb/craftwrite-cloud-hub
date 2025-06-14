
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle } from "lucide-react";

const timelineEvents = [
  {
    date: "2024-01-15",
    title: "Обновление политики конфиденциальности",
    description: "Добавлены разделы о новых методах обработки данных",
    status: "completed"
  },
  {
    date: "2023-12-01",
    title: "Внедрение GDPR стандартов",
    description: "Полное соответствие европейским требованиям защиты данных",
    status: "completed"
  },
  {
    date: "2023-08-20",
    title: "Создание первой версии",
    description: "Разработка базовой политики конфиденциальности",
    status: "completed"
  }
];

export default function PrivacyTimeline() {
  return (
    <Card className="p-8 bg-gradient-to-br from-slate-50/80 to-white border-slate-200/50 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">История изменений</h3>
      </div>
      
      <div className="space-y-6">
        {timelineEvents.map((event, index) => (
          <div key={index} className="flex gap-4 relative">
            {index !== timelineEvents.length - 1 && (
              <div className="absolute left-5 top-12 w-0.5 h-12 bg-gradient-to-b from-green-400 to-blue-400"></div>
            )}
            
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-semibold text-slate-800">{event.title}</h4>
                <Badge variant="secondary" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {event.date}
                </Badge>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
