import { ProfileType } from "@/types";


export default async function getUsers() {

    const response = await fetch("/api/dashboard/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    })
    
    if(response.ok === true){
        const data = await response.json();
    let count = data.data.filter((item: ProfileType) => item.is_disabled === false).length;
    return { registered: data.data.length, active: count};}
    return { registered: 0, active: 0};
    // setRegisteredUsers(3)
    // console.log(registerd_users);
}
