import { profiles } from "@/types/profile.type";
import { user_state } from "@/types/users.type";

export default async function getGenderState(setGenderState:any) {
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
        { name: "Nonbinary", value: 0 },
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
            case 'Nonbinary':
                result[2].value++;
                break;
        }
    })
    result.sort((a:user_state,b:user_state)=>(a.value<b.value ? 1 : -1))
    setGenderState(result);
}
