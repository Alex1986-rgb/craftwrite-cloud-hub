
import { Sparkles, Target, Users } from "lucide-react";

interface OrderFormHeaderProps {
  variant?: 'public' | 'client';
}

export default function OrderFormHeader({ variant = 'public' }: OrderFormHeaderProps) {
  if (variant === 'client') {
    // Client variant is handled in UnifiedOrderForm
    return null;
  }

  return (
    <div className="text-center mb-8 space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative glass-unified rounded-2xl p-8 md:p-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center shadow-unified-glow">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold gradient-text-brand mb-4">
            Заказать текст
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            Создайте профессиональный текст для вашего бизнеса. 
            Заполните форму, и мы подготовим индивидуальное предложение.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Точно в цель</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Анализируем вашу аудиторию и цели
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Высокое качество</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Профессиональные тексты от экспертов
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Быстро и надежно</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Соблюдаем сроки и гарантируем результат
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
