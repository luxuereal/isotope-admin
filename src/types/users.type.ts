export type users = {
    id: number;
    uid: string;
    name: string;
    gender: string;
    age: number;
}

export type userRes = {
    uid: string;
    profiles: {
        name: string;
        gender: string;
        birthday: string;
    } | undefined
}

export type user_state = {
    name:string;
    value: number;
}