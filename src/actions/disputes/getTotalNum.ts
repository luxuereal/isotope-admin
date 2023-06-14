export default async function getTotalNum() {
    const response = await fetch("/api/disputes/totalNum", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        }),
    })
    
    if(response.ok === false)
        return 0;
    const data = await response.json();
    return data.count;   
}
