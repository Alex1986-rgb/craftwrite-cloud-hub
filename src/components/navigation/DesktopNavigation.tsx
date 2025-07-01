
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RoleBasedNavigation from "./RoleBasedNavigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Calculator, FileText, Eye, Brain } from "lucide-react";

const navLinks = [
  { label: "Главная", to: "/" },
  { label: "Услуги", to: "/services" },
  { label: "Цены", to: "/prices" },
  { label: "Портфолио", to: "/portfolio" },
  { label: "Блог", to: "/blog" },
  { label: "О нас", to: "/about" },
  { label: "Контакты", to: "/contact" },
];

const toolsLinks = [
  { label: "Калькулятор стоимости", to: "/interactive", icon: Calculator },
  { label: "Конструктор ТЗ", to: "/interactive?tab=brief", icon: FileText },
  { label: "Примеры работ", to: "/interactive?tab=examples", icon: Eye },
  { label: "AI-рекомендации", to: "/interactive?tab=recommendations", icon: Brain },
];

interface DesktopNavigationProps {
  isAuthenticated: boolean;
}

export default function DesktopNavigation({ isAuthenticated }: DesktopNavigationProps) {
  const location = useLocation();

  return (
    <div className="hidden lg:flex items-center gap-2">
      {navLinks.map((link) => (
        <Button
          asChild
          variant={location.pathname === link.to ? "secondary" : "ghost"}
          size="sm"
          key={link.to}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-300",
            location.pathname === link.to 
              ? "bg-blue-100 text-blue-700 font-bold shadow-sm" 
              : "text-slate-600"
          )}
        >
          <Link to={link.to}>{link.label}</Link>
        </Button>
      ))}
      
      {/* Interactive Tools Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={location.pathname === "/interactive" ? "secondary" : "ghost"}
            size="sm"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 flex items-center gap-1",
              location.pathname === "/interactive"
                ? "bg-blue-100 text-blue-700 font-bold shadow-sm" 
                : "text-slate-600"
            )}
          >
            Инструменты
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-white border shadow-lg">
          {toolsLinks.map((tool) => (
            <DropdownMenuItem key={tool.to} asChild>
              <Link 
                to={tool.to} 
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer"
              >
                <tool.icon className="w-4 h-4 text-blue-600" />
                <span>{tool.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Role-based navigation for authenticated users */}
      {isAuthenticated && (
        <div className="hidden lg:flex items-center gap-2 ml-4">
          <RoleBasedNavigation variant="horizontal" />
        </div>
      )}
    </div>
  );
}
