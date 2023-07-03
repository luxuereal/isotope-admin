export const EnableGif = async (value: boolean, id: number) => {
    const res = await fetch("/api/gifs/enable", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            value,
            id
        }),
    })
    if(res.status === 200){

    }
    else {
        alert('Oops! Network error!')
    }
};
