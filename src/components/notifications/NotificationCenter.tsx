
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotificationCenter() {
  return (
    <Button variant="ghost" size="sm" className="relative">
      <Bell className="h-4 w-4" />
      <span className="sr-only">Уведомления</span>
    </Button>
  );
}
