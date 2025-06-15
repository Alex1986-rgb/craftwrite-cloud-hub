
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, Sparkles } from "lucide-react";
import RoleSwitcher from "./RoleSwitcher";

interface UserMenuProps {
  isAuthenticated: boolean;
  user: any;
  logout: () => void;
}

export default function UserMenu({ isAuthenticated, user, logout }: UserMenuProps) {
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link to="/client">Вход</Link>
        </Button>
        <Button 
          asChild 
          className="btn-unified-primary"
        >
          <Link to="/order">Заказать</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <RoleSwitcher />
      
      {/* User Menu */}
      <div className="flex items-center gap-2 px-3 py-2 glass-unified rounded-lg">
        <div className="w-8 h-8 gradient-brand-primary rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="text-sm">
          <div className="font-medium">{user?.name}</div>
          <div className="text-xs text-neutral-500">{user?.email}</div>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm"
        onClick={logout}
        className="text-neutral-600 hover:text-red-600"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
}
