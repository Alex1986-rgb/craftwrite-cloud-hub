
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Rocket, CheckCircle, Stars, Group, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ADVANTAGES = [
  {
    icon: <Stars className="text-primary w-7 h-7" />,
    title: "Экспертные тексты",
    desc: "Авторские материалы от профессионалов с глубоким пониманием темы.",
  },
  {
    icon: <CheckCircle className="text-green-500 w-7 h-7" />,
    title: "SEO-оптимизация",
    desc: "Грамотная структура, релевантные ключи — ваши тексты будут в топе.",
  },
  {
    icon: <Group className="text-purple-600 w-7 h-7" />,
    title: "Быстрая связь",
    desc: "Сопровождение на каждом этапе, всегда на связи в мессенджерах.",
  },
  {
    icon: <MessageCircle className="text-indigo-400 w-7 h-7" />,
    title: "Индивидуальный подход",
    desc: "Анализируем ваши задачи, формируем персональные рекомендации и предложения.",
  },
];

const Index = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex flex-col pb-8 animate-fade-in">
        <Seo
          title="CopyPro Cloud — SaaS-платформа для копирайтинга"
          description="Платформа для заказа текстов: статьи, тексты для сайтов, продающие лендинги, быстро и профессионально. Копирайтеры, SEO-оптимизация, контроль качества!"
        />
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center pt-12 pb-10 px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-2 p-1 px-3 rounded-full bg-muted/60 text-sm animate-fade-in">
            <Rocket className="w-5 h-5 text-primary" />
            Платформа №1 для заказа текстов онлайн
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight animate-fade-in">
            Качественный копирайтинг <span className="text-primary animate-pulse">для бизнеса</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-xl mx-auto animate-fade-in">
            Готовые SEO-статьи, продающие лендинги и описание товаров. Закажите профессиональный текст за пару минут — и фокусируйтесь на развитии бизнеса!
          </p>
          <Button size="lg" asChild className="rounded-full px-8 py-5 text-base md:text-lg shadow-lg hover-scale animate-fade-in">
            <Link to="/order">Оформить заказ</Link>
          </Button>
        </section>
        {/* Advantages Section */}
        <section className="container max-w-4xl mx-auto px-3 py-8 grid gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 animate-fade-in">Наши преимущества</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {ADVANTAGES.map((adv, i) => (
              <div
                key={adv.title}
                className="flex bg-card rounded-xl border border-muted p-5 gap-4 items-start shadow transition hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                {adv.icon}
                <div>
                  <div className="font-semibold mb-1 text-lg">{adv.title}</div>
                  <div className="text-muted-foreground text-sm">{adv.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Call to action */}
        <section className="container max-w-3xl mx-auto mt-8 flex flex-col items-center gap-3 px-4">
          <h3 className="text-xl font-semibold text-primary/90 animate-fade-in">Готовы к новому уровню контента?</h3>
          <Button size="lg" asChild className="rounded-full px-7 py-4 mt-2 animate-fade-in">
            <Link to="/order">Попробовать сейчас</Link>
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
