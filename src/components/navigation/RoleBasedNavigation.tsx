
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface RoleBasedNavigationProps {
  variant?: 'horizontal' | 'vertical';
}

export default function RoleBasedNavigation({ variant = 'horizontal' }: RoleBasedNavigationProps) {
  const roleLinks = [
    { label: "Панель клиента", to: "/client", role: "client" },
    { label: "Админ панель", to: "/admin", role: "admin" },
  ];

  return (
    <div className={variant === 'horizontal' ? 'flex items-center gap-2' : 'flex flex-col gap-2'}>
      {roleLinks.map((link) => (
        <Button
          asChild
          variant="ghost"
          size="sm"
          key={link.to}
          className="text-sm"
        >
          <Link to={link.to}>{link.label}</Link>
        </Button>
      ))}
    </div>
  );
}
