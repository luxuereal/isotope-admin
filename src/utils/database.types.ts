export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];
export type users = {
  created_at?: string;
  phone_number?: string;
  email?: string;
  provider?: string;
  is_disabled?: boolean;
};
export interface Database {
    public: {
        Tables: {
            users: {
                Row: users;
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
