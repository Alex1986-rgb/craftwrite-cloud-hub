
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface UserMenuProps {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
}

export default function UserMenu({ isAuthenticated, user, logout }: UserMenuProps) {
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link to="/login">Войти</Link>
        </Button>
        <Button asChild size="sm">
          <Link to="/register">Регистрация</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <User className="w-4 h-4" />
        <span className="text-sm">{user?.name || user?.email}</span>
      </div>
      <Button variant="ghost" size="sm" onClick={logout}>
        Выйти
      </Button>
    </div>
  );
}
