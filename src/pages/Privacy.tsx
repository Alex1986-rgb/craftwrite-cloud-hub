
import { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import PrivacyNavigation from "@/components/privacy/PrivacyNavigation";
import PrivacySection from "@/components/privacy/PrivacySection";
import PrivacyTimeline from "@/components/privacy/PrivacyTimeline";
import PrivacyContactForm from "@/components/privacy/PrivacyContactForm";
import { Shield, Lock, Eye, FileText, Users, Database, CheckCircle } from "lucide-react";

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

const Privacy = () => {
  const [activeSection, setActiveSection] = useState("general");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["general", "collection", "usage", "storage", "rights", "contacts"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/20 relative overflow-hidden">
        <Seo
          title="Политика конфиденциальности — CopyPro Cloud"
          description="Условия хранения, обработки персональных данных и защиты личной информации клиентов CopyPro Cloud."
        />

        {/* Ultra-Modern Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-green-400/10 via-blue-400/8 to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-40 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-blue-400/10 via-indigo-400/8 to-purple-400/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-40 right-1/4 w-36 h-36 md:w-72 md:h-72 bg-gradient-to-r from-purple-400/8 via-pink-400/6 to-blue-400/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        <div className="relative z-10 py-8 md:py-16 px-4">
          {/* Hero Section */}
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

          {/* Main Content with Navigation */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Navigation Sidebar */}
              <div className="lg:col-span-1">
                <PrivacyNavigation 
                  activeSection={activeSection} 
                  onSectionChange={scrollToSection} 
                />
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                <PrivacySection
                  id="general"
                  title="Общие положения"
                  icon={<Shield className="w-6 h-6 text-blue-600" />}
                  type="info"
                >
                  <p>
                    CopyPro Cloud (далее — "Компания", "мы") обязуется защищать конфиденциальность 
                    всех пользователей наших услуг. Настоящая политика конфиденциальности описывает, 
                    как мы собираем, используем, храним и защищаем вашу персональную информацию.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-blue-200/30">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Соответствие GDPR</h4>
                        <p className="text-sm text-slate-600">Полное соответствие европейским стандартам</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-white/50 rounded-lg border border-blue-200/30">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">ФЗ-152</h4>
                        <p className="text-sm text-slate-600">Соблюдение российского законодательства</p>
                      </div>
                    </div>
                  </div>

                  <p>
                    Используя наши услуги, вы соглашаетесь с условиями данной политики конфиденциальности. 
                    Если вы не согласны с какими-либо условиями, пожалуйста, не используйте наши услуги.
                  </p>
                </PrivacySection>

                <PrivacySection
                  id="collection"
                  title="Какие данные мы собираем"
                  icon={<Database className="w-6 h-6 text-green-600" />}
                  type="info"
                >
                  <p>Мы собираем следующие типы персональных данных:</p>
                  
                  <div className="space-y-4 my-6">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-slate-800 mb-2">Контактная информация</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Имя и фамилия</li>
                        <li>• Адрес электронной почты</li>
                        <li>• Номер телефона</li>
                        <li>• Название компании (при необходимости)</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-slate-800 mb-2">Техническая информация</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• IP-адрес</li>
                        <li>• Тип браузера и операционной системы</li>
                        <li>• Информация об устройстве</li>
                        <li>• Файлы cookie и данные сессий</li>
                      </ul>
                    </div>
                  </div>

                  <p>
                    Мы собираем эти данные только в объеме, необходимом для предоставления качественных услуг 
                    и поддержания связи с нашими клиентами.
                  </p>
                </PrivacySection>

                <PrivacySection
                  id="usage"
                  title="Как мы используем ваши данные"
                  icon={<Eye className="w-6 h-6 text-purple-600" />}
                  type="success"
                >
                  <p>Ваши персональные данные используются исключительно для:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    {[
                      { title: "Выполнение заказов", desc: "Обработка и выполнение ваших заказов на копирайтинг" },
                      { title: "Коммуникация", desc: "Связь с вами по вопросам проектов и обратной связи" },
                      { title: "Улучшение сервиса", desc: "Анализ использования для улучшения наших услуг" },
                      { title: "Техническая поддержка", desc: "Предоставление технической помощи и поддержки" }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-white/80 rounded-lg border border-green-200/50 shadow-sm">
                        <h4 className="font-semibold text-slate-800 mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border border-green-200">
                    <p className="text-sm text-slate-700">
                      <strong>Важно:</strong> Мы никогда не продаем, не сдаем в аренду и не передаем 
                      ваши персональные данные третьим лицам в коммерческих целях.
                    </p>
                  </div>
                </PrivacySection>

                <PrivacySection
                  id="storage"
                  title="Хранение и защита данных"
                  icon={<Lock className="w-6 h-6 text-red-600" />}
                  type="warning"
                >
                  <p>
                    Мы применяем современные технологии и методы для обеспечения безопасности ваших данных:
                  </p>
                  
                  <div className="space-y-4 my-6">
                    <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                      <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-red-600" />
                        Технические меры защиты
                      </h4>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li>• SSL/TLS шифрование при передаче данных</li>
                        <li>• Шифрование данных в базе данных</li>
                        <li>• Регулярное резервное копирование</li>
                        <li>• Многофакторная аутентификация</li>
                        <li>• Мониторинг безопасности 24/7</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                      <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        Организационные меры
                      </h4>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li>• Ограниченный доступ к данным</li>
                        <li>• Обучение сотрудников вопросам безопасности</li>
                        <li>• Регулярный аудит безопасности</li>
                        <li>• Политики и процедуры защиты данных</li>
                      </ul>
                    </div>
                  </div>

                  <p>
                    Данные хранятся в течение времени, необходимого для выполнения целей обработки, 
                    но не более 5 лет с момента последнего взаимодействия.
                  </p>
                </PrivacySection>

                <PrivacySection
                  id="rights"
                  title="Ваши права"
                  icon={<Users className="w-6 h-6 text-indigo-600" />}
                  type="info"
                >
                  <p>В соответствии с действующим законодательством, вы имеете следующие права:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    {[
                      { 
                        title: "Право на доступ", 
                        desc: "Получить информацию о том, какие данные мы о вас храним",
                        icon: "👁️"
                      },
                      { 
                        title: "Право на исправление", 
                        desc: "Исправить неточную или неполную информацию",
                        icon: "✏️"
                      },
                      { 
                        title: "Право на удаление", 
                        desc: "Запросить удаление ваших персональных данных",
                        icon: "🗑️"
                      },
                      { 
                        title: "Право на ограничение", 
                        desc: "Ограничить обработку ваших данных",
                        icon: "⏸️"
                      },
                      { 
                        title: "Право на портативность", 
                        desc: "Получить ваши данные в структурированном формате",
                        icon: "📋"
                      },
                      { 
                        title: "Право на возражение", 
                        desc: "Возразить против обработки ваших данных",
                        icon: "🚫"
                      }
                    ].map((right, index) => (
                      <div key={index} className="p-4 bg-white/80 rounded-lg border border-indigo-200/50 shadow-sm">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{right.icon}</span>
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-1">{right.title}</h4>
                            <p className="text-sm text-slate-600">{right.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg border border-indigo-200">
                    <p className="text-sm text-slate-700">
                      Для реализации любого из этих прав обратитесь к нам через форму обратной связи 
                      или напишите на privacy@copypro.cloud. Мы рассмотрим ваш запрос в течение 30 дней.
                    </p>
                  </div>
                </PrivacySection>

                <PrivacySection
                  id="contacts"
                  title="Связаться с нами"
                  icon={<FileText className="w-6 h-6 text-green-600" />}
                  type="success"
                >
                  <p className="mb-6">
                    Если у вас есть вопросы о нашей политике конфиденциальности или вы хотите 
                    воспользоваться своими правами в отношении персональных данных, 
                    свяжитесь с нами любым удобным способом:
                  </p>
                  
                  <PrivacyContactForm />
                </PrivacySection>

                {/* Timeline */}
                <div className="mt-12">
                  <PrivacyTimeline />
                </div>
              </div>
            </div>
          </div>

          {/* SEO Text */}
          <div className="animate-fade-in px-4 mt-16" style={{ animationDelay: '0.8s' }}>
            <SeoTextExpandable text={seoText} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Privacy;
