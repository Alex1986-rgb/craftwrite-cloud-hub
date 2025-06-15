
import jsPDF from 'jspdf';

interface ReportData {
  title: string;
  period: string;
  stats: Array<{
    label: string;
    value: string;
    trend?: string;
  }>;
  charts?: Array<{
    title: string;
    data: any[];
  }>;
  summary?: string;
}

export class ReportExporter {
  static exportToPDF(data: ReportData): void {
    const doc = new jsPDF();
    let yPosition = 20;

    // Header
    doc.setFontSize(20);
    doc.text(data.title, 20, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    doc.text(`Период: ${data.period}`, 20, yPosition);
    yPosition += 20;

    // Stats
    doc.setFontSize(16);
    doc.text('Основные показатели:', 20, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    data.stats.forEach(stat => {
      doc.text(`${stat.label}: ${stat.value}`, 20, yPosition);
      if (stat.trend) {
        doc.text(`(${stat.trend})`, 120, yPosition);
      }
      yPosition += 10;
    });

    yPosition += 20;

    // Summary
    if (data.summary) {
      doc.setFontSize(16);
      doc.text('Резюме:', 20, yPosition);
      yPosition += 15;

      doc.setFontSize(12);
      const splitSummary = doc.splitTextToSize(data.summary, 170);
      doc.text(splitSummary, 20, yPosition);
    }

    // Download
    doc.save(`${data.title.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
  }

  static exportToExcel(data: ReportData): void {
    // Создаем CSV данные для упрощения
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Header
    csvContent += `${data.title}\n`;
    csvContent += `Период,${data.period}\n\n`;
    
    // Stats
    csvContent += "Показатель,Значение,Тренд\n";
    data.stats.forEach(stat => {
      csvContent += `${stat.label},${stat.value},${stat.trend || ''}\n`;
    });

    // Create and download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${data.title.replace(/\s+/g, '_')}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static generateClientReport(): ReportData {
    return {
      title: 'Отчет по проектам клиента',
      period: `${new Date().toLocaleDateString('ru-RU')}`,
      stats: [
        { label: 'Завершенные проекты', value: '12', trend: '+20%' },
        { label: 'Средний срок выполнения', value: '5.2 дня', trend: '-8%' },
        { label: 'Общие затраты', value: '₽245,000', trend: '+15%' },
        { label: 'Общий ROI', value: '285%', trend: '+23%' },
        { label: 'Качество контента', value: '9.2/10', trend: '+5%' }
      ],
      summary: 'За отчетный период наблюдается положительная динамика по всем ключевым показателям. Особенно выделяется рост ROI на 23% и улучшение качества контента. Рекомендуется продолжить инвестиции в SEO-статьи как наиболее эффективный канал.'
    };
  }
}
