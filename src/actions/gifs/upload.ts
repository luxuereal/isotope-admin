import { showMessage } from "@/utils/messages";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { MutableRefObject } from "react";

export const handleUpload = async (toast: MutableRefObject<any>, fileName: string) => {
    
        const res = await fetch("/api/gifs/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName
            }),
        })
        if(res.status === 200){
            showMessage(toast,'success','success', 'Upload image success')
        }
        else {
            showMessage(toast, 'error', 'error', 'Network error occured!');
        }
};
