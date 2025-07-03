import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import FloatingParticles from "@/components/ui/floating-particles";

const COMPACT_FAQ_DATA = [
  {
    question: "Сколько стоят ваши услуги?",
    answer: "Цены начинаются от 500₽ за базовый текст. Финальная стоимость зависит от объема, сложности и срочности. Предоставляем детальную смету перед началом работ."
  },
  {
    question: "Как быстро вы создаете тексты?",
    answer: "Стандартный срок — 24-72 часа. Экспресс-заказы выполняем за 12-24 часа с доплатой 50%. Точные сроки указываем в техническом задании."
  },
  {
    question: "Какие гарантии качества?",
    answer: "Гарантируем 100% уникальность, соответствие ТЗ, бесплатные правки в течение 30 дней. При несоответствии качества — полный возврат средств."
  },
  {
    question: "Работаете ли со специализированными темами?",
    answer: "Да, у нас есть эксперты по медицине, IT, финансам, юриспруденции и другим областям с профильным образованием и опытом 5+ лет."
  },
  {
    question: "Как происходит оплата?",
    answer: "Работаем без предоплаты для постоянных клиентов. Новые клиенты вносят 30% аванс. Полная оплата после сдачи работы. Принимаем карты, переводы, безнал."
  }
];

export default function CompactFaqSection() {
  return (
    <section className="py-12 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Floating Particles */}
        <FloatingParticles count={20} />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.03)_1px,transparent_0)] [background-size:50px_50px]"></div>
      </div>
      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <GlassCard variant="frosted" className="inline-flex items-center gap-3 px-6 py-3 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-3 h-3 text-white" />
            </div>
            <span className="text-slate-800 font-semibold">Часто задаваемые вопросы</span>
          </GlassCard>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Ответы на ключевые вопросы
          </h2>
          <p className="text-muted-foreground">
            Все, что нужно знать о работе с нами
          </p>
        </div>

        <GlassCard variant="elevated" className="shadow-2xl">
          <div className="p-6">
            <Accordion type="single" collapsible className="space-y-2">
              {COMPACT_FAQ_DATA.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-white/20 rounded-lg px-4 hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </GlassCard>

        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm">
            Не нашли ответ на свой вопрос? 
            <a href="#contact" className="text-primary hover:underline ml-1">Напишите нам</a>
          </p>
        </div>
      </div>
    </section>
  );
}