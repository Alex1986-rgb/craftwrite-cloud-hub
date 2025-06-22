
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Какая гарантия уникальности текстов?",
    answer: "Мы гарантируем 100% уникальность всех текстов. Каждая работа проверяется через Text.ru и другие антиплагиат-системы. Предоставляем ссылки на проверки."
  },
  {
    question: "Какие сроки выполнения заказов?",
    answer: "Стандартные сроки: 1-3 дня для обычных статей, до 7 дней для сложных технических текстов. Возможно срочное выполнение за 24 часа с доплатой."
  },
  {
    question: "Можно ли внести правки в готовый текст?",
    answer: "Да, мы предоставляем бесплатные правки в течение 7 дней после сдачи работы. Количество правок не ограничено, если они соответствуют техническому заданию."
  },
  {
    question: "Как рассчитывается стоимость?",
    answer: "Стоимость зависит от объёма текста, сложности темы, срочности и дополнительных требований. Минимальная стоимость — от 500₽ за статью."
  },
  {
    question: "Работаете ли вы с техническими темами?",
    answer: "Да, у нас есть специалисты по различным отраслям: IT, медицина, финансы, юриспруденция, строительство и другие. Можем писать технические тексты любой сложности."
  }
];

const FAQ = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Частые вопросы</h2>
          <p className="text-gray-600">
            Ответы на самые популярные вопросы наших клиентов
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
