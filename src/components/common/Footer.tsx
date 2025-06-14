
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Главная", to: "/" },
  { label: "Заказ", to: "/order" },
  { label: "О нас", to: "/about" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/30 py-6 mt-10">
      <div className="container max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 px-3 sm:px-6">
        <div className="flex items-center gap-1 text-primary font-semibold text-lg">
          CopyProCloud<span className="mx-1 text-muted-foreground/60">© {new Date().getFullYear()}</span>
        </div>
        <nav className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <Link
              to={link.to}
              key={link.to}
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-xs text-muted-foreground/80 text-center md:text-right">
          Все права защищены.
        </div>
      </div>
    </footer>
  );
}
