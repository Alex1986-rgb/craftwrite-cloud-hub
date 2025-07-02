
import React, { useState } from 'react';
import ModernAIAssistant from './ModernAIAssistant';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

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
          className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <Bot className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
        </Button>
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
