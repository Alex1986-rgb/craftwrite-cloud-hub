
import React, { useState, useEffect } from 'react';
import ModernAIAssistant from './ModernAIAssistant';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  // Автоактивация через 10 секунд
  useEffect(() => {
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setIsMinimized(false);
        setHasAutoOpened(true);
      }, 10000); // 10 секунд

      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened]);

  const toggleAssistant = () => {
    if (isOpen) {
      setIsMinimized(!isMinimized);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleAssistant}
          className={`rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group ${
            !hasAutoOpened ? 'animate-pulse' : ''
          }`}
        >
          <Bot className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
        </Button>
        
        {/* Подсказка для новых пользователей */}
        {!hasAutoOpened && (
          <div className="absolute bottom-20 right-0 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border max-w-48 text-sm animate-fade-in">
            💡 Привет! У вас есть вопросы? Я помогу с заказом!
            <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white dark:border-t-slate-800"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <ModernAIAssistant 
      isMinimized={isMinimized}
      onToggleMinimize={() => setIsMinimized(!isMinimized)}
    />
  );
}
