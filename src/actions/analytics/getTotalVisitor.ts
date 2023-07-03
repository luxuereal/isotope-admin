import { history, visitor_data } from "@/types/history.type";

export default async function getTotalVisitor(setVisitorArray: any, setTotalVisitor: any) {
    
    const res = await fetch("/api/analytics/gettotalvisitor", {
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

    let premium: Array<number> = [0, 0, 0, 0, 0, 0];
    let free: Array<number> = [0, 0, 0, 0, 0, 0];
    let today = new Date().getDate();
    let total = 0;
    response.data.map((item: visitor_data) => {
        let index= 6 - today + Number(item.day) - 1;
        if (item.is_premium)
            premium[index] = item.count;
        else free[index] = item.count;
        total += item.count;
    })
    setVisitorArray([
        {
            label: "Dataset 1",
            data: free,
            borderColor: "#FBBC05",
            backgroundColor: "#FBBC05",
        },
        {
            label: "Dataset 2",
            data: premium,
            borderColor: "#7B61FF",
            backgroundColor: "#7B61FF",
        },
    ]);
    setTotalVisitor(total);
}
