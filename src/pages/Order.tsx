
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import Seo from "@/components/Seo";
import OrderServiceCard from "@/components/order/OrderServiceCard";
import OrderQuestionGroup from "@/components/order/OrderQuestionGroup";

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

  // NEW: фильтр для поиска услуги
  const [serviceFilter, setServiceFilter] = useState("");
  const filteredServices = SERVICES.filter(s =>
    s.toLowerCase().includes(serviceFilter.toLowerCase())
  );

  // Обработка смены услуги (карточка)
  const handleServiceSelect = (service: string) => {
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

  // Дополнительные вопросы для выбранной услуги
  const currentQuestions = SERVICE_QUESTIONS[form.service] || [];

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-white/85 to-background py-10 px-2 md:px-4">
        <Seo
          title="Оформить заказ — CopyPro Cloud"
          description="Заполните форму заказа на тексты: копирайтинг для бизнеса, сайтов, маркетинга. Свяжемся быстро, работаем профессионально!"
        />
        <form
          onSubmit={handleSubmit}
          className="relative bg-card max-w-xl w-full space-y-4 p-8 rounded-2xl shadow-lg border border-muted/20 animate-fade-in"
          autoComplete="off"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 animate-fade-in">
            Закажите текст прямо сейчас
          </h1>
          <div className="mb-3">
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
              className="mt-2"
              onChange={handleChange}
            />
          </div>
          <div>
            <Input
              placeholder="Найти услугу…"
              className="mb-2"
              value={serviceFilter}
              onChange={e => setServiceFilter(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {filteredServices.map((s) => (
                <OrderServiceCard
                  key={s}
                  label={s}
                  active={form.service === s}
                  onClick={() => handleServiceSelect(s)}
                />
              ))}
            </div>
          </div>
          {/* Показать дополнительные уточняющие вопросы */}
          {currentQuestions.length > 0 && (
            <OrderQuestionGroup
              questions={currentQuestions}
              answers={form.additional}
              onChange={handleAdditionalChange}
            />
          )}
          <Textarea
            name="details"
            placeholder="Комментарий, пожелания или ссылка на ТЗ"
            rows={3}
            required
            value={form.details}
            onChange={handleChange}
            className="mt-2"
          />
          <Button
            type="submit"
            size="lg"
            className="w-full mt-4 shadow-lg text-lg"
            disabled={loading}
          >
            {loading ? "Отправка..." : "Отправить заказ"}
          </Button>
          <div className="text-xs text-muted-foreground text-center mt-1">
            Нажимая, вы даёте согласие на обработку персональных данных
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Order;

