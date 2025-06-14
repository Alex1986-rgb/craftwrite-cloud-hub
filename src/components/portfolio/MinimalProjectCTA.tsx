
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MessageCircle, Calculator, Phone, Zap } from "lucide-react";

export default function MinimalProjectCTA() {
  return (
    <section id="cta" className="py-16 bg-gradient-to-br from-primary to-blue-600 text-white">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Готовы к такому же результату?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Обсудим ваш проект и создадим план для достижения подобных результатов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
            <MessageCircle className="w-8 h-8 mx-auto mb-4 text-blue-200" />
            <h3 className="text-lg font-bold mb-2">Консультация</h3>
            <p className="text-blue-100 text-sm mb-4">Обсудим ваши цели и возможности</p>
            <Button className="w-full bg-white text-primary hover:bg-slate-100">
              Бесплатно
            </Button>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
            <Calculator className="w-8 h-8 mx-auto mb-4 text-green-200" />
            <h3 className="text-lg font-bold mb-2">Оценка проекта</h3>
            <p className="text-blue-100 text-sm mb-4">Рассчитаем стоимость и сроки</p>
            <Button className="w-full bg-white text-primary hover:bg-slate-100">
              За 24 часа
            </Button>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
            <Zap className="w-8 h-8 mx-auto mb-4 text-yellow-200" />
            <h3 className="text-lg font-bold mb-2">Быстрый старт</h3>
            <p className="text-blue-100 text-sm mb-4">Начнем работу на следующей неделе</p>
            <Button className="w-full bg-white text-primary hover:bg-slate-100">
              Обсудить
            </Button>
          </Card>
        </div>

        {/* Emergency Contact */}
        <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-600 border-0 shadow-2xl inline-flex items-center gap-6">
          <Phone className="w-8 h-8" />
          <div className="text-left">
            <div className="text-xl font-bold">Срочная консультация</div>
            <div className="text-orange-100">+7 (495) 123-45-67</div>
          </div>
          <Button className="bg-white text-red-600 hover:bg-slate-100 px-8">
            <ArrowRight className="w-4 h-4 mr-2" />
            Позвонить
          </Button>
        </Card>
      </div>
    </section>
  );
}
