export type Params = { [key: string]: string | string[] | undefined };

export type User = {
    id: number;
    uid: string;
    name: string;
    gender: string;
    birthday: string;
    age: number;
}

export type Summary = {
    name: string;
    value: number;
}

export type LinkType = {
    href: string;
    icon: React.ComponentType;
    name: string;
}

export type HeaderType = {
    href: string;
    name: string;
}

export type ProfileType = {
    uid: string;
    created_at: string;
    phone_number: string;
    email:string;
    provider:string;
    is_disabled:boolean;
}

export type SubscriptionType = {
    id: string;
    created_at: string;
    uid: string;
    current_period_start: string;
    current_period_end: string;
    payment_method: number;
    status: number;
    token: string;
}

export type FilterUser = {
    type: { name: string, code: boolean }[] | null;
    gender: { name: string, code: string }[] | null;
    status: { name: string, code: string }[] | null;
}