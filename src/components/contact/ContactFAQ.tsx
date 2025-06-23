
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    question: "Как быстро вы отвечаете на заявки?",
    answer: "Мы отвечаем на все заявки в течение часа в рабочее время (с 9:00 до 21:00 МСК). В выходные и праздничные дни - в течение 2-3 часов."
  },
  {
    question: "Какие способы оплаты вы принимаете?",
    answer: "Мы принимаем оплату картами Visa/MasterCard, через СБП, Яндекс.Деньги, QIWI, WebMoney. Для юридических лиц - безналичный расчет с НДС."
  },
  {
    question: "Предоставляете ли вы гарантии на работу?",
    answer: "Да, мы предоставляем гарантию качества на все наши работы. Если текст не соответствует техническому заданию, мы бесплатно внесем правки."
  },
  {
    question: "Сколько времени занимает выполнение заказа?",
    answer: "Сроки зависят от объема и сложности проекта. SEO-статья 3000 знаков - 1-2 дня, лендинг - 3-5 дней, крупные проекты - от недели. Точные сроки обсуждаются индивидуально."
  },
  {
    question: "Можно ли вносить правки в готовые тексты?",
    answer: "Конечно! Мы предоставляем 2 бесплатные правки по каждому заказу. Дополнительные правки оплачиваются отдельно."
  },
  {
    question: "Работаете ли вы с нишевыми тематиками?",
    answer: "Да, у нас есть эксперты в различных областях: медицина, финансы, IT, недвижимость, образование и другие. Мы подберем специалиста под вашу тематику."
  }
];

export default function ContactFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-4">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">FAQ</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-slate-800 mb-4">
            Частые вопросы
          </h2>
          
          <p className="text-slate-600 max-w-2xl mx-auto">
            Ответы на самые популярные вопросы о наших услугах
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Button
                variant="ghost"
                className="w-full p-6 text-left justify-between hover:bg-transparent"
                onClick={() => toggleItem(index)}
              >
                <span className="font-semibold text-slate-800 pr-4">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0" />
                )}
              </Button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-6 animate-fade-in">
                  <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">Не нашли ответ на свой вопрос?</p>
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold rounded-full px-6 py-3"
          >
            Задать вопрос
          </Button>
        </div>
      </div>
    </section>
  );
}
