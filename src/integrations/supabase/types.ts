export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      abandoned_orders: {
        Row: {
          abandoned_at: string | null
          created_at: string | null
          form_data: Json | null
          id: string
          recovered_at: string | null
          recovery_attempts: number | null
          session_id: string
          step_abandoned: string
          user_id: string | null
        }
        Insert: {
          abandoned_at?: string | null
          created_at?: string | null
          form_data?: Json | null
          id?: string
          recovered_at?: string | null
          recovery_attempts?: number | null
          session_id: string
          step_abandoned: string
          user_id?: string | null
        }
        Update: {
          abandoned_at?: string | null
          created_at?: string | null
          form_data?: Json | null
          id?: string
          recovered_at?: string | null
          recovery_attempts?: number | null
          session_id?: string
          step_abandoned?: string
          user_id?: string | null
        }
        Relationships: []
      }
      activity_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      admin_telegram_settings: {
        Row: {
          chat_id: number
          created_at: string | null
          id: string
          is_active: boolean | null
          updated_at: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          chat_id: number
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          chat_id?: number
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      ai_generation_settings: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          setting_key: string
          setting_value?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      autolinks: {
        Row: {
          anchor: string
          category: string | null
          created_at: string
          id: string
          is_active: boolean | null
          max_inserts: number | null
          slot_type: string | null
          url: string
        }
        Insert: {
          anchor: string
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          max_inserts?: number | null
          slot_type?: string | null
          url: string
        }
        Update: {
          anchor?: string
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          max_inserts?: number | null
          slot_type?: string | null
          url?: string
        }
        Relationships: []
      }
      bulk_seo_pages: {
        Row: {
          created_at: string
          error_message: string | null
          html_content: string | null
          id: string
          keywords: Json | null
          meta_description: string | null
          meta_title: string | null
          page_title: string | null
          processed_at: string | null
          project_id: string
          status: string
          url: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          html_content?: string | null
          id?: string
          keywords?: Json | null
          meta_description?: string | null
          meta_title?: string | null
          page_title?: string | null
          processed_at?: string | null
          project_id: string
          status?: string
          url: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          html_content?: string | null
          id?: string
          keywords?: Json | null
          meta_description?: string | null
          meta_title?: string | null
          page_title?: string | null
          processed_at?: string | null
          project_id?: string
          status?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "bulk_seo_pages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "bulk_seo_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      bulk_seo_projects: {
        Row: {
          completed_at: string | null
          created_at: string
          export_url: string | null
          failed_pages: number
          file_url: string | null
          id: string
          order_id: string | null
          price_per_page: number
          processed_pages: number
          project_name: string
          settings: Json
          status: string
          total_pages: number
          total_price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          export_url?: string | null
          failed_pages?: number
          file_url?: string | null
          id?: string
          order_id?: string | null
          price_per_page?: number
          processed_pages?: number
          project_name: string
          settings?: Json
          status?: string
          total_pages?: number
          total_price?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          export_url?: string | null
          failed_pages?: number
          file_url?: string | null
          id?: string
          order_id?: string | null
          price_per_page?: number
          processed_pages?: number
          project_name?: string
          settings?: Json
          status?: string
          total_pages?: number
          total_price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bulk_seo_projects_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          created_at: string | null
          file_url: string | null
          id: string
          is_read: boolean | null
          message: string
          message_type: string | null
          room_id: string | null
          sender_id: string | null
        }
        Insert: {
          created_at?: string | null
          file_url?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          message_type?: string | null
          room_id?: string | null
          sender_id?: string | null
        }
        Update: {
          created_at?: string | null
          file_url?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          message_type?: string | null
          room_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          admin_id: string | null
          client_id: string | null
          created_at: string | null
          id: string
          order_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          admin_id?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_id?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_rooms_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      conversion_funnel_analytics: {
        Row: {
          completed: boolean | null
          conversion_rate: number | null
          created_at: string
          device_type: string | null
          entered_at: string
          exited_at: string | null
          id: string
          session_id: string
          step_name: string
          step_number: number
          time_spent: number | null
          traffic_source: string | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          conversion_rate?: number | null
          created_at?: string
          device_type?: string | null
          entered_at?: string
          exited_at?: string | null
          id?: string
          session_id: string
          step_name: string
          step_number: number
          time_spent?: number | null
          traffic_source?: string | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          conversion_rate?: number | null
          created_at?: string
          device_type?: string | null
          entered_at?: string
          exited_at?: string | null
          id?: string
          session_id?: string
          step_name?: string
          step_number?: number
          time_spent?: number | null
          traffic_source?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      custom_reports: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          last_generated_at: string | null
          report_config: Json
          report_name: string
          report_type: string
          schedule: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_generated_at?: string | null
          report_config: Json
          report_name: string
          report_type: string
          schedule?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_generated_at?: string | null
          report_config?: Json
          report_name?: string
          report_type?: string
          schedule?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      customer_analytics: {
        Row: {
          avg_order_value: number | null
          churn_probability: number | null
          created_at: string
          first_order_date: string | null
          id: string
          last_calculated_at: string | null
          last_order_date: string | null
          lifetime_value: number | null
          satisfaction_score: number | null
          segment: string | null
          total_orders: number | null
          total_spent: number | null
          user_id: string
        }
        Insert: {
          avg_order_value?: number | null
          churn_probability?: number | null
          created_at?: string
          first_order_date?: string | null
          id?: string
          last_calculated_at?: string | null
          last_order_date?: string | null
          lifetime_value?: number | null
          satisfaction_score?: number | null
          segment?: string | null
          total_orders?: number | null
          total_spent?: number | null
          user_id: string
        }
        Update: {
          avg_order_value?: number | null
          churn_probability?: number | null
          created_at?: string
          first_order_date?: string | null
          id?: string
          last_calculated_at?: string | null
          last_order_date?: string | null
          lifetime_value?: number | null
          satisfaction_score?: number | null
          segment?: string | null
          total_orders?: number | null
          total_spent?: number | null
          user_id?: string
        }
        Relationships: []
      }
      financial_analytics: {
        Row: {
          avg_order_value: number
          conversion_rate: number
          created_at: string
          customer_acquisition_cost: number | null
          date: string
          id: string
          lifetime_value: number | null
          margin_percentage: number | null
          orders_count: number
          refund_rate: number | null
          revenue: number
          service_slug: string | null
        }
        Insert: {
          avg_order_value?: number
          conversion_rate?: number
          created_at?: string
          customer_acquisition_cost?: number | null
          date: string
          id?: string
          lifetime_value?: number | null
          margin_percentage?: number | null
          orders_count?: number
          refund_rate?: number | null
          revenue?: number
          service_slug?: string | null
        }
        Update: {
          avg_order_value?: number
          conversion_rate?: number
          created_at?: string
          customer_acquisition_cost?: number | null
          date?: string
          id?: string
          lifetime_value?: number | null
          margin_percentage?: number | null
          orders_count?: number
          refund_rate?: number | null
          revenue?: number
          service_slug?: string | null
        }
        Relationships: []
      }
      generated_content_versions: {
        Row: {
          ai_model: string | null
          content: string
          content_type: string
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          order_id: string | null
          prompt_used: string | null
          quality_score: number | null
          version_number: number
        }
        Insert: {
          ai_model?: string | null
          content: string
          content_type: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          order_id?: string | null
          prompt_used?: string | null
          quality_score?: number | null
          version_number?: number
        }
        Update: {
          ai_model?: string | null
          content?: string
          content_type?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          order_id?: string | null
          prompt_used?: string | null
          quality_score?: number | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "generated_content_versions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      generation_logs: {
        Row: {
          batch_id: string | null
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          product_id: string | null
          progress_percent: number | null
          started_at: string | null
          status: string
          text_type: string
        }
        Insert: {
          batch_id?: string | null
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          product_id?: string | null
          progress_percent?: number | null
          started_at?: string | null
          status?: string
          text_type: string
        }
        Update: {
          batch_id?: string | null
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          product_id?: string | null
          progress_percent?: number | null
          started_at?: string | null
          status?: string
          text_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "generation_logs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_settings: {
        Row: {
          created_at: string | null
          email_notifications: boolean | null
          id: string
          marketing_notifications: boolean | null
          order_status_updates: boolean | null
          payment_notifications: boolean | null
          push_notifications: boolean | null
          telegram_notifications: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          marketing_notifications?: boolean | null
          order_status_updates?: boolean | null
          payment_notifications?: boolean | null
          push_notifications?: boolean | null
          telegram_notifications?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          marketing_notifications?: boolean | null
          order_status_updates?: boolean | null
          payment_notifications?: boolean | null
          push_notifications?: boolean | null
          telegram_notifications?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      notification_templates: {
        Row: {
          content_template: string
          created_at: string | null
          event_type: string
          id: string
          is_active: boolean | null
          subject_template: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          content_template: string
          created_at?: string | null
          event_type: string
          id?: string
          is_active?: boolean | null
          subject_template?: string | null
          type?: string
          updated_at?: string | null
        }
        Update: {
          content_template?: string
          created_at?: string | null
          event_type?: string
          id?: string
          is_active?: boolean | null
          subject_template?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      order_processing_queue: {
        Row: {
          attempts: number | null
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          max_attempts: number | null
          order_id: string | null
          processing_step: string
          scheduled_at: string | null
          started_at: string | null
          status: string
        }
        Insert: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          max_attempts?: number | null
          order_id?: string | null
          processing_step: string
          scheduled_at?: string | null
          started_at?: string | null
          status?: string
        }
        Update: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          max_attempts?: number | null
          order_id?: string | null
          processing_step?: string
          scheduled_at?: string | null
          started_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_processing_queue_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          additional_requirements: string | null
          assigned_admin_id: string | null
          assigned_manager_id: string | null
          client_feedback: string | null
          completed_at: string | null
          contact_email: string
          contact_name: string
          contact_phone: string | null
          created_at: string
          deadline: string | null
          details: string
          estimated_completion_time: unknown | null
          estimated_price: number | null
          files_urls: string[] | null
          final_price: number | null
          generated_prompt: string | null
          id: string
          last_activity_at: string | null
          notes: string | null
          payment_status: string | null
          priority: string | null
          quality_rating: number | null
          revision_count: number | null
          service_name: string
          service_options: Json | null
          service_slug: string
          status: string
          technical_specification: Json | null
          telegram_sent_at: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          additional_requirements?: string | null
          assigned_admin_id?: string | null
          assigned_manager_id?: string | null
          client_feedback?: string | null
          completed_at?: string | null
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          created_at?: string
          deadline?: string | null
          details: string
          estimated_completion_time?: unknown | null
          estimated_price?: number | null
          files_urls?: string[] | null
          final_price?: number | null
          generated_prompt?: string | null
          id?: string
          last_activity_at?: string | null
          notes?: string | null
          payment_status?: string | null
          priority?: string | null
          quality_rating?: number | null
          revision_count?: number | null
          service_name: string
          service_options?: Json | null
          service_slug: string
          status?: string
          technical_specification?: Json | null
          telegram_sent_at?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          additional_requirements?: string | null
          assigned_admin_id?: string | null
          assigned_manager_id?: string | null
          client_feedback?: string | null
          completed_at?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          created_at?: string
          deadline?: string | null
          details?: string
          estimated_completion_time?: unknown | null
          estimated_price?: number | null
          files_urls?: string[] | null
          final_price?: number | null
          generated_prompt?: string | null
          id?: string
          last_activity_at?: string | null
          notes?: string | null
          payment_status?: string | null
          priority?: string | null
          quality_rating?: number | null
          revision_count?: number | null
          service_name?: string
          service_options?: Json | null
          service_slug?: string
          status?: string
          technical_specification?: Json | null
          telegram_sent_at?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payment_integrations: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          provider: string
          public_key: string | null
          supported_currencies: string[] | null
          updated_at: string | null
          webhook_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          provider: string
          public_key?: string | null
          supported_currencies?: string[] | null
          updated_at?: string | null
          webhook_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          provider?: string
          public_key?: string | null
          supported_currencies?: string[] | null
          updated_at?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          currency: string | null
          discount_amount: number | null
          gateway_payment_id: string | null
          id: string
          order_id: string | null
          payment_gateway: string | null
          payment_method: string | null
          payment_status: string | null
          promo_code_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          discount_amount?: number | null
          gateway_payment_id?: string | null
          id?: string
          order_id?: string | null
          payment_gateway?: string | null
          payment_method?: string | null
          payment_status?: string | null
          promo_code_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          discount_amount?: number | null
          gateway_payment_id?: string | null
          id?: string
          order_id?: string | null
          payment_gateway?: string | null
          payment_method?: string | null
          payment_status?: string | null
          promo_code_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_promo_code_id_fkey"
            columns: ["promo_code_id"]
            isOneToOne: false
            referencedRelation: "promo_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_items: {
        Row: {
          after_text: string | null
          before_text: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          metrics: Json | null
          service_slug: string
          tags: string[] | null
          title: string
        }
        Insert: {
          after_text?: string | null
          before_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          metrics?: Json | null
          service_slug: string
          tags?: string[] | null
          title: string
        }
        Update: {
          after_text?: string | null
          before_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          metrics?: Json | null
          service_slug?: string
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      product_pages: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          filters: Json | null
          id: string
          link_slots: Json | null
          manufacturer: string | null
          page_title: string
          page_url: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          filters?: Json | null
          id?: string
          link_slots?: Json | null
          manufacturer?: string | null
          page_title: string
          page_url: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          filters?: Json | null
          id?: string
          link_slots?: Json | null
          manufacturer?: string | null
          page_title?: string
          page_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_files: {
        Row: {
          created_at: string | null
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          metadata: Json | null
          mime_type: string | null
          order_id: string
          processing_status: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          order_id: string
          processing_status?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          order_id?: string
          processing_status?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_files_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string | null
          discount_type: string
          discount_value: number
          id: string
          is_active: boolean | null
          max_uses: number | null
          min_order_amount: number | null
          used_count: number | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          discount_type: string
          discount_value: number
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          min_order_amount?: number | null
          used_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          discount_type?: string
          discount_value?: number
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          min_order_amount?: number | null
          used_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      prompt_templates: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          prompt_template: string
          service_type: string
          template_name: string
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          prompt_template: string
          service_type: string
          template_name: string
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          prompt_template?: string
          service_type?: string
          template_name?: string
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      realtime_kpis: {
        Row: {
          category: string | null
          id: string
          kpi_name: string
          kpi_target: number | null
          kpi_value: number
          unit: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          id?: string
          kpi_name: string
          kpi_target?: number | null
          kpi_value: number
          unit?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          id?: string
          kpi_name?: string
          kpi_target?: number | null
          kpi_value?: number
          unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      seo_generation_tasks: {
        Row: {
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          max_retries: number
          page_id: string
          priority: number
          project_id: string
          result: Json | null
          retry_count: number
          started_at: string | null
          status: string
          task_type: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          max_retries?: number
          page_id: string
          priority?: number
          project_id: string
          result?: Json | null
          retry_count?: number
          started_at?: string | null
          status?: string
          task_type: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          max_retries?: number
          page_id?: string
          priority?: number
          project_id?: string
          result?: Json | null
          retry_count?: number
          started_at?: string | null
          status?: string
          task_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "seo_generation_tasks_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "bulk_seo_pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_generation_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "bulk_seo_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_meta_templates: {
        Row: {
          category: string | null
          created_at: string
          description_template: string
          id: string
          is_active: boolean | null
          name: string
          title_template: string
          variables: Json | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description_template: string
          id?: string
          is_active?: boolean | null
          name: string
          title_template: string
          variables?: Json | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description_template?: string
          id?: string
          is_active?: boolean | null
          name?: string
          title_template?: string
          variables?: Json | null
        }
        Relationships: []
      }
      seo_templates: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          template_content: string
          template_type: string
          updated_at: string
          variables: Json | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          template_content: string
          template_type: string
          updated_at?: string
          variables?: Json | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          template_content?: string
          template_type?: string
          updated_at?: string
          variables?: Json | null
        }
        Relationships: []
      }
      seo_texts: {
        Row: {
          character_count: number | null
          created_at: string
          id: string
          language: string
          meta_description: string | null
          meta_title: string | null
          product_id: string
          seo_text: string | null
          status: string
          type: string
          uniqueness_score: number | null
          updated_at: string
        }
        Insert: {
          character_count?: number | null
          created_at?: string
          id?: string
          language?: string
          meta_description?: string | null
          meta_title?: string | null
          product_id: string
          seo_text?: string | null
          status?: string
          type: string
          uniqueness_score?: number | null
          updated_at?: string
        }
        Update: {
          character_count?: number | null
          created_at?: string
          id?: string
          language?: string
          meta_description?: string | null
          meta_title?: string | null
          product_id?: string
          seo_text?: string | null
          status?: string
          type?: string
          uniqueness_score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "seo_texts_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      service_performance_analytics: {
        Row: {
          avg_completion_time: unknown | null
          avg_quality_rating: number | null
          client_satisfaction: number | null
          completed_orders: number | null
          created_at: string
          date: string
          id: string
          margin: number | null
          orders_count: number | null
          repeat_rate: number | null
          revenue: number | null
          service_slug: string
        }
        Insert: {
          avg_completion_time?: unknown | null
          avg_quality_rating?: number | null
          client_satisfaction?: number | null
          completed_orders?: number | null
          created_at?: string
          date: string
          id?: string
          margin?: number | null
          orders_count?: number | null
          repeat_rate?: number | null
          revenue?: number | null
          service_slug: string
        }
        Update: {
          avg_completion_time?: unknown | null
          avg_quality_rating?: number | null
          client_satisfaction?: number | null
          completed_orders?: number | null
          created_at?: string
          date?: string
          id?: string
          margin?: number | null
          orders_count?: number | null
          repeat_rate?: number | null
          revenue?: number | null
          service_slug?: string
        }
        Relationships: []
      }
      smart_order_analytics: {
        Row: {
          created_at: string
          event_type: string
          form_data: Json | null
          id: string
          session_id: string
          step_name: string
          step_number: number
          time_spent: number | null
          timestamp: string
          url: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          form_data?: Json | null
          id?: string
          session_id: string
          step_name: string
          step_number: number
          time_spent?: number | null
          timestamp?: string
          url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          form_data?: Json | null
          id?: string
          session_id?: string
          step_name?: string
          step_number?: number
          time_spent?: number | null
          timestamp?: string
          url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      system_diagnostics: {
        Row: {
          check_name: string
          check_type: string
          checked_at: string | null
          created_at: string | null
          details: Json | null
          error_message: string | null
          id: string
          status: string
        }
        Insert: {
          check_name: string
          check_type: string
          checked_at?: string | null
          created_at?: string | null
          details?: Json | null
          error_message?: string | null
          id?: string
          status: string
        }
        Update: {
          check_name?: string
          check_type?: string
          checked_at?: string | null
          created_at?: string | null
          details?: Json | null
          error_message?: string | null
          id?: string
          status?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      telegram_integrations: {
        Row: {
          bot_token: string | null
          chat_id: number
          created_at: string | null
          id: string
          is_active: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bot_token?: string | null
          chat_id: number
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bot_token?: string | null
          chat_id?: number
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_avatar_url: string | null
          client_company: string | null
          client_name: string
          created_at: string
          id: string
          project_details: string | null
          rating: number | null
          results_achieved: string | null
          review_text: string
          service_slug: string | null
        }
        Insert: {
          client_avatar_url?: string | null
          client_company?: string | null
          client_name: string
          created_at?: string
          id?: string
          project_details?: string | null
          rating?: number | null
          results_achieved?: string | null
          review_text: string
          service_slug?: string | null
        }
        Update: {
          client_avatar_url?: string | null
          client_company?: string | null
          client_name?: string
          created_at?: string
          id?: string
          project_details?: string | null
          rating?: number | null
          results_achieved?: string | null
          review_text?: string
          service_slug?: string | null
        }
        Relationships: []
      }
      translations: {
        Row: {
          created_at: string | null
          id: string
          key: string
          locale: string
          namespace: string | null
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          locale: string
          namespace?: string | null
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          locale?: string
          namespace?: string | null
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      текста: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auto_configure_order_processing: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      check_trigger_health: {
        Args: Record<PropertyKey, never>
        Returns: {
          trigger_exists: boolean
          function_exists: boolean
          recent_executions: number
          last_error: string
        }[]
      }
      create_notification: {
        Args: {
          p_user_id: string
          p_title: string
          p_message: string
          p_type?: string
        }
        Returns: string
      }
      generate_order_prompt: {
        Args: { order_data: Json }
        Returns: string
      }
      get_funnel_analytics: {
        Args: { start_date?: string; end_date?: string }
        Returns: {
          step_number: number
          step_name: string
          total_entries: number
          total_exits: number
          total_completions: number
          average_time_spent: number
          conversion_rate: number
        }[]
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_order_ready_for_processing: {
        Args: { order_id: string }
        Returns: boolean
      }
      log_activity: {
        Args: {
          p_action: string
          p_entity_type?: string
          p_entity_id?: string
          p_details?: Json
        }
        Returns: undefined
      }
      monitor_order_processing: {
        Args: Record<PropertyKey, never>
        Returns: {
          status: string
          orders_count: number
          avg_processing_time: unknown
          success_rate: number
          last_processed: string
        }[]
      }
      process_order_queue: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      reprocess_order: {
        Args: { order_id: string }
        Returns: boolean
      }
      restart_stuck_orders: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      run_system_diagnostics: {
        Args: Record<PropertyKey, never>
        Returns: {
          check_type: string
          check_name: string
          status: string
          details: Json
          error_message: string
        }[]
      }
      update_realtime_kpis: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "client" | "guest"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "client", "guest"],
    },
  },
} as const
