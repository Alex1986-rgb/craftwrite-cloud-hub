
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, Zap } from 'lucide-react';
import SmartChatBot from './SmartChatBot';

export default function FloatingChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(true);

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setHasNewMessages(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={handleToggleChat}
          className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 ${
            isChatOpen 
              ? 'bg-red-600 hover:bg-red-700 rotate-90' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-110'
          }`}
        >
          {isChatOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
          
          {/* Индикатор новых сообщений */}
          {hasNewMessages && !isChatOpen && (
            <div className="absolute -top-2 -right-2">
              <Badge className="w-6 h-6 rounded-full bg-red-500 text-white p-0 flex items-center justify-center animate-pulse">
                <Zap className="w-3 h-3" />
              </Badge>
            </div>
          )}
        </Button>

        {/* Подсказка при наведении */}
        {!isChatOpen && (
          <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg p-3 min-w-[200px] opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="text-sm font-medium text-gray-900">AI-консультант</div>
            <div className="text-xs text-gray-600 mt-1">
              Ответим на вопросы за 30 секунд
            </div>
            <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-200"></div>
          </div>
        )}
      </div>

      <SmartChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
