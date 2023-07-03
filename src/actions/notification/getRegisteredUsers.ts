import { user_token } from "@/types/users.type";

export default async function GetRegisteredUsers(setSelectOptions:any) {

    const response = await fetch("/api/dashboard/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        }),
    })
    if (response.ok === false)
        return 0;
    let data = await response.json();
    let result: Array<user_token> = [{uid:'',name:'ALL', code:'all'}];
    data.data.map((item: any) => {
        if (item.profiles)
            result.push({ uid:item.uid, name: item.profiles.name+' '+item.uid, code: item.fcm_token === null ? '' : item.fcm_token });
    })
    setSelectOptions(result);
}
