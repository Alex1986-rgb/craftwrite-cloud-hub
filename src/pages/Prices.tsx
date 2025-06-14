
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import { prices } from "@/data/prices";
import { PriceTable } from "@/components/prices/PriceTable";
import { Sparkles, TrendingUp, Shield, Award } from "lucide-react";

const seoText = `
Цены на копирайтинг и создание текстов от CopyPro Cloud — всё прозрачно и честно.
Мы предлагаем гибкую ценовую политику для стандартных и индивидуальных заказов: SEO-статьи, продающие лендинги, описания товаров, рассылки и многое другое.

Преимущества работы с нами:
- Стоимость формируется только из объёма и сложности задания, без скрытых доплат.
- Для крупных заказов и постоянных клиентов действуют индивидуальные скидки.
- Вы всегда получаете качественный текст, соответствующий вашему брифу и требованиям ниши.
- Бесплатная SEO-оптимизация и корректировка по пожеланиям клиента.

С CopyPro Cloud вы заранее знаете, за что платите — никаких сюрпризов.
`;

const Prices = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 relative overflow-hidden">
        <Seo
          title="Цены на услуги — CopyPro Cloud"
          description="Прозрачные и доступные цены на копирайтинг, SEO-статьи, тексты для бизнеса. Экономьте время и бюджет с CopyPro Cloud!"
        />

        {/* Ultra-Modern Background Elements - Mobile responsive */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-green-400/10 via-blue-400/8 to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-40 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-blue-400/10 via-purple-400/8 to-pink-400/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-40 right-1/4 w-36 h-36 md:w-72 md:h-72 bg-gradient-to-r from-purple-400/8 via-pink-400/6 to-orange-400/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Modern grid pattern - hidden on mobile */}
          <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          {/* Floating money-themed particles - hidden on small screens */}
          <div className="hidden lg:block absolute top-1/4 left-1/5 w-3 h-3 bg-green-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="hidden lg:block absolute top-3/4 right-1/5 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          <div className="hidden lg:block absolute top-1/2 left-4/5 w-4 h-4 bg-purple-400/25 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
        </div>

        <div className="relative z-10 py-8 md:py-16 px-4">
          {/* Hero Section - Mobile responsive */}
          <section className="max-w-6xl mx-auto text-center mb-12 md:mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-green-100/80 to-blue-100/80 text-green-700 px-4 py-3 md:px-8 md:py-4 rounded-full text-xs md:text-sm font-bold mb-6 md:mb-8 border border-green-200/50 shadow-lg backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
              <span className="whitespace-nowrap">Прозрачное ценообразование</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 bg-gradient-to-r from-slate-900 via-green-800 to-blue-800 bg-clip-text text-transparent leading-tight tracking-tight px-4">
              Цены на услуги
              <br />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">копирайтинга</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium mb-8 md:mb-10 px-4">
              Честные и понятные цены без скрытых платежей. Инвестируйте в качественный контент с гарантированным результатом
            </p>
            
            {/* Trust indicators - Mobile responsive */}
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mb-8 md:mb-12 px-4">
              <div className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold border border-green-200/50 shadow-lg backdrop-blur-sm">
                <Shield className="w-3 h-3 md:w-4 md:h-4" />
                <span className="whitespace-nowrap">Без скрытых доплат</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold border border-blue-200/50 shadow-lg backdrop-blur-sm">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                <span className="whitespace-nowrap">Фиксированная стоимость</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold border border-purple-200/50 shadow-lg backdrop-blur-sm">
                <Award className="w-3 h-3 md:w-4 md:h-4" />
                <span className="whitespace-nowrap">Премиум качество</span>
              </div>
            </div>
          </section>

          {/* Enhanced Price Table Container - Mobile responsive */}
          <section className="max-w-5xl mx-auto mb-10 md:mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-br from-white/95 via-blue-50/30 to-purple-50/20 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl border border-blue-200/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5"></div>
              <div className="absolute top-0 right-0 w-20 h-20 md:w-40 md:h-40 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <PriceTable items={prices} />
              </div>
            </div>
          </section>

          {/* Enhanced Individual Pricing Note - Mobile responsive */}
          <section className="max-w-4xl mx-auto text-center mb-10 md:mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 border border-amber-200/50 shadow-lg">
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                <h3 className="text-lg md:text-xl font-bold text-amber-800">Индивидуальные проекты</h3>
              </div>
              <p className="text-base md:text-lg text-amber-700 leading-relaxed px-4">
                Для крупных или уникальных заказов&nbsp;
                <span className="font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
                  цена обсуждается индивидуально.
                </span>
                <br />
                Мы всегда найдем оптимальное решение для вашего бюджета и задач.
              </p>
            </div>
          </section>

          {/* SEO Text */}
          <div className="animate-fade-in px-4" style={{ animationDelay: '0.6s' }}>
            <SeoTextExpandable text={seoText} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Prices;
