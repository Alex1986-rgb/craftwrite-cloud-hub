
import jsPDF from 'jspdf';

interface EmailData {
  to: string;
  subject: string;
  text: string;
  includeAttachment: boolean;
  format: string;
}

interface CMSData {
  platform: string;
  endpoint: string;
  apiKey: string;
  title: string;
  content: string;
  status: string;
}

interface SocialData {
  platform: string;
  content: string;
  caption: string;
  schedulePost: boolean;
  scheduleTime?: string;
}

class ExportService {
  async exportFile(text: string, title: string, format: string): Promise<void> {
    const fileName = `${title.replace(/[^a-zA-Zа-яА-Я0-9]/g, '_')}.${format}`;
    
    switch (format) {
      case 'txt':
        this.downloadTextFile(text, fileName);
        break;
      case 'pdf':
        await this.exportToPDF(text, title, fileName);
        break;
      case 'docx':
        await this.exportToDocx(text, title, fileName);
        break;
      case 'md':
        this.downloadTextFile(this.convertToMarkdown(text, title), fileName);
        break;
      case 'html':
        this.downloadTextFile(this.convertToHTML(text, title), fileName);
        break;
      default:
        throw new Error(`Неподдерживаемый формат: ${format}`);
    }
  }

  private downloadTextFile(content: string, fileName: string): void {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private async exportToPDF(text: string, title: string, fileName: string): Promise<void> {
    const pdf = new jsPDF();
    
    // Заголовок
    pdf.setFontSize(16);
    pdf.text(title, 20, 20);
    
    // Основной текст
    pdf.setFontSize(12);
    const splitText = pdf.splitTextToSize(text, 170);
    pdf.text(splitText, 20, 40);
    
    pdf.save(fileName);
  }

  private async exportToDocx(text: string, title: string, fileName: string): Promise<void> {
    // Простая HTML структура для конвертации в DOCX
    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
        </head>
        <body>
          <h1>${title}</h1>
          <div>${text.replace(/\n/g, '<br>')}</div>
        </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private convertToMarkdown(text: string, title: string): string {
    return `# ${title}\n\n${text}`;
  }

  private convertToHTML(text: string, title: string): string {
    return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
    </style>
</head>
<body>
    <h1>${title}</h1>
    <div>${text.replace(/\n/g, '<br>')}</div>
</body>
</html>`;
  }

  async sendEmail(data: EmailData): Promise<void> {
    // В реальном приложении здесь был бы вызов к email сервису
    console.log('Отправка email:', data);
    
    // Имитация отправки
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Для демонстрации можно открыть email клиент
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(`${data.text}\n\n---\nОтправлено из AI Генератора текстов`);
    const mailtoLink = `mailto:${data.to}?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink, '_blank');
  }

  async publishToCMS(data: CMSData): Promise<void> {
    console.log('Публикация в CMS:', data);
    
    // Имитация API запроса к CMS
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    switch (data.platform) {
      case 'wordpress':
        await this.publishToWordPress(data);
        break;
      case 'drupal':
        await this.publishToDrupal(data);
        break;
      case 'custom':
        await this.publishToCustomCMS(data);
        break;
      default:
        throw new Error(`Неподдерживаемая CMS: ${data.platform}`);
    }
  }

  private async publishToWordPress(data: CMSData): Promise<void> {
    if (!data.endpoint || !data.apiKey) {
      throw new Error('Необходимо указать endpoint и API ключ для WordPress');
    }

    // В реальном приложении здесь был бы HTTP запрос к WordPress REST API
    const payload = {
      title: data.title,
      content: data.content,
      status: data.status
    };

    console.log('WordPress API запрос:', payload);
  }

  private async publishToDrupal(data: CMSData): Promise<void> {
    if (!data.endpoint || !data.apiKey) {
      throw new Error('Необходимо указать endpoint и API ключ для Drupal');
    }

    const payload = {
      type: 'article',
      title: [{ value: data.title }],
      body: [{ value: data.content, format: 'basic_html' }],
      status: data.status === 'published'
    };

    console.log('Drupal API запрос:', payload);
  }

  private async publishToCustomCMS(data: CMSData): Promise<void> {
    if (!data.endpoint) {
      throw new Error('Необходимо указать endpoint для собственной CMS');
    }

    const payload = {
      title: data.title,
      content: data.content,
      status: data.status,
      published_at: new Date().toISOString()
    };

    console.log('Custom CMS API запрос:', payload);
  }

  async postToSocial(data: SocialData): Promise<void> {
    console.log('Публикация в соцсети:', data);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    switch (data.platform) {
      case 'telegram':
        await this.postToTelegram(data);
        break;
      case 'vk':
        await this.postToVK(data);
        break;
      case 'facebook':
        await this.postToFacebook(data);
        break;
      default:
        throw new Error(`Неподдерживаемая социальная сеть: ${data.platform}`);
    }
  }

  private async postToTelegram(data: SocialData): Promise<void> {
    const message = data.caption ? `${data.caption}\n\n${data.content}` : data.content;
    
    // В реальном приложении здесь был бы вызов Telegram Bot API
    console.log('Telegram пост:', {
      text: message,
      scheduled: data.schedulePost,
      schedule_time: data.scheduleTime
    });
  }

  private async postToVK(data: SocialData): Promise<void> {
    const message = data.caption ? `${data.caption}\n\n${data.content}` : data.content;
    
    // В реальном приложении здесь был бы вызов VK API
    console.log('VK пост:', {
      message: message,
      publish_date: data.schedulePost ? new Date(data.scheduleTime || '').getTime() / 1000 : undefined
    });
  }

  private async postToFacebook(data: SocialData): Promise<void> {
    const message = data.caption ? `${data.caption}\n\n${data.content}` : data.content;
    
    // В реальном приложении здесь был бы вызов Facebook Graph API
    console.log('Facebook пост:', {
      message: message,
      scheduled_publish_time: data.schedulePost ? new Date(data.scheduleTime || '').getTime() / 1000 : undefined
    });
  }
}

export const exportService = new ExportService();
