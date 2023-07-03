export default async function getHistory() {

    const res = await fetch("/api/analytics/totalSession", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

        }),
    })
    if (res.ok === false)
        return 0;
    let data = await res.json();
    return data.data;
}
