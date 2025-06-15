
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X, Lightbulb, AlertTriangle, MessageSquare } from 'lucide-react';
import { AIAssistantService } from '@/services/aiAssistantService';

interface ContextualHint {
  trigger: string;
  message: string;
  type: 'tip' | 'warning' | 'suggestion';
  priority: number;
}

interface ContextualHintsProps {
  text: string;
  cursorPosition: number;
  isVisible: boolean;
}

export default function ContextualHints({ 
  text, 
  cursorPosition, 
  isVisible 
}: ContextualHintsProps) {
  const [hints, setHints] = useState<ContextualHint[]>([]);
  const [dismissedHints, setDismissedHints] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isVisible && text.trim()) {
      const newHints = AIAssistantService.getContextualHints(text, cursorPosition);
      setHints(newHints.filter(hint => !dismissedHints.has(hint.trigger)));
    }
  }, [text, cursorPosition, isVisible, dismissedHints]);

  const getHintIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'suggestion': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'tip': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getHintColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-orange-200 bg-orange-50';
      case 'suggestion': return 'border-blue-200 bg-blue-50';
      case 'tip': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const dismissHint = (trigger: string) => {
    setDismissedHints(prev => new Set(prev).add(trigger));
  };

  if (!isVisible || hints.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-sm space-y-2 z-50">
      {hints.slice(0, 2).map((hint) => (
        <Alert 
          key={hint.trigger} 
          className={`${getHintColor(hint.type)} shadow-lg animate-in slide-in-from-bottom-2`}
        >
          <div className="flex items-start gap-2">
            {getHintIcon(hint.type)}
            <div className="flex-1">
              <AlertDescription className="text-sm">
                {hint.message}
              </AlertDescription>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => dismissHint(hint.trigger)}
              className="h-6 w-6 p-0 hover:bg-white/50"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </Alert>
      ))}
      
      {hints.length > 2 && (
        <Badge variant="secondary" className="ml-6">
          +{hints.length - 2} больше подсказок
        </Badge>
      )}
    </div>
  );
}
