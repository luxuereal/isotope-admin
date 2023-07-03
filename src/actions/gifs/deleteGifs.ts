import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const DeleteGif = async ( id: number) => {
    const res = await fetch("/api/gifs/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id
        }),
    })
    if(res.status === 200){
    }
    else {
        alert('Oops! Network error!')
    }
};
