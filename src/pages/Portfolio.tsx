
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import { useState } from "react";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import { Eye, Filter, Sparkles, TrendingUp, Award } from "lucide-react";

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
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 relative overflow-hidden">
        <Seo
          title="Портфолио — CopyPro Cloud"
          description="Примеры наших текстов, успешные проекты и результаты для клиентов из разных ниш."
        />

        {/* Ultra-Modern Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-400/10 via-pink-400/8 to-orange-400/6 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/10 via-purple-400/8 to-pink-400/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-gradient-to-r from-pink-400/8 via-orange-400/6 to-yellow-400/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Creative grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          {/* Creative floating elements */}
          <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-3/4 right-1/5 w-2 h-2 bg-pink-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-4/5 w-4 h-4 bg-orange-400/25 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
        </div>

        <div className="relative z-10 py-16 px-4">
          {/* Hero Section - Completely Redesigned */}
          <section className="max-w-6xl mx-auto text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100/80 to-pink-100/80 text-purple-700 px-8 py-4 rounded-full text-sm font-bold mb-8 border border-purple-200/50 shadow-lg backdrop-blur-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <Eye className="w-5 h-5" />
              Галерея успешных проектов
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-slate-900 via-purple-800 to-pink-800 bg-clip-text text-transparent leading-tight tracking-tight">
              Портфолио наших
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">работ</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium mb-10">
              Примеры реальных проектов, которые принесли нашим клиентам измеримые результаты и рост бизнеса
            </p>
            
            {/* Portfolio-specific trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
              <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-6 py-3 rounded-full text-sm font-semibold border border-purple-200/50 shadow-lg backdrop-blur-sm">
                <TrendingUp className="w-4 h-4" />
                Реальные результаты
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-orange-50 text-pink-700 px-6 py-3 rounded-full text-sm font-semibold border border-pink-200/50 shadow-lg backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                Разные ниши
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-yellow-50 text-orange-700 px-6 py-3 rounded-full text-sm font-semibold border border-orange-200/50 shadow-lg backdrop-blur-sm">
                <Award className="w-4 h-4" />
                Качество экспертов
              </div>
            </div>
          </section>

          {/* Enhanced Filter Section */}
          <section className="max-w-5xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-br from-white/95 via-purple-50/30 to-pink-50/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-200/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-pink-400/5"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                    <Filter className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Фильтр проектов
                  </h3>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                  {TAGS.map((filter, index) => (
                    <button
                      key={filter.value}
                      onClick={() => setTag(filter.value)}
                      className={`px-6 py-3 rounded-full border font-semibold transition-all duration-300 animate-fade-in ${
                        tag === filter.value
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg border-transparent scale-105"
                          : "bg-white/70 border-purple-200/50 text-purple-700 hover:bg-purple-50/80 hover:border-purple-300/60 hover:scale-105"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Portfolio Grid */}
          <section className="max-w-6xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {shown.map((item, idx) => (
                <div
                  key={item.title}
                  className="animate-fade-in hover:scale-105 transition-all duration-500"
                  style={{ animationDelay: `${0.1 * (idx + 1)}s` }}
                >
                  <PortfolioCard {...item} />
                </div>
              ))}
            </div>
          </section>

          {/* Enhanced CTA Section */}
          <section className="max-w-4xl mx-auto text-center mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-gradient-to-br from-white/95 via-purple-50/30 to-pink-50/20 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-purple-200/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-pink-400/5"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Впечатлены нашими работами?
                </h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Закажите аналогичный проект и получите результат, который превзойдет ваши ожидания
                </p>
                <a
                  href="/order"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-2xl px-10 py-5 text-lg hover:from-purple-400 hover:to-pink-400 transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-purple-500/25"
                >
                  <Sparkles className="w-6 h-6" />
                  Хочу похожий текст
                </a>
              </div>
            </div>
          </section>

          {/* SEO Text */}
          <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <SeoTextExpandable text={seoText} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Portfolio;
