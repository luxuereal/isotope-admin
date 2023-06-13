import { MutableRefObject } from "react";

export const SERVER_ERR_MSG = "Something went wrong in a server.";

export const showMessage = (toast: MutableRefObject<any>, type:string, summary: string, details: string) => {
    toast.current?.show({
        severity: type,
        summary: summary,
        detail: details,
        life: 2000,
    });
}