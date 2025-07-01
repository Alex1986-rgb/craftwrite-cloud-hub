
import React from 'react';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';

interface ToastOptions {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

export const enhancedToast = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    });
  },

  error: (message: string, options?: ToastOptions) => {
    toast.error(message, {
      description: options?.description,
      duration: options?.duration || 6000,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
      icon: <XCircle className="w-5 h-5 text-red-600" />,
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
      icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    });
  },

  info: (message: string, options?: ToastOptions) => {
    toast.info(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
      icon: <Info className="w-5 h-5 text-blue-600" />,
    });
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options?: { duration?: number }
  ) => {
    return toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
      duration: options?.duration,
    });
  },
};
