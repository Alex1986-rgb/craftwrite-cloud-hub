
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import { useState } from "react";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";

const seoText = `
Портфолио CopyPro Cloud — примеры реальных проектов для клиентов из разных сфер.
Мы гордимся своими результатами: эффективные SEO-статьи, продающие лендинги, описания товаров и экспертные тексты для бизнеса.

Наши преимущества:
- Разнообразие тематик и форматов: от IT до ритейла, от коротких описаний до сложной аналитики.
- Тексты, которые приносят результат: трафик, заявки, продажи.
- Только реальные кейсы, всё написано экспертами нашей команды.
- Каждый пример — это решение задачи клиента, а не просто демонстрация навыков.

Станьте частью успеха — закажите текст, который изменит ваш бизнес!
`;

const works = [
  {
    title: "SEO-статья для IT-компании",
    desc: "Экспертная статья по кибербезопасности (релевантность 98%, заказчик — SaaS-платформа).",
    image: "photo-1461749280684-dccba630e2f6",
    tag: "SEO"
  },
  {
    title: "Описания товаров для интернет-магазина",
    desc: "Более 1500 товарных карточек с уникальными текстами, CR выросла на 17%.",
    image: "photo-1488590528505-98d2b5aba04b",
    tag: "Карточки"
  },
  {
    title: "Контент для лендинга онлайн-курса",
    desc: "Продающий структурный текст: результат — 42% рост заявок.",
    image: "photo-1483058712412-4245e9b90334",
    tag: "Лендинг"
  },
  {
    title: "Юридическая аналитика для B2B",
    desc: "Сложная экспертная статья, уникальность 100%, большой объём, аудит пройден.",
    image: "photo-1526374965328-7f61d4dc18c5",
    tag: "Другое"
  }
];

const TAGS = [
  { label: "Все", value: "all" },
  { label: "SEO", value: "SEO" },
  { label: "Карточки", value: "Карточки" },
  { label: "Лендинг", value: "Лендинг" },
  { label: "Другое", value: "Другое" },
];

const Portfolio = () => {
  const [tag, setTag] = useState("all");
  const shown = tag === "all" ? works : works.filter(w => w.tag === tag);

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center py-10 px-4 bg-background">
        <Seo
          title="Портфолио — CopyPro Cloud"
          description="Примеры наших текстов, успешные проекты и результаты для клиентов из разных ниш."
        />
        <section className="max-w-4xl w-full mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">Портфолио</h1>
          <div className="flex flex-wrap justify-center gap-2 mb-7">
            {TAGS.map(f => (
              <button
                key={f.value}
                onClick={() => setTag(f.value)}
                className={`px-3 py-1 rounded-full border bg-muted/50 text-sm font-medium transition-colors
                  ${tag === f.value
                    ? "bg-primary text-primary-foreground shadow font-bold"
                    : "hover:bg-muted border-muted-foreground/10 text-muted-foreground"
                  }
                  animate-fade-in
                `}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
            {shown.map((item, idx) => (
              <PortfolioCard
                key={item.title}
                {...item}
              />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <a
              href="/order"
              className="bg-primary text-primary-foreground font-bold rounded-full shadow px-6 py-3 hover:bg-primary/90 transition-all animate-fade-in"
            >
              Хочу похожий текст
            </a>
          </div>
        </section>
        <SeoTextExpandable text={seoText} />
      </main>
      <Footer />
    </>
  );
};

export default Portfolio;
