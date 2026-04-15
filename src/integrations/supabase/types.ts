export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          context_flags: Json | null
          created_at: string
          id: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          context_flags?: Json | null
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          context_flags?: Json | null
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          metadata: Json | null
          role: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role?: string
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      analyses: {
        Row: {
          created_at: string
          id: string
          input_text: string
          metrics: Json
          overall_score: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          input_text: string
          metrics?: Json
          overall_score: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          input_text?: string
          metrics?: Json
          overall_score?: number
          user_id?: string
        }
        Relationships: []
      }
      auto_reply_log: {
        Row: {
          created_at: string
          error_message: string | null
          executed_at: string | null
          generated_reply: string
          id: string
          reply_tweet_id: string | null
          rule_id: string | null
          scheduled_for: string
          source_author: string | null
          source_tweet_id: string
          source_tweet_text: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          executed_at?: string | null
          generated_reply: string
          id?: string
          reply_tweet_id?: string | null
          rule_id?: string | null
          scheduled_for: string
          source_author?: string | null
          source_tweet_id: string
          source_tweet_text?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          executed_at?: string | null
          generated_reply?: string
          id?: string
          reply_tweet_id?: string | null
          rule_id?: string | null
          scheduled_for?: string
          source_author?: string | null
          source_tweet_id?: string
          source_tweet_text?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "auto_reply_log_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "auto_reply_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      auto_reply_rules: {
        Row: {
          created_at: string
          daily_limit: number
          enabled: boolean
          exclude_keywords: Json | null
          id: string
          keywords: Json | null
          last_reset_date: string | null
          max_delay_seconds: number
          min_delay_seconds: number
          mood: string | null
          persona_id: string | null
          replies_today: number
          rule_type: string
          tone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          daily_limit?: number
          enabled?: boolean
          exclude_keywords?: Json | null
          id?: string
          keywords?: Json | null
          last_reset_date?: string | null
          max_delay_seconds?: number
          min_delay_seconds?: number
          mood?: string | null
          persona_id?: string | null
          replies_today?: number
          rule_type?: string
          tone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          daily_limit?: number
          enabled?: boolean
          exclude_keywords?: Json | null
          id?: string
          keywords?: Json | null
          last_reset_date?: string | null
          max_delay_seconds?: number
          min_delay_seconds?: number
          mood?: string | null
          persona_id?: string | null
          replies_today?: number
          rule_type?: string
          tone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "auto_reply_rules_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_app_nodes: {
        Row: {
          app_id: string
          config_schema: Json | null
          created_at: string
          description: string | null
          enabled: boolean | null
          icon: string | null
          id: string
          input_schema: Json | null
          name: string
          node_type: string
          output_schema: Json | null
          slug: string
        }
        Insert: {
          app_id: string
          config_schema?: Json | null
          created_at?: string
          description?: string | null
          enabled?: boolean | null
          icon?: string | null
          id?: string
          input_schema?: Json | null
          name: string
          node_type?: string
          output_schema?: Json | null
          slug: string
        }
        Update: {
          app_id?: string
          config_schema?: Json | null
          created_at?: string
          description?: string | null
          enabled?: boolean | null
          icon?: string | null
          id?: string
          input_schema?: Json | null
          name?: string
          node_type?: string
          output_schema?: Json | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_app_nodes_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "automation_apps"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_apps: {
        Row: {
          auth_type: string
          category: string
          config_schema: Json | null
          connection_instructions: string | null
          created_at: string
          description: string | null
          icon_url: string | null
          id: string
          metadata: Json | null
          name: string
          slug: string
          sort_order: number | null
          supported_scopes: Json | null
          tier_access: string
          updated_at: string
          visibility: string
        }
        Insert: {
          auth_type?: string
          category?: string
          config_schema?: Json | null
          connection_instructions?: string | null
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          metadata?: Json | null
          name: string
          slug: string
          sort_order?: number | null
          supported_scopes?: Json | null
          tier_access?: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          auth_type?: string
          category?: string
          config_schema?: Json | null
          connection_instructions?: string | null
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          slug?: string
          sort_order?: number | null
          supported_scopes?: Json | null
          tier_access?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: []
      }
      automation_templates: {
        Row: {
          apps_used: Json | null
          category: string | null
          created_at: string
          created_by: string | null
          description: string | null
          difficulty: string | null
          edges: Json | null
          featured: boolean | null
          id: string
          install_count: number | null
          name: string
          nodes: Json | null
        }
        Insert: {
          apps_used?: Json | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          edges?: Json | null
          featured?: boolean | null
          id?: string
          install_count?: number | null
          name: string
          nodes?: Json | null
        }
        Update: {
          apps_used?: Json | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          edges?: Json | null
          featured?: boolean | null
          id?: string
          install_count?: number | null
          name?: string
          nodes?: Json | null
        }
        Relationships: []
      }
      clerk_user_mapping: {
        Row: {
          clerk_id: string
          created_at: string
          email: string | null
          internal_id: string
        }
        Insert: {
          clerk_id: string
          created_at?: string
          email?: string | null
          internal_id?: string
        }
        Update: {
          clerk_id?: string
          created_at?: string
          email?: string | null
          internal_id?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          company_code: string
          created_at: string
          id: string
          logo_url: string | null
          max_members: number
          metadata: Json | null
          name: string
          owner_id: string
          plan: string
          updated_at: string
        }
        Insert: {
          company_code: string
          created_at?: string
          id?: string
          logo_url?: string | null
          max_members?: number
          metadata?: Json | null
          name: string
          owner_id: string
          plan?: string
          updated_at?: string
        }
        Update: {
          company_code?: string
          created_at?: string
          id?: string
          logo_url?: string | null
          max_members?: number
          metadata?: Json | null
          name?: string
          owner_id?: string
          plan?: string
          updated_at?: string
        }
        Relationships: []
      }
      company_members: {
        Row: {
          company_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          company_id: string
          id?: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          company_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      content_items: {
        Row: {
          body: string
          content_type: string
          created_at: string
          domain_bucket: string | null
          hook_metadata: Json | null
          id: string
          metadata: Json | null
          performance_score: number | null
          similarity_score: number | null
          source: string | null
          source_author: string | null
          source_posted_at: string | null
          source_url: string | null
          starred: boolean | null
          status: string
          storage_destination: string | null
          structure_metadata: Json | null
          sync_state: string | null
          tags: Json | null
          template_id: string | null
          title: string | null
          tone: string | null
          topic: string | null
          updated_at: string
          usage_count: number | null
          user_id: string
        }
        Insert: {
          body: string
          content_type?: string
          created_at?: string
          domain_bucket?: string | null
          hook_metadata?: Json | null
          id?: string
          metadata?: Json | null
          performance_score?: number | null
          similarity_score?: number | null
          source?: string | null
          source_author?: string | null
          source_posted_at?: string | null
          source_url?: string | null
          starred?: boolean | null
          status?: string
          storage_destination?: string | null
          structure_metadata?: Json | null
          sync_state?: string | null
          tags?: Json | null
          template_id?: string | null
          title?: string | null
          tone?: string | null
          topic?: string | null
          updated_at?: string
          usage_count?: number | null
          user_id: string
        }
        Update: {
          body?: string
          content_type?: string
          created_at?: string
          domain_bucket?: string | null
          hook_metadata?: Json | null
          id?: string
          metadata?: Json | null
          performance_score?: number | null
          similarity_score?: number | null
          source?: string | null
          source_author?: string | null
          source_posted_at?: string | null
          source_url?: string | null
          starred?: boolean | null
          status?: string
          storage_destination?: string | null
          structure_metadata?: Json | null
          sync_state?: string | null
          tags?: Json | null
          template_id?: string | null
          title?: string | null
          tone?: string | null
          topic?: string | null
          updated_at?: string
          usage_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      content_similarity_matches: {
        Row: {
          created_at: string
          id: string
          matched_content_item_id: string
          similarity_score: number | null
          source_content_item_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          matched_content_item_id: string
          similarity_score?: number | null
          source_content_item_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          matched_content_item_id?: string
          similarity_score?: number | null
          source_content_item_id?: string
          user_id?: string
        }
        Relationships: []
      }
      coupon_redemptions: {
        Row: {
          applied_result: Json | null
          coupon_id: string
          id: string
          redeemed_at: string
          user_id: string
        }
        Insert: {
          applied_result?: Json | null
          coupon_id: string
          id?: string
          redeemed_at?: string
          user_id: string
        }
        Update: {
          applied_result?: Json | null
          coupon_id?: string
          id?: string
          redeemed_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coupon_redemptions_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string
          coupon_type: string
          created_at: string
          created_by: string
          credit_amount: number | null
          current_uses: number | null
          discount_percent: number | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          notes: string | null
          upgrade_duration_days: number | null
          upgrade_tier: string | null
        }
        Insert: {
          code: string
          coupon_type?: string
          created_at?: string
          created_by: string
          credit_amount?: number | null
          current_uses?: number | null
          discount_percent?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          notes?: string | null
          upgrade_duration_days?: number | null
          upgrade_tier?: string | null
        }
        Update: {
          code?: string
          coupon_type?: string
          created_at?: string
          created_by?: string
          credit_amount?: number | null
          current_uses?: number | null
          discount_percent?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          notes?: string | null
          upgrade_duration_days?: number | null
          upgrade_tier?: string | null
        }
        Relationships: []
      }
      digest_preferences: {
        Row: {
          created_at: string
          enabled: boolean | null
          id: string
          include_credits_reminder: boolean | null
          include_engagement_trends: boolean | null
          include_posts_created: boolean | null
          include_recommendations: boolean | null
          include_top_content: boolean | null
          preferred_day: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean | null
          id?: string
          include_credits_reminder?: boolean | null
          include_engagement_trends?: boolean | null
          include_posts_created?: boolean | null
          include_recommendations?: boolean | null
          include_top_content?: boolean | null
          preferred_day?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          enabled?: boolean | null
          id?: string
          include_credits_reminder?: boolean | null
          include_engagement_trends?: boolean | null
          include_posts_created?: boolean | null
          include_recommendations?: boolean | null
          include_top_content?: boolean | null
          preferred_day?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      employee_access: {
        Row: {
          company_code: string | null
          company_id: string | null
          email: string
          granted_at: string
          granted_by: string | null
          id: string
          role: string
          status: string
        }
        Insert: {
          company_code?: string | null
          company_id?: string | null
          email: string
          granted_at?: string
          granted_by?: string | null
          id?: string
          role?: string
          status?: string
        }
        Update: {
          company_code?: string | null
          company_id?: string | null
          email?: string
          granted_at?: string
          granted_by?: string | null
          id?: string
          role?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_access_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      feed_suggestions: {
        Row: {
          actions: Json | null
          created_at: string
          dismissed: boolean | null
          expires_at: string | null
          id: string
          preview: string | null
          priority: number | null
          reason: string | null
          source_data: Json | null
          suggestion_type: string
          title: string
          user_id: string
        }
        Insert: {
          actions?: Json | null
          created_at?: string
          dismissed?: boolean | null
          expires_at?: string | null
          id?: string
          preview?: string | null
          priority?: number | null
          reason?: string | null
          source_data?: Json | null
          suggestion_type?: string
          title: string
          user_id: string
        }
        Update: {
          actions?: Json | null
          created_at?: string
          dismissed?: boolean | null
          expires_at?: string | null
          id?: string
          preview?: string | null
          priority?: number | null
          reason?: string | null
          source_data?: Json | null
          suggestion_type?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      generations: {
        Row: {
          created_at: string
          id: string
          input_text: string
          length: string | null
          output_variants: Json
          reply_score: number | null
          style: string | null
          tone: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          input_text: string
          length?: string | null
          output_variants?: Json
          reply_score?: number | null
          style?: string | null
          tone?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          input_text?: string
          length?: string | null
          output_variants?: Json
          reply_score?: number | null
          style?: string | null
          tone?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      github_connections: {
        Row: {
          access_token: string
          connected_at: string
          github_user_id: string | null
          github_username: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token: string
          connected_at?: string
          github_user_id?: string | null
          github_username?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string
          connected_at?: string
          github_user_id?: string | null
          github_username?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      lead_activity: {
        Row: {
          activity_type: string
          created_at: string
          description: string | null
          id: string
          lead_id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          description?: string | null
          id?: string
          lead_id: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          description?: string | null
          id?: string
          lead_id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_activity_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_campaign_runs: {
        Row: {
          campaign_id: string
          completed_at: string | null
          created_at: string
          errors: Json | null
          id: string
          leads_enriched: number | null
          leads_found: number | null
          started_at: string
          status: string
          user_id: string
        }
        Insert: {
          campaign_id: string
          completed_at?: string | null
          created_at?: string
          errors?: Json | null
          id?: string
          leads_enriched?: number | null
          leads_found?: number | null
          started_at?: string
          status?: string
          user_id: string
        }
        Update: {
          campaign_id?: string
          completed_at?: string | null
          created_at?: string
          errors?: Json | null
          id?: string
          leads_enriched?: number | null
          leads_found?: number | null
          started_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_campaign_runs_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "lead_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_campaigns: {
        Row: {
          created_at: string
          description: string | null
          enrichment_options: Json | null
          id: string
          keywords: string[] | null
          last_run_at: string | null
          location: string | null
          name: string
          result_limit: number | null
          schedule_cron: string | null
          sources: string[] | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          enrichment_options?: Json | null
          id?: string
          keywords?: string[] | null
          last_run_at?: string | null
          location?: string | null
          name: string
          result_limit?: number | null
          schedule_cron?: string | null
          sources?: string[] | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          enrichment_options?: Json | null
          id?: string
          keywords?: string[] | null
          last_run_at?: string | null
          location?: string | null
          name?: string
          result_limit?: number | null
          schedule_cron?: string | null
          sources?: string[] | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      lead_enrichment: {
        Row: {
          created_at: string
          enrichment_data: Json | null
          enrichment_type: string
          id: string
          lead_id: string
          source: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          enrichment_data?: Json | null
          enrichment_type: string
          id?: string
          lead_id: string
          source?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          enrichment_data?: Json | null
          enrichment_type?: string
          id?: string
          lead_id?: string
          source?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_enrichment_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_exports: {
        Row: {
          completed_at: string | null
          created_at: string
          export_type: string | null
          file_url: string | null
          filters: Json | null
          id: string
          record_count: number | null
          status: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          export_type?: string | null
          file_url?: string | null
          filters?: Json | null
          id?: string
          record_count?: number | null
          status?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          export_type?: string | null
          file_url?: string | null
          filters?: Json | null
          id?: string
          record_count?: number | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      lead_import_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          errors: Json | null
          field_mapping: Json | null
          file_name: string | null
          file_url: string | null
          id: string
          processed_rows: number | null
          source_type: string
          status: string | null
          total_rows: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          errors?: Json | null
          field_mapping?: Json | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          processed_rows?: number | null
          source_type: string
          status?: string | null
          total_rows?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          errors?: Json | null
          field_mapping?: Json | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          processed_rows?: number | null
          source_type?: string
          status?: string | null
          total_rows?: number | null
          user_id?: string
        }
        Relationships: []
      }
      lead_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          lead_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          lead_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          lead_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_notes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_outreach_links: {
        Row: {
          created_at: string
          id: string
          lead_id: string
          message_content: string | null
          outreach_type: string | null
          reply_history_id: string | null
          sent_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          lead_id: string
          message_content?: string | null
          outreach_type?: string | null
          reply_history_id?: string | null
          sent_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          lead_id?: string
          message_content?: string | null
          outreach_type?: string | null
          reply_history_id?: string | null
          sent_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_outreach_links_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_outreach_links_reply_history_id_fkey"
            columns: ["reply_history_id"]
            isOneToOne: false
            referencedRelation: "reply_history"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_source_records: {
        Row: {
          created_at: string
          id: string
          lead_id: string | null
          mapped_data: Json | null
          raw_data: Json
          source_id: string
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          lead_id?: string | null
          mapped_data?: Json | null
          raw_data?: Json
          source_id: string
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          lead_id?: string | null
          mapped_data?: Json | null
          raw_data?: Json
          source_id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_source_records_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_source_records_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "lead_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_sources: {
        Row: {
          config: Json | null
          created_at: string
          credentials_encrypted: Json | null
          field_mapping: Json | null
          id: string
          last_synced_at: string | null
          name: string
          source_type: string
          status: string | null
          sync_schedule: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          config?: Json | null
          created_at?: string
          credentials_encrypted?: Json | null
          field_mapping?: Json | null
          id?: string
          last_synced_at?: string | null
          name: string
          source_type: string
          status?: string | null
          sync_schedule?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          config?: Json | null
          created_at?: string
          credentials_encrypted?: Json | null
          field_mapping?: Json | null
          id?: string
          last_synced_at?: string | null
          name?: string
          source_type?: string
          status?: string | null
          sync_schedule?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          about_page_url: string | null
          address: string | null
          business_name: string | null
          campaign_id: string | null
          category: string | null
          city: string | null
          confidence: number | null
          contact_form_detected: boolean | null
          contact_page_url: string | null
          country: string | null
          created_at: string
          data_provenance: Json | null
          description: string | null
          domain: string | null
          email: string | null
          id: string
          internal_notes: string | null
          is_merged: boolean | null
          last_synced_at: string | null
          lead_owner: string | null
          map_listing_url: string | null
          merged_into_id: string | null
          outreach_status: string | null
          phone: string | null
          postal_code: string | null
          ratings: number | null
          review_count: number | null
          score: number | null
          social_links: Json | null
          source_urls: string[] | null
          state: string | null
          tags: string[] | null
          updated_at: string
          user_id: string
          website: string | null
          whatsapp: string | null
        }
        Insert: {
          about_page_url?: string | null
          address?: string | null
          business_name?: string | null
          campaign_id?: string | null
          category?: string | null
          city?: string | null
          confidence?: number | null
          contact_form_detected?: boolean | null
          contact_page_url?: string | null
          country?: string | null
          created_at?: string
          data_provenance?: Json | null
          description?: string | null
          domain?: string | null
          email?: string | null
          id?: string
          internal_notes?: string | null
          is_merged?: boolean | null
          last_synced_at?: string | null
          lead_owner?: string | null
          map_listing_url?: string | null
          merged_into_id?: string | null
          outreach_status?: string | null
          phone?: string | null
          postal_code?: string | null
          ratings?: number | null
          review_count?: number | null
          score?: number | null
          social_links?: Json | null
          source_urls?: string[] | null
          state?: string | null
          tags?: string[] | null
          updated_at?: string
          user_id: string
          website?: string | null
          whatsapp?: string | null
        }
        Update: {
          about_page_url?: string | null
          address?: string | null
          business_name?: string | null
          campaign_id?: string | null
          category?: string | null
          city?: string | null
          confidence?: number | null
          contact_form_detected?: boolean | null
          contact_page_url?: string | null
          country?: string | null
          created_at?: string
          data_provenance?: Json | null
          description?: string | null
          domain?: string | null
          email?: string | null
          id?: string
          internal_notes?: string | null
          is_merged?: boolean | null
          last_synced_at?: string | null
          lead_owner?: string | null
          map_listing_url?: string | null
          merged_into_id?: string | null
          outreach_status?: string | null
          phone?: string | null
          postal_code?: string | null
          ratings?: number | null
          review_count?: number | null
          score?: number | null
          social_links?: Json | null
          source_urls?: string[] | null
          state?: string | null
          tags?: string[] | null
          updated_at?: string
          user_id?: string
          website?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "lead_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_merged_into_id_fkey"
            columns: ["merged_into_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      meme_assets: {
        Row: {
          caption_text: string | null
          created_at: string
          id: string
          metadata_json: Json | null
          output_url: string | null
          score: number | null
          source_tweet: string | null
          template_id: string | null
          user_id: string
        }
        Insert: {
          caption_text?: string | null
          created_at?: string
          id?: string
          metadata_json?: Json | null
          output_url?: string | null
          score?: number | null
          source_tweet?: string | null
          template_id?: string | null
          user_id: string
        }
        Update: {
          caption_text?: string | null
          created_at?: string
          id?: string
          metadata_json?: Json | null
          output_url?: string | null
          score?: number | null
          source_tweet?: string | null
          template_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meme_assets_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "meme_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      meme_caption_variants: {
        Row: {
          created_at: string
          id: string
          meme_asset_id: string
          rank: number | null
          score: number | null
          text: string
          tone: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          meme_asset_id: string
          rank?: number | null
          score?: number | null
          text: string
          tone?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          meme_asset_id?: string
          rank?: number | null
          score?: number | null
          text?: string
          tone?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meme_caption_variants_meme_asset_id_fkey"
            columns: ["meme_asset_id"]
            isOneToOne: false
            referencedRelation: "meme_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      meme_templates: {
        Row: {
          box_count: number
          created_at: string
          created_by: string | null
          default_text_positions: Json | null
          height: number
          id: string
          image_url: string
          is_system: boolean | null
          name: string
          popularity_score: number | null
          tags: Json | null
          width: number
        }
        Insert: {
          box_count?: number
          created_at?: string
          created_by?: string | null
          default_text_positions?: Json | null
          height?: number
          id?: string
          image_url: string
          is_system?: boolean | null
          name: string
          popularity_score?: number | null
          tags?: Json | null
          width?: number
        }
        Update: {
          box_count?: number
          created_at?: string
          created_by?: string | null
          default_text_positions?: Json | null
          height?: number
          id?: string
          image_url?: string
          is_system?: boolean | null
          name?: string
          popularity_score?: number | null
          tags?: Json | null
          width?: number
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          metadata: Json | null
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          metadata?: Json | null
          read?: boolean
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          metadata?: Json | null
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      optimization_suggestions: {
        Row: {
          applied: boolean | null
          created_at: string
          dimension: string
          id: string
          reply_history_id: string
          suggestion: string
          suggestion_type: string
          user_id: string
        }
        Insert: {
          applied?: boolean | null
          created_at?: string
          dimension: string
          id?: string
          reply_history_id: string
          suggestion: string
          suggestion_type: string
          user_id: string
        }
        Update: {
          applied?: boolean | null
          created_at?: string
          dimension?: string
          id?: string
          reply_history_id?: string
          suggestion?: string
          suggestion_type?: string
          user_id?: string
        }
        Relationships: []
      }
      persona_profiles: {
        Row: {
          avg_sentence_length: number | null
          confidence_score: number | null
          created_at: string
          cta_style: string | null
          emoji_frequency: number | null
          hook_style: string | null
          id: string
          last_trained_at: string | null
          summary: string | null
          tone_profile: Json | null
          training_sample_count: number | null
          updated_at: string
          user_id: string
          vocabulary_level: string | null
        }
        Insert: {
          avg_sentence_length?: number | null
          confidence_score?: number | null
          created_at?: string
          cta_style?: string | null
          emoji_frequency?: number | null
          hook_style?: string | null
          id?: string
          last_trained_at?: string | null
          summary?: string | null
          tone_profile?: Json | null
          training_sample_count?: number | null
          updated_at?: string
          user_id: string
          vocabulary_level?: string | null
        }
        Update: {
          avg_sentence_length?: number | null
          confidence_score?: number | null
          created_at?: string
          cta_style?: string | null
          emoji_frequency?: number | null
          hook_style?: string | null
          id?: string
          last_trained_at?: string | null
          summary?: string | null
          tone_profile?: Json | null
          training_sample_count?: number | null
          updated_at?: string
          user_id?: string
          vocabulary_level?: string | null
        }
        Relationships: []
      }
      persona_training_samples: {
        Row: {
          analysis_result: Json | null
          analyzed: boolean | null
          content: string
          created_at: string
          id: string
          source: string | null
          source_url: string | null
          user_id: string
        }
        Insert: {
          analysis_result?: Json | null
          analyzed?: boolean | null
          content: string
          created_at?: string
          id?: string
          source?: string | null
          source_url?: string | null
          user_id: string
        }
        Update: {
          analysis_result?: Json | null
          analyzed?: boolean | null
          content?: string
          created_at?: string
          id?: string
          source?: string | null
          source_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      personas: {
        Row: {
          created_at: string
          description: string | null
          example_phrases: Json | null
          id: string
          is_default: boolean | null
          name: string
          style: string | null
          tone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          example_phrases?: Json | null
          id?: string
          is_default?: boolean | null
          name: string
          style?: string | null
          tone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          example_phrases?: Json | null
          id?: string
          is_default?: boolean | null
          name?: string
          style?: string | null
          tone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      platform_config: {
        Row: {
          config_key: string
          config_value: string
          description: string | null
          id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          config_key: string
          config_value: string
          description?: string | null
          id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          config_key?: string
          config_value?: string
          description?: string | null
          id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city: string | null
          created_at: string
          default_length: string | null
          default_style: string | null
          display_name: string | null
          id: string
          linkedin: string | null
          location: string | null
          mobile: string | null
          referral_code: string | null
          updated_at: string
          user_id: string
          x_handle: string | null
        }
        Insert: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          default_length?: string | null
          default_style?: string | null
          display_name?: string | null
          id?: string
          linkedin?: string | null
          location?: string | null
          mobile?: string | null
          referral_code?: string | null
          updated_at?: string
          user_id: string
          x_handle?: string | null
        }
        Update: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          default_length?: string | null
          default_style?: string | null
          display_name?: string | null
          id?: string
          linkedin?: string | null
          location?: string | null
          mobile?: string | null
          referral_code?: string | null
          updated_at?: string
          user_id?: string
          x_handle?: string | null
        }
        Relationships: []
      }
      published_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          metadata: Json | null
          platform: string
          post_type: string
          posted_at: string | null
          provider_post_id: string | null
          provider_post_url: string | null
          status: string
          thread_parts: Json | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          metadata?: Json | null
          platform?: string
          post_type?: string
          posted_at?: string | null
          provider_post_id?: string | null
          provider_post_url?: string | null
          status?: string
          thread_parts?: Json | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          platform?: string
          post_type?: string
          posted_at?: string | null
          provider_post_id?: string | null
          provider_post_url?: string | null
          status?: string
          thread_parts?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          converted_at: string | null
          created_at: string
          id: string
          referral_code: string
          referred_email: string | null
          referred_user_id: string | null
          referrer_id: string
          reward_amount: number | null
          reward_claimed: boolean | null
          reward_type: string | null
          status: string
        }
        Insert: {
          converted_at?: string | null
          created_at?: string
          id?: string
          referral_code: string
          referred_email?: string | null
          referred_user_id?: string | null
          referrer_id: string
          reward_amount?: number | null
          reward_claimed?: boolean | null
          reward_type?: string | null
          status?: string
        }
        Update: {
          converted_at?: string | null
          created_at?: string
          id?: string
          referral_code?: string
          referred_email?: string | null
          referred_user_id?: string | null
          referrer_id?: string
          reward_amount?: number | null
          reward_claimed?: boolean | null
          reward_type?: string | null
          status?: string
        }
        Relationships: []
      }
      reply_history: {
        Row: {
          context_metadata: Json | null
          created_at: string
          domain_bucket: string | null
          generated_reply: string
          id: string
          length: string | null
          mood: string
          optimized_reply: string | null
          persona_id: string | null
          saved_to_vault: boolean | null
          score: number | null
          source_author: string | null
          source_text: string
          source_url: string | null
          tone: string | null
          user_id: string
        }
        Insert: {
          context_metadata?: Json | null
          created_at?: string
          domain_bucket?: string | null
          generated_reply: string
          id?: string
          length?: string | null
          mood?: string
          optimized_reply?: string | null
          persona_id?: string | null
          saved_to_vault?: boolean | null
          score?: number | null
          source_author?: string | null
          source_text: string
          source_url?: string | null
          tone?: string | null
          user_id: string
        }
        Update: {
          context_metadata?: Json | null
          created_at?: string
          domain_bucket?: string | null
          generated_reply?: string
          id?: string
          length?: string | null
          mood?: string
          optimized_reply?: string | null
          persona_id?: string | null
          saved_to_vault?: boolean | null
          score?: number | null
          source_author?: string | null
          source_text?: string
          source_url?: string | null
          tone?: string | null
          user_id?: string
        }
        Relationships: []
      }
      reply_scores: {
        Row: {
          breakdown: Json | null
          clarity_score: number | null
          created_at: string
          credibility_score: number | null
          cta_strength_score: number | null
          emotion_score: number | null
          id: string
          novelty_score: number | null
          overall_score: number | null
          reply_history_id: string
          user_id: string
        }
        Insert: {
          breakdown?: Json | null
          clarity_score?: number | null
          created_at?: string
          credibility_score?: number | null
          cta_strength_score?: number | null
          emotion_score?: number | null
          id?: string
          novelty_score?: number | null
          overall_score?: number | null
          reply_history_id: string
          user_id: string
        }
        Update: {
          breakdown?: Json | null
          clarity_score?: number | null
          created_at?: string
          credibility_score?: number | null
          cta_strength_score?: number | null
          emotion_score?: number | null
          id?: string
          novelty_score?: number | null
          overall_score?: number | null
          reply_history_id?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_replies: {
        Row: {
          category: string | null
          created_at: string
          id: string
          score: number | null
          starred: boolean | null
          tags: Json | null
          text: string
          updated_at: string
          usage_count: number | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          score?: number | null
          starred?: boolean | null
          tags?: Json | null
          text: string
          updated_at?: string
          usage_count?: number | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          score?: number | null
          starred?: boolean | null
          tags?: Json | null
          text?: string
          updated_at?: string
          usage_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      scheduled_tweets: {
        Row: {
          content: string
          created_at: string
          error_message: string | null
          id: string
          metadata: Json | null
          posted_tweet_id: string | null
          scheduled_at: string
          status: string
          thread_parts: Json | null
          tweet_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          posted_tweet_id?: string | null
          scheduled_at: string
          status?: string
          thread_parts?: Json | null
          tweet_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          posted_tweet_id?: string | null
          scheduled_at?: string
          status?: string
          thread_parts?: Json | null
          tweet_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      social_post_analytics: {
        Row: {
          bookmarks: number | null
          created_at: string
          engagement_rate: number | null
          followers_at_post: number | null
          id: string
          impressions: number | null
          likes: number | null
          published_post_id: string | null
          replies: number | null
          reposts: number | null
          synced_at: string | null
          user_id: string
        }
        Insert: {
          bookmarks?: number | null
          created_at?: string
          engagement_rate?: number | null
          followers_at_post?: number | null
          id?: string
          impressions?: number | null
          likes?: number | null
          published_post_id?: string | null
          replies?: number | null
          reposts?: number | null
          synced_at?: string | null
          user_id: string
        }
        Update: {
          bookmarks?: number | null
          created_at?: string
          engagement_rate?: number | null
          followers_at_post?: number | null
          id?: string
          impressions?: number | null
          likes?: number | null
          published_post_id?: string | null
          replies?: number | null
          reposts?: number | null
          synced_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_post_analytics_published_post_id_fkey"
            columns: ["published_post_id"]
            isOneToOne: false
            referencedRelation: "published_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          billing_cycle_end: string | null
          billing_cycle_start: string | null
          created_at: string
          credits_remaining: number
          credits_total: number
          id: string
          plan: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          billing_cycle_end?: string | null
          billing_cycle_start?: string | null
          created_at?: string
          credits_remaining?: number
          credits_total?: number
          id?: string
          plan?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          billing_cycle_end?: string | null
          billing_cycle_start?: string | null
          created_at?: string
          credits_remaining?: number
          credits_total?: number
          id?: string
          plan?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      template_library: {
        Row: {
          asset_type: string
          created_at: string
          domain_bucket: string | null
          id: string
          name: string
          source_content_item_id: string | null
          template_pattern: string
          use_case: string | null
          user_id: string
        }
        Insert: {
          asset_type?: string
          created_at?: string
          domain_bucket?: string | null
          id?: string
          name: string
          source_content_item_id?: string | null
          template_pattern: string
          use_case?: string | null
          user_id: string
        }
        Update: {
          asset_type?: string
          created_at?: string
          domain_bucket?: string | null
          id?: string
          name?: string
          source_content_item_id?: string | null
          template_pattern?: string
          use_case?: string | null
          user_id?: string
        }
        Relationships: []
      }
      tier_feature_overrides: {
        Row: {
          enabled: boolean
          feature_key: string
          id: string
          tier: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          enabled?: boolean
          feature_key: string
          id?: string
          tier: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          enabled?: boolean
          feature_key?: string
          id?: string
          tier?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      topic_memory: {
        Row: {
          created_at: string
          domain_bucket: string
          id: string
          keywords: Json | null
          label: string
          last_used_at: string | null
          sample_asset_ids: Json | null
          summary: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          domain_bucket: string
          id?: string
          keywords?: Json | null
          label: string
          last_used_at?: string | null
          sample_asset_ids?: Json | null
          summary?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          domain_bucket?: string
          id?: string
          keywords?: Json | null
          label?: string
          last_used_at?: string | null
          sample_asset_ids?: Json | null
          summary?: string | null
          user_id?: string
        }
        Relationships: []
      }
      twitter_connections: {
        Row: {
          access_token: string
          access_token_secret: string
          code_verifier: string | null
          connected_at: string
          id: string
          refresh_token: string | null
          scope: string | null
          token_expires_at: string | null
          twitter_user_id: string | null
          twitter_username: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token: string
          access_token_secret: string
          code_verifier?: string | null
          connected_at?: string
          id?: string
          refresh_token?: string | null
          scope?: string | null
          token_expires_at?: string | null
          twitter_user_id?: string | null
          twitter_username?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string
          access_token_secret?: string
          code_verifier?: string | null
          connected_at?: string
          id?: string
          refresh_token?: string | null
          scope?: string | null
          token_expires_at?: string | null
          twitter_user_id?: string | null
          twitter_username?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      usage_counts: {
        Row: {
          analyses_count: number
          compositions_count: number
          date: string
          id: string
          replies_count: number
          user_id: string
        }
        Insert: {
          analyses_count?: number
          compositions_count?: number
          date?: string
          id?: string
          replies_count?: number
          user_id: string
        }
        Update: {
          analyses_count?: number
          compositions_count?: number
          date?: string
          id?: string
          replies_count?: number
          user_id?: string
        }
        Relationships: []
      }
      usage_logs: {
        Row: {
          action_type: string
          created_at: string
          credits_used: number
          id: string
          idempotency_key: string | null
          metadata: Json | null
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string
          credits_used?: number
          id?: string
          idempotency_key?: string | null
          metadata?: Json | null
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string
          credits_used?: number
          id?: string
          idempotency_key?: string | null
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_app_connections: {
        Row: {
          app_id: string
          connected_at: string
          credentials_encrypted: Json | null
          id: string
          last_synced_at: string | null
          metadata: Json | null
          scopes: Json | null
          status: string
          user_id: string
        }
        Insert: {
          app_id: string
          connected_at?: string
          credentials_encrypted?: Json | null
          id?: string
          last_synced_at?: string | null
          metadata?: Json | null
          scopes?: Json | null
          status?: string
          user_id: string
        }
        Update: {
          app_id?: string
          connected_at?: string
          credentials_encrypted?: Json | null
          id?: string
          last_synced_at?: string | null
          metadata?: Json | null
          scopes?: Json | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_app_connections_app_id_fkey"
            columns: ["app_id"]
            isOneToOne: false
            referencedRelation: "automation_apps"
            referencedColumns: ["id"]
          },
        ]
      }
      user_feature_overrides: {
        Row: {
          enabled: boolean
          feature_key: string
          id: string
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          enabled?: boolean
          feature_key: string
          id?: string
          updated_at?: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          enabled?: boolean
          feature_key?: string
          id?: string
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      weekly_digests: {
        Row: {
          created_at: string
          id: string
          summary: Json | null
          user_id: string
          week_start: string
        }
        Insert: {
          created_at?: string
          id?: string
          summary?: Json | null
          user_id: string
          week_start: string
        }
        Update: {
          created_at?: string
          id?: string
          summary?: Json | null
          user_id?: string
          week_start?: string
        }
        Relationships: []
      }
      workflow_runs: {
        Row: {
          created_at: string
          error_details: string | null
          finished_at: string | null
          id: string
          metadata: Json | null
          started_at: string | null
          status: string
          step_logs: Json | null
          trigger_source: string | null
          user_id: string
          workflow_id: string
        }
        Insert: {
          created_at?: string
          error_details?: string | null
          finished_at?: string | null
          id?: string
          metadata?: Json | null
          started_at?: string | null
          status?: string
          step_logs?: Json | null
          trigger_source?: string | null
          user_id: string
          workflow_id: string
        }
        Update: {
          created_at?: string
          error_details?: string | null
          finished_at?: string | null
          id?: string
          metadata?: Json | null
          started_at?: string | null
          status?: string
          step_logs?: Json | null
          trigger_source?: string | null
          user_id?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_runs_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_versions: {
        Row: {
          created_at: string
          edges: Json | null
          id: string
          name: string
          nodes: Json | null
          snapshot_reason: string | null
          status: string
          user_id: string
          version_number: number
          workflow_id: string
        }
        Insert: {
          created_at?: string
          edges?: Json | null
          id?: string
          name: string
          nodes?: Json | null
          snapshot_reason?: string | null
          status?: string
          user_id: string
          version_number?: number
          workflow_id: string
        }
        Update: {
          created_at?: string
          edges?: Json | null
          id?: string
          name?: string
          nodes?: Json | null
          snapshot_reason?: string | null
          status?: string
          user_id?: string
          version_number?: number
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_versions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          created_at: string
          description: string | null
          edges: Json | null
          id: string
          name: string
          nodes: Json | null
          settings: Json | null
          status: string
          tags: Json | null
          trigger_type: string | null
          updated_at: string
          user_id: string
          version: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          edges?: Json | null
          id?: string
          name?: string
          nodes?: Json | null
          settings?: Json | null
          status?: string
          tags?: Json | null
          trigger_type?: string | null
          updated_at?: string
          user_id: string
          version?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          edges?: Json | null
          id?: string
          name?: string
          nodes?: Json | null
          settings?: Json | null
          status?: string
          tags?: Json | null
          trigger_type?: string | null
          updated_at?: string
          user_id?: string
          version?: number | null
        }
        Relationships: []
      }
      x_oauth2_accounts: {
        Row: {
          access_token_encrypted: string
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          is_connected: boolean
          provider: string
          provider_user_id: string
          refresh_token_encrypted: string | null
          scopes: string[] | null
          token_expires_at: string | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          access_token_encrypted: string
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_connected?: boolean
          provider?: string
          provider_user_id: string
          refresh_token_encrypted?: string | null
          scopes?: string[] | null
          token_expires_at?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          access_token_encrypted?: string
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_connected?: boolean
          provider?: string
          provider_user_id?: string
          refresh_token_encrypted?: string | null
          scopes?: string[] | null
          token_expires_at?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      x_oauth2_pkce_states: {
        Row: {
          code_verifier: string
          created_at: string
          expires_at: string
          id: string
          redirect_uri: string
          state: string
          user_id: string
        }
        Insert: {
          code_verifier: string
          created_at?: string
          expires_at?: string
          id?: string
          redirect_uri: string
          state: string
          user_id: string
        }
        Update: {
          code_verifier?: string
          created_at?: string
          expires_at?: string
          id?: string
          redirect_uri?: string
          state?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      deduct_credits: {
        Args: {
          p_action_type: string
          p_credits: number
          p_idempotency_key?: string
          p_user_id: string
        }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_usage: {
        Args: { p_type: string; p_user_id: string }
        Returns: boolean
      }
      is_company_member: {
        Args: { _company_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
