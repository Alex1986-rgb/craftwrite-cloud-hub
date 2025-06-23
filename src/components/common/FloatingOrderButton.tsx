
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function FloatingOrderButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroHeight = window.innerHeight * 0.8; // Показываем после прокрутки hero
      
      setIsVisible(scrolled > heroHeight);
      setShowScrollTop(scrolled > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToQuickOrder = () => {
    const quickOrderElement = document.getElementById('quick-order');
    if (quickOrderElement) {
      quickOrderElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Order Button */}
      <div className={cn(
        "fixed bottom-4 right-4 z-50 transition-all duration-500 lg:hidden",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      )}>
        <Button
          onClick={scrollToQuickOrder}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 shadow-2xl hover:shadow-glow transition-all duration-300 hover:scale-110"
        >
          <Zap className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Scroll to Top Button */}
      <div className={cn(
        "fixed bottom-20 right-4 z-50 transition-all duration-500",
        showScrollTop ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      )}>
        <Button
          onClick={scrollToTop}
          variant="outline"
          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-lg border-slate-300 hover:bg-white shadow-lg"
        >
          <ArrowUp className="w-5 h-5 text-slate-600" />
        </Button>
      </div>
    </>
  );
}
