import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Paperclip
} from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastMessage: string;
  agent?: string;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: 'client' | 'agent';
  timestamp: string;
  senderName: string;
}

export default function ClientSupport() {
  const [activeTicket, setActiveTicket] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newTicketData, setNewTicketData] = useState({
    subject: '',
    description: '',
    priority: 'medium' as const
  });

  const tickets: Ticket[] = [
    {
      id: 'TICK-001',
      subject: 'Вопрос по заказу ORD-001',
      status: 'open',
      priority: 'medium',
      createdAt: '2024-12-14',
      lastMessage: 'Когда будет готов мой заказ?',
      agent: 'Анна Петрова'
    },
    {
      id: 'TICK-002',
      subject: 'Проблема с оплатой',
      status: 'in_progress',
      priority: 'high',
      createdAt: '2024-12-13',
      lastMessage: 'Деньги списались, но заказ не создался',
      agent: 'Сергей Иванов'
    }
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      content: 'Добро пожаловать в службу поддержки! Как могу помочь?',
      sender: 'agent',
      timestamp: '2024-12-14T10:00:00',
      senderName: 'Анна Петрова'
    },
    {
      id: '2',
      content: 'Здравствуйте! У меня вопрос по заказу ORD-001',
      sender: 'client',
      timestamp: '2024-12-14T10:01:00',
      senderName: 'Вы'
    }
  ];

  const getStatusBadge = (status: Ticket['status']) => {
    const statusConfig = {
      open: { label: 'Открыт', className: 'bg-blue-100 text-blue-800' },
      in_progress: { label: 'В работе', className: 'bg-yellow-100 text-yellow-800' },
      closed: { label: 'Закрыт', className: 'bg-green-100 text-green-800' }
    };
    return <Badge className={statusConfig[status].className}>{statusConfig[status].label}</Badge>;
  };

  const getPriorityBadge = (priority: Ticket['priority']) => {
    const priorityConfig = {
      low: { label: 'Низкий', className: 'bg-gray-100 text-gray-800' },
      medium: { label: 'Средний', className: 'bg-orange-100 text-orange-800' },
      high: { label: 'Высокий', className: 'bg-red-100 text-red-800' }
    };
    return <Badge className={priorityConfig[priority].className}>{priorityConfig[priority].label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Поддержка</h1>
        <p className="text-slate-600">Получите помощь от наших специалистов</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Связаться с нами</CardTitle>
            <CardDescription>Выберите удобный способ связи</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium">Онлайн-чат</div>
                <div className="text-sm text-slate-600">Доступен 24/7</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <Phone className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium">+7 (999) 123-45-67</div>
                <div className="text-sm text-slate-600">Пн-Пт 9:00-18:00</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <Mail className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-medium">support@textcraft.ru</div>
                <div className="text-sm text-slate-600">Ответим в течение 2 часов</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Help */}
        <Card>
          <CardHeader>
            <CardTitle>Быстрая помощь</CardTitle>
            <CardDescription>Популярные вопросы</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-auto p-3">
              <div className="text-left">
                <div className="font-medium">Как отследить заказ?</div>
                <div className="text-xs text-slate-600">Статус и прогресс выполнения</div>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-auto p-3">
              <div className="text-left">
                <div className="font-medium">Изменить заказ</div>
                <div className="text-xs text-slate-600">Редактирование требований</div>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-auto p-3">
              <div className="text-left">
                <div className="font-medium">Вопросы по оплате</div>
                <div className="text-xs text-slate-600">Способы оплаты и возврат</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Create Ticket */}
        <Card>
          <CardHeader>
            <CardTitle>Создать тикет</CardTitle>
            <CardDescription>Опишите вашу проблему</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Тема</Label>
              <Input
                id="subject"
                placeholder="Кратко опишите проблему"
                value={newTicketData.subject}
                onChange={(e) => setNewTicketData(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                placeholder="Подробно опишите проблему..."
                value={newTicketData.description}
                onChange={(e) => setNewTicketData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <Button className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Отправить тикет
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Existing Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Мои обращения</CardTitle>
          <CardDescription>История ваших тикетов</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="border rounded-lg p-4 hover:bg-slate-50 cursor-pointer"
                onClick={() => setActiveTicket(ticket.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{ticket.subject}</h3>
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(ticket.priority)}
                    {getStatusBadge(ticket.status)}
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-2">{ticket.lastMessage}</p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>ID: {ticket.id}</span>
                  <div className="flex items-center gap-4">
                    {ticket.agent && <span>Агент: {ticket.agent}</span>}
                    <span>{new Date(ticket.createdAt).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      {activeTicket && (
        <Card>
          <CardHeader>
            <CardTitle>Чат по тикету {activeTicket}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'client' ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      {message.sender === 'client' ? 'Вы' : 'АП'}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-xs lg:max-w-md ${message.sender === 'client' ? 'text-right' : ''}`}>
                    <div className="font-medium text-sm">{message.senderName}</div>
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'client' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-100 text-slate-900'
                    }`}>
                      {message.content}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString('ru-RU')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Напишите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
