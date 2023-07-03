export default async function getMonthlyView(setMonthlyArray: any) {
    const res = await fetch("/api/analytics/monthlyview", {
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

    let premium: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let free: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let today = new Date().getDate();
    data.data.map((item: any) => {
        if (item.is_premium)
            premium[Number(item.month)-1] = item.count;
        else free[Number(item.month)-1] = item.count;
    })

    setMonthlyArray([
        {
            label: "Free Members",
            data: free,
            borderColor: "#6C60FF",
            backgroundColor: "#6C60FF",
        },
        {
            label: "Premium Members",
            data: premium,
            borderColor: "#CE2A96",
            backgroundColor: "#CE2A96",
        },
    ])
}
