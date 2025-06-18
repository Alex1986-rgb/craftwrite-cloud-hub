
import React from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProcessAdvantageCard } from "./ProcessAdvantageCard";

interface ProcessAdvantagesProps {
  advantages: Array<{
    icon: any;
    title: string;
    desc: string;
  }>;
}

export const ProcessAdvantages = ({ advantages }: ProcessAdvantagesProps) => {
  return (
    <Card className="p-8 bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-sm border-0 shadow-2xl">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-playfair font-bold mb-6 text-slate-900">
            Контроль на каждом этапе
          </h3>
          
          <div className="space-y-6">
            {advantages.map((advantage, index) => (
              <ProcessAdvantageCard
                key={index}
                advantage={advantage}
                index={index}
              />
            ))}
          </div>

          <div className="mt-8">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              Начать работу
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-2xl blur-xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop" 
            alt="Процесс работы над текстом"
            className="relative w-full h-80 object-cover rounded-2xl shadow-xl"
          />
          
          {/* Статистика поверх изображения */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">99%</div>
                <div className="text-xs text-slate-600">Довольных клиентов</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">24ч</div>
                <div className="text-xs text-slate-600">Средний срок</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">5000+</div>
                <div className="text-xs text-slate-600">Проектов</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
