
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section className="pt-16 pb-12 px-4 md:px-0 flex flex-col items-center bg-gradient-to-b from-card to-background">
    <h1 className="text-4xl md:text-6xl font-bold text-center mb-5 tracking-tight max-w-3xl">
      CopyPro Cloud — SaaS-платформа для полного управления копирайтингом
    </h1>
    <p className="text-lg md:text-2xl text-muted-foreground text-center mb-8 max-w-2xl">
      Широкий выбор текстов, профессиональные копирайтеры и быстрый запуск ваших идей!
    </p>
    <div className="flex flex-col md:flex-row gap-4">
      <Button size="lg" className="shadow hover-scale" asChild>
        <Link to="/order">Создать заказ</Link>
      </Button>
      <Button variant="outline" size="lg">Войти в личный кабинет</Button>
      <Button variant="secondary" size="lg">Оставить заявку</Button>
    </div>
  </section>
);

export default HeroSection;
