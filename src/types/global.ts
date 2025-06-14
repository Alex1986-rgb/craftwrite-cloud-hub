
// Глобальные типы для проекта
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client' | 'manager';
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  service_type: string;
  title: string;
  description: string;
  requirements: string;
  deadline: string;
  budget: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  ai_generated_text?: string;
  final_text?: string;
}

export interface Payment {
  id: string;
  order_id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: 'card' | 'bank_transfer' | 'yandex_money';
  stripe_session_id?: string;
  created_at: string;
  updated_at: string;
}

export interface AITextGeneration {
  id: string;
  order_id: string;
  prompt: string;
  generated_text: string;
  uniqueness_score: number;
  seo_score: number;
  model_used: string;
  created_at: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
