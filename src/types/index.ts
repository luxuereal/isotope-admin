export type Params = { [key: string]: string | string[] | undefined };

export type Type = {
    uid: string;
    created_at: string;
    phone_number: string;
    email: string;
    provider: string;
    is_disabled: boolean;
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