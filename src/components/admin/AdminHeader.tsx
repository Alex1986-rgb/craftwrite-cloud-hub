
import { useState } from "react";
import { UnifiedButton, UnifiedInput, UnifiedBadge } from "@/components/unified";
import { 
  Search, 
  Bell, 
  User, 
  Menu,
  Settings,
  LogOut,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUnifiedAuth } from "@/contexts/UnifiedAuthContext";
import RoleSwitcher from "@/components/navigation/RoleSwitcher";

interface AdminHeaderProps {
  onSidebarToggle: () => void;
}

export default function AdminHeader({ onSidebarToggle }: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useUnifiedAuth();

  return (
    <header className="glass-unified border-b border-white/20 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <UnifiedButton
            variant="ghost"
            size="sm"
            onClick={onSidebarToggle}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </UnifiedButton>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <UnifiedInput
              type="text"
              placeholder="Поиск заказов, клиентов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <UnifiedButton variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <UnifiedBadge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-error">
                3
              </UnifiedBadge>
            </UnifiedButton>
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-4 px-4 py-2 glass-unified rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-success">24</div>
              <div className="text-xs text-neutral-600">Заказы</div>
            </div>
            <div className="w-px h-8 bg-neutral-300"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-brand-600">₽158,340</div>
              <div className="text-xs text-neutral-600">Доход</div>
            </div>
          </div>

          {/* Role Switcher */}
          <RoleSwitcher compact />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <UnifiedButton variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 gradient-brand-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">{user?.name || "Администратор"}</div>
                  <div className="text-xs text-neutral-500">{user?.role || "Супер-админ"}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-neutral-400" />
              </UnifiedButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Профиль
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Настройки
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-error">
                <LogOut className="mr-2 h-4 w-4" />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
