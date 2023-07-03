import { gifs } from "@/types/gifs.type";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export const GetGifs = async (setGifArray: (value: gifs[]) => void) => {
    const res = await fetch("/api/gifs/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

        }),
    })
    let data = await res.json();
    if (res.status === 200) {
        if (data.data) {
            const gifArray: gifs[] = data.data.map((item: any) => ({
                id: item.id,
                created_at: item.created_at,
                url: item.url,
                is_disabled: item.is_disabled,
            }));
            setGifArray(gifArray);
        }
        return true;
    }
    else {
        alert('Oops! Net work error!');
        return false;
    }

};
