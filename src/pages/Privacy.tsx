
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import { Shield, Lock, Eye, FileText, CheckCircle } from "lucide-react";

const seoText = `
Политика конфиденциальности на CopyPro Cloud — ваша приватность в безопасности.
Мы тщательно храним персональные данные, используем их только для связывания с клиентом и не передаём третьим лицам.

Коротко о политике:
- Хранение и обработка данных в соответствии с ФЗ "О персональных данных".
- Все вопросы по приватности вы можете задать через форму обратной связи.
- Перед оформлением заказа клиент подтверждает согласие на обработку информации.
- Мы используем только безопасные технологии передачи и хранения данных.

CopyPro Cloud выбирает честность и заботу о клиентах!
`;

const privacyPoints = [
  {
    icon: Shield,
    title: "Защита персональных данных",
    description: "Вся персональная информация строго защищается и не передаётся третьим лицам без вашего согласия.",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: Lock,
    title: "Безопасное хранение",
    description: "Мы используем современные технологии шифрования для безопасного хранения ваших данных.",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    icon: Eye,
    title: "Прозрачность использования",
    description: "Данные используются только для связи с вами по вопросам заказов и обратной связи.",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: FileText,
    title: "Соответствие законодательству",
    description: "Обработка данных ведется в полном соответствии с требованиями ФЗ «О персональных данных».",
    gradient: "from-orange-500 to-red-600"
  }
];

const Privacy = () => (
  <>
    <Header />
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/20 relative overflow-hidden">
      <Seo
        title="Политика конфиденциальности — CopyPro Cloud"
        description="Условия хранения, обработки персональных данных и защиты личной информации клиентов CopyPro Cloud."
      />

      {/* Ultra-Modern Background Elements - Mobile responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-green-400/10 via-blue-400/8 to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-blue-400/10 via-indigo-400/8 to-purple-400/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-40 right-1/4 w-36 h-36 md:w-72 md:h-72 bg-gradient-to-r from-purple-400/8 via-pink-400/6 to-blue-400/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Security-themed grid pattern - hidden on mobile */}
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        {/* Floating security elements - hidden on small screens */}
        <div className="hidden lg:block absolute top-1/4 left-1/5 w-3 h-3 bg-green-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="hidden lg:block absolute top-3/4 right-1/5 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="hidden lg:block absolute top-1/2 left-4/5 w-4 h-4 bg-purple-400/25 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
      </div>

      <div className="relative z-10 py-8 md:py-16 px-4">
        {/* Hero Section - Mobile responsive */}
        <section className="max-w-6xl mx-auto text-center mb-12 md:mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-green-100/80 to-blue-100/80 text-green-700 px-4 py-3 md:px-8 md:py-4 rounded-full text-xs md:text-sm font-bold mb-6 md:mb-8 border border-green-200/50 shadow-lg backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <Shield className="w-4 h-4 md:w-5 md:h-5" />
            <span className="whitespace-nowrap">Ваша безопасность — наш приоритет</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 bg-gradient-to-r from-slate-900 via-green-800 to-blue-800 bg-clip-text text-transparent leading-tight tracking-tight px-4">
            Политика
            <br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">конфиденциальности</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium mb-8 md:mb-10 px-4">
            Мы гарантируем полную защиту ваших персональных данных и соблюдение всех требований законодательства
          </p>
        </section>

        {/* Privacy Principles Section - Mobile responsive */}
        <section className="max-w-6xl mx-auto mb-10 md:mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {privacyPoints.map((point, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/95 via-green-50/30 to-blue-50/20 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-green-200/30 relative overflow-hidden hover:scale-105 transition-all duration-500 animate-fade-in group"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                {/* Card background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${point.gradient} rounded-2xl md:rounded-3xl mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <point.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-slate-800 group-hover:text-green-600 transition-colors duration-300">
                    {point.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content Section - Mobile responsive */}
        <section className="max-w-4xl mx-auto mb-10 md:mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-br from-white/95 via-green-50/30 to-blue-50/20 backdrop-blur-lg rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-2xl border border-green-200/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-blue-400/5"></div>
            <div className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl md:rounded-2xl shadow-lg">
                  <FileText className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Основные положения
                </h2>
              </div>
              
              <div className="space-y-4 md:space-y-6 text-slate-600 text-base md:text-lg leading-relaxed">
                <div className="flex items-start gap-3 md:gap-4">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p>
                    Ваша персональная информация строго защищается и не передаётся третьим лицам. 
                    Мы используем данные только для связи с вами по вопросам заказов и обратной связи.
                  </p>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p>
                    Оформляя заказ, вы соглашаетесь с обработкой персональных данных в соответствии 
                    с требованиями ФЗ «О персональных данных».
                  </p>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p>
                    По всем вопросам, связанным с обработкой и хранением данных, вы можете обратиться 
                    через форму обратной связи или написать нам на почту.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Mobile responsive */}
        <section className="max-w-4xl mx-auto text-center mb-10 md:mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-br from-green-100/80 to-blue-100/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 border border-green-200/50 shadow-lg">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Eye className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              <h3 className="text-lg md:text-xl font-bold text-green-800">Вопросы по конфиденциальности?</h3>
            </div>
            <p className="text-base md:text-lg text-green-700 leading-relaxed px-4">
              Если у вас есть вопросы о том, как мы обрабатываем ваши данные, 
              <br className="hidden sm:block" />
              <span className="font-bold">обратитесь к нам любым удобным способом</span> — 
              мы всегда готовы предоставить подробную информацию.
            </p>
          </div>
        </section>

        {/* SEO Text */}
        <div className="animate-fade-in px-4" style={{ animationDelay: '0.8s' }}>
          <SeoTextExpandable text={seoText} />
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Privacy;
