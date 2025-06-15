
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MobileNavigation } from './MobileNavigation';
import { useClientAuth } from '@/contexts/ClientAuthContext';
import { Bell } from 'lucide-react';

export function MobileHeader() {
  const { client } = useClientAuth();

  return (
    <header className="md:hidden glass-card border-0 border-b border-white/20 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MobileNavigation />
          <div>
            <h1 className="text-lg font-bold text-gradient">Кабинет</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="relative glass-card border-0 p-2">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <Avatar className="w-8 h-8">
            <AvatarImage src={client?.avatar} />
            <AvatarFallback className="gradient-primary text-white text-xs">
              {client?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
