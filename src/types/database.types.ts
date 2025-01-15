export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      ALERT_TYPES: {
        Row: {
          alert_type: string;
          alert_type_id: string;
          created_at: string;
          message: string;
        };
        Insert: {
          alert_type: string;
          alert_type_id?: string;
          created_at?: string;
          message: string;
        };
        Update: {
          alert_type?: string;
          alert_type_id?: string;
          created_at?: string;
          message?: string;
        };
        Relationships: [];
      };
      ALERTS: {
        Row: {
          alert_id: string;
          alert_type_id: string;
          created_at: string;
          from_user_id: string | null;
          is_checked: boolean;
          to_user_id: string;
        };
        Insert: {
          alert_id?: string;
          alert_type_id: string;
          created_at?: string;
          from_user_id?: string | null;
          is_checked?: boolean;
          to_user_id: string;
        };
        Update: {
          alert_id?: string;
          alert_type_id?: string;
          created_at?: string;
          from_user_id?: string | null;
          is_checked?: boolean;
          to_user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ALERT_alert_type_id_fkey';
            columns: ['alert_type_id'];
            isOneToOne: false;
            referencedRelation: 'ALERT_TYPES';
            referencedColumns: ['alert_type_id'];
          },
          {
            foreignKeyName: 'ALERT_from_user_id_fkey';
            columns: ['from_user_id'];
            isOneToOne: false;
            referencedRelation: 'USERS';
            referencedColumns: ['user_id'];
          },
          {
            foreignKeyName: 'ALERT_to_user_id_fkey';
            columns: ['to_user_id'];
            isOneToOne: false;
            referencedRelation: 'USERS';
            referencedColumns: ['user_id'];
          },
        ];
      };
      COMMENTS: {
        Row: {
          comment: string;
          comments_id: string;
          created_at: string;
          target_comments_id: string | null;
          target_playlist_id: string | null;
          user_id: string;
        };
        Insert: {
          comment: string;
          comments_id?: string;
          created_at?: string;
          target_comments_id?: string | null;
          target_playlist_id?: string | null;
          user_id: string;
        };
        Update: {
          comment?: string;
          comments_id?: string;
          created_at?: string;
          target_comments_id?: string | null;
          target_playlist_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'COMMENTS_target_comments_id_fkey';
            columns: ['target_comments_id'];
            isOneToOne: false;
            referencedRelation: 'COMMENTS';
            referencedColumns: ['comments_id'];
          },
          {
            foreignKeyName: 'COMMENTS_target_playlist_id_fkey';
            columns: ['target_playlist_id'];
            isOneToOne: false;
            referencedRelation: 'PLAYLISTS';
            referencedColumns: ['playlist_id'];
          },
          {
            foreignKeyName: 'COMMENTS_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'USERS';
            referencedColumns: ['user_id'];
          },
        ];
      };
      FOLLOWS: {
        Row: {
          created_at: string;
          follow_id: string;
          follower_user_id: string;
          following_user_id: string;
        };
        Insert: {
          created_at?: string;
          follow_id?: string;
          follower_user_id: string;
          following_user_id: string;
        };
        Update: {
          created_at?: string;
          follow_id?: string;
          follower_user_id?: string;
          following_user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'FOLLOW_follower_user_id_fkey';
            columns: ['follower_user_id'];
            isOneToOne: false;
            referencedRelation: 'USERS';
            referencedColumns: ['user_id'];
          },
          {
            foreignKeyName: 'FOLLOW_following_user_id_fkey';
            columns: ['following_user_id'];
            isOneToOne: false;
            referencedRelation: 'USERS';
            referencedColumns: ['user_id'];
          },
        ];
      };
      HASHTAGS: {
        Row: {
          created_at: string;
          hashtag_id: string;
          hashtag_name: string;
          playlist_id: string;
        };
        Insert: {
          created_at?: string;
          hashtag_id?: string;
          hashtag_name?: string;
          playlist_id: string;
        };
        Update: {
          created_at?: string;
          hashtag_id?: string;
          hashtag_name?: string;
          playlist_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'HASHTAG_playlist_id_fkey';
            columns: ['playlist_id'];
            isOneToOne: false;
            referencedRelation: 'PLAYLISTS';
            referencedColumns: ['playlist_id'];
          },
        ];
      };
      LIKES: {
        Row: {
          comments_id: string | null;
          created_at: string;
          likes_id: string;
          playlist_id: string | null;
          user_id: string;
        };
        Insert: {
          comments_id?: string | null;
          created_at?: string;
          likes_id?: string;
          playlist_id?: string | null;
          user_id: string;
        };
        Update: {
          comments_id?: string | null;
          created_at?: string;
          likes_id?: string;
          playlist_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'LIKES_comments_id_fkey';
            columns: ['comments_id'];
            isOneToOne: false;
            referencedRelation: 'COMMENTS';
            referencedColumns: ['comments_id'];
          },
          {
            foreignKeyName: 'LIKES_playlist_id_fkey';
            columns: ['playlist_id'];
            isOneToOne: false;
            referencedRelation: 'PLAYLISTS';
            referencedColumns: ['playlist_id'];
          },
          {
            foreignKeyName: 'LIKES_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'USERS';
            referencedColumns: ['user_id'];
          },
        ];
      };
      PLAYLIST_VIDEOS: {
        Row: {
          created_at: string;
          order: number;
          playlist_id: string;
          playlist_videos_id: string;
          video_id: string;
        };
        Insert: {
          created_at?: string;
          order?: number;
          playlist_id: string;
          playlist_videos_id?: string;
          video_id: string;
        };
        Update: {
          created_at?: string;
          order?: number;
          playlist_id?: string;
          playlist_videos_id?: string;
          video_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'PLAYLIST_VIDEOS_playlist_id_fkey';
            columns: ['playlist_id'];
            isOneToOne: false;
            referencedRelation: 'PLAYLISTS';
            referencedColumns: ['playlist_id'];
          },
        ];
      };
      PLAYLISTS: {
        Row: {
          category: string | null;
          created_at: string;
          playlist_id: string;
          short_intro: string | null;
          thumbnail_image: string | null;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          playlist_id?: string;
          short_intro?: string | null;
          thumbnail_image?: string | null;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          playlist_id?: string;
          short_intro?: string | null;
          thumbnail_image?: string | null;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'PLAYLIST_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'USERS';
            referencedColumns: ['user_id'];
          },
        ];
      };
      SUBSCRIBES: {
        Row: {
          created_at: string;
          playlist_id: string;
          subscribe_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          playlist_id: string;
          subscribe_id?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          playlist_id?: string;
          subscribe_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'SUBSCRIBE_playlist_id_fkey';
            columns: ['playlist_id'];
            isOneToOne: false;
            referencedRelation: 'PLAYLISTS';
            referencedColumns: ['playlist_id'];
          },
          {
            foreignKeyName: 'SUBSCRIBE_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'USERS';
            referencedColumns: ['user_id'];
          },
        ];
      };
      USERS: {
        Row: {
          created_at: string;
          email: string;
          nickname: string;
          profile_image: string | null;
          short_intro: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          nickname: string;
          profile_image?: string | null;
          short_intro?: string | null;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          nickname?: string;
          profile_image?: string | null;
          short_intro?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_user: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
