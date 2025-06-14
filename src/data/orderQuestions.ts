
export const SERVICES = [
  "SEO-статья",
  "Описание товара",
  "Текст для соцсетей",
  "Продающий текст",
  "Лендинг",
  "E-mail рассылка",
  "Уникальный заказ"
];

// Мапа уточняющих вопросов по каждому типу услуги
export const SERVICE_QUESTIONS: Record<
  string,
  { label: string; type: "text" | "select" | "textarea"; options?: string[] }[]
> = {
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

export const getDefaultAdditional = (service: string) => {
  const questions = SERVICE_QUESTIONS[service] || [];
  const d: Record<string, string> = {};
  questions.forEach(q => d[q.label] = "");
  return d;
};
