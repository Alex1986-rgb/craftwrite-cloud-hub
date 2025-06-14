
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, Edit, Mail, Phone, Calendar } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  lastOrderDate: string;
  registrationDate: string;
}

export default function ClientManagement() {
  const [clients] = useState<Client[]>([
    {
      id: "CL-001",
      name: "Иван Петров",
      email: "ivan@company.ru",
      phone: "+7 (999) 123-45-67",
      company: "ООО 'Технологии'",
      totalOrders: 5,
      totalSpent: 85000,
      status: "active",
      lastOrderDate: "2024-12-10",
      registrationDate: "2024-10-15"
    },
    {
      id: "CL-002",
      name: "Мария Сидорова",
      email: "maria@startup.com",
      phone: "+7 (888) 987-65-43",
      company: "Старт-ап XYZ",
      totalOrders: 3,
      totalSpent: 45000,
      status: "active",
      lastOrderDate: "2024-12-14",
      registrationDate: "2024-11-01"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: Client['status']) => {
    return status === 'active' 
      ? <Badge className="bg-green-100 text-green-800">Активный</Badge>
      : <Badge className="bg-gray-100 text-gray-800">Неактивный</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Управление клиентами</h1>
          <p className="text-slate-600">База данных клиентов и их заказов</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Добавить клиента
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Поиск по имени, email, компании..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Клиенты ({clients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Клиент</TableHead>
                <TableHead>Контакты</TableHead>
                <TableHead>Компания</TableHead>
                <TableHead>Заказы</TableHead>
                <TableHead>Потрачено</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-slate-500">ID: {client.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-slate-400" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-slate-400" />
                        {client.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{client.company || "-"}</TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">{client.totalOrders}</div>
                      <div className="text-xs text-slate-500">заказов</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">₽{client.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(client.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
