
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
      <div className="container max-w-5xl mx-auto flex justify-between items-center h-16 px-2 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary min-w-0">
          <span className="text-primary truncate">CopyPro<span className="text-muted-foreground">Cloud</span></span>
        </Link>
        <nav className="flex flex-wrap gap-1 sm:gap-2 md:gap-4 max-w-full overflow-x-auto">
          {navLinks.map((link) => (
            <Button
              asChild
              variant={location.pathname === link.to ? "secondary" : "ghost"}
              size="sm"
              key={link.to}
              className={cn(
                "rounded-full text-xs xs:text-sm min-w-[44px] px-3",
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
