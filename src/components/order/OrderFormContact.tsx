
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
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Контактная информация
        </h3>
        <div className="text-sm text-muted-foreground bg-primary/5 px-3 py-1 rounded-full">
          Прогресс: {formProgress}%
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-sm md:text-base font-medium">
            Ваше имя *
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
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="email" className="text-sm md:text-base font-medium">
            Email *
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
          />
          <OrderEmailHint />
        </div>
      </div>
    </div>
  );
}
