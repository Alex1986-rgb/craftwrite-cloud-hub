
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "Как формируется итоговая стоимость?",
    answer: "Стоимость зависит от типа контента, объема, сложности темы, срочности и количества правок. Все наценки прозрачны и указываются заранее. Никаких скрытых платежей."
  },
  {
    question: "Можно ли изменить тарифный план?",
    answer: "Да, вы можете изменить тарифный план в любое время. При переходе на более дорогой план доплачиваете разницу, при переходе на более дешевый - остаток средств засчитывается в следующем месяце."
  },
  {
    question: "Что включено в бесплатные правки?",
    answer: "Бесплатные правки включают: корректировку фактических ошибок, изменение стиля изложения, добавление или удаление информации, адаптацию под требования заказчика. Кардинальное изменение темы или структуры оплачивается отдельно."
  },
  {
    question: "Как происходит оплата?",
    answer: "Принимаем оплату картами, банковскими переводами, через электронные кошельки. Для корпоративных клиентов работаем по договору с отсрочкой платежа до 30 дней."
  },
  {
    question: "Предоставляете ли скидки?",
    answer: "Да! Постоянным клиентам - до 15%, при оплате на год вперед - 20%, студентам и стартапам - 10%. Также действуют сезонные акции и бонусная программа."
  },
  {
    question: "Что если результат не устроит?",
    answer: "Если работа не соответствует техническому заданию, мы переделаем ее бесплатно. В крайних случаях готовы вернуть деньги. У нас есть гарантия качества и служба контроля."
  },
  {
    question: "Сколько стоит срочное выполнение?",
    answer: "Срочность до 24 часов - +100% к стоимости, до 12 часов - +150%. Экспресс-заказы до 6 часов оцениваются индивидуально и могут стоить +200-300%."
  },
  {
    question: "Работаете ли с международными клиентами?",
    answer: "Да, работаем с клиентами из любых стран. Принимаем оплату в долларах и евро. Для международных переводов возможны дополнительные комиссии банков."
  },
  {
    question: "Можно ли получить тестовое задание?",
    answer: "Для корпоративных клиентов с бюджетом от 50 000 рублей в месяц предоставляем бесплатное тестовое задание объемом до 1000 знаков."
  },
  {
    question: "Как рассчитывается объем текста?",
    answer: "Объем считается в знаках с пробелами. В стоимость входят: основной текст, заголовки, подзаголовки, списки. Meta-теги и технические элементы не считаются."
  }
];

export default function PriceFAQ() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
          <HelpCircle className="w-5 h-5 mr-2" />
          Часто задаваемые вопросы
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          FAQ по ценам и тарифам
        </h2>
        <p className="text-lg text-muted-foreground">
          Ответы на самые популярные вопросы о стоимости наших услуг
        </p>
      </div>

      <Card className="p-8 bg-gradient-to-br from-white to-slate-50/50 border-0 shadow-lg">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-slate-200/50 rounded-lg px-6 data-[state=open]:bg-primary/5"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      <div className="mt-12 text-center">
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/20">
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Не нашли ответ на свой вопрос?
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            Наши менеджеры готовы проконсультировать вас по любым вопросам о ценах и тарифах
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:info@copyprocloud.ru" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Написать на почту
            </a>
            <a 
              href="tel:+74951234567" 
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
            >
              Позвонить нам
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
