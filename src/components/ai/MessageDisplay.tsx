
import { Bot, User, Clock } from "lucide-react";
import { PriceCalculationDisplay } from "./PriceCalculationDisplay";
import { Button } from "@/components/ui/button";

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  recommendations?: string[];
  priceCalculation?: any;
  isThinking?: boolean;
  mood?: 'friendly' | 'professional' | 'enthusiastic' | 'empathetic';
}

interface MessageDisplayProps {
  messages: Message[];
  onRecommendationClick: (recommendation: string) => void;
}

export const MessageDisplay = ({ messages, onRecommendationClick }: MessageDisplayProps) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto h-[490px] space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="space-y-2">
          <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start gap-3 max-w-[85%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.isUser 
                  ? 'bg-blue-500' 
                  : message.isThinking
                  ? 'bg-orange-500'
                  : 'bg-gradient-to-r from-purple-500 to-blue-600'
              }`}>
                {message.isUser ? (
                  <User className="w-4 h-4 text-white" />
                ) : message.isThinking ? (
                  <Clock className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`rounded-2xl p-3 ${
                message.isUser
                  ? 'bg-blue-500 text-white'
                  : message.isThinking
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-slate-100 text-slate-800'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                {!message.isThinking && (
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-blue-100' : 'text-slate-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Price Calculation Display */}
          {message.priceCalculation && !message.isUser && (
            <PriceCalculationDisplay calculation={message.priceCalculation} />
          )}
          
          {/* Recommendations */}
          {message.recommendations && !message.isUser && (
            <div className="ml-11 space-y-1">
              <p className="text-xs text-slate-600 font-medium">Рекомендуемые услуги:</p>
              <div className="flex flex-wrap gap-1">
                {message.recommendations.map((rec, index) => (
                  <Button
                    key={index}
                    onClick={() => onRecommendationClick(`Расскажите подробнее про ${rec}`)}
                    variant="outline"
                    size="sm"
                    className="text-xs h-6 px-2 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                  >
                    {rec}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
