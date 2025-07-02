import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Eye, Share2, Printer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EstimateExportActionsProps {
  estimateData: any;
  onPreview?: () => void;
}

export default function EstimateExportActions({ 
  estimateData, 
  onPreview 
}: EstimateExportActionsProps) {
  const handleExportPDF = () => {
    toast({
      title: "Экспорт в PDF",
      description: "Функция будет доступна в ближайшее время"
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Детальная смета проекта',
        text: `Смета на ${estimateData.serviceType}: ${estimateData.totalWordCount} слов`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Ссылка скопирована!",
        description: "Ссылка на смету скопирована в буфер обмена"
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={handleExportPDF}>
        <Download className="w-4 h-4 mr-2" />
        PDF
      </Button>
      
      <Button variant="outline" size="sm" onClick={onPreview}>
        <Eye className="w-4 h-4 mr-2" />
        Предпросмотр
      </Button>
      
      <Button variant="outline" size="sm" onClick={handleShare}>
        <Share2 className="w-4 h-4 mr-2" />
        Поделиться
      </Button>
      
      <Button variant="outline" size="sm" onClick={handlePrint}>
        <Printer className="w-4 h-4 mr-2" />
        Печать
      </Button>
    </div>
  );
}