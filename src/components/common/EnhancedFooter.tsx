import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  Users, 
  Award, 
  TrendingUp,
  ExternalLink,
  Send,
  Shield,
  UserCheck,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import HolographicIcon from "../landing/HolographicIcon";

const services = [
  { name: "SEO-статьи", path: "/seo-article-order", icon: "📝" },
  { name: "Лендинги", path: "/landing-page-order", icon: "🚀" },
  { name: "Email-кампании", path: "/email-campaigns-order", icon: "📧" },
  { name: "Контент для соцсетей", path: "/services", icon: "📱" },
  { name: "Тексты для сайтов", path: "/order/website-texts", icon: "🌐" },
  { name: "Описания товаров", path: "/services", icon: "📦" }
];

const tools = [
  { name: "Калькулятор стоимости", path: "/prices", icon: "🧮" },
  { name: "Конструктор ТЗ", path: "/order", icon: "🔧" },
  { name: "Примеры работ", path: "/portfolio", icon: "📋" },
  { name: "AI-рекомендации", path: "/order", icon: "🤖" },
  { name: "Отслеживание заказов", path: "/order-tracking", icon: "📊" },
  { name: "FAQ", path: "/faq", icon: "❓" }
];

const support = [
  { name: "О нас", path: "/about", icon: "ℹ️" },
  { name: "Блог", path: "/blog", icon: "📚" },
  { name: "Контакты", path: "/contact", icon: "📞" },
  { name: "Карьера", path: "/careers", icon: "💼" },
  { name: "Партнерам", path: "/partners", icon: "🤝" },
  { name: "Статус системы", path: "/test", icon: "⚡" }
];

const guarantees = [
  { icon: CheckCircle, title: "100% Гарантия", subtitle: "Качество или возврат" },
  { icon: UserCheck, title: "Сертификация", subtitle: "Эксперты с дипломами" },
  { icon: Users, title: "50+ Экспертов", subtitle: "Команда профессионалов" },
  { icon: TrendingUp, title: "5 лет роста", subtitle: "Проверено временем" }
];

export default function EnhancedFooter() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;
    setIsSubscribing(true);
    // Simulate subscription
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Main Footer */}
      <div className="relative bg-gradient-to-br from-[hsl(var(--deep-space))] via-[hsl(var(--ai-blue)/0.05)] to-[hsl(var(--electric-purple)/0.05)]">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-xl cyber-glow bg-gradient-to-br from-[hsl(var(--ai-blue))] to-[hsl(var(--electric-purple))] flex items-center justify-center">
                    <HolographicIcon icon={Zap} size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gradient-holographic">CopyPro Cloud</h3>
                    <p className="text-sm text-white/60">Профессиональный копирайтинг</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Ведущая платформа копирайтинга с командой из 50+ экспертов. 
                  Создаем контент, который продает и привлекает клиентов.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="holographic-border p-4 bg-black/20 backdrop-blur-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient-holographic">5000+</div>
                    <div className="text-xs text-white/60">Проектов</div>
                  </div>
                </Card>
                <Card className="holographic-border p-4 bg-black/20 backdrop-blur-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient-holographic">98%</div>
                    <div className="text-xs text-white/60">Довольных клиентов</div>
                  </div>
                </Card>
              </div>

              {/* Newsletter */}
              <Card className="holographic-border p-4 bg-black/10 backdrop-blur-xl">
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[hsl(var(--ai-blue))]" />
                  Email рассылка
                </h4>
                <p className="text-white/60 text-sm mb-4">
                  Получайте советы по копирайтингу и новости
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/20 border-white/20 text-white placeholder:text-white/40"
                  />
                  <Button 
                    onClick={handleSubscribe}
                    disabled={isSubscribing || !email}
                    className="cyber-glow bg-gradient-to-r from-[hsl(var(--ai-blue))] to-[hsl(var(--electric-purple))] px-4"
                  >
                    {isSubscribing ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="text-gradient-holographic">Услуги</span>
              </h4>
              <div className="space-y-3">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    to={service.path}
                    className="flex items-center group text-white/70 hover:text-white transition-colors"
                  >
                    <span className="mr-3 text-lg">{service.icon}</span>
                    <span className="group-hover:text-gradient transition-colors">{service.name}</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4">
                <span className="text-gradient-holographic">Инструменты</span>
              </h4>
              <div className="space-y-3">
                {tools.map((tool) => (
                  <Link
                    key={tool.name}
                    to={tool.path}
                    className="flex items-center group text-white/70 hover:text-white transition-colors"
                  >
                    <span className="mr-3 text-lg">{tool.icon}</span>
                    <span className="group-hover:text-gradient transition-colors">{tool.name}</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Support & Contact */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  <span className="text-gradient-holographic">Поддержка</span>
                </h4>
                <div className="space-y-3">
                  {support.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center group text-white/70 hover:text-white transition-colors"
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      <span className="group-hover:text-gradient transition-colors">{item.name}</span>
                      <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <Card className="holographic-border p-4 bg-black/10 backdrop-blur-xl space-y-3">
                <div className="flex items-center text-white/70">
                  <Phone className="w-4 h-4 mr-3 text-[hsl(var(--ai-blue))]" />
                  <span className="text-sm">+7 (800) 555-0199</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Mail className="w-4 h-4 mr-3 text-[hsl(var(--neon-green))]" />
                  <span className="text-sm">Telegram: @copyprocloud</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Clock className="w-4 h-4 mr-3 text-[hsl(var(--cyber-gold))]" />
                  <span className="text-sm">Работаем 24/7</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Guarantees Section */}
      <div className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-lg cyber-glow bg-gradient-to-br from-[hsl(var(--ai-blue))] to-[hsl(var(--neon-green))] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <guarantee.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{guarantee.title}</div>
                  <div className="text-white/60 text-xs">{guarantee.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/60 backdrop-blur-xl border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Quick Order Button */}
            <Button 
              asChild
              className="magnetic-hover cyber-glow bg-gradient-to-r from-[hsl(var(--neon-green))] to-[hsl(var(--ai-blue))] text-white font-semibold px-6 py-3 rounded-xl"
            >
              <Link to="/order">
                <Zap className="w-4 h-4 mr-2" />
                Быстрый заказ
              </Link>
            </Button>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
              <span className="text-white/30">|</span>
              <Link to="/terms" className="hover:text-white transition-colors">
                Условия использования
              </Link>
              <span className="text-white/30">|</span>
              <span>© 2024 CopyPro Cloud</span>
            </div>

            {/* Social Media */}
            <div className="flex space-x-3">
              {[
                { name: "Facebook", icon: "📘" },
                { name: "Twitter", icon: "🐦" },
                { name: "Instagram", icon: "📸" },
                { name: "LinkedIn", icon: "💼" },
                { name: "YouTube", icon: "📺" }
              ].map((social) => (
                <div
                  key={social.name}
                  className="w-8 h-8 rounded-lg cyber-glow bg-black/20 backdrop-blur-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                >
                  <span className="text-sm">{social.icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}