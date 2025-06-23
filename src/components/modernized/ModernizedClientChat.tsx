
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  User, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useEnhancedOrders } from '@/hooks/useEnhancedOrders';
import { useModernizedChat } from '@/hooks/useModernizedChat';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';

export default function ModernizedClientChat() {
  const { orders } = useEnhancedOrders();
  const { user } = useUnifiedAuth();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Фильтруем заказы с активными чатами
  const ordersWithChats = orders.filter(order => 
    order.status === 'in_progress' || order.status === 'new'
  );

  const { chatRoom, messages, loading, sending, sendMessage } = useModernizedChat(selectedOrderId || undefined);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || sending) return;
    
    await sendMessage(newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedOrder = ordersWithChats.find(order => order.id === selectedOrderId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Сообщения по заказам
          </CardTitle>
        </CardHeader>
      </Card>

      {ordersWithChats.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Нет активных чатов</h3>
            <p className="text-muted-foreground">
              Чаты появятся когда у вас будут активные заказы
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
          {/* Список чатов */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-sm">Ваши заказы</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="space-y-1 p-4">
                  {ordersWithChats.map(order => (
                    <div
                      key={order.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedOrderId === order.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedOrderId(order.id)}
                    >
                      <div>
                        <p className="font-medium text-sm truncate">
                          {order.service_name}
                        </p>
                        <p className="text-xs opacity-70 truncate">
                          #{order.id.slice(-8)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant={order.status === 'new' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {order.status === 'new' ? 'Новый' : 'В работе'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Область чата */}
          <Card className="lg:col-span-3">
            {selectedOrder ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{selectedOrder.service_name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Заказ #{selectedOrder.id.slice(-8)} • {selectedOrder.contact_email}
                      </p>
                    </div>
                    <Badge>{selectedOrder.status === 'new' ? 'Новый' : 'В работе'}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  {/* Сообщения */}
                  <ScrollArea className="h-[400px] p-4">
                    <div className="space-y-4">
                      {messages.length === 0 && !loading && (
                        <div className="text-center py-8 text-muted-foreground">
                          <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                          <p>Пока нет сообщений. Начните общение!</p>
                        </div>
                      )}

                      {messages.map(message => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.sender_id === user?.id
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {message.sender_id !== user?.id && (
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    <User className="h-3 w-3" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div className="flex-1">
                                {message.sender_id !== user?.id && (
                                  <p className="text-xs font-medium mb-1">
                                    Менеджер
                                  </p>
                                )}
                                <p className="text-sm">{message.message}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <span className="text-xs opacity-70">
                                    {new Date(message.created_at).toLocaleString()}
                                  </span>
                                  {message.is_read && message.sender_id === user?.id && (
                                    <CheckCircle2 className="h-3 w-3 opacity-70" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {loading && (
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* Форма отправки сообщения */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Напишите сообщение..."
                        disabled={sending}
                      />
                      <Button 
                        onClick={handleSendMessage} 
                        disabled={!newMessage.trim() || sending}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Ответим в течение рабочего дня
                    </p>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Выберите заказ</h3>
                  <p className="text-muted-foreground">
                    Выберите заказ из списка слева для начала общения
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
