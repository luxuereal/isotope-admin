import { FilterUser } from "@/types/filter.type";

export default async function getTotalNum(filter: FilterUser | [] = []) {
    const response = await fetch("/api/usermanage/totalNum", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            filter: filter
        }),
    })
    
    if(response.ok === false)
        return 0;
    const data = await response.json();
    return data.count;   
}
