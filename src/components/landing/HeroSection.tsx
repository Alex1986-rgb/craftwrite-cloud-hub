
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section className="relative flex flex-col items-center justify-center pt-20 pb-16 px-4 bg-gradient-to-b from-card via-background to-transparent overflow-hidden">
    {/* Фоновые акценты */}
    <span className="pointer-events-none absolute left-0 top-0 w-56 h-56 bg-brand-accent/20 blur-3xl rounded-full -z-10 md:w-[500px] md:h-[320px]" />
    <span className="pointer-events-none absolute bottom-0 right-0 w-56 h-40 bg-primary/20 blur-2xl rounded-full -z-10 md:w-[380px] md:h-[280px]" />

    <h1 className="text-center text-4xl md:text-6xl font-playfair font-extrabold leading-tight mb-6 tracking-tight text-foreground drop-shadow-md max-w-3xl">
      CopyPro Cloud — SaaS-платформа <br className="hidden md:inline" /> для полного управления копирайтингом
    </h1>
    <p className="text-xl md:text-2xl text-muted-foreground text-center mb-8 max-w-2xl font-inter">
      Широкий выбор текстов, профессиональные копирайтеры и быстрый запуск ваших идей!
    </p>
    <div className="flex flex-col sm:flex-row gap-4 mt-3">
      <Button size="lg" className="px-8 py-4 rounded-full text-lg font-bold shadow-xl hover-scale"
        asChild>
        <Link to="/order">Создать заказ</Link>
      </Button>
      <Button variant="outline" size="lg"
        className="px-8 py-4 rounded-full text-lg font-bold hover-scale">Войти в личный кабинет</Button>
      <Button variant="secondary" size="lg"
        className="px-8 py-4 rounded-full text-lg font-bold hover-scale">Оставить заявку</Button>
    </div>
  </section>
);

export default HeroSection;
