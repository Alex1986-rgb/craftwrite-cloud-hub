import { toast } from 'sonner';
import { logger } from './logger';

export interface AppError extends Error {
  code?: string;
  context?: Record<string, any>;
}

export class ErrorHandler {
  static handle(error: unknown, context?: Record<string, any>) {
    const appError = this.normalizeError(error);
    
    logger.error(appError.message, {
      ...context,
      stack: appError.stack,
      code: appError.code
    });

    // Show user-friendly message
    this.showUserMessage(appError);
  }

  private static normalizeError(error: unknown): AppError {
    if (error instanceof Error) {
      return error as AppError;
    }
    
    if (typeof error === 'string') {
      return new Error(error) as AppError;
    }
    
    return new Error('Произошла неизвестная ошибка') as AppError;
  }

  private static showUserMessage(error: AppError) {
    const userMessage = this.getUserFriendlyMessage(error);
    toast.error(userMessage);
  }

  private static getUserFriendlyMessage(error: AppError): string {
    if (error.code === 'NETWORK_ERROR') {
      return 'Проблема с подключением к интернету';
    }
    
    if (error.code === 'AUTH_ERROR') {
      return 'Ошибка авторизации';
    }
    
    if (error.code === 'VALIDATION_ERROR') {
      return 'Неверные данные';
    }
    
    return 'Произошла ошибка. Попробуйте еще раз';
  }
}