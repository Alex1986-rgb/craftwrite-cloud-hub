
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OrderEmailHint from "./OrderEmailHint";

interface OrderFormContactProps {
  form: {
    name: string;
    email: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nameInputRef: React.RefObject<HTMLInputElement>;
  formProgress: number;
}

export default function OrderFormContact({ 
  form, 
  handleChange, 
  nameInputRef, 
  formProgress 
}: OrderFormContactProps) {
  return (
    <section 
      className="space-y-4 md:space-y-6" 
      aria-labelledby="contact-info-heading"
      role="group"
      itemScope
      itemType="https://schema.org/ContactPoint"
    >
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h3 
          id="contact-info-heading"
          className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
        >
          Контактная информация
        </h3>
        <div 
          className="text-sm text-muted-foreground bg-primary/5 px-3 py-1 rounded-full"
          role="status"
          aria-live="polite"
          aria-label={`Прогресс заполнения формы: ${formProgress} процентов`}
        >
          Прогресс: {formProgress}%
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" role="group" aria-label="Поля контактной информации">
        <fieldset className="space-y-3 border-0 p-0">
          <Label 
            htmlFor="name" 
            className="text-sm md:text-base font-medium"
            aria-describedby="name-requirements"
          >
            Ваше имя <span className="text-red-500" aria-label="обязательное поле">*</span>
          </Label>
          <Input
            ref={nameInputRef}
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Введите ваше имя"
            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm md:text-base py-3 md:py-4 border-2 hover:border-primary/30"
            required
            aria-describedby="name-help name-requirements"
            aria-invalid={!form.name.trim() ? "true" : "false"}
            autoComplete="given-name"
            itemProp="name"
          />
          <div id="name-help" className="sr-only">
            Введите ваше имя для связи по заказу
          </div>
          <div id="name-requirements" className="text-xs text-gray-600">
            Используется для персонализации общения и выставления документов
          </div>
        </fieldset>
        
        <fieldset className="space-y-3 border-0 p-0">
          <Label 
            htmlFor="email" 
            className="text-sm md:text-base font-medium"
            aria-describedby="email-requirements"
          >
            Email <span className="text-red-500" aria-label="обязательное поле">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm md:text-base py-3 md:py-4 border-2 hover:border-primary/30"
            required
            aria-describedby="email-help email-requirements"
            aria-invalid={!form.email.includes('@') ? "true" : "false"}
            autoComplete="email"
            itemProp="email"
          />
          <div id="email-help" className="sr-only">
            Введите ваш email адрес для получения готового заказа
          </div>
          <div id="email-requirements" className="text-xs text-gray-600">
            На этот адрес будет отправлен готовый материал и все уведомления
          </div>
          <OrderEmailHint />
        </fieldset>
      </div>
      
      {/* Structured data for contact information */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": "Russian",
            "areaServed": "RU"
          })
        }}
      />
    </section>
  );
}
