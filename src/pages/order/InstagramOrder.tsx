
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InstagramOrder() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Заказ постов для Instagram</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Форма заказа постов для Instagram будет реализована позже.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
