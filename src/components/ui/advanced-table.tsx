
import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filter?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
}

interface AdvancedTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  className?: string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  loading?: boolean;
}

export function AdvancedTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  filterable = false,
  sortable = true,
  pagination = true,
  pageSize = 10,
  className,
  onRowClick,
  emptyMessage = 'Нет данных для отображения',
  loading = false
}: AdvancedTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Search and filter logic
  const filteredData = useMemo(() => {
    return sortedData.filter(row => {
      // Search filter
      if (searchable && searchTerm) {
        const searchMatch = Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (!searchMatch) return false;
      }

      // Column filters
      if (filterable) {
        for (const [key, filterValue] of Object.entries(filters)) {
          if (filterValue && !String(row[key]).toLowerCase().includes(filterValue.toLowerCase())) {
            return false;
          }
        }
      }

      return true;
    });
  }, [sortedData, searchTerm, filters, searchable, filterable]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;

    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSort = (key: keyof T) => {
    if (!sortable) return;

    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const getSortIcon = (key: keyof T) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search and Filters */}
      {(searchable || filterable) && (
        <div className="flex flex-col sm:flex-row gap-4">
          {searchable && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Поиск..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
          
          {filterable && (
            <div className="flex gap-2">
              {columns.filter(col => col.filter).map(column => (
                <div key={String(column.key)} className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder={`Фильтр по ${column.label}`}
                    value={filters[String(column.key)] || ''}
                    onChange={(e) => handleFilterChange(String(column.key), e.target.value)}
                    className="pl-10 w-40"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={cn(
                    'font-semibold',
                    column.sortable !== false && sortable && 'cursor-pointer hover:bg-gray-50 select-none',
                    column.className
                  )}
                  onClick={() => column.sortable !== false && sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable !== false && sortable && getSortIcon(column.key)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    onRowClick && 'cursor-pointer hover:bg-gray-50',
                    'transition-colors duration-150'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} className={column.className}>
                      {column.render 
                        ? column.render(row[column.key], row)
                        : row[column.key]
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Показано {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, filteredData.length)} из {filteredData.length} записей
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Предыдущая
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + Math.max(1, currentPage - 2);
                if (page > totalPages) return null;
                
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Следующая
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
