
import { useState } from "react";
import { ChevronDown, User, Shield, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUnifiedAuth, UserRole } from "@/contexts/UnifiedAuthContext";
import { cn } from "@/lib/utils";

const roleConfig = {
  guest: {
    icon: User,
    label: "Гость",
    description: "Просмотр сайта",
    color: "text-neutral-600"
  },
  client: {
    icon: UserCheck,
    label: "Клиент",
    description: "Личный кабинет",
    color: "text-blue-600"
  },
  admin: {
    icon: Shield,
    label: "Администратор", 
    description: "Полный доступ",
    color: "text-purple-600"
  }
};

interface RoleSwitcherProps {
  className?: string;
  compact?: boolean;
}

export default function RoleSwitcher({ className, compact = false }: RoleSwitcherProps) {
  const { currentRole, switchRole, canAccessRole, user } = useUnifiedAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const currentConfig = roleConfig[currentRole];
  const CurrentIcon = currentConfig.icon;

  const availableRoles: UserRole[] = ['guest', 'client', 'admin'].filter(role => 
    canAccessRole(role as UserRole)
  ) as UserRole[];

  if (availableRoles.length <= 1) return null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center gap-2 h-auto",
            compact ? "px-2 py-1" : "px-3 py-2",
            className
          )}
        >
          <div className={cn(
            "flex items-center gap-2",
            compact && "gap-1"
          )}>
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center",
              currentRole === 'admin' ? "bg-purple-100" : 
              currentRole === 'client' ? "bg-blue-100" : "bg-neutral-100"
            )}>
              <CurrentIcon className={cn("w-3 h-3", currentConfig.color)} />
            </div>
            {!compact && (
              <div className="text-left">
                <div className="text-sm font-medium">{currentConfig.label}</div>
                <div className="text-xs text-neutral-500">{currentConfig.description}</div>
              </div>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5 text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Переключить режим
        </div>
        <DropdownMenuSeparator />
        
        {availableRoles.map((role) => {
          const config = roleConfig[role];
          const Icon = config.icon;
          const isCurrentRole = role === currentRole;
          
          return (
            <DropdownMenuItem
              key={role}
              onClick={() => switchRole(role)}
              className={cn(
                "flex items-center gap-3 cursor-pointer",
                isCurrentRole && "bg-blue-50 dark:bg-blue-900/20"
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center",
                role === 'admin' ? "bg-purple-100" : 
                role === 'client' ? "bg-blue-100" : "bg-neutral-100"
              )}>
                <Icon className={cn("w-3 h-3", config.color)} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{config.label}</div>
                <div className="text-xs text-neutral-500">{config.description}</div>
              </div>
              {isCurrentRole && (
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
