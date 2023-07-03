export type ProfileType = {
    uid: string;
    created_at: string;
    phone_number: string;
    email:string;
    provider:string;
    is_disabled:boolean;
    is_premium:boolean;
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
    selfie?: string;
    is_verified?: boolean;
    token?: string;
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
    is_deleted?: boolean;
    report_status?: boolean;
    spotify?: string;
    tiktok?: string;
    meme?: string;
    movie?: string;
    stories?: string;
    dt_fr?: string;
    [key: string]: any;
}

export type Status = {
    push: boolean;
    suspend: boolean;
    verify: boolean;
    deactivate: boolean;
    sent: boolean;
    [key: string]: any;
}