
import { useState } from "react";
import { ChevronDown } from "lucide-react";
const faqs = [
  {
    q: "Как быстро выполняется заказ?",
    a: "Типовые тексты — от 24 часов. Точные сроки зависит от объема и сложности задания.",
  },
  {
    q: "Можно ли заказать уникальный текст под задачу?",
    a: "Да! Опишите проект в заявке — всё обсудим, подберем автора и уточним детали.",
  },
  {
    q: "Какие способы оплаты вы поддерживаете?",
    a: "Stripe, PayPal, ЮKassa — платите удобно для себя.",
  },
  {
    q: "Как контролируется качество?",
    a: "Каждый заказ проходит проверку уникальности, редакторское вычитку и SEO-оценку.",
  },
];
const FaqSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-10 max-w-3xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={faq.q}
            className="bg-muted/60 rounded-lg shadow p-4 cursor-pointer transition hover:scale-[1.01]"
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-base md:text-lg">{faq.q}</span>
              <ChevronDown
                className={`transition-transform duration-200 ${open === idx ? "rotate-180" : ""}`}
              />
            </div>
            {open === idx && (
              <div className="mt-2 text-muted-foreground animate-fade-in">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
export default FaqSection;
