
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Главная", to: "/" },
  { label: "Каталог услуг", to: "/#services" },
  { label: "Цены", to: "/prices" },
  { label: "Портфолио", to: "/portfolio" },
  { label: "Блог", to: "/blog" },
  { label: "О нас", to: "/about" },
  { label: "Оформить заказ", to: "/order" },
  { label: "Политика", to: "/privacy" },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="w-full z-30 bg-background/90 border-b border-border backdrop-blur sticky top-0">
      <div className="container max-w-5xl mx-auto flex justify-between items-center h-16 px-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <span className="text-primary">CopyPro<span className="text-muted-foreground">Cloud</span></span>
        </Link>
        <nav className="flex gap-2 md:gap-4">
          {navLinks.map((link) => (
            <Button
              asChild
              variant={location.pathname === link.to ? "secondary" : "ghost"}
              size="sm"
              key={link.to}
              className={cn(
                "rounded-full",
                location.pathname === link.to ? "font-bold" : ""
              )}
            >
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
