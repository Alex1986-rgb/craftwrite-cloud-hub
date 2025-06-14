
import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/sonner';

interface ErrorState {
  error: Error | null;
  isError: boolean;
}

export function useErrorHandler() {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isError: false
  });

  const handleError = useCallback((error: Error | string, showToast = true) => {
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    
    console.error('Error handled:', errorObj);
    
    setErrorState({
      error: errorObj,
      isError: true
    });

    if (showToast) {
      toast.error(errorObj.message || 'Произошла неожиданная ошибка');
    }
  }, []);

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isError: false
    });
  }, []);

  const handleAsync = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    errorMessage?: string
  ): Promise<T | null> => {
    try {
      clearError();
      return await asyncFn();
    } catch (error) {
      const message = errorMessage || (error instanceof Error ? error.message : 'Неизвестная ошибка');
      handleError(message);
      return null;
    }
  }, [handleError, clearError]);

  return {
    error: errorState.error,
    isError: errorState.isError,
    handleError,
    clearError,
    handleAsync
  };
}
