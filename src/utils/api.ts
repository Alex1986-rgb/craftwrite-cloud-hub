
import { ApiResponse, PaginatedResponse } from '@/types/global';

const API_BASE_URL = '/api';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Network error occurred');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 'error'
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async getPaginated<T>(
    endpoint: string,
    page = 1,
    limit = 10,
    params: Record<string, string> = {}
  ): Promise<PaginatedResponse<T>> {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...params,
    });

    return this.request<T[]>(`${endpoint}?${searchParams}`);
  }
}

export const apiClient = new ApiClient();

// Утилиты для работы с API
export const handleApiError = (response: ApiResponse<any>) => {
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data;
};

export const isApiSuccess = (response: ApiResponse<any>): boolean => {
  return response.status === 'success' && !response.error;
};
