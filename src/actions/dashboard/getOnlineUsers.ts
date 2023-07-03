import { user_state } from "@/types/users.type";
import { status } from "@/types/status.type";

export default async function getOnlineUsers(type:boolean,setUserState:any, setOnlineUsers:any) {
    
    const users = await fetch("/api/dashboard/onlineusers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

        }),
    })
    if(users.ok === false)
        return 0;
    let address:Array<user_state> = [];
    let count = 0;
    const data = await users.json();
    data.data.map((item:status) => {
        if(item.is_online === true)
            count++;
        if(item.address === null)
            return;
        let temp = !type?item.address.split(',')[1]:item.address.split(',')[2];
        let index = address.findIndex(({name, value}) => (name === temp))
        if(index === -1){//no same state
            address.push({name: temp, value: 1});
        }
        else{
            address[index].value++;
        }
    })
    address.sort((a:user_state,b:user_state)=>(a.value<b.value ? 1 : -1))
    setUserState(address);
    setOnlineUsers(count)
}
