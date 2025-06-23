
import { useState, useEffect } from 'react';
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
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useEnhancedOrders } from '@/hooks/useEnhancedOrders';
import { useModernizedChat } from '@/hooks/useModernizedChat';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';

export default function ModernizedChatManagement() {
  const { orders } = useEnhancedOrders();
  const { user } = useUnifiedAuth();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Получаем заказы с активными чатами
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

  useEffect(() => {
    if (ordersWithChats.length > 0 && !selectedOrderId) {
      setSelectedOrderId(ordersWithChats[0].id);
    }
  }, [ordersWithChats, selectedOrderId]);

  const selectedOrder = ordersWithChats.find(order => order.id === selectedOrderId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Управление чатами ({ordersWithChats.length})
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Список чатов */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Активные чаты</CardTitle>
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
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {order.contact_name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {order.service_name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant={order.status === 'new' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {order.status === 'new' ? 'Новый' : 'В работе'}
                          </Badge>
                          {order.last_activity_at && (
                            <span className="text-xs text-muted-foreground">
                              {new Date(order.last_activity_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      {order.status === 'new' && (
                        <AlertCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      )}
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
                    <CardTitle className="text-lg">{selectedOrder.contact_name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrder.service_name} • {selectedOrder.contact_email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{selectedOrder.status === 'new' ? 'Новый' : 'В работе'}</Badge>
                    {selectedOrder.estimated_price && (
                      <Badge variant="outline">
                        {selectedOrder.estimated_price / 100}₽
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Сообщения */}
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4">
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
                                  {message.sender?.full_name?.[0] || 'U'}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className="flex-1">
                              {message.sender_id !== user?.id && (
                                <p className="text-xs font-medium mb-1">
                                  {message.sender?.full_name || message.sender?.email}
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
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Выберите чат</h3>
                <p className="text-muted-foreground">
                  Выберите заказ из списка слева для начала общения
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
