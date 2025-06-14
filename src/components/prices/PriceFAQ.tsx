
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "Что влияет на стоимость проекта?",
    answer: "Стоимость зависит от нескольких факторов: типа контента, объема работы, сложности темы, срочности выполнения и дополнительных требований (например, SEO-оптимизация, исследование конкурентов). Мы всегда предоставляем детальную смету перед началом работы."
  },
  {
    question: "Есть ли скрытые платежи?",
    answer: "Нет, все наши цены абсолютно прозрачны. В стоимость входит: написание текста, проверка уникальности, базовое SEO (если применимо), один раунд правок и техническая поддержка. Дополнительные услуги обсуждаются отдельно и указываются в договоре."
  },
  {
    question: "Можно ли получить скидку на большой объем?",
    answer: "Да, мы предоставляем прогрессивные скидки: от 10 проектов — скидка 10%, от 20 проектов — 15%, от 50 проектов — 20%. Для долгосрочного сотрудничества и постоянных клиентов действуют индивидуальные условия."
  },
  {
    question: "Как происходит оплата?",
    answer: "Мы принимаем оплату картами, банковскими переводами и через электронные кошельки. Для проектов до 10 000 ₽ — полная предоплата. Для крупных проектов возможна оплата в два этапа: 50% предоплата и 50% после сдачи работы."
  },
  {
    question: "Что если результат не устроит?",
    answer: "Мы гарантируем качество! Включен один раунд бесплатных правок. Если текст кардинально не соответствует техническому заданию, мы переписываем его бесплатно. В крайне редких случаях, если договоренность не достигнута, возвращаем 100% стоимости."
  },
  {
    question: "Сколько стоят дополнительные правки?",
    answer: "Первый раунд правок всегда бесплатный. Дополнительные правки: мелкие корректировки (до 20% текста) — бесплатно, значительные изменения — 30% от стоимости проекта, полная переработка — 50% от стоимости."
  },
  {
    question: "Есть ли корпоративные скидки?",
    answer: "Для корпоративных клиентов действуют специальные условия: персональный менеджер, приоритетная поддержка, скидки до 25%, отсрочка платежа до 30 дней, возможность работы по договору на год с фиксированными ценами."
  },
  {
    question: "Можно ли заказать срочную работу?",
    answer: "Да, мы выполняем срочные заказы. Ускоренное выполнение (2-3 дня) — доплата 50%, экстренное (24 часа) — доплата 100%. Доступность срочного выполнения зависит от загрузки команды и сложности проекта."
  }
];

export default function PriceFAQ() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Часто задаваемые вопросы
            </h2>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Ответы на популярные вопросы о ценообразовании и условиях работы
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200 px-6 shadow-lg"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center bg-gradient-to-r from-primary/5 to-blue-50 rounded-xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold mb-4">Остались вопросы?</h3>
            <p className="text-slate-600 mb-6">
              Свяжитесь с нами для персональной консультации по вашему проекту
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@copypro.cloud"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Написать email
              </a>
              <a
                href="tel:+7800123456"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Позвонить
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
