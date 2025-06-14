
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import Seo from "@/components/Seo";

// Возможные услуги
const SERVICES = [
  "SEO-статья",
  "Описание товара",
  "Текст для соцсетей",
  "Продающий текст",
  "Лендинг",
  "E-mail рассылка",
  "Уникальный заказ"
];

// Мапа уточняющих вопросов по каждому типу услуги
const SERVICE_QUESTIONS: Record<string, { label: string, type: "text" | "select" | "textarea", options?: string[] }[]> = {
  "SEO-статья": [
    { label: "Тематика статьи", type: "text" },
    { label: "Объём (знаков/слов)", type: "text" },
    { label: "Ключевые слова (если есть)", type: "textarea" },
    { label: "Требуемый стиль", type: "select", options: ["Информационный", "Экспертный", "Формальный", "Дружелюбный"] }
  ],
  "Описание товара": [
    { label: "Тип товара или категория", type: "text" },
    { label: "Требуемое количество описаний", type: "text" },
    { label: "Язык описания", type: "select", options: ["Русский", "Английский", "Другое"] }
  ],
  "Текст для соцсетей": [
    { label: "Платформа", type: "select", options: ["ВКонтакте", "Telegram", "Instagram", "Facebook", "Другое"] },
    { label: "Тональность", type: "select", options: ["Дружелюбная", "Серьёзная", "Информативная"] },
    { label: "Пример темы поста", type: "text" }
  ],
  "Продающий текст": [
    { label: "Тип продукта или услуги", type: "text" },
    { label: "Аудитория", type: "text" },
    { label: "Главная цель текста", type: "select", options: ["Продажи", "Заявки", "Реклама/баннер", "Письмо"] }
  ],
  "Лендинг": [
    { label: "Тематика/нишa лендинга", type: "text" },
    { label: "URL для анализа или примеры", type: "text" },
    { label: "Краткое УТП (по желанию)", type: "textarea" }
  ],
  "E-mail рассылка": [
    { label: "Тип рассылки", type: "select", options: ["Промо", "Информационная", "Автоматизированная серия"] },
    { label: "Тематика", type: "text" },
    { label: "Целевая аудитория", type: "text" }
  ],
  "Уникальный заказ": [
    { label: "Опишите задание", type: "textarea" }
  ]
};

const getDefaultAdditional = (service: string) => {
  const questions = SERVICE_QUESTIONS[service] || [];
  const d: Record<string, string> = {};
  questions.forEach(q => d[q.label] = "");
  return d;
};

const Order = () => {
  // Основная форма
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: SERVICES[0],
    details: "",
    additional: getDefaultAdditional(SERVICES[0])
  });
  const [loading, setLoading] = useState(false);

  // Обработка смены услуги
  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const service = e.target.value;
    setForm({
      ...form,
      service,
      additional: getDefaultAdditional(service)
    });
  };

  // Обработка ввода уточняющих ответов
  const handleAdditionalChange = (label: string, value: string) => {
    setForm({
      ...form,
      additional: {
        ...form.additional,
        [label]: value
      }
    });
  };

  // Стандартная обработка текстовых полей (имя, почта)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Сабмит
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast({
        title: "Заказ отправлен!",
        description: "Мы получили ваш запрос и свяжемся с вами в течение 1 рабочего дня.",
      });
      setForm({
        name: "",
        email: "",
        service: SERVICES[0],
        details: "",
        additional: getDefaultAdditional(SERVICES[0])
      });
      setLoading(false);
    }, 1300);
  };

  // Рендер уточняющих
  const renderQuestions = () => {
    const questions = SERVICE_QUESTIONS[form.service];
    if (!questions) return null;
    return questions.map((q, idx) => {
      const value = form.additional[q.label] || "";
      if (q.type === "text") {
        return (
          <Input
            key={q.label}
            name={q.label}
            value={value}
            required
            placeholder={q.label}
            onChange={e => handleAdditionalChange(q.label, e.target.value)}
            className="mt-2"
          />
        );
      }
      if (q.type === "textarea") {
        return (
          <Textarea
            key={q.label}
            name={q.label}
            value={value}
            required
            placeholder={q.label}
            rows={3}
            onChange={e => handleAdditionalChange(q.label, e.target.value)}
            className="mt-2"
          />
        );
      }
      if (q.type === "select" && q.options) {
        return (
          <select
            key={q.label}
            name={q.label}
            value={value}
            required
            onChange={e => handleAdditionalChange(q.label, e.target.value)}
            className="border-input bg-background rounded-md px-3 py-2 text-sm mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="" disabled>
              {q.label}
            </option>
            {q.options.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      }
      return null;
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-background py-10 px-4">
        <Seo
          title="Оформить заказ — CopyPro Cloud"
          description="Заполните форму заказа на тексты: копирайтинг для бизнеса, сайтов, маркетинга. Свяжемся быстро, работаем профессионально!"
        />
        <form
          onSubmit={handleSubmit}
          className="bg-card max-w-md w-full space-y-4 p-8 rounded-xl shadow-md"
          autoComplete="off"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Оформить заказ
          </h1>
          <Input
            name="name"
            placeholder="Ваше имя"
            required
            value={form.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Ваш email"
            required
            value={form.email}
            onChange={handleChange}
          />
          <select
            name="service"
            value={form.service}
            onChange={handleServiceChange}
            className="border-input bg-background rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {SERVICES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {/* Показать дополнительные уточняющие вопросы */}
          {renderQuestions()}
          <Textarea
            name="details"
            placeholder="Комментарий, пожелания или ссылка на ТЗ"
            rows={3}
            required
            value={form.details}
            onChange={handleChange}
            className="mt-2"
          />
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Отправка..." : "Отправить заказ"}
          </Button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Order;

