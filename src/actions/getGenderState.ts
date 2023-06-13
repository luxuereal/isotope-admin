import { SubscriptionType } from "@/types";
import { profiles, user_state } from "@/utils/database.types";
import { convertToObject } from "typescript";

export default async function getGenderState() {
    const response = await fetch("/api/dashboard/gender", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

        }),
    })
    
    if(response.ok === false)
        return 0;
    const result:Array<user_state> = [
        { name: "Female", value: 0 },
        { name: "Male", value: 0 },
        { name: "Transgender", value: 0 },
        { name: "Non-binary", value: 0 },
        { name: "Third gender", value: 0 },
        { name: "Gender neutral", value: 0 },
    ];
    const data = await response.json();
    data.data.map((item: profiles) => {
        switch(item.gender)
        {
            case 'Woman':
                result[0].value++;
                break;
            case 'Man':
                result[1].value++;
                break;
            case 'Transgender':
                result[2].value++;
                break;
            case 'Non-binary':
                result[3].value++;
                break;
            case 'Third gender':
                result[4].value++;
                break;
            case 'Gender neutral':
                result[5].value++;
                break;
            default: 
                break;
        }
    })
    result.sort((a:user_state,b:user_state)=>(a.value<b.value ? 1 : -1))
    return result;   
}
