export type users = {
    id: number;
    uid: string;
    email: string;
    phone_number: string;
    name: string;
    gender: string;
    age: number;
    fcm_token: string;
}

export type userRes = {
    uid: string;
    name: string;
    gender: string;
    birthday: string;
    users: {
        email: string;
        phone_number: string;
    } | undefined
}

export type user_state = {
    name:string;
    value: number;
}

export type db_users = {
    uid: string;
    created_at: string;
    phone_number: string;
    email: string;
    provider: string;
    is_disabled: boolean;
    fcm_token: string;
    report_status: number;
    is_premium: boolean;
}

export type user_token = {
    uid: string;
    code: string;
    name: string;
}