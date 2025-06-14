
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronUp, Menu, X, Eye, FileText, BarChart3, Award, MessageCircle, Zap } from "lucide-react";

const navigationItems = [
  { id: "hero", label: "Обзор", icon: Eye },
  { id: "metrics", label: "Метрики", icon: BarChart3 },
  { id: "examples", label: "Примеры", icon: FileText },
  { id: "results", label: "Результаты", icon: Award },
  { id: "testimonial", label: "Отзыв", icon: MessageCircle },
  { id: "cta", label: "Сотрудничество", icon: Zap }
];

export default function SmartNavigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setScrollProgress(progress);

      // Show navigation after scrolling past hero
      setIsVisible(scrolled > 400);

      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.id);
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Navigation */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden lg:block">
        <div className="glass-effect rounded-2xl px-6 py-4 shadow-2xl border border-white/20">
          <div className="flex items-center gap-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-primary text-white shadow-lg scale-110'
                      : 'text-slate-600 hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
          <Progress value={scrollProgress} className="w-full mt-3 h-1" />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-12 h-12 rounded-full bg-primary text-white shadow-lg"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
        
        {isMenuOpen && (
          <div className="absolute top-16 right-0 glass-effect rounded-2xl p-4 shadow-2xl border border-white/20 w-48">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left ${
                    activeSection === item.id
                      ? 'bg-primary text-white'
                      : 'text-slate-700 hover:bg-primary/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
            <div className="mt-3 pt-3 border-t border-white/20">
              <Progress value={scrollProgress} className="w-full h-2" />
              <div className="text-xs text-slate-600 mt-2 text-center">
                {Math.round(scrollProgress)}% прочитано
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      {scrollProgress > 20 && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:scale-110 transition-all duration-300"
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
      )}
    </>
  );
}
