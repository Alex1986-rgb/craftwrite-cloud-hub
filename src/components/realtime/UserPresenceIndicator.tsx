
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Circle } from 'lucide-react';
import { useUserPresence } from '@/hooks/useUserPresence';
import { format } from 'date-fns';

export default function UserPresenceIndicator() {
  const { onlineUsers, myStatus } = useUserPresence();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'В сети';
      case 'away':
        return 'Отошёл';
      default:
        return 'Не в сети';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <span>Онлайн пользователи</span>
          <Badge variant="secondary">{onlineUsers.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Мой статус */}
          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
            <Circle className={`w-3 h-3 ${getStatusColor(myStatus)}`} />
            <span className="text-sm font-medium">Вы: {getStatusText(myStatus)}</span>
          </div>

          {/* Список онлайн пользователей */}
          {onlineUsers.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              Нет других пользователей онлайн
            </p>
          ) : (
            <div className="space-y-2">
              {onlineUsers.map((user) => (
                <div
                  key={user.user_id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Circle className={`w-3 h-3 ${getStatusColor(user.status)}`} />
                    <span className="text-sm">
                      Пользователь {user.user_id.substring(0, 8)}...
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {format(new Date(user.last_seen), 'HH:mm')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
