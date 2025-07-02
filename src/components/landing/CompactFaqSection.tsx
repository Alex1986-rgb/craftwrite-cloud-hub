import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

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
    <section className="py-12 bg-muted/30">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <HelpCircle className="w-4 h-4" />
            Часто задаваемые вопросы
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Ответы на ключевые вопросы
          </h2>
          <p className="text-muted-foreground">
            Все, что нужно знать о работе с нами
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="space-y-2">
              {COMPACT_FAQ_DATA.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border/50 rounded-lg px-4 hover:bg-muted/50 transition-colors"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

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