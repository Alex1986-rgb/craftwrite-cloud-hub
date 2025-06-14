
import { CheckCircle } from "lucide-react";

const benefits = [
  "Широкий выбор типов текстов",
  "Работа с профессиональными копирайтерами",
  "Быстрое выполнение",
  "Проверка уникальности и качества",
  "SEO-оптимизация под задачи клиента"
];

const BenefitsSection = () => (
  <section className="py-8 bg-muted rounded-xl mx-4 md:mx-auto max-w-4xl md:mt-2 shadow animate-fade-in">
    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Преимущества платформы</h2>
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-4 md:px-0">
      {benefits.map((benefit) => (
        <li key={benefit} className="flex items-start gap-3">
          <CheckCircle className="text-primary mt-1" />
          <span className="text-base md:text-lg">{benefit}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default BenefitsSection;
