export type ProfileType = {
    uid: string;
    created_at: string;
    phone_number: string;
    email:string;
    provider:string;
    is_disabled:boolean;
}

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
    gender?: string;
  };
  
export type xprofile = {
    uid?: string;
    photos?: string;
    fname?: string; 
    lname?: string;
    gender?: string;
    age?: number;
    birthday?: string;
    zodiac?: string;
    city?: string;
    state?: string;
    country?: string;
    phone_number?: string;
    email?: string;
    up_date?: string;
    up_time?: string;
    in_date?: string;
    in_time?:string;
    status?: boolean;
    report_status?: boolean;
    spotify?: string;
    tiktok?: string;
    meme?: string;
    movie?: string;
    stories?: string;
    dt_fr?: string;
    [key: string]: any;
}