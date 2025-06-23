
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  return (
    <Button variant="ghost" size="sm">
      <Globe className="h-4 w-4 mr-2" />
      RU
    </Button>
  );
}
