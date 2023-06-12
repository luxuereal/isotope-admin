export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type users = {
  uid?: string;
  name?: string;
  gender?: string;
  birthday?: string;
};

export type subscriptions = {
    id: number;
    created_at: string;
    user_id: string;
    current_period_start: string;
    current_period_end: string;
    payment_method: number;
    status: number;
    token: string;
  };
export type profiles = {
  name?: string;
  photos?: string;
  birthday?: string;
  zodiac_visibility?: boolean;
  created_at?: string;
  i_am_here_to?: string;
  spotify_songs?: string;
  tiktok?: string;
  meme?: string;
  movie?: string;
};

export type xprofiles = profiles & {
  lname?: string;
  age?: number;
  city?: string;
  state?: string;
  country?: string;
  up_date?: string;
  up_time?: string;
  in_date?: string;
  in_time?: string;
  status?: boolean;
  phone_number?: string;
  email?: string;
  reported?: boolean;
  stories?: string;
  dating_fr?: string;
  [key: string]: any;
}

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
