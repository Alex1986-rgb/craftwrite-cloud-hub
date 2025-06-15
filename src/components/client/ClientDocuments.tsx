
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Download, 
  Search,
  Filter,
  Eye,
  Calendar,
  File
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'invoice' | 'act' | 'receipt' | 'other';
  orderId: string;
  date: string;
  size: string;
  status: 'signed' | 'pending' | 'draft';
}

export default function ClientDocuments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const documents: Document[] = [
    {
      id: 'DOC-001',
      name: 'Договор на создание SEO-статьи',
      type: 'contract',
      orderId: 'ORD-001',
      date: '2024-12-10',
      size: '245 KB',
      status: 'signed'
    },
    {
      id: 'DOC-002',
      name: 'Счет на оплату №1247',
      type: 'invoice',
      orderId: 'ORD-002',
      date: '2024-12-05',
      size: '156 KB',
      status: 'signed'
    },
    {
      id: 'DOC-003',
      name: 'Акт выполненных работ',
      type: 'act',
      orderId: 'ORD-003',
      date: '2024-12-15',
      size: '189 KB',
      status: 'pending'
    },
    {
      id: 'DOC-004',
      name: 'Квитанция об оплате',
      type: 'receipt',
      orderId: 'ORD-002',
      date: '2024-12-06',
      size: '98 KB',
      status: 'signed'
    }
  ];

  const getDocumentTypeLabel = (type: Document['type']) => {
    const types = {
      contract: 'Договор',
      invoice: 'Счет',
      act: 'Акт',
      receipt: 'Квитанция',
      other: 'Прочее'
    };
    return types[type];
  };

  const getDocumentIcon = (type: Document['type']) => {
    return <FileText className="w-5 h-5 text-blue-600" />;
  };

  const getStatusBadge = (status: Document['status']) => {
    const statusConfig = {
      signed: { label: 'Подписан', className: 'bg-green-100 text-green-800' },
      pending: { label: 'Ожидает', className: 'bg-yellow-100 text-yellow-800' },
      draft: { label: 'Черновик', className: 'bg-gray-100 text-gray-800' }
    };
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Документы</h1>
        <p className="text-slate-600">Управляйте договорами, счетами и актами</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Поиск по названию или номеру заказа..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Тип документа" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="contract">Договоры</SelectItem>
                  <SelectItem value="invoice">Счета</SelectItem>
                  <SelectItem value="act">Акты</SelectItem>
                  <SelectItem value="receipt">Квитанции</SelectItem>
                  <SelectItem value="other">Прочее</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                {getDocumentIcon(document.type)}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1 truncate">{document.name}</h3>
                  <p className="text-xs text-slate-600">Заказ: {document.orderId}</p>
                </div>
                {getStatusBadge(document.status)}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Тип:</span>
                  <span>{getDocumentTypeLabel(document.type)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Дата:</span>
                  <span>{new Date(document.date).toLocaleDateString('ru-RU')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Размер:</span>
                  <span>{document.size}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Просмотр
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Скачать
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <File className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Документы не найдены</h3>
            <p className="text-slate-600">Попробуйте изменить параметры поиска</p>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
          <CardDescription>Полезные операции с документами</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4">
              <div className="text-center">
                <Download className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Скачать все</div>
                <div className="text-xs text-slate-600">Архив всех документов</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4">
              <div className="text-center">
                <FileText className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Шаблон договора</div>
                <div className="text-xs text-slate-600">Скачать бланк</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4">
              <div className="text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Уведомления</div>
                <div className="text-xs text-slate-600">Настроить напоминания</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
