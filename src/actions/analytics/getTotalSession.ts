import { session_data } from "@/types/history.type";

export default async function getTotalSession(setTotalSession: any, setSessionArray: any) {
    const res = await fetch("/api/analytics/gettotalsession", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

        }),
    })
    if (res.ok === false)
        alert(res.statusText);

    let response = await res.json();
    let result: Array<number> = [0, 0, 0, 0, 0, 0];
    let today = new Date().getDate();
    let total = 0;

    response.data.map((item: session_data) => {
        let index= 6 - today + Number(item.day) - 1;
        result[index] = item.count;
        total += item.count;
    })
    if (typeof result === "object" && result !== null) {
        setTotalSession(total);
        setSessionArray([
            {
                label: "Total Session",
                data: result,
                borderColor: "#FBBC05",
                backgroundColor: "#FBBC05",
            },
        ])
    }
}
