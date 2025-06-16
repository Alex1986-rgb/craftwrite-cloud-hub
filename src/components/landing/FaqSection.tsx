
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "Какие гарантии качества вы предоставляете?",
    answer: "Мы гарантируем 100% уникальность всех текстов с предоставлением официальных ссылок на проверки Text.ru. Все материалы создаются дипломированными экспертами с профильным образованием. Предоставляем бесплатные правки до полного соответствия вашим требованиям."
  },
  {
    question: "Сколько времени занимает выполнение заказа?",
    answer: "Сроки зависят от объема и сложности: SEO-статьи — 2-5 дней, лендинги — 3-7 дней, карточки товаров — 1-3 дня, посты для соцсетей — 24-48 часов. Срочные заказы выполняем от 24 часов с доплатой 50%."
  },
  {
    question: "Можно ли заказать текст для узкой ниши?",
    answer: "Да! Наша команда включает экспертов по различным тематикам: IT, медицина, финансы, право, недвижимость, e-commerce и многие другие. Мы подберем специалиста именно по вашей нише для максимальной экспертности контента."
  },
  {
    question: "Входит ли SEO-оптимизация в стоимость?",
    answer: "SEO-оптимизация включена в стоимость всех текстовых услуг: подбор ключевых слов, LSI-фразы, мета-теги, правильная структура заголовков, внутренняя перелинковка. Дополнительно можем провести конкурентный анализ и keyword research."
  },
  {
    question: "Какие форматы оплаты вы принимаете?",
    answer: "Принимаем все популярные способы оплаты: банковские карты, электронные кошельки, банковские переводы. Для юридических лиц работаем по договору с НДС. Предоплата 50%, остальное после сдачи работы."
  },
  {
    question: "Предоставляете ли вы отчеты о проверке уникальности?",
    answer: "Обязательно! К каждому заказу прилагаем официальные ссылки на проверки уникальности в Text.ru, а также дополнительные проверки в Advego и других сервисах. Уникальность наших текстов составляет 95-100%."
  },
  {
    question: "Можно ли вносить правки в готовый текст?",
    answer: "Конечно! Мы предоставляем 2 бесплатных правки в рамках технического задания. Дополнительные правки или существенные изменения ТЗ оплачиваются отдельно. Стремимся довести каждый текст до идеального состояния."
  },
  {
    question: "Работаете ли вы с крупными проектами?",
    answer: "Да, мы специализируемся на крупных проектах! Наша команда из 30+ экспертов может обработать заказы любого масштаба: от 100+ карточек товаров до комплексного контент-плана на год. Для больших проектов предоставляем персонального менеджера."
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Modern background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-100/20 via-transparent to-transparent"></div>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-40 h-40 bg-gradient-to-r from-green-400/10 to-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 -left-20 w-60 h-60 bg-gradient-to-r from-blue-400/10 to-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100/80 to-blue-100/80 text-green-700 px-6 py-3 rounded-full text-sm font-bold mb-6 border border-green-200/50 shadow-lg backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <HelpCircle className="w-5 h-5" />
            <span>Ответы на вопросы</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-slate-900 via-green-800 to-blue-800 bg-clip-text text-transparent leading-tight tracking-tight">
            Часто задаваемые
            <br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">вопросы</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Найдите ответы на самые популярные вопросы о наших услугах и процессе работы
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/90 via-green-50/30 to-blue-50/20 backdrop-blur-lg rounded-2xl shadow-xl border border-green-200/30 overflow-hidden transition-all duration-300 hover:shadow-2xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 md:p-8 text-left focus:outline-none group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-green-600 transition-colors duration-300 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-6 h-6 text-green-600 transform group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-slate-400 group-hover:text-green-600 transform group-hover:scale-110 transition-all duration-300" />
                    )}
                  </div>
                </div>
              </button>
              
              <div className={`transition-all duration-500 ease-in-out ${
                openIndex === index 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <div className="h-px bg-gradient-to-r from-green-200 via-blue-200 to-transparent mb-4"></div>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-white/80 via-green-50/50 to-blue-50/30 backdrop-blur-lg rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-2xl border border-green-200/30 relative overflow-hidden max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-blue-400/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Остались вопросы?
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Наши эксперты готовы ответить на любые вопросы и помочь с выбором услуги
              </p>
              <a
                href="mailto:info@copyprocloud.ru"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-full px-8 py-4 text-lg hover:from-green-400 hover:to-blue-400 transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                <HelpCircle className="w-5 h-5" />
                Задать вопрос
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
