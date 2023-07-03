export type history = {
    uid: string;
    created_at: string;
    ended_at: string;
    is_premium: boolean;
}

export type session_data = {
    count: number;
    day: string;
}

export type visitor_data = {
    count: number;
    day: string;
    is_premium: boolean;
}

export type time_data = {
    sum: number;
    day: string;
}

export type bounce_data = {
    count: number;
    day: string;
    is_premium: boolean;
}
