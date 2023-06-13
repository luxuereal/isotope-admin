import { subscriptions } from "@/types/subscription.type";
import { profiles } from '@/types/profile.type'
import { status } from "@/types/status.type";
import { users } from "@/types/users.type";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: users;
      };
      profiles: {
        Row: profiles;
      };
      subscriptions: {
        Row: subscriptions;
      }
      status: {
        Row: status;
      }
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
