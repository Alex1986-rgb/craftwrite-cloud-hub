
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import { BookOpen, Calendar, TrendingUp, Lightbulb, Users, Target } from "lucide-react";

const seoText = `
Блог CopyPro Cloud — свежие статьи о копирайтинге, SEO, маркетинге и бизнесе онлайн.
Секреты эффективных текстов, аналитика, новые форматы, разбор ошибок и рекомендации для развития бизнеса через контент.

Что вы найдёте в нашем блоге:
- Инструкции и советы по заказу и проверке текстов.
- Реальные истории клиентов и примеры работ.
- Разбор актуальных трендов рынка копирайтинга.
- Лайфхаки для SEO-продвижения и повышения конверсии.

Читайте наш блог и внедряйте лучшее в свои проекты!
`;

const blogPosts = [
  {
    title: "5 причин доверять контент профессионалам",
    desc: "Почему качественный текст критически важен для вашего бизнеса и как он влияет на конверсию?",
    date: "Май 2024",
    category: "Бизнес",
    icon: Users,
    gradient: "from-blue-500 to-purple-600"
  },
  {
    title: "Как заказать SEO-статью и не ошибиться",
    desc: "Главные советы по брифу, поиску исполнителя и проверке результата от экспертов индустрии.",
    date: "Апрель 2024",
    category: "SEO",
    icon: Target,
    gradient: "from-emerald-500 to-blue-600"
  },
  {
    title: "Роль уникальности текста в SEO-продвижении",
    desc: "Объясняем, почему уникальность — это не просто процент по сервису проверки, а комплексный показатель качества.",
    date: "Март 2024",
    category: "Аналитика",
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-600"
  },
];

const Blog = () => (
  <>
    <Header />
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-yellow-50/20 relative overflow-hidden">
      <Seo
        title="Блог CopyPro Cloud"
        description="Статьи по копирайтингу, маркетингу, SEO и эффективному бизнесу онлайн."
      />

      {/* Ultra-Modern Background Elements - Mobile responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-orange-400/10 via-yellow-400/8 to-red-400/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-blue-400/10 via-purple-400/8 to-pink-400/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-40 right-1/4 w-36 h-36 md:w-72 md:h-72 bg-gradient-to-r from-green-400/8 via-blue-400/6 to-purple-400/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Knowledge-themed grid pattern - hidden on mobile */}
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        {/* Floating knowledge elements - hidden on small screens */}
        <div className="hidden lg:block absolute top-1/4 left-1/5 w-3 h-3 bg-orange-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="hidden lg:block absolute top-3/4 right-1/5 w-2 h-2 bg-yellow-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="hidden lg:block absolute top-1/2 left-4/5 w-4 h-4 bg-red-400/25 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
      </div>

      <div className="relative z-10 py-8 md:py-16 px-4">
        {/* Hero Section - Mobile responsive */}
        <section className="max-w-6xl mx-auto text-center mb-12 md:mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-orange-100/80 to-yellow-100/80 text-orange-700 px-4 py-3 md:px-8 md:py-4 rounded-full text-xs md:text-sm font-bold mb-6 md:mb-8 border border-orange-200/50 shadow-lg backdrop-blur-sm">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
            <span className="whitespace-nowrap">База знаний экспертов</span>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 bg-gradient-to-r from-slate-900 via-orange-800 to-red-800 bg-clip-text text-transparent leading-tight tracking-tight px-4">
            Блог о копирайтинге
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">и маркетинге</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium mb-8 md:mb-10 px-4">
            Эксклюзивные материалы, профессиональные инсайты и практические советы от команды экспертов CopyPro Cloud
          </p>
          
          {/* Blog-specific trust indicators - Mobile responsive */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mb-8 md:mb-12 px-4">
            <div className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold border border-orange-200/50 shadow-lg backdrop-blur-sm">
              <Lightbulb className="w-3 h-3 md:w-4 md:h-4" />
              <span className="whitespace-nowrap">Экспертные инсайты</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-700 px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold border border-yellow-200/50 shadow-lg backdrop-blur-sm">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
              <span className="whitespace-nowrap">Актуальные тренды</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold border border-red-200/50 shadow-lg backdrop-blur-sm">
              <Target className="w-3 h-3 md:w-4 md:h-4" />
              <span className="whitespace-nowrap">Практические советы</span>
            </div>
          </div>
        </section>

        {/* Enhanced Blog Posts Section - Mobile responsive */}
        <section className="max-w-5xl mx-auto mb-10 md:mb-16">
          <div className="space-y-6 md:space-y-8">
            {blogPosts.map((post, idx) => (
              <article 
                key={idx} 
                className="bg-gradient-to-br from-white/95 via-orange-50/30 to-yellow-50/20 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl border border-orange-200/30 relative overflow-hidden hover:scale-105 transition-all duration-500 animate-fade-in group"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                {/* Article background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-transparent to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                    {/* Enhanced Icon */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${post.gradient} rounded-2xl md:rounded-3xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0`}>
                      <post.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    
                    <div className="flex-1 w-full">
                      {/* Meta information */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 md:mb-4">
                        <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className={`inline-block px-3 py-1 md:px-4 md:py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${post.gradient} text-white shadow-sm w-fit`}>
                          {post.category}
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-slate-800 group-hover:text-orange-600 transition-colors duration-300 leading-tight">
                        {post.title}
                      </h2>
                      
                      {/* Description */}
                      <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-4 md:mb-6">
                        {post.desc}
                      </p>
                      
                      {/* Read more button */}
                      <div>
                        <button className={`inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r ${post.gradient} text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base`}>
                          Читать статью
                          <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Coming Soon Section - Mobile responsive */}
        <section className="max-w-4xl mx-auto text-center mb-10 md:mb-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-br from-white/95 via-orange-50/30 to-yellow-50/20 backdrop-blur-lg rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-2xl border border-orange-200/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-transparent to-yellow-400/5"></div>
            <div className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4 md:mb-6 shadow-lg">
                <Lightbulb className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent px-4">
                Больше материалов уже в разработке
              </h3>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed px-4">
                Наша команда экспертов готовит для вас еще больше полезных статей, гайдов и кейсов. 
                Подписывайтесь на обновления, чтобы не пропустить новые материалы!
              </p>
            </div>
          </div>
        </section>

        {/* SEO Text */}
        <div className="animate-fade-in px-4" style={{ animationDelay: '1s' }}>
          <SeoTextExpandable text={seoText} />
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Blog;
