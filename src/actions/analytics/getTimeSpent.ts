import { time_data } from "@/types/history.type";

export default async function getTimeSpent(setTimeArray: any, setTotalTime: any) {
    
    const res = await fetch("/api/analytics/gettimespent", {
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
    response.data.map((item: time_data) => {
        let index= 6 - today + Number(item.day) - 1;
        result[index] = item.sum;
        total += item.sum;
    })
    setTotalTime(total);
    setTimeArray([
        {
            label: "Total Time Spent",
            data: result,
            borderColor: "#FBBC05",
            backgroundColor: "#FBBC05",
        },
    ]);
}
