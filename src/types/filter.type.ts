export type FilterUser = {
    type: { name: string, code: boolean }[] | null;
    gender: { name: string, code: string }[] | null;
    status: { name: string, code: string }[] | null;
}

export type FilterValue = {
    name: string, code: string | boolean
}[] | [] | null